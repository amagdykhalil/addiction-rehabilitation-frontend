import { ROUTES } from "@/shared/routes";
import { Link } from "react-router-dom";

export const PageNotFound = () => {
  return (
    <section className="flex items-center h-full p-16 ">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl ">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">
            Sorry, we couldn't find this page.
          </p>
          <p className="mt-4 mb-8 dark:text-gray-600">
            But dont worry, you can find plenty of other things on our homepage.
          </p>
          <Link
            to={ROUTES.HOME}
            className="px-8 py-3 font-semibold rounded bg-violet-400"
          >
            Back to homepage
          </Link>
        </div>
      </div>
    </section>
  );
};
