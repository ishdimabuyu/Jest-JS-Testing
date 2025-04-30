function updateUserEmail(userId, newEmail) {
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

  return new Promise(async (resolve, reject) => {
    const user = database[userId];
    if (!user) {
      return reject(new Error("User not found"));
    }

    // Check if the new email already exists for another user (assuming 1:1 relationship)
    for (const id in database) {
      if (id !== String(userId) && database[id].email === newEmail) {
        return reject(new Error("Email address already exists"));
      }
    }

    user.email = newEmail;
    resolve(user);
  });
}

async function runEmailUpdate() {
  try {
    // 'await' pauses execution until the promise resolves
    const updatedUser = await updateUserEmail(1, "jd@example.com");
    console.log("Email update successful:", updatedUser);
  } catch (error) {
    // Catches any rejection from the awaited promise
    console.error("Email update failed:", error.message);
  }
}

console.log("Attempting email update...");
runEmailUpdate(); // Call the async function
