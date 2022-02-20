import { gridElem, updateGridBtn, widthInput, heightInput, nodeTypeSelector, NODE_TYPE } from './types.js';
let WIDTH = 20;
let HEIGHT = 10;
let CURRENT_NODE = "wall";
main();
function main() {
    updateCSSVars();
    const grid = createGrid();
    updateGridBtn.addEventListener('click', createGrid);
    nodeTypeSelector.addEventListener("click", selectNodeType);
}
export function selectNodeType(e) {
    CURRENT_NODE = e.target.value;
}
export function createGrid() {
    WIDTH = Number(widthInput.value);
    HEIGHT = Number(heightInput.value);
    while (gridElem.firstChild) {
        gridElem.removeChild(gridElem.firstChild);
    }
    const grid = [];
    for (let x = 0; x < WIDTH; x++) {
        const row = [];
        for (let y = 0; y < HEIGHT; y++) {
            const elem = document.createElement('div');
            elem.classList.add("node");
            elem.dataset.type = NODE_TYPE.EMPTY;
            row.push({
                elem,
                x,
                y,
                get type() { return elem.dataset.type; },
                set type(value) { this.elem.dataset.type = value; }
            });
        }
        grid.push(row);
    }
    grid.forEach((row) => {
        row.forEach((node) => {
            gridElem.append(node.elem);
            node.elem.addEventListener('click', () => { fillNode(node); });
            node.elem.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                clearNode(node);
            });
        });
    });
    updateCSSVars();
    return grid;
}
export function fillNode(node) {
    node.type = CURRENT_NODE;
}
export function clearNode(node) {
    node.type = NODE_TYPE.EMPTY;
}
export function updateCSSVars() {
    document.documentElement.style.setProperty("--width", WIDTH.toString());
    document.documentElement.style.setProperty("--height", HEIGHT.toString());
}
//# sourceMappingURL=app.js.map