const functions = require("firebase-functions");
const admin = require("firebase-admin");
const Busboy = require("busboy");

admin.initializeApp();

exports.uploadFile = functions.https.onRequest((req, res) => {
  const busboy = new Busboy({headers: req.headers});
  let fileBuffer;
  let fileName;

  busboy.on("file", (fieldname, file, filename) => {
    fileName = filename;
    fileBuffer = [];
    file.on("data", (data) => {
      fileBuffer.push(data);
    });
    file.on("end", () => {
      const buffer = Buffer.concat(fileBuffer);
      const bucket = admin.storage().bucket();
      const fileUpload = bucket.file(fileName);

      fileUpload.save(buffer, {contentType: file.mimetype})
          .then(() => {
            res.status(200).send(`File uploaded to Firebase Storage:
                 ${fileName}`);
          })
          .catch((error) => {
            res.status(500).send(`Error uploading file: ${error}`);
          });
    });
  });
  busboy.end(req.rawBody);
});
