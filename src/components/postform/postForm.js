import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import PostFormView from './postFormView';

const PostForm = () => {
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [url, setUrl] = useState("");
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [loader, setLoader] = useState(false);
    const [deleteLoader, setDeleteLoader] = useState(false);
    const { id } = useParams();
    let history = useHistory();

    useEffect(() => {
        if (id !== "new"){
            axios.get(`https://webhooks.mongodb-realm.com/api/client/v2.0/app/pensamiento-critico-ehktw/service/posts/incoming_webhook/getOne?id=${id}`)
                .then(res => {
                    setTitle(res.data.title);
                    setSubtitle(res.data.subtitle);
                    setUrl(res.data.url);
                })
                .catch(err => {
                    setIsSuccess(false);
                    setMessage(err.toString());
                    console.log(err);
                });
        }
    }, [id])

    //Alert message dismiss after 4 seconds
    useEffect(() => {
        if (message !== ""){
            const timer = setTimeout(() => {
                setMessage("");
              }, 4000);
              return () => clearTimeout(timer);
        }
    }, [message]);

    function handleSubmit() {
        if (title === "" || subtitle === "" || url === ""){
            setMessage("Deben completarse todos los campos.");
            setIsSuccess(false);
            return;
        }

        setLoader(true);
        if (id === "new"){

            axios.post('https://webhooks.mongodb-realm.com/api/client/v2.0/app/pensamiento-critico-ehktw/service/posts/incoming_webhook/add', { title: title, subtitle: subtitle, url: url, userId: Cookies.getJSON('user').id, time: Date(Date.now()) })
                .then(() => {
                    setMessage("Felicidades! el post fue creado.");
                    setIsSuccess(true);
                    setLoader(false);
                    setTitle("");
                    setSubtitle("");
                    setUrl("");
                })
                .catch(err => {
                    setMessage(err.toString());
                    setIsSuccess(false);
                    setLoader(false);
                });

        } else {
            
            axios.put(`https://webhooks.mongodb-realm.com/api/client/v2.0/app/pensamiento-critico-ehktw/service/posts/incoming_webhook/put`, { id: id, title: title, subtitle: subtitle, url: url, userId: Cookies.getJSON('user').id })
                .then(() => {
                    setMessage("Felicidades! el post fue modificado.");
                    setIsSuccess(true);
                    setLoader(false);
                })
                .catch(err => {
                    setMessage(err.toString());
                    setIsSuccess(false);
                    setLoader(false);
                });
                
        }
    }

    function handleDelete() {
        setDeleteLoader(true);
        axios.delete(`https://webhooks.mongodb-realm.com/api/client/v2.0/app/pensamiento-critico-ehktw/service/posts/incoming_webhook/delete?id=${id}`)
            .then(() => {
                setDeleteLoader(false);
                history.push('/')
            })
            .catch(err => {
                setDeleteLoader(false);
                setMessage(err.toString());
                setIsSuccess(false);
            });
            
    }

    return (
        <PostFormView 
            id={id}
            message={message}
            isSuccess={isSuccess}
            loader={loader}
            deleteLoader={deleteLoader}
            title={title}
            setTitle={setTitle}
            subtitle={subtitle}
            setSubtitle={setSubtitle}
            url={url}
            setUrl={setUrl}
            handleSubmit={handleSubmit}
            handleDelete={handleDelete}
        />
    );
}

export default PostForm;