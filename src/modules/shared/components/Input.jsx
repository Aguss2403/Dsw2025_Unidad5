function Input({ label, error = '', ...restProps }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm sm:text-base font-medium text-gray-700">
        {label}:
      </label>
      <input
        className={`px-3 py-2 text-base border rounded-md transition ${
          error
            ? 'border-red-400 focus:ring-red-200'
            : 'border-gray-300 focus:ring-purple-200'
        } focus:outline-none focus:ring-2`}
        {...restProps}
      />
      {error && (
        <p className="text-xs sm:text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};

export default Input;
