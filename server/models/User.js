const { instances } = require("gstore-node");

// Retrive the gstore instance
const gstore = instances.get("00002");
const { Schema } = gstore;

const userSchema = new Schema({
  id: {
    type: String
  },
  name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  avatar: {
    type: String
  },
  date: {
    default: gstore.defaultValues.NOW
  }
});

module.exports = gstore.model("User", userSchema);
