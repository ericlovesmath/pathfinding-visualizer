import { $updateGridBtn, $widthInput, $heightInput, $nodeTypeSelector, $simulateBtn } from './types.js';
import { grid } from './grid.js';
import { astar } from './astar.js';
function main() {
    let myGrid = new grid(20, 10);
    $updateGridBtn.addEventListener('click', () => {
        myGrid.resetGrid(Number($widthInput.value), Number($heightInput.value));
    });
    $nodeTypeSelector.addEventListener('click', (e) => {
        myGrid.mode = e.target.value;
    });
    $simulateBtn.addEventListener('click', () => {
        myGrid.clearSimulation();
        astar(myGrid);
    });
}
main();
//# sourceMappingURL=app.js.map