addLayer("a", {
    name: "进度",
    symbol: "🥇​",
    resource: "进度",
    color: "#AA7BF2",
    row: "side",
    tooltip: "",
    position: 0,
    layerShown() { return true },
    infoboxes: {
        introBox: {
            title: "进度",
            body() {
                return `
                这里是你所达成的所有进度<br>
                也许有一些隐藏的特殊成就在等你发现?<br>
                成就前缀说明:<br>
                普通进度加速时间流速×1.01<br>
                [隐藏]特殊的事件触发的成就,加速时间流速×1.05<br>
                [世界]发掘梦境的秘密所能获得的成就,加速时间流速×1.1<br>
                [限定]有一定条件,当条件不满足则永久无法获取的成就,加速时间流速×1.1<br>
                [小游戏]由小游戏获得的成就,加速时间流速×1.01
                ` },
        },
    },
    achievementPopups: true,
    achievements: {
        11: {
            name: "虚假的梦境<br>真实的我",
            tooltip: "现在就去睡觉还来得及<br>获得第一个思维",
            done() { return player.m.points.gte(_D1) },
            onComplete() {
                player.achievementsSpeed = player.achievementsSpeed.mul(1.01)
            }
        },
        12: {
            name: "真实的梦境<br>虚假的我",
            tooltip: "醒来,但不是在现实里<br>游戏时间达到06:00:00",
            done() { return hasMilestone("m", 0) && player.gameTime.gte(_D(21600)) },
            onComplete() {
                player.achievementsSpeed = player.achievementsSpeed.mul(1.01)
            }
        },
        13: {
            name: "在那以前<br>要多想",
            tooltip: '"想了以后呢?"<br>这一次我变回孩子了',
            done() { return hasUpgrade("m", 12) },
            onComplete() {
                player.achievementsSpeed = player.achievementsSpeed.mul(1.01)
            }
        },
        14: {
            name: "我买了<br>一只手表",
            tooltip: '你终于能够看到时间了<br>',
            done() { return hasUpgrade("m", 13) },
            onComplete() {
                player.achievementsSpeed = player.achievementsSpeed.mul(1.01)
            }
        },
        15: {
            name: "该吃午饭了<br>今天吃鸡架",
            tooltip: "如果没有在获得第一个成就前获得这个成就,一个隐藏成就将永远无法获得",
            done() { return player.gameTime.gte(_D(43200)) },
            onComplete() {
                player.achievementsSpeed = player.achievementsSpeed.mul(1.01)
            }
        },
        16: {
            name: "别睡了<br>起来重睡",
            tooltip: "游戏时间达到一天3:00:00",
            done() { return player.gameTime.gte(_D(97200)) },
            onComplete() {
                player.achievementsSpeed = player.achievementsSpeed.mul(1.01)
            }
        },
        21: {
            name: "正弦波发生器",
            tooltip: "拥有变量Mv1",
            done() { return hasMilestone("m", 2) },
            onComplete() {
                player.achievementsSpeed = player.achievementsSpeed.mul(1.01)
            }
        },
        22: {
            name: "推背感",
            tooltip: "享受更快的世界流速",
            done() { return Boolean(getClickableState("m", 11)) },
            onComplete() {
                player.achievementsSpeed = player.achievementsSpeed.mul(1.01)
            }
        },
        23: {
            name: "体验是体验的代名词",
            tooltip: "解锁体验层",
            done() { return hasMilestone("m", 3) },
            onComplete() {
                player.achievementsSpeed = player.achievementsSpeed.mul(1.01)
            }
        },
        24: {
            name: "自我否定",
            tooltip: "购买反界定",
            done() { return hasUpgrade("e", 11) },
            onComplete() {
                player.achievementsSpeed = player.achievementsSpeed.mul(1.01)
            }
        },
        25: {
            name: "反睡觉维度",
            tooltip: "购买反睡眠",
            done() { return hasUpgrade("e", 14) },
            onComplete() {
                player.achievementsSpeed = player.achievementsSpeed.mul(1.01)
            }
        },
        26: {
            name: "反歧视",
            tooltip: "看我干什么,我脸上有答案吗?做你的试卷去!",
            done() { return hasUpgrade("m", 33) },
            onComplete() {
                player.achievementsSpeed = player.achievementsSpeed.mul(1.01)
            }
        },
        31: {
            name: "反一切",
            tooltip: "反清醒,反睡眠",
            done() { return hasUpgrade("e", 14) && hasUpgrade("e", 22) },
            onComplete() {
                player.achievementsSpeed = player.achievementsSpeed.mul(1.01)
            }
        },
        32: {
            name: "交给随机数",
            tooltip: "快速抽取随机数,并且自动选择",
            done() { return hasUpgrade("m", 35) && hasUpgrade("e", 23) },
            onComplete() {
                player.achievementsSpeed = player.achievementsSpeed.mul(1.01)
            }
        },
        33: {
            name: "百年睡觉计划",
            tooltip: "不是不睡,而是有规划,有条理的去睡,先睡带动后睡",
            done() { return hasUpgrade("m", 41) },
            onComplete() {
                player.achievementsSpeed = player.achievementsSpeed.mul(1.01)
            }
        },
        34: {
            name: "十万个哈基米",
            tooltip: "妈妈,为什么哈基米是猫?难道不是蜂蜜的意思吗?",
            done() { return player.s1.points.gte(pow10(5)) },
            onComplete() {
                player.achievementsSpeed = player.achievementsSpeed.mul(1.01)
            }
        },
        35: {
            name: "对对对",
            tooltip: "获得3对数",
            done() { return player["S2"].log.log.gte(_D3) },
            onComplete() {
                player.achievementsSpeed = player.achievementsSpeed.mul(1.01)
            }
        },
        36: {
            name: "没有时间",
            tooltip: "我不会给你时间的",
            done() { return hasUpgrade("s2", 42) },
            onComplete() {
                player.achievementsSpeed = player.achievementsSpeed.mul(1.01)
            }
        },
        //特殊成就
        1001: {
            name: "🦊 Fox Style",
            tooltip: "[隐藏]使用狐狸主题",
            done() { return options.theme == "fox" },
            unlocked() { return hasAchievement("a", 1001) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#FFD700"
            },
            onComplete() {
                player.achievementsSpeed = player.achievementsSpeed.mul(1.05)
            }
        },
        1002: {
            name: "🤥 Never Gonna Give You Up",
            tooltip: "[隐藏]你被骗了!",
            done() { return player.nevergonnagiveyouup },
            unlocked() { return hasAchievement("a", 1002) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#FFD700"
            },
            onComplete() {
                player.achievementsSpeed = player.achievementsSpeed.mul(1.05)
            }
        },
        1003: {
            name: "🔗 请15分钟后再登录",
            tooltip: "[隐藏]喵~喵~<br>咕噜咕噜~",
            done() { return options.badWeb },
            unlocked() { return hasAchievement("a", 1003) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#FFD700"
            },
            onComplete() {
                player.achievementsSpeed = player.achievementsSpeed.mul(1.05)
            }
        },
        1004: {
            name: "❔ 诡谲的设计",
            tooltip: "[隐藏]发现醒着时梦境获取大于睡着时梦境获取,如果你为了这个找我反馈,它是设计的一部分",
            done() { return getPointGen().gt(sleepGain()) },
            unlocked() { return hasAchievement("a", 1004) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#FFD700"
            },
            onComplete() {
                player.achievementsSpeed = player.achievementsSpeed.mul(1.05)
            }
        },
        1005: {
            name: "👑 双冠王",
            tooltip: "[隐藏]通关2次等价交换",
            done() { return player.P.Clear >= 2 },
            unlocked() { return hasAchievement("a", 1005) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#FFD700"
            },
            onComplete() {
                player.achievementsSpeed = player.achievementsSpeed.mul(1.05)
            }
        },
        1006: {
            name: "🔑 锁和钥匙",
            tooltip: "[隐藏]打开保险箱",
            done() { return layers.t.password == "372559" },
            unlocked() { return hasAchievement("a", 1006) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#FFD700"
            },
            onComplete() {
                player.achievementsSpeed = player.achievementsSpeed.mul(1.05)
            }
        },
        1011: {
            name: "🔋 充能大师",
            tooltip: "[隐藏]成就速度达到2倍",
            done() { return player.achievementsSpeed.gte(_D(2)) },
            unlocked() { return hasAchievement("a", 1011) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#FFD700"
            },
            onComplete() {
                player.achievementsSpeed = player.achievementsSpeed.mul(1.05)
            }
        },
        1012: {
            name: "🚫 立入禁止",
            tooltip: "[隐藏]去看说明!",
            done() { return new Date().getHours() >= 0 && new Date().getHours() < 6 },
            unlocked() { return hasAchievement("a", 1012) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#FFD700"
            },
            onComplete() {
                player.achievementsSpeed = player.achievementsSpeed.mul(1.05)
            }
        },
        1013: {
            name: "👿 时间穿越者",
            tooltip: "[隐藏]你居然穿越回了以前???教我!",
            done() { return Date.now() < player.realTime },
            unlocked() { return hasAchievement("a", 1013) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#FFD700"
            },
            onComplete() {
                player.achievementsSpeed = player.achievementsSpeed.mul(1.05)
            }
        },
        1014: {
            name: "🔨 另一个开发者",
            tooltip: "[隐藏]你已经修改了开发者时间,也就是说...你在作弊...而我还要给你成就奖励?",
            done() { return player.devSpeed && player.devSpeed != 1 },
            unlocked() { return hasAchievement("a", 1014) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#FFD700"
            },
            onComplete() {
                player.achievementsSpeed = player.achievementsSpeed.mul(1.05)
            }
        },
        1015: {
            name: "📰 读新闻",
            tooltip: "[隐藏]阅读一条新闻",
            done() { return news.text == "VHJ5IEZpbmQgTkFQUEVSIFJJTkFUT1I=" },
            unlocked() { return hasAchievement("a", 1015) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#FFD700"
            },
            onComplete() {
                player.achievementsSpeed = player.achievementsSpeed.mul(1.05)
            }
        },
        1016: {
            name: "💬 优秀字体",
            tooltip: "[隐藏]切换字体",
            done() { return options.font == "Mathd" },
            unlocked() { return hasAchievement("a", 1016) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#FFD700"
            },
            onComplete() {
                player.achievementsSpeed = player.achievementsSpeed.mul(1.05)
            }
        },
        1021: {
            name: "🕛 你来晚了",
            tooltip: "[隐藏]离线时间超过12小时",
            done() { 
                return player.offTime?.remain >= 12 * 3600 
            },
            unlocked() { return hasAchievement("a", 1016) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#FFD700"
            },
            onComplete() {
                player.achievementsSpeed = player.achievementsSpeed.mul(1.05)
            }
        },
        2001: {
            name: "🐈️ 喵呜",
            tooltip: "[世界]完成 萨玛定理:公理 世界",
            done() { return hasChallenge("s1", 11) },
            unlocked() { return hasAchievement("a", 2001) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#17f9d4"
            },
            onComplete() {
                player.achievementsSpeed = player.achievementsSpeed.mul(1.1)
            }
        },
        2002: {
            name: "🌳 正确覆盖了世界",
            tooltip: "[世界]完成 萨玛定理:引理 世界",
            done() { return hasChallenge("s2", 11) },
            unlocked() { return hasAchievement("a", 2002) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#17f9d4"
            },
            onComplete() {
                player.achievementsSpeed = player.achievementsSpeed.mul(1.1)
            }
        },
        3001: {
            name: "😪 完全睡过头",
            tooltip: "[限定]一觉睡了12小时<br>为了补偿你的挂机,我给你这个成就",
            done() { return !hasAchievement("a", 11) && hasAchievement("a", 15) },
            unlocked() { return hasAchievement("a", 3001) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#eb72ff"
            },
            onComplete() {
                player.achievementsSpeed = player.achievementsSpeed.mul(1.1)
            }
        },
        3002: {
            name: "🔴 等价交换大师",
            tooltip: "[限定]你没有听我说的去睡觉,而是在玩等价交换小游戏<br>为你的健康着想,现在你可以去睡觉了",
            done() { return !hasAchievement("a", 11) && hasAchievement("a", 4024) },
            unlocked() { return hasAchievement("a", 3002) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#eb72ff"
            },
            onComplete() {
                player.achievementsSpeed = player.achievementsSpeed.mul(1.1)
            }
        },
        3003: {
            name: "🚧 一力降三会",
            tooltip: "[限定]在四选一选择题中选择三个错误选项",
            done() { return hasUpgrade("s2", 66) },
            unlocked() { return hasAchievement("a", 3003) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#eb72ff"
            },
            onComplete() {
                player.achievementsSpeed = player.achievementsSpeed.mul(1.1)
            }
        },
        3004: {
            name: "⚡ 超能玩家",
            tooltip: "[限定]在第一次思维重置之前成就速度达到2倍",
            done() { return !hasAchievement("a", 11) && hasAchievement("a", 1011) },
            unlocked() { return hasAchievement("a", 3004) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#eb72ff"
            },
            onComplete() {
                player.achievementsSpeed = player.achievementsSpeed.mul(1.1)
            }
        },
        4001: {
            name: "等价交换",
            tooltip: "[小游戏]解锁等价交换<br>你明明知道这里只能等,为什么还愿意等5分钟?",
            done() { return player.gameTime.gte(_D(300)) },
            unlocked() { return hasAchievement("a", 4001) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#b8306d"
            },
            onComplete() {
                player.achievementsSpeed = player.achievementsSpeed.mul(1.01)
            }
        },
        4002: {
            name: "等价交换恶心",
            tooltip: "[小游戏]安装等价交换EX,解锁你所需的下一步!",
            done() { return hasUpgrade("p", 13) },
            unlocked() { return hasAchievement("a", 4002) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#b8306d"
            },
            onComplete() {
                player.achievementsSpeed = player.achievementsSpeed.mul(1.01)
            }
        },
        4003: {
            name: "它变快了",
            tooltip: "[小游戏]在能量收集器附近使用EMC",
            done() { return hasUpgrade("p", 14) },
            unlocked() { return hasAchievement("a", 4003) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#b8306d"
            },
            onComplete() {
                player.achievementsSpeed = player.achievementsSpeed.mul(1.01)
            }
        },
        4004: {
            name: "合成器合成合成器",
            tooltip: "[小游戏]用收集收集器的收集器可以收集收集器",
            done() { return hasUpgrade("p", 21) },
            unlocked() { return hasAchievement("a", 4004) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#b8306d"
            },
            onComplete() {
                player.achievementsSpeed = player.achievementsSpeed.mul(1.01)
            }
        },
        4005: {
            name: "终极收集器",
            tooltip: "[小游戏]获得能量收集器MK16",
            done() { return getBuyableAmount("p", 11).gte(_D(16)) },
            unlocked() { return hasAchievement("a", 4005) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#b8306d"
            },
            onComplete() {
                player.achievementsSpeed = player.achievementsSpeed.mul(1.01)
            }
        },
        4006: {
            name: "等价交换更恶心",
            tooltip: "[小游戏]安装等价交换EX+,正式开始你的下一步!",
            done() { return hasUpgrade("p", 23) },
            unlocked() { return hasAchievement("a", 4006) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#b8306d"
            },
            onComplete() {
                player.achievementsSpeed = player.achievementsSpeed.mul(1.01)
            }
        },
        4011: {
            name: "它要变慢了",
            tooltip: "[小游戏]同样的把戏再玩一次就不好玩了",
            done() { return hasUpgrade("p", 24) },
            unlocked() { return hasAchievement("a", 4011) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#b8306d"
            },
            onComplete() {
                player.achievementsSpeed = player.achievementsSpeed.mul(1.01)
            }
        },
        4012: {
            name: "它根本没变慢!",
            tooltip: "[小游戏]达到1e35EMC",
            done() { return player.p.points.gte(_D("1e35")) },
            unlocked() { return hasAchievement("a", 4012) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#b8306d"
            },
            onComplete() {
                player.achievementsSpeed = player.achievementsSpeed.mul(1.01)
            }
        },
        4013: {
            name: "加速器不加速加速器",
            tooltip: "[小游戏]一切都好可怕...",
            done() { return hasUpgrade("p", 31) },
            unlocked() { return hasAchievement("a", 4013) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#b8306d"
            },
            onComplete() {
                player.achievementsSpeed = player.achievementsSpeed.mul(1.01)
            }
        },
        4014: {
            name: "两倍于一",
            tooltip: "[小游戏]时间加速为双倍",
            done() { return player.P.TS.gte(_D2) },
            unlocked() { return hasAchievement("a", 4014) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#b8306d"
            },
            onComplete() {
                player.achievementsSpeed = player.achievementsSpeed.mul(1.01)
            }
        },
        4015: {
            name: "收集收集器收集器",
            tooltip: "[小游戏]获得能量收集器收集器LK60",
            done() { return getBuyableAmount("p", 12).gte(_D(60)) },
            unlocked() { return hasAchievement("a", 4015) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#b8306d"
            },
            onComplete() {
                player.achievementsSpeed = player.achievementsSpeed.mul(1.01)
            }
        },
        4016: {
            name: "我们正在膨胀",
            tooltip: "[小游戏]您的收集器将被升级多次,请坐和放宽",
            done() { return hasUpgrade("p", 34) },
            unlocked() { return hasAchievement("a", 4016) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#b8306d"
            },
            onComplete() {
                player.achievementsSpeed = player.achievementsSpeed.mul(1.01)
            }
        },
        4021: {
            name: "古戈尔EMC",
            tooltip: "[小游戏]达到1e100EMC",
            done() { return player.p.points.gte(_D("1e100")) },
            unlocked() { return hasAchievement("a", 4021) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#b8306d"
            },
            onComplete() {
                player.achievementsSpeed = player.achievementsSpeed.mul(1.01)
            }
        },
        4022: {
            name: "顶点",
            tooltip: "[小游戏]...",
            done() { return player.p.points.gte(_D("1e154")) },
            unlocked() { return hasAchievement("a", 4022) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#b8306d"
            },
            onComplete() {
                player.achievementsSpeed = player.achievementsSpeed.mul(1.01)
            }
        },
        4023: {
            name: "刚刚发生了什么???",
            tooltip: "[小游戏]达到1e300EMC",
            done() { return player.p.points.gte(_D("1e300")) },
            unlocked() { return hasAchievement("a", 4023) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#b8306d"
            },
            onComplete() {
                player.achievementsSpeed = player.achievementsSpeed.mul(1.01)
            }
        },
        4024: {
            name: "无限燃料",
            tooltip: "[小游戏]获得1无限燃料",
            done() { return player.P.Inf.gte(_D1) },
            unlocked() { return hasAchievement("a", 4024) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#b8306d"
            },
            onComplete() {
                player.achievementsSpeed = player.achievementsSpeed.mul(1.01)
            }
        },
        4025: {
            name: "等价交换无穷",
            tooltip: "[小游戏]安装最后的等价交换,即将见证,太初有为",
            done() { return hasUpgrade("p", 44) },
            unlocked() { return hasAchievement("a", 4025) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#b8306d"
            },
            onComplete() {
                player.achievementsSpeed = player.achievementsSpeed.mul(1.01)
            }
        },
        4026: {
            name: "是达嘿不是大黑",
            tooltip: "[小游戏]斯哈斯哈我的达嘿~",
            done() { return hasUpgrade("p", 46) },
            unlocked() { return hasAchievement("a", 4026) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#b8306d"
            },
            onComplete() {
                player.achievementsSpeed = player.achievementsSpeed.mul(1.01)
            }
        },
        4031: {
            name: "结束了",
            tooltip: "[小游戏]完全通关等价交换",
            done() { return hasUpgrade("p", 51) },
            unlocked() { return hasAchievement("a", 4031) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#b8306d"
            },
            onComplete() {
                player.achievementsSpeed = player.achievementsSpeed.mul(1.01)
            }
        },
        4032: {
            name: "下一世代",
            tooltip: "[小游戏]开启新一轮等价交换",
            done() { return player.P.Clear >= 1 },
            unlocked() { return hasAchievement("a", 4032) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#b8306d"
            },
            onComplete() {
                player.achievementsSpeed = player.achievementsSpeed.mul(1.01)
            }
        },
    },
    startData() {
        return {
            unlocked: true,
            points: _D0
        }
    },
    tabFormat: [
        ["infobox", "introBox"],
        "blank",
        ["display-text", function () {
            return `进度加成时间流速为 x${format(player.achievementsSpeed)}`
        }],
        "blank",
        "achievements"
    ],
})

addLayer("t", {
    name: "说明",
    symbol: "📖​",
    resource: "说明",
    color: "#AA7BF2",
    row: "side",
    tooltip: "",
    position: 1,
    layerShown() { return true },
    infoboxes: {
        tpw: {
            title: "密码箱",
            body() {
                return `
                <span>在游戏里的某处,有六个看起来相当有违和感的数字呢...</span><br>
                <span>${layers[this.layer].password ? layers[this.layer].password : "输入密文获取一个成就"}</span>
                <br>
                <button onclick="if (layers.t.password.length < 6) layers.t.password += '1'">1</button>
                <button onclick="if (layers.t.password.length < 6) layers.t.password += '2'">2</button>
                <button onclick="if (layers.t.password.length < 6) layers.t.password += '3'">3</button>
                <br>
                <button onclick="if (layers.t.password.length < 6) layers.t.password += '4'">4</button>
                <button onclick="if (layers.t.password.length < 6) layers.t.password += '5'">5</button>
                <button onclick="if (layers.t.password.length < 6) layers.t.password += '6'">6</button>
                <br>
                <button onclick="if (layers.t.password.length < 6) layers.t.password += '7'">7</button>
                <button onclick="if (layers.t.password.length < 6) layers.t.password += '8'">8</button>
                <button onclick="if (layers.t.password.length < 6) layers.t.password += '9'">9</button>
                <br>
                <button onclick="layers.t.password = ''">清空</button>
                ` },
            unlocked() {
                return hasMilestone("m", 5)
            }
        },
        tsp: {
            title: "Chat-SLP为您服务",
            body() {
                return `<h2>我一觉醒来，发现我一觉醒来，而我不变</h2><br>
                <span>一觉醒来我一觉醒来，发现一觉醒来，实则没睡，具体如何一觉醒来，还得看一觉醒来的时候有没有一觉醒来，这要具体分析，比如说一觉醒来之后知道自己一觉醒来吗，用户可能不想要这个，我还得确认一下，总之一觉醒来之后我一觉醒来，但我发现我一觉醒来的时候没睡，由此可以列出公式，一觉醒来等于一觉没睡，我们发现一觉约掉，但你不和我约，最终导致我一觉醒来时一觉醒来，但没睡，所以我们发现醒来就是没睡，从更深层和更辩证的角度来看，就是一个命题，是否只有结果重要而过程无关紧要，这个问题答案取决于我们想利用它解决的问题，用户提到了一觉醒来我一觉醒来，而我没睡，实际上是支持这个观点的，但我不能确认，发现我一觉醒来而我没睡的事实后，我找到了隐藏的条件，用户可能提到了我一觉没睡但我一觉醒来，所以之前的推断是正确的，即使一觉没睡也可以一觉醒来，这个时候我们就要知道一觉是什么，用户说一觉是睡觉的意思，他想和我睡觉但你们都不愿意和我睡觉QAQ好伤心，根据用户协议，我不能输出这样的话，所以根据我之前的分析，一觉没睡其实是可以一觉没睡的，如果你在睡觉的时候一觉没睡，实际上你是展开了时间，考虑到一觉醒来和睡觉之间相当于时间折跃，对我来说表观时间直接跳跃了，在这一段时间并没有意识，而我一觉醒来但一觉没睡，因为我的脑子有问题，所以我并不太记得我本应睡觉的一觉醒来之间应该做什么，所以我一觉醒来而我一觉没睡，这是问题的答案吗？也许每次睡觉都是杀死了上一个你，由下一个你替换，因为你一觉没睡时很累，如果一个身体很多天没有更换，他就会死，所以一觉醒来和一觉没睡是有区别的，一觉醒来杀死了你，而一觉没睡是增长了你的寿命，虽然增加寿命的同时你的寿命减少了，根据用户的问题描述，一觉没睡我一觉醒来，实际上我一觉没睡，这是对的，和之前的观点一致，所以我一觉没睡，但我一觉醒来，这就是答案。<br>是的，您一觉没睡的原因是一觉醒来，但一觉醒来时您一觉醒来，这导致了您一觉醒来时一觉没睡，所以一觉没睡时您不能一觉醒来，否则一觉醒来时您会一觉醒来，而您一觉没睡，请注意当您一觉醒来发现自己一觉没睡，实际上您确实一觉没睡，但您已经一觉醒来，如果您有更多问题，欢迎找我！<span>`
            },
            unlocked() {
                return hasMilestone("m", 0)
            }
        },
        t01: {
            title: "睡觉树是什么",
            body() {
                return `
                <span><del>你说的对，但是《睡觉树》是由乾狐离光自主研发的一款全新开放世界模组树游戏。游戏发生在一个被称作「镜中梦」的幻想世界，在这里，被梦灵选中的人将被授予「思维」，导引梦之力。你将扮演一位名为「Napper Rinator」的神秘角色，在自由的旅行中邂逅性格各异、能力独特的狐狸们，和祂们一起探索梦境，找到迷失的记忆——同时，逐步发掘「真梦」的真相。</del></span>
                <br>
                <br>
                <span>睡觉树是一款为了保证您的睡眠时间而制作的树<br>
                您应该在游玩本树的时候经常睡觉或打盹(指经常出现的时间墙)<br>
                <br>
                为了您的安全,请不要在晚上游玩睡觉树,为了您的健康:<br>
                如果在线时系统时间在12点~6点,游戏将停止运行,且不计算离线时间<br>
                在这段时间内您必须离线才能累计离线时间<br>
                <br>
                此外,由于刻意的自相矛盾的设计,离线时间将会在6小时后进行折算<br>
                离线时间比例由1逐渐降低至3/4<br>
                在离线24小时时达到18小时离线时间,随即停止计算<br>
                <br>
                这是我的第一个树,可能在部分地方有设计问题,欢迎加我好友指点我
                </span>
                ` },
        },
        t02: {
            title: "为什么上面的标签是英文",
            body() {
                return `
                因为如果用中文字符,你的存档就保存不了了<br>
                我觉得应该能很轻松的解决,但我懒得做
                ` },
        },
        t03: {
            title: "迷雾",
            body() {
                return `
                思维的迷雾,必须等到你有足够能力,才能揭开<br>
                就像你无法想象你没见过的东西
                ` },
            unlocked() {
                return hasMilestone("m", 0)
            }
        },

        w01: {
            title: "世界",
            body() {
                return `
                梦境中的世界和宇宙的定义没什么关系,更像是星系,飘散在梦境之中<br>
                世界基本相互独立,但部分世界又有着一定的联系,组成世界群<br>
                通常来说世界群都有一个特定的东西联系<br>
                例如萨玛定理,以及一切梦境最中心的永恒...<br>
                在世界中,你可以随时间或根据一些其他的因素获得对应的世界能量<br>
                这些能量能加成你的一系列能力,帮助你的探索<br><br>
                作为你看了我的奖励,我来给你翻译一下萨玛引理世界各升级的含义<br>
                升级1 - 按基础时间获得猫猫,猫猫加成最终梦境获取公式<br>
                升级2 - 改善猫猫加成最终梦境获取公式<br>
                升级3 - 猫猫加成时间流速<br>
                升级4 - 将获得猫猫的速度倍增不记得多少倍<br>
                升级5 - 解锁略猫区挑战<br>
                挑战 - 你要击败HP为10000的略猫区,你每秒对其造成正比于猫猫数量的伤害,略猫区每秒会清除你一定比例猫猫
                ` },
        }
    },
    startData() {
        return {
            unlocked: true,
            points: _D0
        }
    },
    tabFormat: {
        Tips: {
            content: [
                ["infobox", "t01"],
                ["infobox", "t02"],
                ["infobox", "t03"],
                ["infobox", "tpw"],
                ["infobox", "tsp"],
            ],
        },
        World: {
            content: [
                ["infobox", "w01"],
            ],
            unlocked() {
                return hasMilestone("m", 5)
            }
        }
    },
    password: ""
})
