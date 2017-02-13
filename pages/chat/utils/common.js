// utils/common.js
/**
 * 本地缓存
 */
function cache(name, value, rm) { // name: obj|arr|string, value: string|obj, rm: bool(with value = '')
    var res, key, i;
    if (typeof name === 'string') {
        rm && (value = void 0);
        value = ioCache(name, value);
        rm && rmCache(name);
        return value;
    } else if (_obj.isPlainObject(name)) {
        res = {};
        for (key in name) {
            rm && (name[key] = void 0);
            res[key] = ioCache(key, name[key]);
            rm && rmCache(key);
        }
        return res;
    } else if (Object.prototype.toString.call(name) === '[object Array]') {
        res = {};
        for (i = 0; i < name.length; i++) {
            res[name[i]] = ioCache(name[i]);
            rm && rmCache(name[i]);
        }
        return res;
    } else {
        throw new Error('无法处理的缓存名类型：' + name);
    }
}
function ioCache(name, value) {
    return Object.prototype.toString.call(value) !== '[object Undefined]' ? (wx.setStorageSync(name, value), value) : wx.getStorageSync(name);
}
function rmCache(name) {
    try {
        wx.removeStorageSync(name);
    } catch (e) {
        // Do something when catch error
    }
}
/**
 * 数字格式化
 *
 * 000.00000 表示整数部分至少三位小数部分五位
 * 必须指定小数点
 */
function fNumber(data, f) {
    if (/^[0\.]+$/.test(f)) {
        /\./.test(f) || (f += '.');
        f.replace(/^(0*)(\.)(0*)$/, function(f, inter, dot, deci) {
            // 四舍五入保留指定精度小数、转字符串
            data = parseFloat(data).toFixed(deci.length);
            // 补零
            var total = inter.length + (deci.length > 0 ? deci.length + 1 : 0);
            while (data.length < total) {
                data = '0' + data;
            }
        });
        return data;
    } else {
        console.warn('您指定了不规范的格式：' + f);
        return data;
    }
}

/**
 * 时间格式化 支持本地时间 不支持UTC时间
 * 
 * @param  {String || Timestamp} data 表示时间的数据
 * @param  {String} f    格式标示 ‘dur’ 125:06 时长
 * @return {String}      格式化后的时间
 */
function fTime(data, f) {
    if (/dur/.test(f)) {
        return Math.floor(data/60000) + ':' + Math.floor(data%60000/1000);
    }
    // 时间格式化函数
    var dt;
    if (typeof data === 'string' && /^\d{13}$/.test(data)) {
        dt = new Date(parseInt(data));
    } else {
        // 为了兼容IE，需要将2015-01-02变为2015/01/02
        dt = new Date(/-/.test(data) ? data.replace(/-/g, '/') : data);
    }
    if (dt.toJSON()) { // 如果是可用的时间对象
        if (/smart/.test(f)) {
            // smart
            f = f.replace(/smart/, function() {
                var stamp = dt.getTime(),
                    refer = new Date();
                // 今天
                refer.setHours(0);
                refer.setMinutes(0);
                refer.setSeconds(0);
                refer.setMilliseconds(0);
                if (stamp >= refer.getTime()) {
                    return '今天';
                }
                // 昨天
                refer.setDate(refer.getDate() - 1);
                if (stamp >= refer.getTime()) {
                    return '昨天';
                }
                // 今年
                refer.setDate(1);
                refer.setMonth(0);
                if (stamp >= refer.getTime()) {
                    return 'M月D日';
                }
                // 更早
                return 'Y年M月D日';
            });
        }
        return f.replace(/YYYY/, dt.getFullYear())
            .replace(/MM/, fNumber(dt.getMonth() + 1, '00'))
            .replace(/DD/, fNumber(dt.getDate(), '00'))
            .replace(/hh/, fNumber(dt.getHours(), '00'))
            .replace(/mm/, fNumber(dt.getMinutes(), '00'))
            .replace(/ss/, fNumber(dt.getSeconds(), '00'))
            .replace(/Y/, dt.getFullYear())
            .replace(/M/, dt.getMonth() + 1)
            .replace(/D/, dt.getDate())
            .replace(/h/, dt.getHours())
            .replace(/m/, dt.getMinutes())
            .replace(/s/, dt.getSeconds());
    } else {
        // 如果无法转化为时间对象，原样返回
        console.warn('不是可用的时间对象：' + data);
        return data;
    }
}

/**
 * 同Object.assign
 */
function assign(target) {
    if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object');
    }
    target = Object(target);
    for (var i = 1, len = arguments.length; i < len; i++) {
        var source = arguments[i];
        if (source != null) {
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    source[key] === void 0 || (target[key] = source[key]);
                }
            }
        }
    }
    return target;
}

/**
 * 获取对象类型
 */
function fType(obj) {
    // 处理 undefined null
    if (obj == null) {
        return obj + '';
    }
    // 处理 object (广义：包括函数、数组...)
    if (typeof obj === 'object' || typeof obj === 'function') {
        // Object.prototype.toString.call(obj)
        // 兼容所有
        // 返回 [object Xxxxx]
        // 其中Xxxxx取：Boolean Number String Function Array Date RegExp Object Error Symbol
        // HTMLDocument , HTMLBodyElement, HTMLDivElement,
        // 
        // 可以独立使用，注意：
        // - 字符串建议 typeof obj === 'string'
        // - DOM建议 obj.nodeType 为真
        var otype = Object.prototype.toString.call(obj).slice(8, -1);
        if (otype) {
            // 仅返回特定范围的值，其他的一律返回Object类型
            // 因为otype是内部产生，此处不需要太强的比对，单纯看是否存在即可
            if (!~('Boolean Number String Function Array Date RegExp Object Error Symbol').indexOf(otype)) {
                otype = 'Object';
            }
            return otype.toLowerCase();
        }
    }
    // 其他的类型：string ...
    return typeof obj;
}

/**
 * 时间戳
 */
function fStamp(date) {
    /undefined|null/.test(fType(date)) && (date = (new Date()).getTime());
    if (/^\d+$/.test(date)) {
        if (date < 10000000000) {
            return date * 1000;
        } else {
            return parseInt(date);
        }
    } else if (typeof date === 'string' &&
        (date = new Date(date.replace(/\-/g, '/'))) &&
        date.toJSON()) {
        return date.getTime();
    } else {
        //console.warn('无法处理的时间戳：' + date);
        return date;
    }
}

/**
 * wxAutoImageCal 计算宽高
 * 
 * 参数 e: iamge load函数的取得的值
 * 返回计算后的图片宽高
 * {
 *  imgW: 100px;
 *  imgH: 100px;
 * }
 */
function wxAutoImageCal(e, win){
    //获取图片的原始长宽
    var originalWidth = e.detail.width;
    var originalHeight = e.detail.height;
    var windowWidth = 0,windowHeight = 0;
    var autoWidth = 0,autoHeight = 0;
    var results= {};
    if (win) {
        windowWidth = win.windowWidth;
        windowHeight = win.windowHeight;
    } else {
        wx.getSystemInfo({
            success: function(res) {
                windowWidth = res.windowWidth;
                windowHeight = res.windowHeight;
            }
        });
    }
    console.log('wxAutoImageCal window:', {windowWidth:windowWidth, 
        windowHeight:windowHeight, 
        image:e.detail,
        min2:windowWidth*13/20
    });
    var maxW = windowWidth*13/20;
    //判断按照那种方式进行缩放
    if(originalWidth > maxW){//在图片width大于手机屏幕width时候
        autoWidth = maxW;
        autoHeight = (autoWidth*originalHeight)/originalWidth;
        results.imgW = autoWidth;
        results.imgH = autoHeight;
    } else if(originalWidth < 50) {// 最小大小约束
        autoWidth = 50;
        autoHeight = (autoWidth*originalHeight)/originalWidth;
        results.imgW = autoWidth;
        results.imgH = autoHeight;
    } else {//否则展示原来的数据
        results.imgW = originalWidth;
        results.imgH = originalHeight;
    }
    return results;
}

function httpsURL(url) {
    return url.replace(/http:\/\//g, 'https://');
}

function clearCacheOfSite(sid) {
    wx.clearStorageSync('v5_' + sid);
    wx.clearStorageSync('v5_hist_' + sid);
}

function clearHistOfSite(sid) {
    wx.clearStorageSync('v5_hist_' + sid);
}

module.exports = {
    cache: cache,
    fTime: fTime,
    assign: assign,
    fType: fType,
    fStamp: fStamp,
    wxAutoImageCal: wxAutoImageCal,
    httpsURL: httpsURL,
    clearCacheOfSite: clearCacheOfSite,
    clearHistOfSite: clearHistOfSite
}
module.exports.cache = cache;
module.exports.fTime = fTime;
module.exports.assign = assign;
module.exports.fType = fType;
module.exports.fStamp = fStamp;
module.exports.wxAutoImageCal = wxAutoImageCal;
module.exports.httpsURL = httpsURL;
