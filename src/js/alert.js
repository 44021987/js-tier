/*
 * 作者：yuanwei
 * 使用说明：
 * 	tier.alert({message: "",label: "",callback: fn})
 * 	tier.confirm({message: "",title: "",confirm: "",cancle: "",callback: fn})	
 * 日期：2017/9/6
 */
(function (win, doc) {
  function $$(v) {
    return doc.querySelector(v);
  }

  function Tier() {
    this.options = {
      title: "",
      message: "",
      label: "确定",
      confirm: "确定",
      cancle: "取消",
      callback: null
    }
  }
  Tier.prototype.config = function (opts) {
    var newOptsCopy = {...this.options};
    if (Object.prototype.toString.call(opts).slice(-7, -1) === "Object") {
      for (var key in opts) {
        newOptsCopy[key] = opts[key];
      }
    }
    return newOptsCopy;
  }
  Tier.prototype.listen = function (dom, evtarget, fn, isconfirm) {
    var that = this;
    evtarget.addEventListener("click", function () {
      var isCancle = new RegExp('cancle').test(this.id);
      dom.style.display = "none";
      doc.body.className = "";
      that.remove(dom);
      typeof fn === "function" && isconfirm ? fn.call(null, !isCancle) : fn(true);
    })
  }
  Tier.prototype.remove = function (onode) {
    document.body.removeChild(onode);
  }
  Tier.prototype.bindDom = function (dom, id, ohtml) {
    dom.id = id;
    dom.innerHTML = ohtml;
    doc.body.appendChild(dom);
    doc.body.className = "yui_over_hidden";
  }
  // alert
  Tier.prototype.createAlertDom = function (opts) {
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
    return oAlert;
  }
  Tier.prototype.alert = function (opts) {
    this.createAlertDom(this.config(opts));
  }
  // confirm
  Tier.prototype.create = function (opts) {
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
    this.bindDom(oConfirm, "tier-confirm", confirmHtml);
    this.listen(oConfirm, $$("#tier_confirm_cancle"), opts.callback, true);
    this.listen(oConfirm, $$("#tier_confirm_confirm"), opts.callback, true);
    return oConfirm;
  }
  Tier.prototype.confirm = function (opts) {
    this.create(this.config(opts));
  }
  win.tier = {
    alert(opts) {
      return new Tier().alert(opts);
    },
    confirm(opts) {
      return new Tier().confirm(opts);
    }
  };
})(window, document);