import { charItem } from "@/lib/content/characters";
import { createDefaultTasks } from "@/lib/exercises/templates";
import type { ContentCatalog, ExerciseTemplate, Lesson, LessonType, Unit, UnitType, Volume } from "@/types/content";

const volumes: Volume[] = [
  { id: "g1a", title: "一年级上册" },
  { id: "g1b", title: "一年级下册" }
];

type LessonInput = Omit<
  Lesson,
  "goals" | "recognitionChars" | "writingChars" | "pinyinItems" | "words" | "recite" | "exerciseTemplates"
> &
  Partial<Pick<Lesson, "goals" | "recognitionChars" | "writingChars" | "pinyinItems" | "words" | "recite" | "exerciseTemplates">>;

type CharacterSpec = readonly [char: string, pinyin: string];

const recognitionCharSpecsByLesson: Record<string, CharacterSpec[]> = {
  "g1a-u5-1-qiu-tian": [
    ["秋", "qiu"],
    ["气", "qi"],
    ["了", "le"],
    ["树", "shu"],
    ["叶", "ye"],
    ["黄", "huang"],
    ["片", "pian"],
    ["从", "cong"],
    ["来", "lai"],
    ["飞", "fei"]
  ],
  "g1a-u5-2-jiang-nan": [
    ["江", "jiang"],
    ["南", "nan"],
    ["可", "ke"],
    ["采", "cai"],
    ["莲", "lian"],
    ["戏", "xi"],
    ["间", "jian"],
    ["东", "dong"],
    ["北", "bei"]
  ],
  "g1a-u5-3-xue-di-li-de-xiao-hua-jia": [
    ["的", "de"],
    ["家", "jia"],
    ["鸡", "ji"],
    ["竹", "zhu"],
    ["牙", "ya"],
    ["用", "yong"],
    ["几", "ji"],
    ["步", "bu"],
    ["没", "mei"],
    ["参", "can"],
    ["加", "jia"]
  ],
  "g1a-u5-4-si-ji": [
    ["鸟", "niao"],
    ["说", "shuo"],
    ["是", "shi"],
    ["春", "chun"],
    ["青", "qing"],
    ["蛙", "wa"],
    ["夏", "xia"],
    ["着", "zhe"],
    ["皮", "pi"],
    ["地", "de"],
    ["就", "jiu"],
    ["冬", "dong"]
  ],
  "g1a-u5-yuwen-yuandi-wu": [
    ["男", "nan"],
    ["女", "nv"],
    ["关", "guan"],
    ["正", "zheng"],
    ["反", "fan"],
    ["先", "xian"],
    ["后", "hou"],
    ["内", "nei"],
    ["外", "wai"]
  ],
  "g1a-u6-5-dui-yun-ge": [
    ["对", "dui"],
    ["歌", "ge"],
    ["雨", "yu"],
    ["风", "feng"],
    ["虫", "chong"],
    ["清", "qing"],
    ["绿", "lv"],
    ["桃", "tao"],
    ["红", "hong"]
  ],
  "g1a-u6-6-ri-yue-ming": [
    ["力", "li"],
    ["尖", "jian"],
    ["尘", "chen"],
    ["众", "zhong"],
    ["双", "shuang"],
    ["林", "lin"],
    ["森", "sen"],
    ["不", "bu"],
    ["条", "tiao"],
    ["心", "xin"],
    ["金", "jin"]
  ],
  "g1a-u6-7-xiao-shu-bao": [
    ["包", "bao"],
    ["尺", "chi"],
    ["作", "zuo"],
    ["业", "ye"],
    ["笔", "bi"],
    ["刀", "dao"],
    ["宝", "bao"],
    ["贝", "bei"],
    ["少", "shao"],
    ["课", "ke"],
    ["早", "zao"]
  ],
  "g1a-u6-8-sheng-guo-qi": [
    ["升", "sheng"],
    ["国", "guo"],
    ["旗", "qi"],
    ["中", "zhong"],
    ["们", "men"],
    ["声", "sheng"],
    ["起", "qi"],
    ["多", "duo"],
    ["么", "me"],
    ["向", "xiang"],
    ["立", "li"]
  ],
  "g1a-u6-yuwen-yuandi-liu": [
    ["老", "lao"],
    ["师", "shi"],
    ["工", "gong"],
    ["厂", "chang"],
    ["医", "yi"],
    ["院", "yuan"],
    ["生", "sheng"],
    ["门", "men"],
    ["卫", "wei"]
  ],
  "g1a-u7-5-xiao-xiao-de-chuan": [
    ["船", "chuan"],
    ["弯", "wan"],
    ["儿", "er"],
    ["两", "liang"],
    ["头", "tou"],
    ["在", "zai"],
    ["里", "li"],
    ["看", "kan"],
    ["见", "jian"],
    ["闪", "shan"]
  ],
  "g1a-u7-6-ying-zi": [
    ["影", "ying"],
    ["前", "qian"],
    ["常", "chang"],
    ["黑", "hei"],
    ["狗", "gou"],
    ["左", "zuo"],
    ["右", "you"],
    ["它", "ta"],
    ["好", "hao"],
    ["朋", "peng"],
    ["友", "you"]
  ],
  "g1a-u7-7-liang-jian-bao": [
    ["件", "jian"],
    ["有", "you"],
    ["和", "he"],
    ["做", "zuo"],
    ["也", "ye"],
    ["办", "ban"],
    ["到", "dao"],
    ["又", "you"],
    ["才", "cai"],
    ["能", "neng"]
  ],
  "g1a-u7-yuwen-yuandi-qi": [
    ["爷", "ye"],
    ["奶", "nai"],
    ["叔", "shu"],
    ["姐", "jie"],
    ["妹", "mei"]
  ],
  "g1a-u8-8-bi-wei-ba": [
    ["比", "bi"],
    ["尾", "wei"],
    ["巴", "ba"],
    ["谁", "shui"],
    ["长", "chang"],
    ["短", "duan"],
    ["把", "ba"],
    ["伞", "san"],
    ["兔", "tu"],
    ["最", "zui"],
    ["公", "gong"]
  ],
  "g1a-u8-9-wu-ya-he-shui": [
    ["喝", "he"],
    ["只", "zhi"],
    ["处", "chu"],
    ["找", "zhao"],
    ["着", "zhao"],
    ["许", "xu"],
    ["石", "shi"],
    ["出", "chu"],
    ["法", "fa"],
    ["放", "fang"],
    ["进", "jin"],
    ["高", "gao"]
  ],
  "g1a-u8-10-yu-dian-er": [
    ["点", "dian"],
    ["数", "shu"],
    ["彩", "cai"],
    ["半", "ban"],
    ["空", "kong"],
    ["问", "wen"],
    ["回", "hui"],
    ["答", "da"],
    ["方", "fang"],
    ["久", "jiu"],
    ["更", "geng"],
    ["长", "zhang"]
  ],
  "g1a-u8-yuwen-yuandi-ba": [
    ["牛", "niu"],
    ["羊", "yang"],
    ["爪", "zhua"],
    ["旦", "dan"],
    ["拼", "pin"],
    ["音", "yin"]
  ],
  "g1b-u1-4-cai-zi-mi": [
    ["猜", "cai"],
    ["边", "bian"],
    ["凉", "liang"],
    ["喜", "xi"],
    ["欢", "huan"],
    ["时", "shi"],
    ["怕", "pa"],
    ["攻", "gong"],
    ["令", "ling"],
    ["感", "gan"],
    ["动", "dong"],
    ["万", "wan"],
    ["无", "wu"]
  ],
  "g1b-u1-yuwen-yuandi-yi": [
    ["识", "shi"],
    ["组", "zu"],
    ["计", "ji"],
    ["算", "suan"],
    ["减", "jian"],
    ["式", "shi"],
    ["图", "tu"],
    ["形", "xing"],
    ["卡", "ka"],
    ["合", "he"],
    ["唱", "chang"],
    ["团", "tuan"]
  ],
  "g1b-u2-1-re-ai-zhong-guo-gong-chan-dang": [
    ["热", "re"],
    ["爱", "ai"],
    ["共", "gong"],
    ["产", "chan"],
    ["党", "dang"],
    ["太", "tai"],
    ["阳", "yang"],
    ["光", "guang"],
    ["怀", "huai"],
    ["抱", "bao"],
    ["幸", "xing"],
    ["福", "fu"],
    ["成", "cheng"]
  ],
  "g1b-u2-2-chi-shui-bu-wang-wa-jing-ren": [
    ["井", "jing"],
    ["城", "cheng"],
    ["村", "cun"],
    ["毛", "mao"],
    ["主", "zhu"],
    ["席", "xi"],
    ["住", "zhu"],
    ["乡", "xiang"],
    ["亲", "qin"],
    ["战", "zhan"],
    ["士", "shi"],
    ["想", "xiang"],
    ["念", "nian"]
  ],
  "g1b-u2-3-wo-duo-xiang-qu-kan-kan": [
    ["告", "gao"],
    ["诉", "su"],
    ["走", "zou"],
    ["京", "jing"],
    ["座", "zuo"],
    ["安", "an"],
    ["广", "guang"],
    ["场", "chang"],
    ["非", "fei"],
    ["宽", "kuan"],
    ["丽", "li"],
    ["洁", "jie"]
  ],
  "g1b-u2-yuwen-yuandi-er": [
    ["认", "ren"],
    ["连", "lian"],
    ["选", "xuan"],
    ["圈", "quan"],
    ["涂", "tu"],
    ["填", "tian"],
    ["试", "shi"],
    ["练", "lian"]
  ],
  "g1b-u3-4-xiao-gong-ji-he-xiao-ya-zi": [
    ["玩", "wan"],
    ["得", "de"],
    ["急", "ji"],
    ["直", "zhi"],
    ["哭", "ku"],
    ["跟", "gen"],
    ["忽", "hu"],
    ["然", "ran"],
    ["听", "ting"],
    ["喊", "han"],
    ["快", "kuai"],
    ["己", "ji"],
    ["背", "bei"]
  ],
  "g1b-u3-5-shu-he-xi-que": [
    ["只", "zhi"],
    ["很", "hen"],
    ["孤", "gu"],
    ["单", "dan"],
    ["种", "zhong"],
    ["每", "mei"],
    ["都", "dou"],
    ["邻", "lin"],
    ["居", "ju"],
    ["叫", "jiao"],
    ["招", "zhao"],
    ["呼", "hu"],
    ["乐", "le"]
  ],
  "g1b-u3-6-zen-me-dou-kuai-le": [
    ["怎", "zen"],
    ["独", "du"],
    ["跳", "tiao"],
    ["绳", "sheng"],
    ["当", "dang"],
    ["还", "hai"],
    ["乐", "yue"],
    ["得", "dei"],
    ["羽", "yu"],
    ["球", "qiu"],
    ["劲", "jin"],
    ["轮", "lun"],
    ["排", "pai"]
  ],
  "g1b-u3-yuwen-yuandi-san": [
    ["母", "mu"],
    ["页", "ye"],
    ["止", "zhi"],
    ["斤", "jin"],
    ["寸", "cun"],
    ["丁", "ding"],
    ["千", "qian"],
    ["全", "quan"],
    ["元", "yuan"]
  ],
  "g1b-u4-7-jing-ye-si": [
    ["静", "jing"],
    ["思", "si"],
    ["床", "chuang"],
    ["疑", "yi"],
    ["举", "ju"],
    ["望", "wang"],
    ["低", "di"],
    ["故", "gu"]
  ],
  "g1b-u4-8-ye-se": [
    ["胆", "dan"],
    ["敢", "gan"],
    ["勇", "yong"],
    ["讲", "jiang"],
    ["窗", "chuang"],
    ["乱", "luan"],
    ["拉", "la"],
    ["样", "yang"],
    ["笑", "xiao"],
    ["再", "zai"],
    ["睡", "shui"],
    ["觉", "jiao"]
  ],
  "g1b-u4-9-duan-wu-zong": [
    ["端", "duan"],
    ["粽", "zong"],
    ["节", "jie"],
    ["总", "zong"],
    ["煮", "zhu"],
    ["盼", "pan"],
    ["米", "mi"],
    ["枣", "zao"],
    ["甜", "tian"],
    ["分", "fen"],
    ["鲜", "xian"],
    ["肉", "rou"],
    ["了", "liao"]
  ],
  "g1b-u4-yuwen-yuandi-si": [
    ["册", "ce"],
    ["支", "zhi"],
    ["台", "tai"],
    ["电", "dian"],
    ["视", "shi"],
    ["部", "bu"],
    ["机", "ji"],
    ["衣", "yi"],
    ["裤", "ku"],
    ["被", "bei"]
  ],
  "g1b-u5-5-dong-wu-er-ge": [
    ["物", "wu"],
    ["捉", "zhuo"],
    ["迷", "mi"],
    ["藏", "cang"],
    ["造", "zao"],
    ["蚂", "ma"],
    ["蚁", "yi"],
    ["运", "yun"],
    ["食", "shi"],
    ["粮", "liang"],
    ["房", "fang"],
    ["结", "jie"],
    ["网", "wang"]
  ],
  "g1b-u5-6-gu-dui-jin": [
    ["圆", "yuan"],
    ["严", "yan"],
    ["寒", "han"],
    ["酷", "ku"],
    ["暑", "shu"],
    ["暖", "nuan"],
    ["晨", "chen"],
    ["细", "xi"],
    ["朝", "zhao"],
    ["霞", "xia"],
    ["夕", "xi"],
    ["杨", "yang"],
    ["香", "xiang"]
  ],
  "g1b-u5-7-cao-chang-shang": [
    ["操", "cao"],
    ["拔", "ba"],
    ["拍", "pai"],
    ["跑", "pao"],
    ["踢", "ti"],
    ["铃", "ling"],
    ["真", "zhen"],
    ["闹", "nao"],
    ["丢", "diu"],
    ["沙", "sha"],
    ["身", "shen"],
    ["体", "ti"]
  ],
  "g1b-u5-8-ren-zhi-chu": [
    ["之", "zhi"],
    ["初", "chu"],
    ["相", "xiang"],
    ["近", "jin"],
    ["习", "xi"],
    ["远", "yuan"],
    ["教", "jiao"],
    ["道", "dao"],
    ["专", "zhuan"],
    ["幼", "you"],
    ["玉", "yu"],
    ["知", "zhi"],
    ["义", "yi"]
  ],
  "g1b-u5-yuwen-yuandi-wu": [
    ["饭", "fan"],
    ["饱", "bao"],
    ["茶", "cha"],
    ["泡", "pao"],
    ["轻", "qing"],
    ["穿", "chuan"],
    ["袍", "pao"],
    ["鞭", "bian"],
    ["炮", "pao"]
  ],
  "g1b-u6-10-gu-shi-er-shou": [
    ["诗", "shi"],
    ["首", "shou"],
    ["偷", "tou"],
    ["浮", "fu"],
    ["萍", "ping"],
    ["泉", "quan"],
    ["惜", "xi"],
    ["照", "zhao"],
    ["柔", "rou"],
    ["荷", "he"],
    ["露", "lu"],
    ["角", "jiao"]
  ],
  "g1b-u6-11-lang-hua": [
    ["浪", "lang"],
    ["迈", "mai"],
    ["悄", "qiao"],
    ["泪", "lei"],
    ["次", "ci"],
    ["给", "gei"],
    ["壳", "ke"],
    ["虾", "xia"],
    ["装", "zhuang"],
    ["像", "xiang"],
    ["淘", "tao"],
    ["娃", "wa"]
  ],
  "g1b-u6-12-he-ye-yuan-yuan": [
    ["珠", "zhu"],
    ["摇", "yao"],
    ["篮", "lan"],
    ["亮", "liang"],
    ["晶", "jing"],
    ["停", "ting"],
    ["坪", "ping"],
    ["展", "zhan"],
    ["透", "tou"],
    ["翅", "chi"],
    ["膀", "bang"],
    ["朵", "duo"]
  ],
  "g1b-u6-13-yao-xia-yu-le": [
    ["要", "yao"],
    ["腰", "yao"],
    ["阴", "yin"],
    ["沉", "chen"],
    ["呀", "ya"],
    ["忙", "mang"],
    ["呢", "ne"],
    ["吗", "ma"],
    ["面", "mian"],
    ["空", "kong"],
    ["闷", "men"],
    ["吧", "ba"],
    ["消", "xiao"],
    ["息", "xi"]
  ],
  "g1b-u6-yuwen-yuandi-liu": [
    ["棍", "gun"],
    ["豆", "dou"],
    ["汤", "tang"],
    ["蚊", "wen"],
    ["扇", "shan"],
    ["椅", "yi"],
    ["牵", "qian"],
    ["织", "zhi"],
    ["斗", "dou"]
  ],
  "g1b-u7-14-wen-ju-de-jia": [
    ["具", "ju"],
    ["铅", "qian"],
    ["新", "xin"],
    ["平", "ping"],
    ["盒", "he"],
    ["些", "xie"],
    ["此", "ci"],
    ["仔", "zi"],
    ["检", "jian"],
    ["查", "cha"],
    ["所", "suo"],
    ["伙", "huo"],
    ["伴", "ban"]
  ],
  "g1b-u7-15-yi-fen-zhong": [
    ["钟", "zhong"],
    ["迟", "chi"],
    ["背", "bei"],
    ["灯", "deng"],
    ["等", "deng"],
    ["啊", "a"],
    ["决", "jue"],
    ["定", "ding"],
    ["已", "yi"],
    ["经", "jing"],
    ["位", "wei"],
    ["表", "biao"]
  ],
  "g1b-u7-16-dong-wu-wang-guo-kai-da-hui": [
    ["虎", "hu"],
    ["熊", "xiong"],
    ["通", "tong"],
    ["注", "zhu"],
    ["意", "yi"],
    ["遍", "bian"],
    ["百", "bai"],
    ["为", "wei"],
    ["因", "yin"],
    ["舌", "she"],
    ["理", "li"],
    ["呀", "ya"],
    ["忘", "wang"],
    ["第", "di"]
  ],
  "g1b-u7-17-xiao-hou-zi-xia-shan": [
    ["猴", "hou"],
    ["块", "kuai"],
    ["结", "jie"],
    ["兴", "xing"],
    ["掰", "bai"],
    ["扛", "kang"],
    ["往", "wang"],
    ["棵", "ke"],
    ["满", "man"],
    ["扔", "reng"],
    ["摘", "zhai"],
    ["捧", "peng"],
    ["追", "zhui"]
  ],
  "g1b-u7-yuwen-yuandi-qi": [
    ["刷", "shua"],
    ["梳", "shu"],
    ["巾", "jin"],
    ["皂", "zao"],
    ["洗", "xi"],
    ["澡", "zao"],
    ["脸", "lian"],
    ["盆", "pen"]
  ],
  "g1b-u8-18-mian-hua-gu-niang": [
    ["棉", "mian"],
    ["姑", "gu"],
    ["娘", "niang"],
    ["病", "bing"],
    ["她", "ta"],
    ["治", "zhi"],
    ["燕", "yan"],
    ["帮", "bang"],
    ["害", "hai"],
    ["别", "bie"],
    ["干", "gan"],
    ["惊", "jing"],
    ["奇", "qi"]
  ],
  "g1b-u8-19-gu-dong": [
    ["咕", "gu"],
    ["咚", "dong"],
    ["熟", "shu"],
    ["掉", "diao"],
    ["湖", "hu"],
    ["吓", "xia"],
    ["啦", "la"],
    ["鹿", "lu"],
    ["象", "xiang"],
    ["野", "ye"],
    ["拦", "lan"],
    ["哪", "na"],
    ["那", "na"],
    ["领", "ling"]
  ],
  "g1b-u8-20-xiao-bi-hu-jie-wei-ba": [
    ["壁", "bi"],
    ["借", "jie"],
    ["咬", "yao"],
    ["难", "nan"],
    ["哪", "na"],
    ["爬", "pa"],
    ["您", "nin"],
    ["拨", "bo"],
    ["赶", "gan"],
    ["摆", "bai"],
    ["过", "guo"],
    ["孩", "hai"],
    ["转", "zhuan"]
  ],
  "g1b-u8-yuwen-yuandi-ba": [
    ["吵", "chao"],
    ["现", "xian"],
    ["顶", "ding"],
    ["胖", "pang"],
    ["票", "piao"],
    ["户", "hu"],
    ["交", "jiao"],
    ["父", "fu"]
  ]
};

const writingCharSpecsByLesson: Record<string, CharacterSpec[]> = {
  "g1a-u5-1-qiu-tian": [
    ["了", "le"],
    ["子", "zi"],
    ["大", "da"],
    ["人", "ren"]
  ],
  "g1a-u5-2-jiang-nan": [
    ["可", "ke"],
    ["叶", "ye"],
    ["东", "dong"],
    ["西", "xi"]
  ],
  "g1a-u5-3-xue-di-li-de-xiao-hua-jia": [
    ["竹", "zhu"],
    ["马", "ma"],
    ["牙", "ya"],
    ["用", "yong"],
    ["几", "ji"]
  ],
  "g1a-u5-4-si-ji": [
    ["四", "si"],
    ["小", "xiao"],
    ["鸟", "niao"],
    ["是", "shi"],
    ["天", "tian"]
  ],
  "g1a-u5-yuwen-yuandi-wu": [
    ["女", "nv"],
    ["开", "kai"],
    ["关", "guan"],
    ["先", "xian"]
  ],
  "g1a-u6-5-dui-yun-ge": [
    ["云", "yun"],
    ["雨", "yu"],
    ["虫", "chong"],
    ["山", "shan"],
    ["水", "shui"]
  ],
  "g1a-u6-6-ri-yue-ming": [
    ["力", "li"],
    ["男", "nan"],
    ["土", "tu"],
    ["木", "mu"],
    ["心", "xin"]
  ],
  "g1a-u6-7-xiao-shu-bao": [
    ["尺", "chi"],
    ["本", "ben"],
    ["刀", "dao"],
    ["不", "bu"],
    ["少", "shao"]
  ],
  "g1a-u6-8-sheng-guo-qi": [
    ["中", "zhong"],
    ["五", "wu"],
    ["风", "feng"],
    ["立", "li"],
    ["正", "zheng"]
  ],
  "g1a-u6-yuwen-yuandi-liu": [
    ["工", "gong"],
    ["厂", "chang"],
    ["门", "men"],
    ["卫", "wei"]
  ],
  "g1a-u7-5-xiao-xiao-de-chuan": [
    ["月", "yue"],
    ["儿", "er"],
    ["头", "tou"],
    ["里", "li"],
    ["见", "jian"]
  ],
  "g1a-u7-6-ying-zi": [
    ["在", "zai"],
    ["我", "wo"],
    ["左", "zuo"],
    ["右", "you"]
  ],
  "g1a-u7-7-liang-jian-bao": [
    ["和", "he"],
    ["也", "ye"],
    ["又", "you"],
    ["才", "cai"]
  ],
  "g1a-u7-yuwen-yuandi-qi": [
    ["爸", "ba"],
    ["妈", "ma"]
  ],
  "g1a-u8-8-bi-wei-ba": [
    ["比", "bi"],
    ["巴", "ba"],
    ["长", "chang"],
    ["公", "gong"]
  ],
  "g1a-u8-9-wu-ya-he-shui": [
    ["只", "zhi"],
    ["个", "ge"],
    ["多", "duo"],
    ["石", "shi"],
    ["出", "chu"]
  ],
  "g1a-u8-10-yu-dian-er": [
    ["来", "lai"],
    ["半", "ban"],
    ["你", "ni"],
    ["有", "you"]
  ],
  "g1a-u8-yuwen-yuandi-ba": [
    ["牛", "niu"],
    ["羊", "yang"],
    ["果", "guo"],
    ["白", "bai"]
  ],
  "g1b-u1-4-cai-zi-mi": [
    ["字", "zi"],
    ["红", "hong"],
    ["动", "dong"],
    ["万", "wan"],
    ["无", "wu"],
    ["明", "ming"]
  ],
  "g1b-u1-yuwen-yuandi-yi": [
    ["文", "wen"],
    ["卡", "ka"],
    ["片", "pian"],
    ["合", "he"]
  ],
  "g1b-u2-1-re-ai-zhong-guo-gong-chan-dang": [
    ["共", "gong"],
    ["产", "chan"],
    ["党", "dang"],
    ["太", "tai"],
    ["阳", "yang"],
    ["光", "guang"]
  ],
  "g1b-u2-2-chi-shui-bu-wang-wa-jing-ren": [
    ["井", "jing"],
    ["主", "zhu"],
    ["江", "jiang"],
    ["住", "zhu"],
    ["方", "fang"],
    ["后", "hou"]
  ],
  "g1b-u2-3-wo-duo-xiang-qu-kan-kan": [
    ["告", "gao"],
    ["的", "de"],
    ["会", "hui"],
    ["北", "bei"],
    ["京", "jing"],
    ["广", "guang"]
  ],
  "g1b-u2-yuwen-yuandi-er": [
    ["写", "xie"],
    ["认", "ren"]
  ],
  "g1b-u3-4-xiao-gong-ji-he-xiao-ya-zi": [
    ["走", "zou"],
    ["河", "he"],
    ["说", "shuo"],
    ["让", "rang"],
    ["自", "zi"],
    ["己", "ji"]
  ],
  "g1b-u3-5-shu-he-xi-que": [
    ["从", "cong"],
    ["好", "hao"],
    ["们", "men"],
    ["叫", "jiao"],
    ["他", "ta"],
    ["回", "hui"]
  ],
  "g1b-u3-6-zen-me-dou-kuai-le": [
    ["快", "kuai"],
    ["乐", "le"],
    ["当", "dang"],
    ["书", "shu"],
    ["画", "hua"],
    ["毛", "mao"]
  ],
  "g1b-u3-yuwen-yuandi-san": [
    ["止", "zhi"],
    ["斤", "jin"],
    ["寸", "cun"],
    ["丁", "ding"],
    ["千", "qian"],
    ["元", "yuan"]
  ],
  "g1b-u4-7-jing-ye-si": [
    ["思", "si"],
    ["床", "chuang"],
    ["前", "qian"],
    ["地", "di"],
    ["故", "gu"],
    ["乡", "xiang"]
  ],
  "g1b-u4-8-ye-se": [
    ["色", "se"],
    ["把", "ba"],
    ["讲", "jiang"],
    ["样", "yang"],
    ["笑", "xiao"],
    ["再", "zai"]
  ],
  "g1b-u4-9-duan-wu-zong": [
    ["节", "jie"],
    ["米", "mi"],
    ["间", "jian"],
    ["分", "fen"],
    ["吃", "chi"],
    ["肉", "rou"]
  ],
  "g1b-u4-yuwen-yuandi-si": [
    ["册", "ce"],
    ["支", "zhi"],
    ["电", "dian"],
    ["衣", "yi"]
  ],
  "g1b-u5-5-dong-wu-er-ge": [
    ["物", "wu"],
    ["造", "zao"],
    ["运", "yun"],
    ["欢", "huan"],
    ["房", "fang"],
    ["网", "wang"]
  ],
  "g1b-u5-6-gu-dui-jin": [
    ["对", "dui"],
    ["今", "jin"],
    ["雪", "xue"],
    ["细", "xi"],
    ["夕", "xi"],
    ["语", "yu"]
  ],
  "g1b-u5-7-cao-chang-shang": [
    ["打", "da"],
    ["皮", "pi"],
    ["跑", "pao"],
    ["足", "zu"],
    ["沙", "sha"],
    ["包", "bao"]
  ],
  "g1b-u5-8-ren-zhi-chu": [
    ["近", "jin"],
    ["习", "xi"],
    ["远", "yuan"],
    ["学", "xue"],
    ["玉", "yu"],
    ["义", "yi"]
  ],
  "g1b-u5-yuwen-yuandi-wu": [
    ["饱", "bao"],
    ["抱", "bao"]
  ],
  "g1b-u6-10-gu-shi-er-shou": [
    ["首", "shou"],
    ["池", "chi"],
    ["采", "cai"],
    ["尖", "jian"],
    ["角", "jiao"],
    ["早", "zao"]
  ],
  "g1b-u6-11-lang-hua": [
    ["玩", "wan"],
    ["眼", "yan"],
    ["泪", "lei"],
    ["它", "ta"],
    ["贝", "bei"],
    ["气", "qi"]
  ],
  "g1b-u6-12-he-ye-yuan-yuan": [
    ["机", "ji"],
    ["台", "tai"],
    ["唱", "chang"],
    ["伞", "san"],
    ["朵", "duo"],
    ["美", "mei"]
  ],
  "g1b-u6-13-yao-xia-yu-le": [
    ["这", "zhe"],
    ["看", "kan"],
    ["鱼", "yu"],
    ["面", "mian"],
    ["问", "wen"],
    ["加", "jia"]
  ],
  "g1b-u6-yuwen-yuandi-liu": [
    ["豆", "dou"],
    ["斗", "dou"]
  ],
  "g1b-u7-14-wen-ju-de-jia": [
    ["笔", "bi"],
    ["知", "zhi"],
    ["道", "dao"],
    ["放", "fang"],
    ["平", "ping"],
    ["安", "an"]
  ],
  "g1b-u7-15-yi-fen-zhong": [
    ["灯", "deng"],
    ["车", "che"],
    ["站", "zhan"],
    ["课", "ke"],
    ["坐", "zuo"],
    ["老", "lao"],
    ["师", "shi"]
  ],
  "g1b-u7-16-dong-wu-wang-guo-kai-da-hui": [
    ["国", "guo"],
    ["都", "dou"],
    ["百", "bai"],
    ["听", "ting"],
    ["时", "shi"],
    ["点", "dian"],
    ["林", "lin"]
  ],
  "g1b-u7-17-xiao-hou-zi-xia-shan": [
    ["高", "gao"],
    ["兴", "xing"],
    ["着", "zhe"],
    ["往", "wang"],
    ["瓜", "gua"],
    ["兔", "tu"],
    ["进", "jin"]
  ],
  "g1b-u7-yuwen-yuandi-qi": [
    ["巾", "jin"],
    ["洗", "xi"]
  ],
  "g1b-u8-18-mian-hua-gu-niang": [
    ["她", "ta"],
    ["空", "kong"],
    ["还", "hai"],
    ["干", "gan"],
    ["身", "shen"],
    ["星", "xing"],
    ["久", "jiu"]
  ],
  "g1b-u8-19-gu-dong": [
    ["吓", "xia"],
    ["为", "wei"],
    ["怕", "pa"],
    ["家", "jia"],
    ["象", "xiang"],
    ["没", "mei"],
    ["到", "dao"]
  ],
  "g1b-u8-20-xiao-bi-hu-jie-wei-ba": [
    ["向", "xiang"],
    ["边", "bian"],
    ["行", "xing"],
    ["草", "cao"],
    ["赶", "gan"],
    ["过", "guo"],
    ["找", "zhao"]
  ],
  "g1b-u8-yuwen-yuandi-ba": [
    ["页", "ye"],
    ["户", "hu"],
    ["交", "jiao"],
    ["父", "fu"]
  ]
};

function tableRecognitionCharsFor(lessonId: string) {
  const writingChars = new Set(writingCharSpecsByLesson[lessonId]?.map(([char]) => char) ?? []);
  return (recognitionCharSpecsByLesson[lessonId] ?? []).map(([char, pinyin]) =>
    charItem(char, pinyin, [], { isWriting: writingChars.has(char) })
  );
}

function tableWritingCharsFor(lessonId: string) {
  return (writingCharSpecsByLesson[lessonId] ?? []).map(([char, pinyin]) => charItem(char, pinyin, [], { isWriting: true }));
}

function goalsFor(type: LessonType, title: string) {
  if (type === "拼音") {
    return ["认读拼音", "试着拼读", "听家长读后再读"];
  }
  if (type === "识字") {
    return ["认一认生字", "说一说词语", "在田字格里写一写"];
  }
  if (type === "阅读" || type === "古诗") {
    return ["朗读课题和关键词", "说说读到了什么", "完成一个亲子确认"];
  }
  if (type === "口语交际") {
    return ["听清楚任务", "大方说一句话", "家长轻轻提醒"];
  }
  return [`认识“${title}”这一课`, "完成一个小任务"];
}

function makeLesson(input: LessonInput): Lesson {
  const tableRecognitionChars = tableRecognitionCharsFor(input.id);
  const tableWritingChars = tableWritingCharsFor(input.id);
  const base: Lesson = {
    goals: goalsFor(input.lessonType, input.title),
    recognitionChars: [],
    writingChars: [],
    pinyinItems: [],
    words: [],
    recite: false,
    exerciseTemplates: [],
    ...input
  };

  base.goals = input.goals ?? base.goals ?? goalsFor(input.lessonType, input.title);
  base.recognitionChars = input.recognitionChars ?? tableRecognitionChars ?? base.recognitionChars ?? [];
  base.writingChars = input.writingChars ?? tableWritingChars ?? base.writingChars ?? [];
  base.pinyinItems = input.pinyinItems ?? base.pinyinItems ?? [];
  base.words = input.words ?? base.words ?? [];
  base.recite = input.recite ?? base.recite ?? false;
  base.exerciseTemplates = input.exerciseTemplates ?? createDefaultTasks(base);
  return base;
}

function quickLesson(volumeId: "g1a" | "g1b", unitId: string, title: string, lessonType: LessonType, slug: string) {
  return makeLesson({
    id: `${unitId}-${slug}`,
    volumeId,
    unitId,
    title,
    lessonType
  });
}

const tdRen = makeLesson({
  id: "g1a-u1-1-tiandiren",
  volumeId: "g1a",
  unitId: "g1a-u1",
  title: "1 天地人",
  lessonType: "识字",
  goals: ["认识天、地、人", "会用你我他说一句话", "听家长读后点一点"],
  recognitionChars: [
    charItem("天", "tian", ["天空", "天地"]),
    charItem("地", "di", ["大地", "土地"]),
    charItem("人", "ren", ["人民", "大人"]),
    charItem("你", "ni", ["你好", "你们"]),
    charItem("我", "wo", ["我们", "我的"]),
    charItem("他", "ta", ["他们", "他人"])
  ],
  exerciseTemplates: [
    {
      id: "tdr-flashcard",
      type: "flashcard",
      title: "认字卡",
      prompt: "读一读卡片上的字。",
      options: ["天", "地", "人", "你", "我", "他"]
    },
    {
      id: "tdr-char-match",
      type: "char-match",
      title: "听后点字",
      prompt: "请家长读一个字，孩子点一张卡。",
      options: ["天", "地", "人", "你", "我", "他"]
    },
    {
      id: "tdr-you-me-him",
      type: "oral-roleplay",
      title: "说一说",
      prompt: "用“你、我、他”说一句短短的话。",
      hints: ["我在学习", "你来读一读", "他也会读"]
    }
  ]
});

const jmsh = makeLesson({
  id: "g1a-u1-2-jin-mu-shui-huo-tu",
  volumeId: "g1a",
  unitId: "g1a-u1",
  title: "2 金木水火土",
  lessonType: "识字",
  goals: ["认识数字字", "分清上和下", "练写一、二、三、上"],
  recognitionChars: ["一", "二", "三", "四", "五", "上", "下"].map((char) =>
    charItem(char, { 一: "yi", 二: "er", 三: "san", 四: "si", 五: "wu", 上: "shang", 下: "xia" }[char] ?? "")
  ),
  writingChars: [
    charItem("一", "yi", ["一个"], { isWriting: true }),
    charItem("二", "er", ["二月"], { isWriting: true }),
    charItem("三", "san", ["三天"], { isWriting: true }),
    charItem("上", "shang", ["上学"], { isWriting: true })
  ],
  recite: true,
  exerciseTemplates: [
    {
      id: "jmsh-number-cards",
      type: "flashcard",
      title: "数字字卡",
      prompt: "从一读到五。",
      options: ["一", "二", "三", "四", "五"]
    },
    {
      id: "jmsh-up-down",
      type: "drag-sort",
      title: "上下方向",
      prompt: "把“上”和“下”放到合适的位置。",
      options: ["上", "下"],
      answer: ["上", "下"]
    },
    {
      id: "jmsh-writing",
      type: "writing-grid",
      title: "田字格",
      prompt: "练写一、二、三、上。",
      options: ["一", "二", "三", "上"]
    },
    {
      id: "jmsh-recite",
      type: "recite-check",
      title: "背一背",
      prompt: "先看着读，再遮住一点试试。"
    }
  ]
});

const kemsz = makeLesson({
  id: "g1a-u1-3-kou-er-mu-shou-zu",
  volumeId: "g1a",
  unitId: "g1a-u1",
  title: "3 口耳目手足",
  lessonType: "识字",
  goals: ["认识身体部位字", "做一做站和坐", "练写口、耳、目、手"],
  recognitionChars: [
    charItem("口", "kou", ["小口"], { isWriting: true }),
    charItem("耳", "er", ["耳朵"], { isWriting: true }),
    charItem("目", "mu", ["目光"], { isWriting: true }),
    charItem("手", "shou", ["小手"], { isWriting: true }),
    charItem("足", "zu", ["手足"]),
    charItem("站", "zhan", ["站立"]),
    charItem("坐", "zuo", ["坐下"])
  ],
  writingChars: [
    charItem("口", "kou", ["开口"], { isWriting: true }),
    charItem("耳", "er", ["耳朵"], { isWriting: true }),
    charItem("目", "mu", ["目光"], { isWriting: true }),
    charItem("手", "shou", ["小手"], { isWriting: true })
  ],
  exerciseTemplates: [
    {
      id: "kemsz-body-match",
      type: "char-match",
      title: "身体部位",
      prompt: "看到字，指一指自己的身体。",
      options: ["口", "耳", "目", "手", "足"]
    },
    {
      id: "kemsz-action",
      type: "oral-roleplay",
      title: "动作说一说",
      prompt: "做一做“站”和“坐”，再说给家长听。"
    },
    {
      id: "kemsz-writing",
      type: "writing-grid",
      title: "写一写",
      prompt: "练写口、耳、目、手。",
      options: ["口", "耳", "目", "手"]
    }
  ]
});

const rySc = makeLesson({
  id: "g1a-u1-4-ri-yue-shan-chuan",
  volumeId: "g1a",
  unitId: "g1a-u1",
  title: "4 日月山川",
  lessonType: "识字",
  goals: ["认识自然物汉字", "看字想画面", "练写日、火、田、禾"],
  recognitionChars: [
    charItem("日", "ri", ["日月"], { isWriting: true }),
    charItem("月", "yue", ["月亮"]),
    charItem("水", "shui", ["清水"]),
    charItem("火", "huo", ["火苗"], { isWriting: true }),
    charItem("山", "shan", ["山川"]),
    charItem("川", "chuan", ["山川"]),
    charItem("田", "tian", ["田地"], { isWriting: true }),
    charItem("禾", "he", ["禾苗"], { isWriting: true })
  ],
  writingChars: [
    charItem("日", "ri", ["日月"], { isWriting: true }),
    charItem("火", "huo", ["火苗"], { isWriting: true }),
    charItem("田", "tian", ["田地"], { isWriting: true }),
    charItem("禾", "he", ["禾苗"], { isWriting: true })
  ],
  exerciseTemplates: [
    {
      id: "rysc-picture-match",
      type: "char-match",
      title: "象形字",
      prompt: "看字想一想像什么。",
      options: ["日", "月", "水", "火", "山", "川", "田", "禾"]
    },
    {
      id: "rysc-nature-sort",
      type: "compare",
      title: "自然物",
      prompt: "把天上、地上、水里的朋友说出来。",
      options: ["日", "月", "山", "川", "田", "禾"]
    },
    {
      id: "rysc-writing",
      type: "writing-grid",
      title: "写一写",
      prompt: "练写日、火、田、禾。",
      options: ["日", "火", "田", "禾"]
    }
  ]
});

function pinyinLesson(unitId: string, indexTitle: string, slug: string, items: string[]) {
  return makeLesson({
    id: `${unitId}-${slug}`,
    volumeId: "g1a",
    unitId,
    title: indexTitle,
    lessonType: "拼音",
    pinyinItems: items,
    exerciseTemplates: [
      {
        id: `${slug}-cards`,
        type: "flashcard",
        title: "拼音卡",
        prompt: "读一读拼音朋友。",
        options: items
      },
      {
        id: `${slug}-tone`,
        type: "compare",
        title: "声调认读",
        prompt: "听家长读，再读给家长听。",
        options: items.flatMap((item) => [`${item}1`, `${item}2`, `${item}3`, `${item}4`]).slice(0, 8)
      },
      {
        id: `${slug}-train`,
        type: "pinyin-match",
        title: "拼读小火车",
        prompt: "把拼音朋友接起来。",
        options: items
      }
    ]
  });
}

function readingLesson(
  volumeId: "g1a" | "g1b",
  unitId: string,
  title: string,
  slug: string,
  extra: Partial<Lesson> = {}
) {
  return makeLesson({
    id: `${unitId}-${slug}`,
    volumeId,
    unitId,
    title,
    lessonType: extra.lessonType ?? "阅读",
    words: extra.words ?? [],
    recognitionChars: extra.recognitionChars,
    writingChars: extra.writingChars,
    recite: extra.recite ?? false,
    goals: extra.goals,
    exerciseTemplates:
      extra.exerciseTemplates ??
      [
        {
          id: `${slug}-read`,
          type: "read-aloud",
          title: "朗读",
          prompt: "录下来听一听，录音只存在这台设备里。"
        },
        {
          id: `${slug}-words`,
          type: "flashcard",
          title: "词语认读",
          prompt: "读一读这些词。",
          options: extra.words?.slice(0, 6) ?? []
        },
        {
          id: `${slug}-say`,
          type: "oral-roleplay",
          title: "说一说",
          prompt: "说说你想到了什么画面。"
        }
      ]
  });
}

const spring = makeLesson({
  id: "g1b-u1-1-chun-xia-qiu-dong",
  volumeId: "g1b",
  unitId: "g1b-u1",
  title: "1 春夏秋冬",
  lessonType: "识字",
  goals: ["认读四季词语", "练写春、冬、吹、花、飞、入", "说说喜欢的季节"],
  recognitionChars: [
    charItem("霜", "shuang", ["秋霜"]),
    charItem("吹", "chui", ["春风吹"], { isWriting: true }),
    charItem("落", "luo", ["落下"]),
    charItem("降", "jiang", ["降落"]),
    charItem("飘", "piao", ["飘落"]),
    charItem("游", "you", ["游鱼"]),
    charItem("池", "chi", ["池水"]),
    charItem("入", "ru", ["入水"], { isWriting: true })
  ],
  writingChars: [
    charItem("春", "chun", ["春风"], { isWriting: true }),
    charItem("冬", "dong", ["冬雪"], { isWriting: true }),
    charItem("吹", "chui", ["吹风"], { isWriting: true }),
    charItem("花", "hua", ["红花"], { isWriting: true }),
    charItem("飞", "fei", ["飞鸟"], { isWriting: true }),
    charItem("入", "ru", ["入水"], { isWriting: true })
  ],
  words: ["春风", "夏雨", "秋霜", "冬雪", "青草", "红花", "游鱼", "飞鸟"],
  exerciseTemplates: [
    {
      id: "spring-season-match",
      type: "word-match",
      title: "四季配对",
      prompt: "把季节和词语连起来。",
      options: ["春风", "夏雨", "秋霜", "冬雪"]
    },
    {
      id: "spring-word-read",
      type: "flashcard",
      title: "词语朗读",
      prompt: "读一读四季词语。",
      options: ["春风", "夏雨", "秋霜", "冬雪", "青草", "红花", "游鱼", "飞鸟"]
    },
    {
      id: "spring-writing",
      type: "writing-grid",
      title: "写一写",
      prompt: "练写春、冬、吹、花、飞、入。",
      options: ["春", "冬", "吹", "花", "飞", "入"]
    }
  ]
});

const surname = makeLesson({
  id: "g1b-u1-2-xingshi-ge",
  volumeId: "g1b",
  unitId: "g1b-u1",
  title: "2 姓氏歌",
  lessonType: "识字",
  goals: ["认识常见姓氏", "用问答说姓氏", "拆字识姓"],
  recognitionChars: [
    charItem("氏", "shi", ["姓氏"]),
    charItem("什", "shen", ["什么"], { isWriting: true }),
    charItem("李", "li", ["李子"]),
    charItem("张", "zhang", ["张开"]),
    charItem("弓", "gong", ["弓长张"]),
    charItem("古", "gu", ["古人"], { isWriting: true }),
    charItem("胡", "hu", ["胡子"], { isWriting: true }),
    charItem("吴", "wu", ["吴国"]),
    charItem("言", "yan", ["语言"], { isWriting: true }),
    charItem("孙", "sun", ["孙子"])
  ],
  writingChars: [
    charItem("什", "shen", ["什么"], { isWriting: true }),
    charItem("么", "me", ["什么"], { isWriting: true }),
    charItem("古", "gu", ["古人"], { isWriting: true }),
    charItem("胡", "hu", ["胡子"], { isWriting: true }),
    charItem("双", "shuang", ["双手"], { isWriting: true }),
    charItem("言", "yan", ["语言"], { isWriting: true })
  ],
  exerciseTemplates: [
    {
      id: "surname-dialog",
      type: "oral-roleplay",
      title: "问答游戏",
      prompt: "你姓什么？什么张？弓长张。",
      hints: ["先问好", "声音自然", "听完再回答"]
    },
    {
      id: "surname-survey",
      type: "parent-child-read",
      title: "姓氏调查",
      prompt: "和家长找一找身边的姓氏。"
    },
    {
      id: "surname-split",
      type: "char-match",
      title: "拆字识姓",
      prompt: "看一看，两个字合起来是什么姓。",
      options: ["弓+长=张", "古+月=胡", "木+子=李"]
    }
  ]
});

const frog = makeLesson({
  id: "g1b-u1-3-xiao-qing-wa",
  volumeId: "g1b",
  unitId: "g1b-u1",
  title: "3 小青蛙",
  lessonType: "识字",
  goals: ["认识青字族", "分清清、晴、睛、情、请", "说说怎样保护小动物"],
  recognitionChars: [
    charItem("河", "he", ["小河"]),
    charItem("晴", "qing", ["晴天"], { isWriting: true }),
    charItem("眼", "yan", ["眼睛"]),
    charItem("睛", "jing", ["眼睛"]),
    charItem("保", "bao", ["保护"]),
    charItem("护", "hu", ["保护"]),
    charItem("苗", "miao", ["禾苗"], { isWriting: true }),
    charItem("吃", "chi", ["吃虫"]),
    charItem("事", "shi", ["事情"]),
    charItem("情", "qing", ["心情"]),
    charItem("请", "qing", ["请问"], { isWriting: true }),
    charItem("让", "rang", ["让开"])
  ],
  writingChars: [
    charItem("青", "qing", ["青草"], { isWriting: true }),
    charItem("清", "qing", ["清水"], { isWriting: true }),
    charItem("晴", "qing", ["晴天"], { isWriting: true }),
    charItem("苗", "miao", ["禾苗"], { isWriting: true }),
    charItem("请", "qing", ["请问"], { isWriting: true }),
    charItem("生", "sheng", ["生字"], { isWriting: true })
  ],
  words: ["眼睛", "晴天", "清水", "请问", "心情"],
  exerciseTemplates: [
    {
      id: "frog-qing-family",
      type: "compare",
      title: "青字族",
      prompt: "看一看，这些字哪里一样？哪里不一样？",
      options: ["青", "清", "晴", "睛", "情", "请"]
    },
    {
      id: "frog-fill",
      type: "fill-blank",
      title: "选一选",
      prompt: "给词语选合适的字：眼__、__天、__水、__问、心__。",
      options: ["青", "清", "晴", "睛", "情", "请"],
      answer: ["睛", "晴", "清", "请", "情"]
    },
    {
      id: "frog-protect",
      type: "oral-roleplay",
      title: "说一说",
      prompt: "我们怎样保护小青蛙？"
    }
  ]
});

const riddle = makeLesson({
  id: "g1b-u1-4-cai-zi-mi",
  volumeId: "g1b",
  unitId: "g1b-u1",
  title: "4 猜字谜",
  lessonType: "识字",
  goals: ["看偏旁猜字", "用加一加识字", "试着说一个谜语"],
  exerciseTemplates: [
    {
      id: "riddle-left-right",
      type: "char-match",
      title: "左右结构",
      prompt: "左右合起来，猜一猜。"
    },
    {
      id: "riddle-plus",
      type: "compare",
      title: "加一加",
      prompt: "一个部件加一个部件，可以变成新字。",
      options: ["日+青=晴", "氵+青=清", "讠+青=请"]
    },
    {
      id: "riddle-card",
      type: "fill-blank",
      title: "谜语卡",
      prompt: "一加一，猜一个字。",
      options: ["王", "二", "十"],
      answer: "王"
    }
  ]
});

const oneMinute = readingLesson("g1b", "g1b-u7", "15 一分钟", "15-yi-fen-zhong", {
  words: ["一分钟", "书包", "迟到"],
  exerciseTemplates: [
    {
      id: "minute-timer-write",
      type: "timer-task",
      title: "一分钟计时",
      prompt: "一分钟能写几个字？记录在本地。"
    },
    {
      id: "minute-steps",
      type: "timer-task",
      title: "走几步",
      prompt: "一分钟能走几步？请家长看着安全完成。"
    },
    {
      id: "minute-sentence",
      type: "sentence-expand",
      title: "说完整",
      prompt: "用“要是……”说一句完整的话。"
    }
  ]
});

const lotus = readingLesson("g1b", "g1b-u6", "12 荷叶圆圆", "12-he-ye-yuan-yuan", {
  words: ["小水珠", "小蜻蜓", "小青蛙", "小鱼儿", "摇篮", "停机坪", "歌台", "凉伞"],
  exerciseTemplates: [
    {
      id: "lotus-word-match",
      type: "word-match",
      title: "角色连线",
      prompt: "把朋友和它喜欢的地方连起来。",
      options: ["小水珠-摇篮", "小蜻蜓-停机坪", "小青蛙-歌台", "小鱼儿-凉伞"]
    },
    {
      id: "lotus-read",
      type: "read-aloud",
      title: "角色朗读",
      prompt: "选一个角色读一读，录音只存在这台设备里。"
    },
    {
      id: "lotus-expand",
      type: "sentence-expand",
      title: "照样子说",
      prompt: "苹果，____，____。"
    }
  ]
});

const rainComing = readingLesson("g1b", "g1b-u6", "13 要下雨了", "13-yao-xia-yu-le", {
  words: ["燕子", "小鱼", "蚂蚁", "下雨"],
  exerciseTemplates: [
    {
      id: "rain-animals",
      type: "word-match",
      title: "找动物",
      prompt: "燕子、小鱼、蚂蚁下雨前在做什么？",
      options: ["燕子-低飞", "小鱼-游到水面", "蚂蚁-搬家"]
    },
    {
      id: "rain-role-read",
      type: "read-aloud",
      title: "分角色读",
      prompt: "和家长一人读一个角色。"
    }
  ]
});

const gudong = readingLesson("g1b", "g1b-u8", "19 咕咚", "19-gu-dong", {
  words: ["咕咚", "兔子", "野牛", "大家"],
  exerciseTemplates: [
    {
      id: "gudong-why",
      type: "oral-roleplay",
      title: "想一想",
      prompt: "大家为什么跟着兔子跑？野牛是怎么做的？"
    },
    {
      id: "gudong-order",
      type: "drag-sort",
      title: "故事顺序",
      prompt: "按事情发生的顺序排一排。",
      options: ["听见咕咚", "大家跟着跑", "野牛问清楚", "一起去看"],
      answer: ["听见咕咚", "大家跟着跑", "野牛问清楚", "一起去看"]
    }
  ]
});

const garden8 = makeLesson({
  id: "g1b-u8-yuwen-yuandi-ba",
  volumeId: "g1b",
  unitId: "g1b-u8",
  title: "语文园地八",
  lessonType: "语文园地",
  goals: ["用加减法识字", "比较形近字", "每天只练一小组"],
  exerciseTemplates: [
    {
      id: "garden8-plus-minus",
      type: "compare",
      title: "加加减减",
      prompt: "看一看部件变成了什么字。",
      options: ["口+少=吵", "王+见=现", "丁+页=顶", "月+半=胖", "飘-风=票", "房-方=户", "校-木=交", "爸-巴=父"]
    },
    {
      id: "garden8-fill",
      type: "fill-blank",
      title: "比一比",
      prompt: "午牛、刀力、人入、玉主，读一读再选。",
      options: ["午", "牛", "刀", "力", "人", "入", "玉", "主"]
    }
  ]
});

const units: Unit[] = [
  {
    id: "g1a-start",
    volumeId: "g1a",
    index: 0,
    title: "入学单元 我上学了",
    type: "入学",
    lessons: [
      quickLesson("g1a", "g1a-start", "我是中国人", "入学", "wo-shi-zhong-guo-ren"),
      quickLesson("g1a", "g1a-start", "我爱我们的祖国", "入学", "wo-ai-zu-guo"),
      quickLesson("g1a", "g1a-start", "我是小学生", "入学", "wo-shi-xiao-xue-sheng"),
      quickLesson("g1a", "g1a-start", "我爱学语文", "入学", "wo-ai-xue-yuwen")
    ]
  },
  {
    id: "g1a-u1",
    volumeId: "g1a",
    index: 1,
    title: "第一单元 识字",
    type: "识字",
    lessons: [
      tdRen,
      jmsh,
      kemsz,
      rySc,
      quickLesson("g1a", "g1a-u1", "语文园地一", "语文园地", "yuwen-yuandi-yi"),
      quickLesson("g1a", "g1a-u1", "快乐读书吧：读书真快乐", "快乐读书吧", "kuaile-dushu-ba")
    ]
  },
  {
    id: "g1a-u2",
    volumeId: "g1a",
    index: 2,
    title: "第二单元 汉语拼音",
    type: "汉语拼音",
    lessons: [
      pinyinLesson("g1a-u2", "1 a o e", "1-a-o-e", ["a", "o", "e"]),
      pinyinLesson("g1a-u2", "2 i u ü", "2-i-u-v", ["i", "u", "ü"]),
      pinyinLesson("g1a-u2", "3 b p m f", "3-b-p-m-f", ["b", "p", "m", "f", "a", "o"]),
      pinyinLesson("g1a-u2", "4 d t n l", "4-d-t-n-l", ["d", "t", "n", "l", "a", "e"]),
      quickLesson("g1a", "g1a-u2", "语文园地二", "语文园地", "yuwen-yuandi-er")
    ]
  },
  {
    id: "g1a-u3",
    volumeId: "g1a",
    index: 3,
    title: "第三单元 汉语拼音",
    type: "汉语拼音",
    lessons: [
      pinyinLesson("g1a-u3", "5 g h", "5-g-h", ["g", "k", "h"]),
      pinyinLesson("g1a-u3", "6 j q x", "6-j-q-x", ["j", "q", "x", "ü"]),
      pinyinLesson("g1a-u3", "7 z c s", "7-z-c-s", ["z", "c", "s", "zi", "ci", "si"]),
      pinyinLesson("g1a-u3", "8 zh ch sh r", "8-zh-ch-sh-r", ["zh", "ch", "sh", "r"]),
      pinyinLesson("g1a-u3", "9 y w", "9-y-w", ["y", "w", "yi", "wu", "yu"]),
      quickLesson("g1a", "g1a-u3", "语文园地三", "语文园地", "yuwen-yuandi-san")
    ]
  },
  {
    id: "g1a-u4",
    volumeId: "g1a",
    index: 4,
    title: "第四单元 汉语拼音",
    type: "汉语拼音",
    lessons: [
      pinyinLesson("g1a-u4", "10 ai ei ui", "10-ai-ei-ui", ["ai", "ei", "ui"]),
      pinyinLesson("g1a-u4", "11 ao ou iu", "11-ao-ou-iu", ["ao", "ou", "iu"]),
      pinyinLesson("g1a-u4", "12 ie üe er", "12-ie-ve-er", ["ie", "üe", "er"]),
      pinyinLesson("g1a-u4", "13 an en in un ün", "13-an-en-in-un-vn", ["an", "en", "in", "un", "ün"]),
      pinyinLesson("g1a-u4", "14 ang eng ing ong", "14-ang-eng-ing-ong", ["ang", "eng", "ing", "ong"]),
      quickLesson("g1a", "g1a-u4", "语文园地四", "语文园地", "yuwen-yuandi-si")
    ]
  },
  {
    id: "g1a-u5",
    volumeId: "g1a",
    index: 5,
    title: "第五单元 阅读",
    type: "阅读",
    lessons: [
      readingLesson("g1a", "g1a-u5", "1 秋天", "1-qiu-tian", { words: ["秋天", "天气", "树叶"], recite: true }),
      readingLesson("g1a", "g1a-u5", "2 江南", "2-jiang-nan", { words: ["江南", "莲叶", "鱼儿"], recite: true }),
      readingLesson("g1a", "g1a-u5", "3 雪地里的小画家", "3-xue-di-li-de-xiao-hua-jia", {
        words: ["雪地", "小画家", "脚印"],
        exerciseTemplates: [
          { id: "snow-read", type: "read-aloud", title: "朗读", prompt: "读一读，录下来听一听。" },
          { id: "snow-role", type: "oral-roleplay", title: "角色朗读", prompt: "选一个小动物读一读。" },
          { id: "snow-imagine", type: "sentence-expand", title: "画面想象", prompt: "雪地里还会来谁？它会画什么？" }
        ]
      }),
      readingLesson("g1a", "g1a-u5", "4 四季", "4-si-ji", {
        words: ["春天", "夏天", "秋天", "冬天"],
        recite: true,
        exerciseTemplates: [
          { id: "season-read", type: "read-aloud", title: "朗读", prompt: "读一读四季。" },
          { id: "season-sort", type: "word-match", title: "季节分类", prompt: "把词语送到合适的季节。", options: ["春-花", "夏-荷", "秋-叶", "冬-雪"] },
          { id: "season-say", type: "oral-roleplay", title: "说一说", prompt: "你最喜欢哪个季节？" }
        ]
      }),
      quickLesson("g1a", "g1a-u5", "语文园地五", "语文园地", "yuwen-yuandi-wu")
    ]
  },
  {
    id: "g1a-u6",
    volumeId: "g1a",
    index: 6,
    title: "第六单元 识字",
    type: "识字",
    lessons: [
      quickLesson("g1a", "g1a-u6", "5 对韵歌", "识字", "5-dui-yun-ge"),
      quickLesson("g1a", "g1a-u6", "6 日月明", "识字", "6-ri-yue-ming"),
      quickLesson("g1a", "g1a-u6", "7 小书包", "识字", "7-xiao-shu-bao"),
      quickLesson("g1a", "g1a-u6", "8 升国旗", "识字", "8-sheng-guo-qi"),
      quickLesson("g1a", "g1a-u6", "语文园地六", "语文园地", "yuwen-yuandi-liu")
    ]
  },
  {
    id: "g1a-u7",
    volumeId: "g1a",
    index: 7,
    title: "第七单元 阅读",
    type: "阅读",
    lessons: [
      readingLesson("g1a", "g1a-u7", "5 小小的船", "5-xiao-xiao-de-chuan", { recite: true, words: ["小船", "月儿"] }),
      readingLesson("g1a", "g1a-u7", "6 影子", "6-ying-zi", { words: ["影子", "前后", "左右"] }),
      readingLesson("g1a", "g1a-u7", "7 两件宝", "7-liang-jian-bao", { words: ["双手", "大脑"] }),
      quickLesson("g1a", "g1a-u7", "语文园地七", "语文园地", "yuwen-yuandi-qi")
    ]
  },
  {
    id: "g1a-u8",
    volumeId: "g1a",
    index: 8,
    title: "第八单元 阅读",
    type: "阅读",
    lessons: [
      readingLesson("g1a", "g1a-u8", "8 比尾巴", "8-bi-wei-ba", {
        words: ["尾巴", "长短", "弯扁"],
        recognitionChars: [
          charItem("比", "bi", ["比一比"], { structure: "左右", isWriting: true }),
          charItem("尾", "wei", ["尾巴"], { radical: "尸", structure: "半包围" }),
          charItem("巴", "ba", ["尾巴"], { structure: "独体", isWriting: true }),
          charItem("谁", "shui", ["谁的"], { radical: "讠", structure: "左右" }),
          charItem("长", "chang", ["长短"], { structure: "独体", isWriting: true }),
          charItem("短", "duan", ["长短"], { radical: "矢", structure: "左右" }),
          charItem("把", "ba", ["一把伞"], { radical: "扌", structure: "左右", isWriting: true }),
          charItem("伞", "san", ["雨伞"], { radical: "人", structure: "上下" }),
          charItem("兔", "tu", ["兔子"], { structure: "上下" }),
          charItem("最", "zui", ["最好"], { radical: "曰", structure: "上下" }),
          charItem("公", "gong", ["公鸡"], { structure: "上下" })
        ],
        writingChars: [
          charItem("比", "bi", ["比一比"], { structure: "左右", isWriting: true }),
          charItem("巴", "ba", ["尾巴"], { structure: "独体", isWriting: true }),
          charItem("长", "chang", ["长短"], { structure: "独体", isWriting: true }),
          charItem("公", "gong", ["公鸡"], { structure: "上下", isWriting: true })
        ]
      }),
      readingLesson("g1a", "g1a-u8", "9 乌鸦喝水", "9-wu-ya-he-shui", {
        words: ["乌鸦", "喝水", "办法"],
        recognitionChars: [
          charItem("乌", "wu", ["乌鸦"], { structure: "独体" }),
          charItem("鸦", "ya", ["乌鸦"], { radical: "鸟", structure: "左右" }),
          charItem("喝", "he", ["喝水"], { radical: "口", structure: "左右" }),
          charItem("只", "zhi", ["一只"], { radical: "口", structure: "上下", isWriting: true }),
          charItem("渴", "ke", ["口渴"], { radical: "氵", structure: "左右" }),
          charItem("处", "chu", ["到处"], { structure: "半包围" }),
          charItem("找", "zhao", ["找到"], { radical: "扌", structure: "左右" }),
          charItem("着", "zhao", ["喝着"], { structure: "上下" }),
          charItem("办", "ban", ["办法"], { structure: "独体" }),
          charItem("旁", "pang", ["旁边"], { structure: "上中下" }),
          charItem("许", "xu", ["许多"], { radical: "讠", structure: "左右" }),
          charItem("法", "fa", ["办法"], { radical: "氵", structure: "左右" }),
          charItem("石", "shi", ["石子"], { radical: "石", structure: "半包围", isWriting: true }),
          charItem("放", "fang", ["放进"], { radical: "攵", structure: "左右" }),
          charItem("进", "jin", ["放进"], { radical: "辶", structure: "半包围" }),
          charItem("高", "gao", ["升高"], { structure: "上中下" })
        ],
        writingChars: [
          charItem("只", "zhi", ["一只"], { radical: "口", structure: "上下", isWriting: true }),
          charItem("个", "ge", ["一个"], { radical: "人", structure: "独体", isWriting: true }),
          charItem("多", "duo", ["许多"], { structure: "上下", isWriting: true }),
          charItem("石", "shi", ["石子"], { radical: "石", structure: "半包围", isWriting: true }),
          charItem("出", "chu", ["出来"], { structure: "独体", isWriting: true })
        ]
      }),
      readingLesson("g1a", "g1a-u8", "10 雨点儿", "10-yu-dian-er", {
        words: ["雨点儿", "花草"],
        recognitionChars: [
          charItem("点", "dian", ["雨点儿"], { radical: "灬", structure: "上下" }),
          charItem("数", "shu", ["数不清"], { radical: "攵", structure: "左右" }),
          charItem("彩", "cai", ["彩色"], { radical: "彡", structure: "左右" }),
          charItem("半", "ban", ["半空"], { structure: "独体" }),
          charItem("空", "kong", ["天空"], { radical: "穴", structure: "上下" }),
          charItem("问", "wen", ["问一问"], { radical: "门", structure: "半包围" }),
          charItem("回", "hui", ["回答"], { radical: "囗", structure: "全包围" }),
          charItem("答", "da", ["回答"], { radical: "竹", structure: "上下" }),
          charItem("到", "dao", ["到来"], { radical: "刂", structure: "左右" }),
          charItem("方", "fang", ["地方"], { structure: "独体" }),
          charItem("久", "jiu", ["不久"], { structure: "独体" }),
          charItem("没", "mei", ["没有"], { radical: "氵", structure: "左右" }),
          charItem("更", "geng", ["更多"], { structure: "独体" }),
          charItem("绿", "lv", ["绿色"], { radical: "纟", structure: "左右" }),
          charItem("出", "chu", ["出来"], { structure: "独体", isWriting: true }),
          charItem("长", "zhang", ["长大"], { structure: "独体", isWriting: true })
        ],
        writingChars: [
          charItem("来", "lai", ["回来"], { structure: "独体", isWriting: true }),
          charItem("半", "ban", ["一半"], { structure: "独体", isWriting: true }),
          charItem("你", "ni", ["你好"], { radical: "亻", structure: "左右", isWriting: true }),
          charItem("有", "you", ["有无"], { structure: "半包围", isWriting: true })
        ]
      }),
      quickLesson("g1a", "g1a-u8", "语文园地八", "语文园地", "yuwen-yuandi-ba")
    ]
  },
  {
    id: "g1b-u1",
    volumeId: "g1b",
    index: 1,
    title: "第一单元 识字",
    type: "识字",
    lessons: [
      spring,
      surname,
      frog,
      riddle,
      quickLesson("g1b", "g1b-u1", "语文园地一", "语文园地", "yuwen-yuandi-yi"),
      quickLesson("g1b", "g1b-u1", "快乐读书吧：读读童谣和儿歌", "快乐读书吧", "kuaile-dushu-ba")
    ]
  },
  {
    id: "g1b-u2",
    volumeId: "g1b",
    index: 2,
    title: "第二单元 阅读",
    type: "阅读",
    lessons: [
      readingLesson("g1b", "g1b-u2", "1 热爱中国共产党", "1-re-ai-zhong-guo-gong-chan-dang"),
      readingLesson("g1b", "g1b-u2", "2 吃水不忘挖井人", "2-chi-shui-bu-wang-wa-jing-ren", { words: ["吃水", "水井", "乡亲"] }),
      readingLesson("g1b", "g1b-u2", "3 我多想去看看", "3-wo-duo-xiang-qu-kan-kan", { words: ["看看", "北京", "天山"] }),
      quickLesson("g1b", "g1b-u2", "语文园地二", "语文园地", "yuwen-yuandi-er")
    ]
  },
  {
    id: "g1b-u3",
    volumeId: "g1b",
    index: 3,
    title: "第三单元 阅读",
    type: "阅读",
    lessons: [
      readingLesson("g1b", "g1b-u3", "4 小公鸡和小鸭子", "4-xiao-gong-ji-he-xiao-ya-zi"),
      readingLesson("g1b", "g1b-u3", "5 树和喜鹊", "5-shu-he-xi-que"),
      readingLesson("g1b", "g1b-u3", "6 怎么都快乐", "6-zen-me-dou-kuai-le"),
      quickLesson("g1b", "g1b-u3", "语文园地三", "语文园地", "yuwen-yuandi-san")
    ]
  },
  {
    id: "g1b-u4",
    volumeId: "g1b",
    index: 4,
    title: "第四单元 阅读",
    type: "阅读",
    lessons: [
      readingLesson("g1b", "g1b-u4", "7 静夜思", "7-jing-ye-si", { lessonType: "古诗", recite: true }),
      readingLesson("g1b", "g1b-u4", "8 夜色", "8-ye-se"),
      readingLesson("g1b", "g1b-u4", "9 端午粽", "9-duan-wu-zong"),
      quickLesson("g1b", "g1b-u4", "语文园地四", "语文园地", "yuwen-yuandi-si")
    ]
  },
  {
    id: "g1b-u5",
    volumeId: "g1b",
    index: 5,
    title: "第五单元 识字",
    type: "识字",
    lessons: [
      quickLesson("g1b", "g1b-u5", "5 动物儿歌", "识字", "5-dong-wu-er-ge"),
      quickLesson("g1b", "g1b-u5", "6 古对今", "识字", "6-gu-dui-jin"),
      quickLesson("g1b", "g1b-u5", "7 操场上", "识字", "7-cao-chang-shang"),
      quickLesson("g1b", "g1b-u5", "8 人之初", "识字", "8-ren-zhi-chu"),
      quickLesson("g1b", "g1b-u5", "语文园地五", "语文园地", "yuwen-yuandi-wu")
    ]
  },
  {
    id: "g1b-u6",
    volumeId: "g1b",
    index: 6,
    title: "第六单元 阅读",
    type: "阅读",
    lessons: [
      readingLesson("g1b", "g1b-u6", "10 古诗二首：池上、小池", "10-gu-shi-er-shou", { lessonType: "古诗", recite: true }),
      readingLesson("g1b", "g1b-u6", "11 浪花", "11-lang-hua", {
        words: ["浪花", "跑来"],
        exerciseTemplates: [
          { id: "wave-read", type: "read-aloud", title: "朗读", prompt: "读一读，录下来听一听。" },
          { id: "wave-expand", type: "sentence-expand", title: "扩句", prompt: "从“浪花跑来了”扩展成更生动的一句话。" }
        ]
      }),
      lotus,
      rainComing,
      quickLesson("g1b", "g1b-u6", "语文园地六", "语文园地", "yuwen-yuandi-liu")
    ]
  },
  {
    id: "g1b-u7",
    volumeId: "g1b",
    index: 7,
    title: "第七单元 阅读",
    type: "阅读",
    lessons: [
      readingLesson("g1b", "g1b-u7", "14 文具的家", "14-wen-ju-de-jia"),
      oneMinute,
      readingLesson("g1b", "g1b-u7", "16 动物王国开大会", "16-dong-wu-wang-guo-kai-da-hui"),
      readingLesson("g1b", "g1b-u7", "17 小猴子下山", "17-xiao-hou-zi-xia-shan"),
      quickLesson("g1b", "g1b-u7", "语文园地七", "语文园地", "yuwen-yuandi-qi")
    ]
  },
  {
    id: "g1b-u8",
    volumeId: "g1b",
    index: 8,
    title: "第八单元 阅读",
    type: "阅读",
    lessons: [
      readingLesson("g1b", "g1b-u8", "18 棉花姑娘", "18-mian-hua-gu-niang", {
        words: ["棉花", "姑娘", "医生", "七星瓢虫"],
        goals: ["朗读课题和关键词", "认识棉花姑娘请医生的故事", "完成一个亲子确认"]
      }),
      gudong,
      readingLesson("g1b", "g1b-u8", "20 小壁虎借尾巴", "20-xiao-bi-hu-jie-wei-ba", {
        words: ["小壁虎", "尾巴", "小鱼", "燕子"]
      }),
      garden8
    ]
  }
];

export const catalog: ContentCatalog = {
  volumes,
  units
};

export const allLessons = units.flatMap((unit) => unit.lessons);

export const allCharacters = allLessons.flatMap((lesson) => [
  ...lesson.recognitionChars,
  ...lesson.writingChars.filter((writingChar) => !lesson.recognitionChars.some((item) => item.char === writingChar.char))
]);

export function getUnitsByVolume(volumeId: "g1a" | "g1b") {
  return units.filter((unit) => unit.volumeId === volumeId);
}

export function getLessonById(lessonId: string) {
  return allLessons.find((lesson) => lesson.id === lessonId);
}

export function getFirstLessonId() {
  return "g1a-u1-1-tiandiren";
}

export function getNextLessonId(currentLessonId?: string) {
  if (!currentLessonId) {
    return getFirstLessonId();
  }

  const index = allLessons.findIndex((lesson) => lesson.id === currentLessonId);
  return allLessons[index + 1]?.id ?? getFirstLessonId();
}

export const catalogSourceNote =
  "内置内容仅包含课程目录、学习目标、生字和练习模板；完整课文可由家长本地导入，并只保存在浏览器。";

export function exerciseTemplatesForType(type: ExerciseTemplate["type"]) {
  return allLessons.flatMap((lesson) => lesson.exerciseTemplates).filter((template) => template.type === type);
}
