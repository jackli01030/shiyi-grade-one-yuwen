import type { ExerciseTemplate } from "@/types/content";

export interface OralScene {
  id: string;
  title: string;
  childTask: string;
  parentChecklist: string[];
  hints: string[];
}

export const oralScenes: OralScene[] = [
  {
    id: "i-say-you-do",
    title: "我说你做",
    childTask: "把一个动作说清楚，请家长照着做。",
    parentChecklist: ["是否说清楚了", "是否等别人做完", "是否能再说一遍"],
    hints: ["请你把手举起来", "请你向左转", "谢谢你"]
  },
  {
    id: "right-voice",
    title: "用多大的声音说话",
    childTask: "在家里、课堂、操场分别试一试合适的声音。",
    parentChecklist: ["是否能听见", "是否没有喊叫", "是否能根据场合调整"],
    hints: ["小声说", "自然说", "大声但不喊"]
  },
  {
    id: "please-help",
    title: "请你帮个忙",
    childTask: "请家长帮你拿一本书，要说清楚、说礼貌。",
    parentChecklist: ["是否说了请", "是否说清楚要帮什么", "是否说了谢谢"],
    hints: ["请", "请问", "您好", "谢谢", "不客气"]
  },
  {
    id: "phone-call",
    title: "打电话",
    childTask: "练习接电话和打电话，先问好，再说自己是谁。",
    parentChecklist: ["是否主动问好", "是否说清自己是谁", "是否说清要找谁"],
    hints: ["您好", "我是十一", "请问爸爸在吗", "再见"]
  },
  {
    id: "find-a-way",
    title: "我会想办法",
    childTask: "遇到找不到文具的情况，说出一个好办法。",
    parentChecklist: ["是否说出问题", "是否说出办法", "是否愿意尝试"],
    hints: ["我先找书包", "我可以问同学", "我把文具放回家"]
  }
];

export function oralSceneToTemplate(scene: OralScene): ExerciseTemplate {
  return {
    id: scene.id,
    type: "oral-roleplay",
    title: scene.title,
    prompt: scene.childTask,
    hints: scene.parentChecklist
  };
}
