import { KeyboardEvent } from 'react';

type InputBarProps = {
  setUrl: (val: string) => void;
  submitForm: () => void;
};

const InputBar = ({ setUrl, submitForm }: InputBarProps) => {
  const keyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      submitForm();
    }
  };

  return (
    <input
      className="flex-grow md:p-4 rounded-l-3xl p-3 border shadow-xl outline-none"
      placeholder={'Paste long url'}
      style={{ overflowX: 'clip' }}
      onChange={(e) => setUrl(e.target.value)}
      onKeyDown={(e) => keyPress(e)}
    />
  );
};

export default InputBar;
