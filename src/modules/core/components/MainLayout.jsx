import { useState } from "react";
import Header from "./Header";

function MainLayout({ children }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    console.log("Buscando:", searchTerm);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Header fijo o sticky */}
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={handleSearch}
      />

      {/* Contenido Principal Dinámico */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer (Opcional) */}
      <footer className="bg-white border-t border-gray-200 py-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Unidad 5 - Store
      </footer>
    </div>
  );
}

export default MainLayout;
