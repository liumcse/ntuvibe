const tsPreset = require("ts-jest/jest-preset");
const mongodbPreset = require("@shelf/jest-mongodb/jest-mongodb-config");

module.exports = {
  ...tsPreset,
  ...mongodbPreset,
};
