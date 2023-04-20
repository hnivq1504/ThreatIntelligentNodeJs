class Bot {
    constructor(token, chat_id) {
        this.token = token;
        this.chat_id = chat_id;
    }

    async send_message(message) {
        const fetch = await import('node-fetch');
        const url = `https://api.telegram.org/bot${this.token}/sendMessage`;
        const payload = { chat_id: this.chat_id, text: message };
        const response = await fetch.default(url, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json' }
        });
        return response.json();
    }
}

module.exports = {
    Bot: Bot
};

