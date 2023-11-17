import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter as Router} from 'react-router-dom';
import AuthContextProvider from "./context/AuthContext.jsx";
import SelectedUserProvider from "./context/SelectedUserContext.jsx";
import SelectedItemProvider from "./context/SelectedItemContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Router>
            <AuthContextProvider>
                <SelectedUserProvider>
                    <SelectedItemProvider>
                        <App/>
                    </SelectedItemProvider>
                </SelectedUserProvider>
            </AuthContextProvider>
        </Router>
    </React.StrictMode>,
)