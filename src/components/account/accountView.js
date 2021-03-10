import React from 'react';
import { Link } from 'react-router-dom';
import './account.css';

const AccountView = ( { action, message, isSuccess, loader, deleteLoader, username, setUsername, password, setPassword, nickname, setNickname, handleSubmit, handleDelete } ) => {
    return (
        <div className="registration-form mt-5" key={action}>
        <form>
            <div className="form-icon">
                <span><i className="bi bi-person display-3" style={{lineHeight: 1.4}}></i></span>
            </div>
            <div className="form-group">
                <input 
                    type="text" 
                    className="form-control item" 
                    id="username" 
                    placeholder="Nombre de usuario"
                    value={username}
                    onChange={ (e) => setUsername(e.target.value)}
                />
            </div>
            <div className="form-group">
                <input 
                    type="password" 
                    className="form-control item"
                    id="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={ (e) => setPassword(e.target.value) }
                />
            </div>
            <div className={action === "signin" ? "form-group hidden" : "form-group" }>
                <input 
                    type="text" 
                    className="form-control item" 
                    id="nickname" 
                    placeholder="Nickname"
                    value={nickname}
                    onChange={ (e) => setNickname(e.target.value) }
                />
            </div>
            <div className="form-group">
                <button type="button" to="/" className="btn create-account mb-3" onClick={handleSubmit}>
                    {loader && (action === "myAccount" ? <div class="spinner-border" role="status"></div> : action === "signin" ? "Verificando..." : "Creando...")}
                    {!loader && (action === "myAccount" ? "Modificar datos" : action === "signin" ? "Sign in" : "Crear Cuenta") }
                </button>
            </div>
            {   
                action === "myAccount" &&
                <div className="form-group">
                    <button type="button" to="/" className="btn btn-block delete-account" onClick={handleDelete}>
                        {deleteLoader && "Eliminando..."}
                        {!deleteLoader && "Eliminar cuenta"}
                    </button>
                </div>
            }

            { action === "signin" && <p>¿No tenés cuenta? <span><Link to="/account/createAccount">Registrate</Link></span></p> }           
            { action === "createAccount" && <p>¿Ya tenés cuenta? <span><Link to="/account/signin">Sign in</Link></span></p> }

            {message !== "" && <div className={`alert alert-${isSuccess ? "success" : "danger"} mt-4 fadeinout`} role="alert">{message}</div>}

        </form>
        </div>
    );
}
export default AccountView;

/* FALTAN LAS PROPS */