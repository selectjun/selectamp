import { css } from '@emotion/react';

export type CommunityContentsProps = {
  contents: string
};

export default function CommunityContents({ contents }: CommunityContentsProps) {
  return (
    <div className="post-contents" css={CommunityContenttStye}>{contents}</div>
  );
};

const CommunityContenttStye = css`
  margin: 2rem 1rem 0;
  padding: 0 1rem 1rem;
  border-bottom: 1px solid #ccc;
`;