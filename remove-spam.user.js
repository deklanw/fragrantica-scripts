// ==UserScript==
// @name        Remove spam from Fragrantica
// @namespace   Violentmonkey Scripts
// @match       https://www.fragrantica.com/perfume/*
// @grant       none
// @version     1.0
// @author      -
// @description 5/22/2021, 9:01:14 AM
// ==/UserScript==

function getShopSpamElement() {
  const elements = document.getElementsByClassName(
    "grid-x grid-margin-x grid-margin-y"
  );

  return elements[2];
}

function getiFrames() {
  return document.getElementsByTagName("iframe");
}

// https://stackoverflow.com/questions/12897446/userscript-to-wait-for-page-to-load-before-executing-code-techniques
new MutationObserver(check).observe(document, {
  childList: true,
  subtree: true,
});

let removedShopSpam = false;

function check(changes, observer) {
  const shopSpam = getShopSpamElement();
  const iframes = getiFrames();

  // need to keep track of whether we've removed it already or not
  // the element isn't identified with an id or class, so we have to identify by position
  // therefore if we try removing it after having already done so we'll start deleting subsequent elements
  if (shopSpam && !removedShopSpam) {
    console.log("Removing shopSpam");
    removedShopSpam = true;
    shopSpam.remove();
  }

  if (iframes.length > 0) {
    console.log("Removing iframes");
    for (const e of iframes) {
      e.remove();
    }
  }
}
