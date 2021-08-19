import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={`b-1 border-red-200 w-screen h-screen`}>
      <Head>
        <title> EV-TF Project </title>
        <meta name="description" content="TensorFlow project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="relative opacity-70 bg-center bg-no-repeat bg-cover bg-fixed min-h-screen bg-mobilenet">
        <div className="h-screen flex flex-col justify-center items-center border-2 w-100% text-center text-xl tracking-wide uppercase">
          <div className="border-2 border-black bg-white bg-opacity-20 p-5 hover:bg-yellow-50 text-black font-bold cursor-pointer">
            <Link href="/mobilenet">
              <a>MobileNet Classifier</a>
            </Link>
          </div>
          <div>
            <section className="bg-white bg-opacity-50 my-4 p-4 text-center">
              <p>
                Classify different animals using the fast MobileNet model. You
                can try uploading pictures of your favorites like flamingos,
                sealions, snakes, or even triceratops!
              </p>
            </section>
          </div>
        </div>
      </div>

      <div className="relative opacity-70 bg-center bg-no-repeat bg-cover bg-fixed min-h-screen bg-rps">
        <div className="h-screen flex flex-col justify-center items-center border-2 w-100% text-center text-xl tracking-wide uppercase">
          <div className="border-2 border-black bg-white bg-opacity-20 p-5 hover:bg-yellow-50 text-black font-bold cursor-pointer">
            <Link href="/rps_classifier">
              <a>Rock-Paper-Scissors Classifier</a>
            </Link>
          </div>
          <div>
            <section className="bg-white bg-opacity-50 my-4 p-4 text-center">
              <p>
                Classify different hand gestures using the Rock-Paper-Scissors
                Convolutional Neural Network Model. You can try uploading
                pictures of your own hands as rock, paper, or scissors!
              </p>
            </section>
          </div>
        </div>
      </div>

      <div className="relative opacity-70 bg-center bg-no-repeat bg-cover bg-fixed min-h-screen bg-img1">
        <div className="h-screen flex flex-col justify-center items-center border-2 w-100% text-center text-xl tracking-wide uppercase">
          <span className="border-2 border-black bg-white bg-opacity-20 p-5 hover:bg-yellow-50 text-black font-bold cursor-pointer">
            <Link href="/regressor">
              <a>Price Regressor</a>
            </Link>
          </span>
          <div>
            <section className="bg-white bg-opacity-50 my-4 p-4 text-center">
              <p>SECTION TBD.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
