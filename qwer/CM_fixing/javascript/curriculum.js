function showChapters(language) {
  // 1. 챕터 그룹 제어
  const groups = document.querySelectorAll('.chapter-group');
  groups.forEach(group => {
    group.style.display = group.dataset.tab === language ? 'block' : 'none';
  });

  // 2. 버튼 스타일 제어
  const buttons = document.querySelectorAll('.tabs button');
  buttons.forEach(button => {
    if (button.textContent === language) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });

  // 3. 해당 언어의 첫 번째 subchapter 자동 열기
  const visibleGroup = document.querySelector(`.chapter-group[data-tab="${language}"]`);
  if (visibleGroup) {
    const subchapterGroups = visibleGroup.querySelectorAll('.subchapters');
    const chapterButtons = visibleGroup.querySelectorAll('.chapter');

    // 모든 subchapters 닫기
    subchapterGroups.forEach(s => s.style.display = 'none');
    // 모든 챕터 버튼에서 active 제거
    chapterButtons.forEach(b => b.classList.remove('active'));

    // 첫 번째 subchapter 열기
    const firstSub = subchapterGroups[0];
    const firstButton = chapterButtons[0];
    if (firstSub && firstButton) {
      firstSub.style.display = 'block';
      firstButton.classList.add('active');
    }
  }
}

function toggleSubChapters(chapterId) {
  // 1. 모든 subchapter 그룹을 가져옴
  const allSubGroups = document.querySelectorAll('.subchapters');

  allSubGroups.forEach(group => {
    // 클릭된 챕터에 해당하는 그룹만 표시하고, 나머지는 닫기
    if (group.id === chapterId) {
      group.style.display = group.style.display === 'block' ? 'none' : 'block';
    } else {
      group.style.display = 'none';
    }
  });

  // 2. chapter 버튼 스타일 제어
  const chapterButtons = document.querySelectorAll('.chapter');
  chapterButtons.forEach(button => {
    // 해당 버튼이 클릭된 챕터 버튼인지 확인
    if (button.getAttribute('onclick')?.includes(chapterId)) {
      button.classList.toggle('active');
    } else {
      button.classList.remove('active');
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  showChapters('JAVA');
});


