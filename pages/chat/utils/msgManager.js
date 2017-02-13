// utils/msgManager.js
var common = require('./common.js');

var __emojis = {//保存定义了的小表情
     "/::)": "qf000",
     "/::~": "qf001",
     "/::B": "qf002",
     "/::|": "qf003",
     "/:8-)": "qf004",
     "/::<": "qf005",
     "/::$": "qf006", //
     "/::X": "qf007",
     "/::Z": "qf008",
     "/::'(": "qf009",
     "/::-|": "qf010",
     "/::@": "qf011",
     "/::P": "qf012",
     "/::D": "qf013",
     "/::O": "qf014",
     "/::(": "qf015",
     "/::+": "qf016",
     "/:--b": "qf017",
     "/::Q": "qf018",
     "/::T": "qf019",
     "/:,@P": "qf020",
     "/:,@-D": "qf021",
     "/::d": "qf022",
     "/:,@o": "qf023",
     "/::g": "qf024",
     "/:|-)": "qf025",
     "/::!": "qf026",
     "/::L": "qf027",
     "/::>": "qf028",
     "/::,@": "qf029",
     "/:,@f": "qf030",
     "/::-S": "qf031",
     "/:?": "qf032",
     "/:,@x": "qf033",
     "/:,@@": "qf034",
     "/::8": "qf035",
     "/:,@!": "qf036",
     "/:!!!": "qf037",
     "/:xx": "qf038",
     "/:bye": "qf039",
     "/:wipe": "qf040",
     "/:dig": "qf041",
     "/:handclap": "qf042",
     "/:&-(": "qf043",
     "/:B-)": "qf044",
     "/:<@": "qf045",
     "/:@>": "qf046",
     "/::-O": "qf047",
     "/:>-|": "qf048",
     "/:P-(": "qf049",
     "/::'|": "qf050",
     "/:X-)": "qf051",
     "/::*": "qf052",
     "/:@x": "qf053",
     "/:8*": "qf054",
     "/:pd": "qf055",
     "/:<W>": "qf056",
     "/:beer": "qf057",
     "/:basketb": "qf058",
     "/:oo": "qf059",
     "/:coffee": "qf060",
     "/:eat": "qf061",
     "/:pig": "qf062",
     "/:rose": "qf063",
     "/:fade": "qf064",
     "/:showlove": "qf065",
     "/:heart": "qf066",
     "/:break": "qf067",
     "/:cake": "qf068",
     "/:li": "qf069",
     "/:bome": "qf070",
     "/:kn": "qf071",
     "/:footb": "qf072",
     "/:ladybug": "qf073",
     "/:shit": "qf074",
     "/:moon": "qf075",
     "/:sun": "qf076",
     "/:gift": "qf077",
     "/:hug": "qf078",
     "/:strong": "qf079",
     "/:weak": "qf080",
     "/:share": "qf081",
     "/:v": "qf082",
     "/:@)": "qf083",
     "/:jj": "qf084",
     "/:@@": "qf085",
     "/:bad": "qf086",
     "/:lvu": "qf087",
     "/:no": "qf088",
     "/:ok": "qf089",
     "/:love": "qf090",
     "/:<L>": "qf091",
     "/:jump": "qf092",
     "/:shake": "qf093",
     "/:<O>": "qf094",
     "/:circle": "qf095",
     "/:kotow": "qf096",
     "/:turn": "qf097",
     "/:skip": "qf098",
     "/:oY": "qf099",
     "/:#-0": "qf100",
     "/:hiphot": "qf101",
     "/:kiss": "qf102",
     "/:<&": "qf103",
     "/:&>": "qf104",
};

var __reg = "/::\\)|/::~|/::B|/::\\||/:8-\\)|/::<|/::\\$|/::X|/::Z|/::'\\(|/::-\\||/::@|/::P|/::D|/::O|/::\\(|/::\\+|/:--b|/::Q|/::T|/:,@P|/:,@-D|/::d|/:,@o|/::g|/:\\|-\\)|/::!|/::L|/::>|/::,@|/:,@f|/::-S|/:\\?|/:,@x|/:,@@|/::8|/:,@!|/:!!!|/:xx|/:bye|/:wipe|/:dig|/:handclap|/:&-\\(|/:B-\\)|/:<@|/:@>|/::-O|/:>-\\||/:P-\\(|/::'\\||/:X-\\)|/::\\*|/:@x|/:8\\*|/:pd|/:<W>|/:beer|/:basketb|/:oo|/:coffee|/:eat|/:pig|/:rose|/:fade|/:showlove|/:heart|/:break|/:cake|/:li|/:bome|/:kn|/:footb|/:ladybug|/:shit|/:moon|/:sun|/:gift|/:hug|/:strong|/:weak|/:share|/:v|/:@\\)|/:jj|/:@@|/:bad|/:lvu|/:no|/:ok|/:love|/:<L>|/:jump|/:shake|/:<O>|/:circle|/:kotow|/:turn|/:skip|/:oY|/:#-0|/:hiphot|/:kiss|/:<&|/:&>";//正则表达式配置

/**
 * text文本转emoji混排格式
 */
function transEmojiStr(str){
  var eReg = new RegExp(__reg, 'g');
  var array = str.split(eReg);
  var emojiObjs = [];
  var cur = 0;
  for(var i = 0; i < array.length; i++){
    var pat = eReg.exec(str);
    var ele = array[i];
    if (pat) {
      if (pat.index > cur) {
        emojiObjs.push({
            node: 'text',
            text: ele
        });
        emojiObjs.push({
            node: 'emoji',
            tag: pat[0],
            text: __emojis[pat[0]]
        });
        cur = pat.index + pat[0].length;
      } else {
        emojiObjs.push({
            node: 'emoji',
            tag: pat[0],
            text: __emojis[pat[0]]
        });
        emojiObjs.push({
            node: 'text',
            text: ele
        });
        cur = pat.index + pat[0].length + ele.length;
      }
    } else {
      emojiObjs.push({
          node: 'text',
          text: ele
      });
      cur += ele.length;
    }
  }
  if (cur < str.length) {
    var pat = eReg.exec(str);
    emojiObjs.push({
        node: 'emoji',
        tag: pat[0],
        text: __emojis[pat[0]]
    });
  }
  return emojiObjs;
}

/**
 * 消息类型
 */
var msgTypes = {
    'NULL': 0, // 空
    'TEXT': 1, // 文字
    'IMAGE': 2, // 图片
    'LOCATION': 3, // 地址
    'LINK': 4, // 链接
    'EVENT': 5, // 
    'VOICE': 6, // 语音
    'VIDEO': 7, // 视频
    'SHORT_VIDEO': 8, // 短视频
    'NEWS': 9, // 图文 包括单图文和多图文
    'MUSIC': 10, // 音乐
    'WXCS': 11, // 切换多客服
    'TEL': 14, // 邀请致电
    'RES': 20, // 
    'VS': 21, // 
    'APP_URL': 22, // 
    'COMMENT': 23, // 评价 只发送，不显示
    'NOTE': 24, // 留言 自发送，不显示
    'CONTROL': 25, // 控制 可用于转人工 只发送，不显示
    'MJSON': 26, //
    'TIP': 89 
};

/**
 * 获得文本消息对象
 */
function obtainTextMsg(content) {
    var msg = {
        o_type: 'message',
        direction: 1, // 发送消息
        message_type: 1,
        content: content,
        create_time: Math.floor(common.fStamp()/1000)
    };
    return msg;
}
/**
 * 获得图片消息对象
 */
function obtainImageMsg(url) {
    var msg = {
        o_type: 'message',
        direction: 1, // 发送消息
        message_type: 2,
        pic_url: url,
        create_time: Math.floor(common.fStamp()/1000)
    };
    return msg;
}
function getStatus() {
    return {
        o_type: 'session',
        o_method: 'get_status'
      };
}
function getMessages(offset, size) {
    return {
        o_type: 'session',
        o_method: 'get_messages',
        offset: offset,
        size: size
      };
}

/**
 * 收到消息的格式转换
 */
function fMsg(json) {
    try {
        var direction = parseInt(json.hasOwnProperty('direction') ? json.direction : json.dir);
        var ret = {
            id: json.message_id || (common.fStamp() + '_' + direction),
            wid: json.w_id,
            type: parseInt(json.message_type),
            time: common.fTime(common.fStamp(json.create_time || (void 0)), 'smart hh:mm:ss'), // 此形式提供的为北京时间
            stamp: common.fStamp(json.create_time || (void 0)),
            dir: direction,
            json: json.json || {}
        };

        if (json.candidate) {
            ret.robot = [];
            for (var i = 0, len = json.candidate.length; i < len; i++) {
                var rMsg = fMsg(json.candidate[i], true);
                rMsg && ret.robot.push(rMsg);
            }
        }

        switch (parseInt(json.message_type)) {
            case msgTypes.NULL:
                return null;
            case msgTypes.TEXT:
                var text = json.content || json.text_content;
                console.log('TEXT', text);//////
                ret.json = {
                    emojiArray: transEmojiStr(text),
                    text: text
                }
                break;
            case msgTypes.IMAGE:
                var d = json.json_content;
                if (d) {
                    common.fType(d) === 'string' && (d = JSON.parse(d));
                    ret.json = {
                        mid: d.media_id,
                        src: d.src || d.pic_url
                    }
                } else {
                    ret.json = {
                        src: json.src || json.pic_url,
                        mid: json.media_id
                    }
                }
                break;
            case msgTypes.LOCATION:
                var d = json.json_content;
                if (d) {
                    common.fType(d) === 'string' && (d = JSON.parse(d));
                    ret.json = {
                        lat: d.x,
                        lng: d.y,
                        label: d.label,
                        markers: [{latitude:d.x,longitude:d.y,title:d.label,iconPath:'./img/mapicon.png'}]
                    };
                } else {
                    ret.json = {
                        lat: json.x,
                        lng: json.y,
                        label: json.label,
                        markers: [{latitude:json.x,longitude:json.y,title:json.label,iconPath:'./img/mapicon.png'}]
                    }
                }
                break;
            case msgTypes.LINK:
                var d = json.json_content;
                if (d) {
                    common.fType(d) === 'string' && (d = JSON.parse(d));
                    ret.json = {
                        desc: d.description,
                        link: d.url,
                        name: d.title
                    };
                } else {
                    ret.json = {
                        desc: json.description,
                        link: json.url,
                        name: json.title
                    }
                }
                break;
            case msgTypes.EVENT:
                return null;
            case msgTypes.VOICE:
                var d = json.json_content;
                if (d && common.fType(d) === 'string') {
                    d = JSON.parse(d) || {};
                    // 如果没有AMR对象，加载文件
                    if (d.format === 'amr') {
                        // amr？
                    }
                    ret.json = {
                        src: json.src || d.url,
                        mirror: d.url || null,
                        mid: d.media_id,
                        format: d.format, // 音频文件格式 如amr
                        text: json.recognition
                    }
                } else {
                    ret.json = {
                        src: json.src || json.url,
                        mirror: json.url || null,
                        mid: json.media_id,
                        format: json.format, // 音频文件格式 如amr
                        text: json.recognition
                    }
                }
                break;
            case msgTypes.VIDEO:
                break;
            case msgTypes.SHORT_VIDEO:
                var d = json.json_content;
                if (d && common.fType(d) === 'string') {
                    d = JSON.parse(d) || {};
                    ret.json = {
                        src: json.src || d.url,
                        mirror: d.url || null,
                        mid: d.media_id,
                        format: d.format, // 音频文件格式 如amr
                        text: json.recognition
                    }
                } else {
                    ret.json = {
                        src: json.src || json.url,
                        mirror: json.url || null,
                        mid: json.media_id,
                        format: json.format, // 音频文件格式 如amr
                        text: json.recognition
                    }
                }
                break;
            case msgTypes.NEWS:
                var d = json.json_content, articles;
                if (d) {
                    common.fType(d) === 'string' && (d = JSON.parse(d));
                    articles = d.articles;
                } else if (json.articles) {
                    articles = json.articles;
                }
                if (articles && articles.length) {
                    if (articles.length > 1) {
                        ret.json = [];
                        for (var i = 0; i < articles.length; i++) {
                            var it = articles[i];
                            ret.json.push({
                                link: it.url,
                                name: it.title,
                                img: it.pic_url
                            });
                        }
                        // ret.json = articles.map(function(it, i) {
                        // 	return {
                        // 		link: it.url,
                        // 		name: it.title,
                        // 		img: it.pic_url
                        // 	};
                        // });
                    } else {
                        var it = articles[0];
                        ret.json = [{
                            name: it.title,
                            desc: it.description,
                            img: it.pic_url,
                            link: it.url
                        }]
                    }
                } else {
                    ret = null;
                }
                break;
            case msgTypes.MUSIC:
                ret.json = {
                    src: json.music_url,
                    hqsrc: json.hq_music_url,
                    name: json.title,
                    desc: json.description
                }
                break;
            case msgTypes.WXCS:
                return null;
            case msgTypes.TEL:
                var d = json.json_content;
                if (d && common.fType(d) === 'string') {
                    d = JSON.parse(d);
                    ret.json = {
                        num: d.called
                    };
                } else {
                    ret.json = {
                        num: json.called
                    };
                }
                break;
            case msgTypes.RES:
                return null;
            case msgTypes.VS:
                return null;
            case msgTypes.APP_URL:
                return null;
            case msgTypes.COMMENT:
                ret.json = json.unsend ? (void 0) : {
                    code: json.code
                };
                break;
            case msgTypes.NOTE:
                ret.json = json.unsend ? (void 0) : {
                    name: json.name || json.username,
                    phone: json.phone,
                    email: json.email,
                    qq: json.qq,
                    text: json.text,
                    address: json.address,
                    gender: json.gender
                };
                break;
            case msgTypes.CONTROL:
                if (json.code == 1) {
                    ret.type = msgTypes.TIP;
                    ret.json = {
                        text: '转人工客服'
                    }
                    return ret;
                }
                return null;
            case msgTypes.MJSON:
                return null;
            default:
                console.warn('无法处理的消息：message::' + json.message_type);
        }

        if (ret) {
            json.valid = true;
        } else {
            json.valid = false;

            console.error('fMsg: 不合法的消息结构');
        }
        console.log('fMsg:', {json:json, ret: ret});//////
        return ret;
    } catch (err) {
        console.error('fMsg', err);
    }
    return null;
}

/**
 * 发送消息格式转换
 * json: {
 *  id
 *  dir
 *  type
 *  stamp
 *  json: {text|src,mid|format,src,mid|src,name,desc|lat,lng,label|code|code,argc,argv}
 * }
 */
function pMsg(json) {
    var msg = {
        o_type: 'message',
        direction: 1, // 发送消息
        message_type: json.type,
        create_time: Math.floor(common.fStamp(json.stamp || (void 0))/1000)
    }, type = json.type;
    json = json.json;
    switch(type) {
        case msgTypes.TEXT:
            msg.content = json.text;
            break;
        case msgTypes.IMAGE:
            msg.pic_url = json.src;
            msg.title = json.name;
            json.mid && (msg.media_id = json.mid);
            break;
        case msgTypes.NEWS: //暂不支持
            if (!('length' in json)) {
                json = [json];
            }
            msg.articles = json.each(function(i, it){
                return {
                    title: it.name,
                    pic_url: it.img,
                    description: it.desc,
                    url: it.link
                };
            });
            // msg.articles = json.map((it, i) => ({
            // 	title: it.name,
            // 	pic_url: it.img,
            // 	description: it.desc,
            // 	url: it.link
            // }));
            break;
        case msgTypes.VOICE:
            msg.url = json.src;
            json.format && (msg.format = json.format);
            json.mid && (msg.media_id = json.mid);
            msg.title = json.name;
            break;
        case msgTypes.MUSIC: //暂不支持
            msg.music_url = json.src;
            msg.hq_music_url = json.src;
            msg.title = json.name;
            msg.description = json.desc;
            break;
        case msgTypes.LOCATION:
            msg.x = parseFloat(json.lat);
            msg.y = parseFloat(json.lng);
            msg.label = parseInt(json.label);
            break;
        case msgTypes.COMMENT:
            msg.code = json.code;
            break;
        case msgTypes.NOTE:
            msg = Object.assign({}, msg, json);
            break;
        case msgTypes.CONTROL:
            msg.code = json.code;
            json.argc && (msg.argc = json.argc);
            json.argv && (msg.argv = json.argv);
            break;
        default:
            console.warn('无法处理的消息类型：' + msg.message_type);
            return null;
    }
    return msg;
}

module.exports= {
    msgTypes: msgTypes,
    fMsg: fMsg,
    pMsg: pMsg,
    obtainTextMsg: obtainTextMsg,
    obtainImageMsg: obtainImageMsg,
    getStatus: getStatus,
    getMessages: getMessages
}