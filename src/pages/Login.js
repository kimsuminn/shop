import { useDispatch } from "react-redux";
import { login } from "../store/reducers/loginReducer";
import { useNavigate } from "react-router-dom";

function Login() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login());
    navigate('/');
  }

  return (
    <div className="login">
      <form className="login_form" onSubmit={loginSubmit}>
        <div className="id">
          <label htmlFor="id">아이디</label>
          <input type="text" id="id" />
        </div>
        <div className="pw">
          <label htmlFor="pw">비밀번호</label>
          <input type="password" id="pw" />
        </div>
        <button type="submit">로그인</button>
      </form>
    </div>
  )
}

export default Login;