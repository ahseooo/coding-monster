const naverLogin = new naver.LoginWithNaverId({
    clientId: "kV_paNOP_josmNm3ZWKv",
    callbackUrl: "http://127.0.0.1:5500/Social_login_callback.html",
    isPopup: false, /* 팝업을 통한 연동처리 여부 */
    callbackHandle: true
});

naverLogin.init();  /* 설정정보를 초기화하고 연동을 준비 */

window.addEventListener('load', function () {
    naverLogin.getLoginStatus(function (status) {
        if (status) {
            const nickName = naverLogin.user.getNickName();
            const email = naverLogin.user.getEmail();
            const birthyear = naverLogin.user.getBirthyear();
            alert('로그인 성공!');
            console.log(nickName);
            console.log(email);
            console.log(birthyear);
            console.log(naverLogin.user.getMobile());
            location.replace("http://127.0.0.1:5500/Play_on.html");

        }
        else alert("콜백 실패");
    });
});

// 로그아웃
