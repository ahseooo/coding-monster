const javascript_key = '9dc00533f8dfea8ece7f6cc276085f61';
// 9dc00533f8dfea8ece7f6cc276085f61 자바스크립트 키
// 2cd3cc55c1bf699cb83ae1a6862c245f admin 키

Kakao.init(`${javascript_key}`);  // 사용하려는 앱의 JavaScript 키 입력
console.log(Kakao.isInitialized());

//4. 엑세스 토큰을 발급받고, 아래 함수를 호출시켜 사용자 정보 받아옴.
// Kakao.API.request({
//     url: '/v2/user/me',
//     success: function (res) {
//         const nickname = res.kakao_account.profile.nickname;
//         const email = res.kakao_account.email;
//         alert(`안녕하세요, ${nickname}님!`);
//         console.log(res);
//         console.log('이메일:', email);
//     },
//     fail: function (error) {
//         console.error('사용자 정보 요청 실패', error);
//         console.log('Access Token:', Kakao.Auth.getAccessToken());
//     }
// });
// function requestUserInfo() {
Kakao.API.request({
    url: '/v2/user/me',
    success: function (res) {
        alert("로그인 성공!");
        console.log(res);
        // var id = res.id;
        var email = res.kakao_account.email;
        var profile_nickname = res.kakao_account.profile.nickname;
        // localStorage.setItem("nickname", profile_nickname);
        // localStorage.setItem("id", id);
        console.log(email);
        console.log(profile_nickname);
        location.replace("http://127.0.0.1:5500/Play_on.html");
        // console.log(id);
    },
    fail: function (error) {
        alert("카카오 로그인 실패" + JSON.stringify(error));
        console.log('Access Token:', Kakao.Auth.getAccessToken());
    },
});
// }