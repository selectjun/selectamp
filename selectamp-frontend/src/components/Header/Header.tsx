import { useCallback, useState } from 'react';
import { css } from '@emotion/react';
import ProfileMenu from '../ProfileMenu';

export default function Header() {
  const [isVisible, setIsVisible] = useState(false);

  const onClickUserProfile = useCallback(() => setIsVisible(!isVisible), [isVisible]);

  return (
    <div css={headerStyle}>
      <h1>selectamp</h1>
      <div className="user-profile" onClick={onClickUserProfile}>
        <span className="user-profile-image"></span>
        <span className="user-profile-name">selectjun</span>
      </div>
      <ProfileMenu isVisible={isVisible} />
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
    height: 3rem;
    position: absolute;
    top: 0.75rem;
    right: 1.75rem;
    padding: 0 0.5rem;

    &:hover {
      cursor: pointer;
      border-radius: 1rem;
      background: rgba(238, 238, 238, 0.2);
      padding: 0.25rem 0.5rem 0.25rem;
      top: 0.5rem;
    }

    .user-profile-image {
      display: inline-block;
      width: 48px;
      height: 48px;
      border-radius: 100%;
      background: #ddd;
      margin-right: 0.75rem;
      float: left;
    }

    .user-profile-name {
      height: 100%;
      display: inline-block;
      font-size: 1.5rem;
      color: #fff;
      line-height: 3rem;
      float: left;
    }

  }
`;