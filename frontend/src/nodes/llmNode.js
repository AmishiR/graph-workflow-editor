

import { BaseNode } from './baseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      inputHandles={[
        { id: `${id}-system`, style: { top: '33%' } },
        { id: `${id}-prompt`, style: { top: '66%' } }
      ]}
      outputHandles={[{ id: `${id}-response` }]}
    >
      <div>
        <span>This is a LLM.</span>
      </div>
    </BaseNode>
  );
};