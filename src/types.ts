export const $gridElem = document.querySelector('#grid') as HTMLDivElement;
export const $updateGridBtn = document.querySelector('#update-button') as HTMLButtonElement;
export const $widthInput = document.querySelector('#width-input') as HTMLInputElement;
export const $heightInput = document.querySelector('#height-input') as HTMLInputElement;
export const $nodeTypeSelector = document.querySelector('.select-node-type') as HTMLSelectElement;
export const $simulateBtn = document.querySelector('#simulate-button') as HTMLSelectElement;

/** Connects CSS and *Node* classifications */
export const NODE_TYPE = {
    START: "start",
    END: "end",
    WALL: "wall",
    EMPTY: "empty",
    VISITED: "visited",
    VISITING: "visiting",
    PATH: "path",
}

/** Intended to be used as a cost wrapper for A-Star Search
* g: Distance from Starting Node
* h: Distance from End Node
* f: g + h */
export type astar_cost = {
    g: number;
    h: number;
    f: number;
}
