function NotFound() {
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
            <div className="max-w-md text-center">
                <h1 className="text-4xl font-bold text-gray-800">Oops! Looks like you're lost.</h1>
                <p className="mt-4 text-gray-600">The page you're looking for could not be found.</p>
                <div className="mt-6 flex justify-center space-x-4">
                    <a href="/" className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-700">Go to Homepage</a>
                    <a href="#" className="px-4 py-2 rounded-md border border-gray-400 hover:bg-gray-200">Search Our Site</a>
                </div>
            </div>
        </div>
    )
}

export default NotFound;