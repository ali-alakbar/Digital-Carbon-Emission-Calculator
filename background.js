// for 1st pop up triggered by click of extension button
chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { type: "popup-modal" });
  });
});

// listening to messages sent by content.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // added by Shaoyi
  if (request.method == "acceptAll") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        method: "reduceColor",
        type: "acceptAll",
      });
      chrome.tabs.sendMessage(tabs[0].id, {
        method: "stopAnimation",
        type: "acceptAll",
      });
      chrome.tabs.sendMessage(tabs[0].id, { method: "acceptAll" });
    });
  }
  if (request.method == "revertAll") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        method: "resetColor",
      });
      chrome.tabs.sendMessage(tabs[0].id, {
        method: "resetAnimation",
      });
      chrome.tabs.sendMessage(tabs[0].id, {
        method: "resetFont",
      });
      chrome.tabs.sendMessage(tabs[0].id, { method: "revertAll" });
    });
  }

  // from inject.js to content.js
  if (request.method == "displayRevert") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, request);
    });
  }

  if (request.method == "greyOnceMouseEnter") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, request);
    });
  }

  if (request.method == "greyOnceMouseLeave") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, request);
    });
  }

  // if (request.method == "restoreImageNew") {
  //   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  //     chrome.tabs.sendMessage(tabs[0].id, request);
  //   });
  // }
  if (request.method == "reduceColor") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, request);
    });
  }
  if (request.method == "reduceColorNew") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, request);
    });
  }

  // ===========================================
  // ========== Start Ali-Akbar Code ===========
  // ===========================================
  if (request.method == "loadElements") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, request);
    });
  }
  // =========================================
  // ========== End Ali-Akbar Code ===========
  // =========================================
  if (request.method == "stopAnimation") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, request);
    });
  }
  if (request.method == "editText") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, request);
    });
  }
});

// not sure what these requests are for, extension seems to work without them
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type == "changeColor") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.executeScript(
        tabs[0].id,
        {
          code:
            'chrome.storage.sync.get(["disabled"], function(result) {if (!result["disabled"]) {$("div, label, p, button, textarea, img, ul, li, ol, tr, th, td, thead, tbody, span, article, section, main, dl, datalist, output, legend").each(function() {$(this).css("color","' +
            request.color +
            '");})}});',
        }
        // (result) => {
        //   const lastErr = chrome.runtime.lastError;
        //   if (lastErr) {
        //   }
        // }
      );
    });
  } else if (request.type == "removeFont") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        {
          type: "removeFont",
          last: request.last,
          fontStyle: request.fontStyle,
        },
        null
      );
    });
  } else if (request.type == "changeFont") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        {
          type: "changeFont",
          last: request.last,
          fontStyle: request.fontStyle,
          family: request.family,
          fontURL: request.fontURL,
        },
        null
      );
    });
  }
  if (request.type === "reload") {
    console.log("reached");
    chrome.tabs.reload({ bypassCache: true });
  }
  sendResponse({});
});

// callback function
// function doStuffWithDom(domContentOne) {
//   console.log('I received the following DOM content:\n' + domContentOne); //domContentTwo is undefined!
//   // check if you can add event listener for DOM content passed from content.js
//   domContentOne.addEventListener("click", function() {
//     console.log("Hello World from callback function");
//   });
// }
