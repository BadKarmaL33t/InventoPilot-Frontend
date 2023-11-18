import {createContext, useState} from 'react';

export const SelectedItemContext = createContext();

const SelectedItemProvider = ({children}) => {
    const [selectedItem, setSelectedItem] = useState({
        name: "",
        productType: "",
        componentType: "",
        stock: "",
        productStatus: "",
        sold: "",
        used: "",
        minimalStock: "",
        maximalStock: "",
        serialNumber: "",
        batchNumber: "",
        locations: [],
        raw: {},
        components: [],
        products: [],
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