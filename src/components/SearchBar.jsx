import React from 'react';

function SearchBar({ search, setSearch }) {
  return (
    <input
      className="border p-2 rounded w-full"
      placeholder="Buscar tarea..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}

export default SearchBar;

