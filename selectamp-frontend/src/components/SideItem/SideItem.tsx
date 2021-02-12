import { Link } from 'react-router-dom';
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
      <Link to={to}>
        <span className="menu-icon"><Icon name={icon} /></span>
        <span className="menu-text">{text}</span>
      </Link>
    </li>
  );
};

const sideItemStyle = css`
  a {
    color: #000;
    text-decoration: none;
    display: block;
    height: 2.25rem;

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