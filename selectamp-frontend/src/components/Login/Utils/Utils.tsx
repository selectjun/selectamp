import { css } from '@emotion/react';
import Icon from '../../Icon';

export type UtilsProps = {
  isSaveId: boolean,
  handleIsSaveId: (isSaveId: boolean) => void
};

export default function UtilsProps({ isSaveId, handleIsSaveId }: UtilsProps) {
  return (
    <div className="user-utils" css={utilsStyle}>
      <label className={isSaveId ? "checkbox active" : "checkbox"}>
        <Icon name="checkbox" />
        <input
          type="checkbox"
          name="isSaveId"
          checked={isSaveId}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleIsSaveId(!isSaveId)} /> 
        <span className="checkbox-txt">Save id</span>
      </label>
    </div>
  );
};

const utilsStyle = css`
  margin-top: 1rem;

  label.checkbox {
    cursor: pointer;

    svg {
      fill: #999;
      width: 1.5rem;
      height: 1.5rem;
      float: left;
    }

    &.active svg {
      fill: #005CB2;
    }
  }

  [name="isSaveId"] {
    display: none;
  }

  span.checkbox-txt {
    display: inline-block;
    margin-left: 0.5rem;
    float: left;
    line-height: 1.5rem;
  }
`;