const dataClass = document.querySelectorAll(".filter-class");
const dataProperty = document.querySelectorAll(".filter-property");
const dataValue = document.querySelectorAll(".filter-value");

const body = document.querySelector("body");

const filterInput = document.querySelector("#filter");
const filterSelect = document.querySelector("#filter-type");
const enties = document.querySelectorAll(".entry");

function purgeMatches() {
    const hits = document.querySelectorAll(".hit");
    enties.forEach(function (i) {
        i.classList.remove("match-class");
        i.classList.remove("match-property");
        i.classList.remove("match-value");
    });
    hits.forEach(function (i) {
        i.classList.remove("hit");
    });
    body.classList.remove("filter-active");
}

function addFilterClass(arr, term, className) {
    arr.forEach(function (i) {
        let classStr = i.innerHTML;
        let entry = i.closest(".entry");

        if (classStr.startsWith(term)) {
            entry.classList.add(className);
            i.classList.add("hit");
        }
    });
}

function filterClasses(term, type) {
    purgeMatches();

    if (term != "") {
        body.classList.add("filter-active");

        if (type == "class") {
            addFilterClass(dataClass, term, "match-class");
        } else if (type == "property") {
            addFilterClass(dataProperty, term, "match-property");
        } else {
            addFilterClass(dataValue, term, "match-value");
        }
    }
}

filterInput.addEventListener("keyup", function () {
    let term = this.value;
    let type = filterSelect.value;
    filterClasses(term, type);
})

filterSelect.addEventListener("change", function () {
    let term = filterInput.value;
    let type = this.value;
    filterClasses(term, type);
})