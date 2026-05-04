// delayNode.js

import { useState } from 'react';
import { BaseNode } from '../baseNode';

export const DelayNode = ({ id, data }) => {
  const [delayMs, setDelayMs] = useState(data?.delayMs || 1000);

  const handleDelayChange = (e) => {
    setDelayMs(Number(e.target.value));
  };

  return (
    <BaseNode
      id={id}
      title="Delay"
      inputHandles={[{ id: `${id}-input` }]}
      outputHandles={[{ id: `${id}-output` }]}
    >
      <div>
        <label>
          Delay (ms):
          <input
            type="number"
            value={delayMs}
            onChange={handleDelayChange}
            min="0"
            step="100"
          />
        </label>
      </div>
    </BaseNode>
  );
};