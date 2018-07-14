var clipboard = new ClipboardJS('.clipboard', {
    target: function (trigger) {
        return trigger;
    }
});

clipboard.on('success', function (e) {
    e.trigger.classList.add("success")
    setTimeout(function () {
        e.trigger.classList.remove("success")
    }, 2000)
    e.clearSelection();
});
