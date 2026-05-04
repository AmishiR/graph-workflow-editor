
import { useState } from 'react';
import { BaseNode } from '../baseNode';

export const APINode = ({ id, data }) => {
  const [method, setMethod] = useState(data?.method || 'GET');
  const [url, setUrl] = useState(data?.url || '');

  const handleMethodChange = (e) => {
    setMethod(e.target.value);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="API Request"
      inputHandles={[{ id: `${id}-body` }]}
      outputHandles={[
        { id: `${id}-response`, style: { top: '33%' } },
        { id: `${id}-error`, style: { top: '66%' } }
      ]}
    >
      <div>
        <label>
          Method:
          <select value={method} onChange={handleMethodChange}>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </label>
        <label>
          URL:
          <input
            type="text"
            value={url}
            onChange={handleUrlChange}
            placeholder="https://api.example.com"
          />
        </label>
      </div>
    </BaseNode>
  );
};