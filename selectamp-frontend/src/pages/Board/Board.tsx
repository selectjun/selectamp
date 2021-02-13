import { css } from '@emotion/react';

export type BoardProps = {};

export default function Board({}: BoardProps) {
  return (
    <section css={boardStyle}>
      <h2 className="page-title">Board</h2>
      <hr />
    </section>
  );
};

const boardStyle = css`
  width: 60rem;
  margin: 0 auto;
  padding-top: 2rem;

  .page-title {
    padding-left: 1.25rem;
  }
`;