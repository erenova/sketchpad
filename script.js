// DOM General
// > MENU
const menuDOM = {
  sketchArea: document.querySelector(".sketch-area"),
  gridItems: document.querySelectorAll(".grid-item"),
  resetGridItems() {
    this.gridItems = document.querySelectorAll(".grid-item");
  },
  menuButton: document.querySelector(".menu-button"),
  menuDesktop: document.querySelector(".menu-desktop"),
  gridSelector: document.querySelector(".menu-grid-selector"),
  colorSelector: document.querySelector(".menu-color-palette"),
  colorPicker: document.querySelector("#color-picker"),
  randomSelector: document.querySelector(".menu-random-palette"),
  eraserSelector: document.querySelector(".menu-eraser"),
  cleanerSelector: document.querySelector(".menu-cleaner"),
  modalDark: document.querySelector(".modal-dark"),
  modalMenu: document.querySelector(".modal-grid-selector"),
  modalInput: document.querySelector("#grid-number"),
  modalButton: document.querySelector(".grid-number-button"),
};

// Sketch Settings - General
const settings = {
  userColor: `#000000`,
  userGrid: 16,
  isMouseDown: false,
  setUserGrid() {
    const root = document.documentElement;
    root.style.setProperty("--grid-columns", this.userGrid);
  },
  changeColor(event) {
    if (event.target !== menuDOM.sketchArea) {
      event.target.style.backgroundColor = settings.userColor;
      menuDOM.colorPicker.value = settings.userColor;
    }
  },
  generateRandomHexCode() {
    let randomNum = Math.floor(Math.random() * 16777215);
    let hexCode = "#" + randomNum.toString(16).toUpperCase();
    while (hexCode.length < 7) {
      hexCode = hexCode + "0";
    }
    return hexCode;
  },
  setRandomColor(event) {
    if (event.target !== menuDOM.sketchArea) {
      settings.userColor = settings.generateRandomHexCode();
    }
  },
  changeColorMobile(event) {
    event.preventDefault(); // prevent scrolling
    event = event.touches[0]; // get the first touch event
    const target = document.elementFromPoint(event.clientX, event.clientY);
    if (target.classList.contains("grid-item")) {
      settings.changeColor({ ...event, target });
    }
  },
};

// Sketch Settings > grid generator
createGrid();
function createGrid() {
  let userGrid = settings.userGrid;
  while (menuDOM.sketchArea.firstChild) {
    menuDOM.sketchArea.removeChild(menuDOM.sketchArea.firstChild);
  }
  settings.setUserGrid();
  menuDOM.gridSelector.textContent = `${settings.userGrid}x${settings.userGrid}`;

  for (let i = 0; i < userGrid * userGrid; i++) {
    let gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");
    menuDOM.sketchArea.appendChild(gridItem);
  }
  menuDOM.resetGridItems();
}

// Sketch Settings > Painting

/* Event Listener - General */

/* Event Listener > painting Desktop */

menuDOM.sketchArea.addEventListener("mousedown", (e) => {
  e.preventDefault();
  menuDOM.sketchArea.addEventListener("mouseover", settings.changeColor);
});

menuDOM.sketchArea.addEventListener("mouseup", () => {
  menuDOM.sketchArea.removeEventListener("mouseover", settings.changeColor);
});

/* Event Listener > Painting Mobile */

menuDOM.sketchArea.addEventListener("touchstart", settings.changeColorMobile);
menuDOM.sketchArea.addEventListener("touchmove", settings.changeColorMobile);

/* Event Listener > Menu Item */

// Menu Item > Grid Selector button
menuDOM.gridSelector.addEventListener("click", () => {
  menuDOM.gridSelector.classList.add("active");
  menuDOM.modalDark.classList.add("active");
  menuDOM.modalMenu.classList.add("active");
});

// Menu Item > Random Button
menuDOM.randomSelector.addEventListener("click", () => {
  menuDOM.colorPicker.value = settings.generateRandomHexCode();
  menuDOM.sketchArea.addEventListener("mouseover", settings.setRandomColor);
  menuDOM.sketchArea.addEventListener("touchstart", settings.setRandomColor);
  menuDOM.sketchArea.addEventListener("touchmove", settings.setRandomColor);
});

// Menu Item > Eraser Button

menuDOM.eraserSelector.addEventListener("click", () => {
  settings.userColor = `#ffffff`;
  menuDOM.colorPicker.value = `#ffffff`;
  menuDOM.sketchArea.removeEventListener("mouseover", settings.setRandomColor);
  menuDOM.sketchArea.removeEventListener("touchstart", settings.setRandomColor);
  menuDOM.sketchArea.removeEventListener("touchmove", settings.setRandomColor);
});

// Menu Item > Cleaner button

menuDOM.cleanerSelector.addEventListener("click", () => {
  createGrid();
  menuDOM.sketchArea.removeEventListener("mouseover", settings.setRandomColor);
  menuDOM.sketchArea.removeEventListener("touchstart", settings.setRandomColor);
  menuDOM.sketchArea.removeEventListener("touchmove", settings.setRandomColor);
});

/* Event Listener > menu */
menuDOM.menuButton.addEventListener("click", () => {
  menuDOM.menuDesktop.classList.toggle("active");
  menuDOM.menuButton.classList.toggle("active");
  menuDOM.menuButton.classList.toggle("deactive");
});

menuDOM.colorSelector.addEventListener("click", () => {
  menuDOM.colorSelector.addEventListener("change", (e) => {
    menuDOM.sketchArea.removeEventListener(
      "mouseover",
      settings.setRandomColor
    );
    menuDOM.sketchArea.removeEventListener(
      "touchstart",
      settings.setRandomColor
    );
    menuDOM.sketchArea.removeEventListener(
      "touchmove",
      settings.setRandomColor
    );
    settings.userColor = e.target.value;
  });
});

/* Event Listener > modal */

document.addEventListener("click", (e) => {
  if (e.target === menuDOM.modalDark) {
    menuDOM.modalDark.classList.remove("active");
    menuDOM.modalMenu.classList.remove("active");
    menuDOM.gridSelector.classList.remove("active");
  }
});

/* Event Listener > Modal Menu */

menuDOM.modalInput.addEventListener("change", (e) => {
  if (e.target.value > 50 || e.target.value <= 0) {
    e.target.value = 1;
    settings.userGrid = e.target.value;
    return;
  }
  settings.userGrid = e.target.value;
});

menuDOM.modalButton.addEventListener("click", () => {
  createGrid();
  menuDOM.modalDark.classList.remove("active");
  menuDOM.modalMenu.classList.remove("active");
  menuDOM.gridSelector.classList.remove("active");
});
