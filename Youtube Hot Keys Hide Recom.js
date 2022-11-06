// ==UserScript==
// @name         Youtube Hot Keys Hide Recom
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.youtube.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==
(function () {
    'use strict';

    //------------------------------------------------------------------------------------------------------------------
    function getMenuButton(element) {
        let buttons = element.getElementsByTagName(`button`)
        for (let el of buttons)
            if (el.id === 'button')
                if (el.className === 'style-scope yt-icon-button')
                    if (el.ariaLabel === 'Меню действий')
                        return el
        return false
    }

    function getMenu() {
        let menus = document.getElementsByTagName(`ytd-menu-service-item-renderer`)
        if (menus.length > 0)
            return menus
        return false
    }

    function getMenuNotInterested(menus) {
        for (let el of menus)
            if (el.innerHTML.includes('Не интересует'))
                return el
        return false
    }

    function getMenuDoNotRecommendChannel(menus) {
        for (let el of menus)
            if (el.innerHTML.includes('Не рекомендовать видео с этого канала'))
                return el
        return false
    }

    function getParent(element, key) {
        if (
            ['ytd-rich-item-renderer', 'ytd-video-preview'].includes(element.tagName.toLowerCase())
            &&
            ['style-scope ytd-rich-grid-row', 'style-scope ytd-rich-grid-renderer'].includes(element.className)
        ) {
            let menuButton = getMenuButton(element)
            if (menuButton) {
                menuButton.click()
                setTimeout(() => {
                    let menuOptions = getMenu()
                    if (menuOptions) {
                        if (['q', 'й'].includes(key)) {
                            let notInterested = getMenuNotInterested(menuOptions)
                            if (notInterested)
                                notInterested.click()
                        }
                        if (['w', 'ц'].includes(key)) {
                            let doNotRecommendChannel = getMenuDoNotRecommendChannel(menuOptions)
                            if (doNotRecommendChannel)
                                doNotRecommendChannel.click()
                        }
                    }
                }, 100)
            }
            return true
        }
        return false
    }

    let x = 0, y = 0
    document.onkeyup = (e) => {
        if (['q', 'й', 'w', 'ц'].includes(e.key)) {
            console.clear()
            let element = document.elementFromPoint(x, y)
            do {
                let res = getParent(element, e.key)
                if (res)
                    return
                if (element === document.body)
                    break
                element = element.parentElement
            } while (true)
        }
    }
    document.addEventListener('mousemove', (e) => {
        x = e.clientX
        y = e.clientY
    }, {passive: true})
    //------------------------------------------------------------------------------------------------------------------
})();