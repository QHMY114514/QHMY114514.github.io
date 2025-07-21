// ************ Themes ************
var themes = ["default", "aqua", "fox"]

var colors = {
	default: {
		1: "#ffffff",
		2: "#bfbfbf",
		3: "#7f7f7f",
		color: "#dfdfdf",
		points: "#ffffff",
		bought: "#77bf5f",
		locked: "#bf8f8f",
		background: "#0f0f0f",
		background_tooltip: "rgba(0, 0, 0, 0.75)",
	},
	aqua: {
		1: "#bfdfff",
		2: "#8fa7bf",
		3: "#5f6f7f",
		color: "#bfdfff",
		points: "#dfefff",
		bought: "#74cdd8",
		locked: "#c4a7b3",
		background: "#001f3f",
		background_tooltip: "rgba(0, 15, 31, 0.75)",
	},
	fox: {
		1: "#f69dbd",
		2: "#e1437b",
		3: "#ce0c51",
		color: "#ffdb73",
		points: "#eb72ff",
		superPoints: "#e60b92",
		bought: "#36daef",
		locked: "#f7bbd0",
		background: "#572a3a",
		background_tooltip: "rgba(22, 86, 104, 0.75)",
	},
}
function changeTheme() {
	try {
		colors_theme = colors[options.theme || "default"];
		document.body.style.setProperty('--background', colors_theme["background"]);
		document.body.style.setProperty('--background_tooltip', colors_theme["background_tooltip"]);
		document.body.style.setProperty('--color', colors_theme["color"]);
		document.body.style.setProperty('--points', colors_theme["points"]);
		document.body.style.setProperty("--locked", colors_theme["locked"]);
		document.body.style.setProperty("--bought", colors_theme["bought"]);
		document.body.style.setProperty("--super-points", colors_theme["superPoints"] ?? colors_theme["points"]);
	}
	catch {
		//do nothing
	}
}
function getThemeName() {
	return {
		'default': '默认',
		'aqua': '水色',
		'fox': '狐狸'
	}[options.theme ?? 'default']
}

function switchTheme() {
	let index = themes.indexOf(options.theme)
	if (options.theme === null || index >= themes.length - 1 || index < 0) {
		options.theme = themes[0];
	}
	else {
		index++;
		options.theme = themes[index];
	}
	changeTheme();
	resizeCanvas();
}
