import { useState } from "react";
import { useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom"
import { useApolloClient } from "@apollo/client"
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm"
import Recommended from "./components/Recommended";

const App = () => {
    const client = useApolloClient()
    const [token, setToken] = useState(null)

    useEffect(() => {
        const localToken = localStorage.getItem("library-user-token")

        if (localToken)
        {
            setToken(localToken)
        }
    }, [])

    const logout = () => {
        localStorage.clear()
        setToken(null)
        client.resetStore()
    }

    return (
        <div>
            <div>
                <Link to="/"><button>authors</button></Link>
                <Link to="/books"><button>books</button></Link>
                <Link to="/addbook"><button>add book</button></Link>
                {
                    token
                        ? 
                        <>
                            <Link to="/recommended"><button>recommended</button></Link>
                            <button onClick={logout}>logout</button>
                        </>
                        : <Link to="/login"><button>login</button></Link>
                }
            </div>

            <Routes>
                <Route path="/" element={ <Authors /> } />
                <Route path="/books" element={ <Books /> } />
                <Route path="/addbook" element={ <NewBook /> } />
                <Route path="/recommended" element={ <Recommended /> } />
                <Route path="/login" element={ <LoginForm setToken={setToken} /> } />
            </Routes>
        </div>
    );
};

export default App;
