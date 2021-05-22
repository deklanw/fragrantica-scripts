// ==UserScript==
// @name        Fragrantica Ratings Names
// @namespace   Violentmonkey Scripts
// @match       https://www.fragrantica.com/member/*
// @grant       none
// @version     1.1
// @author      -
// @description 5/8/2021, 10:01:06 AM
// ==/UserScript==

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

function go() {
  const perfumesOnShelf = document.getElementsByClassName("perfume-on-shelf");

  for (const perfumeOnShelf of perfumesOnShelf) {
    const parentLink = perfumeOnShelf.parentNode;

    // the 'favorite' perfumes don't have perfume name in alt. let's just grab from the url
    const perfumeName = nameFromLink(parentLink.getAttribute("href"));

    // add margin to parentDiv
    const parentDiv = parentLink.parentNode;
    parentDiv.style.margin = "0 10px";

    // create a new div element
    const newDiv = document.createElement("div");

    // make font smaller
    newDiv.style.fontSize = "0.75rem";
    newDiv.style.margin = "10px 0";

    // and give it some content
    const newContent = document.createTextNode(perfumeName);

    // add the text node to the newly created div
    newDiv.appendChild(newContent);

    // add the div to the parentLink
    parentLink.appendChild(newDiv);
  }
}

// https://stackoverflow.com/questions/12897446/userscript-to-wait-for-page-to-load-before-executing-code-techniques

// waits for the page to stop changing for x seconds before executing (waiting for janky ajax calls on Fragrantica to finish).
// Here's how:
// start a timer for INTERVAL milliseconds. when the timer is completed execute the code. if a change on the page is detected,
// cancel the timer and reset it.

const INTERVAL = 3000;
const observer = new MutationObserver(resetTimer);
let timer = setTimeout(action, INTERVAL, observer);

observer.observe(document, { childList: true, subtree: true });

function resetTimer(changes, observer) {
  clearTimeout(timer);
  timer = setTimeout(action, INTERVAL, observer);
}

function action(o) {
  o.disconnect();

  go();
}
