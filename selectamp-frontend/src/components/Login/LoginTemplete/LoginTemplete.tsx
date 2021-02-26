import { css } from '@emotion/react';

export type LoginTempleteProps = {
  children: React.ReactNode
};

export default function LoginTemplete({ children }: LoginTempleteProps) {
  return (
    <div css={loginTempleteStyle}>{children}</div>
  );
};

const loginTempleteStyle = css`
  width: 100%;
  height: 100%;
  background: #f5f6f7;
`;