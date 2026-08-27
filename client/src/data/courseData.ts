/**
 * Mực Đỏ Thực Hành: Catalog HSK3 v2 — 24 tuần × 6 buổi, toàn bộ panel lấy từ dữ liệu này.
 * Media có trạng thái rõ ràng: tệp thật được ưu tiên, bài chưa có tệp dùng fallback được thông báo.
 */
import type { ChoiceQuestion, Lesson, VideoContext, VocabularyWord } from "@/lib/types";

type TopicVocabulary = [string, string, string, string];

interface TopicSeed {
  stage: string;
  topic: string;
  shortTitle: string;
  grammar: { title: string; formula: string; explanation: string; positiveExample: string; commonMistake: string };
  target: { hanzi: string; pinyin: string; translation: string };
  reading: { hanzi: string; pinyin: string; translation: string };
  vocabulary: TopicVocabulary[];
  characters: string[];
  videoTitle: string;
}

const topicSeeds: TopicSeed[] = [
  {
    stage: "Nền phát âm", topic: "Pinyin và bốn thanh điệu", shortTitle: "Thanh điệu", videoTitle: "Nghe bốn thanh điệu đầu tiên",
    grammar: { title: "Thanh điệu là một phần của từ", formula: "Âm tiết = thanh mẫu + vận mẫu + thanh điệu", explanation: "Cùng một pinyin nhưng thanh điệu khác nhau có thể tạo nghĩa khác. Hãy nghe trọn âm tiết rồi mới bắt chước.", positiveExample: "mā — má — mǎ — mà", commonMistake: "Đừng đọc bốn âm thành cùng một cao độ." },
    target: { hanzi: "妈，麻，马，骂。", pinyin: "Mā, má, mǎ, mà.", translation: "mẹ, cây gai, ngựa, mắng." },
    reading: { hanzi: "我听妈妈说：你好。", pinyin: "Wǒ tīng māma shuō: nǐ hǎo.", translation: "Tôi nghe mẹ nói: xin chào." },
    vocabulary: [["妈", "mā", "mẹ", "danh từ"], ["麻", "má", "cây gai", "danh từ"], ["马", "mǎ", "ngựa", "danh từ"], ["骂", "mà", "mắng", "động từ"], ["你", "nǐ", "bạn", "đại từ"], ["好", "hǎo", "tốt, khỏe", "tính từ"]], characters: ["一", "二", "三", "人", "口"],
  },
  {
    stage: "Nền phát âm", topic: "Chào hỏi và tự giới thiệu", shortTitle: "Chào hỏi", videoTitle: "Gặp một người bạn mới",
    grammar: { title: "Giới thiệu tên với 叫", formula: "Chủ ngữ + 叫 + tên", explanation: "叫 nghĩa là “tên là/gọi là”. Mẫu này đi thẳng từ chủ ngữ tới tên riêng.", positiveExample: "我叫安。", commonMistake: "Không cần nói 我是叫安。" },
    target: { hanzi: "你好，我叫安。", pinyin: "Nǐ hǎo, wǒ jiào Ān.", translation: "Xin chào, tôi tên An." },
    reading: { hanzi: "你好！我叫安。你叫什么名字？", pinyin: "Nǐ hǎo! Wǒ jiào Ān. Nǐ jiào shénme míngzi?", translation: "Xin chào! Tôi tên An. Bạn tên là gì?" },
    vocabulary: [["你好", "nǐ hǎo", "xin chào", "câu chào"], ["叫", "jiào", "tên là, gọi", "động từ"], ["名字", "míngzi", "tên", "danh từ"], ["我", "wǒ", "tôi", "đại từ"], ["您", "nín", "ngài, ông/bà", "đại từ"], ["老师", "lǎoshī", "giáo viên", "danh từ"]], characters: ["你", "好", "我", "叫", "名"],
  },
  {
    stage: "Nền giao tiếp", topic: "Số đếm, ngày giờ và lịch trình", shortTitle: "Ngày giờ", videoTitle: "Hẹn gặp lúc ba giờ",
    grammar: { title: "Thời gian đứng trước hành động", formula: "Chủ ngữ + thời gian + động từ", explanation: "Ở câu cơ bản, thời gian thường đặt sau chủ ngữ, trước động từ chính.", positiveExample: "我们下午三点见。", commonMistake: "Tránh đặt 下午三点 sau 见 trong câu cơ bản." },
    target: { hanzi: "我们下午三点见。", pinyin: "Wǒmen xiàwǔ sān diǎn jiàn.", translation: "Chúng ta gặp nhau lúc ba giờ chiều." },
    reading: { hanzi: "今天星期三。下午三点，我去学校。", pinyin: "Jīntiān xīngqīsān. Xiàwǔ sān diǎn, wǒ qù xuéxiào.", translation: "Hôm nay là thứ Tư. Lúc ba giờ chiều, tôi đi đến trường." },
    vocabulary: [["今天", "jīntiān", "hôm nay", "danh từ thời gian"], ["下午", "xiàwǔ", "buổi chiều", "danh từ thời gian"], ["点", "diǎn", "giờ", "danh từ thời gian"], ["见", "jiàn", "gặp", "động từ"], ["星期", "xīngqī", "tuần, thứ", "danh từ"], ["三", "sān", "ba", "số từ"]], characters: ["三", "点", "下", "午", "见"],
  },
  {
    stage: "Nền giao tiếp", topic: "Gia đình và giới thiệu người thân", shortTitle: "Gia đình", videoTitle: "Giới thiệu gia đình",
    grammar: { title: "Có với 有", formula: "Chủ ngữ + 有 + danh từ", explanation: "有 diễn tả sở hữu hoặc sự có mặt của người/vật.", positiveExample: "我有一个姐姐。", commonMistake: "Không dùng 是 thay cho 有 khi nói về sở hữu." },
    target: { hanzi: "我有一个姐姐。", pinyin: "Wǒ yǒu yí ge jiějie.", translation: "Tôi có một chị gái." },
    reading: { hanzi: "我家有四个人：爸爸、妈妈、姐姐和我。", pinyin: "Wǒ jiā yǒu sì ge rén: bàba, māma, jiějie hé wǒ.", translation: "Nhà tôi có bốn người: bố, mẹ, chị gái và tôi." },
    vocabulary: [["家", "jiā", "nhà, gia đình", "danh từ"], ["爸爸", "bàba", "bố", "danh từ"], ["妈妈", "māma", "mẹ", "danh từ"], ["姐姐", "jiějie", "chị gái", "danh từ"], ["个", "ge", "cái, người", "lượng từ"], ["有", "yǒu", "có", "động từ"]], characters: ["家", "爸", "妈", "姐", "有"],
  },
  {
    stage: "Sinh hoạt hằng ngày", topic: "Lịch buổi sáng", shortTitle: "Buổi sáng", videoTitle: "Một buổi sáng bận rộn",
    grammar: { title: "Trình tự thường ngày với 先…再…", formula: "先 + việc 1，再 + việc 2", explanation: "先…再… giúp kể hai hành động theo thứ tự rõ ràng.", positiveExample: "我先吃早饭，再上班。", commonMistake: "Đừng bỏ 再 nếu muốn nhấn mạnh bước thứ hai." },
    target: { hanzi: "我先吃早饭，再上班。", pinyin: "Wǒ xiān chī zǎofàn, zài shàngbān.", translation: "Tôi ăn sáng trước, rồi đi làm." },
    reading: { hanzi: "安七点起床。她先喝咖啡，再去公司。", pinyin: "Ān qī diǎn qǐchuáng. Tā xiān hē kāfēi, zài qù gōngsī.", translation: "An dậy lúc bảy giờ. Cô ấy uống cà phê trước, rồi đến công ty." },
    vocabulary: [["起床", "qǐchuáng", "thức dậy", "động từ"], ["早饭", "zǎofàn", "bữa sáng", "danh từ"], ["先", "xiān", "trước", "phó từ"], ["再", "zài", "sau đó", "phó từ"], ["上班", "shàngbān", "đi làm", "động từ"], ["公司", "gōngsī", "công ty", "danh từ"]], characters: ["早", "饭", "先", "再", "班"],
  },
  {
    stage: "Sinh hoạt hằng ngày", topic: "Trường lớp và công việc", shortTitle: "Học và làm", videoTitle: "Ở trường và công ty",
    grammar: { title: "Đang làm với 在", formula: "Chủ ngữ + 在 + động từ", explanation: "在 đặt trước động từ để nói hành động đang diễn ra.", positiveExample: "我在学习中文。", commonMistake: "Không dùng 是在 trong câu cơ bản này." },
    target: { hanzi: "我在学习中文。", pinyin: "Wǒ zài xuéxí Zhōngwén.", translation: "Tôi đang học tiếng Trung." },
    reading: { hanzi: "李明在学校学习。他晚上也在公司工作。", pinyin: "Lǐ Míng zài xuéxiào xuéxí. Tā wǎnshang yě zài gōngsī gōngzuò.", translation: "Lý Minh học ở trường. Buổi tối anh ấy cũng làm việc ở công ty." },
    vocabulary: [["学习", "xuéxí", "học", "động từ"], ["中文", "Zhōngwén", "tiếng Trung", "danh từ"], ["学校", "xuéxiào", "trường học", "danh từ"], ["工作", "gōngzuò", "làm việc", "động từ"], ["晚上", "wǎnshang", "buổi tối", "danh từ thời gian"], ["也", "yě", "cũng", "phó từ"]], characters: ["学", "习", "中", "文", "工"],
  },
  {
    stage: "Sinh hoạt hằng ngày", topic: "Địa điểm quanh ta", shortTitle: "Địa điểm", videoTitle: "Tìm quán cà phê gần đây",
    grammar: { title: "Vị trí với 在", formula: "Người/vật + 在 + địa điểm", explanation: "在 cũng dùng để nói một người hoặc vật đang ở đâu.", positiveExample: "咖啡店在银行旁边。", commonMistake: "Đừng đặt địa điểm lên đầu khi mới tập mẫu này." },
    target: { hanzi: "咖啡店在银行旁边。", pinyin: "Kāfēidiàn zài yínháng pángbiān.", translation: "Quán cà phê ở cạnh ngân hàng." },
    reading: { hanzi: "学校前面有一个书店。书店在医院旁边。", pinyin: "Xuéxiào qiánmiàn yǒu yí ge shūdiàn. Shūdiàn zài yīyuàn pángbiān.", translation: "Trước trường có một hiệu sách. Hiệu sách ở cạnh bệnh viện." },
    vocabulary: [["咖啡店", "kāfēidiàn", "quán cà phê", "danh từ"], ["银行", "yínháng", "ngân hàng", "danh từ"], ["旁边", "pángbiān", "bên cạnh", "phương vị từ"], ["前面", "qiánmiàn", "phía trước", "phương vị từ"], ["书店", "shūdiàn", "hiệu sách", "danh từ"], ["医院", "yīyuàn", "bệnh viện", "danh từ"]], characters: ["店", "银", "行", "旁", "边"],
  },
  {
    stage: "Ăn uống và mua sắm", topic: "Gọi món và sở thích", shortTitle: "Gọi món", videoTitle: "Gọi món ở quán ăn",
    grammar: { title: "Muốn với 想", formula: "Chủ ngữ + 想 + động từ/danh từ", explanation: "想 dùng khi nói điều mình muốn làm hoặc muốn dùng.", positiveExample: "我想喝一杯茶。", commonMistake: "Không cần lặp lại 想 trước từng món trong một câu ngắn." },
    target: { hanzi: "我想喝一杯茶。", pinyin: "Wǒ xiǎng hē yì bēi chá.", translation: "Tôi muốn uống một cốc trà." },
    reading: { hanzi: "服务员：你想吃什么？安：我想吃面，也想喝茶。", pinyin: "Fúwùyuán: Nǐ xiǎng chī shénme? Ān: Wǒ xiǎng chī miàn, yě xiǎng hē chá.", translation: "Nhân viên: Bạn muốn ăn gì? An: Tôi muốn ăn mì, cũng muốn uống trà." },
    vocabulary: [["想", "xiǎng", "muốn", "động từ"], ["喝", "hē", "uống", "động từ"], ["茶", "chá", "trà", "danh từ"], ["吃", "chī", "ăn", "động từ"], ["面", "miàn", "mì", "danh từ"], ["服务员", "fúwùyuán", "nhân viên phục vụ", "danh từ"]], characters: ["想", "喝", "茶", "吃", "面"],
  },
  {
    stage: "Ăn uống và mua sắm", topic: "Mua sắm, giá tiền và số lượng", shortTitle: "Mua sắm", videoTitle: "Mua áo trong cửa hàng",
    grammar: { title: "Hỏi giá với 多少钱", formula: "Danh từ + 多少钱？", explanation: "多少钱 dùng để hỏi giá tiền. Khi trả lời, số tiền đứng sau giá.", positiveExample: "这件衣服多少钱？", commonMistake: "Không cần thêm 是 trong câu hỏi giá đơn giản." },
    target: { hanzi: "这件衣服多少钱？", pinyin: "Zhè jiàn yīfu duōshao qián?", translation: "Chiếc áo này bao nhiêu tiền?" },
    reading: { hanzi: "这件红衣服一百块。安觉得有一点贵。", pinyin: "Zhè jiàn hóng yīfu yì bǎi kuài. Ān juéde yǒu yìdiǎn guì.", translation: "Chiếc áo đỏ này một trăm tệ. An thấy hơi đắt." },
    vocabulary: [["衣服", "yīfu", "quần áo", "danh từ"], ["多少", "duōshao", "bao nhiêu", "đại từ nghi vấn"], ["钱", "qián", "tiền", "danh từ"], ["件", "jiàn", "chiếc", "lượng từ"], ["块", "kuài", "tệ, đồng", "lượng từ"], ["贵", "guì", "đắt", "tính từ"]], characters: ["衣", "服", "钱", "件", "贵"],
  },
  {
    stage: "Cuộc sống và sở thích", topic: "Thời tiết và quần áo", shortTitle: "Thời tiết", videoTitle: "Chọn áo cho ngày mưa",
    grammar: { title: "Vì vậy với 所以", formula: "Lý do。 所以 + kết quả", explanation: "所以 nối một lý do dễ thấy với hành động hoặc kết quả phía sau.", positiveExample: "今天下雨，所以我带伞。", commonMistake: "Không đặt 所以 trước lý do." },
    target: { hanzi: "今天下雨，所以我带伞。", pinyin: "Jīntiān xiàyǔ, suǒyǐ wǒ dài sǎn.", translation: "Hôm nay mưa, vì vậy tôi mang ô." },
    reading: { hanzi: "今天天气很冷。小林穿了一件厚外套。", pinyin: "Jīntiān tiānqì hěn lěng. Xiǎo Lín chuān le yí jiàn hòu wàitào.", translation: "Hôm nay thời tiết rất lạnh. Tiểu Linh mặc một chiếc áo khoác dày." },
    vocabulary: [["天气", "tiānqì", "thời tiết", "danh từ"], ["下雨", "xiàyǔ", "mưa", "động từ"], ["伞", "sǎn", "ô, dù", "danh từ"], ["冷", "lěng", "lạnh", "tính từ"], ["穿", "chuān", "mặc", "động từ"], ["外套", "wàitào", "áo khoác", "danh từ"]], characters: ["天", "气", "雨", "伞", "冷"],
  },
  {
    stage: "Cuộc sống và sở thích", topic: "Sở thích và cuối tuần", shortTitle: "Cuối tuần", videoTitle: "Lên kế hoạch cuối tuần",
    grammar: { title: "Dự định với 打算", formula: "Chủ ngữ + 打算 + động từ", explanation: "打算 nói về dự định đã nghĩ đến cho tương lai gần.", positiveExample: "我打算周末看电影。", commonMistake: "Đừng dùng 打算 cho hành động đã hoàn thành." },
    target: { hanzi: "我打算周末看电影。", pinyin: "Wǒ dǎsuàn zhōumò kàn diànyǐng.", translation: "Tôi dự định xem phim vào cuối tuần." },
    reading: { hanzi: "这个周末，安打算和朋友去公园。她喜欢拍照片。", pinyin: "Zhège zhōumò, Ān dǎsuàn hé péngyou qù gōngyuán. Tā xǐhuan pāi zhàopiàn.", translation: "Cuối tuần này, An dự định đi công viên với bạn. Cô ấy thích chụp ảnh." },
    vocabulary: [["打算", "dǎsuàn", "dự định", "động từ"], ["周末", "zhōumò", "cuối tuần", "danh từ thời gian"], ["电影", "diànyǐng", "phim", "danh từ"], ["朋友", "péngyou", "bạn", "danh từ"], ["公园", "gōngyuán", "công viên", "danh từ"], ["照片", "zhàopiàn", "ảnh", "danh từ"]], characters: ["周", "末", "朋", "友", "园"],
  },
  {
    stage: "Sức khỏe và di chuyển", topic: "Cơ thể và triệu chứng nhẹ", shortTitle: "Sức khỏe", videoTitle: "Nói với bác sĩ về cơn đau đầu",
    grammar: { title: "Cảm thấy với 觉得", formula: "Chủ ngữ + 觉得 + tính từ/câu", explanation: "觉得 diễn tả cảm nhận cá nhân một cách lịch sự và rõ ràng.", positiveExample: "我觉得头有一点疼。", commonMistake: "Không dùng 很 trước 一点 trong mẫu này." },
    target: { hanzi: "我觉得头有一点疼。", pinyin: "Wǒ juéde tóu yǒu yìdiǎn téng.", translation: "Tôi thấy đầu hơi đau." },
    reading: { hanzi: "小王今天不舒服。他咳嗽，也有一点发烧。", pinyin: "Xiǎo Wáng jīntiān bù shūfu. Tā késou, yě yǒu yìdiǎn fāshāo.", translation: "Tiểu Vương hôm nay không khỏe. Anh ấy ho và cũng hơi sốt." },
    vocabulary: [["头", "tóu", "đầu", "danh từ"], ["疼", "téng", "đau", "tính từ"], ["不舒服", "bù shūfu", "không khỏe", "tính từ"], ["咳嗽", "késou", "ho", "động từ"], ["发烧", "fāshāo", "sốt", "động từ"], ["医生", "yīshēng", "bác sĩ", "danh từ"]], characters: ["头", "疼", "医", "生", "病"],
  },
  {
    stage: "Sức khỏe và di chuyển", topic: "Giao thông và hỏi đường", shortTitle: "Hỏi đường", videoTitle: "Đi tàu điện đến bảo tàng",
    grammar: { title: "Cách đi với 怎么走", formula: "Địa điểm + 怎么走？", explanation: "怎么走 là mẫu hỏi đường ngắn gọn, sau đó người nghe có thể chỉ phương tiện hoặc hướng đi.", positiveExample: "请问，地铁站怎么走？", commonMistake: "Đừng dùng 怎么去走 cùng lúc." },
    target: { hanzi: "请问，地铁站怎么走？", pinyin: "Qǐngwèn, dìtiě zhàn zěnme zǒu?", translation: "Xin hỏi, đi đến ga tàu điện thế nào?" },
    reading: { hanzi: "从这里一直走，地铁站在右边。坐两站就到了。", pinyin: "Cóng zhèlǐ yìzhí zǒu, dìtiě zhàn zài yòubiān. Zuò liǎng zhàn jiù dào le.", translation: "Từ đây đi thẳng, ga tàu điện ở bên phải. Đi hai trạm là tới." },
    vocabulary: [["请问", "qǐngwèn", "xin hỏi", "động từ"], ["地铁", "dìtiě", "tàu điện ngầm", "danh từ"], ["站", "zhàn", "ga, trạm", "lượng từ"], ["一直", "yìzhí", "thẳng", "phó từ"], ["右边", "yòubiān", "bên phải", "phương vị từ"], ["到", "dào", "đến", "động từ"]], characters: ["地", "铁", "站", "右", "边"],
  },
  {
    stage: "Du lịch và trải nghiệm", topic: "Khách sạn và đặt phòng", shortTitle: "Đặt phòng", videoTitle: "Nhận phòng ở khách sạn",
    grammar: { title: "Có thể với 可以", formula: "Chủ ngữ + 可以 + động từ", explanation: "可以 xin hoặc cho phép làm một việc, thường dùng lịch sự trong dịch vụ.", positiveExample: "我可以住两晚吗？", commonMistake: "Không dùng 可以 để nói năng lực bẩm sinh." },
    target: { hanzi: "我可以住两晚吗？", pinyin: "Wǒ kěyǐ zhù liǎng wǎn ma?", translation: "Tôi có thể ở hai đêm không?" },
    reading: { hanzi: "安订了一个房间。她明天晚上到酒店，住两晚。", pinyin: "Ān dìng le yí ge fángjiān. Tā míngtiān wǎnshang dào jiǔdiàn, zhù liǎng wǎn.", translation: "An đã đặt một phòng. Tối mai cô ấy đến khách sạn, ở hai đêm." },
    vocabulary: [["酒店", "jiǔdiàn", "khách sạn", "danh từ"], ["房间", "fángjiān", "phòng", "danh từ"], ["订", "dìng", "đặt", "động từ"], ["住", "zhù", "ở", "động từ"], ["晚", "wǎn", "đêm", "danh từ"], ["可以", "kěyǐ", "có thể", "động từ năng nguyện"]], characters: ["酒", "店", "房", "间", "住"],
  },
  {
    stage: "Du lịch và trải nghiệm", topic: "Du lịch và trải nghiệm đã qua", shortTitle: "Du lịch", videoTitle: "Kể về chuyến đi Bắc Kinh",
    grammar: { title: "Trải nghiệm với 过", formula: "Động từ + 过", explanation: "过 cho biết một trải nghiệm đã từng có, không nhấn vào thời điểm cụ thể.", positiveExample: "我去过北京。", commonMistake: "Không thêm 了 sau 过 khi chỉ nói trải nghiệm." },
    target: { hanzi: "我去过北京。", pinyin: "Wǒ qù guo Běijīng.", translation: "Tôi đã từng đến Bắc Kinh." },
    reading: { hanzi: "去年，安去过上海。她看了外滩，也吃了很多小吃。", pinyin: "Qùnián, Ān qù guo Shànghǎi. Tā kàn le Wàitān, yě chī le hěn duō xiǎochī.", translation: "Năm ngoái, An đã đến Thượng Hải. Cô ấy tham quan Bến Thượng Hải và cũng ăn nhiều món vặt." },
    vocabulary: [["去过", "qù guo", "đã từng đi", "động từ"], ["去年", "qùnián", "năm ngoái", "danh từ thời gian"], ["旅行", "lǚxíng", "du lịch", "động từ"], ["看", "kàn", "xem", "động từ"], ["小吃", "xiǎochī", "món ăn vặt", "danh từ"], ["很多", "hěn duō", "rất nhiều", "đại từ"]], characters: ["去", "过", "北", "京", "旅"],
  },
  {
    stage: "Học tập và công việc", topic: "Lịch học và năng lực", shortTitle: "Năng lực", videoTitle: "Trao đổi lịch học tiếng Hoa",
    grammar: { title: "Biết, có khả năng với 会", formula: "Chủ ngữ + 会 + động từ", explanation: "会 nói về kỹ năng học được hoặc khả năng sẽ thực hiện.", positiveExample: "我会说一点中文。", commonMistake: "Không nhầm 会 với 想 khi nói mong muốn." },
    target: { hanzi: "我会说一点中文。", pinyin: "Wǒ huì shuō yìdiǎn Zhōngwén.", translation: "Tôi biết nói một chút tiếng Trung." },
    reading: { hanzi: "小林会说中文和英语。他每天下午上中文课。", pinyin: "Xiǎo Lín huì shuō Zhōngwén hé Yīngyǔ. Tā měitiān xiàwǔ shàng Zhōngwén kè.", translation: "Tiểu Linh biết nói tiếng Trung và tiếng Anh. Mỗi chiều cô ấy học lớp tiếng Trung." },
    vocabulary: [["会", "huì", "biết, có thể", "động từ năng nguyện"], ["说", "shuō", "nói", "động từ"], ["一点", "yìdiǎn", "một chút", "đại từ"], ["英语", "Yīngyǔ", "tiếng Anh", "danh từ"], ["课", "kè", "lớp học", "danh từ"], ["每", "měi", "mỗi", "đại từ"]], characters: ["会", "说", "英", "语", "课"],
  },
  {
    stage: "Học tập và công việc", topic: "So sánh và ý kiến", shortTitle: "So sánh", videoTitle: "Chọn lớp học phù hợp",
    grammar: { title: "So sánh với 比", formula: "A + 比 + B + tính từ", explanation: "比 đặt giữa hai đối tượng để so sánh một đặc điểm.", positiveExample: "这个课比那个课难。", commonMistake: "Không thêm 很 ngay sau 比." },
    target: { hanzi: "这个课比那个课难。", pinyin: "Zhège kè bǐ nàge kè nán.", translation: "Lớp này khó hơn lớp kia." },
    reading: { hanzi: "安觉得坐地铁比坐出租车快，但是出租车更贵。", pinyin: "Ān juéde zuò dìtiě bǐ zuò chūzūchē kuài, dànshì chūzūchē gèng guì.", translation: "An thấy đi tàu điện nhanh hơn taxi, nhưng taxi đắt hơn." },
    vocabulary: [["比", "bǐ", "so với", "giới từ"], ["难", "nán", "khó", "tính từ"], ["快", "kuài", "nhanh", "tính từ"], ["但是", "dànshì", "nhưng", "liên từ"], ["更", "gèng", "càng, hơn", "phó từ"], ["出租车", "chūzūchē", "taxi", "danh từ"]], characters: ["比", "难", "快", "更", "贵"],
  },
  {
    stage: "Cấu trúc mở rộng", topic: "Kết quả và khả năng", shortTitle: "Kết quả", videoTitle: "Làm xong bài tập",
    grammar: { title: "Bổ ngữ kết quả 好", formula: "Động từ + 好", explanation: "好 sau động từ cho biết việc đã được làm xong hoặc chuẩn bị ổn thỏa.", positiveExample: "我写好了作业。", commonMistake: "Đừng nhầm 写好 với viết đẹp; ở đây là làm xong." },
    target: { hanzi: "我写好了作业。", pinyin: "Wǒ xiě hǎo le zuòyè.", translation: "Tôi đã làm xong bài tập." },
    reading: { hanzi: "小王已经准备好了。他拿好护照，就去机场。", pinyin: "Xiǎo Wáng yǐjīng zhǔnbèi hǎo le. Tā ná hǎo hùzhào, jiù qù jīchǎng.", translation: "Tiểu Vương đã chuẩn bị xong. Anh ấy cầm hộ chiếu rồi đi sân bay." },
    vocabulary: [["写", "xiě", "viết", "động từ"], ["作业", "zuòyè", "bài tập", "danh từ"], ["准备", "zhǔnbèi", "chuẩn bị", "động từ"], ["已经", "yǐjīng", "đã", "phó từ"], ["护照", "hùzhào", "hộ chiếu", "danh từ"], ["机场", "jīchǎng", "sân bay", "danh từ"]], characters: ["写", "好", "业", "准", "备"],
  },
  {
    stage: "Cấu trúc mở rộng", topic: "Nguyên nhân và điều kiện", shortTitle: "Lý do", videoTitle: "Đổi kế hoạch vì mưa",
    grammar: { title: "Điều kiện với 如果…就…", formula: "如果 + điều kiện，就 + kết quả", explanation: "Nếu một điều kiện xảy ra, 就 giới thiệu kết quả dự định.", positiveExample: "如果下雨，我们就不去公园。", commonMistake: "Đừng để 就 đứng trước 如果." },
    target: { hanzi: "如果下雨，我们就不去公园。", pinyin: "Rúguǒ xiàyǔ, wǒmen jiù bú qù gōngyuán.", translation: "Nếu mưa, chúng tôi sẽ không đi công viên." },
    reading: { hanzi: "明天如果不忙，安就去看朋友。因为她很想见小林。", pinyin: "Míngtiān rúguǒ bù máng, Ān jiù qù kàn péngyou. Yīnwèi tā hěn xiǎng jiàn Xiǎo Lín.", translation: "Nếu ngày mai không bận, An sẽ đi thăm bạn. Vì cô ấy rất muốn gặp Tiểu Linh." },
    vocabulary: [["如果", "rúguǒ", "nếu", "liên từ"], ["就", "jiù", "thì, sẽ", "phó từ"], ["因为", "yīnwèi", "bởi vì", "liên từ"], ["忙", "máng", "bận", "tính từ"], ["计划", "jìhuà", "kế hoạch", "danh từ"], ["改变", "gǎibiàn", "thay đổi", "động từ"]], characters: ["如", "果", "因", "为", "忙"],
  },
  {
    stage: "Kể chuyện và xử lý tình huống", topic: "Cảm xúc và sự cố thường ngày", shortTitle: "Sự cố", videoTitle: "Lỡ chuyến xe buýt",
    grammar: { title: "Vừa…thì… với 一…就…", formula: "一 + hành động 1，就 + hành động 2", explanation: "一…就… diễn tả hai việc xảy ra nối tiếp rất nhanh.", positiveExample: "我一到家就给你打电话。", commonMistake: "Không dùng 了 giữa 一 và động từ đầu." },
    target: { hanzi: "我一到家就给你打电话。", pinyin: "Wǒ yí dào jiā jiù gěi nǐ dǎ diànhuà.", translation: "Vừa về đến nhà tôi sẽ gọi điện cho bạn." },
    reading: { hanzi: "安今天坐错了公共汽车。她有一点着急，但是最后到了公司。", pinyin: "Ān jīntiān zuò cuò le gōnggòng qìchē. Tā yǒu yìdiǎn zháojí, dànshì zuìhòu dào le gōngsī.", translation: "Hôm nay An đi nhầm xe buýt. Cô ấy hơi sốt ruột, nhưng cuối cùng đã đến công ty." },
    vocabulary: [["着急", "zháojí", "sốt ruột", "tính từ"], ["公共汽车", "gōnggòng qìchē", "xe buýt", "danh từ"], ["错", "cuò", "sai", "tính từ"], ["最后", "zuìhòu", "cuối cùng", "danh từ"], ["电话", "diànhuà", "điện thoại", "danh từ"], ["到家", "dào jiā", "về đến nhà", "động từ"]], characters: ["急", "错", "最", "后", "电"],
  },
  {
    stage: "Kể chuyện và xử lý tình huống", topic: "Kể lại một ngày", shortTitle: "Kể chuyện", videoTitle: "Một ngày đáng nhớ",
    grammar: { title: "Trước…sau… với 先…然后…", formula: "先 + việc 1，然后 + việc 2", explanation: "然后 giúp nối nhiều hành động trong một câu chuyện theo trình tự.", positiveExample: "我先去银行，然后去超市。", commonMistake: "Không lặp lại 先 trước việc thứ hai." },
    target: { hanzi: "我先去银行，然后去超市。", pinyin: "Wǒ xiān qù yínháng, ránhòu qù chāoshì.", translation: "Tôi đến ngân hàng trước, sau đó đến siêu thị." },
    reading: { hanzi: "昨天上午，安先去医院看朋友，然后在附近吃午饭。", pinyin: "Zuótiān shàngwǔ, Ān xiān qù yīyuàn kàn péngyou, ránhòu zài fùjìn chī wǔfàn.", translation: "Sáng qua, An đến bệnh viện thăm bạn trước, sau đó ăn trưa gần đó." },
    vocabulary: [["昨天", "zuótiān", "hôm qua", "danh từ thời gian"], ["然后", "ránhòu", "sau đó", "liên từ"], ["超市", "chāoshì", "siêu thị", "danh từ"], ["附近", "fùjìn", "gần đây", "danh từ"], ["午饭", "wǔfàn", "bữa trưa", "danh từ"], ["故事", "gùshi", "câu chuyện", "danh từ"]], characters: ["昨", "然", "后", "超", "市"],
  },
  {
    stage: "Luyện dạng bài HSK3", topic: "Luyện nghe HSK3: ý chính", shortTitle: "Nghe ý chính", videoTitle: "Nghe thông báo ngắn",
    grammar: { title: "Làm rõ thông tin với 再", formula: "再 + động từ + 一遍", explanation: "再…一遍 dùng để đề nghị lặp lại một lần nữa khi chưa nghe rõ.", positiveExample: "请你再说一遍。", commonMistake: "Không dùng 又 khi yêu cầu người khác lặp lại." },
    target: { hanzi: "请你再说一遍。", pinyin: "Qǐng nǐ zài shuō yí biàn.", translation: "Bạn hãy nói lại một lần nữa." },
    reading: { hanzi: "通知：明天的中文课从九点改到十点。请大家准时来。", pinyin: "Tōngzhī: Míngtiān de Zhōngwén kè cóng jiǔ diǎn gǎi dào shí diǎn. Qǐng dàjiā zhǔnshí lái.", translation: "Thông báo: Lớp tiếng Trung ngày mai đổi từ 9 giờ sang 10 giờ. Mời mọi người đến đúng giờ." },
    vocabulary: [["通知", "tōngzhī", "thông báo", "danh từ"], ["改", "gǎi", "đổi", "động từ"], ["准时", "zhǔnshí", "đúng giờ", "tính từ"], ["一遍", "yí biàn", "một lượt", "lượng từ"], ["听清", "tīngqīng", "nghe rõ", "động từ"], ["问题", "wèntí", "câu hỏi", "danh từ"]], characters: ["通", "知", "改", "时", "问"],
  },
  {
    stage: "Luyện dạng bài HSK3", topic: "Luyện đọc HSK3: tìm ý chính", shortTitle: "Đọc ý chính", videoTitle: "Đọc biển thông báo",
    grammar: { title: "Chủ đề chính với 主要", formula: "…主要说…", explanation: "主要 giúp nêu ý chính của một đoạn đọc hoặc thông báo.", positiveExample: "这篇文章主要说什么？", commonMistake: "Không dùng 主要 thay cho 很 trong câu miêu tả." },
    target: { hanzi: "这篇文章主要说什么？", pinyin: "Zhè piān wénzhāng zhǔyào shuō shénme?", translation: "Bài viết này chủ yếu nói gì?" },
    reading: { hanzi: "图书馆周一到周五晚上九点关门，周末下午六点关门。", pinyin: "Túshūguǎn zhōuyī dào zhōuwǔ wǎnshang jiǔ diǎn guānmén, zhōumò xiàwǔ liù diǎn guānmén.", translation: "Thư viện đóng cửa lúc 9 giờ tối từ thứ Hai đến thứ Sáu, và 6 giờ chiều cuối tuần." },
    vocabulary: [["文章", "wénzhāng", "bài viết", "danh từ"], ["主要", "zhǔyào", "chủ yếu", "tính từ"], ["图书馆", "túshūguǎn", "thư viện", "danh từ"], ["关门", "guānmén", "đóng cửa", "động từ"], ["周一", "zhōuyī", "thứ Hai", "danh từ thời gian"], ["到", "dào", "đến", "giới từ"]], characters: ["文", "章", "主", "要", "馆"],
  },
  {
    stage: "Tổng ôn và thi thử", topic: "Tổng ôn điểm yếu", shortTitle: "Ôn điểm yếu", videoTitle: "Chọn nội dung cần ôn",
    grammar: { title: "Cần với 需要", formula: "Chủ ngữ + 需要 + động từ/danh từ", explanation: "需要 giúp nêu một điều cần làm trong kế hoạch ôn tập.", positiveExample: "我需要复习这些词。", commonMistake: "Không dùng 需要了 nếu chỉ đang nói nhu cầu chung." },
    target: { hanzi: "我需要复习这些词。", pinyin: "Wǒ xūyào fùxí zhèxiē cí.", translation: "Tôi cần ôn những từ này." },
    reading: { hanzi: "安听力不太好，所以她每天听十分钟中文。她也复习以前做错的问题。", pinyin: "Ān tīnglì bú tài hǎo, suǒyǐ tā měitiān tīng shí fēnzhōng Zhōngwén. Tā yě fùxí yǐqián zuò cuò de wèntí.", translation: "Kỹ năng nghe của An chưa tốt lắm, nên mỗi ngày cô ấy nghe tiếng Trung mười phút. Cô ấy cũng ôn các câu hỏi đã làm sai trước đây." },
    vocabulary: [["需要", "xūyào", "cần", "động từ"], ["复习", "fùxí", "ôn tập", "động từ"], ["听力", "tīnglì", "nghe hiểu", "danh từ"], ["以前", "yǐqián", "trước đây", "danh từ thời gian"], ["做错", "zuòcuò", "làm sai", "động từ"], ["分钟", "fēnzhōng", "phút", "lượng từ"]], characters: ["需", "要", "复", "习", "错"],
  },
  {
    stage: "Tổng ôn và thi thử", topic: "Thi thử và kế hoạch sau bài", shortTitle: "Thi thử", videoTitle: "Chuẩn bị vào phòng thi",
    grammar: { title: "Sau khi… với 以后", formula: "Động từ/cụm thời gian + 以后", explanation: "以后 giúp nói việc sẽ làm sau một thời điểm hoặc hoạt động.", positiveExample: "考试以后，我想休息一下。", commonMistake: "Không dùng 以后 để kể điều đã xong trong quá khứ nếu không có ngữ cảnh." },
    target: { hanzi: "考试以后，我想休息一下。", pinyin: "Kǎoshì yǐhòu, wǒ xiǎng xiūxi yíxià.", translation: "Sau khi thi, tôi muốn nghỉ một chút." },
    reading: { hanzi: "安今天做了一个练习考试。她先看错题，然后写下明天的复习计划。", pinyin: "Ān jīntiān zuò le yí ge liànxí kǎoshì. Tā xiān kàn cuòtí, ránhòu xiě xià míngtiān de fùxí jìhuà.", translation: "Hôm nay An làm một bài thi luyện. Cô ấy xem câu sai trước, sau đó viết kế hoạch ôn ngày mai." },
    vocabulary: [["考试", "kǎoshì", "kỳ thi", "danh từ"], ["练习", "liànxí", "luyện tập", "danh từ"], ["错题", "cuòtí", "câu sai", "danh từ"], ["计划", "jìhuà", "kế hoạch", "danh từ"], ["以后", "yǐhòu", "sau đó", "danh từ thời gian"], ["休息", "xiūxi", "nghỉ ngơi", "động từ"]], characters: ["考", "试", "练", "计", "划"],
  },
];

const activeTopicSeeds = topicSeeds.filter((seed) => seed.shortTitle !== "Địa điểm");

const sessionTemplates = [
  { prefix: "Ôn từ vựng", goal: "Nhận diện và dùng được từ trọng tâm trong câu ngắn." },
  { prefix: "Phát âm & nghe", goal: "Nghe câu theo chủ đề, phát hiện thông tin chính và đọc chậm theo mẫu." },
  { prefix: "Nói theo mẫu", goal: "Bắt chước một câu mục tiêu, ghi âm và tự đối chiếu nội dung." },
  { prefix: "Đọc & ngữ pháp", goal: "Đọc đoạn ngắn, tìm thông tin và vận dụng một cấu trúc câu." },
  { prefix: "Luyện viết", goal: "Luyện chữ Hán theo mẫu và hoàn thành một câu viết có hướng dẫn." },
  { prefix: "Tích hợp & kiểm tra", goal: "Kết hợp nghe, nói, đọc, viết trong một kiểm tra ngắn theo chủ đề." },
] as const;

const representativeAudio: Record<string, { src: string; hanzi: string; pinyin: string; translation: string }> = {
  "w01-s01": { src: "/manus-storage/hsk3-tones-week1_7582e15a.wav", hanzi: "妈，麻，马，骂。", pinyin: "Mā, má, mǎ, mà.", translation: "mẹ, cây gai, ngựa, mắng." },
  "w08-s02": { src: "/manus-storage/hsk3-week08-shopping_d397116d.wav", hanzi: "服务员：您好，这件红衣服一百块。安：有一点贵。请问，这件衣服多少钱？服务员：一百块。", pinyin: "Fúwùyuán: Nín hǎo, zhè jiàn hóng yīfu yì bǎi kuài. Ān: Yǒu yìdiǎn guì. Qǐngwèn, zhè jiàn yīfu duōshao qián? Fúwùyuán: Yì bǎi kuài.", translation: "Nhân viên: Chào bạn, chiếc áo đỏ này một trăm tệ. An: Hơi đắt. Xin hỏi chiếc áo này bao nhiêu tiền? Nhân viên: Một trăm tệ." },
  "w12-s02": { src: "/manus-storage/hsk3-week12-directions_3e9f7e18.wav", hanzi: "安：请问，地铁站怎么走？路人：从这里一直走，地铁站在右边。坐两站就到了。安：谢谢您。", pinyin: "Ān: Qǐngwèn, dìtiě zhàn zěnme zǒu? Lùrén: Cóng zhèlǐ yìzhí zǒu, dìtiě zhàn zài yòubiān. Zuò liǎng zhàn jiù dào le. Ān: Xièxie nín.", translation: "An: Xin hỏi, đi đến ga tàu điện thế nào? Người qua đường: Từ đây đi thẳng, ga ở bên phải. Đi hai trạm là tới. An: Cảm ơn ngài." },
  "w18-s02": { src: "/manus-storage/hsk3-week18-plan_f47b5c35.wav", hanzi: "小林：明天如果下雨，我们就不去公园。安：好，因为我也有一点忙。那我们在咖啡店见，好吗？小林：好。", pinyin: "Xiǎo Lín: Míngtiān rúguǒ xiàyǔ, wǒmen jiù bú qù gōngyuán. Ān: Hǎo, yīnwèi wǒ yě yǒu yìdiǎn máng. Nà wǒmen zài kāfēidiàn jiàn, hǎo ma? Xiǎo Lín: Hǎo.", translation: "Tiểu Linh: Nếu mai mưa, chúng ta không đi công viên. An: Được, vì tôi cũng hơi bận. Vậy ta gặp ở quán cà phê nhé? Tiểu Linh: Được." },
  "w24-s02": { src: "/manus-storage/hsk3-week24-review_12e3a519.wav", hanzi: "安：我今天做了一个练习考试。老师：做完以后，先看错题，再写下明天的复习计划。安：好的，我需要复习听力和阅读。", pinyin: "Ān: Wǒ jīntiān zuò le yí ge liànxí kǎoshì. Lǎoshī: Zuò wán yǐhòu, xiān kàn cuòtí, zài xiě xià míngtiān de fùxí jìhuà. Ān: Hǎo de, wǒ xūyào fùxí tīnglì hé yuèdú.", translation: "An: Hôm nay tôi đã làm một bài thi luyện. Giáo viên: Làm xong, hãy xem câu sai trước rồi ghi kế hoạch ôn ngày mai. An: Vâng, tôi cần ôn nghe và đọc." },
};

const characterHints: Record<string, string> = {
  "一": "Nét ngang từ trái sang phải.", "二": "Nét trên ngắn, nét dưới dài.", "三": "Ba nét ngang từ ngắn đến dài.", "人": "Nét phẩy trước, nét mác sau.", "口": "Khung ngoài mở trước, đóng sau.",
  "你": "Bộ nhân đứng ở trái; phần phải viết sau.", "好": "Nữ ở trái, tử ở phải.", "我": "Giữ các nét giữa cân trong khung chữ.", "叫": "Miệng ở trái, phần khung ở phải.", "名": "Phần tịch ở trên, khẩu ở dưới.",
};
const knownStrokes: Record<string, number> = { "一": 1, "二": 2, "三": 3, "人": 2, "口": 3, "你": 7, "好": 6, "我": 7, "叫": 5, "名": 6, "学": 8, "生": 5, "中": 4, "文": 4, "天": 4, "气": 4 };

function withTonePinyin(word: string): string { return word; }

function makeVocabulary(week: number, session: number, vocabulary: TopicVocabulary[]): VocabularyWord[] {
  return vocabulary.map(([hanzi, pinyin, meaning, partOfSpeech], index) => ({
    id: `w${String(week).padStart(2, "0")}-s${String(session).padStart(2, "0")}-v${String(index + 1).padStart(2, "0")}`,
    hanzi,
    pinyin: withTonePinyin(pinyin),
    meaning,
    partOfSpeech,
    example: index === 0 ? `我会用“${hanzi}”说一句话。` : `今天我学习“${hanzi}”。`,
    exampleMeaning: index === 0 ? `Tôi sẽ dùng “${meaning}” để nói một câu.` : `Hôm nay tôi học từ “${meaning}”.`,
  }));
}

function makeChoice(id: string, prompt: string, correct: string, distractors: string[], explanation: string): ChoiceQuestion {
  const all = [distractors[0], correct, distractors[1]].filter(Boolean);
  return { id, prompt, options: all.map((label, index) => ({ id: String.fromCharCode(97 + index), label })), answer: "b", explanation };
}

function makeLesson(seed: TopicSeed, week: number, session: number): Lesson {
  const id = `w${String(week).padStart(2, "0")}-s${String(session).padStart(2, "0")}`;
  const sessionTemplate = sessionTemplates[session - 1];
  const vocabulary = makeVocabulary(week, session, seed.vocabulary);
  const lessonSentences = [
    seed.target,
    { hanzi: `请听：${seed.target.hanzi}`, pinyin: `Qǐng tīng: ${seed.target.pinyin}`, translation: `Hãy nghe: ${seed.target.translation}` },
    { hanzi: `请说：${seed.target.hanzi}`, pinyin: `Qǐng shuō: ${seed.target.pinyin}`, translation: `Hãy nói: ${seed.target.translation}` },
    { hanzi: seed.reading.hanzi, pinyin: seed.reading.pinyin, translation: seed.reading.translation },
    { hanzi: `请写：${seed.target.hanzi}`, pinyin: `Qǐng xiě: ${seed.target.pinyin}`, translation: `Hãy viết: ${seed.target.translation}` },
    { hanzi: `请复习：${seed.target.hanzi}`, pinyin: `Qǐng fùxí: ${seed.target.pinyin}`, translation: `Hãy ôn lại: ${seed.target.translation}` },
  ];
  const lessonSentence = lessonSentences[session - 1];
  const grammarBySession = [
    { title: `Từ khóa: ${seed.grammar.title}`, formula: `Từ trọng tâm → ${seed.grammar.formula}`, explanation: `Nhìn vào các từ trọng tâm trước khi áp dụng cấu trúc. ${seed.grammar.explanation}` },
    { title: `Nghe nhịp câu: ${seed.grammar.title}`, formula: `Nghe → ngắt nhịp → ${seed.grammar.formula}`, explanation: `Nghe câu theo từng nhịp ngắn để nhận ra cấu trúc. ${seed.grammar.explanation}` },
    { title: `Nói theo mẫu: ${seed.grammar.title}`, formula: `Mẫu nói → ${seed.grammar.formula}`, explanation: `Nói trọn cụm rồi mới chú ý từng từ. ${seed.grammar.explanation}` },
    seed.grammar,
    { title: `Viết đúng trật tự: ${seed.grammar.title}`, formula: `Khung câu → ${seed.grammar.formula}`, explanation: `Sắp xếp các thành phần trước khi gõ câu. ${seed.grammar.explanation}` },
    { title: `Tự kiểm: ${seed.grammar.title}`, formula: `Tự kiểm → ${seed.grammar.formula}`, explanation: `Đối chiếu lại mẫu câu sau khi làm bài tích hợp. ${seed.grammar.explanation}` },
  ][session - 1];
  const sentenceTask = { prompt: `${sessionTemplate.prefix}: sắp xếp thành câu theo chủ đề “${seed.shortTitle}”.`, wordBank: lessonSentence.hanzi.replace(/[，。！？、：]/g, "").match(/.{1}/g) ?? [], answer: lessonSentence.hanzi.replace(/[，。！？、：]/g, ""), explanation: `Câu mẫu đúng là: ${lessonSentence.hanzi}` };
  const fileAudio = representativeAudio[id];
  const audioScript = fileAudio ?? lessonSentence;
  const questionOne = makeChoice(`${id}-l1`, ["Ý chính câu nghe là gì?", "Người nói đang yêu cầu điều gì?", "Câu nào khớp với audio?", "Thông tin nào có trong audio?", "Câu nghe mô tả điều gì?", "Sau khi nghe, hãy chọn ý đúng."][session - 1], audioScript.translation, ["Đang hỏi giá tiền.", "Đang hỏi đường."], `Đáp án dựa trực tiếp vào câu nghe: ${audioScript.hanzi}`);
  const questionTwo = makeChoice(`${id}-l2`, ["Từ/cụm nào xuất hiện trong câu nghe?", "Từ trọng tâm nào bạn nghe được?", "Câu nghe có nhắc đến từ nào?", "Hãy chọn từ thuộc câu nghe.", "Từ nào nên được nhấn khi nghe?", "Từ nào xuất hiện khi ôn lại audio?"][session - 1], seed.vocabulary[0][0], [seed.vocabulary[2][0], seed.vocabulary[4][0]], `Câu nghe có từ ${seed.vocabulary[0][0]} (${seed.vocabulary[0][1]}).`);
  const readingQuestionOne = makeChoice(`${id}-r1`, ["Đoạn đọc chủ yếu nói về điều gì?", "Người trong đoạn đang làm gì?", "Thông tin chính của đoạn là gì?", "Chi tiết nào đúng theo đoạn?", "Đoạn cho biết điều gì?", "Hãy chọn tóm tắt phù hợp nhất."][session - 1], seed.reading.translation, ["Một hoạt động không liên quan.", "Một câu chuyện ở chủ đề khác."], `Hãy đối chiếu ý chính của đoạn: ${seed.reading.hanzi}`);
  const readingQuestionTwo = makeChoice(`${id}-r2`, ["Từ nào trong đoạn thuộc chủ đề bài học?", "Từ trọng tâm nào giúp hiểu đoạn?", "Từ nào bạn có thể tìm thấy trong ngữ cảnh?", "Chi tiết từ vựng nào đúng?", "Từ nào nên đánh dấu để ôn?", "Từ nào khớp với chủ đề tuần?"][session - 1], seed.vocabulary[1][0], [seed.vocabulary[3][0], seed.vocabulary[5][0]], `Từ ${seed.vocabulary[1][0]} nằm trong nhóm từ trọng tâm của tuần.`);
  const characters = seed.characters.slice(0, 5).map((character) => ({ character, strokes: knownStrokes[character], hint: characterHints[character] ?? "Quan sát bố cục, viết từng phần từ trên xuống và trái sang phải." }));

  return {
    id, week, session, stage: seed.stage, title: `${sessionTemplate.prefix}: ${seed.topic}`, shortTitle: seed.shortTitle, duration: 60,
    goal: sessionTemplate.goal,
    warmup: session === 1 ? `Nhìn nhanh các từ của chủ đề ${seed.shortTitle} và đoán nghĩa trước khi mở pinyin.` : `Đọc chậm câu “${seed.target.hanzi}” một lần, sau đó chọn một từ bạn muốn ôn lại.`,
    chinese: lessonSentence.hanzi, pinyin: lessonSentence.pinyin, translation: lessonSentence.translation,
    grammar: { title: grammarBySession.title, formula: grammarBySession.formula, explanation: grammarBySession.explanation, positiveExample: "positiveExample" in grammarBySession ? grammarBySession.positiveExample : seed.grammar.positiveExample, commonMistake: "commonMistake" in grammarBySession ? grammarBySession.commonMistake : seed.grammar.commonMistake },
    vocabulary,
    listening: { audioSrc: fileAudio?.src ?? null, transcript: audioScript.hanzi, pinyin: audioScript.pinyin, translation: audioScript.translation, questions: [questionOne, questionTwo] },
    speaking: { target: lessonSentence.hanzi, pinyin: lessonSentence.pinyin, translation: lessonSentence.translation, scenario: `Buổi ${session}: ${seed.videoTitle.toLowerCase()}. Hãy nói câu mẫu chậm, rõ và theo đúng ngữ cảnh.`, checkpoints: ["Nghe câu mẫu một lượt.", "Ghi âm hoặc tự nhập transcript.", "Đối chiếu những từ còn thiếu/dư."] },
    reading: { passage: seed.reading.hanzi, pinyin: seed.reading.pinyin, translation: seed.reading.translation, hints: seed.vocabulary.slice(0, 3).map(([hanzi, pinyin, meaning]) => ({ hanzi, pinyin, meaning })), questions: [readingQuestionOne, readingQuestionTwo] },
    writing: { characters, sentenceTask }, writingCharacters: characters,
    media: { audioId: `audio-${id}`, videoId: `week-${String(week).padStart(2, "0")}`, posterSrc: week === 8 ? "/manus-storage/week08-shopping-poster_0973a7ef.jpg" : null, videoSrc: week === 8 ? "/manus-storage/week08-shopping-scene-1_2d65c2bf.mp4" : null, captionsSrc: week === 8 ? "/manus-storage/week08-shopping_b5eb9f94.vtt" : null },
  };
}

export const lessons: Lesson[] = activeTopicSeeds.flatMap((seed, index) => Array.from({ length: 6 }, (_, sessionIndex) => makeLesson(seed, index + 1, sessionIndex + 1)));
/** @deprecated Giữ alias để các component chưa refactor vẫn tham chiếu đúng catalog 144 lesson. */
export const sampleLessons = lessons;

export const audioManifest = lessons.map((lesson) => ({
  id: lesson.media.audioId,
  lessonId: lesson.id,
  source: lesson.listening.audioSrc,
  status: lesson.listening.audioSrc ? "available" as const : "planned" as const,
  transcript: lesson.listening.transcript,
  pinyin: lesson.listening.pinyin,
  translation: lesson.listening.translation,
  rights: lesson.listening.audioSrc ? "Tạo gốc cho Hoa Ngữ 180 Ngày." : "Kịch bản gốc đã biên soạn; clip audio tệp đang chờ sản xuất. SpeechSynthesis chỉ là fallback theo thiết bị.",
}));

export const videoManifest: VideoContext[] = activeTopicSeeds.map((seed, index) => {
  const week = index + 1;
  const representative = [1, 8, 12, 18, 24].includes(week);
  return {
    id: `week-${String(week).padStart(2, "0")}`,
    week,
    title: seed.videoTitle,
    durationSeconds: week === 8 ? 8 : 42,
    posterSrc: week === 8 ? "/manus-storage/week08-shopping-poster_0973a7ef.jpg" : null,
    videoSrc: week === 8 ? "/manus-storage/week08-shopping-scene-1_2d65c2bf.mp4" : null,
    captionsSrc: week === 8 ? "/manus-storage/week08-shopping_b5eb9f94.vtt" : null,
    captionsText: week === 8 ? "您好，这件红衣服一百块。\n有一点贵。\n请问，这件衣服多少钱？" : seed.target.hanzi,
    transcript: { hanzi: seed.target.hanzi, pinyin: seed.target.pinyin, translation: seed.target.translation },
    question: makeChoice(`video-w${week}`, "Trong video tình huống, người học nên chú ý điều gì?", seed.target.translation, ["Một chủ đề không liên quan.", "Một địa điểm không xuất hiện."], `Video mở bối cảnh cho câu: ${seed.target.hanzi}`),
    status: week === 8 ? "available" : "planned",
    rights: week === 8 ? "Video và phụ đề tạo gốc cho Hoa Ngữ 180 Ngày; bối cảnh ngắn dùng làm mở tình huống." : representative ? "Kịch bản và phụ đề gốc đã sẵn sàng cho sản xuất video đại diện ở phương án A." : "Kịch bản và phụ đề gốc đã sẵn sàng; video tệp chờ sản xuất.",
  };
});

export const roadmapWeeks = activeTopicSeeds.map((seed, index) => {
  const week = index + 1;
  return { week, stage: seed.stage, focus: seed.topic, videoId: `week-${String(week).padStart(2, "0")}`, lessons: lessons.filter((lesson) => lesson.week === week).map((lesson) => ({ id: lesson.id, session: lesson.session, title: lesson.title, goal: lesson.goal, duration: lesson.duration })) };
});

export const courseOutline = activeTopicSeeds.map((seed) => seed.topic);
export const getAllVocabulary = (): VocabularyWord[] => lessons.flatMap((lesson) => lesson.vocabulary);
export const getLessonById = (id: string | null | undefined): Lesson | undefined => lessons.find((lesson) => lesson.id === id);
export const getVideoByWeek = (week: number): VideoContext | undefined => videoManifest.find((video) => video.week === week);
