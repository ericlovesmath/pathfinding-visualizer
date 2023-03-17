import { node, grid } from './grid.js';
import { $gridContainer, $simulateBtn, astar_cost, NODE_TYPE } from './types.js';

type anim_node_list = {
  node: node;
  type: string;
}

/** Visualized A-star Search in one step */
export async function astar(grid: grid, speed: number) {

  let anim_node_list: anim_node_list[] = [];

  // Disable simulation while running
  $simulateBtn.disabled = true;
  $gridContainer.style.pointerEvents = "none";

  // Verify Start/End Nodes exist
  if (grid.start === null || grid.end === null) {
    alert('Missing Start/End Node!');
    return;
  }

  // Add Starting node to visiting list
  let curr: node;
  let visiting: node[] = [grid.start];
  grid.start.cost.g = 0;
  grid.start.cost.h = nodeDist(grid.start, grid.end);

  // Iterate through search until end node is reached
  let reachedEnd = false;
  while (!reachedEnd) {

    // Identify node with lowest f cost to visit
    visiting.sort((a, b) => { return a.cost.f == b.cost.f ? 0 : a.cost.f < b.cost.f ? 1 : -1 })

    curr = visiting.pop()!;

    // Testing Sleep
    if (curr.type === NODE_TYPE.VISITING) {
      await sleep(speed);
    }

    if (curr.type !== NODE_TYPE.START) {
      curr.type = NODE_TYPE.VISITED;
    }

    // Update costs of nodes neighboring current node, adds to "visiting" if available
    for (let node of neighboringNodes(grid, curr)) {
      if (node.type == NODE_TYPE.END) {
        node.prev_node = curr;
        reachedEnd = true;
      } else if (node.type == NODE_TYPE.EMPTY ||
        (node.type == NODE_TYPE.VISITING && getCosts(grid, node, curr).f < node.cost.f)) {
        setCosts(grid, node, curr);
        node.prev_node = curr;
        node.type = NODE_TYPE.VISITING
        visiting.push(node);
      }
    }
  }

  // Backtrack and highlight path
  curr = grid.end.prev_node!;
  while (curr.type !== NODE_TYPE.START) {
    await sleep(speed);
    curr.type = NODE_TYPE.PATH;
    curr = curr.prev_node!;
  }

  // Enable simulation button after completion
  $simulateBtn.disabled = false;
  $gridContainer.style.pointerEvents = "all";

}

/** Returns distance between two nodes, A-Star style */
function nodeDist(node1: node, node2: node): number {
  let x_dist = Math.abs(node1.x - node2.x);
  let y_dist = Math.abs(node1.y - node2.y);

  // Diagonal distance rounded sqrt(2) to 1.4
  if (x_dist < y_dist) {
    return x_dist * 14 + (y_dist - x_dist) * 10;
  } else {
    return y_dist * 14 + (x_dist - y_dist) * 10;
  }
}

/** Returns nodes in Moore neighborhood
* Does not return Visited, Start, or End nodes */
function neighboringNodes(grid: grid, node: node): node[] {
  let nodes: node[] = [];
  const offsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
  offsets.forEach((off: number[]) => {
    let x = node.x + off[0];
    let y = node.y + off[1];
    if (0 <= x && x < grid.width &&
      0 <= y && y < grid.height &&
      (grid.nodes[y][x].type !== NODE_TYPE.VISITED ||
        grid.nodes[y][x].type !== NODE_TYPE.START ||
        grid.nodes[y][x].type !== NODE_TYPE.WALL)) {
      nodes.push(grid.nodes[y][x]);
    }
  })
  return nodes;
}

/** Returns g, h, and f costs given the current and previous node */
function getCosts(grid: grid, node: node, prev: node): astar_cost {
  let [g, h] = [prev.cost.g + nodeDist(prev, node), nodeDist(node, grid.end!)];
  return { g, h, f: g + h };
}

/** Sets g, h, and f costs of a node given the previous node */
function setCosts(grid: grid, node: node, prev: node) {
  let costs = getCosts(grid, node, prev);
  node.cost.g = costs.g;
  node.cost.h = costs.h;
  node.elem.textContent = node.cost.f.toString();
}

/** Sleeps for *ms* milliseconds */
function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

