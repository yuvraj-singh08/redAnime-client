import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './css/Navbar.css';


const Navbar = () => {
    const [loginStatus, setLoginStatus] = useState(false);
    const navigate = useNavigate();


    function redirect() {
        navigate('/login');
    }

    useEffect(() => {
        const status = localStorage.getItem("sessionToken");
        if (status) {
            console.log("Logged in");
            setLoginStatus(true);
        }
        else {
            logout();
        }
    }, []);

    function logout() {
        localStorage.removeItem("sessionToken");
        setLoginStatus(false);
        redirect();
    }

    const menu_style = {
        display: 'flex',
        listStyle: 'none',
        margin:"0px",
        padding:"0px",
    }

    const web_logo = {
        fontFamily: "'Autour One', sans-serif",
    }

    return (
        <>

            <nav className="navbar">
                <div style={web_logo} className="nav-item">
                    <a href="/home">KissAnime</a>
                </div>
                <ul style={menu_style}>
                    <li className="nav-item">
                        <a href="/home">Home</a>
                    </li>
                    <li className="nav-item">
                        <a href="#">Explore</a>
                    </li>
                    <li className="nav-item">
                        <a href="/user/watchlist">Watchlist</a>
                    </li>
                    <li onClick={logout} className="nav-item">
                        <a href="">Logout</a>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Navbar;