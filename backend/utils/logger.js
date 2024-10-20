const logger = {
  info: (message, meta = {}) => {
    console.log(new Date().toISOString(), "INFO:", message, meta);
  },
  error: (message, error = {}) => {
    console.error(new Date().toISOString(), "ERROR:", message, {
      message: error.message,
      stack: error.stack,
      ...error,
    });
  },
  warn: (message, meta = {}) => {
    console.warn(new Date().toISOString(), "WARN:", message, meta);
  },
  debug: (message, meta = {}) => {
    if (process.env.NODE_ENV === "development") {
      console.debug(new Date().toISOString(), "DEBUG:", message, meta);
    }
  },
};

export default logger;
