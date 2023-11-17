import { createContext, useState } from 'react';

export const SelectedItemContext = createContext();

const SelectedItemProvider = ({ children }) => {
    const [selectedItem, setSelectedItem] = useState({
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
        selectedItem,
        setSelectedItem,
    };

    return (
        <SelectedItemContext.Provider value={contextData}>
            {children}
        </SelectedItemContext.Provider>
    );
};

export default SelectedItemProvider;