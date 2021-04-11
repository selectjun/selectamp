import { css } from '@emotion/react';
import { useHistory } from "react-router";
import Icon from '../../Icon';

export type CommunityHeaderProps = {
  title: string,
  subTitle: string,
  url: string
};

export default function CommunityHeader({ title, subTitle, url }: CommunityHeaderProps) {
  const history = useHistory();

  return (
    <div className="contents-header" css={communityHeaderStyle}>
      <div onClick={() => { history.push(url); }}>
        <Icon name="backArrow" />
      </div>
      <div>
        <span className="prev-page-title">{subTitle}</span>
        <h2 className="page-title">{title}</h2>
      </div>
    </div>
  );
};

const communityHeaderStyle = css`
  height: 6rem;
  
  &> div {
    float: left;

    &:first-of-type {
      cursor: pointer;
      svg {
        width: 2rem;
        height: 2rem;
      }
    }

    &:last-of-type {
      padding-left: 1.25rem;

      .prev-page-title {
        height: 2rem;
        line-height: 2rem;
        font-weight: bold;
      }

      .page-title {
        margin: 0.725rem 0 0;
      }
    }
  }

  &:after {
    content: " ";
    display: block;
    clear: both;
  }
`;