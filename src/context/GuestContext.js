import { createContext, useState } from "react";

export const GuestContext = createContext();

export const GuestProvider = ({children}) => {
    // 전역 공간에서 자동 업데이트 되도록 관리
    const [guestList, setGuestList] = useState([]); 
    const [guest, setGuest] = useState([]);

    return (
        <GuestContext.Provider value={{ guestList, setGuestList, guest, setGuest}}>
            {children}
        </GuestContext.Provider>
    );
}