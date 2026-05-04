// baseNode.js

import { Handle, Position } from 'reactflow';

export const BaseNode = ({ id, title, inputHandles = [], outputHandles = [], children }) => {
  return (
    <div className="node" style={{ width: 200, minHeight: 80, border: '1px solid black', padding: '10px', backgroundColor: '#fff' }}>
      <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>
        {title}
      </div>

      {/* Input Handles (left side) */}
      {inputHandles.map((handle, index) => (
        <Handle
          key={handle.id}
          type="target"
          position={Position.Left}
          id={handle.id}
          style={handle.style || { top: `${((index + 1) / (inputHandles.length + 1)) * 100}%` }}
        />
      ))}

      {/* Custom content */}
      <div>{children}</div>

      {/* Output Handles (right side) */}
      {outputHandles.map((handle, index) => (
        <Handle
          key={handle.id}
          type="source"
          position={Position.Right}
          id={handle.id}
          style={handle.style || { top: `${((index + 1) / (outputHandles.length + 1)) * 100}%` }}
        />
      ))}
    </div>
  );
};