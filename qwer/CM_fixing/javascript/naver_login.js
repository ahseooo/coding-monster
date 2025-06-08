var naverLogin = new naver.LoginWithNaverId({
	clientId: "kV_paNOP_josmNm3ZWKv",
	callbackUrl: "http://127.0.0.1:5500/Social_login_callback.html",
	isPopup: false,
	loginButton: {color: "green", type: 1, height: 20}
});

naverLogin.init();