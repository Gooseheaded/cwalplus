// ==UserScript==
// @name         CWAL+
// @namespace    http://tampermonkey.net/
// @version      2024-06-13
// @description  A UserScript that adds functionality to CWAL (https://cwal.gg).
// @author       You
// @match        https://cwal.gg/players/
// @icon         https://cwal.gg/favicon.png
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  // Shitty way to ask users for a race to filter with.
  // This should probably be like, a dropdown, or a checkbox, or something.
  // TODO(WorsT): Insert a button/dropdown/whatever into the page.
  let userChoice = "";
  const validChoices = ["T", "P", "Z"];
  while (!validChoices.includes(userChoice)) {
    userChoice = prompt("Choose either 'T', 'P', or 'Z'.");
  }

  // Disgusting CSS selector that finds all "badges", containing the race
  // played in a particular replay.
  const badgeList = [...document.querySelectorAll("div.flex.flex-col div.gap-5 span.text-base-300.font-bold")];

  // Given a "badge" HTML element, this finds the HTML element that corresponds
  // to the whole "match/replat" HTMl element.
  function getContainerElement(badgeElement) {
    return badgeElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
  }

  // The `badgeList` contains *all* badges, not just the opponents'.
  // This filters that list, containing only the opponents' badges.
  const opponentBadgeList = badgeList.filter((element, index) => { return index % 2 === 1; })

  // Show badges that match the user's choice.
  // Hides badges that don't.
  for (const opponentBadge of opponentBadgeList) {
    // A match means this match shold be shown.
    if (opponentBadge.innerText === userChoice) {
      getContainerElement(allBadges).style.display = "";
    }
    // A mismatch means this match shold be hidden.
    else {
      getContainerElement(opponentBadge).style.display = "none";
    }
  }
})();
