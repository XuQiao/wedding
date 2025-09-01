const sha1 = require('sha1');

// 注意：这里从环境变量读取，避免代码泄露密钥！
const {APP_ID, APP_SECRET} = window._wechatConfig;

console.log(APP_ID)
// 全局缓存变量（云函数实例复用，缓存有效）
let cachedAccessToken = null;
let cachedJsApiTicket = null;
let tokenExpiresTime = 0;
let ticketExpiresTime = 0;

async function getAccessToken() {
  const now = Date.now();
  if (cachedAccessToken && now < tokenExpiresTime - 5 * 60 * 1000) {
    return cachedAccessToken;
  }
  const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APP_ID}&secret=${APP_SECRET}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.errcode) {
    throw new Error(`获取access_token失败: ${data.errmsg}`);
  }
  cachedAccessToken = data.access_token;
  tokenExpiresTime = now + data.expires_in * 1000;
  return cachedAccessToken;
}

async function getJsApiTicket() {
  const now = Date.now();
  if (cachedJsApiTicket && now < ticketExpiresTime - 5 * 60 * 1000) {
    return cachedJsApiTicket;
  }
  const accessToken = await getAccessToken();
  const url = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${accessToken}&type=jsapi`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.errcode !== 0) {
    throw new Error(`获取jsapi_ticket失败: ${data.errmsg}`);
  }
  cachedJsApiTicket = data.ticket;
  ticketExpiresTime = now + data.expires_in * 1000;
  return cachedJsApiTicket;
}

function createNonceStr() {
  return Math.random().toString(36).substr(2, 15);
}

document.addEventListener('DOMContentLoaded', function() {

    const headers = {
        'Access-Control-Allow-Origin': '*', // 允许你的GitHub Pages域名访问，也可以指定为'https://yourgithubname.github.io'
        'Access-Control-Allow-Headers': 'content-type',
        'Content-Type': 'application/json'
    };


    try {
        const jsapiTicket = getJsApiTicket();
        const nonceStr = createNonceStr();
        const timestamp = Math.floor(Date.now() / 1000);
        const string1 = `jsapi_ticket=${jsapiTicket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${url}`;
        const signature = sha1(string1);

        response = {
            statusCode: 200,
            headers,
            body: JSON.stringify({
            appId: APP_ID,
            timestamp: timestamp,
            nonceStr: nonceStr,
            signature: signature
            })
        };
    } catch (error) {
        return { statusCode: 500, headers, body: JSON.stringify({ error: 'Server Error', details: error.message }) };
    }

    var data = response.data;

    wx.config({
        debug: false, // 上线时改为false
        appId: data.appId,
        timestamp: data.timestamp,
        nonceStr: data.nonceStr,
        signature: data.signature,
        jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData']
    });

    wx.ready(function () {
        // 自定义“分享给朋友”及“分享到QQ”
        wx.updateAppMessageShareData({
            title: '徐峤与曹怡琳的森林派对 - 婚礼邀请', // 分享标题
            desc: '诚挚邀请您于2025年10月19日来见证我们的幸福时刻', // 分享描述
            link: window.location.href, // 分享链接
            imgUrl: 'https://www.qiaoandyilin.site/images/weixin-share-thumbnail.jpg', // 分享图标（300x300像素为宜）
            success: function () {
                // 设置成功
            }
        });

        // 自定义“分享到朋友圈”及“分享到QQ空间”
        wx.updateTimelineShareData({
            title: '来参加徐峤与曹怡琳的婚礼吧！', // 朋友圈分享只显示标题
            link: window.location.href,
            imgUrl: 'https://www.qiaoandyilin.site/images/weixin-share-thumbnail.jpg',
            success: function () {
                // 设置成功
            }
        });
    });
});