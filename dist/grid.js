import { $gridElem, NODE_TYPE } from './types.js';
export class node {
    constructor(x, y, elem) {
        this.x = x;
        this.y = y;
        elem.classList.add("node");
        this.elem = elem;
        this.type = NODE_TYPE.EMPTY;
        this.cost = {
            g: 0,
            h: 0,
            get f() { return this.g + this.h; },
            prev_node: null
        };
    }
    get type() {
        return this.elem.dataset.type;
    }
    set type(value) {
        this.elem.dataset.type = value;
    }
}
export class grid {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.mode = NODE_TYPE.WALL;
        this.start = null;
        this.end = null;
        this.nodes = [];
        this.resetGrid(width, height);
    }
    fillNode(curr_node) {
        if (this.mode == NODE_TYPE.START) {
            if (this.start !== null) {
                this.start.type = NODE_TYPE.EMPTY;
            }
            this.start = curr_node;
        }
        else if (this.mode == NODE_TYPE.END) {
            if (this.end !== null) {
                this.end.type = NODE_TYPE.EMPTY;
            }
            this.end = curr_node;
        }
        curr_node.type = this.mode;
    }
    clearNode(curr_node) {
        if (this.mode == NODE_TYPE.START) {
            this.start = null;
        }
        else if (this.mode == NODE_TYPE.END) {
            this.end = null;
        }
        curr_node.type = NODE_TYPE.EMPTY;
    }
    resetGrid(width, height) {
        this.width = width;
        this.height = height;
        document.documentElement.style.setProperty("--width", width.toString());
        document.documentElement.style.setProperty("--height", height.toString());
        while ($gridElem.firstChild) {
            $gridElem.firstChild.remove();
        }
        this.nodes = [];
        for (let y = 0; y < height; y++) {
            const row = [];
            for (let x = 0; x < width; x++) {
                row.push(new node(x, y, document.createElement('div')));
            }
            this.nodes.push(row);
        }
        this.nodes.forEach((row) => {
            row.forEach((node) => {
                $gridElem.append(node.elem);
                node.elem.addEventListener('click', () => { this.fillNode(node); });
                node.elem.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    this.clearNode(node);
                });
            });
        });
    }
}
//# sourceMappingURL=grid.js.map