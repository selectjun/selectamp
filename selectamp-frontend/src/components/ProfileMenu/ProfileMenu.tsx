import { css } from '@emotion/react';

export type ProfileMenuProps = {
  isVisible: boolean
};

export default function ProfileMenu({ isVisible }: ProfileMenuProps) {
  return (
    isVisible
    ? <div css={profileMenuStyle}>
        ProfileMenu
        <ul>
          <li></li>
          <li>LOGOUT</li>
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
  padding: 1rem;
`;