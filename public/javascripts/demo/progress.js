$(function () {
    //进度条控制

    let progControl = $(".prog-control");
    let progBox = $(".prog-box");

    let progWidth = $(".progress-main").outerWidth();

    // let allWidth = 0;

    // $.each($(".prog-box img"), function (i) {
    //     allWidth += $(this).outerWidth(true);
    // })
    // progBox.css({ width: allWidth});

    let scrollW = (progWidth / progBox.width()) * progWidth;
    progControl.css({ width: scrollW - 10 })

    progControl.mousedown(function (e) {
        $(window).mousemove(function (e) {
            let offsetX = e.clientX - $(".progress-main").offset().left - progControl.width() * 0.5;

            if (offsetX <= 0) {
                offsetX = 0
            } else if (offsetX >= progWidth - progControl.width()) {
                offsetX = progWidth - progControl.width()
            }

            let progContent = (progBox.width() - progWidth) / (progWidth - scrollW) * offsetX;

            progControl.css({ left: offsetX });
            progBox.css({ left: -progContent });
            return false;
        })

        $(window).mouseup(function (e) {
            $(window).off("mousemove")
        })
    })


})