import { useEffect, useState } from "react";
import { Link } from "react-router";
import styles from "./Characters.module.css";

function Characters() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [species, setSpecies] = useState("all");
  // const [species, setSpecies] = useState("all");

  useEffect(() => {
    const speciesQuery = species === "all" ? "" : species;
    fetch(
      `https://rickandmortyapi.com/api/character/?page=${page}&name=${searchQuery}&species=${speciesQuery}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.results) {
          setCharacters(data.results);
        } else {
          setCharacters([]);
        }
      });
  }, [page, searchQuery, species]);

  const handleLoadMore = () => {
    setPage((nextPage) => (nextPage === 42 ? 1 : nextPage + 1));
  };
  const handleLoadBack = () => {
    setPage((prevPage) => (prevPage === 1 ? 42 : prevPage - 1));
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    if (searchQuery === "") {
      setPage(1);
    }
  };

  const handleSpeciesChange = (event) => {
    setSpecies(event.target.value);
  };
  // const filteredCharacters = characters.filter((character) =>
  //  character.name.toLowerCase().includes(searchQuery.toLowerCase())
  //);

  return (
    <div className={styles.characters}>
      <h1>Characters</h1>
      <div>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <select value={species} onChange={handleSpeciesChange}>
          <option value="">All</option>
          <option value="human">Human</option>
          <option value="alien">Alien</option>
          <option value="robot">Robot</option>
        </select>
      </div>
      <ul>
        {characters.length > 0 ? (
          characters.map((character) => (
            <li key={character.id}>
              <Link to={`/characters/${character.id}`}>
                <img src={character.image} alt={character.name} />
                <h2>{character.name}</h2>
              </Link>
            </li>
          ))
        ) : (
          <p>No Characters Found</p>
        )}
      </ul>
      <button onClick={handleLoadBack}>Back</button>
      <button onClick={handleLoadMore}>Next</button>
      <p>Page: {page} of 42</p>
    </div>
  );
}

export default Characters;

// In the above code, we have a Characters component that fetches data from the Rick and Morty API and displays a list of characters.
// The component has a search input and a select input to filter the characters by name and species. The component also has a "Load More" button to load more characters from the API.
// The component uses the useState and useEffect hooks to manage state and side effects.
// The component also uses the Link component from react-router to navigate to the CharacterDetails component when a character is clicked. The component uses CSS modules for styling.
