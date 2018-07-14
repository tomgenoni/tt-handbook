// Elements
// --------------------------------

const data = {
    class    : document.querySelectorAll(".filter-class"),
    property : document.querySelectorAll(".filter-property"),
    value    : document.querySelectorAll(".filter-value")
}
const filter = {
    input : document.querySelector("#filter"),
    type  : document.querySelector("#filter-type"),
    seek  : document.querySelector("#filter-seek")
}

const body   = document.querySelector("body");
const enties = document.querySelectorAll(".entry");

// Functions
// --------------------------------

function purgeMatches() {
    const hits = document.querySelectorAll(".hit");
    body.classList.remove("filter-active");

    hits.forEach(function (i) {
        i.classList.remove("hit");
    });
    enties.forEach(function (i) {
        i.classList.remove("match-class", "match-property", "match-value");
    });
}

function addFilterClass(arr, term, seek, className) {
    arr.forEach(function (i) {
        let classStr = i.textContent;
        let entry    = i.closest(".entry");

        if (seek === "starts") {
            if (classStr.startsWith(term)) {
                entry.classList.add(className);
                i.classList.add("hit");
            }
        } else {
            if (classStr.includes(term)) {
                entry.classList.add(className);
                i.classList.add("hit");
            }
        }
    });
}

function filterClasses() {
    let term = filter.input.value;
    let type = filter.type.value;
    let seek = filter.seek.value;

    purgeMatches();

    if (term !== "") {
        body.classList.add("filter-active");

        if (type == "class") {
            addFilterClass(data.class, term, seek, "match-class");
        } else if (type == "property") {
            addFilterClass(data.property, term, seek, "match-property");
        } else {
            addFilterClass(data.value, term, seek, "match-value");
        }
    }
}

// Event listeners
// --------------------------------

filter.input.addEventListener("keyup", function () {
    filterClasses();
})

filter.type.addEventListener("change", function () {
    filterClasses();
});

filter.seek.addEventListener("change", function () {
    filterClasses();
})