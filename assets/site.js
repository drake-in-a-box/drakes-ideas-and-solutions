let deferredInstallPrompt = null;

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    });
  }
}

function setInstallCopy(message, tone = 'info') {
  document.querySelectorAll('[data-install-copy]').forEach((node) => {
    node.textContent = message;
    node.dataset.tone = tone;
  });
}

function handleInstallPrompt(button) {
  if (!button) return;

  button.addEventListener('click', async () => {
    if (deferredInstallPrompt) {
      deferredInstallPrompt.prompt();
      const choice = await deferredInstallPrompt.userChoice.catch(() => null);
      deferredInstallPrompt = null;
      button.classList.add('hidden');
      setInstallCopy(
        choice?.outcome === 'accepted'
          ? 'Installed. You can launch it from your phone like a normal app.'
          : 'Install prompt dismissed. You can still add it from your browser menu.',
        choice?.outcome === 'accepted' ? 'success' : 'info',
      );
      return;
    }

    setInstallCopy(
      'On iPhone: Share → Add to Home Screen. On Android: browser menu → Install app.',
      'info',
    );
  });
}

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  document.querySelectorAll('[data-install-button]').forEach((button) => {
    button.classList.remove('hidden');
  });
  setInstallCopy('Install this hub on your phone for one-tap access.', 'success');
});

window.addEventListener('appinstalled', () => {
  deferredInstallPrompt = null;
  document.querySelectorAll('[data-install-button]').forEach((button) => {
    button.classList.add('hidden');
  });
  setInstallCopy('Installed. Launch it from your phone like a normal app.', 'success');
});

registerServiceWorker();

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-install-button]').forEach(handleInstallPrompt);
  setInstallCopy('Want a phone icon? Use Install app or Add to Home Screen.', 'info');
});
