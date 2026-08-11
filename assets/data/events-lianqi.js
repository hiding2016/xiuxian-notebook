/* 修仙记事本 · 炼气期事件（自 data.js 拆分，引擎加载顺序在本文件之后合并） */
window.GAME_EVENTS_R0 = [
    { id: "born", milestone: 0, type: "daily", cat: "renji", layers: [1, 1], text: "你生在山脚小村。十二岁那年，云游的仙长路过，测出你身怀灵根。", highlight: true },
    { id: "yinqi", milestone: 2, type: "daily", cat: "xiulian", layers: [1, 1], text: "引气入体！第一缕灵气沉入丹田那晚，你激动得整夜未眠。", highlight: true },
    { id: "join_zongmen", age: [0, 2], type: "daily", cat: "renji", layers: [1, 2], cond: { flag: "宗门" }, text: "凭着故旧渊源，你直接被收入内门。同门看你的眼神，又是羡慕又是嫉妒。" },
    { id: "join_outer", age: [0, 2], type: "daily", cat: "renji", layers: [1, 2], cond: { notFlag: "宗门", notFlag2: "散修" }, text: "你拜入青云宗外门，领了一身粗布道袍、一块身份玉牌，和每月两块灵石的月例。", effect: { inv: { "灵石": 4 } } },
    { id: "join_sanxiu", age: [0, 2], type: "daily", cat: "renji", layers: [1, 2], cond: { flag: "散修" }, text: "你无门无派，揣着半本残诀下了山。散修的路，走一步算一步。" },
    { id: "you_1", type: "chance", cat: "renji", layers: [3, 10], chain: "you_1", highlight: true,
      text: "入门第三年，你还是月月缺粮。同屋的【挚友】总把干粮掰一半推过来：「吃吧，我胃口小。」",
      choices: [
        { text: "记在心上", effect: { flag: "挚友" }, result: "你把这份情记下了。往后的日子，你们搭伙吃饭，也搭伙练功。" },
        { text: "不好意思总受惠", effect: { flag: "挚友" }, result: "你推了两次，第三次还是接了。他在你床头刻了两个字：「欠着。」" }
      ] },
    { id: "you_2", type: "trib", cat: "zhandou", layers: [6, 13], chain: "you_2", cond: { flag: "挚友" },
      text: "山下除妖的任务，妖狼比传闻多一只。眼看爪牙到了眼前，【挚友】横刀替你挡了一下，胳膊见了骨。",
      choices: [
        { text: "背他回山", effect: { attrs: { "根骨": 2 } }, result: "你背着他走了四十里。他在你背上还笑：「扯平了，上次的干粮钱。」" },
        { text: "回身杀狼", outcomes: [
          { weight: 7, result: "你红着眼杀退了妖狼。他包着伤口直咧嘴：够意思。", effect: { attrs: { "根骨": 2, "气运": 2 } } },
          { weight: 3, result: "你们且战且退，互相掺着回了山，谁也没丢下谁。", effect: { attrs: { "根骨": -2, "神识": 2 } } }
        ] }
      ] },
    { id: "zdl_1", type: "daily", cat: "renji", layers: [5, 12], chain: "zdl_1", cond: { notFlag: "道侣" },
      text: "坊市上你被两个讹人的摊主缠住，一个叫【道侣名】的修士三言两语替你解了围。TA摆摆手说：「出门在外的，谁没个难处。」" },
    { id: "kid_zama", type: "daily", cat: "xiulian", layers: [1, 4], cooldown: 4, text: "每日天不亮就起来扎马步、挑水。师兄说，根基都是这么熬出来的。", effect: { attrs: { "根骨": 1 } } },
    { id: "kid_shizi", type: "flavor", cat: "xiulian", layers: [1, 3], cooldown: 6, text: "老修士教你们认字：「道经三千，先识字，然后再识道。」" },
    { id: "kid_daza", type: "daily", cat: "ziyuan", layers: [1, 4], cond: { notFlag: "散修" }, cooldown: 4, text: "你在膳堂帮厨，劈柴烧火一个月，管事赏了你一块灵石。", effect: { inv: { "灵石": 1 } } },
    { id: "kid_sleep", type: "flavor", cat: "xiulian", layers: [1, 5], cooldown: 6, text: "讲法课上你睡着了，被戒尺敲了三下。屁股摔得生疼，但梦做得格外甜。" },
    { id: "kid_play", type: "flavor", cat: "renji", layers: [1, 4], cooldown: 6, cond: { notFlag: "散修" }, text: "你和邻铺的弟子偷溜下山，买了串糖葫芦。回门时被抓，罚扫三天台阶。" },
    { id: "kid_body", type: "daily", cat: "xiulian", layers: [1, 5], cooldown: 5, text: "晨跑三十里，你咬着牙跑完了全程。感觉筋骨结实了一点。", effect: { attrs: { "根骨": 1 } } },
    { id: "a_tuna", type: "daily", cat: "xiulian", layers: [1, 4], cooldown: 4, weight: 1.2, text: "你在蒲团上吐纳一夜，灵气在经脉里多转了三个周天。" },
    { id: "a_gongfa", milestone: 1, type: "daily", cat: "xiulian", layers: [1, 1], cond: { notFlag: "散修" }, text: "传功堂发下基础功法《引气诀》。你翻了一夜，还是似懂非懂。" },
    { id: "a_gongfa_san", milestone: 1, type: "daily", cat: "xiulian", layers: [1, 1], cond: { flag: "散修" }, text: "你捧着那半本残诀，一个字一个字地啃。没人教，那就自己悟。" },
    { id: "a_gongfa2", type: "daily", cat: "xiulian", layers: [1, 3], cond: { min: { "悟性": 60 } }, text: "《引气诀》你三天就吃透了，还挑出两处错漏。传功师兄表情复杂。", effect: { attrs: { "悟性": 3 } } },
    { id: "a_slow", type: "daily", cat: "xiulian", layers: [1, 4], cond: { max: { "灵根": 40 } }, text: "灵气入体如泥牛入海。你终于明白，灵根差，是什么意思。" },
    { id: "a_fast", type: "daily", cat: "xiulian", layers: [1, 4], cond: { min: { "灵根": 70 } }, text: "灵气争先恐后往你体内钻。隔壁铺的师兄酸了：「人比人，真能气死人。」", effect: { attrs: { "气运": 2 } } },
    { id: "a_zhoutian", type: "daily", cat: "xiulian", layers: [2, 5], cooldown: 5, text: "你第一次完整运行大周天，收功时东方既白，浑身说不出的舒坦。" },
    { id: "a_lingtian", type: "daily", cat: "ziyuan", layers: [1, 5], cond: { notFlag: "散修" }, cooldown: 4, text: "灵田除草三日，换五块灵石。腰快断了，但储物袋沉了一点。", effect: { inv: { "灵石": 5 } } },
    { id: "a_task1", type: "daily", cat: "ziyuan", layers: [1, 5], cond: { notFlag: "散修" }, cooldown: 4, text: "你接了给药园捉虫的任务，报酬微薄，但胜在安全。", effect: { inv: { "灵石": 4 } } },
    { id: "a_caiyao", type: "daily", cat: "ziyuan", layers: [1, 6], cooldown: 4, text: "你上山采药，背篓装满时天色已晚，药童多给了你一块灵石。", effect: { inv: { "灵石": 4 } } },
    { id: "a_fangshi", type: "daily", cat: "ziyuan", layers: [1, 13], cooldown: 6, text: "坊市人来人往。你逛了一整天，什么也没买，光是过了一回眼瘾。" },
    { id: "a_tuzi", type: "daily", cat: "zhandou", layers: [1, 5], cooldown: 5, text: "后山窜出一只妖兔。你手忙脚乱才打赢，兔肉烤着很香。", effect: { attrs: { "根骨": 2 } } },
    { id: "a_yanwu", minAge: 12, type: "daily", cat: "zhandou", layers: [2, 6], cond: { notFlag: "散修" }, cooldown: 5, text: "演武堂对练，你被师兄放倒七次。第八次，你撑过了十招。", effect: { attrs: { "根骨": 3 } } },
    { id: "a_hurt1", minAge: 16, type: "trib", cat: "zhandou", layers: [1, 6], cond: { max: { "根骨": 45 } }, text: "下山历练遇上妖狼，你拼死逃脱，腿上多了道疤。", effect: { attrs: { "根骨": -4 } } },
    { id: "a_shixiong", type: "daily", cat: "renji", layers: [1, 6], cond: { notFlag: "散修" }, cooldown: 5, text: "师兄拉你去后山喝酒，讲了一夜里门内八卦。你记住了：三长老和五长老不对付。" },
    { id: "a_shimei", type: "daily", cat: "renji", layers: [1, 8], cond: { min: { "气运": 50 } }, cooldown: 6, text: "师妹向你请教功法，你讲得口干舌燥，她塞给你一篮灵果。", effect: { attrs: { "根骨": 3 } } },
    { id: "a_friend", type: "daily", cat: "renji", layers: [1, 9], cooldown: 8, text: "你和隔壁铺的周福成了朋友，约好将来一起下山历练。" },
    { id: "a_home_1", type: "flavor", cat: "renji", layers: [2, 8], chain: "home_1", text: "村里捎来口信，是娘托人写的：「仙山的饭，吃得惯吗？别省钱。」" },
    { id: "a_home", type: "flavor", cat: "renji", layers: [2, 9], chain: "home_2", cooldown: 8, text: "夜里想家。你摸出离家时娘塞的煮鸡蛋，已经凉了，你吃得很慢。" },
    { id: "a_star", type: "flavor", cat: "xinjing", layers: [1, 13], cooldown: 8, text: "你在山顶看了一夜星。所谓长生，大概是想多看几年这样的夜。" },
    { id: "a_doubt", type: "daily", cat: "xinjing", layers: [2, 8], cooldown: 6, cond: { max: { "灵根": 45 } }, text: "看着同门接连破境，你第一次问自己：我真的适合修仙吗？" },
    { id: "a_yupei", type: "miracle", cat: "jiyuan", layers: [1, 8], cond: { min: { "气运": 65 } }, highlight: true,
      text: "溪边浣衣，你摸起一块温润古玉，灵气隐现，一瞧便知绝非凡品。",
      choices: [
        { text: "揣进怀里", sub: "宝物动人心", outcomes: [
          { weight: 75, result: "是块上好的养魂玉！夜里贴身佩戴，神识日日温养。", effect: { attrs: { "神识": 8 } } },
          { weight: 25, result: "这玉是有主的！主人找上门来，你赔礼又赔钱才脱身。", effect: { inv: { "灵石": -8 }, attrs: { "神识": -2 } } }
        ] },
        { text: "放回去", sub: "来路不明的少碰", result: "你把玉放回溪里。稳妥是稳妥，就是夜里总想起它。" }
      ] },
    { id: "a_lingshi_find", type: "daily", cat: "jiyuan", layers: [1, 13], cond: { min: { "气运": 60 } }, cooldown: 6, text: "山路转角，一块无主灵石静静躺在草丛里。", effect: { inv: { "灵石": 8 } } },
    { id: "b_pingjing", type: "daily", cat: "xiulian", layers: [5, 9], cooldown: 5, text: "你卡在瓶颈，三个月修为纹丝不动，急得你嘴里起了泡。" },
    { id: "b_dunwu", type: "daily", cat: "xiulian", layers: [5, 11], cond: { min: { "悟性": 65 } }, cooldown: 8, highlight: true, text: "卡了半年的瓶颈被一场山雨点醒。你推开窗，大笑三声，修为豁然贯通。" },
    { id: "b_biguan", type: "daily", cat: "xiulian", layers: [5, 12], cooldown: 6, text: "你闭了三个月死关，出关时胡子老长，修为精进不少。" },
    { id: "b_book", type: "daily", cat: "xiulian", layers: [5, 13], cond: { min: { "悟性": 55 }, notFlag: "散修" }, cooldown: 6, text: "藏经阁角落，一本前人笔记里夹着的批注让你茅塞顿开。", effect: { attrs: { "悟性": 4 } } },
    { id: "b_book_fail", type: "daily", cat: "xiulian", layers: [5, 9], cond: { max: { "悟性": 35 } }, cooldown: 5, text: "你啃了三个月高阶功法，字都认识，连起来不懂。" },
    { id: "b_shenshi", type: "daily", cat: "xiulian", layers: [5, 13], cond: { min: { "神识": 60 } }, cooldown: 6, text: "夜里神识外放，你第一次「看」到十里外的流萤。天地从未如此清晰。", effect: { attrs: { "神识": 4 } } },
    { id: "b_cheated", minAge: 10, type: "trib", cat: "ziyuan", layers: [3, 10], cond: { max: { "气运": 45 } }, chain: "pianzi_1", text: "你花十块灵石买了颗「千年灵芝」，回去一泡——是萝卜。摊主早没影了。", effect: { inv: { "灵石": -10 } } },
    { id: "b_taobao", type: "chance", cat: "ziyuan", layers: [4, 11], cond: { min: { "气运": 60 } }, text: "地摊角落一块黑乎乎的「废铁」，你鬼使神差买了下来——是块玄铁精！", effect: { inv: { "灵石": 20 } } },
    { id: "b_dushi", type: "chance", cat: "ziyuan", layers: [5, 12], cond: { min: { "气运": 65 } }, text: "坊市赌石，你随手挑的那块开出了灵晶！围观修士眼都红了。", effect: { inv: { "灵石": 18 } } },
    { id: "b_lose_stone", type: "trib", cat: "ziyuan", layers: [4, 13], cond: { max: { "气运": 40 } }, cooldown: 6, text: "储物袋破了个洞，灵石撒了一路，捡回来时少了八块。", effect: { inv: { "灵石": -8 } } },
    { id: "b_danlu", type: "daily", cat: "ziyuan", layers: [5, 13], cond: { flag: "丹道" }, cooldown: 5, text: "你开炉炼丹，一炉聚气丹成色上乘。丹房长老直呼捡到宝了。", effect: { inv: { "聚气丹": 2 }, attrs: { "悟性": 2 } } },
    { id: "b_danlu_boom", type: "trib", cat: "ziyuan", layers: [5, 13], cond: { flag: "丹道", max: { "气运": 40 } }, text: "炸炉了。你被崩得满脸黑，丹房三个月不许你进。", effect: { attrs: { "根骨": -3 } } },
    { id: "b_task2", type: "daily", cat: "ziyuan", layers: [5, 12], cond: { notFlag: "散修" }, cooldown: 5, text: "你随队护送商队，一路上有惊无险，酬劳也还过得去。", effect: { inv: { "灵石": 10 } } },
    { id: "b_dabi", minAge: 16, type: "chance", cat: "zhandou", layers: [5, 10], cond: { notFlag: "散修", min: { "根骨": 50 } }, highlight: true, text: "外门大比，你连胜七场杀进前十。长老们第一次记住了你的名字。", effect: { inv: { "灵石": 15 }, attrs: { "气运": 3 } } },
    { id: "b_dabi_lose", minAge: 16, type: "trib", cat: "zhandou", layers: [5, 10], cond: { notFlag: "散修", max: { "根骨": 40 } }, text: "外门大比，你第一轮就下台了。场边有人喊「下一个」。" },
    { id: "b_yaolang", minAge: 16, type: "trib", cat: "zhandou", layers: [5, 11], cooldown: 6, text: "历练途中遭遇妖狼群，你且战且退，杀出重围时道袍已成布条。", effect: { attrs: { "根骨": 4 } } },
    { id: "b_jianzhong", type: "miracle", cat: "zhandou", layers: [5, 13], cond: { flag: "剑修", notFlag: "佩剑" }, highlight: true, text: "你误入剑冢，冢中万剑齐鸣。一柄锈剑主动落入你手，当场认了主。", effect: { flag: "佩剑", attrs: { "根骨": 5 } } },
    { id: "b_jianyi", type: "daily", cat: "zhandou", layers: [7, 13], cond: { flag: "佩剑" }, cooldown: 6, text: "你练剑三年，一剑斩出，瀑布断流一瞬。剑意初成。", effect: { attrs: { "神识": 4 } } },
    { id: "b_zandui", minAge: 14, type: "daily", cat: "renji", layers: [5, 10], cond: { notFlag: "散修" }, cooldown: 7, text: "门内两派明争暗斗，都有人递来橄榄枝。你装傻，两边都不得罪。" },
    { id: "b_elder", type: "chance", cat: "renji", layers: [5, 12], cond: { notFlag: "散修", min: { "灵根": 65 } }, chain: "shitu_1", text: "一位长老看你演功，点头说了句「可造之材」。你高兴了好几天。", effect: { attrs: { "悟性": 3 } } },
    { id: "b_betray", type: "trib", cat: "renji", layers: [5, 11], cond: { max: { "气运": 40 } }, text: "你信任的师兄把你的任务功劳据为己有。你去找执事，执事和稀泥。", effect: { attrs: { "神识": 3 } } },
    { id: "b_drink", type: "flavor", cat: "renji", layers: [5, 13], cooldown: 7, text: "休沐日，几个同门凑钱买了坛灵酒，吹牛吹到半夜。" },
    { id: "b_xinmo1", minAge: 14, type: "trib", cat: "xinjing", layers: [6, 11], chain: "xinmo_1", text: "瓶颈期第三个月，你夜里惊醒：父母在老去，道途看不到头。念头像野草疯长。" },
    { id: "b_mortal", type: "flavor", cat: "xinjing", layers: [5, 13], cooldown: 8, text: "回村探亲，儿时玩伴已是两个孩子的爹。他问你：修仙苦不苦？你笑了笑，终究没有答话。" },
    { id: "b_mortal2", type: "flavor", cat: "xinjing", layers: [8, 13], cooldown: 10, highlight: true, text: "再回村时，村口老槐树还在，认识你的人却没有了。你站了很久。" },
    { id: "b_cave", type: "miracle", cat: "jiyuan", layers: [5, 12], cond: { min: { "神识": 55 }, notFlag: "洞天" }, highlight: true,
      text: "你发现一处废弃洞府，隐约有聚灵阵的波动，但门口残留着警示的刻痕。",
      choices: [
        { text: "进去探探", sub: "机缘与风险并存", outcomes: [
          { weight: 7, result: "聚灵阵残阵完好！这处福地，从今往后归你了。", effect: { flag: "洞天" } },
          { weight: 3, result: "残阵突然反噬，灵光炸开，你被掀出洞府，躺了半个月才下地。", effect: { attrs: { "根骨": -6 } } }
        ] },
        { text: "绕开", sub: "警示不会白刻", result: "你多看了两眼，转身离开了。命比机缘重要。" }
      ] },
    { id: "b_lingshou1", type: "miracle", cat: "jiyuan", layers: [4, 12], cond: { flag: "御兽", notFlag: "灵兽" }, chain: "linghu_1", highlight: true, text: "你在陷阱里救出一只灵狐幼崽。它舔了舔你的手，赖着不走了。", effect: { flag: "灵兽" } },
    { id: "b_mijing_in", minAge: 20, type: "chance", cat: "jiyuan", layers: [6, 13], cond: { min: { "气运": 55 } }, cooldown: 10, text: "秘境开启，你跟着人潮涌入。风险与机缘并存的地方。", effect: { inv: { "灵石": 12 } } },
    { id: "c_ningyuan", type: "daily", cat: "xiulian", layers: [10, 13], cooldown: 4, text: "真元在丹田凝成液滴，距离圆满又近一分。" },
    { id: "c_leijie_yugan", type: "daily", cat: "xiulian", layers: [11, 13], cooldown: 6, text: "夜里你隐隐感到天威——雷劫不远了。既期待，又有些害怕。" },
    { id: "c_zhidao", type: "chance", cat: "renji", layers: [10, 13], cond: { notFlag: "散修", min: { "灵根": 60 } }, text: "筑基期师叔讲法，一句「真元九转，方可叩关」让你少走三年弯路。", effect: { attrs: { "悟性": 5 } } },
    { id: "c_auction", type: "daily", cat: "ziyuan", layers: [9, 13], cooldown: 6, text: "拍卖会上，一枚筑基丹被抬到一百二十灵石。你摸了摸口袋，沉默了好一会儿。" },
    { id: "c_zhunbei", type: "daily", cat: "ziyuan", layers: [10, 13], cooldown: 5, text: "你开始为筑基盘点家底：灵石、丹药、护身符。一样都不能少。" },
    { id: "c_moyan", minAge: 18, type: "daily", cat: "zhandou", layers: [10, 13], cond: { min: { "根骨": 55 } }, cooldown: 6, text: "你主动请缨镇压妖兽动乱，一身伤痕换来了实打实的杀伐经验。", effect: { attrs: { "根骨": 5 }, inv: { "灵石": 12 } } },
    { id: "c_daoxin", type: "trib", cat: "xinjing", layers: [10, 13], chain: "xinmo_2", text: "圆满在即，心魔却越来越强。镜子里的人问你：「若筑基失败，你这一生算什么？」" },
    { id: "c_qishi", type: "daily", cat: "renji", layers: [10, 13], cond: { notFlag: "散修" }, cooldown: 6, text: "同层修士看你的眼神变了：有人巴结，有人疏远，有人下绊子。" },
    { id: "m_lingsui", minAge: 20, type: "miracle", cat: "jiyuan", layers: [8, 13], cond: { notFlag: "灵髓" }, highlight: true, cooldown: 10,
      text: "地脉深处，一汪灵髓微光荡漾——但泉边盘着一条独角蛟。",
      choices: [
        { text: "趁它熟睡取宝", sub: "成败三分险", outcomes: [
          { weight: 5, result: "你屏息取了灵髓，独角蛟翻了个身，并没有醒来。材料到手一件！", effect: { flag: "灵髓" } },
          { weight: 2, result: "蛟尾一拍，你伏在岩后等了整整一夜，到底还是被你摸到了泉边。", effect: { flag: "灵髓" } },
          { weight: 3, result: "蛟目圆睁！你连滚带爬逃出地脉，灵髓洒了大半。", effect: { attrs: { "根骨": -5 } } }
        ] },
        { text: "掷聚气丹引它分神", sub: "聚气丹 -1 · 十拿九稳", cond: { inv: { "聚气丹": 1 } }, outcomes: [
          { weight: 6, result: "丹瓶滚落远处，独角蛟循声扑去。你从容取了灵髓，安安稳稳退了出来。", effect: { inv: { "聚气丹": -1 }, flag: "灵髓" } },
          { weight: 4, result: "独角蛟一尾拍碎了丹瓶，却仍被声响引开。你夺了半汪灵髓便走。", effect: { inv: { "聚气丹": -1 }, flag: "灵髓", attrs: { "根骨": -2 } } }
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
    { id: "pianzi_2", type: "chance", cat: "renji", layers: [4, 12], chain: "pianzi_2",
      text: "坊市转角，你撞见当年卖你「千年灵芝」的骗子，他正忽悠别人。",
      choices: [
        { text: "当众拆穿", sub: "出了这口恶气", result: "你当场拆穿他。众人叫好，骗子抱头鼠窜，你的灵石也要了回来。", effect: { inv: { "灵石": 10 }, attrs: { "气运": 3 } } },
        { text: "暗中跟踪", sub: "看看他什么来路", result: "你跟着他到了破庙——他对着一个病弱孩童嘘寒问暖。你沉默了。", effect: { flag: "pianzi_shan" } }
      ] },
    { id: "pianzi_3", type: "miracle", cat: "renji", layers: [5, 13], chain: "pianzi_3", cond: { flag: "pianzi_shan" }, highlight: true,
      text: "你又在破庙见到那骗子。这次他说了实话：他是落难的阵法师，骗钱只为给孩子治病。作为答谢，他送你一张残阵图。", effect: { flag: "洞天", attrs: { "悟性": 5 } } },
    { id: "baoen_2", minAge: 18, type: "miracle", cat: "renji", layers: [6, 13], chain: "baoen_2", highlight: true,
      text: "当年你救下的重伤散修找上门来——他已筑基成功。「道友仁义，这枚筑基丹，请务必收下。」", effect: { inv: { "筑基丹": 1 } } },
    { id: "choujia_2", minAge: 18, type: "trib", cat: "zhandou", layers: [6, 13], chain: "choujia_2",
      text: "当年秘境夺宝的沈七寻上门来，点名要与你「切磋」。",
      choices: [
        { text: "迎战", sub: "根骨高更有胜算", result: "三十回合后你胜了半招。他收势站定，问了一句：「你师承何处？」你答了，他拱拱手：「恩怨两清。」", effect: { attrs: { "根骨": 5 }, flag: "chou_jie" } },
        { text: "避战赔礼", sub: "灵石 -20，息事宁人", cond: { inv: { "灵石": 20 } }, result: "你赔了一笔灵石。他拿了东西走人，你心里憋屈。", effect: { inv: { "灵石": -20 } } }
      ] },
    { id: "choujia_3", type: "chance", cat: "renji", layers: [7, 13], chain: "choujia_3", cond: { flag: "chou_jie" },
      text: "昔日的沈七如今见你就递灵酒：「不打不相识！下次秘境，组队？」多一个能打的朋友，感觉还不赖。", effect: { attrs: { "气运": 5 } } },
    { id: "daolv_2", minAge: 22, type: "trib", cat: "renji", layers: [7, 13], chain: "daolv_2", cond: { flag: "道侣" },
      text: "【道侣名】外出历练重伤归来，需要百年灵药续命。药铺开价五十灵石。",
      choices: [
        { text: "砸锅卖铁也要救", sub: "灵石 -50（不够也得掏）", cond: { inv: { "灵石": 50 } }, result: "你守在榻前七天七夜。TA醒来第一句话：「傻瓜。」", effect: { inv: { "灵石": -50 }, attrs: { "气运": 8 } } },
        { text: "入山寻药", sub: "用自己的方式救", result: "你在深山搏杀半月，浑身是伤地采回灵药。TA哭了，你笑了。", effect: { attrs: { "根骨": -5, "气运": 5 } } }
      ] },
    { id: "daolv_3", minAge: 22, type: "flavor", cat: "renji", layers: [8, 13], chain: "daolv_3", cond: { flag: "道侣" }, cooldown: 10,
      text: "月圆之夜，你与道侣并肩坐在峰顶。TA说：「长生路远，有你就不远。」" },
    { id: "xinmo_3", type: "trib", cat: "xinjing", layers: [10, 13], chain: "xinmo_3", highlight: true,
      text: "心魔大劫！无数个声音在你识海里嘶吼：放弃吧，凡人就该有凡人的命。",
      choices: [
        { text: "直面心魔", sub: "破而后立（神识高更稳）", result: "你睁眼时泪流满面，灵台却前所未有的清明。心魔，散了。", effect: { attrs: { "神识": 12 }, flag: "心魔已除" } },
        { text: "强行压制", sub: "稳住，别浪", result: "你把心魔强压下去，但道基震出一道裂痕。", effect: { attrs: { "根骨": -8 }, flag: "走火入魔" } }
      ] },
    { id: "c_dan_buy", type: "chance", cat: "ziyuan", layers: [4, 12],
      text: "坊市丹铺，聚气丹三十灵石一枚，掌柜说是「最后一颗」。",
      choices: [
        { text: "买下", sub: "灵石 -30，聚气丹 +1", cond: { inv: { "灵石": 30 } }, result: "丹药入手温润，确认是正品。", effect: { inv: { "灵石": -30, "聚气丹": 1 } } },
        { text: "不买", sub: "捂紧口袋", result: "你转身走了。万一是真的呢？算了，不想了。" }
      ] },
    { id: "c_zhujidan", minAge: 15, type: "chance", cat: "ziyuan", layers: [8, 13], highlight: true,
      text: "拍卖会压轴：一枚筑基丹即将开拍，各路修士虎视眈眈。",
      auction: { item: "筑基丹", base: 90, winText: "筑基丹到手，筑基在望！", loseText: "价格被一路抬到离谱，你眼睁睁看它被别人拍走。", effect: { inv: { "筑基丹": 1 } } } },
    { id: "auc_faqi", minAge: 14, type: "chance", cat: "ziyuan", layers: [5, 12], cond: { artifactMax: { "法器": 1 } },
      text: "拍卖会：「法器·流云剑」开拍，剑光如水，引来一片抽气声。",
      auction: { item: "法器·流云剑", base: 60, winText: "法器入手，剑身轻鸣，用起来如臂使指。", loseText: "流云剑被一位蒙面修士高价拍走，只留下一声剑鸣。", effect: { artifact: { "法器": 1 } } } },
    { id: "auc_dihuo", minAge: 16, type: "chance", cat: "ziyuan", layers: [8, 13], cond: { notFlag: "地火莲" },
      text: "拍卖会出现一株「地火莲」——正是筑基所需的天材地宝之一！",
      auction: { item: "地火莲", base: 50, winText: "地火莲到手！天材地宝，如今已得其一。", loseText: "地火莲与你擦肩而过。不知道下次再见是何年。", effect: { flag: "地火莲" } } },
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
        ] },
        { text: "灵石不够，看看就走", result: "你把摊子上的原石挨个摸了一遍，摊主也不赶你。你拍拍手走了。" }
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
      text: "秘境深处，一株百年灵药就在眼前，一个叫沈七的修士也同时看到了它。",
      choices: [
        { text: "夺", sub: "手快有，手慢无", result: "你先下手为强！沈七撂下狠话跑了。灵药到手，仇家+1。", effect: { inv: { "灵石": 20 }, attrs: { "气运": -3 } } },
        { text: "让", sub: "多个朋友多条路", result: "你拱手相让。沈七愣了愣，分了你三成，还留了传讯玉符。", effect: { inv: { "灵石": 10 }, attrs: { "气运": 5 } } }
      ] },
    { id: "c_daolv", minAge: 22, type: "chance", cat: "renji", layers: [6, 12], chain: "daolv_1", cond: { notFlag: "道侣", notFlag2: "魔修" }, highlight: true,
      text: "相交多年的【道侣名】，在桃花树下问你：「可愿与我结为道侣？」",
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
      text: "黑袍人拦住你：「正道的功法四平八稳，十年磨一剑；魔宗的路子猛，三年就见效。急功近利是真，伤天害理倒也不必——魔宗有魔宗的规矩，头一条就是不害凡人。考虑吗？」",
      choices: [
        { text: "拜入魔宗", sub: "进境飞快 · 门规护着", result: "你接过那枚漆黑的玉简。守门的师兄咧嘴一笑：「往后自己人了。记住门规：快可以，滥杀可不行。」", effect: { flag: "魔修", flag2: "魔宗", attrs: { "灵根": 10, "气运": -5 } } },
        { text: "自修魔道", sub: "进境飞快 · 无人约束", result: "你要了功法，没要门规约束。从此世间少了个正道修士，多了个独来独往的魔修。", effect: { flag: "魔修", attrs: { "灵根": 10, "气运": -10 } } },
        { text: "严词拒绝", sub: "道心不可移", result: "「滚。」黑袍人笑了：「有几分骨气，只是可惜了。」你后背湿透，但道心更稳。", effect: { attrs: { "神识": 5 } } }
      ] },
    { id: "mo_join", minAge: 16, type: "chance", cat: "renji", layers: [6, 13], cond: { flag: "魔修", notFlag: "魔宗" }, highlight: true,
      text: "同门黑袍人上门，开口就拉你入宗：「急功近利是真，伤天害理倒也不必。魔宗头一条规矩，就是不害凡人。跟不跟？」",
      choices: [
        { text: "入宗", effect: { flag: "魔宗" }, result: "你点了头。从此宗门里多了一个你，你头上多了一面旗。" },
        { text: "独行", result: "你谢过好意，说自己一个人惯了。黑袍人也不强求。" }
      ] },
    { id: "mdr_1", type: "daily", cat: "ziyuan", layers: [6, 13], cond: { flag: "魔宗" },
      text: "魔宗的月例比正道厚三成。执事说得直白：「门派要的是你们快点强起来。强不起来，资源就归别人。」急功近利四个字，就写在门规第一条。",
      effect: { inv: { "灵石": 8 } } },
    { id: "mdr_2", type: "flavor", cat: "renji", layers: [6, 13], cond: { flag: "魔宗" },
      text: "同门抢资源抢得凶，但人人守一条底线：不害凡人，不出卖同门。坏了规矩的，刑堂办起来比正道还狠。" },
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
        { text: "去", sub: "来钱快 · 心魔账 +1", result: "灵石到手，但你听见了那家小姐的哭声。夜里你没睡好。", effect: { inv: { "灵石": 40 }, attrs: { "气运": -8 }, evil: 1 } },
        { text: "不去", sub: "魔修也有底线", result: "同门嗤笑你「假清高」，但你道心更稳了。", effect: { attrs: { "神识": 5 } } }
      ] },
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
        { text: "去看看", sub: "便宜有便宜的道理", cond: { inv: { "灵石": 15 } }, result: "你淘到一枚聚气丹，只要十五灵石。正品还是水货？吃了才知道。", effect: { inv: { "灵石": -15, "聚气丹": 1 }, attrs: { "气运": -2 } } },
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
        { text: "再逛逛", sub: "五十灵石数目不小", result: "你放下了剑。出门时回头看了一眼，它还在那里泛着光。" }
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
    { id: "sm_shiren", type: "miracle", cat: "xiulian", layers: [6, 13], highlight: true,
      cond: { flag: "散修", min: { "悟性": 55 }, notFlag: "恩师" },
      text: "深山采药那年，你在一座茅棚前讨水喝。坐着的瞎眼老妪头也不抬：「你这娃，丹田里乱得像锅粥。」她随手替你捋了三天，经脉竟顺畅了大半。你跪下磕头，她摆手：「眼瞎心不瞎，孩子，叫什么恩师。」",
      effect: { flag: "恩师", attrs: { "悟性": 5, "灵根": 3 } } },
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
    { id: "lq_moqi_chu", type: "daily", cat: "xinjing", layers: [7, 13], highlight: true,
      cond: { flag: "魔气侵体", notFlag: "魔气已除" },
      text: "魔气在经脉里盘踞多年。你以道心为炉、神识为火，一日一日地磨。三年后，最后一缕黑气化尽，丹田重归澄明。",
      effect: { attrs: { "神识": 6 }, daoXin: 1, flag: "魔气已除" } },
    { id: "mj_fake", type: "trib", cat: "jiyuan", layers: [5, 12], cond: { notFlag: "清醒", notFlag2: "魔修" },
      text: "「前辈洞府大开，见者有份！」消息传得有鼻子有眼，你跟着人潮赶去——却是个专坑散修的局。",
      choices: [
        { text: "交出灵石保命", sub: "破财免灾", result: "你交出十块灵石才被放行。这学费，交得钱包都疼。", effect: { inv: { "灵石": -10 } } },
        { text: "硬闯出去", sub: "战力 70+ 有胜算", cond: { combatMin: 70 }, result: "你掀翻了两个拦路的，随后扬长而去。坑散修？找错人了。", effect: { attrs: { "气运": 3 } } }
      ] },
    { id: "c_fu_intro", type: "daily", cat: "xiulian", layers: [3, 10], cooldown: 8, cond: { min: { "悟性": 45 } },
      text: "传功堂开了一堂符箓入门课。你画废了七张符纸，第八张终于亮起微光。", effect: { inv: { "符咒": 1 } } },
    { id: "c_fu_shop", type: "chance", cat: "ziyuan", layers: [4, 12],
      text: "符箓铺伙计追着你推销：「师弟，护身符十灵石一张，买二送一！」",
      choices: [
        { text: "买两张", sub: "灵石 -20，符咒 +3", cond: { inv: { "灵石": 20 } }, result: "三张符纸到手。伙计笑得见牙不见眼。", effect: { inv: { "灵石": -20, "符咒": 3 } } },
        { text: "不买", sub: "灵石要攒着", result: "你摆摆手走了。伙计也不恼，转头去拦下一个。" }
      ] },
    { id: "f_rain", type: "flavor", cat: "xinjing", layers: [1, 13], cooldown: 10, text: "山雨敲了整夜竹叶。你听着雨声打坐，心里很是安静。" },

    /* ===================== v3.1 主线伏笔（炼气埋线，筑基静默，金丹回收，见 15 文档） ===================== */
    { id: "fb_xuanyin", type: "flavor", cat: "renji", realms: [0], weight: 2,
      text: "茶棚歇脚，说书先生正讲古：百年前正道五宗联手围剿玄阴教，一战杀得黑水河泛红。先生一拍醒木：「这教门断不了根。」", effect: { flag: "闻玄阴" } },
    { id: "fb_guzhan", type: "flavor", cat: "renji", realms: [0], weight: 2,
      text: "行商歇脚时说起北边：黑风口那地方邪性，夜里能听见兵器响。老人都说，那是万年前的仗还没打完。", effect: { flag: "闻古战场" } },
    { id: "fb_yunmeng", type: "flavor", cat: "renji", realms: [0], weight: 2,
      text: "逃难的老汉讨水喝，说云梦泽的水里有长虫，吞过他家的渔船。你给了他两个馒头。", effect: { flag: "闻云梦" } },
    { id: "fb_pangzi", type: "flavor", cat: "renji", realms: [0], weight: 2,
      text: "坊市的王胖子卖你符纸，十张里有两张是潮的。他是筑基修士，摆摊卖符纸卖了大半辈子。他赌咒发誓说下次不会了，顺手多塞了一张。", effect: { inv: { "符咒": 1 }, flag: "识王胖子" } }
];
