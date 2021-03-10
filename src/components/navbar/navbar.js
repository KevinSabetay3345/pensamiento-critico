import React, { useEffect, useRef, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { userLoggedContext } from '../../context/userContext';
import { Link } from 'react-router-dom';

const Navbar = ({ homePage }) => {
    const [isLogged, setIsLogged] = useContext(userLoggedContext);
    const prevScrollY = useRef(0);
    const [pageOnTop, setPageOnTop] = useState(true);
    const [goingUp, setGoingUp] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
        const currentScrollY = window.scrollY;
        if (prevScrollY.current < currentScrollY) {
            setGoingUp(false);
        } else {
            setGoingUp(true);
        }

        prevScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [goingUp]);


    useEffect(() => {
        const handleTopPage = () => {
            if (window.scrollY < 150) {
                setPageOnTop(true);
            } else {
                setPageOnTop(false);
            }
        };

        window.addEventListener("scroll", handleTopPage);

        return () => window.removeEventListener("scroll", handleTopPage);
    }, [pageOnTop]);
    
    function handleSignOut(e) {
        Cookies.remove("user");
        setIsLogged(false);
    }

    const navBarStyles = {
        homePageTop: "navbar navbar-expand-lg navbar-dark fixed-top",
        scrollingUp: "navbar navbar-expand-lg navbar-dark fixed-top bg-dark"
    }

    return (
        <nav className={ (homePage && pageOnTop) ? navBarStyles.homePageTop : ( (pageOnTop || goingUp) ? navBarStyles.scrollingUp : "d-none")}>
            <div className="container">
                <Link className="navbar-brand" to="/">Pensamiento Crítico</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-link" to="/">Home</Link>
                        <Link className="nav-link" to={isLogged ? "/account/myAccount" : "/account/signin" }>My Account</Link>
                        <Link className="nav-link" to={isLogged ? "/"+Cookies.getJSON('user').id : "/account/signin" }>My Posts</Link>
                        <Link className="nav-link" to={isLogged ? "/postform/new" : "/account/signin"}>New Post</Link>
                        { !isLogged && <Link className="nav-link" to="/account/signin">Sign In</Link> }
                        { isLogged && <Link className="nav-link" to="/" onClick={handleSignOut}>Sign Out</Link> }
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;

Navbar.propTypes = {
    homePage: PropTypes.bool
};