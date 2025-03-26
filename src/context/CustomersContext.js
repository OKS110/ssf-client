import { createContext, useState } from "react";

export const CustomersContext = createContext();

export const CustomersProvider = ({children}) => {
    // 전역 공간에서 자동 업데이트 되도록 관리
    const [customersList, setCustomersList] = useState([]); 
    const [customer, setCustomer] = useState([]);


    return (
        <CustomersContext.Provider value={{ customersList, setCustomersList, customer, setCustomer }}>
            {children}
        </CustomersContext.Provider>
    );
}
