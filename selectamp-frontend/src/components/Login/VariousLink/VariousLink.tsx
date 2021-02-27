import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

export type VariousLinkProps = {};

export default function VariousLink({}: VariousLinkProps) {
  return (
    <div className="user-utils" css={variousLinkStyle}>
      <Link to="">FIND ID</Link>
      <Link to="">FIND PASSWORD</Link>
      <Link to="">JOIN</Link>
    </div>
  );
};

const variousLinkStyle = css`
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
`;