// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:"cw-6g9uc77g2c0f5bc8"
})

// 云函数入口函数
exports.main = async (event, context) => {
  //const wxContext = cloud.getWXContext()
   //拿到前端传过来的base64数据
  let {base64Data}=event;
  // console.log(base64Data)
  //因为fileContent只支持Buffer格式或者文件流
  return await cloud.uploadFile({
    cloudPath:"feeding_pic/"+Date.now()+'.png',
    fileContent:Buffer.from(base64Data,"base64"),
  })
}