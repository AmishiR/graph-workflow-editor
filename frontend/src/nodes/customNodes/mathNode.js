

import { useState } from 'react';
import { BaseNode } from '../baseNode';

export const MathNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'add');

  const handleOperationChange = (e) => {
    setOperation(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Math"
      inputHandles={[
        { id: `${id}-a`, style: { top: '33%' } },
        { id: `${id}-b`, style: { top: '66%' } }
      ]}
      outputHandles={[{ id: `${id}-result` }]}
    >
      <div>
        <label>
          Operation:
          <select value={operation} onChange={handleOperationChange}>
            <option value="add">Add</option>
            <option value="subtract">Subtract</option>
            <option value="multiply">Multiply</option>
            <option value="divide">Divide</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};