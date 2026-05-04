// loggerNode.js

import { useState } from 'react';
import { BaseNode } from '../baseNode';

export const LoggerNode = ({ id, data }) => {
  const [logLevel, setLogLevel] = useState(data?.logLevel || 'info');

  const handleLevelChange = (e) => {
    setLogLevel(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Logger"
      inputHandles={[{ id: `${id}-input` }]}
      outputHandles={[{ id: `${id}-output` }]}
    >
      <div>
        <label>
          Level:
          <select value={logLevel} onChange={handleLevelChange}>
            <option value="debug">Debug</option>
            <option value="info">Info</option>
            <option value="warn">Warn</option>
            <option value="error">Error</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};