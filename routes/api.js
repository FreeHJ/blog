
let express = require('express');
let router = express.Router();

let blogUser = require("../models/user")


let resData;
router.use((req, res, next) => {
  resData = {
    code: 0,
    message: ""
  }
  next()
})


// 注册逻辑
router.post("/user/register", (req, res, next) => {

  let username = req.body.username;
  let password = req.body.password;
  let repassword = req.body.repassword;

  if (username == "" || password == "") {
    resData.code = 1;
    resData.message = "用户名和密码不能为空";
    res.json(resData);
    return;
  }
  if (password !== repassword) {
    resData.code = 2;
    resData.message = "两次输入密码不一致";
    res.json(resData)
    return;
  }


  blogUser.findOne({
    "username": username,
  }).then((userInfo) => {

    if (userInfo) {
      resData.code = 3;
      resData.message = "用户名已存在";
      res.json(resData);
      return;
    }

    let user = new blogUser({
      username: username,
      password,
    })
    return user.save()

  }).then((newUser) => {

    resData.code = 4;
    resData.message = "注册成功";
    res.json(resData)
    return;
  }).catch((err) => { })

  return
})




// 登录逻辑
router.post("/user/login", (req, res, next) => {

  let username = req.body.username;
  let password = req.body.password;

  if (username == "" || password == "") {
    resData.code = 1;
    resData.message = "用户名和密码不能为空";
    res.json(resData);
    return;
  }


  blogUser.findOne({
    "username": username,
    "password": password
  }).then((userInfo) => {

    if (!userInfo) {
      resData.code = 3;
      resData.message = "用户名或密码错误";
      res.json(resData);
      return;
    }

    resData.code = 4;
    resData.message = "登录成功";

    resData.userInfo = {
      _id: userInfo._id,
      username: userInfo.username,
      isAdmin: userInfo.isAdmin
    }

    res.cookie("userInfo", resData.userInfo, { maxAge: 1000 * 60 * 60 })

    res.json(resData)
    return;
  }).catch((err) => { })

  return
})


//退出
router.get("/user/exit", (req, res) => {
  resData.message = "退出成功";

  res.clearCookie("userInfo")
  res.render("home/index", )
})


module.exports = router;
