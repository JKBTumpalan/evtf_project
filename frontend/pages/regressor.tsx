import Head from "next/head";

const Regressor: React.FC = () => {
  return (
    <div>
      <Head>
        <title> EV-TF Project </title>
        <meta name="description" content="TensorFlow project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex flex-col justify-center items-center mx-auto w-screen p-4">
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">
            Price Regressor
          </h1>
          TBD
        </div>
      </main>
    </div>
  );
};

export default Regressor;
