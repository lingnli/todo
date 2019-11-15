//設定todo資料庫儲存內容
const mongoose = require("mongoose");
//Mongoose 是一個 schema-based 的 ODM
const Schema = mongoose.Schema;

const todoschema = new Schema({
  name: {
    type: String, //name型態
    required: true //是否必須
  },
  done: {
    //新增一個判斷是否完成的checkbox
    type: Boolean,
    default: false //預設值為false 未完成
  }
  //todo model中每筆資料型態為object，內容含name
});

//將todo輸出為Todo(資料庫慣例為大寫開頭)
module.exports = mongoose.model("Todo", todoschema);
