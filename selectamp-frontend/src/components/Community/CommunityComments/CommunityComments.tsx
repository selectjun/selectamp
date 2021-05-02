import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { API } from '../../axios';

import CommunityCommentsForm from './CommunityCommentForm';
import CommunityCommentsList from './CommunityCommentList';

export type CommunityCommentsProps = {
  id: string
};

export default function CommunityComments({ id }: CommunityCommentsProps) {
  const [comments, setComments] = useState<Array<any>>();
  const [commentPage, setCommentPage] = useState<number>(1);
  const [commentsTotal, setCommentsTotal] = useState<number>(0);
  const [commentCountPerPage, setCommentCountPerPage] = useState<number>(5);

  useEffect(() => {
    const url = `/api/community/comment/communityId/${id}/?commentPage=${commentPage}`;
    API.get(url).then(response => {
      if (response.data.success) {
        setComments(response.data.comments);
        setCommentsTotal(response.data.parentCommentCount);
        setCommentPage(commentPage <= Math.ceil(response.data.parentCommentCount / commentCountPerPage) ? commentPage + 1 : commentPage);
      }
    });
  }, []);

  return (
    <div className="commmunity-comments-box"  css={communityCommentsStyle}>
      <div className="commmunity-comments-inner-box">
        <CommunityCommentsForm id={id} comments={comments} onSetComments={setComments} />
        {
          comments
          ? <CommunityCommentsList
            id={id}
            comments={comments}
            commentPage={commentPage}
            commentsTotal={commentsTotal}
            commentCountPerPage={commentCountPerPage}
            onSetComments={setComments}
            onSetCommentPage={setCommentPage} />
          : null
        }
      </div>
    </div>
  );
};

const communityCommentsStyle = css`
  .commmunity-comments-inner-box {
    width: calc(100% - 2rem);
    padding: 2rem 0;
    margin: 0 auto;
  }
`;