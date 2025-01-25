import { faMinus, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { addCount, removeCart, subCount } from "../store/reducers/cartReducer";
import { useNavigate } from "react-router-dom";

function Cart() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartList = useSelector(state => state.cart.cartList);

  const removeItem = (item) => {
    dispatch(removeCart(item));
  }

  const plusCount = (item) => {
    dispatch(addCount(item));
  }

  const minusCount = (item) => {
    dispatch(subCount(item));
  }

  let allPrice = 0;
  for (let i of cartList) {
    allPrice += i.price * i.count;
  }

  return (
    <div className="cart">
      <div className="itemBox">
        {
          cartList?.map(item => (
            <div className="item" key={item.date}>
              <figure onClick={() => navigate(`/product/${item.id}`)}><img src={item.img} alt={item.date} /></figure>
              <div className="info">
                <h3 onClick={() => navigate(`/product/${item.id}`)}>{item.title}</h3>
                <p className="size">사이즈: {item.selectSize}</p>
                <p className="price">{item.price.toLocaleString('ko-KR')}₩</p>
              </div>
              <div className="count">
                <button 
                  type="button"
                  onClick={() => minusCount(item)}
                ><FontAwesomeIcon icon={faMinus} /></button>
                <p>{item.count}개</p>
                <button 
                  type="button" 
                  onClick={() => plusCount(item)}
                ><FontAwesomeIcon icon={faPlus} /></button>
              </div>
              <button 
                type="button"
                onClick={() => removeItem(item)}
              ><FontAwesomeIcon icon={faXmark} /></button>
            </div>
          ))
        }
      </div>
      <h3 className="allPrice">총합: {allPrice.toLocaleString('ko-KR')}₩</h3>
    </div>
  )
}

export default Cart;