// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { lessons } from "@/data/courseData";
import { defaultProgress } from "@/lib/storage";
import { ReadingPanel } from "./Home";

afterEach(cleanup);

describe("ReadingPanel", () => {
  it("hiển thị ba câu hỏi theo đoạn và lưu kết quả từng câu khi chấm", () => {
    const recordExercise = vi.fn();
    const completeSection = vi.fn();
    const lesson = lessons[0];
    const { container } = render(<ReadingPanel lesson={lesson} progress={defaultProgress()} courseProgress={0} lessonProgress={0} activeSection="reading" updateSection={vi.fn()} startLesson={vi.fn()} weakestSkill="reading" hasAttempt={false} pinyinVisible setPinyinVisible={vi.fn()} translationVisible setTranslationVisible={vi.fn()} listeningAnswer="" setListeningAnswer={vi.fn()} readingAnswer="" setReadingAnswer={vi.fn()} writingSentence="" setWritingSentence={vi.fn()} feedback={{ listening: null, reading: null, writing: null }} submitChoice={vi.fn()} submitWriting={vi.fn()} completeSection={completeSection} recordExercise={recordExercise} markAudioPlayed={vi.fn()} toggleDifficult={vi.fn()} onSpeakVocabulary={vi.fn()} onPlayAudioAsset={vi.fn()} onWritingPracticeSaved={vi.fn()} playingAudioAssetId={null} />);
    expect(screen.getByText("ĐOẠN ĐỌC · 3 CÂU HỎI")).toBeTruthy();
    const groups = Array.from(container.querySelectorAll(".reading-question"));
    expect(groups).toHaveLength(3);
    groups.forEach((group) => fireEvent.click(group.querySelectorAll("button")[1]));
    fireEvent.click(screen.getByRole("button", { name: "Chấm 3 câu" }));
    expect(recordExercise).toHaveBeenCalledTimes(3);
    expect(completeSection).toHaveBeenCalledWith("reading", 100);
    expect(screen.getByRole("status").textContent).toContain("3/3 đúng");
  });
});
