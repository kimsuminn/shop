import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Product() {

  const productList = useSelector(state => state.product.allProducts);

  return (
    <div className="product">
      <div className="item_box">
        {
          productList.length > 0 ? 
            productList?.map(item => (
              <ItemList key={item.id} item={item} />
            )) :
            <p>검색 결과가 없습니다.</p>
        }
      </div>
    </div>
  )
}

function ItemList({ item }) {

  const navigate = useNavigate();

  return (
    <div className="item">
      <div className="info">
        {
          item.new ? <p className="new">New</p> : <></>
        }
        <figure onClick={() => navigate(`/product/${item.id}`)}><img src={item.img} alt={item.id} /></figure>
        <div className="text">
          <h3 onClick={() => navigate(`/product/${item.id}`)}>{item.title}</h3>
          <p>{item.price.toLocaleString('ko-KR')}₩</p>
          <ul>
            {
              item.size.map((val, idx) => (
                <li key={idx}>{val}</li>
              ))
            }
          </ul>
        </div>
      </div>
      <button type="button">장바구니</button>
    </div>
  )
}

export default Product;