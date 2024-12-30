module.exports = {
  clearMocks: true,
  testEnvironment: "node",
  rootDir: "./",
  extensionsToTreatAsEsm: [".ts"],
  moduleFileExtensions: ["js", "ts"],
  preset: "ts-jest",
  testMatch: ["**/src/**/*.test.ts"]
};
