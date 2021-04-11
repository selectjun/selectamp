import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Icon from '../../Icon';
import dateFormat from 'dateformat';
import { CommunityType } from '../CommunityViewer/CommunityViewer';
import { API } from '../../axios';

export type CommunityInfoPrpops = {
  community: CommunityType
};

export default function CommunityInfo({ community }: CommunityInfoPrpops) {
  const history = useHistory();
  const [userId, setUserId] = useState<string>();

  const handleDeleteCommunity = async (): Promise<void> => {
    if (!window.confirm("정말로 삭제하시겠습니까?")) return;

    const url = `/api/community/${community?.id}/`;
    await API.delete(url).then(response => {
      if (response.data.success) {
        alert(response.data.message);
      }
      history.push("/community");
    }).catch(error => {
      alert(error.response.data.message);
    });
  }

  useEffect(() => {
    const getUserIdUrl = `/api/user/id/`;
    API.get(getUserIdUrl).then(response => {
      if (response.data.success) {
        setUserId(response.data.id);
      }
    });
  }, []);

  return (
    <div className="post-info" css={communityInfoStyle}>
      <div className="post-info-top">
        <div className="post-info-top-left">
          <span className="community-kinds-code-name">{community.communityKindsCode.description}</span>
          <span className="user-id">by {community.userId}</span>
          <span className="create-at">{dateFormat(new Date(community.createAt), "yyyy-mm-dd HH:MM:ss")}</span>
        </div>
        {
          userId === community.userId
          ? <div className="post-info-top-right">
            <Link to={`/community/${community.id}/modify`}>수정</Link> |  
            <button type="button" onClick={handleDeleteCommunity}>삭제</button>
          </div>
          : null
        }
      </div>
      <div className="post-info-bottom">
        <Icon name="view" /> 
        <span>{community.viewCount}</span>
        <Icon name="comment" />
        <span> 0</span>
      </div>
    </div>
  );
};

const communityInfoStyle = css`
  padding: 2rem 1rem 0;

  &> div {
    margin-left: 1rem;
  }

  .post-info-top {
    .post-info-top-left {
      float: left;
      display: inline-block;

      span:not(:last-child):after {
        content: " · ";
        font-weight: bold;
      }

      .community-kinds-code-name {
        color: #005CB2;
        font-weight: bold;
      }
    }

    .post-info-top-right {
      float: right;
      display: inline-block;

      a {
        text-decoration: none;
        font-size: 1rem;
        color: #000;

        &:visited {
          color: #000;
        }
      }

      button {
        border: none;
        background: none;
        font-size: 1rem;

        &:focus {
          outline: none;
        }
      }
    }
  }

  .post-info-bottom {
    padding-top: 1rem;
    height: 2.5rem;
    clear: both;

    &> * {
      display: inline-block; 
      float: left;
    }

    &> span:not(:last-child) {
      margin-right: 1rem;
    }
    
    svg {
      width: 1.725rem;
      height: 1.725rem;
    }

    span {
      height: 1.5rem;
      line-height: 1.725rem;

      &:before {
        display: inline-block;
        width: 0.225rem;
        content: " ";
      }
    }
  }

  &:after {
    display: block;
    content: " ";
    width: 100%;
    border-bottom: 1px solid #ccc;
  }
`;