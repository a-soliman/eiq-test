const { instances } = require("gstore-node");

// Retrive the gstore instance
const gstore = instances.get("00002");
const { Schema } = gstore;

const fileSchema = new Schema({
  userId: {
    type: String
  },
  rowsCount: {
    type: Number
  },
  colCount: {
    type: Number
  },
  errorRows: {
    default: []
  },
  idealItemsCount: {
    type: Number
  },
  isValid: {
    type: Boolean
  },
  itemsCount: {
    type: Number
  },
  name: {
    type: String
  },
  fileURL: {
    type: String
  },
  size: {
    type: Number
  }
});

module.exports = gstore.model("File", fileSchema);
