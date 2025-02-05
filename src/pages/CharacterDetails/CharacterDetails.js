import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import styles from "./CharacterDetails.module.css";

function CharacterDetails() {
  const { id } = useParams(); // Get the character ID from the URL
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    // Fetch character details from the API
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then((response) => response.json())
      .then((data) => setCharacter(data));
  }, [id]);

  if (!character) {
    return <div>Loading...</div>; // Show a loading message while fetching data
  }

  return (
    <div className={styles.details}>
      <h1>{character.name}</h1>
      <img src={character.image} alt={character.name} />
      <div className={styles.info}>
        <p>
          <strong>Status:</strong> {character.status}
        </p>
        <p>
          <strong>Species:</strong> {character.species}
        </p>
        <p>
          <strong>Gender:</strong> {character.gender}
        </p>
        <p>
          <strong>Origin:</strong> {character.origin.name}
        </p>
        <p>
          <strong>Location:</strong> {character.location.name}
        </p>
      </div>
      <Link to="/characters" className={styles.backButton}>
        Back to Characters
      </Link>
    </div>
  );
}

export default CharacterDetails;
