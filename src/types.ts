export const $gridElem = document.querySelector('#grid') as HTMLDivElement;
export const $updateGridBtn = document.querySelector('#update-button') as HTMLButtonElement;
export const $widthInput = document.querySelector('#width-input') as HTMLInputElement;
export const $heightInput = document.querySelector('#height-input') as HTMLInputElement;
export const $nodeTypeSelector = document.querySelector('.select-node-type') as HTMLSelectElement;

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

type pos = {
    x: number;
    y: number;
}

