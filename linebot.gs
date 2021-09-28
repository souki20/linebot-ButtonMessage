var CHANNEL_ACCESS_TOKEN = "YOUR ACCESS TOKEN"; 

function doPost(e) {
  var contents = e.postData.contents;
  var obj = JSON.parse(contents);
  var events = obj["events"];
  for (var i = 0; i < events.length; i++) {
    if (events[i].type == "message") {
      reply_message(events[i]);
    } else if (events[i].type == "postback") {
      post_back(events[i]);
    }
  }
}

function reply_message(e) {
  var input_text = e.message.text;
  if (input_text == "ライフプラン（家計）") {
    var postData = {
      "replyToken": e.replyToken,
      "messages": [{
        "type": "template",
        "altText": "this is a buttons template",
        "template": {
            "type": "buttons",
            "thumbnailImageUrl": "https://1.bp.blogspot.com/-lntmGjyV1ik/WRkuqkBSHRI/AAAAAAABETM/hyLgXdrgYvEWL8NHa7nR6Fh0s8eEiZ3wwCLcB/s400/soudan_setsumei_business_old.png",
            "imageBackgroundColor": "#E1EEAD",
            "title": "ライフプラン（家計）",
            "text": "この中にお悩みの項目はありますか？",
            "actions": [
            {
                "type": "message",
                "label": "家計の見直しについて",
                "text": "家計の見直しについて"
            },
            {
                "type": "message",
                "label": "ライフプラン設計",
                "text": "ライフプラン設計"
            },
            {
                "type": "message",
                "label": "その他",
                "text": "その他"
            }
            ]
        }
      }]
    };
  } else if (input_text == "家計の見直しについて"){
      var postData = {
        "replyToken": e.replyToken, 
        "messages": [{
          "type": "template",
          "altText": "this is a buttons template",
          "template": {
            "type": "buttons",
            "thumbnailImageUrl": "https://1.bp.blogspot.com/-lntmGjyV1ik/WRkuqkBSHRI/AAAAAAABETM/hyLgXdrgYvEWL8NHa7nR6Fh0s8eEiZ3wwCLcB/s400/soudan_setsumei_business_old.png",
            "imageBackgroundColor": "#E1EEAD",
            "title": "家計の見直しについて",
            "text": "この中にお悩みの項目はありますか？",
            "actions": [
              {
                "type": "message",
                "label": "生活費の見直し",
                "text": "生活費の見直し"
              },
              {
                "type": "uri",
                "label": "保険の見直し",
                "uri": "https://fpcom.co.jp/topics/2021/08/16/保険の相談（新規加入・見直し）/"
              },
              {
                "type": "message",
                "label": "貯蓄・資産形成など",
                "text": "貯蓄・資産形成など"
              },
              {
                "type": "message",
                "label": "その他",
                "text": "その他"
              }
            ]
          }
        }]
      };
  } else {
    var postData = {
      "replyToken": e.replyToken, 
      "messages": [{
            "type": "template",
          "altText": "this is a buttons template",
          "template": {
            "type": "buttons",
            "thumbnailImageUrl": "https://1.bp.blogspot.com/-lntmGjyV1ik/WRkuqkBSHRI/AAAAAAABETM/hyLgXdrgYvEWL8NHa7nR6Fh0s8eEiZ3wwCLcB/s400/soudan_setsumei_business_old.png",
            "imageBackgroundColor": "#E1EEAD",
            "title": "お金のお悩み",
            "text": "この中にお悩みのキーワードはありますか？",
            "actions": [
              {
                "type": "message",
                "label": "ライフプラン（家計）",
                "text": "ライフプラン（家計）"
              },
              {
                "type": "message",
                "label": "保険について",
                "text": "保険について"
              },
              {
                "type": "message",
                "label": "将来のお金について",
                "text": "将来のお金について"
              },
              {
                "type": "message",
                "label": "その他",
                "text": "その他"
              }
            ]
          }
      }]
    };
  }
  fetch_data(postData);
}

function post_back(e) {
  var data = e.postback.data;
  var replay_text = "";
  if (data == "postback selected") {
    replay_text = data;
  } else if (data == "datetimepicker selected") {
    replay_text = data + "\n" + e.postback.params['datetime'];
  }

  var postData = {
    "replyToken": e.replyToken,
    "messages": [{
      "type": "text",
      "text": replay_text + "\n" + JSON.stringify(e.postback)
    }]
  };
  fetch_data(postData);
}

function fetch_data(postData) {
  var options = {
    "method": "post",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + CHANNEL_ACCESS_TOKEN
    },
    "payload": JSON.stringify(postData)
  };
  UrlFetchApp.fetch("https://api.line.me/v2/bot/message/reply", options);
}

