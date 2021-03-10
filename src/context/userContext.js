import { createContext, useState } from 'react';
import Cookies from 'js-cookie';

export const userLoggedContext = createContext();

export const UserProvider = ( { children } ) => {
    const [isLogged, setIsLogged] = useState(typeof (Cookies.get('user')) !== "undefined");

    return (
        <userLoggedContext.Provider value={ [isLogged, setIsLogged] }>
            {children}
        </userLoggedContext.Provider>
    )
}