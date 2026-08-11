/* 修仙记事本 · 金丹中期事件（v3.2 三段池：实权期，cultMin 1800 ~ cultMax 3800，一次性无 cooldown） */
window.GAME_EVENTS_R2_S2 = [
    { id: "js2_yizheng", type: "chance", cat: "renji", realms: [2], cond: { factionRoute: "zong", cultMin: 1800, cultMax: 3800 },
      text: "宗门与邻宗争一处灵矿，言辞越来越冲。长老会推你出面交涉——如今你去，就代表宗门的脸面。",
      choices: [
        { text: "寸步不让", outcomes: [
          { weight: 6, result: "你把矿脉的舆图拍在桌上，一条条讲清楚。对方让了三成，总算体面收了场。", effect: { factionDelta: { rep: 2 } } },
          { weight: 4, result: "谈崩了。对方撂下话要手底下见真章，两宗为此冷了三年。", effect: { factionDelta: { rep: -1 } } }
        ] },
        { text: "各取一半", effect: { inv: { "灵石": 100 } }, result: "你提议按山势分矿，两家各取一半。两边都不太满意，所以两边都接受了。" }
      ] },
    { id: "js2_tiaoxin", type: "trib", cat: "zhandou", realms: [2], cond: { factionRoute: "zong", cultMin: 1800, cultMax: 3800 },
      text: "掌门闭关期间，三名外来的金丹修士堵在山门前叫阵，指名要「领教贵宗高招」。众长老都在等你拿主意。",
      choices: [
        { text: "出阵领教", sub: "强敌斗法", battle: {
          name: "叫阵修士", tier: 2, demonic: false, elem: "金",
          winText: "三招之内，为首那人被你按在山门前的石阶上。三人灰溜溜地走了，此后再没人来叫阵。",
          winEffect: { factionDelta: { rep: 2 } }, wuxue: [120, 220],
          lightText: "对方合击有点章法，你挂了些彩才拿下。", lightEffect: { inv: { "灵石": -30 } },
          heavyText: "三人合击之术远超预估，你负伤退回护山大阵。", heavyEffect: { sanShang: 2 },
          deathText: "山门之前，众目睽睽之下。你倒下时，听见长老们嘶声呼喊。兵解。"
        } },
        { text: "闭门不战", effect: { factionDelta: { rep: -1 } }, result: "护山大阵开启，任他们叫骂三日。风头是躲过去了，宗门的脸面也折了几分。" }
      ] },
    { id: "js2_xunfang", type: "trib", cat: "zhandou", realms: [2], cond: { factionRoute: "san", cultMin: 1800, cultMax: 3800 },
      text: "盟界巡防急报：一伙魔修洗劫了两个村子，正往边界逃窜。",
      choices: [
        { text: "亲自追剿", sub: "同阶斗法", battle: {
          name: "劫村魔修", tier: 1, demonic: true, elem: "火",
          winText: "你在边界前截住了他们。为首魔修授首，缴获的财货你让人原数送回了村里。",
          winEffect: { inv: { "灵石": 150 }, factionDelta: { rep: 1 } }, wuxue: [60, 120],
          lightText: "魔修困兽犹斗，你臂上中了一记阴煞。", lightEffect: {},
          heavyText: "魔修爆丹求生，你被气浪掀飞，内伤着实不轻。", heavyEffect: { sanShang: 2 },
          deathText: "边界的风很硬。你倒下时，盟界的界碑就在百步之外。兵解。"
        } },
        { text: "遣元老处置", result: "你把追剿令发了下去。三日后元老回报：贼人伏诛。" }
      ] },
    { id: "js2_kaoxiao", type: "daily", cat: "renji", realms: [2], cond: { cultMin: 1800, cultMax: 3800, flag: "开府" },
      text: "门下弟子年度考校，你亲自出题、亲自看卷。拔得头筹的那个，你赏了一件新打的法器。",
      effect: { inv: { "灵石": -30 } } },
    { id: "js2_sichuan", type: "trib", cat: "renji", realms: [2], cond: { cultMin: 1800, cultMax: 3800, flag: "开府" },
      text: "一名弟子把府内功法私传给了外人，被执事拿获。按律当逐出山门。",
      choices: [
        { text: "依律逐出", effect: { factionDelta: { rep: 1 } }, result: "你挥挥手，命人按律办了下去。府内风气为之一肃。" },
        { text: "念其初犯", outcomes: [
          { weight: 5, result: "你罚他面壁三年。那弟子感激涕零，后来成了最守规矩的一个。" },
          { weight: 5, result: "旁人看你这般宽纵，暗地里也有样学样起来。", effect: { factionDelta: { rep: -1 } } }
        ] }
      ] },
    { id: "js2_hufa", type: "daily", cat: "renji", realms: [2], cond: { cultMin: 1800, cultMax: 3800, flag: "开府" },
      text: "门下弟子筑基渡劫，你亲自护法。雷光散尽，年轻人从焦土里爬出来，跪在你面前磕了三个头。",
      effect: { factionDelta: { rep: 1 } } },
    { id: "js2_laomiao", type: "flavor", cat: "renji", realms: [2], cond: { cultMin: 1800, cultMax: 3800, flag: "老苗" },
      text: "老苗的消息越来越准，价钱还是老样子。你说该涨涨了，他摆手：规矩不能坏。",
      effect: { intel: 3 } },
    { id: "js2_tangkou", type: "trib", cat: "zhandou", realms: [2], cond: { cultMin: 1800, cultMax: 3800, notFlag: "魔修" },
      text: "玄阴教的外围堂口劫了你的商队，还放话说这条路往后归他们管。",
      choices: [
        { text: "端了它", sub: "同阶斗法", battle: {
          name: "堂口魔修", tier: 1, demonic: true, elem: "木",
          winText: "堂口一夜之间拔了旗。你让人把劫去的货物尽数运回，商路恢复了通行。",
          winEffect: { inv: { "灵石": 200 }, intel: 5 }, wuxue: [80, 150],
          lightText: "堂口里藏着个硬手，你费了番手脚才脱身。", lightEffect: {},
          heavyText: "对方竟有两位金丹坐镇，你且战且退，负了伤才归来。", heavyEffect: { sanShang: 2 },
          deathText: "堂口的地牢阴冷。你最后听见的，是魔修们分赃的笑声。兵解。"
        } },
        { text: "记下这笔账", effect: { intel: 5 }, result: "你让老苗把这条线摸清楚。账，早晚要算。" }
      ] },
    { id: "js2_lundao", type: "chance", cat: "xiulian", realms: [2], cond: { cultMin: 1800, cultMax: 3800 },
      text: "几位相熟的真人联名邀你入一个论道小会：六个人，十年一会，轮流在各家的山头做东。",
      choices: [
        { text: "入会", sub: "以道会友", effect: { attrs: { "神识": 3 }, renqing: 1 }, result: "头一会就在你的山头开的。六个人谈了三日，散会时都说明白了不少年没想通的事。" },
        { text: "婉拒", result: "你推说俗务缠身。请帖收进了抽屉。" }
      ] },
    { id: "js2_yuanfang", type: "daily", cat: "renji", realms: [2], cond: { cultMin: 1800, cultMax: 3800 },
      text: "远方的道友来访，带来三千里外的消息：哪里出了古府，哪里闹了妖患。你在舆图上又添了几个记号。",
      effect: { attrs: { "神识": 2 } } },
    { id: "js2_lingtian2", type: "daily", cat: "ziyuan", realms: [2], cond: { cultMin: 1800, cultMax: 3800, flag: "开府" },
      text: "峰下灵田扩了一倍，佃户新来了二十户。秋后算账，出息比往年厚了三成。",
      effect: { inv: { "灵石": 180 } } },
    { id: "js2_cangjing2", type: "flavor", cat: "xiulian", realms: [2], cond: { cultMin: 1800, cultMax: 3800, factionRoute: "zong" },
      text: "藏经阁三层对你全开了。你在故纸堆里泡了一个月，指尖都是陈年墨香。" },
    { id: "js2_lianqi2", type: "chance", cat: "ziyuan", realms: [2], cond: { cultMin: 1800, cultMax: 3800 },
      text: "一位炼器大师登门，说愿为你量身炼一件法宝，工料三百灵石，分文都不能少。",
      choices: [
        { text: "炼", sub: "灵石 -300 · 法宝一件", cond: { inv: { "灵石": 300 } }, effect: { inv: { "灵石": -300 }, artifactForce: { "法宝": 1 } }, result: "大师闭关四十九日，开炉那日霞光满室。这价钱花得值。" },
        { text: "罢了", result: "三百灵石够买两件现成的。你谢过了大师。" }
      ] },
    { id: "js2_sizhuan", type: "chance", cat: "xiulian", realms: [2], cond: { cultMin: 1800, cultMax: 3800, flag: "开府" },
      text: "丹房供奉说他摸到了四转丹的门槛，想支一笔灵材试手，成败大约各半。",
      choices: [
        { text: "拨灵材", sub: "灵石 -150", cond: { inv: { "灵石": 150 } }, outcomes: [
          { weight: 5, result: "丹成四转！供奉捧着丹瓶的手都在抖，你府上的丹房从此有了名号。", effect: { inv: { "灵石": -150, "回春丹": 2 } } },
          { weight: 5, result: "炉炸了，一炉灵材尽数毁去。供奉灰头土脸来请罪，你摆摆手让他继续琢磨。", effect: { inv: { "灵石": -150 } } }
        ] },
        { text: "稳妥为先", result: "四转丹岂是赌气的事。你让他先把三转丹的成丹率再提一成。" }
      ] },
    { id: "js2_yaozhai", type: "trib", cat: "zhandou", realms: [2], cond: { cultMin: 1800, cultMax: 3800 },
      text: "邻宗递来求援帖：一伙妖物盘踞山寨多年，他们力有不逮，愿出厚仪请你出手。",
      choices: [
        { text: "出手", sub: "强敌斗法", battle: {
          name: "妖寨当家", tier: 2, demonic: false, elem: "木",
          winText: "妖寨一把火烧了个干净。邻宗宗主亲自送来谢仪，话说得极为客气。",
          winEffect: { inv: { "灵石": 300 }, factionDelta: { rep: 1 } }, wuxue: [120, 220],
          lightText: "妖物人多势众，你且战且走，到底挂了些彩。", lightEffect: {},
          heavyText: "妖寨里竟藏着一头大妖，你拼死杀出，伤势着实不轻。", heavyEffect: { sanShang: 2 },
          deathText: "妖寨的篝火很旺。你终究没能走出那座山寨。兵解。"
        } },
        { text: "推了", result: "你回了帖，说近来闭关于紧要处。邻宗另寻了援手。" }
      ] },
    { id: "js2_pingli", type: "daily", cat: "renji", realms: [2], cond: { cultMin: 1800, cultMax: 3800 },
      text: "两位金丹真人争一条灵泉，闹到你这里评理。你把泉水的脉理画了张图，两家各取一段，两边都服了气。",
      effect: { factionDelta: { rep: 1 } } },
    { id: "js2_jujian", type: "flavor", cat: "renji", realms: [2], cond: { cultMin: 1800, cultMax: 3800 },
      text: "如今你的举荐信一字难求，求信的人排到了山下。你只写了三封，封封举的都是真有才干的。" },
    { id: "js2_litong", type: "trib", cat: "renji", realms: [2], cond: { cultMin: 1800, cultMax: 3800, flag: "开府" },
      text: "你察觉门下有人里通外宗，把峰务一件件泄了出去。",
      choices: [
        { text: "彻查到底", effect: { factionDelta: { rep: 1 } }, result: "三日后人拿了，是个投了七年的老执事。你当众发落，府内再没人敢伸手。" },
        { text: "敲打为主", result: "你召集众人，不点名地讲了一个故事。散会后，泄密的动静果然没了。" }
      ] },
    { id: "js2_nianjie", type: "daily", cat: "renji", realms: [2], cond: { cultMin: 1800, cultMax: 3800 },
      text: "当年受过你恩惠的人，如今天南地北都有了。每逢年节，山下送来的礼物能堆半间屋子。",
      effect: { renqing: 1 } },
    { id: "js2_lunzhi", type: "daily", cat: "renji", realms: [2], cond: { cultMin: 1800, cultMax: 3800, factionRoute: "zong" },
      text: "长老会轮值，你主持了三次。再棘手的事务到你手里，三两句话就剖开了。",
      effect: { attrs: { "神识": 2 } } },
    { id: "js2_guiju", type: "daily", cat: "renji", realms: [2], cond: { cultMin: 1800, cultMax: 3800, factionRoute: "san" },
      text: "盟里的规矩渐渐立起来了：商路、灵矿、征伐，各有章程。元老们说，这些方圆都是你定的。" },
    { id: "js2_denghuo", type: "flavor", cat: "renji", realms: [2], cond: { cultMin: 1800, cultMax: 3800, flag: "开府" },
      text: "站在峰顶往下看，灯火比十年前多了一倍。每一点灯火下住的是谁，你随口都说得出来。" },
    { id: "js2_sheju", type: "trib", cat: "zhandou", realms: [2], cond: { cultMin: 1800, cultMax: 3800 },
      text: "魔修在坊市设局坑杀落单散修，苦主的家眷跪在你府前，一跪就是三日。",
      choices: [
        { text: "管", sub: "同阶斗法", battle: {
          name: "设局魔修", tier: 1, demonic: true, elem: "水",
          winText: "设局的魔修伏诛。你把缴获的财货交给苦主家眷，那家人对着你磕了三个头。",
          winEffect: { inv: { "灵石": 120 }, factionDelta: { rep: 1 } }, wuxue: [60, 120],
          lightText: "魔修的局里套着局，你中了一次埋伏才拿下他。", lightEffect: {},
          heavyText: "魔修引爆了预设的毒阵，你拼死突围，毒气已然侵体。", heavyEffect: { sanShang: 2 },
          deathText: "坊市的灯火还很热闹。你倒在暗巷里，没有一个人听见。兵解。"
        } },
        { text: "移交宗门", result: "你把案子移交给了当地的宗门。家眷千恩万谢地走了。" }
      ] },
    { id: "js2_liushui", type: "daily", cat: "renji", realms: [2], cond: { cultMin: 1800, cultMax: 3800 },
      text: "你设了三日流水席，答谢这些年往来的人情。席散时，门口的石狮子都被贺客摸亮了。",
      effect: { inv: { "灵石": -120 }, attrs: { "气运": 3 } } },
    { id: "js2_gufu", type: "miracle", cat: "jiyuan", realms: [2], cond: { cultMin: 1800, cultMax: 3800 },
      text: "消息传来，东海有古府出世，禁制将开，各路人马都动了。",
      choices: [
        { text: "去", sub: "机缘与风险并存", outcomes: [
          { weight: 4, result: "你抢在各派前头进了内府，取走了一件灵器。出来的时候，后头的人才刚到。", effect: { artifactForce: { "灵器": 1 } } },
          { weight: 4, result: "白跑一趟。内府早被人搬空了，只剩几幅壁画。" },
          { weight: 2, result: "你在府中触了暗禁，拼死才退出来。", effect: { sanShang: 1 } }
        ] },
        { text: "不去", result: "古府出世，十有八九是血雨腥风。你按下了这个念头。" }
      ] },
    { id: "js2_zipai", type: "daily", cat: "renji", realms: [2], cond: { cultMin: 1800, cultMax: 3800, flag: "开府" },
      text: "门下弟子已有百人，名册厚成了一本书。大弟子说，该立辈分字派了。你提笔定了八个字。" },
    { id: "js2_shandong", type: "flavor", cat: "xinjing", realms: [2], cond: { cultMin: 1800, cultMax: 3800 },
      text: "你路过当年筑基时住过的山洞，进去坐了坐。石壁上还留着你当年刻的记号，笔画还很稚嫩。" },
    { id: "js2_chaye", type: "daily", cat: "renji", realms: [2], cond: { cultMin: 1800, cultMax: 3800 },
      text: "一位不出世的老修士遣人送你一盒茶叶，只说结个善缘。你收了，回赠一坛灵酒。",
      effect: { renqing: 1 } },
    { id: "js2_yaoquan", type: "trib", cat: "zhandou", realms: [2], cond: { cultMin: 1800, cultMax: 3800 },
      text: "边境妖患成灾，三个宗门联名送来帅印，请你挂帅清剿。",
      choices: [
        { text: "挂帅", sub: "强敌斗法", battle: {
          name: "妖患头目", tier: 2, demonic: false, elem: "土",
          winText: "妖患剿平，三宗在界碑前摆酒庆功。你的名字，从此在边境三千里能止妖夜啼。",
          winEffect: { factionDelta: { rep: 2 }, inv: { "灵石": 250 } }, wuxue: [150, 250],
          lightText: "妖物层出不穷，你鏖战一日才斩了头目。", lightEffect: { inv: { "灵石": -40 } },
          heavyText: "头目濒死反扑，你护住身后的小辈，硬吃了一记。", heavyEffect: { sanShang: 2 },
          deathText: "你挡在溃军之前，战到了最后一刻。界碑为证。兵解。"
        } },
        { text: "荐人代劳", result: "你举荐了两位得力的真人代劳，又把战术细细写了三页。边境的妖患，半年后也平了。" }
      ] },
    { id: "js2_baodao", type: "chance", cat: "jiyuan", realms: [2], cond: { cultMin: 1800, cultMax: 3800 },
      text: "海外一座宝岛的岛主邀你同探一处海底遗迹，言明所得五五分成。",
      choices: [
        { text: "同去", outcomes: [
          { weight: 6, result: "海底遗迹收获颇丰，岛主痛快地按约分了账。", effect: { inv: { "灵石": 250 } } },
          { weight: 4, result: "岛主见宝起意想独吞，你夺了自己那份，拂袖扬长而去。", effect: { inv: { "灵石": 100 }, sanShang: 1 } }
        ] },
        { text: "推了", result: "海外路远，人心隔得更远。你谢过了岛主。" }
      ] },
    { id: "js2_yujian", type: "daily", cat: "xiulian", realms: [2], cond: { cultMin: 1800, cultMax: 3800 },
      text: "你开始把功法心得录成玉简，每月录成一卷。门下弟子争相传抄，抄本又生抄本。" },
    { id: "js2_kanren", type: "daily", cat: "xinjing", realms: [2], cond: { cultMin: 1800, cultMax: 3800 },
      text: "你如今看人极准，谁是真心谁是假意，一照面就有数。这份眼力，是几百场迎来送往喂出来的。",
      effect: { attrs: { "神识": 3 } } },
    { id: "js2_jieban", type: "chance", cat: "renji", realms: [2], cond: { cultMin: 1800, cultMax: 3800, factionRoute: "zong" },
      text: "掌门找你商量下一代掌事的人选，说想听听你的意思。这话的分量，你心里清楚。",
      choices: [
        { text: "举荐贤能", effect: { factionDelta: { rep: 1 } }, result: "你举荐了两个人，附了三条理由。掌门听完，一一记下了。" },
        { text: "不置可否", result: "你只说掌门春秋正盛。掌门笑笑，顺势换了话题。" }
      ] },
    { id: "js2_lingshen", type: "daily", cat: "ziyuan", realms: [2], cond: { cultMin: 1800, cultMax: 3800 },
      text: "药圃里那株三百年的灵参成了形，你起出来配了一炉丹，成色极为上乘。",
      effect: { inv: { "回春丹": 2 } } },
    { id: "js2_shuoshu", type: "flavor", cat: "renji", realms: [2], cond: { cultMin: 1800, cultMax: 3800 },
      text: "山下说书先生已经把你说成了段子：金丹真人一怒之下，魔修尽数授首。你听了，一口茶差点喷出来。" },
    { id: "js2_yuanyou", type: "chance", cat: "renji", realms: [2], cond: { cultMin: 1800, cultMax: 3800, flag: "道侣", notFlag: "道侣坐化" },
      text: "【道侣名】说，这些年你忙着峰务，两个人已经有三十年没一起出过远门了。",
      choices: [
        { text: "同游半年", sub: "道心 +1", effect: { daoXin: 1 }, result: "你们走了大半年，看了四处海、两座雪山。回来时，道侣说这是最值当的半年。" },
        { text: "正事要紧", result: "道侣也没再说什么。只是那晚的茶，凉得比往常快。" }
      ] },
    { id: "js2_wenyi", type: "trib", cat: "renji", realms: [2], cond: { cultMin: 1800, cultMax: 3800 },
      text: "山下几个村子闹时疫，郎中没有法子，里正抬着病人跪到了山门外。",
      choices: [
        { text: "施药活人", sub: "灵石 -80", cond: { inv: { "灵石": 80 } }, effect: { inv: { "灵石": -80 }, attrs: { "气运": 4 } }, result: "你配了三剂药撒进各村的水井。半月之后，时疫尽数退了。" },
        { text: "作法驱疫", effect: { attrs: { "神识": 2 } }, result: "你沿村走了一趟，以灵力驱散疫气。村民在村口立了块功德碑。" }
      ] },
    { id: "js2_anzhuang", type: "daily", cat: "zhandou", realms: [2], cond: { cultMin: 1800, cultMax: 3800, notFlag: "魔修" },
      text: "你察觉到魔道的暗桩摸进了你的坊市。你将计就计，喂了他三个月的假消息。",
      effect: { intel: 8 } },
    { id: "js2_xiaoer", type: "flavor", cat: "renji", realms: [2], cond: { cultMin: 1800, cultMax: 3800 },
      text: "你的名字如今能止小儿夜啼。有凡间母亲吓唬孩子：再哭，真人来抓你了。你路过听见，一时哭笑不得。" },
    { id: "js2_jyou2", type: "trib", cat: "renji", realms: [2], chain: "jyou_2", highlight: true,
      cond: { cultMin: 1800, cultMax: 3800, flag: "周福同游" },
      text: "讣告送到：周福坐化了，走的时候很安详。你下山去送他，坟前摆着他儿孙供的果品，还有你当年回赠他的那柄木剑。",
      effect: { attrs: { "神识": 3 } } },
    { id: "js2_pang1", type: "daily", cat: "renji", realms: [2], chain: "pang_1",
      cond: { cultMin: 1800, cultMax: 3800 },
      text: "王胖子把镖局盘了出去。他是筑基修士，一辈子守着镖行这门营生，如今在坊市开了间小小的杂货铺。他说守着铺子，离家近便些。你每次去坊市，他都要拉你喝杯茶。" }
];
