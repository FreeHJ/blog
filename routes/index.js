
let express = require('express');
let router = express.Router();
let blogUser = require("../models/user");
let Category = require("../models/category");
let Content = require("../models/content")



let data;
router.use((req, res, next) => {
    data = {
        userInfo: req.userInfo,
        categories: []
    }
    Category.find({}).then((categories) => {
        data.categories = categories
    })
    next()
})



router.get('/', function (req, res, next) {
    res.render('home/index', { userInfo: req.userInfo });
});


// 登录注册

router.get('/login', function (req, res, next) {
    res.render('home/login', { userInfo: req.userInfo });
});


router.get('/register', function (req, res, next) {
    res.render('home/register', { userInfo: req.userInfo });
});


router.get('/exit', function (req, res, next) {
    res.render('/', { userInfo: req.userInfo });
});




// 项目案例

router.get('/map', function (req, res, next) {
    res.render('demo/map', { userInfo: req.userInfo });
});


router.get('/carrousel', function (req, res, next) {
    res.render('demo/carrousel', { userInfo: req.userInfo });
});


router.get('/waterfall', function (req, res, next) {
    res.render('demo/waterfall', { userInfo: req.userInfo });
});


router.get('/magnifier', function (req, res, next) {
    res.render('demo/magnifier', { userInfo: req.userInfo });
});


router.get('/progress', function (req, res, next) {
    res.render('demo/progress', { userInfo: req.userInfo });
});




// 前端笔记

router.get('/content', (req, res, next) => {

    data.pages = 0;
    data.limit = 2;
    data.page = req.query.page || 1;
    data.category = req.query.category || "";

    let where = {};
    if (data.category) {
        where.category = data.category
    }

    Content.where(where).countDocuments().then((count) => {
        data.pages = Math.ceil(count / data.limit);
        data.page = Math.min(data.page, data.pages);
        data.page = Math.max(data.page, 1);
        data.skip = (data.page - 1) * data.limit;

        return Content.where(where).find({}).limit(data.limit).skip(data.skip).populate("category")
    }).then((contents) => {
        data.contents = contents;
        res.render('home/content', data);

    }).catch((error) => {
        throw error
    })
})


router.get('/read', function (req, res, next) {
    let id = req.query.contentid || "";

    Content.findOne({ _id: id }).then((content) => {
     data.content=content;
     data.views++;
     content.save();
     res.render("home/read",data)
    })
})



// 评论处理
router.get("/comment", (req, res) => {
  let id = req.query.commentId;

  Content.findOne({ _id: id }).then((content) => {
    data.content = content;
    res.json(data)
  })
})


router.post("/comment/post", (req, res) => {
    let commentId = req.body.commentId;

    let postData = {
      username: req.userInfo,
      postTime: new Date(),
      comment: req.body.messComment,
    }
  
    Content.findOne({ _id: commentId }).then((content) => {
      content.comments.push(postData);
      return content.save()

    }).then((newContent) => {
      data.message = "评论成功",
       data.content = newContent,
        res.json(data)
        
    }).catch((error) => {
      throw error
    })
  })


module.exports = router;
