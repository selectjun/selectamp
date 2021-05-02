import { css } from '@emotion/react';
import { useEffect, useRef, useState } from 'react';
import CommunitySubCommentList from './CommunitySubCommentList';
import { API } from '../../axios';
import dateFormat from 'dateformat';

export type CommunityCommentItemType = {
  id: string,
  comment: any,
  comments: Array<any>,
  onSetComments: (comments: any) => void
};

export default function CommunityCommentItem({ id, comment, comments, onSetComments }: CommunityCommentItemType) {
  const subCommentFormInputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [childCommentCount, setChildCommentCount] = useState<number>(0);

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
        setIsOpen(false);
        onSetComments(comments.filter(comment => comment.id != commentId));
      }
    });
  }

  const handleChildCommentMoreButton = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setChildCommentCount(comment.childCommentCount);
  }, []);

  return (
    <li css={communityCommentItemStyle}>
      <div className="comment-item-top">
        <span className="user-profile-id">{comment.userId}</span>
        <span className="comment-text">{comment.contents}</span>
        {
          comment.isToShortWords
          ? <button className="comment-detail-button" data-id={comment.id} onClick={handleCommentDetailButton}>더보기</button>
          : null
        }
      </div>
      <div className="comment-item-bottom">
        <span className="comment-create-at">{dateFormat(comment.createAt, "yyyy년 mm월 dd일 HH:MM:ss")}</span>
        <button className="comment-delete-button" title="삭제" data-id={comment.id} onClick={handleCommentDeleteBtn}>삭제</button>
      </div> 
      <button className="child-comment-more-button" onClick={handleChildCommentMoreButton}>
        {
          childCommentCount
          ? `댓글 ${childCommentCount}개 모두보기`
          : `댓글 달기`
        }
      </button>
      {
        isOpen
        ? <CommunitySubCommentList
          id={id}
          childCommentCount={childCommentCount}
          parentCommentId={comment.id} 
          subCommentFormInputRef={subCommentFormInputRef} 
          onSetChildCommentCount={setChildCommentCount} />
        : null
      }
    </li>
  );
};

const communityCommentItemStyle = css`
  &:not(:last-child) {
    margin-bottom: 1.725rem;
  }

  .comment-item-top {
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

  .comment-item-bottom {
    line-height: 2rem;

    .comment-create-at {
      padding-right: 0.25rem;
    }

    .comment-add-button {
      border: none;
      outline: none;
      background: none;

      &:hover {
        font-weight: bold;
      }
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

  button.child-comment-more-button {
    color: #666;
    border: none;
    outline: none;
    background: none;
    padding-left: 0;

    &:hover {
      cursor: pointer;
    }
  }
`;