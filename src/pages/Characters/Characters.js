import { useEffect, useState } from "react";
import { Link } from "react-router";
import styles from "./Characters.module.css";

function Characters() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch(
      `https://rickandmortyapi.com/api/character/?page=${page}&name=${searchQuery}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.results) {
          setCharacters(data.results);
        } else {
          setCharacters([]);
        }
      });
  }, [page, searchQuery]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
    if (page === 42) {
      setPage(1);
    }
  };
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    if (searchQuery === "") {
      setPage(1);
    }
  };
  //const filteredCharacters = characters.filter((character) =>
  //  character.name.toLowerCase().includes(searchQuery.toLowerCase())
  //);

  return (
    <div className={styles.characters}>
      <h1>Characters</h1>
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={handleSearchChange}
      />
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
      <button onClick={handleLoadMore}>Load More</button>
      <p>Page: {page} of 42</p>
    </div>
  );
}

export default Characters;
