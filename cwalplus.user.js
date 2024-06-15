// ==UserScript==
// @name         CWAL+
// @namespace    http://tampermonkey.net/
// @version      2024-06-14
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
  let userChoice = "All";
  
  function insertFilterDropDown() {
    const filterDropDown = document.createElement("div");
    filterDropDown.innerHTML = `
    <select class="select select-sm w-full gap-2 max-w-xs">
      <option disabled selected>Filter by matchup</option>
      <option>T</option>
      <option>P</option>
      <option>Z</option>
      <option>All</option>
    </select>
    `;
    filterDropDown.addEventListener("change", (event) => {
      userChoice = event.target.value;
      filterMatches();
    });
    const dropDownContainer = document.querySelector("div.flex.flex-row.justify-end.form-control.w-full")
    dropDownContainer.prepend(filterDropDown);
    dropDownContainer.closest("div.flex.flex-row.justify-end.form-control.w-full").classList.add("gap-2");
  }
  insertFilterDropDown();

  function filterMatches() {
    // Disgusting CSS selector that finds all "badges", containing the race
    // played in a particular replay.
    const badgeList = [...document.querySelectorAll("div.opponent-race")];

    // Given a "badge" HTML element, this finds the HTML element that corresponds
    // to the whole "match/replat" HTMl element.
    function getContainerElement(badgeElement) {
      // return badgeElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
    return badgeElement.closest("div.w-full.flex.flex-row.gap-5.py-2")
    }
    let exampleBadge = badgeList[0];

    // Show badges that match the user's choice.
    // Hides badges that don't.
    for (const opponentBadge of badgeList) {

      // The first character of the badge's text is the Race.
      const opponentRace = opponentBadge.innerText[0];

      // A match means this match should be shown.
      if (opponentRace === userChoice || userChoice === "All") {
        getContainerElement(opponentBadge).style.display = "";
      }
      // A mismatch means this match should be hidden.
      else {
        getContainerElement(opponentBadge).style.display = "none";
      }
    }
  }
  filterMatches();

  const loadMoreButton = document.querySelector("button.btn.btn-sm.btn-primary.mt-6");
  loadMoreButton.addEventListener("click", () => {
    setTimeout(function() {
      filterMatches();
    }, 500 );
  });
})

  ();