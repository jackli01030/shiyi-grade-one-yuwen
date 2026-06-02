import type { CharacterItem } from "@/types/content";

type CharacterOptions = Partial<Omit<CharacterItem, "char" | "pinyin" | "words">>;

export function charItem(
  char: string,
  pinyin: string,
  words: string[] = [],
  options: CharacterOptions = {}
): CharacterItem {
  return {
    char,
    pinyin,
    words,
    radical: options.radical,
    structure: options.structure,
    isRecognition: options.isRecognition ?? true,
    isWriting: options.isWriting ?? false
  };
}

export const characterBank: CharacterItem[] = [
  charItem("天", "tian", ["天空", "天地"]),
  charItem("地", "di", ["大地", "土地"]),
  charItem("人", "ren", ["人民", "大人"]),
  charItem("你", "ni", ["你好", "你们"]),
  charItem("我", "wo", ["我们", "我的"]),
  charItem("他", "ta", ["他们", "他人"]),
  charItem("一", "yi", ["一个", "一二三"], { isWriting: true, structure: "独体" }),
  charItem("二", "er", ["二月", "二人"], { isWriting: true, structure: "独体" }),
  charItem("三", "san", ["三天", "三人"], { isWriting: true, structure: "独体" }),
  charItem("四", "si", ["四季", "四方"]),
  charItem("五", "wu", ["五月", "五个"]),
  charItem("上", "shang", ["上学", "上面"], { isWriting: true, structure: "独体" }),
  charItem("下", "xia", ["下面", "上下"]),
  charItem("口", "kou", ["口水", "开口"], { isWriting: true, structure: "独体" }),
  charItem("耳", "er", ["耳朵", "耳目"], { isWriting: true, structure: "独体" }),
  charItem("目", "mu", ["目光", "耳目"], { isWriting: true, structure: "独体" }),
  charItem("手", "shou", ["小手", "手足"], { isWriting: true, structure: "独体" }),
  charItem("足", "zu", ["手足", "足球"]),
  charItem("站", "zhan", ["站立"], { radical: "立", structure: "左右" }),
  charItem("坐", "zuo", ["坐下"], { structure: "上下" }),
  charItem("日", "ri", ["日月", "日子"], { isWriting: true, structure: "独体" }),
  charItem("月", "yue", ["月亮", "日月"]),
  charItem("水", "shui", ["水花", "清水"]),
  charItem("火", "huo", ["火苗", "水火"], { isWriting: true, structure: "独体" }),
  charItem("山", "shan", ["山川", "高山"]),
  charItem("川", "chuan", ["山川", "河川"]),
  charItem("田", "tian", ["田地", "田里"], { isWriting: true, structure: "独体" }),
  charItem("禾", "he", ["禾苗"], { isWriting: true, structure: "独体" }),
  charItem("春", "chun", ["春风", "春天"], { isWriting: true, structure: "上下" }),
  charItem("冬", "dong", ["冬雪", "冬天"], { isWriting: true, structure: "上下" }),
  charItem("吹", "chui", ["春风吹"], { isWriting: true, radical: "口", structure: "左右" }),
  charItem("花", "hua", ["红花", "花儿"], { isWriting: true, radical: "艹", structure: "上下" }),
  charItem("飞", "fei", ["飞鸟", "飞走"], { isWriting: true, structure: "独体" }),
  charItem("入", "ru", ["入水", "出入"], { isWriting: true, structure: "独体" }),
  charItem("霜", "shuang", ["秋霜"], { radical: "雨", structure: "上下" }),
  charItem("落", "luo", ["落下"], { radical: "艹", structure: "上下" }),
  charItem("降", "jiang", ["降落"], { radical: "阝", structure: "左右" }),
  charItem("飘", "piao", ["飘落"], { radical: "风", structure: "左右" }),
  charItem("游", "you", ["游鱼", "游水"], { radical: "氵", structure: "左右" }),
  charItem("池", "chi", ["池水"], { radical: "氵", structure: "左右" }),
  charItem("氏", "shi", ["姓氏"]),
  charItem("什", "shen", ["什么"], { isWriting: true, radical: "亻", structure: "左右" }),
  charItem("么", "me", ["什么"], { isWriting: true }),
  charItem("李", "li", ["李子"], { structure: "上下" }),
  charItem("张", "zhang", ["张开"], { radical: "弓", structure: "左右" }),
  charItem("弓", "gong", ["弓长张"]),
  charItem("古", "gu", ["古人"], { isWriting: true, structure: "上下" }),
  charItem("胡", "hu", ["胡子"], { isWriting: true, structure: "左右" }),
  charItem("吴", "wu", ["吴国"]),
  charItem("言", "yan", ["语言"], { isWriting: true }),
  charItem("孙", "sun", ["孙子"]),
  charItem("双", "shuang", ["双手"], { isWriting: true }),
  charItem("河", "he", ["小河"], { radical: "氵", structure: "左右" }),
  charItem("晴", "qing", ["晴天"], { isWriting: true, radical: "日", structure: "左右" }),
  charItem("眼", "yan", ["眼睛"], { radical: "目", structure: "左右" }),
  charItem("睛", "jing", ["眼睛"], { radical: "目", structure: "左右" }),
  charItem("保", "bao", ["保护"], { radical: "亻", structure: "左右" }),
  charItem("护", "hu", ["保护"], { radical: "扌", structure: "左右" }),
  charItem("苗", "miao", ["禾苗"], { isWriting: true, radical: "艹", structure: "上下" }),
  charItem("吃", "chi", ["吃饭"], { radical: "口", structure: "左右" }),
  charItem("事", "shi", ["事情"]),
  charItem("情", "qing", ["心情"], { radical: "忄", structure: "左右" }),
  charItem("请", "qing", ["请问"], { isWriting: true, radical: "讠", structure: "左右" }),
  charItem("让", "rang", ["让开"]),
  charItem("青", "qing", ["青草"], { isWriting: true, structure: "上下" }),
  charItem("清", "qing", ["清水"], { isWriting: true, radical: "氵", structure: "左右" }),
  charItem("生", "sheng", ["生字"], { isWriting: true }),
  charItem("钟", "zhong", ["一分钟"], { radical: "钅", structure: "左右" }),
  charItem("荷", "he", ["荷叶"], { radical: "艹", structure: "上下" }),
  charItem("圆", "yuan", ["圆圆"], { radical: "囗", structure: "全包围" }),
  charItem("咕", "gu", ["咕咚"], { radical: "口", structure: "左右" }),
  charItem("咚", "dong", ["咕咚"], { radical: "口", structure: "左右" })
];

export function findCharacter(char: string) {
  return characterBank.find((item) => item.char === char);
}
