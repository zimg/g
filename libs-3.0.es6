const $sc = $sc || {};
const $__m_g_com = $__m_g_com || {};

/** 常用JS库 */
class $webp {

    /**
     * 状态
     * @type {number}
     * @private
     */
    static _check = -1;

    /**
     * 是否支持 webp
     * @returns {number}
     */
    static check() {
        if (this._check === 0 || this._check === 0 ) {
            return this._check;
        } else {
            if ($cookie('_sp_webp') === 'ok') {
                this._check = 1;
            } else {
                try {
                    this._check = (document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0);
                    $cookie('_sp_webp', 'ok');
                } catch (err) {
                    this._check = 0;
                }
            }
            return this._check;
        }
    }

    /** 全站 对不支持的 图片src进行替换 */
    static replace () {
        if (!this.check()) {
            $('img').each(function () {
                var src = $(this).attr('src');
                if (typeof src != 'undefined') {
                    $(this).attr('src', src.replace(/(!.*)w$/, '$1'));
                }
                //针对用了懒加载的情况
                var osrc = $(this).attr('osrc');
                if (typeof osrc != 'undefined') {
                    $(this).attr('osrc', osrc.replace(/(!.*)w$/, '$1'));
                }
            })
        }
    }

    /**
     * 对不支持的 图片src进行替换
     * @param url
     * @returns {string}
     */
    static src2jpg (url) {
        try {
            if (!this.check()) {
                return url.replace(/(!.*)w$/, '$1');
            } else {
                return url;
            }
        } catch (err) {
            return url;
        }
    }
}

class $url {
    static time () {
        return Math.floor((new Date()).getTime() / 1000);
    }
    static rand (begin, end) {
        if (typeof begin != 'undefined') {
            end = end ? end : 2147483648;
            return Math.floor(Math.random() * (end - begin) + begin);
        } else {
            return (new Date()).getTime();
        }
    }
    static get (name) {
        let get = [location.search, location.hash].join('&');
        let start = get.indexOf(name + '=');
        if (start === -1) {
            return '';
        }
        let len = start + name.length + 1;
        let end = get.indexOf('&', len);
        if (end === -1) {
            end = get.length;
        }
        return decodeURIComponent(get.substring(len, end));
    }
    static hash (datas) {
        let rs = [];
        for (let k in datas) {
            rs.push(k + '=' + encodeURIComponent(datas[k]));
        }
        window.location.hash = window.location.hash ? window.location.hash + rs.join('&') : rs.join('&');
    }
    static encode (datas, url) {
        let rs = [];
        for (var k in datas) {
            rs.push(k + '=' + encodeURIComponent(datas[k]));
        }
        return (url ? url + (url.indexOf('?') === -1 ? '?' : '&') : '') + rs.join('&');
    }
    static decode  (str) {
        str = (str.indexOf('?') === -1 ? str : str.split("?")[1]).split("&");
        let rs = {}, a, c = str.length;
        for (var i = 0; i < c; i++) {
            a = str[i].split("=");
            rs[a[0]] = decodeURIComponent(a[1]);
        }
        return rs;
    }
    static favorite (title,url){
        if(!title){
            title = document.title;
        }
        if(!url){
            url = window.location.href;
        }
        let ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf("360se") > -1) {
            alert("由于360浏览器功能限制，请按 Ctrl+D 手动收藏！");
        } else if (ua.indexOf("msie 8") > -1) {
            try {
                window.external.AddToFavoritesBar(url, title); //IE8
            } catch (e) {
                alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
            }
        } else {
            try {
                window.external.addFavorite(sURL, sTitle);
            } catch (e) {
                try {
                    window.sidebar.addPanel(sTitle, sURL, "");
                } catch (e) {
                    try {
                        window.external.AddToFavoritesBar(sURL, sTitle); //IE8
                    } catch (e) {
                        alert("加入收藏失败，请使用Ctrl+D进行添加");
                    }
                }
            }
        }
    }
}

const $cookie = function (name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        options.expires = options.expires || 1;
        options.path = options.path || "\/";
        options.domain = options.domain || document.domain;
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toGMTString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime()
                    + (options.expires * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toGMTString(); // use expires
            // attribute,
            // max-age is not
            // supported by IE
        }
        let path = options.path ? '; path=' + options.path : '';
        let domain = options.domain ? '; domain=' + options.domain : '';
        let secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        let cookieValue = '';
        if (document.cookie && document.cookie !== '') {
            let cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                let cookie = typeof jQuery != 'undefined' ? jQuery.trim(cookies[i]) : cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};

class $libs{
   static browser = function () {
        let u = window.navigator.userAgent.toLowerCase();
        let app = window.navigator.appVersion;
        let language = (window.navigator.browserLanguage || window.navigator.language).toLowerCase();
        return {         //移动终端浏览器版本信息
            u:u,
            trident: u.indexOf('trident') > -1, //IE内核
            presto: u.indexOf('presto') > -1, //opera内核
            webkit: u.indexOf('applewebkit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('gecko') > -1 && u.indexOf('khtml') === -1, //火狐内核
            mobile: !!u.match(/applewebkit.*mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( u;)? cpu.+mac os x/), //ios终端
            android: u.indexOf('android') > -1 || u.indexOf('linux') > -1, //android终端或uc浏览器
            iphone: u.indexOf('iphone') > -1, //是否为iPhone或者QQHD浏览器
            ipad: u.indexOf('ipad') > -1, //是否iPad
            webapp: u.indexOf('safari') === -1, //是否web应该程序，没有头部与底部
            juc: u.indexOf('ucweb') > -1 || u.indexOf('juc') > -1 || u.indexOf('rv:1.2.3.4') > -1 || u.indexOf('firefox/1.') > -1,
            language: language,
            is_ios_android: !!(u.match(/(iphone|ipod|android|ios|ipad)/i)),
            is_qq: !!u.match(/qq/i) === 'qq',
            is_alipay: !!u.match(/alipay/i) === 'alipay',
            is_wechat: !!u.match(/micromessenger/i) === 'micromessenger'
        };
    }();

    /**
     * web版在pc版 显示
     */
    static mobile_show_css(){
        var dom = document.getElementsByTagName('html')[0],
            pgw = dom.offsetWidth,em = (pgw > 640)?20:pgw/32,
            css = document.createElement('style');
        css.type="text/css";
        css.innerHTML = "html {font-size:"+em+"px}";
        document.getElementsByTagName('head')[0].appendChild(css);
        window.em_basic = em;
    }

    /**
     * uaredirect
     * @param mobile_url
     */
    static uaredirect (mobile_url) {
        try {
            if (document.getElementById("bdmark") != null) {
                return;
            }
            var url_hash = window.location.hash;
            if (!url_hash.match("fromapp")) {
                //  alert([this.browser.is_ios_android,this.browser.u]);
                if (this.browser.is_ios_android) {
                    window.location.replace(mobile_url);
                }
            }
        } catch (err) {}
    }

    /**
     * adwrite
     * @param mode
     * @param size
     */
    static aw (mode, size) {
        let str = 'name:' + mode + (size ? ' size:' + size : '');
        if ($__m_g_com && $__m_g_com[mode]) {
            str = $__m_g_com[mode];
        }else{
            let wh = size.split('*');
            let w  = wh[0];
            let h  = wh[1];
            str = '<div style="width:'+w+'px;height:'+h+'px;overflow:hidden;margin:auto;border:1px #f60 dashed;padding:20px 10px;text-align:center;">'+str+'</div>'
        }
        document.write(str);
    }
    static search (obj, input, len) {
        input = input || 'q';
        len = len || 2;
        if (obj && obj[input]) {
            return !!(obj && obj[input] && obj[input].value && obj[input].value.length && obj[input].value.length > len);
        }
        return false;
    }
    static qrcode (config) {
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
            width : config.width,
            height: config.height,
            correctLevel: 0,
            text: mobile_url2
        });
    }

    /**
     * 回到顶部
     * @param id
     */
    static gotop (id) {
        id = id || "index-scroll";
        var c = document.getElementById(id);
        var isie6 = (!(window && window.XMLHttpRequest));
        var top_onscroll = function () {
            var a = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            if (a > 0) {
                if (isie6) {
                    c.style.display = "none";
                    clearTimeout(window.show);
                    window.show = setTimeout(function () {
                        var d = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                        if (d > 0) {
                            c.style.display = "block";
                            c.style.top = (400 + d) + "px"
                        }
                    }, 320);
                } else {
                    c.style.display = "block";
                }
            } else {
                c.style.display = "none";
            }
        };
        var top_onload = function () {
            if (isie6) {
                c.style.position = "absolute";
            }
            window.onscroll = top_onscroll;
            top_onscroll();
        };
        if (window.attachEvent) {
            window.attachEvent("onload", top_onload);
        } else {
            window.addEventListener("load", top_onload, false);
        }
        document.getElementById(id).onclick = function () {
            window.scrollTo(0, 0);
        };
    }
    // $webp
    static eve_webp () {
        if (typeof $webp != "undefined" && $webp['replace']) {
            $webp.replace();
        }
    }
    // go_mobile
    static eve_gomobile () {
        if (typeof $sc != "undefined" && $sc['canonical_wap']) {
            this.uaredirect($sc.canonical_wap);
        }
    }

    /** 百度提交 */
    static eve_pushbaidu () {
        var bp = document.createElement('script');
        var curProtocol = window.location.protocol.split(':')[0];
        if (curProtocol === 'https') {
            bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
        } else {
            bp.src = 'http://push.zhanzhang.baidu.com/push.js';
        }
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(bp, s);
    }

    /** 统计 */
    static eve_stat () {
        /** 百度统计 */
        if (typeof $sc != "undefined" && $sc['stat'] && $sc['stat']['baidu']) {
            let _hmt = _hmt || [];
            (function () {
                let hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?" + $sc['stat']['baidu'];
                let s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(hm, s);
            })();
        }
        /** cnzz */
        if (typeof $sc != "undefined" && $sc['stat'] && $sc['stat']['cnzz']) {
            let cnzz_protocol = (("https:" === document.location.protocol) ? " https://" : " http://");
            document.write(unescape("%3Cspan id='cnzz_stat_icon_" + $sc['stat']['cnzz'] + "'%3E%3C/span%3E%3Cscript src='" +
                cnzz_protocol + "s11.cnzz.com/stat.php%3Fid%3D" + $sc['stat']['cnzz'] + "' type='text/javascript'%3E%3C/script%3E"));
        }
    }

    /** 显示二维码 */
    static eve_qrcode () {
        /** qrcode Float */
        if (typeof this.qrcode != "undefined" && this.qrcode) {
            try {
                this.qrcode({width: 120, height: 120});
            } catch (e) {}
        }
    }
}
