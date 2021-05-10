import { css } from '@emotion/react';
import SideItem from '../SideItem';

export default function Side() {
  return (
    <div css={sideStyle}>
      <ul>
        <SideItem icon="dashboard" text="대쉬보드" to="/dashboard" />
        <SideItem icon="pamphlet" text="팜플렛" to="/pamphlet" />
        <SideItem icon="board" text="커뮤니티" to="/community" />
        <SideItem icon="guide" text="가이드" to="/guide" />
        <SideItem icon="notice" text="공지사항" to="/notice" />
      </ul>
    </div>
  );
}

const sideStyle = css`
  ul {
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      margin-top: 1rem;
    }
  }
`;