$(function(){
    // 放大镜效果

    let magnSmall = $(".magn-small");
    let mangnBig = $(".magn-big");
    let mask = $(".mask");
    let magnList = $(".magn-list").find("li")

    magnSmall.mousemove(function (e) {

        let offsetX = e.clientX - magnSmall.offset().left - mask.width() * 0.5;
        let offsetY = e.clientY - magnSmall.offset().top - mask.height() * 0.5;

        let maxOffsetX = $(this).width() - mask.width();
        let maxOffsetY = $(this).height() - mask.height();

        if (offsetX <= 0) {
            offsetX = 0
        } else if (offsetX >= maxOffsetX) (
            offsetX = maxOffsetX
        )

        if (offsetY <= 0) {
            offsetY = 0
        } else if (offsetY >= maxOffsetY) {
            offsetY = maxOffsetY
        }

        mask.show();
        mask.css({ left: offsetX, top: offsetY });

        mangnBig.show();

        mangnBigX = -offsetX / ($(this).width() / mangnBig.width());
        mangnBigY = -offsetY / ($(this).height() / mangnBig.height());

        mangnBig.find("img").css({ left: mangnBigX })
        mangnBig.find("img").css({ top: mangnBigY })
    })

    magnSmall.mouseout(() => {
        mask.hide();
        mangnBig.hide();
    })

    magnList.click(function () {
        let magnIndex = $(this).index();
        magnSmall.find("img").attr({
            src: "/images/magni" + (magnIndex + 1) + ".jpg"
        })

        mangnBig.find("img").attr({
            src: "/images/magni" + (magnIndex + 1) + ".jpg"
        })

    })



})