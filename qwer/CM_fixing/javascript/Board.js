const posts = [
  // 예시 게시글 30개 중 일부
  { id: 1, title: "첫 번째 글", author: "Alice", date: "2025-05-01" },
  { id: 2, title: "두 번째 글", author: "Bob", date: "2025-05-02" },
  // ...
  { id: 30, title: "서른 번째 글", author: "Kim", date: "2025-05-10" },
];


const POSTS_PER_PAGE = 20;
let currentPage = 1;

function renderPosts() {
  const board = document.getElementById("board");
  board.innerHTML = ""; // 기존 게시글 초기화

  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;
  const currentPosts = posts.slice(start, end);

  currentPosts.forEach((post) => {
    const row = document.createElement("div");
    row.className = "post-row";
    row.innerHTML = `
      <span>${post.id}</span>
      <span>${post.title}</span>
      <span>${post.author}</span>
      <span>${post.date}</span>
    `;
    board.appendChild(row);
  });

  renderPagination();
}

function renderPagination() {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = ""; // 초기화

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  for (let i = 1; i <= totalPages; i++) {
    const pageBtn = document.createElement("button");
    pageBtn.textContent = i;
    pageBtn.className = i === currentPage ? "active" : "";
    pageBtn.onclick = () => {
      currentPage = i;
      renderPosts();
    };
    pagination.appendChild(pageBtn);
  }
}

// 페이지 로드 시 초기 렌더링
document.addEventListener("DOMContentLoaded", renderPosts);
