const fs = require("fs");
const path = require("path");

const nextFolder = path.join(__dirname, ".next");

fs.rm(nextFolder, { recursive: true, force: true }, (err) => {
  if (err) {
    console.error("Failed to delete .next folder:", err);
  } else {
    console.log(".next folder deleted successfully.");
  }
});
