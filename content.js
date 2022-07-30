class webSite {
  constructor(first) {
    this.firstVisitDataTransferSize = first;
  }
}

var url = document.URL;

window.addEventListener("load", () => {
  chrome.storage.local.get([url], function (result) {
    //new webpage
    if (Object.keys(result).length == 0) {
      var website = new webSite();
      chrome.storage.local.set({ [url]: website }, function () {
        chrome.storage.local.get([url], (res) => helper(res));
      });
      //immediately reload without Cache
      chrome.runtime.sendMessage({ type: "reload" });
    } else {
      helper(result);
    }
  });
});

// Calculation Functions

function calculateEnergyPerVisit(newDataTransfer, returningDataTransfer) {
  value =
    newDataTransfer * 0.81 * 0.75 + returningDataTransfer * 0.81 * 0.25 * 0.02;
  return value.toPrecision(2);
}

function calculateEnergyPerMonth(newDataTransfer, returningDataTransfer) {
  monthly_vistors = getVisitors();
  value =
    (newDataTransfer * 0.81 * 0.75 +
      returningDataTransfer * 0.81 * 0.25 * 0.02) *
    monthly_vistors;
  return value.toPrecision(2);
}

function calculateEmissionPerVisit(newDataTransfer, returningDataTransfer) {
  const energy = calculateEnergyPerVisit(
    newDataTransfer,
    returningDataTransfer
  );
  value = energy * 442;
  return value.toPrecision(2);
}

function calculateEmissionPerMonth(newDataTransfer, returningDataTransfer) {
  const energy = calculateEnergyPerMonth(
    newDataTransfer,
    returningDataTransfer
  );
  value = (energy * 442) / 1000;
  return value.toPrecision(2);
}

function calculateAnnualEnergy(
  newDataTransfer,
  returningDataTransfer,
  monthlyVisitors
) {
  const energy = calculateEnergyPerVisit(
    newDataTransfer,
    returningDataTransfer
  );
  return (energy * monthlyVisitors * 12).toPrecision(2);
}

function calculateAnnualEmission(
  newDataTransfer,
  returningDataTransfer,
  monthlyVisitors
) {
  const emission = calculateEmissionPerVisit(
    newDataTransfer,
    returningDataTransfer
  );
  return ((emission * monthlyVisitors * 12) / 1000).toPrecision(2);
}

// Retrieval of monthly visitors
function getVisitors() {
  // uncomment when Semrush issue is fixed

  // url = window.location.href;
  // api =
  //   "https://api.semrush.com/analytics/ta/api/v3/summary?targets=" +
  //   String(url) +
  //   "&export_columns=target,visits,users&key=" +
  //   //String(apiKey);

  //   fetch(api).then(getVisitors: response);

  // hardcoded Project Flux visitors for now
  return "16671";
}

// Retrieval of first visit data transfer
function getFirstVisitDataTransfer() {
  return visitSizes[0];
}

// Retrieval of returning visit data transfer
function getReturningVisitDataTransfer() {
  return visitSizes[1];
}

// Retrieval of energy per Month
function getEnergyPerMonth() {
  return stats[0];
}

// Retrieval of emission per Month
function getEmissionPerMonth() {
  return stats[1];
}

// Retrieval of annual energy
function getAnnualEnergy() {
  return stats[2];
}

// Retrieval of annual emission
function getAnnualEmission() {
  return stats[3];
}

// Retrieval of data transfer values and Calculation of Statistics
function helper(result) {
  //Unwrap result
  const res = Object.values(result)[0];
  var newDataTransfer = 0;
  var returningDataTransfer = 0;

  if (typeof res.firstVisitDataTransferSize === "undefined") {
    setTimeout(function getFirstVisitDataTransfer() {
      console.log("isRefreshed is currently false");
      var count = 0;
      var p = performance.getEntries();
      for (var i = 0; i < p.length; i++) {
        if ("transferSize" in p[i]) {
          count = count + p[i].transferSize;
        }
      }
      var website = new webSite(count * 10 ** -9);

      chrome.storage.local.set({ [url]: website }, function () {
        chrome.storage.local.get([url], (url) => console.log(url));
      });
    }, 1000);
    window.setTimeout(function () {
      location.reload();
    }, 4000);
  } else {
    new Promise((resolve) => {
      setTimeout(function getReturningVisitDataTransfer() {
        console.log("Second Load");
        var count = 0;
        var p = performance.getEntries();
        for (var i = 0; i < p.length; i++) {
          if ("transferSize" in p[i]) {
            count = count + p[i].transferSize;
          }
        }

        // Converts octets to GB
        count = count * 10 ** -9;

        firstVisitSize = res.firstVisitDataTransferSize.toPrecision(2) + " GB";

        // Retrieve first visit data transfer
        setTimeout(function () {
          console.log(
            "Amount of Data Transferred During First Visit: " +
              res.firstVisitDataTransferSize +
              " GB"
          );
          newDataTransfer = res.firstVisitDataTransferSize;
        }, 1000);

        returnVisitSize = count.toPrecision(2) + " GB";
        visitSizes = [firstVisitSize, returnVisitSize];
        // Retrieve returning visit data transfer
        setTimeout(function () {
          console.log(
            "\nAmount of Data Transferred During Returning Visit: " +
              count +
              " GB"
          );
          returningDataTransfer = count;
        }, 1100);

        //store the values of first visit data transfer and returning visit data transfer into an array.

        // Generate Statistics
        stats = new Promise(function (resolve) {
          setTimeout(() => {
            const stats = [];
            const energyPerMonth = calculateEnergyPerMonth(
              newDataTransfer,
              returningDataTransfer
            );
            console.log("Energy per Month in kWh: " + energyPerMonth + " kWh");
            const emissionPerMonth = calculateEmissionPerMonth(
              newDataTransfer,
              returningDataTransfer
            );
            console.log(
              "Emission per Month in kg: " + emissionPerMonth + " kg"
            );
            const annualEnergy = calculateAnnualEnergy(
              newDataTransfer,
              returningDataTransfer,
              16671
            );
            console.log("Annual Energy in kWh: " + annualEnergy + " kWh");
            const annualEmission = calculateAnnualEmission(
              newDataTransfer,
              returningDataTransfer,
              16671
            );
            console.log("Annual Emission in kg: " + annualEmission + " kg");
            stats.push(
              energyPerMonth + " kWh",
              emissionPerMonth + " kg",
              annualEnergy + " kWh",
              annualEmission + " kg"
            );
            resolve(stats);
          }, 1200);
        }).then((result) => {
          return result;
        });

        resolve(stats);
      }, 2000);
    }).then((result) => {
      stats = result;
    });
  }
  return visitSizes, stats;
}

chrome.runtime.onMessage.addListener((request) => {
  // for CENTERED MODAL ~ 1st pop up
  if (request.type === "popup-modal") {
    if (
      document.getElementById("popup") == null &&
      document.getElementById("stats") == null
    ) {
      showModal();
    }
  }
});
const showModal = () => {
  const modal = document.createElement("dialog");
  modal.setAttribute("id", "popup");
  modal.setAttribute(
    "style",
    `
  height:300px;
  border: none;
  top: 150px;
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
  <div class='text-center mt-5 mb-5'>
  <h3 style = "color: rgb(83, 193, 83);font-weight: bold;">Greenie Web</h3>
  <h2>Digital Decarbonisation</h2>
  <button id="begin-loading" type="button" class="btn btn-success">Begin</button>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous"></script>
  </div>`;

  document.body.appendChild(modal);

  let closed = "no";
  document.getElementById("closebutton").addEventListener("click", () => {
    document.getElementById("popup").remove();
    closed = "yes";
  });

  if (closed == "no") {
    begin_btn = document.getElementById("begin-loading");
    new Promise((resolve) =>
      begin_btn.addEventListener("click", () => {
        modal.innerHTML = `
        <div id="loading" style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
          <p>Calculating and Inspecting the website</p>
          <div>
              <iframe style="padding-left: 5%; padding-top: 5%;" id="loading-image" src="https://giphy.com/embed/YnjULJKuulQUifQvsf"></iframe>
          </div>
        </div>`;
        resolve(true);
      })
    ).then((res) => {
      if (res == true) {
        setTimeout(closeModal, 5000);
      }
    });
  }
};

// displays tree gif for 5 seconds before showing overallstats
function closeModal() {
  document.getElementById("popup").remove();
  showStats();
}

function showStats() {
  const stats = document.createElement("dialog");

  stats.setAttribute("id", "stats");
  stats.setAttribute(
    "style",
    `position: fixed;
    display: flex;
    flex-direction: row;
    height: 500px;
    background: none;
    z-index: 100;
    top: 70px;
    margin: 0px;
    padding: 0px;
    border: none;
    overflow: scroll;`
  );

  stats.innerHTML = `
  <!-- Dark Mode Slider -->
  <div id ="wrapping" class="stats">
      <div id="innerStats" class= 'stats' style="
      ">

      <div style="display: flex; flex-direction: row; justify-content: space-between;">
        <div class='float-right' style="margin-left: 3%; margin-top: 3%;">
          <button id="modal_close" type="button" class="btn-close" aria-label="Close"></button>
        </div>
        <div style="margin-top: 3%; padding: 0;">
          <label class="switch" id="changeTheme">
            <input type="checkbox">
            <span class="slider round"></span>
          </label>
        </div>
      </div>

    <!-- Title & Greenie Logo -->
      <div style="padding: 0px 33px; margin: 0px 10px; margin-top: 5px;">
        <div style = "display: flex; justify-content: center;">
            <iframe src="https://giphy.com/embed/2L4jaSLVrOjAkpr3MT" width="150" height="150" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/transparent-2L4jaSLVrOjAkpr3MT"></a></p>
        </div>
        <h3 style = "font-weight: bold;text-align: center;">Greenie Web</h3>
        <p class='titletext' style = "text-align: center;">Digital Decarbonisation</p>
      </div>

    
      <!-- Retrieve Monthly Visitors -->
      <div style="padding: 10px 33px; margin-top: 0px;">
      <div class="container1" style="padding: 20px 10px; border: 1px solid white; border-radius: 8px; 
      box-shadow: 1px 1px 5px grey; 
      display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <h1
        style="
          font-weight: 600;
          font-size: 18px;
          color: black;
          display: inline-block;
          padding: 0px;
        ">
          <b>Monthly Visitors</b>
        </h1>
        <div style="margin: 0px;">
          <p style="font-size: medium; margin: 0px;" id="visitors"></p>
        </div>
      </div>
    </div>

      <!-- Retrieve First Vist Data Transfer -->
      <div style="padding: 10px 33px; margin-top: 0px;">
      <div class="container1" style="padding: 20px 10px; border: 1px solid white; border-radius: 8px; 
      box-shadow: 1px 1px 5px grey; 
      display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <h1
        style="
          font-weight: 600;
          font-size: 18px;
          color: black;
          display: inline-block;
          padding: 0px;
        ">
          <b>First Visit Data Transfer</b>
        </h1>
        <div style="margin: 0px;">
          <p style="font-size: medium; margin: 0px;" id="firstdatatransfer"></p>
        </div>
      </div>
    </div>
    

      <!-- Retrieve Returning Visit Data Transfer -->
      <div style="padding: 10px 33px; margin-top: 0px;">
        <div class="container1" style="padding: 20px 10px; border: 1px solid white; border-radius: 8px; 
        box-shadow: 1px 1px 5px grey; 
        display: flex; flex-direction: column; justify-content: center; align-items: center;">
          <h1
          style="
            font-weight: 600;
            font-size: 18px;
            color: black;
            display: inline-block;
            padding: 0px;
          ">
            <b>Returning Visit Data Transfer</b>
          </h1>
          <div style="margin: 0px;">
            <p style="font-size: medium; margin: 0px;" id="returningdatatransfer"></p>
          </div>
        </div>
      </div>

      <!-- Energy per Visit -->
      <div style="padding: 10px 33px; margin-top: 0px;">
        <div class="container1" style="padding: 20px 10px; border: 1px solid white; border-radius: 8px; 
        box-shadow: 1px 1px 5px grey; 
        display: flex; flex-direction: column; justify-content: center; align-items: center;">
          <h1
          style="
            font-weight: 600;
            font-size: 18px;
            color: black;
            display: inline-block;
            padding: 0px;
          ">
            <b>Energy Per Month</b>
          </h1>
          <div style="margin: 0px;">
            <p style="font-size: medium; margin: 0px;" id="energyPerMonth"></p>
          </div>
        </div>
      </div>

      <!-- Emission per Visit -->
      <div style="padding: 10px 33px; margin-top: 0px">
        <div class="container1" style="padding: 20px 10px; border: 1px solid white; border-radius: 8px; 
        box-shadow: 1px 1px 5px grey; 
        display: flex; flex-direction: column; justify-content: center; align-items: center;">
          <h1
          style="
            font-weight: 600;
            font-size: 18px;
            color: black;
            display: inline-block;
          ">
            <b>Emission Per Month</b>
          </h1>
          <div style="padding-top: 0px">
            <p style="font-size: medium; margin: 0px;" id="emissionPerMonth"></p>
          </div>
        </div>
      </div>

      <!-- Annual Energy -->
      <div style="padding: 10px 33px; margin-top: 0px">
        <div class="container1" style="padding: 20px 10px; border: 1px solid white; border-radius: 8px; 
        box-shadow: 1px 1px 5px grey; 
        display: flex; flex-direction: column; justify-content: center; align-items: center;">
          <h1
          style="
            font-weight: 600;
            font-size: 18px;
            color: black;
            display: inline-block;
          ">
            <b>Annual Energy</b>
          </h1>
          <div style="padding-top: 0px">
            <p style="font-size: medium; margin: 0px;" id="annualEnergy"></p>
          </div>
        </div>
      </div>

      <!-- Annual Emission -->
      <div style="padding: 10px 33px; margin-top: 0px">
        <div class="container1" style="padding: 20px 10px; border: 1px solid white; border-radius: 8px; 
        box-shadow: 1px 1px 5px grey; 
        display: flex; flex-direction: column; justify-content: center; align-items: center;">
          <h1
          style="
            font-weight: 600;
            font-size: 18px;
            color: black;
            display: inline-block;
          "
        >
          <b>Annual Emission</b>
          </h1>
          <div style="padding-top: 0px">
            <p style="font-size: medium; margin: 0px;" id="annualEmission"></p>
          </div>

        </div>
        <div style="padding: 27px 33px; padding-top: 10px ;margin-top:24px" class="mx-auto">
          <button id="backbutton" type="button" class="btn btn-primary" style="white-space: nowrap;">Welcome to Home Page</button>
        </div>
      </div>

      <div style="display:flex; margin-top:24px; padding: 0px 33px;">
              <div style="flex:1;">
                  <p style="font-size: 20px; margin-bottom:0px; margin-top:0px;">
                      Frontend 
                  </p>
                  <hr>
              </div>
              <div >
                  <i class="fa-solid fa-angle-down icon-large" data-bs-toggle="collapse" data-bs-target="#btn_front" style="cursor:pointer;"></i>
              </div>
      </div>
        <div class="collapse" id="btn_front" style="width: 90%; margin-top:-10px; margin: auto;">
          <div class="card card-body" style="background: transparent; border: none; padding-top: 0"   >
            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist" 
            style="
                margin: auto;
                justify-content: center;
                row-gap: 1rem;
              ">
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Image</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link  active" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Animation</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Font</button>
              </li>

              <!-- ========================================== -->
              <!-- ===== Start Code Added by Ali-Akbar ====== -->
              <!-- ========================================== -->
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="pills-load-tab" data-bs-toggle="pill" data-bs-target="#pills-load" type="button" role="tab" aria-controls="pills-load" aria-selected="false">Load</button>
              </li>
              <!-- ======================================== -->
              <!-- ===== End Code Added by Ali-Akbar ====== -->
              <!-- ======================================== -->            
            </ul>
            <div class="tab-content" id="pills-tabContent" style="padding: 30px 0;">
              <div class="tab-pane fade" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0" style="text-align: center;">
                <div  class="isi">
                  
                  <!-- Color Variation Reducer -->
                  <div style="padding: 0px 33px; margin-top: 10px">
                    <h1
                      style="
                        font-weight: 600;
                        font-size: 18px;
                        color: black;
                        display: inline-block;
                      "
                    >
                      <b>Color Variation</b>
                    </h1>
                  </div>
              
                  <form style="padding: 10px 15px; padding-top: 10px; display: flex; flex-direction: column; gap: 10px;">
                    <div id='insertImages2'></div>
                    <button id="reduceColor" type="button" class="btn btn-primary" style="white-space: nowrap;">Reduce All Image Colors</button>
                  </form>         
                    
                </div>
              </div>
              <div class="tab-pane fade  show active" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabindex="0" style="text-align: center;">
                <div  class="isi">
                  <!-- Animation Stopper -->
                  <div style="padding: 0px 33px; margin-top: 0px">
                    <h1
                      style="
                        font-weight: 600;
                        font-size: 18px;
                        color: black;
                        display: inline-block;
                      "
                    >
                      <b>Animation</b>
                    </h1>
                  </div>
              
                  <form style="padding: 27px 33px; padding-top: 10px">
                    <button id="stop" type="button" class="btn btn-primary">Stop Animation</button>
                  </form>
                        
                </div>
              </div>
              <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab" tabindex="0" style="text-align: center;">
                <div id="fontChangeDiv" data-changes="0" class="isi" style="display: flex; flex-direction: column; justify-content: center;">
                  <!-- Font Changer -->
                  <div style="display: flex; flex-direction: row; justify-content: space-between; align-items: center">
                    <h1 style="font-weight: bold;font-size: 18px;color: black;display: inline-block;">
                      <b>Font Change</b>
                    </h1>
                    <div>
                      <h1
                        class="family-reset"
                        style="
                          float: right;
                          cursor: pointer;
                          color: #db5868;
                          font-size: 14px;
                          font-weight: bold;
                          float: right;
                          size: small
                        "
                      >
                      <button id="reset" type="button" class="btn btn-danger btn-sm">Reset</button>
                      </h1>
                    </div>
                  </div>
                  
                
                  <form id="fontForm" style="padding-top: 10px">
                    <select
                      id = "fontChange"
                      style="padding: 3px 7px; background-color: white; border: white; border-radius: 5px; height: 40px; width: 100%;
                      color: black;"
                    >
                      <option value="default" selected>Default</option>
                      <option value="arial">Arial</option>
                      <option value="verdana">Verdana</option>
                      <option value="helvetica">Helvetica</option>
                      <option value="times">Times New Roman</option>
                      <option value="courier">Courier New</option>
                      <option value="georgia">Georgia</option>
                      <option value="trebuchet">Trebuchet MS</option>
                      <option value="tahoma">Tahoma</option>
                    </select>
                  </form>
                    
                </div>
              </div>
              <!-- ========================================== -->
              <!-- ===== Start Code Added by Ali-Akbar ====== -->
              <!-- ========================================== -->
              <div class="tab-pane fade" id="pills-load" role="tabpanel" aria-labelledby="pills-load" tabindex="0" style="text-align: center;">
                <div class="isi">
                  <!-- Element Loader -->
                  <div style="padding: 0px 33px; margin-top: 0px">
                    <h1
                      style="
                        font-weight: 600;
                        font-size: 18px;
                        color: black;
                        display: inline-block;
                      "
                    >
                      <b>Load Elements</b>
                    </h1>
                  </div>
                  <form style="padding: 27px 33px; padding-top: 10px">
                    <button id="btnLoader" type="button" class="btn btn-primary load2">Load Elements</button>

                  </form>
                </div>
              </div>
              <!-- ======================================== -->
              <!-- ===== End Code Added by Ali-Akbar ====== -->
              <!-- ======================================== -->
            </div>
          </div>
        </div>

      <div style="display:flex; padding: 0px 33px;">
          <div style="flex:1;">
              <p style="font-size: 20px; margin-bottom:0px; margin-top:0px;">
                  Backend 
              </p>
              <hr>
          </div>
          <div >
              <i class="fa-solid fa-angle-right icon-large collapsed" id="btn_back" style="cursor:pointer;" aria-expanded="false"></i>
          </div>
      </div>

      <div id="bottomBtns" style="width:100%; margin-top:20px; padding-bottom: 5%; text-align:center; display: inline-block;">
        <button type="button" id="acceptAll" value="off" class="btn btn-success">
            Accept All
        </button>
        <button type="button" id="rejectAll" class="btn btn-danger">
            Reject All
        </button>
      </div>
      </div>
      </div>
    </div>
    `;

  document.body.appendChild(stats);

  // display each image with a reduce color btn
  const parent_div2 = document.getElementById("insertImages2");
  parent_div2.setAttribute("style", "overflow: scroll; max-height: 200px;");
  all_images = document.querySelectorAll("img");
  img_count = 1;
  index_count = 0;

  function reduceColor(img_index) {
    // document.getElementById("stats").remove();
    chrome.runtime.sendMessage({
      method: "reduceColorNew",
      img_elem: img_index,
    });
  }

  function greyOnceMouseEnter(img_index) {
    chrome.runtime.sendMessage({
      method: "greyOnceMouseEnter",
      img_elem: img_index,
    });
  }

  function greyOnceMouseLeave(img_index) {
    chrome.runtime.sendMessage({
      method: "greyOnceMouseLeave",
      img_elem: img_index,
    });
  }

  for (img of all_images) {
    img_id = "img" + index_count;
    img.setAttribute("id", img_id);
    // wrapper_anchortag = document.createElement('a')
    // wrapper_anchortag.setAttribute('href',img_id)
    parent_of_img = img.parentNode;
    // parent_of_img.prepend(wrapper_anchortag)
    wrapper_div2 = document.createElement("div");
    wrapper_div2_id = "wrapperdiv" + index_count;
    wrapper_div2.setAttribute("id", wrapper_div2_id);
    wrapper_div2.setAttribute(
      "style",
      "padding-bottom: 3px; display:flex; flex-direction: row; justify-content: space-between; align-items: center;"
    );
    // href_val = "#" + img_id
    // wrapper_div.innerHTML= `<p style='vertical-align:middle'>Image ${img_count}</p><a href="${href_val}"><button id="${index_count}" class="reduceColorNew btn-primary" >Reduce Color</button></a></br>`
    wrapper_div2.innerHTML = `<p style="margin: 0; cursor: alias;" id="para${index_count}" class="ImageWordPara">Image ${img_count}</p><button id="${index_count}" font-size: x-small; class="reduceColorNew btn-outline-primary">Apply Changes</button>`;
    parent_div2.appendChild(wrapper_div2);
    img_count += 1;
    index_count += 1;
  }

  all_reduce_btns = document.getElementsByClassName("reduceColorNew");
  btn_index = 0;
  for (btn of all_reduce_btns) {
    btn.addEventListener("click", function () {
      reduceColor(event.target.id);
    });
    btn_index += 1;
  }

  // added by Shwetha: event listener for hovering over the image word div (qn: do we need button index)
  // but its an onclick not mouse over!!
  all_image_word_paras = document.getElementsByClassName("ImageWordPara");
  for (image_para of all_image_word_paras) {
    image_para.addEventListener("mouseenter", function () {
      console.log(event.target.id.slice(4));
      greyOnceMouseEnter(event.target.id.slice(4));
    });

    image_para.addEventListener("mouseleave", function () {
      console.log(event.target.id.slice(4));
      greyOnceMouseLeave(event.target.id.slice(4));
    });
  }

  //close modal with close button
  document.getElementById("modal_close").addEventListener("click", () => {
    document.getElementById("stats").remove();
  });

  //close modal when href link changes
  window.addEventListener("hashchange", () => {
    document.getElementById("stats").remove();
  });

  // dark mode
  document.getElementById("changeTheme").addEventListener("change", () => {
    document.body.classList.toggle("dark");
  });

  // creating style element to add the internal css from popup4
  style_tag = document.createElement("style");
  style_tag.innerHTML = `
      

    /*slider css */
    .switch {
        position: relative;
        width: 55px;
        height: 26px;
        margin-top: 5%;
        margin-left: -70px;
    }

    .switch input { 
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 18px;
        width: 18px;
        left: 8px;
        bottom: 2px;
        background-color: aqua;
        -webkit-transition: .4s;
        transition: .4s;
    }

    input:checked + .slider {
        background-color: black;
    }

    input:focus + .slider {
        box-shadow: 0 0 1px #2196F3;
    }

    input:checked + .slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
    }

    /* Rounded sliders */
    .slider.round {
        border-radius: 34px;
        border:  2px solid aqua;
    }

    .slider.round:before {
        border-radius: 50%;
    }


    .container1{
      background:white;
    }
    
    .stats{
      background: linear-gradient(90deg, rgba(103,214,202,255) 20%, rgba(255,255,255,0.9) 50%);
    }

    /*Dark Mode*/

    .dark .stats{
      background: linear-gradient(90deg, rgba(11,219,237,0.1) 0%, rgba(0,212,255,1) 0%, rgba(0,0,0,0.7) 46%);
    }
  
    .dark .container1{
      color: #ececec;
      background:#292C35;
    }
    .dark .stats p, 
    .dark .stats .titletext,
    .dark .stats span,
    .dark .stats b,
    .dark .stats .font-preview-standard,
    .dark .stats option, 
    .dark .stats h2,
    .dark .stats h3,
    .dark .stats h1,
    .dark .stats div,
    .dark .stats .nav-pills .nav-link,
    .dark .stats .nav-pills .nav-link.active,
    .dark .stats .inline{
        color: #ececec;
        opacity:1;
    }

    .dark .line{
        background-color: #ececec;
    }

      
  
  `;
  document.head.appendChild(style_tag);

  // Display monthly visitors on click
  document.getElementById("visitors").innerHTML = getVisitors();

  // Display first visit data transfer on click
  document.getElementById("firstdatatransfer").innerHTML =
    getFirstVisitDataTransfer();

  // Display returning visit data transfer on click
  document.getElementById("returningdatatransfer").innerHTML =
    getReturningVisitDataTransfer();

  // Display energy per month
  document.getElementById("energyPerMonth").innerHTML = getEnergyPerMonth();

  // Display emission per month
  document.getElementById("emissionPerMonth").innerHTML = getEmissionPerMonth();

  // Display annual energy
  document.getElementById("annualEnergy").innerHTML = getAnnualEnergy();

  // Display annual emission
  document.getElementById("annualEmission").innerHTML = getAnnualEmission();

  // Send message to reduce color of images
  document.getElementById("reduceColor").addEventListener("click", () => {
    chrome.runtime.sendMessage({ method: "reduceColor" });
    if (document.getElementById("revertAll") == null) {
      displayRevert(2);
    }
  });

  // Send message to stop animations
  document.getElementById("stop").addEventListener("click", () => {
    chrome.runtime.sendMessage({ method: "stopAnimation" });
    if (document.getElementById("revertAll") == null) {
      displayRevert(2);
    }
  });

  // ===========================================
  // ========== Start Ali-Akbar Code ===========
  // ===========================================
  // ----- Send a Message to Load Elements -----
  document.querySelector("#btnLoader").addEventListener("click", () => {
    chrome.runtime.sendMessage({ method: "loadElements" });
    if (document.getElementById("revertAll") == null) {
      displayRevert(2);
    }
  });
  // =========================================
  // ========== End Ali-Akbar Code ===========
  // =========================================
  // Send message to edit text
  document.getElementById("btn_back").addEventListener("click", () => {
    chrome.runtime.sendMessage({ method: "editText" });
  });

  // Replace Accept All and Reject All buttons with Revert All
  const displayRevert = (option) => {
    if (option == 1) {
      document.getElementById("rejectAll").remove();
    }
    if (option == 2 && document.getElementById("rejectAll")) {
      document.getElementById("rejectAll").remove();
    }
    if (option == 3) {
      document.getElementById("revertAll").remove();
    }
    if (document.getElementById("revertAll")) {
      return;
    }
    if (document.getElementById("revertAll") == null) {
      document
        .getElementById("bottomBtns")
        .insertAdjacentHTML(
          "beforeend",
          `<button type="button" id="revertAll" value="on" class="btn btn-warning" style="color: white;">Revert All</button>`
        );
    }
    revertAll(option);
  };

  document.body.addEventListener("click", (element) => {
    // Accept all modifications (load images, reduce color, stop animations)
    if (element.target.id == "acceptAll") {
      chrome.runtime.sendMessage({ method: "acceptAll" });
      document.getElementById("acceptAll").remove();
      if (document.getElementById("confirmationBtns")) {
        document.getElementById("confirmationBtns").remove();
      }
      if (document.getElementById("revertAll") == null) {
        displayRevert(1);
      } else {
        displayRevert(3);
      }
    }

    // Reject all (close popup)
    if (element.target.id == "rejectAll") {
      document.getElementById("stats").remove();
    }

    // Display Revert All on font change
    let targetNode = element.target.closest("#fontChangeDiv");
    if (targetNode) {
      const config = { attributes: true, attributeFilter: ["data-changes"] };
      const onMutation = () => {
        if (parseInt(targetNode.getAttribute("data-changes")) > 0) {
          displayRevert(2);
        }
      };
      const observer = new MutationObserver(onMutation);
      observer.observe(targetNode, config);
    }
  });

  // Display Revert All button when image accept button is clicked
  chrome.runtime.onMessage.addListener((request) => {
    if (request.method == "displayRevert") {
      displayRevert(2);
    }
  });

  // Revert all modifications (load images, reduce color, stop animations)
  const revertAll = (option) => {
    document.getElementById("revertAll").addEventListener("click", () => {
      chrome.runtime.sendMessage({ method: "revertAll" });
      document.getElementById("revertAll").remove();
      if (document.getElementById("confirmationBtns")) {
        document.getElementById("confirmationBtns").remove();
      }
      if (document.getElementById("acceptAll") == null) {
        document.getElementById("bottomBtns").insertAdjacentHTML(
          "afterbegin",
          `<button type="button" id="acceptAll" value="off" class="btn btn-success">
            Accept All
          </button>
          <button type="button" id="rejectAll" class="btn btn-danger">
              Reject All
          </button>`
        );
      }
      if (option == 2) {
        document.getElementById("bottomBtns").insertAdjacentHTML(
          "beforeend",
          `<button type="button" id="rejectAll" class="btn btn-danger">
                Reject All
            </button>`
        );
      }
    });
  };

  const script2 = document.createElement("script");
  script2.src = chrome.runtime.getURL("Identifier/lib/jquery/jquery-3.4.1.js");
  script2.type = "text/javascript";
  script2.defer = true;
  document.getElementById("stats").appendChild(script2);

  const script3 = document.createElement("script");
  script3.src = chrome.runtime.getURL("background.js");
  script3.type = "text/javascript";
  script3.defer = true;
  document.getElementById("stats").appendChild(script3);

  const script4 = document.createElement("script");
  script4.src = chrome.runtime.getURL("Identifier/font.logic.js");
  script4.setAttribute("defer", "defer");
  document.getElementById("stats").appendChild(script4);

  const script5 = document.createElement("script");
  script5.src = chrome.runtime.getURL("Identifier/inject.js");
  script5.setAttribute("defer", "defer");
  document.getElementById("stats").appendChild(script5);

  const script6 = document.createElement("script");
  script6.src = chrome.runtime.getURL("Identifier/lazify.js");
  script6.setAttribute("defer", "defer");
  document.getElementById("stats").appendChild(script6);

  const script7 = document.createElement("script");
  script7.src = chrome.runtime.getURL("Identifier/remove.js");
  script7.setAttribute("defer", "defer");
  document.getElementById("stats").appendChild(script7);

  const script8 = document.createElement("script");
  script8.src = chrome.runtime.getURL("calculator/statistics.js");
  script8.setAttribute("defer", "defer");
  document.getElementById("stats").appendChild(script8);

  const script9 = document.createElement("script");
  script9.src = chrome.runtime.getURL("DataTransfer/dataTransfer.js");
  script9.setAttribute("defer", "defer");
  document.getElementById("stats").appendChild(script9);

  const script10 = document.createElement("script");
  script10.src =
    "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js";
  script10.integrity =
    "sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM";
  script10.crossOrigin = "anonymous";
  document.getElementById("stats").appendChild(script10);

  const bootstrap_link = document.createElement("link");
  bootstrap_link.href =
    "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css";
  bootstrap_link.ref = "stylesheet";
  bootstrap_link.integrity =
    "sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC";
  bootstrap_link.crossOrigin = "anonymous";
  document.getElementById("stats").appendChild(bootstrap_link);

  const ui_link = document.createElement("link");
  ui_link.href =
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css";
  ui_link.rel = "stylesheet";
  document.getElementById("stats").appendChild(ui_link);
}
