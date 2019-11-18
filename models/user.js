const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  date: {
    type: Date, //儲存資料的type為Date
    default: Date.now //預設為建立帳號當下的時間戳記
  }
});

module.exports = mongoose.model("User", userSchema);
