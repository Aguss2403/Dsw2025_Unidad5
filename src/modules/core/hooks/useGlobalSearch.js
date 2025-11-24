import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';

const useGlobalSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  // 1. Estado local para el input (lo que el usuario escribe en tiempo real)
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

  // 2. Sincronizar el estado local si la URL cambia externamente (ej: botones atrás/adelante)
  useEffect(() => {
    setSearchTerm(searchParams.get('search') || '');
  }, [searchParams]);

  // 3. Función para ejecutar la búsqueda
  const handleSearch = (term) => {
    const value = term !== undefined ? term : searchTerm; // Permite pasar un término opcional o usar el estado

    // Si el término está vacío, eliminamos el parámetro de la URL
    if (!value.trim()) {
      searchParams.delete('search');
      setSearchParams(searchParams);
      return;
    }

    // Si NO estamos en la página principal, redirigimos a ella con la búsqueda
    if (location.pathname !== '/') {
      navigate(`/?search=${encodeURIComponent(value)}`);
    } else {
      // Si ya estamos en la home, solo actualizamos la URL
      setSearchParams({ search: value });
    }
  };

  // 4. Manejador para el evento del input (mantiene el input reactivo)
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return {
    searchTerm,
    handleInputChange,
    handleSearch
  };
};

export default useGlobalSearch;