import { $gridElem, NODE_TYPE } from './types.js';

export class node {
    x: number;
    y: number;
    elem: HTMLDivElement;

    // g: Distance from Starting Node, h: distance from End Node, f: g+h
    cost: { g: number, h: number, f: number, prev_node: node | null };

    constructor(x: number, y: number, elem: HTMLDivElement) {
        this.x = x;
        this.y = y;
        elem.classList.add("node");
        this.elem = elem;
        this.type = NODE_TYPE.EMPTY;

        this.cost = { g: 0, h: 0, f: 0, prev_node: null };
    }

    get type() {
        return this.elem.dataset.type!;
    }
    set type(value: string) {
        this.elem.dataset.type = value;
    }
}

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
        this.mode = NODE_TYPE.WALL; // TODO: Use enums instead?
        this.start = null;
        this.end = null;
        this.nodes = [];

        this.resetGrid(width, height);
    }

    fillNode(curr_node: node) {
        if (this.mode == NODE_TYPE.START) {
            // TODO: Can this be done with nullish operators?
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

    clearNode(curr_node: node) {
        if (this.mode == NODE_TYPE.START) {
            this.start = null;
        } else if (this.mode == NODE_TYPE.END) {
            this.end = null;
        }
        curr_node.type = NODE_TYPE.EMPTY;
    }

    resetGrid(width: number, height: number) {
        this.width = width;
        this.height = height;

        document.documentElement.style.setProperty("--width", width.toString());
        document.documentElement.style.setProperty("--height", height.toString());

        while ($gridElem.firstChild) {
            $gridElem.firstChild.remove()
        }
        this.nodes = [];

        for (let x = 0; x < width; x++) {
            const row: node[] = [];
            for (let y = 0; y < height; y++) {
                row.push(new node(x, y, document.createElement('div')));
            }
            this.nodes.push(row);
        }

        this.nodes.forEach((row: node[]) => {
            row.forEach((node: node) => {
                $gridElem.append(node.elem);
                node.elem.addEventListener('click', () => { this.fillNode(node) });
                node.elem.addEventListener('contextmenu', (e: Event) => {
                    e.preventDefault();
                    this.clearNode(node);
                });
            })
        })
    }
}
