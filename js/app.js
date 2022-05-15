(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    const buttonBlock = document.querySelector(".blocks__button-block");
    document.addEventListener("click", (function(e) {
        let target = e.target;
        const textareaValue = document.querySelector(".search-text__textarea").value;
        const wordLabel = document.querySelector(".search-text__label-word");
        const symbolLabel = document.querySelector(".search-text__label-symbol");
        const item = document.querySelectorAll(".blocks__item");
        const listItems = document.querySelectorAll(".block-list__item");
        if (target.closest(".block-list__item")) if (e.ctrlKey || e.metaKey) setSeveralClass(target); else setSingleClass(listItems, "_active", target, e); else removeClass(listItems, "_active");
        if (target.closest(".blocks__close")) {
            const blockItem = document.querySelector(".blocks__item");
            blockItem.remove();
            if (item.length <= 5) {
                const limit = document.querySelector(".blocks__limit");
                limit.remove();
            }
        }
        if (target.closest(".blocks__button")) {
            const blockBody = document.querySelector(".blocks__body");
            blockBody.insertAdjacentHTML("beforeend", `<div class="blocks__item">\n         <div class="blocks__wrapper">\n            <div class="blocks__close">X</div>\n            <div class="blocks__title">Lorem ipsum dolor sit amet.</div>\n            <p class="blocks__text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente\n               expedita fuga distinctio ex molestiae nam! Sed consectetur assumenda laborum qui provident\n               temporibus maiores voluptate nostrum, fuga, a corrupti totam quaerat.</p>\n         </div>\n      </div>`);
            if (item.length > 4) {
                item.forEach(((element, index) => {
                    if (index >= 4) element.remove();
                }));
                createLimit("div", "Думаю, 5 блоков хватит");
            }
        }
        if (target.closest(".dividers__button")) {
            const resultBlock = document.querySelector(".dividers__result");
            if (resultBlock) resultBlock.remove();
            calcDividers();
        }
        if (target.closest(".search-text__label-word")) wordLabel.classList.toggle("_active");
        if (target.closest(".search-text__label-symbol")) symbolLabel.classList.toggle("_active");
        if (target.closest(".search-text__button")) {
            const wordValue = document.querySelectorAll(".search-text__value");
            const numberWarning = document.querySelector(".search-text__num");
            if (numberWarning) numberWarning.remove();
            if (wordValue.length) wordValue.forEach((item => {
                item.remove();
            }));
            if (wordLabel.classList.contains("_active")) setWordCount(textareaValue);
            if (symbolLabel.classList.contains("_active")) setSymbolCount(textareaValue);
        }
    }));
    function createLimit(tag, text) {
        const limits = document.querySelectorAll(".blocks__limit");
        let limitMessage = document.createElement(tag);
        limitMessage.classList.add("blocks__limit");
        limitMessage.innerHTML = text;
        buttonBlock.append(limitMessage);
        limits.forEach(((item, position) => {
            if (0 === position) item.remove();
        }));
    }
    function setSingleClass(block, classAddName, elem, event) {
        block.forEach((item => {
            if (item.classList.contains(classAddName)) item.classList.remove(classAddName);
            elem.classList.add(classAddName);
            event.preventDefault();
        }));
    }
    function setSeveralClass(elem) {
        elem.classList.toggle("_active");
    }
    function removeClass(block, classRemoveName) {
        block.forEach((listItem => {
            listItem.classList.remove(classRemoveName);
        }));
    }
    function calcDividers() {
        const divInput = document.querySelector(".dividers__input").value;
        let result = [];
        for (let index = 1; index <= divInput; index++) if (divInput % index === 0) {
            let sum = divInput / index;
            result.push(sum);
        }
        if (divInput.length) createResult(result, divInput);
        function createResult(elem, number) {
            const divBody = document.querySelector(".dividers__body");
            let result;
            result = document.createElement("div");
            result.classList.add("dividers__result");
            result.innerHTML = `Число ${number} можно делить на:` + " " + elem;
            divBody.append(result);
        }
    }
    function setWordCount(field) {
        const wordCount = field.match(/(\p{L}+)/gu);
        if (null !== wordCount) createCount(wordCount.length, "слов"); else createNumWarning();
    }
    function setSymbolCount(field) {
        const symbolCount = field.match(/\S/g);
        if (null !== symbolCount) createCount(symbolCount.length, "символов");
    }
    function createCount(value, word) {
        const countBody = document.querySelector(".search-text__body");
        let countValue;
        countValue = document.createElement("div");
        countValue.classList.add("search-text__value");
        countValue.innerHTML = `Количество ${word} в данной строке: ${value}`;
        countBody.append(countValue);
    }
    function createNumWarning() {
        const countBody = document.querySelector(".search-text__body");
        let countNum;
        countNum = document.createElement("div");
        countNum.classList.add("search-text__num");
        countNum.innerHTML = `Я считаю только слова и символы`;
        countBody.append(countNum);
    }
    window["FLS"] = true;
    isWebp();
})();