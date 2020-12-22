// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();

// xml 型式類別検索API v1
app.get('/api/catalogmaster.jsp', (req, res) => {
  
  // URLパラメータ取得
  var param_user_key       = req.query.user_key;
  var param_katasikisitei  = req.query.katasikisitei;
  var param_ruibetukubun   = req.query.ruibetukubun;

  res.type('application/xml');
  
  if (param_user_key       == undefined || 
      param_katasikisitei  == undefined ||
      param_ruibetukubun   == undefined )
  {
      // URLパラメータエラー
      // error
      // その他のエラーのケース
      res.send(error_500);
      return;
  }
  else if (param_katasikisitei == "1")
  {
      // error
      // ユーザーキーが合わないケース
      res.send(error_401);
      return;
  }
  else if (param_katasikisitei == "2")
  {
      // error
      // 呼び出し側IPアドレスが合わないケース
      res.send(error_403);
      return;
  }
  else if (param_katasikisitei == "3")
  {
      // error
      // 型式指定、類別番号が不正のケース
      res.send(error_412);
      return;
  }
  else if (param_katasikisitei == "4")
  {
      // error
      // その他のエラーのケース
      res.send(error_500);
      return;
  }
  else if (param_katasikisitei == "10")
  {
      // status ok 0件
      res.send(ok_200_0record);
      return;
  }
  else
  {
      // status ok 2件
      res.send(ok_200_2record);
      return;
  }
  // status ok 2件以外の項目は実際にどのような内容で返ってくるかは分からない
  // 項目<status>の内容で正常(200)かエラー(200以外)かを判断し、
  // 正常(200)の場合、<car_basic_information_total value="n" />の n値が0以下であれば
  // 該当データ無しという判断をする
});

// ポート3000でサーバを立てる
app.listen(3000, () => console.log('Listening on port 3000'));

const ok_200_2record = 
    '<?xml version="1.0" encoding="UTF-8"?>'
      + '<catalogmaster version="1.00">'
        + '<status>200</status>'
        + '<car_basic_information_total value="2" />'
          + '<car_basic_information no="1">'
            + '<country>日本</country>'
            + '<maker>ﾎﾝﾀﾞ</maker>'
            + '<keitou>2代目（UA4/5系）</keitou>'
            + '<car_name>ｾｲﾊﾞｰ</car_name>'
            + '<grade_name>ﾋｮｳｼﾞｭﾝ</grade_name>'
            + '<haikiryou>25</haikiryou>'
            + '<fuel>G</fuel>'
            + '<individual_items_total value="1" />'
              + '<individual_items no="1">'
                + '<catalog_management_key>ZARCXU</catalog_management_key>'
                + '<model_start_date>2001/04/20</model_start_date>'
                + '<model_end_date>2003/06/18</model_end_date>'
                + '<teiin>5</teiin>'
                + '<handle_position>R</handle_position>'
              + '</individual_items>'
          + '</car_basic_information>'
          + '<car_basic_information no="2">'
            + '<country>日本</country>'
            + '<maker>ﾎﾝﾀﾞ</maker>'
            + '<keitou>2代目（UA4/5系）</keitou>'
            + '<car_name>ｲﾝｽﾊﾟｲｱ</car_name>'
            + '<grade_name>ﾋｮｳｼﾞｭﾝ</grade_name>'
            + '<haikiryou>25</haikiryou>'
            + '<fuel>G</fuel>'
            + '<individual_items_total value="1" />'
              + '<individual_items no="1">'
                + '<catalog_management_key>ZAYZSU</catalog_management_key>'
                + '<model_start_date>2001/04/20</model_start_date>'
                + '<model_end_date>2003/06/18</model_end_date>'
                + '<teiin>5</teiin>'
                + '<handle_position>R</handle_position>'
              + '</individual_items>'
          + '</car_basic_information>'
      + '</catalogmaster>'
  ;
// ok_200_2record ここまで

const ok_200_0record =
      '<?xml version="1.0" encoding="UTF-8"?>'
      + '<catalogmaster version="1.00">'
        + '<status>200</status>'
        + '<car_basic_information_total value="0" />'
          + '<car_basic_information no="0">'
            + '<country></country>'
            + '<maker></maker>'
            + '<keitou></keitou>'
            + '<car_name></car_name>'
            + '<grade_name></grade_name>'
            + '<haikiryou></haikiryou>'
            + '<fuel></fuel>'
            + '<individual_items_total value="0" />'
              + '<individual_items no="0">'
                + '<catalog_management_key></catalog_management_key>'
                + '<model_start_date></model_start_date>'
                + '<model_end_date></model_end_date>'
                + '<teiin></teiin>'
                + '<handle_position></handle_position>'
              + '</individual_items>'
          + '</car_basic_information>'
      + '</catalogmaster>'
  ;
// ok_200_0record ここまで

const error_401 =
      '<?xml version="1.0" encoding="UTF-8"?>'
      + '<catalogmaster version="1.00">'
        + '<status>401</status>'
        + '<car_basic_information_total value="0" />'
          + '<car_basic_information no="0">'
            + '<country></country>'
            + '<maker></maker>'
            + '<keitou></keitou>'
            + '<car_name></car_name>'
            + '<grade_name></grade_name>'
            + '<haikiryou></haikiryou>'
            + '<fuel></fuel>'
            + '<individual_items_total value="0" />'
              + '<individual_items no="0">'
                + '<catalog_management_key></catalog_management_key>'
                + '<model_start_date></model_start_date>'
                + '<model_end_date></model_end_date>'
                + '<teiin></teiin>'
                + '<handle_position></handle_position>'
              + '</individual_items>'
          + '</car_basic_information>'
      + '</catalogmaster>'
  ;
// error_401 ここまで

const error_403 =
      '<?xml version="1.0" encoding="UTF-8"?>'
      + '<catalogmaster version="1.00">'
        + '<status>403</status>'
        + '<car_basic_information_total value="0" />'
          + '<car_basic_information no="0">'
            + '<country></country>'
            + '<maker></maker>'
            + '<keitou></keitou>'
            + '<car_name></car_name>'
            + '<grade_name></grade_name>'
            + '<haikiryou></haikiryou>'
            + '<fuel></fuel>'
            + '<individual_items_total value="0" />'
              + '<individual_items no="0">'
                + '<catalog_management_key></catalog_management_key>'
                + '<model_start_date></model_start_date>'
                + '<model_end_date></model_end_date>'
                + '<teiin></teiin>'
                + '<handle_position></handle_position>'
              + '</individual_items>'
          + '</car_basic_information>'
      + '</catalogmaster>'
  ;
// error_403 ここまで

const error_412 =
      '<?xml version="1.0" encoding="UTF-8"?>'
      + '<catalogmaster version="1.00">'
        + '<status>412</status>'
        + '<car_basic_information_total value="0" />'
          + '<car_basic_information no="0">'
            + '<country></country>'
            + '<maker></maker>'
            + '<keitou></keitou>'
            + '<car_name></car_name>'
            + '<grade_name></grade_name>'
            + '<haikiryou></haikiryou>'
            + '<fuel></fuel>'
            + '<individual_items_total value="0" />'
              + '<individual_items no="0">'
                + '<catalog_management_key></catalog_management_key>'
                + '<model_start_date></model_start_date>'
                + '<model_end_date></model_end_date>'
                + '<teiin></teiin>'
                + '<handle_position></handle_position>'
              + '</individual_items>'
          + '</car_basic_information>'
      + '</catalogmaster>'
  ;
// error_412 ここまで

const error_500 =
      '<?xml version="1.0" encoding="UTF-8"?>'
      + '<catalogmaster version="1.00">'
        + '<status>500</status>'
        + '<car_basic_information_total value="0" />'
          + '<car_basic_information no="0">'
            + '<country></country>'
            + '<maker></maker>'
            + '<keitou></keitou>'
            + '<car_name></car_name>'
            + '<grade_name></grade_name>'
            + '<haikiryou></haikiryou>'
            + '<fuel></fuel>'
            + '<individual_items_total value="0" />'
              + '<individual_items no="0">'
                + '<catalog_management_key></catalog_management_key>'
                + '<model_start_date></model_start_date>'
                + '<model_end_date></model_end_date>'
                + '<teiin></teiin>'
                + '<handle_position></handle_position>'
              + '</individual_items>'
          + '</car_basic_information>'
      + '</catalogmaster>'
  ;
// error_500 ここまで

;