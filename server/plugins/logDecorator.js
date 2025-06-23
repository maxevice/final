const { performance } = require("perf_hooks");

function log({ level = "INFO", logErrorsOnly = false } = {}) {
  return (fn) => {
    return async (...args) => {
      const start = performance.now();
      const [req, reply] = args;

      try {
        const result = await fn(...args);

        const status = reply?.statusCode || 0;
        const isErrorStatus = status >= 400;

        const effectiveLevel = isErrorStatus ? "ERROR" : level;

        if (!logErrorsOnly || isErrorStatus) {
          const logFn = effectiveLevel === "ERROR" ? console.error : console.log;

          logFn(`[${effectiveLevel}] ${new Date().toISOString()} ${req?.method} ${req?.url}`);
          logFn("→ body:", req?.body);
          logFn("→ result:", result);
          logFn("→ statusCode:", status);
          logFn("→ duration:", (performance.now() - start).toFixed(2) + "ms\n");
        }

        return result;
      } catch (err) {
        console.error(`[ERROR] ${new Date().toISOString()} ${req?.method} ${req?.url}`);
        console.error("→ error:", err.message);
        console.error("→ stack:", err.stack, "\n");
        throw err;
      }
    };
  };
}

module.exports = { log };
