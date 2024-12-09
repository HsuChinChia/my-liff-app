const express = require('express');
const axios = require('axios');
const cors = require('cors'); // 加入 CORS 支援
const app = express();

app.use(cors()); // 啟用 CORS
app.use(express.json());

const CHANNEL_ACCESS_TOKEN = process.env.CHANNEL_ACCESS_TOKEN;

app.post('/send-message', (req, res) => {
    const { userId, message } = req.body;

    if (!userId || !message) {
        return res.status(400).send('缺少 userId 或 message');
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CHANNEL_ACCESS_TOKEN}`
    };

    const body = {
        to: userId,
        messages: [
            {
                type: 'text',
                text: message
            }
        ]
    };

    axios.post('https://api.line.me/v2/bot/message/push', body, { headers })
        .then(response => {
            res.status(200).send('訊息已發送');
        })
        .catch(error => {
            console.error('發送訊息失敗', error.response ? error.response.data : error.message);
            res.status(500).send('發送訊息失敗');
        });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`伺服器正在執行於端口 ${PORT}`);
});
