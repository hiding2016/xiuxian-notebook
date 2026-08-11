/* 修仙记事本 · 元婴期事件（自 data.js 拆分，引擎加载顺序在本文件之后合并） */
window.GAME_EVENTS_R3 = [
    { id: "yy_mj_wenxin", type: "chance", cat: "jiyuan", realms: [3], weight: 3, cond: { inv: { "灵石": 150 } }, dungeon: "mj_wenxin",
      text: "那位云游老道又坐在你山门前讨水喝。喝完他说：西去三千里有一条问心路，走进去的人，出来时都会变一个样。领路费，一百五十灵石。" },

    /* ===================== v4 主线：问神之路 ws_ 八环（化神寻访，末端接化神突破） ===================== */
    { id: "ws_1", type: "chance", cat: "jiyuan", realms: [3], weight: 3, chain: "ws_1",
      cond: { cultMin: 100, cultMax: 1500 },
      text: "师门最古老的玉简里夹着半页残纸：「化神者，神与气合，与天合一」——后半页没了。你问遍阁中长老，没人见过下半页。",
      choices: [
        { text: "查", sub: "这条线，你要追到底", effect: { flag: "问神" }, result: "你把残纸收进贴身的玉盒。化神两个字，从此不止是传说。" },
        { text: "罢了", result: "残纸归回原处。化神太远，日子也还长，何必自扰呢。" }
      ] },
    { id: "ws_2", type: "daily", cat: "jiyuan", realms: [3], chain: "ws_2",
      text: "你去了那座石灯长明的山。最深的石室里，石壁上密密麻麻刻满了字——那哪儿是讲道，分明是一封留给后来人的信，末尾只有一行：「化神之法，不在丹，不在器，在一个『舍』字。」",
      effect: { daoXin: 1, attrs: { "神识": 3 } } },
    { id: "ws_3", type: "daily", cat: "renji", realms: [3], chain: "ws_3",
      cond: { cultMin: 1500 },
      text: "一位云游老道在你山门前讨水喝。你看不穿他的修为——元婴之后，这世上你看不穿的人，一只手数得过来。他临走说：「镇魔碑下那位，当年也想化神。」",
      effect: { attrs: { "神识": 2 } } },
    { id: "ws_4", type: "daily", cat: "renji", realms: [3], chain: "ws_4",
      cond: { cultMin: 1800 },
      text: "你问遍天下元婴：可知化神？北疆老祖说要打上去，隐居的老怪物说要等天门，还有人说，化神之人，早就忘了自己是谁。三种答案，你都没全信。",
      effect: { attrs: { "悟性": 3 } } },
    { id: "ws_5", type: "daily", cat: "renji", realms: [3], chain: "ws_5", highlight: true,
      cond: { cultMin: 2500 },
      text: "云游老道又来讨水喝，这次他坐了一整天。临走他指着天说：「天门三百年一开。下一回，离现在不远了。」你抬头看天，看了很久很久。",
      effect: { daoXin: 1 } },
    { id: "ws_6", type: "daily", cat: "xinjing", realms: [3], chain: "ws_6",
      cond: { cultMin: 3200, notFlag: "魔修" },
      text: "你去了黑风岭。不管那碑下压着的是谁，不管那碑还在不在，你都站了一夜。天亮时你懂了老道那句话：化神之难，难在要和这一生，好好做个了断。",
      effect: { daoXin: 1, attrs: { "神识": 2 } } },
    { id: "ws_7", type: "chance", cat: "xinjing", realms: [3], chain: "ws_7",
      cond: { cultMin: 3200 },
      text: "你闭门三日，问自己三个问题：舍不舍得这座山？舍不舍得这些人？舍不舍得这千载？",
      choices: [
        { text: "舍", sub: "道心 +2", effect: { daoXin: 2 }, result: "三个「舍」字说出口，你只觉元婴一轻。原来化神这门，钥匙一直在你自己身上。" },
        { text: "舍不得", sub: "神识 +2", effect: { attrs: { "神识": 2 } }, result: "你说：舍不得。那就带着走。门外传来弟子扫雪的声音，你忽然觉得很安心。" }
      ] },
    { id: "ws_8", type: "daily", cat: "xiulian", realms: [3], chain: "ws_8", highlight: true,
      text: "雷云散去的清晨，你睁开眼，只觉元婴与天地同息。化神之门，就在你眼前开了。",
      effect: { daoXin: 1, attrs: { "神识": 3 } } },

    /* ===================== v4 元婴三段仪式卡（loop.js 修为跨 1500/3200 压 queue 触发） ===================== */
    { id: "yy_stage2", milestone: -1, type: "chance", cat: "renji", realms: [3], highlight: true,
      cond: { cultMin: 1500, notFlag: "已登元中" },
      text: "元婴中期。你闭关的这座山，如今被山下人唤作「神山」。各宗掌教相约而来，不为别事——往后这方天地的规矩，他们想听听你的意思。",
      choices: [
        { text: "定下规矩", sub: "声望 +2 · 道心 +1", effect: { flag: "已登元中", factionDelta: { rep: 2 }, daoXin: 1 }, result: "你说了三条：不欺凡人、不夺小宗、不犯彼此山门。掌教们躬身领命——从今往后，这就是天条。" },
        { text: "不理俗务", sub: "神识 +3", effect: { flag: "已登元中", attrs: { "神识": 3 } }, result: "你只回了四个字：清静就好。掌教们面面相觑，随后齐齐躬身：谨遵老祖法旨。" }
      ] },
    { id: "yy_stage3", milestone: -1, type: "chance", cat: "renji", realms: [3], highlight: true,
      cond: { cultMin: 3200, notFlag: "已登元后" },
      text: "元婴后期。你开始频繁地做一个梦：九天之上有门，门后有人唤你的名字。醒来时，洞府外无风自动——化神这两个字，很快就要成真了。",
      choices: [
        { text: "着手筹备", sub: "道心 +1 · 神识 +2", effect: { flag: "已登元后", daoXin: 1, attrs: { "神识": 2 } }, result: "你翻开师门最古老的玉简，从第一页看起。飞升二字，几百年来没人走到过，你打算走到头。" },
        { text: "顺其自然", sub: "气运 +3", effect: { flag: "已登元后", attrs: { "气运": 3 } }, result: "梦来了就做梦，风来了就听风。你不急——千年都走过来了，不差这几年。" }
      ] },

    /* ===================== v3 元婴身份（13 文档：老祖的分量） ===================== */
    { id: "yy_sf_diwang", type: "flavor", cat: "renji", realms: [3], cooldown: 2,
      text: "山下国度的皇帝遣使上山，捧着你随手题过字的残页，说要奉为镇国之宝。使者在你洞府外跪了三天，你最终没有见。" },
    { id: "yy_sf_chouren", type: "chance", cat: "renji", realms: [3], chain: "choujia_7",
      text: "沈七结婴失败，在前不久坐化了。他的孙儿上山来，在雪地里跪了七日，只求把祖父的剑送还你。那孩子说，爷爷临终念叨：那位道兄，到底比我强。",
      choices: [
        { text: "扶他起来", sub: "恩怨到此为止", result: "你扶起那孩子，把那柄剑收下了。这一辈子的恩怨，到此就算两清。" },
        { text: "不见", sub: "缘法如此", result: "你没有见他。第八日雪停了，那柄剑挂在了山门的松树上。" }
      ] },
    { id: "yy_sf_biguan", type: "flavor", cat: "xiulian", realms: [3], cooldown: 3,
      text: "你闭关十年，外界传言纷纷：有人说你坐化了，有仇家开始蠢蠢欲动，也有故旧年年在你洞府外放一坛酒。出关那日，山门外跪满了人。" },
    { id: "yy_sf_guxiang", type: "chance", cat: "renji", realms: [3], chain: "home_5", minAge: 80, highlight: true,
      text: "你回了一趟出生的村子。县令带着全县老小出城三十里相迎，一路锣鼓喧天。人群里有个拄拐的老叟盯着你看了很久，问：可是当年村东头那个娃？他是你儿时的玩伴。",
      choices: [
        { text: "认他", sub: "叙一叙旧", result: "你陪他坐了一下午，说了些小时候的事。临走时你留下一瓶丹药，他捧着丹瓶，手一直在抖。" },
        { text: "不认", sub: "仙凡两隔", result: "你摇摇头走开了。老叟望着你的背影，嘴边念叨着什么，最终只是叹了口气。" }
      ] },

    /* ===================== v3.2 元婴留白与回响（17 文档 §四.F + 骨架评估 C/E） ===================== */
    { id: "yy_sf_guren", type: "flavor", cat: "renji", realms: [3], cooldown: 3,
      text: "你点算交游录，发现一整页的名字，旁都注了「坐化」二字。你把册子合上，在窗外坐到月落。" },
    { id: "yy_sf_shouzhong", type: "flavor", cat: "xinjing", realms: [3], cooldown: 4, minAge: 120,
      text: "千载寿元，听起来很长。你静坐时却想：不过是把一句「舍不得」说了许多年。山中日月长，长得像一口井。" },
    { id: "yy_sf_jiuji", type: "flavor", cat: "renji", realms: [3], cooldown: 4,
      text: "你在山门外酿酒。凡人酒浊，你却也喝得惯了。拜山的辈分是你曾把过背的孩子的孩子的孩子，他们唤你「老祖」，像是叫一座山。", effect: { attrs: { "神识": 1 } } },
    { id: "yy_daoxin_cb", type: "daily", cat: "xinjing", realms: [3],
      cond: { daoXinMin: 5 },
      text: "道心稳固之后，心魔再不来扰。你入定三年，把化神的关窍在心里过了百遍。元婴到化神，隔着一层说不清的东西，你这一口气咽得住，天门开了也敢叩。",
      effect: { attrs: { "神识": 2 } } },
    { id: "yy_sf_huijiang", type: "chance", cat: "renji", realms: [3], chain: "home_6", highlight: true,
      text: "你父亲留下的那把木梳还在储物戒里，已朽了大半。你回到那座早没人识得你的山，把梳子埋在了老槐树下。",
      choices: [
        { text: "井边坐一夜", sub: "听凡间的虫鸣", result: "山下的灯火一家家灭，又一家家亮。原来长生，是看着万家灯火灭了又亮。" },
        { text: "埋完便走", result: "你没多留。仙凡两隔这四个字，你说了很多年，今夜才真的听懂。" }
      ] },
    { id: "yy_mx_echo", type: "chance", cat: "zhandou", realms: [3],
      cond: { flag: "灭总坛", notFlag: "余孽事了" },
      text: "山下修士来报：玄阴教余孽聚了一伙人，推了个新教主，说要继赫连绝的遗志。你问新教主叫什么，答曰：沈七的徒弟。",
      choices: [
        { text: "下山走一趟", sub: "了断余波", effect: { flag: "余孽事了", daoXin: 1 }, result: "你下山走了一趟。余孽作鸟兽散，那面玄阴旗，从此再没人敢竖起来。" },
        { text: "与我何干", effect: { flag: "余孽事了" }, result: "你摆摆手。跪了一山门的晚辈面面相觑——老祖眼里，这已经不叫事了。" }
      ] },
    { id: "yy_mdj_echo", type: "daily", cat: "renji", realms: [3],
      cond: { flag: "魔道巨擘", cultMin: 1500 },
      text: "镇魔碑破开那日，碑下那位重见天日，玄阴教上下跪了一地。他许你副教主之位，你笑着应了。百年下来，那位祖师长年闭关参悟天机，魔道各殿的供奉、各路的孝敬，都先过你的手——这一半天，早就是你说了算。" },
    { id: "yy_yx_echo", type: "chance", cat: "renji", realms: [3],
      cond: { flag: "斩大妖", notFlag: "小妖事了" },
      text: "云梦泽新出了一头小妖。王胖子的孙子念恩——你斩妖那年他还没出生，如今也修成了金丹——上山来问：要不要趁早除了它。",
      choices: [
        { text: "亲手了结", effect: { flag: "小妖事了", factionDelta: { rep: 1 } }, result: "你去了一趟云梦泽，小妖当场授首。回程的路上，你想起王胖子当年的那袋积蓄。" },
        { text: "让他自己去", effect: { flag: "小妖事了", daoXin: 1 }, result: "你说：当年你爷爷的债，是别人替他讨的；你的债，要你自己来讨。年轻人咬着牙下了山。" }
      ] },
    { id: "tud_yy", type: "flavor", cat: "renji", realms: [3], highlight: true,
      cond: { flag: "开府" },
      text: "你元婴大成那日，山下来了个年轻人拜山，说是你的徒孙——你座下大弟子的徒弟。那眉眼，像极了当年那个笨手笨脚引气入体的小徒弟。",
      effect: { daoXin: 1 } }
];
