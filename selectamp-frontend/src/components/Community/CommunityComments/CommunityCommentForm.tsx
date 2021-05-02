import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { API } from '../../axios';

export type CommunityCommentsFormProps = {
  id: string,
  comments?: Array<any>,
  onSetComments: (comments: any) => void
};

export default function CommunityCommentsForm({ id, comments, onSetComments }: CommunityCommentsFormProps) {
  const [comment, setComment] = useState<string>("");

  const handleCommentData = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setComment(value);
  }

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>): void  => {
    e.preventDefault();

    if (!comment.trim()) {
      alert("댓글 내용을 입력해주세요.");
    } else {
      const url = `/api/community/comment/?communityId=${id}&contents=${comment}`;
      API.post(url).then(response => {
        if (response.data.success) {
          onSetComments(comments?.concat(response.data.comment).sort((a ,b) => b.id - a.id));
          setComment("");
        }
      }).catch(error => {
        alert(error.response.data.message);
      });
    }
  };

  return (
    <form onSubmit={handleSubmitForm} css={communityCommentsFormStyle}>
      <div>
        <input type="text" name="contents" id="contents" max="2000" value={comment} onChange={handleCommentData} />
      </div>
      <div>
        <input type="submit" className="submit-button" value="댓글쓰기" />
      </div>
    </form>
  );
};

const communityCommentsFormStyle = css`
  width: calc(100% - 2rem);
  margin: 0 1rem;

  div {
    &:first-of-type {
      width: 85%;
      float: left;

      #contents {
        width: calc(100% - 1.575rem);
        padding: 0.5rem 0.725rem;
        border-radius: 0.325rem;
        border: 1px solid #bbb;
      }
    }

    &:last-of-type {
      width: calc(15% - 1rem);
      float: left;
      padding-left: 1rem;

      .submit-button {
        width: 100%;
        color: #fff;
        background: #005CB2;
        border: none;
        outline: none;
        border-radius: 0.325rem;
        padding: 0.40625rem 0;
    
        &:foucs {
          outline: none;
        }

        &:hover {
          cursor: pointer;
        }
      }
    }
  }
`;