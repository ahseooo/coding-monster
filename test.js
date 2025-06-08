const express = require('express');
const path = require('path');
require('dotenv').config();
const app = express();
const PORT = 5500;

// public 폴더를 정적 파일로 제공
app.use(express.static(path.join(__dirname, 'qwer/CM_fixing')));

// 기본 경로에 특정 HTML 파일을 연결하고 싶다면:
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'qwer/CM_fixing', 'Play_off.html'));
});




// 네이버 로그아웃 start
app.use(express.json());

app.get('/naver/logout', async (req, res) => {
    const accessToken = req.query.access_token;
    
    if (!accessToken) {
        return res.status(400).json({ error: 'access_token is required' });
    }
    const url = `https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&access_token=${accessToken}`;
    try {
        const response = await fetch(url, { method: 'GET' });
        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error('Token deletion failed: ', err);
        res.status(500).json({ error: 'Token deletion failed' });
    }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`http://127.0.0.1:${PORT} 에서 서버 실행 중`);
});
// 192.168.219.154
// 네이버 로그아웃 end