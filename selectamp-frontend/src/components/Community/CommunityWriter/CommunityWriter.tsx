import { css } from '@emotion/react';
import { useState } from 'react';
import CommunityHeader from '../CommunityHeader';
import CommunityForm from '../CommunityForm';
import { CommunityType } from '../CommunityForm/CommunityForm';

export type CommunityWriterProps = { };

export default function CommunityWriter({ }: CommunityWriterProps) {
  const [community, setCommunity] = useState<CommunityType>();

  return (
    <section css={communityWriteStyle}>
      <CommunityHeader title="새 글쓰기" subTitle="목록" url={"/community"} />
      <hr />
      <CommunityForm />
    </section>
  );
};

const communityWriteStyle = css`
  width: 60rem;
  margin: 0 auto;
  padding-top: 2rem;
`;