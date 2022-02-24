import { $updateGridBtn, $widthInput, $heightInput, $nodeTypeSelector, $simulateBtn } from './types.js';
import { grid } from './grid.js';
import { astar } from './astar.js';

function main() {

    let myGrid = new grid(20, 10);

    // Update Grid Button
    $updateGridBtn.addEventListener('click', () => {
        myGrid.resetGrid(Number($widthInput.value), Number($heightInput.value))
    });

    // Select Node Type Button
    $nodeTypeSelector.addEventListener('click', (e: Event) => {
        myGrid.mode = (<HTMLOptionElement>e.target).value;
    })

    // Simulate Button, Only works on A-Star for now
    $simulateBtn.addEventListener('click', () => {
        myGrid.clearSimulation();
        astar(myGrid);
    })
}

main()
