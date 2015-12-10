/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/moment/moment.d.ts" />
declare function require(string): any;
import {date} from './class/date/Moment';


var Moment: date.Moment = new date.Moment(); // 使用 namespace 或 module 方式避免同名稱函式或類別衝突
$('#date').text( `從 ${ moment().format('LLL') } 開始` );

function formatDollar(num, fixed) {
	fixed = fixed || false;
	if (fixed) {
		return num.toFixed(fixed).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
	} else {
		return num.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").split(".")[0];
	}
}

(function timer() {
	requestAnimationFrame(timer);
	let s = Moment.gap();
	$('#time').text(`已過 ${s} 毫秒`);
	$('#second').text( `已過 ${formatDollar(s / 1000, 2)} 秒` );
	$('#minute').text( `已過 ${formatDollar(s / (1000 * 60), 2)} 分` );
	$('#hour').text( `已過 ${formatDollar(s / (1000 * 60 * 60), 2)} 時` );
	$('#day').text( `已過 ${formatDollar(s / (1000 * 60 * 60 * 24), 2)} 天` );
})();

