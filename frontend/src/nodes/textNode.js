// textNode.js

import { useState } from 'react';
import { BaseNode } from './baseNode';

const variableRegex = /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  const variables = Array.from(currText.matchAll(variableRegex)).map(
    (match) => match[1]
  );

  return (
    <BaseNode
      id={id}
      title="Text"
      inputHandles={variables.map((v) => ({ id: v }))}
      outputHandles={[{ id: `${id}-output` }]}
    >
      <div>
        <label>
          Text:
          <textarea
            value={currText}
            onChange={(e) => {
              setCurrText(e.target.value);
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
            style={{
              width: '100%',
              minHeight: 40,
              resize: 'none'
            }}
          />
        </label>
      </div>
    </BaseNode>
  );
};