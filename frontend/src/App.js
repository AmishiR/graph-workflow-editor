import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton, submitPipeline } from './submit';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

function App() {
  const { nodes, edges } = useStore((state) => ({
    nodes: state.nodes,
    edges: state.edges,
  }), shallow);

  const handleSubmit = () => {
    submitPipeline(nodes, edges);
  };

  return (
    <div>
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton onClick={handleSubmit} />
    </div>
  );
}

export default App;