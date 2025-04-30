const fetchUserData = require("../database.js");

describe("fetchUserData", () => {
  it("should resolve with user data if the username exists (based on userId)", async () => {
    const userId = 1;
    const userData = await fetchUserData(userId);
    expect(userData).toBeDefined();
    expect(userData.username).toBe("johndoe");
  });

  it("should reject with an error if the user ID does not exist", async () => {
    const userId = 99;
    await expect(fetchUserData(userId)).rejects.toThrow("User not found");
  });

  it("should resolve with the correct password for a specific user ID", async () => {
    const userId = 1;
    const userData = await fetchUserData(userId);
    expect(userData.password).toBe("123456");
  });

  it("should resolve with the correct username for a specific user ID", async () => {
    const userId = 2;
    const userData = await fetchUserData(userId);
    expect(userData.username).toBe("janedoe");
  });

  it("should resolve with the correct name for a specific user ID", async () => {
    const userId = 1;
    const userData = await fetchUserData(userId);
    expect(userData.name).toBe("John Doe");
  });

  it("should resolve with the correct email for a specific user ID", async () => {
    const userId = 2;
    const userData = await fetchUserData(userId);
    expect(userData.email).toBe("janedoe@example.com");
  });
});
