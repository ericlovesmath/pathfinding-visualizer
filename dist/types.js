const gridElem = document.querySelector('#grid');
const updateGridBtn = document.querySelector('#update-button');
const widthInput = document.querySelector('#width-input');
const heightInput = document.querySelector('#height-input');
const nodeTypeSelector = document.querySelector('.select-node-type');
const NODE_TYPE = {
    START: "start",
    END: "end",
    WALL: "wall",
    EMPTY: "empty"
};
export { gridElem, updateGridBtn, widthInput, heightInput, nodeTypeSelector, NODE_TYPE };
//# sourceMappingURL=types.js.map