import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProduct } from '../../../hooks/useProduct';
import { ProductContext } from '../../../context/ProductContext';
import ProductBlock from '../../../commons/ProductBlock';

export default function Recommend() {
    const { getPidItem } = useProduct();
    const { pid } = useParams();
    const { pidItem, productList, category, subCategory } = useContext(ProductContext);
    const { getFilterProducts } = useProduct(); 
    const [filteredSubProducts, setFilteredSubProducts] = useState([]); // 서브 필터링된 상품 리스트
    const [filteredBrandProducts, setFilteredBrandProducts] = useState([]); // 브랜드로 필터링된 상품 리스트

    // 비동기적으로 pidItem 가져오기
    useEffect(() => {
        const fetchProduct = async () => {
            await getPidItem(pid);
        };

        fetchProduct();
    }, [pid]);
    
    useEffect(() => {
        // 필터링 완료된 상품 데이터 호출
        getFilterProducts(category, subCategory);
    }, [category, subCategory]);
    
    // pidItem의 sub_category와 productList 비교 후 필터링하여 상태 업데이트
    useEffect(() => {
        if (!pidItem || !pidItem.sub_category || productList.length === 0) return;
        const filtered = productList.filter(item => 
            item.sub_category === pidItem.sub_category && item.pid !== Number(pid) // 현재 있는 pid는 제외
        );
        setFilteredSubProducts(filtered);
        if (!pidItem || !pidItem.sub_category || !productList.length) return;
        const filteredBrand = productList.filter(item => item.brand === pidItem.brand && item.pid !== Number(pid)); // 현재 있는 pid는 제외
        setFilteredBrandProducts(filteredBrand);
    }, [pidItem, productList]);

    return (
        <div style={{ height: "auto", marginBottom:"100px"}}>
            {filteredSubProducts.length > 1 ? <><div style={{padding:"20px 0"}}><h1>비슷한 상품</h1></div>
                        <ProductBlock 
                        detailList={filteredSubProducts} 
                        ulClassName="category-tab-recommend" 
                        liClassName="category-tab-list" 
                        className="category-list" 
                    /></> : ""}
            <div style={{padding:"20px 0"}}><h1>브랜드</h1></div>
            <ProductBlock 
                detailList={filteredBrandProducts} 
                ulClassName="category-tab-recommend" 
                liClassName="category-tab-list" 
                className="category-list" 
            />
        </div>
    );
}
