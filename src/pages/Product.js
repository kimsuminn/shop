import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCart } from "../store/reducers/cartReducer";

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
  const dispatch = useDispatch();
  const loginStatus = useSelector(state => state.login.status);

  const [size, setSize] = useState('');

  const cart = () => {
    if (size && loginStatus) {
      dispatch(addCart({ product: item, size: size }));
      navigate('/cart');
    } else if (size && !loginStatus) {
      navigate('/cart');
    } else {
      alert('사이즈를 선택해주세요!');
    }
  }

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
                <li 
                  key={idx} 
                  className={size === `${val}` ? 'on' : ''}
                  onClick={() => setSize(val)}
                >{val}</li>
              ))
            }
          </ul>
        </div>
      </div>
      <button type="button" onClick={cart}>장바구니</button>
    </div>
  )
}

export default Product;