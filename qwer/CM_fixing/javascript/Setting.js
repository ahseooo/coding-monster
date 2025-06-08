// 사이드바 메뉴 펼치기
let arrow = document.querySelectorAll(".arrow");
for (let i = 0; i < arrow.length; i++) {
  arrow[i].addEventListener("click", (e) => {
    let arrowParent = e.target.parentElement.parentElement;
    arrowParent.classList.toggle("showCategory");
  });
}

// 사이드바 열고 닫기
let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".fa-bars");
sidebarBtn.addEventListener("click", () => {
  sidebar.classList.toggle("close");
});

// 설정창 열기 버튼
const settingOpenBtn = document.getElementById("openSettings");
const settingsPage = document.getElementById("settingsPage");

if (settingOpenBtn && settingsPage) {
  settingOpenBtn.addEventListener("click", (e) => {
    e.preventDefault();
    settingsPage.classList.add("show");
  });
}

// 슬라이더 설정
const fontSizeSlider = document.getElementById("fontSize");
const fontSizeValue = document.getElementById("fontSizeValue");
if (fontSizeSlider && fontSizeValue) {
  fontSizeSlider.addEventListener("input", () => {
    fontSizeValue.textContent = fontSizeSlider.value;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // 테마 색상 라디오
  const themeRadios = document.querySelectorAll('input[name="theme"]');
  const themeColors = {
    dark1: '#503E9A',
    dark2: '#3B3FC9',
    dark3: '#3C869C',
    light1: '#8661FF',
    light2: '#FFC5FE',
    light3: '#FFFC94',
    light4: '#8FE7B9'
  };

  // wrap 라디오
  const wrapRadios = document.querySelectorAll('input[name="wrap"]');

  let originalThemeId = document.querySelector('input[name="theme"]:checked')?.id || "dark1";
  let selectedThemeId = originalThemeId;

  let originalWrapValue = document.querySelector('input[name="wrap"]:checked')?.value || "on";
  let selectedWrapValue = originalWrapValue;

  const applyTheme = (color) => {
    const home = document.querySelector('.home-section');
    if (home) home.style.backgroundColor = color;

    const isLight = ['#FFFC94', '#8FE7B9', '#FFC5FE'].includes(color);
    document.body.style.color = isLight ? 'black' : 'white';
    const modal = document.querySelector('.settings-modal');
    if (modal) modal.style.color = isLight ? 'black' : 'white';
  };

  applyTheme(themeColors[originalThemeId]);

  themeRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      selectedThemeId = radio.id;
      const newColor = themeColors[selectedThemeId];
      if (newColor) applyTheme(newColor);
    });
  });

  wrapRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      selectedWrapValue = radio.value;
    });
  });

  // 저장
  const saveBtn = document.getElementById("saveBtn");
  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      originalThemeId = selectedThemeId;
      originalWrapValue = selectedWrapValue;
      alert("설정이 저장되었습니다!");
    });
  }

  // 취소
  const cancelBtn = document.getElementById("cancelBtn");
  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      // 테마 복원
      const originalColor = themeColors[originalThemeId];
      if (originalColor) applyTheme(originalColor);

      const originalRadio = document.getElementById(originalThemeId);
      if (originalRadio) originalRadio.checked = true;
      selectedThemeId = originalThemeId;

      // wrap 복원
      const toRestoreWrap = Array.from(wrapRadios).find(r => r.value === originalWrapValue);
      if (toRestoreWrap) toRestoreWrap.checked = true;
      selectedWrapValue = originalWrapValue;

      alert("변경이 취소되었습니다.");
    });
  }
});
