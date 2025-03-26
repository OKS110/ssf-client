import React, { useContext, useEffect, useRef, useState } from 'react';
import { ProductContext } from '../../context/ProductContext.js';
import { useProduct } from '../../hooks/useProduct.js';
import { IoIosSearch } from "react-icons/io";
import ProductBlock from '../../commons/ProductBlock.jsx';

export default function SearchPage() {
    const { searchList, search, setSearch } = useContext(ProductContext);
    const { getSearchList } = useProduct();
    const [searchKey, setSearchKey] = useState(""); // 해당 페이지 검색어 관리

    useEffect(() => {
        const key = localStorage.getItem("search_key");
        setSearch(key);
        getSearchList(key);
    }, []);

    const onSubmit = () => {
        if (searchKey !== "") {
            localStorage.removeItem("search_key");
            localStorage.setItem("search_key", searchKey);
            getSearchList(searchKey);
        } else {
            alert("검색어를 입력해주세요!");
        }
    }

    return (
        <div className='searchPage-wrap'>
            <div className='searchPage-header'>
                <input type="text"
                    defaultValue={search}
                    onChange={(event) => setSearchKey(event.target.value)}
                />
                <span onClick={onSubmit}><IoIosSearch /></span>
            </div>
            <div className='searchPage-contents'>
                {
                    searchList && searchList.length > 0
                    ? (
                        <>
                            <div className='searchPage-result'>
                                <p>'{ search }'에 대한 검색 결과입니다.</p>
                            </div>
                            <ProductBlock
                                detailList={searchList}
                                ulClassName="search-page-products"
                                liClassName="search-page-lists"
                                className="search-item"
                            />
                        </>
                    )
                    : (
                        <>
                            <div className='searchPage-result'>
                                <p>'{search}'에 대한 검색 결과입니다.</p>
                            </div>
                            <div className='searchPage-result-non'>
                                <p>검색된 상품이 없습니다.</p>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    );
}