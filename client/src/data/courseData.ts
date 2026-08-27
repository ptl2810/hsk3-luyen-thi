/**
 * Mực Đỏ Thực Hành: Nội dung HSK3 được khai báo theo dữ liệu, không đặt rải rác trong component.
 */
import type { Lesson, VocabularyWord } from "@/lib/types";

export const sampleLessons: Lesson[] = [
  {
    id: "w01-s01",
    week: 1,
    session: 1,
    stage: "Nền tảng phát âm",
    title: "Pinyin & bốn thanh điệu",
    shortTitle: "Thanh điệu",
    duration: 60,
    goal: "Phân biệt được bốn thanh điệu và đọc theo mẫu âm ma với tốc độ chậm.",
    warmup: "Hãy lắng nghe sự khác nhau giữa cùng một âm tiết khi cao độ thay đổi.",
    chinese: "mā — má — mǎ — mà",
    pinyin: "mā — má — mǎ — mà",
    translation: "mẹ — cây gai — ngựa — mắng",
    grammar: {
      title: "Thanh điệu là một phần của từ",
      formula: "Âm tiết = thanh mẫu + vận mẫu + thanh điệu",
      explanation:
        "Trong tiếng Hoa, thay đổi thanh điệu có thể đổi nghĩa. Hãy nghe trọn âm tiết trước khi bắt chước, không chỉ nhìn chữ cái pinyin.",
    },
    vocabulary: [
      { id: "ma1", hanzi: "妈", pinyin: "mā", meaning: "mẹ", partOfSpeech: "danh từ", example: "我妈妈很好。", exampleMeaning: "Mẹ tôi rất khỏe." },
      { id: "hao", hanzi: "好", pinyin: "hǎo", meaning: "tốt, khỏe", partOfSpeech: "tính từ", example: "你好！", exampleMeaning: "Xin chào!" },
      { id: "wo", hanzi: "我", pinyin: "wǒ", meaning: "tôi", partOfSpeech: "đại từ", example: "我是学生。", exampleMeaning: "Tôi là học sinh." },
    ],
    writingCharacters: [
      { character: "一", strokes: 1, hint: "Nét ngang từ trái sang phải." },
      { character: "二", strokes: 2, hint: "Viết nét trên ngắn, nét dưới dài." },
      { character: "三", strokes: 3, hint: "Ba nét ngang, từ ngắn đến dài." },
      { character: "人", strokes: 2, hint: "Nét phẩy trước, nét mác sau." },
      { character: "口", strokes: 3, hint: "Ngang-dọc, ngang-gập, ngang đóng khung." },
    ],
  },
  {
    id: "w01-s02",
    week: 1,
    session: 2,
    stage: "Nền tảng phát âm",
    title: "Chào hỏi & giới thiệu bản thân",
    shortTitle: "Chào hỏi",
    duration: 60,
    goal: "Chào hỏi, nói tên và hỏi tên một người khác bằng một hội thoại ngắn.",
    warmup: "Đọc chậm câu 你好 và chú ý thanh 3 của 你.",
    chinese: "你好！我叫安。你叫什么名字？",
    pinyin: "Nǐ hǎo! Wǒ jiào Ān. Nǐ jiào shénme míngzi?",
    translation: "Xin chào! Tôi tên An. Bạn tên là gì?",
    grammar: {
      title: "Giới thiệu tên với 叫",
      formula: "Chủ ngữ + 叫 + tên",
      explanation: "叫 nghĩa là “gọi là/tên là”. Không cần dùng động từ “là” trước tên riêng trong mẫu câu này.",
    },
    vocabulary: [
      { id: "nihao", hanzi: "你好", pinyin: "nǐ hǎo", meaning: "xin chào", partOfSpeech: "câu chào", example: "你好，老师！", exampleMeaning: "Xin chào, cô/thầy!" },
      { id: "jiao", hanzi: "叫", pinyin: "jiào", meaning: "tên là, gọi", partOfSpeech: "động từ", example: "我叫林。", exampleMeaning: "Tôi tên là Linh." },
      { id: "mingzi", hanzi: "名字", pinyin: "míngzi", meaning: "tên", partOfSpeech: "danh từ", example: "你的名字是什么？", exampleMeaning: "Tên bạn là gì?" },
    ],
    writingCharacters: [
      { character: "你", strokes: 7, hint: "Bộ nhân đứng trước; phần phải viết sau." },
      { character: "好", strokes: 6, hint: "Nữ ở trái, tử ở phải." },
      { character: "我", strokes: 7, hint: "Đi từ nét ngang đầu, giữ thân chữ cân giữa." },
      { character: "叫", strokes: 5, hint: "Miệng ở trái, nét dọc khung mở ở phải." },
      { character: "名", strokes: 6, hint: "Tịch ở trên, khẩu ở dưới." },
    ],
  },
  {
    id: "w02-s01",
    week: 2,
    session: 1,
    stage: "Nền tảng giao tiếp",
    title: "Số đếm, ngày giờ & lịch trình",
    shortTitle: "Ngày giờ",
    duration: 60,
    goal: "Hỏi và trả lời giờ hẹn đơn giản, nhận diện số 1–10 trong câu nghe ngắn.",
    warmup: "Đếm từ 一 đến 十 theo nhịp chậm, mỗi số một nhịp.",
    chinese: "我们下午三点见。",
    pinyin: "Wǒmen xiàwǔ sān diǎn jiàn.",
    translation: "Chúng ta gặp nhau lúc ba giờ chiều.",
    grammar: {
      title: "Thời gian đứng trước động từ",
      formula: "Chủ ngữ + thời gian + động từ",
      explanation: "Trong câu cơ bản, thời gian thường được đặt sau chủ ngữ và trước hành động chính.",
    },
    vocabulary: [
      { id: "san", hanzi: "三", pinyin: "sān", meaning: "ba", partOfSpeech: "số từ", example: "三个人。", exampleMeaning: "Ba người." },
      { id: "xiawu", hanzi: "下午", pinyin: "xiàwǔ", meaning: "buổi chiều", partOfSpeech: "danh từ thời gian", example: "下午见。", exampleMeaning: "Gặp chiều nhé." },
      { id: "dian", hanzi: "点", pinyin: "diǎn", meaning: "giờ", partOfSpeech: "danh từ thời gian", example: "八点上课。", exampleMeaning: "Tám giờ học." },
    ],
    writingCharacters: [
      { character: "三", strokes: 3, hint: "Ba nét ngang, nét dưới dài nhất." },
      { character: "点", strokes: 9, hint: "Trên trước, bộ hỏa ở dưới sau." },
      { character: "下", strokes: 3, hint: "Ngang, sổ dọc, chấm dưới." },
      { character: "午", strokes: 4, hint: "Nét phẩy trước phần ngang-dọc." },
      { character: "见", strokes: 4, hint: "Khung trên, nét nhân ở dưới." },
    ],
  },
  {
    id: "w03-s01",
    week: 3,
    session: 1,
    stage: "Giao tiếp căn bản",
    title: "Đọc: Một buổi sáng của An",
    shortTitle: "Đọc theo ngữ cảnh",
    duration: 60,
    goal: "Đọc một đoạn tự giới thiệu ngắn, bật/tắt pinyin và tìm đúng thông tin tên, quốc tịch.",
    warmup: "Tìm từ 我 trong câu 我是越南学生 và đoán vai trò của nó.",
    chinese: "你好！我叫安。我是越南学生。",
    pinyin: "Nǐ hǎo! Wǒ jiào Ān. Wǒ shì Yuènán xuéshēng.",
    translation: "Xin chào! Tôi tên An. Tôi là sinh viên Việt Nam.",
    grammar: {
      title: "Câu giới thiệu với 是",
      formula: "Chủ ngữ + 是 + danh từ",
      explanation: "是 nối chủ ngữ với nghề nghiệp, quốc tịch hoặc danh từ chỉ thân phận. Hãy phân biệt với mẫu 我叫 + tên.",
    },
    vocabulary: [
      { id: "shi", hanzi: "是", pinyin: "shì", meaning: "là", partOfSpeech: "động từ", example: "我是学生。", exampleMeaning: "Tôi là học sinh." },
      { id: "yuenan", hanzi: "越南", pinyin: "Yuènán", meaning: "Việt Nam", partOfSpeech: "danh từ riêng", example: "我是越南人。", exampleMeaning: "Tôi là người Việt Nam." },
      { id: "xuesheng", hanzi: "学生", pinyin: "xuéshēng", meaning: "học sinh, sinh viên", partOfSpeech: "danh từ", example: "她是学生。", exampleMeaning: "Cô ấy là học sinh." },
    ],
    writingCharacters: [
      { character: "是", strokes: 9, hint: "Viết phần trên trước, nét cuối kéo dài cân thân chữ." },
      { character: "学", strokes: 8, hint: "Nét trên nhỏ, tử ở dưới cùng." },
      { character: "生", strokes: 5, hint: "Nét ngang giữa dài hơn để giữ chữ vững." },
      { character: "越", strokes: 12, hint: "Bộ tẩu chi viết sau phần chính." },
      { character: "南", strokes: 9, hint: "Giữ các nét ngang song song và rõ khoảng trống." },
    ],
  },
  {
    id: "w04-s01",
    week: 4,
    session: 1,
    stage: "Nền tảng chữ Hán",
    title: "Viết: Nét cơ bản & năm chữ đầu",
    shortTitle: "Luyện nét chữ Hán",
    duration: 60,
    goal: "Luyện năm chữ Hán đầu trên ô vuông, dùng hoàn tác và tự đối chiếu số nét mẫu.",
    warmup: "Viết một nét ngang thật chậm từ trái sang phải, giữ điểm kết thúc ngang hàng điểm bắt đầu.",
    chinese: "一 二 三 人 口",
    pinyin: "yī, èr, sān, rén, kǒu",
    translation: "một, hai, ba, người, miệng",
    grammar: {
      title: "Nét trước, cấu trúc sau",
      formula: "Trên trước · trái trước · ngoài trước · đóng khung sau",
      explanation: "Đây là quy tắc khởi đầu để tạo thói quen nhìn cấu trúc chữ. Canvas chỉ hỗ trợ luyện và tự đối chiếu, không chấm nét viết tay chính thức.",
    },
    vocabulary: [
      { id: "yi", hanzi: "一", pinyin: "yī", meaning: "một", partOfSpeech: "số từ", example: "一个人。", exampleMeaning: "Một người." },
      { id: "er", hanzi: "二", pinyin: "èr", meaning: "hai", partOfSpeech: "số từ", example: "二个人。", exampleMeaning: "Hai người." },
      { id: "ren", hanzi: "人", pinyin: "rén", meaning: "người", partOfSpeech: "danh từ", example: "他是中国人。", exampleMeaning: "Anh ấy là người Trung Quốc." },
    ],
    writingCharacters: [
      { character: "一", strokes: 1, hint: "Nét ngang từ trái sang phải." },
      { character: "二", strokes: 2, hint: "Nét trên ngắn, nét dưới dài." },
      { character: "三", strokes: 3, hint: "Ba nét ngang từ ngắn đến dài." },
      { character: "人", strokes: 2, hint: "Phẩy trước, mác sau." },
      { character: "口", strokes: 3, hint: "Khung ngoài mở trước, đóng sau." },
    ],
  },
];

export const courseOutline = [
  "Pinyin, bốn thanh điệu, nét cơ bản",
  "Số đếm, thời gian, ngày tháng",
  "Gia đình và giới thiệu người thân",
  "Ăn uống, mua sắm, địa điểm gần",
  "Lịch trình, sở thích, thời tiết",
  "Học tập, công việc và sức khỏe",
  "Giao thông, du lịch, trải nghiệm",
  "Kế hoạch, so sánh, kể chuyện ngắn",
  "Tích hợp bốn kỹ năng theo tình huống",
  "Luyện dạng đề và quản lý thời gian",
  "Tổng ôn điểm yếu và thi thử",
  "Thi thử toàn diện, kế hoạch ôn lại",
] as const;

export const roadmapWeeks = Array.from({ length: 24 }, (_, index) => {
  const week = index + 1;
  const stageIndex = week <= 4 ? 0 : week <= 8 ? 1 : week <= 16 ? 2 : week <= 20 ? 8 : week <= 23 ? 9 : 11;
  const stage = week <= 4 ? "Nền tảng" : week <= 8 ? "Giao tiếp căn bản" : week <= 16 ? "Xây nền HSK3" : week <= 20 ? "Tích hợp" : week <= 23 ? "Luyện thi" : "Tổng ôn";
  return {
    week,
    stage,
    focus: courseOutline[stageIndex],
    sessions: ["Ôn & từ vựng", "Phát âm & nghe", "Nói theo mẫu", "Đọc & ngữ pháp", "Viết", "Tổng hợp"],
    sampleReady: week <= 4,
  };
});

export const getAllVocabulary = (): VocabularyWord[] => sampleLessons.flatMap((lesson) => lesson.vocabulary);
