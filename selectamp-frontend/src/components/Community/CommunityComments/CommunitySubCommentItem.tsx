import { css } from '@emotion/react';
import { API } from '../../axios';
import dateFormat from 'dateformat';

export type CommunitySubCommentItemType = {
  comment: any,
  comments: Array<any>,
  onSetComments: (comments: any) => void
};

export default function CommunitySubCommentItem({ comment, comments, onSetComments }: CommunitySubCommentItemType) {

  const handleCommentDetailButton = (e: React.MouseEvent<HTMLElement>) => {
    const target = (e.target as HTMLElement);
    const id = target.dataset.id;

    const url = `/api/community/comment/${id}/`;
    API.get(url).then(response => {
      if (response.data.success) {
        onSetComments(
          comments.map(
            item => item.id == id
            ? {
              ...item,
              contents: response.data.comment.contents,
              isToShortWords: false 
            }
            : item
          )
        );
      }
    });
  };

  const handleCommentDeleteBtn = (e: React.MouseEvent): void => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    const commentId = (e.target as HTMLElement).dataset.id;
    const url = `/api/community/comment/${commentId}/`;
    API.delete(url).then(response => {
      if (response.data.success) {
        onSetComments(comments.filter(comment => comment.id != commentId));
      }
    });
  };

  return (
    <li css={communitySubCommentItemStyle}>
      <div className="sub-comment-item-top">
        <span className="user-profile-id">{comment.userId}</span>
        <span className="comment-text">{comment.contents}</span>
        {
          comment.isToShortWords
          ? <button className="comment-detail-button" data-id={comment.id} onClick={handleCommentDetailButton}>더보기</button>
          : null
        }
      </div>
      <div className="sub-comment-item-bottom">
        <span className="comment-create-at">{dateFormat(comment.createAt, "yyyy년 mm월 dd일 HH:MM:ss")}</span>
        <button className="comment-delete-button" title="삭제" data-id={comment.id} onClick={handleCommentDeleteBtn}>삭제</button>
      </div>
    </li>
  );
};

const communitySubCommentItemStyle = css`
  height: auto;
  margin-left: 1rem;
  word-break: break-all;

  &:nth-of-type(2) {
    clear: both;
    margin-top: 1rem;
  }

  &:not(:last-child) {
    margin-bottom: 2.5rem;
  }

  .sub-comment-item-top {
    .user-profile-id {
      font-weight: bold;
      padding-right: 1rem;
    }

    .comment-detail-button {
      cursor: pointer;
      border: none;
      background: none;
      color: #666;

      &:focus {
        outline: none;
      }

      &:hover {
        font-weight: bold;
      }
    }
  }

  .sub-comment-item-bottom {
    line-height: 2rem;

    .comment-create-at {
      padding-right: 0.25rem;
    }

    &:hover > .comment-delete-button {
      display: inline-block;
    }

    .comment-delete-button {
        color: red;
        font-size: 0.825rem;
        font-weight: bold;
        display: none;
        margin-left: 0.25rem;
        cursor: pointer;
        border: none;
        outline: none;
        background: none;
    }
  }
`;