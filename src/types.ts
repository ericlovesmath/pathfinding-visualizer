const gridElem = document.querySelector('#grid') as HTMLDivElement;
const updateGridBtn = document.querySelector('#update-button') as HTMLButtonElement;
const widthInput = document.querySelector('#width-input') as HTMLInputElement;
const heightInput = document.querySelector('#height-input') as HTMLInputElement;
const nodeTypeSelector = document.querySelector('.select-node-type') as HTMLSelectElement;

const NODE_TYPE = {
    START: "start",
    END: "end",
    WALL: "wall",
    EMPTY: "empty"
}

type node = {
    elem: HTMLDivElement;
    x: number;
    y: number;
    type: string;
}

export { gridElem, updateGridBtn, widthInput, heightInput, nodeTypeSelector, NODE_TYPE, node };
