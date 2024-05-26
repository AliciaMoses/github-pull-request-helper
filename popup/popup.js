document.getElementById("clipboardBtn").addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab.url.includes("github.com") && tab.url.includes("pull")) {
        const url = new URL(tab.url);
        const prNumber = url.pathname.match(/\/pull\/(\d+)/)[1];
        await navigator.clipboard.writeText(`git fetch origin pull/${prNumber}/head\n git checkout pr/${prNumber}`);
        alert("Command copied to clipboard");
    } else {
        alert("Please navigate to a GitHub pull request");
    }
});
document.getElementById("switchBtn").addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab.url.includes("github.com") && tab.url.includes("/pull/")) {
        const url = new URL(tab.url);
        const prNumber = url.pathname.match(/\/pull\/(\d+)/)[1];
        const newUrl = tab.url.replace("github.com", "github.dev");
        chrome.tabs.update(tab.id, { url: newUrl });
    } else if (tab.url.includes("github.dev") && tab.url.includes("/pull/")) {
        const url = new URL(tab.url);
        const prNumber = url.pathname.match(/\/pull\/(\d+)/)[1];
        const newUrl = tab.url.replace("github.dev", "github.com");
        chrome.tabs.update(tab.id, { url: newUrl });
    } else {
        alert("Please navigate to a GitHub pull request");
    }
});
// TODO: update popup to include animation to replace alert
