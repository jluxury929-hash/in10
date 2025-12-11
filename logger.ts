import winston from 'winston';
import chalk from 'chalk';

const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    success: 2,
    info: 3,
    debug: 4
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    success: 'green',
    info: 'blue',
    debug: 'gray'
  }
};

winston.addColors(customLevels.colors);

const consoleFormat = winston.format.printf(({ level, message, timestamp }) => {
  const ts = new Date(timestamp).toLocaleString();
  let coloredLevel = level.toUpperCase();
  
  switch (level) {
    case 'error': coloredLevel = chalk.red.bold(level.toUpperCase()); break;
    case 'warn': coloredLevel = chalk.yellow.bold(level.toUpperCase()); break;
    case 'success': coloredLevel = chalk.green.bold(level.toUpperCase()); break;
    case 'info': coloredLevel = chalk.blue.bold(level.toUpperCase()); break;
    case 'debug': coloredLevel = chalk.gray(level.toUpperCase()); break;
  }
  
  return `${chalk.gray(ts)} [${coloredLevel}] ${message}`;
});

const logger = winston.createLogger({
  levels: customLevels.levels,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true })
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        consoleFormat
      )
    })
  ]
});

export default logger;
