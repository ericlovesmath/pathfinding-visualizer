import { $gridElem, astar_cost, NODE_TYPE } from './types.js';

/** Intended to be used as node of *Grid* Class
* Contains Div element in grid
* Params: x, y, elem, type, cost, prev_node*/
export class node {
    x: number;
    y: number;
    elem: HTMLDivElement;

    // A-Star Algorithm purposes
    cost: astar_cost;
    prev_node: node | null;

    constructor(x: number, y: number, elem: HTMLDivElement) {
        this.x = x;
        this.y = y;
        elem.classList.add("node");
        this.elem = elem;
        this.type = NODE_TYPE.EMPTY;

        this.cost = {
            g: 0,
            h: 0,
            get f() { return this.g + this.h },
        };
        this.prev_node = null;
    }

    get type() {
        return this.elem.dataset.type!;
    }
    set type(value: string) {
        this.elem.dataset.type = value;
    }
}

/** Contains 2d array of *nodes* 
* Mostly a wrapper of nodes[][] for convenience */
export class grid {
    nodes: node[][];
    start: node | null;
    end: node | null;
    width: number;
    height: number;
    mode: string;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.mode = NODE_TYPE.WALL;
        this.start = null;
        this.end = null;
        this.nodes = [];

        this.resetGrid(width, height);
    }

    /** Sets type of *Node* in *Grid* to the current *mode*
    * *mode* is set in class *Grid*, managed by the "Node Type" Selector */
    fillNode(curr_node: node) {
        if (this.mode == NODE_TYPE.START) {
            if (this.start !== null) {
                this.start.type = NODE_TYPE.EMPTY;
            }
            this.start = curr_node;
        } else if (this.mode == NODE_TYPE.END) {
            if (this.end !== null) {
                this.end.type = NODE_TYPE.EMPTY;
            }
            this.end = curr_node;
        }
        curr_node.type = this.mode;
    }

    /** Sets *Node* in *Grid* to type *empty* */
    clearNode(curr_node: node) {
        if (this.mode == NODE_TYPE.START) {
            this.start = null;
        } else if (this.mode == NODE_TYPE.END) {
            this.end = null;
        }
        curr_node.type = NODE_TYPE.EMPTY;
    }

    /** Resets *Grid* class
    * Removes all nodes and replaces with empty nodes of size width by height */
    resetGrid(width: number, height: number) {
        this.width = width;
        this.height = height;

        // Handles CSS vars
        document.documentElement.style.setProperty("--width", width.toString());
        document.documentElement.style.setProperty("--height", height.toString());

        // Clear nodes and divs if necessary
        while ($gridElem.firstChild) {
            $gridElem.firstChild.remove()
        }
        this.nodes = [];

        // Create and add nodes with divs
        for (let y = 0; y < height; y++) {
            const row: node[] = [];
            for (let x = 0; x < width; x++) {
                row.push(new node(x, y, document.createElement('div')));
            }
            this.nodes.push(row);
        }

        // Allow nodes to be filled in / cleared on click or right click
        this.nodes.forEach((row: node[]) => {
            row.forEach((node: node) => {
                $gridElem.append(node.elem);
                node.elem.addEventListener('click', () => {
                    this.clearSimulation();
                    this.fillNode(node)
                });
                node.elem.addEventListener('contextmenu', (e: Event) => {
                    e.preventDefault();
                    this.clearSimulation();
                    this.clearNode(node);
                });
            })
        })

        // Initialize Start and End positions
        this.start = this.nodes[0][0];
        this.end = this.nodes[height - 1][width - 1];
        this.nodes[0][0].type = NODE_TYPE.START;
        this.nodes[height - 1][width - 1].type = NODE_TYPE.END;
    }

    /** Sets all non start, end, or wall nodes to empty
    * Intended to clear artifacts after simulation */
    clearSimulation() {
        this.nodes.forEach((row: node[]) => {
            row.forEach((node: node) => {
                if (node.type !== NODE_TYPE.START &&
                    node.type !== NODE_TYPE.END &&
                    node.type !== NODE_TYPE.WALL) {
                    node.type = NODE_TYPE.EMPTY;
                }
                node.elem.textContent = "";
            })
        })


    }
}
