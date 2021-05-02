import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import CommunitySubCommentsForm from './CommunitySubCommentForm';
import CommunitySubCommentItem from './CommunitySubCommentItem';
import { API } from '../../axios';

export type CommunitySubCommentListProps = {
  id: string,
  childCommentCount: number,
  parentCommentId: number,
  subCommentFormInputRef: React.RefObject<HTMLInputElement>
  onSetChildCommentCount: (childCommentCount: number) => void
};

export default function CommunitySubCommentList({ id, childCommentCount, parentCommentId, subCommentFormInputRef, onSetChildCommentCount }: CommunitySubCommentListProps) {
  const [commentCountPerPage, setCommentCountPerPage] = useState<number>(5);
  const [commentPage, setCommentPage] = useState<number>(1);
  const [comments, setComments] = useState<Array<any>>([]);

  const handleButton = (): void => {
    const url = `/api/community/comment/communityId/${id}/${parentCommentId}/?commentPage=${commentPage}`;
    API.get(url).then(response => {
      if (response.data.success) {
        setComments(comments.concat(response.data.comments));
        setCommentPage(commentPage <= Math.ceil(childCommentCount / commentCountPerPage) ? commentPage + 1 : commentPage);
      }
    });
  }

  useEffect(() => {
    const url = `/api/community/comment/communityId/${id}/${parentCommentId}/?commentPage=${commentPage}`;
    API.get(url).then(response => {
      if (response.data.success) {
        setComments(response.data.comments);
        setCommentPage(commentCountPerPage * commentPage <= childCommentCount ? commentPage + 1 : commentPage);
      }
    }).catch(e => { console.log(e) });
  }, []);

  return (
    comments
    ? <ul css={communitySubCommentListStyle}>
      <li className="sub-comment-form">
        <CommunitySubCommentsForm id={id} comments={comments} parentCommentId={parentCommentId} subCommentFormInputRef={subCommentFormInputRef} onSetComments={setComments} onSetChildCommentCount={onSetChildCommentCount} />
      </li>
      {
        comments.map((item, index) => <CommunitySubCommentItem key={index} comment={item} comments={comments} onSetComments={setComments} />)
      }
      {
        commentPage <= Math.ceil(childCommentCount / commentCountPerPage)
        ? <li>
          <button className="comment-more-button" onClick={handleButton}>더보기</button>
        </li>
        : null
      }
    </ul>
    : null
  )
};

const communitySubCommentListStyle = css`
  list-style: none;
  padding: 0.725rem 1.25rem 1.725rem;
  margin-top: 1rem;
  margin-left: 0.25rem;
  border-left: 2px solid #bbb;

  li.sub-comment-form {
    height: 2rem;
  }

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

  li:last-child {
    margin-left: 1rem;
  }
`;