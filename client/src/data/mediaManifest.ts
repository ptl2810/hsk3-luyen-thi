/**
 * Mực Đỏ Thực Hành: Manifest media là sổ mục lục của từng clip; chỉ phát tệp đã khai báo,
 * không giả định giọng TTS của trình duyệt là học liệu chính thức.
 */
import type { AudioAsset } from "@/lib/types";

export const audioAssets: AudioAsset[] = [
  {
    id: "w01-tone-ma-1",
    kind: "tone-drill",
    spokenTextHanzi: "妈",
    displayPinyin: "mā",
    translation: "mẹ",
    fileName: "tone-ma-1.wav",
    src: "/manus-storage/tone-ma-1_eae488c2.wav",
    durationSeconds: 1.12,
    sha256: "2f8275a097452136aef879bd0571f8de14d5631c5f20bf57249e469b30ffda82",
    source: "neural-tts-generated",
    voice: "Vindemiatrix",
    reviewStatus: "generated-technical-verified",
  },
  {
    id: "w01-tone-ma-2",
    kind: "tone-drill",
    spokenTextHanzi: "麻",
    displayPinyin: "má",
    translation: "cây gai",
    fileName: "tone-ma-2.wav",
    src: "/manus-storage/tone-ma-2_dc28e34d.wav",
    durationSeconds: 1.76,
    sha256: "0f9949fea54b9801c13b4956135d7bae3363574756a72ef756a05b36f44d5af7",
    source: "neural-tts-generated",
    voice: "Vindemiatrix",
    reviewStatus: "generated-technical-verified",
  },
  {
    id: "w01-tone-ma-3",
    kind: "tone-drill",
    spokenTextHanzi: "马",
    displayPinyin: "mǎ",
    translation: "ngựa",
    fileName: "tone-ma-3.wav",
    src: "/manus-storage/tone-ma-3_914e7608.wav",
    durationSeconds: 1.52,
    sha256: "68fad3e1842f8a762088cb3a5d72d67ba11493a4042b2919ab876786abc87376",
    source: "neural-tts-generated",
    voice: "Vindemiatrix",
    reviewStatus: "generated-technical-verified",
  },
  {
    id: "w01-tone-ma-4",
    kind: "tone-drill",
    spokenTextHanzi: "骂",
    displayPinyin: "mà",
    translation: "mắng",
    fileName: "tone-ma-4.wav",
    src: "/manus-storage/tone-ma-4_a96e6f4e.wav",
    durationSeconds: 1.24,
    sha256: "77002e59aa44aebc96d57d498e28d3634303e2c9d7b12d5a9765c3dfce102dbb",
    source: "neural-tts-generated",
    voice: "Vindemiatrix",
    reviewStatus: "generated-technical-verified",
  },
  {
    id: "w01-tone-ma-neutral",
    kind: "tone-drill",
    spokenTextHanzi: "吗",
    displayPinyin: "ma",
    translation: "trợ từ nghi vấn (thanh nhẹ)",
    fileName: "tone-ma-neutral.wav",
    src: "/manus-storage/tone-ma-neutral_113a74f5.wav",
    durationSeconds: 1.44,
    sha256: "dfb1f8f20f2eb8a9e06d4edb9c056e72c02f5d1d6a389f9f824b477983a8b30b",
    source: "neural-tts-generated",
    voice: "Vindemiatrix",
    reviewStatus: "generated-technical-verified",
  },
  {
    id: "w01-vocab-ni",
    kind: "vocabulary",
    spokenTextHanzi: "你",
    displayPinyin: "nǐ",
    translation: "bạn",
    fileName: "w01-vocab-ni.wav",
    src: "/manus-storage/w01-vocab-ni_b70c60d6.wav",
    durationSeconds: 1.48,
    sha256: "547a6fb4de8037ba4d63ebff3d4d5ed9de25ef4a17db2b6360e7705478e4097d",
    source: "neural-tts-generated",
    voice: "Vindemiatrix",
    reviewStatus: "generated-technical-verified",
  },
  {
    id: "w01-vocab-hao",
    kind: "vocabulary",
    spokenTextHanzi: "好",
    displayPinyin: "hǎo",
    translation: "tốt, khỏe",
    fileName: "w01-vocab-hao.wav",
    src: "/manus-storage/w01-vocab-hao_8ad7d45d.wav",
    durationSeconds: 1.04,
    sha256: "f834e5bdc72cca07f7f61c861002af8f97cd7c1a6777b034da0d467cb558d3b7",
    source: "neural-tts-generated",
    voice: "Vindemiatrix",
    reviewStatus: "generated-technical-verified",
  },
  {
    id: "w01-reading-wo-shi-xuesheng",
    kind: "reading-practice",
    spokenTextHanzi: "我是学生。",
    displayPinyin: "Wǒ shì xuéshēng.",
    translation: "Tôi là học sinh.",
    fileName: "w01-reading-wo-shi-xuesheng.wav",
    src: "/manus-storage/w01-reading-wo-shi-xuesheng_295d3f87.wav",
    durationSeconds: 3.84,
    sha256: "1d7250249fdf384af60115f3fff1e8d50af062e6f13c3ef6a8e3c99d5e1363fb",
    source: "neural-tts-generated",
    voice: "Vindemiatrix",
    reviewStatus: "generated-technical-verified",
  },
];

export const getAudioAsset = (id: string | null | undefined): AudioAsset | undefined => audioAssets.find((asset) => asset.id === id);

const weekOneVocabularyAudioByHanzi: Record<string, string> = {
  "妈": "w01-tone-ma-1",
  "麻": "w01-tone-ma-2",
  "马": "w01-tone-ma-3",
  "骂": "w01-tone-ma-4",
  "你": "w01-vocab-ni",
  "好": "w01-vocab-hao",
};

/** Tuần 1 dùng chung các clip từ đơn cho sáu buổi vì cùng phạm vi phát âm nền. */
export const getVocabularyAudioAssetId = (week: number, hanzi: string): string | null => week === 1 ? weekOneVocabularyAudioByHanzi[hanzi] ?? null : null;

export const w01ToneDrillAssetIds = ["w01-tone-ma-1", "w01-tone-ma-2", "w01-tone-ma-3", "w01-tone-ma-4", "w01-tone-ma-neutral"] as const;

export const w01ReadingPractice = {
  audioAssetId: "w01-reading-wo-shi-xuesheng",
  hanzi: "我是学生。",
  pinyin: "Wǒ shì xuéshēng.",
  translation: "Tôi là học sinh.",
  note: "学生 gồm hai âm tiết: xué + shēng.",
} as const;
