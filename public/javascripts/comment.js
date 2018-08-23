

$(function () {


    

    let page = 1;
    let pages = 0;
    let limit = 4;
    let comments = [];

    $(".comBtn").on("click", function () {
        if($("#messComment").val()!=""){
            $.ajax({
                type: "post",
                url: "/comment/post",
                data: {
                    messComment: $("#messComment").val(),
                    commentId: $("#commentId").val(),
                },
                dataType: "json",
                success: function (resData) {
                    $("#messComment").val("");
                    comments = resData.content.comments.reverse();
                    console.log(comments)
                    readComment();
                }
            })
        }
       
    })

//页面重载时候获取评论
    $.ajax({
        type: "get",
        url: "/comment/",
        data: {
            commentId: $("#commentId").val(),
        },
        dataType: "json",
        success: function (resData) {
            $("#messComment").val("") ;
            comments = resData.content.comments.reverse();
            readComment();
        }
    })


    $(".page").delegate("a", "click", function () {
        if ($(this).parent().hasClass("page-fl")) {
            page --
        } else {
            page ++
        }
        console.log(page)
        readComment()
    })


    function readComment() {
        pages = Math.max(Math.ceil(comments.length / limit), 1);

        $(".page-center").html(page + "/" + pages);

        let start = Math.max(0, (page - 1) * limit);
        let end = Math.min(start + limit, comments.length);
        console.log(start ,end)

        if (page <= 1) {
            page = 1;
            $(".page-fl").html("<span>没有上一页</span>")
        }else{
            $(".page-fl").html( "<a href='#'>上一页</a>")
        }

        if (page > pages) {
            page = pages;
            $(".page-fr").html("<span>没有下一页</span>")
        }
        if (comments.length == 0) {
            $(".comlist").html("<div class='comBox'>还没有评论</div>")
        } else {
            let html = '';
            for (var i = start; i < end; i++) {
                html += `<li>  <p class='comDate'> ${forDate(comments[i].postTime)}</p>
                          <p class="newCom">${comments[i].comment}</p>
                        </li>
                `
            }
            $(".comlist").html(html)
        }
    }

    function forDate(d) {
        let date = new Date();
        return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
    }

    let newText = $(".read-content").text().replace(/\n|\r/g, "</br>").replace(/\s/g, "&nbsp");
    $(".read-content").html(newText)

})