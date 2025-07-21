/*
MMMMMMMM               MMMMMMMM
M:::::::M             M:::::::M
M::::::::M           M::::::::M
M:::::::::M         M:::::::::M
M::::::::::M       M::::::::::M
M:::::::::::M     M:::::::::::M
M:::::::M::::M   M::::M:::::::M
M::::::M M::::M M::::M M::::::M
M::::::M  M::::M::::M  M::::::M
M::::::M   M:::::::M   M::::::M
M::::::M    M:::::M    M::::::M
M::::::M     MMMMM     M::::::M
M::::::M               M::::::M
M::::::M               M::::::M
M::::::M               M::::::M
MMMMMMMM               MMMMMMMM
*/
addLayer("m", {
    name: "思维",
    symbol: "🧠",
    resource: "思维",
    row: 0,
    position: 0,
    color: "#D89536",
    recPoints: _D0,
    mindDream: _D0,
    update(diff) {
        player[this.layer].recPoints = player.points
    },
    startData() {
        return {
            unlocked: false,
            points: _D0
        }
    },
    type: "static",
    baseResource: "梦境",
    baseAmount() {
        return player.points
    },
    requires: function () {
        return !hasMilestone("m", 0) ? _D50 :
            _D(35)
    },
    exponent: function () {
        return _D(1)
    },
    base: function () {
        return _D2
            .sub((hasUpgrade("e", 15) ? upgradeEffect("e", 15) : _D0))
            .sub((hasUpgrade("e", 31) ? upgradeEffect("e", 31)[1] : _D0))
            .sub(hasChallenge("s2", 11) ? _D(0.1) : _D(0))
    },
    gainMult() {
        return _D1
            .div((hasUpgrade("e", 31) ? upgradeEffect("e", 31)[0] : _D1))
    },
    roundUpCost: false,
    canBuyMax() {
        return hasUpgrade("e", 11)
    },
    tabFormat: {
        "Mind": {
            content: [
                "main-display",
                "blank",
                "prestige-button",
                "resource-display",
                ["display-text", function () {
                    return hasUpgrade("m", 22) ?
                        `上次汲取获得了 ${formatWhole(player.mindDream)} 梦境<br><br>`
                        :
                        ""
                }],
                ["display-text", function () {
                    return hasMilestone("m", 2) ?
                        `Mv1 = <h3 class="overlayThing" id="points">${format(player.M.Mv[1])}</h3>` :
                        ""
                }],
                ["display-text", function () {
                    return hasUpgrade("m", 25) ?
                        `Mv2 = <h3 class="overlayThing" id="points">${format(player.M.Mv[2])}</h3>` :
                        ""
                }],
                ["display-text", function () {
                    return hasUpgrade("m", 42) ?
                        `Mv3 = <h3 class="overlayThing" id="points">${format(player.M.Mv[3])}</h3>` :
                        ""
                }],
                "blank",
                ["clickable", 11],
                ["clickable", 12],
                "blank",
                "upgrades"
            ]
        },
        "MileStone": {
            content: [
                "milestones",
            ]
        }
    },
    clickables: {
        11: {
            title: "游戏时间倍速器",
            display() { return `<h3>将时间加速 ${format(clickableEffect("m", 11)[0])} 倍<br>但梦境获取速度除以 ${format(divNum(clickableEffect("m", 11)[1]))}<br>目前状态 : ${Boolean(getClickableState("m", 11)) ? "开" : "关"}</h3>` },
            style: {
                width: "240px",
                height: "60px",
                backgroundColor: "#D89536",
                border: "4px solid",
                borderRadius: "4px",
                borderColor: "rgba(0, 0, 0, 0.125)",
            },
            canClick() {
                return hasUpgrade("m", 15)
            },
            unlocked() {
                return hasUpgrade("m", 15)
            },
            onClick() {
                setClickableState("m", 11, !Boolean(getClickableState("m", 11)))
            },
            effect() {
                return [
                    (hasUpgrade("m", 15) ? upgradeEffect("m", 15) : _D1)
                    ,
                    (hasUpgrade("m", 15) ? upgradeEffect("m", 15).pow(
                        hasMilestone("m", 4) ?
                            _D1.neg() :
                            _D2.neg()
                    ) : _D1)
                ]
            }
        },
        12: {
            title: "正态随机发生器",
            display() { return `<h3>当前随机数: ${format(player.M.PreMv[2])} ${player.M.PreMv[2].gt(player.M.Mv[2]) ? "↑" : "↓"}<br>下一个随机数在 ${format(player.M.Tick[2])} 秒后<br>点击此按钮应用</h3>` },
            style: {
                width: "240px",
                height: "60px",
                backgroundColor: "#D89536",
                border: "4px solid",
                borderRadius: "4px",
                borderColor: "rgba(0, 0, 0, 0.125)",
            },
            canClick() {
                return hasUpgrade("m", 25)
            },
            unlocked() {
                return hasUpgrade("m", 25)
            },
            onClick() {
                player.M.Mv[2] = player.M.PreMv[2]
            },
            effect() {
                return
            }
        }
    },
    upgrades: {
        11: {
            title: "[11]时间洪流怀表<br>[永不重置]",
            description: "台座效果:基础时间流速变为×60",
            effect: function () {
                return _D60
            },
            effectDisplay: function () {
                return `×${format(upgradeEffect("m", 11))}`
            },
            tooltip: "等价交换平衡破坏者<br>但在这里只是刚刚开始",
            cost: _D1,
        },
        12: {
            title: "[12]重新思索",
            description: "使用我寻思之力,思维加成梦境获取",
            effect: function () {
                return hasUpgrade("e", 12) ?
                    _D2
                        .add(
                            _D1.add(player[this.layer].points.mul(_D1.add(player.e.points))).pow(
                                _D(0.75).add((hasUpgrade("e", 25) ? upgradeEffect("e", 25) : _D0))
                            )
                        )
                    :
                    _D1
                        .add(
                            _D1.add(player[this.layer].points).log2()
                        )
            },
            effectDisplay: function () {
                return `×${format(upgradeEffect("m", 12))}`
            },
            tooltip: "要多想",
            cost: _D1,
            unlocked() {
                return hasUpgrade(this.layer, 11)
            }
        },
        13: {
            title: "[13]洞察真实",
            description: "显示当前游戏时间<br>并将时间流速×1.01",
            effect: function () {
                return _D(1.01)
            },
            effectDisplay: function () {
                return `×${format(upgradeEffect("m", 13))}`
            },
            tooltip: "什么,原来我忘记加当前游戏时间显示了!",
            cost: _D2,
            unlocked() {
                return hasUpgrade(this.layer, 12)
            }
        },
        14: {
            title: "[14]幻想沉溺",
            description: "醒着时获得睡眠时获取量^0.5的梦境<br>醒时梦境获取加成在此之后计算",
            effect: function () {
                return divNum(_D2)
            },
            effectDisplay: function () {
                return `^${format(upgradeEffect("m", 14))}`
            },
            tooltip: "它到底有什么用呢?",
            cost: _D3,
            unlocked() {
                return hasUpgrade(this.layer, 13)
            }
        },
        15: {
            title: "[15]天堂制造",
            description: function () {
                return "解锁一个机器<br>你可以加速时间<br>代价是期间点数获取除以加速倍速" + (hasMilestone("m", 4) ? "" : "平方")
            },
            effect: function () {
                return _D5
                    .mul(hasUpgrade("m", 24) ? upgradeEffect("m", 24) : _D1)
            },
            tooltip: "时间要开始加速了哟~",
            cost: _D1,
            unlocked() {
                return hasUpgrade(this.layer, 14)
            }
        },
        21: {
            title: "[21]时之加冕",
            description: "游戏时间加成梦境获取",
            effect: function () {
                return player.gameTime.div(_D(6000)).add(_D1).log(2.5).add(_D1)
                    .pow((hasUpgrade("m", 31) ? upgradeEffect("m", 31) : _D1))
            },
            effectDisplay: function () {
                return `×${format(upgradeEffect("m", 21))}`
            },
            tooltip: "不要一脸正经的说出这种话啊...",
            cost: _D3,
            unlocked() {
                return hasUpgrade(this.layer, 15)
            }
        },
        22: {
            title: "[22]回响再现",
            description: function () {
                return `上一次汲取思维时的梦境数被记录,并加成${hasUpgrade("e", 21) ? "醒时和总" : "醒时"}梦境获取`
            },
            effect: function () {
                return (player.mindDream).pow(_D(0.2)).add(_D1)
                    .pow((hasUpgrade("m", 31) ? upgradeEffect("m", 31) : _D1))
            },
            effectDisplay: function () {
                return `×${format(upgradeEffect("m", 22))}`
            },
            tooltip: "你没办法阻止一切噪音",
            cost: _D4,
            unlocked() {
                return hasUpgrade(this.layer, 21)
            }
        },
        23: {
            title: "[23]与时俱进",
            description: "游戏时间加成Mv1",
            effect: function () {
                return (hasUpgrade("m", 34) ?
                    player.gameTime.div(_D(32400)).add(_D1)
                        .pow(_D(0.95))
                    :
                    player.gameTime.div(_D(43200)).add(_D1)
                        .pow(_D(0.9))
                )
                    .pow(_D(0.75))
                    .pow((hasUpgrade("m", 31) ? upgradeEffect("m", 31) : _D1))
            },
            effectDisplay: function () {
                return `×${format(upgradeEffect("m", 23))}`
            },
            tooltip: "我一直在变大~~~~~",
            cost: _D5,
            unlocked() {
                return hasUpgrade(this.layer, 22)
            }
        },
        24: {
            title: "[24]时间膨胀",
            description: "思维升级21加成游戏时间倍增器速度",
            effect: function () {
                let e = upgradeEffect("m", 21)
                if (e.gte(_D(12))) e = e.div(_D(12)).pow(0.5).mul(_D(12))
                return e
            },
            effectDisplay: function () {
                return `×${format(upgradeEffect("m", 24))}${upgradeEffect("m", 24).gte(_D(12)) ? "<br>软上限在×12" : ""}`
            },
            tooltip: "时间加速时间加速加速",
            cost: _D6,
            unlocked() {
                return hasUpgrade(this.layer, 23)
            }
        },
        25: {
            title: "[25]别按按钮",
            description: "解锁一个机器<br>你的梦境获取乘以一个新的变量Mv2",
            tooltip: "我只有一件事要说,千万别按它",
            cost: _D1,
            unlocked() {
                return hasUpgrade(this.layer, 24)
            }
        },
        31: {
            title: "[31]螺旋升天",
            description: "以一种非常螺旋升天的姿势加强思维升级21~23的效果至^1.14514",
            effect: function () {
                return _D(1.14514)
            },
            effectDisplay: function () {
                return `^${format(upgradeEffect("m", 31))}`
            },
            tooltip: "草率的升级,草饲了我",
            cost: _D(10),
            unlocked() {
                return hasUpgrade(this.layer, 25) && hasUpgrade("e", 13)
            }
        },
        32: {
            title: "[32]狗白兔沃",
            description: "正态随机发生器速度和效果×2.5",
            effect: function () {
                return 2.5
            },
            effectDisplay: function () {
                return `×${format(upgradeEffect("m", 32))}`
            },
            tooltip: "Go back to work",
            cost: _D(15),
            unlocked() {
                return hasUpgrade(this.layer, 31)
            }
        },
        33: {
            title: "[33]相濡以沫",
            description: "一次可获得多个体验",
            tooltip: "你醒啦?该看看那边了!",
            cost: _D(20),
            unlocked() {
                return hasUpgrade(this.layer, 32)
            }
        },
        34: {
            title: "[34]时间简史",
            description: "改善思维升级23的公式",
            tooltip: "我没有时间捡屎",
            cost: _D(25),
            unlocked() {
                return hasUpgrade(this.layer, 33)
            }
        },
        35: {
            title: "[35]无尽抽卡",
            description: "游戏时间倍速器可加速正态随机发生器(硬上限:×80)",
            effect: function () {
                return Decimal.min(_D(80), clickableEffect("m", 11)[0])
            },
            effectDisplay: function () {
                return `×${format(upgradeEffect("m", 35))}`
            },
            tooltip: "你现在有1,000,000,000张卡可以抽",
            cost: _D(32),
            unlocked() {
                return hasUpgrade(this.layer, 34)
            }
        },
        41: {
            title: "[41]舒适的床",
            description: "每日睡眠时间提升至8小时",
            effect: function () {
                return _D(7200)
            },
            tooltip: "一张床就能让你的人生变得更美妙,不是吗?",
            cost: _D(50),
            unlocked() {
                return hasUpgrade(this.layer, 35)
            }
        },
        42: {
            title: "[42]猫的力量",
            description: "梦境获取乘以一个新的变量Mv3",
            tooltip: "Mv3基于Mv1和Mv2的算术平方根",
            cost: _D(60),
            unlocked() {
                return hasUpgrade(this.layer, 41) && hasChallenge("s1", 11)
            }
        },
    },
    milestones: {
        0: {
            requirementDescription: "1思维 | 一觉醒来我一觉醒来,而我不变 [永不重置]",
            effectDescription: '回家吧,孩子,回家吧,躺在床上做一个春秋大梦,猪怎么过你就怎么过<br>略微降低汲取思维所需梦境,你每日的睡眠时间限制为6小时,也就是每天的0:00~6:00<br>非睡眠时间你是不会做梦的,也许生活方式的改变可以增加你的睡眠时间...',
            done() { return player[this.layer].points.gte(_D1) }
        },
        1: {
            requirementDescription: function () {
                return ifElseVirable("hasMilestone('m',0)", "v", "randomString(v.length)", `"2思维 | 敌人比我们想象中的要弱,吗?"`)
            },
            effectDescription: function () {
                return `${ifElseVirable("hasMilestone('m',1)", "v", "randomString(v.length)",
                    `"你也许也意识到了这件事,旅船是掩盖未来的虚像,后面忘了"`
                )}
                    <br>
                    ${ifElseVirable("hasMilestone('m',1)", "v", "randomString(v.length)",
                    `"由于你被梗侵蚀过多,你睡觉时脑子里充斥着各种奇异的内容"`
                )}
                    <br>
                    ${ifElseVirable("hasMilestone('m',1)", "v", "randomString(v.length)",
                    `"解锁一系列新的新闻,且点击新闻栏可将游戏速度+棍母倍"`
                )}
                    `
            },
            done() { return player[this.layer].points.gte(_D2) }
        },
        2: {
            requirementDescription: function () {
                return ifElseVirable("hasMilestone('m',1)", "v", "randomString(v.length)", `"3思维 | Are You Lost?"`)
            },
            effectDescription: function () {
                return `${ifElseVirable("hasMilestone('m',2)", "v", "randomString(v.length)",
                    `"梦核是一种超现实主义美学,以媒体为介质,描绘与梦境有关的情景"`
                )}
                    <br>
                    ${ifElseVirable("hasMilestone('m',2)", "v", "randomString(v.length)",
                    "`恍惚之间,你进入了奇异的${randomString(4)},有人在看着你...你由不可名状处汲取力量`"
                )}
                    <br>
                    ${ifElseVirable("hasMilestone('m',2)", "v", "randomString(v.length)",
                    `"受此影响,你的梦境获取乘以一个新的变量Mv1"`
                )}
                    `
            },
            done() { return player[this.layer].points.gte(_D3) }
        },
        3: {
            requirementDescription: function () {
                return ifElseVirable("hasMilestone('m',2)", "v", "randomString(v.length)", `"6思维 | 一重界定"`)
            },
            effectDescription: function () {
                return `${ifElseVirable("hasMilestone('m',3)", "v", "randomString(v.length)",
                    `"|刻度界定时间,混沌初现涟漪|引力折叠虚无,星辰凝结成诗|"`
                )}
                    <br>
                    ${ifElseVirable("hasMilestone('m',3)", "v", "randomString(v.length)",
                    `"|凡愚尺度记忆,存在流向消逝|永恒沉默如迷,静候万物寂寥|"`
                )}
                    <br>
                    ${ifElseVirable("hasMilestone('m',3)", "v", "randomString(v.length)",
                    `"解锁一个新层级"`
                )}
                    `
            },
            done() { return player[this.layer].points.gte(_D6) }
        },
        4: {
            requirementDescription: function () {
                return ifElseVirable("hasMilestone('m',3)", "v", "randomString(v.length)", `"20思维 | 时间的代价"`)
            },
            effectDescription: function () {
                return `${ifElseVirable("hasMilestone('m',4)", "v", "randomString(v.length)",
                    `"玩弄时间的人啊,你可否看到世界在你眼前展开?"`
                )}
                    <br>
                    ${ifElseVirable("hasMilestone('m',4)", "v", "randomString(v.length)",
                    `"那就是你在寻找的新世界,用你的眼去看,用你的耳去听,用你的手改变..."`
                )}
                    <br>
                    ${ifElseVirable("hasMilestone('m',4)", "v", "randomString(v.length)",
                    `"游戏时间倍速器的负面效果变为一次方"`
                )}
                    `
            },
            done() { return player[this.layer].points.gte(_D(20)) }
        },
        5: {
            requirementDescription: function () {
                return ifElseVirable("hasMilestone('m',4)", "v", "randomString(v.length)", `"40思维 | 萨玛定理"`)
            },
            effectDescription: function () {
                return `${ifElseVirable("hasMilestone('m',5)", "v", "randomString(v.length)",
                    `"你不知道为什么你会听到这个词,但它就存在于这里"`
                )}
                    <br>
                    ${ifElseVirable("hasMilestone('m',5)", "v", "randomString(v.length)",
                    `"你不知道它会给你带来什么,但你必须去探索"`
                )}
                    <br>
                    ${ifElseVirable("hasMilestone('m',5)", "v", "randomString(v.length)",
                    `"解锁一个新世界"`
                )}
                    `
            },
            done() { return player[this.layer].points.gte(_D(40)) }
        },
        6: {
            requirementDescription: function () {
                return ifElseVirable("hasMilestone('m',5)", "v", "randomString(v.length)", `"80思维 | 梦间游离之物"`)
            },
            effectDescription: function () {
                return `${ifElseVirable("hasMilestone('m',6)", "v", "randomString(v.length)",
                    `"你是一个在锻造屋工作的年轻人,突然有一天,店长找到你告诉你他欠了10亿元"`
                )}
                    <br>
                    ${ifElseVirable("hasMilestone('m',6)", "v", "randomString(v.length)",
                    `"无论如何你都只能帮他还债了对吧"`
                )}
                    <br>
                    ${ifElseVirable("hasMilestone('m',6)", "v", "randomString(v.length)",
                    `"获得10亿负遗产,但我知道你不想要,所以你现在能穿梭于梦境之间"`
                )}
                    `
            },
            done() { return player[this.layer].points.gte(_D(80)) }
        },
        10: {
            requirementDescription: function () {
                return ifElseVirable("hasMilestone('m',10)", "v", "randomString(v.length)", `"10000思维 | 和我一起做梦,好么"`)
            },
            effectDescription: function () {
                return `${ifElseVirable("hasMilestone('m',10)", "v", "randomString(v.length)",
                    `"解锁一个思维挑战"`
                )}
                    <br>
                    ${ifElseVirable("hasMilestone('m',10)", "v", "randomString(v.length)",
                    `"你将会在挑战中得到你想知道的答案"`
                )}
                    <br>
                    ${ifElseVirable("hasMilestone('m',10)", "v", "randomString(v.length)",
                    `"——Napper Rinator"`
                )}
                    `
            },
            done() { return player[this.layer].points.gte(_DInf) }
        },
    },
    onPrestige(gain) {
        player.gameTime = _D0
        player.M.Mv[2] = _D1
        player.M.PreMv[2] = _D1
    },
    doReset(resettingLayer) {
        if (["p", "s2"].includes(resettingLayer)) return;

        player.mindDream = player[this.layer].recPoints

        if (["m", "e"].includes(resettingLayer)) {

        } else {
            layerDataReset("m");

            player.m.upgrades.push(11);
            player.m.milestones.push(0);
        }
    },
    layerShown() { return true },
    hotkeys: [
        {
            key: "m",
            description: "m: 汲取思维",
            onPress() {
                doReset("m")
            },
            unlocked() { return true }
        },
        {
            key: "t",
            description: "t: 切换时间加速状态",
            onPress() {
                layers.m.clickables[11].onClick()
            },
            unlocked() { return hasUpgrade("m", 15) }
        },
        {
            key: "r",
            description: "r: 应用随机数",
            onPress() {
                layers.m.clickables[12].onClick()
            },
            unlocked() { return hasUpgrade("m", 15) }
        }
    ],
    branches: ["e", "s1"]
});


/*
EEEEEEEEEEEEEEEEEEEEEE
E::::::::::::::::::::E
E::::::::::::::::::::E
EE::::::EEEEEEEEE::::E
  E:::::E       EEEEEE
  E:::::E             
  E::::::EEEEEEEEEE   
  E:::::::::::::::E   
  E:::::::::::::::E   
  E::::::EEEEEEEEEE   
  E:::::E             
  E:::::E       EEEEEE
EE::::::EEEEEEEE:::::E
E::::::::::::::::::::E
E::::::::::::::::::::E
EEEEEEEEEEEEEEEEEEEEEE
*/
addLayer("e", {
    name: "体验",
    symbol: "💖",
    resource: "体验",
    row: 0,
    position: 1,
    color: "#d093d3",
    recPoints: _D0,
    mindDream: _D0,
    update(diff) {
        player[this.layer].recPoints = player.points
    },
    startData() {
        return {
            unlocked: false,
            points: _D0
        }
    },
    type: "static",
    baseResource: "梦境",
    baseAmount() {
        return player.points
    },
    requires: function () {
        return _D(1000)
    },
    exponent: function () {
        return _D(1.1)
    },
    base: function () {
        return _D(2)
            .sub(hasChallenge("s1", 11) ? _D(0.1) : _D(0))
            .sub(hasChallenge("s2", 11) ? _D(0.1) : _D(0))
    },
    roundUpCost: false,
    canBuyMax() {
        return hasUpgrade("m", 33)
    },
    tabFormat: [
        "main-display",
        "blank",
        "prestige-button",
        "resource-display",
        "blank",
        "upgrades",
    ],
    clickables: {
    },
    upgrades: {
        11: {
            title: "[11]反界定",
            description: "一次可汲取多个思维",
            tooltip: "你拒绝了世界的界定",
            cost: _D0,
        },
        12: {
            title: "[12]反阻尼",
            description: "强化思维升级12的公式,且体验也影响该升级",
            tooltip: "你扯开了所有的弹簧",
            cost: _D1,
            unlocked() {
                return hasUpgrade(this.layer, 11)
            }
        },
        13: {
            title: "[13]反限制",
            description: "解锁新的思维升级",
            tooltip: "你打破了既定的限制",
            cost: _D2,
            unlocked() {
                return hasUpgrade(this.layer, 12)
            }
        },
        14: {
            title: "[14]反睡眠",
            description: "睡眠时时间流速×2",
            effect: function () {
                return _D2
            },
            effectDisplay: function () {
                return `×${format(upgradeEffect("e", 14))}`
            },
            tooltip: "你不想再睡觉任何一点",
            cost: _D3,
            unlocked() {
                return hasUpgrade(this.layer, 13)
            }
        },
        15: {
            title: "[15]反成本",
            description: "汲取思维成本指数-0.4",
            effect: function () {
                return _D(0.4)
            },
            effectDisplay: function () {
                return `-^${format(upgradeEffect("e", 15))}`
            },
            tooltip: "你是资本家,你要降本增笑了",
            cost: _D4,
            unlocked() {
                return hasUpgrade(this.layer, 14)
            }
        },
        21: {
            title: "[21]反清醒",
            description: "思维升级22的效果额外加成梦境获取",
            tooltip: "你不想再清醒任何一点",
            cost: _D5,
            unlocked() {
                return hasUpgrade(this.layer, 15)
            }
        },
        22: {
            title: "[22]反变量",
            description: "Mv1变量保持为最大值",
            tooltip: '"给我停下来",你大吼道',
            cost: _D(8),
            unlocked() {
                return hasUpgrade(this.layer, 21)
            }
        },
        23: {
            title: "[23]反操作",
            description: "当随机出的随机数大于当前数,自动应用它",
            tooltip: "自动化最终会代替你的一切",
            cost: _D(12),
            unlocked() {
                return hasUpgrade(this.layer, 22)
            }
        },
        24: {
            title: "[24]反倒退",
            description: "获得体验不再重置任何东西",
            tooltip: "喂喂喂!朋友,这可不兴举例",
            cost: _D(20),
            unlocked() {
                return hasUpgrade(this.layer, 23)
            }
        },
        25: {
            title: "[25]反低效",
            description: "大幅增强思维升级12的效果",
            tooltip: "你想要更极致的,更纯粹的...",
            effect: function () {
                return _D(0.4)
            },
            effectDisplay: function () {
                return `+^${format(upgradeEffect("e", 25))}`
            },
            cost: _D(25),
            unlocked() {
                return hasUpgrade(this.layer, 24)
            }
        },
        31: {
            title: "[31]正回路",
            description: "汲取思维成本/10,指数-0.05",
            tooltip: "等等,正反是不是要湮灭了?",
            effect: function () {
                return [
                    _D(5), _D(0.05)
                ]
            },
            effectDisplay: function () {
                return `/${format(upgradeEffect("e", 31)[0])}<br>-^${format(upgradeEffect("e", 31)[1])}`
            },
            cost: _D(36),
            unlocked() {
                return hasUpgrade(this.layer, 24)
            }
        },
    },
    resetsNothing() {
        return hasUpgrade(this.layer, 24)
    },
    onPrestige(gain) {
        if (!hasUpgrade(this.layer, 24)) {
            player.gameTime = _D0
        }
    },
    doReset(resettingLayer) {
        if (["p", "s2"].includes(resettingLayer)) return;
    },
    layerShown() { return hasMilestone("m", 3) },
    hotkeys: [
        {
            key: "e",
            description: "e: 获得体验",
            onPress() {
                doReset("e")
            },
            unlocked() { return layers[this.layer].layerShown() }
        }
    ],
});
