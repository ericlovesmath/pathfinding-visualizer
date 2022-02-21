import { gridElem, updateGridBtn, widthInput, heightInput, nodeTypeSelector, NODE_TYPE, node } from './types.js';

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

export function createGrid(GRID: node[][], width: number, height: number): [number, number] {
    [width, height] = updateDimensions(width, height);
    while (gridElem.firstChild) {
        gridElem.removeChild(gridElem.firstChild);
    }

    GRID.length = 0;

    for (let x = 0; x < width; x++) {
        const row: node[] = []
        for (let y = 0; y < height; y++) {
            const elem = document.createElement('div');
            elem.classList.add("node");
            elem.dataset.type = NODE_TYPE.EMPTY;
            row.push({
                elem,
                x,
                y,
                get type() { return elem.dataset.type! },
                set type(value: string) { this.elem.dataset.type = value }
            });
        }
        GRID.push(row);
    }
    GRID.forEach((row) => {
        row.forEach((node) => {
            gridElem.append(node.elem);
            node.elem.addEventListener('click', () => { fillNode(node) });
            node.elem.addEventListener('contextmenu', (e: Event) => {
                e.preventDefault();
                clearNode(node)
            });
        })
    })
    return [width, height];
}

export function fillNode(node: node) {
    if (CURRENT_MODE == NODE_TYPE.START) {
        if (start_node !== null) {
            start_node.type = NODE_TYPE.EMPTY;
        }
        start_node = node;
    } else if (CURRENT_MODE == NODE_TYPE.END) {
        if (end_node !== null) {
            end_node.type = NODE_TYPE.EMPTY;
        }
        end_node = node;
    }
    node.type = CURRENT_MODE;
}

export function clearNode(node: node) {
    if (CURRENT_MODE == NODE_TYPE.START) {
        start_node = null;
    } else if (CURRENT_MODE == NODE_TYPE.END) {
        end_node = null;
    }
    node.type = NODE_TYPE.EMPTY;
}

export function updateDimensions(width: number, height: number): [width: number, height: number] {
    width = Number(widthInput.value);
    height = Number(heightInput.value);
    document.documentElement.style.setProperty("--width", width.toString());
    document.documentElement.style.setProperty("--height", height.toString());
    return [width, height];
}
