import { css } from '@emotion/react';

export type CommunityContentsProps = {
  contents: string
};

export default function CommunityContents({ contents }: CommunityContentsProps) {
  return (
    <div className="post-contents" css={CommunityContenttStye} dangerouslySetInnerHTML={{ __html: contents }}></div>
  );
};

const CommunityContenttStye = css`
  width: calc(100% - 4rem);
  overflow: hidden;
  margin: 2rem 1rem 0;
  padding: 0 1rem 1rem;
  border-bottom: 1px solid #ccc;

  .se-image-container {
    width: 100%;

    figure {
      width: 100%;

      img {
        width: 100%;
      }
    }
  }
`;