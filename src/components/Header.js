import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faMagnifyingGlass, faRightToBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { logout } from "../store/reducers/loginReducer";

function Header() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginState = useSelector(state => state.login.status);

  return (
    <header>
      <div className="header_inner">
        <div className="btn_box">
          <button type="button">
            <FontAwesomeIcon icon={faCartShopping} />
            <span>장바구니</span>
          </button>
          {
            loginState ?
              <button type="button" onClick={() => dispatch(logout())}>
                <FontAwesomeIcon icon={faUser} />
                <span>로그아웃</span>
              </button> :
              <button type="button" onClick={() => navigate('/login')}>
                <FontAwesomeIcon icon={faRightToBracket} />
                <span>로그인</span>
              </button>
          }
        </div>
        <h1 className="logo">
          <Link to='/'><img src="logo.png" alt="logo" /></Link>
        </h1>
        <div className="nav_bar">
          <ul className="nav">
            <li><Link to='/'>All</Link></li>
            <li><Link to='/'>New</Link></li>
            <li><Link to='/'>Outer</Link></li>
            <li><Link to='/'>Top</Link></li>
            <li><Link to='/'>Bottom</Link></li>
          </ul>
          <form className="search">
            <input type="text" placeholder="제품명을 입력해주세요." />
            <button type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
          </form>
        </div>
      </div>
    </header>
  )
}

export default Header;