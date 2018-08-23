
$(function () {


    $(".waterfall").css({ height: $(".water-box").last().offset().top })

    function waterFuc() {

        let waterBox = $(".water-box");
        let waterBoxWidth = waterBox.eq(0).outerWidth();

        let waterFallWidth = $(".waterfall").width();
        let colo = parseInt(waterFallWidth / waterBoxWidth);

        $(".water-main").width(colo * waterBoxWidth);

        let heightAll = [], minHeight, minIndex;

        waterBox.each(function (i) {
            let waterHeight = $(this).outerHeight();

            if (i < colo) {
                heightAll.push(waterHeight)
                $(this).css({ float: "left", position: "static" })

            } else {
                minHeight = Math.min.apply(this, heightAll);
                minIndex = heightAll.indexOf(minHeight);

                $(this).css({ position: "absolute" });
                $(this).css({ left: minIndex * waterBoxWidth + "PX", top: minHeight + "PX" });
                heightAll[minIndex] += waterHeight
            }
        })
    }


    waterFuc();

    $(window).resize(function () {
        waterFuc()
    })



    let waterPic = [
        { src: "/images/water1.JPG " },
        { src: "/images/water2.JPG " },
        { src: "/images/water3.JPG " },
        { src: "/images/water4.JPG " },
        { src: "/images/water5.JPG " },
        { src: "/images/water6.JPG " },
        { src: "/images/water7.JPG " },
        { src: "/images/water8.JPG " },
        { src: "/images/water9.JPG " },
        { src: "/images/water10.JPG " },
        { src: "/images/water11.JPG " },
        { src: "/images/water12.JPG " },
        { src: "/images/water13.JPG " },
        { src: "/images/water14.JPG " },
        { src: "/images/water15.JPG " },
        { src: "/images/water16.JPG " },
        { src: "/images/water17.JPG " },
        { src: "/images/water18.JPG " },
        { src: "/images/water19.JPG " },
        { src: "/images/water20.JPG " },
        { src: "/images/water21.JPG " },
        { src: "/images/water22.JPG " },
        { src: "/images/water23.JPG " },
        { src: "/images/water24.JPG " },

    ]



    $(window).scroll(function () {

        setTimeout(() => {
            let lastBox = $(".water-box").last();
            let lastHeight = lastBox.offset().top + lastBox.height() * 0.7
            let screenH = $(window).height() + $(window).scrollTop();

            $(".waterfall").height(lastHeight);
            $("footer").css({ top: lastHeight });

            if (lastHeight <= screenH) {

                $.each(waterPic, function (i) {
                    let newPic = $("<img></img>").attr({ src: this.src })

                    let newImg = $("<div></div>").attr({ class: "water-img" })
                    let newBox = $("<div></div>").attr({ class: "water-box" })

                    newImg.append(newPic);
                    newBox.append(newImg);
                    $(".water-main").append(newBox)

                    waterFuc()
                })
            }
        }, 1000)
    })



})