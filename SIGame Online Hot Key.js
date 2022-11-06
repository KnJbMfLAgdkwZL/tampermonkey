// ==UserScript==
// @name         SIGame Online Hot Key
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://vladimirkhil.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=vladimirkhil.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Your code here...
    let answer = false
    document.onkeyup = (e) => {
        if (e.key === 'q' || e.key === 'й') {
            answer = true
        }
        if (e.key === 'w' || e.key === 'ц') {
            answer = false
        }
    }
    setInterval(() => {
        let top = document.getElementsByClassName('topBorder ')
        let right = document.getElementsByClassName('rightBorder  ')
        let bottom = document.getElementsByClassName('bottomBorder  ')
        let left = document.getElementsByClassName('leftBorder  ')
        if (top.length && right.length && bottom.length && left.length && answer) {
            let playerButton = document.getElementsByClassName('playerButton')
            if (playerButton.length) {
                playerButton[0].click()
                answer = false
            }
        }
    }, 50)


})();