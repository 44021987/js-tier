/*
 * 作者：yuanwei
 * 使用说明：
 * 	tier.alert({message: "",label: "",callback: fn})
 * 	tier.confirm({message: "",title: "",confirm: "",cancle: "",callback: fn})	
 * 日期：2017/9/6
 */
(function (win, doc) {
	var alertOptions,
		confirmOptions,
		ohidden = "yui_over_hidden";
	alertOptions = {
		message: "",
		label: "确定",
		callback: null
	}
	confirmOptions = {
		title: "",
		message: "",
		confirm: "确定",
		cancle: "取消",
		callback: null
	}
	function $$ (v) {
		return doc.querySelector(v);
	}
	function Tier() {
		this.alertDom = null;
		this.confirmDom = null;
	}
	Tier.prototype.config = function (opts, oldOpts) {
		// 返回一个新的options
		var oldOptsCopy = JSON.parse(JSON.stringify(oldOpts));
		for (var key in opts) {
			oldOptsCopy[key] = opts[key];
		}
		return oldOptsCopy
	}
	Tier.prototype.listen = function (dom, evtarget, fn, isconfirm) {
		evtarget.addEventListener("click", function () {
			dom.style.display = "none";
			doc.body.className = "";
			if (typeof fn === "function") isconfirm ? fn.call(null, true) : fn();
		})
	}
	// alert
	Tier.prototype.createAlertDom = function (opts) {
		doc.body.className = ohidden;
		if (this.alertDom !== null) {
			$$("#tier-alert .yui-dialog__bd").innerHTML = opts.message;
			$$("#tier-alert-btn").innerHTML = opts.label;
			this.alertDom.style.display = "block";
			return;
		};
		var oAlert = doc.createElement("div"),
			alertHtml = `
				<div class="yui-mask"></div>
	            <div class="yui-dialog">
	                <div class="yui-dialog__bd">${opts.message}</div>
	                <div class="yui-dialog__ft">
	                    <a href="javascript:;" id="tier-alert-btn" class="yui-dialog__btn">${opts.label}</a>
	                </div>
	           </div>
			`;
		oAlert.id = "tier-alert";
		oAlert.innerHTML = alertHtml;
		doc.body.appendChild(oAlert);
		this.listen(oAlert, $$("#tier-alert-btn"), opts.callback)
		return (this.alertDom = oAlert);
	}
	Tier.prototype.alert = function () {
		var argus = arguments[0],
			config = null;
		if (Object.prototype.toString.call(argus).slice(-7, -1) === "Object") {
			config = this.config(argus, alertOptions);
			this.createAlertDom(config);
		}
	}
	// confirm
	Tier.prototype.createConfirmDom = function (opts) {
		doc.body.className = ohidden;
		if (this.confirmDom !== null) {
			$$("#tier-confirm .yui-dialog__title").innerHTML = opts.title ? opts.title : "";
			$$("#tier-confirm .yui-dialog__bd").innerHTML = opts.message;
			$$("#tier_confirm_cancle").innerHTML = opts.cancle;
			$$("#tier_confirm_confirm").innerHTML = opts.confirm;
			this.confirmDom.style.display = "block";
			return;
		};
		var oConfirm = doc.createElement("div"),
			confirmHtml = `
				<div class="yui-mask"></div>
	            <div class="yui-dialog">
	                <div class="yui-dialog__hd"><strong class="yui-dialog__title">${opts.title ? opts.title : ""}</strong></div>
	                <div class="yui-dialog__bd">${opts.message}</div>
	                <div class="yui-dialog__ft">
	                    <a href="javascript:;" id="tier_confirm_cancle" class="yui-dialog__btn yui-dialog__btn_default">${opts.cancle}</a>
	                    <a href="javascript:;" id="tier_confirm_confirm" class="yui-dialog__btn yui-dialog__btn_primary">${opts.confirm}</a>
	                </div>
	            </div>
			`;
		oConfirm.id = "tier-confirm";
		oConfirm.innerHTML = confirmHtml;
		doc.body.appendChild(oConfirm);
		this.listen(oConfirm, $$("#tier_confirm_cancle"));
		this.listen(oConfirm, $$("#tier_confirm_confirm"), opts.callback, true);
		return (this.confirmDom = oConfirm);
	}
	Tier.prototype.confirm = function () {
		var argus = arguments[0],
			config = null;
		if (Object.prototype.toString.call(argus).slice(-7, -1) === "Object") {
			config = this.config(argus, confirmOptions);
			this.createConfirmDom(config);
		}
		 
	}
	return win.tier = new Tier();
})(window, document);