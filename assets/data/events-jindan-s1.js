/* 修仙记事本 · 金丹初期事件（v3.2 三段池：立足期，cultMax 1800，一次性无 cooldown） */
window.GAME_EVENTS_R2_S1 = [
    { id: "js1_baifang", type: "flavor", cat: "renji", realms: [2], cond: { cultMax: 1800 },
      text: "结丹后你回了一趟宗门旧址。守山门的弟子换成了生面孔，翻来覆去查了你的名帖，才躬身放行。" },
    { id: "js1_mingtie", type: "flavor", cat: "renji", realms: [2], cond: { cultMax: 1800 },
      text: "贺帖堆里有一封字迹歪歪扭扭的，是当年膳堂的火工写的。他说他全家老小，都替你高兴。" },
    { id: "js1_yaji", type: "daily", cat: "renji", realms: [2], cond: { cultMax: 1800 },
      text: "同阶的几位真人下帖相邀，约你在松山雅集一聚。你去了，坐末位，听了一整天玄而又玄的话题，回去的路费倒是省了一顿饭钱。",
      effect: { attrs: { "神识": 2 } } },
    { id: "js1_yiwu", type: "chance", cat: "renji", realms: [2], cond: { cultMax: 1800 },
      text: "雅集散场，一位真人拉住你，说看上了你画的符，想拿一坛三十年的灵酿换二十张。",
      choices: [
        { text: "换", sub: "符咒 -2 · 记下人情", cond: { inv: { "符咒": 2 } }, effect: { inv: { "符咒": -2 }, renqing: 1 }, result: "灵酿入喉绵长。那位真人拍着胸脯说，往后你的事就是他的事。" },
        { text: "婉拒", result: "你推说近来手生，画得比从前少了许多。他也不好再缠。" }
      ] },
    { id: "js1_dongfu2", type: "daily", cat: "ziyuan", realms: [2], cond: { cultMax: 1800 },
      text: "你把洞府重修了一番，辟出丹房和会客的敞轩。来贺的客人转了一圈，都说总算有了真人的气象。",
      effect: { inv: { "灵石": -80 } } },
    { id: "js1_qiuyu", type: "chance", cat: "renji", realms: [2], cond: { cultMax: 1800 },
      text: "山下大旱，里正带着乡老抬着三牲上山求雨，跪倒了一片。",
      choices: [
        { text: "出手布雨", sub: "举手之劳", effect: { attrs: { "气运": 3 } }, result: "一场透雨落了半日。里正磕了三个响头，说要给神仙立生祠，被你拦下了。" },
        { text: "婉拒", result: "你推说天机不可轻动。乡老们一步三回头地下山去了。" }
      ] },
    { id: "js1_fei", type: "trib", cat: "zhandou", realms: [2], cond: { cultMax: 1800 },
      text: "邻县闹匪，匪首是个炼气散修，官府奈何不得，辗转求到你门上。",
      choices: [
        { text: "下山一趟", outcomes: [
          { weight: 7, result: "那散修一见你就软了，当场跪地求饶。你废了他的修为，把人交给了官府。", effect: { attrs: { "气运": 3 } } },
          { weight: 3, result: "匪首提前得了风声，早早地溜之大吉。你顺手端了他的老巢，也算有个交代。", effect: { inv: { "灵石": 60 } } }
        ] },
        { text: "不管俗务", result: "你让人回绝了。仙凡有别，这种事管一件就会有十件。" }
      ] },
    { id: "js1_biao", type: "trib", cat: "ziyuan", realms: [2], cond: { cultMax: 1800 },
      text: "北边的商路不太平，你入股的镖队折了人手。押镖的管事回来请罪，头都不敢抬。",
      choices: [
        { text: "抚恤家属", sub: "灵石 -60", cond: { inv: { "灵石": 60 } }, effect: { inv: { "灵石": -60 }, factionDelta: { rep: 1 } }, result: "你按双份抚恤发了下去。管事红着眼圈退了出去。" },
        { text: "按例处置", effect: { inv: { "灵石": -30 } }, result: "规矩就是规矩，亏损各担一半。管事躬身退了。" }
      ] },
    { id: "js1_zuobiao", type: "chance", cat: "ziyuan", realms: [2], cond: { cultMax: 1800 },
      text: "最大的那支商队慕名而来，想请你挂名坐镖——分文不出，只借你的名号，年年抽成孝敬。",
      choices: [
        { text: "应下", sub: "灵石 +100", effect: { inv: { "灵石": 100 }, renqing: 1 }, result: "你的旗号挂出去头一年，商队一趟都没被劫过。东家亲自把抽成送上了山。" },
        { text: "推了", result: "名号借出去，因果也就借出去了。你不缺这点灵石。" }
      ] },
    { id: "js1_baishi", type: "daily", cat: "renji", realms: [2], cond: { cultMax: 1800, flag: "开府" },
      text: "开府头一年，求拜师的踏破了门槛。你亲自考校了三日，挑下三个苗子，其余的，好言劝了回去。",
      effect: { factionDelta: { disciples: 1 } } },
    { id: "js1_fengyin", type: "flavor", cat: "renji", realms: [2], cond: { cultMax: 1800, factionRoute: "zong" },
      text: "领了峰主印信的头一个月，各峰执事轮着来拜。礼物你都让账房记了档，回头按着单子一一回礼。" },
    { id: "js1_mengyue", type: "flavor", cat: "renji", realms: [2], cond: { cultMax: 1800, factionRoute: "san" },
      text: "立盟头一年，元老们议事总爱问你的意思。你渐渐明白，盟主两个字，一半是决断，一半是公道。" },
    { id: "js1_xiaoxi", type: "daily", cat: "renji", realms: [2], cond: { cultMax: 1800 },
      text: "黑市里有人卖你的消息：喜好、洞府方位、出行规律，作价二十灵石一份。你买了一套回来，把自己出行的老规矩全改了。" },
    { id: "js1_yinzheng", type: "chance", cat: "xiulian", realms: [2], cond: { cultMax: 1800 },
      text: "一位老牌金丹真人邀你论道印证，话说得客气，眼神却在掂你的斤两。",
      choices: [
        { text: "奉陪", sub: "印证半日", outcomes: [
          { weight: 6, result: "半日印证，你与他斗得难解难分。他收手拱手，从此认了你这个平辈。", effect: { attrs: { "气运": 2, "神识": 2 } } },
          { weight: 4, result: "你输了半招。他倒没得意，只说年轻人进境真快，再过十年怕要换他请教。", effect: { attrs: { "神识": 3 } } }
        ] },
        { text: "推了", result: "你推说新近结丹，境界还未稳固。他笑笑，也就没再邀请。" }
      ] },
    { id: "js1_chongzou", type: "flavor", cat: "xinjing", realms: [2], cond: { cultMax: 1800 },
      text: "你沿着当年下山历练的路重走了一遍。当年歇脚的破庙还在，你在墙上题的字，被雨水洇没了大半。" },
    { id: "js1_shengci", type: "daily", cat: "renji", realms: [2], cond: { cultMax: 1800 },
      text: "凡人真给你立了生祠，香火还挺旺。你哭笑不得，趁夜把神像的面容改模糊了些——太像了，容易招因果。",
      effect: { attrs: { "气运": 2 } } },
    { id: "js1_tibian", type: "chance", cat: "renji", realms: [2], cond: { cultMax: 1800 },
      text: "坊市新开了家丹阁，掌柜的备了厚礼，想请你题一块匾，润笔五十灵石。",
      choices: [
        { text: "题", sub: "灵石 +50", effect: { inv: { "灵石": 50 } }, result: "你提笔写了「货真价实」四个字。掌柜的如获至宝，当场叫人刻匾挂匾。" },
        { text: "不题", result: "你婉拒了。字挂出去容易，想摘下来就难了。" }
      ] },
    { id: "js1_maoming", type: "trib", cat: "zhandou", realms: [2], cond: { cultMax: 1800 },
      text: "有人打着你的名号在外招摇撞骗，苦主抬着被骗空的箱子，找上了你的山门。",
      choices: [
        { text: "亲自缉拿", sub: "同阶斗法", battle: {
          name: "冒名骗子", tier: 1, demonic: false, elem: "金",
          winText: "骗子被你的人押回山门，当着苦主的面吐出了全部赃款。你把他交给了受害的几家处置。",
          winEffect: { factionDelta: { rep: 1 } }, wuxue: [60, 120],
          lightText: "骗子的遁术滑溜，你追出三百里才把他拿下。", lightEffect: {},
          heavyText: "骗子狗急跳墙，拼死反咬了你一口。", heavyEffect: { sanShang: 1 },
          deathText: "阴沟里翻了船，竟栽在一个骗子手里。兵解。"
        } },
        { text: "发一道声明", result: "你让门下把声明贴遍坊市：凡打着你的名号行事者，一查到底严惩不贷。风波渐渐平息了下去。" }
      ] },
    { id: "js1_gongfeng", type: "daily", cat: "ziyuan", realms: [2], cond: { cultMax: 1800, flag: "开府" },
      text: "峰下灵脉平稳，供奉月月如常到账。你在账册上批了个「阅」字——从前这些东西，你见都没见过。",
      effect: { inv: { "灵石": 60 } } },
    { id: "js1_danlu", type: "daily", cat: "xiulian", realms: [2], cond: { cultMax: 1800 },
      text: "丹房头一炉开炼，成丹率不到四成。你捏着一把废丹看了半天，想起当年在药园捉虫的日子。" },
    { id: "js1_jiechou", type: "chance", cat: "renji", realms: [2], cond: { cultMax: 1800 },
      text: "当年跟你结过梁子的修士听说你结了丹，连夜搬了家，又托中间人送来一封服软的信。",
      choices: [
        { text: "一笑置之", sub: "得饶人处", effect: { factionDelta: { rep: 1 } }, result: "你让中间人带话：过去的就过去了。听说那人当晚多喝了三杯。" },
        { text: "回信敲打", effect: { attrs: { "气运": 2 } }, result: "你回了八个字：「好自为之，下不为例」。中间人说，那人接信时手都在抖。" }
      ] },
    { id: "js1_baike", type: "daily", cat: "renji", realms: [2], cond: { cultMax: 1800 },
      text: "附近宗门的年轻长老来拜山，话里话外都是试探。你留他吃了顿便饭，什么也没承诺，什么也没问。" },
    { id: "js1_tuna2", type: "flavor", cat: "xiulian", realms: [2], cond: { cultMax: 1800 },
      text: "金丹期的吐纳与从前大不相同，灵气入体如江河入海。你足足花了半年，才适应这份宽裕。" },
    { id: "js1_shenshi", type: "daily", cat: "xiulian", realms: [2], cond: { cultMax: 1800 },
      text: "神识外放百里，山下的鸡鸣狗吠尽收心底。你花了些日子，才学会把不想要的动静关在门外。",
      effect: { attrs: { "神识": 2 } } },
    { id: "js1_wenyang", type: "daily", cat: "xiulian", realms: [2], cond: { cultMax: 1800 },
      text: "你把随身的法宝日夜温养，三个月后终于心意相通。如今它在你掌心，比自己的手指还听话。" },
    { id: "js1_heli", type: "daily", cat: "renji", realms: [2], cond: { cultMax: 1800 },
      text: "附近的散修凑份子给你送了份贺礼，礼单薄薄一页，情意却不轻。你按着名单，一家一家回了访。",
      effect: { attrs: { "气运": 2 } } },
    { id: "js1_chaogong", type: "flavor", cat: "renji", realms: [2], cond: { cultMax: 1800, factionRoute: "zong" },
      text: "宗门大典，你头一回坐在长老席上。司仪唱名唱到你时，「真人」两个字喊得格外响。" },
    { id: "js1_guanchao", type: "flavor", cat: "xiulian", realms: [2], cond: { cultMax: 1800 },
      text: "你在东海之滨看了一场大潮。潮水退下去的时候，你想明白了一个卡了三年的关窍。",
      effect: { attrs: { "悟性": 2 } } },
    { id: "js1_shenxian", type: "daily", cat: "renji", realms: [2], cond: { cultMax: 1800 },
      text: "山下的孩童追着你喊神仙，你给了他们一人一颗糖。孩子的父亲说，这糖他要拿回家供起来。",
      effect: { attrs: { "气运": 2 } } },
    { id: "js1_jyou1", type: "chance", cat: "renji", realms: [2], chain: "jyou_1", highlight: true, cond: { cultMax: 1800 },
      text: "炼气时同铺的周福来访，背着一个酒葫芦。他说这辈子结丹无望，寿元眼见着到头了，想趁腿脚还利索，跟你走一趟当年约好要一起去的大泽。",
      choices: [
        { text: "陪他走一趟", sub: "三个月", effect: { flag: "周福同游", attrs: { "神识": 2 } }, result: "你们走了三个月，把当年吹过的牛一个一个兑现了。回来那天，周福说这辈子值了。" },
        { text: "正逢闭关，推了", effect: { flag: "周福同游", attrs: { "气运": -2 } }, result: "周福笑笑，说正事要紧，背着酒葫芦走了。你在山门口站了很久。" },
        { text: "邀他上山住一阵", sub: "叙叙旧", effect: { flag: "周福同游", renqing: 1 }, result: "你留他在客院住了半月。他白天晒晒太阳，夜里陪你喝两盅，把当年的事翻来覆去讲了个遍。走那天他说：这几十年，就这半月，活得最像个人。" }
      ] }
];
