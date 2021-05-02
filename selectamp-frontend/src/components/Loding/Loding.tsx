import { css } from '@emotion/react';

export type LodingProps = {
  style?: React.CSSProperties
};

export default function Loding({ style }: LodingProps) {
  return (
    <div className="loading-container" css={lodingStyle} style={style}>
        <div className="loading"></div>
        <div className="loading-text">loading</div>
    </div>
  );
};

const lodingStyle = css`
  margin: 40px auto;

  &:hover .loading {
    border-color: transparent #E45635 transparent #E45635;
  }

  &, .loading {
    height: 100px;
    position: relative;
    width: 100px;
    border-radius: 100%;
  }

  .loading {
    border: 2px solid transparent;
    border-color: transparent #000 transparent #000;
    animation: rotate-loading 1.5s linear 0s infinite normal;
    transform-origin: 50% 50%;
  }

  @keyframes rotate-loading {
      0%  { transform: rotate(0deg); }
      100% { transform: rotate(360deg) }
  }

  @keyframes rotate-loading {
      0%  { transform: rotate(0deg) }
      100% { transform: rotate(360deg) }
  }

  @keyframes loading-text-opacity {
      0%  {opacity: 0}
      20% {opacity: 0}
      50% {opacity: 1}
      100%{opacity: 0}
  }

  &:hover .loading, .loading-container .loading {
      transition: all 0.5s ease-in-out;
  }

  .loading-text {
      animation: loading-text-opacity 2s linear 0s infinite normal;
      color: #000;
      font-family: "Helvetica Neue, "Helvetica", ""arial";
      font-size: 10px;
      font-weight: bold;
      margin-top: 45px;
      opacity: 0;
      position: absolute;
      text-align: center;
      text-transform: uppercase;
      top: 0;
      width: 100px;
  }
`;