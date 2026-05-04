// filterNode.js

import { useState } from 'react';
import { BaseNode } from '../baseNode';

export const FilterNode = ({ id, data }) => {
  const [filterType, setFilterType] = useState(data?.filterType || 'equals');
  const [filterValue, setFilterValue] = useState(data?.filterValue || '');

  const handleTypeChange = (e) => {
    setFilterType(e.target.value);
  };

  const handleValueChange = (e) => {
    setFilterValue(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Filter"
      inputHandles={[{ id: `${id}-input` }]}
      outputHandles={[
        { id: `${id}-match`, style: { top: '33%' } },
        { id: `${id}-no-match`, style: { top: '66%' } }
      ]}
    >
      <div>
        <label>
          Condition:
          <select value={filterType} onChange={handleTypeChange}>
            <option value="equals">Equals</option>
            <option value="contains">Contains</option>
            <option value="startsWith">Starts With</option>
            <option value="endsWith">Ends With</option>
          </select>
        </label>
        <label>
          Value:
          <input
            type="text"
            value={filterValue}
            onChange={handleValueChange}
          />
        </label>
      </div>
    </BaseNode>
  );
};