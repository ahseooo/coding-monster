const javascript_key = '9dc00533f8dfea8ece7f6cc276085f61';
// 9dc00533f8dfea8ece7f6cc276085f61 자바스크립트 키
// 2cd3cc55c1bf699cb83ae1a6862c245f admin 키

Kakao.init(`${javascript_key}`);  // 사용하려는 앱의 JavaScript 키 입력
console.log(Kakao.isInitialized());

function loginWithKakao() {
    // Kakao.Auth.authorize({
    //     redirectUri: 'http://127.0.0.1:5500/Social_login_callback.html',
    //     scope: 'account_email, profile_nickname',
    //     // state: 'optional_state_value'
    // });
    Kakao.Auth.login({
        scope: 'account_email, profile_nickname',
        success: function (authObj) {
            console.log(authObj); //access토큰 값
            Kakao.Auth.setAccessToken(authObj.access_token); //access 토큰 값 저장
            location.replace("http://127.0.0.1:5500/social_login_callback.html");
        },
        fail: function (err) {
            console.log(err);
        },
    });
}

// //4. 엑세스 토큰을 발급받고, 아래 함수를 호출시켜 사용자 정보 받아옴.
// function requestUserInfo() {
//     Kakao.API.request({
//         url: '/v2/user/me',
//         success: function (res) {
//             alert("로그인 성공!");
//             location.replace("http://127.0.0.1:5500/Play_on.html");
//             console.log(res);
//             // var id = res.id;
//             var email = res.kakao_account.profile.email;
//             var profile_nickname = res.kakao_account.profile.nickname;
//             // localStorage.setItem("nickname", profile_nickname);
//             // localStorage.setItem("id", id);
//             console.log(email);
//             console.log(profile_nickname);
//             // console.log(id);
//         },
//         fail: function (error) {
//             alert("카카오 로그인 실패" + JSON.stringify(error));
//         },
//     });
// }


// displayToken()
// function displayToken() {
//     var token = getCookie('authorize-access-token');

//     if(token) {
//         Kakao.Auth.setAccessToken(token);
//         Kakao.Auth.getStatusInfo()
//         .then(function(res) {
//             if (res.status === 'connected') {
//                 alert('login success, token: ' + Kakao.Auth.getAccessToken());
//             }
//         })
//         .catch(function(err) {
//             Kakao.Auth.setAccessToken(null);
//         });
//     }
// }
// function getCookie(name) {
//     var parts = document.cookie.split(name + '=');
//     if (parts.length === 2) { return parts[1].split(';')[0]; }
//   }
