const path = require("path");
const DataURIParser = require("datauri/parser");
const getDataUri = (file) => {
  const parser = new DataURIParser();
  const extName = path.extname(file.originalname).toString();
  console.log(extName);
  return parser.format(extName, file.buffer);
};
module.exports = { getDataUri };
