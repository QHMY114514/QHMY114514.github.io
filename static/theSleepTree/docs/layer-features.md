以下是层级可添加功能的完整列表。您可以根据需要自由添加其他功能或关联值，但以下功能具有特殊用途。

几乎所有数值都可以通过函数实现动态化，包括所有显示文本和样式/颜色功能。

层级定义功能
layer: 自动赋值。与该层级名称相同，可通过player[this.layer].points等方式访问存储值。便于代码复制到新层级，同时也会赋给所有升级项和可购买项等。

name: 可选。用于重置确认提示（及默认信息框标题）。若未设置则使用层级ID。

startData(): 返回该层级默认存档数据的函数。需添加所有自定义变量，注意使用Decimal类型而非普通数字。

标准值：
- 必需项：
- unlocked: 布尔值，决定该层级是否解锁
- points: Decimal类型，该层级主货币
- 可选项：
- total: Decimal类型，记录主声望货币总量（始终追踪但需在此添加才会显示）
- best: Decimal类型，记录主声望货币历史最高值
- unlockOrder: 记录该层级解锁前已解锁的相关层级
- resetTime: 数字类型，记录上次重置至今的时间

color: 该层级的主题色（十六进制字符串格式，如"#FF0000"）

row: 层级所在行数（从0开始），影响节点在标准树中的位置及受哪些重置影响。

使用"side"替代数字将使层级显示为侧边小节点（适用于成就和统计）。侧边层级不受重置影响，除非添加doReset函数。

displayRow: 覆盖项 仅改变节点显示位置而不影响重置顺序。

resource: 通过该层级重置获得的主货币名称。

effect(): 可选。计算并返回主货币固有加成的函数，可返回单个值或多个值的对象。需自行实现加成应用逻辑

effectDescription: 可选。返回效果描述的函数。若文本固定可直接使用字符串。

layerShown(): 可选。返回布尔值决定该层级节点是否显示（可返回"ghost"隐藏节点但仍占位）。默认为true。

hotkeys: 可选。该层级的快捷键配置数组：

JS
hotkeys: [
    {
        key: "p", // 快捷键按键。组合键使用大写字母或"ctrl+x"格式
        description: "p: 重置点数获取声望点", // 游戏指南页显示的描述
        onPress() { if (player.p.unlocked) doReset("p") },
        unlocked() {return hasMilestone('p', 3)} // 可选解锁条件
    }
]
style: 可选。CSS对象（键为CSS属性），影响该层级整个标签页的样式。

tabFormat: 可选。自定义标签页布局。详见

midsection: 可选。tabFormat的替代方案，插入到标准布局的里程碑与可购买项之间（不支持子标签页）。

核心功能（均为可选）
upgrades: 一次性购买项，可自定义解锁条件、货币成本和加成。详见

milestones: 资源达到阈值时获得的加成列表，常用于自动化/QOL优化。详见

challenges: 玩家可进入的挑战模式，达成目标后获得奖励。详见

buyables: 可多次购买的升级项，支持重置。详见

clickables: 多功能通用按钮，存在点击限制。详见

microtabs: 子标签页功能区域。详见

bars: 进度条/仪表盘等可视化组件，支持垂直显示。详见

achievements: 类似里程碑但显示风格不同。详见

achievementPopups/milestonePopups: 可选。设为false可禁用获得时的弹窗提示（默认true）。

infoboxes: 可折叠的信息框。详见

grid: 行为相同但数据独立的按钮网格。详见

声望公式功能
type: 可选。决定使用的声望公式类型（默认为"none"）：

"normal": 获得货币量与当前量无关（如Prestige），基础公式为baseResource^exponent
"static": 成本取决于重置后总量，基础公式为base^(x^exponent)
"custom": 完全自定义计算方式和按钮文本
"none": 该层级无重置功能
baseResource: 决定重置获得主货币量的资源名称。

baseAmount(): 获取基础资源当前值的函数。

requires: Decimal值，获得1点声望货币所需基础资源量（也是解锁该层级的条件）。可设为函数实现动态难度（基于unlockOrder）。

exponent: 公式中的指数值。

base: 有时必需。"static"类型必需参数（默认为2），必须大于1。

roundUpCost: 可选。布尔值，为true时对资源成本向上取整（适用于"static"货币）。

gainMult()/gainExp(): 可选。对"normal"类型计算增益乘数和指数；对"static"类型则作用于资源成本（因此增益应减小gainMult并增大gainExp）。

directMult(): 可选。最终直接乘数（在指数和软上限计算之后）。对"static"类型实际增加资源获取而非降低成本。

softcap/softcapPower: 可选。"normal"类型中，超过[softcap]的收益将进行[softcapPower]次方运算（默认softcap为e1e7，power为0.5）。

其他声望相关功能
canBuyMax(): 有时必需。"static"类型必需函数，用于判断是否允许最大购买。

onPrestige(gain): 可选。重置时触发的函数（在获得货币前执行），可用于次级资源获取或重新计算等。

resetDescription: 可选。替换重置按钮上的"Reset for "文本。

prestigeButtonText(): 有时必需。完全自定义重置按钮文本（"custom"类型必需）。

passiveGeneration(): 可选。返回每秒自动生成的声望货币倍数（不设置则不生效），适用于自动化"normal"类型。

autoPrestige(): 可选。返回布尔值决定是否自动执行重置，适用于自动化"static"类型。

树形图/节点功能
symbol: 可选。节点显示文本（默认为首字母大写的层级ID）。

image: 覆盖项。节点图片URL（覆盖symbol）。

position: 可选。决定节点在行中的水平位置（默认按层级ID字母排序）。

branches: 可选。连接线配置数组，可包含目标层级ID、颜色值（十六进制或1-3主题色）及线宽。

nodeStyle: 可选。CSS对象，用于节点样式定制。

tooltip()/tooltipLocked(): 可选。返回节点提示文本的函数（返回""可禁用提示）。

marked: 可选。节点角标（true显示星标，或使用图片URL）。

其他功能
doReset(resettingLayer): 可选。当更高层级重置时触发。默认行为是重置同行级内容（对side层级默认不重置）。可通过layerDataReset(layer, keep)保留指定数据。

update(diff): 可选。每游戏tick执行的函数（diff为时间差），用于被动资源生产等。

autoUpgrade: 可选。布尔值，为true时自动购买该层级的升级项（默认false）。

automate(): 可选。每tick在资源生产后执行，用于实现特殊自动化。

resetsNothing: 可选。返回true时该层级重置不触发其他重置。

increaseUnlockOrder: 可选。层级ID数组，当该层级首次解锁时，将增加列表中未解锁层级的unlockOrder值（提高解锁难度）。

shouldNotify: 可选。返回true时高亮该层级节点（可购买升级时自动高亮）。

glowColor: 可选。高亮颜色（默认红色），可用于多种通知类型。

componentStyles: 可选。组件样式函数集：

JS
componentStyles: {
    "challenge"() { return {'height': '200px'} },
    "prestige-button"() { return {'color': '#AA66AA'} }
}
leftTab: 可选。为true时使用左侧标签页。

previousTab: 可选。指定返回箭头指向的层级ID。

deactivated: 可选。为true时禁用该层级的所有升级/挑战/成就检测和交互功能（需自行处理相关效果禁用）。

自定义声望类型功能
（以下功能也可用于其他声望类型）

getResetGain(): 主要用于自定义类型。返回当前重置应获得的点数。可通过getResetGain(this.layer, useType = "static")计算其他类型的收益。

getNextAt(canMax=false): 主要用于自定义类型。返回获得下一点所需基础资源量。canMax参数用于区分"static"类型的首次重置条件和任意收益条件。

canReset(): 主要用于自定义类型。返回是否满足重置条件。

prestigeNotify(): 主要用于自定义类型。返回true时轻微高亮节点提示有意义的重置收益。

# Layer Features

This is a more comprehensive list of established features to add to layers. You can add more freely, if you want to have other functions or values associated with your layer. These have special functionality, though.

You can make almost any value dynamic by using a function in its place, including all display strings and styling/color features.

## Layer Definition features

- layer: **assigned automagically**. It's the same value as the name of this layer, so you can do `player[this.layer].points` or similar to access the saved value. It makes copying code to new layers easier. It is also assigned to all upgrades and buyables and such.

- name: **optional**. used in reset confirmations (and the default infobox title). If absent, it just uses the layer's id.

- startData(): A function to return the default save data for this layer. Add any variables you have to it. Make sure to use `Decimal` values rather than normal numbers.

    Standard values:
        - Required:
            - unlocked: a bool determining if this layer is unlocked or not
            - points: a Decimal, the main currency for the layer
        - Optional:
            - total: A Decimal, tracks total amount of main prestige currency. Always tracked, but only shown if you add it here.
            - best: A Decimal, tracks highest amount of main prestige currency. Always tracked, but only shown if you add it here.
            - unlockOrder: used to keep track of relevant layers unlocked before this one.
            - resetTime: A number, time since this layer was last prestiged (or reset by another layer)

- color: A color associated with this layer, used in many places. (A string in hex format with a #)

- row: The row of the layer, starting at 0. This affects where the node appears on the standard tree, and which resets affect the layer.

    Using "side" instead of a number will cause the layer to appear off to the side as a smaller node (useful for achievements and statistics). Side layers are not affected by resets unless you add a doReset to them.

- displayRow: **OVERRIDE** Changes where the layer node appears without changing where it is in the reset order.

- resource: Name of the main currency you gain by resetting on this layer.

- effect(): **optional**. A function that calculates and returns the current values of any bonuses inherent to the main currency. Can return a value or an object containing multiple values. *You will also have to implement the effect where it is applied.*

- effectDescription: **optional**. A function that returns a description of this effect. If the text stays constant, it can just be a string.

- layerShown(): **optional**, A function returning a bool which determines if this layer's node should be visible on the tree. It can also return "ghost", which will hide the layer, but its node will still take up space in the tree.
    Defaults to true.

- hotkeys: **optional**. An array containing information on any hotkeys associated with this layer:

    ```js
    hotkeys: [
        {
            key: "p", // What the hotkey button is. Use uppercase if it's combined with shift, or "ctrl+x" for holding down ctrl.
            description: "p: reset your points for prestige points", // The description of the hotkey that is displayed in the game's How To Play tab
            onPress() { if (player.p.unlocked) doReset("p") },
            unlocked() {return hasMilestone('p', 3)} // Determines if you can use the hotkey, optional
        }
    ]
    ```

- style: **optional**. a "CSS object" where the keys are CSS attributes, containing any CSS that should affect this layer's entire tab.

- tabFormat: **optional**. use this if you want to add extra things to your tab or change the layout. [See here for more info.](custom-tab-layouts.md)

- midsection: **optional**, an alternative to `tabFormat`, which is inserted in between Milestones and Buyables in the standard tab layout. (cannot do subtabs)

## Big features (all optional)

- upgrades: A set of one-time purchases which can have unique upgrade conditions, currency costs, and bonuses. [See here for more info.](upgrades.md)

- milestones: A list of bonuses gained upon reaching certain thresholds of a resource. Often used for automation/QOL. [See here for more info.](milestones.md)

- challenges: The player can enter challenges, which make the game harder. If they reach a goal and beat the challenge, they recieve a bonus. [See here for more info.](challenges.md)

- buyables: Effectively upgrades that can be bought multiple times, and are optionally respeccable. Many uses. [See here for more info.](buyables.md)

- clickables: Extremely versatile and generalized buttons which can only be clicked sometimes. [See here for more info.](clickables.md)

- microtabs: An area that functions like a set of subtabs, with buttons at the top changing the content within. (Advanced) [See here for more info.](subtabs-and-microtabs.md)

- bars: Display some information as a progress bar, gague, or similar. They are highly customizable, and can be vertical as well. [See here for more info.](bars.md)

- achievements: Kind of like milestones, but with a different display style and some other differences. Extra features are on the way at a later date! [See here for more info.](achievements.md)

- achievementPopups, milestonePopups: **optional**, If false, disables popup message when you get the achievement/milestone. True by default.

- infoboxes: Displays some text in a box that can be shown or hidden. [See here for more info.](infoboxes.md)

- grid: A grid of buttons that behave the same, but have their own data.[See here for more info.](grids.md)

## Prestige formula features

- type: **optional**. Determines which prestige formula you use. Defaults to "none".

    - "normal": The amount of currency you gain is independent of its current amount (like Prestige). The formula before bonuses is based on `baseResource^exponent`
    - "static": The cost is dependent on your total after reset. The formula before bonuses is based on `base^(x^exponent)`
    - "custom": You can define everything, from the calculations to the text on the button, yourself. (See more at the bottom)
    - "none": This layer does not prestige, and therefore does not need any of the other features in this section.

- baseResource: The name of the resource that determines how much of the main currency you gain on reset.

- baseAmount(): A function that gets the current value of the base resource.

- requires: A Decimal, the amount of the base needed to gain 1 of the prestige currency. Also the amount required to unlock the layer. You can instead make this a function, to make it harder if another layer was unlocked first (based on unlockOrder).

- exponent: Used as described above.

- base: **sometimes required**. required for "static" layers, used as described above. If absent, defaults to 2. Must be greater than 1.

- roundUpCost: **optional**. a bool, which is true if the resource cost needs to be rounded up. (use if the base resource is a "static" currency.)

- gainMult(), gainExp(): **optional**. For normal layers, these functions calculate the multiplier and exponent on resource gain from upgrades and boosts and such. Plug in most bonuses here.
    For static layers, they instead multiply and roots the cost of the resource. (So to make a boost you want to make gainMult smaller and gainExp larger.)

- directMult(): **optional**. Directly multiplies the resource gain, after exponents and softcaps. For static layers, actually multiplies resource gain instead of reducing the cost.

- softcap, softcapPower: **optional**. For normal layers, gain beyond [softcap] points is put to the [softcapPower]th power
    Default for softcap is e1e7, and for power is 0.5.

## Other prestige-related features

- canBuyMax(): **sometimes required**. required for static layers, function used to determine if buying max is permitted.

- onPrestige(gain): **optional**. A function that triggers when this layer prestiges, just before you gain the currency.  Can be used to have secondary resource gain on prestige, or to recalculate things or whatnot.

- resetDescription: **optional**. Use this to replace "Reset for " on the Prestige button with something else.

- prestigeButtonText(): **sometimes required**. Use this to make the entirety of the text a Prestige button contains. Only required for custom layers, but usable by all types.

- passiveGeneration(): **optional**, returns a regular number. You automatically generate your gain times this number every second (does nothing if absent)
        This is good for automating Normal layers.

- autoPrestige(): **optional**, returns a boolean, if true, the layer will always automatically do a prestige if it can.
        This is good for automating Static layers.

## Tree/node features

- symbol: **optional**. The text that appears on this layer's node. Default is the layer id with the first letter capitalized.

- image: **override**. The url (local or global) of an image that goes on the node. (Overrides symbol)

- position: **optional**. Determines the horizontal position of the layer in its row in a standard tree. By default, it uses the layer id, and layers are sorted in alphabetical order.

- branches: **optional**. An array of layer/node ids. On a tree, a line will appear from this layer to all of the layers in the list. Alternatively, an entry in the array can be a 2-element array consisting of the layer id and a color value. The color value can either be a string with a hex color code, or a number from 1-3 (theme-affected colors). A third element in the array optionally specifies line width.

- nodeStyle: **optional**. A CSS object, where the keys are CSS attributes, which styles this layer's node on the tree.

- tooltip() / tooltipLocked(): **optional**. Functions that return text, which is the tooltip for the node when the layer is unlocked or locked, respectively. By default the tooltips behave the same as in the original Prestige Tree.
    If the value is "", the tooltip will be disabled.

- marked: **optional** Adds a mark to the corner of the node. If it's "true" it will be a star, but it can also be an image URL.

## Other features

- doReset(resettingLayer): **optional**. Is triggered when a layer on a row greater than or equal to this one does a reset. The default behavior is to reset everything on the row, but only if it was triggered by a layer in a higher row. `doReset` is always called for side layers, but for these the default behavior is to reset nothing.
                
    If you want to keep things, determine what to keep based on `resettingLayer`, `milestones`, and such, then call `layerDataReset(layer, keep)`, where `layer` is this layer, and `keep` is an array of the names of things to keep. It can include things like "points", "best", "total" (for this layer's prestige currency), "upgrades",  any unique variables like "generatorPower", etc. If you want to only keep specific upgrades or something like that, save them in a separate variable, then call `layerDataReset`, and then set `player[this.layer].upgrades` to the saved upgrades.

- update(diff): **optional**. This function is called every game tick. Use it for any passive resource production or time-based things. `diff` is the time since the last tick. 

- autoUpgrade: **optional**, a boolean value, if true, the game will attempt to buy this layer's upgrades every tick. Defaults to false.

- automate(): **optional**. This function is called every game tick, after production. Use it to activate automation things that aren't otherwise supported. 

- resetsNothing: **optional**. Returns true if this layer shouldn't trigger any resets when you prestige.

- increaseUnlockOrder: **optional**. An array of layer ids. When this layer is unlocked for the first time, the `unlockOrder` value for any not-yet-unlocked layers in this list increases. This can be used to make them harder to unlock.

- shouldNotify: **optional**. A function to return true if this layer should be highlighted in the tree. The layer will automatically be highlighted if you can buy an upgrade whether you have this or not.

- glowColor: **optional**. The color that this layer will be highlighted if it should notify. The default is red. You can use this if you want several different notification types!

- componentStyles: **optional**. An object that contains a set of functions returning CSS objects. Each of these will be applied to any components on the layer with the type of its id. Example:

```js
componentStyles: {
    "challenge"() { return {'height': '200px'} },
    "prestige-button"() { return {'color': '#AA66AA'} }
}
```

- leftTab: **optional**, if true, this layer will use the left tab instead of the right tab.

- previousTab: **optional**, a layer's id. If a layer has a previousTab, the layer will always have a back arrow and pressing the back arrow on this layer will take you to the layer with this id. 

- deactivated: **optional**, if this is true, hasUpgrade, hasChallenge, hasAchievement, and hasMilestone will return false for things in the layer, and you will be unable to buy or click things on the layer. You will have to disable effects of buyables, the innate layer effect, and possibly other things yourself.

## Custom Prestige type  
(All of these can also be used by other prestige types)

- getResetGain(): **mostly for custom prestige type**. Returns how many points you should get if you reset now. You can call `getResetGain(this.layer, useType = "static")` or similar to calculate what your gain would be under another prestige type (provided you have all of the required features in the layer).

- getNextAt(canMax=false): **mostly for custom prestige type**. Returns how many of the base currency you need to get to the next point. `canMax` is an optional variable used with Static-ish layers to differentiate between if it's looking for the first point you can reset at, or the requirement for any gain at all (Supporting both is good). You can also call `getNextAt(this.layer, canMax=false, useType = "static")` or similar to calculate what your next at would be under another prestige type (provided you have all of the required features in the layer).

- canReset(): **mostly for custom prestige type**. Return true only if you have the resources required to do a prestige here.

- prestigeNotify(): **mostly for custom prestige types**, returns true if this layer should be subtly highlighted to indicate you
        can prestige for a meaningful gain.