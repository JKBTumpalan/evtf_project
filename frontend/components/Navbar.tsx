import Link from "next/link";
import { useRouter } from "next/router";

export const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="bg-white shadow dark:bg-gray-800">
      <div className="container flex items-center justify-center p-6 mx-auto text-gray-600 capitalize dark:text-gray-300">
        <Link href="/" passHref>
          <a
            className={`border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6 ${
              router.pathname === "/" ? `border-b-2 border-blue-500` : ``
            }`}
          >
            Home
          </a>
        </Link>

        <Link href="/mobilenet" passHref>
          <a
            className={`border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6 ${
              router.pathname === "/mobilenet"
                ? `border-b-2 border-blue-500`
                : ``
            }`}
          >
            Animal Classifier
          </a>
        </Link>

        <Link href="/rps_classifier" passHref>
          <a
            className={`border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6 ${
              router.pathname === "/rps_classifier"
                ? `border-b-2 border-blue-500`
                : ``
            }`}
          >
            RPS Classifier
          </a>
        </Link>

        <Link href="/regressor" passHref>
          <a
            className={`border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6 ${
              router.pathname === "/regressor"
                ? `border-b-2 border-blue-500`
                : ``
            }`}
          >
            Regressor
          </a>
        </Link>
      </div>
    </nav>
  );
};
