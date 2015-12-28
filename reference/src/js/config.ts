const setting = {
	appID: "368802019956990",
	description: "WebGene Template"
};

// 測試站設定，驗證環境變數後才覆寫 setting
if (process.env.RELEASE != '1' && window.setting) {
	for (let i in window.setting) {
		setting[i] = window.setting[i];
	}
}


export {setting}