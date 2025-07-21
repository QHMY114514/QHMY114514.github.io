let modInfo = {
	name: "睡觉树",
	id: "the-sleep-tree",
	author: "乾狐离光",
	pointsName: "梦境",
	modFiles: ["layers.js","layers_s.js","layers_p.js","layers_g.js", "tree.js"],

	discordName: "乾狐离光的官网",
	discordLink: "https://qhlg.flime.top/",
	initialStartPoints: new Decimal(0), // 用于硬重置和新玩家
	offlineLimit: 24,  // 离线时间限制（小时）
}

// 在num和name中设置版本号
let VERSION = {
	num: "0.3.2 dev",
	name: "开发中版本,更新后存档可能不延续"
}

let changelog = `<h1>更新日志:</h1><br><br>
	<h2 class="c1">v0.3.2 | 2025/7/21</h2><br>
	最初发布版,添加成就<br>
	<br><br>
	<h2>v0.3.1 | 2025/7/20</h2><br>
	重做萨玛定理第二世界平衡,扩充内容,添加成就<br>
	乾狐离光睡了一觉<br><br>
	<h2>v0.3 | 2025/7/18</h2><br>
	搭建了萨玛定理第三世界框架<br>
	更新了萨玛定理第二世界,增加了一些主线内容<br>
	修复bug<br><br>
	<h2>v0.2 | 2025/7/6</h2><br>
	更新了萨玛定理第一世界,残局70思维+50体验<br><br>
	<h2>v0.1 | 2025/6/20</h2><br>
	更新了等价交换小游戏<br><br>
	<h2>v0.0 | 2025/6/16</h2><br>
	更新了基础游戏内容`

let winText = `哦不!你已经玩到这个开发版本的最后了,敬请期待下一个版本的更新!`

// 如果在Layer内添加了新函数，并且这些函数在被调用时会产生效果，请在此处添加它们
var doNotCallTheseFunctionsEveryTick = ["annihilation","canBuyCount"]

function getStartPoints() {
	return new Decimal(modInfo.initialStartPoints)
}

// 决定是否醒着
function canGenPoints() {
	return isSleep()
}

// 计算点数/秒！
function getPointGen() {
	return finalGain()
}

// 你可以在此添加应该存入"player"并保存的非图层相关变量，以及默认值
function addedPlayerData() {
	return {
		realTime: Date.now(),
		// 时间
		gameTime: new Decimal(0),
		sleepTime: new Decimal(21600),
		// 思维层
		mindDream: new Decimal(0),
		achievementsSpeed: new Decimal(1),
		// 参数
		M: {
			Mv: {
				1: _D1,
				2: _D1,
				3: _D1
			},
			Tick: {
				2: 0
			},
			PreMv: {
				2: _D1
			}
		},
		S2: {
			log: {
				points: _D1,
				log: _D0
			},
			antilog: {
				points: _D0,
				log: _D(-30)
			},
			t42: 10
		},
		S3: {
			tech: _D0,
			layer: 1
		},
		// 小游戏参数
		// 等价交换
		P: {
			TS: _D1, //  时间流速
			Mk: _D1, //  能量收集器
			Inf: _D0, // 无限燃料
			Clear: 0, // 通关次数
		},
		// 隐藏成就
		nevergonnagiveyouup: false
	}
}

// 在页面顶部显示新闻
var displayNews = [
	function () {
		return `<div style="
		width: calc(100% - 50px);
		background-color: rgba(255,255,255,0.2);
		margin: 5px auto;
		border: solid 3px rgba(0,0,0,0.5);
		"><span style="opacity: ${news.opacity};">${news.text}</span></div>`;
	}
];

// 在页面顶部显示额外内容
var displayThings = [
	"作者QQ 1550187725 欢迎反馈bug!"
]

// 决定游戏何时"结束"
function isEndgame() {
	return player.m.points.gte(_D(1e100))
}

// 后面是次要内容！

// 背景样式，可以是函数
var backgroundStyle = {
}

// 如果有内容可能被长时间tick破坏，可以修改这个值
function maxTickLength() {
	return (3600)
}

// 如果需要修复旧版本存档的数值膨胀问题，使用此函数。如果版本早于修复该问题的版本，
// 你可以用此函数限制他们当前的资源。
function fixOldSave(oldVersion) {
}
