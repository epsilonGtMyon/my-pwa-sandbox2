(function () {
  const version = "2";

  const versionElem = document.querySelector("#version");

  versionElem.textContent = version;

  //--------------------------

  if ("serviceWorker" in navigator) {
    const isLocal = location.hostname === "localhost";
    if (isLocal) {
      navigator.serviceWorker.register("./sw.js");
    } else {
      navigator.serviceWorker.register("./sw.js", {
        scope: "/my-pwa-sandbox2/",
      });
    }
  }
})();
