// Mock the database pool for all tests
jest.mock("../src/db/init", () => ({
  pool: {
    query: jest.fn(),
  },
}));

// Clean up after all tests
afterAll(async () => {
  jest.clearAllMocks();
});
