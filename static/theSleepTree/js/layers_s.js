
/*
   SSSSSSSSSSSSSSS 
 SS:::::::::::::::S
S:::::SSSSSS::::::S
S:::::S     SSSSSSS
S:::::S            
S:::::S            
 S::::SSSS         
  SS::::::SSSSS    
    SSS::::::::SS  
       SSSSSS::::S 
            S:::::S
            S:::::S
SSSSSSS     S:::::S
S::::::SSSSSS:::::S
S:::::::::::::::SS 
 SSSSSSSSSSSSSSS   
*/
addLayer("s1", {
    name: "猫猫",
    symbol: "🐈️",
    resource: "猫猫",
    row: 1,
    position: 0,
    color: "#db5563",
    type: "none",
    startData() {
        return {
            unlocked: true,
            points: _D0
        }
    },
    update(diff) {
        if (hasUpgrade("s1", 11)) {
            player[this.layer].points = player[this.layer].points.add(
                nomachineSpeed()
                    .div(
                        hasUpgrade("s1", 13) ? _D(5) : _D(20)
                    )
                    .mul(hasChallenge("s1", 11) ? _D3 : _D1)
                    .mul(diff)
            )
        }

        if (inChallenge(this.layer, 11)) {
            if (layers[this.layer].bosshp.gt(_D0)) {
                layers[this.layer].bosshp = Decimal.min(_D(10000),
                    layers[this.layer].bosshp
                        .sub(player[this.layer].points.div(8).mul(diff))
                        .add(_D(15).mul(diff))
                )
            }
            if (layers[this.layer].bosshp.gt(_D0)) {
                player[this.layer].points = player[this.layer].points
                    .pow(_D(0.97).pow(diff))
            }
        }
    },
    infoboxes: {
        0: {
            title: "萨玛定理 - 公理",
            body() {
                return `
                此世界由猫组成,除此之外空间内基本上什么都没有<br>
                你在这里发现了少量梦境能量,你可以拿走它们<br>
                随着时间,这里会涌现出很多猫猫,你觉得这一层是安全的<br>
                ` },
        },
    },
    tabFormat: [
        ["infobox", 0],
        "main-display",
        ["display-text", function () {
            return "加成最终梦境获取×" + format(layers[this.layer].effect()[0])
        }],
        ["display-text", function () {
            return hasUpgrade("s1", 14) ? "加成时间流速×" + format(layers[this.layer].effect()[1]) : ""
        }],
        "blank",
        "upgrades",
        "challenges",
    ],
    effect() {
        return [
            player[this.layer].points.add(_D1).pow(
                hasUpgrade("s1", 12) ? _D(0.4) : _D(0.01)
            )
            ,
            player[this.layer].points.add(_D1).log(4).pow(
                hasUpgrade("s1", 14) ? _D(0.5) : _D(0)
            )
        ]
    },
    upgrades: {
        11: {
            title: "喵",
            description: "喵呜~喵喵喵!喵喵",
            tooltip: "你看到了一只猫",
            cost: _D0,
        },
        12: {
            title: "喵喵",
            description: "喵喵喵!喵~喵嗷~~喵呜",
            tooltip: "你看到了很多猫",
            cost: _D(372),
            unlocked() {
                return hasUpgrade(this.layer, 11)
            }
        },
        13: {
            title: "喵喵喵",
            description: "喵呜喵呜喵~呼噜呼噜~咪嗷",
            tooltip: "你已经不想再见到猫了",
            cost: _D(559),
            unlocked() {
                return hasUpgrade(this.layer, 12)
            }
        },
        14: {
            title: "喵喵喵喵",
            description: "喵喵~咕噜咕噜!",
            tooltip: "但你发现这里只有猫",
            cost: _D(2000),
            unlocked() {
                return hasUpgrade(this.layer, 13)
            }
        },
        15: {
            title: "喵喵喵喵喵",
            description: "喵喵?喵呜!哈!!!喵~...喵呜~...",
            tooltip: "我操,前面有个略猫区",
            cost: _D(10000),
            unlocked() {
                return hasUpgrade(this.layer, 14)
            }
        }
    },
    challenges: {
        11: {
            name: "呜",
            challengeDescription() {
                return "喵呜!喵喵,喵喵喵!咪咪喵~喵!<br>挑战时请勿刷新页面" +
                    (inChallenge(this.layer, 11) ? `<br>HP ${format(layers[this.layer].bosshp)}/10000` : "")
            },
            goalDescription() {
                return "喵喵,喵喵喵!"
            },
            rewardDescription() {
                return "1 世界完成<br>获得体验成本指数-0.1<br>获得猫猫速度×3"
            },
            canComplete() {
                return layers[this.layer].bosshp.lte(0)
            },
            unlocked() {
                return hasUpgrade(this.layer, 15)
            },
            onEnter() {
                layers[this.layer].bosshp = _D(10000)
            },
            onExit() {
                layers[this.layer].bosshp = _D(10000)
            },
            completionLimit: 1
        },
    },
    doReset(resettingLayer) {
        if (["p", "s2"].includes(resettingLayer)) return;
    },
    layerShown() { return hasMilestone("m", 5) },
    hotkeys: [
    ],
    bosshp: _D(10000),
    branches: ["s2"]
});

addLayer("s2", {
    name: "对数",
    symbol: "🌳",
    resource: "对数",
    row: 2,
    position: 0,
    color: "#ab6c13",
    type: "none",
    startData() {
        return {
            unlocked: true,
            points: _D0
        }
    },
    update(diff) {
        diff = Decimal.min(diff, _D(0.1))

        let l = player["S2"];

        l.log.log = (
            ((_D2).pow(l.log.log))
                .add(hasUpgrade("s2", 11) ?
                    upgradeEffect("s2", 11)
                        .mul(diff)
                    : _D0)
        ).log(_D2)
            .add(hasUpgrade("s2", 44) ?
                upgradeEffect("s2", 44)
                    .mul(diff)
                : _D0)

        l.antilog.log = l.antilog.log.add((!hasChallenge("s2", 11) && hasUpgrade("s2", 65) ?
            l.log.log.add(1).div(10)
            : _D1).mul(diff))

        if (hasUpgrade("s2", 32) && l.log.log.lte(999)) {
            let t = (_D1.add(upgradeEffect("s2", 32).div(_D100))).pow(diff)
            l.log.log = l.log.log.mul(t)
            if (hasUpgrade("s2", 43) && l.antilog.log.lt(_D0)) l.antilog.log = l.antilog.log.mul(t)
        }

        if (hasUpgrade("s2", 53)) {
            let d = l.antilog.log.mul(_D1.sub((_D1.sub(upgradeEffect("s2", 53).div(_D100))).pow(diff)))
            l.log.log = l.log.log.sub(d)
            l.antilog.log = l.antilog.log.sub(d)
        }

        if (l.antilog.log.gte(l.log.log)) {
            if (hasUpgrade("s2", 42) && (upgradeEffect("s2", 42) > 0)) {
                player.S2.t42 -= diff;

                l.log.points = _D(2).pow(l.log.log)
                l.antilog.points = _D(2).pow(l.antilog.log)
                return
            }
            this.annihilation()
        }

        l.log.points = _D(2).pow(l.log.log)
        l.antilog.points = _D(2).pow(l.antilog.log)
    },
    annihilation() {
        let l = player["S2"];
        l.log.log = hasChallenge("s2", 11) && hasUpgrade("s2", 65) ? _D(50) : _D0
        l.antilog.log = _D(-30).add(hasUpgrade("s2", 41) ? upgradeEffect("s2", 41) : _D(0))
        l.t42 = 10
    },
    infoboxes: {
        0: {
            title: "萨玛定理 - 引理",
            body() {
                return `
                这个世界略显混乱,所以你可能需要思考升级的购买顺序<br>
                有两种数,一种是对数,一种是错数<br>
                对数是宇宙的基石,错数是湮灭一切的祸根<br>
                永远不要容忍任何错误存在于你的世界中<br>
                否则你将终生抱憾<br>
                [为了避免可能存在的破坏,本层最大tick长度为100ms]
                ` },
        },
    },
    tabFormat: [
        ["infobox", 0],
        ["display-text", function () {
            return hasChallenge("s2", 11) ? `世界已完成,停止快捷键重置` : `你可以随时按A键重新挑战这个世界`
        }],
        "main-s2-1-display",
        "main-s2-2-display",
        "blank",
        ["display-text", function () {
            return `自然湮灭预计在 ${format(player["S2"].antilog.log.gte(player["S2"].log.log) ? upgradeEffect("s2", 42) : (player["S2"].log.log.sub(player["S2"].antilog.log)
                .add(hasUpgrade("s2", 42) ? (upgradeEffect("s2", 42)) : _D0)))} 秒后(购买升级后变得不那么准)`
        }],
        ["display-text", function () {
            return `大约能获得 ${format((
                ((_D2).pow(player["S2"].log.log))
                    .add(hasUpgrade("s2", 11) ?
                        upgradeEffect("s2", 11)
                            .mul(player["S2"].antilog.log.gte(player["S2"].log.log) ? upgradeEffect("s2", 42) : (player["S2"].log.log.sub(player["S2"].antilog.log)
                                .add(hasUpgrade("s2", 42) ? (upgradeEffect("s2", 42)) : _D0)))
                        : _D0)
            ).log(_D2).add(hasUpgrade("s2", 44) ?
                upgradeEffect("s2", 44)
                    .mul(player["S2"].antilog.log.gte(player["S2"].log.log) ? upgradeEffect("s2", 42) : (player["S2"].log.log.sub(player["S2"].antilog.log)
                        .add(hasUpgrade("s2", 42) ? (upgradeEffect("s2", 42)) : _D0)))
                : _D0))} 对数(请不要依赖这个,尤其是湮灭距离10秒以上)`
        }],
        "blank",
        "upgrades",
        "challenges",
    ],
    upgrades: {
        11: {
            fullDisplay() {
                return `
				<span><h3>${"常数发生器"}</h3></span><br>
				<span>${"每秒获得1常数"}</span><br>
                <span>
                效果: ×${format(this.effect())}
			    </span>
				<br><br>
                <span>
                开销: ${this.price} 对数
			    </span>
            `
            },
            effect: function () {
                return _D1
                    .mul(hasUpgrade("s2", 21) ? upgradeEffect("s2", 21) : _D1)
                    .mul(hasUpgrade("s2", 22) ? upgradeEffect("s2", 22) : _D1)
                    .mul(hasUpgrade("s2", 31) ? upgradeEffect("s2", 31) : _D1)
                    .pow(hasUpgrade("s2", 33) ? upgradeEffect("s2", 33) : _D1)
            },
            tooltip: "改变这个世界,直到湮灭",
            canAfford() {
                return player["S2"].log.log.gte(this.price)
            },
            pay() {
                return player["S2"].log.log = player["S2"].log.log.sub(this.price)
            },
            price: _D0
        },
        21: {
            fullDisplay() {
                return `
				<span><h3>${"对数推进器"}</h3></span><br>
				<span>${"常数获取×(对数+1)"}</span><br>
                <span>
                效果: ×${format(this.effect())}
			    </span>
				<br><br>
                <span>
                开销: ${formatWhole(this.price())} 对数
			    </span>
            `
            },
            effect: function () {
                if (!hasUpgrade("s2", 21)) return 0
                return player["S2"].log.log.add(_D1)
                    .pow(hasUpgrade("s2", 52) ? upgradeEffect("s2", 52) : _D1)
            },
            unlocked() {
                return hasUpgrade("s2", 11)
            },
            tooltip: "利用正确的道路,为自己所做打下基础",
            canAfford() {
                return player["S2"].log.log.gte(this.price())
            },
            pay() {
                return player["S2"].log.log = player["S2"].log.log.sub(this.price())
            },
            price() {
                return _D5.add(hasUpgrade("s2", 22) ? _D(2.5) : _D0)
            }
        },
        22: {
            fullDisplay() {
                return `
				<span><h3>${"错数推进器"}</h3></span><br>
				<span>${"常数获取×(错数绝对值平方根+1.5)"}</span><br>
                <span>
                效果: ×${format(this.effect())}
			    </span>
				<br><br>
                <span>
                开销: ${formatWhole(this.price())} 对数
			    </span>
            `
            },
            effect: function () {
                if (!hasUpgrade("s2", 22)) return 0
                return (player["S2"].antilog.log.abs()).pow(divNum(_D2)).add(_D(1.5))
                    .pow(hasUpgrade("s2", 52) ? upgradeEffect("s2", 52) : _D1)
            },
            unlocked() {
                return hasUpgrade("s2", 11)
            },
            tooltip: "有的时候,暗处的东西可能更迷人,但也更危险",
            canAfford() {
                return player["S2"].log.log.gte(this.price())
            },
            pay() {
                return player["S2"].log.log = player["S2"].log.log.sub(this.price())
            },
            price() {
                return _D5.add(hasUpgrade("s2", 21) ? _D(2.5) : _D0)
            }
        },
        31: {
            fullDisplay() {
                return `
				<span><h3>${"谬误倍增器"}</h3></span><br>
				<span>${"常数获取×异数的错数次根的平方的对错膨胀机基础百分比的100倍"}</span><br>
                <span>
                效果: ×${format(this.effect())}
			    </span>
				<br><br>
                <span>
                开销: ${formatWhole(this.price())} 对数
			    </span>
            `
            },
            effect: function () {
                if (!hasUpgrade("s2", 31)) return 0
                return _D(3.56)
            },
            unlocked() {
                return hasUpgrade("s2", 21) && hasUpgrade("s2", 22)
            },
            tooltip: "这个机器的存在仿佛就是一种谬误,你读不懂它",
            canAfford() {
                return player["S2"].log.log.gte(this.price())
            },
            pay() {
                return player["S2"].log.log = player["S2"].log.log.sub(this.price())
            },
            price() {
                return _D10
                    .add(hasUpgrade("s2", 32) ? _D(3.5) : _D0)
                    .add(hasUpgrade("s2", 33) ? _D(3.5) : _D0)
            }
        },
        32: {
            fullDisplay() {
                return `
				<span><h3>${"对错膨胀机"}</h3></span><br>
				<span>${(hasUpgrade("s2",43)?"对数每秒膨胀一个小于100但大于0的百分比":"对数和错数每秒膨胀一个小于100但大于0的百分比")+(hasChallenge("s2", 11) ?"<br>999对数后不再生效":"")}</span><br>
                <span>
                效果: ${format(this.effect())}%
			    </span>
				<br><br>
                <span>
                开销: ${formatWhole(this.price())} 对数
			    </span>
            `
            },
            effect: function () {
                if (!hasUpgrade("s2", 32)) return 0
                return _D(0.84).mul(hasUpgrade("s2", 43) ? upgradeEffect("s2", 43) : _D1)
            },
            unlocked() {
                return hasUpgrade("s2", 21) && hasUpgrade("s2", 22)
            },
            tooltip: "你可能也发现了,前方是毁灭,亦是重生",
            canAfford() {
                return player["S2"].log.log.gte(this.price())
            },
            pay() {
                return player["S2"].log.log = player["S2"].log.log.sub(this.price())
            },
            price() {
                return _D10
                    .add(hasUpgrade("s2", 31) ? _D(3.5) : _D0)
                    .add(hasUpgrade("s2", 33) ? _D(3.5) : _D0)
            }
        },
        33: {
            fullDisplay() {
                return `
				<span><h3>${"维度展开机"}</h3></span><br>
				<span>${"常数获取^(V<sub>球</sub>/πr³)"}</span><br>
                <span>
                效果: ^${format(this.effect())}
			    </span>
				<br><br>
                <span>
                开销: ${formatWhole(this.price())} 对数
			    </span>
            `
            },
            effect: function () {
                if (!hasUpgrade("s2", 33)) return 0
                return _D(4 / 3)
            },
            unlocked() {
                return hasUpgrade("s2", 21) && hasUpgrade("s2", 22)
            },
            tooltip: "维度,展开!现在你看到了一个球,但有什么用?",
            canAfford() {
                return player["S2"].log.log.gte(this.price())
            },
            pay() {
                return player["S2"].log.log = player["S2"].log.log.sub(this.price())
            },
            price() {
                return _D10
                    .add(hasUpgrade("s2", 31) ? _D(3.5) : _D0)
                    .add(hasUpgrade("s2", 32) ? _D(3.5) : _D0)
            }
        },
        41: {
            fullDisplay() {
                return `
				<span><h3>${"污染对冲机"}</h3></span><br>
				<span>${"降低错数的起始值"}</span><br>
                <span>
                效果: ${format(this.effect())}
			    </span>
				<br><br>
                <span>
                开销: ${formatWhole(this.price())} 对数
			    </span>
            `
            },
            effect: function () {
                if (!hasUpgrade("s2", 41)) return 0
                return _D(-15)
            },
            unlocked() {
                return hasUpgrade("s2", 31) && hasUpgrade("s2", 32) && hasUpgrade("s2", 33)
            },
            tooltip: "这些脏污令人感到反胃,你不想再看到这些",
            canAfford() {
                return player["S2"].log.log.gte(this.price())
            },
            pay() {
                return player["S2"].log.log = player["S2"].log.log.sub(this.price())
            },
            price() {
                return _D(20)
                    .add(hasUpgrade("s2", 42) ? _D(5) : _D0)
                    .add(hasUpgrade("s2", 43) ? _D(5) : _D0)
                    .add(hasUpgrade("s2", 44) ? _D(5) : _D0)
            }
        },
        42: {
            fullDisplay() {
                return `
				<span><h3>${"给我时间机"}</h3></span><br>
				<span>${"我只需要一首歌的时间,但这首歌是(^ ^),你甚至有空听两遍"}</span><br>
                <span>
                效果: ${formatTime(this.effect())}
			    </span>
				<br><br>
                <span>
                开销: ${formatWhole(this.price())} 对数
			    </span>
            `
            },
            effect: function () {
                if (!hasUpgrade("s2", 42)) return 0
                return player["S2"].t42
            },
            unlocked() {
                return hasUpgrade("s2", 31) && hasUpgrade("s2", 32) && hasUpgrade("s2", 33)
            },
            tooltip: "能不能给我一首歌的时间~~~",
            canAfford() {
                return player["S2"].log.log.gte(this.price())
            },
            pay() {
                return player["S2"].log.log = player["S2"].log.log.sub(this.price())
            },
            price() {
                return _D(20)
                    .add(hasUpgrade("s2", 41) ? _D(5) : _D0)
                    .add(hasUpgrade("s2", 43) ? _D(5) : _D0)
                    .add(hasUpgrade("s2", 44) ? _D(5) : _D0)
            }
        },
        43: {
            fullDisplay() {
                return `
				<span><h3>${"冗余卸载机"}</h3></span><br>
				<span>${"对错膨胀机更强一点点且的效果在错数大于0时不再生效"}</span><br>
                <span>
                效果: ×${format(this.effect())}
			    </span>
				<br><br>
                <span>
                开销: ${formatWhole(this.price())} 对数
			    </span>
            `
            },
            effect: function () {
                if (!hasUpgrade("s2", 43)) return 0
                return _D(1.111)
            },
            unlocked() {
                return hasUpgrade("s2", 31) && hasUpgrade("s2", 32) && hasUpgrade("s2", 33)
            },
            tooltip: "你改装了对错膨胀机,现在前方只有重生了,但你分数不是0",
            canAfford() {
                return player["S2"].log.log.gte(this.price())
            },
            pay() {
                return player["S2"].log.log = player["S2"].log.log.sub(this.price())
            },
            price() {
                return _D(20)
                    .add(hasUpgrade("s2", 41) ? _D(5) : _D0)
                    .add(hasUpgrade("s2", 42) ? _D(5) : _D0)
                    .add(hasUpgrade("s2", 44) ? _D(5) : _D0)
            }
        },
        44: {
            fullDisplay() {
                return `
				<span><h3>${"愚蠢的人机"}</h3></span><br>
				<span>${"每秒获得非常少的一点点你根本看不上的对数"}</span><br>
                <span>
                效果: +${format(this.effect())}
			    </span>
				<br><br>
                <span>
                开销: ${formatWhole(this.price())} 对数
			    </span>
            `
            },
            effect: function () {
                if (!hasUpgrade("s2", 44)) return 0
                return _D(0.045)
            },
            unlocked() {
                return hasUpgrade("s2", 31) && hasUpgrade("s2", 32) && hasUpgrade("s2", 33)
            },
            tooltip: "它只是愚蠢的以为自己真的有很大用!",
            canAfford() {
                return player["S2"].log.log.gte(this.price())
            },
            pay() {
                return player["S2"].log.log = player["S2"].log.log.sub(this.price())
            },
            price() {
                return _D(20)
                    .add(hasUpgrade("s2", 41) ? _D(5) : _D0)
                    .add(hasUpgrade("s2", 42) ? _D(5) : _D0)
                    .add(hasUpgrade("s2", 43) ? _D(5) : _D0)
            }
        },
        51: {
            fullDisplay() {
                return `
				<span><h3>${hasUpgrade("s2", 52) && hasUpgrade("s2", 53) ? "无能狂怒机" : "超级炸档机"}</h3></span><br>
				<span>${hasUpgrade("s2", 52) && hasUpgrade("s2", 53) ? "哈哈,你现在该点我了" : "你不需要点这个升级也能解锁下一层的内容,请不要点这个升级"}</span><br>
                <span>
                效果: ${this.effect()}
			    </span>
				<br><br>
                <span>
                开销: ${formatWhole(this.price())} 对数
			    </span>
            `
            },
            effect: function () {
                if (!hasUpgrade("s2", 51)) return "/0.000"
                if (hasUpgrade("s2", 52) && hasUpgrade("s2", 53)) return "解锁下一层"
                return "你他妈还真点啊"
            },
            unlocked() {
                return hasUpgrade("s2", 41) && hasUpgrade("s2", 42) && hasUpgrade("s2", 43) && hasUpgrade("s2", 43)
            },
            tooltip: "你想点了对吧!",
            canAfford() {
                return player["S2"].log.log.gte(this.price())
            },
            pay() {
                return player["S2"].log.log = player["S2"].log.log.sub(this.price())
            },
            price() {
                return _D(50)
                    .add(hasUpgrade("s2", 52) ? _D(10) : _D0)
                    .add(hasUpgrade("s2", 53) ? _D(-10) : _D0)
            }
        },
        52: {
            fullDisplay() {
                return `
				<span><h3>${hasUpgrade("s2", 52) ? "超级推进机" : "青红皂白机"}</h3></span><br>
				<span>${hasUpgrade("s2", 52) ? "大幅削弱它们的变缓力量也是削弱" : "我管你对错,全部给我清零,大幅削弱第二层升级"}</span><br>
                <span>
                效果: ^${format(this.effect())}
			    </span>
				<br><br>
                <span>
                开销: ${formatWhole(this.price())} 对数
			    </span>
            `
            },
            effect: function () {
                if (!hasUpgrade("s2", 52)) return 0
                return _D(1.145)
            },
            unlocked() {
                return hasUpgrade("s2", 41) && hasUpgrade("s2", 42) && hasUpgrade("s2", 43) && hasUpgrade("s2", 43)
            },
            tooltip: "",
            canAfford() {
                return player["S2"].log.log.gte(this.price())
            },
            pay() {
                return player["S2"].log.log = player["S2"].log.log.sub(this.price())
            },
            price() {
                return _D(50)
                    .add(hasUpgrade("s2", 51) ? _DInf : _D0)
                    .add(hasUpgrade("s2", 53) ? _D(10) : _D0)
            }
        },
        53: {
            fullDisplay() {
                return `
				<span><h3>${hasUpgrade("s2", 53) ? "粒子对撞机" : "错数屠宰机"}</h3></span><br>
				<span>${hasUpgrade("s2", 53) ? "用对数每秒抵消一定数量的错数" : "每秒消耗一定数量的错数(比例非常低,垃圾)"}</span><br>
                <span>
                效果: ${format(this.effect())}%
			    </span>
				<br><br>
                <span>
                开销: ${formatWhole(this.price())} 对数
			    </span>
            `
            },
            effect: function () {
                if (!hasUpgrade("s2", 53)) return 0
                return _D(0.975)
            },
            unlocked() {
                return hasUpgrade("s2", 41) && hasUpgrade("s2", 42) && hasUpgrade("s2", 43) && hasUpgrade("s2", 43)
            },
            tooltip: "蹦蹦蹦擦!炸了它们!",
            canAfford() {
                return player["S2"].log.log.gte(this.price())
            },
            pay() {
                return player["S2"].log.log = player["S2"].log.log.sub(this.price())
            },
            price() {
                return _D(50)
                    .add(hasUpgrade("s2", 51) ? _DInf : _D0)
                    .add(hasUpgrade("s2", 52) ? _D(10) : _D0)
            }
        },
        61: {
            fullDisplay() {
                return `
				<span><h3>${"这题你选择A选项"}</h3></span><br>
				<span>${"并将其涂在答题卡上"}</span><br>
                <br>
                <span>
                开销: ${formatWhole(this.price())} 对数
			    </span>
            `
            },
            unlocked() {
                return hasUpgrade("s2", 51) && !hasUpgrade("s2", 63)
            },
            tooltip: "D Nigger Roader",
            canAfford() {
                return player["S2"].log.log.gte(this.price())
            },
            pay() {
                return player["S2"].log.log = player["S2"].log.log.sub(this.price())
            },
            price() {
                return _D(50)
                    .add(!(hasUpgrade("s2", 52) && hasUpgrade("s2", 53)) ? _DInf : _D0)
            }
        },
        62: {
            fullDisplay() {
                return `
				<span><h3>${"这题你选择B选项"}</h3></span><br>
				<span>${"并将其涂在答题卡上"}</span><br>
                <br>
                <span>
                开销: ${formatWhole(this.price())} 对数
			    </span>
            `
            },
            unlocked() {
                return hasUpgrade("s2", 51) && !hasUpgrade("s2", 63)
            },
            tooltip: "A Nova Riverse",
            canAfford() {
                return player["S2"].log.log.gte(this.price())
            },
            pay() {
                return player["S2"].log.log = player["S2"].log.log.sub(this.price())
            },
            price() {
                return _D(50)
                    .add(!(hasUpgrade("s2", 52) && hasUpgrade("s2", 53)) ? _DInf : _D0)
            }
        },
        63: {
            fullDisplay() {
                return `
				<span><h3>${"这题你选择C选项"}</h3></span><br>
				<span>${"并将其涂在答题卡上"}</span><br>
                <br>
                <span>
                开销: ${formatWhole(this.price())} 对数
			    </span>
            `
            },
            unlocked() {
                return hasUpgrade("s2", 51) && !hasUpgrade("s2", 61) && !hasUpgrade("s2", 62) && !hasUpgrade("s2", 64)
            },
            tooltip: "B Nonafter Romantic",
            canAfford() {
                return player["S2"].log.log.gte(this.price())
            },
            pay() {
                return player["S2"].log.log = player["S2"].log.log.sub(this.price())
            },
            price() {
                return _D(50)
                    .add(!(hasUpgrade("s2", 52) && hasUpgrade("s2", 53)) ? _DInf : _D0)
            }
        },
        64: {
            fullDisplay() {
                return `
				<span><h3>${"这题你选择D选项"}</h3></span><br>
				<span>${"并将其涂在答题卡上"}</span><br>
                <br>
                <span>
                开销: ${formatWhole(this.price())} 对数
			    </span>
            `
            },
            unlocked() {
                return hasUpgrade("s2", 51) && !hasUpgrade("s2", 63)
            },
            tooltip: "C Napper Rinator",
            canAfford() {
                return player["S2"].log.log.gte(this.price())
            },
            pay() {
                return player["S2"].log.log = player["S2"].log.log.sub(this.price())
            },
            price() {
                return _D(50)
                    .add(!(hasUpgrade("s2", 52) && hasUpgrade("s2", 53)) ? _DInf : _D0)
            }
        },
        65: {
            fullDisplay() {
                return `
				<span><h3>${"鲤鱼跃门机"}</h3></span><br>
				<span>${hasChallenge("s2", 11) ? "每次湮灭后以50对数为起点" : "一次性获得很多对数,你要好好使用哦!"}</span><br>
                <br>
                <span>
                开销: ${formatWhole(this.price())} 对数
			    </span>
            `
            },
            unlocked() {
                return hasUpgrade("s2", 63)
            },
            tooltip: function () {
                return hasChallenge("s2", 11) ? "初始获得50对数" : "获得50对数,但错数开始快速膨胀"
            },
            canAfford() {
                return player["S2"].log.log.gte(this.price())
            },
            pay() {
                return player["S2"].log.log = player["S2"].log.log.sub(this.price())
            },
            price() {
                return _D(-50)
            }
        },
        66: {
            fullDisplay() {
                return `
				<span><h3>${"成就提取机"}</h3></span><br>
				<span>${"你是没发现走错路还是直奔我这个成就来的?"}</span><br>
                <br>
                <span>
                开销: ${formatWhole(this.price())} 对数
			    </span>
            `
            },
            unlocked() {
                return hasUpgrade("s2", 61) && hasUpgrade("s2", 62) && hasUpgrade("s2", 64)
            },
            tooltip: "获得一个成就",
            canAfford() {
                return player["S2"].log.log.gte(this.price())
            },
            pay() {
                return player["S2"].log.log = player["S2"].log.log.sub(this.price())
            },
            price() {
                return _D0
            }
        },
        71: {
            fullDisplay() {
                return `
				<span><h3>${"机器制造机"}</h3></span><br>
				<span>${"获得引理证明机"}</span><br>
                <br>
                <span>
                开销: ${formatWhole(this.price())} 对数
			    </span>
            `
            },
            unlocked() {
                return hasUpgrade("s2", 65)
            },
            tooltip: "我有证明,但这里写不下",
            canAfford() {
                return player["S2"].log.log.gte(this.price())
            },
            pay() {
                return player["S2"].log.log = player["S2"].log.log.sub(this.price())
            },
            price() {
                return _D100
            }
        },
    },
    challenges: {
        11: {
            name: "引理证明机",
            challengeDescription() {
                return "最终,我们证明了引理<br>提前中止挑战将会导致一次湮灭"
            },
            goalDescription() {
                return "26对数"
            },
            rewardDescription() {
                return `1 世界完成<br>获得体验 & 汲取思维成本指数-0.1<br>对数加成最终梦境获取x${format(player["S2"].log.log.add(_D1))}<br>改善鲤鱼跃门机<br>时间流速×3`
            },
            canComplete() {
                return player["S2"].log.log.gte(_D(26))
            },
            unlocked() {
                return hasUpgrade("s2", 71)
            },
            onExit() {
                layers[this.layer].annihilation()
            },
            completionLimit: 1
        },
    },
    layerShown() { return hasMilestone("m", 6) && hasChallenge("s1", 11) },
    hotkeys: [
        {
            key: "a",
            description: "a: 硬重置萨玛定理:公理世界",
            onPress() {
                player["S2"] = {
                    log: {
                        points: _D1,
                        log: _D0
                    },
                    antilog: {
                        points: _D0,
                        log: _D(-30)
                    }
                }
                player[this.layer].upgrades = []
            },
            unlocked() { return layers[this.layer].layerShown() && !hasChallenge("s2", 11) }
        }
    ],
    branches: ["s3"]
});

addLayer("s3", {
    name: "电子",
    symbol: "💻",
    resource: "电子",
    row: 3,
    position: 0,
    color: "#e0e0e0",
    type: "none",
    startData() {
        return {
            unlocked: true,
            points: _D10
        }
    },
    getTech() {
        return nomachineSpeed().pow(
            _D(0.5)
                .add(hasUpgrade("s3", 31) ? upgradeEffect("s3", 31) : _D0)
        )
            .mul(hasUpgrade("s3", 13) ? upgradeEffect("s3", 13) : _D1)
            .mul(hasUpgrade("s3", 14) ? upgradeEffect("s3", 14) : _D1)
            .mul(hasUpgrade("s3", 22) ? upgradeEffect("s3", 22) : _D1)
            .mul(hasUpgrade("s3", 32) ? upgradeEffect("s3", 32) : _D1)
    },
    update(diff) {
        player["S3"].tech = player["S3"].tech.add(this.getTech().mul(diff))

        player[this.layer].points = player[this.layer].points.add(
            gridEffect(this.layer, 101).mul(diff)
        )
        for (let i = 2; i <= 14; i++) {
            let addtion = gridEffect(this.layer, i * 100 + 1).mul(diff)
            setGridData(this.layer, i * 100 - 99, getGridData(this.layer, i * 100 - 99).add(addtion))
        }
    },
    infoboxes: {
        0: {
            title: "萨玛定理 - 断言",
            body() {
                return `
                你决定去解开萨玛定理,尽管你根本不知道它是什么<br>
                只是从别人的话语之中听到的这个东西,是否有意义?<br>
                你不知道你所求何物,那你应该如何求解?你不知道<br>
                现在退出还来得及,但你不想放弃——N□□□□□<br>
                ` },
        },
    },
    tabFormat: {
        Hardware: {
            content: [
                ["infobox", 0],
                "main-display",
                "main-s3-display",
                ["display-text", function () {
                    return `(${formatWhole(layers[this.layer].getTech())}/秒)`
                }],
                "blank",
                ["display-text", function () {
                    return `购买比例 ${player["s3"].per ? player["s3"].per : 100}%`
                }],
                ["slider", ["per", 1, 100]],
                "blank",
                "grid"
            ]
        },
        Technology: {
            content: [
                ["infobox", 0],
                "main-display",
                "main-s3-display",
                ["display-text", function () {
                    return `(${formatWhole(layers[this.layer].getTech())}/秒)`
                }],
                "blank",
                "upgrades"
            ]
        }
    },
    grid: {
        rows() { return hasUpgrade("s3", 12) ? player["S3"].layer : Math.min(2, player["S3"].layer) },
        cols: 3,
        maxRows: 14,
        getLayer(id) {
            return layer = ~~(id / 100);
        },
        canBuyCount(now, price, id) {
            if (now.lt(price) || player["S3"].tech.lt(_D1)) return [_D0, _D0, _D0]
            else if (now.mul(this.getPer()).lt(price)) return [_D1, price, gridEffect(this.layer, id + 2)]
            else {
                let count = Decimal.floor(
                    Decimal.min(
                        now.mul(this.getPer()).div(price),
                        player["S3"].tech.mul(this.getPer())
                    )
                )
                return [count, count.mul(price), count.mul(gridEffect(this.layer, id + 2))]
            }
        },
        calBuyPrice(id, layer) {
            switch (id % 100) {
                case 1:
                    return (
                        _D10
                            .sub(hasUpgrade("s3", 21) ? upgradeEffect("s3", 21) : _D0)
                    ).pow(layer)
            }
        },
        calPrice(id, level) {
            switch (id % 100) {
                case 2:
                    return _D(42).mul(_D(420).pow(level))
                case 3:
                    return pow10(level)
            }
        },
        getPer() {
            let p = player[this.layer].per
            return (p ? p : 100) / 100
        },
        layerName(layer) {
            if (layer == 0) return "电子"
            return [
                hasUpgrade("s3", 11) ? "晶体管" : "真空管",
                "逻辑门",
                "IC芯片",
                "缓存单元",
                "CPU",
                "主板",
                "个人电脑",
                "服务器",
                "服务器集群",
                "超级计算机",
                "行星计算机集群",
                "戴森球网络",
                "黑洞计算机",
                "宇宙模拟器"
            ][layer - 1]
        },
        getStartData() {
            return _D0
        },
        onClick(data, id) {
            let layer = this.getLayer(id);
            let targetData
            switch (id % 100) {
                case 1:
                    if (layer == 1) targetData = player[this.layer].points
                    else targetData = getGridData(this.layer, id - 100)

                    let buyCount = this.canBuyCount(targetData, this.calBuyPrice(id, layer), id)
                    if (buyCount[0].lt(_D1)) return

                    player["S3"].layer = Math.max(player["S3"].layer, layer + 1)

                    setGridData(this.layer, id, data.add(buyCount[2]))
                    if (layer == 1) player[this.layer].points = player[this.layer].points.sub(buyCount[1])
                    else setGridData(this.layer, id - 100, targetData.sub(buyCount[1]))
                    player["S3"].tech = player["S3"].tech.sub(buyCount[0])

                    return
                case 2:
                    targetData = getGridData(this.layer, id - 1)
                    if (!hasUpgrade("s3", 25)) setGridData(this.layer, id - 1, targetData.sub(this.calPrice(id, data)))
                    setGridData(this.layer, id, data.add(_D1))
                    return
                case 3:
                    targetData = getGridData(this.layer, id + 98)
                    setGridData(this.layer, id + 98, targetData.sub(this.calPrice(id, data)))
                    setGridData(this.layer, id, data.add(_D1))
                    return
            }
        },
        getDisplay(data, id) {
            let layer = this.getLayer(id);
            let targetData
            switch (id % 100) {
                case 1:
                    if (layer == 1) targetData = player[this.layer].points
                    else targetData = getGridData(this.layer, id - 100)

                    let buyCount = this.canBuyCount(targetData, this.calBuyPrice(id, layer), id)

                    return `${this.layerName(layer)}
                    数量 ${formatWhole(data)}
                    产量 ${format(this.getOutput(id))}/秒
                    产能 ${format(gridEffect(this.layer, id))}/秒
                    ${buyCount[0] == 0 ? `你需要 ${formatWhole(this.calBuyPrice(id, layer))} ${this.layerName(layer - 1)}` : `点击生产 ${formatWhole(buyCount[2])} 个,开销:
                    ${formatWhole(buyCount[1])} ${this.layerName(layer - 1)}和 ${formatWhole(buyCount[0])} 科技`}
                    `
                case 2:
                    return `产量激增 等级${data}
                    产量×${formatWhole(gridEffect(this.layer, id))}
                    ${hasUpgrade("s3", 25) ? "下一级在" : "开销"}:
                    ${formatWhole(this.calPrice(id, data))} ${this.layerName(layer)}
                    `
                case 3:
                    return `生产分裂 等级${data}
                    生产×${formatWhole(gridEffect(this.layer, id))}
                    开销:
                    ${formatWhole(this.calPrice(id, data))} ${this.layerName(layer + 1)}
                    `
            }
        },
        getCanClick(data, id) {
            let layer = this.getLayer(id);
            let targetData
            switch (id % 100) {
                case 1:
                    if (layer == 1) targetData = player[this.layer].points
                    else targetData = getGridData(this.layer, id - 100)
                    return this.canBuyCount(targetData, this.calBuyPrice(id, layer), id)[0].gte(_D1)
                case 2:
                    targetData = getGridData(this.layer, id - 1)
                    return targetData.gte(this.calPrice(id, data))
                case 3:
                    targetData = getGridData(this.layer, id + 98)
                    return targetData.gte(this.calPrice(id, data))
            }
        },
        getOutput(id) {
            let layer = this.getLayer(id);
            let base = new Decimal(layer);

            if (layer == 1 && hasUpgrade("s3", 11)) base = base.mul(upgradeEffect("s3", 11))

            if (layer <= 4 && hasUpgrade("s3", 15)) base = base.pow(_D3)
            else base = base.pow(_D2)

            if (layer == 5 && hasUpgrade("s3", 23)) base = base.mul(upgradeEffect("s3", 23))
            if (layer == 7 && hasUpgrade("s3", 34)) base = base.mul(upgradeEffect("s3", 34))

            let power = gridEffect(this.layer, id + 1)
            return base.mul(power)
        },
        getEffect(data, id) {
            switch (id % 100) {
                case 1:
                    return this.getOutput(id).mul(data)
                case 2:
                    if (hasUpgrade("s3", 25)) return _D(100).pow(data.div(5))
                    return _D2.pow(data)
                case 3:
                    if (hasUpgrade("s3", 24)) return _D3.pow(data.add(1))
                    return _D2.pow(data)
            }
        },
        getStyle(data, id) {
            switch (id % 100) {
                case 1:
                    return {
                        width: "300px",
                        height: "135px",
                        fontSize: "0.9em",
                    }
                case 2:
                    return {
                        width: "160px",
                        height: "100px",
                        fontSize: "0.8em"
                    }
                case 3:
                    return {
                        width: "160px",
                        height: "100px",
                        fontSize: "0.8em"
                    }
            }
        },
        getUnlocked(id) {
            if (id == 1402 || id == 1403) return false
            return true
        }
    },
    upgrades: {
        11: {
            title: "[11]晶体管",
            description: "真空管升级为晶体管,基础产量×3",
            effect: function () {
                return _D3
            },
            effectDisplay: function () {
                return `×${format(upgradeEffect("s3", 11))}`
            },
            tooltip: "",
            cost: pow10(4),
        },
        12: {
            title: "[12]锗集成电路",
            description: "解锁IC芯片",
            tooltip: "",
            cost: pow10(7),
            unlocked() {
                return hasUpgrade(this.layer, 11)
            }
        },
        13: {
            title: "[13]研究员",
            description: "科技获取×1.5",
            effect: function () {
                return _D(1.5)
            },
            effectDisplay: function () {
                return `×${format(upgradeEffect("s3", 13))}`
            },
            tooltip: "",
            cost: pow10(9),
            unlocked() {
                return hasUpgrade(this.layer, 12)
            }
        },
        14: {
            title: "[14]科技涌现",
            description: "最高解锁硬件层级加成科技获取×1.2/层",
            effect: function () {
                return _D(1.2).pow(player["S3"].layer)
            },
            effectDisplay: function () {
                return `×${format(upgradeEffect("s3", 14))}`
            },
            tooltip: "",
            cost: pow10(11),
            unlocked() {
                return hasUpgrade(this.layer, 13)
            }
        },
        15: {
            title: "[15]高速缓存",
            description: "前四个层级的基础产量指数+1",
            effect: function () {
                return _D1
            },
            effectDisplay: function () {
                return `+^${format(upgradeEffect("s3", 15))}`
            },
            tooltip: "",
            cost: pow10(14),
            unlocked() {
                return hasUpgrade(this.layer, 14)
            }
        },
        21: {
            title: "[21]成本控制",
            description: "每层生产成本指数-1",
            effect: function () {
                return _D1
            },
            effectDisplay: function () {
                return `-^${format(upgradeEffect("s3", 21))}`
            },
            tooltip: "",
            cost: pow10(17),
            unlocked() {
                return hasUpgrade(this.layer, 15)
            }
        },
        22: {
            title: "[22]研究组",
            description: "科技加成自身获取",
            effect: function () {
                return player["S3"].tech.add(1).log(5)
            },
            effectDisplay: function () {
                return `×${format(upgradeEffect("s3", 22))}`
            },
            tooltip: "",
            cost: pow10(21),
            unlocked() {
                return hasUpgrade(this.layer, 21)
            }
        },
        23: {
            title: "[23]摩尔定律",
            description: `游戏时间加成CPU产量`,
            effect: function () {
                let x = _D2.pow(Decimal.div(player.gameTime, 18 * 30 * 24 * 60 * 60))
                x = x.gte(1000) ? Decimal.add(1000, x.sub(1000).log(1.3)) : x;
                return x
            },
            effectDisplay: function () {
                return `×${format(upgradeEffect("s3", 23))}${upgradeEffect("s3", 23).gte(_D(1000)) ? "<br>软上限在×1000" : ""}`
            },
            tooltip: "",
            cost: pow10(24),
            unlocked() {
                return hasUpgrade(this.layer, 22)
            }
        },
        24: {
            title: "[24]集群生产",
            description: `生产分裂效果提升,且获得一个免费等级`,
            tooltip: "",
            cost: pow10(32),
            unlocked() {
                return hasUpgrade(this.layer, 23)
            }
        },
        25: {
            title: "[25]无痛激增",
            description: "产量激增不再扣除硬件,且效果更强",
            cost: pow10(36),
            unlocked() {
                return hasUpgrade(this.layer, 24)
            }
        },
        31: {
            title: "[31]工业革命 III",
            description: "科技基础获取指数+0.25",
            effect: function () {
                return _D(0.25)
            },
            effectDisplay: function () {
                return `×${format(upgradeEffect("s3", 31))}`
            },
            cost: pow10(42),
            unlocked() {
                return hasUpgrade(this.layer, 25)
            }
        },
        32: {
            title: "[32]实验室",
            description: "电子加成科技获取",
            effect: function () {
                return Decimal.max(_D1, player[this.layer].points.add(_D1).div(_D(1e35)).log(8))
            },
            effectDisplay: function () {
                return `×${format(upgradeEffect("s3", 32))}`
            },
            cost: pow10(46),
            unlocked() {
                return hasUpgrade(this.layer, 31)
            }
        },
        33: {
            title: "[33]科学之星",
            description: "时间流速×2",
            effect: function () {
                return _D(2)
            },
            effectDisplay: function () {
                return `×${format(upgradeEffect("s3", 33))}`
            },
            cost: pow10(50),
            unlocked() {
                return hasUpgrade(this.layer, 32)
            }
        },
        34: {
            title: "[34]局域网",
            description: "个人电脑数量加成自身产量",
            effect: function () {
                return getGridData(this.layer, 701).pow(0.1)
            },
            effectDisplay: function () {
                return `×${format(upgradeEffect("s3", 34))}`
            },
            tooltip: "",
            cost: pow10(54),
            unlocked() {
                return hasUpgrade(this.layer, 33)
            }
        },
    },
    layerShown() { return hasMilestone("m", 6) && hasChallenge("s2", 11) },
    hotkeys: [
    ],
});
