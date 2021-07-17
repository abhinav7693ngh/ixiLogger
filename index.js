const { createWriteStream, existsSync } = require('fs');
const { Readable } = require('stream');
const path = require('path');

class ixilogger {

    #appName = 'ixilogger';

    #filePath = path.resolve('/var/log/', 'ixilogger.log');

    #readableStream = new Readable({ read() {} });

    #writableStream;

    constructor(config) {
        if (config) {
            if (typeof config === 'object') {
                const {
                    appName = this.#appName,
                    filePath = this.#filePath,
                } = config;
                if (typeof appName === 'string') {
                    this.#appName = appName;
                } else {
                    throw new Error('ixilogger: appName should be a string');
                }
                if (typeof filePath === 'string') {
                    this.#filePath = filePath;
                } else {
                    throw new Error('ixilogger: filePath should be a string');
                }
            } else {
                throw new Error('ixilogger: Not able to initialize logger as config given is not an object');
            }
        }
        this.#createWritable();
        this.#connectStreams();
    }

    #createWritable() {
        if (!existsSync(`${this.#filePath}`)) { // Create a new file if not existing
            this.#writableStream = createWriteStream(`${this.#filePath}`, { flags: 'a' });
        } else {
            this.#writableStream = createWriteStream(`${this.#filePath}`, { flags: 'a' });
        }
    }

    #connectStreams() {
        this.#readableStream.pipe(this.#writableStream);
    }

    trace(dataToLog) {
        if (dataToLog !== null && dataToLog !== undefined) {
            if (typeof dataToLog === 'object') {
                const logTrace = Object.assign({}, {
                    name: this.#appName,
                    level: 10,
                    logType: 'trace',
                    '@timestamp': new Date().toISOString()
                }, dataToLog);
                const jsonTrace = JSON.stringify(logTrace);
                console.trace(jsonTrace);
                this.#readableStream.push(jsonTrace + '\n');
            } else {
                throw new Error('ixilogger: Trace data need to be logged can only be an object');
            }
        }
    }

    debug(dataToLog) {
        if (dataToLog !== null && dataToLog !== undefined) {
            if (typeof dataToLog === 'object') {
                const logDebug = Object.assign({}, {
                    name: this.#appName,
                    level: 20,
                    logType: 'debug',
                    '@timestamp': new Date().toISOString()
                }, dataToLog);
                const jsonDebug = JSON.stringify(logDebug);
                console.log(`Debug: ${jsonDebug}`);
                this.#readableStream.push(jsonDebug + '\n');
            } else {
                throw new Error('ixilogger: Debug data need to be logged can only be an object');
            }
        }
    }

    info(dataToLog) {
        if (dataToLog !== null && dataToLog !== undefined) {
            if (typeof dataToLog === 'object') {
                const logInfo = Object.assign({}, {
                    name: this.#appName,
                    level: 30,
                    logType: 'info',
                    '@timestamp': new Date().toISOString()
                }, dataToLog);
                const jsonInfo = JSON.stringify(logInfo);
                console.log(`Info: ${jsonInfo}`);
                this.#readableStream.push(jsonInfo + '\n');
            } else {
                throw new Error('ixilogger: Info data need to be logged can only be an object');
            }
        }
    }

    warn(dataToLog) {
        if (dataToLog !== null && dataToLog !== undefined) {
            if (typeof dataToLog === 'object') {
                const logWarn = Object.assign({}, {
                    name: this.#appName,
                    level: 40,
                    logType: 'warn',
                    '@timestamp': new Date().toISOString()
                }, dataToLog);
                const jsonWarn = JSON.stringify(logWarn);
                console.log(`Warn: ${jsonWarn}`);
                this.#readableStream.push(jsonWarn + '\n');
            } else {
                throw new Error('ixilogger: Warn data need to be logged can only be an object');
            }
        }
    }

    error(dataToLog) {
        if (dataToLog !== null && dataToLog !== undefined) {
            if (typeof dataToLog === 'object') {
                const logError = Object.assign({}, {
                    name: this.#appName,
                    level: 50,
                    logType: 'error',
                    '@timestamp': new Date().toISOString()
                }, dataToLog);
                const jsonError = JSON.stringify(logError);
                console.log(`Error: ${jsonError}`);
                this.#readableStream.push(jsonError + '\n');
            } else {
                throw new Error('ixilogger: Error data need to be logged can only be an object');
            }
        }
    }
}

module.exports = {
    ixilogger
}