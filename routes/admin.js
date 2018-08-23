
let express = require('express');
let router = express.Router();
let blogUser = require("../models/user");
let Category = require("../models/category");
let Content = require("../models/content");
let Markdown = require("markdown").markdown;




router.use((req, res, next) => {
  if (!req.userInfo.isAdmin) {
    res.send("只有管理员才能进入该页面");
    return;
  }
  next()
})


//后台首页
router.get('/', function (req, res, next) {
  res.render('admin/admin'), { userInfo: req.userInfo }
});




// 用户首页

router.get("/user", (req, res, next) => {

  let page = Number(req.query.page || 1);
  let pages = 0;
  let limit = 2;
  let skip = (page - 1) * limit;

  blogUser.countDocuments().then((count) => {
    pages = Math.ceil(count / limit);
    page = Math.min(page, pages);
    page = Math.max(page, 1)
    skip = (page - 1) * limit;
  })

  blogUser.find().limit(limit).skip(skip).then((users) => {
    res.render("admin/user", {
      userInfo: req.userInfo,
      users,
      page,
      pages,
    })

  })
})


// 分类首页

router.get("/category", (req, res, next) => {

  let page = Number(req.query.page || 1);
  let pages = 0;
  let limit = 7;
  let skip = (page - 1) * limit;

  Category.countDocuments().then((count) => {
    pages = Math.ceil(count / limit);
    page = Math.min(page, pages);
    page = Math.max(page, 1)
    skip = (page - 1) * limit;
  })

  Category.find().limit(limit).skip(skip).then((categorys) => {
    res.render("admin/category", {
      userInfo: req.userInfo,
      categorys,
      page,
      pages,
    })

  })
})


router.get("/category/add", (req, res, next) => {
  res.render("admin/category-add", {
    userInfo: req.userInfo,
  })
})


router.post("/category/add", (req, res, next) => {
  let name = req.body.name || "";
  if (name == "") {
    res.render('admin/category-add', {
      userInfo: req.userInfo,
      cateMessage: "分类名称不能为空"
    })
    return;
  }

  Category.findOne({ name: name }).then((data) => {
    if (data) {
      res.render('admin/category-add', {
        userInfo: req.userInfo,
        cateMessage: "分类名称已存在"
      })
      return Promise.reject();
    } else {

      return new Category({ name: name }).save()
    }
  }).then((newCate) => {
    res.render('admin/category-add', {
      userInfo: req.userInfo,
      cateMessage: "保存成功"
    })

  })
})


router.get("/category/edit", (req, res, next) => {
  let id = req.query.id || id;
  Category.findOne({ _id: id }).then((category) => {
    if (!category) {
      res.render("admin/category", {
        userInfo: req.userInfo,
        cateMessage: "分类信息不存在",
      })
      return Promise.reject()
    } else {
      res.render("admin/category-edit", {
        userInfo: req.userInfo,
        category,
      })
    }

  })
})


// 分类修改保存
router.post("/category/edit", (req, res, next) => {
  let id = req.query.id || id;
  let name = req.body.name;

  Category.findOne({ _id: id }).then((category) => {

    if (name == category.name) {
      res.render("admin/category-edit", {
        userInfo: req.userInfo,
        cateMessage: "修改成功",
      })
      return Promise.reject()

    } else {
      return Category.findOne({
        _id: { $ne: id },
        name: name
      })
    }
  }).then((somecategory) => {

    if (somecategory) {
      res.render("admin/category-edit", {
        userInfo: req.userInfo,
        cateMessage: "数据库中存在同名分类",
      })
      return Promise.reject()

    } else {
      return Category.update(
        { _id: id }, { name: name })
    }

  }).then(() => {
    res.render("admin/category", {
      userInfo: req.userInfo,
      cateMessage: "修改成功",
    })
  }).catch((error) => { throw error })
})




router.get("/category/delete", (req, res, next) => {
  let id = req.query.id || id;

  Category.remove({ _id: id }).then(() => {
    res.render("admin/category", {
      userInfo: req.userInfo,
      cateMessage: "删除成功",
    })
  })
})




// 内容首页

router.get("/content", (req, res, next) => {
  let page = Number(req.query.page || 1);
  let pages = 0;
  let limit = 7;
  let skip = (page - 1) * limit;

  Content.countDocuments().then((count) => {
    pages = Math.ceil(count / limit);
    page = Math.min(page, pages);
    page = Math.max(page, 1)
    skip = (page - 1) * limit;
  })

  Content.find().sort({_id:-1}).limit(limit).skip(skip).populate("category").then((contents) => {
    res.render("admin/content", {
      userInfo: req.userInfo,
      contents,
      page,
      pages,
    })

  })
})


router.get("/content/add", (req, res, next) => {

  Category.find({}).then((categories) => {
    res.render("admin/content-add", {
      userInfo: req.userInfo,
      categories,
    })
  })
})


// 内容保存
router.post("/content/add", (req, res, next) => {
  let title = req.body.title || "";
  let markContent = Markdown.toHTML(req.body.content);

  if (title == "" || markContent == "") {
    res.render("admin/content-add", {
      userInfo: req.userInfo,
      contentMessage: "标题内容不能为空"
    })
    return
  }
  let contents = new Content({
    title: title,
    content: markContent,
    category: req.body.category,
  })

  contents.save().then((newcontent) => {
    console.log(newcontent)
    res.render("admin/content", {
      userInfo: req.userInfo,
      contentMessage: "添加成功"
    })

  }).catch((error) => { throw error })
})


//内容编辑
router.get("/content/edit", (req, res, next) => {
  let id = req.query.id || id;
  let categories = [];

  Category.find({}).then((data) => {
    categories = data;
    return Content.findOne({ _id: id })

  }).then((content) => {
    if (!content) {
      res.render("admin/content", {
        userInfo: req.userInfo,
        // description: "内容不存在"
      })
    }
    res.render("admin/content-edit", {
      userInfo: req.userInfo,
      content,
      categories,
    })
  }).catch((error) => {
    throw error
  })

})


router.post("/content/edit", (req, res, next) => {

  let id = req.query.id || '';
  let title = req.body.title;
  let content = req.body.content;
  let category = req.body.category;

  if (title == "" || category == "") {
    res.render("admin/content", {
      userInfo: req.userInfo,
      message: "内容标题分类不能为空"
    })
    return;
  }

  Content.update({_id:id},{
    title:title,
    content:content,
    category:category,
  }).then(()=>{
    res.render("admin/content",{
      userInfo: req.userInfo,
      message:"修改成功"
    })
  })

})


router.get("/content/delete", (req, res, next) => {
  let id = req.query.id || id;

  Content.remove({ _id: id }).then(() => {
    res.render("admin/content", {
      userInfo: req.userInfo,
    })
  })
})


module.exports = router;
