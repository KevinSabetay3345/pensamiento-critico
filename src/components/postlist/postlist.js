import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import './postlist.css';

const Postlist = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("")
    const { id } = useParams();
    
    useEffect(() => {
        axios.get('https://webhooks.mongodb-realm.com/api/client/v2.0/app/pensamiento-critico-ehktw/service/posts/incoming_webhook/get')
            .then(res => {
                if (typeof id === "undefined"){
                    setPosts(res.data);
                } else {
                    setPosts(res.data.filter(post => post.userId === id));
                }
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
                setError(err.message);
                setIsLoading(false);
            });
    }, []);

    if (isLoading)
        return (
            <div className="text-center my-3">
                <div class="spinner-border" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    
    if (error !== "")
        return <div className="text-center my-5 display-5">{error}</div>;

    if (posts.length === 0)
        return <div className="text-center my-5 display-4">No hay posts para mostrar</div>;

    return (
        <div className="container">
            {posts.map(post => {
                return (
                    <div className="row" key={post._id}>
                        <div className="card my-5 col-sm-8 offset-sm-2 align-items-center">
                            <div className="card-body text-center">
                                <h5 className="card-title">{post.title}</h5>
                                <p className="card-text">{post.subtitle}</p>
                            </div>
                            <div className="video-player mb-2">
                                <ReactPlayer url={post.url} width="100%" />
                            </div>
                            <p className="card-text text-center"><small className="text-muted">Uploaded by {/*post.userNickname*/} at {post.time}</small></p>
                            { Cookies.getJSON('user') && Cookies.getJSON('user').id === post.userId && 
                            <a className="text-center" href={`/postform/${post._id}`}>Editar</a> }
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default Postlist;