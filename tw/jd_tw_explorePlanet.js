/*
    特务-空间站集卡
    不是日常活动，不要设置定时
    脚本没有助力（懒得写了。。。），没集齐的手动拉人吧
* */
const $ = new Env('特务-空间站集卡');
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
let cookiesArr = [];
if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item])
    })
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else {
    cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}
!(async () => {
    for (let i = 0; i < cookiesArr.length ; i++) {
        $.index = i+1;
        $.cookie = cookiesArr[i];
        $.userName = decodeURIComponent($.cookie.match(/pt_pin=(.+?);/) && $.cookie.match(/pt_pin=(.+?);/)[1]);
        console.log(`\n********开始【京东账号${$.index}】${$.userName}********\n`);
        await main(cookiesArr[i]);
    }

})().catch((e) => {$.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')}).finally(() => {$.done();})
async function main(cookie) {
    let ua =  getUA();
    let activityId = '';
    let mainInfo = await takePost(cookie,ua,'explorePlanet_homePage');
    if(mainInfo && mainInfo.result){
        mainInfo = mainInfo.result;
        activityId = mainInfo.activityId
        console.log(`获取活动成功,${mainInfo.activityName},activityId:${activityId}`);
    }else{
        console.log(`获取活动失败`);
        return ;
    }
    let cards = mainInfo.cards;
    for (let i = 0; i < cards.length; i++) {
        console.log(`卡片：${cards[i].cardName},isOpen:${cards[i].isOpen}`);
    }
    if(mainInfo.drawCardStatus === 8){
        console.log(`已开奖`);
        return ;
    }
    if(mainInfo.drawCardStatus === 7){
        console.log(`进行开奖`);
        let divideReward = await takePost(cookie,ua,'explorePlanet_divideReward',{"activityId":activityId});
        if(divideReward && divideReward.result){
            console.log(`瓜分获得:${divideReward.result.discount}`);
        }
        console.log(JSON.stringify(divideReward));
        return ;
    }
    if(mainInfo.drawCardStatus === 6){
        console.log(`已集齐，等待开奖`);
        return ;
    }
    await doTask(cookie,ua,activityId);
    await $.wait(1000);
    mainInfo = await takePost(cookie,ua,'explorePlanet_homePage');
    mainInfo = mainInfo.result;
    let drawCardChance = mainInfo.drawCardChance;
    let freshFlag = false;
    if(mainInfo.drawCardStatus === 2){
        for (let i = 0; i < drawCardChance; i++) {
            console.log(`执行一次抽奖`);
            let exploreInfo = await takePost(cookie,ua,'explorePlanet_explore',{"activityId":activityId});
            if(exploreInfo && exploreInfo.result && exploreInfo.result.cardInfo){
                let cardInfo = exploreInfo.result.cardInfo;
                console.log(`抽取到：${cardInfo['cardName']},还缺卡${exploreInfo.result.uncollectedCardNum}张`);
            }else{
                console.log(JSON.stringify(exploreInfo));
            }
            freshFlag = true;
            await $.wait(3000);
        }
    }
    if(mainInfo.drawCardStatus === 5  || freshFlag){
        if(freshFlag){
            await $.wait(1000)
            mainInfo = await takePost(cookie,ua,'explorePlanet_homePage');
            mainInfo = mainInfo.result;
        }
        if(mainInfo.drawCardStatus === 5){
            console.log(`合成卡片`);
            let compositeCard = await takePost(cookie,ua,'explorePlanet_compositeCard',{"activityId":activityId});
            console.log(JSON.stringify(compositeCard));
        }
    }
}

async function doTask(cookie,ua,activityId){
    let doFlag = true;
    let time = 1;
    do {
        doFlag = false;
        time ++;
        let taskListInfo = await takePost(cookie,ua,'explorePlanet_taskList',{"activityId":activityId});
        let taskList = taskListInfo.result.componentTaskInfo;
        for (let i = 0; i < taskList.length; i++) {
            let oneTask = taskList[i];
            if(oneTask['taskStatus'] === 1 || oneTask['taskStatus'] === 2){
                console.log(`任务：${oneTask['taskDesc']},去执行`);
                await $.wait(1000)
                let bodyInfo = {
                    "activityId":activityId,
                    "encryptTaskId":oneTask['encryptTaskId'],
                    "itemId":oneTask['itemId'],
                    "encryptProjectId":taskListInfo.result['componentTaskPid']
                }
                let taskReport = await takePost(cookie,ua,'explorePlanet_taskReport',bodyInfo);
                console.log(JSON.stringify(taskReport));
                if(oneTask['taskDesc'] !== '加入品牌会员可探索1次'){
                    doFlag = true;
                }
            }else{
                console.log(`任务：${oneTask['taskDesc']},已完成`);
            }
        }
        taskList = taskListInfo.result.specialComponentTaskInfo;
        for (let i = 0; i < taskList.length; i++) {
            let oneTask = taskList[i];
            if(oneTask['taskStatus'] === 1 || oneTask['taskStatus'] === 2){
                console.log(`任务：${oneTask['taskDesc']},去执行`);
                await $.wait(1000)
                let bodyInfo = {
                    "activityId":activityId,
                    "encryptTaskId":oneTask['encryptTaskId'],
                    "itemId":oneTask['itemId'],
                    "encryptProjectId":taskListInfo.result['specialComponentTaskPid']
                }
                let taskReport = await takePost(cookie,ua,'explorePlanet_taskReport',bodyInfo);
                console.log(JSON.stringify(taskReport));
                doFlag = true;
            }else{
                console.log(`任务：${oneTask['taskDesc']},已完成`);
            }
        }
    }while (time < 5 && doFlag)


}

async function takePost(cookie,ua,functionId,bodyInfo = {"channel":"1"}){
    let config = {
        url: `https://api.m.jd.com/api?functionId=${functionId}&appid=coupon-space&client=wh5&t=${Date.now()}`,
        body:`body=${encodeURIComponent(JSON.stringify(bodyInfo))}`,
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type':'application/x-www-form-urlencoded',
            'Origin':'https://h5.m.jd.com',
            'Cookie': cookie,
            'Accept-Language':'zh-cn',
            'User-Agent':ua,
            'Referer':`https://h5.m.jd.com/babelDiy/Zeus/4StP9yikDrWyPKRXp6rQV4AjWWUZ/index.html?groupId=&activityId=1&sid=&un_area=`,
            'Accept-Encoding':'gzip, deflate, br',
        }
    }
    return new Promise(resolve => {
        $.post(config, async (err, resp, data) => {
            try {
                if (err && !data) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    data = JSON.parse(data);
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve( data['data'] || '');
            }
        })
    })
}
function getUA() {
    let uuid = randomString(40)
    const buildMap = {
        "167822": `10.1.2`,
        "167833": `10.1.1`,
        "167844": `10.1.3`,
    }
    let osVersion = `${randomNum(12, 14)}.${randomNum(0, 6)}`
    let network = `network/${['4g', '5g', 'wifi'][randomNum(0, 2)]}`
    let mobile = `iPhone${randomNum(9, 13)},${randomNum(1, 3)}`
    let build = ["167822","167833","167844"][randomNum(0,1)]
    let appVersion = buildMap[build]
    return `jdapp;iPhone;${appVersion};${osVersion};${uuid};${network};model/${mobile};addressid/${randomNum(1e9)};appBuild/${build};jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS ${osVersion.replace(/\./g, "_")} like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1`
}
function randomString(min, max = 0) {
    var str = "", range = min, arr = [...Array(35).keys()].map(k => k.toString(36));
    if (max) {
        range = Math.floor(Math.random() * (max - min + 1) + min);
    }
    for (let i = 0; i < range;) {
        let randomString = Math.random().toString(16).substring(2)
        if ((range - i) > randomString.length) {
            str += randomString
            i += randomString.length
        } else {
            str += randomString.slice(i - range)
            i += randomString.length
        }
    }
    return str;
}
function randomNum(min, max) {
    if (arguments.length === 0) return Math.random()
    if (!max) max = 10 ** (Math.log(min) * Math.LOG10E + 1 | 0) - 1
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}

