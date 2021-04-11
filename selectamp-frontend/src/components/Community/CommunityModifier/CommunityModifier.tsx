import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import CommunityHeader from '../CommunityHeader';
import CommunityModifyForm from '../CommunityModifyForm';
import { API } from '../../axios';
import { CommunityType } from '../CommunityForm/CommunityForm';

export type CommunityModifierProps = {
  id: string
};

export default function CommunityModifier({ id }: CommunityModifierProps) {
  const [community, setCommunity] = useState<CommunityType>();

  useEffect(() => {
    const url: string = `/api/community/${id}/`;
    API.get(url).then(response => {
      console.log(response.data);
      if (response.data.success) {
        setCommunity(response.data.community);
      }
    });
  }, []);

  return (
    <section css={communityModifierStyle}>
      <CommunityHeader title="Modify" subTitle="상세" url={`/community/${id}`} />
      <hr />

      <CommunityModifyForm id={id} />
    </section>
  );
};

const communityModifierStyle = css`
  width: 60rem;
  margin: 0 auto;
  padding-top: 2rem;
`;