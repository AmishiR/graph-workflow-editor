

export async function submitPipeline(nodes, edges) {
  const res = await fetch('http://127.0.0.1:8000/pipelines/parse', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nodes, edges }),
  });

  const data = await res.json();

  alert(
    `Nodes: ${data.num_nodes}\nEdges: ${data.num_edges}\nIs DAG: ${data.is_dag}`
  );
}

export const SubmitButton = ({ onClick }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <button type="submit" onClick={onClick}>Submit</button>
    </div>
  );
};