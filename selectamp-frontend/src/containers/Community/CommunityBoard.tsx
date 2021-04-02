import { css } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import CommunityBoardFooter from '../../components/Community/CommunityBoardFooter';
import { RootStateType } from '../../store/modules';

export type CommunityBoardProps = {
  totalCount: number,
  currentPage: number,
  countPerPage: number,
  children: React.ReactNode
};

export default function CommunityBoard({ totalCount, currentPage, countPerPage, children }: CommunityBoardProps) {
  const dispatch = useDispatch();

  const config = useSelector((state: RootStateType) => state.config);

  return (
    <CommunityBoardFooter
      totalCount={totalCount}
      currentPage={currentPage}
      countPerPage={countPerPage} />
);
};

const communityBoardStyle = css`
  width: 100%;
  margin-top: 1.5rem;
  
  &, thead, tbody, tr, th, td {
    border-collapse: collapse;
  }
`;