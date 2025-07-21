
/*
PPPPPPPPPPPPPPPPP   
P::::::::::::::::P  
P::::::PPPPPP:::::P 
PP:::::P     P:::::P
  P::::P     P:::::P
  P::::P     P:::::P
  P::::PPPPPP:::::P 
  P:::::::::::::PP  
  P::::PPPPPPPPP    
  P::::P            
  P::::P            
  P::::P            
PP::::::PP          
P::::::::P          
P::::::::P          
PPPPPPPPPP          
*/
addLayer("p", {
    name: "等价交换",
    symbol: "🔴​",
    resource: "EMC",
    color: "#b8306d",
    row: "side",
    tooltip: "",
    position: 2,
    layerShown() { return hasAchievement("a", 4001) },
    infoboxes: {
        introBox1: {
            title: "等价交换",
            body() { return "这是一个小游戏,你也许知道等价交换中有一种叫做能量收集器的方块,它们可以产生EMC,而EMC可以购买能量收集器<br>很难不把这个写成游戏对吧?<br>尽管如此,这只是一个小游戏,而不会对原游戏流程产生任何影响<br>如果收集器和升级的价格差不多,你也许就该思考一下先买哪个~<br>放心,你有充足的时间(指时间墙)<br>而且它将不会有新层级,所以这可能是无聊的" },
        },
        introBox2: {
            title: "后日谈(不是日后谈)",
            body() { return "等价交换小游戏到这里就基本结束了<br>感谢你的游玩<br>后面的内容没做平衡,爽就行了" },
        },
    },
    startData() {
        return {
            unlocked: true,
            points: _D(0)
        }
    },
    tabFormat: {
        "EMC": {
            content: [
                ["clickable", 13],
                ["infobox", "introBox1"],
                ["display-text", "按P购买最大机器"],
                "main-normal-display",
                ["display-text", function () {
                    return `(${format(layers.p.getEMCGen())}/秒)`
                }],
                ["display-text", function () {
                    return hasUpgrade("p", 36) ? `你有 <h2 class="overlayThing" id="super-points">${format(player.P.Inf)}</h2> 无限燃料` : ""
                }],
                ["display-text", function () {
                    return hasUpgrade("p", 36) ? `(${formatSmall(layers.p.getInfGen())}/秒)` : ""
                }],
                ["display-text", function () {
                    return getBuyableAmount("p", 12).neq(_D0) ? `你有 <h3 class="overlayThing" id="points">${format(player.P.Mk)}</h3> 收集器MK` : ""
                }],
                ["display-text", function () {
                    return getBuyableAmount("p", 12).neq(_D0) ? `(${formatSmall(layers.p.getMKGen())}/秒)` : ""
                }],
                ["display-text", function () {
                    return layers.p.getSpeed().neq(_D1) ? `时间以 <h3 class="overlayThing" id="points">x${format(layers.p.getSpeed())}</h3> 倍的速度流逝` : ""
                }],
                ["display-text", function () {
                    return getBuyableAmount("p", 13).neq(_D0) ? `(${formatSmall(layers.p.getTimeGen()
                        .mul(hasUpgrade("p", 15) ? upgradeEffect("p", 15) : _D1)
                        .mul(hasUpgrade("p", 35) ? upgradeEffect("p", 35) : _D1)
                        .mul(hasUpgrade("p", 41) ? upgradeEffect("p", 41) : _D1))}/秒)` : ""
                }],
                "blank",
                "buyables",
                "blank",
                ["clickable", 11],
                "blank",
                ["upgrades", [1, 2, 3]],
            ]
        },
        "Infinity": {
            content: [
                ["infobox", "introBox2"],
                "main-normal-display",
                ["display-text", function () {
                    return player.P.Inf.neq(_D1) ? `你有 <h2 class="overlayThing" id="super-points">${format(player.P.Inf)}</h2> 无限燃料` : ""
                }],
                ["display-text", function () {
                    return getBuyableAmount("p", 12).neq(_D0) ? `(${formatSmall(layers.p.getInfGen())}/秒)` : ""
                }],
                "blank",
                "buyables",
                "blank",
                ["clickable", 11],
                "blank",
                ["upgrades", [4, 5]],
                ["clickable", 12],
                "blank",
            ],
            unlocked() {
                return hasUpgrade("p", 36)
            }
        }
    },
    update(diff) {
        player.P.TS = player.P.TS
            .add(layers.p.getTimeGen().mul(diff))

        player.P.Mk = player.P.Mk
            .add(layers.p.getMKGen().mul(diff))

        player[this.layer].points = player[this.layer].points
            .add(layers.p.getEMCGen().mul(diff))

        const trans = Boolean(getClickableState("p", 11)) ? Decimal.min(_D1.sub(_D(0.9).pow(diff)), _D(0.9)) : _D0 // EMC转化量

        player.P.Inf = player.P.Inf
            .add(
                player[this.layer].points
                    .mul(trans)
                    .div(_DInf)
            )

        player[this.layer].points = Decimal.max(
            _D1,
            player[this.layer].points
                .mul(_D1.sub(trans))
        )
    },
    getSpeed() {
        return player.P.TS
            .mul(hasUpgrade("p", 15) ? upgradeEffect("p", 15) : _D1)
            .mul(hasUpgrade("p", 35) ? upgradeEffect("p", 35) : _D1)
            .mul(hasUpgrade("p", 41) ? upgradeEffect("p", 41) : _D1)
    },
    getEMCGen() {
        return buyableEffect("p", 11)
            .mul(layers.p.getSpeed())
            .mul(player.P.Mk)
    },
    getMKGen() {
        return buyableEffect("p", 12)
            .mul(layers.p.getSpeed())
    },
    getTimeGen() {
        return buyableEffect("p", 13)
    },
    getInfGen() {
        return upgradeEffect("p", 36)
            .div(_DInf)
            .mul(Boolean(getClickableState("p", 11)) ? _D1 : _D0)
    },
    buyables: {
        11: {
            title: function () {
                return `能量收集器<br>MK${getBuyableAmount("p", 11)}`
            },
            display() {
                return `
                    <h3>获得 ${format(buyableEffect("p", 11))} EMC/秒</h3><br><br><h3>开销: ${format(this.cost())} EMC<h3>
                `
            },
            cost() {
                let amount = getBuyableAmount("p", 11)
                if (amount.eq(_D0)) return _D0
                else return _D(300).mul((
                    _D4
                        .add(
                            Decimal.max(amount, _D(500))
                                .sub(_D(500))
                                .div(_D(35))
                        )
                ).pow(amount))
                    .div(hasUpgrade("p", 42) ? upgradeEffect("p", 42) : _D1)
            },
            effect(x) {
                return (_D(1.5)
                    .add(hasUpgrade("p", 14) ? upgradeEffect("p", 14) : _D0)
                    .add(hasUpgrade("p", 24) ? upgradeEffect("p", 24) : _D0)
                    .add(hasUpgrade("p", 34) ? upgradeEffect("p", 34) : _D0)
                )
                    .pow(x).sub(_D1)
                    .mul(hasUpgrade("p", 11) ? upgradeEffect("p", 11) : _D1)
                    .mul(hasUpgrade("p", 12) ? upgradeEffect("p", 12) : _D1)
                    .mul(hasUpgrade("p", 16) ? upgradeEffect("p", 16) : _D1)
                    .mul(hasUpgrade("p", 25) ? upgradeEffect("p", 25) : _D1)
                    .mul(hasUpgrade("p", 26) ? upgradeEffect("p", 26) : _D1)
                    .mul(hasUpgrade("p", 43) ? upgradeEffect("p", 43) : _D1)
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                if (!this.canAfford()) return;
                if (getBuyableAmount("p", 11).gte(this.purchaseLimit())) return;
                player[this.layer].points = (player[this.layer].points).sub(this.cost())
                addBuyables("p", 11, _D1)
            },
            purchaseLimit: function () {
                if (hasUpgrade("p", 44)) {
                    return Decimal.dInf
                } else if (hasUpgrade("p", 33)) {
                    return _D(500)
                } else if (hasUpgrade("p", 23)) {
                    return _D(100)
                } else if (hasUpgrade("p", 13)) {
                    return _D(16)
                }

                return _D3
            }
        },
        12: {
            title: function () {
                return `能量收集器收集器<br>LK${getBuyableAmount("p", 12)}`
            },
            display() {
                return `
                    <h3>获得 ${format(buyableEffect("p", 12))} 收集器/秒</h3><br><br><h3>开销: ${format(this.cost())} EMC<h3>
                `
            },
            unlocked() {
                return hasUpgrade("p", 21)
            },
            cost() {
                let amount = getBuyableAmount("p", 12)
                if (amount.eq(_D0)) return _D0
                else return _D(1.25e9).mul((
                    _D8
                        .add(
                            Decimal.max(amount, _D100)
                                .sub(_D100)
                                .div(_D(24))
                        )
                ).pow(amount))
                    .div(hasUpgrade("p", 42) ? upgradeEffect("p", 42) : _D1)
            },
            effect(x) {
                return _D2.pow(x).div(_D10).sub(_D(0.1))
                    .mul(hasUpgrade("p", 22) ? upgradeEffect("p", 22) : _D1)
                    .mul(hasUpgrade("p", 25) ? upgradeEffect("p", 25) : _D1)
                    .mul(hasUpgrade("p", 32) ? upgradeEffect("p", 32) : _D1)
                    .mul(hasUpgrade("p", 43) ? upgradeEffect("p", 43) : _D1)
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                if (!this.canAfford()) return;
                player[this.layer].points = (player[this.layer].points).sub(this.cost())
                addBuyables("p", 12, _D1)
            }
        },
        13: {
            title: function () {
                return `时间加速器<br>TK${getBuyableAmount("p", 13)}`
            },
            display() {
                return `
                    <h3>获得 ${format(buyableEffect("p", 13))} 时间流速/秒</h3><br><br><h3>开销: ${format(this.cost())} EMC<h3>
                `
            },
            unlocked() {
                return hasUpgrade("p", 31)
            },
            cost() {
                let amount = getBuyableAmount("p", 13)
                if (amount.eq(_D0)) return _D0
                else return _D(2e44).mul((
                    _D5
                        .add(amount.div(_D30))
                        .add(
                            Decimal.max(amount, _D100)
                                .sub(_D100)
                                .div(_D30)
                        )
                ).pow(amount))
                    .mul(hasUpgrade("p", 25) ? upgradeEffect("p", 25) : _D1)
                    .div(hasUpgrade("p", 42) ? upgradeEffect("p", 42) : _D1)
            },
            effect(x) {
                return x.pow(_D2).div(_D(1000))
                    .mul(hasUpgrade("p", 43) ? upgradeEffect("p", 43) : _D1)
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                if (!this.canAfford()) return;
                player[this.layer].points = (player[this.layer].points).sub(this.cost())
                addBuyables("p", 13, _D1)
            }
        }
    },
    clickables: {
        11: {
            title: "无限物质熔炉",
            display() { return `<h3>每秒将10%EMC转化为无限燃料<br>目前状态 : ${Boolean(getClickableState("p", 11)) ? "开" : "关"}</h3>` },
            style: {
                width: "240px",
                height: "60px",
                backgroundColor: "#D89536",
                border: "4px solid",
                borderRadius: "4px",
                borderColor: "rgba(0, 0, 0, 0.125)",
            },
            canClick() {
                return hasUpgrade("p", 36)
            },
            unlocked() {
                return hasUpgrade("p", 36)
            },
            onClick() {
                setClickableState("p", 11, !Boolean(getClickableState("p", 11)))
            },
            effect() {
                return [
                    hasUpgrade("p", 36) ? pow10(-1) : _D0
                ]
            }
        },
        12: {
            title: function () {
                return `<h2
                style="color:hsl(${(Date.now() / 15) % 360}, 100%, 30%);
                text-shadow: 0 0 10px hsl(${(Date.now() / 15 + 180) % 360}, 100%, 70%);
                ">硬重置等价交换小游戏</h2>`
            },
            style: function () {
                return {
                    width: "360px",
                    height: "60px",
                    background: `linear-gradient(in hsl longer hue to right, 
                    hsl(${(Date.now() / 35) % 360}, 50%, 50%), 
                    hsl(${(Date.now() / 35 + 1) % 360}, 50%, 50%)`,
                    border: "4px solid",
                    borderRadius: "4px",
                    borderColor: "rgba(0, 0, 0, 0.125)"
                }
            },
            canClick() {
                return hasUpgrade("p", 51)
            },
            unlocked() {
                return hasUpgrade("p", 51)
            },
            onClick() {
                doReset("p", true);
            }
        }
    },
    upgrades: {
        11: {
            title: "强效收集器",
            description: "EMC获取×50",
            tooltip: "现在它比MK2强了一倍!",
            effect: function () {
                return _D(50)
            },
            effectDisplay: function () {
                return `×${format(upgradeEffect("p", 11))}`
            },
            cost: _D10
        },
        12: {
            title: "买一些,再买一些",
            description: "MK购买数量加成自身产量",
            tooltip: "买的越多,赚的越多!",
            effect: function () {
                return getBuyableAmount("p", 11).pow(_D2)
            },
            effectDisplay: function () {
                return `×${format(upgradeEffect("p", 12))}`
            },
            cost: pow10(3),
            unlocked() {
                return hasUpgrade("p", 11)
            }
        },
        13: {
            title: "等价交换EX",
            description: "解锁MK3以后的收集器",
            tooltip: "你应该知道等价交换只有MK3收集器吧?",
            cost: _D(5e4),
            unlocked() {
                return hasUpgrade("p", 12)
            }
        },
        14: {
            title: "获得进度",
            description: "获得一个等价交换进度<br>并将MK生产指数+0.2",
            tooltip: "我们势不可挡!",
            effect: function () {
                return _D(0.2)
            },
            effectDisplay: function () {
                return `+^${format(upgradeEffect("p", 14))}`
            },
            cost: _D(1.25e6),
            unlocked() {
                return hasUpgrade("p", 13)
            }
        },
        15: {
            title: "加速火把 I",
            description: "时间流速×5",
            tooltip: "时间逐渐开始加速?",
            effect: function () {
                return _D5
            },
            effectDisplay: function () {
                return `×${format(upgradeEffect("p", 15))}`
            },
            cost: _D(8e7),
            unlocked() {
                return hasUpgrade("p", 14)
            }
        },
        16: {
            title: "割圆术",
            description: "EMC获取×π",
            tooltip: "我的世界里不存在圆",
            effect: function () {
                return _D(Math.PI)
                    .pow(hasUpgrade("p", 45) ? upgradeEffect("p", 45) : _D1)
            },
            effectDisplay: function () {
                return `×${format(upgradeEffect("p", 16))}`
            },
            cost: _D(314159265),
            unlocked() {
                return hasUpgrade("p", 15)
            }
        },
        21: {
            title: "收集器收集收集器",
            description: "解锁收集器收集器LK",
            tooltip: "你在干什么!",
            cost: _D(1e10),
            unlocked() {
                return hasUpgrade("p", 16)
            }
        },
        22: {
            title: "EMC收集收集器",
            description: "EMC加成MK获取",
            tooltip: "很好,熟悉的感觉又回来了",
            effect: function () {
                return (player[this.layer].points.add(_D1)).log10().add(_D1)
            },
            effectDisplay: function () {
                return `×${format(upgradeEffect("p", 22))}`
            },
            cost: pow10(13),
            unlocked() {
                return hasUpgrade("p", 21)
            }
        },
        23: {
            title: "等价交换EX^2",
            description: "解锁MK16以后的收集器",
            tooltip: "你应该知道等价交换只有终极收集器吧?",
            cost: pow10(17),
            unlocked() {
                return hasUpgrade("p", 22)
            }
        },
        24: {
            title: "获得进度 II",
            description: "获得一个等价交换进度<br>并将MK生产指数+0.2",
            tooltip: "我们势不可挡...吗?",
            effect: function () {
                return _D(0.2)
            },
            effectDisplay: function () {
                return `+^${format(upgradeEffect("p", 24))}`
            },
            cost: pow10(22),
            unlocked() {
                return hasUpgrade("p", 23)
            }
        },
        25: {
            title: "我们需要买更多",
            description: "LK购买数量加成所有收集器产量",
            tooltip: "如果买更多,还会赚更多吗?",
            effect: function () {
                return getBuyableAmount("p", 12).pow(_D(0.5))
            },
            effectDisplay: function () {
                return `×${format(upgradeEffect("p", 25))}`
            },
            cost: pow10(28),
            unlocked() {
                return hasUpgrade("p", 24)
            }
        },
        26: {
            title: "Rush E",
            description: "EMC获取×e",
            tooltip: "准备好指数爆炸了吗?",
            effect: function () {
                return _D(Math.E)
            },
            effectDisplay: function () {
                return `×${format(upgradeEffect("p", 26))}`
            },
            cost: pow10(35),
            unlocked() {
                return hasUpgrade("p", 25)
            }
        },
        31: {
            title: "加速器加速收集器",
            description: "解锁时间加速器TK",
            tooltip: "没话说了...",
            cost: pow10(43),
            unlocked() {
                return hasUpgrade("p", 26)
            }
        },
        32: {
            title: "强效收集器收集器",
            description: "MK获取×50",
            tooltip: "现在它比LK不知道多少强了一倍!",
            effect: function () {
                return _D(50)
            },
            effectDisplay: function () {
                return `×${format(upgradeEffect("p", 32))}`
            },
            cost: pow10(52),
            unlocked() {
                return hasUpgrade("p", 31)
            }
        },
        33: {
            title: "等价交换EX↑EX",
            description: "解锁MK100以后的收集器",
            tooltip: "你应该知道等价交换只有等价交换吧?",
            cost: pow10(66),
            unlocked() {
                return hasUpgrade("p", 32)
            }
        },
        34: {
            title: "获得进度 III",
            description: "获得一个等价交换进度<br>并将MK生产指数依据EMC提升",
            tooltip: "我们真的势不可挡!",
            effect: function () {
                return _D(0.6).div(
                    _D1.add(
                        _D2.pow(
                            _D(138.3985).sub(player[this.layer].points.log10()).div(_D(20))
                        )
                    )
                );
            },
            effectDisplay: function () {
                return `+^${format(upgradeEffect("p", 34))}`
            },
            cost: pow10(75),
            unlocked() {
                return hasUpgrade("p", 33)
            }
        },
        35: {
            title: "加速火把 II",
            description: "时间加速器产量加成时间流速",
            tooltip: "时间已经加速起来了!",
            effect: function () {
                return buyableEffect("p", 13)
            },
            effectDisplay: function () {
                return `×${format(upgradeEffect("p", 35))}`
            },
            cost: pow10(100),
            unlocked() {
                return hasUpgrade("p", 34)
            }
        },
        36: {
            title: "结束了?",
            description: "解锁无限燃料",
            tooltip: "如结",
            effect: function () {
                return player[this.layer].points.div(_D10)
            },
            cost: _DInf,
            unlocked() {
                return hasUpgrade("p", 35)
            }
        },
        // 无限燃料升级
        41: {
            title: "T = 101%",
            description: "无限燃料加成时间流速",
            tooltip: "第一日,赐以时间",
            effect: function () {
                return (_D2.add(player.P.Inf)).log2().pow(_D2)
                    .pow(hasUpgrade("p", 46) ? upgradeEffect("p", 46) : _D1)
            },
            effectDisplay: function () {
                return `×${format(upgradeEffect("p", 41))}`
            },
            cost: _D1,
            currencyDisplayName: "无限燃料",
            currencyInternalName: "Inf",
            currencyLocation: () => player.P,
            unlocked() {
                return hasUpgrade("p", 36)
            }
        },
        42: {
            title: "η = 101%",
            description: "无限燃料减少机器价格",
            tooltip: "第二日,赐以价格",
            effect: function () {
                return (_D2.add(player.P.Inf)).log2().pow(_D10)
                    .pow(hasUpgrade("p", 46) ? upgradeEffect("p", 46) : _D1)
            },
            effectDisplay: function () {
                return `×${format(upgradeEffect("p", 42))}`
            },
            cost: pow10(3),
            currencyDisplayName: "无限燃料",
            currencyInternalName: "Inf",
            currencyLocation: () => player.P,
            unlocked() {
                return hasUpgrade("p", 41)
            }
        },
        43: {
            title: "P = 101%",
            description: "无限燃料加成机器产量",
            tooltip: "第三日,赐以产量",
            effect: function () {
                return (_D2.add(player.P.Inf)).log2().pow(_D3)
                    .pow(hasUpgrade("p", 46) ? upgradeEffect("p", 46) : _D1)
            },
            effectDisplay: function () {
                return `×${format(upgradeEffect("p", 43))}`
            },
            cost: pow10(9),
            currencyDisplayName: "无限燃料",
            currencyInternalName: "Inf",
            currencyLocation: () => player.P,
            unlocked() {
                return hasUpgrade("p", 42)
            }
        },
        44: {
            title: "等价交换Final",
            description: "MK不再有购买上限",
            tooltip: "第四日,赐以机器",
            cost: pow10(64),
            currencyDisplayName: "无限燃料",
            currencyInternalName: "Inf",
            currencyLocation: () => player.P,
            unlocked() {
                return hasUpgrade("p", 43)
            }
        },
        45: {
            title: "3.141592653589",
            description: "无限燃料加成割圆术的效果",
            tooltip: "第五日,赐以原神",
            effect: function () {
                return (_D2.add(player.P.Inf)).log2().pow(_D(0.75))
                    .pow(hasUpgrade("p", 46) ? upgradeEffect("p", 46) : _D1)
            },
            effectDisplay: function () {
                return `^${format(upgradeEffect("p", 45))}`
            },
            cost: pow10(100),
            currencyDisplayName: "无限燃料",
            currencyInternalName: "Inf",
            currencyLocation: () => player.P,
            unlocked() {
                return hasUpgrade("p", 44)
            }
        },
        46: {
            title: "嘿嘿嘿达嘿的赐福",
            description: "无限燃料升级效果^1.031415926",
            tooltip: "第六日,赐以达嘿",
            effect: function () {
                return _D(1.031415926)
            },
            effectDisplay: function () {
                return `^${format(upgradeEffect("p", 46))}`
            },
            cost: pow10(250),
            currencyDisplayName: "无限燃料",
            currencyInternalName: "Inf",
            currencyLocation: () => player.P,
            unlocked() {
                return hasUpgrade("p", 45)
            }
        },
        51: {
            title: "结束了",
            description: "解锁重置按钮",
            tooltip: "即将见证,太初有为",
            cost: _DInf,
            currencyDisplayName: "无限燃料",
            currencyInternalName: "Inf",
            currencyLocation: () => player.P,
            unlocked() {
                return hasUpgrade("p", 46)
            }
        },
    },
    doReset(resettingLayer) {
        if (resettingLayer == "p") {
            player.P.Clear += 1;
            player.P = {
                TS: _D1,
                Mk: _D1,
                Inf: _D0,
                Clear: player.P.Clear++,
            };
            layerDataReset("p");
            player.subtabs.p.mainTabs = "EMC";
        }
    },
    type: "null",
    hotkeys: [
        {
            key: "p",
            onPress() {
                while (layers.p.buyables[11].canAfford()) {
                    if (getBuyableAmount("p", 11).gte(layers.p.buyables[11].purchaseLimit())) break;
                    layers.p.buyables[11].buy()
                }
                if (hasUpgrade("p", 21)) {
                    while (layers.p.buyables[12].canAfford()) {
                        layers.p.buyables[12].buy()
                    }
                }
                if (hasUpgrade("p", 31)) {
                    while (layers.p.buyables[13].canAfford()) {
                        layers.p.buyables[13].buy()
                    }
                }
            },
            unlocked() { return layers.p.layerShown() }
        }
    ],
});