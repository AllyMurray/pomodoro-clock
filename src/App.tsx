/** @jsx jsx */

import { css, jsx } from '@emotion/core';

import PomodoroClock from './components/PomodoroClock';

const appStyle = css`
  align-items: center;
  background-color: #bbdefb;
  color: white;
  display: flex;
  flex-direction: column;
  font-size: calc(10px + 2vmin);
  justify-content: center;
  min-height: 100vh;
`;

function App() {
  return (
    <div css={appStyle}>
      <PomodoroClock />
    </div>
  );
}

export default App;
