// ************ Big Feature related ************

function respecBuyables(layer) {
	if (!layers[layer].buyables) return
	if (!layers[layer].buyables.respec) return
	if (!player[layer].noRespecConfirm && !confirm(tmp[layer].buyables.respecMessage || "Are you sure you want to respec? This will force you to do a \"" + (tmp[layer].name ? tmp[layer].name : layer) + "\" reset as well!")) return
	run(layers[layer].buyables.respec, layers[layer].buyables)
	updateBuyableTemp(layer)
	document.activeElement.blur()
}

function canAffordUpgrade(layer, id) {
	let upg = tmp[layer].upgrades[id]
	if (tmp[layer].deactivated) return false
	if (tmp[layer].upgrades[id].canAfford === false) return false
	let cost = tmp[layer].upgrades[id].cost
	if (cost !== undefined)
		return canAffordPurchase(layer, upg, cost)

	return true
}

function canBuyBuyable(layer, id) {
	let b = temp[layer].buyables[id]
	return (b.unlocked && run(b.canAfford, b) && player[layer].buyables[id].lt(b.purchaseLimit) && !tmp[layer].deactivated)
}



function canAffordPurchase(layer, thing, cost) {
	if (thing.currencyInternalName) {
		let name = thing.currencyInternalName
		if (thing.currencyLocation) {
			return !(thing.currencyLocation[name].lt(cost))
		}
		else if (thing.currencyLayer) {
			let lr = thing.currencyLayer
			return !(player[lr][name].lt(cost))
		}
		else {
			return !(player[name].lt(cost))
		}
	}
	else {
		return !(player[layer].points.lt(cost))
	}
}

function buyUpgrade(layer, id) {
	buyUpg(layer, id)
}

function buyUpg(layer, id) {
	if (!tmp[layer].upgrades || !tmp[layer].upgrades[id]) return
	let upg = tmp[layer].upgrades[id]
	if (!player[layer].unlocked || player[layer].deactivated) return
	if (!tmp[layer].upgrades[id].unlocked) return
	if (player[layer].upgrades.includes(id)) return
	if (upg.canAfford === false) return
	let pay = layers[layer].upgrades[id].pay
	if (pay !== undefined)
		run(pay, layers[layer].upgrades[id])
	else {
		let cost = tmp[layer].upgrades[id].cost

		if (upg.currencyInternalName) {
			let name = upg.currencyInternalName
			if (upg.currencyLocation) {
				if (upg.currencyLocation[name].lt(cost)) return
				upg.currencyLocation[name] = upg.currencyLocation[name].sub(cost)
			}
			else if (upg.currencyLayer) {
				let lr = upg.currencyLayer
				if (player[lr][name].lt(cost)) return
				player[lr][name] = player[lr][name].sub(cost)
			}
			else {
				if (player[name].lt(cost)) return
				player[name] = player[name].sub(cost)
			}
		}
		else {
			if (player[layer].points.lt(cost)) return
			player[layer].points = player[layer].points.sub(cost)
		}
	}
	player[layer].upgrades.push(id);
	if (upg.onPurchase != undefined)
		run(upg.onPurchase, upg)
	needCanvasUpdate = true
}

function buyMaxBuyable(layer, id) {
	if (!player[layer].unlocked) return
	if (!tmp[layer].buyables[id].unlocked) return
	if (!tmp[layer].buyables[id].canBuy) return
	if (!layers[layer].buyables[id].buyMax) return

	run(layers[layer].buyables[id].buyMax, layers[layer].buyables[id])
	updateBuyableTemp(layer)
}

function buyBuyable(layer, id) {
	if (!player[layer].unlocked) return
	if (!tmp[layer].buyables[id].unlocked) return
	if (!tmp[layer].buyables[id].canBuy) return

	run(layers[layer].buyables[id].buy, layers[layer].buyables[id])
	updateBuyableTemp(layer)
}

function clickClickable(layer, id) {
	if (!player[layer].unlocked || tmp[layer].deactivated) return
	if (!tmp[layer].clickables[id].unlocked) return
	if (!tmp[layer].clickables[id].canClick) return

	run(layers[layer].clickables[id].onClick, layers[layer].clickables[id])
	updateClickableTemp(layer)
}

function clickGrid(layer, id) {
	if (!player[layer].unlocked || tmp[layer].deactivated) return
	if (!run(layers[layer].grid.getUnlocked, layers[layer].grid, id)) return
	if (!gridRun(layer, 'getCanClick', player[layer].grid[id], id)) return

	gridRun(layer, 'onClick', player[layer].grid[id], id)
}

// Function to determine if the player is in a challenge
function inChallenge(layer, id) {
	let challenge = player[layer].activeChallenge
	if (!challenge) return false
	id = toNumber(id)
	if (challenge == id) return true

	if (layers[layer].challenges[challenge].countsAs)
		return tmp[layer].challenges[challenge].countsAs.includes(id) || false
	return false
}

// ************ Misc ************

var onTreeTab = true

function showTab(name, prev) {
	if (LAYERS.includes(name) && !layerunlocked(name)) return
	if (player.tab !== name) clearParticles(function (p) { return p.layer === player.tab })
	if (tmp[name] && player.tab === name && isPlainObject(tmp[name].tabFormat)) {
		player.subtabs[name].mainTabs = Object.keys(layers[name].tabFormat)[0]
	}
	var toTreeTab = name == "none"
	player.tab = name
	if (tmp[name] && (tmp[name].row !== "side") && (tmp[name].row !== "otherside")) player.lastSafeTab = name
	updateTabFormats()
	needCanvasUpdate = true
	document.activeElement.blur()

}

function showNavTab(name, prev) {
	console.log(prev)
	if (LAYERS.includes(name) && !layerunlocked(name)) return
	if (player.navTab !== name) clearParticles(function (p) { return p.layer === player.navTab })
	if (tmp[name] && tmp[name].previousTab !== undefined) prev = tmp[name].previousTab
	var toTreeTab = name == "tree-tab"
	console.log(name + prev)
	if (name !== "none" && prev && !tmp[prev]?.leftTab == !tmp[name]?.leftTab) player[name].prevTab = prev
	else if (player[name])
		player[name].prevTab = ""
	player.navTab = name
	updateTabFormats()
	needCanvasUpdate = true
}


function goBack(layer) {
	let nextTab = "none"

	if (player[layer].prevTab) nextTab = player[layer].prevTab
	if (player.navTab === "none" && (tmp[layer]?.row == "side" || tmp[layer].row == "otherside")) nextTab = player.lastSafeTab

	if (tmp[layer].leftTab) showNavTab(nextTab, layer)
	else showTab(nextTab, layer)

}

function layOver(obj1, obj2) {
	for (let x in obj2) {
		if (obj2[x] instanceof Decimal) obj1[x] = new Decimal(obj2[x])
		else if (obj2[x] instanceof Object) layOver(obj1[x], obj2[x]);
		else obj1[x] = obj2[x];
	}
}

function prestigeNotify(layer) {
	if (layers[layer].prestigeNotify) return layers[layer].prestigeNotify()

	if (isPlainObject(tmp[layer].tabFormat)) {
		for (subtab in tmp[layer].tabFormat) {
			if (subtabResetNotify(layer, 'mainTabs', subtab))
				return true
		}
	}
	for (family in tmp[layer].microtabs) {
		for (subtab in tmp[layer].microtabs[family]) {
			if (subtabResetNotify(layer, family, subtab))
				return true
		}
	}
	if (tmp[layer].autoPrestige || tmp[layer].passiveGeneration) return false
	else if (tmp[layer].type == "static") return tmp[layer].canReset
	else if (tmp[layer].type == "normal") return (tmp[layer].canReset && (tmp[layer].resetGain.gte(player[layer].points.div(10))))
	else return false
}

function notifyLayer(name) {
	if (player.tab == name || !layerunlocked(name)) return
	player.notify[name] = 1
}

function subtabShouldNotify(layer, family, id) {
	let subtab = {}
	if (family == "mainTabs") subtab = tmp[layer].tabFormat[id]
	else subtab = tmp[layer].microtabs[family][id]
	if (!subtab.unlocked) return false
	if (subtab.embedLayer) return tmp[subtab.embedLayer].notify
	else return subtab.shouldNotify
}

function subtabResetNotify(layer, family, id) {
	let subtab = {}
	if (family == "mainTabs") subtab = tmp[layer].tabFormat[id]
	else subtab = tmp[layer].microtabs[family][id]
	if (subtab.embedLayer) return tmp[subtab.embedLayer].prestigeNotify
	else return subtab.prestigeNotify
}

function nodeShown(layer) {
	return layerShown(layer)
}

function layerunlocked(layer) {
	if (tmp[layer] && tmp[layer].type == "none") return (player[layer].unlocked)
	return LAYERS.includes(layer) && (player[layer].unlocked || (tmp[layer].canReset && tmp[layer].layerShown))
}

function keepGoing() {
	player.keepGoing = true;
	needCanvasUpdate = true;
}

function toNumber(x) {
	if (x.mag !== undefined) return x.toNumber()
	if (x + 0 !== x) return parseFloat(x)
	return x
}

function updateMilestones(layer) {
	if (tmp[layer].deactivated) return
	for (id in layers[layer].milestones) {
		if (!(hasMilestone(layer, id)) && layers[layer].milestones[id].done()) {
			player[layer].milestones.push(id)
			if (layers[layer].milestones[id].onComplete) layers[layer].milestones[id].onComplete()
			if ((tmp[layer].milestonePopups || tmp[layer].milestonePopups === undefined) && !options.hideMilestonePopups) doPopup("milestone", tmp[layer].milestones[id].requirementDescription, "里程碑达成!", 3, tmp[layer].color);
			player[layer].lastMilestone = id
		}
	}
}

function updateAchievements(layer) {
	if (tmp[layer].deactivated) return
	for (id in layers[layer].achievements) {
		if (isPlainObject(layers[layer].achievements[id]) && !(hasAchievement(layer, id)) && layers[layer].achievements[id].done()) {
			player[layer].achievements.push(id)
			if (layers[layer].achievements[id].onComplete) layers[layer].achievements[id].onComplete()
			if (tmp[layer].achievementPopups || tmp[layer].achievementPopups === undefined) doPopup("achievement", tmp[layer].achievements[id].name, "成就达成!", 3, tmp[layer].color);
		}
	}
}

function addTime(diff, layer) {
	let data = player
	let time = data.timePlayed
	if (layer) {
		data = data[layer]
		time = data.time
	}

	//I am not that good to perfectly fix that leak. ~ DB Aarex
	if (time + 0 !== time) {
		console.log("Memory leak detected. Trying to fix...")
		time = toNumber(time)
		if (isNaN(time) || time == 0) {
			console.log("Couldn't fix! Resetting...")
			time = layer ? player.timePlayed : 0
			if (!layer) player.timePlayedReset = true
		}
	}
	time += toNumber(diff)

	if (layer) data.time = time
	else data.timePlayed = time
}

shiftDown = false
ctrlDown = false

document.onkeydown = function (e) {
	if (player === undefined) return;
	shiftDown = e.shiftKey
	ctrlDown = e.ctrlKey
	if (tmp.gameEnded && !player.keepGoing) return;
	let key = e.key
	if (ctrlDown) key = "ctrl+" + key
	if (onFocused) return
	if (ctrlDown && hotkeys[key]) e.preventDefault()
	if (hotkeys[key]) {
		let k = hotkeys[key]
		if (player[k.layer].unlocked && tmp[k.layer].hotkeys[k.id].unlocked)
			k.onPress()
	}
}

document.onkeyup = function (e) {
	shiftDown = e.shiftKey
	ctrlDown = e.ctrlKey
}

var onFocused = false
function focused(x) {
	onFocused = x
}


function isFunction(obj) {
	return !!(obj && obj.constructor && obj.call && obj.apply);
};

function isPlainObject(obj) {
	return (!!obj) && (obj.constructor === Object)
}

document.title = modInfo.name

// Converts a string value to whatever it's supposed to be
function toValue(value, oldValue) {
	if (oldValue instanceof Decimal) {
		value = new Decimal(value)
		if (checkDecimalNaN(value)) return decimalZero
		return value
	}
	if (!isNaN(oldValue))
		return parseFloat(value) || 0
	return value
}

// Variables that must be defined to display popups
var activePopups = [];
var popupID = 0;

// Function to show popups
function doPopup(type = "none", text = "This is a test popup.", title = "", timer = 3, color = "") {
	switch (type) {
		case "achievement":
			popupTitle = "成就达成!";
			popupType = "achievement-popup"
			break;
		case "challenge":
			popupTitle = "挑战达成";
			popupType = "challenge-popup"
			break;
		default:
			popupTitle = "Something Happened?";
			popupType = "default-popup"
			break;
	}
	if (title != "") popupTitle = title;
	popupMessage = text;
	popupTimer = timer;

	activePopups.push({ "time": popupTimer, "type": popupType, "title": popupTitle, "message": (popupMessage + "\n"), "id": popupID, "color": color })
	popupID++;
}


//Function to reduce time on active popups
function adjustPopupTime(diff) {
	for (popup in activePopups) {
		activePopups[popup].time -= diff;
		if (activePopups[popup]["time"] < 0) {
			activePopups.splice(popup, 1); // Remove popup when time hits 0
		}
	}
}

function run(func, target, args = null) {
	if (isFunction(func)) {
		let bound = func.bind(target)
		return bound(args)
	}
	else
		return func;
}

function gridRun(layer, func, data, id) {
	if (isFunction(layers[layer].grid[func])) {
		let bound = layers[layer].grid[func].bind(layers[layer].grid)
		return bound(data, id)
	}
	else
		return layers[layer].grid[func];
}

// # 自定义
// 特殊数字简写
const _D86400 = _D(86400);
const _D3600 = _D(3600);
const _D100 = _D(100);
const _D60 = _D(60);
const _D50 = _D(50);
const _D30 = _D(30);
const _D10 = _D(10);
const _D9 = _D(9);
const _D8 = _D(8);
const _D7 = _D(7);
const _D6 = _D(6);
const _D5 = _D(5);
const _D4 = _D(4);
const _D3 = _D(3);
const _D2 = _D(2);
const _D1 = _D(1);
const _D0 = _D(0);
const _DInf = _D(1.7976931348623157).mul(pow10(308));

function _D(num) {
	return new Decimal(num)
}

// 工具函数
/**
 * 请用于以1为倒数的数的简便写法
 * @param {Decimal} dividend - 被除数
 * @param {Decimal} [divisor = 1] - 除数 *不推荐使用该参数,乖乖用.div()
 */
function divNum(dividend, divisor = _D(1)) {
	return divisor.div(dividend);
}
// 2的幂次
function pow2(pow) {
	return _D2.pow(_D(pow))
}
// 10的幂次
function pow10(pow) {
	return _D10.pow(_D(pow))
}

// 核心函数 - 自定义事件驱动
function myTicking(diff) {
	player.gameTime = (player.gameTime.add(timeSpeed().mul(diff)));

	let k;
	if (hasUpgrade("e", 22)) {
		k = _D1
	} else {
		k = (player.gameTime.div(_D60).div(_D(Math.PI))).cos().add(_D1).div(_D2)
	}
	player.M.Mv[1] = _D(3).mul(
		k
	)
		.mul(hasUpgrade("m", 23) ? upgradeEffect("m", 23) : _D1)

	if (hasUpgrade("m", 32)) {
		player.M.Tick[2] -= diff
		if (player.M.Tick[2] < 0) {
			player.M.Tick[2] = 10
				/ (hasUpgrade("m", 32) ? upgradeEffect("m", 32) : 1)
				/ (Boolean(getClickableState("m", 11)) && hasUpgrade("m", 35) ? upgradeEffect("m", 35) : 1)

			player.M.PreMv[2] = Mv2Random(player.M.Mv[1], player.M.Mv[1].div(_D2))
				.mul(hasUpgrade("m", 32) ? upgradeEffect("m", 32) : _D1)

			if (hasUpgrade("e", 23) && player.M.PreMv[2].gt(player.M.Mv[2])) {
				player.M.Mv[2] = player.M.PreMv[2]
			}
		}
	}

	if (hasUpgrade("m", 42)) {
		let spd = (_D(1).sub(divNum(_D(1e4))))
			.pow(nomachineSpeed().pow(_D(0.3)))
		player.M.Mv[3] = (player.M.Mv[3].pow(spd)).mul(
			(player.M.Mv[2].mul(player.M.Mv[1]).pow(divNum(_D2))).pow(_D1.sub(spd))
		)
	}
}

// 变量函数
// 	 Mv2 - 随机数生成
function Mv2Random(mean, stddev) {
	let u1 = Math.random();
	let u2 = Math.random();
	let z0 = Decimal.fromNumber(Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2));

	return (Decimal.max(_D0, z0.mul(stddev).add(mean)))
}

// 核心函数 - 睡眠时点数获取
function sleepGain() {
	return divNum(_D(600))
		.mul(timeSpeed())
		.mul(hasUpgrade("m", 12) ? upgradeEffect("m", 12) : _D1)
		.mul(hasUpgrade("m", 21) ? upgradeEffect("m", 21) : _D1)
		.mul((hasUpgrade("e", 21) && hasUpgrade("m", 22) ? upgradeEffect("m", 22) : _D1))
		.mul(hasMilestone("m", 2) ? player.M.Mv[1] : _D1)
		.mul(hasUpgrade("m", 25) ? player.M.Mv[2] : _D1)
		.mul(hasUpgrade("m", 42) ? player.M.Mv[3] : _D1)
		.mul(Boolean(getClickableState("m", 11)) ? clickableEffect("m", 11)[1] : _D1)
}

// 核心函数 - 醒着时点数获取
function awakeGain() {
	// 升级使我醒着也能赚梦境
	if (!canGenPoints()) {
		return !hasUpgrade("m", 14) ? _D0 :
			sleepGain()
				.pow(
					_D1
						.mul(hasUpgrade("m", 14) ? upgradeEffect("m", 14) : _D1)
				)
				.mul((hasUpgrade("m", 22) ? upgradeEffect("m", 22) : _D1))
	}
	return sleepGain();
}

function finalGain() {
	return awakeGain()
		.mul(layers.s1.effect()[0])
		.mul(hasChallenge("s2", 11) ? player["S2"].log.log.add(_D1) : _D1)
}

// 核心函数 - 时间流速
function nomachineSpeed() {
	return _D1
		.mul(player.achievementsSpeed)
		.mul(hasUpgrade("m", 11) ? upgradeEffect("m", 11) : _D1)
		.mul(hasUpgrade("m", 13) ? upgradeEffect("m", 13) : _D1)
		.mul(hasUpgrade("e", 14) && isSleep() ? upgradeEffect("e", 14) : _D1)
		.mul(layers.s1.effect()[1])
		.mul(hasChallenge("s2", 11) ? _D3 : _D1)
		.mul(hasUpgrade("s3", 33) ? upgradeEffect("s3", 33) : _D1)
}

// 核心函数 - 时间流速
function timeSpeed() {
	return nomachineSpeed()
		.mul(Boolean(getClickableState("m", 11)) ? clickableEffect("m", 11)[0] : _D1)
}

// 核心函数 - 睡眠判定
function isSleep() {
	return !hasMilestone("m", 0) ? true :
		player.gameTime.mod(_D86400).lte(sleepTime())
}

function sleepTime() {
	return player.sleepTime
		.add(hasUpgrade("m", 41) ? upgradeEffect("m", 41) : _D0)
}

// 显示函数
function showGameTime() {
	return hasUpgrade("m", 13)
}

// 你知道的太多了
// 避免重复定义开销
const randomString_chars = `ABCDEFGHJKLMNOPQRSTUWXYZabcdefghijklmnopqrstuwxyz1234567890?!;=+-/@#$%^&*~|\`"'\\()[]{},.          `;
function randomString(length) {
	let result = '';

	for (let i = 0; i < length; i++) {
		result += randomString_chars[Math.floor(Math.random() * randomString_chars.length)];
	}

	return result;
}

/**
 * 带变量的if else语句表达式简写版本,例如 a ? "abc".length : "abc" 可表达为 ifElseViarable("a", "v.length", "v", "abc")
 * @param {boolean} exp - 用于判断的表达式,可以是文本
 * @param {text} a - 真分支表达式
 * @param {text} b - 假分支表达式
 * @param {text} vir - 变量值
 * @param {text} [virName="v"] - 变量名
 */
function ifElseVirable(exp, a, b, vir, virName = "v") {
	return eval(`((${virName}) => ${exp} ? ${a} : ${b} )(${vir})`);
}

// 新闻
function getNewsList() {
	return [
		"欢迎来到睡觉树 Made by QHLG",
		"这是一条新闻",
		"我们听说这里有一个新闻,但突然发现有新闻这件事就是新闻",
		randomString(20),
		`乾狐离光的网站地址在<a href="https://qhlg.flime.top">https://qhlg.flime.top</a>`,
		"乾狐离光不是💰️🦊🍐🌟也不是雀魂老狗更不是清华理工",
		"你在挂机的时候也在看我吗?",
		"为什么要写新闻条来掩饰自己没什么内容(恼)",
		"我们有一点狐币,狐币可以压成石头,石头里有一只狐狸",
		'let jrrp = 101; let jrrptext = "你的运气爆表了!";',
		"There is nobody called Fox. Go to the other side.",
		"如果你付出了你应该付出的,你就会获得你需要的",
		"Only Fox Can Do!!!",
		`点<input type="button" value="我" onclick="alert('你被骗了!');player.nevergonnagiveyouup=true"/>获得10000000000000000000000000000灵感`,
		"其实疯狂点击新闻栏可以为你提供一个速度加成",
		"使用狐狸主题,使用狐狸主题谢谢喵!",
		"我不想让你关闭新闻栏,所以没做这个按钮,绝对不是懒得做",
		"Are You Lost?",
		"喵~喵~咕噜咕噜~",
		"溜溜溜达嘿又神权了,谁来管? 停止游戏,我来管",
		`This is a <span style="color: hsl(0, 100%, 50%)">R</span><span style="color: hsl(30, 100%, 50%)">A</span><span style="color: hsl(60, 100%, 50%)">I</span><span style="color: hsl(120, 100%, 50%)">N</span><span style="color: hsl(180, 100%, 50%)">B</span><span style="color: hsl(240, 100%, 50%)">O</span><span style="color: hsl(300, 100%, 50%)">W</span>`,
		"如果你不去睡觉,我也会爱你的",
		"通过修改系统时间的方法,我们成功在凌晨玩上了好玩的睡觉树",
		"世界在看着我,我也在看着世界,世界告诉我我找错世界了",
		"作为一种交通工具,薯球是优秀的,值得梦里每个人推广",
		"让我猜猜,现在是凌晨?",
		"谁在玩睡觉树?!",
		"我想看到你的脸,直视我,爱上我,靠近我,拥抱我,融入我,变成我",
		"重磅新闻:因为开发任务过多,乾狐离光已经睡觉",
		"闻新1:费花 示显来过反闻新将 闻新反",
		"为什么cost翻译成开销而不是花费?因为开销看起来更故弄玄虚的酷",
		"好吧,我承认你赢了,但你要知道我也很在意这件事",
		"我爱的人已经死了,因为她再也不是过去的那个她,我也不是那个我",
		"不要骗我,你肯定是一个人类吧!",
		"VHJ5IEZpbmQgTkFQUEVSIFJJTkFUT1I=",
		...(hasMilestone("m", 1) ?
			[
				"＜spin＞哈里路大旋风!＜/spin＞",
				"这就叫实力,这就叫背景,这就叫狐狸,狐狸怎么叫?",
				"Ciallo～(∠・ω<)⌒☆",
				"I just wanna JUMP~ JUMP~ JUMP~ JUMP~ JUMP~ JUMP~ JUMP~ JUMP~",
				"为什么gta6还没做出来,因为现在正在美国加州等地进行线下公测()",
				"生成生成生成器的生成器的生成器生成生成生成器的生成器",
				"本游戏禁止将滚木以及同音或近音词当做空白字符看待,否则禁言滚木小时,持续滚木天",
				"我可以用新闻栏播彩六,对吧!",
				"我不让你按按钮你按不按?你Studio按!",
				"睡觉树开发者因为凌晨3点开发睡觉树而被从游戏除名",
				"晚宀 = 晚安没女,我这辈子也想不出这种东西",
				"你还不能睡觉,睡觉树在等着你玩",
				"一觉醒来,我一觉醒来,而我不变",
				"我们要辩证的熬夜,认清楚什么样的熬夜才是好的,才是人民需要的",
				"开发者模式已启动,您的游戏速度已提升1e1e4514倍!",
				"免费花分文以获得这个新闻",
				"我不想让你挂机,因为挂机我就看不到你的脸了,Player...",
				"你的名字是?",
			]
			: ["解锁思维层第二里程碑以解锁一系列新的新闻"]
		),
		...(options.badWeb ?
			[
				"400 Bad Request",
				"401 Unauthorized",
				"403 Forbidden",
				"404 Not Found",
				"405 Method Not Allowed",
				"406 Not Acceptable",
				"407 Proxy Authentication Required",
				"408 Request Timeout",
				"409 Conflict",
				"410 Gone",
				"411 Length Required",
				"412 Precondition Failed",
				"413 Payload Too Large",
				"414 URI Too Long",
				"415 Unsupported Media Type",
				"416 Range Not Satisfiable",
				"417 Expectation Failed",
				"418 I'm a teapot",
				"421 Misdirected Request",
				"426 Upgrade Required",
				"428 Precondition Required",
				"429 Too Many Requests",
				"431 Request Header Fields Too Large",
				"451 Unavailable For Legal Reasons",
				"500 Internal Server Error",
				"501 Not Implemented",
				"502 Bad Gateway",
				"503 Service Unavailable",
				"504 Gateway Timeout",
				"505 HTTP Version Not Supported",
				"506 Variant Also Negotiates",
				"510 Not Extended",
				"511 Network Authentication Required",
				"本新闻是为了告诉您,本游戏并未获得联网权限,当然这句话也是骗您的"
			]
			: [`如果你在设置中打开了"联网获取新闻",你就能够获得一些新的新闻`]
		)
	]
}

// 在player中保存新闻文字会导致新闻无法被保存
var news = {
	index: 0,
	text: "",
	charIndex: 0,
	lastUpdate: 0,
	isRotating: false,
	completeTime: 0,
	fadeStartTime: 0,
	opacity: 1
}

function updateNewsDisplay() {
	const newsList = getNewsList();
	const currentNews = newsList[news.index];

	// 初始化新新闻
	if (!news.isRotating) {
		news.text = getNextCharacter(currentNews, 0);
		news.charIndex = 1;
		news.isRotating = true;
		news.lastUpdate = Date.now();
		news.completeTime = 0;
		news.fadeStartTime = 0;
		news.opacity = 1;
		return;
	}

	const now = Date.now();

	if (news.fadeStartTime > 0) {
		const fadeDuration = 1000;
		const fadeProgress = Math.min((now - news.fadeStartTime) / fadeDuration, 1);

		news.opacity = 1 - Math.pow(fadeProgress, 2);

		if (fadeProgress >= 1) {
			const oldIndex = news.index;
			do {
				news.index = Math.floor(Math.random() * newsList.length);
			} while (oldIndex === news.index);

			news.isRotating = false;
			news.completeTime = 0;
			news.fadeStartTime = 0;
		}
		return;
	}

	const timeDiff = now - news.lastUpdate;
	if (timeDiff >= 125) {
		const charsToAdd = Math.floor(timeDiff / 125);
		let newCharIndex = news.charIndex;

		for (let i = 0; i < charsToAdd && newCharIndex < currentNews.length; i++) {
			newCharIndex = getNextCharIndex(currentNews, newCharIndex);
		}

		news.charIndex = Math.min(newCharIndex, currentNews.length);
		news.text = currentNews.substring(0, news.charIndex);
		news.lastUpdate = now;

		if (news.charIndex >= currentNews.length && news.completeTime === 0) {
			news.completeTime = now;
		}

		if (news.completeTime > 0 &&
			now - news.completeTime >= 5000 &&
			news.fadeStartTime === 0) {
			news.fadeStartTime = now;
		}
	}

	function getNextCharIndex(text, currentIndex) {
		if (currentIndex >= text.length) return currentIndex;

		if (text[currentIndex] === '<') {
			const endIndex = text.indexOf('>', currentIndex);
			return endIndex === -1 ? text.length : endIndex + 1;
		}

		return currentIndex + 1;
	}

	function getNextCharacter(text, startIndex) {
		const endIndex = getNextCharIndex(text, startIndex);
		return text.substring(startIndex, endIndex);
	}
}

function reinitializeNews() {
	news.index = 0;
	news.text = "";
	news.charIndex = 0;
	news.isRotating = false;
	news.lastUpdate = Date.now();
	news.completeTime = 0;
	news.fadeStartTime = 0;
	news.opacity = 1;
}