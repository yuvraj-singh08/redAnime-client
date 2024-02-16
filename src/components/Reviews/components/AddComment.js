import { useState, useEffect } from 'react';
import './css/AddComment.css';
import { useParams } from 'react-router-dom';

function AddComment() {
    const [comment, setComment] = useState('');
    const [user, setUser] = useState({
        name: "Unknown User",
        imgSource: "No Image Source",
    });
    const { animeId } = useParams();

    useEffect(() => {
        async function getComments() {
            const request = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    _id: localStorage.getItem('id')
                }),
            };

            await fetch(`${process.env.REACT_APP_API_URL}/api/getUser`, request)
                .then(response => response.json())
                .then((data) => {
                    setUser(data[0]);
                    console.log(data);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
        getComments();
    }, []);

    function addComment(e) {
        e.preventDefault();
        const reqData = {
            comment: comment,
            anime: animeId,
            user: localStorage.getItem('id')
        }
        const request = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reqData),
        }
        fetch(`${process.env.REACT_APP_API_URL}/api/addComment`, request)
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                if (data.status === 'success') {
                    //Update Comments
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

    function handleChange(e) {
        setComment(e.target.value);
    }
    return <>
        <div className="comment">
            <div class="circle-container">
                <img src={`/images/${user.imgSource}`} alt="" className="circle-image" />
            </div>
            <div className='input-container'>
                <input type='text' placeholder='Add a comment...' value={comment} onChange={handleChange} className='comment-input'></input>
            </div>
            <div className='button-container'>
                <button>Cancel</button>
                <button type='button' onClick={addComment}>Comment</button>
            </div>

        </div> : <div></div>
    </>
}

export default AddComment;