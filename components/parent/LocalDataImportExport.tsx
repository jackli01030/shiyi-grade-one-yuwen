"use client";

import { useRef, useState } from "react";
import { Download, RotateCcw, Upload } from "lucide-react";
import { BigButton } from "@/components/ui/BigButton";
import { KidCard } from "@/components/ui/KidCard";
import { exportProgressAsync, importProgressAsync, resetProgressAsync } from "@/lib/progress/store";

export function LocalDataImportExport({ onChanged }: { onChanged?: () => void }) {
  const [text, setText] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);

  async function download() {
    const json = await exportProgressAsync();
    setText(json);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `xiaohe-yuwen-progress-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  async function handleFile(file?: File) {
    if (!file) return;
    const json = await file.text();
    await importProgressAsync(json);
    setText(json);
    onChanged?.();
  }

  async function importText() {
    if (!text.trim()) return;
    await importProgressAsync(text);
    onChanged?.();
  }

  return (
    <KidCard accent="sky">
      <h2 className="text-xl font-black">本地数据</h2>
      <p className="mt-2 text-base font-bold leading-relaxed text-ink/70">
        学习记录只保存在这个浏览器。可以导出 JSON，也可以从 JSON 恢复。
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <BigButton onClick={download} icon={Download} ariaLabel="导出进度">
          导出
        </BigButton>
        <BigButton onClick={() => fileInput.current?.click()} icon={Upload} variant="sky" ariaLabel="选择进度文件">
          选择文件
        </BigButton>
        <BigButton
          onClick={() => {
            void resetProgressAsync().then(() => {
              setText("");
              onChanged?.();
            });
          }}
          icon={RotateCcw}
          variant="sun"
          ariaLabel="重置本地数据"
        >
          重置
        </BigButton>
      </div>
      <input
        ref={fileInput}
        type="file"
        accept="application/json"
        className="hidden"
        onChange={(event) => handleFile(event.target.files?.[0])}
      />
      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        className="mt-4 min-h-36 w-full rounded-lg border border-leaf-100 p-3 text-sm"
        placeholder="也可以把 JSON 粘贴在这里"
      />
      <BigButton onClick={importText} className="mt-3" variant="white" ariaLabel="导入文本进度">
        导入文本
      </BigButton>
    </KidCard>
  );
}
