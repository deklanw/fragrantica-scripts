// ==UserScript==
// @name        Fragrantica Ratings Names
// @namespace   Violentmonkey Scripts
// @match       https://www.fragrantica.com/member/*
// @grant       none
// @version     1.1
// @author      -
// @description 5/8/2021, 10:01:06 AM
// ==/UserScript==

const createdElements = [];

function nameFromLink(url) {
  // split up url
  const parts = url.split("/");

  // get brand
  const secondLast = parts[parts.length - 2];
  const brand = secondLast.split("-").join(" ");

  // get name of perfume
  const last = parts[parts.length - 1];
  const hyphenParts = last.split("-");
  const name = hyphenParts.slice(0, hyphenParts.length - 1).join(" ");

  return `${brand} - ${name}`;
}

function toggleLabels(letters) {
  if (createdElements.length > 0) {
    while (createdElements.length > 0) {
      el = createdElements.pop();
      el.remove();
    }
    return;
  }

  const perfumesOnShelf = document.getElementsByClassName("perfume-on-shelf");

  for (const perfumeOnShelf of perfumesOnShelf) {
    const parentLink = perfumeOnShelf.parentNode;

    // the 'favorite' perfumes don't have perfume name in alt. let's just grab from the url
    const perfumeName = nameFromLink(parentLink.getAttribute("href"));
    const letter = perfumeName[0];

    const label = letters ? letter : perfumeName;

    // add margin to parentDiv
    const parentDiv = parentLink.parentNode;
    parentDiv.style.margin = "0 10px";

    // create a new div element
    const newDiv = document.createElement("div");

    // make font smaller
    newDiv.style.fontSize = "0.6rem";
    newDiv.style.margin = "5px 0";

    // and give it some content
    const newContent = document.createTextNode(label);

    // add the text node to the newly created div
    newDiv.appendChild(newContent);

    // add the div to the parentLink
    parentLink.appendChild(newDiv);

    createdElements.push(newDiv);
  }
}

function createButtons() {
  const buttonsDiv = document.createElement("div");

  buttonsDiv.style.position = "fixed";
  buttonsDiv.style.bottom = "5px";
  buttonsDiv.style.right = "5px";
  buttonsDiv.style.display = "flex";
  buttonsDiv.style.flexDirection = "column";

  let letterButton = document.createElement("button");
  letterButton.style.cursor = "pointer";
  letterButton.innerText = "Toggle Letters";
  letterButton.onclick = () => toggleLabels(true);
  letterButton.style.width = "200ppx";
  letterButton.style.height = "50pxx";
  letterButton.style.padding = "10px";
  letterButton.style.marginBottom = "5px";
  letterButton.style.backgroundColor = "papayawhip";
  letterButton.style.border = "1px solid black";
  letterButton.style.backgroundColor = "papayawhip";

  let toggleNames = document.createElement("button");
  toggleNames.style.cursor = "pointer";
  toggleNames.innerText = "Toggle Labels";
  toggleNames.onclick = () => toggleLabels(false);
  toggleNames.style.width = "200ppx";
  toggleNames.style.height = "50pxx";
  toggleNames.style.padding = "10px";
  toggleNames.style.border = "1px solid black";
  toggleNames.style.backgroundColor = "papayawhip";

  buttonsDiv.append(letterButton);
  buttonsDiv.append(toggleNames);

  document.body.appendChild(buttonsDiv);
}

createButtons();
