import  { useContext } from "react";
import axios from "axios";
import { GuestContext } from "../context/GuestContext.js"

export function useGuests() {
    const {  setGuestList, setGuest } = useContext(GuestContext);

    /** 비회원 데이터 전체 호출 **/
    const getGuestList = async() => {
        const result = await axios.post("http://3.36.70.100:9000/guest/all");
        setGuestList(result.data);
        
    }

    /** 비회원 별 데이터 호출 **/
    const getGuest = async(guest_id) => {
        const result = await axios.post("http://3.36.70.100:9000/guest/member", {"guest_id":guest_id});
        
        setGuest(result.data);
    }

    return { getGuestList, getGuest };
}