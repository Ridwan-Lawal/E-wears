import Link from "next/link";

function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b  flex items-center justify-center px-4 w-full">
      <div className="max-w-lg w-full  p-8 text-center">
        <h1 className="text-4xl font-bold text-blue-600">404</h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Oops! Page not found
        </h2>
        <p className="text-gray-600 mb-8">
          The page you&apos;re looking for doesn&apos;t seem to exist.
        </p>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-sm text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
