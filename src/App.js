import React from 'react';
import Card from './components/Card';
import { useEffect, useState } from 'react';

function App() {
    const [animeList, setAnimeList] = useState([]);
    // console.log("id");
    // const id = localStorage.getItem('id');
    // console.log(id);

    useEffect(() => {

        fetch(`${process.env.REACT_APP_API_URL}/api/allAnime`)
            .then(res => res.json())
            .then(data => {
                const animeList = data.map((anime, index) => ({ ...anime, key: index }));
                setAnimeList(animeList);
            })
            .catch(err => console.log(err));

    }, []);

    const card_container = {
        display:'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        margin: '4px 16px',
        padding: '5px 30px',
    }

    return (
        <>
            <div style={card_container}>
                {
                    animeList.length > 0 && animeList.map((data) => {
                        return (<Card type="anime" id={data._id} key={data._id} title={data.name} desc={data.description} imgSrc={`/images/${data.src}`} />)
                    })
                }
            </div>
        </>
    );
}

export default App;