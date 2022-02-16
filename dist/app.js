const WIDTH = 20;
const HEIGHT = 10;
document.documentElement.style.setProperty("--width", WIDTH.toString());
document.documentElement.style.setProperty("--height", HEIGHT.toString());
const gridElem = document.querySelector('#grid');
const CELL_TYPE = {
    START: "start",
    END: "end",
    WALL: "wall",
    EMPTY: "empty"
};
const grid = createGrid();
grid.forEach((row) => {
    row.forEach((node) => {
        gridElem.append(node.elem);
    });
});
export function createGrid() {
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
    return grid;
}
//# sourceMappingURL=app.js.map