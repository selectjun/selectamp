import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { Link, useHistory } from 'react-router-dom';
import { sha256 } from 'js-sha256';
import { API } from '../../axios';
import Input from '../Input';
import Utils from '../Utils';
import VariousLink from '../VariousLink';

export type LoginFormProps = {};
export type loginDataType = {
  id: string,
  password: string,
  isSaveId: boolean
};

export default function LoginForm({}: LoginFormProps) {
  const history = useHistory();

  const [resultTxt, setResultTxt] = useState<string>("");
  const [loginData, setLoginData] = useState<loginDataType>({
    id: "",
    password: "",
    isSaveId: false
  });

  const handleLoginData = (name: string, value: string) => {
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleIsSaveId = (isSaveId: boolean) => {
    setLoginData({
      ...loginData,
      isSaveId: isSaveId
    });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    localStorage.setItem("id", loginData.isSaveId ? loginData.id : "");
    if (!loginData.id) {
      setResultTxt("아이디를 입력해주세요");
      document.getElementsByName("id")[0].focus();
    } else if (!loginData.password) {
      setResultTxt("암호를 입력해주세요");
      document.getElementsByName("password")[0].focus();
    } else {
      const url = `/api/token/?id=${loginData.id}&password=${sha256(loginData.password)}`;
      API.post(url).then(response => {
        history.push("/dashboard")
      }).catch(error => {
        setResultTxt(error.response.data.message);
      });
    }
  };

  useEffect(() => {
    const id: string | null = localStorage.getItem("id");
    setLoginData({
      ...loginData,
      id: id ? id : "",
      isSaveId: id ? true : false
    });
  }, []);

  return (
    <section css={loginFormStyle}>
      <form onSubmit={handleFormSubmit}>
        <fieldset>
          <legend><Link to="/">SELECTAMP</Link></legend>
          <Input 
            type="text"
            name="id"
            value={loginData.id}
            placeholder="ID"
            handleLoginData={handleLoginData} />
          <Input 
            type="password"
            name="password"
            value={loginData.password}
            placeholder="PASSWORD"
            handleLoginData={handleLoginData} />
          <div className="result-txt">{resultTxt}</div>
          <input
            type="submit"
            className="input-type-submit"
            value="LOGIN" />
          <Utils
            isSaveId={loginData.isSaveId}
            handleIsSaveId={handleIsSaveId} />
        </fieldset>
      </form>
      <VariousLink />
    </section>
  );
};

const loginFormStyle = css`
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

    div.result-txt {
      color: red;
      text-indent: 0.25rem;
      margin-bottom: 0.75rem;
    }
    
    input.input-type-submit {
      width: 100%;
      height: 3.375rem;
      margin: 0 0 0;
      padding: 0;
      color: #fff;
      background: #005CB2;
      border: 0.062rem solid #ddd;
      outline: none;
    }
  }
`;