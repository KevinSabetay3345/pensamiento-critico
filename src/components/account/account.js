import React, { useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { userLoggedContext } from '../../context/userContext';
import { useHistory, useParams } from "react-router-dom";
import AccountView from './accountView';


const Account = () => {
    const { action } = useParams();
    const [isLogged, setIsLogged] = useContext(userLoggedContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [loader, setLoader] = useState(false);
    const [deleteLoader, setDeleteLoader] = useState(false);
    let history = useHistory();    

    useEffect( () => {
        if (isLogged){
            setUsername(Cookies.getJSON('user').username);
            setNickname(Cookies.getJSON('user').nickname);
        }else{
            setUsername("");
            setNickname("");
        }
        setPassword("");
    }, [isLogged]);

    //Alert message dismiss after 4 seconds
    useEffect(() => {
        if (message !== ""){
            const timer = setTimeout(() => {
                setMessage("");
              }, 4000);
              return () => clearTimeout(timer);
        }
    }, [message]);

    function handleDelete(){
        setDeleteLoader(true);
        axios.delete(`https://webhooks.mongodb-realm.com/api/client/v2.0/app/pensamiento-critico-ehktw/service/users/incoming_webhook/delete?id=${Cookies.getJSON("user").id}`)
            .then(() => {
                Cookies.remove('user');
                setIsLogged(false);
                setDeleteLoader(false);
                history.push('/');
            })
            .catch(err => {
                setMessage(err.toString());
                setIsSuccess(false);
                setDeleteLoader(false);
            });
            
    }

    function handleSubmit(){
        
        if (action === "createAccount") {
            if (username === "" || password === "" || nickname === ""){
                setIsSuccess(false);
                return setMessage("Deben completarse todos los campos.");
            }
            
            setLoader(true);
            axios.post('https://webhooks.mongodb-realm.com/api/client/v2.0/app/pensamiento-critico-ehktw/service/users/incoming_webhook/add', { username: username, password: password, nickname: nickname })
                .then(res => {
                    Cookies.set("user", {id: res.data.insertedId.$oid, username: username, nickname: nickname});
                    setIsLogged(true);
                    history.push('/');
                    setLoader(false);
                })
                .catch(err => {
                    setIsSuccess(false);
                    setMessage(err.toString());
                    setLoader(false);
                });
        }
        
        if (action === "signin") {
            if (username === "" || password === ""){
                setIsSuccess(false);
                return setMessage("Deben completarse todos los campos.");
            }
            
            setLoader(true);
            axios.get(`https://webhooks.mongodb-realm.com/api/client/v2.0/app/pensamiento-critico-ehktw/service/users/incoming_webhook/signin?username=${username}&password=${password}`)
                .then(res => {
                    if (res.data.message !== "Ok") {
                        setIsSuccess(false);
                        setLoader(false);
                        return setMessage(res.data.message);
                    }
                    
                    Cookies.set("user", { id: res.data.collection._id.$oid, username: res.data.collection.username, nickname: res.data.collection.nickname });
                    setIsLogged(true);
                    setLoader(false);
                    history.push('/')
                })
                .catch(err => {
                    setIsSuccess(false);
                    setMessage(err.toString());
                    setLoader(false);
                });
        }

        if (action === "myAccount") {
            if (username === ""){
                setIsSuccess(false);
                return setMessage("El campo username no puede quedar vacío.");
            }

            if (nickname === ""){
                setIsSuccess(false);
                return setMessage("El campo nickname no puede quedar vacío.");
            }

            setLoader(true);
            const sendToMongo = (password === "") ? {username: username, nickname: nickname} : {username: username, password: password, nickname: nickname};
            axios.put(`https://webhooks.mongodb-realm.com/api/client/v2.0/app/pensamiento-critico-ehktw/service/users/incoming_webhook/put?id=${Cookies.getJSON('user').id}`, sendToMongo)
                .then(res => {
                    if (res.data.modifiedCount.$numberInt === "1") {
                        setIsSuccess(true);
                        setMessage("El usuario ha sido modificado!");
                        Cookies.set("user", {...Cookies.getJSON("user"), username: username, nickname: nickname});
                    } else {
                        setIsSuccess(false);
                        setMessage("Hubo un problema al modificar el usuario.");
                    }
                    setLoader(false);
                })
                .catch(err => {
                    setIsSuccess(false);
                    setMessage(err.toString());
                    setLoader(false);
                });
        }
        
    }

    return (
        <AccountView 
            action={action}
            message={message}
            isSuccess={isSuccess}
            loader={loader}
            deleteLoader={deleteLoader}
            username={username}
            password={password}
            nickname={nickname}
            setUsername={setUsername}
            setPassword={setPassword}
            setNickname={setNickname}
            handleSubmit={handleSubmit}
            handleDelete={handleDelete}
        />
        );
}

export default Account;