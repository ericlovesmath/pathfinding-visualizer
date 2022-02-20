import { gridElem, updateGridBtn, widthInput, heightInput, nodeTypeSelector, NODE_TYPE, node } from './types.js';

let WIDTH = 20;
let HEIGHT = 10;
let CURRENT_NODE = "wall"

main();

function main() {
    updateCSSVars();
    const grid: node[][] = createGrid();
    updateGridBtn.addEventListener('click', createGrid);
    nodeTypeSelector.addEventListener("click", selectNodeType);
}

export function selectNodeType(e: Event) {
    CURRENT_NODE = (<HTMLOptionElement>e.target).value;
}

export function createGrid(): node[][] {
    WIDTH = Number(widthInput.value);
    HEIGHT = Number(heightInput.value);
    while (gridElem.firstChild) {
        gridElem.removeChild(gridElem.firstChild);
    }
    const grid: node[][] = [];

    for (let x = 0; x < WIDTH; x++) {
        const row: node[] = []
        for (let y = 0; y < HEIGHT; y++) {
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
        grid.push(row);
    }
    grid.forEach((row) => {
        row.forEach((node) => {
            gridElem.append(node.elem);
            node.elem.addEventListener('click', () => { fillNode(node) });
            node.elem.addEventListener('contextmenu', (e: Event) => {
                e.preventDefault();
                clearNode(node)
            });
        })
    })
    updateCSSVars();
    return grid;
}

export function fillNode(node: node) {
    node.type = CURRENT_NODE;
}

export function clearNode(node: node) {
    node.type = NODE_TYPE.EMPTY;
}

export function updateCSSVars() {
    document.documentElement.style.setProperty("--width", WIDTH.toString());
    document.documentElement.style.setProperty("--height", HEIGHT.toString());
}
