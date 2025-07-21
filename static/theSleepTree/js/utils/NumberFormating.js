
function exponentialFormat(num, precision, mantissa = true) {
    let e = num.log10().floor()
    let m = num.div(Decimal.pow(10, e))
    if (m.toStringWithDecimalPlaces(precision) == 10) {
        m = decimalOne
        e = e.add(1)
    }
    e = (e.gte(1e9) ? format(e, 3) : (e.gte(10000) ? commaFormat(e, 0) : e.toStringWithDecimalPlaces(0)))
    if (mantissa)
        return m.toStringWithDecimalPlaces(precision) + "e" + e
    else return "e" + e
}

function commaFormat(num, precision) {
    if (num === null || num === undefined) return "NaN"
    if (num.mag < 0.001) return (0).toFixed(precision)
    let init = num.toStringWithDecimalPlaces(precision)
    let portions = init.split(".")
    portions[0] = portions[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
    if (portions.length == 1) return portions[0]
    return portions[0] + "." + portions[1]
}


function regularFormat(num, precision) {
    if (num === null || num === undefined) return "NaN"
    if (num.mag < 0.0001) return (0).toFixed(precision)
    if (num.mag < 0.1 && precision !== 0) precision = Math.max(precision, 4)
    return num.toStringWithDecimalPlaces(precision)
}

function fixValue(x, y = 0) {
    return x || new Decimal(y)
}

function sumValues(x) {
    x = Object.values(x)
    if (!x[0]) return decimalZero
    return x.reduce((a, b) => Decimal.add(a, b))
}

function format(decimal, precision = 3, small) {
    small = small || modInfo.allowSmall
    decimal = new Decimal(decimal)
    if (isNaN(decimal.sign) || isNaN(decimal.layer) || isNaN(decimal.mag)) {
        player.hasNaN = true;
        return "NaN"
    }
    if (decimal.sign < 0) return "-" + format(decimal.neg(), precision, small)
    if (decimal.mag == Number.POSITIVE_INFINITY) return "Infinity"
    if (decimal.gte("eeee1000")) {
        var slog = decimal.slog()
        if (slog.gte(1e6)) return "F" + format(slog.floor())
        else return Decimal.pow(10, slog.sub(slog.floor())).toStringWithDecimalPlaces(3) + "F" + commaFormat(slog.floor(), 0)
    }
    else if (decimal.gte("1e1000000")) return exponentialFormat(decimal, 0, false)
    else if (decimal.gte("1e10000")) return exponentialFormat(decimal, 0)
    else if (decimal.gte(1e9)) return exponentialFormat(decimal, precision)
    else if (decimal.gte(1e3)) return commaFormat(decimal, 0)
    else if (decimal.gte(0.0001) || !small) return regularFormat(decimal, precision)
    else if (decimal.eq(0)) return (0).toFixed(precision)

    decimal = invertOOM(decimal)
    let val = ""
    if (decimal.lt("1e1000")) {
        val = exponentialFormat(decimal, precision)
        return val.replace(/([^(?:e|F)]*)$/, '-$1')
    }
    else
        return format(decimal, precision) + "⁻¹"

}

function formatWhole(decimal) {
    decimal = new Decimal(decimal)
    if (decimal.gte(1e9)) return format(decimal)
    if (decimal.lte(0.99) && !decimal.eq(0)) return format(decimal)
    return format(decimal, 0)
}

function formatTime(s) {
    if (s < 60) return format(s) + "秒"
    else if (s < 3600) return formatWhole(Math.floor(s / 60)) + "分 " + format(s % 60) + "秒"
    else if (s < 86400) return formatWhole(Math.floor(s / 3600)) + "小时 " + formatWhole(Math.floor(s / 60) % 60) + "分 " + format(s % 60) + "秒"
    else if (s < 31536000) return formatWhole(Math.floor(s / 86400) % 365) + "天 " + formatWhole(Math.floor(s / 3600) % 24) + "小时 " + formatWhole(Math.floor(s / 60) % 60) + "分 " + format(s % 60) + "秒"
    else return formatWhole(Math.floor(s / 31536000)) + "年 " + formatWhole(Math.floor(s / 86400) % 365) + "天 " + formatWhole(Math.floor(s / 3600) % 24) + "时 " + formatWhole(Math.floor(s / 60) % 60) + "分 " + format(s % 60) + "秒"
}

function toPlaces(x, precision, maxAccepted) {
    x = new Decimal(x)
    let result = x.toStringWithDecimalPlaces(precision)
    if (new Decimal(result).gte(maxAccepted)) {
        result = new Decimal(maxAccepted - Math.pow(0.1, precision)).toStringWithDecimalPlaces(precision)
    }
    return result
}

// Will also display very small numbers
function formatSmall(x, precision = 3) {
    return format(x, precision, true)
}

function invertOOM(x) {
    let e = x.log10().ceil()
    let m = x.div(Decimal.pow(10, e))
    e = e.neg()
    x = new Decimal(10).pow(e).times(m)

    return x
}

function showTime(time) {
    if (time.lte(new Decimal(86400))) {
        const totalSeconds = time.toNumber();
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = Math.floor(totalSeconds % 60);
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else if (time.lt(new Decimal(31536000))) {
        const totalSeconds = time.toNumber();
        const days = Math.floor(totalSeconds / 86400);
        const remainingSeconds = totalSeconds % 86400;
        const hours = Math.floor(remainingSeconds / 3600);
        const minutes = Math.floor((remainingSeconds % 3600) / 60);
        return `${days}天 ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    } else if (time.lt(new Decimal(315360000000))) {
        const totalSeconds = time.toNumber();
        const years = Math.floor(totalSeconds / 31536000);
        const remainingSeconds = totalSeconds % 31536000;
        const days = Math.floor(remainingSeconds / 86400);
        const hours = Math.floor(remainingSeconds / 3600 % 24);
        return `${years}年 ${days}天 ${hours.toString().padStart(2, '0')}时`;
    } else {
        const years = time.div(31536000);
        return `${ChineseCount(years)}年`;
    }
}


function ChineseCount(num) {
    const d = new Decimal(num);

    if (d.eq(0)) {
        return "0";
    }

    const basenum = [
        { base: 0, code: "" },
        { base: 4, code: "万" },
        { base: 8, code: "亿" },
        { base: 12, code: "兆" },
        { base: 16, code: "京" },
        { base: 20, code: "垓" },
        { base: 24, code: "秭" },
        { base: 28, code: "穰" },
        { base: 32, code: "沟" },
        { base: 36, code: "涧" },
        { base: 40, code: "正" },
        { base: 44, code: "载" },
        { base: 48, code: "极" },
        { base: 52, code: "恒河沙" },
        { base: 56, code: "阿僧祇" },
        { base: 60, code: "那由他" },
        { base: 64, code: "不可思议" },
        { base: 68, code: "无量" },
        { base: 72, code: "大数" },
    ];

    const exponent = d.log10();

    if (exponent.gte(72)) {
        return format(d);
    }

    const baseIndex = Decimal.min(
        exponent.div(4).floor(),
        new Decimal(basenum.length - 1)
    ).toNumber();

    const selectedBase = basenum[baseIndex];

    return format(d.div(_D10.pow(new Decimal(selectedBase.base)))) + selectedBase.code;
}