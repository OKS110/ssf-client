import { createContext, useState, useEffect } from 'react';

export const DetailProductContext = createContext();

export const DetailProductProvider = ({ children }) => {
    const [count, setCount] = useState(() => {
        return Number(sessionStorage.getItem("selectedCount")) || 1; 
    });

    const [selectColor, setSelectColor] = useState(() => {
        return sessionStorage.getItem("selectedColor") || ""; 
    });

    const [selectedSize, setSelectedSize] = useState(() => {
        return sessionStorage.getItem("selectedSize") || ""; 
    });

    const [cartList, setCartList] = useState([]); 
    const [userId, setUserId] = useState("");

    useEffect(() => {
        if (count > 0) sessionStorage.setItem("selectedCount", count);
    }, [count]);

    useEffect(() => {
        if (selectColor) sessionStorage.setItem("selectedColor", selectColor);
    }, [selectColor]);

    useEffect(() => {
        if (selectedSize) sessionStorage.setItem("selectedSize", selectedSize);
    }, [selectedSize]);

    return (
        <DetailProductContext.Provider value={{ count, setCount, selectColor, setSelectColor, selectedSize, setSelectedSize, cartList, setCartList, userId, setUserId }}>
            {children}
        </DetailProductContext.Provider>
    );
};
