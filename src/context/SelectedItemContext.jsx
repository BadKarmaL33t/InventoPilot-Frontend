import {createContext, useState} from 'react';

export const SelectedItemContext = createContext();

const emptySelectedItem = {
    name: "",
    productType: "",
    componentType: "",
    rawType: "",
    stock: "",
    productStatus: "",
    sold: "",
    used: "",
    minimalStock: "",
    maximalStock: "",
    serialNumber: "",
    batchNumber: "",
    locationNames: [],
    department: "",
    rawMaterialName: "",
    componentNames: [],
    productNames: [],
    id: "",
    orderProducts: [{
        orderId: 0,
        productName: "",
        quantity: 0,
    }],
    orderDate: "",
    deliveryDate: "",
    orderStatus: "",
}

const SelectedItemProvider = ({children}) => {
    const [selectedItem, setSelectedItem] = useState(emptySelectedItem);

    const contextData = {
        selectedItem,
        setSelectedItem,
        emptySelectedItem,
    };

    return (
        <SelectedItemContext.Provider value={contextData}>
            {children}
        </SelectedItemContext.Provider>
    );
};

export default SelectedItemProvider;