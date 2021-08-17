import Head from "next/head";

const RPSClassifier: React.FC = () => {
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
            Rock, Paper, Scissors Classifier (CNN Model)
          </h1>
          <section className="bg-white dark:bg-gray-800">
            <div className="max-w-3xl px-6 py-16 mx-auto text-center border-2">
              <p className="max-w-md mx-auto mt-5 text-gray-500 dark:text-gray-400">
                Upload your image or input an image link in the input forms.
              </p>

              <div className="flex flex-col mt-8 space-y-3 sm:space-y-0 sm:flex-row sm:justify-center sm:-mx-2">
                <input
                  type="file"
                  id="input"
                  className="px-4 pt-3 pb-2 text-gray-700 bg-white border border-gray-300 rounded-md sm:mx-2 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                ></input>
                <input
                  id="link"
                  type="text"
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md sm:mx-2 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  placeholder="Image link"
                ></input>

                <button className="px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-indigo-700 rounded-md sm:mx-2 hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
                  Classify Image
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default RPSClassifier;
