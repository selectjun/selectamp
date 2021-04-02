import { useHistory } from "react-router";
import Icon from '../../Icon';

export type CommunityHeaderProps = {
  title: string,
  url: string
};

export default function CommunityHeader({ title, url }: CommunityHeaderProps) {
  const history = useHistory();

  return (
    <div className="contents-header">
      <div onClick={() => { history.push(url); }}>
        <Icon name="backArrow" />
      </div>
      <div>
        <span className="prev-page-title">List</span>
        <h2 className="page-title">{title}</h2>
      </div>
    </div>
  );
};