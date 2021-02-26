import { css } from '@emotion/react';
import PageTemplete from '../../components/Base/PageTemplete';
import CommunityBoard from '../../components/Community/CommunityBoard';
import CommunityBoardHead from '../../components/Community/CommunityBoardHead';
import CommunityBoardBody from '../../components/Community/CommunityBoardBody';

export type CommunityProps = {};

export default function Community({}: CommunityProps) {
  return <div></div>;
};

const communityStyle = css`
  width: 60rem;
  margin: 0 auto;
  padding-top: 2rem;

  .page-title {
    padding-left: 1.25rem;
  }
`;