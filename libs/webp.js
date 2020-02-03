define([], function (){

    /**
     * 状态
     * @type {number}
     * @private
     */
    var _check = -1;

    /**
     * 是否支持 webp
     * @returns {boolean}
     */
    function check () {
        if (_check === 0 || _check === 1) {
            return _check;
        } else {
            if ($utils.cookie('_sp_webp') === 'ok') {
                _check = 1;
            } else {
                try {
                    _check = (document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0)?1:0;
                    $utils.cookie('_sp_webp', 'ok');
                } catch (err) {
                    _check = 0;
                }
            }
            return _check;
        }
    }


    /**
     * 全站 对不支持的 图片src进行替换
     */
    function replace() {
        if ( 0 === check()) {
            $('img').each(function () {
                var src = $(this).attr('src');
                if (typeof src != 'undefined') {
                    $(this).attr('src', src.replace(/(\!.*)w$/, '$1'));
                }
                // 针对用了懒加载的情况
                var osrc = $(this).attr('osrc');
                if (typeof osrc != 'undefined') {
                    $(this).attr('osrc', osrc.replace(/(\!.*)w$/, '$1'));
                }
            })
        }
    }

    /**
     * 对不支持的 图片src进行替换
     * @param url
     * @returns {string}
     */
    function src2jpg(url) {
        try {
            if ( 0 === check() ) {
                return url.replace(/(\!.*)w$/, '$1');
            } else {
                return url;
            }
        } catch (err) { return url; }
    }

    return {
        // $webp
        webp: function () {
            if (typeof replace  == "undefined" && typeof replace  == "function") {
                replace();
            }
        }
    }
});
