/* eslint-disable no-console */
import chalk from 'chalk';
import { getEnv, ENV } from '@/common';

const isJestEnv = getEnv() === ENV.JEST;

export const logger = {
  info: (data?: any): void => {
    if (isJestEnv) return;
    console.log(`${chalk.bgBlue('[INFO]')} ${chalk.whiteBright(logData(data))}`);
  },
  warning: (data: any): void => {
    if (isJestEnv) return;
    console.log(
      `${chalk.bgYellowBright('[WARAING]')} ${chalk.whiteBright(logData(data))}`,
    );
  },
  error: (data: any): void => {
    if (isJestEnv) return;
    console.log(
      `${chalk.bgRgb(245, 115, 115).black('[ERROR]')} ${chalk.whiteBright(
        logData(data),
      )}`,
    );
  },
};

function logData(data: any): string {
  if (data instanceof Object) return JSON.stringify(data);
  return data as string;
}
