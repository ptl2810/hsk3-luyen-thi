/**
 * Mực Đỏ Thực Hành: “bàn học mở” có thanh điều hướng trái, dải nhiệm vụ trung tâm,
 * phản hồi có căn cứ bên phải; màu kỹ năng trầm và dấu đỏ son chỉ dùng cho hành động chính.
 */
import { AudioCoach } from "@/components/AudioCoach";
import { SpeakingPractice } from "@/components/SpeakingPractice";
import { WritingCanvas } from "@/components/WritingCanvas";
import { getAllVocabulary, roadmapWeeks, sampleLessons } from "@/data/courseData";
import { calculateLessonCompletion, getReviewItems, getWeakestSkill, scoreMultipleChoice } from "@/lib/assessment";
import { createBackup, defaultProgress, loadProgress, parseBackup, persistProgress } from "@/lib/storage";
import { SKILL_META, type AppSettings, type ExerciseResult, type LearningProgress, type SkillId } from "@/lib/types";
import {
  ArrowDownToLine, ArrowUpFromLine, BarChart3, BookOpen, BrainCircuit, ChevronRight,
  CircleHelp, Clock3, FileText, Headphones, Languages, LayoutDashboard, Lightbulb,
  ListChecks, Menu, Mic2, MoreHorizontal, PenLine, Play, RotateCcw, Settings2,
  Sparkles, Target, Trophy, Volume2, X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

type ViewId = "dashboard" | "roadmap" | "vocabulary" | "review" | "mock-test" | "statistics" | "settings";

const navItems: Array<{ id: ViewId; label: string; icon: typeof LayoutDashboard }> = [
  { id: "dashboard", label: "Trang chủ", icon: LayoutDashboard },
  { id: "roadmap", label: "Lộ trình", icon: ListChecks },
  { id: "vocabulary", label: "Từ vựng", icon: BookOpen },
  { id: "review", label: "Ôn tập", icon: BrainCircuit },
  { id: "mock-test", label: "Thi thử", icon: Trophy },
  { id: "statistics", label: "Thống kê", icon: BarChart3 },
  { id: "settings", label: "Cài đặt", icon: Settings2 },
];

const sectionIcons: Record<SkillId, typeof Headphones> = {
  listening: Headphones,
  speaking: Mic2,
  reading: BookOpen,
  writing: PenLine,
};

const listeningQuestion = {
  id: "tone-meaning",
  prompt: "Từ nào có nghĩa là “ngựa”?",
  options: [
    { id: "a", hanzi: "妈", pinyin: "mā" },
    { id: "b", hanzi: "麻", pinyin: "má" },
    { id: "c", hanzi: "马", pinyin: "mǎ" },
    { id: "d", hanzi: "骂", pinyin: "mà" },
  ],
  answer: "c",
  explanation: "mǎ là thanh 3 và nghĩa là “ngựa”. Hãy nghe lại đoạn lên–xuống của thanh 3 trước khi nhắc lại.",
};

function SectionKicker({ number, children }: { number: string; children: React.ReactNode }) {
  return <div className="section-kicker"><span>{number}</span><b>{children}</b></div>;
}

export default function Home() {
  const [view, setView] = useState<ViewId>("dashboard");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [progress, setProgress] = useState<LearningProgress>(() => loadProgress());
  const [lessonIndex, setLessonIndex] = useState(() => Math.max(0, sampleLessons.findIndex((lesson) => lesson.id === loadProgress().currentLessonId)));
  const [activeSection, setActiveSection] = useState<SkillId>(() => loadProgress().currentSection);
  const [pinyinVisible, setPinyinVisible] = useState(() => loadProgress().settings.showPinyin);
  const [translationVisible, setTranslationVisible] = useState(() => loadProgress().settings.showTranslation);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [listeningFeedback, setListeningFeedback] = useState<string | null>(null);
  const [readingAnswer, setReadingAnswer] = useState("");
  const [readingFeedback, setReadingFeedback] = useState<string | null>(null);
  const [writingSentence, setWritingSentence] = useState("");
  const [writingFeedback, setWritingFeedback] = useState<string | null>(null);
  const [toast, setToast] = useState("");
  const [flashIndex, setFlashIndex] = useState(0);
  const [flashFlipped, setFlashFlipped] = useState(false);
  const [mockAnswer, setMockAnswer] = useState("");
  const [mockResult, setMockResult] = useState<number | null>(null);
  const importInputRef = useRef<HTMLInputElement | null>(null);

  const lesson = sampleLessons[lessonIndex];
  const activeLessonSteps = progress.completedLessonIds.includes(lesson.id) ? 0 : (progress.completedSections[lesson.id] ?? []).length;
  const courseProgress = Math.max(1, Math.round(((progress.completedLessonIds.length * 4 + activeLessonSteps) / (24 * 6 * 4)) * 100));
  const lessonProgress = calculateLessonCompletion(progress, lesson.id);
  const weakestSkill = getWeakestSkill(progress);
  const reviewItems = getReviewItems(progress.exerciseResults);
  const allVocabulary = getAllVocabulary();
  const flashWord = allVocabulary[flashIndex % allVocabulary.length];

  useEffect(() => { persistProgress(progress); }, [progress]);
  useEffect(() => {
    const timer = window.setTimeout(() => setToast(""), 3500);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const updateProgress = (updater: (current: LearningProgress) => LearningProgress) => setProgress((current) => updater(current));

  const recordExercise = (result: Omit<ExerciseResult, "attemptedAt">) => {
    updateProgress((current) => {
      const previous = current.skills[result.skill];
      const attempts = previous.attempts + 1;
      return {
        ...current,
        lastStudiedAt: new Date().toISOString(),
        exerciseResults: [...current.exerciseResults, { ...result, attemptedAt: new Date().toISOString() }].slice(-60),
        skills: {
          ...current.skills,
          [result.skill]: { lastScore: result.score, attempts, average: Math.round((previous.average * previous.attempts + result.score) / attempts) },
        },
      };
    });
  };

  const completeSection = (skill: SkillId, score?: number) => {
    updateProgress((current) => {
      const completed = new Set(current.completedSections[lesson.id] ?? []);
      completed.add(skill);
      const isLessonComplete = completed.size === 4;
      return {
        ...current,
        currentLessonId: lesson.id,
        currentSection: skill,
        totalMinutes: current.totalMinutes + 5,
        lastStudiedAt: new Date().toISOString(),
        completedSections: { ...current.completedSections, [lesson.id]: Array.from(completed) },
        completedLessonIds: isLessonComplete && !current.completedLessonIds.includes(lesson.id) ? [...current.completedLessonIds, lesson.id] : current.completedLessonIds,
        skills: score === undefined ? current.skills : {
          ...current.skills,
          [skill]: { ...current.skills[skill], lastScore: score, average: Math.round((current.skills[skill].average * current.skills[skill].attempts + score) / (current.skills[skill].attempts + 1)), attempts: current.skills[skill].attempts + 1 },
        },
      };
    });
    setToast(`${SKILL_META[skill].label} đã được đánh dấu hoàn thành trong bài này.`);
  };

  const startLesson = (index = lessonIndex, section: SkillId = "listening") => {
    const next = sampleLessons[index];
    setLessonIndex(index);
    setActiveSection(section);
    setView("dashboard");
    updateProgress((current) => ({ ...current, currentLessonId: next.id, currentSection: section, lastStudiedAt: new Date().toISOString() }));
    window.setTimeout(() => document.getElementById("lesson-workspace")?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  };

  const toggleDifficult = (wordId: string) => {
    updateProgress((current) => ({ ...current, difficultWordIds: current.difficultWordIds.includes(wordId) ? current.difficultWordIds.filter((id) => id !== wordId) : [...current.difficultWordIds, wordId] }));
  };

  const submitListening = () => {
    if (!selectedAnswer) { setListeningFeedback("Hãy chọn một đáp án trước khi nộp bài."); return; }
    const score = scoreMultipleChoice(selectedAnswer, listeningQuestion.answer);
    recordExercise({ exerciseId: listeningQuestion.id, lessonId: lesson.id, skill: "listening", answer: selectedAnswer, correctAnswer: listeningQuestion.answer, score, explanation: listeningQuestion.explanation });
    setListeningFeedback(score ? `Đúng rồi. ${listeningQuestion.explanation}` : `Chưa đúng. ${listeningQuestion.explanation}`);
    completeSection("listening", score);
  };

  const submitReading = () => {
    if (!readingAnswer) { setReadingFeedback("Hãy chọn một câu trả lời trước khi nộp bài."); return; }
    const score = scoreMultipleChoice(readingAnswer, "b");
    recordExercise({ exerciseId: "reading-name", lessonId: lesson.id, skill: "reading", answer: readingAnswer, correctAnswer: "b", score, explanation: "安 giới thiệu mình bằng mẫu 我叫安, vì vậy tên của bạn ấy là An." });
    setReadingFeedback(score ? "Chính xác. 安 tự giới thiệu tên bằng 我叫安." : "Chưa đúng. Hãy tìm câu có mẫu 我叫 + tên trong đoạn đọc.");
    completeSection("reading", score);
  };

  const submitWritingSentence = () => {
    const isCorrect = writingSentence.replace(/\s|[。！？]/g, "") === "我叫安";
    const score = isCorrect ? 100 : 0;
    recordExercise({ exerciseId: "writing-name", lessonId: lesson.id, skill: "writing", answer: writingSentence, correctAnswer: "我叫安", score, explanation: "Mẫu giới thiệu ngắn là 我叫 + tên." });
    setWritingFeedback(isCorrect ? "Đúng rồi. 我叫安 là câu giới thiệu tên tự nhiên." : "Hãy thử lại theo thứ tự: 我 + 叫 + 安。");
    if (isCorrect) completeSection("writing", score);
  };

  const downloadBackup = () => {
    const blob = new Blob([createBackup(progress)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url; link.download = `hoa-ngu-180-backup-${new Date().toISOString().slice(0, 10)}.json`; link.click();
    URL.revokeObjectURL(url);
    setToast("Đã xuất tệp sao lưu JSON. Hãy lưu tệp ở nơi an toàn.");
  };

  const importBackup = async (file?: File) => {
    if (!file) return;
    try {
      const restored = parseBackup(await file.text());
      setProgress(restored);
      setLessonIndex(Math.max(0, sampleLessons.findIndex((item) => item.id === restored.currentLessonId)));
      setActiveSection(restored.currentSection);
      setToast("Đã nhập và khôi phục tiến độ từ tệp sao lưu.");
    } catch (error) {
      setToast(error instanceof Error ? error.message : "Không thể đọc tệp sao lưu này.");
    }
  };

  const resetData = () => {
    if (!window.confirm("Bạn sắp xóa toàn bộ tiến độ, kết quả, từ khó và cài đặt trên thiết bị này. Tiếp tục?")) return;
    if (!window.confirm("Xác nhận lần 2: thao tác này không thể hoàn tác nếu chưa có tệp sao lưu.")) return;
    const fresh = defaultProgress();
    setProgress(fresh); setLessonIndex(1); setActiveSection("speaking"); setToast("Đã xóa dữ liệu học trên thiết bị này.");
  };

  const updateSettings = (patch: Partial<AppSettings>) => {
    if (typeof patch.showPinyin === "boolean") setPinyinVisible(patch.showPinyin);
    if (typeof patch.showTranslation === "boolean") setTranslationVisible(patch.showTranslation);
    updateProgress((current) => ({ ...current, settings: { ...current.settings, ...patch } }));
  };

  const renderMain = () => {
    if (view === "roadmap") return <RoadmapView onStart={startLesson} progress={progress} />;
    if (view === "vocabulary") return <VocabularyView word={flashWord} flipped={flashFlipped} onFlip={() => setFlashFlipped(!flashFlipped)} onNext={() => { setFlashIndex((index) => (index + 1) % allVocabulary.length); setFlashFlipped(false); }} difficult={progress.difficultWordIds.includes(flashWord.id)} onDifficult={() => toggleDifficult(flashWord.id)} />;
    if (view === "review") return <ReviewView reviewItems={reviewItems} onPractice={() => startLesson(lessonIndex, "listening")} />;
    if (view === "mock-test") return <MockTestView answer={mockAnswer} setAnswer={setMockAnswer} result={mockResult} submit={() => { const score = scoreMultipleChoice(mockAnswer, "b"); setMockResult(score); recordExercise({ exerciseId: "mock-1", lessonId: lesson.id, skill: "reading", answer: mockAnswer, correctAnswer: "b", score, explanation: "Lựa chọn B đúng theo thông tin trong câu." }); }} onStartSpeaking={() => startLesson(1, "speaking")} />;
    if (view === "statistics") return <StatisticsView progress={progress} />;
    if (view === "settings") return <SettingsView settings={progress.settings} updateSettings={updateSettings} exportData={downloadBackup} importFile={() => importInputRef.current?.click()} resetData={resetData} />;
    return <DashboardView
      progress={progress} courseProgress={courseProgress} lesson={lesson} lessonProgress={lessonProgress} activeSection={activeSection}
      setActiveSection={setActiveSection} startLesson={startLesson} weakestSkill={weakestSkill}
      pinyinVisible={pinyinVisible} setPinyinVisible={setPinyinVisible} translationVisible={translationVisible} setTranslationVisible={setTranslationVisible}
      selectedAnswer={selectedAnswer} setSelectedAnswer={setSelectedAnswer} listeningFeedback={listeningFeedback} submitListening={submitListening}
      readingAnswer={readingAnswer} setReadingAnswer={setReadingAnswer} readingFeedback={readingFeedback} submitReading={submitReading}
      writingSentence={writingSentence} setWritingSentence={setWritingSentence} writingFeedback={writingFeedback} submitWritingSentence={submitWritingSentence}
      completeSection={completeSection} toggleDifficult={toggleDifficult}
    />;
  };

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileNavOpen ? "sidebar--open" : ""}`}>
        <div className="brand-lockup">
          <img src="/manus-storage/hoa-ngu-180-logo_4b9a5150.png" alt="Biểu tượng Hoa Ngữ 180 Ngày" />
          <div><strong>Hoa Ngữ</strong><span>180 NGÀY</span></div>
          <button className="mobile-close" onClick={() => setMobileNavOpen(false)} aria-label="Đóng điều hướng"><X size={19} /></button>
        </div>
        <p className="sidebar-label">BÀN HỌC CỦA BẠN</p>
        <nav className="sidebar-nav" aria-label="Điều hướng chính">
          {navItems.map((item) => {
            const Icon = item.icon;
            return <button key={item.id} className={view === item.id ? "nav-item nav-item--active" : "nav-item"} onClick={() => { setView(item.id); setMobileNavOpen(false); }}><Icon size={18} /><span>{item.label}</span>{item.id === "review" && reviewItems.length > 0 && <i>{reviewItems.length}</i>}</button>;
          })}
        </nav>
        <div className="sidebar-footnote"><div className="ink-mark">一</div><p><b>Nhịp học hôm nay</b><br />60 phút, từng bước rõ ràng.</p></div>
      </aside>
      {mobileNavOpen && <button className="nav-scrim" onClick={() => setMobileNavOpen(false)} aria-label="Đóng điều hướng" />}
      <main className="workspace">
        <header className="topbar">
          <div className="topbar-leading">
            <button className="mobile-menu" onClick={() => setMobileNavOpen(true)} aria-label="Mở điều hướng"><Menu size={21} /></button>
            <div className="topbar-brand"><img src="/manus-storage/hoa-ngu-180-logo_4b9a5150.png" alt="" /><span>HOA NGỮ <b>180 NGÀY</b></span></div>
            <div className="breadcrumb"><span>Tuần {lesson.week}</span><ChevronRight size={14} /><b>{view === "dashboard" ? "Trang chủ" : navItems.find((item) => item.id === view)?.label}</b></div>
          </div>
          <div className="topbar-actions"><button className="streak-chip"><Sparkles size={15} /> {progress.streakDays} ngày liên tiếp</button><button className="avatar" aria-label="Hồ sơ người học">A</button></div>
        </header>
        {renderMain()}
      </main>
      <input ref={importInputRef} type="file" accept="application/json" className="visually-hidden" onChange={(event) => void importBackup(event.target.files?.[0])} />
      {toast && <div className="toast-message" role="status"><span>✓</span>{toast}</div>}
    </div>
  );
}

interface DashboardProps {
  progress: LearningProgress; courseProgress: number; lesson: (typeof sampleLessons)[number]; lessonProgress: number; activeSection: SkillId;
  setActiveSection: (skill: SkillId) => void; startLesson: (index?: number, section?: SkillId) => void; weakestSkill: SkillId;
  pinyinVisible: boolean; setPinyinVisible: (value: boolean) => void; translationVisible: boolean; setTranslationVisible: (value: boolean) => void;
  selectedAnswer: string; setSelectedAnswer: (answer: string) => void; listeningFeedback: string | null; submitListening: () => void;
  readingAnswer: string; setReadingAnswer: (answer: string) => void; readingFeedback: string | null; submitReading: () => void;
  writingSentence: string; setWritingSentence: (answer: string) => void; writingFeedback: string | null; submitWritingSentence: () => void;
  completeSection: (skill: SkillId, score?: number) => void; toggleDifficult: (wordId: string) => void;
}

function DashboardView(props: DashboardProps) {
  const { progress, courseProgress, lesson, lessonProgress, activeSection, setActiveSection, startLesson, weakestSkill } = props;
  const activeMeta = SKILL_META[activeSection];
  const activeIcon = sectionIcons[activeSection];
  const ActiveIcon = activeIcon;
  const completed = progress.completedSections[lesson.id] ?? [];
  return (
    <div className="page-content dashboard-page">
      <section className="welcome-band">
        <div className="welcome-copy"><SectionKicker number="01">HÔM NAY — MỘT BƯỚC NHỎ</SectionKicker><div className="tutor-annotation"><span>✓</span> GIA SƯ ĐÃ ĐÁNH DẤU BƯỚC TIẾP THEO</div><h1>Tiếp tục nhịp học<br /><em>đúng chỗ bạn đã dừng.</em></h1><p>Hôm nay, bạn sẽ hoàn thành câu chào đầu tiên và nghe lại bốn thanh điệu.</p><button className="primary-action" onClick={() => startLesson()}><Play size={17} fill="currentColor" /> Tiếp tục: {lesson.shortTitle}<ChevronRight size={18} /></button></div>
        <div className="welcome-art"><img src="/manus-storage/hero-study-desk_88090547.png" alt="Bàn học tiếng Hoa với tai nghe, giấy luyện và bút đỏ" /><div className="course-meter"><span>TIẾN ĐỘ KHÓA HỌC</span><b>{courseProgress}%</b><div><i style={{ width: `${courseProgress}%` }} /></div><small>24 tuần · 144 buổi học</small></div></div>
      </section>
      <section className="today-layout">
        <div className="task-sheet">
          <div className="sheet-header"><SectionKicker number="02">BÀI HỌC ĐANG LÀM</SectionKicker><div className="sheet-status"><span className="ink-circle">ĐÚNG NHỊP</span><span className="duration"><Clock3 size={15} /> còn ~35 phút</span></div></div>
          <div className="lesson-title-row"><div><p className="lesson-eyebrow">TUẦN {lesson.week} · BUỔI {lesson.session} · {lesson.stage.toUpperCase()}</p><h2>{lesson.title}</h2><p>{lesson.goal}</p></div><div className="lesson-progress-ring"><strong>{lessonProgress}<small>%</small></strong><span>đã qua</span></div></div>
          <div className="skill-rail">
            {(Object.keys(SKILL_META) as SkillId[]).map((skill, index) => { const Icon = sectionIcons[skill]; const done = completed.includes(skill); return <button key={skill} onClick={() => setActiveSection(skill)} className={`skill-tab skill-tab--${SKILL_META[skill].color} ${activeSection === skill ? "is-active" : ""} ${done ? "is-done" : ""}`}><span className="skill-number">0{index + 1}</span><Icon size={18} /><b>{SKILL_META[skill].label}</b>{done && <i>✓</i>}</button>; })}
          </div>
        </div>
        <aside className="tutor-note"><div className="tutor-note__red-line" /><Lightbulb size={20} /><p><b>Gợi ý của gia sư</b></p><p>Kỹ năng cần ưu tiên là <strong>{SKILL_META[weakestSkill].label.toLowerCase()}</strong>. Mỗi lần chỉ cần nghe mẫu, làm một lượt rồi quay lại đối chiếu.</p><button onClick={() => setActiveSection(weakestSkill)}>Đi đến phần cần ôn <ChevronRight size={15} /></button></aside>
      </section>
      <section className="skill-overview"><SectionKicker number="03">BỐN KỸ NĂNG</SectionKicker><div className="skills-grid">
        {(Object.keys(SKILL_META) as SkillId[]).map((skill, index) => { const meta = SKILL_META[skill]; const Icon = sectionIcons[skill]; return <button key={skill} className={`skill-card skill-card--${meta.color}`} onClick={() => { setActiveSection(skill); document.getElementById("lesson-workspace")?.scrollIntoView({ behavior: "smooth" }); }}><div><span>0{index + 1}</span><Icon size={20} /></div><h3>{meta.label}</h3><p>{meta.description}</p><strong>{progress.skills[skill].lastScore}<small>/100</small></strong><i>Điểm gần nhất</i></button>; })}
      </div></section>
      <section id="lesson-workspace" className={`lesson-workspace lesson-workspace--${activeMeta.color}`}>
        <div className="workspace-title"><div className="workspace-symbol"><ActiveIcon size={24} /></div><div><p>PHẦN {activeSection === "listening" ? "01" : activeSection === "speaking" ? "02" : activeSection === "reading" ? "03" : "04"} · BÀI ĐANG HỌC</p><h2>Luyện {activeMeta.label.toLowerCase()}</h2></div><span>Điểm luyện tập · Không phải điểm thi chính thức</span></div>
        {activeSection === "listening" && <ListeningPanel {...props} />}
        {activeSection === "speaking" && <SpeakingPanel {...props} />}
        {activeSection === "reading" && <ReadingPanel {...props} />}
        {activeSection === "writing" && <WritingPanel {...props} />}
      </section>
      <section className="lower-grid"><VocabularyStrip lesson={lesson} progress={progress} toggleDifficult={props.toggleDifficult} /><GrammarStrip lesson={lesson} /></section>
    </div>
  );
}

function ListeningPanel({ lesson, pinyinVisible, setPinyinVisible, translationVisible, setTranslationVisible, selectedAnswer, setSelectedAnswer, listeningFeedback, submitListening, completeSection, progress }: { lesson: (typeof sampleLessons)[number] } & DashboardProps) {
  return <div className="practice-layout"><div className="practice-main"><div className="practice-instruction"><span>NGHE VÀ PHÂN BIỆT</span><h3>Nghe chậm một lượt, sau đó chọn nghĩa đúng.</h3><p>Không cần mở phụ đề ở lần nghe đầu. Bạn có thể bật lại ở lượt đối chiếu.</p></div><AudioCoach chinese={lesson.id === "w01-s01" ? "妈，麻，马，骂" : lesson.chinese} pinyin={lesson.id === "w01-s01" ? "mā — má — mǎ — mà" : lesson.pinyin} translation={lesson.id === "w01-s01" ? "mẹ — cây gai — ngựa — mắng" : lesson.translation} audioSrc={lesson.id === "w01-s01" ? "/manus-storage/hsk3-tones-week1_7582e15a.wav" : undefined} rate={progress.settings.speechRate} volume={progress.settings.volume} showPinyin={pinyinVisible} showTranslation={translationVisible} onCompleted={() => undefined} /><div className="support-toggles"><div><button className={pinyinVisible ? "is-on" : ""} onClick={() => setPinyinVisible(!pinyinVisible)}>Pinyin</button><button className={translationVisible ? "is-on" : ""} onClick={() => setTranslationVisible(!translationVisible)}>Dịch Việt</button></div><button onClick={() => completeSection("listening")}>Đã nghe xong, chuyển câu hỏi <ChevronRight size={15} /></button></div></div><aside className="question-panel"><p className="question-kicker">CÂU 01 / 03</p><h3>{listeningQuestion.prompt}</h3><div className="answer-list">{listeningQuestion.options.map((option) => <button key={option.id} className={selectedAnswer === option.id ? "answer-option is-chosen" : "answer-option"} onClick={() => setSelectedAnswer(option.id)}><b>{option.id.toUpperCase()}</b><span lang="zh-CN">{option.hanzi}</span><small>{option.pinyin}</small></button>)}</div><button className="primary-action primary-action--compact" onClick={submitListening}>Nộp câu trả lời</button>{listeningFeedback && <p className="answer-feedback">{listeningFeedback}</p>}</aside></div>;
}

function SpeakingPanel({ lesson, completeSection, progress }: { lesson: (typeof sampleLessons)[number] } & DashboardProps) {
  const target = lesson.id === "w01-s01" ? "你好" : "你好，我叫安。";
  return <div className="practice-layout practice-layout--speaking"><div className="practice-main"><div className="practice-instruction"><span>NGHE — BẮT CHƯỚC — TỰ ĐỐI CHIẾU</span><h3>Đọc theo câu mẫu sau khi đã nghe ít nhất một lần.</h3><p>Phản hồi chỉ đo mức độ khớp nội dung. Ứng dụng chưa chấm thanh điệu chuyên sâu.</p></div><AudioCoach chinese={target} pinyin={lesson.id === "w01-s01" ? "Nǐ hǎo" : "Nǐ hǎo, wǒ jiào Ān."} translation={lesson.id === "w01-s01" ? "Xin chào" : "Xin chào, tôi tên An."} rate={progress.settings.speechRate} volume={progress.settings.volume} /><SpeakingPractice lessonId={lesson.id} target={target} onCompleted={(score) => completeSection("speaking", score)} /></div><aside className="speaking-aside"><img src="/manus-storage/speaking-reading_d0fb8f96.png" alt="Minh họa thực hành nói và đọc tiếng Hoa" /><p><b>Không hỗ trợ nhận diện?</b> Bạn vẫn có thể ghi âm, nghe lại hoặc tự nhập câu nói để so sánh. Bản ghi chỉ lưu trên thiết bị của bạn.</p></aside></div>;
}

function ReadingPanel({ lesson, pinyinVisible, setPinyinVisible, translationVisible, setTranslationVisible, readingAnswer, setReadingAnswer, readingFeedback, submitReading }: { lesson: (typeof sampleLessons)[number] } & DashboardProps) {
  const reading = "你好！我叫安。我是越南学生。";
  return <div className="practice-layout practice-layout--reading"><div className="reading-sheet"><div className="reading-tools"><span><BookOpen size={15} /> ĐOẠN ĐỌC NGẮN</span><div><button className={pinyinVisible ? "is-on" : ""} onClick={() => setPinyinVisible(!pinyinVisible)}>Pinyin</button><button className={translationVisible ? "is-on" : ""} onClick={() => setTranslationVisible(!translationVisible)}>Dịch Việt</button></div></div><p className="reading-hanzi" lang="zh-CN">{reading}</p>{pinyinVisible && <p className="reading-pinyin">Nǐ hǎo! Wǒ jiào Ān. Wǒ shì Yuènán xuéshēng.</p>}{translationVisible && <p className="reading-translation">Xin chào! Tôi tên An. Tôi là sinh viên Việt Nam.</p>}<div className="word-hints"><span>Gợi ý từ:</span><button><b lang="zh-CN">叫</b> jiào · tên là</button><button><b lang="zh-CN">学生</b> xuéshēng · học sinh</button></div></div><aside className="question-panel"><p className="question-kicker">CÂU ĐỌC 01 / 03</p><h3>An giới thiệu mình tên là gì?</h3><div className="answer-list answer-list--text"><button className={readingAnswer === "a" ? "answer-option is-chosen" : "answer-option"} onClick={() => setReadingAnswer("a")}><b>A</b><span>Việt Nam</span></button><button className={readingAnswer === "b" ? "answer-option is-chosen" : "answer-option"} onClick={() => setReadingAnswer("b")}><b>B</b><span>An</span></button><button className={readingAnswer === "c" ? "answer-option is-chosen" : "answer-option"} onClick={() => setReadingAnswer("c")}><b>C</b><span>Học sinh</span></button></div><button className="primary-action primary-action--compact" onClick={submitReading}>Kiểm tra câu trả lời</button>{readingFeedback && <p className="answer-feedback">{readingFeedback}</p>}</aside></div>;
}

function WritingPanel({ lesson, writingSentence, setWritingSentence, writingFeedback, submitWritingSentence, completeSection }: { lesson: (typeof sampleLessons)[number] } & DashboardProps) {
  return <div className="writing-panel"><div><div className="practice-instruction"><span>LUYỆN NÉT · CHUỘT, CẢM ỨNG HOẶC BÚT</span><h3>Viết từng nét, rồi tự đối chiếu với chữ mẫu.</h3><p>Canvas không chấm sai tùy tiện: kết quả được lưu là “đang luyện” nếu bạn chủ động lưu bài.</p></div><WritingCanvas lessonId={lesson.id} guides={lesson.writingCharacters} onCompleted={() => completeSection("writing")} /></div><aside className="writing-sentence"><img src="/manus-storage/writing-character_ca4be5dc.png" alt="Minh họa luyện viết chữ Hán trên ô vuông" /><p className="question-kicker">LUYỆN CÂU VIẾT</p><h3>Sắp xếp thành câu: “Tôi tên An.”</h3><div className="word-chips"><span lang="zh-CN">我</span><span lang="zh-CN">叫</span><span lang="zh-CN">安</span></div><input value={writingSentence} onChange={(event) => setWritingSentence(event.target.value)} placeholder="Nhập câu tiếng Hoa" lang="zh-CN" /><button className="primary-action primary-action--compact" onClick={submitWritingSentence}>Chấm câu viết</button>{writingFeedback && <p className="answer-feedback">{writingFeedback}</p>}</aside></div>;
}

function VocabularyStrip({ lesson, progress, toggleDifficult }: { lesson: (typeof sampleLessons)[number]; progress: LearningProgress; toggleDifficult: (id: string) => void }) {
  return <section className="vocab-strip"><SectionKicker number="04">TỪ VỰNG TRONG BÀI</SectionKicker><div className="vocab-list">{lesson.vocabulary.map((word) => <article key={word.id} className="vocab-mini"><button className={progress.difficultWordIds.includes(word.id) ? "bookmark is-marked" : "bookmark"} onClick={() => toggleDifficult(word.id)} aria-label="Đánh dấu từ khó">◆</button><b lang="zh-CN">{word.hanzi}</b><span>{word.pinyin}</span><p>{word.meaning}</p><button className="listen-word" onClick={() => window.speechSynthesis.speak(new SpeechSynthesisUtterance(word.hanzi))}><Volume2 size={14} /> nghe</button></article>)}</div></section>;
}

function GrammarStrip({ lesson }: { lesson: (typeof sampleLessons)[number] }) {
  return <section className="grammar-strip"><SectionKicker number="05">GHI CHÚ NGỮ PHÁP</SectionKicker><p className="grammar-title">{lesson.grammar.title}</p><code>{lesson.grammar.formula}</code><p>{lesson.grammar.explanation}</p><button>Đọc ví dụ <ChevronRight size={14} /></button></section>;
}

function RoadmapView({ onStart, progress }: { onStart: (index?: number, section?: SkillId) => void; progress: LearningProgress }) {
  const lessonByWeek: Record<number, number> = { 1: 0, 2: 2, 3: 3, 4: 4 };
  return <div className="page-content generic-page"><SectionKicker number="LỘ TRÌNH 24 TUẦN">HỌC ĐỀU · THEO ĐÚNG NHỊP</SectionKicker><div className="page-heading"><div><h1>Con đường tới HSK3</h1><p>Mỗi tuần có 6 buổi 60 phút. Các bài có nội dung thực hành được được ghi rõ, các khung còn lại sẵn sàng để bổ sung giáo trình.</p></div><div className="overview-stat"><b>{progress.completedLessonIds.length}</b><span>buổi hoàn thành</span></div></div><div className="roadmap-list">{roadmapWeeks.map((week) => <article key={week.week} className={`roadmap-week ${week.week === 1 ? "roadmap-week--current" : ""}`}><div className="week-number"><span>TUẦN</span><b>{String(week.week).padStart(2, "0")}</b></div><div className="week-content"><span className="stage-tag">{week.stage}</span><h3>{week.focus}</h3><div className="session-pills">{week.sessions.map((session, index) => <span key={session} className={week.week === 1 && index === 0 ? "is-complete" : week.week === 1 && index === 1 ? "is-current" : ""}>{index + 1}. {session}</span>)}</div></div><div className="week-action">{week.sampleReady ? <button onClick={() => onStart(lessonByWeek[week.week], "listening")}>{week.week === 1 ? "Mở bài mẫu" : "Học bài mẫu"}<ChevronRight size={16} /></button> : <span><FileText size={15} /> Khung nội dung</span>}</div></article>)}</div></div>;
}

function VocabularyView({ word, flipped, onFlip, onNext, difficult, onDifficult }: { word: ReturnType<typeof getAllVocabulary>[number]; flipped: boolean; onFlip: () => void; onNext: () => void; difficult: boolean; onDifficult: () => void }) {
  return <div className="page-content generic-page"><SectionKicker number="TỪ VỰNG">THẺ ÔN THEO NHỊP NHỚ</SectionKicker><div className="page-heading"><div><h1>Ôn một từ, dùng trong một câu.</h1><p>Nhấn thẻ để xem pinyin, nghĩa và ví dụ. Đánh dấu khó để từ xuất hiện trong danh sách ôn.</p></div><button className={difficult ? "secondary-button is-marked" : "secondary-button"} onClick={onDifficult}>◆ {difficult ? "Đã đánh dấu khó" : "Đánh dấu khó"}</button></div><section className="flashcard-area"><button className={`flashcard ${flipped ? "flashcard--flipped" : ""}`} onClick={onFlip}><span className="flashcard-label">{flipped ? "MẶT SAU · NGHĨA & VÍ DỤ" : "MẶT TRƯỚC · NHẤN ĐỂ LẬT"}</span>{!flipped ? <><b lang="zh-CN">{word.hanzi}</b><p>Hãy đoán nghĩa trước khi lật thẻ.</p></> : <><h2>{word.pinyin}</h2><h3>{word.meaning}</h3><p lang="zh-CN">{word.example}</p><small>{word.exampleMeaning}</small></>}</button><div className="flashcard-actions"><button className="mini-action" onClick={() => window.speechSynthesis.speak(new SpeechSynthesisUtterance(word.hanzi))}><Volume2 size={16} /> Nghe phát âm</button><button className="primary-action primary-action--compact" onClick={onNext}>Từ tiếp theo <ChevronRight size={17} /></button></div></section></div>;
}

function ReviewView({ reviewItems, onPractice }: { reviewItems: ExerciseResult[]; onPractice: () => void }) {
  return <div className="page-content generic-page"><SectionKicker number="ÔN TẬP">TRỞ LẠI ĐÚNG LỖI CẦN SỬA</SectionKicker><div className="page-heading"><div><h1>Những mục cần ôn lại</h1><p>Danh sách được tạo từ câu trả lời chưa đúng. Không có thuật toán bí ẩn: bạn luôn thấy lý do từ xuất hiện ở đây.</p></div></div>{reviewItems.length ? <div className="review-list">{reviewItems.map((item) => <article key={`${item.exerciseId}-${item.attemptedAt}`}><div className={`review-skill review-skill--${SKILL_META[item.skill].color}`}>{SKILL_META[item.skill].label}</div><div><h3>{item.explanation}</h3><p>Điểm lần gần nhất: <b>{item.score}/100</b> · Câu đã trả lời: <span lang="zh-CN">{item.answer || "(chưa có)"}</span></p></div><button onClick={onPractice}>Ôn lỗi này <ChevronRight size={16} /></button></article>)}</div> : <div className="empty-note"><CircleHelp size={21} /><p>Chưa có lỗi nào được lưu. Hãy làm một bài luyện để app tạo danh sách ôn.</p></div>}</div>;
}

function MockTestView({ answer, setAnswer, result, submit, onStartSpeaking }: { answer: string; setAnswer: (value: string) => void; result: number | null; submit: () => void; onStartSpeaking: () => void }) {
  return <div className="page-content generic-page"><SectionKicker number="THI THỬ RÚT GỌN">LÀM BÀI · XEM LỖI · ÔN LẠI</SectionKicker><div className="page-heading"><div><h1>Mini mock test 01</h1><p>Gồm nghe, đọc, viết; nhiệm vụ nói được lưu riêng dưới dạng ghi âm. Kết quả chỉ để điều chỉnh kế hoạch ôn tập.</p></div><div className="test-time"><Clock3 size={16} /><b>12:00</b><span>thời gian gợi ý</span></div></div><div className="mock-layout"><section className="mock-sheet"><div className="mock-section-title"><span>PHẦN 01</span><h3>Nghe hiểu</h3></div><p>Hãy mở bài luyện Nghe để nghe câu: <b lang="zh-CN">你好，我叫安。</b> Người nói đang làm gì?</p><div className="mock-options"><label><input type="radio" name="mock" value="a" checked={answer === "a"} onChange={(event) => setAnswer(event.target.value)} /> Đang hỏi giờ</label><label><input type="radio" name="mock" value="b" checked={answer === "b"} onChange={(event) => setAnswer(event.target.value)} /> Đang giới thiệu tên</label><label><input type="radio" name="mock" value="c" checked={answer === "c"} onChange={(event) => setAnswer(event.target.value)} /> Đang nói về trường học</label></div><button className="primary-action primary-action--compact" onClick={submit}>Nộp phần nghe</button>{result !== null && <p className="answer-feedback">{result ? "Đúng. 我叫 + tên dùng để giới thiệu tên." : "Chưa đúng. Hãy nhớ mẫu 我叫 + tên."}</p>}<div className="mock-section-title"><span>PHẦN 02</span><h3>Viết</h3></div><p>Sắp xếp: <b lang="zh-CN">我 / 叫 / 安</b>. Bạn có thể luyện ở phần Viết của bài.</p></section><aside className="mock-summary"><Trophy size={28} /><h3>Phần nói riêng</h3><p>Ghi âm câu “你好，我叫安。” rồi nhận phản hồi về mức khớp nội dung.</p><button onClick={onStartSpeaking}>Bắt đầu nhiệm vụ nói <ChevronRight size={15} /></button><hr /><p className="muted">Sau khi nộp, các đáp án sai sẽ xuất hiện trong mục Ôn tập.</p></aside></div></div>;
}

function StatisticsView({ progress }: { progress: LearningProgress }) {
  const skills = Object.entries(progress.skills) as Array<[SkillId, LearningProgress["skills"][SkillId]]>;
  return <div className="page-content generic-page"><SectionKicker number="THỐNG KÊ">NHÌN VÀO THÓI QUEN, KHÔNG CHỈ ĐIỂM SỐ</SectionKicker><div className="page-heading"><div><h1>Tiến độ thực hành</h1><p>Điểm là tín hiệu để chọn phần cần ôn, không phải dự đoán kết quả thi chính thức.</p></div></div><div className="statistics-grid"><section className="time-card"><span>TỔNG THỜI GIAN</span><b>{progress.totalMinutes}</b><p>phút thực hành đã lưu</p><div className="week-bars">{[32, 48, 28, 68, 42, 77, 56].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div><small>T2 &nbsp; T3 &nbsp; T4 &nbsp; T5 &nbsp; T6 &nbsp; T7 &nbsp; CN</small></section><section className="skill-score-card"><span>ĐIỂM GẦN NHẤT</span>{skills.map(([skill, record]) => <div key={skill} className="score-row"><div><b>{SKILL_META[skill].label}</b><span>{record.attempts} lượt</span></div><div className="score-track"><i className={`score-track__fill score-track__fill--${SKILL_META[skill].color}`} style={{ width: `${record.lastScore}%` }} /></div><strong>{record.lastScore}</strong></div>)}</section></div></div>;
}

function SettingsView({ settings, updateSettings, exportData, importFile, resetData }: { settings: AppSettings; updateSettings: (patch: Partial<AppSettings>) => void; exportData: () => void; importFile: () => void; resetData: () => void }) {
  return <div className="page-content generic-page"><SectionKicker number="CÀI ĐẶT">CHỈNH BÀN HỌC THEO CÁCH BẠN HỌC</SectionKicker><div className="page-heading"><div><h1>Cài đặt cá nhân</h1><p>Các lựa chọn này được lưu trên thiết bị. Bản ghi âm và nét viết không tự động gửi lên máy chủ.</p></div></div><div className="settings-stack"><section><h3>Hiển thị bài học</h3><ToggleSetting label="Hiện pinyin mặc định" description="Bạn luôn có thể che pinyin khi muốn tự đọc." checked={settings.showPinyin} onChange={(value) => updateSettings({ showPinyin: value })} /><ToggleSetting label="Hiện dịch tiếng Việt" description="Bật/tắt hỗ trợ nghĩa trong bài nghe và bài đọc." checked={settings.showTranslation} onChange={(value) => updateSettings({ showTranslation: value })} /><ToggleSetting label="Chế độ gọn" description="Giảm khoảng trống trên màn hình nhỏ." checked={settings.compactMode} onChange={(value) => updateSettings({ compactMode: value })} /></section><section><h3>Audio</h3><label className="range-setting"><span><b>Tốc độ câu mẫu</b><small>{settings.speechRate}×</small></span><input type="range" min="0.6" max="1" step="0.1" value={settings.speechRate} onChange={(event) => updateSettings({ speechRate: Number(event.target.value) })} /></label><label className="range-setting"><span><b>Âm lượng</b><small>{Math.round(settings.volume * 100)}%</small></span><input type="range" min="0" max="1" step="0.1" value={settings.volume} onChange={(event) => updateSettings({ volume: Number(event.target.value) })} /></label></section><section><h3>Sao lưu & khôi phục</h3><p className="settings-desc">Xuất tiến độ thành JSON trước khi đổi thiết bị hoặc xóa dữ liệu trình duyệt.</p><div className="data-actions"><button onClick={exportData}><ArrowDownToLine size={17} /> Xuất backup JSON</button><button onClick={importFile}><ArrowUpFromLine size={17} /> Nhập backup</button></div></section><section className="danger-zone"><h3>Xóa dữ liệu trên thiết bị</h3><p>Tiến độ, kết quả, danh sách từ khó và cài đặt sẽ bị xóa sau hai bước xác nhận. Hãy xuất backup trước nếu cần giữ lại.</p><button onClick={resetData}><RotateCcw size={16} /> Xóa toàn bộ dữ liệu</button></section></div></div>;
}

function ToggleSetting({ label, description, checked, onChange }: { label: string; description: string; checked: boolean; onChange: (value: boolean) => void }) {
  return <label className="toggle-setting"><span><b>{label}</b><small>{description}</small></span><input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} /><i aria-hidden="true" /></label>;
}
