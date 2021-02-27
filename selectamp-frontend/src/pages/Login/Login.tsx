import { useRef, useState } from 'react'; 
import { css } from '@emotion/react';
import { Link, useHistory } from 'react-router-dom';
import { sha256 } from 'js-sha256';
import { API } from '../../components/axios';
import LoginTemplete from '../../components/Login/LoginTemplete';

export type LoginProps = {};
export type loginDataType = {
  id: string,
  password: string,
  isSaveId: boolean
};

export default function Login({}: LoginProps) {
  const history = useHistory();

  const [resultTxt, setResultTxt] = useState<string>("");
  const [loginData, setLoginData] = useState<loginDataType>({
    id: "",
    password: "",
    isSaveId: false
  });

  const idInputRef = useRef<HTMLInputElement>(null);
  const passwordIInputRef = useRef<HTMLInputElement>(null);

  const handleLoginData = (name: string, value: string) => {
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: 아이디 저장 로직 추가(쿠키 이용)
    if (!loginData.id) {
      setResultTxt("아이디를 입력해주세요");
      idInputRef.current?.focus();
    } else if (!loginData.password) {
      setResultTxt("암호를 입력해주세요");
      passwordIInputRef.current?.focus();
    } else {
      const url = `/api/token/?id=${loginData.id}&password=${sha256(loginData.password)}`;
      API.post(url).then(response => {
        history.push("/dashboard")
      }).catch(error => {
        setResultTxt(error.response.data.message);
        idInputRef.current?.focus();
      });
    }
  };

  return (
    <LoginTemplete>
      <section css={loginStyle}>
        <form onSubmit={handleFormSubmit}>
          <fieldset>
            <legend><Link to="/">SELECTAMP</Link></legend>
            <div className="input-box">
              <input
                type="text"
                name="id"
                className="input-type-text"
                placeholder="ID"
                ref={idInputRef}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleLoginData(e.target.name, e.target.value)} />
            </div>
            <div className="input-box">
              <input
                type="password"
                name="password"
                className="input-type-text"
                placeholder="PASSWORD"
                ref={passwordIInputRef}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleLoginData(e.target.name, e.target.value)} />
            </div>
            <div className="result-txt">{resultTxt}</div>
            <input
              type="submit"
              className="input-type-submit"
              value="LOGIN" />
          </fieldset>
        </form>
        <div className="user-utils">
          <Link to="">FIND ID</Link>
          <Link to="">FIND PASSWORD</Link>
          <Link to="">JOIN</Link>
        </div>
      </section>
    </LoginTemplete>
  );
};

const loginStyle = css`
  width: 100%;
  max-width: 26.24rem;
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);

  fieldset {
    border: none;

    legend {
      margin: 0 auto;
      padding: 0 0 1.5rem;
      font-size: 2rem;
      font-weight: bold;

      a {
        text-decoration: none;
        color: #000;
      }
    }

    div.input-box {
      margin: 1rem 0;
      height: 2rem;

      input.input-type-text {
        width: calc(100% - 1.5rem);
        height: 1rem;
        padding: 0.5rem 0.75rem;
        outline: none;
        border: 0.0625rem solid #bbb;

        &:focus {
          border: none;
          outline: 0.0625rem solid #005CB2;
        }
      }
    }

    div.result-txt {
      color: red;
      text-indent: 0.25rem;
    }
    
    input.input-type-submit {
      width: 100%;
      height: 3.375rem;
      margin: 0.75rem 0 0;
      padding: 0;
      color: #fff;
      background: #005CB2;
      border: 0.062rem solid #ddd;
      outline: none;
    }
  }

  div.user-utils {
    width: 100%;
    text-align: center;
    margin-top: 2rem;

    a {
      color: #777;
      text-decoration: none;

      &:not(:last-child ):after {
        content: " | ";
        color: #bbb;
      }
    }
  }
`;