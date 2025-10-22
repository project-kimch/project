const express = require('express');

const http = require('http')
const path = require('path');
const axios = require('axios');
const cors = require('cors');

const { Server } = require('socket.io');
const { chmod } = require('fs');
const { Socket } = require('dgram');

const app = express();
const server = http.createServer(app)
const io = new Server(server, {
  cors: { origin: "*" },
  methods: ["GET", "POST"]
})
app.use(cors());

// 정적 파일 서빙 (public 같은 별도 폴더 없이, 현재 폴더 기준)
app.use(express.static(path.join(__dirname)));

// 나이스 급식 API 정보를 설정합니다.
// *** 아래 'YOUR_API_KEY_HERE' 부분을 발급받은
//  실제 API 키로 교체해주세요. ***
const serviceKey = '3c12807e4d8d42a0ad5b9f266bc209fa'; 
const baseUrl = 'https://open.neis.go.kr/hub/mealServiceDietInfo';
const atptOfcdcScCode = 'J10'; // 경기도교육청 코드
const sdSchulCode = '7531408'; // 평택마이스터고등학교 코드 (수정됨)

// 오늘 날짜를 YYYYMMDD 형식으로 가져오는 함수
const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
};

// index.html 라우트
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// gaeyo.html 라우트
app.get('/gaeyo', (req, res) => {
  res.sendFile(path.join(__dirname, 'gaeyo.html'));
});

// /time 경로 라우트
app.get("/time", (req, res) => {
  res.sendFile(path.join(__dirname, "time.html"));
});

// 각 학년 페이지
app.get('/time/1', (req, res) => {
    res.sendFile(path.join(__dirname, 'time', 'time1.html'));
});
app.get('/time/2', (req, res) => {
    res.sendFile(path.join(__dirname, 'time', 'time2.html'));
});
app.get('/time/3', (req, res) => {
    res.sendFile(path.join(__dirname, 'time', 'time3.html'));
});

app.get('/bob', (req, res) => {
  res.sendFile(path.join(__dirname,'bob', 'brother.html'));
});

app.get('/cm', (req, res) => {
  res.sendFile(path.join(__dirname,'cm.html'));
});

app.get('/brother', (req, res) => {
  res.sendFile(path.join(__dirname,'cm', 'brother.html'));
});

app.get('/machine', (req, res) => {
  res.sendFile(path.join(__dirname,'cm', 'machine.html'));
});

app.get('/auto', (req, res) => {
  res.sendFile(path.join(__dirname,'cm', 'auto.html'));
});

app.get('/elec', (req, res) => {
  res.sendFile(path.join(__dirname,'cm', 'elec.html'));
});

app.get("/cart", (req, res) => {
  res.sendFile(path.join(__dirname, "cart.html"));
});

// 급식 정보를 가져오는 API 엔드포인트
app.get('/api/lunch', async (req, res) => {
    const dateToFetch = req.query.date || getTodayDate();
    
    try {
        const url = `${baseUrl}?KEY=${serviceKey}&Type=json&ATPT_OFCDC_SC_CODE=${atptOfcdcScCode}&SD_SCHUL_CODE=${sdSchulCode}&MLSV_YMD=${dateToFetch}`;
        const response = await axios.get(url);
        const data = response.data;
        
        console.log("NICE API로부터 받은 원본 데이터:", data); // 디버깅을 위해 추가

        let lunchMenu = [];

        // API 응답에서 급식 정보가 있는지 안전하게 확인합니다.
        // `head` 속성으로 오류가 있는지 먼저 확인
        if (data && data.mealServiceDietInfo && data.mealServiceDietInfo.length > 1 && data.mealServiceDietInfo[1].row) {
            const menuData = data.mealServiceDietInfo[1].row[0].DDISH_NM;
            
            // 괄호와 숫자, 점(.)을 제거하고 메뉴를 배열로 정리합니다.
            lunchMenu = menuData.split('<br/>').map(item => {
                let cleanedItem = item.replace(/\([^)]*\)/g, '');
                cleanedItem = cleanedItem.replace(/([0-9\.])+/g, '').trim();
                return cleanedItem;
            }).filter(item => item !== '');
        } else if (data && data.RESULT && data.RESULT.CODE === 'INFO-200') {
            // "INFO-200"은 급식 정보가 없다는 의미입니다. 빈 배열을 반환합니다.
            lunchMenu = [];
        } else {
            // 그 외 알 수 없는 오류
            console.error("알 수 없는 API 응답 형식:", data);
            res.status(500).json({ error: '알 수 없는 API 응답 형식입니다.' });
            return;
        }

        res.json({ menu: lunchMenu });

    } catch (error) {
        console.error('API 호출 중 오류:', error.message);
        // 클라이언트로 더 구체적인 오류 메시지를 보냅니다.
        res.status(500).json({ error: `급식 정보를 가져오는 중 서버 오류가 발생했습니다. (오류: ${error.message})` });
    }
});

// render 연결하기
const EXPECTED_TOKEN = process.env.PI_AUTH_TOKEN || "changeme";

io.on("connection", (socket) => {
  const auth = socket.handshake.auth || {};
  const token = auth.token;
  const id = auth.id;

  if (token !== EXPECTED_TOKEN) {
    console.log("❌ Invalid token, disconnecting:", id);
    socket.disconnect(true);
    return;
  }
  console.log("Client connected : ", socket.id);
  

  console.log(`✅ Raspberry Pi connected: ${id}`);

  socket.on("telemetry", (data) => {
    console.log(`📡 Telemetry from ${id}:`, data);
  });
  Socket.on("send_command", (cmd) => {
        console.log('Command from web to ${socket.id} : ', cmd);
        io.emit("command", cmd)
  });

  socket.on("disconnect", () => {
    console.log(`🔌 ${id} disconnected`);
  });
});

const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});



