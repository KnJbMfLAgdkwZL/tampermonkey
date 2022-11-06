// ==UserScript==
// @name         Spotify Web Player Hot Keys
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://open.spotify.com/*
// @icon         https://www.google.com/s2/favicons?domain=spotify.com
// @grant        none
// ==/UserScript==
(function () {
    'use strict'
    // Your code here...
    let keydown = false
    document.addEventListener('keydown', (event) => {
        if (!keydown) {
            keydown = true
            switch (event.key) {
                case "ArrowUp": {
                    let v = document.querySelector("#main > div > div.Root__top-container > div.Root__now-playing-bar > footer > div > div.P4eSEARM2h24PZxMHz1T > div > div.player-controls__buttons.player-controls__buttons--new-icons > div.player-controls__left > button.fn72ari9aEmKo4JcwteT")
                    v.click()
                }
                    break;
                case "ArrowDown": {
                    let v = document.querySelector("#main > div > div.Root__top-container > div.Root__now-playing-bar > footer > div > div.P4eSEARM2h24PZxMHz1T > div > div.player-controls__buttons.player-controls__buttons--new-icons > div.player-controls__right > button.mnipjT4SLDMgwiDCEnRC")
                    v.click()
                }
                    break;
            }
        }
    })
    document.addEventListener('keyup', (event) => {
        if (keydown) {
            keydown = false
        }
    })
    document.onauxclick = function(e) {
        if(e.which == 2)
        {
            //e.preventDefault();
            let v = document.querySelector("#main > div > div.Root__top-container > div.Root__now-playing-bar > footer > div > div.P4eSEARM2h24PZxMHz1T > div > div.player-controls__buttons.player-controls__buttons--new-icons > div.player-controls__right > button.mnipjT4SLDMgwiDCEnRC")
            v.click()
        }
    }
    // Your code end here...
})()