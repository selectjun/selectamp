import { css } from '@emotion/react';
import SideItem from '../SideItem';

export default function Side() {
  return (
    <div css={sideStyle}>
      <ul>
        <SideItem icon="dashboard" text="Dashbaord" to="/dashboard" />
        <SideItem icon="course" text="Course" to="/course" />
        <SideItem icon="pamphlet" text="Pamphlet" to="/pamphlet" />
        <SideItem icon="location" text="Location" to="/location" />
        <SideItem icon="board" text="Board" to="/board" />
        <SideItem icon="guide" text="Guide" to="/guide" />
        <SideItem icon="notice" text="Notice" to="/notice" />
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