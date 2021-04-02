import { css } from '@emotion/react';
import CommunityHeader from '../CommunityHeader';
import CommunityForm from '../CommunityForm';

export type CommunityWriterProps = { };

export default function CommunityWriter({ }: CommunityWriterProps) {
  return (
    <section css={communityWriteStyle}>
      <CommunityHeader title="Writing" url={"/community"} />
      <hr />
      <CommunityForm />
    </section>
  );
};

const communityWriteStyle = css`
  width: 60rem;
  margin: 0 auto;
  padding-top: 2rem;
  
  .contents-header {
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
  }

  hr {
  }
`;