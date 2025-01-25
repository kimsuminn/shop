import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchDetailProduct } from "../store/reducers/productReducer";

function Detail() {

  const { id } = useParams();
  const dispatch = useDispatch();
  const item = useSelector(state => state.product.detailProduct);

  useEffect(() => {
    dispatch(fetchDetailProduct(id));
  }, []);

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
                <li key={idx}>{val}</li>
              ))
            }
          </ul>
        </div>
        <button type="button">장바구니</button>
      </div>
    </div>
  )
}

export default Detail;