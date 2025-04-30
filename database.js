async function fetchUserData(userId) {
  // Simulated database data
  const database = {
    1: {
      username: "johndoe",
      password: "123456",
      name: "John Doe",
      email: "johndoe@example.com",
    },
    2: {
      username: "janedoe",
      password: "abcdef",
      name: "Jane Doe",
      email: "janedoe@example.com",
    },
  };
  return new Promise((resolve, reject) => {
    const user = database[userId];
    if (user) {
      resolve(user);
    } else {
      reject(new Error("User not found"));
    }
  });
}

module.exports = fetchUserData;
