// 사용자 데이터 정의
const users = Array.from({ length: 100 }, () => ({ nickname: "all", activity: Math.floor(Math.random() * 100) }));
const javaUsers = Array.from({ length: 105 }, () => ({ nickname: "java", activity: Math.floor(Math.random() * 100) }));
const pythonUsers = Array.from({ length: 105 }, () => ({ nickname: "python", activity: Math.floor(Math.random() * 100) }));
const jsUsers = Array.from({ length: 105 }, () => ({ nickname: "js", activity: Math.floor(Math.random() * 100) }));
const htmlUsers = Array.from({ length: 105 }, () => ({ nickname: "html", activity: Math.floor(Math.random() * 100) }));

let currentPage = 1;
let javaCurrentPage = 1;
let pythonCurrentPage = 1;
let jsCurrentPage = 1;
let htmlCurrentPage = 1;
const rowsPerPage = 10;

function renderRanking(usersArr, tbodyId, pageSpanSelector, page) {
  const tbody = document.getElementById(tbodyId);
  const pageSpan = document.querySelector(pageSpanSelector);
  const sortedUsers = [...usersArr].sort((a, b) => b.activity - a.activity);
  const start = (page - 1) * rowsPerPage;
  const totalPages = Math.ceil(usersArr.length / rowsPerPage);
  const pageUsers = sortedUsers.slice(start, start + rowsPerPage);
  tbody.innerHTML = "";

  for (let i = 0; i < rowsPerPage; i++) {
    const globalRank = start + i + 1;
    const user = pageUsers[i];
    const tr = document.createElement("tr");

    const tdRank = document.createElement("td");
    tdRank.classList.add("rank_cell");
    tdRank.innerHTML = user
      ? `<span class="rank-icon">${globalRank <= 50 ? "⭐" : ""}</span><span class="rank-number">${globalRank}</span>`
      : "";

    const tdName = document.createElement("td");
    tdName.textContent = user ? user.nickname : "";

    const tdDots = document.createElement("td");
    tdDots.classList.add("dots_cell");
    if (user) for (let j = 0; j < 7; j++) tdDots.innerHTML += '<span class="dot"></span>';

    tr.appendChild(tdRank);
    tr.appendChild(tdName);
    tr.appendChild(tdDots);
    tbody.appendChild(tr);
  }

  pageSpan.textContent = `${page} / ${totalPages}`;
}

function renderRankingTable(page) { renderRanking(users, "all_ranking_body", "#all_ranking .page_number", page); }
function renderJavaRankingTable(page) { renderRanking(javaUsers, "java_ranking_body", "#java_ranking .page_number", page); }
function renderPythonRankingTable(page) { renderRanking(pythonUsers, "python_ranking_body", "#python_ranking .page_number", page); }
function renderJsRankingTable(page) { renderRanking(jsUsers, "js_ranking_body", "#js_ranking .page_number", page); }
function renderHtmlRankingTable(page) { renderRanking(htmlUsers, "html_ranking_body", "#html_ranking .page_number", page); }

function nextPage() { const totalPages = Math.ceil(users.length / rowsPerPage); if (currentPage < totalPages) renderRankingTable(++currentPage); }
function prevPage() { if (currentPage > 1) renderRankingTable(--currentPage); }
function nextJavaPage() { const totalPages = Math.ceil(javaUsers.length / rowsPerPage); if (javaCurrentPage < totalPages) renderJavaRankingTable(++javaCurrentPage); }
function prevJavaPage() { if (javaCurrentPage > 1) renderJavaRankingTable(--javaCurrentPage); }
function nextPythonPage() { const totalPages = Math.ceil(pythonUsers.length / rowsPerPage); if (pythonCurrentPage < totalPages) renderPythonRankingTable(++pythonCurrentPage); }
function prevPythonPage() { if (pythonCurrentPage > 1) renderPythonRankingTable(--pythonCurrentPage); }
function nextJsPage() { const totalPages = Math.ceil(jsUsers.length / rowsPerPage); if (jsCurrentPage < totalPages) renderJsRankingTable(++jsCurrentPage); }
function prevJsPage() { if (jsCurrentPage > 1) renderJsRankingTable(--jsCurrentPage); }
function nextHtmlPage() { const totalPages = Math.ceil(htmlUsers.length / rowsPerPage); if (htmlCurrentPage < totalPages) renderHtmlRankingTable(++htmlCurrentPage); }
function prevHtmlPage() { if (htmlCurrentPage > 1) renderHtmlRankingTable(--htmlCurrentPage); }

document.addEventListener("DOMContentLoaded", function () {
  const langBtnGroup = document.getElementById("languageButtons");
  const allRankingElement = document.getElementById("all_ranking");
  if (langBtnGroup) langBtnGroup.style.display = "none";
  if (allRankingElement) allRankingElement.style.display = "none";

  // 사이드바 토글
  const sidebar = document.querySelector(".sidebar");
  const sidebarBtn = document.querySelector(".fa-bars");
  if (sidebarBtn && sidebar) {
    sidebarBtn.addEventListener("click", () => {
      sidebar.classList.toggle("close");
    });
  }

  // 서브메뉴 화살표 토글
  document.querySelectorAll(".arrow").forEach(arrow => {
    arrow.addEventListener("click", (e) => {
      e.target.closest("li").classList.toggle("showCategory");
    });
  });

  const 전체랭킹메뉴 = Array.from(document.querySelectorAll(".sub-category li a")).find(a => a.textContent.trim() === "전체 랭킹");

  전체랭킹메뉴?.addEventListener("click", (e) => {
    e.preventDefault();
    if (allRankingElement) allRankingElement.style.display = "block";
    if (langBtnGroup) langBtnGroup.style.display = "flex";

    renderRankingTable(currentPage);

    const langButtons = document.querySelectorAll(".lang-btn");
    langButtons.forEach(btn => btn.classList.remove("active"));
    const 전체버튼 = Array.from(langButtons).find(btn => btn.textContent === "전체");
    if (전체버튼) 전체버튼.classList.add("active");

    Object.entries({
      "전체": "all_ranking",
      "JAVA": "java_ranking",
      "PYTHON": "python_ranking",
      "JAVASCRIPT": "js_ranking",
      "HTML": "html_ranking"
    }).forEach(([_, id]) => {
      const section = document.getElementById(id);
      if (section) section.style.display = (id === "all_ranking") ? "block" : "none";
    });
  });

  // 전체 외 다른 메뉴 클릭 시 숨기기
  document.querySelectorAll(".nav-lists > li > a").forEach(menu => {
    menu.addEventListener("click", () => {
      if (allRankingElement) allRankingElement.style.display = "none";
      if (langBtnGroup) langBtnGroup.style.display = "none";
    });
  });

  // 언어 버튼 클릭 시
  const rankingSections = {
    "전체": "all_ranking",
    "JAVA": "java_ranking",
    "PYTHON": "python_ranking",
    "JAVASCRIPT": "js_ranking",
    "HTML": "html_ranking"
  };

  const langButtons = document.querySelectorAll(".lang-btn");
  langButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      langButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      Object.values(rankingSections).forEach(id => {
        const section = document.getElementById(id);
        if (section) section.style.display = "none";
      });

      const selectedId = rankingSections[btn.innerText];
      const selectedSection = document.getElementById(selectedId);
      if (selectedSection) selectedSection.style.display = "block";

      if (selectedId === "all_ranking") renderRankingTable(currentPage);
      if (selectedId === "java_ranking") renderJavaRankingTable(javaCurrentPage);
      if (selectedId === "python_ranking") renderPythonRankingTable(pythonCurrentPage);
      if (selectedId === "js_ranking") renderJsRankingTable(jsCurrentPage);
      if (selectedId === "html_ranking") renderHtmlRankingTable(htmlCurrentPage);
    });
  });
});