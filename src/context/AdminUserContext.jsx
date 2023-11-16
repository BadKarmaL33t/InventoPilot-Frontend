import { createContext, useState } from 'react';

export const AdminUserContext = createContext();

const AdminUserProvider = ({ children }) => {
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
        <AdminUserContext.Provider value={contextData}>
            {children}
        </AdminUserContext.Provider>
    );
};

export default AdminUserProvider;