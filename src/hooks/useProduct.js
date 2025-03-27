import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ProductContext } from "../context/ProductContext.js";

export function useProduct() {
    
    const { 
         setProductList, setPidItem, setDetailList, setRankList, setSearchList,
    } = useContext(ProductContext);
    
    const [socket, setSocket] = useState(null); //  WebSocket 상태 관리

    /** 상품 데이터 전체 호출 **/
    const getProductList = async() => {
        const result = await axios.post("http://52.78.224.175:9000/product/all"); // 별점 순으로 order by 사용해서 출력
        setProductList(result.data);
        
        return result.data;
    }
    /** WebSocket을 이용해 상품 업데이트 감지 **/
    useEffect(() => {
        const newSocket = new WebSocket("ws://3.34.134.163:9002"); //  WebSocket 연결
        setSocket(newSocket);

        newSocket.onopen = () => {
            console.log(" WebSocket 연결 성공! (고객 서버)");
        };

        newSocket.onmessage = (event) => {
            console.log(" WebSocket 메시지 수신:", event.data);
            const data = JSON.parse(event.data);

            if (data.type === "update_products") {
                console.log(" 상품 데이터 변경 감지! 목록 업데이트 실행...");
                getProductList(); // 최신 상품 목록 반영
            }
        };

        newSocket.onerror = (error) => {
            console.error(" WebSocket 오류 발생:", error);
        };

        newSocket.onclose = () => {
            console.warn(" WebSocket 연결이 종료되었습니다.");
        };

        return () => {
            newSocket.close();
        };
    }, []);

    
    /** 메인 - 새 감각~, 랭킹 리스트 필터링 */
    // 상품 데이터 필터링 등 작업이 필요할 때는 최대한 상품 전체 데이터를 호출하는 커스텀 훅에서 작업을 마친 후 반환해주는 것이 효율적
    const getFilterProducts = async(category, subCategory) => {
        const list = await getProductList();

        let categoryList = [];
        let subCategoryList = [];

        if (list) {
            // 새 감각~ 섹션 카테고리 데이터
            const filterCategory = list.filter(list => list.category === category);
            categoryList = filterCategory.filter((item, i) => i < 6 && item); // 6개만 화면에 출력
            setDetailList(categoryList);
            
            // 서브 카테고리 데이터
            const filterSubCategory = list.filter(list => list.sub_category === subCategory);
            subCategoryList = filterSubCategory.filter((item, i) => i < 8 && item);
            setRankList(subCategoryList);
        }
        return { "categoryList": categoryList, "subCategoryList": subCategoryList };
    }

    /** 상품 아이디 별 데이터 호출 **/
    const getPidItem = async (pid) => {
        const result = await axios.post("http://52.78.224.175:9000/product/item", { pid });
        setPidItem(result.data);
        return result.data;  //  상품 정보를 반환하도록 수정
    };

    /** 모달창 상품 검색 필터링 **/
    const getSearchList = async(search) => {
        const list = await getProductList();

        const filterData = list.filter((item) => item.title.toLowerCase().includes(search.toLowerCase())); // 상품명
        const filterData2 = list.filter((item) => item.category.toLowerCase().includes(search.toLowerCase())); // 카테고리

        if (filterData.length !== 0) {
            setSearchList(filterData);
        } else {
            setSearchList(filterData2);
        }

        return { "filterData": filterData };
    }

    return { getProductList, getPidItem, getFilterProducts, getSearchList};
}