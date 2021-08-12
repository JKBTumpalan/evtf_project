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

        <Link href="/classifier1" passHref>
          <a
            className={`border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6 ${
              router.pathname === "/classifier1"
                ? `border-b-2 border-blue-500`
                : ``
            }`}
          >
            Classifier
          </a>
        </Link>

        <Link href="/classifier2" passHref>
          <a
            className={`border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6 ${
              router.pathname === "/classifier2"
                ? `border-b-2 border-blue-500`
                : ``
            }`}
          >
            Classifier 2
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
