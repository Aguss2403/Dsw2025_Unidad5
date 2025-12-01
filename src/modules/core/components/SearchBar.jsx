function SearchBar({ value, onChange, onSearch, className }) {
  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        className="w-full bg-white border border-gray-300 rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        placeholder="Buscar..."
        value={value}
        onChange={onChange}
        onKeyDown={(e) => e.key === 'Enter' && onSearch()}
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
  );
}
export default SearchBar;