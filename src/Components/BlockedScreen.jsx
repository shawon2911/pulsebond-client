

const BlockedScreen = () => {
    return (
    <div className=" flex  justify-center mt-5 md:mt-20  px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg shadow-red-300 p-8 text-center border border-red-100">
        
        {/* Warning Icon Banner */}
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-50 text-crimson mb-6 animate-pulse">
          <svg
            className="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-800 mb-3 tracking-tight">
          Account Temporarily Blocked
        </h2>

        {/* Description */}
        <p className="text-gray-600 mb-6 text-sm leading-relaxed">
          Your account has been restricted from performing this action. You cannot create any new requests or access features at this moment.
        </p>

        {/* Warning Badge/Notice */}
        <div className="bg-amber-50 rounded-xl p-4 mb-6 border border-amber-200">
          <p className="text-xs text-maroon font-medium leading-5">
            🔒 Reason: Violation of community guidelines or pending verification.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button 
            onClick={() => window.location.reload()} 
            className="w-full bg-crimson hover:bg-crimson-dark text-white font-semibold py-3 px-4 rounded-xl transition duration-200 shadow-md shadow-red-100 text-sm"
          >
            Check Again / Refresh
          </button>
          
          <a
            href="mailto:support@yourdomain.com"
            className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-xl transition duration-200 text-sm"
          >
            Contact Support
          </a>
        </div>

        {/* Footer info */}
        <p className="text-xs text-gray-400 mt-6">
          If you think this is a mistake, please reach out to our team.
        </p>
      </div>
    </div>
  );
};

export default BlockedScreen;