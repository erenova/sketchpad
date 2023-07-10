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
  borderRemover: document.querySelector(".menu-border"),
  paletteButton: document.querySelector(".menu-old-palette"),
  palettePopup: document.querySelector(".palette-pop-up"),
  paletteItem: document.querySelectorAll(".palette-item"),
  modalDark: document.querySelector(".modal-dark"),
  modalMenu: document.querySelector(".modal-grid-selector"),
  modalInput: document.querySelector("#grid-number"),
  modalButton: document.querySelector(".grid-number-button"),
};

const mobileDOM = {
  mobileMenu: document.querySelector(".mobile-menu-self"),
  mobileOpenMenu: document.querySelector(".mobile-menu-button"),
  mobileCloseMenu: document.querySelector(".mobile-menu-close"),
  mobileGridSelector: document.querySelector(".mobile-menu-grid-selector"),
  mobileColorSelector: document.querySelector(".mobile-menu-color-palette"),
  mobileColorPicker: document.querySelector("#mobile-color-picker"),
  mobileRandomSelector: document.querySelector(".mobile-menu-random-palette"),
  mobileEraserSelector: document.querySelector(".mobile-menu-eraser"),
  mobileCleanerSelector: document.querySelector(".mobile-menu-cleaner"),
  mobileBorderRemover: document.querySelector(".mobile-menu-border"),
  mobilePaletteButton: document.querySelector(".mobile-menu-old-palette"),
  mobilePalettePopup: document.querySelector(".mobile-palette-pop-up"),
  mobilePaletteItem: document.querySelectorAll(".mobile-palette-item"),
};
// Sketch Settings - General
const settings = {
  userColor: `#000000`,
  userColorPast: ``,
  userColorList: [`#ffffff`, `#ffffff`, `#ffffff`, `#ffffff`, `#ffffff`],
  userGrid: 16,
  paletteIndex: 0,
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
  rightCleaner(e) {
    if (e.target !== menuDOM.sketchArea) {
      e.target.style.backgroundColor = `#ffffff`;
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
  mobileDOM.mobileGridSelector.textContent = `${settings.userGrid}x${settings.userGrid}`;

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
menuDOM.sketchArea.addEventListener("click", (e) => {
  settings.changeColor(e);
});

menuDOM.sketchArea.addEventListener("mousedown", (e) => {
  e.preventDefault();
  menuDOM.sketchArea.addEventListener("mouseover", settings.changeColor);
});

menuDOM.sketchArea.addEventListener("mouseup", () => {
  menuDOM.sketchArea.removeEventListener("mouseover", settings.changeColor);
  menuDOM.sketchArea.removeEventListener("mouseover", settings.rightCleaner);
});
menuDOM.sketchArea.addEventListener("mouseleave", () => {
  menuDOM.sketchArea.removeEventListener("mouseover", settings.changeColor);
  menuDOM.sketchArea.removeEventListener("mouseover", settings.rightCleaner);
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

// Menu Item > Color Picker
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

// Menu Item > Border Button

menuDOM.borderRemover.addEventListener("click", () => {
  const root = document.documentElement;
  const borderColor = getComputedStyle(root).getPropertyValue("--border-color");
  if (borderColor === "white") {
    root.style.setProperty("--border-color", "gray");
    root.style.setProperty("--border-px", "1px");
  } else {
    root.style.setProperty("--border-px", "0px");
    root.style.setProperty("--border-color", "white");
  }
});

// Menu Item > History Palette Button

menuDOM.colorSelector.addEventListener("change", (e) => {
  settings.userColor = e.target.value;
  if (settings.paletteIndex < 5) {
    settings.userColorList[settings.paletteIndex] = settings.userColor;
    updateHistoryPalette();
    settings.paletteIndex++;
  } else {
    settings.paletteIndex = 0;
    settings.userColorList[settings.paletteIndex] = settings.userColor;
    updateHistoryPalette();
  }
});

function updateHistoryPalette() {
  for (let i = 0; i < menuDOM.paletteItem.length; i++) {
    menuDOM.paletteItem[
      i
    ].style.backgroundColor = `${settings.userColorList[i]}`;
    menuDOM.paletteItem[i].setAttribute(
      "data-color",
      settings.userColorList[i]
    );
  }
}

menuDOM.paletteItem.forEach((item) => {
  item.addEventListener("click", (e) => {
    const colorData = e.target.getAttribute("data-color");
    settings.userColor = colorData;
    menuDOM.colorPicker.value = settings.userColor;
  });
});

updateHistoryPalette();

menuDOM.paletteButton.addEventListener("click", () => {
  menuDOM.palettePopup.classList.toggle("active");
});
/* Event Listener > menu */
menuDOM.menuButton.addEventListener("click", () => {
  menuDOM.menuDesktop.classList.toggle("active");
  menuDOM.menuButton.classList.toggle("active");
  menuDOM.menuButton.classList.toggle("deactive");
  if (menuDOM.palettePopup.classList.contains("active")) {
    menuDOM.palettePopup.classList.remove("active");
  } else {
    menuDOM.palettePopup.classLists.add("active");
  }
});

/* Event Listener > modal */

document.addEventListener("click", (e) => {
  if (e.target === menuDOM.modalDark) {
    menuDOM.modalDark.classList.remove("active");
    menuDOM.modalMenu.classList.remove("active");
    menuDOM.gridSelector.classList.remove("active");
    mobileDOM.mobileMenu.classList.remove("active");
  }
});

/* Event Listener > Modal Menu */

menuDOM.modalInput.addEventListener("change", (e) => {
  if (e.target.value > 100 || e.target.value <= 0) {
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
  mobileDOM.mobileMenu.classList.remove("active");
});

/* Mobile Section */
mobileDOM.mobileCloseMenu.addEventListener("click", () => {
  mobileDOM.mobileMenu.classList.toggle("active");
  menuDOM.modalDark.classList.toggle("active");
});

mobileDOM.mobileOpenMenu.addEventListener("click", () => {
  mobileDOM.mobileMenu.classList.toggle("active");
  menuDOM.modalDark.classList.toggle("active");
});

mobileDOM.mobileGridSelector.addEventListener("click", () => {
  menuDOM.modalDark.classList.add("active");
  menuDOM.modalMenu.classList.add("active");
  mobileDOM.mobileMenu.classList.remove("active");
});

mobileDOM.mobileColorSelector.addEventListener("click", () => {
  mobileDOM.mobileColorSelector.addEventListener("change", (e) => {
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

mobileDOM.mobileRandomSelector.addEventListener("click", () => {
  mobileDOM.mobileColorPicker.value = settings.generateRandomHexCode();
  menuDOM.sketchArea.addEventListener("mouseover", settings.setRandomColor);
  menuDOM.sketchArea.addEventListener("touchstart", settings.setRandomColor);
  menuDOM.sketchArea.addEventListener("touchmove", settings.setRandomColor);
});

mobileDOM.mobileEraserSelector.addEventListener("click", () => {
  settings.userColor = `#ffffff`;
  mobileDOM.mobileColorPicker.value = `#ffffff`;
  menuDOM.sketchArea.removeEventListener("mouseover", settings.setRandomColor);
  menuDOM.sketchArea.removeEventListener("touchstart", settings.setRandomColor);
  menuDOM.sketchArea.removeEventListener("touchmove", settings.setRandomColor);
});

mobileDOM.mobileCleanerSelector.addEventListener("click", () => {
  createGrid();
  menuDOM.sketchArea.removeEventListener("mouseover", settings.setRandomColor);
  menuDOM.sketchArea.removeEventListener("touchstart", settings.setRandomColor);
  menuDOM.sketchArea.removeEventListener("touchmove", settings.setRandomColor);
  mobileDOM.mobileMenu.classList.remove("active");
  menuDOM.modalDark.classList.remove("active");
});

mobileDOM.mobileBorderRemover.addEventListener("click", () => {
  const root = document.documentElement;
  const borderColor = getComputedStyle(root).getPropertyValue("--border-color");
  if (borderColor === "white") {
    root.style.setProperty("--border-color", "gray");
    root.style.setProperty("--border-px", "1px");
  } else {
    root.style.setProperty("--border-px", "0px");
    root.style.setProperty("--border-color", "white");
  }
});

mobileDOM.mobileColorSelector.addEventListener("change", (e) => {
  settings.userColor = e.target.value;
  if (settings.paletteIndex < 5) {
    settings.userColorList[settings.paletteIndex] = settings.userColor;
    mobileUpdateHistoryPalette();
    settings.paletteIndex++;
  } else {
    settings.paletteIndex = 0;
    settings.userColorList[settings.paletteIndex] = settings.userColor;
    mobileUpdateHistoryPalette();
  }
});

function mobileUpdateHistoryPalette() {
  for (let i = 0; i < mobileDOM.mobilePaletteItem.length; i++) {
    mobileDOM.mobilePaletteItem[
      i
    ].style.backgroundColor = `${settings.userColorList[i]}`;
    mobileDOM.mobilePaletteItem[i].setAttribute(
      "data-color",
      settings.userColorList[i]
    );
  }
}

mobileDOM.mobilePaletteItem.forEach((item) => {
  item.addEventListener("click", (e) => {
    const colorData = e.target.getAttribute("data-color");
    settings.userColor = colorData;
    mobileDOM.mobileColorPicker.value = settings.userColor;
  });
});

/* Fantasy Features  */

document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

menuDOM.sketchArea.addEventListener("contextmenu", (e) => {
  if (e.target.classList.contains("grid-item")) {
    e.target.style.backgroundColor = `#ffffff`;
  }
  menuDOM.sketchArea.removeEventListener("mouseover", settings.changeColor);
  menuDOM.sketchArea.addEventListener("mouseover", settings.rightCleaner);
});

/* Fantasy Feature (Screenshot of sketchpad) */

function captureScreenshot() {
  let sketchArea = document.querySelector(".sketch-area");

  html2canvas(sketchArea).then(function (canvas) {
    let imgData = canvas.toDataURL();

    // Create an 'a' element to download the image
    let downloadLink = document.createElement("a");
    downloadLink.href = imgData;
    downloadLink.download = `src-${Date.now().toString().slice(5)}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  });
}
