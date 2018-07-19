// Elements
// --------------------------------

const data = {
    class: document.querySelectorAll(".filter-class"),
    property: document.querySelectorAll(".filter-property"),
    value: document.querySelectorAll(".filter-value")
};
const filter = {
    input: document.querySelector("#filter"),
    type: document.querySelectorAll("[name='filter-type']"),
    seek: document.querySelectorAll("[name='filter-seek']"),
    clear: document.querySelector("#filter-clear")
};

const noHit = {
    type: document.querySelector("#no-hit-type"),
    term: document.querySelector("#no-hit-term"),
    seek: document.querySelector("#no-hit-seek")
};

const body = document.querySelector("body");
const enties = document.querySelectorAll(".entry");

// Functions
// --------------------------------

function getRadioValue(arr) {
    let value = "";
    arr.forEach(function(i) {
        if (i.checked) {
            value = i.value;
        }
    });
    return value;
}

function purgeMatches() {
    const hits = document.querySelectorAll(".hit");
    body.classList.remove("filter-active");

    hits.forEach(function(i) {
        i.classList.remove("hit");
    });
    enties.forEach(function(i) {
        i.classList.remove("match-class", "match-property", "match-value");
    });
}

function clearSearch() {
    body.classList.remove("filter-active");
    filter.input.value = "";
    filter.input.focus();
}

function highlightType(type) {
    body.classList.remove("type-class", "type-property", "type-value");
    body.classList.add("type-" + type);
}

function hitTest(type, term, seek) {
    var hits = document.querySelectorAll(".hit");
    if (hits.length < 1) {
        body.classList.add("no-hit");
        noHit.type.textContent = type;
        noHit.term.textContent = term;
        noHit.seek.textContent = seek;
    } else {
        body.classList.remove("no-hit");
    }
}

function addFilterClass(arr, type, term, seek, className) {
    arr.forEach(function(i) {
        let classStr = i.textContent;
        let entry = i.closest(".entry");

        if (seek === "includes") {
            if (classStr.includes(term)) {
                entry.classList.add(className);
                i.classList.add("hit");
            }
        } else {
            if (classStr.startsWith(term)) {
                entry.classList.add(className);
                i.classList.add("hit");
            }
        }
    });
    hitTest(type, term, seek);
}

function filterClasses() {
    let term = filter.input.value;
    let type = getRadioValue(filter.type);
    let seek = getRadioValue(filter.seek);

    purgeMatches();
    highlightType(type);

    if (term !== "") {
        body.classList.add("filter-active");

        if (type == "class") {
            addFilterClass(data.class, type, term, seek, "match-class");
        } else if (type == "property") {
            addFilterClass(data.property, type, term, seek, "match-property");
        } else {
            addFilterClass(data.value, type, term, seek, "match-value");
        }
    }
}

// Event listeners
// --------------------------------

filter.type.forEach(function(i) {
    i.addEventListener("change", function() {
        filterClasses();
    });
});

filter.seek.forEach(function(i) {
    i.addEventListener("change", function() {
        filterClasses();
    });
});

filter.input.addEventListener("keyup", function() {
    filterClasses();
});

window.onload = function() {
    filter.input.focus();
    filterClasses();
};

// Clear term input
filter.clear.addEventListener("click", function() {
    clearSearch();
});

// Escape key clears term input
body.addEventListener("keyup", function(e) {
    if (e.which == 27) {
        clearSearch();
    }
});
