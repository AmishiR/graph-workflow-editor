from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Pipeline(BaseModel):
    nodes: list
    edges: list


def is_dag(nodes, edges):
    # Build graph using node IDs only (extract from handle IDs if needed)
    node_ids = {node["id"] for node in nodes}
    graph = {node_id: [] for node_id in node_ids}

    for edge in edges:
        source = edge["source"]
        target = edge["target"]

        # Extract node IDs from handle IDs (e.g., "llm_1-response" -> "llm_1")
        source_node = source.split('-')[0] if '-' in source else source
        target_node = target.split('-')[0] if '-' in target else target

        if source_node in graph and target_node in graph:
            graph[source_node].append(target_node)

    visited = set()
    rec_stack = set()

    def dfs(node):
        if node in rec_stack:
            return False

        if node in visited:
            return True

        visited.add(node)
        rec_stack.add(node)

        for neighbor in graph[node]:
            if not dfs(neighbor):
                return False

        rec_stack.remove(node)
        return True

    for node_id in graph:
        if not dfs(node_id):
            return False

    return True


@app.get('/')
def read_root():
    return {'Ping': 'Pong'}


@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    is_dag_result = is_dag(pipeline.nodes, pipeline.edges)

    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag_result
    }