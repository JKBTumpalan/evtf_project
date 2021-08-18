import Head from "next/head";
import axios from "axios";
import { useState } from "react";

const RPSClassifier: React.FC = () => {
  const [url, setUrl] = useState<string>("");
  const [file, setFile] = useState<any | null>(null);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [inputState, setInputState] = useState<number>(-1);
  const [labels, setLabels] = useState<{ classification: {} } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
        .post("http://localhost:9000/rps-classify-image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          setIsLoading(false);
          setLabels(response.data.classification);
        })
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
        .post("http://localhost:9000/rps-classify-from-url", obj, post_config)
        .then((response) => {
          setIsLoading(false);
          setLabels(response.data.classification);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLabels(null);
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
    setIsLoading(true);
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

  const getMax = (a: number, b: number, c: number) => {
    const probabilityArray: number[] = [a, b, c];

    return probabilityArray.indexOf(Math.max(...probabilityArray));
  };
  const responseOutput = (res: any) => {
    //Get maximum probability
    // 0 = paper, 1 = rock, 2 = scissors

    const labels = ["Paper", "Rock", "Scissors"];

    return labels[getMax(res["0"], res["1"], res["2"])];
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
            Rock, Paper, Scissors Classifier (CNN)
          </h1>
          <section className="bg-white dark:bg-gray-800">
            <div className="px-6 py-16 mx-auto text-center">
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
                  className={`px-4 py-2 col text-sm font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-indigo-700 rounded-md sm:mx-2 hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600 ${
                    isLoading || inputState === -1 ? "opacity-50" : ""
                  }`}
                  onClick={handleSubmit}
                  disabled={inputState === -1}
                >
                  {isLoading ? "Processing" : "Classify Image"}
                </button>
              </div>
            </div>
            {isLoading ? (
              <div className="flex items-center justify-center mb-10">
                <div className="w-12 h-12 border-l-4 border-gray-900 rounded-full animate-spin"></div>
              </div>
            ) : (
              <></>
            )}
            {labels && (
              <div className="px-5  text-center border-b-2 pb-5">
                <h4 className="tracking-wide text-xl"> This picture is a </h4>
                <h2 className="text-7xl font-extrabold tracking-wide text-blue-600">
                  {responseOutput(labels)}
                </h2>
                {inputState === 1 ? (
                  <div className="px-6 py-16 mx-auto text-center font-mono">
                    <img src={url} className="max-w-lg"></img>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            )}
            {isSelected ? (
              <div className="px-6 py-16 mx-auto text-center text-md font-mono">
                <img src={URL.createObjectURL(file)} className="max-w-lg"></img>
                <div className="pt-4">
                  <p>Filename: {file.name}</p>
                  <p>Filetype: {file.type}</p>
                  <p>Size in bytes: {file.size}</p>
                  <p>
                    Last modified: {file.lastModifiedDate.toLocaleDateString()}
                  </p>
                </div>
              </div>
            ) : (
              <></>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default RPSClassifier;
