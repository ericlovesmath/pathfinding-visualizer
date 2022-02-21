import { $gridElem, $updateGridBtn, $widthInput, $heightInput, $nodeTypeSelector } from './types.js';

const NODE_TYPE = {
    START: "start",
    END: "end",
    WALL: "wall",
    EMPTY: "empty"
}

class node {
    x: number;
    y: number;
    elem: HTMLDivElement;

    constructor(x: number, y: number, elem: HTMLDivElement) {
        this.x = x;
        this.y = y;
        elem.classList.add("node");
        this.elem = elem;
        this.type = NODE_TYPE.EMPTY;
    }
    get type() {
        return this.elem.dataset.type!;
    }
    set type(value: string) {
        this.elem.dataset.type = value;
    }
}

class grid {
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


function main() {
    let myGrid = new grid(20, 10);
    $updateGridBtn.addEventListener('click', () => {
        myGrid.resetGrid(Number($widthInput.value), Number($heightInput.value))
    });
}

main()


/* import { gridElem, updateGridBtn, widthInput, heightInput, nodeTypeSelector, NODE_TYPE, node } from './types.js';

let CURRENT_MODE = NODE_TYPE.WALL;
let start_node: node | null = null;
let end_node: node | null = null;

main();

function main() {
    let width = 20;
    let height = 10;
    let GRID: node[][] = [];

    [width, height] = createGrid(GRID, width, height);
    updateGridBtn.addEventListener('click', () => { createGrid(GRID, width, height) });
    nodeTypeSelector.addEventListener('click', selectNodeType);
}

export function selectNodeType(e: Event) {
    CURRENT_MODE = (<HTMLOptionElement>e.target).value;
}

*/
