console.log("SCRIPT LOADED");

document.addEventListener("click", function (event) {
  if (event.target.matches("#toggle-dropdown")) {
    var div = document.getElementById("dropdownContent");
    div.style.display = div.style.display !== "flex" ? "flex" : "none";
  }

  if (event.target.matches(".example")) {
    performExampleAutomations();
  }

  if (event.target.matches(".execute-test")) {
    executeYourAutomation();
  }
});

// Periodically check for changes in the modal content and scroll to the bottom
setInterval(function () {
  checkAndScroll();
}, 1000); // Adjust the interval as needed

function checkAndScroll() {
  const reactionsModalContent = document.querySelector('.artdeco-modal__content');
  if (reactionsModalContent) {
    const currentHeight = reactionsModalContent.scrollHeight;

    // If the height has changed, scroll to the bottom
    if (currentHeight !== reactionsModalContent.dataset.lastHeight) {
      reactionsModalContent.scrollTop = currentHeight;
      reactionsModalContent.dataset.lastHeight = currentHeight;
    }
  }
}

// ... (rest of your code)
