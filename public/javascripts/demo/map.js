$(function(){
    // 无缝轮播图

    let num = 0;
    let timer = null;
    let map = $(".map")
    let mapImg = $(".map-img li");
    let mapWidth = mapImg.width();
    let mapIco = $(".map-ico li");

    mapImg.eq(0).css({ left: 0 }).siblings().css({ left: mapWidth + "px" })



    mapIco.click(function () {

        let index = $(this).index()
        if (index > num) {

            mapImg.eq(num).stop().animate({ left: mapWidth + "px" }, 1000);
            mapImg.eq(index).css({ left: -mapWidth + "px" })

        } else {
            mapImg.eq(num).stop().animate({ left: -mapWidth + "px" }, 1000);
            mapImg.eq(index).css({ left: mapWidth + "px" });

        }
        num = index
        mapImg.eq(index).stop().animate({ left: 0 }, 1000);
        mapIco.eq(num).attr({ class: "active" }).siblings().attr({ class: "" })
    })



    $(".lcontrol").mousedown(subShow)

    $(".rcontrol").mousedown(addShow)



    function addShow() {
        mapImg.eq(num).stop().animate({ left: mapWidth + "px" }, 1000)
        num++;

        if (num > mapImg.length - 1) {
            num = 0
        }
        mapImg.eq(num).css({ left: -mapWidth + "px" });
        mapImg.eq(num).stop().animate({ left: 0 }, 1000);

        mapIco.eq(num).attr({ class: "active" }).siblings().attr({ class: "" })

    }

    function subShow() {
        mapImg.eq(num).stop().animate({ left: -mapWidth + "px" }, 1000)
        num--;

        if (num < 0) {
            num = mapImg.length - 1
        }
        mapImg.eq(num).css({ left: mapWidth + "px" });
        mapImg.eq(num).stop().animate({ left: 0 }, 1000);

        mapIco.eq(num).attr({ class: "active" }).siblings().attr({ class: "" })

    }



    timer = setInterval(addShow, 2000)


    let lControl = $(".lcontrol")
    let rControl = $(".rcontrol")

    map.mouseover(() => {
        clearInterval(timer);
        lControl.css({ display: "block" })
        rControl.css({ display: "block" })

    })
    map.mouseout(() => {
        timer = setInterval(addShow, 2000)
        lControl.css({ display: "none" })
        rControl.css({ display: "none" })

    })

})