document.addEventListener("DOMContentLoaded", function () {
  const convertButton = document.getElementById("convertButton");
  const resetButton = document.getElementById("resetButton");
  const statusDiv = document.getElementById("status");

  function showStatus(message, isError = false) {
    statusDiv.textContent = message;
    statusDiv.style.display = "block";
    statusDiv.className = `status ${isError ? "error" : "success"}`;
    setTimeout(() => {
      statusDiv.style.display = "none";
    }, 3000);
  }

  async function executeScript(action) {
    try {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      if (!tab.url.includes("sigaa")) {
        showStatus("Esta extensão só funciona em páginas do SIGAA!", true);
        return;
      }

      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["converter.js"],
      });

      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: action,
      });

      showStatus(
        action === initializeConverter
          ? "Horários convertidos com sucesso!"
          : "Página resetada com sucesso!"
      );
    } catch (error) {
      showStatus("Erro ao executar a conversão: " + error.message, true);
    }
  }

  convertButton.addEventListener("click", () =>
    executeScript(initializeConverter)
  );
  resetButton.addEventListener("click", () => executeScript(resetPage));
});

// These functions will be injected into the page
function initializeConverter() {
  if (window.scheduleConverterInitialized) {
    return;
  }
  window.scheduleConverterInitialized = true;
  processSchedules();
  adjustPageLayout();
}

function resetPage() {
  window.scheduleConverterInitialized = false;
  location.reload();
}
