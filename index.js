const fs = require('fs');
const path = require('path');

class ixilogger {

    #instanceFilepath;

    #instanceName;

    constructor(config) {
        if (config) {
            if (typeof config === 'object') {
                const { filepath = path.resolve("/var/log/", "ixilogger.log"), name = 'ixilogger' } = config;
                this.#instanceFilepath = filepath;
                this.#instanceName = name;
            } else {
                throw new Error('ixilogger: Not able to initialize logger as config given is not an object');
            }
        } else {
            this.#instanceFilepath = path.resolve("/var/log/", "ixilogger.log");
            this.#instanceName = 'ixilogger';
        }
        if (!fs.existsSync(`${this.#instanceFilepath}`)) {
            const createStream = fs.createWriteStream(`${this.#instanceFilepath}`);
            createStream.end();
        }
    }

    #writeToFile(data) { // data will always be an object
        const writeStream = fs.createWriteStream(`${this.#instanceFilepath}`, { flags: 'a' });
        writeStream.write(`${JSON.stringify(data)}\n`);
        writeStream.end();
    }

    trace(dataToLog) {
        if (dataToLog !== null && dataToLog !== undefined) {
            if (typeof dataToLog === 'object') {
                const logtrace = Object.assign({}, {
                    name: this.#instanceName,
                    level: 10,
                    logType: 'trace',
                    '@timestamp': new Date().toISOString()
                }, dataToLog);
                this.#writeToFile(logtrace);
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
                this.#writeToFile(logDebug);
            } else {
                throw new Error('ixilogger: Debug data need to be logged can only be an object');
            }
        }
    }

    info(dataToLog) {
        if (dataToLog !== null && dataToLog !== undefined) {
            if (typeof dataToLog === 'object') {
                const logData = Object.assign({}, {
                    name: this.#instanceName,
                    level: 30,
                    logType: 'info',
                    '@timestamp': new Date().toISOString()
                }, dataToLog);
                this.#writeToFile(logData);
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
                this.#writeToFile(logWarn);
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
                this.#writeToFile(logError);
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
                this.#writeToFile(logFatal);
            } else {
                throw new Error('ixilogger: Fatal data need to be logged can only be an object');
            }
        }
    }
}

module.exports = {
    ixilogger
}