//
define([], function () {
    return {
        player_tt:function() {
            var uname = $('#uname').val();
            $.ajax({
                type: "POST",
                url: "/cp/User/Ajax?",
                data: "uname=" + uname + "&act=first",
                success: function (data) {
                    //alert(data);
                    if ('a' !== data) {
                        $("#uid").val(data);
                    }
                }
            });
        },
        players:function () {
            var uid = $('#uid').val();
            $.ajax({
                type: "POST",
                url: "/cp/User/Ajax?",
                data: "uid=" + uid + "&act=second",
                success: function (data) {
                    if ('a' !== data) {
                        $("#uname").val(data);
                    }
                }
            });
        },

        clanid:function () {
            var clan_name = $('#clan_name').val();
            $.ajax({
                type: "POST",
                url: "/cp/User/Ajax?",
                data: "clan_name=" + clan_name + "&act=third",
                success: function (data) {
                    //alert(data);
                    if ('a' !== data) {
                        $("#clan_id").val(data);
                    }
                }
            });
        },

        clanname:function () {
            var clan_id = $('#clan_id').val();
            $.ajax({
                type: "POST",
                url: "/cp/User/Ajax?",
                data: "clan_id=" + clan_id + "&act=fourth",
                success: function (data) {
                    //alert(data);
                    if ('a' !== data) {
                        $("#clan_name").val(data);
                    }
                }
            });
        }
    };
});
