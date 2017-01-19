//index.js
//获取应用实例
var app = getApp()
Page({
  timer:0,
  data: {
    motto: '00:00',
    userInfo: {}
  },
  startChat: function() {
    wx.navigateTo({
      url: '../chat/chat?site=105723&oid=abcdefghijklmnopqrstuvwxyz&nickname='+this.data.userInfo.nickname+'&photo='+this.data.userInfo.avatarUrl+'&human=false&magic=[{"key":"会员等级","val":"VIP3"}]'
    });
  },
  onLoad: function () {
    console.log('onLoad');//////
    // this.startChat();

    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      console.log({'userinfo': userInfo});//////
      //更新数据
      that.setData({
        motto: '25:00',
        userInfo:userInfo
      })
    });
    wx.login({
      success: function(res){
        // success
        console.log({'login': res});//////
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    });

    var maxtime = 25*60; //1小时，按秒计算     
    that.timer = setInterval(function(){
      if(maxtime >= 0){   
        var minutes = Math.floor(maxtime/60);   
        var seconds = Math.floor(maxtime%60);   
        that.setData({
          motto: (minutes < 10 ? '0'+minutes : minutes)+':'+(seconds < 10 ? '0'+seconds : seconds)
        });
        --maxtime;
      } else {   
        clearInterval(that.timer);
        that.setData({
          motto: '预览时间结束'
        });
      }
    }, 1000);
  } 
})
