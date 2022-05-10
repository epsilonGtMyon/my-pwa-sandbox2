(function () {
  const version = "2";

  const versionElem = document.querySelector("#version");
  const unregisterServiceWorkerElem = document.querySelector(
    "#unregisterServiceWorker"
  );

  versionElem.textContent = version;

  unregisterServiceWorkerElem.addEventListener("click", async () => {
    const registration = await navigator.serviceWorker.getRegistration()
    registration.unregister()
  });
})();
