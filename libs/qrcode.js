define([], function () {
    return {
        qrcode: function (config) {
            config = config || {};
            config.width = config.width || 120;
            config.height = config.height || 120;
            config.maxScreen = config.maxScreen || 980;
            config.message = config.message || "扫码手机访问wap站点";
            config.id = config.id || "#qrcode";
            var mobile_url2;
            try {
                mobile_url2 = $url.encode({"f": "qr"}, $sc.canonical_wap);
            } catch (e) {
                mobile_url2 = document.location.href;
            }
            // qrcode
            document.write('<style type="text/css">#qrocdeContainer{position: fixed;z-index: 999;bottom: 0;left: 0;}#qrcodeMessage{background:#fff;width:' + config.width + 'px;padding:8px;text-align:center;float:right;}@media screen and (max-width: ' + config.maxScreen + 'px) {#qrocdeContainer{display:none;}}</style>');
            document.write('<div id="qrocdeContainer"><div id="qrcodeMessage"><div id="qrcode"></div><div>' + config.message + '</div></div></div>');
            window.jQuery(config.id).qrcode({
                width: config.width,
                height: config.height,
                correctLevel: 0,
                text: mobile_url2
            });
        },
        // 显示二维码
        eve_qrcode: function () {
            // qrcodeFloat
            if (typeof this.qrcode != "undefined" && this.qrcode) {
                try {
                    this.qrcode({width: 120, height: 120});
                } catch (e) {
                }
            }
        }
    }
});
