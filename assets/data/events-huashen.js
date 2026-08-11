/* 修仙记事本 · 化神期事件（v4 收尾：神君时代 + 飞升抉择，realms[4]，一次性无 cooldown） */
window.GAME_EVENTS_R4 = [
    /* —— 终局抉择：飞升 / 留人间（flag 飞升 → 结局分化） —— */
    { id: "you_11", type: "daily", cat: "renji", realms: [4], chain: "you_11", highlight: true,
      text: "你下山看【挚友】的后人。他也老得走不动了——元婴的寿元虽长，也熬到了末段。他认得你，咧嘴笑：「神仙也会老吗？」你们对坐到月落，他把藏了三十年的酒开了：那是祖辈立下的规矩，年年存一坛，等老朋友来喝。",
      effect: { daoXin: 1 } },
    { id: "hs_tianmen", type: "chance", cat: "xinjing", realms: [4], highlight: true, weight: 5,
      cond: { notFlag: "飞升" },
      text: "天门开了。一线金光垂落在你的飞升台上，万年不散的云层裂成两半。山下万灵伏首，都在等你的答案。",
      choices: [
        { text: "飞升", sub: "此界事了，直上九天", effect: { flag: "飞升" }, result: "你整了整衣冠，回头看了一眼这座山、这些人。然后一步跨进了金光里。" },
        { text: "再看一眼人间", sub: "道心 +2", effect: { daoXin: 2 }, result: "你把金光推了回去。山下的人看见天门合拢，先是死寂，然后爆发出哭喊——他们的神君，终究留下了。" }
      ] },
    /* —— 神君时代 —— */
    { id: "hs_chuanshuo", type: "flavor", cat: "renji", realms: [4],
      text: "你的故事成了凡间的戏文，已经唱了三个朝代。戏里的你白眉白须，骑着鹿——跟你本人，越来越不像了。" },
    { id: "hs_shengdi", type: "daily", cat: "renji", realms: [4],
      text: "你的山门成了圣地，上山朝拜的修士要排三年的队。你的规矩是一年只见一个，见的那个，出去能吹一辈子。" },
    { id: "hs_tusun", type: "daily", cat: "renji", realms: [4],
      text: "大弟子的徒孙也白了头，跪在你面前请益。你张口想叫他的名字，叫成了他爷爷的。老人怔了怔，眼圈一下子红了。",
      effect: { daoXin: 1 } },
    { id: "hs_taoshu", type: "daily", cat: "renji", realms: [4],
      cond: { flag: "道侣坐化" },
      text: "【道侣名】坟前那株你亲手种的桃，今年开得格外好。你在树下坐了一日，带来的那坛酒，一半洒在土里，一半自己喝了。" },
    { id: "hs_jiuguan", type: "flavor", cat: "renji", realms: [4],
      cond: { flag: "老苗" },
      text: "老苗的酒馆传到了第五代，掌柜的还给你留着雅座。没人记得为什么留——规矩就是规矩，传了五代了。" },
    { id: "hs_diguo2", type: "daily", cat: "renji", realms: [4],
      text: "山下的国度换了四个皇帝，国号改了两次，只有你的神庙香火没断过。新帝登基，头一件事是上山磕头。" },
    { id: "hs_beike", type: "daily", cat: "renji", realms: [4],
      text: "你闭关十年，山下已换了人间。徒弟把你平日的只言片语刻成碑，立在各宗的山门前——碑名叫「神君语录」，你自己看了都脸红。" },
    { id: "hs_yun2", type: "daily", cat: "xinjing", realms: [4],
      text: "你头顶的雷云三年不散，总是忽聚忽散。凡间的老人说：神山上有神仙要走了。孩子们仰头看了一代又一代。" },
    { id: "hs_shoushu2", type: "daily", cat: "xinjing", realms: [4],
      text: "你数了数，这一生你亲手送走了四十七个人。你记得他们每一个人的名字。",
      effect: { daoXin: 1 } },
    { id: "hs_wenxin3", type: "chance", cat: "renji", realms: [4],
      text: "徒孙问你：老祖，飞升是好是坏？",
      choices: [
        { text: "好", result: "你说：好。千年修行，求的就是这一天。孩子仰着头，眼里全是光。" },
        { text: "去了才知道", result: "你说：不知道，去了才知道。孩子似懂非懂。你摸摸他的头，没有再多说。" }
      ] },
    { id: "hs_yuce2", type: "daily", cat: "renji", realms: [4],
      text: "你把毕生所学、库藏、洞府、人脉，一样一样写进玉册，封了三份：山门一份，徒弟一份，还有一份，埋在了老槐树下。" },
    { id: "hs_feng", type: "flavor", cat: "xinjing", realms: [4],
      text: "飞升台的风一年大过一年。你站在风里，衣袂猎猎作响。这一生的故事，连风都知道结局了。" }
];
