import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchDetailProduct } from "../store/reducers/productReducer";
import { addCart } from "../store/reducers/cartReducer";

function Detail() {

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const item = useSelector(state => state.product.detailProduct);

  useEffect(() => {
    dispatch(fetchDetailProduct(id));
  }, []);

  const [size, setSize] = useState('');

  const cart = () => {
    if (size) {
      dispatch(addCart({ product: item, size: size }));
      navigate('/cart');
    } else {
      alert('사이즈를 선택해주세요!');
    }
  }

  return (
    <div className="detail">
      <figure><img src={item?.img} alt={item?.id} /></figure>
      <div className="info">
        <div className="text">
          <h3>{item?.title}</h3>
          <p className="price">{item?.price.toLocaleString('ko-KR')}₩</p>
          <p className="size">Size</p>
          <ul>
            {
              item?.size.map((val, idx) => (
                <li 
                  key={idx}
                  className={size === `${val}` ? 'on' : ''}
                  onClick={() => setSize(val)}
                >{val}</li>
              ))
            }
          </ul>
        </div>
        <button type="button" onClick={cart}>장바구니</button>
      </div>
    </div>
  )
}

export default Detail;