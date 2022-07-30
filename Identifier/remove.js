const image = document.getElementsByTagName("img");
function handleRemoveElement() {
  image.forEach((e) => {
    const srcs = e.document.getAttribute("src");
    if (srcs === "" || "") {
      srcs.remove();
    }
  });
}
handleRemoveElement();
