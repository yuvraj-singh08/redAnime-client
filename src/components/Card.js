import React from "react";
import "./css/Card.css"
import { Link } from "react-router-dom";
import { showNotification } from "../functions/functions";

function Card(props) {
  const id = localStorage.getItem('id');
  const anime = props.id
  async function addToWatchList(e) {
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/addWatchList`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id, anime: anime })
    });
    const data = await response.json();
    console.log(data);
    if(data.message){
      showNotification("Successfully added to watch list");
    }
  }
  // console.log(props)
  return (
      <div className="card">
        <div className="circle"></div>
        <div className="content">
          <h1>{props.title}</h1>
          <p className="card-desc">{props.desc} </p>
          {
            (props.type === 'watch') &&
            <>
              <Link to={`/anime/${props.id}`}>
                READ MORE
              </Link>
            </>
          }
          {(props.type === "anime") &&
            <>
              <Link to={`/anime/${props.id}`}>
                READ MORE
              </Link>
              <button  onClick={addToWatchList}>+WatchList</button>
            </>
          }


        </div>
        <img src={props.imgSrc} alt="" />
      </div>

  );
}

export default Card;
