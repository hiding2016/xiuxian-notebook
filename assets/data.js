/* 修仙记事本 · 数据文件 v1.1（炼气 13 层 → 筑基）
 * 蓝本：凡人修仙传（境界/寿元/13层）× 鬼谷八荒（修为+材料双线突破）
 * 事件字段：
 *  type: daily 常规 | chance 机遇 | trib 劫难 | miracle 奇遇 | flavor 留白
 *  cat: xiulian 修炼 | ziyuan 资源 | zhandou 战斗 | renji 人际 | xinjing 心境 | jiyuan 机缘
 *  layers: [最低层, 最高层]（1-13；筑基后事件用 cond.flag:"筑基"）
 *  chain: 链 id（如 pianzi_1，需 pianzi_0/前序已触发；命名按链顺序）
 *  cooldown: 触发后 N 年内不再出现
 *  cond: { min,max,flag,flag2,notFlag,notFlag2,inv }
 *  effect: { attrs, inv, flag, realmLoss }
 */
window.GAME_DATA = {
  attrs: ["灵根", "悟性", "根骨", "气运", "神识"],
  totalPoints: 200,
  maxAttr: 100,
  /* 炼气 13 层：每层修为需求（累计 650 圆满） */
  layerNeed: [0, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80],
  lifespanBase: 120,

  /* v2 境界配置：need=该境界圆满修为；筑基分初/中/后三段；结丹为 v2 封顶 */
  realms: [
    { name: "炼气", need: 650 },
    { name: "筑基", need: 1500, stages: [["初期", 0], ["中期", 400], ["后期", 900]] },
    { name: "结丹", need: 0 }
  ],
  /* 背包丹药槽（叠放） */
  pills: ["聚气丹", "筑基丹", "符咒", "凝元丹", "结金丹"],
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
    { id: "paoshang", name: "跑商世家", desc: "家里世代跑商，灵石 +30，气运 +5", effect: { inv: { "灵石": 30 }, attrs: { "气运": 5 } } }
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
    /* ================= 里程碑 ================= */
    { id: "born", milestone: 0, type: "daily", cat: "renji", layers: [1, 1], text: "你生在山脚小村。十二岁那年，云游的仙长路过，测出你身怀灵根。", highlight: true },
    { id: "yinqi", milestone: 2, type: "daily", cat: "xiulian", layers: [1, 1], text: "引气入体！第一缕灵气沉入丹田那晚，你激动得整夜未眠。", highlight: true },
    { id: "join_zongmen", age: [0, 2], type: "daily", cat: "renji", layers: [1, 2], cond: { flag: "宗门" }, text: "凭着故旧渊源，你直接被收入内门。同门看你的眼神，又是羡慕又是嫉妒。" },
    { id: "join_outer", age: [0, 2], type: "daily", cat: "renji", layers: [1, 2], cond: { notFlag: "宗门", notFlag2: "散修" }, text: "你拜入青云宗外门，领了一身粗布道袍、一块身份玉牌，和每月两块灵石的月例。", effect: { inv: { "灵石": 4 } } },
    { id: "join_sanxiu", age: [0, 2], type: "daily", cat: "renji", layers: [1, 2], cond: { flag: "散修" }, text: "你无门无派，揣着半本残诀下了山。散修的路，走一步算一步。" },


    /* ================= 入门童年（1-10年） ================= */
    { id: "kid_zama", type: "daily", cat: "xiulian", layers: [1, 4], cooldown: 4, text: "每日天不亮就起来扎马步、挑水。师兄说，根基都是这么熬出来的。", effect: { attrs: { "根骨": 1 } } },
    { id: "kid_shizi", type: "flavor", cat: "xiulian", layers: [1, 3], cooldown: 6, text: "老修士教你们认字：「道经三千，先识字，然后再识道。」" },
    { id: "kid_daza", type: "daily", cat: "ziyuan", layers: [1, 4], cond: { notFlag: "散修" }, cooldown: 4, text: "你在膳堂帮厨，劈柴烧火一个月，管事赏了你一块灵石。", effect: { inv: { "灵石": 1 } } },
    { id: "kid_sleep", type: "flavor", cat: "xiulian", layers: [1, 5], cooldown: 6, text: "讲法课上你睡着了，被戒尺敲了三下。屁股摔得生疼，但梦做得格外甜。" },
    { id: "kid_play", type: "flavor", cat: "renji", layers: [1, 4], cooldown: 6, cond: { notFlag: "散修" }, text: "你和邻铺的弟子偷溜下山，买了串糖葫芦。回门时被抓，罚扫三天台阶。" },
    { id: "kid_body", type: "daily", cat: "xiulian", layers: [1, 5], cooldown: 5, text: "晨跑三十里，你咬着牙跑完了全程。感觉筋骨结实了一点。", effect: { attrs: { "根骨": 1 } } },
    /* ================= 新手期 1-4 层 ================= */
    /* 修炼 */
    { id: "a_tuna", type: "daily", cat: "xiulian", layers: [1, 4], cooldown: 4, weight: 1.2, text: "你在蒲团上吐纳一夜，灵气在经脉里多转了三个周天。" },
    { id: "a_gongfa", milestone: 1, type: "daily", cat: "xiulian", layers: [1, 1], cond: { notFlag: "散修" }, text: "传功堂发下基础功法《引气诀》。你翻了一夜，还是似懂非懂。" },
    { id: "a_gongfa_san", milestone: 1, type: "daily", cat: "xiulian", layers: [1, 1], cond: { flag: "散修" }, text: "你捧着那半本残诀，一个字一个字地啃。没人教，那就自己悟。" },
    { id: "a_gongfa2", type: "daily", cat: "xiulian", layers: [1, 3], cond: { min: { "悟性": 60 } }, text: "《引气诀》你三天就吃透了，还挑出两处错漏。传功师兄表情复杂。", effect: { attrs: { "悟性": 3 } } },
    { id: "a_slow", type: "daily", cat: "xiulian", layers: [1, 4], cond: { max: { "灵根": 40 } }, text: "灵气入体如泥牛入海。你终于明白，灵根差，是什么意思。" },
    { id: "a_fast", type: "daily", cat: "xiulian", layers: [1, 4], cond: { min: { "灵根": 70 } }, text: "灵气争先恐后往你体内钻。隔壁铺的师兄酸了：「人比人，真能气死人。」", effect: { attrs: { "气运": 2 } } },
    { id: "a_zhoutian", type: "daily", cat: "xiulian", layers: [2, 5], cooldown: 5, text: "你第一次完整运行大周天，收功时东方既白，浑身说不出的舒坦。" },
    /* 资源 */
    { id: "a_lingtian", type: "daily", cat: "ziyuan", layers: [1, 5], cond: { notFlag: "散修" }, cooldown: 4, text: "灵田除草三日，换五块灵石。腰快断了，但储物袋沉了一点。", effect: { inv: { "灵石": 5 } } },
    { id: "a_task1", type: "daily", cat: "ziyuan", layers: [1, 5], cond: { notFlag: "散修" }, cooldown: 4, text: "你接了给药园捉虫的任务，报酬微薄，但胜在安全。", effect: { inv: { "灵石": 4 } } },
    { id: "a_caiyao", type: "daily", cat: "ziyuan", layers: [1, 6], cooldown: 4, text: "你上山采药，背篓装满时天色已晚，药童多给了你一块灵石。", effect: { inv: { "灵石": 4 } } },
    { id: "a_fangshi", type: "daily", cat: "ziyuan", layers: [1, 13], cooldown: 6, text: "坊市人来人往。你逛了一整天，什么也没买，光是过了一回眼瘾。" },
    /* 战斗 */
    { id: "a_tuzi", type: "daily", cat: "zhandou", layers: [1, 5], cooldown: 5, text: "后山窜出一只妖兔。你手忙脚乱才打赢，兔肉烤着很香。", effect: { attrs: { "根骨": 2 } } },
    { id: "a_yanwu", minAge: 12, type: "daily", cat: "zhandou", layers: [2, 6], cond: { notFlag: "散修" }, cooldown: 5, text: "演武堂对练，你被师兄放倒七次。第八次，你撑过了十招。", effect: { attrs: { "根骨": 3 } } },
    { id: "a_hurt1", minAge: 16, type: "trib", cat: "zhandou", layers: [1, 6], cond: { max: { "根骨": 45 } }, text: "下山历练遇上妖狼，你拼死逃脱，腿上多了道疤。", effect: { attrs: { "根骨": -4 } } },
    /* 人际 */
    { id: "a_shixiong", type: "daily", cat: "renji", layers: [1, 6], cond: { notFlag: "散修" }, cooldown: 5, text: "师兄拉你去后山喝酒，讲了一夜里门内八卦。你记住了：三长老和五长老不对付。" },
    { id: "a_shimei", type: "daily", cat: "renji", layers: [1, 8], cond: { min: { "气运": 50 } }, cooldown: 6, text: "师妹向你请教功法，你讲得口干舌燥，她塞给你一篮灵果。", effect: { attrs: { "根骨": 3 } } },
    { id: "a_friend", type: "daily", cat: "renji", layers: [1, 9], cooldown: 8, text: "你和隔壁铺的赵四成了朋友，约好将来一起下山历练。" },
    { id: "a_home_1", type: "flavor", cat: "renji", layers: [2, 8], chain: "home_1", text: "村里捎来口信，是娘托人写的：「仙山的饭，吃得惯吗？别省钱。」" },
    { id: "a_home", type: "flavor", cat: "renji", layers: [2, 9], chain: "home_2", cooldown: 8, text: "夜里想家。你摸出离家时娘塞的煮鸡蛋，已经凉了，你吃得很慢。" },
    /* 心境 */
    { id: "a_star", type: "flavor", cat: "xinjing", layers: [1, 13], cooldown: 8, text: "你在山顶看了一夜星。所谓长生，大概是想多看几年这样的夜。" },
    { id: "a_doubt", type: "daily", cat: "xinjing", layers: [2, 8], cooldown: 6, cond: { max: { "灵根": 45 } }, text: "看着同门接连破境，你第一次问自己：我真的适合修仙吗？" },
    /* 机缘 */
    { id: "a_yupei", type: "miracle", cat: "jiyuan", layers: [1, 8], cond: { min: { "气运": 65 } }, highlight: true,
      text: "溪边浣衣，你摸起一块温润古玉，灵气隐现，一看就不是凡品。",
      choices: [
        { text: "揣进怀里", sub: "宝物动人心", outcomes: [
          { weight: 75, result: "是块上好的养魂玉！夜里贴身佩戴，神识日日温养。", effect: { attrs: { "神识": 8 } } },
          { weight: 25, result: "这玉是有主的！主人找上门来，你赔礼又赔钱才脱身。", effect: { inv: { "灵石": -8 }, attrs: { "神识": -2 } } }
        ] },
        { text: "放回去", sub: "来路不明的少碰", result: "你把玉放回溪里。稳妥是稳妥，就是夜里总想起它。" }
      ] },
    { id: "a_lingshi_find", type: "daily", cat: "jiyuan", layers: [1, 13], cond: { min: { "气运": 60 } }, cooldown: 6, text: "山路转角，一块无主灵石静静躺在草丛里。", effect: { inv: { "灵石": 8 } } },

    /* ================= 成长期 5-9 层 ================= */
    /* 修炼 */
    { id: "b_pingjing", type: "daily", cat: "xiulian", layers: [5, 9], cooldown: 5, text: "你卡在瓶颈，三个月修为纹丝不动，急得你嘴里起了泡。" },
    { id: "b_dunwu", type: "daily", cat: "xiulian", layers: [5, 11], cond: { min: { "悟性": 65 } }, cooldown: 8, highlight: true, text: "卡了半年的瓶颈被一场山雨点醒。你推开窗，大笑三声，修为豁然贯通。" },
    { id: "b_biguan", type: "daily", cat: "xiulian", layers: [5, 12], cooldown: 6, text: "你闭了三个月死关，出关时胡子老长，修为精进不少。" },
    { id: "b_book", type: "daily", cat: "xiulian", layers: [5, 13], cond: { min: { "悟性": 55 }, notFlag: "散修" }, cooldown: 6, text: "藏经阁角落，一本前人笔记里夹着的批注让你茅塞顿开。", effect: { attrs: { "悟性": 4 } } },
    { id: "b_book_fail", type: "daily", cat: "xiulian", layers: [5, 9], cond: { max: { "悟性": 35 } }, cooldown: 5, text: "你啃了三个月高阶功法，字都认识，连起来不懂。" },
    { id: "b_shenshi", type: "daily", cat: "xiulian", layers: [5, 13], cond: { min: { "神识": 60 } }, cooldown: 6, text: "夜里神识外放，你第一次「看」到十里外的流萤。天地从未如此清晰。", effect: { attrs: { "神识": 4 } } },
    /* 资源 */
    { id: "b_cheated", minAge: 10, type: "trib", cat: "ziyuan", layers: [3, 10], cond: { max: { "气运": 45 } }, chain: "pianzi_1", text: "你花十块灵石买了颗「千年灵芝」，回去一泡——是萝卜。摊主早没影了。", effect: { inv: { "灵石": -10 } } },
    { id: "b_taobao", type: "chance", cat: "ziyuan", layers: [4, 11], cond: { min: { "气运": 60 } }, text: "地摊角落一块黑乎乎的「废铁」，你鬼使神差买了下来——是块玄铁精！", effect: { inv: { "灵石": 20 } } },
    { id: "b_dushi", type: "chance", cat: "ziyuan", layers: [5, 12], cond: { min: { "气运": 65 } }, text: "坊市赌石，你随手挑的那块开出了灵晶！围观修士眼都红了。", effect: { inv: { "灵石": 18 } } },
    { id: "b_lose_stone", type: "trib", cat: "ziyuan", layers: [4, 13], cond: { max: { "气运": 40 } }, cooldown: 6, text: "储物袋破了个洞，灵石撒了一路，捡回来时少了八块。", effect: { inv: { "灵石": -8 } } },
    { id: "b_danlu", type: "daily", cat: "ziyuan", layers: [5, 13], cond: { flag: "丹道" }, cooldown: 5, text: "你开炉炼丹，一炉聚气丹成色上乘。丹房长老直呼捡到宝了。", effect: { inv: { "聚气丹": 2 }, attrs: { "悟性": 2 } } },
    { id: "b_danlu_boom", type: "trib", cat: "ziyuan", layers: [5, 13], cond: { flag: "丹道", max: { "气运": 40 } }, text: "炸炉了。你被崩得满脸黑，丹房三个月不许你进。", effect: { attrs: { "根骨": -3 } } },
    { id: "b_task2", type: "daily", cat: "ziyuan", layers: [5, 12], cond: { notFlag: "散修" }, cooldown: 5, text: "你随队护送商队，一路上有惊无险，酬劳也还过得去。", effect: { inv: { "灵石": 10 } } },
    /* 战斗 */
    { id: "b_dabi", minAge: 16, type: "chance", cat: "zhandou", layers: [5, 10], cond: { notFlag: "散修", min: { "根骨": 50 } }, highlight: true, text: "外门大比，你连胜七场杀进前十。长老们第一次记住了你的名字。", effect: { inv: { "灵石": 15 }, attrs: { "气运": 3 } } },
    { id: "b_dabi_lose", minAge: 16, type: "trib", cat: "zhandou", layers: [5, 10], cond: { notFlag: "散修", max: { "根骨": 40 } }, text: "外门大比，你第一轮就下台了。场边有人喊「下一个」。" },
    { id: "b_yaolang", minAge: 16, type: "trib", cat: "zhandou", layers: [5, 11], cooldown: 6, text: "历练途中遭遇妖狼群，你且战且退，杀出重围时道袍已成布条。", effect: { attrs: { "根骨": 4 } } },
    { id: "b_jianzhong", type: "miracle", cat: "zhandou", layers: [5, 13], cond: { flag: "剑修", notFlag: "佩剑" }, highlight: true, text: "你误入剑冢，冢中万剑齐鸣。一柄锈剑主动落入你手，当场认了主。", effect: { flag: "佩剑", attrs: { "根骨": 5 } } },
    { id: "b_jianyi", type: "daily", cat: "zhandou", layers: [7, 13], cond: { flag: "佩剑" }, cooldown: 6, text: "你练剑三年，一剑斩出，瀑布断流一瞬。剑意初成。", effect: { attrs: { "神识": 4 } } },
    /* 人际 */
    { id: "b_zandui", minAge: 14, type: "daily", cat: "renji", layers: [5, 10], cond: { notFlag: "散修" }, cooldown: 7, text: "门内两派明争暗斗，都有人递来橄榄枝。你装傻，两边都不得罪。" },
    { id: "b_elder", type: "chance", cat: "renji", layers: [5, 12], cond: { notFlag: "散修", min: { "灵根": 65 } }, chain: "shitu_1", text: "一位长老看你演功，点头说了句「可造之材」。你高兴了好几天。", effect: { attrs: { "悟性": 3 } } },
    { id: "b_betray", type: "trib", cat: "renji", layers: [5, 11], cond: { max: { "气运": 40 } }, text: "你信任的师兄把你的任务功劳据为己有。你去找执事，执事和稀泥。", effect: { attrs: { "神识": 3 } } },
    { id: "b_drink", type: "flavor", cat: "renji", layers: [5, 13], cooldown: 7, text: "休沐日，几个同门凑钱买了坛灵酒，吹牛吹到半夜。" },
    /* 心境 */
    { id: "b_xinmo1", minAge: 14, type: "trib", cat: "xinjing", layers: [6, 11], chain: "xinmo_1", text: "瓶颈期第三个月，你夜里惊醒：父母在老去，道途看不到头。念头像野草疯长。" },
    { id: "b_mortal", type: "flavor", cat: "xinjing", layers: [5, 13], cooldown: 8, text: "回村探亲，儿时玩伴已是两个孩子的爹。他问你：修仙苦不苦？你笑了笑，终究没有答话。" },
    { id: "b_mortal2", type: "flavor", cat: "xinjing", layers: [8, 13], cooldown: 10, highlight: true, text: "再回村时，村口老槐树还在，认识你的人却没有了。你站了很久。" },
    /* 机缘 */
    { id: "b_cave", type: "miracle", cat: "jiyuan", layers: [5, 12], cond: { min: { "神识": 55 }, notFlag: "洞天" }, highlight: true,
      text: "你发现一处废弃洞府，隐约有聚灵阵的波动，但门口残留着警示的刻痕。",
      choices: [
        { text: "进去探探", sub: "机缘与风险并存", outcomes: [
          { weight: 7, result: "聚灵阵残阵完好！这处福地，从今往后归你了。", effect: { flag: "洞天" } },
          { weight: 3, result: "残阵突然反噬，灵光炸开，你被掀出洞府，躺了半个月才下地。", effect: { attrs: { "根骨": -6 } } }
        ] },
        { text: "绕开", sub: "警示不是白刻的", result: "你多看了两眼，转身离开了。命比机缘重要。" }
      ] },
    { id: "b_lingshou1", type: "miracle", cat: "jiyuan", layers: [4, 12], cond: { flag: "御兽", notFlag: "灵兽" }, chain: "linghu_1", highlight: true, text: "你在陷阱里救出一只灵狐幼崽。它舔了舔你的手，赖着不走了。", effect: { flag: "灵兽" } },
    { id: "b_mijing_in", minAge: 20, type: "chance", cat: "jiyuan", layers: [6, 13], cond: { min: { "气运": 55 } }, cooldown: 10, text: "秘境开启，你跟着人潮涌入。风险与机缘并存的地方。", effect: { inv: { "灵石": 12 } } },

    /* ================= 圆满期 10-13 层 ================= */
    { id: "c_ningyuan", type: "daily", cat: "xiulian", layers: [10, 13], cooldown: 4, text: "真元在丹田凝成液滴，距离圆满又近一分。" },
    { id: "c_leijie_yugan", type: "daily", cat: "xiulian", layers: [11, 13], cooldown: 6, text: "夜里你隐隐感到天威——雷劫不远了。既期待，又有些害怕。" },
    { id: "c_zhidao", type: "chance", cat: "renji", layers: [10, 13], cond: { notFlag: "散修", min: { "灵根": 60 } }, text: "筑基期师叔讲法，一句「真元九转，方可叩关」让你少走三年弯路。", effect: { attrs: { "悟性": 5 } } },
    { id: "c_auction", type: "daily", cat: "ziyuan", layers: [9, 13], cooldown: 6, text: "拍卖会上，一枚筑基丹被抬到一百二十灵石。你摸了摸口袋，沉默了好一会儿。" },
    { id: "c_zhunbei", type: "daily", cat: "ziyuan", layers: [10, 13], cooldown: 5, text: "你开始为筑基盘点家底：灵石、丹药、护身符。一样都不能少。" },
    { id: "c_moyan", minAge: 18, type: "daily", cat: "zhandou", layers: [10, 13], cond: { min: { "根骨": 55 } }, cooldown: 6, text: "你主动请缨镇压妖兽动乱，一身伤痕换来了实打实的杀伐经验。", effect: { attrs: { "根骨": 5 }, inv: { "灵石": 12 } } },
    { id: "c_daoxin", type: "trib", cat: "xinjing", layers: [10, 13], chain: "xinmo_2", text: "圆满在即，心魔却越来越强。镜子里的人问你：「若筑基失败，你这一生算什么？」" },
    { id: "c_qishi", type: "daily", cat: "renji", layers: [10, 13], cond: { notFlag: "散修" }, cooldown: 6, text: "同层修士看你的眼神变了：有人巴结，有人疏远，有人下绊子。" },

    /* ================= 天材地宝（筑基材料） ================= */
    { id: "m_lingsui", minAge: 20, type: "miracle", cat: "jiyuan", layers: [8, 13], cond: { notFlag: "灵髓" }, highlight: true,
      text: "地脉深处，一汪灵髓微光荡漾——但泉边盘着一条独角蛟。",
      choices: [
        { text: "趁它熟睡取宝", sub: "气运高更稳", outcomes: [
          { weight: 7, result: "你屏息取了灵髓，独角蛟翻了个身，并没有醒来。材料到手一件！", effect: { flag: "灵髓" } },
          { weight: 3, result: "蛟目圆睁！你连滚带爬逃出地脉，灵髓洒了大半。", effect: { attrs: { "根骨": -5 } } }
        ] },
        { text: "从长计议", sub: "命只有一条", result: "你记下位置退走了。那汪灵髓，日后若有实力再来取。" }
      ] },
    { id: "m_dihuo", minAge: 20, type: "miracle", cat: "jiyuan", layers: [8, 13], cond: { notFlag: "地火莲" }, highlight: true,
      text: "火山岩缝，一株地火莲开得正艳，周围岩浆翻涌。",
      choices: [
        { text: "冒险采摘", sub: "根骨高更抗烫", outcomes: [
          { weight: 7, result: "你守了三天，趁岩浆退潮一把采下！天材地宝，如今已得其一。", effect: { flag: "地火莲" } },
          { weight: 3, result: "岩浆突然喷涌，你半边袖子烧没了，只能狼狈而逃。", effect: { attrs: { "根骨": -6 } } }
        ] },
        { text: "记下位置", sub: "不逞一时之勇", result: "你在岩壁上刻下记号，转身离开了这里。莲花年年开，命只有一条。" }
      ] },
    { id: "m_tianlei", minAge: 20, type: "miracle", cat: "jiyuan", layers: [8, 13], cond: { notFlag: "天雷竹" }, highlight: true,
      text: "雷暴之夜，孤峰之上一截天雷竹引雷而鸣。上去，还是不上？",
      choices: [
        { text: "冒雷登顶", sub: "雷可不长眼", outcomes: [
          { weight: 7, result: "你在雷雨中攀上峰顶，取下天雷竹。掌心至今发麻。", effect: { flag: "天雷竹" } },
          { weight: 3, result: "一道惊雷劈在身旁，你被气浪掀下山坡，躺了一个月。", effect: { attrs: { "根骨": -7 } } }
        ] },
        { text: "等雷停", sub: "稳妥要紧", result: "你等到雷停才上去——竹子还在，就是灵性散了几分。也算到手。", effect: { flag: "天雷竹" } }
      ] },

    /* ================= 链式：骗子链 ================= */
    { id: "pianzi_2", type: "chance", cat: "renji", layers: [4, 12], chain: "pianzi_2",
      text: "坊市转角，你撞见当年卖你「千年灵芝」的骗子，他正忽悠别人。",
      choices: [
        { text: "当众拆穿", sub: "出了这口恶气", result: "你当场拆穿他。众人叫好，骗子抱头鼠窜，你的灵石也要了回来。", effect: { inv: { "灵石": 10 }, attrs: { "气运": 3 } } },
        { text: "暗中跟踪", sub: "看看他什么来路", result: "你跟着他到了破庙——他对着一个病弱孩童嘘寒问暖。你沉默了。", effect: { flag: "pianzi_shan" } }
      ] },
    { id: "pianzi_3", type: "miracle", cat: "renji", layers: [5, 13], chain: "pianzi_3", cond: { flag: "pianzi_shan" }, highlight: true,
      text: "你又在破庙见到那骗子。这次他说了实话：他是落难的阵法师，骗钱只为给孩子治病。作为答谢，他送你一张残阵图。", effect: { flag: "洞天", attrs: { "悟性": 5 } } },

    /* ================= 链式：报恩链 ================= */
    { id: "baoen_2", minAge: 18, type: "miracle", cat: "renji", layers: [6, 13], chain: "baoen_2", highlight: true,
      text: "当年你救下的重伤散修找上门来——他已筑基成功。「道友仁义，这枚筑基丹，请务必收下。」", effect: { inv: { "筑基丹": 1 } } },

    /* ================= 链式：仇家链 ================= */
    { id: "choujia_2", minAge: 18, type: "trib", cat: "zhandou", layers: [6, 13], chain: "choujia_2",
      text: "当年秘境夺宝的仇家寻上门来，点名要与你「切磋」。",
      choices: [
        { text: "迎战", sub: "根骨高更有胜算", result: "三十回合后你胜了半招。他拱拱手：「恩怨两清。」", effect: { attrs: { "根骨": 5 }, flag: "chou_jie" } },
        { text: "避战赔礼", sub: "灵石 -20，息事宁人", cond: { inv: { "灵石": 20 } }, result: "你赔了一笔灵石。他拿了东西走人，你心里憋屈。", effect: { inv: { "灵石": -20 } } }
      ] },
    { id: "choujia_3", type: "chance", cat: "renji", layers: [7, 13], chain: "choujia_3", cond: { flag: "chou_jie" },
      text: "昔日的仇家如今见你就递灵酒：「不打不相识！下次秘境，组队？」多一个能打的朋友，感觉还不赖。", effect: { attrs: { "气运": 5 } } },

    /* ================= 链式：道侣链 ================= */
    { id: "daolv_2", minAge: 22, type: "trib", cat: "renji", layers: [7, 13], chain: "daolv_2", cond: { flag: "道侣" },
      text: "道侣外出历练重伤归来，需要百年灵药续命。药铺开价五十灵石。",
      choices: [
        { text: "砸锅卖铁也要救", sub: "灵石 -50（不够也得掏）", cond: { inv: { "灵石": 50 } }, result: "你守在榻前七天七夜。TA醒来第一句话：「傻瓜。」", effect: { inv: { "灵石": -50 }, attrs: { "气运": 8 } } },
        { text: "入山寻药", sub: "用自己的方式救", result: "你在深山搏杀半月，浑身是伤地采回灵药。TA哭了，你笑了。", effect: { attrs: { "根骨": -5, "气运": 5 } } }
      ] },
    { id: "daolv_3", minAge: 22, type: "flavor", cat: "renji", layers: [8, 13], chain: "daolv_3", cond: { flag: "道侣" }, cooldown: 10,
      text: "月圆之夜，你与道侣并肩坐在峰顶。TA说：「长生路远，有你就不远。」" },

    /* ================= 链式：心魔链 ================= */
    { id: "xinmo_3", type: "trib", cat: "xinjing", layers: [10, 13], chain: "xinmo_3", highlight: true,
      text: "心魔大劫！无数个声音在你识海里嘶吼：放弃吧，凡人就该有凡人的命。",
      choices: [
        { text: "直面心魔", sub: "破而后立（神识高更稳）", result: "你睁眼时泪流满面，灵台却前所未有的清明。心魔，散了。", effect: { attrs: { "神识": 12 }, flag: "心魔已除" } },
        { text: "强行压制", sub: "稳住，别浪", result: "你把心魔强压下去，但道基震出一道裂痕。", effect: { attrs: { "根骨": -8 }, flag: "走火入魔" } }
      ] },

    /* ================= 抉择：机遇年 ================= */
    { id: "c_dan_buy", type: "chance", cat: "ziyuan", layers: [4, 12],
      text: "坊市丹铺，聚气丹三十灵石一枚，掌柜说是「最后一颗」。",
      choices: [
        { text: "买下", sub: "灵石 -30，聚气丹 +1", cond: { inv: { "灵石": 30 } }, result: "丹药入手温润，确认是正品。", effect: { inv: { "灵石": -30, "聚气丹": 1 } } },
        { text: "不买", sub: "捂紧口袋", result: "你转身走了。万一是真的呢？算了，不想了。" }
      ] },
    /* ================= 拍卖会（出价玩法） ================= */
    { id: "c_zhujidan", minAge: 15, type: "chance", cat: "ziyuan", layers: [8, 13], highlight: true,
      text: "拍卖会压轴：一枚筑基丹即将开拍，各路修士虎视眈眈。",
      auction: { item: "筑基丹", base: 90, winText: "筑基丹到手，筑基在望！", loseText: "价格被一路抬到离谱，你眼睁睁看它被别人拍走。", effect: { inv: { "筑基丹": 1 } } } },
    { id: "auc_faqi", minAge: 14, type: "chance", cat: "ziyuan", layers: [5, 12], cond: { artifactMax: { "法器": 1 } },
      text: "拍卖会：「法器·流云剑」开拍，剑光如水，引来一片抽气声。",
      auction: { item: "法器·流云剑", base: 60, winText: "法器入手，剑身轻鸣，用起来如臂使指。", loseText: "流云剑被一位蒙面修士高价拍走，只留下一声剑鸣。", effect: { artifact: { "法器": 1 } } } },
    { id: "auc_dihuo", minAge: 16, type: "chance", cat: "ziyuan", layers: [8, 13], cond: { notFlag: "地火莲" },
      text: "拍卖会出现一株「地火莲」——正是筑基所需的天材地宝之一！",
      auction: { item: "地火莲", base: 50, winText: "地火莲到手！天材地宝，如今已得其一。", loseText: "地火莲与你擦肩而过。不知道下次再见是何年。", effect: { flag: "地火莲" } } },

    /* ================= 时机操作（火候玩法） ================= */
    { id: "dan_lu", minAge: 14, type: "chance", cat: "xiulian", layers: [5, 13], cond: { flag: "丹道" }, cooldown: 5,
      text: "你开炉炼丹，炉火正旺——在最佳时机止火！",
      timing: { action: "止火！",
        perfect: { result: "完美火候！丹香四溢，一炉出了两枚聚气丹。", effect: { inv: { "聚气丹": 2 }, attrs: { "悟性": 2 } } },
        good: { result: "火候尚可，这一炉成丹一枚。", effect: { inv: { "聚气丹": 1 } } },
        fail: { result: "火候差了半分，炉底只剩一层黑灰。", effect: { attrs: { "根骨": -1 } } } } },
    { id: "c_wenhuo", minAge: 12, type: "chance", cat: "xiulian", layers: [4, 12], cond: { notFlag: "丹道" }, cooldown: 8,
      text: "丹房长老临时有事，让你帮忙看炉：「火候到了就喊我！」",
      timing: { action: "就是现在！",
        perfect: { result: "你喊得恰到好处！长老大喜，塞给你一枚聚气丹。", effect: { inv: { "聚气丹": 1 }, attrs: { "悟性": 3 } } },
        good: { result: "丹成了。长老点点头，赏了几块灵石。", effect: { inv: { "灵石": 10 } } },
        fail: { result: "你喊错了时机，一炉丹废了。长老吹胡子瞪眼把你赶了出去。", effect: {} } } },

    /* ================= 多选 + 随机结果 ================= */
    { id: "c_dushi3", minAge: 14, type: "chance", cat: "ziyuan", layers: [5, 12],
      text: "赌石摊前三块原石，二十灵石任选一块。摊主笑而不语。",
      choices: [
        { text: "左边那块", sub: "其貌不扬", cond: { inv: { "灵石": 20 } }, outcomes: [
          { weight: 3, result: "一刀下去，灵晶暴闪！围观修士一片哗然。", effect: { inv: { "灵石": 60 } } },
          { weight: 7, result: "切开一看，是块普通石头。灵石白花了。", effect: { inv: { "灵石": -20 } } }
        ] },
        { text: "中间那块", sub: "隐有微光", cond: { inv: { "灵石": 20 } }, outcomes: [
          { weight: 4, result: "刀落光起！一小块灵晶，回本绰绰有余。", effect: { inv: { "灵石": 28 } } },
          { weight: 6, result: "微光只是石英的反光。认了。", effect: { inv: { "灵石": -20 } } }
        ] },
        { text: "右边那块", sub: "最贵那块", cond: { inv: { "灵石": 35 } }, outcomes: [
          { weight: 5, result: "大块灵晶！摊主脸都绿了。", effect: { inv: { "灵石": 80 } } },
          { weight: 5, result: "贵的也不一定好。三十五灵石买了个教训。", effect: { inv: { "灵石": -35 } } }
        ] }
      ] },
    { id: "c_sancha", minAge: 18, type: "chance", cat: "jiyuan", layers: [6, 13],
      text: "秘境深处三条岔路：左有药香，中有剑鸣之声，右有兽吼阵阵。",
      choices: [
        { text: "走左边", sub: "药香扑鼻", outcomes: [
          { weight: 7, result: "一片百年药田！你采了个盆满钵满。", effect: { inv: { "灵石": 28 } } },
          { weight: 3, result: "药田早被搬空，只剩几个坑。", effect: {} }
        ] },
        { text: "走中间", sub: "剑气逼人", outcomes: [
          { weight: 6, result: "剑冢遗剑！一柄法器主动认你为主。", effect: { artifact: { "法器": 1 } } },
          { weight: 4, result: "剑气太盛，你被震了出来，弄得灰头土脸。", effect: { attrs: { "根骨": -3 } } }
        ] },
        { text: "走右边", sub: "兽吼连连", outcomes: [
          { weight: 55, result: "你绕开兽群，摸到一窝灵蛋，坊市能卖好价。", effect: { inv: { "灵石": 18 } } },
          { weight: 45, result: "惊动了妖兽，你且战且退，总算狼狈逃出。", effect: { attrs: { "根骨": -5 } } }
        ] }
      ] },
    { id: "c_save", type: "chance", cat: "renji", layers: [3, 11], chain: "baoen_1",
      text: "山道上，一名散修重伤倒地，怀里鼓鼓囊囊。",
      choices: [
        { text: "救", sub: "救人一命", outcomes: [
          { weight: 75, result: "你喂他服下丹药。他醒来后深深一揖：「大恩不言谢，咱们后会有期。」", effect: { attrs: { "气运": 5 } } },
          { weight: 25, result: "他「伤」突然好了，反手抢了你五块灵石就跑。原来伤是装的。", effect: { inv: { "灵石": -5 }, attrs: { "气运": -2 } } }
        ] },
        { text: "不救", sub: "修仙界，各安天命", result: "你绕开走了。那天的夕阳，红得有些刺眼。", effect: { attrs: { "气运": -5 } } }
      ] },
    { id: "c_mijing_fight", minAge: 20, type: "chance", cat: "zhandou", layers: [6, 13], chain: "choujia_1", highlight: true,
      text: "秘境深处，一株百年灵药就在眼前，但另一位修士也同时看到了它。",
      choices: [
        { text: "夺", sub: "手快有，手慢无", result: "你先下手为强！对方撂下狠话跑了。灵药到手，仇家+1。", effect: { inv: { "灵石": 20 }, attrs: { "气运": -3 } } },
        { text: "让", sub: "多个朋友多条路", result: "你拱手相让。对方愣了愣，分了你三成，还留了传讯玉符。", effect: { inv: { "灵石": 10 }, attrs: { "气运": 5 } } }
      ] },
    { id: "c_daolv", minAge: 22, type: "chance", cat: "renji", layers: [6, 12], chain: "daolv_1", cond: { notFlag: "道侣", notFlag2: "魔修" }, highlight: true,
      text: "相交多年的道友，在桃花树下问你：「可愿与我结为道侣？」",
      choices: [
        { text: "结", sub: "从此大道不孤", result: "你们在三清像前结下同心契。修行路上，有人与你立黄昏。", effect: { flag: "道侣" } },
        { text: "婉拒", sub: "大道独行", result: "你摇了摇头。TA笑了笑说「无碍」，转身时桃花落了一肩。", effect: { attrs: { "神识": 5 } } }
      ] },
    { id: "c_lend", minAge: 12, type: "daily", cat: "renji", layers: [3, 10], cond: { inv: { "灵石": 20 }, notFlag: "散修" },
      text: "师兄找你借二十灵石应急，说下月必还。他眼神闪躲。",
      choices: [
        { text: "借", sub: "谁没个难处", cond: { inv: { "灵石": 20 } }, outcomes: [
          { weight: 7, result: "三个月后他真的还了，还多给五块利息。这位师兄，值得你去深交。", effect: { inv: { "灵石": 5 }, attrs: { "气运": 3 } } },
          { weight: 3, result: "三个月后师兄人间蒸发。二十灵石，看清一个人。", effect: { inv: { "灵石": -20 } } }
        ] },
        { text: "不借", sub: "亲兄弟明算账", result: "你拒绝了。后来听说他去借了高利，被追债追得满山跑。" }
      ] },
    { id: "c_chuancheng", minAge: 18, type: "miracle", cat: "jiyuan", layers: [8, 13], cond: { min: { "悟性": 55 }, notFlag: "古经" }, highlight: true,
      text: "古洞府中，一道残魂问你：「吾之传承，需受三问之试。敢否？」",
      choices: [
        { text: "接受考验", sub: "悟性够高就有戏", result: "三问三答，残魂抚须大笑：「善！」一部残缺古经没入你识海。", effect: { attrs: { "悟性": 10 }, flag: "古经" } },
        { text: "恭敬离开", sub: "免费的往往最贵", result: "你磕了个头退了出来。残魂没拦你，只留一声叹息。" }
      ] },
    { id: "c_mo", minAge: 18, type: "trib", cat: "xinjing", layers: [6, 13], cond: { notFlag: "魔修" }, highlight: true,
      text: "黑袍人拦住你：「正道太慢了。跟我修魔，保你十年筑基。考虑吗？」",
      choices: [
        { text: "堕入魔道", sub: "进境飞快，人人喊打", result: "你接过那枚漆黑的玉简。从此，世间少了个正道修士。", effect: { flag: "魔修", attrs: { "灵根": 10, "气运": -10 } } },
        { text: "严词拒绝", sub: "道心不可移", result: "「滚。」黑袍人笑了：「有几分骨气，只是可惜了。」你后背湿透，但道心更稳。", effect: { attrs: { "神识": 5 } } }
      ] },

    /* ================= 抉择：劫数年 ================= */
    { id: "c_task", minAge: 16, type: "trib", cat: "zhandou", layers: [4, 11], cond: { notFlag: "散修" },
      text: "宗门发布高危任务：清剿黑风寨，酬劳三十五灵石。死过人。",
      choices: [
        { text: "接", sub: "富贵险中求", outcomes: [
          { weight: 7, result: "血战一夜，山寨终于清了。你提着刀下山，手还在抖个不停。", effect: { inv: { "灵石": 35 }, attrs: { "根骨": 5 } } },
          { weight: 3, result: "寨里早有埋伏。你拼死突围，酬劳没拿到，还躺了半个月。", effect: { attrs: { "根骨": -8 } } }
        ] },
        { text: "不接", sub: "命只有一条", result: "你把任务牌挂了回去。活着，比什么都强。" }
      ] },
    { id: "c_yaochao", minAge: 15, type: "trib", cat: "zhandou", layers: [4, 12],
      text: "历练途中发现妖兽巢穴，里面有幼崽的动静，也有宝光闪动。",
      choices: [
        { text: "闯进去", sub: "搏一把", outcomes: [
          { weight: 6, result: "你抢了株灵药就跑，身后妖兽的怒吼震了半座山。", effect: { inv: { "灵石": 15 }, attrs: { "根骨": -3 } } },
          { weight: 4, result: "妖兽比你快。你被追得滚下山坡，灵药没拿着，人还挂了彩。", effect: { attrs: { "根骨": -7 } } }
        ] },
        { text: "绕道走", sub: "惹不起", result: "你绕了三里地。安全，但那宝光总在梦里闪。" }
      ] },
    { id: "c_dan_du", minAge: 12, type: "trib", cat: "xiulian", layers: [5, 12],
      text: "你在黑市买到一枚来路不明的丹药，服下后才发现是丹毒入体！",
      choices: [
        { text: "运功逼毒", sub: "根骨硬扛", result: "你逼出丹毒，元气大伤，但也算因祸得福通了条经脉。", effect: { attrs: { "根骨": -3, "神识": 3 } } },
        { text: "求医问药", sub: "灵石 -15", cond: { inv: { "灵石": 15 } }, result: "药堂收了你十五灵石，一碗苦药灌下去，毒便清干净了。", effect: { inv: { "灵石": -15 } } }
      ] },
    { id: "c_xinmo_small", minAge: 14, type: "trib", cat: "xinjing", layers: [6, 12],
      text: "闭关时心魔骤起：父母老去、道途渺茫……念头像野草疯长。",
      choices: [
        { text: "直面它", sub: "神识高更稳", result: "你睁开眼，泪流满面，但灵台清明了几分。", effect: { attrs: { "神识": 6 } } },
        { text: "压下去", sub: "先活下去再说", result: "你把杂念压下，根基晃了晃。", effect: { attrs: { "根骨": -3 } } }
      ] },
    { id: "c_mojie", type: "trib", cat: "ziyuan", layers: [6, 13], cond: { flag: "魔修" },
      text: "魔道同门邀你一起去「劫富济己」，目标是凡间富商。",
      choices: [
        { text: "去", sub: "来钱快", result: "灵石到手，但你听见了那家小姐的哭声。夜里你没睡好。", effect: { inv: { "灵石": 40 }, attrs: { "气运": -8 } } },
        { text: "不去", sub: "魔修也有底线", result: "同门嗤笑你「假清高」，但你道心更稳了。", effect: { attrs: { "神识": 5 } } }
      ] },
    { id: "c_fengyin", type: "trib", cat: "zhandou", layers: [8, 13], cond: { flag: "筑基" }, highlight: true,
      text: "你修炼岔了经脉，真元逆行，再不决断就要伤及道基！",
      choices: [
        { text: "散功保命", sub: "跌落境界，留得青山", result: "你咬牙散去周身真元。境界跌落炼气，但道基保住了。", effect: { realmLoss: true } },
        { text: "硬撑过去", sub: "根骨高更稳", result: "你在生死线上走了一遭，撑住了！经脉反而拓宽了几分。", effect: { attrs: { "根骨": 8 } } }
      ] },

    /* ================= 财 · 坊市经济 ================= */
    { id: "cai_yueli", type: "daily", cat: "ziyuan", layers: [1, 13], cond: { notFlag: "散修" }, cooldown: 6, text: "外门月例发放：两块灵石、三枚辟谷丹。你数了两遍，才小心收好。", effect: { inv: { "灵石": 4 } } },
    { id: "cai_kuang", minAge: 14, type: "daily", cat: "ziyuan", layers: [3, 10], cooldown: 6, text: "你去灵石矿守了一个月矿。洞里阴冷，但酬劳尚可。", effect: { inv: { "灵石": 18 }, attrs: { "根骨": -2 } } },
    { id: "cai_fangshi_open", type: "flavor", cat: "ziyuan", layers: [1, 13], cooldown: 8, text: "十年一度的坊市大开！各地修士云集，连空气里都是灵石的味道。" },
    { id: "cai_baitan", type: "chance", cat: "ziyuan", layers: [4, 12],
      text: "坊市角落有空位，你攒的灵草正好可以摆摊。摆不摆？",
      choices: [
        { text: "摆摊", sub: "做一回小生意", result: "蹲了一天，灵草卖光了，还学了手砍价的本事。", effect: { inv: { "灵石": 20 }, attrs: { "气运": 2 } } },
        { text: "算了", sub: "抹不开面子", result: "你把灵草低价倒给了药铺。掌柜笑得合不拢嘴。", effect: { inv: { "灵石": 10 } } }
      ] },
    { id: "cai_heishi", minAge: 15, type: "trib", cat: "ziyuan", layers: [5, 12],
      text: "有人凑过来压低声音：「道友，黑市，去不去？东西便宜一半。」",
      choices: [
        { text: "去看看", sub: "便宜有便宜的道理", cond: { inv: { "灵石": 15 } }, result: "你淘到一枚聚气丹，只要十五灵石。是不是正品？吃了才知道。", effect: { inv: { "灵石": -15, "聚气丹": 1 }, attrs: { "气运": -2 } } },
        { text: "不去", sub: "正经人不走夜路", result: "你拒绝了。第二天听说昨晚黑市被执法队抄了。你捏了把汗。" }
      ] },
    { id: "cai_jieqian_1", minAge: 14, type: "chance", cat: "ziyuan", layers: [5, 12], chain: "jieqian_1", cond: { invMax: { "灵石": 20 } },
      text: "钱庄掌柜笑眯眯：「道友资质不凡，可愿预支五十灵石？利钱好商量。」",
      choices: [
        { text: "借", sub: "灵石 +50，负债缠身", result: "灵石到手，掂着沉甸甸的。掌柜补了句：「三年内还，连本带利八十。」", effect: { inv: { "灵石": 50 }, flag: "负债" } },
        { text: "不借", sub: "无债一身轻", result: "你拱手告辞。掌柜也不恼：「随时恭候。」" }
      ] },
    { id: "cai_jieqian_2", type: "trib", cat: "ziyuan", layers: [6, 13], chain: "jieqian_2", cond: { flag: "负债" },
      text: "钱庄伙计上门催债：「掌柜说了，八十灵石，一个子儿不能少。」",
      choices: [
        { text: "还钱", sub: "灵石 -80，两清", cond: { inv: { "灵石": 80 } }, result: "你咬牙还清。掌柜亲自送出门：「道友讲信用，下次请再来。」", effect: { inv: { "灵石": -80 }, flag: "债清" } },
        { text: "赖账", sub: "要钱没有", result: "伙计冷笑一声走了。三天后你在山道上被「请」去谈了谈，鼻青脸肿地还了钱。", effect: { inv: { "灵石": -40 }, attrs: { "根骨": -5 }, flag: "债清" } }
      ] },
    { id: "fa_cangjing", type: "chance", cat: "xiulian", layers: [4, 10], cond: { notFlag: "散修", gongfaMax: 0 }, highlight: true,
      text: "藏经阁开放兑换：玄阶功法《青云诀》，需六十灵石加半年贡献。",
      choices: [
        { text: "兑换", sub: "灵石 -60，功法升玄阶", cond: { inv: { "灵石": 60 } }, result: "功法入手的当夜，你运转周天，灵气吸纳快了一截。", effect: { inv: { "灵石": -60 }, gongfa: 1 } },
        { text: "再等等", sub: "灵石要留着买丹", result: "你把玉简放了回去。好功法，什么时候都不嫌晚——你安慰自己。" }
      ] },
    { id: "fa_canjuan", type: "miracle", cat: "jiyuan", layers: [7, 13], cond: { gongfa: 1, min: { "悟性": 60 } }, highlight: true,
      text: "坊市地摊，一堆旧书里夹着半卷残经。你越看越心惊——这是地阶功法残卷！", effect: { gongfa: 2, attrs: { "悟性": 5 } } },
    { id: "fa_gongfa_gan", type: "daily", cat: "xiulian", layers: [5, 13], cond: { gongfa: 1 }, cooldown: 6, text: "高阶功法就是不一样：同样的周天，灵气多走了三条支脉。" },
    { id: "c_zhuji_sell", minAge: 15, type: "chance", cat: "ziyuan", layers: [9, 13], cond: { invMax: { "筑基丹": 0 }, inv: { "灵石": 100 } },
      text: "一个丹药贩子拦住你，神神秘秘地掏出个玉盒：「筑基丹，一百灵石，这是不二价。道友眼看要圆满了吧？」",
      choices: [
        { text: "买了", sub: "灵石 -100，筑基丹 +1（渡劫成功率 90%）", cond: { inv: { "灵石": 100 } }, result: "玉盒开启，丹香扑鼻而来。贩子收了钱，转眼就消失在人流里。", effect: { inv: { "灵石": -100, "筑基丹": 1 } } },
        { text: "太贵，不要", sub: "攒攒再说", result: "贩子耸耸肩：「过了这村，可就没这店了。」你继续逛，心里却放不下。" }
      ] },
    { id: "fa_peddler", minAge: 14, type: "chance", cat: "xiulian", layers: [5, 12], cond: { gongfaMax: 0, inv: { "灵石": 60 } },
      text: "坊市口，一个游方道人摆摊卖功法：「《玄元功》，玄阶正品，只要六十灵石。错过这个村——」",
      choices: [
        { text: "买下", sub: "灵石 -60，功法升玄阶（修炼 +2/年）", cond: { inv: { "灵石": 60 } }, result: "玉简入手，神识一扫，确是玄阶正品。这笔灵石，花得一点都不冤。", effect: { inv: { "灵石": -60 }, gongfa: 1 } },
        { text: "不信", sub: "坊市水深", result: "你扭头走了。后来听说，那道人的功法是真的。" }
      ] },
    { id: "fa_lianqi_fang", type: "daily", cat: "ziyuan", layers: [4, 11], cooldown: 6,
      text: "你去炼器房打下手，炉火映着脸。管事看你勤快，赏了你几块灵石。", effect: { inv: { "灵石": 8 } } },
    { id: "fb_qinggang", minAge: 14, type: "chance", cat: "ziyuan", layers: [4, 12], cond: { inv: { "灵石": 70 }, artifactMax: { "法器": 0 } },
      text: "法宝铺里，一柄青钢剑泛着冷光，标价七十灵石。掌柜：「滴血认主，攻守两相兼备。」",
      choices: [
        { text: "买下", sub: "灵石 -70，法器 +1", cond: { inv: { "灵石": 70 } }, result: "滴血认主，剑身轻轻一鸣。从此你也是有法器的人了。", effect: { inv: { "灵石": -70 }, artifact: { "法器": 1 } } },
        { text: "再逛逛", sub: "五十灵石不是小数目", result: "你放下了剑。出门时回头看了一眼，它还在那里泛着光。" }
      ] },
    { id: "fb_lianqi_shi", minAge: 14, type: "chance", cat: "ziyuan", layers: [6, 12], cond: { artifactMax: { "法器": 0 } },
      text: "炼器房长老缺个试器的人：「帮我试炉，成了，这把新出炉的法器归你。」",
      choices: [
        { text: "试", sub: "有风险，但有法器", result: "炉火炸了三次，第四次，法器终于出炉。长老依约把剑丢给你。", effect: { artifact: { "法器": 1 }, attrs: { "根骨": -3 } } },
        { text: "不试", sub: "命要紧", result: "你婉拒了。长老耸耸肩，转身找了别人。" }
      ] },
    { id: "fb_huzhu", type: "daily", cat: "zhandou", layers: [5, 13], cond: { artifact: { "法器": 1 } }, cooldown: 6,
      text: "归途遇袭！千钧一发之际，法器自动护主，替你挡下致命一击。", effect: { attrs: { "气运": 3 } } },
    { id: "fb_lingqi", type: "miracle", cat: "jiyuan", layers: [8, 13], cond: { artifactMax: { "灵器": 0 } }, highlight: true,
      text: "秘境最深处，一杆小旗插在骸骨旁，灵光流转不息。",
      choices: [
        { text: "上前收取", sub: "骸骨的主人可不这么想", outcomes: [
          { weight: 8, result: "小旗没入你掌心——灵器认主！", effect: { artifact: { "灵器": 1 } } },
          { weight: 2, result: "灵器带着主人的怨念反噬，你神识刺痛，大病了一场。", effect: { attrs: { "神识": -5 } } }
        ] },
        { text: "行个礼再走", sub: "死者为大", result: "你朝骸骨行了一礼，默默退了出去。修仙修仙，先得修个人。" }
      ] },
    { id: "fb_wenjian", type: "daily", cat: "xiulian", layers: [6, 13], cond: { artifact: { "法器": 1 } }, cooldown: 7,
      text: "你每日以真元温养法器，人器之间，渐有心意相通之感。" },
    { id: "di_zufu", minAge: 14, type: "chance", cat: "jiyuan", layers: [5, 12], cond: { notFlag: "洞天" }, highlight: true,
      text: "宗门放出几处灵脉洞府租赁，灵气浓度是外门的三倍，租金六十灵石一年。",
      choices: [
        { text: "租", sub: "灵石 -60，修炼提速", cond: { inv: { "灵石": 60 } }, result: "洞府虽小，灵气却浓得很。第一晚打坐，你便知道这灵石没白花。", effect: { inv: { "灵石": -60 }, flag: "洞天" } },
        { text: "不租", sub: "宿舍也能修炼", result: "你攥紧了灵石袋。灵气稀点就稀点吧。" }
      ] },
    { id: "di_lingzhi_1", type: "daily", cat: "jiyuan", layers: [4, 12], cond: { flag: "洞天", notFlag: "灵植" }, chain: "lingzhi_1",
      text: "你在洞府角落开了一小块地，种下发蔫的灵谷苗。能不能活，就看天意了。", effect: { flag: "灵植" } },
    { id: "di_lingzhi_2", type: "chance", cat: "jiyuan", layers: [6, 13], chain: "lingzhi_2", cond: { flag: "灵植" }, highlight: true,
      text: "三年过去，灵谷抽穗，金灿灿一片。你收了满满一储物袋，坊市一卖，补贴了不少家用。", effect: { inv: { "灵石": 18 } } },
    { id: "di_jueyu", type: "trib", cat: "zhandou", layers: [6, 13], cond: { flag: "洞天", min: { "根骨": 50 } }, cooldown: 8,
      text: "有修士觊觎你的洞府，上门「借住」。你把法器往桌上一拍，他笑着走了。", effect: { attrs: { "气运": 3 } } },
    { id: "di_lingyan", type: "miracle", cat: "jiyuan", layers: [8, 13], cond: { notFlag: "灵眼" }, highlight: true,
      text: "深山裂谷，你发现一眼灵泉。泉水入喉，修为竟松动了几分。此地不宜声张。", effect: { flag: "灵眼", attrs: { "灵根": 5 } } },

    /* ================= 路线：剑修 ================= */
    { id: "jian_1", type: "flavor", cat: "xiulian", layers: [3, 13], cond: { flag: "剑修" }, cooldown: 5, text: "夜里擦剑。剑身映出你的脸，比入门时多了几分锐气。" },
    { id: "jian_2", type: "daily", cat: "xiulian", layers: [4, 13], cond: { flag: "剑修" }, cooldown: 5, text: "你以剑气淬体，经脉如被千针细刺，疼，但筋骨更韧了。", effect: { attrs: { "根骨": 3 } } },
    { id: "jian_3", type: "daily", cat: "xiulian", layers: [5, 13], cond: { flag: "剑修" }, cooldown: 6, text: "你在瀑布下悟剑三日。水流断处，剑意又进一分。", effect: { attrs: { "悟性": 3 } } },
    { id: "jian_choice", type: "chance", cat: "zhandou", layers: [6, 13], cond: { flag: "剑修", combatMin: 70 },
      text: "隔壁峰的剑修指名要与你论剑，赌注是十块灵石。",
      choices: [
        { text: "战", sub: "剑修的事，用剑说话", result: "三十招后你一剑挑飞他的佩剑。他拱手：「好剑。」", effect: { inv: { "灵石": 10 }, attrs: { "气运": 3 } } },
        { text: "避", sub: "藏锋守拙", result: "你拒了。他嗤笑一声走了，但你知道，你的剑还欠些火候。" }
      ] },
    { id: "jian_hl", type: "miracle", cat: "xiulian", layers: [8, 13], cond: { flag: "剑修", flag2: "佩剑" }, highlight: true,
      text: "人剑合一！锈剑嗡鸣着冲天而起，剑光掠过处，云海裂成两半。" },

    /* ================= 路线：丹道 ================= */
    { id: "dan_1", type: "daily", cat: "xiulian", layers: [3, 13], cond: { flag: "丹道" }, cooldown: 5, text: "你蒙眼辨药，三十味药材无一错漏。药童看你的眼神像看怪物。", effect: { attrs: { "悟性": 2 } } },
    { id: "dan_2", type: "daily", cat: "ziyuan", layers: [4, 13], cond: { flag: "丹道" }, cooldown: 5, text: "丹房日常：看火、扇风、记录。枯燥，但你从火候里看出了门道。" },
    { id: "dan_3", type: "daily", cat: "xiulian", layers: [6, 13], cond: { flag: "丹道" }, cooldown: 6, text: "你改良了聚气丹的丹方，出丹率多了一成。长老把你的方子抄走了。", effect: { attrs: { "悟性": 3 } } },
    { id: "dan_choice", type: "chance", cat: "ziyuan", layers: [5, 13], cond: { flag: "丹道", inv: { "聚气丹": 1 } },
      text: "有修士出四十灵石求购你的一枚聚气丹——比市价贵十块。",
      choices: [
        { text: "卖", sub: "灵石 +40", result: "他如获至宝。你数着灵石想：早知多炼几炉。", effect: { inv: { "灵石": 40, "聚气丹": -1 } } },
        { text: "不卖", sub: "留着自己吃", result: "你婉拒了。修为是自己的，灵石是身外的。" }
      ] },
    { id: "dan_hl", type: "miracle", cat: "xiulian", layers: [9, 13], cond: { flag: "丹道" }, highlight: true,
      text: "开炉那一刻，丹香冲霄——一炉筑基丹，丹成七转！", effect: { inv: { "筑基丹": 1 } } },

    /* ================= 路线：御兽 ================= */
    { id: "shou_1", type: "flavor", cat: "renji", layers: [3, 13], cond: { flag: "御兽" }, cooldown: 5, text: "灵狐蜷在你膝上打呼。你给它顺毛，它尾巴摇成了风车。" },
    { id: "shou_2", type: "daily", cat: "xiulian", layers: [4, 13], cond: { flag: "御兽" }, cooldown: 5, text: "你教灵狐听哨行动，三日便小成。它叼来一只野兔当学费。", effect: { attrs: { "气运": 2 } } },
    { id: "shou_3", type: "daily", cat: "zhandou", layers: [6, 13], cond: { flag: "御兽" }, cooldown: 6, text: "夜行山路，灵狐突然炸毛低吼——你及时绕开了一群妖狼。" },
    { id: "shou_choice", type: "trib", cat: "renji", layers: [5, 13], cond: { flag: "灵兽" },
      text: "灵狐误食毒果，已经奄奄一息。药堂的解毒丹要二十灵石。",
      choices: [
        { text: "买丹救它", sub: "灵石 -20", cond: { inv: { "灵石": 20 } }, result: "它在你怀里蹭了三天才缓过来。之后它看你的眼神，比以前更黏了。", effect: { inv: { "灵石": -20 }, attrs: { "气运": 5 } } },
        { text: "自己寻药", sub: "入山碰碰运气", outcomes: [
          { weight: 7, result: "你在山里翻了两天，总算找到了解药。它活过来了，你瘦了一圈。", effect: { attrs: { "根骨": -3, "气运": 3 } } },
          { weight: 3, result: "你找了三天一无所获，回来时灵狐已经奄奄一息——还好它命硬，自己挺过来了。", effect: { attrs: { "根骨": -5 } } }
        ] }
      ] },
    { id: "shou_hl", type: "miracle", cat: "jiyuan", layers: [8, 13], cond: { flag: "灵兽" }, highlight: true,
      text: "灵狐吞下你喂的灵果，浑身泛起灵光——它进阶了！现在它能替你寻灵草了。", effect: { inv: { "灵石": 20 } } },

    /* ================= 路线：魔修 ================= */
    { id: "mo_1", type: "daily", cat: "xiulian", layers: [4, 13], cond: { flag: "魔修" }, cooldown: 4, text: "魔功运转，血气随之翻涌。进境确实快，只是镜子里的人，眼神越来越冷。", effect: { attrs: { "灵根": 2 } } },
    { id: "mo_2", type: "daily", cat: "ziyuan", layers: [5, 13], cond: { flag: "魔修" }, cooldown: 5, text: "月黑风高，你劫了一伙山贼——黑吃黑，魔修的本分。", effect: { inv: { "灵石": 15 }, attrs: { "气运": -2 } } },
    { id: "mo_3", type: "flavor", cat: "xinjing", layers: [5, 13], cond: { flag: "魔修" }, cooldown: 6, text: "旧日同门见到你，个个绕着走。你笑了笑，没有多说话。" },
    { id: "mo_choice", type: "trib", cat: "zhandou", layers: [7, 13], cond: { flag: "魔修", combatMin: 80 },
      text: "魔门执事派下任务：截杀一名路过的正道修士，赏八十灵石。",
      choices: [
        { text: "做", sub: "灵石 +80，但...", result: "你完成了任务。赏钱很沉，那晚你梦见了对方的眼神。", effect: { inv: { "灵石": 80 }, attrs: { "气运": -8, "神识": -3 } } },
        { text: "拒", sub: "魔修也有不为", result: "执事冷笑：「心太软。」你被降了月例，但夜里睡得安稳。", effect: { attrs: { "神识": 4 } } }
      ] },
    { id: "mo_hl", type: "miracle", cat: "xiulian", layers: [9, 13], cond: { flag: "魔修" }, highlight: true,
      text: "魔功小成！你周身三丈，草木尽皆枯伏。路过的修士远远就改了道。" },

    /* ================= 路线：宗门 ================= */
    { id: "zm_1", type: "daily", cat: "ziyuan", layers: [3, 13], cond: { flag: "宗门" }, cooldown: 5, text: "内门的月例比外门厚一倍。管事还特意多给了你两块。", effect: { inv: { "灵石": 8 } } },
    { id: "zm_2", type: "daily", cat: "renji", layers: [5, 13], cond: { flag: "宗门" }, cooldown: 6, text: "长老召你问话，考较功课后微微点头：「没给宗门丢人。」", effect: { attrs: { "悟性": 2 } } },
    { id: "zm_choice", type: "trib", cat: "renji", layers: [6, 12], cond: { flag: "宗门" },
      text: "三长老和五长老斗法争权，两边都派人来拉拢你。",
      choices: [
        { text: "站三长老", sub: "他主管丹房", result: "三长老一系胜出，你被提拔为丹房执事，月例翻了倍。", effect: { inv: { "灵石": 20 } } },
        { text: "站五长老", sub: "他主管刑堂", result: "五长老败了。你被边缘化了半年，做事处处碰壁。", effect: { attrs: { "气运": -3 } } },
        { text: "两不相帮", sub: "明哲保身", result: "你装病三个月。等风平浪静再出来，两边都当你是自己人。", effect: { attrs: { "神识": 3 } } }
      ] },
    { id: "zm_hl", type: "miracle", cat: "renji", layers: [8, 13], cond: { flag: "宗门", notFlag: "亲传" }, highlight: true,
      text: "掌门亲自点你为亲传弟子！传功长老为你洗髓伐毛，灵台一片清明。", effect: { flag: "亲传", attrs: { "灵根": 5 } } },

    /* ================= 路线：散修 ================= */
    { id: "sx_1", type: "daily", cat: "xiulian", layers: [2, 13], cond: { flag: "散修" }, cooldown: 5, text: "风餐露宿，以天为被以地为床。苦是苦，但筋骨就是这么磨出来的。", effect: { attrs: { "根骨": 2 } } },
    { id: "sx_2", type: "daily", cat: "ziyuan", layers: [3, 13], cond: { flag: "散修" }, cooldown: 5, text: "你在两个坊市之间倒腾灵草，低买高卖，赚了笔差价。", effect: { inv: { "灵石": 10 } } },
    { id: "sx_3", type: "flavor", cat: "renji", layers: [4, 13], cond: { flag: "散修" }, cooldown: 6, text: "破庙里，几个散修围着篝火交换消息。你听了一耳朵秘境的传闻。" },
    { id: "sx_choice", type: "chance", cat: "jiyuan", layers: [6, 13], cond: { flag: "散修" },
      text: "你发现一处前人遗迹，禁制已然残破。进，还是不进？",
      choices: [
        { text: "进", sub: "散修的机缘都是抢来的", result: "禁制之后是一座小库房！灵石、丹药，够你潇洒半年。", effect: { inv: { "灵石": 30, "聚气丹": 1 } } },
        { text: "不进", sub: "命只有一条", result: "你贴了三张隐匿符绕开了。后来听说有人进去，再也没有出来。" }
      ] },
    { id: "sx_hl", type: "miracle", cat: "jiyuan", layers: [8, 13], cond: { flag: "散修" }, highlight: true,
      text: "你在拍卖会上被称为「那位神秘的散修」。无名无派，照样风生水起。", effect: { attrs: { "气运": 5 } } },

    /* ================= 秘境系列（多去几次） ================= */
    { id: "mj_dongfu", type: "chance", cat: "jiyuan", layers: [6, 13], cooldown: 6, weight: 1.5,
      text: "秘境再度开启，这次你盯上了一座古修洞府。",
      choices: [
        { text: "破解禁制进去", sub: "悟性高更顺利", outcomes: [
          { weight: 6, result: "禁制应声而开！洞府里丹瓶玉简摆了一排。", effect: { inv: { "聚气丹": 1, "灵石": 20 }, attrs: { "悟性": 2 } } },
          { weight: 3, result: "禁制反噬，你被弹飞出去，摔了个嘴啃泥。", effect: { attrs: { "根骨": -4 } } },
          { weight: 1, result: "洞府里藏着一只护府傀儡！你且战且退，最后空手而归。", effect: { attrs: { "根骨": -6 } } }
        ] },
        { text: "在洞府外捡漏", sub: "稳是稳，就是少", result: "别人在里头打得热火朝天，你在外面捡了一袋散落的灵石。", effect: { inv: { "灵石": 8 } } }
      ] },
    { id: "mj_yaogu", type: "chance", cat: "jiyuan", layers: [7, 13], cooldown: 6, weight: 1.5,
      text: "药谷秘境开启，谷内灵药遍地，但妖兽也多。",
      choices: [
        { text: "深入采药", sub: "收益高，风险也高", outcomes: [
          { weight: 5, result: "你采了三株百年灵药，坊市一卖，小小富了一笔。", effect: { inv: { "灵石": 30 } } },
          { weight: 3, result: "你撞上药谷深处的毒障，灵药没采到，人还中了毒。", effect: { attrs: { "根骨": -5 } } },
          { weight: 2, result: "谷内空了大半——你来晚了，只剩些边角料。", effect: { inv: { "灵石": 5 } } }
        ] },
        { text: "谷口守着", sub: "安全第一", result: "你在谷口采了些常见灵草，也算聊胜于无。", effect: { inv: { "灵石": 6 } } }
      ] },
    { id: "mj_shouluan", type: "trib", cat: "zhandou", layers: [7, 13], cooldown: 7, cond: { notFlag: "魔修" }, weight: 1.3,
      text: "秘境里兽潮暴动！成群妖兽见人眼红，退路被堵了。",
      choices: [
        { text: "杀出重围", sub: "战力 80+ 有底气", cond: { combatMin: 80 }, outcomes: [
          { weight: 7, result: "你杀出一条血路，还顺手捡了几枚妖丹。", effect: { inv: { "灵石": 18 }, attrs: { "根骨": 3 } } },
          { weight: 3, result: "杀是杀出来了，代价是三道深可见骨的伤。", effect: { attrs: { "根骨": -6 } } }
        ] },
        { text: "躲进岩缝", sub: "躲到兽潮退去", result: "你在岩缝里躲了两天两夜，听着外面的兽吼，两条腿都麻了。", effect: { attrs: { "神识": 2 } } }
      ] },
    { id: "mj_empty", type: "daily", cat: "jiyuan", layers: [6, 13], cooldown: 8, text: "这次秘境开启，你赶过去时好地方都被占了，转了一圈，最终一无所获。" },
    { id: "mj_meet", type: "daily", cat: "renji", layers: [6, 13], cooldown: 7, text: "秘境里遇到个落单的修士，你们结伴而行三日，出秘境时互留了传讯符。", effect: { attrs: { "气运": 2 } } },

    /* ================= 道侣日常线 ================= */
    { id: "dl_1", type: "daily", cat: "renji", layers: [6, 13], cond: { flag: "道侣" }, cooldown: 4, text: "你与道侣双修打坐，两股真元交融流转，比一个人修炼快了几分。" },
    { id: "dl_2", type: "flavor", cat: "renji", layers: [6, 13], cond: { flag: "道侣" }, cooldown: 5, text: "道侣下厨给你炖了锅灵菇汤，卖相一般，你喝了个底朝天。" },
    { id: "dl_3", type: "trib", cat: "renji", layers: [7, 13], cond: { flag: "道侣" }, cooldown: 6,
      text: "为了点琐事，你和道侣冷战三天了，洞府里安静得可怕。",
      choices: [
        { text: "先低头哄", sub: "没什么大不了", result: "你先服了软。TA绷不住笑了：「就知道你会先来。」", effect: { attrs: { "气运": 2 } } },
        { text: "讲道理", sub: "对错得说清楚", result: "道理你赢了，洞府你一个人睡。", effect: { attrs: { "神识": -2 } } }
      ] },
    { id: "dl_4", type: "chance", cat: "renji", layers: [8, 13], cond: { flag: "道侣" }, cooldown: 7,
      text: "道侣的修为也到了圆满边缘，但TA的筑基丹还没着落。",
      choices: [
        { text: "把丹药/灵石分给TA", sub: "灵石 -30，TA记一辈子", cond: { inv: { "灵石": 30 } }, result: "TA抱着你半天没说话。之后修炼，你们比从前更齐心了。", effect: { inv: { "灵石": -30 }, attrs: { "气运": 5 } } },
        { text: "先顾自己", sub: "大道面前，各凭本事", result: "TA笑了笑说「明白」。那晚TA打坐到很晚。", effect: { attrs: { "神识": -2 } } }
      ] },
    { id: "dl_5", type: "daily", cat: "renji", layers: [7, 13], cond: { flag: "道侣" }, cooldown: 6, text: "道侣把新学的符咒画法教给你，你俩画了一晚上，符没成几张，笑倒没少笑。", effect: { inv: { "符咒": 1 } } },

    /* ================= 心魔加密 ================= */
    { id: "xm_1", type: "trib", cat: "xinjing", layers: [4, 13], cooldown: 4, weight: 1.5, cond: { notFlag: "心魔已除" }, text: "心魔低语：「修炼这么久了，还是个炼气期。」你花了半宿才压下去。" },
    { id: "xm_2", type: "trib", cat: "xinjing", layers: [6, 13], cooldown: 5, weight: 1.5, cond: { notFlag: "心魔已除" }, text: "梦里全是白发苍苍的自己。惊醒时，枕巾湿了一片。", effect: { attrs: { "神识": -2 } } },
    { id: "xm_3", type: "trib", cat: "xinjing", layers: [8, 13], cooldown: 6, weight: 1.3, cond: { notFlag: "心魔已除" }, text: "心魔化作故人模样劝你：「回村吧，娶个媳妇，不比修仙强？」" },

    { id: "mj_mobao", type: "miracle", cat: "jiyuan", layers: [7, 13], cond: { notFlag: "魔修" },
      text: "天降异象，一柄黑气缭绕的魔器坠落在百里之外，各路修士都赶去了。",
      choices: [
        { text: "去夺", sub: "魔器虽强，恐蚀道心", outcomes: [
          { weight: 4, result: "乱战中魔器入你手！但黑气顺着经脉往上爬，你道心险些失守。", effect: { artifact: { "法宝": 1 }, attrs: { "神识": -8 }, flag: "魔气侵体" } },
          { weight: 3, result: "你挤进人群时，魔器已然易主。你还挨了两下。", effect: { attrs: { "根骨": -3 } } },
          { weight: 3, result: "魔器上的禁制突然炸开，你离得最近，被魔气侵体。", effect: { flag: "走火入魔", attrs: { "神识": -5 } } }
        ] },
        { text: "不趟浑水", sub: "天降之物，多是祸端", result: "你远远看了一眼就回了。后来听说，抢到魔器的那位，已经疯掉了。", effect: { attrs: { "神识": 3 } } }
      ] },
    { id: "mj_fake", type: "trib", cat: "jiyuan", layers: [5, 12], cond: { notFlag: "清醒", notFlag2: "魔修" },
      text: "「前辈洞府大开，见者有份！」消息传得有鼻子有眼，你跟着人潮赶去——却是个专坑散修的局。",
      choices: [
        { text: "交出灵石保命", sub: "破财免灾", result: "你交出十块灵石才被放行。这学费，交得钱包都疼。", effect: { inv: { "灵石": -10 } } },
        { text: "硬闯出去", sub: "战力 70+ 有胜算", cond: { combatMin: 70 }, result: "你掀翻了两个拦路的，随后扬长而去。坑散修？找错人了。", effect: { attrs: { "气运": 3 } } }
      ] },

    /* ================= 筑基后 · 继续游历攒物资 ================= */
    { id: "zj_neimen", type: "daily", cat: "renji", layers: [1, 13], cond: { flag: "筑基", notFlag: "散修" }, cooldown: 5, text: "筑基之后，外门弟子见你都要躬身喊一声「师叔」。" },
    /* ================= 师徒线（筑基后） ================= */
    { id: "zj_shoutu", type: "chance", cat: "renji", layers: [1, 13], cond: { flag: "筑基" }, chain: "tud_1", highlight: true, text: "你收了个小徒弟。看着TA笨手笨脚引气入体，你想起当年的自己。" },
    { id: "tud_2", type: "daily", cat: "renji", layers: [1, 13], cond: { flag: "筑基" }, chain: "tud_2", weight: 3, cooldown: 3, text: "你教徒弟打坐吐纳，TA三天跑偏了两次。当师父，可比修炼累多了。" },
    { id: "tud_2b", type: "daily", cat: "renji", layers: [1, 13], cond: { flag: "筑基" }, chain: "tud_2", weight: 3, cooldown: 3, text: "徒弟悟性不错，一点就能透。你嘴上骂TA骄傲，心里偷着乐。", effect: { attrs: { "气运": 2 } } },
    { id: "tud_3", type: "trib", cat: "renji", layers: [1, 13], cond: { flag: "筑基" }, chain: "tud_3", weight: 3,
      text: "徒弟偷偷下山，在坊市被人坑了，还打坏了人家的摊子。对方找上门来要说法。",
      choices: [
        { text: "护短", sub: "灵石 -15，徒弟记你的好", cond: { inv: { "灵石": 15 } }, result: "你赔了灵石把人打发走，回头只说了句「下次小心」。徒弟眼圈红了。", effect: { inv: { "灵石": -15 }, attrs: { "气运": 3 } } },
        { text: "责罚", sub: "面壁三个月", result: "你罚TA面壁三月。TA出来后沉稳多了，就是见你就躲。", effect: { attrs: { "神识": 2 } } }
      ] },
    { id: "tud_4", type: "flavor", cat: "renji", layers: [1, 13], cond: { flag: "筑基" }, chain: "tud_4", weight: 3, cooldown: 5, text: "徒弟下山采买大典用的物件。你站在山门口目送，突然理解了当年掌门看你的眼神。" },
    { id: "tud_5", type: "trib", cat: "zhandou", layers: [1, 13], cond: { flag: "筑基" }, chain: "tud_5", weight: 3,
      text: "传讯符急报：徒弟在秘境被妖兽围困，命悬一线！",
      choices: [
        { text: "御剑去救", sub: "战力 110+ 更稳", cond: { combatMin: 110 }, result: "你御剑千里，一剑斩了妖兽。徒弟抱着你嚎啕大哭。", effect: { attrs: { "气运": 5 } } },
        { text: "让TA自己扛", sub: "玉不琢，不成器", result: "三天后徒弟自己爬了回来，浑身是伤，但眼神不一样了。", effect: { attrs: { "根骨": -2, "神识": 3 } } }
      ] },
    { id: "tud_6", type: "miracle", cat: "renji", layers: [1, 13], cond: { flag: "筑基" }, chain: "tud_6", weight: 3, highlight: true,
      text: "筑基大典将近，徒弟天天围着你转：「师父，大典那天我一定给你长脸！」你笑着揉了揉TA的脑袋。" },
    { id: "zj_dongfu", type: "daily", cat: "renji", layers: [1, 13], cond: { flag: "筑基", notFlag: "洞府" }, weight: 4, text: "你开辟了自己的洞府，门口种了一株灵桃。终于有个家了。", effect: { flag: "洞府" } },
    { id: "zj_task", type: "daily", cat: "ziyuan", layers: [1, 13], cond: { flag: "筑基", notFlag: "散修" }, cooldown: 4, text: "你带队执行宗门任务，赏罚分明，师弟师妹都服你。", effect: { inv: { "灵石": 10 } } },
    { id: "zj_auction", type: "chance", cat: "ziyuan", layers: [1, 13], cond: { flag: "筑基", inv: { "灵石": 30 } }, text: "拍卖会上你出手阔绰，拍下一件法器。在修士堆里，你总算有了几分气象。", effect: { inv: { "灵石": -30 }, flag: "法器" } },
    { id: "zj_fight", type: "daily", cat: "zhandou", layers: [1, 13], cond: { flag: "筑基", flag2: "剑修" }, cooldown: 5, text: "有同阶修士邀战，你一剑胜之。剑修之名，渐渐传了出去。", effect: { attrs: { "气运": 4 } } },
    { id: "zj_dan", type: "daily", cat: "ziyuan", layers: [1, 13], cond: { flag: "筑基", flag2: "丹道" }, cooldown: 5, text: "你炼出一炉筑基丹，丹成七转，丹香三日不散。", effect: { inv: { "筑基丹": 1 } } },
    { id: "zj_talk", type: "flavor", cat: "renji", layers: [1, 13], cond: { flag: "筑基" }, cooldown: 6, text: "你与几位筑基同阶坐而论道，谈及结丹大道，都摇头苦笑：难。" },
    { id: "zj_watch", type: "flavor", cat: "xinjing", layers: [1, 13], cond: { flag: "筑基" }, cooldown: 7, text: "你站在峰顶看云海翻腾。长生路远，但风景正好。" },
    { id: "zj_lingshi", type: "daily", cat: "ziyuan", layers: [1, 13], cond: { flag: "筑基" }, cooldown: 5, text: "你给门下弟子讲了一堂法，宗门发的补贴到账了。", effect: { inv: { "灵石": 10 } } },
    { id: "zj_linghu2", type: "miracle", cat: "jiyuan", layers: [1, 13], cond: { flag: "筑基", flag2: "灵兽" }, chain: "linghu_2", highlight: true, text: "灵狐忽然衔来一株发光的灵草放在你手心。小家伙，学会寻宝了。", effect: { inv: { "灵石": 28 } } },

    /* ================= 筑基期 · 丹毒抉择（耐药钩子，引擎队列触发） ================= */
    { id: "zb_dandu", type: "trib", cat: "xiulian", realms: [1], highlight: true,
      text: "连服凝元丹，丹毒在经脉里积成了暗斑。再这样下去，道基要受损。",
      choices: [
        { text: "停药清修", sub: "停服 5 年，之后耐药尽消", result: "你封存丹瓶，就此闭关清修。数年后，经脉里的暗斑尽数化去。", effect: { danStop: 5 } },
        { text: "硬扛续服", sub: "修炼 -3/年，根骨 -5，丹药只剩保底药效", result: "你把暗斑强行压下，继续服药不辍。经脉隐隐作痛，但你等不起。", effect: { flag: "丹毒硬扛", attrs: { "根骨": -5 } } }
      ] },

    /* ================= 秘境入口（示范：古修士洞府） ================= */
    { id: "mjw_dongfu", type: "daily", cat: "jiyuan", realms: [1], cooldown: 12, weight: 2.5,
      text: "坊市流言：城西三百里的山谷里，有猎户见过残破的古禁制，据说是一位古修士的坐化之地。", effect: { flag: "传闻_mj_dongfu" } },
    { id: "mj_dongfu_in", type: "chance", cat: "jiyuan", realms: [1], weight: 3, dungeon: "mj_dongfu",
      text: "你按图索骥找到那座山谷。残破禁制之后，一座古修士洞府静静蛰伏。" },

    /* ================= 符箓系列（符咒玩法扩展） ================= */
    { id: "c_fu_intro", type: "daily", cat: "xiulian", layers: [3, 10], cooldown: 8, cond: { min: { "悟性": 45 } },
      text: "传功堂开了一堂符箓入门课。你画废了七张符纸，第八张终于亮起微光。", effect: { inv: { "符咒": 1 } } },
    { id: "c_fu_shop", type: "chance", cat: "ziyuan", layers: [4, 12],
      text: "符箓铺伙计追着你推销：「师弟，护身符十灵石一张，买二送一！」",
      choices: [
        { text: "买两张", sub: "灵石 -20，符咒 +3", cond: { inv: { "灵石": 20 } }, result: "三张符纸到手。伙计笑得见牙不见眼。", effect: { inv: { "灵石": -20, "符咒": 3 } } },
        { text: "不买", sub: "灵石要攒着", result: "你摆摆手走了。伙计也不恼，转头去拦下一个。" }
      ] },
    { id: "zb_fu_buy", type: "daily", cat: "ziyuan", realms: [1], cooldown: 5,
      text: "坊市符箓铺开来了新货：烈火符、神行符、金刚符，三十灵石两张。",
      choices: [
        { text: "买两张防身", sub: "灵石 -30，符咒 +2", cond: { inv: { "灵石": 30 } }, result: "符纸入手微温，朱砂还没干透。你把它贴身收好。", effect: { inv: { "灵石": -30, "符咒": 2 } } },
        { text: "只看看", sub: "灵石要花在刀刃上", result: "你翻了翻符样，跟掌柜讨了杯茶喝。" }
      ] },
    { id: "zb_fu_sell", type: "daily", cat: "ziyuan", realms: [1], cond: { min: { "悟性": 55 } }, cooldown: 6,
      text: "你闲时画的一叠护身符被坊市相中，掌柜问：长期供货要不要？",
      choices: [
        { text: "供", sub: "符咒 -1，灵石 +25", cond: { inv: { "符咒": 1 } }, result: "你每月交一叠符，掌柜照单全收。手艺换灵石，怎么算都不亏。", effect: { inv: { "符咒": -1, "灵石": 25 } } },
        { text: "不供", sub: "画符是爱好", result: "你婉拒了。符还是自己留着用顺手。" }
      ] },
    { id: "zb_fu_enemy", type: "trib", cat: "zhandou", realms: [1], cooldown: 8,
      text: "夜半，两名散修摸进你的地盘，直奔丹房而去。",
      choices: [
        { text: "掷符退敌", sub: "符咒 -2", cond: { inv: { "符咒": 2 } }, result: "两张烈火符炸开，火光冲起半丈高。两人连滚带爬地逃了。", effect: { inv: { "符咒": -2 }, attrs: { "气运": 2 } } },
        { text: "拔剑", sub: "打过再说", outcomes: [
          { weight: 6, result: "你剑快一线，把人赶下了山。", effect: { attrs: { "根骨": -2, "气运": 2 } } },
          { weight: 4, result: "黑地里你挨了一棍，人被赶跑了，东西也丢了两样。", effect: { inv: { "灵石": -20 }, attrs: { "根骨": -3 } } }
        ] }
      ] },
    { id: "zb_fu_save", type: "chance", cat: "renji", realms: [1], cooldown: 8, cond: { inv: { "符咒": 1 } },
      text: "山道上，一个猎户被毒蛇咬了，脸色已然发青。你怀里正好有一张清毒符。",
      choices: [
        { text: "用符救人", sub: "符咒 -1", result: "符光化开蛇毒。猎户千恩万谢，非要把攒的二十灵石塞给你。", effect: { inv: { "符咒": -1, "灵石": 20 }, attrs: { "气运": 3 } } },
        { text: "指点他求医", sub: "符要留着", result: "你指了去镇上药堂的路。走出很远，你还在想那张符。" }
      ] },
    { id: "zb_fu_rain", type: "trib", cat: "ziyuan", realms: [1], cond: { inv: { "符咒": 2 } }, cooldown: 10,
      text: "连日暴雨，你存符咒的匣子受了潮，几张符纸洇成了花脸。",
      choices: [
        { text: "抢救晾晒", sub: "损失在所难免", outcomes: [
          { weight: 6, result: "救回大半，只废了一张。", effect: { inv: { "符咒": -1 } } },
          { weight: 4, result: "符纸黏成一团，一张都没能救下。", effect: { inv: { "符咒": -2 } } }
        ] },
        { text: "换个玉匣", sub: "灵石 -15，买个教训", cond: { inv: { "灵石": 15 } }, result: "你花十五灵石买了只防潮玉匣。符纸一张没废。", effect: { inv: { "灵石": -15 } } }
      ] },
    { id: "zb_fu_legacy", type: "miracle", cat: "jiyuan", realms: [1], cond: { min: { "悟性": 60 } }, cooldown: 15,
      text: "旧书摊淘到半册《神符残录》，你参悟三日，竟画出了失传的神行符。", effect: { inv: { "符咒": 3 }, attrs: { "悟性": 2 } } },

    /* ================= 通用氛围（留白年） ================= */
    // ==================== 财（12） ====================
  { id: "zb_yueli_1", type: "daily", cat: "ziyuan", realms: [1], cond: { notFlag: "散修" }, cooldown: 2, weight: 2,
    text: "内门月例到账：三十灵石。你按老规矩分作三份：修炼、丹药、存起来应急。", effect: { inv: { "灵石": 30 } } },
  { id: "zb_yueli_2", type: "daily", cat: "ziyuan", realms: [1], cond: { notFlag: "散修" }, cooldown: 2, weight: 2,
    text: "发月例的管事又揩了一层油。你去理论，他慢悠悠拨着算盘：「师叔，账就是这么个账。」你多要回了六块。", effect: { inv: { "灵石": 36 } } },
  { id: "zb_renwu_1", type: "daily", cat: "ziyuan", realms: [1], cond: { notFlag: "散修" }, cooldown: 4,
    text: "宗门派你带队去平一窝食人妖蜂。你分了战利品的大头，师弟师妹没意见——冲在最前面的是你。", effect: { inv: { "灵石": 55 } } },
  { id: "zb_renwu_2", type: "daily", cat: "ziyuan", realms: [1], cond: { notFlag: "散修" }, cooldown: 4,
    text: "你在传功堂坐堂三个月，给炼气弟子答疑讲法。月底执事递来酬劳，顺口问了句：「师叔下个月还来吗？」", effect: { inv: { "灵石": 48 } } },
  { id: "zb_taobao_1", type: "chance", cat: "ziyuan", realms: [1],
    text: "坊市地摊上，一尊巴掌大的旧丹炉蒙着灰。摊主开价五十灵石，说是祖上传的。",
    choices: [
      { text: "买下来赌一把", sub: "灵石 -50", cond: { inv: { "灵石": 50 } }, outcomes: [
        { weight: 6, result: "擦掉灰，炉底刻着失传的聚灵纹。转手一卖，净赚了六十块灵石。", effect: { inv: { "灵石": 10 }, attrs: { "气运": 3 } } },
        { weight: 4, result: "就是个普通旧炉子，炉膛还漏风。五十灵石，全打了水漂。", effect: { inv: { "灵石": -50 } } }
      ] },
      { text: "转身走人", sub: "捡漏的故事听多了", result: "你走了。后来听说那炉子被人买走，再没了下文。也好。" }
    ] },
  { id: "zb_taobao_2", type: "daily", cat: "ziyuan", realms: [1], cooldown: 5,
    text: "你囤的一批传讯符赶上山门大比，价钱涨了三成。出货那天，你数灵石数到半夜。", effect: { inv: { "灵石": 32 } } },
  { id: "zb_shangdui", type: "chance", cat: "ziyuan", realms: [1],
    text: "一支商队重金请筑基修士押镖，穿越黑风岭，来回两个月，酬劳四十五灵石。",
    choices: [
      { text: "接镖", sub: "富贵险中求", outcomes: [
        { weight: 7, result: "路上撞见两拨劫道的，都被你打发了。掌柜额外封了个红包。", effect: { inv: { "灵石": 45 } } },
        { weight: 3, result: "黑风岭里藏着头三阶妖狼。镖保住了，你躺了一个月。", effect: { inv: { "灵石": 45 }, attrs: { "根骨": -6 } } }
      ] },
      { text: "推了", sub: "两个月的修炼耽误不起", result: "你婉拒了。修炼无岁月，灵石慢慢攒。" }
    ] },
  { id: "zb_paimai_1", type: "miracle", cat: "jiyuan", realms: [1], cond: { inv: { "灵石": 120 } }, highlight: true,
    text: "拍卖会压轴，一杆灵器小旗流拍三次——没人识货。你一百二十灵石捡了漏，鉴定师看了直拍大腿。", effect: { inv: { "灵石": -120 }, artifact: { "灵器": 1 } } },
  { id: "zb_paimai_2", type: "chance", cat: "ziyuan", realms: [1],
    text: "拍卖会上，一件法器被两位结丹修士抬到三百灵石。你攥着号码牌，从头到尾没举过。" },
  { id: "zb_heishi", type: "trib", cat: "ziyuan", realms: [1], minAge: 20,
    text: "有人塞给你一张黑市请柬：地下拍卖，来路不问，价格低得离谱。",
    choices: [
      { text: "去看看", sub: "灵石 -50 起步", cond: { inv: { "灵石": 50 } }, outcomes: [
        { weight: 5, result: "你淘到一瓶上品凝元丹，转手净赚四十。出门时你绕了三条街才敢回洞府。", effect: { inv: { "灵石": -10 }, attrs: { "气运": 2 } } },
        { weight: 3, result: "你刚进门，执法队就抄了场子。你交了五十灵石「罚款」才被放出来。", effect: { inv: { "灵石": -50 } } },
        { weight: 2, result: "你买的「灵器」回去一祭炼就散了架。黑市规矩，出门概不认账。", effect: { inv: { "灵石": -70 } } }
      ] },
      { text: "烧了请柬", sub: "沾不得", result: "你把请柬丢进火盆。有些便宜，其实是钓饵。" }
    ] },
  { id: "zb_jiedai", type: "trib", cat: "ziyuan", realms: [1], cond: { invMax: { "灵石": 30 }, notFlag: "负债" },
    text: "坊市钱庄的掌柜笑眯眯拦住你：「道友可是手头紧？本庄新添修士借贷，一百灵石，一年为期，到时还一百五。」",
    choices: [
      { text: "签契借钱", sub: "灵石 +100，一年后要还", result: "契书一签，一百灵石便入了袋。走出钱庄，你觉得袋子沉，心里头也沉。", effect: { inv: { "灵石": 100 }, flag: "负债" } },
      { text: "不借", sub: "穷有穷的过法", result: "你拱拱手走了。掌柜也不恼：「道友想通了随时来。」" }
    ] },
  { id: "zb_zhaiwu", type: "daily", cat: "ziyuan", realms: [1], cond: { flag: "负债" }, cooldown: 3, weight: 3,
    text: "钱庄的伙计第三次上门了，这次带了两个炼体修士：「道友，本息一百五，掌柜说今日要个准话。」",
    choices: [
      { text: "连本带息还清", sub: "灵石 -150", cond: { inv: { "灵石": 150 } }, result: "你凑齐了灵石。伙计点钱的样子很斯文，你的心在滴血。债，清了。", effect: { inv: { "灵石": -150 }, flag: "债清" } },
      { text: "先还四十，剩下的拖", sub: "灵石 -40，挨顿教训", result: "你被「请」到后巷谈了谈，鼻青脸肿地掏出四十灵石。剩下的，宽限你三个月。", effect: { inv: { "灵石": -40 }, attrs: { "根骨": -5 } } }
    ] },

  // ==================== 法（12） ====================
  { id: "zb_gongfa_xuan", type: "chance", cat: "xiulian", realms: [1], cond: { notFlag: "散修" },
    text: "藏经阁三层对你开放了。玄阶上品《凝元九转》，兑换要九十灵石加三年贡献。",
    choices: [
      { text: "换", sub: "灵石 -90", cond: { inv: { "灵石": 90 } }, result: "玉简入手温凉。守阁长老多看了你一眼：「这门功法，三十年没人换过了。」", effect: { inv: { "灵石": -90 }, gongfa: 1 } },
      { text: "先把口诀抄着", sub: "慢慢来", result: "你抄了三天口诀。没兑换，先记下，日后灵石够了再说。", effect: { attrs: { "悟性": 2 } } }
    ] },
  { id: "zb_gongfa_di", type: "chance", cat: "xiulian", realms: [1], cond: { gongfa: 1, min: { "悟性": 55 } },
    text: "参悟地阶功法残卷，一处关隘你卡了半年。这夜雷雨，你忽然通了——原来那页不是残的，是倒着印的。", effect: { attrs: { "悟性": 5 } } },
  { id: "zb_gongfa_ku", type: "daily", cat: "xiulian", realms: [1], cooldown: 5,
    text: "你枯坐半月参悟功法，站起身时腿麻得跪在了蒲团上。隔壁洞府的道友笑出了声。" },
  { id: "zb_liandan_1", type: "daily", cat: "ziyuan", realms: [1], cond: { flag: "丹道" }, cooldown: 4,
    text: "你开炉炼凝元丹，守了七天七夜，丹成了两枚。药香飘出院子时，你已经在算能卖多少灵石了。", effect: { inv: { "凝元丹": 2 } } },
  { id: "zb_liandan_2", type: "trib", cat: "xiulian", realms: [1], cond: { flag: "丹道" },
    text: "新得一张古丹方，主药是三阶妖丹。开炉，材料三十灵石一次；不开，方子就是张废纸。",
    choices: [
      { text: "开炉", sub: "灵石 -30 材料费", cond: { inv: { "灵石": 30 } }, outcomes: [
        { weight: 6, result: "第三炉，丹成！药力比凝元丹还醇三分。你连夜又抄了三份丹方。", effect: { inv: { "灵石": -30, "凝元丹": 2 }, attrs: { "悟性": 2 } } },
        { weight: 4, result: "炸炉。药香变药渣，你蹲在炉边把灰筛了三遍，结果一无所获。", effect: { inv: { "灵石": -30 }, attrs: { "根骨": -3 } } }
      ] },
      { text: "把方子收起来", sub: "等灵石宽裕再说", result: "你把丹方压在了箱底。机缘这东西，也讲究个量力而行。" }
    ] },
  { id: "zb_liandan_ding", type: "daily", cat: "ziyuan", realms: [1], cond: { flag: "丹道" }, cooldown: 4,
    text: "一位结丹真人找你订一炉养神的丹药，出手很是阔绰。你在丹房泡了一个月，出来时数着灵石直乐。", effect: { inv: { "灵石": 50 } } },
  { id: "zb_lianqi_1", type: "daily", cat: "ziyuan", realms: [1],
    text: "你攒够了玄铁和赤铜，炼器房的炉子可以借你用。打一件自己的法器？材料值八十灵石。",
    choices: [
      { text: "开炉炼器", sub: "灵石 -80", cond: { inv: { "灵石": 80 } }, outcomes: [
        { weight: 6, result: "淬火那刻，剑鸣声清越。法器出炉，你摩挲了一夜。", effect: { inv: { "灵石": -80 }, artifact: { "法器": 1 } } },
        { weight: 4, result: "火候差了一线，剑胚就裂了。八十灵石的材料，成了一炉废铁。", effect: { inv: { "灵石": -80 }, attrs: { "神识": -2 } } }
      ] },
      { text: "再攒攒", sub: "材料经不起糟蹋", result: "你把材料锁回柜子。炼器一道，宁等三分熟，不抢一线生。" }
    ] },
  { id: "zb_lianqi_2", type: "daily", cat: "ziyuan", realms: [1], cooldown: 5,
    text: "你替人修复了三件受损法器，手艺钱收了四十五。炼器房的老师傅说，你这双手是真稳。", effect: { inv: { "灵石": 45 } } },
  { id: "zb_ningyuan_1", type: "chance", cat: "ziyuan", realms: [1], cond: { invMax: { "凝元丹": 2 } },
    text: "坊市相熟的丹药商人掀开柜底的小匣子：「凝元丹到了新货，四十灵石一枚，给你留两枚？下批要等半年。」",
    choices: [
      { text: "买一枚", sub: "灵石 -40，凝元丹 +1", cond: { inv: { "灵石": 40 } }, result: "丹药入瓶，你心里踏实了一截。商人笑道：「道友的面子，我一向给的。」", effect: { inv: { "灵石": -40, "凝元丹": 1 } } },
      { text: "买两枚", sub: "灵石 -80，凝元丹 +2", cond: { inv: { "灵石": 80 } }, result: "你咬牙包圆了两枚。回去的路上你把丹瓶数了三遍。", effect: { inv: { "灵石": -80, "凝元丹": 2 } } },
      { text: "这次算了", sub: "囊中羞涩", result: "你摆摆手。商人也不意外，合上匣子：「缺货的时候，别怪我没给你留。」" }
    ] },
  { id: "zb_ningyuan_2", type: "flavor", cat: "ziyuan", realms: [1], cond: { invMax: { "凝元丹": 0 } }, cooldown: 5,
    text: "坊市的凝元丹又断货了。柜台前排着长队，掌柜挂出牌子：「到货无期」。你摸了摸空荡荡的丹瓶。" },
  { id: "zb_fulu_1", type: "flavor", cat: "xiulian", realms: [1], cooldown: 5,
    text: "你练了一夜符。废符堆了半桌，成的只有一张。指尖的朱砂洗了三遍才掉。", effect: { inv: { "符咒": 1 } } },
  { id: "zb_jiejindan", type: "daily", cat: "jiyuan", realms: [1], cond: { flag: "洞府" }, cooldown: 8,
    text: "坊市都在传：下个月的大拍，有一枚结金丹压轴，起拍三百灵石。你回洞府把家底盘了一遍，离三百还差得远。", effect: { attrs: { "气运": 2 } } },

  // ==================== 侣（10） ====================
  { id: "zb_lundao_1", type: "daily", cat: "renji", realms: [1], cond: { flag: "洞府" }, cooldown: 5,
    text: "三位筑基同阶来你洞府论道，茶过三巡，为「结丹该不该借外力」争到半夜。散场时谁也说服不了谁。", effect: { attrs: { "神识": 2 } } },
  { id: "zb_lundao_2", type: "flavor", cat: "renji", realms: [1], cooldown: 6,
    text: "论道会上，一位筑基圆满的前辈说了句大实话：「咱们这些人，十个里有八个，都止于假丹。」满座沉默。" },
  { id: "zb_jiangfa_1", type: "flavor", cat: "renji", realms: [1], cond: { notFlag: "散修" }, cooldown: 7,
    text: "结丹真人开坛讲法，三千人坐在台下。讲到「金丹九品」时，全场安静得能听见灵鹤落地。" },
  { id: "zb_jiangfa_2", type: "daily", cat: "xiulian", realms: [1], cooldown: 7,
    text: "讲法会上，结丹真人一句「丹成之前，先问自己道心缺不缺」，让你如遭雷击。散会后你多交了十块灵石求了一份讲录。", effect: { inv: { "灵石": -10 }, attrs: { "悟性": 4 } } },
  { id: "zb_zhandui", type: "daily", cat: "renji", realms: [1], cond: { flag: "宗门" },
    text: "宗门里两位结丹长老争掌门之位，都给你递了话：站过来，月例翻倍，藏经阁四层为你开。",
    choices: [
      { text: "站大长老", sub: "他赢面大", outcomes: [
        { weight: 6, result: "大长老接任掌门，你水涨船高，当月的资源拨下来厚了一沓。", effect: { inv: { "灵石": 60 } } },
        { weight: 4, result: "大长老败了。你被调去看守药园，说是「历练」。", effect: { attrs: { "气运": -3 } } }
      ] },
      { text: "装病闭关", sub: "两不得罪", result: "你闭了半年「病关」。出山时大局已定，两边都觉得你懂事。", effect: { attrs: { "神识": 3 } } }
    ] },
  { id: "zb_jianli", type: "daily", cat: "renji", realms: [1], cond: { notFlag: "散修" }, cooldown: 5,
    text: "新筑基的师弟上门递名帖，随帖附了二十五灵石的「心意」。你想起当年自己递帖时，手心也是汗。", effect: { inv: { "灵石": 25 } } },
  { id: "zb_jiuyou", type: "miracle", cat: "renji", realms: [1], highlight: true,
    text: "当年同铺炼气的旧友结丹了。千里之外遣人送来贺仪回礼：八十灵石，一枚玉简，玉简里只有四个字：「等你上来。」", effect: { inv: { "灵石": 80 } } },
  { id: "zb_sanxiu_hu", type: "trib", cat: "renji", realms: [1], cond: { flag: "散修" },
    text: "篝火边，相熟的散修捂着断臂求你：凑四十灵石，他就能买丹接上这条胳膊。他的仇家，是你俩一起惹的。",
    choices: [
      { text: "分摊药钱", sub: "灵石 -40", cond: { inv: { "灵石": 40 } }, result: "他接了灵石，半天没说出话，只把半壶灵酒推给你。散修的路，得互相垫着走。", effect: { inv: { "灵石": -40 }, attrs: { "气运": 5 } } },
      { text: "爱莫能助", sub: "你也紧巴", result: "你摇了摇头。他笑了笑说「懂」，转身进了夜色。第二天他的铺位换了人。" }
    ] },
  { id: "zb_daolv_1", type: "daily", cat: "renji", realms: [1], minAge: 24, cond: { flag: "道侣", notFlag: "道侣坐化" }, cooldown: 5,
    text: "道侣用半年的份额换了一枚凝元丹，硬塞给你：「你冲关要紧。」你推回去，又被打回来。", effect: { inv: { "凝元丹": 1 } } },
  { id: "zb_daolv_2", type: "daily", cat: "renji", realms: [1], minAge: 24, cond: { flag: "道侣", notFlag: "道侣坐化", flag2: "洞府" }, cooldown: 6,
    text: "你与道侣约定：谁先摸到结丹门槛，另一个就守着洞府护法。说完两人都笑了，笑着笑着都没再说话。", effect: { attrs: { "神识": 2 } } },

  // ==================== 地（8） ====================
  { id: "zb_dongfu_1", type: "daily", cat: "ziyuan", realms: [1], cond: { flag: "洞府" }, cooldown: 5,
    text: "洞府门口的灵桃熟了，摘了满满两筐。挑到坊市卖了三十灵石，留了最大的一颗供在石桌上。", effect: { inv: { "灵石": 30 } } },
  { id: "zb_dongfu_2", type: "flavor", cat: "renji", realms: [1], cond: { flag: "洞府" }, cooldown: 7,
    text: "雨夜，洞府里灵灯一盏。你听着雨打竹叶，忽然觉得这座山头，有点像个家了。" },
  { id: "zb_lingtian_1", type: "daily", cat: "ziyuan", realms: [1], cooldown: 5, cond: { notFlag: "散修" },
    text: "你名下的半亩灵田遭了虫灾。管事问：请灵植夫除虫要二十灵石，还是自己下田？",
    choices: [
      { text: "请灵植夫", sub: "灵石 -20，田保住了", cond: { inv: { "灵石": 20 } }, result: "灵植夫三天除了虫。秋后灵谷收成不错，卖出五十五灵石。", effect: { inv: { "灵石": 35 } } },
      { text: "自己下田", sub: "省是省，累", outcomes: [
        { weight: 7, result: "你在田里蹲了半个月，虫除了，腰也快断了。收成折成灵石，一共五十五。", effect: { inv: { "灵石": 55 }, attrs: { "根骨": -2 } } },
        { weight: 3, result: "你除虫的手法太糙，误伤了灵根苗。秋后只收回十五灵石。", effect: { inv: { "灵石": 15 } } }
      ] }
    ] },
  { id: "zb_lingtian_2", type: "daily", cat: "ziyuan", realms: [1], cooldown: 5, cond: { notFlag: "散修" },
    text: "灵田的灵谷熟了，你雇了两个炼气弟子抢收。打完谷、交了租，到手二十五灵石。", effect: { inv: { "灵石": 25 } } },
  { id: "zb_lingyan", type: "daily", cat: "ziyuan", realms: [1], cond: { inv: { "灵石": 100 }, notFlag: "灵眼", flag: "洞府" }, cooldown: 10,
    text: "阵法师看了你的洞府：地脉三分灵气，花一百灵石布个引灵阵，能养成一口小灵眼。",
    choices: [
      { text: "布阵", sub: "灵石 -100，灵气长流", cond: { inv: { "灵石": 100 } }, result: "阵成那夜，洞府里灵气稠得化不开。这一百灵石，花在了根上。", effect: { inv: { "灵石": -100 }, flag: "灵眼" } },
      { text: "再想想", sub: "一百灵石不是小数目", result: "你谢过阵法师。他临走撂下一句：「地脉不等人，道友要趁早。」" }
    ] },
  { id: "zb_huzhen", type: "daily", cat: "ziyuan", realms: [1], cond: { inv: { "灵石": 50 }, flag: "洞府" }, cooldown: 6,
    text: "护山阵法运转十年，阵脚灵石快耗尽了。你咬牙换了新的——五十灵石，买个夜里睡得着。", effect: { inv: { "灵石": -50 }, attrs: { "神识": 2 } } },
  { id: "zb_jiyu_1", type: "trib", cat: "zhandou", realms: [1], cond: { flag: "洞府" },
    text: "一个筑基后期的修士看中了你的洞府，带着两个帮手上门，「商量」让你挪个地方。",
    choices: [
      { text: "打出去", sub: "战力 110+ 有胜算", cond: { combatMin: 110 }, outcomes: [
        { weight: 7, result: "你一挑三，把领头的打得三个月下不了床。从此这方圆百里，没人再提你的洞府。", effect: { attrs: { "气运": 4, "根骨": 2 } } },
        { weight: 3, result: "打赢了，但你也挂了彩。洞府保住了，药钱花了不少。", effect: { attrs: { "根骨": -6, "气运": 2 } } }
      ] },
      { text: "破财免灾", sub: "灵石 -60", cond: { inv: { "灵石": 60 } }, result: "你设宴赔了六十灵石的「茶水钱」。对方拿了钱，笑眯眯地走了。你把这笔账记下了。", effect: { inv: { "灵石": -60 } } },
      { text: "搬去山脚", sub: "留得青山在", result: "你连夜收拾东西，搬进了山脚的废弃石屋。那晚你打坐到天亮，一个字也没说。", effect: { attrs: { "神识": 4 } } }
    ] },
  { id: "zb_jiyu_2", type: "trib", cat: "ziyuan", realms: [1], cond: { flag: "洞府" }, cooldown: 8,
    text: "巡山的弟子撞见两个陌生修士在你洞府外围转悠，拿着罗盘比比划划，一见人就跑。",
    choices: [
      { text: "加派人手守山", sub: "防人之心不可无", outcomes: [
        { weight: 7, result: "守了半个月，那两人又来了——是来偷灵桃的散修。你把人撵走，顺手加固了外围禁制。", effect: { attrs: { "神识": 2 } } },
        { weight: 3, result: "守山的人打了个盹，灵田被刨了两垄。贼没抓着，气得你睡不着。", effect: { inv: { "灵石": -15 }, attrs: { "气运": -2 } } }
      ] },
      { text: "随它去", sub: "洞府有阵，怕什么", result: "你没当回事。三个月后听说隔壁山头的洞府被人摸进去搬空了，你默默检查了一遍阵脚。" }
    ] },

  // ==================== 劫/心境（6） ====================
  { id: "zb_shouyuan", type: "trib", cat: "xinjing", realms: [1], minAge: 60, cooldown: 10,
    text: "晨起梳洗，铜镜里有了第一根白发。筑基修士寿两百，可结丹的门，还没摸到边。你盯着镜子看了很久。", effect: { attrs: { "神识": 3 } } },
  { id: "zb_jiushang", type: "daily", cat: "zhandou", realms: [1], cooldown: 6,
    text: "当年历练留下的旧伤，每逢阴雨就隐隐作痛。今夜疼得格外厉害，真元走到伤处就滞住。",
    choices: [
      { text: "运功冲开淤堵", sub: "疼，但省钱", outcomes: [
        { weight: 6, result: "你疼出一身透汗，淤塞的经脉竟被冲开一线。旧伤，轻了三分。", effect: { attrs: { "根骨": 2 } } },
        { weight: 4, result: "淤堵没冲开，反而牵动了内伤。你躺了半个月。", effect: { attrs: { "根骨": -4 } } }
      ] },
      { text: "去药堂调理", sub: "灵石 -80，贵但稳", cond: { inv: { "灵石": 80 } }, result: "药堂的老医师给你灸了七次，收了八十灵石。伤是好了，钱包却瘪了。", effect: { inv: { "灵石": -80 }, attrs: { "根骨": 3 } } }
    ] },
  { id: "zb_yaoshou", type: "daily", cat: "zhandou", realms: [1], cooldown: 6,
    text: "一头三阶妖兽半夜袭山，撞碎了两户山民的屋顶。你赶在天亮前斩了它，妖丹和山民凑的谢礼，你都收下了。", effect: { inv: { "灵石": 45 }, attrs: { "根骨": 3 } } },
  { id: "zb_xinmo", type: "daily", cat: "xinjing", realms: [1], cond: { notFlag: "心魔已除" }, cooldown: 5, weight: 1.3,
    text: "心魔在夜深时低语：「同期的都结丹了，你还在筑基里熬。这条路，走得通吗？」你点起一盏灵灯，坐到了天亮。", effect: { attrs: { "神识": -2 } } },
  { id: "zb_zouhuo", type: "daily", cat: "xiulian", realms: [1], cond: { flag: "走火入魔" }, cooldown: 4,
    text: "走火的余波还在。真元每运转一个大周天，岔气的那处经脉就针扎一样疼。药汤一碗接一碗，灵石一把接一把。", effect: { inv: { "灵石": -30 }, attrs: { "根骨": -2 } } },
  { id: "zb_xinmo_guiren", type: "trib", cat: "xinjing", realms: [1], cond: { notFlag: "心魔已除", flag: "洞府" },
    text: "一位游方老修士在你洞府外讨水喝，临走说：「道友眉心有黑气。老朽有一篇《清心咒》，五十灵石，要不要？」",
    choices: [
      { text: "买下咒文", sub: "灵石 -50", cond: { inv: { "灵石": 50 } }, outcomes: [
        { weight: 6, result: "咒文诵读百日，灵台清明了许多。老修士没骗人。", effect: { inv: { "灵石": -50 }, attrs: { "神识": 6 } } },
        { weight: 4, result: "咒文是从《金刚经》里抄的，坊市两块灵石一本。五十灵石，买了个教训。", effect: { inv: { "灵石": -50 }, attrs: { "气运": -2 } } }
      ] },
      { text: "闭门谢客", sub: "心魔是自己的事", result: "你没开门。老修士在门外站了一会儿，叹了口气走了。心魔这一关，终究要自己过。", effect: { attrs: { "神识": 2 } } }
    ] },
    /* @@V2_DAILY@@ */
  // ================= 仇家链·第4环：筑基了断 =================
  { id: "choujia_4", type: "trib", cat: "zhandou", realms: [1], chain: "choujia_4",
    text: "当年秘境结怨的那位，如今也筑基了。他登门递帖，只有八个字：恩怨未了，改日山下候教。",
    choices: [
      { text: "迎战", sub: "战力 140+ 更稳", cond: { combatMin: 140 },
        outcomes: [
          { weight: 3, result: "三百回合，你胜了半招。他盯着你看了很久，拱手：「心服口服。」", effect: { attrs: { "根骨": 6, "气运": 4 } } },
          { weight: 1, result: "棋差一着，这一局你败了。他收起法器：「扯平了。」转身下山，从此再没回头。", effect: { attrs: { "根骨": -4, "神识": 4 } } }
        ] },
      { text: "备礼化解", sub: "灵石 -80，一笑泯恩仇", cond: { inv: { "灵石": 80 } },
        result: "你备了一份厚礼请他上山喝酒。三杯下肚，当年的事谁也没再提。", effect: { inv: { "灵石": -80 }, attrs: { "气运": 5 } } },
      { text: "闭门不出", sub: "随他堵门",
        result: "他在山下堵了三天，足足骂了三天。你闭门炼丹，只当没听见。同门看你的眼神有点怪。", effect: { attrs: { "气运": -3 } } }
    ] },
  { id: "choujia_5", type: "daily", cat: "renji", realms: [1], chain: "choujia_5", cooldown: 10,
    text: "听说他去了南疆，投奔了一家大宗。年少时的那点恩怨，如今想来，像上辈子的事。" },

  // ================= 道侣链·筑基篇 =================
  { id: "daolv_4a", minAge: 22, type: "chance", cat: "renji", realms: [1], chain: "daolv_4", highlight: true,
    cond: { flag: "道侣", notFlag: "道侣坐化" },
    text: "道侣筑基成功那日，霞光漫了满室。TA睁开眼第一句话是：「以后换我护着你。」贺礼堆了半桌。",
    effect: { inv: { "灵石": 40 }, attrs: { "气运": 5 } } },
  { id: "daolv_4b", minAge: 40, type: "trib", cat: "renji", realms: [1], chain: "daolv_4", highlight: true,
    cond: { flag: "道侣", notFlag: "道侣坐化" },
    text: "道侣大限已至。TA坐在蒲团上，替你理了理衣领，笑着说「先走一步」，气息便散了。寿元已尽，当夜便坐化了。",
    effect: { flag: "道侣坐化", attrs: { "神识": 4 } } },
  { id: "daolv_5", minAge: 22, type: "daily", cat: "renji", realms: [1], chain: "daolv_5", cooldown: 6,
    cond: { flag: "道侣", notFlag: "道侣坐化" },
    text: "你与道侣结伴下山游历，坊市里并肩而行。有相熟的摊主打趣：「两位道友，又出来败家啦？」" },
  { id: "daolv_5b", minAge: 22, type: "flavor", cat: "renji", realms: [1], chain: "daolv_5", cooldown: 8,
    cond: { flag: "道侣", notFlag: "道侣坐化" },
    text: "闭关前夜，道侣替你把丹瓶一瓶瓶码好，又塞了两张符咒。「早点出来。」TA说。" },

  // ================= 长老赏识链·第2环 =================
  { id: "shitu_2", type: "chance", cat: "renji", realms: [1], chain: "shitu_2", cond: { notFlag: "散修" },
    text: "那位长老把你叫到静室，推过来一只丹瓶：「这瓶凝元丹，拿去补补身子。结丹的事，也该早做打算了。」",
    choices: [
      { text: "收下丹药", sub: "凝元丹 +1", result: "你躬身收下。长老摆摆手：「好好练，别学你那些师叔，练到半路就躺平。」", effect: { inv: { "凝元丹": 1 } } },
      { text: "求结金丹的线索", sub: "丹比消息好打，消息难寻", result: "长老沉吟半晌，写了一张字条给你：何处有丹方风声，何处有老丹师隐居。字字值钱。", effect: { flag: "结金丹线索", attrs: { "悟性": 3 } } }
    ] },
  { id: "shitu_2b", type: "flavor", cat: "renji", realms: [1], chain: "shitu_2", cond: { notFlag: "散修" },
    text: "传讯符来报：长老寿元已尽，于静室坐化。你赶去时，只见到桌上一盏没喝完的茶。仙凡两隔，原来不过如此。",
    effect: { attrs: { "神识": 3 } } },

  // ================= 师徒链·徒弟筑基 =================
  { id: "tud_7", type: "miracle", cat: "renji", realms: [1], chain: "tud_7", highlight: true,
    text: "徒弟筑基了。TA从闭关室冲出来，第一句话是「师父我成了」，第二句话是「今晚我请客」。你看着TA，像看着很多年前的自己。" },
  { id: "tud_8", type: "daily", cat: "renji", realms: [1], chain: "tud_8",
    text: "筑基之后，徒弟来请命下山闯荡。你盘算着TA的脾性，给TA指条路。",
    choices: [
      { text: "给本钱，去学经商", sub: "灵石 -50，坊市里练心眼", cond: { inv: { "灵石": 50 } },
        result: "你数出五十灵石当本钱。TA眼睛瞪得溜圆：「师父，赔了怎么办？」你说：「赔了再挣。」", effect: { inv: { "灵石": -50 } } },
      { text: "去历练，见见血", sub: "生死里滚一滚",
        result: "你递给TA一张地图，标了三处险地。「活着回来。」TA重重点头。" },
      { text: "去学炼丹", sub: "灵石 -30 买药材练手", cond: { inv: { "灵石": 30 } },
        result: "你批了一笔药材钱，又把自己当年烧穿的丹炉照片……咳，丹炉旧事讲了一遍。TA笑得直不起腰。", effect: { inv: { "灵石": -30 } } }
    ] },
  { id: "tud_8b", type: "flavor", cat: "renji", realms: [1], chain: "tud_8", cooldown: 5,
    text: "徒弟下山那天，你站在山门口看TA的背影变成一个小点。当年你下山时，掌门是不是也这样站着？" },
  { id: "tud_9", type: "daily", cat: "renji", realms: [1], chain: "tud_9", cooldown: 8,
    text: "山门外传来熟悉的嗓门：「师父，我回来了！」徒弟风尘仆仆地站在门口，这几年不知道闯成了什么样。",
    choices: [
      { text: "听TA细说这些年的遭遇", sub: "是好是坏，都得接着",
        outcomes: [
          { weight: 3, result: "TA从储物袋里掏出灵石和丹药，堆了一桌：「师父，孝敬您的！」你没白疼这孩子。", effect: { inv: { "灵石": 60, "凝元丹": 1 } } },
          { weight: 3, result: "TA在外头闯出了名号，坊市里都在传「某某的徒弟」。你嘴上嫌弃，转头就跟老友提了八遍。", effect: { attrs: { "气运": 5 } } },
          { weight: 2, result: "TA低着头进门，身后还站着两位来讨说法的苦主。你叹了口气，掏钱平了这事。", effect: { inv: { "灵石": -40 } } }
        ] }
    ] },

  // ================= 正魔剧变链 =================
  { id: "zmb_1", type: "flavor", cat: "jiyuan", realms: [1], chain: "zmb_1",
    text: "坊市风声骤紧：魔道几位老祖同时出关，正道各宗连夜会盟。说书人都不说书了，改讲天下形势。" },
  { id: "zmb_2", type: "daily", cat: "renji", realms: [1], chain: "zmb_2",
    text: "征召令发下来了：正道会盟，凡筑基修士皆可应征。去了是刀口舔血，不去是明哲保身。",
    choices: [
      { text: "响应征召", sub: "乱世里搏个出身",
        result: "你在征召令上按了手印。同去的人里，有旧相识，也有当年的对头。", effect: { attrs: { "根骨": 2, "气运": 2 } } },
      { text: "关起山门清修", sub: "天塌了有高个顶着",
        result: "你封了洞府，从此闭门不出。外面的喊杀声隔着禁制，听着像下雨。", effect: { attrs: { "神识": 2 } } }
    ] },
  { id: "zmb_3", type: "trib", cat: "zhandou", realms: [1], chain: "zmb_3",
    text: "战火终究还是烧到了你家门口。魔修小队夜袭坊市，你被裹进乱战，储物袋都挨了一刀。",
    effect: { inv: { "灵石": -20 }, attrs: { "根骨": -2 } } },
  { id: "zmb_4", type: "trib", cat: "zhandou", realms: [1], chain: "zmb_4",
    text: "决战打响了。正魔两道的法器把天都映成了紫色。是进是退，就在这一念之间。",
    choices: [
      { text: "随军冲锋", sub: "战力 150+ 更有底气", cond: { combatMin: 150 },
        outcomes: [
          { weight: 3, result: "你在乱军中斩了两名魔修，盟军记下你的战功。这一仗，打出了名号。", effect: { flag: "正魔功臣", inv: { "灵石": 80 }, attrs: { "气运": 4 } } },
          { weight: 1, result: "一道魔雷劈在你背上。你拼死杀出重围，伤得不轻，名号也没捞着。", effect: { flag: "正魔流亡", attrs: { "根骨": -6 } } }
        ] },
      { text: "护着伤员撤退", sub: "保命要紧",
        outcomes: [
          { weight: 3, result: "你背着三个伤员杀出战场，一路东躲西藏。仗打完了，你也成了没名没姓的闲人。", effect: { flag: "正魔流亡" } },
          { weight: 1, result: "撤退路上你顺手救下一位管事。人家记着情，塞给你一包灵石。", effect: { flag: "正魔流亡", inv: { "灵石": 25 } } }
        ] }
    ] },
  { id: "zmb_5", type: "chance", cat: "renji", realms: [1], chain: "zmb_5", highlight: true, cond: { flag: "正魔功臣" },
    text: "大战落幕，盟军论功行赏。你的名字刻在盟军功德碑上，赏格下来那天，半个坊市的人都来道贺。",
    effect: { inv: { "灵石": 80, "凝元丹": 1 }, attrs: { "气运": 5 } } },
  { id: "zm_5b", type: "chance", cat: "xinjing", realms: [1], chain: "zmb_5", highlight: true, cond: { flag: "正魔流亡", flag2: "洞府" },
    text: "大战落幕，没人记得你。你回到洞府，拍掉肩上的尘土，重新点起丹炉。乱世过去，日子还得自己过。",
    effect: { attrs: { "神识": 5 } } },

  // ================= 宗门大比链 =================
  { id: "db_1", type: "chance", cat: "renji", realms: [1], chain: "db_1", cooldown: 12, cond: { notFlag: "散修" },
    text: "十年一度的宗门大比开始报名。夺魁者有重赏，但各峰高手云集，去就是真刀真枪。",
    choices: [
      { text: "报名参赛", sub: "是骡子是马，拉出来遛遛", result: "你在名册上写下自己的名字。执事抬头看了你一眼：「这位师叔，当真好胆色。」", effect: { flag: "db_参赛" } },
      { text: "再看看", sub: "蛰伏一时", result: "你把名册推了回去。练剑不急于一时，命只有一条。" }
    ] },
  { id: "db_2", type: "trib", cat: "zhandou", realms: [1], chain: "db_2", cond: { flag: "db_参赛" },
    text: "大比当日，擂台上一轮轮打下来，你站到了决胜局。对面是夺冠热门，法器比你的好，灵石比你的多。",
    choices: [
      { text: "全力施为", sub: "胜负在此一举",
        outcomes: [
          { weight: 2, result: "你抓住对方换法器的半息空当，一剑定胜负。满场死寂，然后是山呼海啸。", effect: { flag: "db_魁", attrs: { "气运": 4 } } },
          { weight: 3, result: "五十回合后，你灵力见底，被请下擂台。技不如人，你无话可说。", effect: { flag: "db_败", attrs: { "神识": 3 } } }
        ] },
      { text: "弃权保命", sub: "留得青山在",
        result: "你看了一眼对方的法器，便举手认输。台下嘘声四起，你权当没听见。", effect: { flag: "db_败" } }
    ] },
  { id: "db_3", type: "chance", cat: "renji", realms: [1], chain: "db_3", highlight: true, cond: { flag: "db_魁" },
    text: "夺魁！掌门亲自颁赏，灵石丹药装了满满一储物袋。这一战之后，宗门上下无人不识你。",
    effect: { inv: { "灵石": 150, "凝元丹": 1 }, attrs: { "气运": 5 } } },
  { id: "db_3b", type: "daily", cat: "xinjing", realms: [1], chain: "db_3", cond: { flag: "db_败" },
    text: "大比落幕，你没能走到最后。看着别人登台领赏，你把不甘咽回肚子里，回去接着练。" },

  // ================= 散修据点链 =================
  { id: "sxd_1", type: "daily", cat: "renji", realms: [1], chain: "sxd_1", cond: { flag: "散修" },
    text: "你在坊市后巷盘下一间小院，挂起自己的木牌。散修无门无派，但总得有个落脚处。",
    effect: { flag: "据点" } },
  { id: "sxd_2", type: "daily", cat: "ziyuan", realms: [1], chain: "sxd_2", cond: { flag: "散修" },
    text: "跑熟了南北两条商路，哪家的灵米便宜、哪家的符咒靠谱，你都门儿清。低买高卖，图个细水长流。",
    effect: { flag: "商路", inv: { "灵石": 40 } } },
  { id: "sxd_2b", type: "daily", cat: "ziyuan", realms: [1], chain: "sxd_2", cooldown: 6, cond: { flag: "散修", flag2: "商路" },
    text: "商路上的老主顾又来光顾，顺手给你带了外地的行情。这一季，进项还算不错。",
    effect: { inv: { "灵石": 35 } } },
  { id: "sxd_3", type: "chance", cat: "renji", realms: [1], chain: "sxd_3", cond: { flag: "散修" },
    text: "十几位相熟的散修在你院里歃血为盟，约好互通有无、守望相助。散修抱团，也算是半个门派了。",
    effect: { attrs: { "气运": 4 }, inv: { "灵石": 30 } } },

  // ================= 三宝传闻（秘境引子） =================
  { id: "mjw_jinqu", type: "daily", cat: "jiyuan", realms: [1], cooldown: 12, weight: 2.5,
    text: "北境行商带回消息：极寒冰窟深处有异光，疑是结丹灵物「玄冰魄」出世。去的人不少，回来的不多。",
    effect: { flag: "传闻_mj_jinqu" } },
  { id: "mjw_gu", type: "daily", cat: "jiyuan", realms: [1], cooldown: 12, weight: 2.5,
    text: "丹师圈子里在传：西荒熔岩谷底有「炎髓晶」，地火千年孕一物。好几个筑基后期已经动身了。",
    effect: { flag: "传闻_mj_gu" } },
  { id: "mjw_haifu", type: "daily", cat: "jiyuan", realms: [1], cooldown: 12, weight: 2.5,
    text: "海客醉话：东海雷暴之下沉着一座古府，府中生有「雷灵枝」，每逢雷劫便发亮。醒了他又不认。",
    effect: { flag: "传闻_mj_haifu" } },

  // ================= 结金丹链 =================
  { id: "jjd_1", type: "daily", cat: "jiyuan", realms: [1], chain: "jjd_1",
    text: "坊市传言，拍卖行流出过半页结金丹方，被一位蒙面客天价拍走。结丹之路，人人都想抢个先。" },
  { id: "jjd_2", type: "daily", cat: "ziyuan", realms: [1], chain: "jjd_2",
    text: "你托人求得一张结金丹方。方子是真的，但上面的药材，样样都烧钱。",
    choices: [
      { text: "掏灵石，一次买齐", sub: "灵石 -150，肉疼但省事", cond: { inv: { "灵石": 150 } },
        result: "你咬牙扫了三家药铺，总算把药材凑齐。掌柜笑得见牙不见眼，你笑不出来。", effect: { inv: { "灵石": -150 }, flag: "jjd_料" } },
      { text: "亲自入山采药", sub: "省钱，但费命",
        outcomes: [
          { weight: 2, result: "你在深山蹲了两个月，摔了一跤，被蛇追了三里地，但药材采齐了。", effect: { flag: "jjd_料", attrs: { "根骨": 2 } } },
          { weight: 1, result: "主药生在妖兽窝里。你蹲了十天没寻到机会，只好先回来，改日再想办法。", effect: { attrs: { "根骨": -2 } } }
        ] }
    ] },
  { id: "jjd_2b", type: "daily", cat: "ziyuan", realms: [1], chain: "jjd_2", cooldown: 5, cond: { flag: "结金丹线索" },
    text: "照着长老留的字条，你寻到一位隐居的老丹师。他看了你的丹方，匀给你两味难寻的辅药。",
    effect: { flag: "jjd_料" } },
  { id: "jjd_3", type: "trib", cat: "jiyuan", realms: [1], chain: "jjd_3", cond: { flag: "jjd_料" },
    text: "药材齐备，眼看开炉在即。结金丹九转方成，火候差一丝，就是炉毁丹亡。你净手焚香，就此闭关了。",
    choices: [
      { text: "开炉炼丹", sub: "成败在此一炉",
        outcomes: [
          { weight: 4, result: "七日后丹成，炉中静静躺着一枚金丹。你捧着它，手一直都在抖。", effect: { inv: { "结金丹": 1 } } },
          { weight: 1, result: "丹成那刻，炉中竟是一对！双丹同炉，这是十年难遇。你怀疑自己把后半辈子的运气都用光了。", effect: { inv: { "结金丹": 2 } } },
          { weight: 3, result: "第六日夜里，炉中一声闷响。开炉只见一捧黑灰。你坐了整宿，把火候诀又默了十遍。", effect: { attrs: { "神识": 3 } } }
        ] }
    ] },

  // ================= 心魔预兆链 =================
  { id: "xmy_1", type: "flavor", cat: "xinjing", realms: [1], chain: "xmy_1", cond: { notFlag: "心魔已除" },
    text: "近来打坐时总莫名心悸。昨夜你梦见自己结丹失败，惊醒时一身冷汗。距离结丹越近，心就越不静。" },
  { id: "xmy_2", type: "trib", cat: "xinjing", realms: [1], chain: "xmy_2", cond: { notFlag: "心魔已除" },
    text: "心悸越来越重，运功时识海里隐约有杂音，像很多人在你耳边说话。这是心魔将起的兆头。",
    choices: [
      { text: "闭关静养", sub: "先把心稳住",
        result: "你封关半月，抄经打坐，总算把那点杂音压了下去。但你知道，它只是躲起来了。", effect: { attrs: { "神识": 3 } } },
      { text: "服凝元丹镇压", sub: "凝元丹 -1，见效快", cond: { inv: { "凝元丹": 1 } },
        result: "丹药入腹，一股清凉直冲天灵，杂音尽数退散。借丹压心，终究不是长久之计。", effect: { inv: { "凝元丹": -1 }, attrs: { "神识": 5 } } },
      { text: "不当回事", sub: "区区心悸",
        result: "你没理会。几天后的夜里，识海轰然一响，你眼前发黑，扶着墙才没倒下。", effect: { attrs: { "气运": -2, "神识": -2 } } }
    ] },
    /* @@V2_CHAINS@@ */
  /* ================= 结丹筹备（realms [1]，筑基后期） ================= */
  { id: "zb_jd_shouyuan", minAge: 70, type: "trib", cat: "xinjing", realms: [1], cooldown: 15,
    text: "你对着铜镜拔下一根白发。又算了算寿元——结丹这道坎再迈不过去，往后就只剩坐化一条路了。", effect: { attrs: { "气运": -2 } } },
  { id: "zb_jd_xinde", type: "daily", cat: "renji", realms: [1], cooldown: 6,
    text: "几位筑基后期围炉夜话，轮到结丹心得，人人说得含糊。真东西，谁肯白给你。",
    choices: [
      { text: "花灵石买一份手抄心得", sub: "灵石 -60，真假难说", cond: { inv: { "灵石": 60 } }, outcomes: [
        { weight: 6, result: "心得是真货。你逐句琢磨了三夜，几处关隘豁然开朗。", effect: { inv: { "灵石": -60 }, attrs: { "悟性": 4 } } },
        { weight: 4, result: "回去一翻，全是抄烂的套话。你捏着那叠纸，半天没说话。", effect: { inv: { "灵石": -60 } } }
      ] },
      { text: "旁听一晚，能记多少记多少", sub: "凭悟性", outcomes: [
        { weight: 5, result: "你只记住半句「丹成之前，先散后凝」。半句，也够你想一年。", effect: { attrs: { "悟性": 2 } } },
        { weight: 5, result: "众人都在打机锋。你听到半夜，喝了两壶凉茶。" }
      ] }
    ] },
  { id: "zb_jd_hufa", type: "chance", cat: "jiyuan", realms: [1], cooldown: 8,
    text: "一位相熟的长老即将结丹，缺个信得过的人护法。观摩结丹，这是千载难逢。",
    choices: [
      { text: "应下，守在丹室外", sub: "七日七夜，结果难料", outcomes: [
        { weight: 6, result: "丹成那刻，天地灵气倒卷如龙。你隔着门缝看了全程，心里那层窗户纸，一下子就破了。", effect: { attrs: { "悟性": 5, "神识": 3 } } },
        { weight: 4, result: "第七日丹室炸开，长老重伤，你被气浪掀飞出去。养伤三个月，但那一幕，你一直忘不掉。", effect: { attrs: { "根骨": -5, "悟性": 3 } } }
      ] },
      { text: "婉拒", sub: "护法是有因果的", result: "你推说闭关。后来听说丹成了，你心里空了一下。" }
    ] },
  { id: "zb_jd_chaoxi", type: "miracle", cat: "jiyuan", realms: [1], cooldown: 10, highlight: true,
    text: "天地灵气潮汐骤至，山中草木一夜返青。你当机立断封关百日，出关时修为精进了一大截。", effect: { attrs: { "根骨": 3, "神识": 3 } } },
  { id: "zb_jd_jingjian", type: "trib", cat: "renji", realms: [1], cooldown: 12,
    text: "旧识强行结丹，三个月后传来消息：丹碎，道消。你去吊唁，他洞府里那炉丹药还温着。回来的路上，你走得很慢。", effect: { attrs: { "神识": 3 } } },
  { id: "zb_jd_line", type: "chance", cat: "renji", realms: [1], cond: { notFlag: "散修" }, cooldown: 8,
    text: "执事殿传下话：宗门库房尚有一枚结金丹，非大功不换。名单上你的名字，暂时排在第七。", effect: { attrs: { "气运": 3 } } },
  { id: "zb_jd_paimai", type: "daily", cat: "ziyuan", realms: [1], cooldown: 10,
    text: "坊市风声紧：年末大拍，压轴是一枚结金丹，底价三百灵石起。你摸了摸储物袋，开始默默算账。" },
  { id: "zb_jd_cunshi", type: "daily", cat: "ziyuan", realms: [1], cooldown: 5,
    text: "为攒结丹的本钱，你接了三趟护送灵舟的活。钱到手了，人也熬瘦了一圈。", effect: { inv: { "灵石": 65 }, attrs: { "根骨": -2 } } },
  { id: "zb_jd_qingjiao", type: "daily", cat: "renji", realms: [1], cooldown: 7,
    text: "你想求见结丹长老问一句关窍。长老府前的石阶，你数过了，三百六十级。",
    choices: [
      { text: "备一份厚礼登门", sub: "灵石 -50", cond: { inv: { "灵石": 50 } }, outcomes: [
        { weight: 5, result: "长老收了礼，只说四个字：「急则必败。」你站在台阶上想了很久。", effect: { inv: { "灵石": -50 }, attrs: { "神识": 4 } } },
        { weight: 5, result: "门房收了礼，长老在闭关。礼单原样退了回来，附了句「随缘」。", effect: {} }
      ] },
      { text: "在府外静坐三日", sub: "心诚则灵？", outcomes: [
        { weight: 4, result: "第三日黄昏，府门开了一线。老府丞递出一页旧纸：长老早年结丹的手记残页。", effect: { attrs: { "悟性": 4 } } },
        { weight: 6, result: "你坐到第三日，下了一场雨。没人开门。你拍拍道袍回去了。" }
      ] }
    ] },
  { id: "zb_jd_lingdi", type: "chance", cat: "ziyuan", realms: [1], cooldown: 8,
    text: "结丹要寻一处灵眼闭关。好地方早被人占完了，价码一年一个样。",
    choices: [
      { text: "租一间甲字灵眼", sub: "灵石 -80，图个安稳", cond: { inv: { "灵石": 80 } }, result: "灵眼虽小，胜在清净安稳。你在石壁上刻下封关的日子。", effect: { inv: { "灵石": -80 }, attrs: { "神识": 2 } } },
      { text: "去荒山寻无主野地", sub: "省钱，看运气", outcomes: [
        { weight: 5, result: "你在深谷找到一处小灵眼，无人打扰，只有山风相伴。够用。", effect: { attrs: { "气运": 3 } } },
        { weight: 5, result: "刚布好阵旗，一头妖兽把你撵出了二里地。灵石没省下，还搭进去一面阵旗。", effect: { attrs: { "根骨": -3 } } }
      ] }
    ] },

  /* ================= 结丹期收尾（realms [2]） ================= */
  { id: "jd_he", type: "daily", cat: "renji", realms: [2], cooldown: 6,
    text: "结丹的消息传开，贺礼堆了半间石室。你按着礼单一一回帖，写到后半夜。", effect: { inv: { "灵石": 80 } } },
  { id: "jd_yipin", type: "daily", cat: "renji", realms: [2], cond: { flag: "一品金丹" }, cooldown: 6,
    text: "一品金丹的名头比你的人先到了。三拨人马登门拉拢，连帖子的用纸都比旁人厚三分。", effect: { inv: { "灵石": 100 }, attrs: { "气运": 4 } } },
  { id: "jd_jiadan", type: "trib", cat: "xinjing", realms: [2], cond: { flag: "假丹" }, cooldown: 8,
    text: "同席论道，敬酒的人偏偏绕过了你。有人低笑了一声「假丹真人」。你端起自己那杯，仰头喝了下去。", effect: { attrs: { "神识": 3, "气运": -2 } } },
  { id: "jd_moke", type: "daily", cat: "renji", realms: [2], cond: { flag: "魔修" }, cooldown: 7,
    text: "贺客里混着一位魔修，送上贺礼，满座目光都钉在你手上。",
    choices: [
      { text: "收下贺礼", sub: "正邪两道都看着", outcomes: [
        { weight: 5, result: "匣子里是一百灵石，这份礼很正。你收下了，也记下这个人情。", effect: { inv: { "灵石": 100 } } },
        { weight: 5, result: "匣子里是颗魔珠，煞气很是刺手。你不动声色合上盖子，这东西，拿着实在烫手。", effect: { attrs: { "气运": -3 } } }
      ] },
      { text: "拱手谢绝", sub: "不沾因果", result: "你笑着把礼盒推了回去。那魔修也不恼，饮尽一杯，便飘然去了。" }
    ] },
  { id: "jd_zongpai", type: "flavor", cat: "xinjing", realms: [2], cooldown: 10,
    text: "你路过一座云雾缭绕的矮山，忽然想：开宗立派，收几个徒弟，好像也不错。一打听，这座山头有主了。" },
  { id: "jd_yuanying", type: "miracle", cat: "xinjing", realms: [2], cooldown: 12,
    text: "夜里你登高远眺。北方三千里外，是那位元婴老祖闭关的山。金丹之上还有路。你站到天亮。", effect: { attrs: { "神识": 4 } } },
  { id: "jd_jiuyou", type: "daily", cat: "renji", realms: [2], cooldown: 8,
    text: "炼气时的旧友找上门来。他筑基无望，鬓已斑白，想在你门下谋个执事的差事。",
    choices: [
      { text: "收留他", sub: "多一张吃饭的嘴", result: "你给他安排了看管药园的闲差。他千恩万谢，你想起当年一起领月例的日子。", effect: { attrs: { "气运": 4 } } },
      { text: "赠些灵石，劝他回乡", sub: "灵石 -30", cond: { inv: { "灵石": 30 } }, result: "他收了灵石，走到山门口又回头望了一眼。这一眼，你记了很多年。", effect: { inv: { "灵石": -30 } } }
    ] },
  { id: "jd_xiansheng", type: "daily", cat: "renji", realms: [2], cooldown: 8,
    text: "下山采买，凡人跪了一地。里正颤巍巍地问：神仙可要立庙？你买了两斤盐，便御风走了。", effect: { attrs: { "气运": 3 } } },
  { id: "jd_xiancha", type: "daily", cat: "xinjing", realms: [2], cooldown: 6,
    text: "结丹之后寿元大涨，你头一回敢把茶泡到第三遍再喝。日子，忽然宽裕了。" },
  { id: "jd_jiesha", type: "trib", cat: "zhandou", realms: [2], cooldown: 10,
    text: "归途遭截杀。来人蒙面，出手却是冲着你的金丹来的——金丹在黑市上，是有价钱的。",
    choices: [
      { text: "迎战", sub: "结丹修士，岂容人欺", outcomes: [
        { weight: 6, result: "三十回合，你震碎他的法器。那人遁走前撂下狠话，你没记住，你只记住了金丹真人动起手来的分量。", effect: { attrs: { "根骨": 4, "气运": 3 } } },
        { weight: 4, result: "来人竟有帮手。你负伤突围，在山涧里躲了两日。金丹真人的名头，也护不住你。", effect: { attrs: { "根骨": -5 } } }
      ] },
      { text: "破财免灾", sub: "灵石 -100", cond: { inv: { "灵石": 100 } }, result: "你抛出一只装满灵石的储物袋，趁对方分神遁走。回去的路上，你把这条路记进了黑名单。", effect: { inv: { "灵石": -100 } } }
    ] },

  /* ================= 通用留白（realms [0,1,2]，全 flavor） ================= */
  { id: "f2_siji", type: "flavor", cat: "xinjing", realms: [0, 1, 2], cooldown: 10, text: "山中无历日。桃花开第三回的时候，你才想起又过了一年。" },
  { id: "f2_shanshui", type: "flavor", cat: "xinjing", realms: [0, 1, 2], cooldown: 9, text: "你沿着溪涧走了半日，什么也没想。山里的水，比洞府里的清。" },
  { id: "f2_fangshi", type: "flavor", cat: "renji", realms: [0, 1, 2], cooldown: 8, text: "坊市角落的老摊主还记得你，多饶了两张符纸。他说他摆了三十年摊，看你从小修士逛到如今。" },
  { id: "f2_cha", type: "flavor", cat: "xinjing", realms: [0, 1, 2], cooldown: 10, text: "新焙的灵茶，头一泡最苦。你慢慢喝完了三泡，像在喝这些年。" },
  { id: "f2_yu", type: "flavor", cat: "xinjing", realms: [0, 1, 2], cooldown: 9, text: "夜雨敲檐。你索性不练了，披衣坐到天亮，听了一整夜的雨。" },
  { id: "f2_qi", type: "flavor", cat: "renji", realms: [0, 1, 2], cooldown: 10, text: "看两个老修士在松下对弈，一局棋下了一个月。你问谁赢了，两人都说：急什么。" },
  { id: "f2_diaoyu", type: "flavor", cat: "xinjing", realms: [0, 1, 2], cooldown: 8, text: "你在深潭边钓了一日鱼，一条没上钩。挺好，本来也不是为了鱼。" },
  { id: "f2_shaishu", type: "flavor", cat: "xinjing", realms: [0, 1, 2], cooldown: 11, text: "晴日晒书。功法玉简晒不得，你晒的是早年抄废的笔记，字里行间都是当年的笨功夫。" },
  { id: "f2_xueye", type: "flavor", cat: "xinjing", realms: [0, 1, 2], cooldown: 10, text: "雪夜，炉上温着酒。你想起一些没来及告别的人，举杯敬了敬门外的大雪。" },
  { id: "f2_yun", type: "flavor", cat: "xinjing", realms: [0, 1, 2], cooldown: 8, text: "躺在山坡上看云。云聚了又散，散了又聚，倒比修士自在。" },
    /* @@V2_JIEDAN@@ */
  { id: "mj_yaoxue_in", type: "chance", cat: "jiyuan", realms: [1], weight: 5, dungeon: "mj_yaoxue",
    text: "山那头出了妖兽巢穴，猎妖的修士去了三拨，只回来一个。你备足符咒丹药，摸到了谷口。" },
  { id: "mj_moku_in", type: "chance", cat: "jiyuan", realms: [1], weight: 5, dungeon: "mj_moku",
    text: "魔窟近来防守松懈，三当家外出未归。你换了身行头，扮作投奔的散修，混到了窟门前。" },
  { id: "mj_jinqu_in", type: "chance", cat: "jiyuan", realms: [1], weight: 5, dungeon: "mj_jinqu",
    text: "禁区煞气十年一弱，正是这几天。进去的修士九死无生，出来的闭口不谈。你在界碑外站了很久，攥紧了保命的东西。" },
  { id: "mj_gu_in", type: "chance", cat: "jiyuan", realms: [1], weight: 5, cond: { inv: { "灵石": 60 } }, dungeon: "mj_gu",
    text: "坠星谷的星核开了市，切涨的欢呼隔着三里地。你掂了掂储物袋，本钱还够，挤进了人堆。" },
  { id: "mj_haifu_in", type: "chance", cat: "jiyuan", realms: [1], weight: 3, cond: { inv: { "灵石": 50 } }, dungeon: "mj_haifu",
    text: "退潮那晚，有渔人看见海底亮着灯火。你花五十灵石买了颗避水珠，扎进了墨黑的海里。" },
    /* @@V2_DUNGEONS_ENTRIES@@ */
    { id: "f_snow", type: "flavor", cat: "xinjing", layers: [1, 13], realms: [0, 1, 2], cooldown: 10, text: "大雪封山，你在洞府煮茶看雪，难得几日清闲。" },
    { id: "f_rain", type: "flavor", cat: "xinjing", layers: [1, 13], cooldown: 10, text: "山雨敲了整夜竹叶。你听着雨声打坐，心里很是安静。" },
    { id: "f_market", type: "flavor", cat: "renji", layers: [1, 13], realms: [0, 1, 2], cooldown: 10, text: "坊市今日格外热闹，说书人正讲着某位元婴老祖的传奇。" },
    { id: "f_recover", type: "daily", cat: "xinjing", layers: [1, 13], realms: [0, 1, 2], cond: { flag: "走火入魔", min: { "神识": 55 } }, highlight: true, text: "你用了整整三年，一点点磨平走火入魔的暗伤。心魔，散了。", effect: { flag: "心魔已除" } },
    { id: "f_moyou", type: "daily", cat: "xiulian", layers: [1, 13], realms: [0, 1], cond: { flag: "魔修" }, cooldown: 5, text: "魔功进境飞快，但你发现自己的影子，颜色越来越深。" },
    { id: "f_hunt", type: "trib", cat: "zhandou", layers: [1, 13], realms: [0, 1], cond: { flag: "魔修" }, cooldown: 7, text: "除魔卫道的修士找上门，你且战且退，躲进深山三个月。", effect: { attrs: { "根骨": -4 } } }
  ],

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
    ] }
  ],

  /* 结局：按顺序匹配，命中即止 */
  endings: [
    { cond: { flag: "功成名就", flag2: "一品金丹" }, title: "金丹大道 · 一品天成", comment: "一粒金丹吞入腹，始知我命不由天。结丹大典上，连元婴老祖都多看了你两眼。长生路远，你才刚刚上路。" },
    { cond: { flag: "功成名就", flag2: "魔修" }, title: "魔丹噬道 · 我行我素", comment: "正道的光没能照到你，你索性自己成了光——虽然是黑的那种。魔丹一成，天地任你走。" },
    { cond: { flag: "功成名就", flag2: "假丹" }, title: "假丹苦涩 · 道途多舛", comment: "丹成了，可惜却是假的。庆贺的宴席上你笑着敬酒，只有自己知道丹田里那丝涩意。有人说假丹也有春天——你打算找找看。" },
    { cond: { flag: "功成名就" }, title: "真丹凝就 · 道基稳固", comment: "从炼气到结丹，你走了大半生。真丹一成，寿元五百，仙途终于不再遥不可及。洞府外云海翻腾，像极了你十二岁那年看过的那片。" },
    { cond: { flag: "走火未愈" }, title: "走火入魔 · 道消身殒", comment: "心魔最终还是赢了。道友们为你送行时说：TA本可以走得更远的。下一局，神识多加点。" },
    { cond: { flag: "魔修" }, title: "魔道妖人 · 我行我素", comment: "正道的光没能照到你，但你也活成了传说——虽然是吓小孩的那种。魔道也是道，你认，就好。" },
    { cond: { flag: "筑基", min: { "灵根": 100 } }, title: "天道筑基 · 仙途初成", comment: "百年苦修，一朝筑基！你已站在无数凡人仰望的高度。虽然仙途止步于此，但山下的传说里，会有你的名字。" },
    { cond: { flag: "筑基" }, title: "筑基修士 · 一方师叔", comment: "从引气入体到筑基成功，你用了大半生。从此凡人见你，要称一声「仙师」。" },
    { cond: { flag: "古经" }, title: "传承在握 · 大器晚成", comment: "你没能筑基，但你识海里那部古经，是多少人求不来的造化。下一局带着它，早些把它看懂。" },
    { cond: { flag: "道侣" }, title: "神仙眷侣 · 大道不孤", comment: "道途未竟，但你从不是一个人走。桃花树下那句「可愿」，是这一局最好的机缘。" },
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
