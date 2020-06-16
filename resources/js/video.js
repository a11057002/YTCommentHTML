document.getElementById("search").addEventListener("keypress",(e)=>{
    if(e.key=="Enter"){
        document.getElementById("field").style.display = "none";
        let keyword = e.target.value.replace(/\s/g,'');
        fetch("http://localhost:8080/search?keyword="+keyword,{
            method:"GET"
        }).then((data)=>data.json()).then((res)=>{
             addVideo(res);
        })
    }
});

document.getElementById("keyword").addEventListener("keypress",(e)=>{
    if(e.key=="Enter"){
        localStorage.setItem('keyword', document.getElementById("keyword").value);
        location.href = "comment.html";
    }
});


const addVideo = (data)=>{
    const frame = document.getElementById("videoFrame");
    for(let i = 0;i<data.length;i++){
        let div = document.createElement("div");
        let a = document.createElement("a");
        let img = document.createElement("img");
        let title = document.createElement("div");
        let description = document.createElement("div");

        div.setAttribute("class","video");
        img.setAttribute("src",data[i].thumbnail);
        div.onclick = function(){
            localStorage.setItem('videoId', data[i].videoId);
            document.getElementById("fancyTitle").innerHTML = data[i].title;
            $.fancybox.open($("#fancy"));
        };
        title.setAttribute("class","title");
        title.innerHTML = data[i].title;
        description.setAttribute("class","description");
        description.innerHTML = data[i].description;

        div.append(a);
        a.append(img);
        a.append(title);
        a.append(document.createElement("hr"));
        a.append(description);

        frame.append(div);
    }
}


b=[
    {
    "videoId": "MYdsG-GoWvY",
    "title": "安安闆娘直播-熱烈邀請 館粉的老杯老母 熱烈邀請 館粉的老杯老母來看看 下一代接受什麼樣的教育【冬星娛樂】",
    "description": "館粉#館長訂閱頻道◢ https://goo.gl/qjW4gZ 冬星娛樂臉書粉絲頁◢ https://www.facebook.com/Rainbowtaiwa/ 官方LINE◢ https://goo.gl/LzyAh7 ID:@dongxin 臉 ...",
    "thumbnail": "https://i.ytimg.com/vi/MYdsG-GoWvY/hqdefault.jpg"
    },
    {
    "videoId": "M6MRc5YY_qA",
    "title": "這不酸小 對不起自己  哩沙東西   台灣價值不是用你的想法來定義的   【安安霸氣闆娘 / 館長天敵】",
    "description": "今日主題： 這不酸小對不起自己台灣價值不是用你的想法來定義的台灣要的是互助互惠不是為你個人利益不開心就要公開挨罵哩沙東西#寶寶愛...",
    "thumbnail": "https://i.ytimg.com/vi/M6MRc5YY_qA/hqdefault.jpg"
    },
    {
    "videoId": "RlPwBkvvOzc",
    "title": "安安闆娘直播-嗆爆什麼商品都頂到玉山的館長【冬星娛樂】",
    "description": "訂閱頻道◢ https://goo.gl/qjW4gZ 冬星娛樂臉書粉絲頁◢ https://www.facebook.com/Rainbowtaiwa/ 官方LINE◢ https://goo.gl/LzyAh7 ID:@dongxin 臉書社群:爆料 ...",
    "thumbnail": "https://i.ytimg.com/vi/RlPwBkvvOzc/hqdefault.jpg"
    },
    {
    "videoId": "wyg5EItrgyg",
    "title": "館長你真的不是對手！遇上安安這下看要怎麼嘴才能收場。高手在民間！屏東的驕傲",
    "description": "影片載自臉書：「安安一直很霸氣」 屏東的驕傲！向館長宣戰的女漢子請大家一起全力支持他.",
    "thumbnail": "https://i.ytimg.com/vi/wyg5EItrgyg/hqdefault.jpg"
    },
    {
    "videoId": "uuM0b8a6tXQ",
    "title": "【王者榮耀】安安受傷，在男生面前“就是有點腫”，為何安然來了劇情翻轉竟當眾撒嬌“要骨折”？小甜心安然：幫妳點好吃的好不好！『王者搞笑陪玩』",
    "description": "喜欢给关注！每天更新视频！ http://dwz.win/CsA 剪辑不易，给个赞   #王者搞笑陪玩#王者荣耀#王者搞笑陪玩  安安受傷，在男生面前“就是有點腫...",
    "thumbnail": "https://i.ytimg.com/vi/uuM0b8a6tXQ/hqdefault.jpg"
    },
    {
    "videoId": "jM44ROHm-fw",
    "title": "【王者榮耀】安安人頭我的人頭 追不上，我幫妳啦！小甜心安然：溫柔是對男孩子很高的評價了吧！『王者搞笑陪玩』",
    "description": "喜欢给关注！每天更新视频！ http://dwz.win/CsA 剪辑不易，给个赞   #王者搞笑陪玩#王者荣耀#王者搞笑陪玩  安安人頭我的人頭追不上，我幫妳啦...",
    "thumbnail": "https://i.ytimg.com/vi/jM44ROHm-fw/hqdefault.jpg"
    },
    {
    "videoId": "aiNyuQgW6CY",
    "title": "晨悠melFlow【安安 Miss】Official Music Video",
    "description": "Stream/Download the song here: https://lnkfi.re/E6iMArO0 《安安》 作詞：晨悠melFlow 作曲：晨悠melFlow、張三Zion 編曲：彭柏邑Boiii P 睏了卻又睡不著病了卻...",
    "thumbnail": "https://i.ytimg.com/vi/aiNyuQgW6CY/hqdefault.jpg"
    },
    {
    "videoId": "KU9ByAlQYWU",
    "title": "【王者榮耀】安然誰罵人發10元紅包，安安發520元什麼意思？安然當眾被嘲諷蘇以澈和安安妳們在哪裏呀？/狗子隊長：這個師傅咋越來越笨了呀？『王者搞笑陪玩』",
    "description": "喜欢给关注！每天更新视频！ http://dwz.win/CsA 剪辑不易，给个赞   #王者搞笑陪玩#王者荣耀#王者搞笑陪玩  安然誰罵人發10元紅包，安安發520元...",
    "thumbnail": "https://i.ytimg.com/vi/KU9ByAlQYWU/hqdefault.jpg"
    },
    {
    "videoId": "GOt5f0WB1UM",
    "title": "「館長官司纏身」館長你要被安安告了｜誤導風向網友半夜秀下限｜再不教育粉絲最後一根稻草就是粉絲 ~【安安霸氣闆娘 / 館長天敵】",
    "description": "今日主題： 「館長官司纏身」館長你要被安安告了｜誤導風向網友半夜秀下限｜再不教育粉絲最後一根稻草就是粉絲#安安告館長#館長被安安吉...",
    "thumbnail": "https://i.ytimg.com/vi/GOt5f0WB1UM/hqdefault.jpg"
    },
    {
    "videoId": "-8N4pUSGYAw",
    "title": "「門在那邊！出去」安安上新聞了！霸氣安安嗆澳客！一刀未剪流出｜館粉狂嘴蹭流量。我都不屑上新聞了，是要蹭啥！？ ~【安安霸氣闆娘 / 館長天敵】",
    "description": "贊助頻道: ➞➞ https://p.ecpay.com.tw/97F27 (有您的贊助本頻道將更加精采) 今日主題： 「門在那邊！出去」一刀未剪流出｜館粉狂嘴蹭流量，我都不屑...",
    "thumbnail": "https://i.ytimg.com/vi/-8N4pUSGYAw/hqdefault.jpg"
    }
    ];