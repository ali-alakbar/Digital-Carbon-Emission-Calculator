var selected = null;
var changes = 0;
var select = document.getElementById("fontChange");
var fontChangeDiv = document.getElementById("fontChangeDiv");

var reset = () => {
  elements = document.getElementsByTagName("*");
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.removeProperty("font-family");
  }
  if (document.getElementById("confirmationBtns")) {
    document.getElementById("confirmationBtns").remove();
    if (document.getElementById("rejectAll").getAttribute("disabled")) {
      document.getElementById("rejectAll").removeAttribute("disabled");
      document.getElementById("modal_close").removeAttribute("disabled");
    }
  }
  select.selectedIndex = 0;
  changes = 0;
  fontChangeDiv.setAttribute("data-changes", changes);
};

// Logic for Accept and Reject buttons
var confirm = (selected) => {
  if (document.getElementById("confirmationBtns") == null) {
    fontChangeDiv.insertAdjacentHTML(
      "beforeend",
      `<div id="confirmationBtns" style="margin-top: 7px;">
          <button id="acceptChange" class="btn btn-success btn-sm">Accept</button>
          <button id="rejectChange" class="btn btn-danger btn-sm">Reject</button>
        </div>`
    );
    if (
      document.getElementById("rejectAll") &&
      document.getElementById("rejectAll").getAttribute("disabled") == null
    ) {
      document.getElementById("rejectAll").setAttribute("disabled", true);
      document.getElementById("modal_close").setAttribute("disabled", true);
    }
    if (selected != null) {
      document
        .getElementById("confirmationBtns")
        .setAttribute("data-value", "singleChange");
    }
  }
};

// Listen for Accept and Reject clicks
document.body.addEventListener("click", (element) => {
  let confirmationBtns = document.getElementById("confirmationBtns");
  if (element.target.id == "acceptChange") {
    confirmationBtns.remove();
    if (document.getElementById("rejectAll").getAttribute("disabled")) {
      document.getElementById("rejectAll").removeAttribute("disabled");
      document.getElementById("modal_close").removeAttribute("disabled");
    }
    changes += 1;
    fontChangeDiv.setAttribute("data-changes", changes);
  }
  if (element.target.id == "rejectChange") {
    if (confirmationBtns.getAttribute("data-value") == "singleChange") {
      selected.style.removeProperty("font-family");
      changes -= 1;
      fontChangeDiv.setAttribute("data-changes", changes);
    } else {
      reset();
    }
    // confirmationBtns.remove();
    // if (document.getElementById("rejectAll").getAttribute("disabled")) {
    //   document.getElementById("rejectAll").removeAttribute("disabled");
    //   document.getElementById("modal_close").removeAttribute("disabled");
    // }
  }
});

// Selection logic
select.addEventListener("click", (clicked) => {
  let option = clicked.target.value;
  let highlights = window.getSelection();

  // if specific text is highlighted
  if (highlights.toString().length != 0) {
    selected = highlights.anchorNode.parentElement;

    if (option == "default") {
      selected.style.removeProperty("font-family");
    }
    if (option == "arial") {
      selected.style.setProperty(
        "font-family",
        "Arial, sans-serif",
        "important"
      );
      console.log(selected);
      confirm(selected);
    }
    if (option == "verdana") {
      selected.style.setProperty(
        "font-family",
        "Verdana, sans-serif",
        "important"
      );
      confirm(selected);
    }
    if (option == "helvetica") {
      selected.style.setProperty(
        "font-family",
        "Helvetica, sans-serif",
        "important"
      );
      confirm(selected);
    }
    if (option == "times") {
      selected.style.setProperty(
        "font-family",
        `"Times New Roman", serif`,
        "important"
      );
      confirm(selected);
    }
    if (option == "courier") {
      selected.style.setProperty(
        "font-family",
        `"Courier New", monospace`,
        "important"
      );
      confirm(selected);
    }
    if (option == "georgia") {
      selected.style.setProperty("font-family", "Georgia, serif", "important");
      confirm(selected);
    }
    if (option == "trebuchet") {
      selected.style.setProperty(
        "font-family",
        `"Trebuchet MS", sans-serif`,
        "important"
      );
      confirm(selected);
    }
    if (option == "tahoma") {
      selected.style.setProperty(
        "font-family",
        "Tahoma, sans-serif",
        "important"
      );
      confirm(selected);
    }
  }
  // if no text is highlighted (apply font change to whole page)
  else {
    elements = document.getElementsByTagName("*");
    if (option == "default") {
      reset();
    }
    if (option == "arial") {
      for (let i = 0; i < elements.length; i++) {
        elements[i].style.setProperty(
          "font-family",
          "Arial, sans-serif",
          "important"
        );
      }
      confirm();
    }
    if (option == "verdana") {
      for (let i = 0; i < elements.length; i++) {
        elements[i].style.setProperty(
          "font-family",
          "Verdana, sans-serif",
          "important"
        );
      }
      confirm();
    }
    if (option == "helvetica") {
      for (let i = 0; i < elements.length; i++) {
        elements[i].style.setProperty(
          "font-family",
          "Helvetica, sans-serif",
          "important"
        );
      }
      confirm();
    }
    if (option == "times") {
      for (let i = 0; i < elements.length; i++) {
        elements[i].style.setProperty(
          "font-family",
          `"Times New Roman", serif`,
          "important"
        );
      }
      confirm();
    }
    if (option == "courier") {
      for (let i = 0; i < elements.length; i++) {
        elements[i].style.setProperty(
          "font-family",
          `"Courier New", monospace`,
          "important"
        );
      }
      confirm();
    }
    if (option == "georgia") {
      for (let i = 0; i < elements.length; i++) {
        elements[i].style.setProperty(
          "font-family",
          "Georgia, serif",
          "important"
        );
      }
      confirm();
    }
    if (option == "trebuchet") {
      for (let i = 0; i < elements.length; i++) {
        elements[i].style.setProperty(
          "font-family",
          `"Trebuchet MS", sans-serif`,
          "important"
        );
      }
      confirm();
    }
    if (option == "tahoma") {
      for (let i = 0; i < elements.length; i++) {
        elements[i].style.setProperty(
          "font-family",
          "Tahoma, sans-serif",
          "important"
        );
      }
      confirm();
    }
  }
});

var resetBtn = document.getElementById("reset");
resetBtn.addEventListener("click", () => {
  reset();
});
