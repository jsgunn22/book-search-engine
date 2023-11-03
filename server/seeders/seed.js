const db = require("../config/connection");
const { User } = require("../models");
const userSeeds = require("./users.json");

db.once("open", async () => {
  try {
    await User.create(userSeeds);
    console.log("all done");
    process.exit(0);
  } catch (error) {
    throw error;
  }
});
