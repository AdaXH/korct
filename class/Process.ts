import { logger } from '@/common';
import { traceLogger } from '@/middleware/log';
import cluster from 'cluster';
import os from 'os';

const cpus = os.cpus().length;

/**
 * 进程管理
 */
export class Process {
  private workers: WorkerFace[] = [];
  private maxProcess: number = cpus;
  private callback: VoidFunction;
  private eventListener: eventFunction[];

  public setCallback(callback: VoidFunction): void {
    this.callback = callback;
  }

  public setMaxProcess(maxProcess: number): void {
    this.maxProcess = maxProcess;
  }

  public setEventListener(eventListener: eventFunction[]): void {
    this.eventListener = eventListener;
  }

  init(): void {
    if (cluster.isMaster) {
      for (let i = 0; i < this.maxProcess; i += 1) {
        const worker = cluster.fork();
        setLog(worker);
        worker.on('message', arg => {
          if (this.eventListener) {
            this.eventListener.forEach(({ eventName, callback }) => {
              if (arg?.eventName === eventName) {
                logger.info(`event: ${eventName}`);
                callback();
              }
            });
          }
        });
        this.workers.push({
          pid: worker.process.pid,
          worker,
        });
      }
      cluster.on('exit', (worker, code, sign) => {
        const newWorker = cluster.fork();
        setLog(newWorker);
        logger.warning(`process exit whitd code: ${code}, sing: ${sign}, now loading`);
        const newWorkes = this.workers
          .filter(item => worker.process.pid !== item.pid)
          .concat([
            {
              pid: newWorker.process.pid,
              worker: newWorker,
            },
          ]);
        this.workers = newWorkes;
      });
    } else {
      this.callback();
    }
  }
}

interface WorkerFace {
  pid?: number;
  worker: Worker | unknown;
}

interface eventFunction {
  eventName: string;
  callback: (arg?: unknown) => void | Promise<unknown>;
}

function setLog(worker: Worker | any): void {
  worker.process?.stdout?.on('data', chunk => {
    traceLogger.fatal('worker:' + chunk);
  });
  worker.process?.stderr?.on('data', chunk => {
    traceLogger.error('worker:' + chunk);
  });
}
