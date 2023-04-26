const multer = require("multer");

const fileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif)$/)) {
    return cb(
      new Error("Only images are allowed. [jpg|JPG|jpeg|JPEG|png|PNG|gif]")
    );
  }

  cb(undefined, true);
};

// Default file size = 2MB
// Default filed name size = 300
const upload = (
  dest = undefined,
  { fileSize = 2 * 1024 * 1024, fieldNameSize = 300 }
) =>
  multer({
    dest,
    fileFilter,
    limits: {
      fileSize,
      fieldNameSize,
    },
  });

exports.avatarUploader = upload(undefined, {
  fileSize: 2 * 1024 * 1024,
  fieldNameSize: 300,
});
