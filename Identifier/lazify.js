// const mo = new MutationObserver(onMutation);
// // placeholder image (1 * 1 black pixel)
// const placeholder =
//   "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAAAAAAALAAAAAABAAEAAAICTAEAOw==";

// // in case the content script was injected after the page is partially loaded
// onMutation([{ addedNodes: [document.documentElement] }]);
// observe();

// function onMutation(mutations) {
//   for (const { addedNodes } of mutations) {
//     for (const n of addedNodes) {
//       //if not an element go to next iteration
//       if (!n.tagName) continue;

//       //lazify if node is of tag img
//       if (n.matches("img")) {
//         lazify(n);
//       }

//       //check if node have img descendant and then lazify
//       if (n.firstElementChild) {
//         for (const elmnt of n.querySelectorAll("img")) {
//           lazify(elmnt);
//         }
//       }
//     }
//   }
// }

// function lazify(node) {
//   //disconnect mo so as to not trigger mo when modifying DOM
//   mo.disconnect();

//   // exceptions
//   if (node.id == "gif" || node.id == "dummyCode") {
//     return;
//   }

//   //store original src as an attribute of node
//   if (!node.hasAttribute("someabstractname")) {
//     node.setAttribute("someabstractname", node.src);
//   }

//   // //explicitly gives placeholder image a width
//   // if (!node.hasAttribute("width")) {
//   //   node.setAttribute("width", 20);
//   // }

//   // //explicitly gives placeholder image a height
//   // if (!node.hasAttribute("height")) {
//   //   node.setAttribute("height", 20);
//   // }

//   // replace original src with placeholder
//   node.src = placeholder;

//   //force node to not render as alternative image
//   if (node.srcset) {
//     node.removeAttribute("srcset");
//   }

//   //prevent redirection (not fully working yet)
//   var parent = node.parentNode;
//   while (parent.tagName && !parent.matches("a")) {
//     parent = parent.parentNode;
//   }
//   if (parent.tagName) {
//     parent.href = "javascript:void(0);";
//   }

//   //load original src after clicking image
//   node.addEventListener("click", () => {
//     // event.target.removeAttribute("width"),
//     // event.target.removeAttribute("height"),
//     event.target.src = event.target.getAttribute("someabstractname");
//   });

//   observe();
// }

// function observe() {
//   mo.observe(document, {
//     subtree: true,
//     childList: true,
//   });
// }
