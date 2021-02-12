import { css } from '@emotion/react';

export default function Side() {
  return (
    <div css={sideStyle}>
      <ul>
        <li>
          <span className="menu-icon">I</span>
          <span className="menu-text">Dashboard</span>
        </li>
        <li>
          <span className="menu-icon">I</span>
          <span className="menu-text">Course</span>
        </li>
        <li>
          <span className="menu-icon">I</span>
          <span className="menu-text">Pamphlet</span>
        </li>
        <li>
          <span className="menu-icon">I</span>
          <span className="menu-text">Location</span>
        </li>
        <li>
          <span className="menu-icon">I</span>
          <span className="menu-text">Board</span>
        </li>
        <li>
          <span className="menu-icon">I</span>
          <span className="menu-text">Guide</span>
        </li>
        <li>
          <span className="menu-icon">I</span>
          <span className="menu-text">Notice</span>
        </li>
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
      .menu-icon {
        font-size: 2.25rem;
      }

      .menu-text {
        font-size: 1.3125rem;
      }
    }
  }
`;