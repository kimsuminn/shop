import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../store/reducers/productReducer";
import { useNavigate } from "react-router-dom";

function Product() {

  const dispatch = useDispatch();
  const productList = useSelector(state => state.product.allProducts);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [])

  return (
    <div className="product">
      <div className="item_box">
        {
          productList?.map(item => (
            <ItemList key={item.id} item={item} />
          ))
        }
      </div>
    </div>
  )
}

function ItemList({ item }) {

  const navigate = useNavigate();

  return (
    <div className="item">
      <div className="info" onClick={() => navigate(`/product/${item.id}`)}>
        {
          item.new ? <p className="new">New</p> : <></>
        }
        <figure><img src={item.img} alt={item.id} /></figure>
        <div className="text">
          <h3>{item.title}</h3>
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