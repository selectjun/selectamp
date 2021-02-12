import { css } from '@emotion/react';

export default function Header() {
  return (
    <div css={headerStyle}>
      <h1>selectamp</h1>
      <div className="user-profile">
        <span className="user-profile-image"></span>
        <span className="user-profile-name">selectjun</span>
      </div>
    </div>
  );
};

const headerStyle = css`
  width: 100%;
  height: 100%;
  position: relative;

  h1 {
    color: #fff;
    margin: 0;
    padding-left: 1.25rem;
    line-height: 4.5rem;
  }

  .user-profile {
    height: 100%;
    position: absolute;
    top: 0;
    right: 1.75rem;

    .user-profile-image {
      display: inline-block;
      width: 48px;
      height: 48px;
      border-radius: 100%;
      background: #ddd;
      margin-top: 0.75rem;
      margin-right: 0.75rem;
      float: left;
    }

    .user-profile-name {
      height: 100%;
      display: inline-block;
      font-size: 1.5rem;
      color: #fff;
      line-height: 4.5rem;
      float: left;
    }

  }
`;