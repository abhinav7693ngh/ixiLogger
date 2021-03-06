# ixiLogger 🪵

## Introduction

ixilogger is a simple to use utility that help you setup logging superfast in your Node server with Zero dependency using nodejs streams. <br/>
For log rotation you can use external system like logStash.
Don't forget to leave a github star ⭐, if you like ixilogger.

## Installation

You can install ixilogger using below commands.

```
npm install --save ixilogger
```

or

```javascript
yarn add ixilogger
```

---

## How to import

If you are using require syntax then you can import using below code.

```javascript
const { ixilogger } = require("ixilogger");
```

If you are using modern import syntax then you can import using below code.

```javascript
import { ixilogger } from "ixilogger";
```

---

## How to use

```javascript
const path = require("path");
const { ixilogger } = require("ixilogger");

const logger = new ixilogger({
  appName: "app", // Name of the application (Optional)
  filePath: path.resolve("/var/log/app/", "app.log"), // Log path
});
```

> log file path usually comes from the app config but you can also hardcode if you wanted.

> config object is not mandatory and also the fields are also purely optional. So if you don't want to give any config then it uses the default "name" and "filepath".

> **Default parameter values** <br/> **name** - ixilogger <br/> **filePath** - /var/log/ixilogger.log <br/>

### Methods Available on ixilogger instance

- **Trace log**
  ```javascript
  logger.trace({
    data: "trace log",
  });
  ```
- **Debug log**
  ```javascript
  logger.debug({
    data: "debug log",
  });
  ```
- **Info log**
  ```javascript
  logger.info({
    data: "info log",
  });
  ```
- **Error log**
  ```javascript
  logger.error({
    data: "error log",
  });
  ```
- **Warn log**

  ```javascript
  logger.warn({
    data: "warn log",
  });
  ```

  > **Important thing to note - Currently ixilogger only support for objects to log in all the available logger methods**

  > **There are some extra default information added with logs as per log type are** <br/>
  >
  > 1. **name** - Which is the name of the app given or default if not given <br/>
  > 2. **logType** which can have below values<br/>

      - trace
      - debug
      - info
      - warn
      - error

  > 3. **level** which can have below values as per logType<br/>

      - 10 (trace)
      - 20 (debug)
      - 30 (info)
      - 40 (warn)
      - 50 (error)

  > 4. **@timestamp** which store the log time
