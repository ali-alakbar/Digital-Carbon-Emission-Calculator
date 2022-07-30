chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.method == "acceptAll") {
    if (document.getElementById("acceptAllPopup") == null) {
      const modal = document.createElement("dialog");
      modal.setAttribute("id", "acceptAllPopup");
      modal.setAttribute(
        "style",
        `
    height:300px;
    border: none;
    top:150px;
    border-radius:20px;
    background-color:white;
    position: fixed; box-shadow: 0px 12px 48px rgba(29, 5, 64, 0.32);
    display: flex; 
    justify-content: center; 
    align-items: center; 
    flex-direction: column;
    z-index: 100;"
    `
      );
      modal.innerHTML = `<iframe id="popup-content"; style="height:100%"></iframe>
    <div id = "modalbox" style="position:absolute; top:0px; left:5px;">
    <button id="closebutton" type="button" class="btn-close" aria-label="Close" style="margin-top: 3%; margin-left: 2%;"></button>
    <div class='text-center mt-4 mb-4'>
    <h3 style = "color: rgb(83, 193, 83);font-weight: bold;">Greenie Web</h3>
    <p>Digital Decarbonisation</p>
    <h2>Applied All Modifications</h2>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous"></script>
    </div>`;

      document.body.appendChild(modal);
      document.getElementById("closebutton").addEventListener("click", () => {
        document.getElementById("acceptAllPopup").remove();
      });
    }
    return true;
  }

  // added by Shwetha & Sanofer
  if (request.method == "greyOnceMouseEnter") {
    console.log("Reached here ~ mousenter!");
    img_index = request.img_elem;
    var imgs = document.querySelectorAll("img");
    var img = imgs[img_index];
    img.style =
      "filter: contrast(80%) grayscale(80%) opacity(90%) saturate(18%); border: 10px solid red;";
    // img.style += "border: 10px solid red;"
    img.scrollIntoView({ behaviour: "smooth", inline: "center" });
  }

  if (request.method == "greyOnceMouseLeave") {
    console.log("Reached here ~ mouseleave!");
    img_index = request.img_elem;
    var imgs = document.querySelectorAll("img");
    var img = imgs[img_index];
    img.style = "none";
  }

  if (request.method == "revertAll") {
    const modal = document.createElement("dialog");
    modal.setAttribute("id", "revertAllPopup");
    modal.setAttribute(
      "style",
      `
    height:300px;
    border: none;
    top:150px;
    border-radius:20px;
    background-color:white;
    position: fixed; box-shadow: 0px 12px 48px rgba(29, 5, 64, 0.32);
    display: flex; 
    justify-content: center; 
    align-items: center; 
    flex-direction: column;
    z-index: 100;"
    `
    );
    modal.innerHTML = `<iframe id="popup-content"; style="height:100%"></iframe>
    <div id = "modalbox" style="position:absolute; top:0px; left:5px;">
    <button id="closebutton" type="button" class="btn-close" aria-label="Close" style="margin-top: 3%; margin-left: 2%;"></button>
    <div class='text-center mt-4 mb-4'>
    <h3 style = "color: rgb(83, 193, 83);font-weight: bold;">Greenie Web</h3>
    <p>Digital Decarbonisation</p>
    <h2>Removed All Modifications</h2>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous"></script>
    </div>`;

    document.body.appendChild(modal);
    document.getElementById("closebutton").addEventListener("click", () => {
      document.getElementById("revertAllPopup").remove();
    });
  }

  //added by Sailesh
  else if (request.method == "reduceColor") {
    // if (document.getElementById("revertAll") != null && document.getElementById("revertAll").value == "on") {
    //   document.getElementById("revertAll").value = "off";
    // }
    var imgs = document.querySelectorAll("img");
    for (const img of imgs) {
      img.style.filter =
        "contrast(80%) grayscale(80%) opacity(90%) saturate(18%)";
    }
    if (request.type != "acceptAll") {
      const modal = document.createElement("dialog");
      modal.setAttribute("id", "colorReducedPopup");
      modal.setAttribute(
        "style",
        `
      height:300px;
      border: none;
      top:150px;
      border-radius:20px;
      background-color:white;
      position: fixed; box-shadow: 0px 12px 48px rgba(29, 5, 64, 0.32);
      display: flex; 
      justify-content: center; 
      align-items: center; 
      flex-direction: column;
      z-index: 100;"
      `
      );
      modal.innerHTML = `<iframe id="popup-content"; style="height:100%"></iframe>
      <div id = "modalbox" style="position:absolute; top:0px; left:5px; height: 100%;">
      <button id="closebutton" type="button" class="btn-close" aria-label="Close" style="margin-top: 3%; margin-left: 2%;"></button>
      <div class='text-center mt-4 mb-4'>
      <h3 style = "color: rgb(83, 193, 83);font-weight: bold;">Greenie Web</h3>
      <p>Digital Decarbonisation</p>
      <h2>All Image Colours Reduced</h2>
      </div>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous"></script>
      </div>`;

      document.body.appendChild(modal);
      document.getElementById("closebutton").addEventListener("click", () => {
        document.getElementById("colorReducedPopup").remove();
        closed = "yes";
      });
    }
  } else if (request.method == "resetColor") {
    var imgs = document.querySelectorAll("img");
    for (const img of imgs) {
      img.style.filter = "none";
    }
  } else if (request.method == "reduceColorNew") {
    img_index = request.img_elem;
    var imgs = document.querySelectorAll("img");
    var img = imgs[img_index];
    img.style.filter =
      "contrast(80%) grayscale(80%) opacity(90%) saturate(18%)";

    // const modal = document.createElement("dialog");
    // modal.setAttribute("id", "colorReducedPopup");
    // modal.setAttribute(
    //   "style",
    //   `
    // height:300px;
    // border: none;
    // top:150px;
    // border-radius:20px;
    // background-color:white;
    // position: fixed; box-shadow: 0px 12px 48px rgba(29, 5, 64, 0.32);
    // display: flex;
    // justify-content: center;
    // align-items: center;
    // flex-direction: column;
    // z-index: 100;"
    // `
    // );
    // modal.innerHTML = `<iframe id="popup-content"; style="height:100%"></iframe>
    // <div id = "modalbox" style="position:absolute; top:0px; left:5px; width: 100%; height: 100%;">
    // <button id="closebutton" type="button" class="btn-close" aria-label="Close" style="margin-top: 3%; margin-left: 2%;"></button>
    // <div class='text-center mt-4 mb-4'>
    // <h3 style = "color: rgb(83, 193, 83);font-weight: bold;">Greenie Web</h3>
    // <p>Digital Decarbonisation</p>
    // <h2>Image colour reduced</h2>
    // </div>
    // <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous"></script>
    // </div>`;

    // document.body.appendChild(modal);

    wrapper_div_id = "wrapperdiv" + img_index;
    wrapper_div = document.getElementById(wrapper_div_id);
    image_number = parseInt(img_index) + 1;
    accept_btn_id = "accept" + img_index;
    reject_btn_id = "reject" + img_index;
    wrapper_div.innerHTML = `<p style="margin: 0">Image ${image_number}</p><button id="${accept_btn_id}" font-size: x-small; class=" btn-outline-primary" >Accept</button><button id="${reject_btn_id}" font-size: x-small; class=" btn-outline-primary" >Reject</button>`;
    document.getElementById(accept_btn_id).addEventListener("click", () => {
      img.scrollIntoView({ behaviour: "smooth", inline: "center" });

      // send message to content.js to display Revert ALL button
      if (document.getElementById("revertAll") == null) {
        chrome.runtime.sendMessage({ method: "displayRevert" });
      }
    });
    document.getElementById(reject_btn_id).addEventListener("click", () => {
      img.style.filter = "none";
      img.scrollIntoView({ behaviour: "smooth", inline: "center" });
    });

    // document.getElementById("closebutton").addEventListener("click", () => {
    //   document.getElementById("colorReducedPopup").remove();
    //   closed = "yes";

    // });
  }

  // ===========================================
  // ========== Start Ali-Akbar Code ===========
  // ----------- Elements Loader -----------
  // ===========================================
  else if (request.method == "loadElements") {
    // ------ Start The Logic to Load Elements --------
    let elements = document.querySelectorAll("img, source, a");
    function isGif(url) {
      return /\.(gif|webp)/.test(url);
    }
    for (let item of elements) {
      if (isGif(item.src) == true) {
        item.removeAttribute("srcset");
        item.setAttribute("originalSrc", item.src);
        item.src =
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/640px-A_black_image.jpg";
      }
    }
    // ------ End The Logic to Load Elements --------
    // ------ Start Displaying Popup Message --------
    if (request.type != "acceptAll") {
      const modal = document.createElement("dialog");
      modal.setAttribute("id", "animationStoppedPopup");
      modal.setAttribute(
        "style",
        `
      height:300px;
      border: none;
      top:150px;
      border-radius:20px;
      background-color:white;
      position: fixed; box-shadow: 0px 12px 48px rgba(29, 5, 64, 0.32);
      display: flex; 
      justify-content: center; 
      align-items: center; 
      flex-direction: column;
      z-index: 100;"
      `
      );
      modal.innerHTML = `<iframe id="popup-content"; style="height:100%"></iframe>
      <div id = "modalbox" style="position:absolute; top:0px; left:5px;">
      <button id="closebutton" type="button" class="btn-close" aria-label="Close" style="margin-top: 3%; margin-left: 2%;"></button>
      <div class='text-center mt-4 mb-4'>
      <h3 style = "color: rgb(83, 193, 83);font-weight: bold;">Greenie Web</h3>
      <p>Digital Decarbonisation</p>
      <h2>All Elements are Loaded</h2>
      </div>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous"></script>
      </div>`;

      document.body.appendChild(modal);
      document.getElementById("closebutton").addEventListener("click", () => {
        document.getElementById("animationStoppedPopup").remove();
        closed = "yes";
      });
    }
    // ------ End Displaying Popup Message --------
  }
  // =========================================
  // ========== End Ali-Akbar Code ===========
  // =========================================


  //added by Zico (animation stopper)
  else if (request.method == "stopAnimation") {
    let elements = document.querySelectorAll("img, source, a");

    function isGif(url) {
      return /\.(gif|webp)/.test(url);
    }

    for (let item of elements) {
      if (isGif(item.src) == true) {
        item.removeAttribute("srcset");
        item.setAttribute("originalSrc", item.src);
        item.src =
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/640px-A_black_image.jpg";
      }
    }

    if (request.type != "acceptAll") {
      const modal = document.createElement("dialog");
      modal.setAttribute("id", "animationStoppedPopup");
      modal.setAttribute(
        "style",
        `
      height:300px;
      border: none;
      top:150px;
      border-radius:20px;
      background-color:white;
      position: fixed; box-shadow: 0px 12px 48px rgba(29, 5, 64, 0.32);
      display: flex; 
      justify-content: center; 
      align-items: center; 
      flex-direction: column;
      z-index: 100;"
      `
      );
      modal.innerHTML = `<iframe id="popup-content"; style="height:100%"></iframe>
      <div id = "modalbox" style="position:absolute; top:0px; left:5px;">
      <button id="closebutton" type="button" class="btn-close" aria-label="Close" style="margin-top: 3%; margin-left: 2%;"></button>
      <div class='text-center mt-4 mb-4'>
      <h3 style = "color: rgb(83, 193, 83);font-weight: bold;">Greenie Web</h3>
      <p>Digital Decarbonisation</p>
      <h2>All animations stopped</h2>
      </div>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous"></script>
      </div>`;

      document.body.appendChild(modal);
      document.getElementById("closebutton").addEventListener("click", () => {
        document.getElementById("animationStoppedPopup").remove();
        closed = "yes";
      });
    }
  } else if (request.method == "resetAnimation") {
    let elements = document.querySelectorAll("img, source, a");

    for (let item of elements) {
      if (item.hasAttribute("originalsrc")) {
        item.src = item.getAttribute("originalsrc");
      }
    }
  } else if (request.method == "resetFont") {
    const select = document.getElementById("fontChange");
    select.selectedIndex = 0;

    elements = document.getElementsByTagName("*");
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.removeProperty("font-family");
    }
  }

  //added by Zico (edit text)
  else if (request.method == "editText") {
    if (document.getElementById("editorPopup")) {
      document.getElementById("editorPopup").remove();
    } else {
      var editorPopup = document.createElement("dialog");
      editorPopup.setAttribute("id", "editorPopup");
      editorPopup.setAttribute(
        "style",
        "display: block; margin: 0; margin-left: 10px; height: 400px; width: 350px; border: none; top: 90%; border-radius:20px; background-color:white; position: sticky; box-shadow: 0px 12px 48px rgba(29, 5, 64, 0.32);"
      );
      editorPopup.innerHTML = `
        <p style="margin-bottom: 3px; font-weight: bold;">CSS & Script Minification</p>
        `;

      // dummy code image (remove when actual implementation is done)
      let img = document.createElement("img");
      img.setAttribute("id", "dummyCode");
      img.setAttribute("style", "height: 93%; width: 100%;");
      img.src = chrome.runtime.getURL("../img/dummy-code.JPG");
      editorPopup.appendChild(img);

      document.getElementById("stats").appendChild(editorPopup);
    }
  }

  sendResponse({});
  return true;
});

// chrome.storage.sync.get(["disabled"], function (result) {
//   if (!result["disabled"]) {
//     chrome.runtime.onMessage.addListener(function (
//       request,
//       sender,
//       sendResponse
//     ) {
//       if (request.type == "changeColor") {
//         $(
//           "div, label, p, button, textarea, img, ul, li, ol, tr, th, td, thead, tbody, span, article, section, main, dl, datalist, output, legend"
//         ).each(function () {
//           $(this).css("color", request.color);
//         });
//       } else if (request.type == "changeFont") {
//         var font = new FontFace(request.family, `url(${request.fontURL})`);
//         document.fonts.add(font);
//         if (request.fontStyle === "standard") {
//           if (!$("body").css("font-family").includes(request.family)) {
//             if (!$("body").css("font-family").includes(request.last)) {
//               $("body").css(
//                 "font-family",
//                 request.family + "," + $("body").css("font-family")
//               );
//             } else {
//               $("body").css(
//                 "font-family",
//                 request.family +
//                   "," +
//                   $("body")
//                     .css("font-family")
//                     .replace(/^[^,]+, */, "")
//               );
//             }
//           }
//           $("body *").each(function () {
//             {
//               if (!$(this).css("font-family").includes(request.family)) {
//                 if (!$(this).css("font-family").includes(request.last)) {
//                   $(this).css(
//                     "font-family",
//                     request.family + "," + $(this).css("font-family")
//                   );
//                 } else {
//                   $(this).css(
//                     "font-family",
//                     request.family +
//                       "," +
//                       $(this)
//                         .css("font-family")
//                         .replace(/^[^,]+, */, "")
//                   );
//                 }
//               }
//             }
//           });
//         }
//       } else if (request.type == "removeFont") {
//         if (request.fontStyle === "standard") {
//           if ($("body").css("font-family").includes(request.last)) {
//             $("body").css(
//               "font-family",
//               $("body")
//                 .css("font-family")
//                 .replace(/^[^,]+, */, "")
//             );
//           }
//           $("body *").each(function () {
//             {
//               if ($(this).css("font-family").includes(request.last)) {
//                 $(this).css(
//                   "font-family",
//                   $(this)
//                     .css("font-family")
//                     .replace(/^[^,]+, */, "")
//                 );
//               }
//             }
//           });
//         }
//       }
//       //added by Zico
//       else if (request.type == "restoreImage") {
//         var images = document.querySelectorAll("img");
//         for (const image of images) {
//           image.src = image.getAttribute("someabstractname");
//         }
//         alert("All images are loaded");
//       }

//       //added by Sailesh
//       else if (request.type == "reduceColor") {
//         var imgs = document.querySelectorAll("img");
//         for (img of imgs) {
//           img.style.filter = img.style.filter =
//             "contrast(80%) grayscale(80%) opacity(90%) saturate(18%)";
//         }
//       }

//       //added by Zico (animation stopper)
//       else if (request.type == "stopAnimation") {
//         let elements = document.querySelectorAll("img, source, a");

//         function isGif(url) {
//           return /\.(gif|webp)/.test(url);
//         }

//         for (let item of elements) {
//           if (isGif(item.src) == true) {
//             item.removeAttribute("srcset");
//             item.src =
//               "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/640px-A_black_image.jpg";
//           }
//         }
//       }

//       //added by Zico (edit text)
//       else if (request.type == "editText") {
//         if (!document.pictureInPictureEnabled) {
//           alert({ title: "Edit Mode NOT supported" });
//         } else {
//           const html = document.documentElement;

//           if (html.hasAttribute("__editMode__")) {
//             alert("Text Editor turned off");
//             html.removeAttribute("__editMode__");
//             document.designMode = "off";
//             chrome.runtime.sendMessage({ message: "leave" });
//           } else {
//             alert("Text Editor turned on");
//             document.designMode = "on";
//             html.setAttribute("__editMode__", true);
//             chrome.runtime.sendMessage({ message: "enter" });
//           }
//         }
//       }

//       sendResponse({});
//     });
//   }
// });
