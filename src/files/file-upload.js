const fs = require("fs");
const nodePath = require("path")

module.exports = (path, filename, cb) => {
  const ext = nodePath.extname(path) 
  const validExts = ['jpg', 'jpeg', 'png'] 
  const isExtValid = validExts.includes(ext.substring(1))
  if(isExtValid) {
    const savingFilePath = `./src/assets/images/${filename}${ext}`;
    fs.createReadStream(path)
      .pipe(fs.createWriteStream(savingFilePath))
      .on("finish", () => {
        cb(null, savingFilePath);
      });
  } else {
    const error = new Error("A extensão do arquivo é inválida")
    cb(error)
  }
};
