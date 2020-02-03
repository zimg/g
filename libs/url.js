define([], function (){
    return {
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
    }
});
