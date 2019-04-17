const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage(); // multer sotrage
const upload = multer({ storage });
const passport = require("passport");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("file"),
  (req, res) => {
    const { id: userId } = req.user.plain();

    /* GET FILE METADATA */
    const { originalname: name, size, buffer: content } = req.file;
    const stringContent = content.toString().trim();
    const {
      rowsCount,
      colCount,
      isValid,
      errorRows,
      itemsCount,
      idealItemsCount
    } = getFileProperties(stringContent);

    // push the file to storage pocket,
    // add the file metadata to the database

    res.json({
      rowsCount,
      colCount,
      isValid,
      errorRows,
      itemsCount,
      idealItemsCount,
      name,
      size
    });
  }
);

/*
    @fund: getFileProperties
    @desc: given a stringified csv content, should return it's properties (see @output)
    @input: file: String
    @output: object: object{ rowsCount: Int, colCount: Int, isValid: Boolean, errorRows: Array,
         itemsCount: Int, idealItemsCount: Int }
*/
getFileProperties = file => {
  let rows = [],
    rowsCount = 0,
    colCount = 0,
    itemsCount = 0,
    idealItemsCount = 0,
    errorRows = [],
    isValid = true;

  rows = file.split("\r\n");
  rowsCount = rows.length;
  colCount = rows[0].split(",").length;

  rows.forEach((row, i) => {
    let rowLength = row.split(",").length;
    itemsCount += rowLength;

    if (rowLength !== colCount) {
      errorRows.push(i);
      isValid = false;
    }
  });

  idealItemsCount = rowsCount * colCount;

  return {
    rowsCount,
    colCount,
    isValid,
    errorRows,
    itemsCount,
    idealItemsCount
  };
};

module.exports = router;
