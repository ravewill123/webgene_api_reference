/* 使用模塊寫法也可以做到 namespace 需求 */
// export module date {
export namespace date {
	export class Moment {
		date = new Date();

		/**
		 * 時間經過計算Class
		 * 
		 * @param d 傳入字串格式2015/01/01，或數字
		 */
		constructor(d: string = undefined) {
			if (d == undefined) {
				this.date = new Date();
			} else {
				this.date = new Date(d);
			}
		}

		/**
		 * 返回時間差-毫秒
		 * 
		 * @return {number} [description]
		 */
		gap():number {
			return new Date().getTime() - this.date.getTime();
		}

		toString() {
			return this.date.toString();
		}

	}
}