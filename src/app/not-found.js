import Link from "next/link";


const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
            <div className="text-center max-w-lg">
                {/* 404 */}
                <h1 className="text-8xl md:text-9xl font-extrabold text-crimson">
                    404
                </h1>

                {/* Title */}
                <h2 className="mt-4 text-3xl font-bold text-gray-800">
                    Page Not Found
                </h2>

                {/* Description */}
                <p className="mt-3 text-gray-600 leading-relaxed">
                    Sorry, the page you're looking for doesn't exist or has been
                    moved. Let's get you back on track.
                </p>

                {/* Button */}
                <div className="mt-8">
                    <Link
                        href={"/"}
                        className="inline-flex items-center gap-2 bg-crimson hover:bg-crimson-dark text-white font-medium px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                        ← Back to Home
                    </Link>
                </div>

                {/* Decorative Element */}
                <div className="mt-10 flex justify-center">
                    <div className="w-24 h-1 bg-crimson rounded-full"></div>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;