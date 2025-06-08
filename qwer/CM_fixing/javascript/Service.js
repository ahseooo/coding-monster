const inquiryList = []; // 문의 저장 배열

function addInquiry(title, content) {
    inquiries.push({
      title: title,
      content: content,
      date: new Date().toISOString().split('T')[0],
      status: '접수 완료',   // 처음엔 무조건 "접수 완료"
      answer: null          // 답변은 아직 없음
    });
  }

  function answerInquiry(index, answerContent) {
    if (inquiries[index]) {
      inquiries[index].answer = answerContent;
      inquiries[index].status = '답변 완료'; // 답변 완료로 상태 변경
      renderInquiryList(); // 화면 다시 그리기
    }
  }

  function renderInquiryList() {
    const tableBody = document.getElementById('inquiryTableBody');
    tableBody.innerHTML = ''; // 초기화
  
    inquiries.forEach((inq, idx) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${inq.title}</td>
        <td>${inq.date}</td>
        <td>${inq.status}</td>
      `;
      tableBody.appendChild(row);
    });
  }

function openInquiryForm() {
  document.getElementById('inquiryArea').style.display = 'none';
  document.getElementById('inquiryForm').style.display = 'flex';
}

function submitInquiry() {
  const title = document.getElementById('inquiryTitle').value.trim();
  const content = document.getElementById('inquiryContent').value.trim();

  if (!title || !content) {
    alert('문의 제목과 내용을 모두 입력해주세요.');
    return;
  }

  const now = new Date();
  const date = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;

  inquiryList.push({
    title,
    content,
    date,
    status: '접수 완료'
  });

  alert('문의가 정상적으로 제출되었습니다.');
  document.getElementById('inquiryTitle').value = '';
  document.getElementById('inquiryContent').value = '';
  document.getElementById('inquiryForm').style.display = 'none';
  document.getElementById('inquiryArea').style.display = 'flex';
}

function cancelInquiry() {
  if (confirm('작성을 취소하시겠습니까?')) {
    document.getElementById('inquiryTitle').value = '';
    document.getElementById('inquiryContent').value = '';
    document.getElementById('inquiryForm').style.display = 'none';
    document.getElementById('inquiryArea').style.display = 'flex';
  }
}

function toggleAnswer(answerId) {
  const answer = document.getElementById(answerId);
  answer.style.display = (answer.style.display === 'none' || answer.style.display === '') ? 'block' : 'none';
}

let isChatInitialized = false; // 초기화 여부 기억하는 변수

function goChat() {
  document.getElementById('mainContent').style.display = 'none';
  document.getElementById('chatArea').style.display = 'flex';

  const input = document.getElementById('chatInput');
  input.removeEventListener('keydown', handleChatKeyDown);
  input.addEventListener('keydown', handleChatKeyDown);

  const chatBox = document.getElementById('chatBox');

  if (!isChatInitialized) {
    // 처음 온라인 채팅 시작할 때만 초기화
    chatBox.innerHTML = '';

    const connectMessage = document.createElement('p');
    connectMessage.style.color = '#ccc';
    connectMessage.style.textAlign = 'center';
    connectMessage.textContent = '상담원과 연결됩니다.';
    chatBox.appendChild(connectMessage);

    chatBox.scrollTop = chatBox.scrollHeight;

    setTimeout(() => {
      const greeting = document.createElement('p');
      greeting.className = 'chat-message';
      greeting.style.color = '#00ffff';
      greeting.style.textAlign = 'left';
      greeting.innerHTML = `[상담원] 감사합니다. 코딩 몬스터입니다. 무엇을 도와드릴까요? <time>${new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</time>`;
      chatBox.appendChild(greeting);

      chatBox.scrollTop = chatBox.scrollHeight;
    }, 3000);

    isChatInitialized = true; // 한 번 초기화했으니 true로 바꿔줌
  }
}

function handleChatKeyDown(event) {
  if (event.key === 'Enter') {
    if (event.shiftKey) return; 
    event.preventDefault();
    sendMessage();
  }
}

function sendMessage() {
  const input = document.getElementById('chatInput');
  const message = input.value.trim();
  if (!message) return;

  const chatBox = document.getElementById('chatBox');
  const newMessage = document.createElement('p');
  newMessage.className = 'chat-message';
  newMessage.style.color = 'white';
  newMessage.style.margin = '5px 0';

  const now = new Date();
  const time = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');

  newMessage.innerHTML = `[나] ${message} <time style="font-size: 12px; color: #aaa;">${time}</time>`;
  chatBox.appendChild(newMessage);

  input.value = '';

  chatBox.scrollTop = chatBox.scrollHeight;

  // 먼저 4초 대기 후 "답변 준비 중" 표시
  setTimeout(() => {
    const loadingMessage = document.createElement('p');
    loadingMessage.className = 'chat-message';
    loadingMessage.style.color = '#00ffff';
    loadingMessage.style.textAlign = 'left';
    loadingMessage.innerHTML = `[상담원] 입력 중`;
    chatBox.appendChild(loadingMessage);

    chatBox.scrollTop = chatBox.scrollHeight;

    // 점(.) 깜빡임 효과
    let dotCount = 1;
    const loadingInterval = setInterval(() => {
      let dots = '·'.repeat(dotCount);
      loadingMessage.innerHTML = `[상담원] 입력 중${dots}`;
      dotCount = (dotCount % 3) + 1; // 1, 2, 3 반복
    }, 500); // 0.5초마다 점(.) 변화

    // 4초 후 실제 답변으로 교체
    setTimeout(() => {
      clearInterval(loadingInterval); // 점 깜빡임 멈추기

      const randomReplies = [
        '문의해주셔서 감사합니다! 바로 답변드리겠습니다.',
        '확인 중입니다. 잠시만 기다려주세요.',
        '최대한 빠르게 답변드리겠습니다.',
        '문의하신 내용을 확인하고 있습니다. 잠시만 기다려주세요.',
      ];

      const randomIndex = Math.floor(Math.random() * randomReplies.length);
      const randomReply = randomReplies[randomIndex];

      loadingMessage.innerHTML = `[상담원] ${randomReply} <time style="font-size: 12px; color: #aaa;">${new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</time>`;

      chatBox.scrollTop = chatBox.scrollHeight;
    }, 5000); // 답변 준비 중 5초 후 랜덤 답변 전환
  }, 4000); // 고객 메시지 후 4초 대기
}


function exitChat() {
  document.getElementById('chatArea').style.display = 'none';
  document.getElementById('mainContent').style.display = 'flex';
}

function endChat() {
    if (confirm('정말 상담을 종료하시겠습니까?')) {
      const chatBox = document.getElementById('chatBox');
      chatBox.innerHTML = ''; // 상담 종료할 때 대화 완전 초기화
      isChatInitialized = false; // 다음에 새로 들어올 때 다시 초기화하도록 리셋
      exitChat();
    }
  }
  

function goInquiryHistory() {
  document.getElementById('mainContent').style.display = 'none';
  document.getElementById('chatArea').style.display = 'none';
  document.getElementById('inquiryHistoryPage').style.display = 'flex';
  document.getElementById('inquiryDetailPage').style.display = 'none';

  loadInquiryHistory();
}

function backToMain() {
  document.getElementById('inquiryHistoryPage').style.display = 'none';
  document.getElementById('inquiryDetailPage').style.display = 'none';
  document.getElementById('mainContent').style.display = 'flex';
}

function backToInquiryHistory() {
  document.getElementById('inquiryDetailPage').style.display = 'none';
  document.getElementById('inquiryHistoryPage').style.display = 'flex';
}

// 문의내역 테이블 업데이트
function loadInquiryHistory() {
  const list = document.getElementById('inquiryHistoryList');
  list.innerHTML = '';

  inquiryList.forEach((item, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td style="padding: 10px; border-bottom: 1px solid white; cursor: pointer;">${item.title}</td>
      <td style="padding: 10px; border-bottom: 1px solid white;">${item.date}</td>
      <td style="padding: 10px; border-bottom: 1px solid white;">${item.status}</td>
    `;
    row.onclick = function() {
      openInquiryDetail(index);
    };
    list.appendChild(row);
  });
}

// 문의 상세보기
function openInquiryDetail(index) {
  const inquiry = inquiryList[index];

  document.getElementById('inquiryHistoryPage').style.display = 'none';
  document.getElementById('inquiryDetailPage').style.display = 'flex';

  document.getElementById('detailTitle').innerText = inquiry.title;
  document.getElementById('detailDate').innerText = inquiry.date;
  document.getElementById('detailContent').innerText = inquiry.content;
}

function closeCustomerCenter() {
    const customerCenter = document.querySelector('.settings-modal');
    customerCenter.style.display = 'none';
  }
  
  function toggleFAQList() {
    const list = document.getElementById('faqList');
    const arrow = document.querySelector('.section-button .arrow');
  
    if (list.style.display === 'none' || list.style.display === '') {
      list.style.display = 'flex';
      arrow.classList.add('rotate'); // 회전 추가
    } else {
      list.style.display = 'none';
      arrow.classList.remove('rotate'); // 회전 해제
    }
  }