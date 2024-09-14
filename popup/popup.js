
async function copyGitCheckoutCommand(){
document.getElementById("clipboardBtn").addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });
    if (tab.url.includes("github.com") && tab.url.includes("/pull/")) {
        const prNumber = tab.url.match(/\/pull\/(\d+)/)[1];
        const command = `git fetch origin pull/${prNumber}/head\n git checkout pr/${prNumber}`;
        await navigator.clipboard.writeText(command);
        alert("Command copied to clipboard");
    } else {
        alert("Please navigate to a GitHub pull request");
        }
    });
};


document.getElementById("switchBtn").addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });
    if (tab.url.includes("github.com") || tab.url.includes("github.dev")) {
        const newUrl = tab.url.replace(
            tab.url.includes("github.com") ? "github.com" : "github.dev",
            tab.url.includes("github.com") ? "github.dev" : "github.com"
        );
        await chrome.tabs.update(tab.id, {
            url: newUrl
        });
    } else {
        alert("Current tab url is invalid");
    }
});


document.getElementById("mainBranchBtn").addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });
    if (tab.url.includes('github.com') && tab.url.includes('/blob/')) {
        const currentBranch = tab.url.split('/blob/')[1].split('/')[0];
        if (currentBranch !== 'main') {
            const newUrl = tab.url.replace(`/blob/${currentBranch}`, '/blob/main');
            await chrome.tabs.update(
                tab.id, {
                    url: newUrl
                });
        }
    } else {
        alert("Not on a GitHub file page");
    }
});

document.getElementById("masterBranchBtn").addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });
    if (tab.url.includes('github.com') && tab.url.includes('/blob/')) {
        const currentBranch = tab.url.split('/blob/')[1].split('/')[0];
        if (currentBranch !== 'main') {
            const newUrl = tab.url.replace(`/blob/${currentBranch}`, '/blob/master');
            await chrome.tabs.update(
                tab.id, {
                    url: newUrl
                });
        }
    } else {
        alert("Not on a GitHub file page");
    }
});
// todo, refactor this code