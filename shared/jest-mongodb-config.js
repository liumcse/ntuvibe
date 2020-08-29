/** @fileoverview Configuration of an in-memory mongodb server. */

module.exports = {
  mongodbMemoryServerOptions: {
    binary: {
      version: "4.2.8",
      skipMD5: true,
    },
    autoStart: false,
    instance: {},
  },
};
