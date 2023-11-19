import { createContext, useState } from 'react';

export const SelectedUserContext = createContext();

const SelectedUserProvider = ({ children }) => {
    const [selectedUser, setSelectedUser] = useState({
        user: {
            email: '',
            firstname: '',
            lastname: '',
            username: '',
            password: '',
            role: '',
        },
    });

    const contextData = {
        selectedUser,
        setSelectedUser,
    };

    return (
        <SelectedUserContext.Provider value={contextData}>
            {children}
        </SelectedUserContext.Provider>
    );
};

export default SelectedUserProvider;