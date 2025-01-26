import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchDetailProduct } from "../store/reducers/productReducer";
import { addCart } from "../store/reducers/cartReducer";

function Detail() {

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { detailProduct, detailLoading } = useSelector(state => state.product);

  useEffect(() => {
    dispatch(fetchDetailProduct(id));
  }, []);

  const [size, setSize] = useState('');

  const cart = () => {
    if (size) {
      dispatch(addCart({ product: detailProduct, size: size }));
      navigate('/cart');
    } else {
      alert('사이즈를 선택해주세요!');
    }
  }

  return (
    <div className="detail">
      {
        detailLoading ? 
          <figure><img src="/loading.gif" alt="loading" /></figure> :
          <div className="item">
            <figure><img src={detailProduct?.img} alt={detailProduct?.id} /></figure>
            <div className="info">
              <div className="text">
                <h3>{detailProduct?.title}</h3>
                <p className="price">{detailProduct?.price.toLocaleString('ko-KR')}₩</p>
                <p className="size">Size</p>
                <ul>
                  {
                    detailProduct?.size.map((val, idx) => (
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
      }
    </div>
  )
}

export default Detail;