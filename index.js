const fs = require('fs');
const path = require('path');
class ixilogger {

    #appName = 'ixilogger';

    #filePath = path.resolve('/var/log/', 'ixilogger.log');

    #showLogs = false;

    #pollingInterval = 1000;

    #setIntervalAdd = null;

    #logQueue = [];

    constructor(config) {
        if (config) {
            if (typeof config === 'object') {
                const {
                    appName = this.#appName,
                    filePath = this.#filepath,
                    showLogs = this.#showLogs,
                    pollingInterval = this.#pollingInterval
                } = config;
                if (typeof pollingInterval === 'number') {
                    this.#pollingInterval = pollingInterval;
                } else {
                    throw new Error('ixilogger: pollingInterval should be a number');
                }
                if (typeof filePath === 'string') {
                    this.#filePath = filePath;
                } else {
                    throw new Error('ixilogger: filePath should be a string');
                }
                if (typeof appName === 'string') {
                    this.#appName = appName;
                } else {
                    throw new Error('ixilogger: appName should be a string');
                }
                if (typeof showLogs === 'boolean') {
                    this.#showLogs = showLogs;
                } else {
                    throw new Error('ixilogger: showLogs should be boolean');
                }
            } else {
                throw new Error('ixilogger: Not able to initialize logger as config given is not an object');
            }
        }
        if (!fs.existsSync(`${this.#filePath}`)) { // Create a new file if not existing
            const createStream = fs.createWriteStream(`${this.#filePath}`);
            createStream.end();
        }
        this.#startPollingForLogs();
        process.on('beforeExit', () => {
            if (this.#logQueue.length > 0) {
                this.#writeToFile();
            }
            clearInterval(this.#setIntervalAdd);
        });
    }

    #writingToFile(data) { // data will always be JSON stringified
        const writeStream = fs.createWriteStream(`${this.#filePath}`, { flags: 'a' });
        writeStream.write(data);
        writeStream.end();
    }

    #writeToFile() {
        const toWriteLogs = this.#logQueue.splice(0, this.#logQueue.length);
        let logAggregated = '';
        toWriteLogs.forEach(log => logAggregated += `${JSON.stringify(log)}\n`);
        this.#writingToFile(logAggregated);
    }

    #startPollingForLogs() {
        this.#setIntervalAdd = setInterval(() => {
            if (this.#logQueue.length > 0) {
                this.#writeToFile();
            }
        }, this.#pollingInterval);
    }

    trace(dataToLog) {
        if (dataToLog !== null && dataToLog !== undefined) {
            if (typeof dataToLog === 'object') {
                const logTrace = Object.assign({}, {
                    name: this.#instanceName,
                    level: 10,
                    logType: 'trace',
                    '@timestamp': new Date().toISOString()
                }, dataToLog);
                if (this.#showLogs) {
                    console.log(`[Trace] ${JSON.stringify(logTrace)}`);
                }
                this.#logQueue.push(logTrace);
            } else {
                throw new Error('ixilogger: Trace data need to be logged can only be an object');
            }
        }
    }

    debug(dataToLog) {
        if (dataToLog !== null && dataToLog !== undefined) {
            if (typeof dataToLog === 'object') {
                const logDebug = Object.assign({}, {
                    name: this.#instanceName,
                    level: 20,
                    logType: 'debug',
                    '@timestamp': new Date().toISOString()
                }, dataToLog);
                if (this.#showLogs) {
                    console.log(`[Debug] ${JSON.stringify(logDebug)}`);
                }
                this.#logQueue.push(logDebug);
            } else {
                throw new Error('ixilogger: Debug data need to be logged can only be an object');
            }
        }
    }

    info(dataToLog) {
        if (dataToLog !== null && dataToLog !== undefined) {
            if (typeof dataToLog === 'object') {
                const logInfo = Object.assign({}, {
                    name: this.#instanceName,
                    level: 30,
                    logType: 'info',
                    '@timestamp': new Date().toISOString()
                }, dataToLog);
                if (this.#showLogs) {
                    console.log(`[Info] ${JSON.stringify(logInfo)}`);
                }
                this.#logQueue.push(logInfo);
            } else {
                throw new Error('ixilogger: Info data need to be logged can only be an object');
            }
        }
    }

    warn(dataToLog) {
        if (dataToLog !== null && dataToLog !== undefined) {
            if (typeof dataToLog === 'object') {
                const logWarn = Object.assign({}, {
                    name: this.#instanceName,
                    level: 40,
                    logType: 'warn',
                    '@timestamp': new Date().toISOString()
                }, dataToLog);
                if (this.#showLogs) {
                    console.log(`[Warn] ${JSON.stringify(logWarn)}`);
                }
                this.#logQueue.push(logWarn);
            } else {
                throw new Error('ixilogger: Warn data need to be logged can only be an object');
            }
        }
    }

    error(dataToLog) {
        if (dataToLog !== null && dataToLog !== undefined) {
            if (typeof dataToLog === 'object') {
                const logError = Object.assign({}, {
                    name: this.#instanceName,
                    level: 50,
                    logType: 'error',
                    '@timestamp': new Date().toISOString()
                }, dataToLog);
                if (this.#showLogs) {
                    console.log(`[Error] ${JSON.stringify(logError)}`);
                }
                this.#logQueue.push(logError);
            } else {
                throw new Error('ixilogger: Error data need to be logged can only be an object');
            }
        }
    }

    fatal(dataToLog) {
        if (dataToLog !== null && dataToLog !== undefined) {
            if (typeof dataToLog === 'object') {
                const logFatal = Object.assign({}, {
                    name: this.#instanceName,
                    level: 60,
                    logType: 'fatal',
                    '@timestamp': new Date().toISOString()
                }, dataToLog);
                if (this.#showLogs) {
                    console.log(`[Fatal] ${JSON.stringify(logFatal)}`);
                }
                this.#logQueue.push(logFatal);
            } else {
                throw new Error('ixilogger: Fatal data need to be logged can only be an object');
            }
        }
    }
}

module.exports = {
    ixilogger
}