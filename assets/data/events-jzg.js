/* 修仙记事本 · 价值观组 jzg_（v4.6 三线价值观：正=守序利他/魔=力量之上/散=生存利己） */
window.GAME_EVENTS_JZG = [
    /* ================= 组 1：路遇仇杀（jzg_a_*）· 象限 cond 规则 =================
     * 正道宗门 cond: { notFlag: "散修", notFlag2: "魔修" }（默认态，未选路线玩家也能选）
     * 正道散修 cond: { flag: "散修", notFlag: "魔修" }
     * 魔道宗门 cond: { flag: "魔宗" }
     * 魔道散修 cond: { flag: "魔修", notFlag: "魔宗" }
     * 每卡末位必留无 cond 兜底选项；背离价值观的选项带清晰代价（道心- / 声望- / 折资源）。
     */
    { id: "jzg_a1", type: "chance", cat: "zhandou", realms: [0], cond: { cultMax: 300 }, cooldown: 8,
      text: "山道拐角有人斗法。两个修士围着倒地之人搜身，那人道袍上的血已经洇成一片。",
      choices: [
        { text: "上前喝止，把人救下来", sub: "道心 +1 · 人情 +1", cond: { notFlag: "散修", notFlag2: "魔修" }, outcomes: [
          { weight: 7, result: "你一声断喝，那两个搜身的修士见你气度不俗，丢下几句狠话走了。伤者醒来拉着你的袖子不放，非要把这份恩记在宗门头上。", effect: { daoXin: 1, renqing: 1 } },
          { weight: 3, result: "你拦在中间挨了一记，伤者倒是保住了。掌心的口子养了大半个月才收口。", effect: { daoXin: 1, attrs: { "根骨": -3 } } }
        ] },
        { text: "抄根棍子把人拉出来", sub: "道心 +1 · 灵石 +6", cond: { flag: "散修", notFlag: "魔修" }, outcomes: [
          { weight: 7, result: "你一根扁担横在路中间，对方见你孤身也敢拦，反倒不恋战，丢下伤者走了。伤者把袋里的灵石都推给你当谢礼。", effect: { daoXin: 1, inv: { "灵石": 6 } } },
          { weight: 3, result: "你架着伤者跑出二里地，后背挨了一记。伤者保住了，你身上又添一道口子。", effect: { daoXin: 1, attrs: { "根骨": -3 } } }
        ] },
        { text: "等他们搜完走了，捡个现成", sub: "灵石 +14 · 气运 -2", cond: { flag: "魔宗" }, effect: { inv: { "灵石": 14 }, attrs: { "气运": -2 }, evil: 1 }, result: "搜身的人提着一半东西走了，剩下的袋子歪在草里。你顺手捞走。魔宗的老规矩：东西没有主人，就看谁手快。" },
        { text: "趁乱摸一把就走", sub: "灵石 +14 · 气运 -2", cond: { flag: "魔修", notFlag: "魔宗" }, effect: { inv: { "灵石": 14 }, attrs: { "气运": -2 } }, result: "那两人正忙着翻倒地之人的身，你贴着山壁摸走外散的灵石袋。散修的规矩，手快，腿也要快。" },
        { text: "绕过去，当没看见", sub: "道心 -1", cond: { notFlag: "魔修" }, effect: { daoXin: -1 }, result: "你脚步顿了一下，还是绕开了。那声闷响在你耳朵里响了一路，你走得越来越快。" },
        { text: "鬼使神差，伸手拦了一下", sub: "魔性 -1 · 灵石 -5", cond: { flag: "魔修" }, effect: { goodKarma: 1, inv: { "灵石": -5 } }, result: "你莫名其妙架开那人踹来的一脚，又扔下几块灵石让伤者自己去看伤。回过神，连你自己都愣了。" },
        { text: "不作声，远远看个热闹", result: "你在远处看了半盏茶的功夫，等人散了才动身，什么也没得着。" }
      ] },
    { id: "jzg_a2", type: "trib", cat: "zhandou", realms: [0], cond: { cultMin: 300, cultMax: 650 }, cooldown: 8,
      text: "天色擦黑，一伙人围住个落单的小修士，明晃晃要抢他的储物袋。你听见围堵的脚步声正从林子里合拢过来。",
      choices: [
        { text: "亮出宗门令牌喝退他们", sub: "道心 +1 · 人情 +1", cond: { notFlag: "散修", notFlag2: "魔修" }, outcomes: [
          { weight: 7, result: "令牌一亮，为首的认出印记，骂骂咧咧带人散了。小修士磕磕巴巴谢了半天，说回去一定让家里备礼上山。", effect: { daoXin: 1, renqing: 1 } },
          { weight: 3, result: "对方里头有个硬茬子，根本不买账。你护着小修士杀出重围，袖子被削去半截。", effect: { daoXin: 1, attrs: { "根骨": -4 } } }
        ] },
        { text: "带着他跑", sub: "道心 +1 · 灵石 +8", cond: { flag: "散修", notFlag: "魔修" }, outcomes: [
          { weight: 7, result: "你拉着人钻进林间小路，七拐八绕甩开了追兵。小修士把攒的灵石全掏出来，说救命之恩无以为报。", effect: { daoXin: 1, inv: { "灵石": 8 } } },
          { weight: 3, result: "跑岔了道，正面撞上一头妖狼。你边打边退，护着人撤出来时，腿上添了两道爪痕。", effect: { daoXin: 1, attrs: { "根骨": -4 } } }
        ] },
        { text: "吹声口哨，加入分账的那头", sub: "灵石 +18 · 气运 -2", cond: { flag: "魔宗" }, effect: { inv: { "灵石": 18 }, attrs: { "气运": -2 }, evil: 1 }, result: "为首的回头打量你，认出你袖口的纹记，哈哈一笑分了成给你。这种事，你在门里见得多。" },
        { text: "绕到外围，捡漏", sub: "灵石 +18 · 气运 -2", cond: { flag: "魔修", notFlag: "魔宗" }, effect: { inv: { "灵石": 18 }, attrs: { "气运": -2 } }, result: "你等他们得手散去，沿着原地转了一圈，果然有散落的灵石和半瓶丹药。黑吃黑，散修的老本行。" },
        { text: "捂紧袋子，绕路走", sub: "道心 -1", cond: { notFlag: "魔修" }, effect: { daoXin: -1 }, result: "你压低身形绕了过去。林子里传出的呼救声，你只当是风声。" },
        { text: "看不惯人多欺少，踹翻一个", sub: "魔性 -1 · 灵石 -6", cond: { flag: "魔修" }, effect: { goodKarma: 1, inv: { "灵石": -6 } }, result: "你一脚踹开那个动手的，又顺手把小修士往远处一推。事办完你才反应过来，这不该是魔修干的事。" },
        { text: "绕道走，自己的事要紧", result: "你从另一条路下了山。那头的动静渐渐远了，你始终没有回头。" }
      ] },
    { id: "jzg_a3", type: "trib", cat: "zhandou", realms: [1], cond: { cultMin: 650, cultMax: 1499 }, cooldown: 8,
      text: "官道上两个筑基修士当街厮杀，其中一个被打翻在地，储物袋滚落尘埃。围观的修士不少，个个袖手旁观。",
      choices: [
        { text: "出手分开二人，护住倒地之人", sub: "道心 +1 · 人情 +1", cond: { notFlag: "散修", notFlag2: "魔修" }, outcomes: [
          { weight: 7, result: "你横身插入战局，灵力一放，把两人各自震退。倒地之人被你扶起，连声道谢，说改日定当登门拜谢。", effect: { daoXin: 1, renqing: 1 } },
          { weight: 3, result: "那人趁机下了死手，你替倒地之人挡了一记。伤势不轻，倒把两个人都镇住了。", effect: { daoXin: 1, attrs: { "根骨": -6 } } }
        ] },
        { text: "背起伤者先撤", sub: "道心 +1 · 灵石 +30", cond: { flag: "散修", notFlag: "魔修" }, outcomes: [
          { weight: 7, result: "你趁乱背起伤者就走，一直送出三十里才放下。他取出三十块灵石当谢礼，说散修之间，患难见真章。", effect: { daoXin: 1, inv: { "灵石": 30 } } },
          { weight: 3, result: "追兵赶上来，你且战且退，把伤者塞进路边山洞才脱身。这一趟，几乎把家底赔进去。", effect: { daoXin: 1, attrs: { "根骨": -6 } } }
        ] },
        { text: "等尘埃落定，收那储物袋", sub: "灵石 +60 · 气运 -2", cond: { flag: "魔宗" }, effect: { inv: { "灵石": 60 }, attrs: { "气运": -2 }, evil: 1 }, result: "两人一伤一逃，散场之后你踱过去，把储物袋里的灵石和丹药顺走。筑基修士的存货，比炼气期厚实多了。" },
        { text: "混在人群里捡便宜", sub: "灵石 +60 · 气运 -2", cond: { flag: "魔修", notFlag: "魔宗" }, effect: { inv: { "灵石": 60 }, attrs: { "气运": -2 } }, result: "你贴着墙角慢悠悠踱过去，捡起半块炸开的储物袋碎片，里头的东西早就散了满地，你挑值钱的拿。" },
        { text: "与众人一般，袖手旁观", sub: "道心 -1", cond: { notFlag: "魔修" }, effect: { daoXin: -1 }, result: "你站在人群里，和所有人一样袖着手。那天晚上你练功到很晚，心一直静不下来。" },
        { text: "一时心软，分他一半", sub: "魔性 -1 · 灵石 -30", cond: { flag: "魔修", inv: { "灵石": 30 } }, effect: { goodKarma: 1, inv: { "灵石": -30 } }, result: "你捡起储物袋，看那人蜷在地上，鬼使神差又把一半塞回他手里。回过神你骂了自己一句，快步离开了。" },
        { text: "绕开这片是非之地", result: "你远远绕开官道，从巷子里穿了过去。坊市照常开张，方才的事没人再提。" }
      ] },
    { id: "jzg_a4", type: "chance", cat: "zhandou", realms: [2], cond: { cultMin: 1500, cultMax: 2600 }, cooldown: 8,
      text: "山道上，一位旧日仇家正追杀个落单的女修。女修重伤力竭，仇家那边已经动了杀心。",
      choices: [
        { text: "出面接下这桩梁子", sub: "道心 +1 · 声望 +1", cond: { notFlag: "散修", notFlag2: "魔修" }, outcomes: [
          { weight: 7, result: "你横剑立于二人之间，言明此女与你有旧。仇家掂量再三，到底给了你三分薄面，拱拱手收手走了。女修缓过气来，行了个大礼。", effect: { daoXin: 1, factionDelta: { rep: 1 } } },
          { weight: 3, result: "仇家不买账，当场动起手来。你护着女修且战且退，三日后才把人送到安全之地。后背那道伤，足足养了半年才好。", effect: { daoXin: 1, attrs: { "根骨": -8 } } }
        ] },
        { text: "出手相救，不图回报", sub: "道心 +1 · 声望 +1", cond: { flag: "散修", notFlag: "魔修" }, outcomes: [
          { weight: 7, result: "你以真元接住那记杀招，反手一道灵光逼退仇家。女修说今日救她，将来必有厚报。你摆摆手，散修的路，今日帮人，来日也有人帮自己。", effect: { daoXin: 1, factionDelta: { rep: 1 } } },
          { weight: 3, result: "仇家手段阴狠，你拼着受了一记也把人救了下来。女修安全了，你的伤势却拖了大半年。", effect: { daoXin: 1, attrs: { "根骨": -8 } } }
        ] },
        { text: "隐在暗处，收个渔翁之利", sub: "灵石 +120 · 气运 -2", cond: { flag: "魔宗" }, effect: { inv: { "灵石": 120 }, attrs: { "气运": -2 }, evil: 1 }, result: "你隐在暗处看完了这场追杀。等人散去后，你收走了那件无主的储物袋，又取了半件遗落的法器。无本买卖，收益最是肥厚。" },
        { text: "躲在暗处，等尘埃落定", sub: "灵石 +120 · 气运 -2", cond: { flag: "魔修", notFlag: "魔宗" }, effect: { inv: { "灵石": 120 }, attrs: { "气运": -2 } }, result: "你敛息蹲在山岩后头，等到动静全消才现身。战场还热着，你挑走值钱的东西，一炷香内撤了个干净。" },
        { text: "装作路过，目不斜视", sub: "道心 -1 · 声望 -1", cond: { notFlag: "魔修" }, effect: { daoXin: -1, factionDelta: { rep: -1 } }, result: "你低着头从山道另一侧过去，与那声求救擦肩而过。后来坊市里传开这事，有人提起当日有位真人路过，始终没有伸手。" },
        { text: "不知为何，出手救了她", sub: "魔性 -1 · 灵石 -80", cond: { flag: "魔修", inv: { "灵石": 80 } }, effect: { goodKarma: 1, inv: { "灵石": -80 } }, result: "你鬼使神差挡下那记杀招，又把女修送进附近坊市养伤。她走的时候要还你灵石，你摆了摆手，说就当今日心情好。" },
        { text: "绕路，不趟浑水", result: "你远远绕开那片山道，从河谷方向走。途中回头看过一次，那边已经没了动静。" }
      ] },
    { id: "jzg_a5", type: "trib", cat: "zhandou", realms: [2], cond: { cultMin: 2600, cultMax: 5199 }, cooldown: 8,
      text: "一场大战刚歇，两个重伤的修士互相搀着往林子里走，身后追兵将至。其中一个，你当年在炼气时见过。",
      choices: [
        { text: "接应他进山", sub: "道心 +1 · 声望 +1", cond: { notFlag: "散修", notFlag2: "魔修" }, outcomes: [
          { weight: 7, result: "你放出神识扫开追兵方向，接应二人入山安置。那人认出你来，说当年一别，没想到竟是你救的他，这份情他记下了。", effect: { daoXin: 1, factionDelta: { rep: 1 } } },
          { weight: 3, result: "追兵咬得紧，你断后时挨了一记重的。两人倒是平安进了山，你伤得大半年没出洞府。", effect: { daoXin: 1, attrs: { "根骨": -8 } } }
        ] },
        { text: "给条退路，不求回报", sub: "道心 +1 · 凝元丹 -2", cond: { flag: "散修", notFlag: "魔修", inv: { "凝元丹": 2 } }, effect: { daoXin: 1, inv: { "凝元丹": -2 }, factionDelta: { rep: 1 } }, result: "你把一条密道的位置说了，又塞过去两瓶疗伤丹。那人眼眶发红，说散修里能有这份情义的不多。" },
        { text: "借机收编，收两人当眼线", sub: "灵石 +150 · 气运 -2", cond: { flag: "魔宗" }, effect: { inv: { "灵石": 150 }, attrs: { "气运": -2 }, evil: 1 }, result: "你截住那两人，亮明魔宗身份，给他们两条路：入宗效力，或各安天命。两人对视一眼，齐齐跪了下来。你收到两只眼线，还有他们随身带的细软。" },
        { text: "搜刮他们身上的东西", sub: "灵石 +150 · 气运 -2", cond: { flag: "魔修", notFlag: "魔宗" }, effect: { inv: { "灵石": 150 }, attrs: { "气运": -2 } }, result: "你拦住二人，要他们留下储物袋买命。两人咬牙照办。你掂了掂袋子，放他们走了。趁人之危，是散修看家的本事。" },
        { text: "错开目光，从旁绕过", sub: "道心 -1 · 声望 -1", cond: { notFlag: "魔修" }, effect: { daoXin: -1, factionDelta: { rep: -1 } }, result: "你认得他，却还是错开了目光，从山坡另一侧下了山。后来听说他到底没能逃掉，你连着几晚没睡好。" },
        { text: "破了例，送他二人一程", sub: "魔性 -1 · 灵石 -90", cond: { flag: "魔修", inv: { "灵石": 90 } }, effect: { goodKarma: 1, inv: { "灵石": -90 } }, result: "你把追兵的注意引开，又指了条活路。那人怔怔看你半天，说没想到是你。你头也不回，只丢下一句：两清了。" },
        { text: "不上前，也不出声", result: "你隐在暗处没有露面。那两人互相搀着进了林子，能不能脱身，看他们自己的造化。你转身走了。" }
      ] },

    /* ================= 组 2：同道遇难求助（jzg_b_*）· 象限 cond 规则 =================
     * 正道宗门 cond: { notFlag: "散修", notFlag2: "魔修" }（默认态）
     * 正道散修 cond: { flag: "散修", notFlag: "魔修" }
     * 魔道宗门 cond: { flag: "魔宗" }
     * 魔道散修 cond: { flag: "魔修", notFlag: "魔宗" }
     * 正道倾囊积人情道心；魔道谈价收利；散修明哲保身零损失；背离者付代价。
     */
    { id: "jzg_b1", type: "chance", cat: "renji", realms: [0], cond: { cultMax: 300 }, cooldown: 8,
      text: "一个常在一处走动的道友受了重伤，药钱凑不齐，红着脸向你开口借钱。",
      choices: [
        { text: "倾囊相助", sub: "道心 +1 · 人情 +1 · 灵石 -8", cond: { notFlag: "散修", notFlag2: "魔修", inv: { "灵石": 8 } }, effect: { inv: { "灵石": -8 }, daoXin: 1, renqing: 1 }, result: "你把攒的灵石推过去，说治病要紧。他攥着灵石，半天说不出话。这份情，从此记在你账上了。" },
        { text: "借他一半，剩一半自己留着", sub: "道心 +1 · 人情 +1 · 灵石 -5", cond: { flag: "散修", notFlag: "魔修", inv: { "灵石": 5 } }, effect: { inv: { "灵石": -5 }, daoXin: 1, renqing: 1 }, result: "散修的日子，兜里不能空。你匀出一半给他，他懂你的难处，也没多说什么。" },
        { text: "借钱可以，算三分利", sub: "本金 -10 · 利息看人还", cond: { flag: "魔宗", inv: { "灵石": 10 } }, effect: { inv: { "灵石": -10 } }, outcomes: [
          { weight: 7, result: "他伤好后东拼西凑，连本带利还了你十四块灵石。你数了两遍，小心收进袋里。", effect: { inv: { "灵石": 14 } } },
          { weight: 3, result: "他还了本钱，利息一时凑不齐，把一本祖传的炼气心得抵给了你。你翻了翻，字句倒是扎实。", effect: { inv: { "灵石": 10 }, attrs: { "悟性": 1 } } }
        ] },
        { text: "钱可以借，拿东西来押", sub: "本金 -8 · 东西看他还", cond: { flag: "魔修", notFlag: "魔宗", inv: { "灵石": 8 } }, effect: { inv: { "灵石": -8 } }, outcomes: [
          { weight: 7, result: "他拿不出钱，把半瓶聚气丹押在你手里。说好的一月为期，到期他果然没来取。", effect: { inv: { "聚气丹": 3 }, attrs: { "气运": -1 } } },
          { weight: 3, result: "他咬着牙把钱还了，东西也赎回去了。只是从那以后，他见你都绕着走。", effect: { inv: { "灵石": 8 } } }
        ] },
        { text: "推说手头也紧", sub: "道心 -1", cond: { notFlag: "魔修" }, effect: { daoXin: -1 }, result: "你推说手头也紧，他信了，又去找别人。后来他钱凑齐了，伤也养好了，只是再没跟你提过一个字。" },
        { text: "没谈利息，直接把钱塞给他", sub: "魔性 -1 · 灵石 -8", cond: { flag: "魔修", inv: { "灵石": 8 } }, effect: { goodKarma: 1, inv: { "灵石": -8 } }, result: "他病恹恹的样子让你烦，你索性把钱塞过去，说不用还了。他愣在原地，你头也不回地走了。" },
        { text: "不借，明哲保身", result: "你摇摇头，说拿不出这么多。他也没再开口，只低头咳了两声。你出了门，风很大，你裹了裹衣襟。" }
      ] },
    { id: "jzg_b2", type: "chance", cat: "renji", realms: [0], cond: { cultMin: 300, cultMax: 650 }, cooldown: 8,
      text: "道友外出被妖蛇咬伤，毒性入体，需要一味药引续命。坊市有卖，价钱把他家底掏空还差一截。",
      choices: [
        { text: "替他补上药钱", sub: "道心 +1 · 人情 +1 · 灵石 -10", cond: { notFlag: "散修", notFlag2: "魔修", inv: { "灵石": 10 } }, effect: { inv: { "灵石": -10 }, daoXin: 1, renqing: 1 }, result: "你补上缺口，药引当夜就入了药。他缓过气来，拉着你的手说不出话，只说这条命是你给的。" },
        { text: "陪他上山另寻药引", sub: "道心 +1 · 有险", cond: { flag: "散修", notFlag: "魔修" }, outcomes: [
          { weight: 7, result: "你们在山崖缝里找到一株替代的灵草，药性分毫不差。省下的灵石，他全塞给了你。", effect: { daoXin: 1, inv: { "灵石": 6 } } },
          { weight: 3, result: "那株灵草旁盘着条守药的妖蛇，你替他挡了一下，草药倒是采到了。", effect: { daoXin: 1, attrs: { "根骨": -4 } } }
        ] },
        { text: "药钱可以出，他得写欠条", sub: "灵石 +6 · 人情 +1", cond: { flag: "魔宗", inv: { "灵石": 10 } }, effect: { inv: { "灵石": -10 }, renqing: 1 }, outcomes: [
          { weight: 7, result: "他伤好后卖了家当还你，连本带利十六块。欠条你还给他，他当场撕了。", effect: { inv: { "灵石": 16 } } },
          { weight: 3, result: "他还不出，把一门旁门小术教给了你抵债。路子野，但着实管用。", effect: { inv: { "灵石": 10 }, attrs: { "神识": 1 } } }
        ] },
        { text: "药引可以代买，抽三成", sub: "灵石 +6 · 有风险", cond: { flag: "魔修", notFlag: "魔宗", inv: { "灵石": 10 } }, effect: { inv: { "灵石": -10 } }, outcomes: [
          { weight: 7, result: "他急着救命，答应了你的条件。药到病除，他多付的三成，你收得心安理得。", effect: { inv: { "灵石": 13 } } },
          { weight: 3, result: "他嘴上应着，伤好之后却赖账，只还了本钱。你吃了记哑巴亏，倒也记住了这人靠不住。", effect: { inv: { "灵石": 10 }, attrs: { "气运": -1 } } }
        ] },
        { text: "囊中羞涩，爱莫能助", sub: "道心 -1", cond: { notFlag: "魔修" }, effect: { daoXin: -1 }, result: "你摸了摸口袋，到底没应这个口。后来听说他挨过来了，只是戒心重了许多，见谁都不再轻易开口。" },
        { text: "不问回报，把药钱垫了", sub: "魔性 -1 · 灵石 -10", cond: { flag: "魔修", inv: { "灵石": 10 } }, effect: { goodKarma: 1, inv: { "灵石": -10 } }, result: "你闷声把药钱付了，转身就走了。他在后头喊你的名字，你始终没有回头。做人留一线，这话你从前觉得可笑。" },
        { text: "实在帮不上，告辞", result: "你说了几句场面话，便起身告辞了。听说那道友后来熬过来了，只是跟你，再没从前亲近。" }
      ] },
    { id: "jzg_b3", type: "chance", cat: "renji", realms: [1], cond: { cultMin: 650, cultMax: 1499 }, cooldown: 8,
      text: "筑基同道被人下了毒，真元溃散，求到你门上，想借一枚凝元丹吊住修为。",
      choices: [
        { text: "借丹救命", sub: "道心 +1 · 人情 +1 · 凝元丹 -1", cond: { notFlag: "散修", notFlag2: "魔修", inv: { "凝元丹": 1 } }, effect: { inv: { "凝元丹": -1 }, daoXin: 1, renqing: 1 }, result: "你递过凝元丹，又守了他一夜。他稳住修为后长揖到地，说此恩此情，来日必定报答。" },
        { text: "替他跑腿买丹，不赚差价", sub: "道心 +1 · 人情 +1 · 灵石 -40", cond: { flag: "散修", notFlag: "魔修", inv: { "灵石": 40 } }, effect: { inv: { "灵石": -40 }, daoXin: 1, renqing: 1 }, result: "你跑了两家坊市，替他砍下价，把凝元丹送到他手上。他卧床半个月，醒来第一件事就是打听你的名字。" },
        { text: "丹可以借，要利息加抵押", sub: "凝元丹 -1 · 本息 +45", cond: { flag: "魔宗", inv: { "凝元丹": 1 } }, effect: { inv: { "凝元丹": -1 } }, outcomes: [
          { weight: 7, result: "他东拼西凑还了你一笔，连本带息四十五块灵石。你数完收进袋里，满意地点了点头。", effect: { inv: { "灵石": 45 } } },
          { weight: 3, result: "他还不出钱，把一件用得上的法器抵了给你。", effect: { inv: { "灵石": 10 }, artifact: { "法器": 1 } } }
        ] },
        { text: "丹可以卖他，按市价翻倍", sub: "凝元丹 -1 · 灵石 +55", cond: { flag: "魔修", notFlag: "魔宗", inv: { "凝元丹": 1 } }, effect: { inv: { "凝元丹": -1 } }, outcomes: [
          { weight: 7, result: "救人如救火，他咬牙掏了双倍价钱。你收了钱，把丹递了过去，从此两不相欠。", effect: { inv: { "灵石": 55 } } },
          { weight: 3, result: "他嫌贵，转头找了别家，你的凝元丹原样揣了回来。", effect: { inv: { "凝元丹": 1 } } }
        ] },
        { text: "推说丹药另有急用", sub: "道心 -1", cond: { notFlag: "魔修" }, effect: { daoXin: -1 }, result: "你借口丹药另有急用，把人打发了。他勉强撑着笑，连声说打扰了。门关上那刻，你知道有些东西已经断了。" },
        { text: "替他跑前跑后，分文不取", sub: "魔性 -1 · 气运 -1", cond: { flag: "魔修" }, effect: { goodKarma: 1, attrs: { "气运": -1 } }, result: "你陪他跑了三家丹坊，又替他垫了话求了情。三天功夫搭进去，自己的修炼都耽搁了。" },
        { text: "爱莫能助，送客", result: "你客客气气把人送出门，回头关好洞府。各人有各人的劫，你顾好自己的道途就够了。" }
      ] },
    { id: "jzg_b4", type: "trib", cat: "renji", realms: [2], cond: { cultMin: 1500, cultMax: 2600 }, cooldown: 8,
      text: "当年一道历练的故交真人重伤逃来，身后有仇家追索。他求你收留几日，等风声过去。",
      choices: [
        { text: "收留他，亲自坐镇", sub: "道心 +1 · 声望 +1", cond: { notFlag: "散修", notFlag2: "魔修" }, outcomes: [
          { weight: 7, result: "你安排他住进后山别院，又放出风声说此间无外人。仇家摸到山门前，被你一句话顶了回去。故交伤愈离去，说这份恩情他记一辈子。", effect: { daoXin: 1, factionDelta: { rep: 1 } } },
          { weight: 3, result: "仇家不依不饶，逼你当场交人。你顶住了，只是两家的梁子就此结下，往后添了不少麻烦。", effect: { daoXin: 1, factionDelta: { rep: -1 } } }
        ] },
        { text: "把人藏进密窟", sub: "道心 +1 · 声望 +1", cond: { flag: "散修", notFlag: "魔修" }, outcomes: [
          { weight: 7, result: "你把故交送进早年备下的密窟，又送了三日口粮。风声过后，他脱险归来，当众敬了你一杯酒。", effect: { daoXin: 1, factionDelta: { rep: 1 } } },
          { weight: 3, result: "仇家不知从哪得了信，摸到密窟附近。你们且战且退，连换三个藏身处才脱身。", effect: { daoXin: 1, attrs: { "根骨": -6 } } }
        ] },
        { text: "收留可以，要代价", sub: "灵石 +120 · 气运 -2", cond: { flag: "魔宗" }, effect: { inv: { "灵石": 120 }, attrs: { "气运": -2 }, evil: 1 }, result: "你答应收留他三日，条件是把他随身那件法器留下。他犹豫半晌，还是解下了腰间的法器。你收了东西，话也说到了：出了这扇门，从此两不相欠。" },
        { text: "转手把他卖了", sub: "灵石 +150 · 有风险", cond: { flag: "魔修", notFlag: "魔宗" }, outcomes: [
          { weight: 7, result: "你把他的行踪卖给了仇家，换了一百五十块灵石。他后来脱了身，只是查来查去，查到了你头上。", effect: { inv: { "灵石": 150 }, attrs: { "气运": -2 } } },
          { weight: 3, result: "仇家是个硬茬，当场就动了手。你趁着乱子抽身，灵石没捞着，还惹了一身骚。", effect: { attrs: { "气运": -3 } } }
        ] },
        { text: "把人拒之门外", sub: "道心 -1 · 声望 -1", cond: { notFlag: "魔修" }, effect: { daoXin: -1, factionDelta: { rep: -1 } }, result: "你说山门不便，婉言拒绝了。他站在洞府门外沉默许久，才转身走了。后来这事传开，有人说你薄情，你也没辩解。" },
        { text: "分文未取，护了他三日", sub: "魔性 -1 · 灵石 -80", cond: { flag: "魔修", inv: { "灵石": 80 } }, effect: { goodKarma: 1, inv: { "灵石": -80 } }, result: "你没收他一件东西，反倒搭进去八十块灵石替他打点追兵。他走时欲言又止，你摆摆手说，就当还当年那壶酒的人情。" },
        { text: "不相干，避为上策", result: "你避而不见，让人回了话：山门不便。他识趣地走了。后来听说他到底脱了身，只是再没来找过你。" }
      ] },
    { id: "jzg_b5", type: "chance", cat: "renji", realms: [2], cond: { cultMin: 2600, cultMax: 5199 }, cooldown: 8,
      text: "一个炼气的小修士跪在你的洞府前，浑身是伤，说他师父被仇家抓走，他侥幸逃出，走投无路，求真人收留。",
      choices: [
        { text: "收他入门下", sub: "道心 +1 · 声望 +1", cond: { notFlag: "散修", notFlag2: "魔修" }, outcomes: [
          { weight: 7, result: "你考校了他的心性，点头把他收下了。他磕了三个头，从此见谁都说是你门下的人。宗门里渐渐有人叫你一声师伯。", effect: { daoXin: 1, factionDelta: { rep: 1 } } },
          { weight: 3, result: "仇家寻仇上门，你护住小修士，跟人硬碰了一场。事后坊间传开，说你是条汉子。", effect: { daoXin: 1, attrs: { "根骨": -6 } } }
        ] },
        { text: "指点他去处，赠他盘缠", sub: "道心 +1 · 灵石 -60", cond: { flag: "散修", notFlag: "魔修", inv: { "灵石": 60 } }, effect: { daoXin: 1, inv: { "灵石": -60 }, factionDelta: { rep: 1 } }, result: "你写了封引荐信，又塞给他六十块灵石。他千恩万谢地走了，说等出人头地，一定回来谢你。" },
        { text: "收为记名弟子，替宗门做事", sub: "灵石 +100 · 弟子 +1", cond: { flag: "魔宗" }, effect: { inv: { "灵石": 100 }, factionDelta: { disciples: 1 }, evil: 1 }, result: "你收他做了记名弟子，丢给他一册魔功入门。他根基浅，正是能吃苦的年纪。宗门里添了双干活的手，你也多了个能使唤的人。" },
        { text: "留他当个跑腿的", sub: "灵石 +100 · 气运 -2", cond: { flag: "魔修", notFlag: "魔宗" }, effect: { inv: { "灵石": 100 }, attrs: { "气运": -2 } }, result: "你留他下来打杂，管吃管住，灵石照旧由他自赚自花。你图他手脚勤快，他图个栖身之处，彼此各取所需。" },
        { text: "差人打发了他", sub: "道心 -1 · 声望 -1", cond: { notFlag: "魔修" }, effect: { daoXin: -1, factionDelta: { rep: -1 } }, result: "你让门人给了他一顿饱饭，又送出山门。他回头看了三次，到底没等到你开口。后来听说他去了别处，混得平平常常。" },
        { text: "没让他磕头，指了条明路", sub: "魔性 -1 · 灵石 -60", cond: { flag: "魔修", inv: { "灵石": 60 } }, effect: { goodKarma: 1, inv: { "灵石": -60 } }, result: "你没受他的头，反倒把他扶起来，指了条不必跪人的路。他走出去老远还回头看你，你只当没看见。" },
        { text: "叫人送他下山", result: "你差人送了他一顿饭和几块灵石，把人送下了山。仙路茫茫，能帮的也就这一程了。" }
      ] },

    /* ================= 组 3：坊市见弱被欺（jzg_c_*）· 象限 cond 规则 =================
     * 正道宗门 cond: { notFlag: "散修", notFlag2: "魔修" }（默认态）
     * 正道散修 cond: { flag: "散修", notFlag: "魔修" }
     * 魔道宗门 cond: { flag: "魔宗" }
     * 魔道散修 cond: { flag: "魔修", notFlag: "魔宗" }
     * 正道仗义执言积道心声望；魔道收保护费速取灵石；散修当作没看见无事一身轻。
     */
    { id: "jzg_c1", type: "chance", cat: "renji", realms: [0], cond: { cultMax: 300 }, cooldown: 8,
      text: "坊市角落，一个修士揪着凡人摊贩的衣领，说他卖的灵草是假货，要砸摊赔钱。摊贩急得直作揖。",
      choices: [
        { text: "上前评理，替摊贩说话", sub: "道心 +1 · 人情 +1", cond: { notFlag: "散修", notFlag2: "魔修" }, outcomes: [
          { weight: 7, result: "你仔细验了那株灵草，分明是真的。那修士理亏，丢下几句狠话走了。摊贩千恩万谢，硬塞给你一包灵茶。", effect: { daoXin: 1, renqing: 1 } },
          { weight: 3, result: "那修士恼羞成怒，跟你动起手来。你护住摊贩，脸上挨了一记，人也帮你一起骂走了他。", effect: { daoXin: 1, attrs: { "根骨": -3 } } }
        ] },
        { text: "帮着说句公道话", sub: "道心 +1 · 灵石 +3", cond: { flag: "散修", notFlag: "魔修" }, outcomes: [
          { weight: 7, result: "你站过去说了句实话，围观的散修也跟着帮腔。那人灰溜溜走了，摊贩塞给你几块灵石当谢礼。", effect: { daoXin: 1, inv: { "灵石": 3 } } },
          { weight: 3, result: "那修士记恨上你，堵了你两次。你绕了半个月的巷子才甩脱。", effect: { daoXin: 1, attrs: { "气运": -1 } } }
        ] },
        { text: "帮他摆平，收个供奉", sub: "灵石 +10 · 气运 -1", cond: { flag: "魔宗" }, effect: { inv: { "灵石": 10 }, attrs: { "气运": -1 }, evil: 1 }, result: "你上前拍了拍那修士的肩膀，报了魔宗的名号。那人脸色一变，转身就跑了。摊贩千恩万谢，你收了点意思意思的供奉。" },
        { text: "和稀泥，两头收钱", sub: "灵石 +10 · 气运 -1", cond: { flag: "魔修", notFlag: "魔宗" }, effect: { inv: { "灵石": 10 }, attrs: { "气运": -1 } }, result: "你对那修士说闹大了不好收场，又对摊贩说破财消灾。两头各收几块灵石，事就这么平了。" },
        { text: "站着没动", sub: "道心 -1", cond: { notFlag: "魔修" }, effect: { daoXin: -1 }, result: "你站在人群里看着。摊贩作揖作到额头见血，你始终没有开口。后来你再去坊市，总绕开那个角落。" },
        { text: "看不过眼，踹了那人一脚", sub: "魔性 -1 · 灵石 -5", cond: { flag: "魔修" }, effect: { goodKarma: 1, inv: { "灵石": -5 } }, result: "你一脚踹开那修士，又扔下五块灵石赔摊贩的损失。回过神来你自己都纳闷，这闲事怎么就管了。" },
        { text: "买完东西，转身就走", result: "你低头挑完自己要的东西，付了钱就走。身后的吵闹声渐渐远了，你始终没有回头。" }
      ] },
    { id: "jzg_c2", type: "chance", cat: "renji", realms: [0], cond: { cultMin: 300, cultMax: 650 }, cooldown: 8,
      text: "坊市口，一个老修士当街羞辱一个刚入门的小辈，说他是野路子出身，把人家辛苦采的灵草踩在脚下。",
      choices: [
        { text: "出面训斥那老修士", sub: "道心 +1 · 人情 +1", cond: { notFlag: "散修", notFlag2: "魔修" }, outcomes: [
          { weight: 7, result: "你上前几句话把那老修士说得下不来台，他悻悻走了。小辈捡起灵草，朝你深深一揖，说记住了你的样子。", effect: { daoXin: 1, renqing: 1 } },
          { weight: 3, result: "那老修士搬出他背后的靠山，跟你纠缠不清。你懒得跟他耗，护着小辈走了，回头还得了个跋扈的名声。", effect: { daoXin: 1, attrs: { "气运": -1 } } }
        ] },
        { text: "帮小辈把灵草捡起来", sub: "道心 +1 · 灵石 +4", cond: { flag: "散修", notFlag: "魔修" }, outcomes: [
          { weight: 7, result: "你蹲下去帮他把灵草一根根捡起，又传授了几句看摊的眼力。他红着眼说，散修里也有好人。", effect: { daoXin: 1, inv: { "灵石": 4 } } },
          { weight: 3, result: "老修士骂你多管闲事，你俩当场呛了几句。没动手，但坊市里都传你俩不对付。", effect: { daoXin: 1, attrs: { "气运": -1 } } }
        ] },
        { text: "让老修士交份孝敬，保他没事", sub: "灵石 +12 · 气运 -1", cond: { flag: "魔宗" }, effect: { inv: { "灵石": 12 }, attrs: { "气运": -1 }, evil: 1 }, result: "你把那老修士叫到一旁，报上了名号。他立刻堆起笑，表示愿意交份孝敬。你收了灵石，挥挥手让他走了。" },
        { text: "两头都收点好处", sub: "灵石 +12 · 气运 -1", cond: { flag: "魔修", notFlag: "魔宗" }, effect: { inv: { "灵石": 12 }, attrs: { "气运": -1 } }, result: "你对老修士说别闹出人命，又对小辈说破财免灾。两边各塞了点灵石，你两头都收了。" },
        { text: "当没看见，快步走过", sub: "道心 -1", cond: { notFlag: "魔修" }, effect: { daoXin: -1 }, result: "你低着头从旁走过，小辈被踩碎的灵草，你只当没看见。那天夜里，你打坐时总有些心浮气躁。" },
        { text: "把灵草捡起来还他", sub: "魔性 -1 · 灵石 -5", cond: { flag: "魔修" }, effect: { goodKarma: 1, inv: { "灵石": -5 } }, result: "你弯腰把踩烂的灵草捡起来，又扔下几块灵石让他重新置办。老修士看你一眼，没敢再吭声。" },
        { text: "凑个热闹，不作声", result: "你在人群里看了一会儿，始终没有插嘴。这种事，坊市里日日都有，你管不过来。" }
      ] },
    { id: "jzg_c3", type: "chance", cat: "renji", realms: [1], cond: { cultMin: 650, cultMax: 1499 }, cooldown: 8,
      text: "坊市上，一个筑基修士看中凡人老者的传家砚台，强按低价要买。老者跪在地上，说这是祖上传下来的。",
      choices: [
        { text: "出价买下，物归原主", sub: "道心 +1 · 人情 +1 · 灵石 -40", cond: { notFlag: "散修", notFlag2: "魔修", inv: { "灵石": 40 } }, effect: { inv: { "灵石": -40 }, daoXin: 1, renqing: 1 }, result: "你出了个公道价把砚台买下，转手又还给老者。那筑基修士脸色难看，到底没敢再纠缠。老者跪在地上要给你磕头，你把人扶住了。" },
        { text: "居中评理，劝双方各退一步", sub: "道心 +1 · 灵石 +30", cond: { flag: "散修", notFlag: "魔修" }, outcomes: [
          { weight: 7, result: "你几句话让那筑基修士给了个说得过去的价，老者也点了头。完事老者悄悄塞给你几块灵石，说这世道，讲理的人越来越少了。", effect: { daoXin: 1, inv: { "灵石": 30 } } },
          { weight: 3, result: "那筑基修士嫌你多事，转头把你也记恨上了。你在坊市的生意，那段时间总被人使绊子。", effect: { daoXin: 1, attrs: { "气运": -1 } } }
        ] },
        { text: "给筑基修士搭个台阶，抽成", sub: "灵石 +50 · 气运 -1", cond: { flag: "魔宗" }, effect: { inv: { "灵石": 50 }, attrs: { "气运": -1 }, evil: 1 }, result: "你上去三言两语，让那筑基修士添了点钱，又让老者认了这笔账。事平之后，两边都给你塞了份谢意。" },
        { text: "等他们谈崩，低价接盘", sub: "灵石 +50 · 有风险", cond: { flag: "魔修", notFlag: "魔宗", inv: { "灵石": 30 } }, effect: { inv: { "灵石": -30 } }, outcomes: [
          { weight: 7, result: "那筑基修士嫌贵走了，老者急着出手。你出个不高不低的价，砚台到手，转头卖了八十。", effect: { inv: { "灵石": 80 }, attrs: { "气运": -1 } } },
          { weight: 3, result: "老者硬气，宁可砸了也不贱卖。你白蹲了半天，一分钱也没赚到。", effect: { inv: { "灵石": -30 }, attrs: { "气运": -2 } } }
        ] },
        { text: "走开，装作没看见", sub: "道心 -1 · 声望 -1", cond: { notFlag: "魔修" }, effect: { daoXin: -1, factionDelta: { rep: -1 } }, result: "你从摊子前走过去，始终没有停步。老者的哭声在身后响了一阵，你始终没回头。坊市里渐渐有人说，那位真人不大管闲事。" },
        { text: "替老者出了这口气", sub: "魔性 -1 · 灵石 -30", cond: { flag: "魔修", inv: { "灵石": 30 } }, effect: { goodKarma: 1, inv: { "灵石": -30 } }, result: "你出面把砚台按公道价买下，还给了老者。那筑基修士瞪你一眼，你回瞪回去，他先移开了目光。" },
        { text: "远远绕开这摊子", result: "你远远绕开那处摊子，从别的巷子穿了过去。坊市照旧喧闹，那桩事没人再提。" }
      ] },
    { id: "jzg_c4", type: "chance", cat: "renji", realms: [2], cond: { cultMin: 1500, cultMax: 2600 }, cooldown: 8,
      text: "坊市大商铺门口，掌柜的堵着对孤儿寡母，说账再不还清，就要押走田契房契抵债。妇人抱着孩子哭，围观的修士不少，没一个上前。",
      choices: [
        { text: "过问此事，当众对账", sub: "道心 +1 · 声望 +1", cond: { notFlag: "散修", notFlag2: "魔修" }, outcomes: [
          { weight: 7, result: "你当场调来账本一页页对，掌柜的手脚不干净，反倒是他理亏。你让他按实情减了息钱，又定下还账的期限。妇人带着孩子磕了头，围观的修士都看在眼里。", effect: { daoXin: 1, factionDelta: { rep: 1 } } },
          { weight: 3, result: "掌柜的不肯认账，搬出背后东家压你。你顶着压力办完了这事，坊市里有人敬你，也有人恨你。", effect: { daoXin: 1, factionDelta: { rep: 1 } } }
        ] },
        { text: "出钱替他们平账", sub: "道心 +1 · 灵石 -80", cond: { flag: "散修", notFlag: "魔修", inv: { "灵石": 80 } }, effect: { daoXin: 1, inv: { "灵石": -80 }, factionDelta: { rep: 1 } }, result: "你出面把账平了，又交代掌柜的不许再添利息。妇人拉着孩子跪了又跪，你只说赶紧带孩子离开这是非之地。" },
        { text: "让掌柜的留几分情面，收好处", sub: "灵石 +90 · 气运 -1", cond: { flag: "魔宗" }, effect: { inv: { "灵石": 90 }, attrs: { "气运": -1 }, evil: 1 }, result: "你把掌柜的叫到一边，报了魔宗的名号，让他见好就收。掌柜的连连点头，顺手给你塞了份孝敬。那对母子保住了一半家业，你的袋里多了一笔。" },
        { text: "居中斡旋，两头抽成", sub: "灵石 +90 · 气运 -1", cond: { flag: "魔修", notFlag: "魔宗" }, effect: { inv: { "灵石": 90 }, attrs: { "气运": -1 } }, result: "你两头传话，让掌柜的松了口，让妇人多宽限几日。事办成，两边都说欠你个人情，各自塞了灵石。" },
        { text: "看了一会儿，转身走了", sub: "道心 -1 · 声望 -1", cond: { notFlag: "魔修" }, effect: { daoXin: -1, factionDelta: { rep: -1 } }, result: "你站着看了一会儿，到底没上前。妇人抱着孩子的哭声，你走出去三条街还能听见。" },
        { text: "破例替他们平了账", sub: "魔性 -1 · 灵石 -80", cond: { flag: "魔修", inv: { "灵石": 80 } }, effect: { goodKarma: 1, inv: { "灵石": -80 } }, result: "你把灵石拍在柜台上，当面把账平了。掌柜的愣住，你只丢下一句：账我结了，人你也带走。转身的时候，你自己都觉得不像自己。" },
        { text: "绕开那门口", result: "你从对街绕了过去，没往门口凑。那哭声你听见了，只是没停下脚步。" }
      ] },
    { id: "jzg_c5", type: "trib", cat: "zhandou", realms: [2], cond: { cultMin: 2600, cultMax: 5199 }, cooldown: 8,
      text: "坊市茶楼前，一个金丹散修正当众折辱一个小宗门最后的传人，逼她交出宗门信物。女修咬着牙不肯，膝盖已经见血。",
      choices: [
        { text: "起身拦下，护住那女修", sub: "道心 +1 · 声望 +1", cond: { notFlag: "散修", notFlag2: "魔修" }, outcomes: [
          { weight: 7, result: "你起身拦在中间，几句话点破那散修仗势欺人。他掂量了你的修为，到底收了手。女修捧着信物给你行礼，说这份恩情她记下了。", effect: { daoXin: 1, factionDelta: { rep: 1 } } },
          { weight: 3, result: "那散修是个硬茬，跟你交了手。你护着女修退走，胜是胜了，也落了个好斗的名声。", effect: { daoXin: 1, factionDelta: { rep: 1 } } }
        ] },
        { text: "带她脱身", sub: "道心 +1 · 声望 +1", cond: { flag: "散修", notFlag: "魔修" }, outcomes: [
          { weight: 7, result: "你趁乱拉着女修从后巷脱身，一路送出坊市。她谢了又谢，说等安顿下来，一定登门道谢。", effect: { daoXin: 1, factionDelta: { rep: 1 } } },
          { weight: 3, result: "那散修追上来，你且战且退。人护住了，你背上挨了一记，养了两个月。", effect: { daoXin: 1, attrs: { "根骨": -8 } } }
        ] },
        { text: "替那散修把事办妥，收个中人钱", sub: "灵石 +130 · 气运 -1", cond: { flag: "魔宗" }, effect: { inv: { "灵石": 130 }, attrs: { "气运": -1 }, evil: 1 }, result: "你出面劝那女修识相，又劝那散修见好就收。两边都给了你面子，信物的事就此揭过，你两头都收了份谢礼。" },
        { text: "等信物落地，捡个便宜", sub: "灵石 +130 · 气运 -1", cond: { flag: "魔修", notFlag: "魔宗" }, effect: { inv: { "灵石": 130 }, attrs: { "气运": -1 } }, result: "你蹲在二楼窗边看完了这出戏。散修走后，你下楼捡起那枚被踩进泥里的信物，转手卖给收古董的，换了一笔灵石。" },
        { text: "放下茶钱，走了", sub: "道心 -1 · 声望 -1", cond: { notFlag: "魔修" }, effect: { daoXin: -1, factionDelta: { rep: -1 } }, result: "你放下茶钱起身，从侧门走了。那女修咬破嘴唇也不肯松口的样子，你记了很久。" },
        { text: "拍桌子站了出来", sub: "魔性 -1 · 灵石 -80", cond: { flag: "魔修", inv: { "灵石": 80 } }, effect: { goodKarma: 1, inv: { "灵石": -80 } }, result: "你一拍桌子站起来，把那散修骂了个没脸。事闹大了，最后你出了八十块灵石替女修圆了场。回过神，你骂自己多管闲事。" },
        { text: "茶照喝，事不管", result: "你坐在二楼把茶喝完了。楼下的事，你从头到尾没有看一眼。茶钱放下，你起身下楼，从另一头走了。" }
      ] },

    /* ================= 组 4：无主机缘与受伤同道争夺（jzg_d_*）· 象限 cond 规则 =================
     * 正道宗门 cond: { notFlag: "散修", notFlag2: "魔修" }（默认态）
     * 正道散修 cond: { flag: "散修", notFlag: "魔修" }
     * 魔道宗门 cond: { flag: "魔宗" }
     * 魔道散修 cond: { flag: "魔修", notFlag: "魔宗" }
     * 正道让给伤者积道心声望；魔道强夺速取灵石；散修等两败俱伤再捡，零风险稳赚。
     */
    { id: "jzg_d1", type: "chance", cat: "jiyuan", realms: [0], cond: { cultMax: 300 }, cooldown: 8,
      text: "山溪边，你发现一株罕见的灵药，同时一个受伤的修士也看见了。他伤得连路都走不稳，眼睛却盯着灵药不放。",
      choices: [
        { text: "让他先取，说句场面话", sub: "道心 +1 · 人情 +1", cond: { notFlag: "散修", notFlag2: "魔修" }, effect: { daoXin: 1, renqing: 1 }, result: "你看他伤得重，拱手说灵药归你。他愣了半天，非要分你一半。你推辞不过，收下一小半，他连连作揖。" },
        { text: "分他一半，各取所需", sub: "道心 +1 · 灵石 +4", cond: { flag: "散修", notFlag: "魔修" }, outcomes: [
          { weight: 7, result: "你说见者有份，匀了他一半。他感激得不行，说日后有事尽管找他。剩下的你拿去坊市，卖了个好价钱。", effect: { daoXin: 1, inv: { "灵石": 4 } } },
          { weight: 3, result: "他嘴上答应，趁你不备多挖了一截。你懒得计较，全当学了个教训。", effect: { daoXin: 1, inv: { "灵石": 2 } } }
        ] },
        { text: "趁他伤重，把灵药全取走", sub: "灵石 +15 · 气运 -2", cond: { flag: "魔宗" }, effect: { inv: { "灵石": 15 }, attrs: { "气运": -2 }, evil: 1 }, result: "你三两步上前连根挖走，回头看了他一眼。他张了张嘴，到底没敢出声。弱肉强食，魔宗的道理就是这么教的。" },
        { text: "捡现成的，不跟他客气", sub: "灵石 +15 · 气运 -2", cond: { flag: "魔修", notFlag: "魔宗" }, effect: { inv: { "灵石": 15 }, attrs: { "气运": -2 } }, result: "你先他一步把灵药连根起了，头也不回地走。身后那人喊了两声，见你没停，也就没了声。" },
        { text: "趁他伤重，先下手为强", sub: "道心 -1 · 灵石 +15", cond: { notFlag: "魔修" }, effect: { daoXin: -1, inv: { "灵石": 15 } }, result: "你抢在他前面把灵药起了。回去的路上你走得很急，连脚步都乱了。灵药卖了，钱拿着却有些烫手。" },
        { text: "分文不取，把灵药让给他", sub: "魔性 -1 · 灵石 -10", cond: { flag: "魔修", inv: { "灵石": 10 } }, effect: { goodKarma: 1, inv: { "灵石": -10 } }, result: "你把灵药让给了他，还贴了几块灵石让他去看伤。他愣在原地，你摆摆手走了，心里头说不清是什么滋味。" },
        { text: "跟他谈个价，灵石了事", sub: "稳赚 · 灵石 +8", result: "你开口跟他谈价。他伤重在身，不愿纠缠，掏灵石买下了灵药。你没动手，也分毫没有吃亏。" , effect: { inv: { "灵石": 8 } } }
      ] },
    { id: "jzg_d2", type: "trib", cat: "jiyuan", realms: [0], cond: { cultMin: 300, cultMax: 650 }, cooldown: 8,
      text: "乱石滩下露出一角洞府入口，禁制松动，显然久已无主。另一个修士先你一步摸到门口，但他左肩带伤，显然刚从别处逃命过来。",
      choices: [
        { text: "约他同行，平分所得", sub: "道心 +1 · 灵石 +8", cond: { notFlag: "散修", notFlag2: "魔修" }, outcomes: [
          { weight: 7, result: "他起初不信，看你真没起坏心，这才点头应了。洞府里你俩各取所需，他还主动多分了你一份。", effect: { daoXin: 1, inv: { "灵石": 8 } } },
          { weight: 3, result: "洞府里机关凶险，你替他挡了一记，双双带伤退出。东西没拿多少，情分倒是结下了。", effect: { daoXin: 1, attrs: { "根骨": -4 } } }
        ] },
        { text: "趁他受伤先进去，留一半", sub: "道心 +1 · 灵石 +6", cond: { flag: "散修", notFlag: "魔修" }, outcomes: [
          { weight: 7, result: "你先进去探了路，出来时给他留了一半。他没想到你还能想着他，直说你这个朋友他认下了。", effect: { daoXin: 1, inv: { "灵石": 6 } } },
          { weight: 3, result: "你先进去，触了机关被轰出来，他反倒捡了个便宜。这一趟，你白忙一场。", effect: { daoXin: 1, attrs: { "根骨": -3 } } }
        ] },
        { text: "堵住门口，让他拿钱买路", sub: "灵石 +20 · 气运 -2", cond: { flag: "魔宗" }, effect: { inv: { "灵石": 20 }, attrs: { "气运": -2 }, evil: 1 }, result: "你堵在洞府门口，摆明了要过路钱。他咬牙扔下一袋灵石，你侧身放行。他进去转了一圈，出来时你已不见了。" },
        { text: "等他进洞，你守在出口收成", sub: "灵石 +20 · 气运 -2", cond: { flag: "魔修", notFlag: "魔宗" }, effect: { inv: { "灵石": 20 }, attrs: { "气运": -2 } }, result: "你守在出口的暗处。他带伤进去，出来时果然捧着一堆好东西。你拦住他分了成，他气得脸白，也奈何不了你。" },
        { text: "抢先进去，把好东西搜刮干净", sub: "道心 -1 · 灵石 +18", cond: { notFlag: "魔修" }, effect: { daoXin: -1, inv: { "灵石": 18 } }, result: "你抢先一步进了洞，禁制全数启开，好东西都归了你。他赶到时只看到空架子，愣在门口没说话。你路过他身边，始终没有解释。" },
        { text: "看他伤重，让了半步", sub: "魔性 -1 · 灵石 -8", cond: { flag: "魔修", inv: { "灵石": 8 } }, effect: { goodKarma: 1, inv: { "灵石": -8 } }, result: "你看他实在狼狈，让出半个洞口，还给了他几块灵石买药。他千恩万谢进去，你蹲在外头，自己也说不清图什么。" },
        { text: "记下位置，改日再来", sub: "稳赚 · 灵石 +8", result: "三日后你再来，那修士早走了。你重新启开禁制，里头果然剩了不少没搬完的东西。", effect: { inv: { "灵石": 8 } } }
      ] },
    { id: "jzg_d3", type: "chance", cat: "jiyuan", realms: [1], cond: { cultMin: 650, cultMax: 1499 }, cooldown: 8,
      text: "荒山深处，一处无主的小型灵石矿脉露出矿口。一个重伤的筑基修士正靠着矿口喘息，显然也没力气再挖了。",
      choices: [
        { text: "约定分账，先治他的伤", sub: "道心 +1 · 人情 +1", cond: { notFlag: "散修", notFlag2: "魔修" }, effect: { daoXin: 1, renqing: 1 }, result: "你扶他坐下，先替他止了血，再来谈分账。他信了你，把矿脉的走向都画给你看。事后分账，他说这条命是你给的，非要让你多拿两成。" },
        { text: "谈好分成，各挖各的", sub: "道心 +1 · 灵石 +40", cond: { flag: "散修", notFlag: "魔修" }, outcomes: [
          { weight: 7, result: "你俩划好矿线，各挖各的矿。他伤没好利索，挖得慢，你的份额明显比他多。他也没计较，说你能不趁火打劫，已经十分难得。", effect: { daoXin: 1, inv: { "灵石": 40 } } },
          { weight: 3, result: "挖到一半，矿洞塌了一段。你俩合力把口子撑住，灵石少挖了不少，倒是没伤着人。", effect: { daoXin: 1, inv: { "灵石": 20 } } }
        ] },
        { text: "让他带伤让路", sub: "灵石 +70 · 气运 -2", cond: { flag: "魔宗" }, effect: { inv: { "灵石": 70 }, attrs: { "气运": -2 }, evil: 1 }, result: "你居高临下地看着他，示意让他退开。他盯着你看了半晌，到底扶着矿壁走了。你一个人吃下整条矿脉，走的时候，矿口那块石头被他砸出一个坑。" },
        { text: "等他撑不住，再接手", sub: "灵石 +70 · 气运 -2", cond: { flag: "魔修", notFlag: "魔宗" }, effect: { inv: { "灵石": 70 }, attrs: { "气运": -2 } }, result: "你在暗处守了三日。他伤重难支，最后只挖了浅浅一层就退走了。你接手的矿脉，还剩大半没动。" },
        { text: "趁他伤重，把矿脉占了", sub: "道心 -1 · 灵石 +70", cond: { notFlag: "魔修" }, effect: { daoXin: -1, inv: { "灵石": 70 } }, result: "你看他实在撑不住，索性把矿口占了。他一步三回头地走了，你挖矿的时候，总觉得背上有双眼睛在盯着。" },
        { text: "让他先挖，替他看伤", sub: "魔性 -1 · 灵石 -40", cond: { flag: "魔修", inv: { "灵石": 40 } }, effect: { goodKarma: 1, inv: { "灵石": -40 } }, result: "你掏出伤药给他敷上，又让他先挖。他半信半疑，到底领了这份情。你蹲在矿口外头，自己也觉得不像话。" },
        { text: "等他放弃，再动手", sub: "稳赚 · 灵石 +40", result: "你在暗处等着。他撑到第五天，到底放弃了，扶着石壁一步一挪走了。你这才现身，矿脉归你，收得稳稳当当。", effect: { inv: { "灵石": 40 } } }
      ] },
    { id: "jzg_d4", type: "chance", cat: "jiyuan", realms: [2], cond: { cultMin: 1500, cultMax: 2600 }, cooldown: 8,
      text: "一处前辈洞府的禁制松动，只剩最后一个进入的名额。另一位真人重伤在身，正守着名额寸步不让。",
      choices: [
        { text: "让他先进，替他护法", sub: "道心 +1 · 声望 +1", cond: { notFlag: "散修", notFlag2: "魔修" }, effect: { daoXin: 1, factionDelta: { rep: 1 } }, result: "你退后半步，让他先进去。他愣住，随即郑重向你一揖，说这份让贤的情义他记一辈子。他在洞府里得了件好东西，出来时分了你一份。" },
        { text: "约定他取一件，余下归你", sub: "道心 +1 · 灵石 +60", cond: { flag: "散修", notFlag: "魔修" }, outcomes: [
          { weight: 7, result: "他答应得爽快，进去后也守约，只取了一件信物。剩下的灵石和丹药，全都归了你。", effect: { daoXin: 1, inv: { "灵石": 60 } } },
          { weight: 3, result: "他进了洞就变了脸，把好东西搜刮一空，出来时只甩给你几块灵石。你记住了这个教训，也记住了这个人。", effect: { daoXin: 1, inv: { "灵石": 20 }, attrs: { "气运": -1 } } }
        ] },
        { text: "让他拿灵石买这个名额", sub: "灵石 +150 · 气运 -2", cond: { flag: "魔宗" }, effect: { inv: { "灵石": 150 }, attrs: { "气运": -2 }, evil: 1 }, result: "你堵在洞口，明码标价：一百五十块灵石，名额卖给你。他气得发抖，到底还是掏了钱。你数着灵石让开，他进去时脸色铁青。" },
        { text: "等他进去，堵门分赃", sub: "灵石 +150 · 气运 -2", cond: { flag: "魔修", notFlag: "魔宗" }, effect: { inv: { "灵石": 150 }, attrs: { "气运": -2 } }, result: "他进去不到半日就出来了，怀里抱着件法器。你守在洞口，开价分一半。他骂你无耻，最后还是留了一半下来。" },
        { text: "抢了这个名额", sub: "道心 -1 · 灵石 +120", cond: { notFlag: "魔修" }, effect: { daoXin: -1, inv: { "灵石": 120 } }, result: "你趁他伤重，硬抢了名额进去。洞府里确实富得流油，可你出来时，坊市里已经传开你趁人之危的名声。" },
        { text: "把名额让给他", sub: "魔性 -1 · 灵石 -80", cond: { flag: "魔修", inv: { "灵石": 80 } }, effect: { goodKarma: 1, inv: { "灵石": -80 } }, result: "你看他护着名额的样子，莫名想起了谁。你摆摆手说名额归他，又扔下八十块灵石让他先治伤。他进去的时候，回头看了你很久。" },
        { text: "记住地方，日后再说", sub: "稳赚 · 灵石 +60", result: "你没有争，只记下洞府的位置。那真人带伤进去，半日便出来了，剩下半座洞府的禁制，倒是便宜了你。", effect: { inv: { "灵石": 60 } } }
      ] },
    { id: "jzg_d5", type: "trib", cat: "jiyuan", realms: [2], cond: { cultMin: 2600, cultMax: 5199 }, cooldown: 8,
      text: "一处古修坐化的洞府前，守候多年的真人重伤垂危，护着洞府钥匙不放。他求你，让他取一件祖师的遗物，其余都归你。",
      choices: [
        { text: "应他所求，成全他", sub: "道心 +1 · 声望 +1", cond: { notFlag: "散修", notFlag2: "魔修" }, effect: { daoXin: 1, factionDelta: { rep: 1 } }, result: "你点了头。他含泪进去，取了祖师遗物，又在洞府里留下一份重礼给你。他说，这份人情，他这一脉永远记着。" },
        { text: "约法三章，各取所需", sub: "道心 +1 · 灵石 +80", cond: { flag: "散修", notFlag: "魔修" }, outcomes: [
          { weight: 7, result: "你让他先取遗物，再来谈分账。他守信，取了该取的，剩下的灵石丹药你拿了大头。", effect: { daoXin: 1, inv: { "灵石": 80 } } },
          { weight: 3, result: "他进洞之后迟迟不出来，你怕洞里有变，便跟了进去。里头机关已启，他只取了一样就退出来，其余都便宜了你。", effect: { daoXin: 1, inv: { "灵石": 50 } } }
        ] },
        { text: "先把钥匙拿到手再说", sub: "灵石 +180 · 气运 -2", cond: { flag: "魔宗" }, effect: { inv: { "灵石": 180 }, attrs: { "气运": -2 }, evil: 1 }, result: "你不由分说先收了钥匙，进洞把值钱的搬了个干净。他瘫在洞外，眼睁睁看着。你出来时绕过他，没有多看一眼。" },
        { text: "等他撑不住，再进洞", sub: "灵石 +180 · 气运 -2", cond: { flag: "魔修", notFlag: "魔宗" }, effect: { inv: { "灵石": 180 }, attrs: { "气运": -2 } }, result: "你守在暗处，等他撑不住自己退走才现身。他到底没能等到进洞那天，一步三回头地走了。洞府里的一切，全都归了你。" },
        { text: "一把夺过钥匙", sub: "道心 -1 · 灵石 +150", cond: { notFlag: "魔修" }, effect: { daoXin: -1, inv: { "灵石": 150 } }, result: "你趁他重伤，一把夺过钥匙。他踉跄着要追，摔倒在洞府门口。你进去搬空了东西，出来时没敢看他。" },
        { text: "扶他进洞，让他得偿所愿", sub: "魔性 -1 · 灵石 -90", cond: { flag: "魔修", inv: { "灵石": 90 } }, effect: { goodKarma: 1, inv: { "灵石": -90 } }, result: "你扶他进洞，看着他取了祖师遗物，又把他背出洞府安顿好。他说你是魔修里的异类，你笑了笑，终究没有接话。" },
        { text: "不争，等他尘埃落定", sub: "稳赚 · 灵石 +90", result: "你没有上前，只远远看着。他进洞取了遗物，伤势太重，没来得及搬空洞府就退走了。你等到夜深，进去收拾了剩下的。", effect: { inv: { "灵石": 90 } } }
      ] }
];
