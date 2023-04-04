const butInstall = document.getElementById('buttonInstall');

let deferredPrompt;
// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
// this event runs when the browser is ready to prompt the user to install the PWA
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    butInstall.style.display = 'block';
});

// TODO: Implement a click event handler on the `butInstall` element
// when a user clicks on the install button, the prompt to install pops up
butInstall.addEventListener('click', async () => {
    if (deferredPrompt) {
        const choiceResult = await deferredPrompt.prompt();
        deferredPrompt = null;
        // this hides the button when the user clicks on it
        // we don't want the user to try installing this app after they've already installed it
        butInstall.style.display = 'none';
      }
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('App installed successfully');
});
