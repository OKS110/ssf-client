import { createContext, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({children}) => {
    const [productList, setProductList] = useState([]); 
    const [pidItem, setPidItem] = useState([]);
    const [category, setCategory] = useState("상의"); // 새 계절을 깨우는 나만의 감각 탭 메뉴 관리
    const [subCategory, setSubCategory] = useState("코트"); // 랭킹 탭 메뉴 관리
    const [detailList, setDetailList] = useState([]); // 필터링을 거친 상품 데이터(대분류용)
    const [rankList, setRankList] = useState([]); // 필터링을 거친 상품 데이터(중분류용)
    const [search, setSearch] = useState(""); // 검색창 검색어 관리
    const [searchList, setSearchList] = useState([]); // 검색 필터링 아이템

    return (
        <ProductContext.Provider value={{ productList, setProductList, 
                                            pidItem, setPidItem,
                                            category, setCategory,
                                            subCategory, setSubCategory,
                                            detailList, setDetailList,
                                            rankList, setRankList,
                                            searchList, setSearchList,
                                            search, setSearch,
                                            }}>
            {children}
        </ProductContext.Provider>
    );
}