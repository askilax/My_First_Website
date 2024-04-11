function resetPage() {
    localStorage.reload(true)
}

document.addEventListener("keydown", function (event) {
    if (event.keyCode === 116 || (event.ctrlKey || event.metaKey) && event.keyCode === 116) {
        event.preventDefault();
        resetPage();
    }
});