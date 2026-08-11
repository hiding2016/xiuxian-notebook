/* 修仙记事本 · 元婴中期事件（v4 三段池：顶层博弈，cultMin 1500 ~ cultMax 3200，一次性无 cooldown） */
window.GAME_EVENTS_R3_S2 = [
    { id: "mm_5", type: "daily", cat: "renji", realms: [3], chain: "mm_5", highlight: true,
      cond: { cultMin: 1500, flag: "魔宗" },
      text: "魔宗宗主坐化，众殿主推你坐头把交椅。你立下新门规：急功近利可以，滥杀无辜不行。魔道这些年在你手里，倒有了几分正气象。",
      effect: { achievement: "modao", daoXin: 1 } },
    { id: "gl_4", type: "daily", cat: "renji", realms: [3], cond: { flag: "孤狼", notFlag: "开府" },
      text: "各宗都想招揽你这位无门无派的老祖，帖子堆了一桌。你一封没回——自由这个东西，拿什么都不换。",
      effect: { attrs: { "气运": 3 } } },
    { id: "gl_5", type: "chance", cat: "renji", realms: [3],
      cond: { flag: "孤狼" },
      text: "看着你孤身百年，故人劝你：「你这样的人，不该没有传承。」",
      choices: [
        { text: "开宗立派", sub: "此生所学，总要有人接", effect: { factionInit: { route: "san" } }, result: "你在山门前立下第一块盟约石。从今日起，你这一脉，往后有灯火了。" },
        { text: "继续独来独往", sub: "道心 +1", effect: { daoXin: 1 }, result: "你笑笑没接话。山高水长，你一个人也走得很好。" }
      ] },
    { id: "zd_2", type: "daily", cat: "renji", realms: [3], cond: { notFlag: "散修", notFlag2: "魔修" },
      text: "玄门正宗四个字，如今是你扛着。邪魔外道听到你的山门名号，先自矮了三分。",
      effect: { factionDelta: { rep: 1 } } },
    { id: "yy2_zhongcai", type: "chance", cat: "renji", realms: [3], cond: { cultMin: 1500, cultMax: 3200 },
      text: "两大宗门为一片灵域剑拔弩张，各自递帖请你仲裁。如今你一句话，就是方圆万里的公道。",
      choices: [
        { text: "平分灵域", effect: { factionDelta: { rep: 2 } }, result: "你按山势把灵域劈作两半，各补了一句公道话。两宗宗主当场签了盟约——你的仲裁，成了往后三十年的规矩。" },
        { text: "让他们自己打", effect: { factionDelta: { rep: -1 } }, result: "你闭门不管。两宗打了三年，灵域打成了白地，又来求你收拾残局。" }
      ] },
    { id: "yy2_qiecuo", type: "trib", cat: "zhandou", realms: [3], cond: { cultMin: 1500, cultMax: 3200 },
      text: "北疆第一老祖遣使约战，说是「印证大道」。元婴之间的约战，赌注从来不止胜负。",
      choices: [
        { text: "应战", sub: "超阶斗法", battle: {
          name: "北疆第一老祖", tier: 3, loseWeights: [40, 40, 20], demonic: false, elem: "金",
          winText: "三日三夜，你以半招之差压住了他的法相。北疆第一老祖拱手：「这方天地，往后有你了。」",
          winEffect: { factionDelta: { rep: 3 }, attrs: { "神识": 3 } }, wuxue: [250, 400],
          lightText: "你们战成平手，相约十年后再续。", lightEffect: { factionDelta: { rep: 1 } },
          heavyText: "你败了半招，法相被震散，闭关养了两年。", heavyEffect: { sanShang: 2 },
          deathText: "法相崩解，元婴溃散当场。北疆的雪，落了你满身。兵解。"
        } },
        { text: "推了", result: "你回帖说：大道不在拳脚上。使者走后，有传言说你怯战，你只当没听见。" }
      ] },
    { id: "yy2_mochao", type: "trib", cat: "zhandou", realms: [3], cond: { cultMin: 1500, cultMax: 3200, notFlag: "魔修" },
      text: "南疆魔潮突起，十三家魔宗结盟南下，连破七家正道宗门。求援的血书雪片一样飞到你案头。",
      choices: [
        { text: "亲自坐镇", sub: "超阶死战", battle: {
          name: "魔潮盟主", tier: 3, loseWeights: [40, 40, 20], demonic: true, elem: "水",
          winText: "你一剑斩断魔潮中军大纛，十三家魔宗连夜北逃。正道的旗，重新插回了南疆。",
          winEffect: { factionDelta: { rep: 3 }, inv: { "灵石": 800 }, daoXin: 1 }, wuxue: [250, 400],
          lightText: "魔潮势大，你且战且守，终是稳住了阵线。", lightEffect: { inv: { "灵石": -100 } },
          heavyText: "魔盟三位老魔围攻，你拼死杀出，伤势着实沉重。", heavyEffect: { sanShang: 3 },
          deathText: "你挡在魔潮之前，战到了最后一刻。南疆的山河为证。兵解。"
        } },
        { text: "守住自家山门", result: "你闭山自守。南疆生灵涂炭，三年后魔潮自退，只是那些求援的宗门，再没登过你的门。" }
      ] },
    { id: "yy2_lianmeng", type: "chance", cat: "renji", realms: [3], cond: { cultMin: 1500, cultMax: 3200 },
      text: "三位元婴老祖联名相邀，想结一个「四老盟」，共掌这方天地的规矩。盟约里给你的条款，厚得有些反常。",
      choices: [
        { text: "入盟", sub: "共掌大局", effect: { renqing: 1, factionDelta: { rep: 1 } }, result: "四老盟一立，四方为之震动。你心里清楚：条款越厚，说明他们越怕你。" },
        { text: "不入", result: "你推说性喜清静。三位老祖嘴上可惜，转身就把盟约里的防人条款又加了三条。" }
      ] },
    { id: "yy2_tianji", type: "miracle", cat: "jiyuan", realms: [3], cond: { cultMin: 1500, cultMax: 3200 }, highlight: true,
      text: "东海之极有仙山出世，霞光万里，各宗老祖齐动。天材地宝，有德者居之——也有人说，有力者居之。",
      choices: [
        { text: "去争", sub: "超阶乱战", battle: {
          name: "夺宝老祖", tier: 3, loseWeights: [40, 40, 20], demonic: false, elem: "木",
          winText: "仙山重宝落入你手。其余老祖看着你手里的宝光，终究没人再出手。",
          winEffect: { artifactForce: { "法宝": 1 }, inv: { "灵石": 500 } }, wuxue: [250, 400],
          lightText: "你夺得一件灵器，见好就收，安安稳稳退了出来。", lightEffect: { artifactForce: { "灵器": 1 } },
          heavyText: "混战中你被两位老祖夹击，负了伤才遁走。", heavyEffect: { sanShang: 2 },
          deathText: "仙山的霞光很盛。你留在那里，成了传说的一部分。兵解。"
        } },
        { text: "不去", effect: { daoXin: 1 }, result: "你按兵不动。三日后消息传来：仙山重宝是个局，争宝的老祖们折了一半。你躲过了一劫。" }
      ] },
    { id: "yy2_dayao", type: "trib", cat: "zhandou", realms: [3], cond: { cultMin: 1500, cultMax: 3200 },
      text: "沉睡千年的大妖出世，一口吞了半个县城。凡间的哭声顺着风，飘到了你的山上。",
      choices: [
        { text: "斩妖", sub: "超阶斗法", battle: {
          name: "千年大妖", tier: 3, loseWeights: [40, 40, 20], demonic: false, elem: "土",
          winText: "大妖授首，妖丹大如斗。你站在妖尸之上，山下万民跪拜，哭声变成了喊声。",
          winEffect: { inv: { "灵石": 1000, "妖丹": 2 }, factionDelta: { rep: 2 } }, wuxue: [250, 400],
          lightText: "大妖遁入地底，你镇了它三年，终究逼得它远遁。", lightEffect: {},
          heavyText: "大妖的毒雾蚀骨，你拼死斩它一尾，伤得着实不轻。", heavyEffect: { sanShang: 3 },
          deathText: "大妖腹中又添一副仙骨。县城的钟，为你鸣了九日。兵解。"
        } },
        { text: "封山不管", result: "你闭了山门。大妖闹了三年，被北疆的老祖联手斩了。你的名声，到底暗了些。" }
      ] },
    { id: "yy2_tudi4", type: "daily", cat: "renji", realms: [3], cond: { cultMin: 1500, cultMax: 3200, flag: "开府" },
      text: "大弟子也到了金丹后期，冲击元婴指日可待。你开始把压箱底的东西一样一样过给他——就像当年师傅对你。",
      effect: { factionDelta: { rep: 1 } } },
    { id: "yy2_shanmen2", type: "flavor", cat: "renji", realms: [3], cond: { cultMin: 1500, cultMax: 3200 },
      text: "你的山门如今是方圆万里的规矩本身：商队过境要拜，修士过境要拜，连皇家的仪仗过境，都要绕着走。" },
    { id: "yy2_lundao2", type: "daily", cat: "xiulian", realms: [3], cond: { cultMin: 1500, cultMax: 3200 },
      text: "你与两位老祖在云海之上论道，一坐三日三夜。散时，三人都有所得——化神的门，似乎又近了一线。",
      effect: { attrs: { "神识": 4 } } },
    { id: "yy2_shouyuan2", type: "flavor", cat: "xinjing", realms: [3], cond: { cultMin: 1500, cultMax: 3200 },
      text: "寿元过半。你算了算，照这个进境，化神的门槛，够得着，但只够得着一次。这一把，说什么也不能输。" },
    { id: "yy2_cangjing3", type: "daily", cat: "xiulian", realms: [3], cond: { cultMin: 1500, cultMax: 3200, factionRoute: "zong" },
      text: "宗门把历代祖师的手札全数搬到你面前——从前你没资格看的那些。你在故纸堆里坐了半年，出来时鬓角白了一缕。",
      effect: { attrs: { "悟性": 3 } } },
    { id: "yy2_fengjian", type: "chance", cat: "renji", realms: [3], cond: { cultMin: 1500, cultMax: 3200 },
      text: "山下三国交战，其中一国的皇帝上山求你「主持公道」，许你国师之位、半壁供奉。",
      choices: [
        { text: "下山止战", sub: "仙人一言", effect: { attrs: { "气运": 4 } }, result: "你的法相立在两国阵前，百万大军当场弃甲。史书写：神君一言，止杀百万之众。" },
        { text: "不染凡尘", effect: { daoXin: 1 }, result: "你让人带话：凡人自有凡人的劫数。皇帝在山下站了三日，终究还是走了。" }
      ] },
    { id: "yy2_dizi2", type: "trib", cat: "renji", realms: [3], cond: { cultMin: 1500, cultMax: 3200, flag: "开府" },
      text: "门下出了叛徒，卷走一卷镇阁功法投奔了外宗。全府上下都在等你的处置。",
      choices: [
        { text: "千里追回", sub: "清理门户", effect: { factionDelta: { rep: 1 } }, result: "你亲自出山，三日后提着功法回来。叛徒的下场，你只说了四个字：依律处置。从此府内再无贰心。" },
        { text: "随他去", effect: { factionDelta: { rep: -1 } }, result: "你摆摆手说随他去。府内风纪，自此松了三分。" }
      ] },
    { id: "yy2_danlu2", type: "daily", cat: "xiulian", realms: [3], cond: { cultMin: 1500, cultMax: 3200 },
      text: "你开炉炼了一炉「养神丹」，九成九的火候，就差那么一线。你把那炉丹砸了重炼——元婴的东西，不能有瑕疵。",
      effect: { attrs: { "神识": 2 } } },
    { id: "yy2_moyou2", type: "trib", cat: "renji", realms: [3], cond: { cultMin: 1500, cultMax: 3200 },
      text: "一位魔道巨擘托人带话，想与你「平分天下」：正道归你，魔道归他，井水不犯河水。",
      choices: [
        { text: "回绝", sub: "正魔不两立", effect: { daoXin: 1 }, result: "你回了四个字：道不同耳。带话的人走后，魔道的商路悄悄绕开了你的地界。" },
        { text: "虚与委蛇", sub: "情报 +15", effect: { intel: 15, attrs: { "神识": -2 } }, result: "你与他书信往来了两年，魔道的底细摸了个七七八八。只是这些信，你一封都没敢留。" }
      ] },
    { id: "yy2_jianghu2", type: "flavor", cat: "renji", realms: [3], cond: { cultMin: 1500, cultMax: 3200 },
      text: "江湖上关于你的传说越来越离谱：有人说你三头六臂，有人说你一晚能喝干东海。你听了，权当拿来下酒。" },
    { id: "yy2_guohai", type: "daily", cat: "jiyuan", realms: [3], cond: { cultMin: 1500, cultMax: 3200 },
      text: "你跨海三万里，去看传说中的归墟。归墟边上站了七日，什么也没悟到。回程的路上，你反倒想通了两处关窍。",
      effect: { attrs: { "悟性": 2 } } },
    { id: "yy2_baike2", type: "daily", cat: "renji", realms: [3], cond: { cultMin: 1500, cultMax: 3200 },
      text: "一位隐居五百年的老怪物登门讨教。你们坐而论道一个月，临走他说：「下一次天门开启，台上该有你了。」",
      effect: { attrs: { "神识": 2 } } },
    { id: "yy2_shanbao", type: "chance", cat: "ziyuan", realms: [3], cond: { cultMin: 1500, cultMax: 3200, flag: "开府" },
      text: "探子来报：极北冰原之下发现上古灵矿，开采极难，可一旦打通，够用三百年。",
      choices: [
        { text: "开山采矿", sub: "灵石 -500 · 三年之功", cond: { inv: { "灵石": 500 } }, outcomes: [
          { weight: 6, result: "三年凿山，灵矿终于贯通。库房的灵石，从此堆到了房梁。", effect: { inv: { "灵石": 500 } } },
          { weight: 4, result: "矿脉挖到一半塌了，折了不少人手。你抚恤下去，此事就此作罢。", effect: { inv: { "灵石": -500 } } }
        ] },
        { text: "作罢", result: "你掂量再三，终究还是算了。灵石够花就行，贪多嚼不烂。" }
      ] },
    { id: "yy2_tianxiang", type: "flavor", cat: "xinjing", realms: [3], cond: { cultMin: 1500, cultMax: 3200 },
      text: "近来夜观天象，紫微垣边多了一颗客星，始终明暗不定。钦天监的奏章雪片一样飞，你的山，成了天下的风向标。" },
    { id: "yy2_zhengduo", type: "trib", cat: "ziyuan", realms: [3], cond: { cultMin: 1500, cultMax: 3200 },
      text: "外宗强占了你名下的一处灵田，管事的上门理论，被打了回来。",
      choices: [
        { text: "亲自登门", sub: "老祖的面子", effect: { factionDelta: { rep: 1 }, inv: { "灵石": 300 } }, result: "你往对方山门前一站，还没开口，对方宗主已经把灵田的地契送了出来，外带三倍赔礼。" },
        { text: "算了", result: "你把地契的副本烧了。一处灵田而已——但门下看你的眼神，明显淡了几分。" }
      ] },
    { id: "yy2_daolv5", type: "daily", cat: "renji", realms: [3], cond: { cultMin: 1500, cultMax: 3200, flag: "道侣", notFlag: "道侣坐化" },
      text: "【道侣名】的修为停在金丹，再也动不了了。TA笑着说：「你走你的，别回头等我。」你听了，心里堵了三日。" },
    { id: "yy2_xinmo3", type: "trib", cat: "xinjing", realms: [3], cond: { cultMin: 1500, cultMax: 3200 },
      text: "打坐时心魔又来：它说，你如今一句话定人生死，跟当年你最恨的那些人，有什么分别。",
      choices: [
        { text: "驳回去", sub: "道心 +1", effect: { daoXin: 1 }, result: "你答：分别在我夜里睡得着。心魔噎了半天，最后悻悻散了。" },
        { text: "压住", result: "你不答。有些问题，答了才算输。只是那一夜的茶，喝起来格外苦。" }
      ] }
];
