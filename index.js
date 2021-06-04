const fs = require('fs');

class ixiLogger {

    #filepath = '/var/log/ixiLogger.log'; // default filepath

    #name = 'ixiLogger'; // default appname

    #instanceFilepath;

    #instanceName;

    constructor(config) {
        if (config) {
            if (config.filepath) {
                this.#instanceFilepath = config.filepath;
            } else {
                this.#instanceFilepath = this.#filepath;
            }
            if (config.name) {
                this.#instanceName = config.name;
            } else {
                this.#instanceName = this.#name;
            }
        } else {
            this.#instanceFilepath = this.#filepath;
            this.#instanceName = this.#name;
        }
        if (!fs.existsSync(`${this.#instanceFilepath}/${this.#instanceName}`)) {
            const createStream = fs.createWriteStream(`${this.#instanceFilepath}`);
            createStream.end();
        }
    }

    #writeToFile(data) { // data will always be an object
        const writeStream = fs.createWriteStream(`${this.#instanceFilepath}`, { flags: 'a' });
        writeStream.write(`${JSON.stringify(data)}\n`);
        writeStream.end();
    }

    info(dataToLog) {
        if (dataToLog !== null) {
            if (typeof dataToLog === 'object') {
                const logData = Object.assign({}, {
                    name: this.#instanceName,
                    level: 30,
                    logType: 'info',
                    '@timestamp': new Date().toISOString()
                }, dataToLog);
                this.#writeToFile(logData);
            } else {
                throw new Error('ixiLogger: data need to be logged can only be an object');
            }
        } else {
            throw new Error('ixiLogger: data need to be logged cannot be null');
        }
    }

    error(dataToLog) {
        if (dataToLog !== null) {
            if (typeof dataToLog === 'object') {
                const logError = Object.assign({}, {
                    name: this.#instanceName,
                    level: 50,
                    logType: 'error',
                    '@timestamp': new Date().toISOString()
                }, dataToLog);
                this.#writeToFile(logError);
            } else {
                throw new Error('ixiLogger: error need to be logged can only be an object');
            }
        } else {
            throw new Error('ixiLogger: error need to be logged cannot be null');
        }
    }
}

module.exports = {
    ixiLogger
}