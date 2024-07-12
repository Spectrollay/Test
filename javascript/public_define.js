// 版本变量
// TODO 需在每次提交前检查
const primary_version_name = "4.6"; // 例 4.0
const secondary_version_name = primary_version_name + ".5"; // 例 4.0.0
const version_name_short = secondary_version_name + ".20"; // 例 4.0.0.1 // NOTE 小版本
const version_type = "Canary"; // Preview/Insider_(Preview/Alpha/Beta)/Canary/Alpha/Beta/Pre/RC/Release/SP
const version_type_count = version_type + "8"; // 例 Build1 // NOTE 小版本
const version_name = version_name_short + "." + version_type; // 例 4.0.0.1.Build
const version_nickname = secondary_version_name + "-" + version_type_count; // 例 4.0.0-Build1
const server_version = "4.0";
const update_count = "2024-06-30-01"; // NOTE 小版本
let commit = "#"; // 例 #2024010101 , 仅留 # 则从 update_count 提取 // NOTE 有提交就变
if (commit === "#") {
    commit = "#" + update_count.replace(/-/g, "");
}
const version_info = "<table><tr><td>主要更新: </td><td>" + primary_version_name + "</td></tr><tr><td>次要更新: </td><td>" + secondary_version_name + "</td></tr><tr><td>内部版本: </td><td>" + version_name_short + "</td></tr><tr><td>版本类型: </td><td>" + version_type + "</td></tr><tr><td>版本名: </td><td>" + version_name + "</td></tr><tr><td>版本别称: </td><td>" + version_nickname + "</td></tr><tr><td>发布编号: </td><td>" + update_count + "</td></tr><tr><td>最后提交: </td><td>" + commit + "</td></tr></table>";

//字符常量
const texts = {
    preview_title: "欢迎观看设计预览!",
    preview_detail1: "我们想听听你对这个新设计的意见.",
    preview_detail2: "请注意: 新设计仍未完工,可能会缺失部分功能.",
    preview_btn1: "开发日志",
    preview_btn2: "<img class='link_img' src='' alt=''/>提出反馈",
    back_to_main: "返回首页",
    sidebar_bottom_title: "Minecraft Kit",
    sidebar_bottom_detail1: "© 2020 Spectrollay",
    sidebar_bottom_btn: "官方网站",
    minecraft_wiki: "中文Minecraft Wiki",
    download_channel1: "默认云盘",
    download_channel2: "蓝奏云盘",
    download_channel3: "123云盘",
    download_channel4: "天翼云盘",
    download_channel5: "百度云盘",
    download_channel6: "<img class='link_img_black' src='' alt=''/>外部链接",
    download_type1: "官方原版",
    download_type1_out: "<img class='link_img_black' src='' alt=''/>官方原版(外部链接)",
    download_type2: "中文译名修正",
    download_type3: "去验证版",
    download_type4: "多架构版",
    download_type5: "精简版",
};

const rootPath_d = '/' + (window.location.pathname.split('/').filter(Boolean).length > 0 ? window.location.pathname.split('/').filter(Boolean)[0] + '/' : '');
const hostPath_d = window.location.origin;

let previousTipIndex = -2;
let currentTipIndex = -1;
const tipElement = document.getElementById("tip");
const tipsWithWeights = [
    // Gitee Pages 已下线
    // {
    //     text: "<span>本站有<a href=\"https://spectrollay.github.io" + rootPath_d + "\" target=\"_blank\" onclick=\"playSound1();\">国外源</a>和<a href=\"https://spectrollay.gitee.io" + rootPath_d + "\" target=\"_blank\" onclick=\"playSound1();\">国内源</a>,如遇加载问题可以切换线路访问.</span>",
    //     weight: 3
    // },
    {
        text: "<span>发现问题或有好的建议?<a href=\"https://github.com/Spectrollay" + rootPath_d + "issues/new\" target=\"_blank\" onclick=\"playSound1();\">欢迎提出</a>!</span>",
        weight: 3
    },
    {
        text: "<span>想和大家一起闲聊吹水?<br>快加入<a href=\"https://t.me/Spectrollay_MCW\" target=\"_blank\" onclick=\"playSound1();\">Telegram</a> / <a href=\"https://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=WVA6aPqtv99hiYleW7vUq5OsBIufCAB1&authKey=B0%2BaXMCTqnmQrGh0wzCZTyWTIPyHS%2FPEM5QXcFfVwroFowNnzs6Yg1er1%2F8Fekqp&noverify=0&group_code=833473609\" target=\"_blank\" onclick=\"playSound1();\">QQ</a> / <a href=\"https://yhfx.jwznb.com/share?key=VyTE7W7sLwRl&ts=1684642802\" target=\"_blank\" onclick=\"playSound1();\">云湖</a>群聊!</span>",
        weight: 3
    },
    {
        text: "<span>欢迎加入我们的官方频道: <a href=\"https://t.me/spectrollay_minecraft_repository\" onclick=\"playSound1();\" target=\"_blank\">Telegram</a> / <a href=\"https://pd.qq.com/s/h8a7gt2u4\" onclick=\"playSound1();\" target=\"_blank\">QQ</a></span>",
        weight: 3
    },
    {
        text: "<span>也来看看我们的<a href=\"https://github.com/Spectrollay/mclang_cn\" target=\"_blank\" onclick=\"playSound1();\">中文译名修正项目</a>!</span>",
        weight: 3
    },
    {text: "Made by Spectrollay!", weight: 3},
    {text: "← 点击这里可以切换提示 →", weight: 3},
    {text: "↑ 点击标题栏可以快速回到顶部 ↑", weight: 3},
    {text: "本站指向的站外内容可能不受保障!", weight: 3},
    {text: "转载本站内容时均必须注明出处!", weight: 3},
    {text: "感谢你使用星月Minecraft版本库!", weight: 3},
    {text: "你完成你的事情了吗?", weight: 3},
    {text: "向我们捐赠以支持维护和开发!", weight: 2},
    {text: "我们保留了一些bug,这样你才知道你在使用的是星月Minecraft版本库.", weight: 2},
    {text: "你知道吗,版本库界面的构建仅花费了两天时间.", weight: 2},
    {text: "你知道吗,这个项目始于2020年.", weight: 2},
    {text: "现在你看到了一条提示.", weight: 2},
    {text: "猜一猜下一条出现的提示是什么?", weight: 2},
    {text: "猜一猜下一次看到这条提示是什么时候?", weight: 2},
    {text: "Minecraft, 启动!", weight: 2},
    {text: "看到这条提示就去启动Minecraft吧!", weight: 2},
    {text: "也去玩玩Minceraft吧!", weight: 2},
    {text: "也去玩玩饥荒吧!", weight: 2},
    {text: "也去玩玩泰拉瑞亚吧!", weight: 2},
    {text: "不要这样看着人家,会害羞的啦!", weight: 2},
    {text: "不要一直戳人家啦!", weight: 2},
    {text: "今天是一个不错的日子,你说对吗?", weight: 2},
    {text: "多抬头看看天空吧!", weight: 2},
    {text: "天空即为极限!", weight: 2},
    {text: "记得要天天开心哦!", weight: 2},
    {text: "是谁把我放在这的?", weight: 2},
    {text: "很高兴看到你!", weight: 2},
    {text: "种一棵树!", weight: 2},
    {text: "劳逸结合!", weight: 2},
    {text: "持续支持中!", weight: 2},
    {text: "Technoblade never dies!", weight: 2},
    {text: "Hello world!", weight: 2},
    {text: "95% OreUI!", weight: 2},
    {text: "90% bug free!", weight: 2},
    {text: "Creeper?", weight: 2},
    {text: "Aww man!", weight: 2},
    {text: "Hmmmrmm!", weight: 2},
    {text: "Ssssss...BOOM!", weight: 2},
    {text: "Nooooooooooooo!", weight: 2},
    {text: "Everybody do the Leif!", weight: 2},
    {text: "What DOES the fox say?", weight: 2},
    {text: "/give @a hugs 64", weight: 2},
    {text: "P不包含NP!", weight: 2},
    {text: "!!!1!", weight: 2},
    {text: "llI1IlI11lllI", weight: 2},
    {text: "Wow!", weight: 2},
    {text: "像幽匿尖啸体一样尖啸!", weight: 2},
    {text: "你做完你的作业了吗?", weight: 2},
    {text: "末影人把我的作业偷走了!", weight: 2},
    {text: "苦力怕把我的作业炸了!", weight: 2},
    {text: "别杀怪物,你这个海豚!", weight: 2},
    {text: "真的会有人看这些吗?", weight: 2},
    {
        text: "<span style=\"background: linear-gradient(to right, #1C0DFF, #3CBBFC, #B02FED, #FF57AC, #FFB515, #FFEA45, #99FF55, #00FFAA); -webkit-background-clip: text; background-clip: text; color: transparent;\">这是一条彩色的提示!</span>",
        weight: 2
    },
    {
        text: "<span style=\"transform: scaleX(-1) scaleY(-1);\">这是一条颠倒的提示!</span>",
        weight: 2
    },
    {text: "点我抽盲盒!", weight: 2},
    {text: "<span style='color: dodgerblue'>获得物品: 雷石东直放站!</span>", weight: 1},
    {text: "<span style='color: dodgerblue'>获得物品: 雷霆之杖!</span>", weight: 1},
    {text: "<span style='color: dodgerblue'>获得物品: 试用密钥!</span>", weight: 1},
    {text: "<span style='color: dodgerblue'>获得物品: 羊驼唾沫!</span>", weight: 1},
    {text: "<span style='color: dodgerblue'>驯服宠物: 六角恐龙!</span>", weight: 1},
    {text: "<span style='color: gold'>获得稀有物品: 附魔金苹果!</span>", weight: 0.1},
    {text: "<span style='color: yellow'>解锁隐藏成就: 仓库尽头的提示</span>", weight: 0.001},
    {text: "这是一条永远不会出现的提示.", weight: 0}
];

if (hostPath_d.includes('file:///') || hostPath_d.includes('localhost')) {
    console.log("LocalStorage数据");
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        console.log("[" + [i + 1] + "]" + " " + key + ': ' + value);
    }
    if (localStorage.length === 0) {
        console.log("没有数据");
    }
}

console.log("加载常量和变量完成");

// 节日标语
const holiday_tip1 = document.getElementById('holiday_tip1');
const holiday_tip2 = document.getElementById('holiday_tip2');
const currentDate = new Date();
let Y = currentDate.getFullYear();
let M = currentDate.getMonth() + 1;
let D = currentDate.getDate();
let h = currentDate.getHours();
let m = currentDate.getMinutes();
let s = currentDate.getSeconds();
// DEBUG
// Y = 2024; // 年份全称
// M = 1; // 一位数不要补零
// D = 1; // 一位数不要补零
// h = 1; // 一位数不要补零
const minecraft_birthday = Y - 2009;
const repository_birthday = Y - 2020;

console.log("当前时间:", Y + '/' + M + '/' + D, h + ':' + m + ':' + s)

if (holiday_tip1) {
    const holiday_tip_display1 = holiday_tip1.querySelector('.banner');
    // 春节
    if (Y === 2024 && M === 2 && D > 8 && D < 18) {
        holiday_tip1.style.display = 'flex';
        holiday_tip_display1.innerHTML = "2024龙年大吉!"; // 龙年
    } else if (Y === 2025 && (M === 1 && D > 27) || (M === 2 && D < 6)) {
        holiday_tip1.style.display = 'flex';
        holiday_tip_display1.innerHTML = "2025新年快乐!"; // 蛇年
    } else if (Y === 2026 && M === 2 && D > 15 && D < 25) {
        holiday_tip1.style.display = 'flex';
        holiday_tip_display1.innerHTML = "2026新年快乐!"; // 马年
    } // TODO 2027年及以后

    // 元宵节
    if ((Y === 2024 && M === 2 && D === 24) || (Y === 2025 && M === 2 && D === 12) || (Y === 2026 && M === 3 && D === 3)) {
        holiday_tip1.style.display = 'flex';
        holiday_tip_display1.innerHTML = "元宵快乐~";
    } // TODO 2027年及以后

    // 端午节
    if ((Y === 2024 && M === 6 && D === 10) || (Y === 2025 && M === 5 && D === 31) || (Y === 2026 && M === 6 && D === 19)) {
        holiday_tip1.style.display = 'flex';
        holiday_tip_display1.innerHTML = "端午安康~";
    } // TODO 2027年及以后
}

if (holiday_tip2) {
    const holiday_tip_display2 = holiday_tip2.querySelector('.banner');
    // 固定日期的节日
    if (M === 1 && D === 1) {
        holiday_tip2.style.display = 'flex';
        holiday_tip_display2.innerHTML = "Happy New Year!";
    } else if (M === 3 && D > 9 && D < 17) { // 03.12
        holiday_tip2.style.display = 'flex';
        holiday_tip_display2.innerHTML = "版本库" + repository_birthday + "周年纪!";
    } else if (M === 5 && D > 14 && D < 22) { //05.17
        holiday_tip2.style.display = 'flex';
        holiday_tip_display2.innerHTML = minecraft_birthday + " Years of Minecraft!";
    } else if (M === 6 && D === 1) {
        holiday_tip2.style.display = 'flex';
        holiday_tip_display2.innerHTML = "无论你现在几岁,都祝你儿童节快乐!";
    } else if (M === 6 && D > 5 && D < 11) {
        holiday_tip2.style.display = 'flex';
        holiday_tip_display2.innerHTML = "高考加油!";
    } else if (M === 10 && D > 0 && D < 8) {
        holiday_tip2.style.display = 'flex';
        holiday_tip_display2.innerHTML = "国庆快乐!";
    } else if (M === 12 && (D === 24 || D === 25)) {
        holiday_tip2.style.display = 'flex';
        holiday_tip_display2.innerHTML = "Merry Christmas!";
    }

    // 愚人节
    if (M === 4 && (D === 1 || (D === 2 && h < 12))) {
        if (Y === 2024) {
            holiday_tip2.style.display = 'flex';
            holiday_tip_display2.innerHTML = "<span><a href=\"https://www.minecraft.net/article/poisonous-potato-update\" target=\"_blank\" onclick=\"playSound1();\">毒马铃薯更新现已正式发布!</a><br>版本库4.0满月感恩大回馈! <a href=\"https://www.bilibili.com/video/BV1GJ411x7h7/\" target=\"_blank\" onclick=\"playSound1();\">点此链接抽一人送 Minecraft PC 捆绑包!</a> 距离活动结束仅剩1天!</span>";
        }
        if (Y === 2025) { // 即将到来
            holiday_tip2.style.display = 'flex';
            holiday_tip_display2.innerHTML = ""; // 愚人节版本更新主题
        }
    }

    // 世界地球日
    if (M === 4 && D > 19 && D < 26) {
        if (Y === 2024) {
            holiday_tip2.style.display = 'flex';
            holiday_tip_display2.innerHTML = "<span>2024 世界地球日<br><a href=\"https://www.earthday.org/earth-day-2024/\" target=\"_blank\" onclick=\"playSound1();\">Planet vs. Plastics</a></span>";
        }
        if (Y === 2025) { // 即将到来
            holiday_tip2.style.display = 'flex';
            holiday_tip_display2.innerHTML = "";
        }
    }
}

// 为按钮赋值
const wikiTexts = document.getElementsByClassName("wiki");
if (wikiTexts) {
    for (let i = 0; i < wikiTexts.length; i++) {
        wikiTexts[i].innerHTML = texts.minecraft_wiki;
    }
} else {
}

const backToMainTexts = document.getElementsByClassName("back_to_main");
if (backToMainTexts) {
    for (let i = 0; i < backToMainTexts.length; i++) {
        backToMainTexts[i].innerHTML = texts.back_to_main;
    }
} else {
}

const setElementText = (elementId, text) => {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = text;
    } else {
    }
}

// 彩蛋标题
const repositoryLogo = document.getElementById("repository_logo");
if (repositoryLogo) {
    const randomValue = Math.floor(Math.random() * 10000); // 0.01%
    if (randomValue < 1) {
        repositoryLogo.innerHTML = `<div class="repository_logo_area">星月Minceraft版本库</div>`;
        // repositoryLogo.innerHTML = `<div class="repository_logo_area">星月<img alt="" class="repository_logo_img" src="${rootPath_d}images/Minceraft.png"/>版本库</div>`;
    } else {
        repositoryLogo.innerHTML = `<div class="repository_logo_area">星月Minecraft版本库</div>`;
        // repositoryLogo.innerHTML = `<div class="repository_logo_area">星月<img alt="" class="repository_logo_img" src="${rootPath_d}images/Minecraft.png"/>版本库</div>`;
    }
}

setElementText("sidebar_bottom_title", texts.sidebar_bottom_title);
setElementText("sidebar_bottom_detail1", texts.sidebar_bottom_detail1);
setElementText("sidebar_bottom_btn", texts.sidebar_bottom_btn);
setElementText("preview_title", texts.preview_title);
setElementText("preview_detail1", texts.preview_detail1);
setElementText("preview_detail2", texts.preview_detail2);
setElementText("setting_version", version_name_short);
setElementText("setting_version_detail", version_info);

const donate_message = document.getElementById('donate_message');
if (donate_message) {
    donate_message.innerHTML = `<div>
        <p>这是一个始于2020年的项目, 做它的初衷, 只是为了给我玩的为数不多的游戏一个版本留档, 当时这还只是一个私有项目, 并不对外开放.</p>
        <p>后来, 渐渐的我发现有许多人, 因为各种各样的原因, 有心购买游戏却无力, 亦或是需要某个特定的版本来完成特定的事, 在网上苦苦寻找却不得. 我想, 既然我有这些资源, 为什么不公开出来供大家一起使用呢? 这便是版本库对外开放的契因.</p>
        <p>我们深知这个版本库还很不尽人意, 界面简陋, 功能稀少, 甚至可能还有一堆的问题. 因此我们从V1开始, 就一直在不断地完善改进它, 希望能给每一个使用版本库的你, 带来更好的体验.</p>
        <p>如果你喜欢它, 且已经实现了经济独立, 可以考虑通过捐赠来支持我们. 这可以在很大程度上用于提升环境配置及开发积极性. 否则请你不要打赏, 分享与宣传也是对我们的强有力的支持.</p>
    </div>`;
}

const pageInfo = document.getElementById('page_info');
if (pageInfo) {
    pageInfo.innerHTML = `<div>
        <div class="page_info"><br></div>
        <div class="page_info_title">INFORMATION</div>
        <div class="page_info"><span>Version: ${version_name}<br>Server Version: ${server_version}<br>Updated: ${update_count}<br>Commited: ${commit}</span></div>
        <div class="page_info_title">BASED ON</div>
        <div class="page_info"><span><a href="https://html.spec.whatwg.org/" target="_blank" onclick="playSound1();">HTML5</a> / <a href="https://developer.mozilla.org/en-US/docs/Web/API" target="_blank" onclick="playSound1();">Web API</a> / <a href="https://webkit.org/" target="_blank" onclick="playSound1();">WebKit</a> / <a href="https://github.com/Spectrollay/OreUI" target="_blank" onclick="playSound1();">OreUI</a></span></div>
        <div class="page_info_title">ABOUT US</div>
        <div class="page_info"><span>Developer: @Spectrollay<br>Maintainer: @Spectrollay<br>Program Group: <a href="https://t.me/Spectrollay_MCW" target="_blank" onclick="playSound1();">Telegram</a> / <a href="https://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=WVA6aPqtv99hiYleW7vUq5OsBIufCAB1&authKey=B0%2BaXMCTqnmQrGh0wzCZTyWTIPyHS%2FPEM5QXcFfVwroFowNnzs6Yg1er1%2F8Fekqp&noverify=0&group_code=833473609" target="_blank" onclick="playSound1();">QQ</a> / <a href="https://yhfx.jwznb.com/share?key=VyTE7W7sLwRl&ts=1684642802" target="_blank" onclick="playSound1();">云湖</a><br>Official Channel: <a href="https://t.me/spectrollay_minecraft_repository" onclick="playSound1();" target="_blank">Telegram</a> / <a href="https://pd.qq.com/s/h8a7gt2u4" onclick="playSound1();" target="_blank">QQ</a><span></div>
        <div class="page_info_title">MADE WITH ❤️ IN CHINA</div>
        <div class="page_info"><br></div>
    </div>`;
}

setTimeout(function () {

    setElementText("preview_btn1", texts.preview_btn1);
    setElementText("preview_btn2", texts.preview_btn2);

    const buttons = document.querySelectorAll('.btn, custom-button');

    function updateButtonText(button) {
        const textKey = button.getAttribute('text-generation');
        if (textKey !== null) {
            if (!button.classList.contains('btn')) {
                button.setAttribute("text", texts[textKey]);
                button.querySelector('.btn').innerHTML = texts[textKey];
            } else {
                button.innerHTML = texts[textKey];
            }
        }
    }

    buttons.forEach(button => {
        updateButtonText(button);
    });

    let linkImg = document.getElementsByClassName('link_img');
    let linkImgBlack = document.getElementsByClassName('link_img_black');

    if (linkImg) {
        for (let i = 0; i < linkImg.length; i++) {
            linkImg[i].src = rootPath_d + 'images/ExternalLink_white.png';
        }
    }
    if (linkImgBlack) {
        for (let i = 0; i < linkImgBlack.length; i++) {
            linkImgBlack[i].src = rootPath_d + 'images/ExternalLink.png';
        }
    }

    let modal_close_btn_img = document.getElementsByClassName('modal_close_btn_img');
    if (modal_close_btn_img) {
        for (let i = 0; i < modal_close_btn_img.length; i++) {
            modal_close_btn_img[i].src = rootPath_d + 'images/cross_white.png';
        }
    }

}, 150);

console.log("字符常量已成功应用");

// 加载网页时的提示
if (tipElement) {
    tipElement.innerHTML = getRandomTip();
    console.log("提示已选择成功");
} else {
    console.log("未发现提示框");
}

if (tipElement) {
    tipElement.addEventListener("click", (event) => {
        if (event.target.tagName === "A") {
            console.log("检测到点击了链接,不执行切换提示操作");
        } else {
            tipElement.innerHTML = getRandomTip();
        }
    });
}

function getRandomTip() {
    const totalWeight = tipsWithWeights.reduce((acc, tip) => acc + tip.weight, 0);
    console.log("总权重:" + totalWeight + ",上次选中值:" + previousTipIndex + ",当前选中值:" + currentTipIndex);
    console.log("开始选择");
    let accumulatedWeight = 0;
    for (const tip of tipsWithWeights) {
        accumulatedWeight += tip.weight;
        let randomWeight = Math.random() * totalWeight;
        if (randomWeight <= accumulatedWeight) {
            previousTipIndex = currentTipIndex;
            currentTipIndex = tipsWithWeights.indexOf(tip);
            if (currentTipIndex === previousTipIndex) {
                console.log("当前选中值与上次选中值相同!");
                randomWeight = Math.random() * (totalWeight - tip.weight);
                accumulatedWeight = 0;
                for (const tip_new of tipsWithWeights) {
                    if (tip_new !== tip) {
                        accumulatedWeight += tip_new.weight;
                        if (randomWeight <= accumulatedWeight) {
                            previousTipIndex = currentTipIndex;
                            currentTipIndex = tipsWithWeights.indexOf(tip_new);
                            console.log("更新后的上次选中值:" + previousTipIndex + ",当前选中值:" + currentTipIndex);
                            return tip_new.text;
                        }
                    }
                }
            } else {
                console.log("当前选中值与上次选中值不同.");
                console.log("上次选中值:" + previousTipIndex + ",当前选中值:" + currentTipIndex);
                return tip.text;
            }
        }
    }
}
