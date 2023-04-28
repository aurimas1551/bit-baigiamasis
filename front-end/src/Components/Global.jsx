import axios from "axios";
import { useWrite } from "../Use/useWrite";
import { createContext, useEffect, useState } from "react";
import { useRead } from "../Use/useRead";

export const Global = createContext();

export const GlobalProvider = ({children}) => {

    const [response, setCreateEvent, setEditEvent, setCreateCategory] = useWrite();
    const [listEvents, listCategory, setUpdate] = useRead();
    const [route, setRoute] = useState('user');
    const [authName, setAuthName] = useState(null);
    const [authRole, setAuthRole] = useState(null);
    const [userId, setUserId] = useState(null);
    const [logged, setLogged] = useState(null);

    useEffect(() => {
        setUpdate(Date.now());
    }, [setUpdate, response]);

    const logOut = _ => {
        axios.post('http://localhost:3003/logout', {}, {withCredentials: true})
        .then(res => {
            setLogged(false);
            setAuthName(false);
            setAuthRole(false);
            setUserId(false);
        });
    }
    
    return (
        <Global.Provider value={{
            setCreateCategory,
            listCategory,
            //events
            listEvents,
            setCreateEvent,
            setEditEvent,
            //routes
            route, setRoute,
            //auth
            authName, setAuthName, logOut, logged, setLogged, authRole, setAuthRole, userId, setUserId
        }}>
            {children}
        </Global.Provider>
    )
}