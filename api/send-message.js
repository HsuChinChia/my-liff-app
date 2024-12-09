const axios = require('axios');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).send({ message: 'Only POST requests allowed' });
    }

    const { userId, message } = req.body;

    if (!userId || !message) {
        return res.status(400).send({ message: 'Missing userId or message' });
    }

    const CHANNEL_ACCESS_TOKEN = process.env.CHANNEL_ACCESS_TOKEN;

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

    try {
        await axios.post('https://api.line.me/v2/bot/message/push', body, { headers });
        res.status(200).send({ message: '訊息已發送' });
    } catch (error) {
        console.error('發送訊息失敗', error.response ? error.response.data : error.message);
        res.status(500).send({ message: '發送訊息失敗' });
    }
};
