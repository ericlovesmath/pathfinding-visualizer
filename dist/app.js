let WIDTH = 20;
let HEIGHT = 10;
const gridElem = document.querySelector('#grid');
const updateGridBtn = document.querySelector('#update-button');
const widthInput = document.querySelector('#width-input');
const heightInput = document.querySelector('#height-input');
const CELL_TYPE = {
    START: "start",
    END: "end",
    WALL: "wall",
    EMPTY: "empty"
};
main();
function main() {
    updateCSSVars();
    const grid = createGrid();
    updateGridBtn.addEventListener('click', updateGrid);
}
export function createGrid() {
    while (gridElem.firstChild) {
        gridElem.removeChild(gridElem.firstChild);
    }
    const grid = [];
    for (let x = 0; x < WIDTH; x++) {
        const row = [];
        for (let y = 0; y < HEIGHT; y++) {
            const elem = document.createElement('div');
            elem.classList.add("node");
            elem.dataset.type = CELL_TYPE.EMPTY;
            row.push({
                elem,
                x,
                y,
                get type() { return elem.dataset.status; },
                set type(value) { this.type = value; }
            });
        }
        grid.push(row);
    }
    grid.forEach((row) => {
        row.forEach((node) => {
            gridElem.append(node.elem);
            node.elem.addEventListener('onclick', clickedNode);
        });
    });
    return grid;
}
export function clickedNode(e) { }
export function updateGrid(e) {
    WIDTH = Number(widthInput.value);
    HEIGHT = Number(heightInput.value);
    createGrid();
    updateCSSVars();
}
export function updateCSSVars() {
    document.documentElement.style.setProperty("--width", WIDTH.toString());
    document.documentElement.style.setProperty("--height", HEIGHT.toString());
}
//# sourceMappingURL=app.js.map