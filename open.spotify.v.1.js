// ==UserScript==
// @name         Spotify Web player controls
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://open.spotify.com/*
// @icon         https://www.google.com/s2/favicons?domain=spotify.com
// @grant        none
// ==/UserScript==
function Previous() {
    let control = document.querySelector("div.player-controls__left")
    let v = control.querySelector('[aria-label="Назад"]')
    if (v) {
        v.click()
    }
}

function Next() {
    let control = document.querySelector("div.player-controls__right")
    let v = control.querySelector('[aria-label="Далее"]')
    if (v) {
        v.click()
    }
}

(function () {
    'use strict'
    // BEGIN >>>>>>>
    let keydown = false
    document.addEventListener('keydown', (event) => {
        if (!keydown) {
            keydown = true
            switch (event.key) {
                case "ArrowUp":
                    Previous()
                    break;
                case "ArrowDown":
                    Next()
                    break;
            }
        }
    })
    document.addEventListener('keyup', (event) => {
        if (keydown) {
            keydown = false
        }
    })
    document.onauxclick = function (e) {
        if (e.which === 2) {
            //e.preventDefault()
            Next()
        }
    }
    // END <<<<<<<
})()