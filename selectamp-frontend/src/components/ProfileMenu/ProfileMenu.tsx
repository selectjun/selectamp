import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import ProfileMenuItem from '../ProfileMenuItem';

export type ProfileMenuProps = {
  isVisible: boolean
};

export default function ProfileMenu({ isVisible }: ProfileMenuProps) {
  return (
    isVisible
    ? <div css={profileMenuStyle}>
        <ul className="profile-menu-list">
          <ProfileMenuItem type="link" to="/dashboard" text={"회원정보"} />
          <ProfileMenuItem type="button" text={"LOGOUT"} callback={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            console.log(e.target);
            if (window.confirm("정말로 로그아웃 하시겠습니까?")) { alert("로그아웃 되었습니다!"); }
          }} />
        </ul>
      </div>
    : null
  );
};

const profileMenuStyle = css`
  position: absolute;
  border: 1px solid #bbb;
  width: 12.5rem;
  right: 1rem;
  box-shadow: 2px 3px 3px #bbb;
  border-radius: 0.5rem;
  background: #fff;
  top: 4rem;
  padding: 0.5rem;

  .profile-menu-list {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      padding: 0.5rem 0 0.5rem 0.5rem;

      &:hover {
        background: #eee;
      }
    }
  }
`;