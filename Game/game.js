// landscape

const NumOfRows = 15;
const NumOfColumns = 20;
const gameWorld = document.getElementById("landscape");

function Createlandscape() {
  for (let i = 0; i < NumOfRows; i++) {
    const row = addRow();
    gameWorld.append(row);
    for (let j = 0; j < NumOfColumns; j++) {
      const cell = addCell();
      if (i < 10) {
        if (i > 7 && j >= 3 && j < i - 3) {
          cell.classList.add("stone");
        } else if (i > 3 && i < 7 && j >= 9 && j <= 13) {
          cell.classList.add("leaves");
        } else if (i >= 7 && i <= 10 && j == 11) {
          cell.classList.add("wood");
        } else {
          cell.classList.add("sky");
        }
      } else {
        let rndNum = Math.random();
        if (rndNum > 0.5) {
          cell.classList.add("dirt");
        } else {
          cell.classList.add("gold");
        }
      }

      row.append(cell);
    }
  }
}

const addRow = () => {
  const row = document.createElement("div");
  row.className = "row";
  return row;
};

const addCell = () => {
  const cell = document.createElement("div");
  cell.className = "cell";
  return cell;
};

Createlandscape();

// Tools

const pickaxe = document.querySelector(".pickaxe");
const axe = document.querySelector(".axe");
const shovel = document.querySelector(".shovel");
let currTool = pickaxe.addEventListener("click", (e) => {
    if (currTool != undefined) {
        currTool.classList.remove("currtool");
    }
    currTool = pickaxe;
    currTool.classList.add("currtool");
});
pickaxe.click();

axe.addEventListener("click", (e) => {
    if (currTool != undefined) {
        currTool.classList.remove("currtool");
    }
    currTool = axe;
    currTool.classList.add("currtool");
});

shovel.addEventListener("click", (e) => {
    if (currTool != undefined) {
        currTool.classList.remove("currtool");
    }
    currTool = shovel;
    currTool.classList.add("currtool");
});

// Choose tools

renderTiles();

function checkTile(tile) {
    if (!tile.classList.contains("sky")) {
        tile.addEventListener("click", (e) => {
      if (
          currTool.classList.contains("pickaxe") &&
          (tile.classList.contains("gold") || tile.classList.contains("stone"))
          ) {
              removeTile(tile);
            } else if (
                currTool.classList.contains("axe") &&
                (tile.classList.contains("wood") || tile.classList.contains("leaves"))
      ) {
          removeTile(tile);
        } else if (
            currTool.classList.contains("shovel") &&
            (tile.classList.contains("grass") || tile.classList.contains("dirt"))
            ) {
                removeTile(tile);
            }
        });
  }
}

function removeTile(tile) {
    if (lastPickedItem.classList.length > 1) {
        lastPickedItem.classList.remove(
      `${lastPickedItem.classList[lastPickedItem.classList.length - 1]}`
      );
    }
    lastPickedItem.classList.add(`${tile.classList[tile.classList.length - 1]}`);
    tile.classList.remove(`${tile.classList[tile.classList.length - 1]}`);
    tile.classList.add("sky");
}

// last picked

let lastPickedItem = document.querySelector(".last-picked");
function renderTiles() {
    const tiles = document.querySelectorAll(".cell");
    tiles.forEach((tile) => {
        checkTile(tile);
    });
}

lastPickedItem.addEventListener("click", (e) => {
        if (currTool != undefined && currTool !== lastPickedItem) {
            currTool.classList.remove("currtool");
        }
        currTool = lastPickedItem;
        currTool.classList.add("currtool");
        const emptyTiles = document.querySelectorAll(".sky");
        emptyTiles.forEach((emptyTile) => {
            emptyTile.addEventListener("click", (e) => {
                if (
                    lastPickedItem.classList.length > 2 &&
        !emptyTile.classList.contains(
            `${lastPickedItem.classList[lastPickedItem.classList.length - 1]}`
            )
            ) {
                emptyTile.classList.add(
                    `${lastPickedItem.classList[lastPickedItem.classList.length - 2]}`
                    );

        emptyTile.classList.remove("currtool");
        emptyTile.classList.remove("sky");
        lastPickedItem.classList.remove(
          `${lastPickedItem.classList[lastPickedItem.classList.length - 2]}`
        );
        renderTiles();
      }
    });
  });
});
