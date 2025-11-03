const overlay = document.getElementById("model-overlay");
const openButton = document.getElementById("open-model");
const closeButton = document.getElementById("close-model");
const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
let lastFocusedElement = null;

const trapFocus = (container, event) => {
  const focusableElements = Array.from(container.querySelectorAll(focusableSelectors));
  if (focusableElements.length === 0) {
    event.preventDefault();
    return;
  }

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault();
    lastElement.focus();
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault();
    firstElement.focus();
  }
};

const toggleOverlay = (show) => {
  if (show) {
    overlay.classList.add("is-visible");
    overlay.setAttribute("aria-hidden", "false");
    lastFocusedElement = document.activeElement;
    requestAnimationFrame(() => {
      closeButton.focus();
    });
    document.body.style.overflow = "hidden";
  } else {
    overlay.classList.remove("is-visible");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }
};

openButton.addEventListener("click", () => toggleOverlay(true));
closeButton.addEventListener("click", () => toggleOverlay(false));

overlay.addEventListener("click", (event) => {
  if (event.target === overlay) {
    toggleOverlay(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && overlay.classList.contains("is-visible")) {
    toggleOverlay(false);
  }

  if (event.key === "Tab" && overlay.classList.contains("is-visible")) {
    trapFocus(overlay, event);
  }
});
