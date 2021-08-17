import WebcamComponent from "../components/webcam";
import Head from "next/head";
import axios from "axios";
import React, { useState } from "react";

const MobileNet: React.FC = () => {
  const [url, setUrl] = useState<string>("");
  const [file, setFile] = useState<any | null>(null);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [inputState, setInputState] = useState<number>(-1);
  const [labels, setLabels] = useState<
    [{ probability: number; className: string }] | null
  >(null);

  const post_config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const classify_from_image = async () => {
    const formData = new FormData();

    formData.append("upload", file);

    try {
      await axios
        .post("http://localhost:9000/classify-image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => setLabels(response.data.classification))
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };
  const classify_from_url = async () => {
    const obj = {
      url: url,
    };

    console.log(obj);
    try {
      await axios
        .post("http://localhost:9000/classify-from-url", obj, post_config)
        .then((response) => {
          setLabels(response.data.classification);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files);
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
      setIsSelected(true);
      setInputState(0);
    } else {
      setInputState(-1);
      setIsSelected(false);
    }
  };

  const handleSubmit = () => {
    console.log("Submitting..");
    if (inputState !== -1) {
      if (inputState === 0) {
        //For file upload state

        classify_from_image();
      } else if (inputState === 1) {
        //For image link state
        classify_from_url();
      }
    }
  };

  return (
    <div>
      <Head>
        <title> EV-TF Project </title>
        <meta name="description" content="TensorFlow project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="flex flex-col justify-center items-center mx-auto w-screen p-4">
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 my-6">
            Animal Classifier (MobileNet)
          </h1>
          <section className="bg-white dark:bg-gray-800">
            <div className="px-6 py-16 mx-auto text-center border-2">
              <p className="max-w-md mx-auto mt-5 text-gray-500 dark:text-gray-400">
                Upload your image or input an image link in the input forms.
              </p>

              <div className="flex flex-col mt-8 space-y-3 sm:space-y-0 sm:flex-row sm:justify-center sm:-mx-2">
                {[-1, 0].includes(inputState) && (
                  <input
                    type="file"
                    id="input"
                    className="px-4 pt-3 pb-2 text-gray-700 bg-white border border-gray-300 rounded-md sm:mx-2 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    onChange={handleFileChange}
                  ></input>
                )}
                {[-1, 1].includes(inputState) && (
                  <input
                    id="link"
                    type="text"
                    className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md sm:mx-2 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    placeholder="Image link"
                    onChange={(e) => {
                      setUrl(e.target.value);
                      setInputState(1);
                      if (e.target.value === "") {
                        setInputState(-1);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSubmit();
                      }
                    }}
                  ></input>
                )}

                <button
                  className="px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-indigo-700 rounded-md sm:mx-2 hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                  onClick={handleSubmit}
                >
                  Classify Image
                </button>
              </div>
            </div>
            {isSelected ? (
              <div className="px-6 py-16 mx-auto text-center border-2">
                <img src={URL.createObjectURL(file)}></img>
                <p>Filename: {file.name}</p>
                <p>Filetype: {file.type}</p>
                <p>Size in bytes: {file.size}</p>
                <p>
                  lastModifiedDate: {file.lastModifiedDate.toLocaleDateString()}
                </p>
              </div>
            ) : (
              <></>
            )}
            {labels && (
              <div>
                {labels.map((label) => {
                  return (
                    <div>
                      This picture is {(label.probability * 100).toFixed(2)}%{" "}
                      {label.className}!
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default MobileNet;
