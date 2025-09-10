import { Link, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
            <h1 className="text-5xl font-bold text-red-600 mb-4">Oops!</h1>
            <p className="text-xl text-gray-700 mb-2">Sorry, an unexpected error has occurred.</p>
            <p className="text-md text-gray-500 mb-6">
                <i>{error.statusText || error.message}</i>
            </p>
            <Link to="/" className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors">
                Go Back Home
            </Link>
        </div>
    );
}