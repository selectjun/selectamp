import { css } from '@emotion/react';
import { useState } from 'react';
import { comment } from '../../Icon/svg';
import CommunityCommentItem from './CommunityCommentItem';
import { API } from '../../axios';

export type CommunityCommentsListType = {
  id: string,
  comments: Array<any>,
  commentPage: number,
  commentsTotal: number,
  commentCountPerPage: number,
  onSetComments: (comments: any) => void,
  onSetCommentPage: (commentPage: number) => void
};

export default function CommunityCommentsList({ id, comments, commentPage = 1, commentsTotal = 0, commentCountPerPage, onSetComments, onSetCommentPage }: CommunityCommentsListType) {
  const handleCommentMoreButton = () => {
    const url = `/api/community/comment/communityId/${id}/?commentPage=${commentPage}`;
    API.get(url).then(response => {
      if (response.data.success) {
        onSetComments(comments.concat(response.data.comments));
        onSetCommentPage(commentPage <= Math.ceil(commentsTotal / commentCountPerPage) ? commentPage + 1 : commentPage);
      }
    });
  }

  return (
    comments
    ? <ul css={communityCommentsListStyle}>
      {
        comments.map((item, index) => <CommunityCommentItem key={index} id={id} comment={item} comments={comments} onSetComments={onSetComments} />)
      }
      {
        commentPage <= Math.ceil(commentsTotal / commentCountPerPage)
        ? <li>
          <button className="comment-more-button" onClick={handleCommentMoreButton}>더보기</button>
        </li>
        : null
      }
    </ul>
    : null
  );
};

const communityCommentsListStyle = css`
  padding: 1.25rem 1rem 0;
  list-style: none;
  clear: both;

  .comment-more-button {
    cursor: pointer;
    background: none;
    border: 1px solid #bbb;
    padding: 0.5rem 1rem;
    box-shadow: 1px 1px 4px #ddd;
    font-weight: bold;

    &:focus {
      outline: none;
    }
  }
`;