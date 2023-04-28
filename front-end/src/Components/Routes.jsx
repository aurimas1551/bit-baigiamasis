import { useContext } from "react";
import { Global } from "./Global";
import Login from "./Login";
import Auth from "./Auth";
import Home from "./Home";
import Admin from "./AdminPanel/Admin";
import User from "./UserPanel/User";

function Routes() {

    const {route} = useContext(Global);

    switch(route) {
        case 'admin' : return <Auth><Admin /></Auth>;
        case 'user' : return <Auth><User /></Auth>
        case 'login' : return <Login />;
        case 'home' : return <Home />;
        default : return null;
    }
}

export default Routes;