// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:"cw-6g9uc77g2c0f5bc8"
})
//连接数据库
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  //event就是客户端调用云函数传递的参数
  //data要插入数据库的数据
  let {data,collectionName}=event;

  return new Promise((resolve,reject)=>{
    db.collection(collectionName).add({
      data    
    }).then(res=>{
      resolve(res);
    }).catch(err=>{
      reject(err);
    })
  })

}