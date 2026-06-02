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
  base.recognitionChars = input.recognitionChars ?? base.recognitionChars ?? [];
  base.writingChars = input.writingChars ?? base.writingChars ?? [];
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
    recognitionChars: extra.recognitionChars ?? [],
    writingChars: extra.writingChars ?? [],
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
      readingLesson("g1a", "g1a-u8", "8 比尾巴", "8-bi-wei-ba", { words: ["尾巴", "长短", "弯扁"] }),
      readingLesson("g1a", "g1a-u8", "9 乌鸦喝水", "9-wu-ya-he-shui", { words: ["乌鸦", "喝水", "办法"] }),
      readingLesson("g1a", "g1a-u8", "10 雨点儿", "10-yu-dian-er", { words: ["雨点儿", "花草"] }),
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
      readingLesson("g1b", "g1b-u8", "18 棉花姑娘", "18-mian-hua-gu-niang"),
      gudong,
      readingLesson("g1b", "g1b-u8", "20 小壁虎借尾巴", "20-xiao-bi-hu-jie-wei-ba"),
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
