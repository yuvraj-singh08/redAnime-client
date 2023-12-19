import React, { useState, useEffect } from 'react';
import CharCard from './CharCard';
import AnimeInfo from './AnimeInfo';
import { useParams } from 'react-router-dom';
import Reviews from '../Reviews/Reviews';

function AnimePage(props) {
  const { animeId } = useParams();

  const [characters, setCharacters] = useState([]);
  const [anime, setAnime] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/anime/${animeId}`)
      .then((res => res.json()))
      .then((data) => {
        setAnime(data[0]);
      })
      .catch((err) => console.error(err));
  }, [animeId]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/anime/${animeId}/characters`)
      .then((res) => res.json())
      .then((data) => {
        setCharacters(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, [animeId]);

  const flex = {
    display: 'flex',
    flexWrap: 'wrap',
    margin:'16px 4px',
  };

  return (
    <>
      <AnimeInfo name={anime.name} description={anime.para} imageSrc={`/images/${anime.src}`} />
      <div style={flex}  className="flex justify-evenly flex-wrap my-16 mx-4 ">
        {characters.length > 0 && characters.map((character) => (
          <CharCard
            key={character._id}
            heading={character.name}
            desc={character.description}
            src={`/images/${character.src}`}
          />
        ))}
      </div>
      <Reviews />
    </>
  );
}

export default AnimePage;
