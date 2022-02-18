let WIDTH = 20;
let HEIGHT = 10;

const gridElem = document.querySelector('#grid') as HTMLDivElement;
const updateGridBtn = document.querySelector('#update-button') as HTMLButtonElement;
const widthInput = document.querySelector('#width-input') as HTMLInputElement;
const heightInput = document.querySelector('#height-input') as HTMLInputElement;

const CELL_TYPE = {
    START: "start",
    END: "end",
    WALL: "wall",
    EMPTY: "empty"
}

type cell = {
    elem: HTMLDivElement;
    x: number;
    y: number;
    type: string;
}

main();

function main() {
    updateCSSVars();
    const grid: cell[][] = createGrid();
    updateGridBtn.addEventListener('click', createGrid);
}

export function createGrid(): cell[][] {
    WIDTH = Number(widthInput.value);
    HEIGHT = Number(heightInput.value);
    while (gridElem.firstChild) {
        gridElem.removeChild(gridElem.firstChild);
    }
    const grid: cell[][] = [];

    for (let x = 0; x < WIDTH; x++) {
        const row: cell[] = []
        for (let y = 0; y < HEIGHT; y++) {
            const elem = document.createElement('div');
            elem.classList.add("node");
            elem.dataset.type = CELL_TYPE.EMPTY;
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
            node.elem.addEventListener('click', () => { clickedNode(node) });
        })
    })
    updateCSSVars();
    return grid;
}

export function clickedNode(node: cell) {
    node.type = CELL_TYPE.WALL;
}


export function updateCSSVars() {
    document.documentElement.style.setProperty("--width", WIDTH.toString());
    document.documentElement.style.setProperty("--height", HEIGHT.toString());
}
