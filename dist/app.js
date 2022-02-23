import { $updateGridBtn, $widthInput, $heightInput, $nodeTypeSelector, $simulateBtn, NODE_TYPE } from './types.js';
import { grid } from './grid.js';
import { astar } from './astar.js';
function main() {
    let myGrid = new grid(20, 10);
    myGrid.start = myGrid.nodes[2][4];
    myGrid.end = myGrid.nodes[7][15];
    myGrid.nodes[2][4].type = NODE_TYPE.START;
    myGrid.nodes[7][15].type = NODE_TYPE.END;
    $updateGridBtn.addEventListener('click', () => {
        myGrid.resetGrid(Number($widthInput.value), Number($heightInput.value));
    });
    $nodeTypeSelector.addEventListener('click', (e) => {
        myGrid.mode = e.target.value;
    });
    $simulateBtn.addEventListener('click', () => {
        astar(myGrid);
    });
}
main();
//# sourceMappingURL=app.js.map