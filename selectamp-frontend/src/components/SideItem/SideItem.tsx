import { NavLink } from 'react-router-dom';
import { css } from '@emotion/react';
import Icon, { IconType } from '../Icon/Icon';

export type SideItemProps = {
  icon: IconType,
  text: string,
  to: string
};

export default function SideItem({ icon, text, to }: SideItemProps) {
  return (
    <li css={sideItemStyle}>
      <NavLink to={to} exact>
        <span className="menu-icon"><Icon name={icon} /></span>
        <span className="menu-text">{text}</span>
      </NavLink>
    </li>
  );
};

const sideItemStyle = css`
  a {
    color: #000;
    text-decoration: none;
    height: 2.25rem;
    display: block;
    padding-left: 1.625rem;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;

    &:hover {
      background: #b4dbff;
      border-top-right-radius: 1rem;
      border-bottom-right-radius: 1rem;
      font-weight: bold;
    }

    &.active {
      background: #b4dbff;
      border-top-right-radius: 1rem;
      border-bottom-right-radius: 1rem;
      font-weight: bold;
    }

    .menu-icon {
      display: inline-block;
      height: 2.25rem;
      float: left;

      svg {
        width: 2.25rem;
        height: 2.25rem;
      }
    }

    .menu-text {
      font-size: 1.3125rem;
      display: inline-block;
      height: 2.25rem;
      float: left;
      margin-left: 1.3125rem;
      line-height: 2.25rem;
    }

    &::after {
      content: " ";
      display: block;
      clear: both;
    }
  }
`;