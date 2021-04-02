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
    <div className="post-info">
      <div className="post-info-top">
        <div className="post-info-top-left">
          <span className="community-kinds-code-name">{community.communityKindsCodeName}</span>
          <span className="user-id">by {community.userId}</span>
          <span className="create-at">{dateFormat(new Date(community.createAt), "yyyy-mm-dd HH:MM:ss")}</span>
        </div>
        {
          userId === community.userId
          ? <div className="post-info-top-right">
            <Link to="">Modify</Link> |  
            <button type="button" onClick={handleDeleteCommunity}>Delete</button>
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