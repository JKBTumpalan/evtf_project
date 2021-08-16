const express = require("express");
const app = express();

const tf = require("@tensorflow/tfjs-node");
const mobilenet = require("@tensorflow-models/mobilenet");
const formidable = require("formidable");
const image = require("get-image-data");

const http = require("http");

const server = http.createServer(app);

app.post("/classify-image", (req, res) => {
  let mainClassiferUploader = new formidable.IncomingForm({
    maxFileSize: 10485760,
  });

  mainClassiferUploader.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500).send("Upload error.");
    } else {
      classify(files.upload.path)
        .then((predictedClass) => {
          res.status(200).send({
            classification: predictedClass,
          });
        })
        .catch((err) => res.status(500).send("Upload error"));
    }
  });
});

app.post("/classify-from-url", async (req, res) => {
  classify(req.body.url)
    .then((predictedClass) => {
      res.status(200).send({
        classification: predictedClass,
      });
    })
    .catch((err) => res.status(500).send("Download/URL error."));
});

function classify(url) {
  return new Promise((resolve, reject) => {
    image(url, async (err, image) => {
      if (err) {
        reject(err);
      } else {
        const channelCount = 3;
        const pixelCount = image.width * image.height;
        const vals = new Int32Array(pixelCount * channelCount);

        let pixels = image.data;

        for (let i = 0; i < pixelCount; i++) {
          for (let j = 0; j < channelCount; j++) {
            vals[i * channelCount + j] = pixels[i * 4 + j];
          }
        }

        const outputShape = [image.height, image.width, channelCount];

        //@ts-ignore
        const input = tf.tensor3d(vals, outputShape, "int32");

        const mobilenet_model = await mobilenet.load();

        let pred = await mobilenet_model.classify(input);

        resolve(pred);
      }
    });
  });
}

const port = process.env.PORT || 9000;

server.listen(port, (req, res) => {
  console.log(`Server is up and running @ port ${port}`);
});
