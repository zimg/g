var $_el_container_open = $_el_container_open || '#cpcontainer .open';
layui.use('layer', function () {
    // 独立版的layer无需执行这一句
    var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
    // 触发事件
    var active = {
        seting: function (othis) {
            var url = othis.attr("href") || othis.data('url'),
                name = othis.data('name'),
                key_id = othis.data('key'),
                that = this;
            console.log([othis.data('url'), othis.attr("href")]);
            layer.open({
                type: 2 //此处以iframe举例
                , title: name, area: ['80%', '70%'], shade: 0, id: key_id, content: url, btn: ['关闭']
                , yes: function (index) {
                    layer.close(index);
                    window.location.reload();
                } // yes
                , cancel: function () {
                    window.location.reload();
                } // cancel
            });
        }
        , confirm_del: function (othis) {
            var url = othis.attr("href"), name = othis.data('name'), key_id = othis.data('key'), that = this;
            layer.confirm('提示:删除将无法恢复!你确认要删除吗?', {icon: 2, title: '提示:' + name}
                , function (index) {
                    layer.close(index);
                    window.location.href = url;
                } // yes
                , function (index) {
                });  // cancel
        }
        , config_list: function (othis) {
        }
    };

    $($_el_container_open).on('click', function () {
        var othis = $(this), method = othis.data('method');
        active[method] ? active[method].call(this, othis) : '';
        return false;
    });
});
