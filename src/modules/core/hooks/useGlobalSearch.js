import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';

const useGlobalSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();


  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

  useEffect(() => {
    setSearchTerm(searchParams.get('search') || '');
  }, [searchParams]);

  const handleSearch = (term) => {
    const value = term !== undefined ? term : searchTerm;
    if (!value.trim()) {
      searchParams.delete('search');
      setSearchParams(searchParams);
      return;
    }

    if (location.pathname !== '/') {
      navigate(`/?search=${encodeURIComponent(value)}`);
    } else {
      setSearchParams({ search: value });
    }
  };

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