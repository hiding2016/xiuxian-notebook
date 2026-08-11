/* 修仙记事本 · 筑基期事件（自 data.js 拆分，引擎加载顺序在本文件之后合并） */
window.GAME_EVENTS_R1 = [
    { id: "c_fengyin", type: "trib", cat: "zhandou", layers: [8, 13], cond: { flag: "筑基" }, highlight: true,
      text: "你修炼岔了经脉，真元逆行，再不决断就要伤及道基！",
      choices: [
        { text: "散功保命", sub: "跌落境界，留得青山", result: "你咬牙散去周身真元。境界跌落炼气，但道基保住了。", effect: { realmLoss: true } },
        { text: "硬撑过去", sub: "根骨高更稳", result: "你在生死线上走了一遭，撑住了！经脉反而拓宽了几分。", effect: { attrs: { "根骨": 8 } } }
      ] },
    { id: "zj_neimen", type: "daily", cat: "renji", layers: [1, 13], cond: { flag: "筑基", notFlag: "散修" }, cooldown: 5, text: "筑基之后，外门弟子见你都要躬身喊一声「师叔」。" },
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
    { id: "zj_auction", type: "chance", cat: "ziyuan", layers: [1, 13], cond: { flag: "筑基", inv: { "灵石": 30 } }, text: "拍卖会上你出手阔绰，拍下一件法器。在修士堆里，你总算有了几分气象。", effect: { inv: { "灵石": -30 }, artifact: { "法器": 1 } } },
    { id: "zj_fight", type: "daily", cat: "zhandou", layers: [1, 13], cond: { flag: "筑基", flag2: "剑修" }, cooldown: 5, text: "有同阶修士邀战，你一剑胜之。剑修之名，渐渐传了出去。", effect: { attrs: { "气运": 4 } } },
    { id: "zj_dan", type: "daily", cat: "ziyuan", layers: [1, 13], cond: { flag: "筑基", flag2: "丹道" }, cooldown: 5, text: "你炼出一炉筑基丹，丹成七转，丹香三日不散。", effect: { inv: { "筑基丹": 1 } } },
    { id: "zj_talk", type: "flavor", cat: "renji", layers: [1, 13], cond: { flag: "筑基" }, cooldown: 6, text: "你与几位筑基同阶坐而论道，谈及结丹大道，都摇头苦笑：难。" },
    { id: "zj_watch", type: "flavor", cat: "xinjing", layers: [1, 13], cond: { flag: "筑基" }, cooldown: 7, text: "你站在峰顶看云海翻腾。长生路远，但风景正好。" },
    { id: "zj_lingshi", type: "daily", cat: "ziyuan", layers: [1, 13], cond: { flag: "筑基" }, cooldown: 5, text: "你给门下弟子讲了一堂法，宗门发的补贴到账了。", effect: { inv: { "灵石": 10 } } },
    { id: "zj_linghu2", type: "miracle", cat: "jiyuan", layers: [1, 13], cond: { flag: "筑基", flag2: "灵兽" }, chain: "linghu_2", highlight: true, text: "灵狐忽然衔来一株发光的灵草放在你手心。小家伙，学会寻宝了。", effect: { inv: { "灵石": 28 } } },
    { id: "zb_dandu", type: "trib", cat: "xiulian", realms: [1], highlight: true,
      text: "连服凝元丹，丹毒在经脉里积成了暗斑。再这样下去，道基要受损。",
      choices: [
        { text: "停药清修", sub: "停服 5 年，之后耐药尽消", result: "你封存丹瓶，就此闭关清修。数年后，经脉里的暗斑尽数化去。", effect: { danStop: 5 } },
        { text: "硬扛续服", sub: "修炼 -3/年，根骨 -5，丹药只剩保底药效", result: "你把暗斑强行压下，继续服药不辍。经脉隐隐作痛，但你等不起。", effect: { flag: "丹毒硬扛", attrs: { "根骨": -5 } } }
      ] },
    { id: "mjw_dongfu", type: "daily", cat: "jiyuan", realms: [1], cooldown: 12, weight: 2.5,
      text: "坊市流言：城西三百里的山谷里，有猎户见过残破的古禁制，据说是一位古修士的坐化之地。", effect: { flag: "传闻_mj_dongfu" } },
    { id: "mj_dongfu_in", type: "chance", cat: "jiyuan", realms: [1], weight: 3, dungeon: "mj_dongfu",
      text: "你按图索骥找到那座山谷。残破禁制之后，一座古修士洞府静静蛰伏。" },
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
    { id: "zb_gongfa_xuan", type: "chance", cat: "xiulian", realms: [1], cond: { notFlag: "散修" },
    text: "藏经阁三层对你开放了。玄阶上品《凝元九转》，兑换要九十灵石加三年贡献。",
    choices: [
      { text: "换", sub: "灵石 -90", cond: { inv: { "灵石": 90 } }, result: "玉简入手温凉。守阁长老多看了你一眼：「这门功法，三十年没人换过了。」", effect: { inv: { "灵石": -90 }, gongfa: 1 } },
      { text: "先把口诀抄着", sub: "慢慢来", result: "你抄了三天口诀。没兑换，先记下，日后灵石够了再说。", effect: { attrs: { "悟性": 2 } } }
    ] },
    { id: "zb_gongfa_di", type: "chance", cat: "xiulian", realms: [1], cond: { gongfa: 1, min: { "悟性": 55 } },
    text: "参悟地阶功法残卷，一处关隘你卡了半年。这夜雷雨，你忽然通了——原来那页并未残缺，是倒着印的。", effect: { attrs: { "悟性": 5 } } },
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
      { text: "再想想", sub: "一百灵石数目不小", result: "你谢过阵法师。他临走撂下一句：「地脉不等人，道友要趁早。」" }
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
    { id: "choujia_4", type: "trib", cat: "zhandou", realms: [1], chain: "choujia_4",
    text: "当年秘境结怨的沈七，如今也筑基了。他登门递帖，只有八个字：恩怨未了，改日山下候教。",
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
    text: "听说沈七去了南疆，投奔了一家大宗——有人说，那宗门的路数带着几分魔气。年少时的那点恩怨，如今想来，像上辈子的事。" },
    { id: "home_3", type: "daily", cat: "renji", realms: [1], chain: "home_3", highlight: true,
    text: "筑基之后，你回了一趟家。娘的头发全白了，她想摸你的脸，手伸到半空又缩了回去，怕自己手粗。你留下一袋灵石，她说什么都不要，只问：山上的饭，还吃得惯吗？",
    effect: { daoXin: 1 } },
    { id: "daolv_4a", minAge: 22, type: "chance", cat: "renji", realms: [1], chain: "daolv_4", highlight: true,
    cond: { flag: "道侣", notFlag: "道侣坐化" },
    text: "【道侣名】筑基成功那日，霞光漫了满室。TA睁开眼第一句话是：「以后换我护着你。」贺礼堆了半桌。",
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
    { id: "shitu_2", type: "chance", cat: "renji", realms: [1], chain: "shitu_2", cond: { notFlag: "散修" },
    text: "那位长老把你叫到静室，推过来一只丹瓶：「这瓶凝元丹，拿去补补身子。结丹的事，也该早做打算了。」",
    choices: [
      { text: "收下丹药", sub: "凝元丹 +1", result: "你躬身收下。长老摆摆手：「好好练，别学你那些师叔，练到半路就躺平。」", effect: { inv: { "凝元丹": 1 } } },
      { text: "求结金丹的线索", sub: "丹比消息好打，消息难寻", result: "长老沉吟半晌，写了一张字条给你：何处有丹方风声，何处有老丹师隐居。字字值钱。", effect: { flag: "结金丹线索", attrs: { "悟性": 3 } } }
    ] },
    { id: "mm_1", type: "daily", cat: "zhandou", realms: [1], chain: "mm_1", cond: { flag: "魔宗" },
    text: "魔宗的规矩是能者上。你在比武场连挑七人，执事当场把你的名字报进了内门。输给你的师兄拍拍你：「打得好。改天请我喝酒。」" },
    { id: "mdr_3", type: "daily", cat: "renji", realms: [1], cond: { flag: "魔宗" },
    text: "魔宗长老催完你的进度，转头又把珍藏的魔晶塞给你：「快，但别断。断了根的苗，我见得多了。」" },
    { id: "mdr_4", type: "trib", cat: "xiulian", realms: [1], cond: { flag: "魔修" },
    text: "你经脉里积了暗伤——魔功进境快的代价。执事丢给你一瓶药：「门里管治。急功近利，也得有命享。」",
    effect: { attrs: { "根骨": -3, "神识": 2 } } },
    { id: "zd_1", type: "daily", cat: "xinjing", realms: [1], cond: { notFlag: "散修", notFlag2: "魔修" },
    text: "传功长老说：正道的路子慢，可每一步都踩得实。你回头看，确实一步都没歪过。",
    effect: { daoXin: 1 } },
    { id: "you_3", type: "daily", cat: "renji", realms: [1], chain: "you_3",
    text: "你筑基那日，来贺的人里【挚友】喊得最大声。他还在炼气，挤进来想拍你的肩膀，手举到一半先顿住了——满屋的人都在躬身，他才想起今时不同往日。他挠挠头，到底没改口：「你只管往前走，我随后就到。」" },
    { id: "you_4", type: "chance", cat: "renji", realms: [1], chain: "you_4",
    text: "你结丹药材缺一味赤芝，跑遍坊市没寻到。半个月后【挚友】找上门，把一个布包拍在你桌上——他跑了三个坊市，又搭进去半年积蓄。",
    choices: [
      { text: "双倍还他", sub: "灵石 -100", cond: { inv: { "灵石": 100 } }, effect: { inv: { "灵石": -100 }, renqing: 1 }, result: "他推了三次，第四次还是收了。他挠头笑：「跟你做兄弟，横竖亏不了——这话，满坊市也就我敢说了。」" },
      { text: "记下这份情", effect: { daoXin: 1 }, result: "你没提钱，他也没提钱。有些账，记一辈子比算清楚好。" },
      { text: "给他讲一夜修行", sub: "知无不言", result: "你把筑基的关窍掰开揉碎讲给他听。他听得入神，末了挠头：「你讲得比传功长老还透。」这话你受用了——他比你晚走了几步，可你愿意拉他。", effect: { attrs: { "悟性": 2 } } }
    ] },
    { id: "you_5", type: "daily", cat: "renji", realms: [1], chain: "you_5",
    text: "【挚友】筑基又败了。第二回败的时候，他反倒笑了：「修仙不成，我就修日子。」他下山开了间杂货铺，你下山送他，他塞给你一包炒栗子。" },
    { id: "zdl_2", type: "daily", cat: "renji", realms: [1], chain: "zdl_2",
    text: "你闭关闭到走火边缘，是【道侣名】撞开你的洞府，守了你七天七夜。你醒来时，TA靠着墙睡着了，手里还攥着燃了一半的凝神香。",
    effect: { daoXin: 1 } },
    { id: "shitu_2b", type: "flavor", cat: "renji", realms: [1], chain: "shitu_2", cond: { notFlag: "散修" },
    text: "传讯符来报：长老闭了死关，一封关也许就是数十年。你赶去时，静室的门已经落了锁，桌上还摆着一盏没喝完的茶。",
    effect: { attrs: { "神识": 3 } } },
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
    text: "徒弟下山那天，你站在山门口看TA的背影变成一个小点。当年你下山时，掌门也曾这样站着吗？" },
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
    { id: "sxd_1", type: "daily", cat: "renji", realms: [1], chain: "sxd_1", cond: { flag: "散修" },
    text: "你在坊市后巷盘下一间小院，挂起自己的木牌。散修无门无派，但总得有个落脚处。",
    effect: { flag: "据点" } },
    { id: "sxd_2", type: "daily", cat: "ziyuan", realms: [1], chain: "sxd_2", cond: { flag: "散修", flag2: "据点" },
    text: "跑熟了南北两条商路，哪家的灵米便宜、哪家的符咒靠谱，你都门儿清。低买高卖，图个细水长流。",
    effect: { flag: "商路", inv: { "灵石": 40 } } },
    { id: "sxd_2b", type: "daily", cat: "ziyuan", realms: [1], chain: "sxd_2", cooldown: 6, cond: { flag: "散修", flag2: "商路" },
    text: "商路上的老主顾又来光顾，顺手给你带了外地的行情。这一季，进项还算不错。",
    effect: { inv: { "灵石": 35 } } },
    { id: "sxd_3", type: "chance", cat: "renji", realms: [1], chain: "sxd_3", cond: { flag: "散修" },
    text: "十几位相熟的散修在你院里歃血为盟，约好互通有无、守望相助。散修抱团，也算是半个门派了。",
    effect: { attrs: { "气运": 4 }, inv: { "灵石": 30 } } },
    { id: "mjw_jinqu", type: "daily", cat: "jiyuan", realms: [1], cooldown: 12, weight: 2.5,
    text: "北境行商带回消息：极寒冰窟深处有异光，疑是结丹灵物「玄冰魄」出世。去的人不少，回来的不多。",
    effect: { flag: "传闻_mj_jinqu" } },
    { id: "mjw_gu", type: "daily", cat: "jiyuan", realms: [1], cooldown: 12, weight: 2.5,
    text: "丹师圈子里在传：西荒熔岩谷底有「炎髓晶」，地火千年孕一物。好几个筑基后期已经动身了。",
    effect: { flag: "传闻_mj_gu" } },
    { id: "mjw_haifu", type: "daily", cat: "jiyuan", realms: [1], cooldown: 12, weight: 2.5,
    text: "海客醉话：东海雷暴之下沉着一座古府，府中生有「雷灵枝」，每逢雷劫便发亮。醒了他又不认。",
    effect: { flag: "传闻_mj_haifu" } },
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
    { id: "xmy_1", type: "flavor", cat: "xinjing", realms: [1], chain: "xmy_1", cond: { notFlag: "心魔已除" },
    text: "近来打坐时总莫名心悸。昨夜你梦见自己结丹失败，惊醒时一身冷汗。距离结丹越近，心就越不静。" },
    { id: "xmy_2", type: "trib", cat: "xinjing", realms: [1], chain: "xmy_2", cond: { notFlag: "心魔已除" },
    text: "心悸越来越重，运功时识海里隐约有杂音，像很多人在你耳边说话。这是心魔将起的兆头。",
    choices: [
      { text: "闭关静养", sub: "先把心稳住",
        result: "你封关半月，抄经打坐，总算把那点杂音压了下去。但你知道，它只是躲起来了。", effect: { attrs: { "神识": 3 } } },
      { text: "服凝元丹镇压", sub: "凝元丹 -1，见效快", cond: { inv: { "凝元丹": 1 } },
        result: "丹药入腹，一股清凉直冲天灵，杂音尽数退散。借丹压心，终非长久之计。", effect: { inv: { "凝元丹": -1 }, attrs: { "神识": 5 } } },
      { text: "不当回事", sub: "区区心悸",
        result: "你没理会。几天后的夜里，识海轰然一响，你眼前发黑，扶着墙才没倒下。", effect: { attrs: { "气运": -2, "神识": -2 } } }
    ] },
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
    { id: "zb_zhaiqing", type: "daily", cat: "renji", realms: [1],
      cond: { flag: "债清" },
      text: "钱庄掌柜听说你筑基有成，亲自登门道贺，还带了一坛灵酒。他逢人便夸你讲信用，说那笔账还得干干净净。他说：道友往后要用银子，钱庄随你支取，利钱一文不收。" }
];
