const setting = {
	appID: "368802019956990",
	description: "WebGene Template"
};

// 測試站設定
if (window.setting) {
	for (let i in window.setting) {
		setting[i] = window.setting[i];
	}
}


export {setting}