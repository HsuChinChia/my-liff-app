// app.js
const liffId = "YOUR_LIFF_ID_HERE";
const serverUrl = "https://your-server.com/send-message"; // 替換為您的伺服器 URL

window.onload = function() {
    initializeLiff(liffId);
};

function initializeLiff(liffId) {
    liff.init({ liffId })
        .then(() => {
            if (liff.isLoggedIn()) {
                displayUserInfo();
                showSendMessageButton();
            } else {
                liff.login();
            }
        })
        .catch(err => {
            console.error('LIFF 初始化失敗', err);
        });
}

function displayUserInfo() {
    liff.getProfile()
        .then(profile => {
            document.getElementById('user-id').textContent = profile.userId;
            document.getElementById('display-name').textContent = profile.displayName;
            document.getElementById('profile-picture').src = profile.pictureUrl;
            document.getElementById('user-info').style.display = 'block';
        })
        .catch(err => {
            console.error('獲取個人資料失敗', err);
        });
}

function showSendMessageButton() {
    const sendMessageBtn = document.getElementById('send-message-btn');
    sendMessageBtn.style.display = 'block';
    sendMessageBtn.addEventListener('click', () => {
        liff.getProfile()
            .then(profile => {
                const userId = profile.userId;
                const message = '您好，這是透過伺服器端發送的訊息！';
                sendMessageToServer(userId, message);
            })
            .catch(err => {
                console.error('獲取用戶 ID 失敗', err);
            });
    });
}

function sendMessageToServer(userId, message) {
    fetch(serverUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, message })
    })
    .then(response => response.text())
    .then(data => {
        alert('訊息已發送');
    })
    .catch(error => {
        console.error('發送訊息失敗', error);
        alert('發送訊息失敗');
    });
}
