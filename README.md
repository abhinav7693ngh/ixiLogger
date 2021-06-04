# ixiLogger 🏳️‍🌈

## Installation

You can install ixiLogger using below commands.

```
npm install --save ixiLogger
```

or

```javascript
yarn add ixiLogger
```

---

## How to import

If you are using require syntax then you can import using below code.

```javascript
const { ixiLogger } = require("ixiLogger");
```

If you are using modern import syntax then you can import using below code.

```javascript
import { ixiLogger } from "ixiLogger";
```

---

## How to use

ixiLogger just import a class called **ixiLogger**. You can create a logger instance which takes a config object as parameter which has 2 fields i.e. **name** which is usually the application name and **filepath** which is the log file path. For eg :-

```javascript
const path = require("path");

const logger = new ixiLogger({
  name: "app", // Name of the application
  filepath: path.resolve("/var/log/app/", "app.log"), // Log path
});
```

> log file path usually comes from the app config but you can also hardcode if you wanted.

> **_Keep in mind - All values are accepted apart from Undefined/null._**

> config object is not mandatory and also the fields are also purely optional. So if you don't want to give any config then it uses the default "name" and "filepath".

> **Default parameter values** <br/> name --- ixiLogger <br/> filepath --- /var/log/ixiLogger.log

### Methods Available on ixiLogger instance

- **Trace log**
  ```javascript
  logger.trace({
    data: "info log",
  });
  ```
- **Debug log**
  ```javascript
  logger.debug({
    data: "info log",
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
    data: "info log",
  });
  ```
- **Warn log**
  ```javascript
  logger.warn({
    data: "info log",
  });
  ```
- **Fatal log**
  ```javascript
  logger.fatal({
    data: "info log",
  });
  ```
  > **There is some extra default information added with logs as per log type are** <br/>
  >
  > 1. **name** - Which is the name of the app given or default if not given <br/>
  > 2. **logType** which can have below values<br/>
      - trace <br/>
      - debug <br/>
      - info <br/>
      - warn <br/>
      - error <br/>
      - fatal <br/>
  > 3. **level** which can have below values as per logType<br/>
      - 10 for trace <br/>
      - 20 for debug <br/>
      - 30 for log <br/>
      - 40 for warn <br/>
      - 50 for error <br/>
      - 60 for fatal <br/>
