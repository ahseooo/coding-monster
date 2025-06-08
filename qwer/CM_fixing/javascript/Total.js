const users = Array.from({ length: 100 }, () => ({ nickname: "all", activity: Math.floor(Math.random() * 100) }));
const javaUsers = Array.from({ length: 105 }, () => ({ nickname: "java", activity: Math.floor(Math.random() * 100) }));
const pythonUsers = Array.from({ length: 105 }, () => ({ nickname: "python", activity: Math.floor(Math.random() * 100) }));
const jsUsers = Array.from({ length: 105 }, () => ({ nickname: "js", activity: Math.floor(Math.random() * 100) }));
const htmlUsers = Array.from({ length: 105 }, () => ({ nickname: "html", activity: Math.floor(Math.random() * 100) }));
// 105명이 아니면 테이블 행 높이가 달라짐 수정 필요!

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

function renderRankingTable(page) {
  renderRanking(users, "all_ranking_body", "#all_ranking .page_number", page);
}
function renderJavaRankingTable(page) {
  renderRanking(javaUsers, "java_ranking_body", "#java_ranking .page_number", page);
}
function renderPythonRankingTable(page) {
  renderRanking(pythonUsers, "python_ranking_body", "#python_ranking .page_number", page);
}
function renderJsRankingTable(page) {
  renderRanking(jsUsers, "js_ranking_body", "#js_ranking .page_number", page);
}
function renderHtmlRankingTable(page) {
  renderRanking(htmlUsers, "html_ranking_body", "#html_ranking .page_number", page);
}

function nextPage() {
  const totalPages = Math.ceil(users.length / rowsPerPage);
  if (currentPage < totalPages) renderRankingTable(++currentPage);
}
function prevPage() {
  if (currentPage > 1) renderRankingTable(--currentPage);
}
function nextJavaPage() {
  const totalPages = Math.ceil(javaUsers.length / rowsPerPage);
  if (javaCurrentPage < totalPages) renderJavaRankingTable(++javaCurrentPage);
}
function prevJavaPage() {
  if (javaCurrentPage > 1) renderJavaRankingTable(--javaCurrentPage);
}
function nextPythonPage() {
  const totalPages = Math.ceil(pythonUsers.length / rowsPerPage);
  if (pythonCurrentPage < totalPages) renderPythonRankingTable(++pythonCurrentPage);
}
function prevPythonPage() {
  if (pythonCurrentPage > 1) renderPythonRankingTable(--pythonCurrentPage);
}
function nextJsPage() {
  const totalPages = Math.ceil(jsUsers.length / rowsPerPage);
  if (jsCurrentPage < totalPages) renderJsRankingTable(++jsCurrentPage);
}
function prevJsPage() {
  if (jsCurrentPage > 1) renderJsRankingTable(--jsCurrentPage);
}
function nextHtmlPage() {
  const totalPages = Math.ceil(htmlUsers.length / rowsPerPage);
  if (htmlCurrentPage < totalPages) renderHtmlRankingTable(++htmlCurrentPage);
}
function prevHtmlPage() {
  if (htmlCurrentPage > 1) renderHtmlRankingTable(--htmlCurrentPage);
}

document.addEventListener("DOMContentLoaded", function () {
  renderRankingTable(currentPage);

  // const sidebar = document.querySelector(".sidebar");
  // const sidebarBtn = document.querySelector(".fa-bars");
  // if (sidebarBtn && sidebar) {
  //   sidebarBtn.addEventListener("click", () => {
  //     sidebar.classList.toggle("close");
  //   });
  // }

  // let arrows = document.querySelectorAll(".arrow");
  // for (let i = 0; i < arrows.length; i++) {
  //   arrows[i].addEventListener("click", (e) => {
  //     let arrowParent = e.target.parentElement.parentElement;
  //     arrowParent.classList.toggle("showCategory");
  //   });
  // }

  // const allRankingElement = document.getElementById("all_ranking");
  // const 전체랭킹메뉴 = Array.from(document.querySelectorAll(".sub-category li a")).find(a => a.textContent.trim() === "전체 랭킹");
  // if (allRankingElement) allRankingElement.style.display = "none";
  // 전체랭킹메뉴?.addEventListener("click", (e) => {
  //   e.preventDefault();
  //   const 랭킹메뉴 = 전체랭킹메뉴.closest(".sub-category");
  //   const isRankingVisible = 랭킹메뉴?.style.display !== "none" && 랭킹메뉴?.offsetParent !== null;
  //   if (isRankingVisible) {
  //     allRankingElement.style.display = "block";
  //     renderRankingTable(currentPage);
  //   }
  // });

  const otherMenus = document.querySelectorAll(".nav-lists > li > a");
  otherMenus.forEach(menu => {
    menu.addEventListener("click", () => {
      if (allRankingElement) allRankingElement.style.display = "none";
    });
  });

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