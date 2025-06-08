const naverLogin = new naver.LoginWithNaverId({
    clientId: "kV_paNOP_josmNm3ZWKv",
    callbackUrl: "http://127.0.0.1:5500/Social_login_callback.html",
    isPopup: false, /* 팝업을 통한 연동처리 여부 */
    callbackHandle: true
});
naverLogin.init();/* 설정정보를 초기화하고 연동을 준비 */

naverLogin.getLoginStatus(function (status) {
    if (status) {
        const logout = document.getElementById('btn_logout');
        logout.addEventListener('click', (e) => {
            // const accessToken = window.location.href.split("=")[1].split("&")[0];
            naverLogin.logout();        // 로컬에서 로그아웃

            // window.open("https://nid.naver.com/nidlogin.logout");     // 세션 로그아웃 O   토큰 폐지 X

            // setTimeout(() => {
            //     window.location.href = "http://127.0.0.1:5500";
            // }, 1000);
            // alert('로그아웃 성공!');

            const accessToken = naverLogin.accessToken.accessToken;
            
            const nickName = naverLogin.user.getNickName();
            const email = naverLogin.user.getEmail();
            const birthyear = naverLogin.user.getBirthyear();

            fetch(`http://127.0.0.1:5500/naver/logout?access_token=${accessToken}`)
                .then(res => res.json())
                .then(data => {
                    console.log("토큰 폐기 결과: ", data);
                    alert("Access Token이 폐기되었습니다.\n로그아웃 성공!");
                    location.replace("http://127.0.0.1:5500");
                    console.log(`닉네임 : ${nickName}\n이메일 : ${email}\n출생연도 : ${birthyear}`);
                })
                .catch(err => {
                    console.error("토큰 폐기 에러: ", err);
                });
        })
    }
    else alert("콜백 실패");
});

