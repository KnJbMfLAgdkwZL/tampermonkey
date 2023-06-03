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
    // BEGIN >>>>>>>
    let accessToken
    window.addEventListener('load', function () {
        let session = document.querySelector("#session")
        accessToken = JSON.parse(session.textContent).accessToken
    })

    let apiUrl = 'https://api.spotify.com/v1/me/player'

    function SetNewPosition(newPosition) {
        fetch(`${apiUrl}/seek?position_ms=${newPosition}`, {
            method: 'PUT',
            headers: {'Authorization': `Bearer ${accessToken}`}
        }).then(response => {
            if (!response.ok) {
                throw new Error('Failed to seek track')
            }
        }).catch(error => console.error(error))
    }

    function SetNewPosByNum(num) {
        num = parseInt(num)
        fetch(`${apiUrl}/currently-playing`, {
            headers: {'Authorization': `Bearer ${accessToken}`}
        }).then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch currently playing track')
            }
            return response.json()
        }).then(data => {
            let duration = data.item.duration_ms
            duration = parseInt(duration)
            let str = `${duration / 100 * num * 10}`
            let newPosition = parseInt(str)
            SetNewPosition(newPosition)
        }).catch(error => console.error(error))
    }

    function Next() {
        fetch(`${apiUrl}/next`, {
            method: 'POST',
            headers: {'Authorization': `Bearer ${accessToken}`}
        }).then(response => {
            if (!response.ok) {
                throw new Error('Failed to skip track.')
            }
        }).catch(error => console.error(error))
    }

    function Previous() {
        fetch(`${apiUrl}/previous`, {
            method: 'POST',
            headers: {'Authorization': `Bearer ${accessToken}`}
        }).then(response => {
            if (!response.ok) {
                throw new Error('Failed to skip track.')
            }
        }).catch(error => console.error(error))
    }

    let keydown = false
    document.addEventListener('keydown', (event) => {
        if (!keydown) {
            keydown = true
            if ('0123456789'.includes(event.key)) {
                SetNewPosByNum(event.key)
            } else {
                switch (event.key) {
                    case "ArrowUp":
                        Previous()
                        break;
                    case "ArrowDown":
                        Next()
                        break;
                }
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
