var $sc = $sc || {};
var $aw = $aw || {};
var $utils = {
    /**
     * cookie
     * @param name
     * @param value
     * @param options
     * @return {string}
     */
    cookie:function (name, value, options) {
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
            var path = options.path ? '; path=' + options.path : '';
            var domain = options.domain ? '; domain=' + options.domain : '';
            var secure = options.secure ? '; secure' : '';
            document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
        } else { // only name given, get cookie
            var cookieValue = '';
            if (document.cookie && document.cookie !== '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = typeof jQuery != 'undefined' ? jQuery.trim(cookies[i]) : cookies[i].trim();
                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) === (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
    },

    /**
     * 浏览器版本信息
     */
    browser: function () {
        var u = window.navigator.userAgent.toLowerCase(),
            app = window.navigator.appVersion,
            language = (window.navigator.browserLanguage || window.navigator.language).toLowerCase();
        return {         // 移动终端浏览器版本信息
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
    }(),

    // web版在pc版 显示
    mobile_show_css:function(){
        var dom = document.getElementsByTagName('html')[0],
            pgw = dom.offsetWidth,em = (pgw > 640)?20:pgw/32,
            css = document.createElement('style');
        css.type="text/css";
        css.innerHTML = "html {font-size:"+em+"px}";
        document.getElementsByTagName('head')[0].appendChild(css);
        window.em_basic = em;
    },

    // ua redirect
    ua_redirect: function (mobile_url) {
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
    },
    // ad write
    aw: function (mode, size) {
        var str = 'name:' + mode + (size ? ' size:' + size : '');
        if ($aw && $aw[mode]) {
            str = $aw[mode];
        }else{
            var wh = size.split('*');
            var w  = wh[0];
            var h  = wh[1];
            str = '<div style="width:'+w+'px;height:'+h+'px;overflow:hidden;margin:auto;border:1px #f60 dashed;padding:20px 10px;text-align:center;">'+str+'</div>'
        }
        document.write(str);
    },
    search: function (obj, input, len) {
        input = input || 'q';
        len = len || 2;
        if (obj && obj[input]) {
            return !!(obj && obj[input] && obj[input].value && obj[input].value.length && obj[input].value.length > len);
        }
        return false;
    },

    /**
     * 回到顶部
     * @param id
     */
    go_top: function (id) {
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
    },

    // go_mobile
    eve_go_mobile: function () {
        if (typeof $sc != "undefined" && $sc['page_wap']) {
            this.ua_redirect($sc.page_wap);
        }
    },
    // 百度提交
    eve_push_baidu: function () {
        var bp = document.createElement('script');
        var curProtocol = window.location.protocol.split(':')[0];
        if (curProtocol === 'https') {
            bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
        } else {
            bp.src = 'http://push.zhanzhang.baidu.com/push.js';
        }
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(bp, s);
    },
    // 统计
    eve_stat: function () {
        // 百度统计
        if (typeof $sc != "undefined" && $sc['stat'] && $sc['stat']['baidu']) {
            var _hmt = _hmt || [];
            (function () {
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?" + $sc['stat']['baidu'];
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(hm, s);
            })();
        }
        // cnzz
        if (typeof $sc != "undefined" && $sc['stat'] && $sc['stat']['cnzz']) {
            var cnzz_protocol = (("https:" === document.location.protocol) ? " https://" : " http://");
            document.write(unescape("%3Cspan id='cnzz_stat_icon_" + $sc['stat']['cnzz'] + "'%3E%3C/span%3E%3Cscript src='" +
                cnzz_protocol + "s11.cnzz.com/stat.php%3Fid%3D" + $sc['stat']['cnzz'] + "' type='text/javascript'%3E%3C/script%3E"));
        }
    }
};
var $url = {
    time: function () {
        return Math.floor((new Date()).getTime() / 1000);
    },
    rand: function (begin, end) {
        if (typeof begin != 'undefined') {
            end = end ? end : 2147483648;
            return Math.floor(Math.random() * (end - begin) + begin);
        } else {
            return (new Date()).getTime();
        }
    },
    get: function (name) {
        var get = [location.search, location.hash].join('&');
        var start = get.indexOf(name + '=');
        if (start === -1) {
            return '';
        }
        var len = start + name.length + 1;
        var end = get.indexOf('&', len);
        if (end === -1) {
            end = get.length;
        }
        return decodeURIComponent(get.substring(len, end));
    },
    hash: function (datas) {
        var rs = [];
        for (var k in datas) {
            rs.push(k + '=' + encodeURIComponent(datas[k]));
        }
        window.location.hash = window.location.hash ? window.location.hash + rs.join('&') : rs.join('&');
    },
    encode: function (datas, url) {
        var rs = [];
        for (var k in datas) {
            rs.push(k + '=' + encodeURIComponent(datas[k]));
        }
        return (url ? url + (url.indexOf('?') === -1 ? '?' : '&') : '') + rs.join('&');
    },
    decode: function (str) {
        str = (str.indexOf('?') === -1 ? str : str.split("?")[1]).split("&");
        var rs = {}, a, c = str.length;
        for (var i = 0; i < c; i++) {
            a = str[i].split("=");
            rs[a[0]] = decodeURIComponent(a[1]);
        }
        return rs;
    },
    favorite:function(title,url){
        if(!title){
            title = document.title;
        }
        if(!url){
            url = window.location.href;
        }
        var ua = navigator.userAgent.toLowerCase();
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
};
