/* 修仙记事本 · 金丹期事件（自 data.js 拆分，引擎加载顺序在本文件之后合并） */
window.GAME_EVENTS_R2 = [
    { id: "jd_he", type: "daily", cat: "renji", realms: [2], cond: { cultMax: 1800 },
    text: "结丹的消息传开，贺礼堆了半间石室。你按着礼单一一回帖，写到后半夜。", effect: { inv: { "灵石": 80 } } },
    { id: "jd_yipin", type: "daily", cat: "renji", realms: [2], cond: { flag: "一品金丹", cultMax: 1800 },
    text: "一品金丹的名头比你的人先到了。三拨人马登门拉拢，连帖子的用纸都比旁人厚三分。", effect: { inv: { "灵石": 100 }, attrs: { "气运": 4 } } },
    { id: "jd_jiadan", type: "trib", cat: "xinjing", realms: [2], cond: { flag: "假丹", cultMax: 1800 },
    text: "同席论道，敬酒的人偏偏绕过了你。有人低笑了一声「假丹真人」。你端起自己那杯，仰头喝了下去。", effect: { attrs: { "神识": 3, "气运": -2 } } },
    { id: "jd_moke", type: "daily", cat: "renji", realms: [2], cond: { flag: "魔修", cultMax: 1800 },
    text: "贺客里混着一位魔修，送上贺礼，满座目光都钉在你手上。",
    choices: [
      { text: "收下贺礼", sub: "正邪两道都看着", outcomes: [
        { weight: 5, result: "匣子里是一百灵石，这份礼很正。你收下了，也记下这个人情。", effect: { inv: { "灵石": 100 } } },
        { weight: 5, result: "匣子里是颗魔珠，煞气很是刺手。你不动声色合上盖子，这东西，拿着实在烫手。", effect: { attrs: { "气运": -3 } } }
      ] },
      { text: "拱手谢绝", sub: "不沾因果", result: "你笑着把礼盒推了回去。那魔修也不恼，饮尽一杯，便飘然去了。" }
    ] },
    { id: "jd_zongpai", type: "flavor", cat: "xinjing", realms: [2], cond: { cultMax: 1800 },
    text: "你路过一座云雾缭绕的矮山，忽然想：开宗立派，收几个徒弟，好像也不错。一打听，这座山头有主了。" },
    { id: "jd_yuanying", type: "miracle", cat: "xinjing", realms: [2], cond: { cultMax: 1800 },
    text: "夜里你登高远眺。北方三千里外，是那位元婴老祖闭关的山。金丹之上还有路。你站到天亮。", effect: { attrs: { "神识": 4 } } },
    { id: "jd_jiuyou", type: "daily", cat: "renji", realms: [2], cond: { cultMax: 1800 },
    text: "炼气时的旧友找上门来。他筑基无望，鬓已斑白，想在你门下谋个执事的差事。",
    choices: [
      { text: "收留他", sub: "多一张吃饭的嘴", result: "你给他安排了看管药园的闲差。他千恩万谢，你想起当年一起领月例的日子。", effect: { attrs: { "气运": 4 } } },
      { text: "赠些灵石，劝他回乡", sub: "灵石 -30", cond: { inv: { "灵石": 30 } }, result: "他收了灵石，走到山门口又回头望了一眼。这一眼，你记了很多年。", effect: { inv: { "灵石": -30 } } },
      { text: "留作清客，传他养生功诀", sub: "白吃白住 · 多活几年", result: "你让他挂个清客的名，只管白吃白住。又抄了一篇不挑根骨的养生功诀给他。他捧着纸卷，看了半晌，忽然背过身去抹眼睛——这辈子，没人觉得他还能有什么指望。", effect: { attrs: { "气运": 2 } } }
    ] },
    { id: "jd_xiansheng", type: "daily", cat: "renji", realms: [2], cond: { cultMax: 1800 },
    text: "下山采买，凡人跪了一地。里正颤巍巍地问：神仙可要立庙？你买了两斤盐，便御风走了。", effect: { attrs: { "气运": 3 } } },
    { id: "jd_xiancha", type: "daily", cat: "xinjing", realms: [2], cond: { cultMax: 1800 },
    text: "结丹之后寿元大涨，你头一回敢把茶泡到第三遍再喝。日子，忽然宽裕了。" },
    { id: "jd_jiesha", type: "trib", cat: "zhandou", realms: [2],
    text: "归途遭截杀。来人蒙面，出手却是冲着你的金丹来的——金丹在黑市上，是有价钱的。",
    choices: [
      { text: "迎战", sub: "结丹修士，岂容人欺", outcomes: [
        { weight: 6, result: "三十回合，你震碎他的法器。那人遁走前撂下狠话，你没记住，你只记住了金丹真人动起手来的分量。", effect: { attrs: { "根骨": 4, "气运": 3 } } },
        { weight: 4, result: "来人竟有帮手。你负伤突围，在山涧里躲了两日。金丹真人的名头，也护不住你。", effect: { attrs: { "根骨": -5 } } }
      ] },
      { text: "破财免灾", sub: "灵石 -100", cond: { inv: { "灵石": 100 } }, result: "你抛出一只装满灵石的储物袋，趁对方分神遁走。回去的路上，你把这条路记进了黑名单。", effect: { inv: { "灵石": -100 } } }
    ] },
    { id: "jd_kaifu_z", type: "chance", cat: "renji", realms: [2], weight: 4,
      cond: { flag: "结丹", notFlag: "散修", notFlag: "开府", notFlag2: "孤狼" },
      text: "结丹大典的余温未散，掌门亲自登门：后山青梧峰空悬多年，问你愿不愿领了它，开府收徒，为宗门再撑起一根顶梁柱。",
      choices: [
        { text: "领峰开府", sub: "自领一峰，供奉与责任俱来", effect: { factionInit: { route: "zong" } }, result: "你接过峰主令牌。从这天起，青梧峰上大小事务，都由你说了算。从此青梧峰上，有了自己的灯火。" },
        { text: "婉拒", sub: "无牵无挂，独自求道", effect: { flag: "孤狼" }, result: "你拱拱手推了。掌门也不恼，只说峰给你留着。你望着他的背影，心里清楚：有些自在，是用孤军换来的。" }
      ] },
    { id: "jd_kaifu_s", type: "chance", cat: "renji", realms: [2], weight: 4,
      cond: { flag: "结丹", flag2: "散修", notFlag: "开府", notFlag2: "孤狼" },
      text: "结丹之后，三山五岳的散修陆续来拜。有人提议：以你的洞府为盟，立一个散修联盟，从此灵脉共享、进退有据，再不做任人拿捏的散沙。",
      choices: [
        { text: "立盟开府", sub: "共奉你为盟主，供奉与责任俱来", effect: { factionInit: { route: "san" } }, result: "你在洞府前立下盟约石。从今日起，盟里的大小事务，都要从你手里过了。" },
        { text: "婉拒", sub: "无牵无挂，独自求道", effect: { flag: "孤狼" }, result: "你谢过了众人。盟约是好，可你独来独往惯了，不想肩上再担别人的性命。" }
      ] },
    { id: "jd_gift_dun", type: "chance", cat: "renji", realms: [2],
      cond: { flag: "结丹", artTypeMax: { "守": 0 }, renqingMax: 2 },
      text: "多年未见的故交登门，酒过三巡忽然正色：「你与人斗法只知抢攻，全无护持，迟早要吃大亏。」说罢解下随身多年的护身法宝放在桌上，任你怎么推辞都不肯收回。",
      choices: [
        { text: "收下这份心意", sub: "记下这份人情", effect: { artifactType: { "守": "灵器" }, renqing: 1 }, result: "你收下了。故交摆摆手，只说往后山高水长，彼此守望相助。" },
        { text: "坚辞不受", result: "故交盯着你看了半晌，默默收回法宝，叹着气走了。" }
      ] },
    { id: "jd_gift_shifu", type: "chance", cat: "renji", realms: [2],
      cond: { flag: "亲传", renqingMax: 2 },
      text: "师傅把你叫到跟前，递来一柄尘封多年的旧剑：「为师老了，此剑随我半生，往后就交给你了。」剑身古朴无华，入手却颇为沉重，剑意至今未散。",
      choices: [
        { text: "拜谢收下", sub: "记下这份人情", effect: { artifactType: { "攻": "法宝" }, renqing: 1 }, result: "你双手接过，郑重拜了三拜。师傅背过身去，只说了一句：好好用它。" },
        { text: "不敢受如此重礼", result: "师傅也不勉强，只说何时想通了，何时再来取。" }
      ] },
    { id: "jd_gift_daolv", type: "daily", cat: "renji", realms: [2],
      cond: { flag: "道侣", notFlag: "道侣坐化", invMax: { "回春丹": 0 }, renqingMax: 2 },
      text: "道侣见你近来频频带伤回府，什么也没说。第二日桌上多了两只玉瓶，瓶下压着一张字条：「真打不过，记得撒腿就跑。」",
      effect: { inv: { "回春丹": 2 }, renqing: 1 } },
    { id: "jd_gift_huli", type: "daily", cat: "renji", realms: [2],
      cond: { flag: "灵兽", invMax: { "符咒": 2 } },
      text: "灵狐不知从哪儿翻出一沓符纸，献宝似的堆在你脚边，尾巴摇成了风车。",
      effect: { inv: { "符咒": 5 } } },
    { id: "jd_gift_keqing", type: "chance", cat: "renji", realms: [2],
      cond: { flag: "开府", invMax: { "玉骨丹": 0 }, renqingMax: 2 },
      text: "新来投的客卿献上拜山之礼：一枚玉骨丹。他说得直白——你若有闪失，这一摊子人就都没了主心骨。",
      effect: { inv: { "玉骨丹": 1 }, renqing: 1 } },
    { id: "jd_gift_tu", type: "daily", cat: "renji", realms: [2],
      cond: { flag: "开府", invMax: { "灵石": 80 } },
      text: "门下大弟子把一袋子灵石搁在你案头：「师尊，这是弟子们凑的。您平日贴补大家太多，账房都看不下去了。」",
      effect: { inv: { "灵石": 120 } } },

    /* ===================== v3 身份回响（13 文档：称谓流变与反差叙事） ===================== */
    /* —— 金丹初期：新贵 —— */
    { id: "jd_sf_xingui", type: "daily", cat: "renji", realms: [2], weight: 2,
      cond: { cultMax: 1800 },
      text: "结丹后第一次出席长老会，你坐在最末位。老长老们嘴上说着「后生可畏」，眼神却都在拄量你的斤两。轮到议战时，掌门点了你的将。" },
    { id: "jd_sf_pianzi", type: "chance", cat: "renji", realms: [2], chain: "pianzi_4",
      cond: { cultMax: 1800 },
      text: "一个中年人跪在你峰前，双手捧着一袋灵石。他父亲当年在坊市骗过你——老人坐化前念叨了半辈子，说欠一位仙师的钱，砸锅卖铁也要还上。",
      choices: [
        { text: "收下", sub: "旧账两清", effect: { inv: { "灵石": 60 } }, result: "你收下了。中年人叩了三个头，起身时眼眶通红，像是卸下了一副挑了半生的担子。" },
        { text: "免了这笔旧账", sub: "得饶人处", effect: { factionDelta: { rep: 1 } }, result: "你摆摆手让他回去。他愣了半晌，朝着你深深一揖到地，一句话也没能说出来。" }
      ] },
    { id: "jd_sf_zhishi", type: "flavor", cat: "renji", realms: [2],
      cond: { flag: "宗门", cultMax: 1800 },
      text: "伙房的刘执事是个筑基修士，当年克扣过你三个月月例。如今他被调到你峰下当差，每次远远看见你，都贴着墙根走。你假装没认出他。" },
    /* —— 金丹中期：实权 —— */
    { id: "jd_sf_daoyou", type: "daily", cat: "renji", realms: [2], weight: 2,
      cond: { cultMin: 1800, cultMax: 3800 },
      text: "论道会上，坐在首位的玄诚长老忽然改了口，称你一声「道友」。满座皆静。百余年前你刚入门时，他还是你只能仰望的首座。" },
    { id: "jd_sf_tanzhu", type: "chance", cat: "renji", realms: [2],
      cond: { cultMin: 1800, cultMax: 3800 },
      text: "坊市的王胖子当年卖你符纸，十张里总有两张是潮的。他是筑基修士，守着这摊子守了两百年。如今他逢集必把最好的货给你留着，价钱还比旁人低两成。",
      choices: [
        { text: "照顾他生意", sub: "灵石 -50 · 符咒 +8", cond: { inv: { "灵石": 50 } }, effect: { inv: { "灵石": -50, "符咒": 8 } }, result: "王胖子笑得见牙不见眼，又额外多塞了两张，说什么都不肯收钱。" },
        { text: "笑笑走了", result: "你没买，也没提当年那两受潮符纸的事。" }
      ] },
    { id: "jd_sf_wenzheng", type: "chance", cat: "renji", realms: [2],
      cond: { factionRoute: "zong", cultMin: 1800, cultMax: 3800 },
      text: "掌门深夜来访，屏退左右，只留下一盏茶：魔道近来蠢蠢欲动，宗门是战是和，他想听听你的意思。",
      choices: [
        { text: "主战", sub: "魔道不可纵容", effect: { factionDelta: { intel: 10, rep: 1 } }, result: "掌门点头：「好。」第二天，宗门的战令就发了下去。" },
        { text: "主和", sub: "养精蓄锐为上", effect: { factionDelta: { rep: 1 } }, result: "掌门沉吟良久，采纳了你的意思。宗门闭门谢客，开始整饬内务。" }
      ] },
    { id: "jd_sf_mengwen", type: "chance", cat: "renji", realms: [2],
      cond: { factionRoute: "san", cultMin: 1800, cultMax: 3800 },
      text: "几位盟中元老齐齐来访：北边的商路被魔修劫了三回，是打是忍，都在等你一句话。",
      choices: [
        { text: "打", sub: "劫我商路，必付出代价", effect: { factionDelta: { intel: 10, rep: 1 } }, result: "你点了三队好手北上。半月后，魔修的脑袋挂上了商路的旗杆。" },
        { text: "忍", sub: "花钱消灾", effect: { inv: { "灵石": 100 } }, result: "你让人备了厚礼送去。商路恢复了平静，只是盟中年轻人看你的眼神，明显淡了几分。" }
      ] },
    /* —— 金丹后期：无冕之王 —— */
    { id: "jd_sf_xiongzhang", type: "daily", cat: "renji", realms: [2], weight: 2,
      cond: { cultMin: 3800 },
      text: "玄诚长老在长老会上当众改了口，称你一声「道兄」。他长你近百岁，可如今宗门议事，大家先看的都是你的脸色。" },
    { id: "jd_sf_baishan", type: "flavor", cat: "renji", realms: [2],
      cond: { cultMin: 3800 },
      text: "邻宗遣使拜山，国书里开口先问「贵宗那位真人近来可好」，反倒把掌门排在了后头。掌门把国书递给你看，笑了笑，什么也没说。" },
    { id: "jd_sf_choujia", type: "chance", cat: "renji", realms: [2], chain: "choujia_6",
      cond: { cultMin: 3800 },
      text: "沈七托了中间人送来重礼，说当年的事全是误会，想请你喝杯茶，把这段恩怨了了。",
      choices: [
        { text: "见", sub: "相逢一笑", effect: { inv: { "灵石": 200 } }, result: "茶喝了三盏，谁都没提当年。他临走留下一句：「北边的玄阴教，我迟早要去会一会。我们的账，到那时再算。」" },
        { text: "不见", sub: "让他们继续怕着", result: "你让人把礼物原样退了回去。听说沈七当夜又往深山里迁了三百里。" }
      ] },
    /* —— 通用 —— */
    { id: "jd_sf_dizi", type: "flavor", cat: "renji", realms: [2],
      cond: { factionRoute: "zong" },
      text: "你路过演武场，新入门的小弟子们立刻站得笔直。你走远后，有人小声问：那位就是咱们峰主？另一个说：嘘——是真人。" },
    { id: "jd_sf_dizi2", type: "flavor", cat: "renji", realms: [2],
      cond: { factionRoute: "san" },
      text: "盟里的年轻人私下议论：盟主出手那次，剑光把半边天都照亮了。你路过听见，只当没听见。" },

    /* ===================== v3.1 主线：玄阴之劫 · 魔道线（15 文档 §三） ===================== */
    { id: "mx_1", type: "chance", cat: "zhandou", realms: [2], weight: 3, chain: "mx_1", board: "老苗登门，初建眼线",
      cond: { flag: "结丹", notFlag: "魔修" },
      text: "这两年，北边的散修接连失踪，活不见人死不见尸。这天一个瘸腿老汉登门，自称老苗，在坊市讨了半辈子消息营生。他说失踪的修士都跟玄阴教脱不了干系。玄阴教这名字，你年少时在茶棚听先生讲过——先生说，那教门断不了根。老苗手里有一份眼线名单，想找个靠山换口安稳饭。",
      choices: [
        { text: "留他递消息", sub: "情报 +5", effect: { flag: "老苗", intel: 5 }, result: "你收下了名单。老苗咧嘴一笑，一瘸一拐地走了。从此你的案头，隔三差五多一张字条。" },
        { text: "打发走", result: "你不沾这浑水。老苗也不恼，说哪天改了主意，坊市茶棚找得到他。" }
      ] },
    { id: "mx_2", type: "chance", cat: "zhandou", realms: [2], chain: "mx_2", cooldown: 4, board: "护送商队过黑风口",
      cond: { intel: 10 },
      text: "老苗递来字条：一支商队要过黑风口，愿出二百灵石请一位金丹真人压阵。近来在那劫道的，十有八九是玄阴教的外围爪牙。",
      choices: [
        { text: "应下", sub: "同阶斗法", battle: {
          name: "劫道魔修", tier: 1, demonic: true, elem: "木",
          winText: "劫道的魔修丢下一地尸体逃了。商队管事连连作揖，说这些爪牙的背后，是黑风岭的坛主厉坤。",
          winEffect: { inv: { "灵石": 200 }, intel: 10, factionDelta: { rep: 1 } },
          wuxue: [60, 120],
          lightText: "魔修的阴招擦着咽喉过去，你惊出一身冷汗。", lightEffect: {},
          heavyText: "你被魔功震伤了内腑，只得踉跄遁走。", heavyEffect: { sanShang: 1 },
          deathText: "阴沟里翻了船。劫道的魔修分赃时还在庆幸：差点就打不过了。兵解。"
        } },
        { text: "推了", result: "商队另请了别人。半个月后听说，他们到底还是遭了劫。" }
      ] },
    { id: "mx_3", type: "chance", cat: "zhandou", realms: [2], chain: "mx_3", board: "审玄阴教舌头",
      cond: { intel: 25 },
      text: "老苗抓了个玄阴教的舌头，捆在柴房里。怎么处理，他等你拿主意。",
      choices: [
        { text: "亲自审", sub: "拿到布防（决战有用）", effect: { flag: "布防在手", intel: 5 }, result: "舌头的嘴很硬，你的手段更硬。天亮前你拿到了黑风岭的布防：明哨三处，暗桩两个，坛主厉坤每月初七独自在丹房过夜。" },
        { text: "放长线", sub: "情报 +10", effect: { intel: 10 }, result: "你让老苗把人放回去慢慢吊着。半个月后，眼线顺着这条线又摸出两处暗桩。" },
        { text: "换赎金", sub: "灵石 +150", effect: { inv: { "灵石": 150 } }, result: "玄阴教乖乖交了赎金，一手交人一手交钱。老苗说这买卖划算，你总觉得哪里亏了。" }
      ] },
    { id: "mx_4", type: "chance", cat: "zhandou", realms: [2], chain: "mx_4", cooldown: 6, board: "袭黑风岭分坛",
      cond: { intel: 40 },
      text: "黑风岭的布防摸透了。老苗传来话：厉坤今夜独自在丹房。动手的窗口，就是这几天。",
      choices: [
        { text: "领命讨伐", sub: "强敌斗法（胜负难料）", battle: {
          name: "黑风岭坛主厉坤", tier: 2, demonic: true, elem: "火", sig: "tundan",
          winText: "厉坤的丹炉翻倒在地，炉火溅了满屋。他到死都攥着一枚没来得及吞的丹药。分坛魔修作鸟兽散，你一把火烧了这处魔窟。",
          winEffect: { inv: { "灵石": 300 }, flag: "破分坛", factionDelta: { rep: 2 }, intel: 10 },
          wuxue: [150, 250],
          lightText: "厉坤的魔功阴狠，你且战且退，肩头还是中了一记魔焰。", lightEffect: { inv: { "灵石": -50 } },
          heavyText: "魔焰透体，你拼死杀出重围，经脉灼伤多处。", heavyEffect: { sanShang: 2 },
          deathText: "魔焰吞没了你的身影。黑风岭上，只余一面破旗猎猎作响。兵解。"
        } },
        { text: "再等等", result: "窗口年年有，不急这一次。" }
      ] },
    { id: "mx_baoku", type: "chance", cat: "ziyuan", realms: [2],
      cond: { flag: "破分坛", notFlag: "取过宝库" },
      text: "分坛宝库清点完毕：灵石丹药之外，最深处供着一卷魔功，正是厉坤的成名之术。",
      choices: [
        { text: "缴获魔功", sub: "习得「破魔金轮」· 心魔账 +1", effect: { spell: "jinlun", evil: 1, flag: "取过宝库" }, result: "魔功也是功。你收了起来，心里却像压了块石头。" },
        { text: "清点库藏", sub: "灵石 +400 · 灵器一件", effect: { inv: { "灵石": 400 }, artifactForce: { "灵器": 1 }, flag: "取过宝库" }, result: "库藏之丰超出意料，魔道这些年搜刮得可真不少。" },
        { text: "一把火烧了", sub: "魔物不留 · 道心 +1", effect: { daoXin: 1, flag: "取过宝库" }, result: "你看着魔功在火里卷成灰，心里反而松快了不少。" }
      ] },
    { id: "mx_5", type: "trib", cat: "zhandou", realms: [2], chain: "mx_5", cooldown: 5, board: "莫怀空寻仇",
      text: "魔道的报复来得比预想快。玄阴教执法长老莫怀空截住了你的去路——厉坤是他的师弟。他放话，要拿你的人头祭黑风岭的旗。",
      choices: [
        { text: "迎战", sub: "强敌斗法", battle: {
          name: "玄阴教执法长老莫怀空", tier: 2, demonic: true, elem: "水", sig: "chansha",
          winText: "莫怀空横尸当场。这一战之后，玄阴教上下提起你的名字都要掂量掂量。你也头一回听到那个称呼：教主。",
          winEffect: { inv: { "灵石": 200 }, factionDelta: { rep: 2 }, intel: 20 },
          wuxue: [120, 220],
          lightText: "你借地形脱身，后背还是被水汽缠了一记。", lightEffect: { inv: { "灵石": -30 } },
          heavyText: "水毒侵入心脉，你吐血遁走，五脏六腑都移了位。", heavyEffect: { sanShang: 3 },
          deathText: "莫怀空的掌力震碎了你的心脉。一代真人，道消于荒山野岭。"
        } },
        { text: "避其锋芒", sub: "折损声望", effect: { factionDelta: { rep: -1 } }, result: "你绕路三千里回了山。此后数月，玄阴教的气焰又盛了几分。" }
      ] },
    { id: "mx_6", type: "chance", cat: "zhandou", realms: [2], chain: "mx_6", highlight: true, board: "破碑密信",
      cond: { intel: 70 },
      text: "老苗半个月没露面，再出现时瘦脱了形。他揣来一封用命换来的密信：玄阴教百年内三探古战场，拓走了镇魔碑文，如今又在四下搜罗破禁灵材——他们要破开镇魔碑，迎出碑下镇压了万年的开派祖师。",
      choices: [
        { text: "报与正道各宗", sub: "道心 +1 · 声望 +1", effect: { daoXin: 1, flag: "密信揭破", factionDelta: { rep: 1 } }, result: "消息传开，正道各宗连夜议事。从这天起，所有人都知道了玄阴教要干什么。" },
        { text: "压下暗查", sub: "情报 +15", effect: { intel: 15, flag: "密信揭破" }, result: "你把密信压下，让老苗继续盯。有些仗，要打到对方最得意的时候。" }
      ] },
    { id: "mx_7", type: "chance", cat: "zhandou", realms: [2], chain: "mx_7", cooldown: 6, board: "截杀破禁灵材队",
      cond: { intel: 100 },
      text: "老苗查到一支玄阴教的队伍：押着几车破禁灵材，还掳了两个阵师，正往总坛去。领队的是玄阴教护法，结丹后期的修为。",
      choices: [
        { text: "半路截杀", sub: "强敌斗法", battle: {
          name: "玄阴教护法", tier: 2, demonic: true, elem: "金",
          winText: "护法授首。你劈开囚车，两个阵师千恩万谢地走了。那几车破禁灵材，你一把火烧了个干净——玄阴教的破碑大计，今年办不成了。",
          winEffect: { flag: "灵材截获", inv: { "灵石": 300 }, daoXin: 1 },
          wuxue: [150, 250],
          lightText: "护法的金系法术锐利难当，你挂了彩才脱身。", lightEffect: {},
          heavyText: "你被一剑贯穿了肩胛，拼死才遁走。", heavyEffect: { sanShang: 2 },
          deathText: "护法的剑光落下时，你最后想到的，是老苗还没送出下一封情报。兵解。"
        } },
        { text: "放过去", result: "你没动手。那几车灵材进了总坛，老苗在字条里叹了口气。" }
      ] },
    { id: "mx_8", type: "daily", cat: "zhandou", realms: [2], chain: "mx_8", board: "决战前夜",
      cond: { intel: 150, flag: "破分坛" },
      text: "消息齐了：总坛护山大阵后夜轮换，阵眼空虚只有一夜。各路正道人马齐聚山下，把主攻之位让给了你。夜里老苗送来最后一封情报，陪你喝了一碗酒。出山门前，你把洞府里的人和事都安顿了一遍。" },
    { id: "mx_9", type: "chance", cat: "zhandou", realms: [2], chain: "mx_9", cooldown: 3, board: "总攻玄阴教总坛", boardFlag: "灭总坛",
      text: "三更，总坛。阵眼前，玄阴教主赫连绝负手而立，镇魔碑在他身后嗡嗡作响。他看了你半晌：「黑风岭、莫怀空，还有那头蜈蚣。本座等你很久了。」",
      choices: [
        { text: "总攻", sub: "超阶死战（九死一生）", battle: {
          name: "玄阴教主赫连绝", tier: 3, demonic: true, elem: "土", sig: "jiebei",
          winText: "赫连绝伏诛，破碑大阵轰然崩毁，碑下的动静一点点归于沉寂。总坛大火烧了三日。正魔之争，以你的剑落下帷幕。",
          winEffect: { achievement: "zhengdao", flag: "灭总坛", factionDelta: { spiritVeins: 2, rep: 5 }, spell: "wuxiang", inv: { "灵石": 1000 }, daoXin: 2 },
          wuxue: [200, 350],
          lightText: "大阵反噬，你带着一身焦痕杀了出来。", lightEffect: { inv: { "灵石": -100 }, flag: "教主邪涨" },
          heavyText: "教主的魔功震碎了你三条主脉，你被人拼死抢了回来。", heavyEffect: { sanShang: 3, flag: "教主邪涨" },
          deathText: "大阵亮起的那一刻，你就知道回不去了。最后一眼，是正道同门疯了一样往阵里冲。兵解。"
        } },
        { text: "放弃", sub: "从长计议", result: "你最终没有下令。当夜之后阵眼轮换已过，只能等下一次窗口。" }
      ] },
    { id: "mx_10", type: "daily", cat: "renji", realms: [2], highlight: true,
      cond: { flag: "灭总坛" },
      text: "总坛的大火烧了三日。正道各宗在山下立碑，碑首刻着你的名字。老苗来辞行，说仗打完了，他要回乡下开个酒馆。你送他到山口，看他一瘸一拐地走远。",
      effect: { daoXin: 2 } },

    /* ===================== v3.1 魔氛渐盛（主线搁置时的压迫组） ===================== */
    { id: "mx_y1", type: "daily", cat: "zhandou", realms: [2], cooldown: 9,
      cond: { flag: "结丹", notFlag: "魔修", notFlag2: "破分坛" },
      text: "北边的商路渐渐断了：过黑风口的商队，十支里有三支回不来。坊市上都说，是玄阴教在收过路的钱粮。" },
    { id: "mx_y2", type: "daily", cat: "zhandou", realms: [2], cooldown: 9,
      cond: { flag: "破分坛", notFlag: "魔修", notFlag2: "密信揭破" },
      text: "坊市忽然戒了严，玄阴教的暗桩到处打探你的行踪。老苗捎话来：最近少走夜路。" },
    { id: "mx_y3", type: "daily", cat: "zhandou", realms: [2], cooldown: 8,
      cond: { flag: "密信揭破", notFlag: "魔修", notFlag2: "灭总坛" },
      text: "总坛方向的煞气一日重过一日。有相熟的金丹真人登门，问你打算什么时候动手，语气里全是藏不住的急。" },

    /* ===================== v3.1 主线：云梦泽老妖（15 文档 §四） ===================== */
    { id: "yx_1", type: "chance", cat: "zhandou", realms: [2], weight: 2, chain: "yx_1", board: "王胖子登门",
      cond: { flag: "结丹" },
      text: "坊市的王胖子登门，两眼红得吓人。你还记得他：筑基修士，当年卖你符纸，十张里有两张是潮的。他独子押镖过云梦泽，连人带货进了老妖的肚子。附近宗门悬红八百灵石求一位金丹真人出手，可他要的哪里是赏钱，是有人替他儿子讨这个债。",
      choices: [
        { text: "接下悬红", sub: "为民除害，也为自己", effect: { flag: "悬红", intel: 4 }, result: "你收下了悬红。王胖子磕了个头，起身时腿都是抖的。一夜间十里八乡都知道来了位肯出手的仙师，茶棚里有人悄悄给你指了路。" },
        { text: "推了", result: "云梦泽的老妖不好惹。王胖子没说什么，佝偻着背走了。" }
      ] },
    { id: "jd_xuanhong", type: "daily", cat: "renji", realms: [2],
      cond: { flag: "悬红", notFlag: "斩大妖" },
      text: "接下的悬红还没兑现，王胖子隔三差五上门，盘缠和消息一道送来：哪村的船又翻了，哪个渡口见过妖影。他把儿子的旧棉袄塞进你行囊，说山路夜凉，夜里添件衣裳。" },
    { id: "yx_2", type: "daily", cat: "zhandou", realms: [2], chain: "yx_2", board: "走访云梦泽",
      cond: { intel: 10 },
      text: "你在云梦泽边上走了半个月。想起当年那个讨水的老汉——他说，云梦泽的水里有长虫，吞过他家的渔船。幸存的渔夫说，老妖每月十五出水换气；被祸害过的村子里，里正说有人看见它背上供着一面玄阴教的旗。",
      effect: { intel: 8 } },
    { id: "yx_3", type: "chance", cat: "zhandou", realms: [2], chain: "yx_3", board: "追踪老妖",
      cond: { intel: 25 },
      text: "你在云梦泽蹲了半个月，终于摸到老妖的踪迹。",
      choices: [
        { text: "追踪", sub: "成败在天", outcomes: [
          { weight: 6, result: "你循着腥气找到了老妖的巢穴——一座沉在水底的枯冢。" },
          { weight: 3, result: "老妖狡猾，几次都差一步。你的盘缠倒先耗去不少。", effect: { inv: { "灵石": -50 } } },
          { weight: 1, result: "你一头撞进了老妖布下的幻阵，九死一生才挣脱出来。", effect: { sanShang: 1 } }
        ] }
      ] },
    { id: "yx_4", type: "chance", cat: "zhandou", realms: [2], chain: "yx_4", cooldown: 5, board: "斩杀妖将",
      cond: { intel: 45 },
      text: "枯冢外，两头开了灵智的妖将拦住去路——老妖知道你来了。",
      choices: [
        { text: "战", sub: "同阶斗法", battle: {
          name: "老妖座下妖将", tier: 1, demonic: false, elem: "木",
          winText: "两头妖将毙命。你照着它们的甲缝试了试剑——老妖的硬甲，也不过如此。",
          winEffect: { inv: { "灵石": 200 }, flag: "破甲先机", intel: 10 },
          wuxue: [80, 150],
          lightText: "妖将的骨刺擦着你的咽喉过去。", lightEffect: {},
          heavyText: "你被妖将的尾锤砸断了肋骨。", heavyEffect: { sanShang: 2 },
          deathText: "枯冢外又多了一具白骨。兵解。"
        } },
        { text: "退走", result: "你从长计议，暂且退出了枯冢地界。" }
      ] },
    { id: "yx_5", type: "chance", cat: "zhandou", realms: [2], chain: "yx_5", cooldown: 6, highlight: true, board: "枯冢决战", boardFlag: "斩大妖",
      cond: { intel: 70, notFlag: "斩大妖" },
      text: "水底枯冢，老妖现出原形：百丈蜈蚣，甲壳如玄铁浇铸。它盯着你，口吐人言：「玄阴教养了我三百年。吃过的人，我自己都数不过来。」",
      choices: [
        { text: "战", sub: "强敌斗法", battle: {
          name: "云梦老妖", tier: 2, demonic: false, elem: "土", sig: "yingjia",
          winText: "百丈蜈蚣轰然倒地，一颗妖丹从它颅中升起，霞光映红了整片泽水。王胖子儿子的债，总算讨回来了。",
          winEffect: { inv: { "灵石": 800, "妖丹": 1 }, achievement: "shouren", flag: "斩大妖", factionDelta: { rep: 3 } },
          wuxue: [150, 250],
          lightText: "妖壳太硬，你且战且退，被妖风扫中了一记。", lightEffect: { inv: { "灵石": -40 } },
          heavyText: "妖尾横扫，你半边身子的骨头都断了，拼死遁出云梦泽。", heavyEffect: { sanShang: 3 },
          deathText: "蜈蚣精的毒牙刺穿你胸膛时，你还在想那八百灵石的悬红。道消。"
        } },
        { text: "退走", sub: "从长计议", result: "你退出了枯冢。老妖没有追——它见得多了，走了的，多半还会回来送死。" }
      ] },
    { id: "yx_baosang", type: "daily", cat: "renji", realms: [2],
      cond: { flag: "斩大妖" },
      text: "你给王胖子报了信。他没哭，把儿子的牌位在你府上供了一炷香。那天之后，坊市的人都看见，王胖子的腰杆又直了。",
      effect: { daoXin: 1 } },

    /* ===================== v3.1 主线：古战场密信回收 ===================== */
    { id: "cz_4", type: "daily", cat: "zhandou", realms: [2], board: "破译古战场密信", boardFlag: "古战场事了",
      cond: { flag: "密信", notFlag: "古战场事了" },
      text: "老苗看完那封从古战场带出的密信，沉默半晌：「这事，捅破天了。」信上说，玄阴教百年内三探遗迹，拓走了大半镇魔碑文。你让他把这条线和黑风岭的案子并在一起查。",
      effect: { intel: 20, daoXin: 1, flag: "古战场事了" } },
    { id: "jd_mixin_fb", type: "daily", cat: "zhandou", realms: [2],
      cond: { flag: "密信揭破", notFlag: "密信", notFlag2: "古战场事了" },
      text: "老苗托人送来一只木匣，里头是誊抄的密信副本——黑市上有人出手古战场的拓片，他花重金买了下来。信上的字，与老苗上回经手的那封一个笔迹。你收好木匣，让人顺着拓片的来路查下去。",
      effect: { flag: "密信", intel: 5 } },

    /* ===================== v3.1 传法网：缺口雷达（15 文档 §七） ===================== */
    { id: "jf_shoufa_z", type: "chance", cat: "xiulian", realms: [2], weight: 8, cooldown: 4,
      cond: { flag: "结丹", notFlag: "散修", spellTypeMax: { "攻": 0 } },
      text: "藏经阁守阁长老传话：「你如今缺一门攻伐之术，进来挑一卷吧。」",
      choices: [
        { text: "烈阳剑诀", sub: "火 · 破魔", effect: { spell: "lieyang" }, result: "你挑了「烈阳剑诀」。守阁长老点头：好眼光。" },
        { text: "寒冰锥", sub: "水 · 凝滞经脉", effect: { spell: "hanbing" }, result: "你挑了「寒冰锥」。守阁长老点头：好眼光。" },
        { text: "厚土崩", sub: "土 · 崩山裂石", effect: { spell: "houtu" }, result: "你挑了「厚土崩」。守阁长老点头：好眼光。" }
      ] },
    { id: "jf_shoufa_s", type: "chance", cat: "xiulian", realms: [2], weight: 8, cooldown: 4,
      cond: { flag: "结丹", flag2: "散修", spellTypeMax: { "攻": 0 } },
      text: "老苗牵线，一位欠你人情的金丹散修登门，说无以为报，愿以一门攻伐法术抵债。",
      choices: [
        { text: "烈阳剑诀", sub: "火 · 破魔", effect: { spell: "lieyang" }, result: "你挑了「烈阳剑诀」。散修了却一桩心事，拱拱手走了。" },
        { text: "寒冰锥", sub: "水 · 凝滞经脉", effect: { spell: "hanbing" }, result: "你挑了「寒冰锥」。散修了却一桩心事，拱拱手走了。" },
        { text: "厚土崩", sub: "土 · 崩山裂石", effect: { spell: "houtu" }, result: "你挑了「厚土崩」。散修了却一桩心事，拱拱手走了。" }
      ] },
    { id: "jf_shou", type: "chance", cat: "xiulian", realms: [2], weight: 6, cooldown: 5,
      cond: { flag: "结丹", cultMin: 1500, spellTypeMax: { "守": 0 } },
      text: "多年未见的故交登门，看你与人斗法只知抢攻，全无护持，直摇头叹气。他留下两卷玉简，任你挑一卷。",
      choices: [
        { text: "玄光罩", sub: "水 · 护体", effect: { spell: "xuanguang" }, result: "你挑了「玄光罩」。故交了却一桩心事，拱拱手走了。" },
        { text: "移形换影", sub: "木 · 挪移", effect: { spell: "yixing" }, result: "你挑了「移形换影」。故交了却一桩心事，拱拱手走了。" }
      ] },
    { id: "jf_bian", type: "chance", cat: "xiulian", realms: [2], weight: 6, cooldown: 5,
      cond: { flag: "结丹", cultMin: 3000, spellTypeMax: { "变": 0 } },
      text: "云游老道途经你的山头，讨了碗水喝。临走他掏出两卷杂术：「相逢即缘，挑一卷抵水钱。」",
      choices: [
        { text: "敛息遁", sub: "水 · 遁走加成", effect: { spell: "lianxi" }, result: "你挑了「敛息遁」。老道背起行囊，继续云游去了。" },
        { text: "定身诀", sub: "金 · 定人身形", effect: { spell: "dingshen" }, result: "你挑了「定身诀」。老道背起行囊，继续云游去了。" }
      ] },
    { id: "jf_jianghu", type: "chance", cat: "xiulian", realms: [2], weight: 3, cooldown: 6,
      cond: { flag: "结丹", inv: { "灵石": 300 }, spellTypeMax: { "攻": 0 } },
      text: "坊市黑市有人兜售法术玉简，来路不明，价钱咬手得很。",
      choices: [
        { text: "买一卷", sub: "灵石 -300 · 货色随机", cond: { inv: { "灵石": 300 } }, outcomes: [
          { weight: 3, result: "玉简是真的：一门「烈阳剑诀」。", effect: { inv: { "灵石": -300 }, spell: "lieyang" } },
          { weight: 3, result: "玉简是真的：一门「寒冰锥」。", effect: { inv: { "灵石": -300 }, spell: "hanbing" } },
          { weight: 3, result: "玉简是真的：一门「厚土崩」。", effect: { inv: { "灵石": -300 }, spell: "houtu" } },
          { weight: 1, result: "玉简里竟是一门「雷狱诀」，你捡了大漏。", effect: { inv: { "灵石": -300 }, spell: "leiyu" } }
        ] },
        { text: "不买", result: "来路不明的东西你不沾。" }
      ] },

    /* ===================== v3 遭遇战 ===================== */

    { id: "jd_fight_1", type: "trib", cat: "zhandou", realms: [2], weight: 3,
      text: "回山途中，两名魔修从斜刺里杀出，二话不说就动了手。",
      choices: [
        { text: "迎战", sub: "同阶斗法", battle: {
          name: "截道魔修", tier: 1, demonic: true, elem: "火",
          winText: "两名魔修一死一逃。你搜了搜尸身，收获聊胜于无。",
          winEffect: { inv: { "灵石": 100 } }, wuxue: [60, 120],
          lightText: "魔修的阴招擦着咽喉过去，你惊出一身冷汗。", lightEffect: {},
          heavyText: "你被魔功震伤了内腑，只得踉跄遁走。", heavyEffect: { sanShang: 1 },
          deathText: "阴沟里翻了船。两名魔修分赃时还在庆幸：差点就打不过了。兵解。"
        } },
        { text: "避开", result: "你不想惹事，远远绕开了。" }
      ] },
    { id: "jd_fight_2", type: "trib", cat: "zhandou", realms: [2], weight: 3,
      text: "一名锦衣修士拦住去路，说你前些日子得的宝贝与他有缘，让你开个价——语气里没有半点商量的意思。",
      choices: [
        { text: "让他长个记性", sub: "同阶斗法", battle: {
          name: "夺宝修士", tier: 1, demonic: false, elem: "金",
          winText: "锦衣修士跪地求饶，把储物袋双手奉上。你取了灵石，把袋子扔了回去。",
          winEffect: { inv: { "灵石": 150 } }, wuxue: [60, 120],
          lightText: "对方法宝不俗，你赢得并不轻松。", lightEffect: {},
          heavyText: "一时大意，你被对方法宝砸断了肋骨。", heavyEffect: { sanShang: 2 },
          deathText: "夺宝不成，反送了性命。道消。"
        } },
        { text: "破财免灾", sub: "灵石 -80", cond: { inv: { "灵石": 80 } }, effect: { inv: { "灵石": -80 } }, result: "你丢了八十灵石过去。对方掂了掂，骂骂咧咧地走了。" }
      ] },
    { id: "jd_fight_3", type: "trib", cat: "zhandou", realms: [2], weight: 3,
      text: "路过黑松林，一头吊睛白额大虫从树上扑下——这畜生开了灵智，专挑落单的修士下手。",
      choices: [
        { text: "宰了它", sub: "同阶斗法", battle: {
          name: "灵智妖虎", tier: 1, demonic: false, elem: "木",
          winText: "妖虎毙命。虎皮妖骨都是好东西，你剥了个干净。",
          winEffect: { inv: { "灵石": 120 } }, wuxue: [60, 120],
          lightText: "虎爪在你臂上留了四道血痕。", lightEffect: {},
          heavyText: "你被妖虎扑倒，滚下山坡才捡回半条命。", heavyEffect: { sanShang: 1 },
          deathText: "黑松林里，妖虎又多了一顿饭。兵解。"
        } },
        { text: "绕道", result: "多一事不如少一事，你绕开了黑松林。" }
      ] },
    { id: "jd_fight_4", type: "trib", cat: "zhandou", realms: [2], weight: 3,
      text: "仇家不知从哪儿打听到你的行踪，在你必经之路上设了埋伏。",
      choices: [
        { text: "杀出重围", sub: "同阶斗法", battle: {
          name: "伏杀仇家", tier: 1, demonic: false, elem: "金",
          winText: "埋伏的人横七竖八躺了一地。你站在中间，衣角都没乱。",
          winEffect: { factionDelta: { rep: 1 } }, wuxue: [80, 150],
          lightText: "乱战之中，你还是中了一记冷箭。", lightEffect: {},
          heavyText: "你杀出重围时，背后已插了两支箭。", heavyEffect: { sanShang: 2 },
          deathText: "双拳难敌四手。你倒下时，听见仇家松了一口气。兵解。"
        } },
        { text: "将计就计避开", result: "你远远察觉不对，提前换了条路。" }
      ] },

    /* ===================== v3 魔道线 ===================== */
    { id: "zy_md_1", type: "trib", cat: "zhandou", realms: [2], chain: "zy_md_1",
      cond: { flag: "魔修" },
      text: "正道除魔令发到了你头上。三名自诩正义的修士堵在你的洞府外，口口声声要替天行道。",
      choices: [
        { text: "杀", sub: "强敌斗法", battle: {
          name: "除魔修士", tier: 2, demonic: false, elem: "金",
          winText: "三具尸体摆在洞府外。你在墙上用血写了四个字：再来试试。",
          winEffect: { inv: { "灵石": 300 }, evil: 1 }, wuxue: [150, 250],
          lightText: "正道的阵法有点门道，你硬闯出来时挂了彩。", lightEffect: {},
          heavyText: "三人合力一击震碎了你的护体魔气，你遁入深山。", heavyEffect: { sanShang: 2 },
          deathText: "除魔卫道的名号又添一笔。你的名字，成了别人庆功宴上的谈资。兵解。"
        } },
        { text: "遁走", result: "好汉不吃眼前亏，你弃了这处洞府。" }
      ] },
    { id: "zy_md_2", type: "chance", cat: "zhandou", realms: [2], chain: "zy_md_2",
      cond: { flag: "魔修", notFlag: "魔宗" },
      text: "魔宗使者登门：宗主听闻你的名声，邀你入宗执掌一殿。条件是——先替宗门除掉一个叛徒。",
      choices: [
        { text: "接令", sub: "强敌斗法", battle: {
          name: "魔宗叛徒", tier: 2, demonic: true, elem: "水",
          winText: "叛徒的魂灯熄灭。魔宗大殿上，从此有你的一个座位。",
          winEffect: { spell: "dulong", evil: 1, inv: { "灵石": 400 } }, wuxue: [120, 220],
          lightText: "叛徒的魔功与你同源，这一仗打得格外难受。", lightEffect: {},
          heavyText: "叛徒拼死反扑，魔毒侵入你的心脉。", heavyEffect: { sanShang: 2 },
          deathText: "叛徒临死前拉了你垫背。魔宗的魂灯殿里，两盏灯同时灭了。道消。"
        } },
        { text: "推了", result: "你不想替人当刀。使者笑了笑，说宗主会再来的。" }
      ] },

    /* ===================== v3 金丹日常（财侣法地配比） ===================== */
    /* —— 财 —— */
    { id: "jd_cai_1", type: "daily", cat: "ziyuan", realms: [2], cond: { cultMax: 1800 },
      text: "旧日相识的筑基小辈上门借灵石周转，说三年内连本带利奉还。",
      choices: [
        { text: "借", sub: "灵石 -100 · 记下人情", cond: { inv: { "灵石": 100 } }, effect: { inv: { "灵石": -100 }, renqing: -1 }, result: "小辈千恩万谢地走了。你根本没打算让他还。" },
        { text: "不借", result: "你推说手头也紧。小辈识趣地告辞了。" }
      ] },
    { id: "jd_cai_2", type: "daily", cat: "ziyuan", realms: [2],
      cond: { flag: "开府" },
      text: "峰下灵田今年收成极好，佃户们凑了一份厚礼送上来。",
      effect: { inv: { "灵石": 150 } } },
    { id: "jd_cai_3", type: "chance", cat: "ziyuan", realms: [2], cond: { cultMin: 1800, cultMax: 3800 },
      text: "拍卖行送来请宴：下月有一场金丹修士的专场，压轴是一件古宝。请東的措辞客气得近乎卑微。",
      choices: [
        { text: "去看看", sub: "灵石 -200 · 竞拍", cond: { inv: { "灵石": 200 } }, effect: { inv: { "灵石": -200 }, artifactForce: { "法宝": 1 } }, result: "你加了三口价，全场再无人应声。古宝到手，掌柜亲自送你出门。" },
        { text: "回绝", result: "你把请東压在了茶盘底下。" }
      ] },
    { id: "jd_cai_4", type: "trib", cat: "ziyuan", realms: [2],
      cond: { flag: "开府", cultMin: 1800, cultMax: 3800 },
      text: "账房急报：库房夜里进了贼，丢了一批灵石。守夜的弟子跪了一地。",
      choices: [
        { text: "彻查", sub: "灵石 -100 · 声望 +1", effect: { inv: { "灵石": -100 }, factionDelta: { rep: 1 } }, result: "三日后贼人拿了，是个流窜的惯偷。你依例处置，没有难为守夜的弟子。" },
        { text: "算了", sub: "灵石 -150", effect: { inv: { "灵石": -150 } }, result: "你摆摆手说破财免灾。守夜的弟子偷偷抹了把眼泪。" }
      ] },
    /* —— 法 —— */
    { id: "jd_fa_xi_1", type: "daily", cat: "xiulian", realms: [2],
      text: "你闭关研习一门旧法术，忽然在某处关穷上卡了三天三夜。",
      choices: [
        { text: "硬磕", sub: "成败各半", outcomes: [
          { weight: 5, result: "第四天清晨，你忽然想通了。法术威力又进了一层。", effect: { attrs: { "悟性": 3 } } },
          { weight: 5, result: "越想越乱，你差点走岔了气，只得暂且放下。" }
        ] },
        { text: "放下", result: "你把玉简收了起来。有些关穷，是急不来的。" }
      ] },
    { id: "jd_fa_xi_2", type: "chance", cat: "xiulian", realms: [2],
      cond: { notFlag: "散修", cultMin: 1800, cultMax: 3800 },
      text: "藏经阁的守阁长老传话：新到一批古旧玉简，让你先去挑。这是只有长老才有的待遇。",
      choices: [
        { text: "挑一卷法术", sub: "灵石 -150", cond: { inv: { "灵石": 150 } }, effect: { inv: { "灵石": -150 }, spell: "tulao" }, result: "你挑了一卷「土牢壁」。守阁长老点头：好眼光。" },
        { text: "挑一卷功法", sub: "灵石 -120 · 功法进境", cond: { inv: { "灵石": 120 }, gongfaMax: 2 }, effect: { inv: { "灵石": -120 }, gongfa: 1 }, result: "你挑了一卷高阶功法，回去参悟了三个月。" },
        { text: "都不缺", result: "你转了一圈，空手出来了。守阁长老说你眼光高了。" }
      ] },
    { id: "jd_fa_xi_3", type: "daily", cat: "xiulian", realms: [2],
      text: "你试着给随身的法宝温养祭炼，七七四十九日不曾间断。",
      effect: { attrs: { "神识": 2 } } },
    { id: "jd_fa_xi_4", type: "trib", cat: "xiulian", realms: [2], cond: { cultMin: 1800, cultMax: 3800 },
      text: "炼器房请你出手帮忙开炉。火候没掌住，一炉灵材废了大半。",
      choices: [
        { text: "赔", sub: "灵石 -120", cond: { inv: { "灵石": 120 } }, effect: { inv: { "灵石": -120 } }, result: "你照价赔了。炼器房的师傅们反倒过意不去，送了你一件新打的法器。", },
        { text: "不赔", sub: "声望 -1", effect: { factionDelta: { rep: -1 } }, result: "你说了句「技止此耳」，拂袖而去。炼器房背后议论了你很久。" }
      ] },
    { id: "jd_fa_xi_5", type: "chance", cat: "xiulian", realms: [2],
      text: "坊市深处，一个老摊主神秘兮兮地捧出一册残卷：高阶功法，只剩后半部，但对你正合用。",
      choices: [
        { text: "买下参悟", sub: "灵石 -200 · 功法进境", cond: { inv: { "灵石": 200 }, gongfaMax: 2 }, effect: { inv: { "灵石": -200 }, gongfa: 1 }, result: "残卷虽残，却字字珠玑。你参悟数月，功法又进一阶。" },
        { text: "看不上", result: "你翻了翻就放下了。真东西见多了，残卷入不了眼。" }
      ] },

    /* —— 侣 —— */
    { id: "jd_lv_1", type: "daily", cat: "renji", realms: [2], cond: { cultMin: 1800, cultMax: 3800 },
      text: "当年一同入门的老友来访。他如今还是筑基后期，见你时拘了半天的礼，才被你不由分说按回座上。",
      choices: [
        { text: "赠他丹药", sub: "回春丹 -1", cond: { inv: { "回春丹": 1 } }, effect: { inv: { "回春丹": -1 } }, result: "老友捧着丹瓶，半天说不出话。临出门他站住，张了张嘴，那句「兄弟」终究咽了回去，只深深一揖：真人，保重。" },
        { text: "指点他结丹门路", sub: "提携旧友", effect: { attrs: { "气运": 2 }, renqing: 1 }, result: "你三言两语点破他卡了多年的关窍。他愣了半晌，起身整了整衣冠，朝你郑重行了一礼——从前他见你不必行礼，从今往后这一礼躲不开了。" },
        { text: "只叙旧", result: "你们喝了一夜酒，谁也没提境界二字。" }
      ] },
    { id: "jd_lv_2", type: "daily", cat: "renji", realms: [2],
      cond: { flag: "开府" },
      text: "门下弟子练功岔了气，跪在你洞府外求指点。",
      choices: [
        { text: "悉心指点", sub: "情报 +2", effect: { factionDelta: { intel: 2 } }, result: "你点拨了三句，弟子豁然开朗。这件事很快传遍了全门。" },
        { text: "让他自己悟", result: "你让他回去把功法再抄十遍。弟子磕了个头，躬身退下了。" }
      ] },
    { id: "jd_lv_3", type: "trib", cat: "renji", realms: [2], highlight: true, cond: { cultMin: 3800 },
      text: "讣告传来：你入门时的引路师兄坐化了。他一辈子卡在筑基后期，临走前还念叨你的名字。",
      effect: { attrs: { "神识": 3 } } },
    /* —— 地 —— */
    { id: "jd_di_1", type: "chance", cat: "ziyuan", realms: [2],
      cond: { flag: "开府" },
      text: "峰下灵脉近日灵气异动，山间时有霞光。弟子们都说，这是要出灵眼的兆头。",
      choices: [
        { text: "出手梳理", sub: "灵石 -150 · 灵脉 +1", cond: { inv: { "灵石": 150 } }, effect: { inv: { "灵石": -150 }, factionDelta: { spiritVeins: 1 } }, result: "你亲自出手梳理了七七四十九日，灵脉果然壮了一圈。" },
        { text: "顺其自然", result: "灵脉异动渐渐平息，霞光也散了。" }
      ] },
    { id: "jd_di_2", type: "daily", cat: "ziyuan", realms: [2], cond: { cultMax: 1800 },
      text: "有散修在你洞府附近的灵泉里偷偷取水，被巡山的逮了个正着。",
      choices: [
        { text: "放他一马", result: "你让人放了他，还送了两瓶泉水。散修感激楫首，从此逢人便说你的好。" },
        { text: "按例处置", result: "你按例罚了他三十灵石。规矩就是规矩。", effect: { inv: { "灵石": 30 } } }
      ] },
    /* —— 劫 —— */
    { id: "jd_jie_1", type: "trib", cat: "xinjing", realms: [2],
      text: "打坐时心魔忽然小扰：当年没能救下的人，一个一个从眼前走过。",
      choices: [
        { text: "直面", sub: "神识 +3", effect: { attrs: { "神识": 3 } }, result: "你一个个看过去，看到最后，心里反而静了。" },
        { text: "压下", sub: "恶行不增，只是心里闷", result: "你把那些影子压回识海深处。它们还在，只是暂时不吵了。" }
      ] },
    { id: "jd_jie_2", type: "trib", cat: "xinjing", realms: [2],
      text: "旧日斗法留下的暗伤发作，你调养了整整一个月。",
      effect: { inv: { "灵石": -40 } } },
    /* —— 机缘 —— */
    { id: "jd_jy_1", type: "miracle", cat: "jiyuan", realms: [2],
      text: "你在古籍里翻到一张残破的舆图，标注着一处古修士坐化之地。真假难辨。",
      choices: [
        { text: "按图去寻", sub: "成败在天", outcomes: [
          { weight: 4, result: "地方是真的。古修士的遗蜕前摆着一只玉盒。", effect: { artifactForce: { "灵器": 1 } } },
          { weight: 4, result: "白跑一趟。那地方早就被人翻过八遍了。" },
          { weight: 2, result: "图是赝品，你还差点踩进别人布下的陷阵。", effect: { sanShang: 1 } }
        ] },
        { text: "束之高阁", result: "你把舆图塞回了古籍里。" }
      ] },
    { id: "jd_jy_2", type: "miracle", cat: "xiulian", realms: [2],
      text: "雨后看山，你忽然有了一丝明悟——修为好一阵没有这般松动了。",
      effect: { attrs: { "悟性": 2 } } },
    { id: "jd_dunwu", type: "miracle", cat: "xiulian", realms: [2],
      weightBy: { "悟性": 0.05, "神识": 0.05 },
      text: "参悟古籍到深夜，你忽然心头一亮，困住多日的关窍豁然开朗。悟性高的人处处见机缘，神识足的人接得住灵光——这一夜，两样你都占全了。",
      effect: { attrs: { "悟性": 3 } } },

    /* ===================== v3 势力经营 ===================== */
    { id: "jd_fa_z1", type: "daily", cat: "renji", realms: [2],
      cond: { factionRoute: "zong", cultMin: 1800, cultMax: 3800 },
      text: "两名亲传弟子为了一件法器的归属闹到你面前，谁也不让谁。",
      choices: [
        { text: "各打五十大板", sub: "弟子离心风险", outcomes: [
          { weight: 5, result: "两人都不敢再闹，背地里却结了梁子。", effect: { factionDelta: { rep: -1 } } },
          { weight: 5, result: "两人反倒冷静下来，自行和解了。" }
        ] },
        { text: "查明曲直", sub: "费些心思", effect: { factionDelta: { rep: 1 } }, result: "你问了三个问题，理亏的那个自己低下了头。" }
      ] },
    { id: "jd_fa_z2", type: "daily", cat: "ziyuan", realms: [2],
      cond: { factionRoute: "zong", cultMin: 1800, cultMax: 3800 },
      text: "掌门一脉提议重分各峰灵田，明眼人都看得出，是想削你的。",
      choices: [
        { text: "据理力争", sub: "声望 -1 · 灵脉保住", effect: { factionDelta: { rep: -1 } }, result: "你在长老会上寸步不让。灵田保住了，掌门看你的眼神却深了。" },
        { text: "退一步", sub: "灵石 -100", effect: { inv: { "灵石": -100 } }, result: "你让出了两分薄田。掌门投桃报李，在别处给了你补偿。" }
      ] },
    { id: "jd_fa_z3", type: "trib", cat: "renji", realms: [2],
      cond: { factionRoute: "zong", cultMin: 1800, cultMax: 3800 },
      text: "你座下大弟子下山历练，打伤了别宗的弟子，对方宗门递了问罪书。",
      choices: [
        { text: "护短", sub: "灵石 -100 · 弟子归心", cond: { inv: { "灵石": 100 } }, effect: { inv: { "灵石": -100 }, factionDelta: { disciples: 1 } }, result: "你赔了灵石，却当着外人的面把错搅了过去。大弟子从此对你死心塌地。" },
        { text: "按律处置", sub: "声望 +1", effect: { factionDelta: { rep: 1 } }, result: "你亲自押着弟子上门赔罪。两宗体面都保住了，弟子却寒了心。" }
      ] },
    { id: "jd_fa_z4", type: "daily", cat: "renji", realms: [2],
      cond: { factionRoute: "zong", cultMin: 1800, cultMax: 3800 },
      text: "管库房的执事被查出贪墨，按例当逐出宗门。他跪着求你，说家里还有八十老母。",
      choices: [
        { text: "依例逐出", sub: "声望 +1", effect: { factionDelta: { rep: 1 } }, result: "你挥挥手让人执行。库房的风气为之一清。" },
        { text: "罚奉留用", sub: "弟子离心风险", outcomes: [
          { weight: 5, result: "执事感恩戴德，从此再不敢伸手。" },
          { weight: 5, result: "旁人看你这般处置，也有样学样起来。", effect: { factionDelta: { rep: -1 } } }
        ] }
      ] },
    { id: "jd_fa_s1", type: "daily", cat: "ziyuan", realms: [2],
      cond: { factionRoute: "san", cultMin: 1800, cultMax: 3800 },
      text: "商路管事来报：最近几趟镖都很顺，分红比往年厚了三成。",
      effect: { inv: { "灵石": 200 } } },
    { id: "jd_fa_s2", type: "chance", cat: "renji", realms: [2],
      cond: { factionRoute: "san", cultMin: 1800, cultMax: 3800 },
      text: "一位成名多年的筑基散修来投，说愿在你麾下听用。",
      choices: [
        { text: "收为客卿", sub: "弟子 +1", effect: { factionDelta: { disciples: 1 } }, result: "你亲自为他斟了茶。消息传开，来投的人又多了几个。" },
        { text: "婉拒", result: "你看了他半天，终究还是推了。有些人，是收不得的。" }
      ] },
    { id: "jd_fa_s3", type: "trib", cat: "renji", realms: [2],
      cond: { factionRoute: "san", cultMin: 1800, cultMax: 3800 },
      text: "盟中两位元老为了一座灵矿的归属翻了脸，两边的人马已经对峙上了。",
      choices: [
        { text: "亲自裁断", sub: "费些心思", effect: { factionDelta: { rep: 1 } }, result: "你把灵矿劈成两半，又各补了一句公道话。两人都服了。" },
        { text: "让他们自己解决", sub: "声望 -1", effect: { factionDelta: { rep: -1 } }, result: "你作壁上观。矿是分完了，盟里的裂痕也留下了。" }
      ] },
    { id: "jd_fa_s4", type: "daily", cat: "renji", realms: [2],
      cond: { factionRoute: "san", cultMin: 1800, cultMax: 3800 },
      text: "一位筑基散修遭了仇家追杀，逃到你盟界边上求救。",
      choices: [
        { text: "庇护他", sub: "声望 +1", effect: { factionDelta: { rep: 1 } }, result: "你只说了一句话，仇家连夜退了。散修逢人便说：盟主仁义。" },
        { text: "不蹚浑水", result: "你让人关了界门。那散修的下场，你没有再问。" }
      ] },

    /* ===================== v3 还情链（人情账偿还） ===================== */
    { id: "rq_1", type: "chance", cat: "renji", realms: [2], chain: "rq_1",
      cond: { renqingMin: 1 },
      text: "当年赠你法宝的故交登门，面带难色：他的一处灵矿被强邻占了，想请你出山主持公道。",
      choices: [
        { text: "出手", sub: "还这份人情", effect: { renqing: -1, factionDelta: { rep: 1 } }, result: "你去了。强邻看见你，二话不说退了兵。故交拉着你的手，半天说不出话。" },
        { text: "赠灵石补偿", sub: "灵石 -200 · 还人情", cond: { inv: { "灵石": 200 } }, effect: { inv: { "灵石": -200 }, renqing: -1 }, result: "你包了两百灵石让他另置产业。故交推了三次，终究还是收了。" },
        { text: "推托", result: "你推说闭关在即。故交走后，你对着茶杯坐了很久。" }
      ] },
    { id: "rq_2", type: "trib", cat: "renji", realms: [2], chain: "rq_2", highlight: true,
      cond: { renqingMin: 1, cultMin: 3800 },
      text: "当年于你有恩的老友坐化了。临终前他修书一封，把年幼的孙儿托付给你。",
      choices: [
        { text: "收为弟子", sub: "弟子 +1 · 还人情", effect: { renqing: -1, factionDelta: { disciples: 1 } }, result: "你把那孩子接上山，亲自教他引气入体。孩子的眉眼，像极了他爷爷。" },
        { text: "厚赠遣归", sub: "灵石 -150 · 还人情", cond: { inv: { "灵石": 150 } }, effect: { inv: { "灵石": -150 }, renqing: -1 }, result: "你赠了一大笔灵石，又修书给当地宗门照拂。仁至义尽。" }
      ] },

    /* ===================== v3 碎丹重结支线 ===================== */
    { id: "sd_1", type: "daily", cat: "xinjing", realms: [2],
      cond: { flag: "重凝中" },
      text: "碎丹之后，风言风语就没停过：有人说你疯了，有人说你废了。你一概不理，只是重新打坐。" },
    { id: "sd_2", type: "trib", cat: "zhandou", realms: [2],
      cond: { flag: "重凝中" },
      text: "你碎丹虚弱的消息不知怎么走漏了，两个觊觎你洞府的修士摸上了门。",
      choices: [
        { text: "强撑迎敌", sub: "同阶斗法（虚弱减半）", battle: {
          name: "趁虚修士", tier: 1, demonic: false, elem: "木",
          winText: "你拖着虚弱的身子硬赢了这一仗。消息传开，再没人敢来试探。",
          winEffect: { factionDelta: { rep: 1 } }, wuxue: [80, 150],
          lightText: "你且战且退，旧伤又添新伤。", lightEffect: {},
          heavyText: "虚弱的身子终究撑不住，你被打成重伤。", heavyEffect: { sanShang: 2 },
          deathText: "碎丹未成的你，终究没能撑过这一劫。道消。"
        } },
        { text: "避入护阵", result: "你启动了洞府的护山大阵。两个修士在阵外骂了三天，最后悻悻而去。" }
      ] },
    { id: "sd_3", type: "daily", cat: "xiulian", realms: [2],
      cond: { flag: "重凝中", cultMin: 1500 },
      text: "重凝的路上，你常常想起结丹那年的雷。原来当年的侥幸，如今都要一分一分补回来。",
      effect: { attrs: { "神识": 2 } } },

    /* ===================== v3 结婴筹备 ===================== */
    { id: "yyzb_1", type: "daily", cat: "xinjing", realms: [2],
      cond: { cultMin: 3800 },
      text: "金丹渐趋圆满，你开始打磨心境：每日清晨看日出，黄昏听松涛。修为到了这一步，拼的早已无关灵石丹药。",
      effect: { attrs: { "神识": 2 } } },
    { id: "yyzb_2", type: "chance", cat: "xinjing", realms: [2],
      cond: { cultMin: 3800 },
      text: "一位冲击元婴失败的前辈受邀来讲经。他说得最多的是四个字：问心无愧。",
      choices: [
        { text: "细问关穷", sub: "道心 +1", effect: { daoXin: 1 }, result: "你们谈了一整夜。临走时前辈摆摆手：「雷劫那日，可别再走我的老路。」" },
        { text: "听过便罢", result: "道理都懂，路还是要自己走。" }
      ] },
    { id: "yyzb_3", type: "trib", cat: "xinjing", realms: [2],
      cond: { cultMin: 3800 },
      text: "夜里你常做一个梦：雷劫之下，金丹碎成了渣。醒来时，后背全是冷汗。",
      choices: [
        { text: "正视恐惧", sub: "神识 +3", effect: { attrs: { "神识": 3 } }, result: "你一遍遍在识海里预演雷劫。怕，但还是得上。" },
        { text: "不去想它", result: "你把梦境压了下去。只是此后打坐，总要多花半个时辰才能静下心来。" }
      ] },

    /* ===================== v3 链续写 ===================== */
    { id: "tud_10", type: "chance", cat: "renji", realms: [2], chain: "tud_10", highlight: true,
      text: "喜讯传来：你座下大弟子闭关三年，一朝结丹！开坛讲法那日，他第一句话是：没有师尊，就没有我的今天。",
      effect: { statsInc: { tudiJiedan: 1 }, factionDelta: { rep: 2 } } },
    { id: "jd_daolv_jd", type: "chance", cat: "renji", realms: [2], highlight: true,
      cond: { flag: "道侣", notFlag: "道侣坐化" },
      text: "【道侣名】也到了筑基圆满的关口，不日便要渡结丹雷劫。你握着 TA 的手，比当年自己渡劫还紧张。",
      choices: [
        { text: "护法", sub: "生死由天", outcomes: [
          { weight: 6, result: "雷劫落尽，【道侣名】丹成二品。从此双修路上，再没有人掉队。", effect: { factionDelta: { rep: 1 }, daoXin: 1 } },
          { weight: 4, result: "雷劫第九重，【道侣名】终究没能扛过去。你守着洞府，三天三夜没有出门。", effect: { flag: "道侣坐化", daoXin: 1 } }
        ] }
      ] },
    { id: "jd_shitu_tuo", type: "trib", cat: "renji", realms: [2], highlight: true,
      cond: { flag: "亲传", notFlag: "师门托孤" },
      text: "师傅坐化了。临终前他拉着你的手，把年幼的小师弟托付给你，又把一枚掌门令塞进你掌心：往后，你就是师门的靠山。",
      effect: { flag: "师门托孤", renqing: 1, factionDelta: { disciples: 1 } } },
    { id: "db_4", type: "chance", cat: "renji", realms: [2], chain: "db_4",
      cond: { flag: "宗门", cultMin: 1800, cultMax: 3800 },
      text: "宗门大比如期而至，这一届，你坐上了主评委的位置。看着台下那些紧张的小弟子，你想起很多年前的自己。",
      effect: { factionDelta: { rep: 1 } } },
    { id: "db_5", type: "daily", cat: "renji", realms: [2], chain: "db_5",
      cond: { flag: "宗门", cultMin: 1800, cultMax: 3800 },
      text: "本届大比的夺魁者捧着奖品来拜你，求一句指点。那孩子的眼神，亮得像当年的你。",
      choices: [
        { text: "点拨三句", sub: "弟子 +1", effect: { factionDelta: { disciples: 1 } }, result: "三句话说完，孩子呆立当场，随即狂喜拜谢。" },
        { text: "只说一句", result: "你只说了一句：戒骄。孩子深深一揖，躬身退下了。" }
      ] },

    /* ===================== v3 金丹秘境入口 ===================== */
    { id: "mj_zc_in", type: "chance", cat: "jiyuan", realms: [2, 3], weight: 5, cond: { inv: { "灵石": 80 } }, dungeon: "mj_zhanchang",
      text: "行商带来消息：黑风口的上古战场遗迹最近禁制松动，已有人从里面带出了万年前的东西。行商的话，你记了很多年——当年他说，黑风口夜里能听见兵器响，说是万年前的仗还没打完。入场的领路费是八十灵石。" },
    { id: "mj_hs_in", type: "chance", cat: "jiyuan", realms: [2, 3], weight: 3, cond: { inv: { "灵石": 100 } }, dungeon: "mj_huashen",
      text: "一位云游老道说漏了嘴：他曾误入一座石灯长明的山，那里是化神真君坐化之地。你再三追问，他只肯收一百灵石带个路。" },

    /* ===================== v4.2 三线深化：魔宗链 mm_ / 孤狼 gl_ / 开派 sxp_ ===================== */
    { id: "mm_2", type: "daily", cat: "renji", realms: [2], chain: "mm_2", cond: { cultMax: 1800, flag: "魔宗" },
      text: "旧派长老借故刁难，要拿你去刑堂立威。传你功法的师兄把事情扛了下来，挨了二十鞭。他趴在床上还笑：「魔宗护短，也是门规里写着的。」" },
    { id: "mm_3", type: "daily", cat: "renji", realms: [2], chain: "mm_3",
      cond: { cultMin: 1800, cultMax: 3800, flag: "魔宗" },
      text: "你执掌一殿。殿中弟子起初不服，直到你替两个犯错的弟子挡下刑堂。如今他们提起你，都说：咱们殿主，是自己人啊。",
      effect: { factionDelta: { rep: 1 } } },
    { id: "mm_4", type: "chance", cat: "zhandou", realms: [2], chain: "mm_4", highlight: true,
      cond: { cultMin: 3800, flag: "魔宗" },
      text: "玄阴教送来观礼帖：镇魔碑破禁在即，请你上座观礼。帖末一行小字——碑下那位出来之日，魔道重掌乾坤。",
      choices: [
        { text: "助拳", sub: "魔道巨擘路线", effect: { flag: "魔道巨擘" }, result: "你收了帖。快是一回事，魔道的天下是另一回事——这一趟，你是去定了。" },
        { text: "反水", sub: "把帖子送给正道 · 与玄阴教结仇", effect: { flag: "弃魔归正", intel: 20, factionDelta: { rep: 2 } }, result: "你把帖子原样送进了正道各宗的密室。急功近利是路，伤天害理是坑——这个忙，你说什么也不帮。" }
      ] },
    { id: "jd_qmgz_echo", type: "daily", cat: "renji", realms: [2],
      cond: { flag: "弃魔归正", cultMin: 3800 },
      text: "你把帖子送进正道密室的事，终究瞒不住。正道各宗联名致谢，宴席给你留了上首。玄阴教那边，你的名字上了必杀名单。叛徒两个字，比仇人更扎眼。" },
    { id: "gl_1", type: "daily", cat: "xinjing", realms: [2], cond: { cultMax: 1800, flag: "孤狼", notFlag: "开府" },
      text: "无峰也无盟，无牵更无挂。你收拾了一个包袱就下了山，走到哪里，哪里就是家。" },
    { id: "gl_2", type: "daily", cat: "xiulian", realms: [2], cond: { flag: "孤狼", notFlag: "开府" },
      text: "孤狼有孤狼的难处：斗法没人接应，重伤没人护法。你把遁术练得比谁都精。",
      effect: { attrs: { "神识": 2 } } },
    { id: "gl_3", type: "daily", cat: "jiyuan", realms: [2], cond: { flag: "孤狼", notFlag: "开府" },
      text: "一人一剑，机缘都独享。古修士洞府里起出的东西，你不用跟任何人分。",
      effect: { inv: { "灵石": 150 } } },
    { id: "sxp_1", type: "daily", cat: "renji", realms: [2], cond: { cultMax: 1800, factionRoute: "san" },
      text: "立盟第一年，你把规矩刻在盟约石上：互通有无，守望相助，也不欺弱小。元老们说，这三条，够用一百年。" },
    { id: "sxp_2", type: "trib", cat: "ziyuan", realms: [2], cond: { cultMin: 1800, cultMax: 3800, factionRoute: "san" },
      text: "散修盟的难处明摆着：没底蕴，没传承，灵脉都是租的。你把账房钥匙收了上来：「没人没钱，那就自己挣。」",
      choices: [
        { text: "开源", sub: "商路 + 灵石", effect: { inv: { "灵石": 200 } }, result: "你带着元老们跑了半年商路，盟里的库房第一次见了底朝上。" },
        { text: "节流", sub: "声望 +1", effect: { factionDelta: { rep: 1 } }, result: "你裁了三成虚耗，元老们心疼归心疼，年底一看账，全都服了气。" }
      ] },
    { id: "sxp_3", type: "daily", cat: "renji", realms: [2], cond: { cultMin: 3800, factionRoute: "san" },
      text: "十年树木。盟里的年轻人如今走出去，也敢挺着腰报山门了。" },

    /* ===================== v4.1 人物主线：挚友链 you_ 金丹四环 + 道侣 zdl_3 ===================== */
    { id: "you_6", type: "daily", cat: "renji", realms: [2], chain: "you_6",
      cond: { cultMax: 1800 },
      text: "【挚友】寿元尽了，走得很安详。你结丹那年，他撑着最后一口气来看过你，随后半年便去了。他没能筑基，把日子修成了一间杂货铺，到老都念叨你。临终留话：『神仙的路，你替我走远些。』他的后人接了铺子，开到了你峰下的坊市。满坊市的人见你都躬身，只有那家铺子的掌柜，隔着柜台喊你当年的小名。旁人皱眉，他浑不在意：「祖辈入门那年起就这么喊的，改不过来了。」" },
    { id: "you_7", type: "trib", cat: "renji", realms: [2], chain: "you_7",
      cond: { cultMin: 1800, cultMax: 3800 },
      text: "有人在【挚友】留下的铺子里喝酒嚼舌：当年你夺过他家一桩机缘，发达了就忘了老兄弟一家。那后人喝多了，当着半条街把你送的帖子摔在地上——一个筑基修士，敢在真人的地界上摔帖子，满坊市的人都替他捏了把汗。" },
    { id: "you_8", type: "trib", cat: "renji", realms: [2], chain: "you_8",
      cond: { cultMin: 1800, cultMax: 3800 },
      text: "【挚友】的后人红着眼上山问罪，刀都已经拔了。他一个筑基修士，横刀站在你的山门前，两条腿直抖——可就是不肯退。",
      choices: [
        { text: "站住不动，任他劈", sub: "护体真元", outcomes: [
          { weight: 6, result: "刀劈在你肩头，被护体真元轻轻弹开，震得他虎口发麻。他怔怔看着崩了口的刀，忽然蹲在山门口，哭得像个孩子。你等他哭够了，才开口说话。", effect: { daoXin: 1 } },
          { weight: 4, result: "你侧身让开，由着他一刀砍在石阶上，火星迸起老高。他砍了三刀，手先软了，刀掉在地上，人也蹲了下去。", effect: { attrs: { "神识": 1 } } }
        ] },
        { text: "握住他的手腕", sub: "让他把话说完", result: "刀锋离你三寸，被你两根手指夹住，便再进不了半分。你一字一句把当年的事说清楚。他听着，手先抖了，眼泪跟着就掉了下来。", effect: { attrs: { "神识": 2 } } },
        { text: "由着他闹", sub: "遣散围山的弟子", result: "你让弟子都退下，由着他骂个够。他骂累了，蹲在山门口喘气。你走过去挨着他坐下，两个人谁也没说话，坐了一下午。", effect: { renqing: 1 } },
        { text: "闭门不见", result: "你在门内，他在门外，隔了一整夜。天亮时他走了，你听着脚步声，心里堵得慌。" }
      ] },
    { id: "you_9", type: "daily", cat: "renji", realms: [2], chain: "you_9", highlight: true,
      cond: { cultMin: 3800 },
      text: "真相查明了：当年造谣的是被你逐出山门的旧仇。他当众给【挚友】的后人赔了罪。那后人提着两坛酒上山。酒到酣处他忽然开口：「祖辈认你当兄弟……」几个字喊出口，他自己先愣了——这个称呼他家祖辈喊了大半辈子，如今由他喊出来，倒先把自己喊住了。",
      choices: [
        { text: "端起碗跟他碰一下", sub: "道心 +1", effect: { daoXin: 1 }, result: "你端着碗跟他碰了碰：「祖辈喊了大半辈子，你倒学起客气来了。」他眼眶一热，仰头把一碗酒干了。你们喝到天亮，那把刀，他挂回了墙上。" },
        { text: "把当年的事说清楚", sub: "恩怨讲透", result: "你把那桩旧事的来龙去脉一条条讲给他听。他听着，酒碗越攥越紧，末了红着眼说：是我浑。天亮时刀上了墙，恩怨算是了了。" }
      ] },
    { id: "zdl_3", type: "daily", cat: "renji", realms: [2], chain: "zdl_3",
      cond: { flag: "道侣", notFlag: "道侣坐化" },
      text: "满坊市的人都说，你们俩是神仙眷侣。【道侣名】听了就笑，转头把这话学给你听，眼睛里亮晶晶的。" },

    /* ===================== v3.2 修订：evil 经营 / 散修恩师 / 魔道劝降 / 凡间锚点 / 散功叙事 ===================== */
    { id: "jd_cai_shen", type: "chance", cat: "renji", realms: [2],
      cond: { flag: "开府", renqingMax: 2 },
      text: "山下遭了瘟，里正磕头磕到你山门。你峰上的回春丹还有几枚，散下去能救一乡。",
      choices: [
        { text: "舍丹施药", sub: "回春丹 -2 · 声望 +1 · 心魔账 -1", cond: { inv: { "回春丹": 2 } },
          effect: { inv: { "回春丹": -2 }, factionDelta: { rep: 1 }, goodKarma: 1 },
          result: "你开了仓。山民跪了三里长。回程路上你想起从前听过的那些哭声——这一回，你没有听见。" },
        { text: "闭山自保", result: "你关了阵门。山下的哭声隔着一层禁制传上来，听着像落雨。夜里你没睡好。" }
      ] },
    { id: "mx_quan", type: "chance", cat: "zhandou", realms: [2],
      cond: { flag: "破分坛", notFlag: "魔修", notFlag: "玄阴招揽", notFlag2: "灭总坛" },
      text: "玄阴教的使者大摇大摆上了你的山，呈上赫连绝的亲笔信：许你副教主之位，共图破碑大事。送信的人临走只留下一句：「教主说，他等你答复。」",
      choices: [
        { text: "焚信", sub: "道心 +1", effect: { daoXin: 1, flag: "玄阴招揽" }, result: "你把信就着火盆点了。使者看着信烧成灰，笑了笑，拱拱手下山去了。" },
        { text: "截信上报", sub: "声望 +1 · 情报 +10", effect: { factionDelta: { rep: 1 }, intel: 10, flag: "玄阴招揽" }, result: "信原样送进了宗门（盟中）的密室。正道各宗这才知道，赫连绝已经开始挖人了。" },
        { text: "压下不回", effect: { flag: "玄阴招揽", attrs: { "神识": -2 } }, result: "你把信压在了玉简堆的最底下。往后几个月，打坐时总会想起那几行字。" }
      ] },
    { id: "jd_gift_shifu_san", type: "chance", cat: "renji", realms: [2],
      cond: { flag: "恩师", renqingMax: 2 },
      text: "山下来人，说瞎眼婆婆坐化了。临终前她托人捎来一册手抄丹方，还有一件随身多年的旧法宝：「她说你如今是名动一方的真人了，这点东西，就当老婆子贺你。」",
      choices: [
        { text: "拜谢收下", sub: "记下这份人情", effect: { artifactType: { "攻": "法宝" }, renqing: 1 }, result: "你双手接过，朝着深山的方向拜了三拜。丹方扉页上有一行小字：眼瞎心不瞎。" },
        { text: "不敢受如此重礼", result: "来人也不勉强，只说何时想通了，随时可以回山里取。" }
      ] },
    { id: "jd_shitu_tuo_san", type: "trib", cat: "renji", realms: [2], highlight: true,
      cond: { flag: "恩师", notFlag: "恩门托孤" },
      text: "深山的茅棚拆了。瞎眼婆婆坐化前，把守炉的小童托付给了你。孩子背着一口小丹炉上山，跪在你面前，说婆婆遗言：往后这位真人，就是你的靠山。",
      effect: { flag: "恩门托孤", renqing: 1 } },
    { id: "home_4", type: "daily", cat: "renji", realms: [2], chain: "home_4", highlight: true,
      text: "你又回了一趟村子。村口的老槐树还在，认识你的人却一个都没了。你问一个少年可知村东头那户人家，少年摇头：听说那家早绝了户，就一个娃上了山，再没回来过。",
      effect: { daoXin: 1 } },
    { id: "sg_1", type: "daily", cat: "xinjing", realms: [2],
      cond: { flag: "散功中" },
      text: "同门私下议论你散功的事，话传到你耳朵里，你只当没听见。夜里打坐，空荡荡的丹田里，你也问过自己：还要不要再试一回。" },
    { id: "sg_2", type: "daily", cat: "xiulian", realms: [2],
      cond: { flag: "散功中", cultMin: 3800 },
      text: "你把散去的真元一丝丝拢了回来。这一回，丹田里的金丹比从前更沉、更稳。",
      effect: { attrs: { "神识": 3 } } },

    /* ===================== v3 金丹三段仪式卡（修 loop.js 推送的死链 jd_stage2/jd_stage3） =====================
     * 13 文档「身份回响 + 称谓三连变」的分水岭 milestone。
     * milestone:-1 —— 永不入随机池（eligible 见 core.js §421），只能由 loop.js 队列触发一次；
     * cond 只取下界避免跨阶一帧升过 cult=1800/3800 仍命中；
     * 加单次 flag，防散功重修后跨阶再次登位。 */
    { id: "jd_stage2", milestone: -1, type: "chance", cat: "renji", realms: [2], highlight: true,
      cond: { cultMin: 1800, notFlag: "已登中期" },
      text: "金丹之境已稳，掌门在长老会上当众宣布：往日的口唤「小友」往后改作「道友」，你座次上移三席。座下有人拱手道贺，也有人目光沉沉——日子到底不一样了。",
      choices: [
        { text: "敬领新座，顺势讨一桩差事", sub: "灵脉 +1 · 声望 +1", effect: { flag: "已登中期", factionDelta: { spiritVeins: 1, rep: 1 } }, result: "你顺势请下了后山那口新出露的灵眼。掌门笑着准了——给你的人，自然连地一起给。" },
        { text: "谦让再三，徐图后计", sub: "情报 +3 · 道心 +1", effect: { flag: "已登中期", factionDelta: { intel: 3 }, daoXin: 1 }, result: "你婉拒了座次又谢了恩。散会时一位老长老对你点头：会藏锋，比会出鞘难。隔日你的一桩旧账被人托人翻了上来——是有人在掂你的深浅。" }
      ] },
    { id: "jd_stage3", milestone: -1, type: "chance", cat: "renji", realms: [2], highlight: true,
      cond: { cultMin: 3800, notFlag: "已登后期" },
      text: "论道会上，玄诚长老当众改口唤你一声「道兄」。会散后掌门留你饮茶，把半掌印信推到案上：「你这一峰的灯，如今比我的还亮。往后宗门的事，我倒想先来问你。」",
      choices: [
        { text: "接下这半掌的份量", sub: "弟子 +1 · 声望 +2 · 道心 +1", effect: { flag: "已登后期", factionDelta: { disciples: 1, rep: 2 }, daoXin: 1 }, result: "你没推辞。回到峰上，门下弟子齐齐来拜。你望着灯火次第亮起，忽然觉得肩上沉了些，心里却踏实。" },
        { text: "自陈道行尚浅", sub: "情报 +3 · 道心 +1", effect: { flag: "已登后期", factionDelta: { intel: 3 }, daoXin: 1 }, result: "掌门盯着你看了半晌，叹道：「你这般沉得住，怕是要走到我前头去。」他没再劝，只把一卷密档推过来——有些话，从今日起愿意跟你说。" }
      ] }
];
