/* eslint-disable no-console */
import chalk from 'chalk';

export const logger = {
  info: (data?: unknown): void => {
    console.log(`${chalk.bgBlue('[INFO]')} ${chalk.whiteBright(logData(data))}`);
  },
  warning: (data: unknown): void => {
    console.log(
      `${chalk.bgYellowBright('[WARAING]')} ${chalk.whiteBright(logData(data))}`,
    );
  },
  error: (data: unknown): void => {
    console.log(
      `${chalk.bgRgb(245, 115, 115).black('[ERROR]')} ${chalk.whiteBright(
        logData(data),
      )}`,
    );
  },
};

function logData(data: unknown): string {
  if (data instanceof Object) return JSON.stringify(data);
  return data as string;
}
