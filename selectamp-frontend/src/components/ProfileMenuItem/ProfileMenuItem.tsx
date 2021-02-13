import { Link } from 'react-router-dom';
import { css } from '@emotion/react';

export type ProfileMenuItemProps = {
  type: string,
  to?: string,
  text: string,
  callback?: any
};

export default function ProfileMenuItem({ type, to = "/error", text, callback = () => false }: ProfileMenuItemProps) {
  switch (type) {
    case "link":
      return (
        <li css={profileMenuItemStyle}>
          <Link to={to}>{text}</Link>
        </li>
      );
    case "button":
      return (
        <li css={profileMenuItemStyle}>
          <button type="button" className='action-button' onClick={callback}>{text}</button>
        </li>
      );
    default: return null;
  }
};

const profileMenuItemStyle = css`
  a {
    display: inline-block;
    text-decoration: none;
    color: #000;
  }

  &> * {
    width: 100%;
    text-align: left;
  }
  button.action-button {
    cursor: pointer;
    border: none;
    outline: none;
    background: none;
  }
`;