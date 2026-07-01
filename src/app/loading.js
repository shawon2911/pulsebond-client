

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-red-100"></div>
          <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-crimson border-t-transparent animate-spin"></div>
        </div>

        {/* Text */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800">
            Loading...
          </h3>
          <p className="text-sm text-gray-500">
            Please wait while we prepare your content.
          </p>
        </div>
      </div>
    </div>
  );
} 