import { css } from '@emotion/react';

export type InputProps = {
  type: string,
  name: string,
  value?: string
  placeholder: string,
  handleLoginData: (name: string, value: string) => void
};

export default function Input({ type, name, value, placeholder, handleLoginData }: InputProps) {
  return (
    <div className="input-box" css={inputStyle}>
      <input
        type={type}
        name={name}
        value={value}
        className="input-type-text"
        placeholder={placeholder}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleLoginData(e.target.name, e.target.value)} />
    </div>
  );
};

const inputStyle = css`
  margin: 1rem 0;
  height: 2rem;

  input.input-type-text {
    width: calc(100% - 1.5rem);
    height: 1rem;
    padding: 0.5rem 0.75rem;
    outline: none;
    border: 0.0625rem solid #bbb;

    &:focus {
      border: none;
      outline: 0.0625rem solid #005CB2;
    }
  }
`;