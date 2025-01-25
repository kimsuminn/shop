import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faMagnifyingGlass, faRightToBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { logout } from "../store/reducers/loginReducer";
import { useEffect, useState } from "react";
import { fetchAllProducts } from "../store/reducers/productReducer";

function Header() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginState = useSelector(state => state.login.status);

  const [query] = useSearchParams();
  const tabSearchParams = query.get('q') || '';

  const [keyword, setKeyword] = useState('');
  const search = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`?q=${keyword}`);
      setKeyword('');
    } else {
      alert('검색어를 다시 입력해주세요.');
      setKeyword('');
    }
  }

  useEffect(() => {
    dispatch(fetchAllProducts(tabSearchParams));
  }, [tabSearchParams])

  return (
    <header>
      <div className="header_inner">
        <div className="btn_box">
          <button type="button" onClick={() => navigate('/cart')}>
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
            <li className={tabSearchParams === '' ? 'on' : ''}><Link to='/'>All</Link></li>
            <li className={tabSearchParams === 'new' ? 'on' : ''}><Link to='/?q=new'>New</Link></li>
            <li className={tabSearchParams === 'outer' ? 'on' : ''}><Link to='/?q=outer'>Outer</Link></li>
            <li className={tabSearchParams === 'top' ? 'on' : ''}><Link to='/?q=top'>Top</Link></li>
            <li className={tabSearchParams === 'bottom' ? 'on' : ''}><Link to='/?q=bottom'>Bottom</Link></li>
          </ul>
          <form className="search" onSubmit={search}>
            <input 
              type="text" 
              placeholder="제품명을 입력해주세요." 
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
          </form>
        </div>
      </div>
    </header>
  )
}

export default Header;