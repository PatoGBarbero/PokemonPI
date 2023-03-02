import React from "react";

export default function Paginado({
  pokemosPerPage,
  allPokemons,
  settingCurrentPage,
  currentPage,
}) {
  const pageNumber = [];

  for (let i = 0; i < Math.ceil(allPokemons / pokemosPerPage); i++) {
    pageNumber.push(i + 1);
  }

  return (
    <nav>
      {pageNumber &&
        pageNumber.map((number, pos) => (
          <button
            key={pos}
            className={
              currentPage === number
                ? "currentPage cursorPointer"
                : "page cursorPointer"
            }
            onClick={() => settingCurrentPage(number)}
          >
            {number}
          </button>
        ))}
    </nav>
  );
}
