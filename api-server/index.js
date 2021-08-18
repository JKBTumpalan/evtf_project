const express = require("express");
const app = express();

const tf = require("@tensorflow/tfjs-node");
const mobilenet = require("@tensorflow-models/mobilenet");
const formidable = require("formidable");
const image = require("get-image-data");
const cors = require("cors");

const http = require("http");

const server = http.createServer(app);
app.use(express.json({ limit: "50mb" }));
app.use(cors());

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
  console.log(req.body.url);
  classify(req.body.url)
    .then((predictedClass) => {
      res.status(200).send({
        classification: predictedClass,
      });
      console.log(predictedClass);
    })
    .catch((err) => res.status(500).send("Download/URL error."));
});

app.post("/rps-classify-image", (req, res) => {
  let mainClassiferUploader = new formidable.IncomingForm({
    maxFileSize: 10485760,
  });

  mainClassiferUploader.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500).send("Upload error.");
    } else {
      rps_classify(files.upload.path)
        .then((RPSLabelProbabilities) => {
          res.status(200).send({
            classification: RPSLabelProbabilities,
          });
        })
        .catch((err) => res.status(500).send("Upload error"));
    }
  });
});

app.post("/rps-classify-from-url", async (req, res) => {
  rps_classify(req.body.url)
    .then((RPSLabelProbabilities) => {
      res.status(200).send({
        classification: RPSLabelProbabilities,
      });
    })
    .catch((err) => res.status(500).send("Download/URL error."));
});

function classify(url) {
  console.log(url);
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

function rps_classify(url) {
  console.log(url);
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
        const resized_input = tf.image.resizeBilinear(input, [150, 150]);

        const reshaped_input = resized_input.expandDims(0);

        const rps_model = await tf.loadLayersModel(
          "file://rpsmodel/model.json"
        );

        let pred = rps_model.predict(reshaped_input, { batchSize: 10 });

        //@ts-ignore
        resolve(pred.dataSync());
      }
    });
  });
}

const port = process.env.PORT || 9000;

server.listen(port, (req, res) => {
  console.log(`Server is up and running @ port ${port}`);
});
