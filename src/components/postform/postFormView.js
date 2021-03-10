import React from 'react';
import './postForm.css';

const PostFormView = ({ id, message, isSuccess, loader, deleteLoader, title, setTitle, subtitle, setSubtitle, url, setUrl, handleSubmit, handleDelete }) => {
    return (
        <div className="registration-form mt-5">
        <form>
            <div className="form-icon">
                <span><i className="bi bi-file-earmark-play display-3" style={{'lineHeight': '1.4'}}></i></span>
            </div>

            <div className="form-group">
                <input 
                    type="text" 
                    className="form-control item" 
                    id="title" 
                    placeholder="Title"
                    value={title}
                    onChange={ (e) => setTitle(e.target.value) }
                />
            </div>
            <div className="form-group">
                <input 
                    type="text" 
                    className="form-control item" 
                    id="subtitle" 
                    placeholder="Subtitle"
                    value={subtitle}
                    onChange={ (e) => setSubtitle(e.target.value) }
                />
            </div>
            <div className="form-group">
                <input 
                    type="text" 
                    className="form-control item" 
                    id="url" 
                    placeholder="YouTube URL"
                    value={url} 
                    onChange={ (e) => setUrl(e.target.value) }
                />
            </div>
            <div className="form-group">
                <button type="button" className="btn btn-block create-post" onClick={handleSubmit}>
                    {loader && <div class="spinner-border" role="status"></div>}
                    {!loader && (id === "new" ? "Crear post" : "Modificar post") }
                </button>
            </div>
            {   
                id !== "new" &&
                <div className="form-group">
                    <button type="button" to="/" className="btn btn-block delete-post mt-3" onClick={handleDelete}>
                        {deleteLoader && "Eliminando..."}
                        {!deleteLoader && "Eliminar post" }
                    </button>
                </div>
            }
            
            {   
                message !== "" &&
                <div className={`alert alert-${isSuccess ? "success" : "danger"} mt-4 fadeinout`} role="alert">{message}</div> 
            }

        </form>
        </div>
    );
}

export default PostFormView;