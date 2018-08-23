$(function(){
    let json = [
        { width: "300px", top: "20px", left: 0, opacity: "0.2", zIndex: 2 },
        { width: "300px", top: "20px", left: "560px", opacity: "0.2", zIndex: 2 },
        { width: "370px", top: "70px", left: "460px", opacity: "0.6", zIndex: 3 },
        { width: "440px", top: "110px", left: "210px", opacity: "0.9", zIndex: 4 },
        { width: "370px", top: "70px", left: "30px", opacity: "0.6", zIndex: 3 },
    ]

    let carrousel = $(".carrous img")
    let carrousFr = $(".carrous-fr");
    let carrousFl = $(".carrous-fl");
    let carrousTimer = "";

    carrousel.each(function (index) {
        $(this).css(json[index])
    })

    carrousTimer = setInterval(() => {
        changeCarrous()
    }, 1400)

    $(".carrous").mouseover(() => {
        carrousFr.css({ display: "block" });
        carrousFl.css({ display: "block" });

        clearInterval(carrousTimer)
    })

    $(".carrous").mouseout(() => {
        carrousFr.css({ display: "none" })
        carrousFl.css({ display: "none" })

        carrousTimer = setInterval(() => {
            changeCarrous()
        }, 1400)
    })

    carrousFr.click(changeCarrous)

    carrousFl.click(() => {
        json.push(json.shift());

        carrousel.each(function (index) {
            $(this).css(json[index])
        })
    })

    function changeCarrous() {
        json.unshift(json.pop());
        carrousel.each(function (index) {
            $(this).css(json[index])
        })
    }

})