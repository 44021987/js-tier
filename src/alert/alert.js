/*
 * 作者：yuanwei
 * 使用说明：
 * 	tier.alert({message: "",label: "",callback: fn})
 * 	tier.confirm({message: "",title: "",confirm: "",cancle: "",callback: fn})	
 * 日期：2017/9/6
 */
(function (win, doc) {
	var options,
		alertDom = null,
		confirmDom = null,
		ohidden = "yui_over_hidden";
	options = {
		title: "",
		message: "",
		label: "确定",
		confirm: "确定",
		cancle: "取消",
		callback: null
	}
	function $$ (v) {
		return doc.querySelector(v);
	}
	function Tier() {
		
	}
	Tier.prototype.config = function (opts, oldOpts) {
		// 返回一个新的options
		var oldOptsCopy = JSON.parse(JSON.stringify(oldOpts));
		if (Object.prototype.toString.call(opts).slice(-7, -1) === "Object") {
			for (var key in opts) {
				oldOptsCopy[key] = opts[key];
			}
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
	Tier.prototype.bindDom = function (dom, id, ohtml) {
		dom.id = id;
		dom.innerHTML = ohtml;
		doc.body.appendChild(dom);
	}
	// alert
	Tier.prototype.createAlertDom = function (opts) {
		doc.body.className = ohidden;
		if (alertDom !== null) {
			$$("#tier-alert .yui-dialog__bd").innerHTML = opts.message;
			$$("#tier-alert-btn").innerHTML = opts.label;
			alertDom.style.display = "block";
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
		this.bindDom(oAlert, "tier-alert", alertHtml)
		this.listen(oAlert, $$("#tier-alert-btn"), opts.callback)
		return (alertDom = oAlert);
	}
	Tier.prototype.alert = function (opts) {
		this.createAlertDom(this.config(opts, options));
	}
	// confirm
	Tier.prototype.createConfirmDom = function (opts) {
		doc.body.className = ohidden;
		if (confirmDom !== null) {
			$$("#tier-confirm .yui-dialog__title").innerHTML = opts.title ? opts.title : "";
			$$("#tier-confirm .yui-dialog__bd").innerHTML = opts.message;
			$$("#tier_confirm_cancle").innerHTML = opts.cancle;
			$$("#tier_confirm_confirm").innerHTML = opts.confirm;
			confirmDom.style.display = "block";
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
		this.bindDom(oConfirm, "tier-confirm", confirmHtml)
		this.listen(oConfirm, $$("#tier_confirm_cancle"));
		this.listen(oConfirm, $$("#tier_confirm_confirm"), opts.callback, true);
		return (confirmDom = oConfirm);
	}
	Tier.prototype.confirm = function (opts) {
		this.createConfirmDom(this.config(opts, options));
	}
	return win.tier = {
		alert (opts) {
			return new Tier().alert(opts);
		},
		confirm (opts) {
			return new Tier().confirm(opts);
		}
	};
})(window, document);