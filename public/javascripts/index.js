
$(function () {

    (function () {
        let showImg = $(".show-img li");
        let showIco = $(".show-ico li")
        let imgWidth = showImg.width();
        let num = 0;

        showImg.eq(0).css({ left: 0 }).siblings().css({ left: imgWidth + "px" })

        setInterval(() => {
            showImg.eq(num).stop().animate({ left: imgWidth + "px" }, 1000);

            num++;
            if (num > showImg.length - 1) {
                num = 0
            }

            showImg.eq(num).css({ left: -imgWidth + "px" });
            showImg.eq(num).animate({ left: 0 }, 1000);

            showIco.eq(num).attr({ class: "active" }).siblings().attr({ class: "" });
        }, 2000)
    })()



    // 注册登录请求

    $(".register-btn").on("click", () => {

        let regForm = $(".register-form");

        $.ajax({
            type: "post",
            url: "api/user/register",
            data: {
                username: regForm.find("[name=username]").val(),
                password: regForm.find("[name=password]").val(),
                repassword: regForm.find("[name=repassword]").val(),
            },
            dataType: "json",
            success: function (data) {
                regForm.find("h2").text(data.message);

                if (data.code == 4) {
                    setTimeout(() => { window.location.href = "/login" }, 1000)
                }
            }
        })
    })




    $(".login-btn").on("click", () => {

        let regForm = $(".login-form");

        $.ajax({
            type: "post",
            url: "api/user/login",
            data: {
                username: regForm.find("[name=username]").val(),
                password: regForm.find("[name=password]").val(),
            },

            dataType: "json",
            success: function (data) {
                regForm.find("h2").text(data.message);

                if (data.code == 4) {
                    setTimeout(() => { window.location.href = "/" }, 1000)
                }
            }
        })
    })





    

})