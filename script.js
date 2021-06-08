/*
As a user, I can:
    :) add rows to the grid
    :) add columns to the grid
    :) remove rows from the grid
    :) remove columns from the grid
    :) select a color from a dropdown menu of colors
    :) click on a single cell, changing its color to the currently selected color
    :) fill all uncolored cells with the currently selected color
    :) fill all cells with the currently selected color
    :) clear all cells/restore all cells to their original/initial color
    - click and hold (mouseover) from a single cell (start) to a different cell 
    (end) such that all affected/hovered-over cells from start to end change 
    to the currently selected color
Grading criteria:
    - Code has a comment that notes/documentation on which problem/feature the 
    particular function is attempting to solve
    - All solutions should explicitly fulfill the requirements noted in each problem.
    - 25 commits
    - 3 branches
    - 5 issues
*/

let cells = document.getElementsByClassName("cells")[0];
var numRows = 0;
var numColumns = 0;
var color = undefined;
var dragAndDraw = false;

/*
Row/Column Event Listeners
*/

let addRowButton = document.getElementById("add-row");
addRowButton.addEventListener("click", function() {
    if (numRows == 0 && numColumns == 0) {
        createFirstCell();
    } else {
        addRow();
    }
});

let addColumnButton = document.getElementById("add-column");
addColumnButton.addEventListener("click", function() {
    if (numRows == 0 && numColumns == 0) {
        createFirstCell();
    } else {
        addColumn();
    }
});

let removeRowButton = document.getElementById("remove-row");
removeRowButton.addEventListener("click", function() {
    if (numRows == 1 ) {
        clearEverything();
    } else {
        removeRow();
    }
});

let removeColumnButton = document.getElementById("remove-column");
removeColumnButton.addEventListener("click", function() {
    if (numColumns == 1) {
        clearEverything();
    } else {
        removeColumn();
    }
});

let clearEverythingButton = document.getElementById("clear-cells");
clearEverythingButton.addEventListener("click", function() {
    clearEverything();
});

/*
First Cell
*/

function createFirstCell() {
    if (numRows == 0 && numColumns == 0) {
        let newRow = document.createElement("tr");
        newRow.id = "row0";

        let newCell = document.createElement("td");
        cellEventListeners(newCell);

        newRow.appendChild(newCell);
        cells.appendChild(newRow);

        numRows = 1;
        numColumns = 1;
    }
}

function addRow() {
    if (numRows == 0 || numColumns == 0) {
        //clear cells
    } else {
        let newRow = document.createElement("tr");
        newRow.id = "row" + numRows;

        for (let i = 0; i < numColumns; ++i) {
            let newCell = document.createElement("td");
            cellEventListeners(newCell);

            newRow.appendChild(newCell);

            if (numColumns == 1) {
                break;
            }
        }
        ++numRows;
        cells.appendChild(newRow);
    }
} 

function addColumn() {
    if (numRows == 0 || numColumns == 0) {
        //clear cells
    } else {
        for (let i = 0; i < numRows; ++i) {
            let currRow = document.getElementById("row" + i);

            let newCell = document.createElement("td");
            cellEventListeners(newCell);

            currRow.appendChild(newCell);
        }
        ++numColumns;
    }
}

function removeRow() {
    let rowToRemove = cells.lastChild;
    cells.removeChild(rowToRemove);
    rowToRemove = undefined;
    --numRows;
}

function removeColumn() {
    for (let i = 0; i < numRows; ++i) {
        let currRow = document.getElementById("row" + i);
        let cellToRemove = currRow.lastChild;
        currRow.removeChild(cellToRemove);
    }
    --numColumns;
}

function clearEverything() {
    let wrapper = document.getElementById("row-column-wrapper");
    wrapper.removeChild(cells);
    cells = null;

    let newCells = document.createElement("table");
    newCells.className = "cells";
    newCells.setAttribute("cellspacing", "0");
    wrapper.prepend(newCells);

    cells = newCells;
    numRows = 0;
    numColumns = 0;
} 

/*
Color Event Listeners
*/
function cellEventListeners(element) {
    
    element.addEventListener("click", function() {
        if (color) {
            element.style.backgroundColor = color;
        }
    });

    element.addEventListener("mousedown", function() {
        if (color) {
            element.style.backgroundColor = color;
            dragAndDraw = true;
        }
    });

    element.addEventListener("mouseup", function() {
        if (color) {
            dragAndDraw = false;
        }
    });

    element.addEventListener("mouseover", function() {
        if (color && dragAndDraw) {
            element.style.backgroundColor = color;
        }
    });
}

let colorSelectorButton = document.getElementById("color-selector");
let dropdownContent = document.getElementById("dropdown-content");
let dropdownColors = dropdownContent.getElementsByTagName("li");

colorSelectorButton.addEventListener("click", function() {
    dropdownContent.style.display = "block";
});

dropdownContent.addEventListener("mouseleave", function() {
    dropdownContent.style.display = "none";
}); 

for (let i = 0; i < dropdownColors.length; ++i) {
    let dropdownColor = dropdownColors[i];

    dropdownColor.addEventListener("mouseover", function() {
        dropdownColor.style.backgroundColor = dropdownColor.innerHTML;

        if (dropdownColor.innerHTML == "Black") {
            dropdownColor.style.color = "White";
        }
    });

    dropdownColor.addEventListener("mouseleave", function() {
        dropdownColor.style.backgroundColor = "rgba(143, 200, 202, 0.25)";

        if (dropdownColor.innerHTML == "Black") {
            dropdownColor.style.color = "Black";
        }
    });

    dropdownColor.addEventListener("click", function() {
        color = dropdownColor.innerHTML;
        erase(true);
        colorSelectorButton.style.backgroundColor = color;
        colorSelectorButton.style.color = "Black";

        if (color == "Black") {
            colorSelectorButton.style.color = "White";
        }
    });
}

let eraserButton = document.getElementById("eraser");
eraserButton.addEventListener("click", function() {erase(false)});

let toggleEraser = true;
let lastColor = undefined;

function erase(colorSelector) {
    if (!colorSelector) {
        if (toggleEraser) {
            eraserButton.innerHTML = "Eraser: ON";
            lastColor = color;
            color = "rgb(250, 245, 245)";
            toggleEraser = false;
        } else {
            eraserButton.innerHTML = "Eraser: OFF";
            color = lastColor;
            toggleEraser = true;
        }
    } else {
        eraserButton.innerHTML = "Eraser: OFF";
        toggleEraser = true;
    }
}

let fillUncoloredButton = document.getElementById("fill-uncolored");
fillUncoloredButton.addEventListener("click", function() {editCells("fillUncolored")});

let fillAllButton = document.getElementById("fill-all");
fillAllButton.addEventListener("click", function() {editCells("fillAll")});

let clearColorsButton = document.getElementById("clear-colors");
clearColorsButton.addEventListener("click", function() {editCells("clearColors")});

function editCells(typeOfAction) {
    if (color) {
        let cellArr = document.getElementsByTagName("td");

        for (let i = 0; i < cellArr.length; ++i) {
            let currCell = cellArr[i];
            let currCellBackgroundColor = currCell.style.backgroundColor;

            if (typeOfAction == "fillUncolored" && (currCellBackgroundColor == "" || currCellBackgroundColor == "rgb(250, 245, 245)")) {
                currCell.style.backgroundColor = color;
            } else if (typeOfAction == "fillAll") {
                currCell.style.backgroundColor = color;
            } else if (typeOfAction == "clearColors") {
                currCell.style.backgroundColor = "rgb(250, 245, 245)";
            }
        }
    }
}

