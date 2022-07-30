// Get size of data transferred for visitted website
function getDataTransfer() {
  var count = 0;
  var p = performance.getEntries();
  for (var i = 0; i < p.length; i++) {
    if ("transferSize" in p[i]) {
      count = count + p[i].transferSize;
    }
  }

  // Convert octets to GB
  return count * 10**(-9);
}
