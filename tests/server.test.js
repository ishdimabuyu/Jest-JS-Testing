const axios = require("axios");
const app = require("../server.js");

/*
  All tests within this suite:
  1. Test if apiKey exists
  2. Test if empty apiKey will return error message "Unauthorized: API key is missing"
  3. Test if apiKey is invalid will return error message "Unauthorized: Invalid API key"
*/

const TEST_PORT = 8080; // Use a different port for testing to avoid conflicts
const API_ENDPOINT = `http://localhost:${TEST_PORT}/api/secure-data`;

let testServer;

beforeAll((done) => {
  testServer = app.listen(TEST_PORT, () => {
    console.log(`Test server running at http://localhost:${TEST_PORT}`);
    done();
  });
});

afterAll((done) => {
  testServer.close(done);
});

describe("API Tests", () => {
  it("should return the secure data when a valid API key is provided", async () => {
    try {
      const response = await axios.get(API_ENDPOINT, {
        headers: {
          "x-api-key": "valid-api-key",
        },
      });
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty("secureData");
      expect(response.data.secureData).toHaveProperty("id", 1);
      expect(response.data.secureData).toHaveProperty(
        "message",
        "This is confidential information."
      );
    } catch (error) {
      // Fail the test if there's an unexpected error
      expect(error).toBeNull();
    }
  });

  it("should return an 'Unauthorized: API key is missing' error when no API key is provided", async () => {
    try {
      await axios.get(API_ENDPOINT);
    } catch (error) {
      expect(error.response.status).toBe(401);
      expect(error.response.data).toHaveProperty(
        "error",
        "Unauthorized: API key is missing"
      );
    }
  });

  it("should return an 'Unauthorized: Invalid API key' error when an invalid API key is provided", async () => {
    try {
      await axios.get(API_ENDPOINT, {
        headers: {
          "x-api-key": "invalid-key",
        },
      });
    } catch (error) {
      expect(error.response.status).toBe(401);
      expect(error.response.data).toHaveProperty(
        "error",
        "Unauthorized: Invalid API key"
      );
    }
  });
});
