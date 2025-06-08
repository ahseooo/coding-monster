const javascript_key = '9dc00533f8dfea8ece7f6cc276085f61';
// 9dc00533f8dfea8ece7f6cc276085f61 자바스크립트 키

Kakao.init(`${javascript_key}`);  // 사용하려는 앱의 JavaScript 키 입력
console.log(Kakao.isInitialized());

// 카카오 로그아웃

function kakaoLogOut() {
    if (!Kakao.Auth.getAccessToken()) {
        alert("로그인 상태가 아닙니다.\n다시 로그인 해주세요.");
        location.href = "http://127.0.0.1:5500/sign_in.html";
        return;
    }
    Kakao.Auth.logout(function () {
        alert("로그아웃 성공!");
        console.log("accecc token: " + Kakao.Auth.getAccessToken());
        location.href = "http://127.0.0.1:5500/Play_off.html";
    });
}