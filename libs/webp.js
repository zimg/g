define(['libs/', 'moduleB', 'moduleC'], function (moduleA, moduleB, moduleC){

    var _check = -1;

    /**
     * 是否支持 webp
     * @returns {boolean}
     */
    function check () {
        if (this._check === false || this._check === true) {
            return this._check;
        } else {
            if ($cookie('_sp_webp') === 'ok') {
                this._check = true;
            } else {
                try {
                    this._check = (document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0);
                    $cookie('_sp_webp', 'ok');
                } catch (err) {
                    this._check = false;
                }
            }
            return this._check;
        }
    }


    /**
     * 全站 对不支持的 图片src进行替换
     * */
    function replace() {
        if (!this.check()) {
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
            if (!this.check()) {
                return url.replace(/(\!.*)w$/, '$1');
            } else {
                return url;
            }
        } catch (err) {
            return url;
        }
    }

    return {
        // $webp
        eve_webp: function () {
            if (typeof replace  == "undefined" && typeof replace  == "function") {
                replace();
            }
        }
    }
});
