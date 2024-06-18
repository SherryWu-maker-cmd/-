const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// 處理POST請求
app.post('/submit_complaint', (req, res) => {
    const { isXinYi, name, phone, email, complaint } = req.body;

    const db = new sqlite3.Database('complaints.db');
    db.run('CREATE TABLE IF NOT EXISTS complaints (isXinYi TEXT, name TEXT, phone TEXT, email TEXT, complaint TEXT)', (err) => {
        if (err) {
            return res.status(500).send('數據庫創建失敗');
        }

        db.run('INSERT INTO complaints (isXinYi, name, phone, email, complaint) VALUES (?, ?, ?, ?, ?)', [isXinYi, name, phone, email, complaint], (err) => {
            if (err) {
                return res.status(500).send('提交失敗');
            }
            res.status(200).send('提交成功');
        });
    });
    db.close();
});

// 處理根路徑
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 感謝頁面路由
app.get('/thankyou', (req, res) => {
    res.send('感謝您的回覆！');
});

app.listen(port, () => {
    console.log(`服務器運行在 http://localhost:${port}`);
});
