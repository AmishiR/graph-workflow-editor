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
    print("=" * 50)
    print("DEBUG DAG CHECK")
    print("=" * 50)

    # Get all node IDs
    node_id_list = [n.get("id") for n in nodes]
    print(f"Node IDs: {node_id_list}")

    # Build adjacency list
    graph = {nid: [] for nid in node_id_list}

    for edge in edges:
        # source and target are ALREADY node IDs
        source = edge.get("source", "")
        target = edge.get("target", "")

        print(f"Edge: source='{source}', target='{target}'")

        # Use directly - no parsing needed!
        source_node = source
        target_node = target

        print(f"  -> source_node='{source_node}', target_node='{target_node}'")

        if source_node in graph and target_node in graph:
            graph[source_node].append(target_node)
            print(f"  Added edge to graph")

    print(f"Final graph: {graph}")

    # DFS cycle detection
    visited = set()
    rec_stack = set()

    def has_cycle(node):
        print(f"Visiting node: {node}")
        if node in rec_stack:
            print(f"  -> CYCLE DETECTED! {node} is in recursion stack")
            return True

        if node in visited:
            print(f"  -> Already visited, skipping")
            return False

        visited.add(node)
        rec_stack.add(node)

        for neighbor in graph.get(node, []):
            if has_cycle(neighbor):
                return True

        rec_stack.remove(node)
        return False

    # Check each node
    for start_node in graph:
        print(f"\nStarting check from: {start_node}")
        if has_cycle(start_node):
            print(f"Cycle found! Returning False")
            return False

    print("No cycles found! Returning True")
    return True


@app.get("/")
def read_root():
    return {"Ping": "Pong"}


@app.post("/pipelines/parse")
def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    is_dag_result = is_dag(pipeline.nodes, pipeline.edges)

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag_result,
    }