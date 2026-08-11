/* 修仙记事本 · 数据文件 v1.1（炼气 13 层 → 筑基）
 * 玩法灵感来源：《凡人修仙传》（境界/寿元/13层）与《鬼谷八荒》（修为+材料双线突破）
 * 本项目为爱好者自制文字游戏，全部代码与文案均为原创，不含任何第三方素材
 * 事件字段：
 *  type: daily 常规 | chance 机遇 | trib 劫难 | miracle 奇遇 | flavor 留白
 *  cat: xiulian 修炼 | ziyuan 资源 | zhandou 战斗 | renji 人际 | xinjing 心境 | jiyuan 机缘
 *  layers: [最低层, 最高层]（1-13；筑基后事件用 cond.flag:"筑基"）
 *  chain: 链 id（如 pianzi_1，需 pianzi_0/前序已触发；命名按链顺序）
 *  cooldown: 触发后 N 年内不再出现
 *  cond: { min,max,flag,flag2,notFlag,notFlag2,inv }
 *  effect: { attrs, inv, flag, realmLoss }
 *  battle: 斗法（事件级或选项级，选项级优先于固定 result）
 *    { name, tier:1同阶/2强敌/3超阶, demonic:破魔目标, winText, winEffect, wuxue:[低,高]感悟区间,
 *      loseWeights:[轻伤,重伤,兵解]（缺省按 tier：1→[55,30,15] 2→[35,40,25] 3→[20,40,40]），
 *      lightText, lightEffect, heavyText, heavyEffect, deathText（兵解文案，必备） }
 */
window.GAME_DATA = {
  attrs: ["灵根", "悟性", "根骨", "气运", "神识"],
  totalPoints: 200,
  maxAttr: 100,
  /* 炼气 13 层：每层修为需求（累计 650 圆满） */
  layerNeed: [0, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80],
  lifespanBase: 120,

  /* v3 境界配置：need=该境界圆满修为；筑基/结丹分初/中/后三段；元婴为 v3 封顶 */
  realms: [
    { name: "炼气", need: 650 },
    { name: "筑基", need: 1500, stages: [["初期", 0], ["中期", 400], ["后期", 900]] },
    { name: "结丹", need: 5200, stages: [["初期", 0], ["中期", 1800], ["后期", 3800]] },
    { name: "元婴", need: 4500, stages: [["初期", 0], ["中期", 1500], ["后期", 3200]] },
    { name: "化神", need: 0 }
  ],
  /* 背包丹药槽（叠放） */
  pills: ["聚气丹", "筑基丹", "符咒", "凝元丹", "结金丹", "回春丹", "玉骨丹", "妖丹"],
  /* 结丹三宝：仅秘境深处产出，flag 化不占背包格 */
  mats2: ["玄冰魄", "炎髓晶", "雷灵枝"],

  talents: [
    { id: "tianling", name: "天灵根",   desc: "万中无一的资质，灵根 +20", effect: { attrs: { "灵根": 20 } } },
    { id: "wuxing",   name: "悟性超凡", desc: "功法一看就透，悟性 +20", effect: { attrs: { "悟性": 20 } } },
    { id: "daoti",    name: "天生道体", desc: "百邪不侵，根骨 +20", effect: { attrs: { "根骨": 20 } } },
    { id: "qiyun",    name: "气运之子", desc: "出门捡宝，气运 +20", effect: { attrs: { "气运": 20 } } },
    { id: "shenshi",  name: "天生神识", desc: "神识远超同阶，神识 +20", effect: { attrs: { "神识": 20 } } },
    { id: "zongmen",  name: "宗门遗孤", desc: "入门即内门，灵石 +30，特质「宗门」", effect: { flag: "宗门", inv: { "灵石": 20 } } },
    { id: "sanxiu",   name: "散修之魂", desc: "无门无派一身野路子，气运 +10，特质「散修」", effect: { attrs: { "气运": 10 }, flag: "散修" } },
    { id: "dandao",   name: "丹道奇才", desc: "药理天生敏感，悟性 +10，特质「丹道」", effect: { attrs: { "悟性": 10 }, flag: "丹道" } },
    { id: "yushou",   name: "御兽灵体", desc: "万兽亲近，特质「御兽」", effect: { flag: "御兽" } },
    { id: "jianxin",  name: "剑心通明", desc: "天生剑骨，根骨 +10，特质「剑修」", effect: { attrs: { "根骨": 10 }, flag: "剑修" } },
    { id: "fulu",     name: "符箓世家", desc: "自幼画符，符咒 +5（每张战力 +3）", effect: { inv: { "符咒": 5 } } },
    { id: "lianqi",   name: "炼器传人", desc: "家传炼器手艺，开局自带一件法器", effect: { artifact: { "法器": 1 } } },
    { id: "duobao",   name: "多宝童子", desc: "打小财运旺，灵石 +50", effect: { inv: { "灵石": 50 } } },
    { id: "guomu",    name: "过目不忘", desc: "经书一遍成诵，悟性 +15", effect: { attrs: { "悟性": 15 } } },
    { id: "wufu",     name: "武夫出身", desc: "入道前是凡间武林高手，根骨 +15", effect: { attrs: { "根骨": 15 } } },
    { id: "yaowang",  name: "药王谷弃徒", desc: "被逐出师门，走时顺了三枚聚气丹", effect: { inv: { "聚气丹": 3 } } },
    { id: "tiansha",  name: "天煞孤星", desc: "命格孤绝：灵根 +15，但气运 -10", effect: { attrs: { "灵根": 15, "气运": -10 } } },
    { id: "fuxing",   name: "福星高照", desc: "运气好到离谱，气运 +15", effect: { attrs: { "气运": 15 } } },
    { id: "hongchen", name: "红尘道心", desc: "历尽世事心不动，神识 +15", effect: { attrs: { "神识": 15 } } },
    { id: "paoshang", name: "跑商世家", desc: "家里世代跑商，灵石 +30，气运 +5", effect: { inv: { "灵石": 30 }, attrs: { "气运": 5 } } },
    /* ===================== v4.5 机缘扩充：接新系统（魔道/坊市/恩师/法宝/法术） ===================== */
    { id: "mozhong",  name: "魔种天成", desc: "天生亲近魔道：开局即魔修，灵根 +10，气运 -5", effect: { flag: "魔修", attrs: { "灵根": 10, "气运": -5 } } },
    { id: "chuanjia", name: "传家之宝", desc: "爷爷临终塞给你的锦盒，开局自带一件灵器", effect: { artifact: { "灵器": 1 } } },
    { id: "jianzhong", name: "剑种", desc: "天生与剑亲近，开局习得「烈阳剑诀」，根骨 +5", effect: { spell: "lieyang", attrs: { "根骨": 5 } } },
    { id: "shouzhuo", name: "守拙", desc: "性子和缓，开局习得「玄光罩」，神识 +5", effect: { spell: "xuanguang", attrs: { "神识": 5 } } },
    { id: "shixiang", name: "师缘深厚", desc: "入门就被长老一眼看中，特质「亲传」", effect: { flag: "亲传" } },
    { id: "yifan",    name: "一饭之恩", desc: "幼时施过一位老修士一碗饭，TA说会还。特质「恩师」，气运 +8", effect: { flag: "恩师", attrs: { "气运": 8 } } },
    { id: "zhuma",    name: "竹马之交", desc: "从小有个过命的玩伴，根骨 +5，气运 +5", effect: { attrs: { "根骨": 5, "气运": 5 } } },
    { id: "meiren",   name: "红颜早约", desc: "幼时定过一门亲，神识 +5，气运 +5", effect: { attrs: { "神识": 5, "气运": 5 } } },
    { id: "shanggu",  name: "商贾巨室", desc: "家里开着三县最大的商行，灵石 +80，气运 +5", effect: { inv: { "灵石": 80 }, attrs: { "气运": 5 } } },
    { id: "laolie",   name: "老猎户之子", desc: "深山里滚大，陷阱弓箭样样熟，根骨 +10，符咒 +2", effect: { attrs: { "根骨": 10 }, inv: { "符咒": 2 } } },
    { id: "shuxiang", name: "书香门第", desc: "三代读书人家，悟性 +10，神识 +5", effect: { attrs: { "悟性": 10, "神识": 5 } } },
    { id: "guer2",    name: "孤身一人", desc: "无父无母独自长大，神识 +10，气运 -5", effect: { attrs: { "神识": 10, "气运": -5 } } },
    { id: "jianghu2", name: "江湖把式", desc: "跑过码头卖过艺，根骨 +5，气运 +5，灵石 +15", effect: { attrs: { "根骨": 5, "气运": 5 }, inv: { "灵石": 15 } } },
    { id: "shennong", name: "采药人", desc: "识得百草，聚气丹 +2，回春丹 +1，根骨 +5", effect: { inv: { "聚气丹": 2, "回春丹": 1 }, attrs: { "根骨": 5 } } },
    { id: "qimeng",   name: "蒙馆先生之子", desc: "五岁开蒙七岁能文，悟性 +12，灵石 +10", effect: { attrs: { "悟性": 12 }, inv: { "灵石": 10 } } },
    { id: "xiake2",   name: "侠客遗孤", desc: "爹是出了名的大侠，符咒 +3，根骨 +8，气运 +3", effect: { inv: { "符咒": 3 }, attrs: { "根骨": 8, "气运": 3 } } },
    { id: "tianyin",  name: "天音入梦", desc: "幼时梦中闻道，神识 +12，悟性 +6", effect: { attrs: { "神识": 12, "悟性": 6 } } },
    { id: "fugui",    name: "富贵闲人", desc: "从小锦衣玉食，灵石 +100，灵根 -5", effect: { inv: { "灵石": 100 }, attrs: { "灵根": -5 } } }
  ],

  /* 法术首发 18 种：攻 8 / 守 5 / 变 5；trait∈破魔/雷罚/敛息/反震/续命；最多持有 5 门 */
  spells: [
    { id: "lieyang",  name: "烈阳剑诀", type: "攻", elem: "火", power: 30, trait: "破魔", desc: "剑走烈阳，对魔道修士尤为克制" },
    { id: "hanbing",  name: "寒冰锥",   type: "攻", elem: "水", power: 24, trait: null,   desc: "凝寒成锥，中者经脉凝滞" },
    { id: "leiyu",    name: "雷狱诀",   type: "攻", elem: "木", power: 34, trait: "雷罚", desc: "引九天之雷入诀，伤人亦伤己身根基" },
    { id: "jinlun",   name: "破魔金轮", type: "攻", elem: "金", power: 32, trait: "破魔", desc: "金轮一转魔气尽散，专破邪祟护体之术" },
    { id: "houtu",    name: "厚土崩",   type: "攻", elem: "土", power: 28, trait: null,   desc: "借大地厚重之势压落，足以崩山裂石" },
    { id: "fentian",  name: "焚天掌",   type: "攻", elem: "火", power: 36, trait: null,   desc: "掌劲炽烈如焚天，猛则猛矣最耗灵力" },
    { id: "wuxiang",  name: "无相剑气", type: "攻", elem: "金", power: 26, trait: null,   desc: "剑气无形无相，叫人防不胜防" },
    { id: "dulong",   name: "毒龙钻",   type: "攻", elem: "木", power: 22, trait: null,   desc: "毒劲如龙钻入骨髓，中者日久难愈" },
    { id: "xuanguang", name: "玄光罩",  type: "守", elem: "水", power: 20, trait: null,   desc: "玄光护体，水泼不进" },
    { id: "tulao",    name: "土牢壁",   type: "守", elem: "土", power: 18, trait: null,   desc: "厚土起壁囚敌其中，挣破要费大力气" },
    { id: "yixing",   name: "移形换影", type: "守", elem: "木", power: 16, trait: null,   desc: "身形挪移换影，教敌难辨真伪" },
    { id: "jinguang", name: "金光符阵", type: "守", elem: "金", power: 24, trait: "反震", desc: "符箓结阵金光罩身，受击便反震其力" },
    { id: "guiyuan",  name: "归元守一", type: "守", elem: "土", power: 22, trait: null,   desc: "归元气于守一，万般邪法难侵" },
    { id: "lianxi",   name: "敛息遁",   type: "变", elem: "水", power: 0,  trait: "敛息", desc: "敛去周身气息，遁走脱战的上策" },
    { id: "xueran",   name: "血燃术",   type: "变", elem: "火", power: 40, trait: null,   desc: "燃精血换一击之力，用一次亏一分本元" },
    { id: "dingshen", name: "定身诀",   type: "变", elem: "金", power: 0,  trait: null,   desc: "一指落定人身行止，争得一线先机" },
    { id: "xuming",   name: "续命灯",   type: "变", elem: "木", power: 0,  trait: "续命", desc: "魂灯吊住最后一口气，灯在人在" },
    { id: "wuyin",    name: "雾隐阵",   type: "变", elem: "水", power: 0,  trait: "敛息", desc: "浓雾四起掩去行藏，追兵难觅踪迹" }
  ],

  /* 成就图鉴：gold 为金框成就，由 grantAchievement 授予 */
  achievements: [
    { id: "yuanying",      name: "元婴大成",   gold: true,  desc: "碎丹成婴，陆地神仙" },
    { id: "huashen",       name: "化神登临",   gold: true,  desc: "人间界顶点，飞升候选" },
    { id: "zhengdao",      name: "正道魁首",   gold: true,  desc: "攻破魔道总坛，正道共尊" },
    { id: "modao",         name: "魔道巨擘",   gold: true,  desc: "魔功大成，一方魔主" },
    { id: "suidan",        name: "碎丹重结",   gold: true,  desc: "兵解金丹重凝，向死而生" },
    { id: "taoli",         name: "桃李满门",   gold: true,  desc: "门下弟子两人结丹" },
    { id: "kaifu",         name: "开府建牙",   gold: false, desc: "金丹开府，自领一峰" },
    { id: "shousheng",     name: "首胜斗法",   gold: false, desc: "金丹期第一场斗法胜利" },
    { id: "shouren",       name: "手刃大妖",   gold: false, desc: "猎杀化形大妖" },
    { id: "daoxin_chucheng", name: "道心初成", gold: false, desc: "濒死反杀，道心初凝" },
    { id: "wanrendi",      name: "万人敌",     gold: false, desc: "斗法五胜" },
    { id: "cangshu",       name: "藏书万卷",   gold: false, desc: "习得四门以上法术" },
    { id: "fujia",         name: "富甲一方",   gold: false, desc: "灵石攒过两千" },
    { id: "yibo",          name: "义薄云天",   gold: false, desc: "还人情三次" }
  ],

  /* 物品图鉴：弹窗中自动匹配显示，帮玩家做决策 */
  glossary: {
    "灵石": "修仙界的通行货币：丹药、法宝、功法、洞府，样样离不开它",
    "聚气丹": "炼气期最实用的丹药：入手后每年自动服一枚，修为 +15。筑基后失效，会自动折算灵石",
    "筑基丹": "筑基雷劫的保命符：渡劫时服下，成功率 90%。一枚难求，见到就别错过",
    "灵髓": "地道筑基三宝之一。集齐三件，渡劫成功率 75%——历练、秘境、拍卖皆有可能得见",
    "地火莲": "地道筑基三宝之一。集齐三件，渡劫成功率 75%——历练、秘境、拍卖皆有可能得见",
    "天雷竹": "地道筑基三宝之一。集齐三件，渡劫成功率 75%——历练、秘境、拍卖皆有可能得见",
    "法器": "低阶法宝：战力 +10，遇险自动护主。修仙者的第一件家当",
    "灵器": "中阶法宝：战力 +25，渡劫时成功率 +5%",
    "法宝": "高阶法宝：战力 +50，渡劫时成功率 +10%。可遇不可求",
    "黄阶功法": "最粗浅的功法，有总比没有强。升一阶功法，修炼 +2/年",
    "玄阶功法": "高阶功法：修炼速度 +2/年，突破快人一步。这灵石花在根上，不冤",
    "地阶功法": "稀世功法：修炼速度 +4/年。多少修士一辈子摸不到一卷",
    "天阶功法": "传说中的功法：修炼速度 +6/年。得一卷，仙途改写",
    "洞天": "灵脉洞府：修炼速度 +2/年，长线回报",
    "灵眼": "灵泉福地：修炼速度 +2/年，长线回报",
    "古经": "前人传承：修炼速度 +2/年，长线回报",
    "凝元丹": "筑基期常用丹药：每年自动服一枚，修为 +25。连服会生耐药（+12、+5），积多则丹毒入体，停药清修数年可解",
    "结金丹": "结丹圣药：渡结丹雷劫时服下，成功率 85%，丹成一品。拍卖行压轴货，三百灵石起步",
    "回春丹": "金丹期疗伤丹：养伤期间自动服用，养伤期缩短一年。修为丹对金丹修士已如糖丸，疗伤丹才是常备",
    "玉骨丹": "金丹期上等疗伤丹：养伤期缩短两年。断骨续接，价值不菲",
    "妖丹": "化形大妖的毕生精华：疗伤圣药，服下伤势立愈。猎杀大妖才有一枚，有价无市",
    "道心": "生死磨砺出的定力：濒死反杀、焚烧魔功而不取用，都能养出道心。结婴雷劫时，每一点道心都是活命的本钱",
    "养伤": "重伤后的静养期：修为减半、战力减半，战斗与秘境都不会来找你。疗伤丹能缩短养伤的年数",
    "情报": "势力的眼线送来的消息：积得多了，才能摸清魔道分坛乃至总坛的底细。情报够，才敢动手",
    "灵脉": "势力的根基之一：每座灵脉让修炼速度 +2/年，还有供奉灵石入账。修仙界的地皮，从来都是抢出来的",
    "玄冰魄": "结丹三宝之一，只在大秘境深处产出。集齐三件：地道结丹成功率 70%，丹成二品真丹",
    "炎髓晶": "结丹三宝之一，只在大秘境深处产出。集齐三件：地道结丹成功率 70%，丹成二品真丹",
    "雷灵枝": "结丹三宝之一，只在大秘境深处产出。集齐三件：地道结丹成功率 70%，丹成二品真丹",
    "符咒": "一叠符纸：每张战力 +3，可叠加。驱敌、破阵、救人，都用得上",
    "神识": "感知与心神之本：神识越高心魔越难近身，是结丹心魔劫的底气",
    "心魔": "修道人的心障，结丹前必发。魔修、走火未愈会加重它，神识能压住它",
    "走火入魔": "真元逆行之劫：每年有一线可能心魔反噬。神识够高（55+）可慢慢磨平暗伤",
    "古修士洞府": "前代修士坐化后留下的洞府，禁制重重，宝物与凶险并存",
    "一品金丹": "金丹中的上品：全属性大涨，万中无一，元婴大道可期",
    "假丹": "勉强凝成的金丹，成色不足，道途多舸——但未必没有转机"
  },

  events: [
    // 事件已按境界拆分至 assets/data/events-*.js，此处合并
  ].concat(window.GAME_EVENTS_R0 || [], window.GAME_EVENTS_R1 || [], window.GAME_EVENTS_R2 || [], window.GAME_EVENTS_R2_S1 || [], window.GAME_EVENTS_R2_S2 || [], window.GAME_EVENTS_R2_S3 || [], window.GAME_EVENTS_R3 || [], window.GAME_EVENTS_R3_S1 || [], window.GAME_EVENTS_R3_S2 || [], window.GAME_EVENTS_R3_S3 || [], window.GAME_EVENTS_R4 || [], window.GAME_EVENTS_RX || [], window.GAME_EVENTS_JZG || [], window.GAME_EVENTS_QUANYI || [], window.GAME_EVENTS_HUAFENG || [], window.GAME_EVENTS_SHENSHI || []),

  /* =========================================================
   * 秘境副本：连续点选弹窗流。节点 choices 字段：
   *  go: "deeper"(默认) | "stay" | "exit"；combat: 战力阈值（±10% 随机）；
   *  win/lose: 战斗判定分支；sanbao: 三宝宝箱（未获得优先，全齐改灵石）；
   *  death: 致死文案（用「兵解/道消」）；其余同事件 choices。
   * ========================================================= */
  dungeons: [
    {
      id: "mj_dongfu", name: "古修士洞府", cooldown: 20,
      depths: [
        [ /* 第 1 层 · 前殿 */
          { id: "df_1a", text: "洞口禁制早已残破，你侧身闪入。前殿积灰寸许，供桌上摆着个褪色的蒲团。",
            choices: [
              { text: "搜刮前殿", sub: "小心为上", outcomes: [
                { weight: 6, result: "蒲团下压着一只储物袋，灵石还温着。", effect: { inv: { "灵石": 40 } } },
                { weight: 4, result: "你触动了残余禁制，被震得气血翻涌。", effect: { attrs: { "根骨": -3 } } }
              ] },
              { text: "直奔深处", sub: "好宝贝都在里面", result: "你绕过前殿，推开内室的石门。" },
              { text: "撤离", sub: "见好就收", result: "你退出洞府，记下了这个位置。", go: "exit" }
            ] },
          { id: "df_1b", text: "前殿四壁刻满壁画：一位青衫修士仗剑而立，画的最后，是他对着一座丹炉长跪不起。",
            choices: [
              { text: "细看壁画", sub: "或有玄机", outcomes: [
                { weight: 6, result: "壁画暗格藏着一张残方，你参详片刻，顿觉大有收获。", effect: { attrs: { "悟性": 4 } } },
                { weight: 4, result: "壁画只是壁画。你拍拍灰，继续往前走。" }
              ] },
              { text: "进内室", sub: "不耽误", result: "你推开内室的石门。" },
              { text: "撤离", sub: "此地不宜久留", result: "你退出洞府。", go: "exit" }
            ] }
        ],
        [ /* 第 2 层 · 内室（战斗判定） */
          { id: "df_2a", text: "内室一头石兽豁然睁眼——是守护洞府的傀儡兽！",
            choices: [
              { text: "硬闯", sub: "战力判定", combat: 120,
                win: { result: "你三剑拆解了傀儡兽的关节，它轰然散落。", effect: { attrs: { "气运": 3 } } },
                lose: { result: "傀儡兽一掌把你拍飞，你吐血退到洞口。", effect: { attrs: { "根骨": -5 } }, go: "exit" } },
              { text: "绕行", sub: "不硬拼", outcomes: [
                { weight: 5, result: "你贴着墙根溜了过去，心跳得像打鼓。" },
                { weight: 5, result: "傀儡兽的视线扫来，你屏息退了回去。", go: "exit" }
              ] },
              { text: "撤离", sub: "保命要紧", result: "你拱手告辞，傀儡兽目送你离开。", go: "exit" }
            ] },
          { id: "df_2b", text: "内室一架玉简落满灰尘。你刚要伸手，头顶忽然落下一张禁制大网！",
            choices: [
              { text: "破网抢简", sub: "战力判定", combat: 110,
                win: { result: "你撕网而出，顺手捞走三枚玉简。", effect: { attrs: { "悟性": 3 }, inv: { "灵石": 20 } } },
                lose: { result: "禁制缠身，你斩断一角狼狈退出。", effect: { attrs: { "根骨": -4 } }, go: "exit" } },
              { text: "后退", sub: "不贪", result: "你缩手得快，禁制扑了个空。" },
              { text: "撤离", sub: "这地方邪门", result: "你退出洞府。", go: "exit" }
            ] }
        ],
        [ /* 第 3 层 · 丹室（三宝宝箱） */
          { id: "df_3a", text: "丹室中央，一只玉盒静静躺在石台上，盒面刻着看不懂的古篆。",
            choices: [
              { text: "开玉盒", sub: "或是天材地宝", sanbao: true, result: "玉盒开启，满室皆是霞光。", go: "exit" },
              { text: "先搜丹室", sub: "再看看", outcomes: [
                { weight: 5, result: "丹炉里还封着两枚凝元丹，药性竟然未散。", effect: { inv: { "凝元丹": 2 } }, go: "exit" },
                { weight: 5, result: "你翻出一册残破丹方，参详片刻大有收获。", effect: { attrs: { "悟性": 4 } }, go: "exit" }
              ] },
              { text: "撤离", sub: "不可贪多", result: "你对着石台拜了一拜，转身离开了丹室。", go: "exit" }
            ] },
          { id: "df_3b", text: "丹室尽头是一尊坐化的枯骨，指骨下压着一只鼓鼓的储物袋。",
            choices: [
              { text: "取储物袋", sub: "前辈莫怪", sanbao: true, result: "你取下储物袋，对着枯骨拜了三拜。", go: "exit" },
              { text: "连骸骨一起埋了", sub: "入土为安", result: "你安葬了前辈，起身时只觉灵台一轻。", effect: { attrs: { "神识": 5 } }, go: "exit" }
            ] }
        ]
      ]
    }
    ,
  /* ================= 妖兽巢穴：战斗为主，深处 sanbao ================= */
  { id: "mj_yaoxue", name: "妖兽巢穴", cooldown: 20,
    depths: [
      [ /* 第 1 层 · 谷口 */
        { id: "yx_1a", text: "谷里腥风扑面。地上全是兽骨，新的压着旧的。",
          choices: [
            { text: "贴壁潜行", sub: "避开兽群", outcomes: [
              { weight: 6, result: "你屏息绕过几头打盹的妖兽，摸到了巢穴中层。" },
              { weight: 4, result: "一头幼兽冲你狂吠，全谷的耳朵都竖起来了。你只能先退。", go: "exit" }
            ] },
            { text: "杀进去", sub: "战力判定", combat: 115,
              win: { result: "外围几头妖兽拦不住你的剑，血路直通深处。", effect: { attrs: { "根骨": 2 } } },
              lose: { result: "兽群越聚越多，你挨了两爪，只能先行撤离。", effect: { attrs: { "根骨": -5 } }, go: "exit" } },
            { text: "撤离", sub: "腥风太盛", result: "你记下谷口方位，悄声退了出去。", go: "exit" }
          ] },
        { id: "yx_1b", text: "巢穴外围的孵化室，石窝里卧着几枚温热的兽卵。",
          choices: [
            { text: "掏兽卵", sub: "坊市有人高价收", outcomes: [
              { weight: 5, result: "你揣了两枚兽卵继续往里摸。转手一卖，够半年嚼用。", effect: { inv: { "灵石": 45 } } },
              { weight: 3, result: "母兽回巢！你弃卵而逃，背上还是挨了一爪。", effect: { attrs: { "根骨": -4 } }, go: "exit" },
              { weight: 2, result: "兽卵里忽然伸出爪子——快孵化了。你讪讪放下。" }
            ] },
            { text: "绕过去", sub: "贪多嚼不烂", result: "你放轻脚步，往巢穴深处去。" },
            { text: "撤离", sub: "见好就收", result: "你退出巢穴。", go: "exit" }
          ] }
      ],
      [ /* 第 2 层 · 中层洞窟 */
        { id: "yx_2a", text: "洞窟豁然开阔，十几头妖兽伏在暗处，眼睛一盏盏亮起来。",
          choices: [
            { text: "硬闯兽群", sub: "战力判定", combat: 135,
              win: { result: "你剑光开路，兽群顿时溃散。妖丹滚了一地。", effect: { inv: { "灵石": 60 }, attrs: { "根骨": 3 } } },
              lose: { result: "兽群前仆后继，你杀到手软，只能夺路而出。", effect: { attrs: { "根骨": -7 } }, go: "exit" } },
            { text: "投食引开", sub: "用随身灵谷", outcomes: [
              { weight: 6, result: "兽群抢食成一团，你贴着洞顶溜了过去。" },
              { weight: 4, result: "灵谷不够分。妖兽齐刷刷抬头看你，你慢慢退了出去。", go: "exit" }
            ] },
            { text: "撤离", sub: "命比灵石贵", result: "你退出巢穴。", go: "exit" }
          ] },
        { id: "yx_2b", text: "一头断角的筑基后期妖兽趴在灵草丛里，伤得很重，喉咙里滚着低吼。",
          choices: [
            { text: "趁它病，要它命", sub: "战力判定", combat: 125,
              win: { result: "它没能站起第二次。灵草归你，妖丹也归你。", effect: { inv: { "灵石": 70 }, attrs: { "气运": 2 } } },
              lose: { result: "困兽犹斗。它临死一扑，把你撞出了洞窟。", effect: { attrs: { "根骨": -6 } }, go: "exit" } },
            { text: "等它咽气", sub: "熬得起", outcomes: [
              { weight: 5, result: "守了一夜，它咽下最后一口气。灵草到手，竟一根没少。", effect: { inv: { "灵石": 55 } } },
              { weight: 5, result: "它的同族先到了。你躲在石缝里，听了一夜的咀嚼声。", go: "exit" }
            ] },
            { text: "撤离", sub: "不作死", result: "你悄悄退走。", go: "exit" }
          ] }
      ],
      [ /* 第 3 层 · 兽王巢 */
        { id: "yx_3a", text: "最深处，兽王盘在宝光上打盹，肚皮底下压着半开的玉匣。",
          choices: [
            { text: "抽走玉匣", sub: "手要稳", sanbao: true, result: "你把玉匣一点点抽出来。兽王翻了个身，你汗透重衣。", go: "exit" },
            { text: "叫醒它，单挑", sub: "战力判定", combat: 160,
              win: { result: "兽王轰然倒地。巢穴最深处，再没人跟你抢。", sanbao: true, effect: { attrs: { "气运": 4 } }, go: "exit" },
              lose: { result: "兽王一尾把你抽飞。你抓着洞壁爬出谷口，三个月没敢提这地方。", effect: { attrs: { "根骨": -8 } }, go: "exit" } },
            { text: "撤离", sub: "兽王惹不起", result: "你对着宝光咽了口唾沫，到底还是退了。", go: "exit" }
          ] }
      ]
    ] },

  /* ================= 魔窟潜入：伪装抉择，魔修专属，深处 sanbao ================= */
  { id: "mj_moku", name: "魔窟", cooldown: 20,
    depths: [
      [ /* 第 1 层 · 窟门与外堂 */
        { id: "mk_1a", text: "魔窟入口，两个魔修拦路盘查，腰上挂着人头骨串。",
          choices: [
            { text: "报名号混进去", sub: "赌他们见识少", outcomes: [
              { weight: 6, result: "你胡诌了个魔道散修的名号。他们懒得多问，挥手放你进去。" },
              { weight: 4, result: "对方多问了句师承。你答岔了，且战且退才逃出来。", effect: { attrs: { "根骨": -4 } }, go: "exit" }
            ] },
            { text: "亮魔道切口", sub: "魔修专属", cond: { flag: "魔修" }, result: "你亮出魔道切口，守门的立刻换了脸色：「自己人。」还塞给你一壶血灵酒压惊。", effect: { attrs: { "气运": 2 } } },
            { text: "杀进去", sub: "战力判定", combat: 120,
              win: { result: "两个守门的连警哨都没摸到。你把他们拖进了暗处。", effect: { inv: { "灵石": 25 } } },
              lose: { result: "警哨响了，魔窟炸了锅。你拼死杀出重围。", effect: { attrs: { "根骨": -6 } }, go: "exit" } },
            { text: "撤离", sub: "阴气太重", result: "你在窟门外转了一圈，最终还是掉头走了。", go: "exit" }
          ] },
        { id: "mk_1b", text: "外堂像个黑市，魔修们摆摊交易，血食灵材摆了一排。",
          choices: [
            { text: "花灵石买消息", sub: "灵石 -30", cond: { inv: { "灵石": 30 } }, result: "摊主掂了掂灵石，压低声音：「库房的钥匙，挂在三当家腰上。」", effect: { inv: { "灵石": -30 } } },
            { text: "竖耳朵偷听", sub: "免费的", outcomes: [
              { weight: 5, result: "你听清了库房的方位，还有一句——「最近查得严，生面孔都绑了。」" },
              { weight: 5, result: "有人拍了拍你肩膀：「面生啊。」你笑着应付过去，后背全是汗。" }
            ] },
            { text: "撤离", sub: "不蹚浑水", result: "你学旁人挑了样不值钱的小玩意，慢悠悠逛了出去。", go: "exit" }
          ] }
      ],
      [ /* 第 2 层 · 内窟 */
        { id: "mk_2a", text: "内窟岔道，巡逻头目拦住你，眯眼打量：「哪个堂的？」",
          choices: [
            { text: "随口对暗号", sub: "赌一把", outcomes: [
              { weight: 4, result: "你赌对了上半句。他哼了一声，到底放你过去了。" },
              { weight: 4, result: "暗号对岔了。他拔刀就砍，你拼着挨一刀逃出内窟。", effect: { attrs: { "根骨": -5 } }, go: "exit" },
              { weight: 2, result: "他没听清，让你再说一遍。你心一横，转身便跑了。", go: "exit" }
            ] },
            { text: "翻脸动手", sub: "战力判定", combat: 140,
              win: { result: "三招之内，头目便已倒地。你搜出一串钥匙，入手掂了掂。", effect: { inv: { "灵石": 40 } } },
              lose: { result: "头目临死吹响了警哨。魔窟炸了锅，你好不容易杀出去。", effect: { attrs: { "根骨": -7 } }, go: "exit" } },
            { text: "放出魔功气息", sub: "魔修专属", cond: { flag: "魔修" }, result: "你放出魔功气息。头目脸色一白，忙躬身让路。" },
            { text: "撤离", sub: "见机不对", result: "你拱手说了句「走错路了」，慢慢退走。", go: "exit" }
          ] },
        { id: "mk_2b", text: "囚笼区铁栏斑驳，几个正道修士被吊在笼里，个个气若游丝。",
          choices: [
            { text: "开锁放人", sub: "动静要小", outcomes: [
              { weight: 5, result: "你撬开铁锁，让他们趁乱逃走。有人认出你，朝你深深一揖。", effect: { attrs: { "气运": 5 } } },
              { weight: 3, result: "锁开了，警哨也响了。你把人推出去，自己且战且退。", effect: { attrs: { "根骨": -4 } }, go: "exit" },
              { weight: 2, result: "笼中修士突然大喊救命——他把你当成了魔修。你只好先走。", go: "exit" }
            ] },
            { text: "视而不见", sub: "泥菩萨过江", result: "你垂着眼走过囚笼。有人低声骂了一句什么，你没有回头。", effect: { attrs: { "神识": -2 } } },
            { text: "撤离", sub: "救不了", result: "你攥了攥拳，退出了魔窟。", go: "exit" }
          ] }
      ],
      [ /* 第 3 层 · 库房与祭坛 */
        { id: "mk_3a", text: "魔窟最深处是库房，石门虚掩，宝光从门缝里漏出来。三当家不在。",
          choices: [
            { text: "摸进库房", sub: "拿了就走", sanbao: true, result: "库房里堆着抢来的好东西。你挑了最压手的一件。", go: "exit" },
            { text: "搬空库房", sub: "贪一把大的", outcomes: [
              { weight: 4, result: "你装满两只储物袋。出门时警报大作，但你已经走远了。", effect: { inv: { "灵石": 90 } }, go: "exit" },
              { weight: 4, result: "刚装了半袋，三当家回来了。你翻窗而逃，到手只剩零头。", effect: { inv: { "灵石": 20 } }, go: "exit" },
              { weight: 2, result: "库房底下压着禁制！你触发警报，一路打出了魔窟。", effect: { attrs: { "根骨": -6 } }, go: "exit" }
            ] },
            { text: "直取祭坛暗格", sub: "魔修才知道的门道", cond: { flag: "魔修" }, sanbao: true, result: "祭坛下的暗格，是魔道前辈留的后手。你笑纳了。", go: "exit" },
            { text: "撤离", sub: "贼不走空，这次走空", result: "你盯着门缝看了半晌，终究还是退了。", go: "exit" }
          ] }
      ]
    ] },

  /* ================= 禁区深处：大恐怖大机缘，含 death 节点 ================= */
  { id: "mj_jinqu", name: "禁区深处", cooldown: 20,
    depths: [
      [ /* 第 1 层 · 禁区边缘 */
        { id: "jq_1a", text: "禁区边缘立着半截石碑，上刻「入者道消」。煞气刮得脸生疼。",
          choices: [
            { text: "顶着煞气走", sub: "神识硬扛", outcomes: [
              { weight: 5, result: "煞气灌体，你一步一喘，总算撑了过去。", effect: { attrs: { "神识": -2 } } },
              { weight: 3, result: "煞气冲得灵台嗡嗡响，你原地调息半日才缓过来。", effect: { attrs: { "神识": -4 } } },
              { weight: 2, result: "你扛不住，煞气生生把你推了回来。", effect: { attrs: { "神识": -3 } }, go: "exit" }
            ] },
            { text: "贴符护身", sub: "符咒 -1", cond: { inv: { "符咒": 1 } }, result: "符光撑起一层薄罩，煞气绕着你走。", effect: { inv: { "符咒": -1 } } },
            { text: "撤离", sub: "石碑没开玩笑", result: "你对着石碑看了很久，转身下山去了。", go: "exit" }
          ] },
        { id: "jq_1b", text: "遍地枯骨，储物袋散了一地。没人捡——或者说，捡的人也成了枯骨。",
          choices: [
            { text: "捡储物袋", sub: "富贵险中求", outcomes: [
              { weight: 4, result: "你捡了七八只储物袋，主人都是百年前的修士。", effect: { inv: { "灵石": 70 } } },
              { weight: 4, result: "刚弯腰，残存杀阵亮了一下。你缩手得快，只烧焦了袖子。", effect: { attrs: { "根骨": -3 } } },
              { weight: 2, result: "储物袋是空的。原主人到死都是个穷修士。你替他叹了口气。" }
            ] },
            { text: "绕开枯骨堆", sub: "死者为大", result: "你合掌念了句什么，从旁边绕了过去。", effect: { attrs: { "神识": 2 } } },
            { text: "撤离", sub: "不打扰了", result: "你对着满地枯骨一揖，默默退了出去。", go: "exit" }
          ] }
      ],
      [ /* 第 2 层 · 古战场 */
        { id: "jq_2a", text: "古战场遗址，断兵插了满地。一座残缺杀阵还在自行运转，光刃明灭不定。",
          choices: [
            { text: "硬闯杀阵", sub: "闯不过，就是死", combat: 150,
              win: { result: "你掐准光刃的间隙，三步踏出生门。阵后断兵堆里，宝光隐隐闪现。", effect: { inv: { "灵石": 80 } } },
              lose: { result: "光刃及体，你知道完了。", death: "杀阵的光刃绞碎了护体灵光。你没能喊出声，兵解在这片古战场上，与满地的枯骨作伴。" } },
            { text: "贴着阵边走", sub: "慢就是快", outcomes: [
              { weight: 5, result: "你花了两个时辰挪过杀阵，腿肚子一直在抖。" },
              { weight: 5, result: "阵缘的光刃扫来，你翻滚躲开，再不敢靠近。", effect: { attrs: { "根骨": -4 } }, go: "exit" }
            ] },
            { text: "撤离", sub: "这阵认不得人", result: "你盯着光刃看了半炷香，承认自己过不去。", go: "exit" }
          ] },
        { id: "jq_2b", text: "煞气凝成的雾灵飘来。没有五官，你却觉得它在打量你。",
          choices: [
            { text: "挥剑斩雾", sub: "战力判定", combat: 140,
              win: { result: "剑光过处，雾灵凄啸而散，留下一枚凝实的煞珠。", effect: { inv: { "灵石": 50 } } },
              lose: { result: "雾灵散而复聚，顺着伤口往经脉里钻。你且战且退。", effect: { attrs: { "根骨": -5, "神识": -3 } }, go: "exit" } },
            { text: "凝神不动", sub: "神识较量", outcomes: [
              { weight: 5, result: "你守定灵台。雾灵绕了三圈，最终悻悻散去。", effect: { attrs: { "神识": 3 } } },
              { weight: 5, result: "雾里传来低语，勾你心底旧事。你咬破舌尖才醒过来。", effect: { attrs: { "神识": -5 } } }
            ] },
            { text: "撤离", sub: "惹不起", result: "你屏住呼吸，一步步退了出来。", go: "exit" }
          ] }
      ],
      [ /* 第 3 层 · 仙宫残迹 */
        { id: "jq_3a", text: "禁区核心，半截仙宫斜插在地里。宫门朱漆未褪，像昨天才刷的。",
          choices: [
            { text: "推开宫门", sub: "大机缘，或大恐怖", outcomes: [
              { weight: 4, result: "宫里端坐着一位古修遗蜕，面前供着一只宝匣。霞光扑面。", sanbao: true, go: "exit" },
              { weight: 3, result: "宫里空空如也，只壁上刻了半篇残经。你读了一炷香，只觉如遭雷击。", effect: { attrs: { "悟性": 8 } }, go: "exit" },
              { weight: 3, result: "门后涌出心魔幻象，你对着空气又哭又笑，半日方才醒转。", effect: { attrs: { "神识": -8 } }, go: "exit" },
              { weight: 1, result: "你推开门，看到了一双睁开的眼睛。", death: "门后是一双睁开的眼睛。你只看了它一眼，识海便寸寸崩裂。道消于此，仙宫重归寂静。" }
            ] },
            { text: "门外叩首，只求一缘", sub: "不贪", result: "你在门外磕了三个头。起身时，脚边多了一枚玉简。", effect: { attrs: { "悟性": 5 } }, go: "exit" },
            { text: "撤离", sub: "瘆得慌", result: "你站在宫门前，到底没敢伸手。", go: "exit" }
          ] }
      ],
      [ /* 第 4 层 · 遗蜕玉台 */
        { id: "jq_4a", text: "仙宫最深处，古修士遗蜕盘坐玉台，双手结印，指间扣着一枚储物戒。千年过去，衣袍还在轻轻起伏。",
          choices: [
            { text: "取戒磕头", sub: "前辈成全", sanbao: true, result: "你取下储物戒，恭恭敬敬磕了九个头。玉台忽然化作飞灰——前辈等的人，总算是到了。", go: "exit" },
            { text: "只悟道，不取物", sub: "看一眼都是赚的", result: "你在玉台前坐了一夜。没拿一针一线，道心却通透了三层。", effect: { attrs: { "神识": 8, "悟性": 4 } }, go: "exit" },
            { text: "撤离", sub: "不敢惊扰", result: "你倒退着出了仙宫，连呼吸都放轻了。", go: "exit" }
          ] }
      ]
    ] },

  /* ================= 坠星谷：赌石式切星核，outcomes 多 ================= */
  { id: "mj_gu", name: "坠星谷", cooldown: 20,
    depths: [
      [ /* 第 1 层 · 谷口 */
        { id: "gu_1a", text: "坠星谷里星砂遍地，踩上去咯吱作响。不少人蹲在地上淘砂。",
          choices: [
            { text: "蹲下淘砂", sub: "辛苦钱", outcomes: [
              { weight: 6, result: "淘了半日，攒了一小袋星砂。坊市收这个，价钱还算公道。", effect: { inv: { "灵石": 25 } } },
              { weight: 4, result: "腰都直不起来，只淘到一把碎砂。隔壁老头倒淘出块星核碎料。", effect: { inv: { "灵石": 8 } } }
            ] },
            { text: "往谷深处走", sub: "星核都埋在里头", result: "你绕过淘砂的人群，独自往谷底去。" },
            { text: "撤离", sub: "看看热闹就行", result: "你在谷口转了一圈，便径直回去了。", go: "exit" }
          ] },
        { id: "gu_1b", text: "一个老修士守着石堆打盹，脚边木牌写着：星核原石，一块三十，切涨切垮，各安各的天命。",
          choices: [
            { text: "挑一块切", sub: "灵石 -30，一刀穷一刀富", cond: { inv: { "灵石": 30 } }, outcomes: [
              { weight: 3, result: "石皮裂开，星髓流光！围观的人都站起来了。", effect: { inv: { "灵石": 120 } } },
              { weight: 4, result: "一刀切垮，里头是块死石。老修士头都没抬：「下一个。」", effect: { inv: { "灵石": -30 } } },
              { weight: 2, result: "切出半块星髓。不多，但回本还有找。", effect: { inv: { "灵石": 15 } } }
            ] },
            { text: "看别人切", sub: "免费的眼力课", outcomes: [
              { weight: 5, result: "看了一下午，你摸出点门道：带银纹的，往往十切九涨。", effect: { attrs: { "悟性": 3 } } },
              { weight: 5, result: "看一人连切三块全垮，当场瘫坐在地。你默默走开了。", effect: { attrs: { "神识": 2 } } }
            ] },
            { text: "撤离", sub: "本钱要紧", result: "你把伸进储物袋的手抽了回来，转身离开了。", go: "exit" }
          ] }
      ],
      [ /* 第 2 层 · 赌石场 */
        { id: "gu_2a", text: "谷腹的露天赌石场人头攒动。中央一块半人高的星核围了三圈人，没人敢下手。",
          choices: [
            { text: "众筹合切", sub: "灵石 -40，涨了就分", cond: { inv: { "灵石": 40 } }, outcomes: [
              { weight: 4, result: "一刀切涨！七八个人分星髓，你那份也不薄。", effect: { inv: { "灵石": 60 } } },
              { weight: 4, result: "切垮了。众人哀嚎，你揉了揉眼睛，权当交学费。", effect: { inv: { "灵石": -40 } } },
              { weight: 2, result: "星髓切出来，组织者却卷款跑了。人情冷暖，也不过如此。", effect: { inv: { "灵石": -40 }, attrs: { "神识": -3 } } }
            ] },
            { text: "独自盘下", sub: "灵石 -80，豪赌", cond: { inv: { "灵石": 80 } }, outcomes: [
              { weight: 3, result: "石皮尽去，一整块星髓宝光冲天！你发了。", effect: { inv: { "灵石": 160 } } },
              { weight: 5, result: "切垮了。八十灵石打了水漂。你站在原地，很久都没动。", effect: { inv: { "灵石": -80 } } },
              { weight: 2, result: "切到一半，星核里传来心跳声。你不敢切了，转手卖了，还小赚一笔。", effect: { inv: { "灵石": 30 } } }
            ] },
            { text: "只看不玩", sub: "赌性不能太重", result: "你看了半晌，把伸进储物袋的手抽了回来。", effect: { attrs: { "神识": 3 } } },
            { text: "撤离", sub: "走人", result: "人堆里不知谁切垮了在嚎，你加快脚步离开。", go: "exit" }
          ] },
        { id: "gu_2b", text: "几个修士鬼鬼祟祟围上来，兜售「内部消息」：哪堆石头是谷主挑剩的，哪堆是新到的。",
          choices: [
            { text: "买消息", sub: "灵石 -20，真假自辨", cond: { inv: { "灵石": 20 } }, outcomes: [
              { weight: 5, result: "消息是真的。你按图索骥切了块小的，还小涨了三成。", effect: { inv: { "灵石": 15 } } },
              { weight: 5, result: "消息是假的。你回去找人，摊子早收了。", effect: { inv: { "灵石": -20 }, attrs: { "神识": 2 } } }
            ] },
            { text: "不理会", sub: "天上掉馅饼？", result: "你摆摆手走了。身后几人互看一眼，只是笑而不语。" },
            { text: "撤离", sub: "水深", result: "你挤出人堆，头也不回地走了。", go: "exit" }
          ] }
      ],
      [ /* 第 3 层 · 陨星坑 */
        { id: "gu_3a", text: "谷底陨星坑，星力紊乱如沸水。坑壁嵌着几块未经开凿的星核，宝光咄咄逼人。",
          choices: [
            { text: "下坑开核", sub: "星力灼人", outcomes: [
              { weight: 4, result: "你顶着星力凿下一块星核，核心里裹着一截天材地宝！", sanbao: true, go: "exit" },
              { weight: 4, result: "凿下来的是块好星核，转手就是一笔。", effect: { inv: { "灵石": 90 } }, go: "exit" },
              { weight: 3, result: "星力骤然暴走，灼伤你的经脉。你抱着半块核爬出坑。", effect: { inv: { "灵石": 30 }, attrs: { "根骨": -6 } }, go: "exit" }
            ] },
            { text: "布符护体再下", sub: "符咒 -1，稳妥些", cond: { inv: { "符咒": 1 } }, result: "符光挡住星力。你安安稳稳凿了块星核上来。", effect: { inv: { "符咒": -1, "灵石": 80 } }, go: "exit" },
            { text: "撤离", sub: "星力太野", result: "你在坑边站了站，热浪燎得眉毛打卷。算了。", go: "exit" }
          ] }
      ],
      [ /* 第 4 层 · 坑底核心 */
        { id: "gu_4a", text: "坑底核心，一块丈许的星核悬在半空，明明灭灭，像在呼吸一般。底下盘着一头星纹巨兽。",
          choices: [
            { text: "战星兽，夺星核", sub: "战力判定", combat: 165,
              win: { result: "巨兽化作星光散去。星核落进你怀里，温热如心脏。", sanbao: true, go: "exit" },
              lose: { result: "巨兽一爪拍碎你的护体灵光。你连滚带爬逃出陨星坑。", effect: { attrs: { "根骨": -8 } }, go: "exit" } },
            { text: "等兽睡着再偷", sub: "有耐心才有肉吃", outcomes: [
              { weight: 4, result: "等了三天，巨兽打了个盹。你抠下星核一角就跑。", effect: { inv: { "灵石": 120 } }, go: "exit" },
              { weight: 4, result: "它根本没睡。你刚靠近，一只眼睛睁开了。你跑得比遁光还快。", go: "exit" }
            ] },
            { text: "撤离", sub: "这机缘吃不下", result: "你最后看了眼那块会呼吸的星核，掉头便出谷了。", go: "exit" }
          ] }
      ]
    ] },

  /* ================= 海底遗府：综合型，sanbao 节点最多 ================= */
  { id: "mj_haifu", name: "海底遗府", cooldown: 20,
    depths: [
      [ /* 第 1 层 · 入海 */
        { id: "hf_1a", text: "避水诀分开海流，你踩上一条珊瑚铺就的路，一路直通海底。",
          choices: [
            { text: "沿珊瑚路走", sub: "看路标", outcomes: [
              { weight: 6, result: "珊瑚路尽头，一座白玉府邸卧在海沟边。" },
              { weight: 4, result: "路在半截断了。你在珊瑚丛里绕了两个时辰，才摸到府邸外墙。", effect: { attrs: { "根骨": -2 } } }
            ] },
            { text: "跟着发光的鱼群", sub: "它们熟门熟路", outcomes: [
              { weight: 5, result: "鱼群领你抄了近路，还顺带发现一窝灵珠贝。", effect: { inv: { "灵石": 35 } } },
              { weight: 5, result: "鱼群把你领进一片海葵丛，触手缠了你满身。", effect: { attrs: { "根骨": -3 } } }
            ] },
            { text: "撤离", sub: "水性一般", result: "避水诀快撑不住了，你先退回海面。", go: "exit" }
          ] },
        { id: "hf_1b", text: "府邸外沉了一艘古船，船舱里的箱子被海水泡得发胀。",
          choices: [
            { text: "开箱", sub: "小心机关", outcomes: [
              { weight: 5, result: "箱里是密封的瓷瓶，凝元丹一点没泡着。", effect: { inv: { "凝元丹": 2 } } },
              { weight: 3, result: "箱底压着一张防潮的灵石票，居然还能兑。", effect: { inv: { "灵石": 40 } } },
              { weight: 2, result: "箱子有机关，一根毒针擦着你指尖过去。", effect: { attrs: { "根骨": -3 } } }
            ] },
            { text: "沉船里再翻翻", sub: "来都来了", outcomes: [
              { weight: 5, result: "你翻出半箱海底灵矿，压舱用的，成色倒是极好。", effect: { inv: { "灵石": 50 } } },
              { weight: 5, result: "舱里住着一窝剑齿鱼，见了面就咬。你踹上舱门就跑。", effect: { attrs: { "根骨": -4 } }, go: "exit" }
            ] },
            { text: "撤离", sub: "直奔正主", result: "破船没什么油水，你往白玉府邸游去。", go: "exit" }
          ] }
      ],
      [ /* 第 2 层 · 府门与正殿 */
        { id: "hf_2a", text: "遗府正门，水压在门口凝成一面看不见的墙，撞得你气血翻腾。",
          choices: [
            { text: "推演门禁", sub: "悟性够就有门", outcomes: [
              { weight: 6, result: "你看出门禁的回路，三指点了三处，水墙无声分开。", effect: { attrs: { "悟性": 4 } } },
              { weight: 4, result: "推演错了方向，门禁反震，你七荤八素。", effect: { attrs: { "神识": -4 } }, go: "exit" }
            ] },
            { text: "硬闯水墙", sub: "战力判定", combat: 135,
              win: { result: "你一剑劈开水墙，府门轰然洞开。", effect: { attrs: { "气运": 2 } } },
              lose: { result: "水墙纹丝不动，反把你弹回珊瑚丛。", effect: { attrs: { "根骨": -5 } }, go: "exit" } },
            { text: "撤离", sub: "进不去", result: "你绕着水墙转了三圈，只得认命离开。", go: "exit" }
          ] },
        { id: "hf_2b", text: "正殿壁画保存完好：府主避世潜修，结丹不成，最终坐化于此。画到最后一幅，他只留了个背影。",
          choices: [
            { text: "细读壁画", sub: "前人路，后人鉴", outcomes: [
              { weight: 5, result: "壁画里藏着他冲击结丹的心得。你逐字记下，看得后背发麻。", effect: { attrs: { "悟性": 6 } } },
              { weight: 5, result: "画是好画，心得是真没有。你看完只记住了他洞府真大。" }
            ] },
            { text: "取供桌上的丹瓶", sub: "祭品蒙尘", result: "供桌上两只丹瓶，封口都还完好。你拜了一拜，小心收进怀里。", effect: { inv: { "凝元丹": 3 } } },
            { text: "撤离", sub: "心头发紧", result: "那背影看得你心里发堵，你提前退了出来。", go: "exit" }
          ] }
      ],
      [ /* 第 3 层 · 藏宝室与灵泉 */
        { id: "hf_3a", text: "藏宝室石门半开，架上摆着三只玉盒，宝光各不相同。门上刻字：取一者生。",
          choices: [
            { text: "取左边玉盒", sub: "宝光最盛", sanbao: true, result: "玉盒开启，霞光映了满室。你取一而还，守住了规矩。", go: "exit" },
            { text: "取右边玉盒", sub: "看着最旧", outcomes: [
              { weight: 5, result: "旧盒里是一袋灵石，原主人怕你白跑一趟。", effect: { inv: { "灵石": 90 } }, go: "exit" },
              { weight: 5, result: "旧盒是空的，盒底刻着小字：「贪心者戒。」你讪讪合上。", go: "exit" }
            ] },
            { text: "三只全拿", sub: "规矩是死的", outcomes: [
              { weight: 5, result: "刚碰到第二只，挪移禁制发动。眼前一花，人已在海面上。", effect: { inv: { "灵石": 20 } }, go: "exit" },
              { weight: 5, result: "禁制慢了半息——你手快，三只全揣进了怀里。", sanbao: true, effect: { inv: { "灵石": 60 } }, go: "exit" }
            ] },
            { text: "撤离", sub: "刻字瘆人", result: "「取一者生」。你看了三遍，默默退了出来。", go: "exit" }
          ] },
        { id: "hf_3b", text: "殿后一眼灵泉咕嘟冒泡，泉边玉碑写着「饮者益」。",
          choices: [
            { text: "汲水装瓶", sub: "能带多少带多少", result: "你装了满满几瓶灵泉水。回去配药，顶得上几枚凝元丹。", effect: { inv: { "凝元丹": 2 }, attrs: { "根骨": 3 } } },
            { text: "泉边打坐", sub: "借地修炼", result: "灵泉边灵气浓得化不开。你坐到秘境将闭才起身。", effect: { attrs: { "灵根": 3 } }, go: "exit" },
            { text: "撤离", sub: "差不多了", result: "你掬了捧泉水洗了把脸，神清气爽地走了。", go: "exit" }
          ] }
      ],
      [ /* 第 4 层 · 主府寝宫 */
        { id: "hf_4a", text: "主府寝宫，府主遗蜕安卧玉床，面容栩栩如生。床头一只玉枕，隐隐透出三色宝光。",
          choices: [
            { text: "叩拜取枕", sub: "前辈遗泽", sanbao: true, result: "你九叩之后捧起玉枕。玉床连同遗蜕化作流光散去——府邸认了你这个过客。", effect: { attrs: { "神识": 5 } }, go: "exit" },
            { text: "搜检寝宫", sub: "再看看", outcomes: [
              { weight: 4, result: "床头暗格里又是一只玉盒。府主待人，厚道得过分。", sanbao: true, go: "exit" },
              { weight: 4, result: "你翻出一匣子海底珠玉，个个都值钱。", effect: { inv: { "灵石": 110 } }, go: "exit" },
              { weight: 2, result: "什么都没翻到。府主的厚道，也只到玉枕为止。", effect: { inv: { "灵石": 30 } }, go: "exit" }
            ] },
            { text: "在殿中静坐送别", sub: "有缘到此", result: "你陪府主坐了最后一夜。离开时，整座遗府在你身后缓缓闭合。", effect: { attrs: { "神识": 8 } }, go: "exit" },
            { text: "撤离", sub: "缘尽于此", result: "你对着玉床长揖到地，退出了遗府。", go: "exit" }
          ] }
      ]
    ] },
  {
    id: "mj_zhanchang", name: "上古战场遗迹", cooldown: 20, spellTreasure: true,
    depths: [
      [ /* 第 1 层 · 残垣 */
        { id: "zc_1a", text: "踏入遗迹，脚下尽是锈死的刀剑。风穿过残垣，呜呜地响，像是有千军万马还在厮杀。",
          choices: [
            { text: "拨荒前行", result: "你在残垣里深一脚浅一脚，鞋袜很快被铁锈染红。" },
            { text: "撤离", result: "残垣里阴气太重，你退了出来。", go: "exit" },
            { text: "搜捡遗物", outcomes: [
              { weight: 5, result: "翻出一枚尚可使用的避尘符。", effect: { inv: { "符咒": 3 } } },
              { weight: 5, result: "除了锈铁什么也没有，还割破了手。" }
            ] }
          ] },
        { id: "zc_1b", text: "一面断墙上刻满了名字，都是万年前战死在这里的修士。最下面一行新些：某某到此一游。",
          choices: [
            { text: "抚碑一揖", result: "你对着满墙名字长揖到地，又站了一会儿才走。", effect: { daoXin: 1 } },
            { text: "绕开", result: "你没心情凭吊，绕开了断墙。" },
            { text: "撤离", result: "满墙的名字看得你心头发沉，你退了出来。", go: "exit" }
          ] }
      ],
      [ /* 第 2 层 · 残魂 */
        { id: "zc_2a", text: "一缕残魂拦在路中，是位披甲的古修士。他反反复复只说一句话：「守住……守住……」",
          choices: [
            { text: "陪他站一会儿", result: "你陪他站了半个时辰。残魂忽然清明了一瞬，朝你点了点头，这才缓缓散去。", effect: { daoXin: 1 } },
            { text: "撤离", result: "你不想惊扰他，悄悄退了出来。", go: "exit" },
            { text: "强行穿过", outcomes: [
              { weight: 5, result: "残魂没有拦你。你走出很远，那句「守住」还在风里。" },
              { weight: 5, result: "残魂骤然暴起，你费了好大力气才挣脱。", effect: { sanShang: 1 } }
            ] }
          ] },
        { id: "zc_2b", text: "一座半塌的箭楼下，压着一只完好的储物袋，袋主人早已不知去向。",
          choices: [
            { text: "取走", result: "袋里有些灵石和一瓶丹药。物尽其用，也不算唐突。", effect: { inv: { "灵石": 180, "回春丹": 1 } } },
            { text: "放回去", result: "你把储物袋塞回原处。有些东西，是不该动的。", effect: { daoXin: 1 } },
            { text: "撤离", result: "箭楼下阴凉刺骨，你退了出来。", go: "exit" }
          ] },
        { id: "zc_2c", text: "残垣深处有火光。几个玄阴教修士趴在断碑上拓字，拓的正是镇魔碑文。",
          choices: [
            { text: "杀上去", sub: "战力判定", combat: 150,
              win: { result: "探子一个没跑掉。你搜出一封密信：「碑文已得其七，甲子之内阵眼必开。」", effect: { flag: "密信" } },
              lose: { result: "探子人多，你且战且退，看着他们带着拓片跑了。" } },
            { text: "退走", result: "人多势众，你没惊动他们，悄悄退了出来。", go: "exit" }
          ] }
      ],
      [ /* 第 3 层 · 主帐 */
        { id: "zc_3a", text: "主帐的帅旗居然还立着。旗下石案上，摊着一卷以血写就的战法心得。",
          choices: [
            { text: "取卷研习", result: "血书中的斗法心得狠辣老到，你读得后背发麻。", effect: { spell: "fentian" }, go: "exit" },
            { text: "取旗", result: "你拨起帅旗的那刻，万年前的厮杀声忽然都静了。", effect: { daoXin: 1 }, go: "exit" }
          ] },
        { id: "zc_3b", text: "主帐后是一座小小的坟，碑上没有名字，只刻着「未归人」三个字。坟前供着一件灵光未尽的法宝。",
          choices: [
            { text: "叩拜后取宝", result: "你叩了九个头。法宝入手那一刻，你仿佛听见有人说了声「多谢」。", effect: { artifactForce: { "法宝": 1 } }, go: "exit" },
            { text: "只叩拜", result: "你什么也没拿，转身下山去了。", effect: { daoXin: 2 }, go: "exit" }
          ] }
      ]
    ] },
  {
    id: "mj_huashen", name: "化神坐化之地", cooldown: 20, spellTreasure: true,
    depths: [
      [ /* 第 1 层 · 山门外 */
        { id: "hs_1a", text: "山门外杂草丛生，一块石碑斜插着：「化神真君清修之地，后人到此止步。」碑上的字，笔锋里还带着雷意。",
          choices: [
            { text: "进入", result: "你绕过石碑往里走。雷意擦过指尖，只觉得麻麻的。" },
            { text: "胆怯退去", result: "你在碑前站了半天，终究没敢进。", go: "exit" }
          ] },
        { id: "hs_1b", text: "山门内一条石阶通向山顶，阶旁的石灯万年不熄。你数了数，整整一千二百盏。",
          choices: [
            { text: "拾级而上", result: "石阶长得没有尽头。你一步一步走，心一点一点静。" },
            { text: "细观石灯", result: "灯焰里封着细小的符文，是手笔极大的长明术。", effect: { attrs: { "悟性": 3 } } },
            { text: "撤离", result: "石阶长得看不到头，你走到一半就退了出来。", go: "exit" }
          ] }
      ],
      [ /* 第 2 层 · 讲道台 */
        { id: "hs_2a", text: "半山一座讲道台，台上蒲团犹在。你坐上去的那一刻，耳边忽然响起讲道声，讲的是渡化神雷劫的心得。",
          choices: [
            { text: "静坐听完", result: "讲道声持续了一整夜。你记住的不多，但每一句都重若千斤。", effect: { daoXin: 1, attrs: { "神识": 4 } } },
            { text: "不敢久坐", result: "那声音太近了，近得像真君就坐在你旁边。你落荒而逃。", go: "exit" }
          ] },
        { id: "hs_2b", text: "讲道台后有一间丹房，房中的丹炉尚有余温——万年过去，炉中余温竟还未散。炉边放着一只玉简。",
          choices: [
            { text: "取玉简", result: "玉简里是一部完整的法术传承。", effect: { spell: "guiyuan" } },
            { text: "向丹炉一拜", result: "你朝丹炉拜了三拜。炉温似乎暖了一分。", effect: { daoXin: 1 } },
            { text: "撤离", result: "丹房的余温烤得你心头发慌，你退了出来。", go: "exit" }
          ] }
      ],
      [ /* 第 3 层 · 坐化台 */
        { id: "hs_3a", text: "山顶坐化台，真君遗蜕早已化作石像，端坐面朝东方。石像掌心，捧着一缕至今未散的雷光。",
          choices: [
            { text: "参悟雷光", sub: "凶险难测", outcomes: [
              { weight: 5, result: "雷光入体，你看见了万年前那场雷劫的一角。道心大涨。", effect: { daoXin: 2 }, go: "exit" },
              { weight: 3, result: "雷光太烈，你被震得连退十步，胸口一阵发闷。", effect: { sanShang: 2 }, go: "exit" },
              { weight: 2, result: "雷光顺着你经脉直撞丹田——你用尽全部修为才压了下来。", effect: { weak: 3 }, go: "exit" }
            ] },
            { text: "绕像三匝，长揖而去", result: "你没有动那缕雷光。下山时，一路石灯长明，跟你来时一样。", effect: { daoXin: 1 }, go: "exit" }
          ] }
      ]
    ] },
  {
    id: "mj_wenxin", name: "问心路", cooldown: 25, spellTreasure: true,
    depths: [
      [ /* 第 1 层 · 路口 */
        { id: "wx_1a", text: "路口立着一块无字碑，碑后一条白石小径没入雾中。你踏进去的第一步，雾就在身后合拢了。",
          choices: [
            { text: "前行", result: "雾深处传来熟悉的读书声，是你十二岁那年蒙馆里的调子。" },
            { text: "退出", result: "你退了出来。无字碑静静立着，像什么都没发生过。", go: "exit" }
          ] },
        { id: "wx_1b", text: "雾里走出一个货郎，担子里全是人间的物件：糖葫芦、木梳、旧棉袄。他招呼你：客官，买一点吗？",
          choices: [
            { text: "买一把木梳", sub: "灵石 -10", cond: { inv: { "灵石": 10 } }, effect: { inv: { "灵石": -10 }, daoXin: 1 }, result: "你买下木梳收进怀里。货郎收了钱，身影散在雾里。" },
            { text: "不买", result: "你摇摇头走了过去。身后的货郎叹了口气，也不知你听错没有。" },
            { text: "退出", result: "你转身退出雾阵。货郎的吆喝声，隔了一层雾。", go: "exit" }
          ] }
      ],
      [ /* 第 2 层 · 幻境深处 */
        { id: "wx_2a", text: "雾散开一片，你看见娘在灯下缝衣，背影已经佝偻了。她回过头问：山上的饭，还吃得惯吗？",
          choices: [
            { text: "吃得惯", effect: { daoXin: 1 }, result: "你说：吃得惯。她笑了，那盏灯便灭了。" },
            { text: "跪下磕头", effect: { attrs: { "神识": 2 } }, result: "你跪下去，结结实实磕了三个头。再抬头时，眼前只有雾。" },
            { text: "退出", result: "你闭上眼退了出来。那盏灯，你不敢多看。", go: "exit" }
          ] },
        { id: "wx_2b", text: "雾里走来一个人，眉眼像极了你自己——是十二岁那年，还没上山的你。他仰着头问：值得吗？",
          choices: [
            { text: "值得", effect: { daoXin: 1 }, result: "你说：值得。他笑了，转身走进雾里。" },
            { text: "不知道", effect: { attrs: { "神识": 2 } }, result: "你说：不知道。他歪头想了想，说：那就接着走吧。" },
            { text: "不答，走过去", result: "你从他身体里穿了过去，像穿过一层水。" },
            { text: "退出", result: "你退出了雾阵。那个小小的人儿，你没有回头再看。", go: "exit" }
          ] }
      ],
      [ /* 第 3 层 · 路尽草庐 */
        { id: "wx_3a", text: "路的尽头是一间草庐，庐中坐着个老者，正在自己跟自己下棋。他头也不抬：三千年，就你一个人走到了这儿。",
          choices: [
            { text: "陪他下一局", effect: { attrs: { "神识": 4 }, daoXin: 1 }, result: "一局下完，已是天光大亮。老者说：你的棋太急，心倒是不急。回去吧。", go: "exit" },
            { text: "请问化神之法", effect: { spell: "guiyuan" }, result: "老者落下一子：「该放下的时候，自然就放下了。」他推来一部玉简，是化神修士留下的传承。", go: "exit" },
            { text: "拜别", effect: { daoXin: 1 }, result: "你长揖到地，转身出了草庐。身后的棋子声，又响了起来。", go: "exit" }
          ] },
        { id: "wx_3b", text: "草庐后的石桌上放着一杯还冒热气的茶。老者说：喝了吧，喝完了，就该上路了。",
          choices: [
            { text: "饮茶", effect: { attrs: { "神识": 3 } }, result: "茶入口微苦，回甘却很长。你放下茶盏，眼前雾散了——你已在山口。", go: "exit" },
            { text: "不饮", effect: { daoXin: 1 }, result: "你拱手谢过，没有动那杯茶。老者也不恼，挥挥手让你去了。", go: "exit" }
          ] }
      ]
    ] }
],

  /* 结局：按顺序匹配，命中即止 */
  endings: [
    /* v4 化神组（顺序即优先级，必须最前） */
    { cond: { flag: "化神", flag2: "飞升" }, title: "飞升成仙 · 此界传说", comment: "天门开处，你最后看了一眼人间。山还是那些山，只是往后都与你无关了。此界修士提起你，都要称一声：那位神君，已经飞升了。" },
    { cond: { flag: "化神", flag2: "魔修" }, title: "化神魔君 · 人间大魔", comment: "正魔两道追剿了你一辈子，把你追成了人间界的顶点。从今往后，这方天地以你的喜怒为规矩。" },
    { cond: { flag: "化神" }, title: "人间神君 · 镇压一个时代", comment: "你没有走。千载之后，人间修士仍在你的庇荫下修行，你的山门成了圣地。你是这个时代本身。" },
    /* v3 元婴组（顺序即优先级，必须最前） */
    { cond: { flag: "元婴", flag2: "魔修" }, title: "魔婴现世 · 一方魔主", comment: "正道围剿了你半生，结果围剿出一尊魔婴。从今往后，这方天地的正邪两道，都要给你让路。" },
    { cond: { flag: "元婴" }, title: "元婴大成 · 陆地神仙", comment: "百年苦修，生死几番，金丹碎处见元婴。从今往后寿元千载，这人间天上，你都可以慢慢走了。" },
    { cond: { flag: "重凝中" }, title: "碎丹未竟 · 道消半途", comment: "你敢碎丹重结，已胜过这世上九成九的修士。只可惜丹未成而身先道消——但这条向死而生的路，后来人都会记得。" },
    { cond: { flag: "结丹", flag2: "一品金丹" }, title: "一品遗恨 · 坐化金丹", comment: "一品金丹又怎样，元婴门前，寿元不肯等你。宾客还记着你结丹那日的风光，只有你自己知道，最后那几年有多急。" },
    { cond: { flag: "结丹" }, title: "坐化金丹 · 仙途中继", comment: "结丹真人，寿五百载，已是凡人眼里的活神仙。你没能再进一步，但这五百年，活得比谁都踏实。" },
    { cond: { flag: "功成名就", flag2: "一品金丹" }, title: "金丹大道 · 一品天成", comment: "一粒金丹吞入腹，始知我命不由天。结丹大典上，连元婴老祖都多看了你两眼。长生路远，你才刚刚上路。" },
    { cond: { flag: "功成名就", flag2: "魔修" }, title: "魔丹噬道 · 我行我素", comment: "正道的光没能照到你，你索性自己成了光——虽然是黑的那种。魔丹一成，天地任你走。" },
    { cond: { flag: "功成名就", flag2: "假丹" }, title: "假丹苦涩 · 道途多舛", comment: "丹成了，可惜却是假的。庆贺的宴席上你笑着敬酒，只有自己知道丹田里那丝涩意。有人说假丹也有春天——你打算找找看。" },
    { cond: { flag: "功成名就" }, title: "真丹凝就 · 道基稳固", comment: "从炼气到结丹，你走了大半生。真丹一成，寿元五百，仙途终于不再遥不可及。洞府外云海翻腾，像极了你十二岁那年看过的那片。" },
    { cond: { flag: "走火未愈" }, title: "走火入魔 · 道消身殒", comment: "心魔最终还是赢了。道友们为你送行时说：TA本可以走得更远的。下一局，神识多加点。" },
    { cond: { flag: "魔修" }, title: "魔道妖人 · 我行我素", comment: "正道的光没能照到你，但你也活成了传说——虽然是吓小孩的那种。魔道也是道，你认，就好。" },
    { cond: { flag: "筑基", min: { "灵根": 100 } }, title: "天道筑基 · 仙途初成", comment: "百年苦修，一朝筑基！你已站在无数凡人仰望的高度。虽然仙途止步于此，但山下的传说里，会有你的名字。" },
    { cond: { flag: "筑基" }, title: "筑基修士 · 一方师叔", comment: "从引气入体到筑基成功，你用了大半生。从此凡人见你，要称一声「仙师」。" },
    { cond: { flag: "古经" }, title: "传承在握 · 大器晚成", comment: "你没能筑基，但你识海里那部古经，是多少人求不来的造化。下一局带着它，早些把它看懂。" },
    { cond: { flag: "道侣" }, title: "神仙眷侣 · 大道不孤", comment: "道途未竟，好在你从没一个人走过。桃花树下那句「可愿」，是这一局最好的机缘。" },
    { cond: { flag: "剑修" }, title: "一剑破万法 · 剑修风骨", comment: "筑基未成，剑意却已成。你挥剑的样子，比很多结丹都帅。下一局，让剑更快些，让道更稳些。" },
    { cond: { flag: "灵兽" }, title: "御兽逍遥 · 山林知己", comment: "长生没求到，但求到一只陪你满山跑的灵狐。它现在还蹲在洞府门口，等主人回家。" },
    { cond: { flag: "earlyEnd" }, title: "仙途憾止 · 璞玉未琢", comment: "这一局太短，短到还没来得及看清仙途的模样。记住：根骨和气运，是保命的本钱。" },
    { cond: { flag: "散修" }, title: "散修一生 · 自在如风", comment: "一生无门无派，向来无拘无束。你没筑基，但这大好河山，你比多数结丹都看得多。" }
  ],
  fallbackEnding: {
    title: "炼气一生 · 凡尘问道",
    comment: "终其一生未能筑基，但引气入体那晚的星光，你记了一辈子。修仙是少数人的路，你认真走过，那便不算输。"
  }
};
