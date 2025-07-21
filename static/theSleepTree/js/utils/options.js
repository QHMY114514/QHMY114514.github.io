// ************ Options ************

let options = {}

function getStartOptions() {
	return {
		autosave: true,
		msDisplay: "always",
		font: "",
		theme: "fox",
		hqTree: false,
		offlineProd: true,
		hideChallenges: false,
		showStory: true,
		forceOneTab: false,
		oldStyle: false,
		forceTooltips: true,
		hideMilestonePopups: false,
		badWeb: false,
	}
}

function toggleOpt(name) {
	if (name == "oldStyle" && styleCooldown > 0)
		return;

	options[name] = !options[name];
	if (name == "hqTree")
		changeTreeQuality();
	if (name == "oldStyle")
		updateStyle();
}
var styleCooldown = 0;
function updateStyle() {
	styleCooldown = 1;
	let css = document.getElementById("styleStuff");
	css.href = options.oldStyle ? "oldStyle.css" : "style.css";
	needCanvasUpdate = true;
}
function changeTreeQuality() {
	var on = options.hqTree;
	document.body.style.setProperty('--hqProperty1', on ? "2px solid" : "4px solid");
	document.body.style.setProperty('--hqProperty2a', on ? "-4px -4px 4px rgba(0, 0, 0, 0.25) inset" : "-4px -4px 4px rgba(0, 0, 0, 0) inset");
	document.body.style.setProperty('--hqProperty2b', on ? "0px 0px 20px var(--background)" : "");
	document.body.style.setProperty('--hqProperty3', on ? "2px 2px 4px rgba(0, 0, 0, 0.25)" : "none");
}
function toggleAuto(toggle) {
	Vue.set(player[toggle[0]], [toggle[1]], !player[toggle[0]][toggle[1]]);
	needCanvasUpdate = true
}

const MS_DISPLAYS = ["全部", "最新", "未完成", "无"];

const MS_SETTINGS = ["always", "last", "incomplete", "never"];

function adjustMSDisp() {
	options.msDisplay = MS_SETTINGS[(MS_SETTINGS.indexOf(options.msDisplay) + 1) % MS_SETTINGS.length];
}

const FONT_DISPLAYS = ["默认", "Sligoil", "Angus", "Step mono", "Unica One", "Mathd"];

const FONT_SETTINGS = ["", "Sligoil", "Angus", "Stepmono", "Unica", "Mathd"];

function adjustFont() {
	options.font = FONT_SETTINGS[(FONT_SETTINGS.indexOf(options.font) + 1) % FONT_SETTINGS.length];
	document.body.style.setProperty("--Font", options.font);
}

function milestoneShown(layer, id) {
	complete = player[layer].milestones.includes(id);

	switch (options.msDisplay) {
		case "always":
			return true;
			break;
		case "last":
			return !complete || player[layer].lastMilestone === id;
			break;
		case "incomplete":
			return !complete;
			break;
		case "never":
			return false;
			break;
	}
	return false;
}

let formatOption = (opt) => opt ? 'ON' : 'OFF'
