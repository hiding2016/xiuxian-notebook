/* 修仙记事本 · 跨境界事件（自 data.js 拆分，引擎加载顺序在本文件之后合并） */
window.GAME_EVENTS_RX = [
    /* —— 变体衬底组 siji（四季静物）：同组共享冷却，每次必是未见文案，出完重置 —— */
    { id: "f2_siji", type: "flavor", cat: "xinjing", realms: [0, 1, 2, 3], group: "siji", cooldown: 8, text: "山中无历日。桃花开第三回的时候，你才想起又过了一年。" },
    { id: "f2_shanshui", type: "flavor", cat: "xinjing", realms: [0, 1, 2, 3], group: "siji", cooldown: 8, text: "你沿着溪涧走了半日，什么也没想。山里的水，比洞府里的清。" },
    /* —— 变体衬底组 fangshi（市井坊市） —— */
    { id: "f2_fangshi", type: "flavor", cat: "renji", realms: [0, 1], group: "fangshi", cooldown: 8, text: "坊市角落的王胖子还记得你，多饶了两张符纸。他是筑基修士，摆了三十年摊，看你从小修士逛到如今。" },
    { id: "f2_cha", type: "flavor", cat: "xinjing", realms: [0, 1, 2, 3], group: "siji", cooldown: 8, text: "新焙的灵茶，头一泡最苦。你慢慢喝完了三泡，像在喝这些年。" },
    { id: "f2_yu", type: "flavor", cat: "xinjing", realms: [0, 1, 2, 3], group: "siji", cooldown: 8, text: "夜雨敲檐。你索性不练了，披衣坐到天亮，听了一整夜的雨。" },
    { id: "f2_qi", type: "flavor", cat: "renji", realms: [0, 1, 2, 3], group: "siji", cooldown: 8, text: "看两个老修士在松下对弈，一局棋下了一个月。你问谁赢了，两人都说：急什么。" },
    { id: "f2_diaoyu", type: "flavor", cat: "xinjing", realms: [0, 1, 2, 3], group: "siji", cooldown: 8, text: "你在深潭边钓了一日鱼，一条没上钩。挺好，本来也没冲着鱼来。" },
    { id: "f2_shaishu", type: "flavor", cat: "xinjing", realms: [0, 1, 2, 3], group: "siji", cooldown: 8, text: "晴日晒书。功法玉简晒不得，你晒的是早年抄废的笔记，字里行间都是当年的笨功夫。" },
    { id: "f2_xueye", type: "flavor", cat: "xinjing", realms: [0, 1, 2, 3], group: "siji", cooldown: 8, text: "雪夜，炉上温着酒。你想起一些没来及告别的人，举杯敬了敬门外的大雪。" },
    { id: "f2_yun", type: "flavor", cat: "xinjing", realms: [0, 1, 2, 3], group: "siji", cooldown: 8, text: "躺在山坡上看云。云聚了又散，散了又聚，倒比修士自在。" },
    { id: "f_snow", type: "flavor", cat: "xinjing", layers: [1, 13], realms: [0, 1, 2, 3], group: "siji", cooldown: 8, text: "大雪封山，你在洞府煮茶看雪，难得几日清闲。" },
    { id: "f_market", type: "flavor", cat: "renji", layers: [1, 13], realms: [0, 1, 2, 3], group: "fangshi", cooldown: 8, text: "坊市今日格外热闹，说书人正讲着某位元婴老祖的传奇。" },
    { id: "fx_ji", type: "flavor", cat: "renji", realms: [0, 1, 2, 3], group: "fangshi", cooldown: 8, text: "赶集日，凡人摊贩沿着官道摆出三里地。你买了包炒栗子，边走边吃，听了一路讨价还价。" },
    { id: "fx_shu", type: "flavor", cat: "renji", realms: [0, 1, 2, 3], group: "fangshi", cooldown: 8, text: "茶楼里说书先生正讲前朝剑仙，惊堂木一拍，满堂喝彩声直掀屋顶。你要了壶粗茶，坐到散场才走。" },
    { id: "fx_tan", type: "flavor", cat: "renji", realms: [0, 1, 2, 3], group: "fangshi", cooldown: 8, text: "旧货摊上淘到半枚残缺的玉佩，摊主要价三枚灵石。你还到两枚，回来路上越看越寻常。" },
    { id: "f_recover", type: "daily", cat: "xinjing", layers: [1, 13], realms: [0, 1, 2, 3], cond: { flag: "走火入魔", min: { "神识": 55 } }, highlight: true, text: "你用了整整三年，一点点磨平走火入魔的暗伤。心魔，散了。", effect: { flag: "心魔已除" } },
    { id: "f_moyou", type: "daily", cat: "xiulian", layers: [1, 13], realms: [0, 1], cond: { flag: "魔修" }, cooldown: 5, text: "魔功进境飞快，但你发现自己的影子，颜色越来越深。" },
    { id: "f_hunt", type: "trib", cat: "zhandou", layers: [1, 13], realms: [0, 1], cond: { flag: "魔修" }, cooldown: 7, text: "除魔卫道的修士找上门，你且战且退，躲进深山三个月。", effect: { attrs: { "根骨": -4 } } }
];
