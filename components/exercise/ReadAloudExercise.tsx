"use client";

import { useRef, useState } from "react";
import { Mic, Play, Square } from "lucide-react";
import { BigButton } from "@/components/ui/BigButton";
import { ExerciseFrame } from "@/components/exercise/ExerciseFrame";
import type { ExerciseProps } from "@/components/exercise/types";
import { recordReading } from "@/lib/progress/store";

export function ReadAloudExercise({ lesson, template, onResult }: ExerciseProps) {
  const recorderRef = useRef<MediaRecorder | null>(null);
  const startedAtRef = useRef<number>(0);
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string>();
  const [notice, setNotice] = useState("录音只存在这台设备里。");
  const [stars, setStars] = useState(0);

  async function start() {
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setNotice("可以请爸爸妈妈听你读。");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const chunks: BlobPart[] = [];
      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (event) => chunks.push(event.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach((track) => track.stop());
      };
      recorderRef.current = recorder;
      startedAtRef.current = Date.now();
      recorder.start();
      setRecording(true);
      setNotice("正在录，读完就点停止。");
    } catch {
      setNotice("没有麦克风权限也没关系，可以请爸爸妈妈听你读。");
    }
  }

  function stop() {
    recorderRef.current?.stop();
    setRecording(false);
    setStars(1);
  }

  function confirm() {
    const seconds = Math.max(1, Math.round((Date.now() - startedAtRef.current) / 1000));
    recordReading({
      lessonId: lesson.id,
      exerciseId: template.id,
      durationSeconds: seconds,
      confirmedByParent: true
    });
    setStars(3);
    onResult("parentChecked", 3);
  }

  return (
    <ExerciseFrame title={template.title} prompt={template.prompt} stars={stars}>
      <div className="grid gap-4 rounded-lg bg-paper p-4 md:grid-cols-[1fr_1fr]">
        <div>
          <p className="text-lg font-black">读一读</p>
          <p className="mt-2 text-base font-bold leading-relaxed text-ink/70">{notice}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {!recording ? (
              <BigButton onClick={start} icon={Mic} ariaLabel="开始录音">
                开始录音
              </BigButton>
            ) : (
              <BigButton onClick={stop} icon={Square} variant="berry" ariaLabel="停止录音">
                停止
              </BigButton>
            )}
            <BigButton onClick={confirm} variant="sun" ariaLabel="家长确认">
              家长确认
            </BigButton>
          </div>
        </div>
        <div className="rounded-lg bg-white p-4">
          <p className="mb-3 text-base font-black">回放</p>
          {audioUrl ? (
            <audio controls src={audioUrl} className="w-full">
              <track kind="captions" />
            </audio>
          ) : (
            <div className="flex min-h-24 items-center gap-3 rounded-lg bg-leaf-50 p-4 font-bold text-leaf-700">
              <Play className="h-6 w-6" aria-hidden="true" />
              录好后可以听一听
            </div>
          )}
        </div>
      </div>
    </ExerciseFrame>
  );
}
