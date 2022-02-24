var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { NODE_TYPE } from './types.js';
export function astar(grid) {
    return __awaiter(this, void 0, void 0, function* () {
        if (grid.start === null || grid.end === null) {
            alert('Missing Start/End Node!');
            return;
        }
        let curr;
        let visiting = [grid.start];
        grid.start.cost.g = 0;
        grid.start.cost.h = nodeDist(grid.start, grid.end);
        let reachedEnd = false;
        while (!reachedEnd) {
            visiting.sort((a, b) => { return a.cost.f == b.cost.f ? 0 : a.cost.f < b.cost.f ? 1 : -1; });
            curr = visiting.pop();
            if (curr.type !== NODE_TYPE.START) {
                curr.type = NODE_TYPE.VISITED;
            }
            yield sleep(50);
            neighboringNodes(grid, curr).forEach((node) => {
                if (node.type == NODE_TYPE.END) {
                    node.prev_node = curr;
                    reachedEnd = true;
                }
                else if (node.type == NODE_TYPE.EMPTY ||
                    (node.type == NODE_TYPE.VISITING && getCosts(grid, node, curr).f < node.cost.f)) {
                    setCosts(grid, node, curr);
                    node.prev_node = curr;
                    node.type = NODE_TYPE.VISITING;
                    visiting.push(node);
                }
            });
        }
        curr = grid.end.prev_node;
        while (curr.type !== NODE_TYPE.START) {
            yield sleep(50);
            curr.type = NODE_TYPE.PATH;
            curr = curr.prev_node;
        }
    });
}
function nodeDist(node1, node2) {
    let x_dist = Math.abs(node1.x - node2.x);
    let y_dist = Math.abs(node1.y - node2.y);
    if (x_dist < y_dist) {
        return x_dist * 14 + (y_dist - x_dist) * 10;
    }
    else {
        return y_dist * 14 + (x_dist - y_dist) * 10;
    }
}
function neighboringNodes(grid, node) {
    let nodes = [];
    const offsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    offsets.forEach((off) => {
        let x = node.x + off[0];
        let y = node.y + off[1];
        if (0 <= x && x < grid.width &&
            0 <= y && y < grid.height &&
            (grid.nodes[y][x].type !== NODE_TYPE.VISITED ||
                grid.nodes[y][x].type !== NODE_TYPE.START ||
                grid.nodes[y][x].type !== NODE_TYPE.WALL)) {
            nodes.push(grid.nodes[y][x]);
        }
    });
    return nodes;
}
function getCosts(grid, node, prev) {
    let [g, h] = [prev.cost.g + nodeDist(prev, node), nodeDist(node, grid.end)];
    return { g, h, f: g + h };
}
function setCosts(grid, node, prev) {
    let costs = getCosts(grid, node, prev);
    node.cost.g = costs.g;
    node.cost.h = costs.h;
    node.elem.textContent = node.cost.f.toString();
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
//# sourceMappingURL=astar.js.map