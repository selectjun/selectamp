import { css } from '@emotion/react';

export type CommunityBoardHeadProps = {};

export default function CommunityBoardHead({}: CommunityBoardHeadProps) {
  return (
    <thead css={communityBoardHeadStyle}>
      <tr>
        <th>No.</th>
        <th>Kinds</th>
        <th>Title</th>
        <th>Register</th>
        <th>Create At</th>
        <th>View</th>
      </tr>
    </thead>
  );
};

const communityBoardHeadStyle = css`
  &, tr, th {
    border-bottom: 1px solid #999;
  }

  tr > th {
    padding: 1rem 1rem;
  }
`;