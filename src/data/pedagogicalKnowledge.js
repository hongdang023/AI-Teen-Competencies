// Comprehensive Pedagogical Knowledge Base & CBE Continuum Rubrics Engine
// Simba Competencies System — Standardized across 9 Domains and 333 Parent Skills

export const DOMAIN_PEDAGOGICAL_THEMES = {
  'domain-generative-ai': {
    theme_vi: 'Làm chủ công nghệ Trí tuệ Nhân tạo Sinh (GenAI), kiểm soát bẫy ảo giác, tối ưu hóa câu lệnh đa tầng và ứng dụng AI tự chủ vào việc hoàn thiện các sản phẩm số thực tế.',
    theme_en: 'Master Generative AI, eliminate hallucinations, optimize multi-turn prompts, and independently leverage AI to build authentic digital products.'
  },
  'domain-customer-understanding': {
    theme_vi: 'Thấu cảm sâu sắc nỗi đau người dùng, phỏng vấn thực tế, mô hình hóa hành vi và kiến tạo giải pháp chạm đúng nhu cầu cốt lõi qua 12 sản phẩm số.',
    theme_en: 'Cultivate deep empathy, conduct authentic user interviews, model behavioral journeys, and deliver core value through 12 micro digital products.'
  },
  'domain-digital-product-development': {
    theme_vi: 'Làm chủ tư duy kiến trúc phần mềm, thiết kế trải nghiệm người dùng trực quan, lập trình giao diện hiện đại và triển khai sản phẩm số hoàn chỉnh trên Internet.',
    theme_en: 'Master software architecture, intuitive UX design, modern frontend development, and ship live digital products to the web.'
  },
  'domain-learning': {
    theme_vi: 'Xây dựng năng lực tự học siêu tốc, phản tư đa tầng (4F), tổng hợp tri thức có hệ thống và phát triển tư duy hiếu tri bền vững trong kỷ nguyên AI.',
    theme_en: 'Build accelerated self-directed learning, 4F reflection habits, systemic knowledge synthesis, and lifelong intellectual curiosity.'
  },
  'domain-problem-solving-decision-making': {
    theme_vi: 'Phân tích nguyên nhân gốc rễ (5 Whys), mô hình hóa hệ thống, đánh giá các yếu tố đánh đổi và ra quyết định dựa trên bằng chứng thực nghiệm.',
    theme_en: 'Diagnose root causes (5 Whys), model systemic feedback loops, evaluate trade-offs, and make evidence-based decisions.'
  },
  'domain-project-management': {
    theme_vi: 'Tổ chức phân rã công việc (WBS), quản trị tiến độ theo chu kỳ Sprint, kiểm soát rủi ro và phối hợp nhịp nhàng trong đội ngũ dự án công nghệ.',
    theme_en: 'Deconstruct deliverables (WBS), track sprint milestones, mitigate risks, and orchestrate smooth team workflows.'
  },
  'domain-core-cognitive': {
    theme_vi: 'Rèn luyện tư duy phản biện sắc bén, nhận diện ngụy biện logic, tư duy từ nguyên lý đầu tiên (First Principles) và làm chủ siêu nhận thức.',
    theme_en: 'Sharpen critical thinking, detect logical fallacies, reason from first principles, and command metacognitive regulation.'
  },
  'domain-entrepreneurship': {
    theme_vi: 'Kiến tạo mô hình kinh doanh tinh gọn, thử nghiệm nhanh sản phẩm khả dụng tối thiểu (MVP), đo lường chỉ số tăng trưởng và tạo giá trị bền vững.',
    theme_en: 'Architect lean business models, rapidly validate MVPs, track growth metrics, and build enduring market value.'
  },
  'domain-personal-effectiveness': {
    theme_vi: 'Quản trị thời gian tập trung sâu (Deep Work), kiểm soát cảm xúc trong áp lực, giữ trọn cam kết và theo đuổi chất lượng sản phẩm xuất sắc.',
    theme_en: 'Master deep work timeboxing, emotional self-regulation, rock-solid accountability, and relentless craftsmanship.'
  }
};

// Skill-specific definitions with 100% authentic pedagogical content (Zero generic templates)
export const SKILL_PEDAGOGICAL_DATABASE = [
  // ==========================================
  // 1. GENERATIVE AI (GenAI)
  // ==========================================
  {
    patterns: ['transformer', 'architecture', 'kiến trúc', 'next-token', 'sinh từ'],
    domain: 'domain-generative-ai',
    name_vi: 'Hiểu nguyên lý cấu trúc Transformer & sinh từ',
    name_en: 'Transformer Architecture & Next-Token Mechanics',
    guidingQuestion_vi: 'Làm thế nào để con hiểu bản chất mô hình ngôn ngữ lớn (LLM) dự đoán từ tiếp theo và khai thác sức mạnh đó để ra lệnh chính xác cho AI?',
    guidingQuestion_en: 'How well can I understand how LLMs predict next tokens and harness that mechanics to accurately direct AI outputs?',
    desc_vi: 'Hiểu cách AI học từ hàng triệu bài viết để đoán từ tiếp theo, nhận thức rõ AI không phải thần thánh mà là cỗ máy dự đoán ngôn ngữ.',
    desc_en: 'Understand that LLMs calculate statistical word distributions, using structured prompting to guide text generation.',
    skillRole: 'primary',
    targetLevel: 2,
    rubricLevels: [
      {
        level: 1,
        indicators: [
          'Con có thể hiểu và giải thích được AI hoạt động bằng cách dự đoán từng từ tiếp theo (Next-token prediction) dựa trên xác suất thống kê.',
          'Con có thể nhận diện được AI không có suy nghĩ hay cảm xúc thực sự, và không phụ thuộc tuyệt đối vào câu trả lời đầu tiên của AI.'
        ]
      },
      {
        level: 2,
        indicators: [
          'Con có thể cấu trúc câu lệnh theo khung chuẩn (Role - Context - Task - Constraint) để định hướng luồng sinh từ của AI.',
          'Con có thể lặp lại và tinh chỉnh câu lệnh (Iterative Prompting) tối thiểu 2 lần khi AI sinh kết quả chưa đúng mong đợi.',
          'Con có thể tự đóng gói được thư viện prompt mẫu chuẩn (SP4 Prompt Cookbook) để tái sử dụng cho các bài tập thực hành.'
        ]
      },
      {
        level: 3,
        indicators: [
          'Con có thể giải thích trực quan cho Mentor hoặc bạn bè về cơ chế Self-Attention và cách AI liên kết các từ trong ngữ cảnh dài.',
          'Con có thể điều chỉnh tham số hoặc cấu trúc câu lệnh để kiểm soát độ sáng tạo (Temperature) và phong cách hành văn của AI.'
        ]
      },
      {
        level: 4,
        indicators: [
          'Con có thể thiết kế các luồng prompt đa tầng phức tạp (Socratic Prompting) biến AI thành gia sư sư phạm gợi mở tư duy.',
          'Con có thể tự động hóa quy trình phân tích và tối ưu hóa token prompt cho các ứng dụng chatbot AI quy mô lớn.'
        ]
      },
      {
        level: 5,
        indicators: [
          'Con có thể làm chủ kiến trúc Transformer để xây dựng các giải pháp tự động hóa AI đa tác nhân hoàn chỉnh.',
          'Con có thể chuyển giao tri thức và hướng dẫn học sinh khác hiểu đúng bản chất công nghệ AI mà không bị ảo tưởng.'
        ]
      }
    ],
    evidence: 'Bộ Prompt Cookbook (SP4) gồm 5+ prompt chuẩn cấu trúc; Nhật ký prompt thể hiện tối thiểu 2 vòng tinh chỉnh lặp lại.'
  },
  {
    patterns: ['limitation', 'giới hạn', 'hallucination', 'ảo giác', 'bias', 'thiên kiến'],
    domain: 'domain-generative-ai',
    name_vi: 'Nhận diện giới hạn & ảo giác của mô hình AI',
    name_en: 'Model Limitations & Hallucination Detection',
    guidingQuestion_vi: 'Làm thế nào để con luôn giữ tư duy phản biện, phát hiện lỗi ảo giác của AI và kiểm chứng chéo trước khi xuất bản sản phẩm?',
    guidingQuestion_en: 'How well can I maintain critical thinking, spot AI hallucinations, and cross-verify facts before publishing products?',
    desc_vi: 'Nhận biết khi nào AI tự bịa thông tin sai sự thật và luôn có thói quen kiểm chứng chéo với nguồn tin cậy trước khi áp dụng.',
    desc_en: 'Detect when AI fabricates facts, consistently cross-verifying outputs with trustworthy sources.',
    skillRole: 'primary',
    targetLevel: 2,
    rubricLevels: [
      {
        level: 1,
        indicators: [
          'Con có thể hiểu được AI có thể bịa chuyện (ảo giác / hallucination) và không bao giờ copy bài mù quáng.',
          'Con có thể nhận ra khi AI trả lời một thông tin đáng ngờ và đặt câu hỏi nghi vấn để kiểm tra lại.'
        ]
      },
      {
        level: 2,
        indicators: [
          'Con có thể chủ động kiểm chứng chéo thông tin AI sinh ra với Google Search, tài liệu học tập hoặc sách giáo khoa.',
          'Con có thể viết câu lệnh ràng buộc nghiêm ngặt (ví dụ: "Chỉ trả lời dựa trên tài liệu đính kèm, nếu không có hãy nói không biết").',
          'Con có thể nạp tài liệu tin cậy vào công cụ AI (như SP6 NotebookLM) để ép AI trích dẫn chính xác nguồn.'
        ]
      },
      {
        level: 3,
        indicators: [
          'Con có thể thiết kế bài kiểm tra thử nghiệm (Stress-test Prompt) để kiểm tra xem hệ thống AI có bị bẫy ảo giác không.',
          'Con có thể xây dựng quy trình tự động đối chiếu dữ liệu giữa nhiều nguồn LLM khác nhau để xác nhận tính chính xác.'
        ]
      },
      {
        level: 4,
        indicators: [
          'Con có thể tích hợp cơ chế cảnh báo độ tin cậy và trích dẫn nguồn minh bạch (Transparency Disclaimer) vào sản phẩm web SP12.',
          'Con có thể giảng giải và hướng dẫn bạn bè trong lớp cách phòng ngừa và phát hiện thông tin giả do AI tạo ra.'
        ]
      },
      {
        level: 5,
        indicators: [
          'Con có thể xây dựng hệ thống kiểm tra sự thật tự động (Automated Fact-Checking Pipeline) cho các sản phẩm dữ liệu lớn.',
          'Con có thể đóng vai trò thẩm định viên độc lập về độ chính xác và tính trung thực của các nội dung do AI tạo ra.'
        ]
      }
    ],
    evidence: 'Bản đối chiếu thông tin thật vs thông tin AI sinh ra trong SP6 (NotebookLM); Ràng buộc chống ảo giác có trong code SP10 & SP12.'
  },
  {
    patterns: ['context window', 'ngữ cảnh', 'chunking', 'bộ nhớ', 'memory'],
    domain: 'domain-generative-ai',
    name_vi: 'Quản trị cửa sổ ngữ cảnh & Chunking dữ liệu',
    name_en: 'Context Window & Memory Management',
    guidingQuestion_vi: 'Làm thế nào để con cung cấp bối cảnh ngắn gọn, chính xác để AI ghi nhớ đúng mục tiêu dự án mà không bị tràn bộ nhớ?',
    guidingQuestion_en: 'How well can I seed concise, structured context so AI retains core project memory without attention drift?',
    desc_vi: 'Biết cách cung cấp thông tin nền đầy đủ, súc tích để AI hiểu đúng ngữ cảnh và không bị "quên" nội dung quan trọng trước đó.',
    desc_en: 'Provide structured background context efficiently so AI retains essential project state without degradation.',
    skillRole: 'primary',
    targetLevel: 2,
    rubricLevels: [
      {
        level: 1,
        indicators: [
          'Con có thể hiểu được khái niệm "bộ nhớ tạm" của AI và nhận biết khi đoạn chat quá dài AI sẽ bắt đầu quên yêu cầu ban đầu.',
          'Con có thể chủ động mở một đoạn hội thoại mới (New Chat) khi muốn chuyển sang làm một chủ đề hoặc nhiệm vụ hoàn toàn khác.'
        ]
      },
      {
        level: 2,
        indicators: [
          'Con có thể tóm tắt các quyết định quan trọng của phiên làm việc trước và nạp lại vào phiên chat mới (Context Seeding).',
          'Con có thể tổ chức dữ liệu đầu vào thành các đoạn có cấu trúc phân tầng (tiêu đề, khối dữ liệu) để AI dễ nắm bắt.',
          'Con có thể lược bỏ các chi tiết thừa, mã rác trước khi đưa tài liệu vào khung chat của AI.'
        ]
      },
      {
        level: 3,
        indicators: [
          'Con có thể thiết kế các chiến lược phân đoạn tài liệu dài (Chunking) để vượt qua giới hạn độ dài của cửa sổ ngữ cảnh.',
          'Con có thể tối ưu vị trí đặt thông tin quan trọng (ở đầu và cuối prompt) để tránh hiện tượng AI "quên nội dung ở giữa".'
        ]
      },
      {
        level: 4,
        indicators: [
          'Con có thể thiết lập kiến trúc nhớ dài hạn (External Memory / Vector Store) cho chatbot và trợ lý ảo.',
          'Con có thể tối ưu hóa lượng token tiêu thụ trong các luồng tương tác tự động đa tác nhân.'
        ]
      },
      {
        level: 5,
        indicators: [
          'Con có thể làm chủ kiến trúc RAG (Retrieval-Augmented Generation) để mở rộng vô hạn tri thức cho trợ lý AI.',
          'Con có thể xây dựng các quy chuẩn quản trị ngữ cảnh cho toàn bộ dự án phần mềm phức tạp.'
        ]
      }
    ],
    evidence: 'Nhật ký chat thể hiện việc nạp bối cảnh theo từng bước logic; Cấu trúc tài liệu sạch trong SP6 và SP8.'
  },
  {
    patterns: ['privacy', 'bảo mật', 'responsible', 'trách nhiệm', 'đạo đức', 'ethics'],
    domain: 'domain-generative-ai',
    name_vi: 'Sử dụng AI có trách nhiệm & Bảo mật dữ liệu',
    name_en: 'Responsible AI & Data Privacy Ethics',
    guidingQuestion_vi: 'Làm thế nào để con bảo vệ dữ liệu nhạy cảm của bản thân và tôn trọng bản quyền số khi làm việc cùng AI?',
    guidingQuestion_en: 'How well can I safeguard sensitive personal data and practice digital attribution ethics with AI?',
    desc_vi: 'Bảo vệ an toàn thông tin cá nhân (không đưa mật khẩu, địa chỉ, số điện thoại lên AI) và tôn trọng bản quyền số.',
    desc_en: 'Protect sensitive personal identifiable information and honor copyright attribution when building products.',
    skillRole: 'primary',
    targetLevel: 2,
    rubricLevels: [
      {
        level: 1,
        indicators: [
          'Con có thể nhận biết được các thông tin nhạy cảm (mật khẩu, số CCCD, địa chỉ nhà, số điện thoại) và không chia sẻ cho AI.',
          'Con có thể tôn trọng bản quyền số, không yêu cầu AI sao chép nguyên văn tác phẩm có bản quyền của người khác.'
        ]
      },
      {
        level: 2,
        indicators: [
          'Con có thể chủ động ẩn danh hóa (Anonymize) thông tin cá nhân của người thân/bạn bè trước khi đưa vào dữ liệu huấn luyện hoặc chat.',
          'Con có thể ghi rõ nguồn gốc (Attribution Disclaimer) khi sử dụng hình ảnh hoặc văn bản do AI hỗ trợ tạo ra trên sản phẩm web.',
          'Con có thể nhận diện được các thiên kiến (Bias) và định kiến xã hội tiềm ẩn trong câu trả lời của AI để yêu cầu chỉnh sửa khách quan.'
        ]
      },
      {
        level: 3,
        indicators: [
          'Con có thể đánh giá rủi ro bảo mật dữ liệu khi kết nối các API AI bên thứ ba vào ứng dụng web cá nhân.',
          'Con có thể soạn thảo chính sách bảo mật (Privacy Policy) minh bạch cho người dùng cuối trên sản phẩm của mình.'
        ]
      },
      {
        level: 4,
        indicators: [
          'Con có thể thiết lập các bộ lọc an toàn nội dung (Content Moderation Filters) ngăn chặn mã độc hại hoặc ngôn từ không phù hợp.',
          'Con có thể chia sẻ kiến thức sử dụng công nghệ nhân văn và có đạo đức cho cộng đồng học sinh tại trường.'
        ]
      },
      {
        level: 5,
        indicators: [
          'Con có thể dẫn dắt các sáng kiến cộng đồng về đạo đức AI và an toàn thông tin số trong trường học.',
          'Con có thể thiết kế các tiêu chuẩn kiểm thử đạo đức (Ethical AI Framework) cho các sản phẩm phần mềm dành cho thanh thiếu niên.'
        ]
      }
    ],
    evidence: 'Trang Chính sách Bảo mật (Privacy Policy) và Disclaimer bản quyền số hiển thị đầy đủ trên SP1, SP6 và SP12.'
  },
  {
    patterns: ['prompt', 'few-shot', 'chain-of-thought', 'cot', 'clarifying', 'câu lệnh'],
    domain: 'domain-generative-ai',
    name_vi: 'Kỹ thuật thiết kế câu lệnh có cấu trúc & CoT',
    name_en: 'Structured Prompt Engineering & CoT',
    guidingQuestion_vi: 'Làm thế nào để con thiết kế câu lệnh chi tiết, có ví dụ mẫu (Few-shot) và tư duy từng bước (Chain-of-Thought) để AI giải quyết bài toán phức tạp?',
    guidingQuestion_en: 'How well can I architect detailed prompts with Few-shot examples and Chain-of-Thought reasoning to solve complex challenges?',
    desc_vi: 'Làm chủ các kỹ thuật thiết kế câu lệnh từ cơ bản đến nâng cao để khai thác tối đa năng suất của các mô hình AI.',
    desc_en: 'Master structured prompting techniques from standard framing to Few-shot and Chain-of-Thought reasoning.',
    skillRole: 'primary',
    targetLevel: 2,
    rubricLevels: [
      {
        level: 1,
        indicators: [
          'Con có thể đặt câu hỏi rõ ràng, đầy đủ ngữ pháp thay vì chỉ gõ 1-2 từ khóa tìm kiếm ngắn.',
          'Con có thể trả lời các câu hỏi làm rõ của AI khi câu hỏi ban đầu chưa đủ thông tin.'
        ]
      },
      {
        level: 2,
        indicators: [
          'Con có thể cung cấp 2-3 ví dụ mẫu chuẩn (Few-shot Examples) trong prompt để AI làm theo đúng định dạng đầu ra.',
          'Con có thể yêu cầu AI "Suy nghĩ từng bước" (Chain-of-Thought) để giải quyết các vấn đề logic hoặc thuật toán.',
          'Con có thể chỉ định vai trò chuyên gia (Role Persona) phù hợp cho từng bài toán thực tế.'
        ]
      },
      {
        level: 3,
        indicators: [
          'Con có thể thiết kế các cấu trúc System Prompt phức tạp kiểm soát hành vi dài hạn của trợ lý ảo.',
          'Con có thể đo lường và so sánh hiệu quả giữa các kiểu prompt khác nhau trên cùng một tác vụ (A/B Testing Prompt).'
        ]
      },
      {
        level: 4,
        indicators: [
          'Con có thể tự động hóa việc tạo và tối ưu hóa câu lệnh (DSPy / Metaprompting) cho các ứng dụng thông minh.',
          'Con có thể xuất bản bộ công thức prompt chuẩn mực được cộng đồng học sinh đón nhận và áp dụng.'
        ]
      },
      {
        level: 5,
        indicators: [
          'Con có thể xây dựng các bộ công cụ Prompt Engine tự động thích ứng với nhiều dòng mô hình AI khác nhau.',
          'Con có thể đào tạo và hướng dẫn học sinh khác trở thành những chuyên gia chỉ huy AI độc lập.'
        ]
      }
    ],
    evidence: 'Bộ sưu tập Prompt Cookbook trong SP4 và câu lệnh phân luồng Socratic trong SP10 AI Tutor.'
  },
  {
    patterns: ['ai-assisted', 'tự học cùng ai', 'summariz', 'tóm tắt', 'translation', 'dịch thuật', 'notebooklm'],
    domain: 'domain-generative-ai',
    name_vi: 'Tự học & Tổng hợp tri thức cùng AI',
    name_en: 'AI-Assisted Self-Learning & Knowledge Synthesis',
    guidingQuestion_vi: 'Làm thế nào để con biến AI thành người gia sư 1-1 hỗ trợ tóm tắt sách, dịch thuật và biến tài liệu khô khan thành kiến thức sinh động?',
    guidingQuestion_en: 'How well can I turn AI into a 1-on-1 personal tutor to synthesize research, translate languages, and master complex subjects?',
    desc_vi: 'Sử dụng AI để tự học, tóm tắt tài liệu, dịch thuật chuyên sâu và tạo lộ trình học tập cá nhân hóa.',
    desc_en: 'Leverage AI tools to accelerate self-directed learning, generate audio podcasts, and synthesize knowledge.',
    skillRole: 'primary',
    targetLevel: 2,
    rubricLevels: [
      {
        level: 1,
        indicators: [
          'Con có thể dùng AI để tóm tắt các đoạn văn bản dài thành các ý chính ngắn gọn.',
          'Con có thể dịch các bài viết tiếng Anh sang tiếng Việt để hỗ trợ việc đọc hiểu tài liệu cơ bản.'
        ]
      },
      {
        level: 2,
        indicators: [
          'Con có thể sử dụng NotebookLM (SP6) để biến tài liệu học tập thành bản tóm tắt có trích dẫn và tạo bản podcast âm thanh (Audio Overview).',
          'Con có thể yêu cầu AI tạo bảng so sánh (Comparison Table) giữa các khái niệm phức tạp để hiểu sâu bản chất.',
          'Con có thể dùng AI để sinh bộ Flashcards hoặc câu hỏi trắc nghiệm kiểm tra kiến thức bản thân (SP7).'
        ]
      },
      {
        level: 3,
        indicators: [
          'Con có thể xây dựng lộ trình học tập cá nhân hóa nhiều tuần cho một môn học mới với sự đồng hành của AI.',
          'Con có thể tổng hợp kiến thức từ nhiều nguồn tài liệu trái chiều thành bài phân tích đa chiều, khách quan.'
        ]
      },
      {
        level: 4,
        indicators: [
          'Con có thể xây dựng kho tri thức số thứ hai (Second Brain) kết nối tự động với AI để quản trị kiến thức trọn đời.',
          'Con có thể chia sẻ phương pháp học tập siêu tốc với AI cho các bạn trong câu lạc bộ hoặc trường học.'
        ]
      },
      {
        level: 5,
        indicators: [
          'Con có thể thiết kế các hệ thống sư phạm tương tác hỗ trợ hàng ngàn học sinh tự học cùng AI.',
          'Con có thể lan tỏa văn hóa học tập suốt đời (Lifelong Learning) bằng các bài viết và sản phẩm số truyền cảm hứng.'
        ]
      }
    ],
    evidence: 'Kho tài liệu tri thức NotebookLM (SP6) kèm file audio podcast; Hệ thống Flashcards & Quiz ôn thi (SP7).'
  },
  {
    patterns: ['debug', 'sửa lỗi', 'problem solving', 'creativ', 'sáng tạo', 'gỡ lỗi'],
    domain: 'domain-generative-ai',
    name_vi: 'Giải quyết sự cố & Sáng tạo cùng AI',
    name_en: 'AI-Powered Problem Solving & Creative Building',
    guidingQuestion_vi: 'Làm thế nào để con phối hợp với AI phát hiện nguyên nhân gốc rễ của lỗi (Root Cause) và sáng tạo các giải pháp kỹ thuật vượt trội?',
    guidingQuestion_en: 'How well can I collaborate with AI to diagnose error root causes and architect innovative technical solutions?',
    desc_vi: 'Sử dụng AI để phân tích logic, cô lập lỗi kỹ thuật và sáng tạo giao diện sản phẩm số độc đáo.',
    desc_en: 'Collaborate with AI to analyze system logic, isolate bugs, and construct creative digital assets.',
    skillRole: 'primary',
    targetLevel: 2,
    rubricLevels: [
      {
        level: 1,
        indicators: [
          'Con có thể sao chép thông báo lỗi từ console hoặc màn hình vào AI để hỏi nguyên nhân thay vì bỏ cuộc.',
          'Con có thể dùng AI gợi ý ý tưởng hình ảnh hoặc màu sắc cơ bản cho trang web cá nhân.'
        ]
      },
      {
        level: 2,
        indicators: [
          'Con có thể cô lập đoạn code hoặc logic bị lỗi và yêu cầu AI giải thích vì sao lỗi xảy ra trước khi áp dụng bản sửa.',
          'Con có thể phối hợp với AI để nâng cấp giao diện sản phẩm qua tối thiểu 2 phiên bản (V1 ban đầu ➔ V2 hoàn thiện).',
          'Con có thể sử dụng AI để tạo ra các biến thể nội dung và hình ảnh độc đáo cho 12 sản phẩm thực tế.'
        ]
      },
      {
        level: 3,
        indicators: [
          'Con có thể chủ động đề xuất nhiều giải pháp kỹ thuật thay thế (Alternative Solutions) và nhờ AI phân tích ưu nhược điểm.',
          'Con có thể xử lý các trường hợp ngoại lệ (Edge Cases) trong logic ứng dụng để đảm bảo sản phẩm không bị sập.'
        ]
      },
      {
        level: 4,
        indicators: [
          'Con có thể tự động hóa quy trình kiểm thử và tự phục hồi lỗi (Self-healing systems) trong ứng dụng web.',
          'Con có thể làm chủ toàn diện vòng đời phát triển sản phẩm từ ý tưởng, logic phức tạp đến triển khai trực tuyến.'
        ]
      },
      {
        level: 5,
        indicators: [
          'Con có thể kiến trúc các hệ thống phần mềm quy mô lớn tự động phát hiện và khắc phục sự cố tức thời.',
          'Con có thể đóng vai trò cố vấn kỹ thuật giải quyết các sự cố hệ thống phức tạp nhất.'
        ]
      }
    ],
    evidence: 'Lịch sử gỡ lỗi và nhật ký nâng cấp Version (V1 → V2) được ghi nhận đầy đủ trong hồ sơ sản phẩm (SP7, SP8, SP11).'
  },

  // ==========================================
  // 2. CUSTOMER UNDERSTANDING (CU)
  // ==========================================
  {
    patterns: ['interview', 'phỏng vấn', 'lắng nghe', 'listening', 'hỏi người dùng'],
    domain: 'domain-customer-understanding',
    name_vi: 'Phỏng vấn & Lắng nghe người dùng thực tế',
    name_en: 'Conducting User Interviews & Deep Listening',
    guidingQuestion_vi: 'Làm thế nào để con đặt câu hỏi gợi mở, lắng nghe không phán xét và tìm ra khó khăn thực sự mà người dùng đang gặp phải?',
    guidingQuestion_en: 'How well can I ask open-ended questions, listen without bias, and uncover authentic customer struggles?',
    desc_vi: 'Rèn luyện kỹ năng trò chuyện trực tiếp với người dùng, không gợi ý câu trả lời và ghi nhận sự thật khách quan.',
    desc_en: 'Master direct customer dialogue, avoid leading questions, and capture objective observational facts.',
    skillRole: 'supporting',
    targetLevel: 1,
    rubricLevels: [
      {
        level: 1,
        indicators: [
          'Con có thể chuẩn bị sẵn danh sách 5 câu hỏi mở (bắt đầu bằng "Tại sao", "Như thế nào", "Kể cho con nghe về lần gần nhất...") trước khi phỏng vấn.',
          'Con có thể ghi chép trung thực từng câu trả lời của người được phỏng vấn mà không ngắt lời hay áp đặt suy nghĩ cá nhân.'
        ]
      },
      {
        level: 2,
        indicators: [
          'Con có thể nhận diện được các câu trả lời xã giao và đào sâu thêm bằng câu hỏi "Tại sao điều đó lại quan trọng với bác/bạn?".',
          'Con có thể đúc kết được ít nhất 2 nỗi đau (pain points) có thật sau khi phỏng vấn 2-3 người dùng thực tế.',
          'Con có thể chuyển đổi các ghi chép phỏng vấn thành hồ sơ chân dung khách hàng cho sản phẩm số SP2.'
        ]
      },
      {
        level: 3,
        indicators: [
          'Con có thể xử lý khéo léo các tình huống người dùng e ngại hoặc không chịu chia sẻ bằng cách tạo không khí tin cậy.',
          'Con có thể phát hiện sự mâu thuẫn giữa lời nói và cảm xúc cơ thể của người dùng để kiểm chứng lại thông tin.'
        ]
      },
      {
        level: 4,
        indicators: [
          'Con có thể thiết kế kịch bản phỏng vấn theo phương pháp Mom Test để tránh nhận lời khen ảo từ người quen.',
          'Con có thể phân tích xu hướng chung từ 10+ cuộc phỏng vấn để định hướng tính năng chính của sản phẩm.'
        ]
      },
      {
        level: 5,
        indicators: [
          'Con có thể xây dựng cẩm nang phỏng vấn khách hàng chuẩn mực để đào tạo các thành viên khác trong nhóm dự án.',
          'Con có thể dẫn dắt các nghiên cứu thực địa phức tạp và chuyển hóa thành chiến lược sản phẩm xuất sắc.'
        ]
      }
    ],
    evidence: 'Bản ghi âm/ghi chép phỏng vấn tối thiểu 2 người thực tế kèm trích dẫn nguyên văn trong hồ sơ dự án SP2.'
  },
  {
    patterns: ['persona', 'chân dung', 'nhân khẩu', 'target', 'phân khúc', 'segment'],
    domain: 'domain-customer-understanding',
    name_vi: 'Xây dựng chân dung người dùng (Persona Canvas)',
    name_en: 'Building User Persona & Target Profiling',
    guidingQuestion_vi: 'Làm thế nào để con tổng hợp thông tin nghiên cứu thành một chân dung người dùng sống động, rõ ràng về nỗi đau và mục tiêu?',
    guidingQuestion_en: 'How well can I synthesize user research into an authentic persona profile with clear pain points and goals?',
    desc_vi: 'Mô hình hóa khách hàng mục tiêu thành một nhân vật cụ thể có tên tuổi, hoàn cảnh, thói quen và rào cản hành động.',
    desc_en: 'Synthesize target audiences into concrete archetypes detailing motivations, workflows, and behavioral friction.',
    skillRole: 'supporting',
    targetLevel: 1,
    rubricLevels: [
      {
        level: 1,
        indicators: [
          'Con có thể mô tả được độ tuổi, nghề nghiệp, thói quen công nghệ và mục tiêu chính của người dùng mục tiêu.',
          'Con có thể liệt kê được ít nhất 2 khó khăn lớn nhất mà người dùng đang gặp phải trong cuộc sống/học tập.'
        ]
      },
      {
        level: 2,
        indicators: [
          'Con có thể phân biệt rõ giữa nhu cầu bề nổi ("muốn có một app") và động lực sâu xa ("muốn tiết kiệm 30 phút mỗi tối").',
          'Con có thể vẽ hoàn chỉnh một Persona Canvas có ảnh đại diện, trích dẫn tiêu biểu và kịch bản sử dụng sản phẩm SP2.',
          'Con có thể sử dụng Persona để phản biện khi nhóm định làm một tính năng mà khách hàng không cần.'
        ]
      },
      {
        level: 3,
        indicators: [
          'Con có thể xây dựng 2-3 phân khúc Persona khác nhau cho cùng một sản phẩm và chỉ ra điểm khác biệt cốt lõi.',
          'Con có thể cập nhật lại Persona khi nhận được dữ liệu phản hồi mới từ thị trường thực tế.'
        ]
      },
      {
        level: 4,
        indicators: [
          'Con có thể mô hình hóa bản đồ thói quen (Habit Loop) gắn liền với chân dung người dùng để thiết kế trải nghiệm giữ chân.',
          'Con có thể thuyết trình bảo vệ chân dung khách hàng một cách thuyết phục trước Hội đồng chuyên môn.'
        ]
      },
      {
        level: 5,
        indicators: [
          'Con có thể thiết lập hệ thống phân loại Persona cho toàn bộ hệ sinh thái sản phẩm công nghệ thanh thiếu niên.',
          'Con có thể chuyển giao phương pháp nghiên cứu chân dung người dùng cho các bạn học sinh khóa sau.'
        ]
      }
    ],
    evidence: 'Bảng Persona Canvas hoàn chỉnh với ảnh, trích dẫn, nỗi đau và mục tiêu được đính kèm trong SP2/SP3.'
  },
  {
    patterns: ['jtbd', 'nhiệm vụ cần hoàn thành', 'jobs-to-be-done', 'functional job', 'emotional job'],
    domain: 'domain-customer-understanding',
    name_vi: 'Ứng dụng khung Nhiệm vụ cần hoàn thành (JTBD)',
    name_en: 'Applying Jobs-to-be-Done (JTBD) Framework',
    guidingQuestion_vi: 'Làm thế nào để con hiểu bản chất "khách hàng không mua sản phẩm, họ thuê sản phẩm để giúp họ tiến bộ trong hoàn cảnh cụ thể"?',
    guidingQuestion_en: 'How well can I frame user intent around hiring a product to achieve authentic progress in specific circumstances?',
    desc_vi: 'Tập trung vào tiến trình thay đổi cuộc sống của người dùng thay vì chỉ nhìn vào tính năng vật lý của ứng dụng.',
    desc_en: 'Focus on user progress and emotional transformation rather than raw product feature checklists.',
    skillRole: 'supporting',
    targetLevel: 1,
    rubricLevels: [
      {
        level: 1,
        indicators: [
          'Con có thể phát biểu câu lệnh JTBD theo mẫu chuẩn: "Khi tôi [Hoàn cảnh], tôi muốn [Hành động], để tôi có thể [Kết quả mong đợi]".',
          'Con có thể chỉ ra công việc chức năng cơ bản mà người dùng muốn hoàn thành.'
        ]
      },
      {
        level: 2,
        indicators: [
          'Con có thể phân tích được cả 3 khía cạnh của JTBD: Nhiệm vụ chức năng, Kỳ vọng cảm xúc và Thể hiện xã hội.',
          'Con có thể xác định được giải pháp thay thế hiện tại mà người dùng đang "thuê" (ví dụ: dùng sổ tay, gọi điện thoại).',
          'Con có thể thiết kế tính năng sản phẩm nhằm trực tiếp giúp người dùng hoàn thành công việc nhanh hơn và ít tốn sức hơn.'
        ]
      },
      {
        level: 3,
        indicators: [
          'Con có thể vẽ sơ đồ 4 Lực thúc đẩy hành vi (Lực đẩy nỗi đau, Lực kéo giải pháp mới, Lực cản thói quen, Nỗi lo sợ rủi ro).',
          'Con có thể đề xuất các giải pháp triệt tiêu nỗi lo sợ của khách hàng ngay trên giao diện web.'
        ]
      },
      {
        level: 4,
        indicators: [
          'Con có thể tái định vị toàn bộ thông điệp truyền thông của sản phẩm dựa trên một JTBD cốt lõi độc đáo.',
          'Con có thể đo lường mức độ hài lòng của khách hàng đối với từng giai đoạn hoàn thành nhiệm vụ.'
        ]
      },
      {
        level: 5,
        indicators: [
          'Con có thể làm chủ tư duy JTBD để sáng tạo ra những dòng sản phẩm số tiên phong chưa từng có trên thị trường.',
          'Con có thể cố vấn và hiệu đính các nghiên cứu JTBD cho các dự án khởi nghiệp trẻ.'
        ]
      }
    ],
    evidence: 'Bản phân tích JTBD 3 tầng (Chức năng - Cảm xúc - Xã hội) kèm sơ đồ 4 Lực thúc đẩy trong tài liệu SP3.'
  },
  {
    patterns: ['journey', 'hành trình', 'bản đồ trải nghiệm', 'touchpoint', 'điểm chạm', 'friction', 'ma sát'],
    domain: 'domain-customer-understanding',
    name_vi: 'Lập bản đồ hành trình trải nghiệm khách hàng (Customer Journey Map)',
    name_en: 'Customer Journey Mapping & Touchpoint Optimization',
    guidingQuestion_vi: 'Làm thế nào để con vẽ lại toàn bộ các bước tương tác của người dùng từ lúc chưa biết đến sản phẩm đến khi nhận được giá trị đầu tiên?',
    guidingQuestion_en: 'How well can I map every touchpoint across the user lifecycle and eliminate friction before the Aha moment?',
    desc_vi: 'Theo dõi dòng cảm xúc, hành động và các điểm nghẽn (ma sát) khiến người dùng dễ nản lòng và bỏ cuộc.',
    desc_en: 'Map emotional highs and usability drop-offs across user touchpoints to design frictionless onboarding flows.',
    skillRole: 'supporting',
    targetLevel: 1,
    rubricLevels: [
      {
        level: 1,
        indicators: [
          'Con có thể liệt kê được 5 giai đoạn cơ bản của hành trình: Nhận biết, Tìm hiểu, Trải nghiệm thử, Sử dụng thường xuyên, Chia sẻ.',
          'Con có thể đánh dấu được cảm xúc tích cực hoặc tiêu cực của người dùng tại mỗi bước.'
        ]
      },
      {
        level: 2,
        indicators: [
          'Con có thể xác định chính xác điểm ma sát lớn nhất khiến người dùng muốn thoát khỏi trang web (Drop-off point).',
          'Con có thể thiết kế lại quy trình để rút ngắn thời gian chạm đến "Khoảnh khắc bừng sáng" (Aha Moment) dưới 60 giây.',
          'Con có thể thể hiện bản đồ hành trình trực quan trong tài liệu thiết kế sản phẩm SP3 hoặc SP5.'
        ]
      },
      {
        level: 3,
        indicators: [
          'Con có thể kết hợp dữ liệu nhật ký sử dụng (User Analytics) để kiểm chứng lại các giả định trên bản đồ hành trình.',
          'Con có thể đề xuất các thông báo nhắc nhở (Trigger) đúng thời điểm để kích thích người dùng quay trở lại.'
        ]
      },
      {
        level: 4,
        indicators: [
          'Con có thể tối ưu hóa toàn diện luồng Onboarding giúp tỷ lệ người dùng hoàn thành bước đăng ký/sử dụng đầu tiên đạt trên 80%.',
          'Con có thể thiết kế kịch bản phục hồi khi người dùng gặp lỗi trải nghiệm (Error Recovery Journey).'
        ]
      },
      {
        level: 5,
        indicators: [
          'Con có thể xây dựng kiến trúc trải nghiệm đa kênh đồng nhất và liền mạch cho các nền tảng số phức tạp.',
          'Con có thể giảng giải các nguyên lý tâm lý học hành vi ứng dụng trong thiết kế hành trình người dùng.'
        ]
      }
    ],
    evidence: 'Bản đồ Customer Journey Map trực quan thể hiện rõ 5 giai đoạn, biểu đồ cảm xúc và giải pháp triệt tiêu ma sát trong SP3.'
  },
  {
    patterns: ['value proposition', 'tuyên ngôn giá trị', 'pain reliever', 'gain creator', 'giá trị'],
    domain: 'domain-customer-understanding',
    name_vi: 'Thiết kế tuyên ngôn giá trị & Giải pháp khớp nối',
    name_en: 'Value Proposition Design & Problem-Solution Fit',
    guidingQuestion_vi: 'Làm thế nào để con xây dựng tuyên ngôn giá trị ngắn gọn, đánh trúng nỗi đau và khiến người dùng thấy giải pháp này sinh ra dành riêng cho họ?',
    guidingQuestion_en: 'How well can I craft a compelling value proposition that directly resolves pains and creates standout gains?',
    desc_vi: 'Khớp nối hoàn hảo giữa các tính năng của sản phẩm với nỗi đau và kỳ vọng mong muốn của khách hàng mục tiêu.',
    desc_en: 'Align product capabilities directly with verified customer pains and aspirational gain creators.',
    skillRole: 'supporting',
    targetLevel: 1,
    rubricLevels: [
      {
        level: 1,
        indicators: [
          'Con có thể viết được một câu khẩu hiệu (Tagline/Headline) mô tả rõ sản phẩm giải quyết vấn đề gì và cho ai.',
          'Con có thể chỉ ra 1 tính năng chính giúp giảm bớt nỗi đau của người dùng.'
        ]
      },
      {
        level: 2,
        indicators: [
          'Con có thể hoàn thiện bảng Value Proposition Canvas đối chiếu 1-1 giữa Nỗi đau vs Thuốc giảm đau (Pain Relievers), Mong muốn vs Bộ tạo lợi ích (Gain Creators).',
          'Con có thể giải thích tại sao giải pháp của mình tốt hơn hoặc tiện lợi hơn cách người dùng đang làm hiện tại.',
          'Con có thể đưa thông điệp giá trị lên vị trí Hero Section nổi bật nhất trên trang chủ web SP1/SP12.'
        ]
      },
      {
        level: 3,
        indicators: [
          'Con có thể tiến hành thử nghiệm A/B Testing trên 2 tiêu đề tuyên ngôn giá trị khác nhau để đo lường tỷ lệ quan tâm.',
          'Con có thể tinh chỉnh tuyên ngôn giá trị khi mở rộng sản phẩm sang một nhóm đối tượng mới.'
        ]
      },
      {
        level: 4,
        indicators: [
          'Con có thể xây dựng lợi thế cạnh tranh độc nhất (Unfair Advantage) khó sao chép cho sản phẩm số cá nhân.',
          'Con có thể thuyết trình bảo vệ mức độ khớp nối bài toán - giải pháp (Problem-Solution Fit) trước hội đồng giám khảo.'
        ]
      },
      {
        level: 5,
        indicators: [
          'Con có thể kiến tạo các mô hình giá trị mang tính đột phá cho các sản phẩm công nghệ quy mô lớn.',
          'Con có thể đào tạo học sinh khác phương pháp thẩm định tính khả thi của một ý tưởng giá trị mới.'
        ]
      }
    ],
    evidence: 'Khung Value Proposition Canvas và nội dung Hero Section trên website chính thức (SP1, SP3, SP12).'
  },
  {
    patterns: ['usability test', 'kiểm thử tiện dụng', 'feedback', 'phản hồi', 'nghiệm thu người dùng', 'prototype'],
    domain: 'domain-customer-understanding',
    name_vi: 'Thử nghiệm tính tiện dụng & Vòng lặp phản hồi người dùng',
    name_en: 'Usability Testing & User Feedback Iteration',
    guidingQuestion_vi: 'Làm thế nào để con quan sát người dùng bấm thử trang web, phát hiện họ bị bối rối ở đâu và sửa đổi ngay mà không bảo thủ?',
    guidingQuestion_en: 'How well can I run objective usability tests, observe confusion points, and iterate without defensive bias?',
    desc_vi: 'Đặt sản phẩm vào tay người dùng thật, ngồi yên quan sát hành động thực tế và thu thập bài học để cải tiến liên tục.',
    desc_en: 'Conduct hands-on usability testing with real users, observing navigation blocks and iterating rapidly.',
    skillRole: 'supporting',
    targetLevel: 1,
    rubricLevels: [
      {
        level: 1,
        indicators: [
          'Con có thể đưa sản phẩm cho 1 bạn trong lớp hoặc người thân dùng thử và nhờ họ nói ra suy nghĩ khi bấm vào màn hình.',
          'Con có thể lắng nghe các góp ý chê bai mà không tỏ thái độ khó chịu hay vội vàng thanh minh.'
        ]
      },
      {
        level: 2,
        indicators: [
          'Con có thể thiết lập 3 nhiệm vụ cụ thể cho người dùng thực hiện thử (ví dụ: "Bạn hãy thử tìm và làm xong bài trắc nghiệm")',
          'Con có thể ghi chép lại các điểm người dùng bấm nhầm hoặc mất quá nhiều thời gian để tìm nút.',
          'Con có thể thực hiện sửa đổi tối thiểu 2 chi tiết giao diện dựa trên kết quả kiểm thử tiện dụng.'
        ]
      },
      {
        level: 3,
        indicators: [
          'Con có thể phân loại phản hồi của người dùng thành: Lỗi nghiêm trọng (Critical), Khó chịu nhỏ (Minor), và Đề xuất tính năng mới (Nice-to-have).',
          'Con có thể tổng hợp báo cáo kiểm thử tính tiện dụng (Usability Report) kèm video quay màn hình.'
        ]
      },
      {
        level: 4,
        indicators: [
          'Con có thể thiết lập quy trình kiểm thử người dùng định kỳ sau mỗi lần phát hành phiên bản mới (Release Sprint).',
          'Con có thể đo lường thời gian hoàn thành nhiệm vụ trung bình (Time-on-Task) và tỷ lệ thành công của người dùng.'
        ]
      },
      {
        level: 5,
        indicators: [
          'Con có thể xây dựng phòng lab kiểm thử trải nghiệm số và xây dựng văn hóa lấy người dùng làm trung tâm trong cộng đồng.',
          'Con có thể hướng dẫn các đội ngũ phát triển sản phẩm cách lắng nghe phản hồi sâu sắc từ thị trường.'
        ]
      }
    ],
    evidence: 'Biên bản ghi nhận kiểm thử tiện dụng kèm danh sách các điểm đã sửa chữa trên phiên bản V2 (SP5, SP8, SP12).'
  },

  // ==========================================
  // 3. DIGITAL PRODUCT DEVELOPMENT (DPD)
  // ==========================================
  {
    patterns: ['architecture', 'kiến trúc phần mềm', 'cấu trúc', 'hierarchy', 'phân tầng', 'modular'],
    domain: 'domain-digital-product-development',
    name_vi: 'Kiến trúc phần mềm phân tầng & Thiết kế Module sạch',
    name_en: 'Modular Software Architecture & Component Hierarchy',
    guidingQuestion_vi: 'Làm thế nào để con tổ chức cấu trúc mã nguồn gọn gàng, chia nhỏ thành các Component độc lập và dễ mở rộng khi dự án lớn dần?',
    guidingQuestion_en: 'How well can I structure clean modular components and manage data hierarchy for maintainable web applications?',
    desc_vi: 'Tư duy kiến trúc hệ thống, chia tách rõ ràng giữa giao diện hiển thị, trạng thái dữ liệu và logic xử lý nghiệp vụ.',
    desc_en: 'Master clean architecture principles, separating UI presentation, reactive state, and business logic modules.',
    skillRole: 'supporting',
    targetLevel: 1,
    rubricLevels: [
      {
        level: 1,
        indicators: [
          'Con có thể hiểu và chia trang web thành các khối cơ bản: Header, Main Content, Sidebar, Footer.',
          'Con có thể sắp xếp các file mã nguồn vào đúng thư mục (ví dụ: components/, data/, styles/).'
        ]
      },
      {
        level: 2,
        indicators: [
          'Con có thể tách một file code dài thành các Component nhỏ tái sử dụng được (như Button, Card, Modal, Tooltip).',
          'Con có thể truyền dữ liệu qua lại giữa các Component bằng Props một cách an toàn và tường minh.',
          'Con có thể tách riêng dữ liệu JSON ra khỏi mã giao diện để dễ bảo trì và cập nhật trong SP7/SP8.'
        ]
      },
      {
        level: 3,
        indicators: [
          'Con có thể thiết kế kiến trúc luồng dữ liệu một chiều (Unidirectional Data Flow) tránh xung đột trạng thái.',
          'Con có thể viết code theo các nguyên lý Clean Code (đặt tên biến có nghĩa, hàm ngắn làm một việc duy nhất).'
        ]
      },
      {
        level: 4,
        indicators: [
          'Con có thể áp dụng mô hình Custom Hooks hoặc State Store để quản trị trạng thái toàn cục cho ứng dụng web phức tạp.',
          'Con có thể tối ưu hóa cấu trúc để ứng dụng đạt điểm hiệu năng cao và tải nhanh dưới 1 giây.'
        ]
      },
      {
        level: 5,
        indicators: [
          'Con có thể thiết kế kiến trúc Micro-Frontend hoặc Module Federation cho các hệ thống phần mềm quy mô doanh nghiệp.',
          'Con có thể thẩm định và định hướng chuẩn kiến trúc cho toàn bộ dự án công nghệ của học sinh trong trường.'
        ]
      }
    ],
    evidence: 'Cấu trúc thư mục dự án sạch sẽ trên GitHub với các Component độc lập và file data JSON riêng biệt (SP7, SP8, SP12).'
  },
  {
    patterns: ['ui', 'ux', 'giao diện', 'design system', 'visual', 'color', 'typography', 'responsive'],
    domain: 'domain-digital-product-development',
    name_vi: 'Thiết kế giao diện UI/UX & Responsive đa thiết bị',
    name_en: 'Modern UI/UX Design System & Responsive Layout',
    guidingQuestion_vi: 'Làm thế nào để con thiết kế giao diện hiện đại, chuẩn bảng màu, phân cấp thị giác rõ ràng và hiển thị mượt mà trên cả điện thoại lẫn máy tính?',
    guidingQuestion_en: 'How well can I craft modern aesthetic interfaces with clear visual hierarchy and seamless responsive layout?',
    desc_vi: 'Nắm vững quy chuẩn thẩm mỹ cao cấp, bảng màu hài hòa, khoảng trắng thông thoáng và tương thích mọi kích thước màn hình.',
    desc_en: 'Apply premium aesthetics, harmonious palettes, whitespace rhythm, and responsive mobile-first layouts.',
    skillRole: 'supporting',
    targetLevel: 1,
    rubricLevels: [
      {
        level: 1,
        indicators: [
          'Con có thể áp dụng bảng màu đồng nhất (1 màu chủ đạo, 1 màu điểm nhấn, nền trung tính) thay vì dùng quá nhiều màu lòe loẹt.',
          'Con có thể sử dụng font chữ hiện đại (Inter, Montserrat) với kích thước phân cấp rõ ràng giữa Tiêu đề và Nội dung.'
        ]
      },
      {
        level: 2,
        indicators: [
          'Con có thể xây dựng giao diện Responsive tự động co giãn đẹp mắt trên cả màn hình điện thoại (Mobile) và máy tính (Desktop).',
          'Con có thể tạo các hiệu ứng tương tác vi mô (Micro-animations, Hover states, Active focus) mượt mà khi người dùng di chuột.',
          'Con có thể đảm bảo độ tương phản màu sắc (Contrast Ratio) đạt chuẩn dễ đọc cho người thị lực kém trong SP1 và SP12.'
        ]
      },
      {
        level: 3,
        indicators: [
          'Con có thể xây dựng một bộ Design System hoàn chỉnh gồm các Design Tokens (Color, Typography, Spacing, Shadow, Radius).',
          'Con có thể thiết kế chế độ sáng/tối (Dark/Light Theme) chuyển đổi mượt mà với hiệu ứng chuyển động CSS tinh tế.'
        ]
      },
      {
        level: 4,
        indicators: [
          'Con có thể tối ưu hóa trải nghiệm chạm (Touch-target size ≥ 44px) và kiểm soát hoàn hảo khả năng tiếp cận WCAG 2.1 AA.',
          'Con có thể tạo ra các giao diện số có độ hoàn thiện cao (Pixel-perfect) được đánh giá xuất sắc về mặt thị giác.'
        ]
      },
      {
        level: 5,
        indicators: [
          'Con có thể thiết kế các thư viện UI Component mã nguồn mở phục vụ cho cộng đồng lập trình viên thanh thiếu niên.',
          'Con có thể đóng vai trò Giám đốc Nghệ thuật (Art Director) thẩm định chất lượng thiết kế của các sản phẩm số.'
        ]
      }
    ],
    evidence: 'Trang web trực tuyến SP1/SP12 có giao diện chuẩn Responsive, hiệu ứng chuyển động mượt mà và bảng màu chuyên nghiệp.'
  },
  {
    patterns: ['state', 'dữ liệu', 'reactive', 'event', 'xử lý sự kiện', 'logic'],
    domain: 'domain-digital-product-development',
    name_vi: 'Quản trị trạng thái tương tác & Xử lý sự kiện (State Management)',
    name_en: 'Interactive State Management & Event Handling',
    guidingQuestion_vi: 'Làm thế nào để con kiểm soát trạng thái dữ liệu ứng dụng một cách chính xác, phản hồi tức thì khi người dùng tương tác mà không bị lỗi đơ máy?',
    guidingQuestion_en: 'How well can I manage reactive state and asynchronous events to deliver instant, glitch-free UI responsiveness?',
    desc_vi: 'Làm chủ cơ chế cập nhật trạng thái dữ liệu động, lưu trữ cục bộ (localStorage) và xử lý sự kiện người dùng mượt mà.',
    desc_en: 'Master reactive state updates, browser local storage persistence, and resilient event listener flows.',
    skillRole: 'supporting',
    targetLevel: 1,
    rubricLevels: [
      {
        level: 1,
        indicators: [
          'Con có thể khai báo và thay đổi các biến trạng thái cơ bản (như mở/đóng Modal, đếm số điểm, hiển thị câu hỏi).',
          'Con có thể bắt và xử lý sự kiện click chuột hoặc gõ phím từ người dùng.'
        ]
      },
      {
        level: 2,
        indicators: [
          'Con có thể lưu trữ trạng thái người dùng vào trình duyệt (localStorage) để khi tải lại trang web không bị mất dữ liệu làm dở.',
          'Con có thể tính toán trạng thái phái sinh (Derived State) như tính tổng điểm, lọc danh sách theo từ khóa tìm kiếm trong SP7.',
          'Con có thể vô hiệu hóa nút bấm và hiển thị trạng thái đang tải (Loading State) khi hệ thống đang xử lý tác vụ.'
        ]
      },
      {
        level: 3,
        indicators: [
          'Con có thể xử lý các tác vụ bất đồng bộ (Async/Await) an toàn với cơ chế bắt lỗi Try/Catch và thông báo lỗi thân thiện.',
          'Con có thể tối ưu việc render lại giao diện (Prevent unnecessary re-renders) để trang web chạy mượt 60 FPS.'
        ]
      },
      {
        level: 4,
        indicators: [
          'Con có thể xây dựng cơ chế hoàn tác/làm lại (Undo/Redo) hoặc đồng bộ trạng thái thời gian thực cho ứng dụng tương tác cao.',
          'Con có thể thiết kế các cỗ máy trạng thái hữu hạn (Finite State Machine - FSM) kiểm soát các luồng nghiệp vụ phức tạp.'
        ]
      },
      {
        level: 5,
        indicators: [
          'Con có thể kiến tạo các thư viện quản lý trạng thái hiệu năng cao phục vụ cho các ứng dụng web quy mô lớn.',
          'Con có thể đào tạo phương pháp tư duy mô hình hóa luồng dữ liệu phản ứng (Reactive Programming) cho người khác.'
        ]
      }
    ],
    evidence: 'Tính năng lưu tiến độ và bộ lọc dữ liệu thời gian thực hoạt động ổn định trên ứng dụng SP7/SP8/SP11.'
  },
  {
    patterns: ['deployment', 'triển khai', 'host', 'cloudflare', 'vercel', 'github', 'git', 'ci/cd'],
    domain: 'domain-digital-product-development',
    name_vi: 'Quản lý phiên bản Git & Triển khai trực tuyến (Deployment)',
    name_en: 'Git Version Control & Live Cloud Deployment',
    guidingQuestion_vi: 'Làm thế nào để con làm chủ quy trình lưu vết lịch sử Git, tự động triển khai trang web lên Internet và chia sẻ cho cả thế giới?',
    guidingQuestion_en: 'How well can I track code history with Git and deploy live cloud web applications with custom domains?',
    desc_vi: 'Sử dụng Git chuyên nghiệp để lưu vết mã nguồn, tạo nhánh thử nghiệm và phát hành sản phẩm trực tuyến qua Cloudflare/Vercel.',
    desc_en: 'Leverage Git version control and continuous deployment pipelines to publish production applications.',
    skillRole: 'supporting',
    targetLevel: 1,
    rubricLevels: [
      {
        level: 1,
        indicators: [
          'Con có thể tạo kho chứa mã nguồn (Repository) trên GitHub và tải code lên thành công.',
          'Con có thể viết thông điệp Commit rõ ràng mô tả việc vừa làm thay vì chỉ gõ "update" hay "fix".'
        ]
      },
      {
        level: 2,
        indicators: [
          'Con có thể kết nối kho Git với nền tảng triển khai (Cloudflare Pages / Vercel) để tự động cập nhật web khi có code mới.',
          'Con có thể kiểm tra sản phẩm trên đường link trực tuyến thực tế (Live URL) và xác nhận hoạt động ổn định trên điện thoại.',
          'Con có thể gắn link Live URL và link GitHub công khai vào trang Portfolio cá nhân SP1/SP12.'
        ]
      },
      {
        level: 3,
        indicators: [
          'Con có thể tạo các nhánh thử nghiệm (Git Branches) để phát triển tính năng mới mà không làm hỏng nhánh chính (main).',
          'Con có thể xử lý các xung đột mã nguồn (Merge Conflicts) một cách an toàn và bình tĩnh.'
        ]
      },
      {
        level: 4,
        indicators: [
          'Con có thể thiết lập quy trình kiểm thử tự động (CI/CD Pipeline) tự động chạy lint và build trước khi phát hành chính thức.',
          'Con có thể cài đặt tên miền tùy chỉnh (Custom Domain) và chứng chỉ bảo mật SSL cho sản phẩm trực tuyến.'
        ]
      },
      {
        level: 5,
        indicators: [
          'Con có thể quản trị hạ tầng đám mây đa khu vực và thiết lập hệ thống giám sát thời gian thực (Uptime Monitoring).',
          'Con có thể hướng dẫn học sinh toàn trường cách xuất bản sản phẩm số độc lập lên không gian mạng an toàn.'
        ]
      }
    ],
    evidence: 'Đường dẫn Live URL hoạt động 24/7 trên Cloudflare Pages cùng lịch sử Commit rõ ràng trên GitHub (SP1 → SP12).'
  },

  // ==========================================
  // 4. LEARNING & REFLECTION (LRN)
  // ==========================================
  {
    patterns: ['reflection', 'phản tư', '4f', 'đúc kết', 'bài học', 'insight', 'nhận diện lỗ hổng'],
    domain: 'domain-learning',
    name_vi: 'Phản tư đa tầng (4F Reflection) & Đúc kết bài học',
    name_en: 'Multi-layered 4F Reflection & Insight Extraction',
    guidingQuestion_vi: 'Làm thế nào để con tự nhìn nhận lại quá trình làm việc qua 4 bước (Facts - Feelings - Findings - Future) và trưởng thành sau mỗi sản phẩm?',
    guidingQuestion_en: 'How well can I analyze project outcomes through the 4F framework and transform experiences into accelerated growth?',
    desc_vi: 'Thực hành thói quen dừng lại để suy ngẫm, đối diện trung thực với cảm xúc và rút ra bài học hành động cho tương lai.',
    desc_en: 'Internalize the 4F reflection protocol to honestly evaluate emotions, discover insights, and optimize future habits.',
    skillRole: 'supporting',
    targetLevel: 1,
    rubricLevels: [
      {
        level: 1,
        indicators: [
          'Con có thể trả lời đầy đủ 4 câu hỏi trong khung phản tư: Chuyện gì đã xảy ra (Facts), Con cảm thấy thế nào (Feelings), Con học được gì (Findings), Lần sau con sẽ làm gì khác đi (Future).',
          'Con có thể chỉ ra 1 khó khăn cụ thể mà mình đã vượt qua trong quá trình làm bài.'
        ]
      },
      {
        level: 2,
        indicators: [
          'Con có thể viết bài phản tư sâu sắc (trên 150 từ), chỉ rõ nguyên nhân vì sao mình mắc lỗi thay vì chỉ kể lể bề nổi.',
          'Con có thể biến bài học "Future" thành một cam kết hành động cụ thể cho sản phẩm tiếp theo và thực sự áp dụng nó.',
          'Con có thể lưu trữ nhật ký phản tư vào trang hồ sơ tốt nghiệp SP12 để minh chứng cho sự tiến bộ của bản thân.'
        ]
      },
      {
        level: 3,
        indicators: [
          'Con có thể tự đánh giá và cho điểm năng lực của mình một cách khách quan dựa trên bảng tiêu chí (Rubric) trước khi nộp bài.',
          'Con có thể giúp bạn bè trong nhóm nhìn nhận ra những điểm mù (Blind spots) trong bài làm qua những câu hỏi gợi mở.'
        ]
      },
      {
        level: 4,
        indicators: [
          'Con có thể xây dựng thói quen tự phản tư hàng tuần (Weekly Retrospective) để điều chỉnh nhịp học và tối ưu hóa năng suất cá nhân.',
          'Con có thể viết các bài phân tích phản tư chuyên sâu được chia sẻ làm tư liệu học tập mẫu cho toàn khóa.'
        ]
      },
      {
        level: 5,
        indicators: [
          'Con có thể làm chủ năng lực siêu nhận thức (Metacognition), tự điều hòa tư duy và cảm xúc trong mọi hoàn cảnh thử thách.',
          'Con có thể truyền cảm hứng và lan tỏa văn hóa phản tư tích cực cho cộng đồng thanh thiếu niên.'
        ]
      }
    ],
    evidence: 'Nhật ký phản tư 4F đạt chuẩn chất lượng cho từng sản phẩm nộp, có cam kết hành động Future rõ ràng (SP1 - SP12).'
  },
  {
    patterns: ['deliberate practice', 'thực hành có chủ đích', 'lặp lại', 'rèn luyện', 'kỷ luật'],
    domain: 'domain-learning',
    name_vi: 'Thực hành có chủ đích & Chinh phục điểm nghẽn kỹ năng',
    name_en: 'Deliberate Practice & Skill Bottleneck Mastery',
    guidingQuestion_vi: 'Làm thế nào để con không chỉ làm bài tập qua loa mà tập trung rèn luyện đúng vào điểm yếu khó nhất cho đến khi thành thạo?',
    guidingQuestion_en: 'How well can I identify skill bottlenecks, design focused practice drills, and push beyond comfort zones?',
    desc_vi: 'Kỹ thuật chia nhỏ kỹ năng phức tạp, tập trung luyện tập phần khó nhất với sự phản hồi liên tục để bứt phá giới hạn.',
    desc_en: 'Isolate challenging micro-skills, execute deliberate repetitions with immediate feedback, and master bottlenecks.',
    skillRole: 'supporting',
    targetLevel: 1,
    rubricLevels: [
      {
        level: 1,
        indicators: [
          'Con có thể nhận ra phần kỹ năng nào mình đang cảm thấy khó khăn nhất (ví dụ: viết câu lệnh ràng buộc, thiết kế giao diện di động).',
          'Con có thể kiên nhẫn làm lại bài tập mẫu thêm 1 lần khi kết quả lần 1 chưa đạt yêu cầu.'
        ]
      },
      {
        level: 2,
        indicators: [
          'Con có thể tự đặt ra mục tiêu thử thách cao hơn yêu cầu tối thiểu của đề bài (ví dụ: tự viết thêm tính năng Dark Mode trong SP7).',
          'Con có thể chủ động tìm kiếm phản hồi từ Mentor ngay khi hoàn thành bản nháp để biết chính xác điểm cần sửa.',
          'Con có thể lặp lại quy trình thử - sai - chỉnh sửa tối thiểu 3 lần cho đến khi sản phẩm đạt chất lượng xuất sắc.'
        ]
      },
      {
        level: 3,
        indicators: [
          'Con có thể tự thiết kế các bài tập tình huống khó (Edge Case Drills) để tự kiểm tra độ vững vàng của kỹ năng cá nhân.',
          'Con có thể đo lường tốc độ và độ chính xác khi giải quyết một tác vụ quen thuộc để tối ưu hóa thời gian làm bài.'
        ]
      },
      {
        level: 4,
        indicators: [
          'Con có thể duy trì cường độ thực hành tập trung cao độ (Deep Practice) trong 90 phút mà không bị xao nhãng bởi mạng xã hội.',
          'Con có thể hoàn thành xuất sắc các sản phẩm có độ phức tạp cao trong thời gian ngắn kỷ lục.'
        ]
      },
      {
        level: 5,
        indicators: [
          'Con có thể sáng tạo ra các bài tập thực hành có chủ đích độc đáo giúp người khác nhanh chóng vượt qua các rào cản kỹ thuật.',
          'Con có thể đạt đến trình độ điêu luyện và phản xạ tự nhiên trong các kỹ năng công nghệ mũi nhọn.'
        ]
      }
    ],
    evidence: 'Các phiên bản nâng cấp liên tục từ bản sơ khai đến bản hoàn thiện hiển thị rõ trong lịch sử phát triển của SP7, SP8, SP11.'
  },
  {
    patterns: ['teach', 'dạy lại', 'feynman', 'chuyển giao', 'chia sẻ', 'giải thích'],
    domain: 'domain-learning',
    name_vi: 'Chuyển giao tri thức & Phương pháp Feynman (Dạy lại cho người khác)',
    name_en: 'Knowledge Transfer & Feynman Technique (Teaching Others)',
    guidingQuestion_vi: 'Làm thế nào để con giải thích một khái niệm công nghệ phức tạp bằng ngôn từ đơn giản, dễ hiểu đến mức một bạn 10 tuổi cũng nắm được?',
    guidingQuestion_en: 'How well can I explain complex technical principles simply using analogies and teach peers effectively?',
    desc_vi: 'Cách học đỉnh cao nhất là dạy lại cho người khác: biến kiến thức trừu tượng thành ví dụ trực quan, sinh động.',
    desc_en: 'Solidify personal mastery by explaining difficult concepts in plain terms, using metaphors and teaching peers.',
    skillRole: 'supporting',
    targetLevel: 1,
    rubricLevels: [
      {
        level: 1,
        indicators: [
          'Con có thể dùng ví dụ đời thường (ví dụ: ví AI như một đầu bếp, ví database như tủ đựng đồ) để giải thích cách phần mềm hoạt động.',
          'Con có thể trả lời câu hỏi thắc mắc cơ bản của một bạn học cùng lớp.'
        ]
      },
      {
        level: 2,
        indicators: [
          'Con có thể viết một bài hướng dẫn ngắn (Tutorial) từng bước có hình ảnh minh họa cách làm một tính năng hay.',
          'Con có thể đứng lên trình bày (Show & Tell) giải thích sản phẩm số của mình trước lớp trong 3-5 phút một cách tự tin.',
          'Con có thể phát hiện điểm mình chưa thực sự hiểu sâu khi cố gắng giải thích cho người khác và quay lại học lại phần đó.'
        ]
      },
      {
        level: 3,
        indicators: [
          'Con có thể đóng vai trò "Trợ giảng nhí" (Peer Mentor) kèm cặp và hướng dẫn cho 1 bạn học sinh mới bắt đầu.',
          'Con có thể ghi hình một video clip ngắn 2 phút hướng dẫn mẹo sử dụng AI và đăng tải lên Portfolio SP12.'
        ]
      },
      {
        level: 4,
        indicators: [
          'Con có thể tổ chức một buổi chia sẻ chuyên đề (Workshop) cho các bạn trong câu lạc bộ trường học về kỹ năng số.',
          'Con có thể biên soạn tài liệu hướng dẫn học tập có cấu trúc chuẩn mực được nhiều người đón nhận và áp dụng.'
        ]
      },
      {
        level: 5,
        indicators: [
          'Con có thể xây dựng các kênh truyền thông giáo dục số truyền cảm hứng cho hàng ngàn thanh thiếu niên yêu thích công nghệ.',
          'Con có thể đào tạo thế hệ học sinh tiếp theo trở thành những người chia sẻ tri thức tự tin và nhiệt huyết.'
        ]
      }
    ],
    evidence: 'Video hoặc bài viết Show & Tell giải thích sản phẩm trực quan được gắn link trên trang Portfolio SP1/SP12.'
  },

  // ==========================================
  // 5. PROBLEM SOLVING & DECISION MAKING (PSDM)
  // ==========================================
  {
    patterns: ['root cause', '5 whys', 'nguyên nhân gốc', 'xương cá', 'ishikawa', 'bài toán'],
    domain: 'domain-problem-solving-decision-making',
    name_vi: 'Phân tích nguyên nhân gốc rễ (5 Whys & Fishbone)',
    name_en: 'Root Cause Analysis (5 Whys & Fishbone Diagram)',
    guidingQuestion_vi: 'Làm thế nào để con không chỉ sửa chữa triệu chứng bề nổi mà đào sâu tìm ra nguyên nhân cốt lõi gây ra lỗi hệ thống?',
    guidingQuestion_en: 'How well can I look beyond surface symptoms and apply 5 Whys to eliminate fundamental root causes?',
    desc_vi: 'Kỹ năng đặt liên tiếp các câu hỏi "Tại sao" để bóc tách vấn đề phức tạp đến tận gốc rễ và xử lý triệt để.',
    desc_en: 'Apply iterative 5 Whys and Fishbone deconstruction to diagnose and eliminate core system failure modes.',
    skillRole: 'supporting',
    targetLevel: 1,
    rubricLevels: [
      {
        level: 1,
        indicators: [
          'Con có thể phân biệt rõ giữa "Triệu chứng bề ngoài" (ví dụ: web không chạy) và "Nguyên nhân thực sự" (ví dụ: sai đường dẫn ảnh).',
          'Con có thể đặt ít nhất 3 câu hỏi "Tại sao" liên tiếp khi gặp sự cố phần mềm.'
        ]
      },
      {
        level: 2,
        indicators: [
          'Con có thể áp dụng hoàn chỉnh quy trình 5 Whys để tìm ra nguyên nhân gốc rễ của 1 lỗi kỹ thuật trong sản phẩm SP8/SP11.',
          'Con có thể đề xuất giải pháp xử lý triệt để để lỗi tương tự không bao giờ tái diễn trong các bài tập sau.',
          'Con có thể ghi chép bài học phân tích nguyên nhân vào nhật ký gỡ lỗi dự án.'
        ]
      },
      {
        level: 3,
        indicators: [
          'Con có thể vẽ sơ đồ Xương cá (Fishbone Diagram) phân tích lỗi hệ thống theo các nhánh: Con người, Quy trình, Dữ liệu, Công cụ.',
          'Con có thể cô lập và tái hiện lỗi (Reproduce Bug) trong môi trường thử nghiệm độc lập.'
        ]
      },
      {
        level: 4,
        indicators: [
          'Con có thể thiết kế các cơ chế kiểm tra tự động (Pre-flight Checks) ngăn chặn các lỗi phổ biến ngay từ khâu nhập liệu.',
          'Con có thể xử lý các sự cố phức tạp phát sinh từ sự tương tác bất ngờ giữa nhiều hệ thống khác nhau.'
        ]
      },
      {
        level: 5,
        indicators: [
          'Con có thể xây dựng quy trình phân tích nguyên nhân sự cố sau thảm họa (Post-Mortem SOP) cho các dự án phần mềm lớn.',
          'Con có thể đóng vai trò chuyên gia tư vấn gỡ lỗi cho các bài toán công nghệ thách thức nhất.'
        ]
      }
    ],
    evidence: 'Biên bản phân tích nguyên nhân 5 Whys cho lỗi kỹ thuật phức tạp được lưu lại trong hồ sơ sản phẩm (SP8/SP11).'
  },
  {
    patterns: ['prioritize', 'ưu tiên', 'rice', 'moscow', 'ma trận', 'trade-off', 'đánh đổi'],
    domain: 'domain-problem-solving-decision-making',
    name_vi: 'Ma trận ưu tiên & Đánh giá yếu tố đánh đổi (Trade-offs)',
    name_en: 'Prioritization Matrix & Solution Trade-off Evaluation',
    guidingQuestion_vi: 'Làm thế nào để con chọn ra tính năng quan trọng nhất cần làm ngay khi thời gian và nguồn lực có hạn mà không bị quá tải?',
    guidingQuestion_en: 'How well can I rank feature priorities using objective impact-effort criteria and make sound trade-off calls?',
    desc_vi: 'Sử dụng các công cụ khoa học (Ma trận Tác động - Nỗ lực, MoSCoW, RICE) để ra quyết định đầu tư thời gian tối ưu.',
    desc_en: 'Evaluate trade-offs systematically using Impact-Effort matrices, MoSCoW, and RICE scoring models.',
    skillRole: 'supporting',
    targetLevel: 1,
    rubricLevels: [
      {
        level: 1,
        indicators: [
          'Con có thể phân loại các tính năng theo nhóm: Bắt buộc phải có (Must-have), Nên có (Should-have) và Chưa cần làm (Nice-to-have).',
          'Con có thể dũng cảm từ bỏ các ý tưởng rườm rà khi thời gian nộp bài sắp hết để tập trung vào phần cốt lõi.'
        ]
      },
      {
        level: 2,
        indicators: [
          'Con có thể áp dụng Ma trận 2x2 (Tác động lớn / Nỗ lực nhỏ) để chọn ra 3 việc quan trọng nhất cần làm cho sản phẩm MVP.',
          'Con có thể giải thích được lý do tại sao mình chọn làm tính năng A trước tính năng B dựa trên lợi ích của người dùng.',
          'Con có thể lập kế hoạch bàn giao sản phẩm đúng thời hạn cam kết mà không bị trễ hạn.'
        ]
      },
      {
        level: 3,
        indicators: [
          'Con có thể tính điểm ưu tiên RICE (Reach, Impact, Confidence, Effort) cho danh sách 5+ tính năng cạnh tranh nhau.',
          'Con có thể thuyết phục các thành viên trong nhóm đồng thuận với thứ tự ưu tiên đã chọn.'
        ]
      },
      {
        level: 4,
        indicators: [
          'Con có thể quản trị hiệu quả sự đánh đổi giữa: Tốc độ phát hành, Chất lượng hoàn thiện và Chi phí tài nguyên.',
          'Con có thể linh hoạt điều chỉnh thứ tự ưu tiên khi có biến động bất ngờ về yêu cầu từ người dùng.'
        ]
      },
      {
        level: 5,
        indicators: [
          'Con có thể hoạch định chiến lược danh mục sản phẩm dài hạn cân bằng giữa mục tiêu ngắn hạn và tầm nhìn tương lai.',
          'Con có thể đào tạo phương pháp tư duy ra quyết định ưu tiên chuẩn xác cho các thủ lĩnh nhóm trẻ tuổi.'
        ]
      }
    ],
    evidence: 'Bảng ma trận ưu tiên tính năng theo mức độ tác động kèm lý giải đánh đổi trong tài liệu lập kế hoạch (SP3/SP5).'
  },

  // ==========================================
  // 6. PROJECT MANAGEMENT (PM)
  // ==========================================
  {
    patterns: ['wbs', 'phân rã', 'kế hoạch', 'milestone', 'sprint', 'tiến độ', 'kanban'],
    domain: 'domain-project-management',
    name_vi: 'Phân rã công việc (WBS) & Quản trị tiến độ Sprint',
    name_en: 'Work Breakdown Structure (WBS) & Agile Sprint Tracking',
    guidingQuestion_vi: 'Làm thế nào để con bẻ nhỏ một dự án lớn thành các đầu việc nhỏ vừa sức trong 30-45 phút và theo dõi tiến độ rõ ràng?',
    guidingQuestion_en: 'How well can I decompose large project goals into 45-minute actionable tasks and track sprint progress?',
    desc_vi: 'Kỹ năng lập kế hoạch hành động, chia nhỏ mục tiêu, thiết lập bảng Kanban và hoàn thành từng chặng chắc chắn.',
    desc_en: 'Deconstruct complex milestones into discrete tasks, manage Kanban boards, and meet commitments reliably.',
    skillRole: 'supporting',
    targetLevel: 1,
    rubricLevels: [
      {
        level: 1,
        indicators: [
          'Con có thể chia một bài tập lớn thành 3-5 nhiệm vụ cụ thể có thể hoàn thành trong 1 buổi học.',
          'Con có thể dùng bảng Kanban đơn giản (Cần làm - Đang làm - Đã xong) để theo dõi tiến độ cá nhân.'
        ]
      },
      {
        level: 2,
        indicators: [
          'Con có thể ước tính thời gian thực hiện cho từng đầu việc và hoàn thành đúng trong khoảng thời gian đã định.',
          'Con có thể định nghĩa rõ Tiêu chuẩn hoàn thành (Definition of Done - DoD) trước khi bắt tay vào làm việc.',
          'Con có thể tự giác cập nhật trạng thái công việc mỗi ngày mà không cần thầy cô hay cha mẹ nhắc nhở.'
        ]
      },
      {
        level: 3,
        indicators: [
          'Con có thể nhận diện các đầu việc bị phụ thuộc (Task Dependencies) và sắp xếp thứ tự thực hiện khoa học, tránh tắc nghẽn.',
          'Con có thể điều phối nhịp độ làm việc của một nhóm 2-3 bạn trong dự án hợp tác chung.'
        ]
      },
      {
        level: 4,
        indicators: [
          'Con có thể quản trị rủi ro chậm tiến độ bằng cách chuẩn bị sẵn các phương án dự phòng (Contingency Plans).',
          'Con có thể tổ chức buổi họp nhanh đầu giờ (Daily Standup) hiệu quả trong 5 phút để đồng bộ đội ngũ.'
        ]
      },
      {
        level: 5,
        indicators: [
          'Con có thể điều hành toàn diện các chương trình dự án công nghệ phức tạp gồm nhiều nhóm chức năng chéo.',
          'Con có thể xây dựng các quy chuẩn vận hành dự án Agile tinh gọn phù hợp với môi trường học đường.'
        ]
      }
    ],
    evidence: 'Bảng quản lý công việc Kanban/WBS với các nhiệm vụ được phân rã chi tiết và cập nhật đầy đủ (SP5, SP12).'
  },

  // ==========================================
  // 7. CORE COGNITIVE (COG)
  // ==========================================
  {
    patterns: ['critical thinking', 'tư duy phản biện', 'ngụy biện', 'fallacy', 'logic', 'first principles', 'nguyên lý đầu tiên'],
    domain: 'domain-core-cognitive',
    name_vi: 'Tư duy phản biện & Lập luận từ Nguyên lý đầu tiên',
    name_en: 'Critical Thinking & First-Principles Reasoning',
    guidingQuestion_vi: 'Làm thế nào để con không vội vàng tin ngay vào những gì nghe thấy, phát hiện ra các lỗ hổng lập luận và tư duy từ bản chất cốt lõi?',
    guidingQuestion_en: 'How well can I interrogate assumptions, detect flawed arguments, and reason upward from fundamental truths?',
    desc_vi: 'Rèn luyện khả năng bóc tách vấn đề về những chân lý cơ bản nhất, không bị đánh lừa bởi cảm xúc hay định kiến đám đông.',
    desc_en: 'Deconstruct complex phenomena to baseline foundational truths, immune to logical fallacies and emotional hype.',
    skillRole: 'supporting',
    targetLevel: 1,
    rubricLevels: [
      {
        level: 1,
        indicators: [
          'Con có thể đặt câu hỏi nghi vấn "Tại sao điều này lại đúng?" và "Bằng chứng ở đâu?" khi nghe một nhận định.',
          'Con có thể nhận ra khi người khác đang dùng cảm xúc để lấn át lý lẽ trong một cuộc tranh luận.'
        ]
      },
      {
        level: 2,
        indicators: [
          'Con có thể chỉ ra các lỗi ngụy biện logic phổ biến (như ngụy biện công kích cá nhân, ngụy biện đám đông, ngụy biện khái quát hóa vội vã).',
          'Con có thể bóc tách một giải pháp phức tạp về các nguyên lý cơ bản nhất (First Principles) để tự tìm ra cách làm mới đơn giản hơn.',
          'Con có thể viết bài lập luận có bằng chứng số liệu rõ ràng hỗ trợ cho quan điểm của mình trong SP6/SP12.'
        ]
      },
      {
        level: 3,
        indicators: [
          'Con có thể nhìn nhận một vấn đề từ 3 góc nhìn hoàn toàn trái ngược nhau và tìm ra hạt nhân hợp lý của từng bên.',
          'Con có thể chủ động tìm kiếm các bằng chứng bác bỏ (Disconfirming Evidence) để kiểm tra lại tính đúng đắn của niềm tin cá nhân.'
        ]
      },
      {
        level: 4,
        indicators: [
          'Con có thể xây dựng các mô hình tư duy trừu tượng giúp giải quyết nhanh các bài toán đa ngành phức tạp.',
          'Con có thể tham gia các cuộc tranh biện học thuật với phong thái khách quan, mạch lạc và sắc sảo.'
        ]
      },
      {
        level: 5,
        indicators: [
          'Con có thể dẫn dắt các tư tưởng đột phá và định hình các khung lý luận mới cho cộng đồng học thuật trẻ.',
          'Con có thể đóng vai trò phản biện độc lập cho các chiến lược phát triển công nghệ quan trọng.'
        ]
      }
    ],
    evidence: 'Bài phân tích phản biện đa chiều có trích dẫn nguồn xác thực và cấu trúc lập luận chặt chẽ trong SP6/SP12.'
  },

  // ==========================================
  // 8. ENTREPRENEURSHIP (ENT)
  // ==========================================
  {
    patterns: ['mvp', 'business model', 'mô hình kinh doanh', 'khởi nghiệp', 'doanh thu', 'chi phí', 'unit economics'],
    domain: 'domain-entrepreneurship',
    name_vi: 'Phát triển sản phẩm MVP & Thử nghiệm mô hình kinh doanh',
    name_en: 'Lean MVP Prototyping & Business Model Validation',
    guidingQuestion_vi: 'Làm thế nào để con xây dựng một sản phẩm khả dụng tối thiểu (MVP) nhanh nhất để kiểm chứng xem có ai thực sự muốn dùng và trả tiền?',
    guidingQuestion_en: 'How well can I ship a lean MVP to validate real willingness-to-use and test sustainable value creation?',
    desc_vi: 'Tư duy doanh nhân tinh gọn, tập trung vào việc tạo ra giá trị kinh tế/xã hội thực tế với chi phí và thời gian tối thiểu.',
    desc_en: 'Embrace lean entrepreneurial velocity, shipping functional MVPs to validate customer demand and unit viability.',
    skillRole: 'supporting',
    targetLevel: 1,
    rubricLevels: [
      {
        level: 1,
        indicators: [
          'Con có thể hiểu khái niệm MVP là phiên bản đơn giản nhất có thể giải quyết được bài toán chính của người dùng.',
          'Con có thể chỉ ra chi phí cơ bản (thời gian, công cụ) cần thiết để làm ra một sản phẩm số.'
        ]
      },
      {
        level: 2,
        indicators: [
          'Con có thể hoàn thiện bản thiết kế Business Model Canvas tinh gọn (9 ô) cho sản phẩm số cá nhân.',
          'Con có thể tung ra phiên bản MVP trong vòng 1 tuần để thu hút 10 người dùng trải nghiệm thực tế đầu tiên.',
          'Con có thể ước tính cơ chế tạo doanh thu hoặc giá trị phi lợi nhuận bền vững cho sản phẩm SP12.'
        ]
      },
      {
        level: 3,
        indicators: [
          'Con có thể đo lường các chỉ số kinh doanh cốt lõi (Chi phí thu hút người dùng, Tỷ lệ giữ chân, Tỷ lệ chuyển đổi).',
          'Con có thể thực hiện xoay trục sản phẩm (Pivot) một cách linh hoạt khi kết quả thử nghiệm thị trường ban đầu không khả quan.'
        ]
      },
      {
        level: 4,
        indicators: [
          'Con có thể thiết kế chiến lược ra mắt sản phẩm (Product Launch Campaign) thu hút sự chú ý của cộng đồng học đường.',
          'Con có thể xây dựng bản thuyết trình gọi vốn/tài trợ (Pitch Deck) chuyên nghiệp và thuyết phục.'
        ]
      },
      {
        level: 5,
        indicators: [
          'Con có thể điều hành một dự án khởi nghiệp vi mô có dòng tiền dương và mang lại tác động xã hội tích cực.',
          'Con có thể truyền cảm hứng và cố vấn cho các bạn học sinh khác dám dấn thân khởi nghiệp sáng tạo.'
        ]
      }
    ],
    evidence: 'Bản Business Model Canvas 9 ô kèm kết quả thử nghiệm thực tế với 10+ người dùng đầu tiên (SP12).'
  },

  // ==========================================
  // 9. PERSONAL EFFECTIVENESS (PE)
  // ==========================================
  {
    patterns: ['time management', 'quản trị thời gian', 'tập trung', 'deep work', 'pomodoro', 'xao nhãng', 'distraction'],
    domain: 'domain-personal-effectiveness',
    name_vi: 'Quản trị thời gian tập trung sâu (Deep Work & Timeboxing)',
    name_en: 'Deep Work Timeboxing & Focus Management',
    guidingQuestion_vi: 'Làm thế nào để con làm chủ thời gian, loại bỏ hoàn toàn xao nhãng từ điện thoại/mạng xã hội và duy trì trạng thái tập trung đỉnh cao?',
    guidingQuestion_en: 'How well can I eliminate digital distractions, protect deep focus blocks, and consistently deliver on commitments?',
    desc_vi: 'Xây dựng kỷ luật tự thân, kỹ thuật khối thời gian (Timeboxing) và bảo vệ năng lượng tập trung để làm việc hiệu quả gấp đôi.',
    desc_en: 'Cultivate ruthless personal discipline, timeboxing protocols, and protected deep-work sessions for peak output.',
    skillRole: 'supporting',
    targetLevel: 1,
    rubricLevels: [
      {
        level: 1,
        indicators: [
          'Con có thể tắt thông báo điện thoại và đóng các tab không liên quan khi bước vào giờ làm việc.',
          'Con có thể ngồi tập trung làm liên tục trong 25 phút (1 hiệp Pomodoro) mà không đứng lên giữa chừng.'
        ]
      },
      {
        level: 2,
        indicators: [
          'Con có thể lập lịch biểu khối thời gian (Timeboxing) cho cả tuần và tuân thủ hoàn thành ít nhất 80% kế hoạch.',
          'Con có thể nhận diện các "kẻ cắp thời gian" (mạng xã hội, game, trì hoãn) và chủ động thiết lập rào cản ngăn chặn.',
          'Con có thể hoàn thành các bài tập và bàn giao sản phẩm đúng hạn cam kết 100% trong suốt khóa học.'
        ]
      },
      {
        level: 3,
        indicators: [
          'Con có thể duy trì trạng thái dòng chảy tập trung cao độ (Flow State) trong các phiên làm việc 60-90 phút.',
          'Con có thể cân bằng hợp lý giữa thời gian học tập, sáng tạo công nghệ và rèn luyện thể chất, nghỉ ngơi.'
        ]
      },
      {
        level: 4,
        indicators: [
          'Con có thể xây dựng một hệ thống năng suất cá nhân hoàn chỉnh (Personal Productivity System) tự động hóa các tác vụ lặp lại.',
          'Con có thể chia sẻ và hướng dẫn phương pháp quản trị thời gian hiệu quả cho bạn bè cùng lớp.'
        ]
      },
      {
        level: 5,
        indicators: [
          'Con có thể làm chủ năng lực tự điều phối và duy trì hiệu suất đỉnh cao bền bỉ qua nhiều năm tháng.',
          'Con có thể lan tỏa phong cách sống kỷ luật, tự chủ và truyền cảm hứng làm việc năng suất cho cộng đồng.'
        ]
      }
    ],
    evidence: 'Bảng theo dõi thời gian Timeboxing và hồ sơ bàn giao 100% đúng hạn các sản phẩm SP1 đến SP12.'
  },
  {
    patterns: ['growth mindset', 'tư duy phát triển', 'vượt khó', 'chịu trách nhiệm', 'ownership', 'resilience', 'tỉ mỉ', 'craftsmanship'],
    domain: 'domain-personal-effectiveness',
    name_vi: 'Tinh thần tự chủ 100% & Tư duy phát triển (Growth Mindset)',
    name_en: '100% Ownership & Relentless Growth Mindset',
    guidingQuestion_vi: 'Làm thế nào để con luôn xem khó khăn là cơ hội để nâng cấp bản thân, chịu trách nhiệm 100% và không bao giờ đổ lỗi cho ngoại cảnh?',
    guidingQuestion_en: 'How well can I embrace 100% accountability, welcome candid feedback, and turn setbacks into breakthroughs?',
    desc_vi: 'Tâm thế làm chủ cuộc đời: tin tưởng rằng trí thông minh và kỹ năng có thể rèn luyện được thông qua sự kiên trì bền bỉ.',
    desc_en: 'Cultivate radical accountability, viewing every friction point as a workout to upgrade capability and character.',
    skillRole: 'supporting',
    targetLevel: 1,
    rubricLevels: [
      {
        level: 1,
        indicators: [
          'Con có thể thay đổi cách nói từ "Con không làm được" thành "Con chưa làm được bây giờ, nhưng con sẽ học cách làm".',
          'Con có thể thừa nhận lỗi sai của mình khi làm hỏng bài mà không đổ lỗi cho máy tính hay người khác.'
        ]
      },
      {
        level: 2,
        indicators: [
          'Con có thể chủ động hỏi Mentor hoặc bạn bè để tìm cách khắc phục ngay khi gặp bế tắc thay vì ngồi im chờ đợi.',
          'Con có thể kiên trì gỡ lỗi một chương trình trong hơn 30 phút mà không bỏ cuộc hay tỏ thái độ tiêu cực.',
          'Con có thể trau chuốt từng chi tiết nhỏ (căn lề, chính tả, màu sắc) để sản phẩm đạt độ hoàn thiện cao nhất có thể.'
        ]
      },
      {
        level: 3,
        indicators: [
          'Con có thể cởi mở đón nhận các lời phê bình thẳng thắn và biến chúng thành động lực để nâng cấp phiên bản sản phẩm tiếp theo.',
          'Con có thể chủ động động viên và truyền tinh thần kiên cường cho các bạn cùng nhóm khi gặp thử thách lớn.'
        ]
      },
      {
        level: 4,
        indicators: [
          'Con có thể biến những thất bại lớn thành những bài học kinh nghiệm sâu sắc nhất trong hành trình trưởng thành.',
          'Con có thể thể hiện tinh thần tự chủ tuyệt đối trong việc tự học và nghiên cứu các công nghệ mới chưa từng được dạy.'
        ]
      },
      {
        level: 5,
        indicators: [
          'Con có thể trở thành tấm gương sáng về bản lĩnh kiên cường, sự tử tế và tinh thần trách nhiệm cao độ trong mọi hoàn cảnh.',
          'Con có thể xây dựng văn hóa không đổ lỗi và tinh thần cùng nhau tiến bộ trong toàn bộ tổ chức học sinh.'
        ]
      }
    ],
    evidence: 'Nhật ký vượt khó thể hiện thái độ tích cực khi đối diện lỗi kỹ thuật và các sản phẩm được trau chuốt tỉ mỉ (SP1 - SP12).'
  }
];

// Fallback generator for any other skill that matches by domain / competency keywords
export function getDomainFallbackPedagogy(skillName = '', compName = '', domainSlug = '', lang = 'VI', skillObj = null) {
  const sName = (skillObj?.name_vi || skillName || '').trim();
  const sNameEn = (skillObj?.name || skillName || '').trim();
  const dSlug = domainSlug || 'domain-customer-understanding';

  // Specific domain contextualizers
  if (dSlug === 'domain-customer-understanding') {
    return {
      name_vi: sName,
      name_en: sNameEn,
      guidingQuestion_vi: `Làm thế nào để con thấu hiểu chân thực nhu cầu của người dùng thông qua "${sName}" và kiến tạo giải pháp chạm đúng mong đợi của họ?`,
      guidingQuestion_en: `How well can I understand authentic user needs through "${sNameEn}" and build solutions that truly resolve their struggles?`,
      desc_vi: `Rèn luyện kỹ năng thấu cảm và phân tích thực tế qua hoạt động "${sName}", bảo đảm sản phẩm số giải quyết đúng bài toán có thật của con người.`,
      desc_en: `Cultivate deep empathy and observational research through "${sNameEn}", ensuring digital solutions address authentic human needs.`,
      skillRole: 'supporting',
      targetLevel: 1,
      rubricLevels: [
        {
          level: 1,
          indicators: [
            `Con có thể nắm vững mục đích của hoạt động "${sName}" và thực hiện theo kịch bản chuẩn hướng dẫn của Mentor.`,
            'Con có thể ghi chép trung thực các dữ liệu quan sát được mà không áp đặt định kiến cá nhân.'
          ]
        },
        {
          level: 2,
          indicators: [
            `Con có thể tự chủ thực hiện "${sName}" độc lập trên các bài toán sản phẩm thực tế mà không cần nhắc nhở.`,
            'Con có thể đối chiếu kết quả thu được với phản hồi của người dùng để phát hiện các lỗ hổng.',
            'Con có thể chuyển hóa các đúc kết từ nghiên cứu thành các yêu cầu tính năng cụ thể trên sản phẩm.'
          ]
        },
        {
          level: 3,
          indicators: [
            `Con có thể vận dụng linh hoạt kỹ năng "${sName}" để xử lý các tình huống người dùng phức tạp hoặc dữ liệu mâu thuẫn.`,
            'Con có thể chia sẻ và giải thích rõ ràng các phát hiện quan trọng cho các bạn khác trong nhóm dự án.'
          ]
        },
        {
          level: 4,
          indicators: [
            `Con có thể tối ưu hóa và sáng tạo phương pháp thu thập thông tin mới giúp nâng cao độ chính xác của kỹ năng "${sName}".`,
            'Con có thể tự tin thuyết trình bảo vệ các quyết định thiết kế dựa trên dữ liệu người dùng trước Hội đồng chuyên môn.'
          ]
        },
        {
          level: 5,
          indicators: [
            `Con có thể làm chủ toàn diện và xây dựng các tài liệu hướng dẫn chuẩn mực cho kỹ năng "${sName}".`,
            'Con có thể hỗ trợ và đào tạo các học sinh khóa sau đạt đến mức độ thành thạo trong nghiên cứu người dùng.'
          ]
        }
      ],
      evidence: `Bản tài liệu nghiên cứu và dữ liệu kiểm chứng thể hiện năng lực "${sName}" được đính kèm trong hồ sơ sản phẩm thực tế.`
    };
  }

  if (dSlug === 'domain-digital-product-development') {
    return {
      name_vi: sName,
      name_en: sNameEn,
      guidingQuestion_vi: `Làm thế nào để con áp dụng bài bản kỹ thuật "${sName}" vào việc thiết kế và lập trình hoàn thiện sản phẩm số chạy mượt mà trên Internet?`,
      guidingQuestion_en: `How well can I systematically apply "${sNameEn}" to architect, code, and ship polished digital products to the web?`,
      desc_vi: `Làm chủ tư duy kỹ thuật và tiêu chuẩn chất lượng cao cấp trong hoạt động "${sName}", bảo đảm sản phẩm hoạt động ổn định và tối ưu trải nghiệm.`,
      desc_en: `Master engineering rigor and craft standards in "${sNameEn}", ensuring live applications are performant, resilient, and responsive.`,
      skillRole: 'supporting',
      targetLevel: 1,
      rubricLevels: [
        {
          level: 1,
          indicators: [
            `Con có thể hiểu và áp dụng đúng cú pháp cũng như quy trình chuẩn của kỹ thuật "${sName}" theo hướng dẫn mẫu.`,
            'Con có thể nhận ra khi nào đoạn code/thiết kế bị lỗi và biết cách tra cứu tài liệu để sửa.'
          ]
        },
        {
          level: 2,
          indicators: [
            `Con có thể tự chủ triển khai kỹ thuật "${sName}" vào mã nguồn sản phẩm thực tế mà không cần hỗ trợ kỹ thuật.`,
            'Con có thể tự kiểm thử tính tương thích trên nhiều kích thước màn hình và thiết bị khác nhau.',
            'Con có thể tối ưu hóa cấu trúc code để mã nguồn sạch sẽ, dễ đọc và dễ bảo trì.'
          ]
        },
        {
          level: 3,
          indicators: [
            `Con có thể xử lý các trường hợp ngoại lệ (Edge Cases) phức tạp liên quan đến kỹ thuật "${sName}".`,
            'Con có thể hỗ trợ giải đáp thắc mắc và sửa lỗi cho các thành viên khác trong nhóm.'
          ]
        },
        {
          level: 4,
          indicators: [
            `Con có thể tối ưu hóa hiệu năng tải trang và áp dụng các mẫu thiết kế (Design Patterns) tiên tiến trong "${sName}".`,
            'Con có thể tự tin giải trình kiến trúc kỹ thuật sản phẩm trước Hội đồng chuyên môn.'
          ]
        },
        {
          level: 5,
          indicators: [
            `Con có thể làm chủ toàn diện các tiêu chuẩn phần mềm hiện đại và xây dựng thư viện module tái sử dụng cho "${sName}".`,
            'Con có thể hướng dẫn và định hướng kỹ thuật cho thế hệ học sinh tiếp theo.'
          ]
        }
      ],
      evidence: `Mã nguồn sạch trên GitHub và tính năng chạy thực tế trên web thể hiện năng lực "${sName}" đạt chuẩn kiểm định.`
    };
  }

  if (dSlug === 'domain-learning') {
    return {
      name_vi: sName,
      name_en: sNameEn,
      guidingQuestion_vi: `Làm thế nào để con phát huy năng lực tự học qua hoạt động "${sName}", liên tục mở rộng giới hạn hiểu biết và làm chủ tri thức mới?`,
      guidingQuestion_en: `How well can I accelerate self-directed mastery through "${sNameEn}" and continuously upgrade intellectual capability?`,
      desc_vi: 'Xây dựng thói quen học tập chủ động, kỷ luật tự thân và khả năng chuyển hóa thông tin thành năng lực giải quyết vấn đề thực tế.',
      desc_en: 'Cultivate autonomous learning habits, personal discipline, and the ability to synthesize knowledge into real-world impact.',
      skillRole: 'supporting',
      targetLevel: 1,
      rubricLevels: [
        {
          level: 1,
          indicators: [
            `Con có thể nhận biết được các bước cơ bản trong quá trình thực hiện "${sName}" và áp dụng theo hướng dẫn.`,
            'Con có thể nhận ra khi nào mình chưa hiểu bài và chủ động tìm kiếm thêm tài liệu học tập.'
          ]
        },
        {
          level: 2,
          indicators: [
            `Con có thể tự giác thực hành "${sName}" hàng tuần như một thói quen tự nhiên mà không cần thúc giục.`,
            'Con có thể đúc kết và ghi nhận lại các bài học kinh nghiệm sau mỗi lần hoàn thành nhiệm vụ.',
            'Con có thể áp dụng kiến thức vừa học vào việc nâng cấp chất lượng sản phẩm số của bản thân.'
          ]
        },
        {
          level: 3,
          indicators: [
            `Con có thể kết hợp nhiều phương pháp học tập khác nhau để chinh phục nhanh các chủ đề phức tạp trong "${sName}".`,
            'Con có thể chia sẻ và hướng dẫn lại các phương pháp học tập hiệu quả cho bạn bè.'
          ]
        },
        {
          level: 4,
          indicators: [
            `Con có thể xây dựng kho tri thức cá nhân có hệ thống và tối ưu hóa tốc độ tiếp thu kỹ năng mới vượt trội.`,
            'Con có thể truyền cảm hứng và lan tỏa tinh thần hiếu tri cho tập thể lớp học.'
          ]
        },
        {
          level: 5,
          indicators: [
            `Con có thể làm chủ năng lực siêu nhận thức và tự thiết kế lộ trình học tập trọn đời cho bản thân.`,
            'Con có thể đào tạo phương pháp tự học siêu tốc cho cộng đồng thanh thiếu niên.'
          ]
        }
      ],
      evidence: `Nhật ký học tập và sản phẩm số đúc kết tri thức thể hiện năng lực "${sName}" được lưu trữ trong Portfolio cá nhân.`
    };
  }

  // Default rich fallback for any other domain
  return {
    name_vi: sName,
    name_en: sNameEn,
    guidingQuestion_vi: `Làm thế nào để con áp dụng có bài bản kỹ năng "${sName}" vào việc hoàn thiện sản phẩm số thực tế và nâng cao năng lực tự chủ?`,
    guidingQuestion_en: `How well can I systematically apply "${sNameEn}" to develop authentic digital deliverables and master self-directed autonomy?`,
    desc_vi: `Rèn luyện kỹ năng thực hành "${sName}" gắn liền với quá trình xây dựng 12 sản phẩm số và tự chủ công nghệ.`,
    desc_en: `Cultivate practical "${sNameEn}" competencies connected with building the 12 micro digital products.`,
    skillRole: 'supporting',
    targetLevel: 1,
    rubricLevels: [
      {
        level: 1,
        indicators: [
          `Con có thể nắm bắt các nguyên lý cơ bản của "${sName}" và thực hiện theo quy trình mẫu có hướng dẫn.`,
          'Con có thể nhận diện các khó khăn ban đầu và biết cách đặt câu hỏi làm rõ với Mentor.'
        ]
      },
      {
        level: 2,
        indicators: [
          `Con có thể tự chủ áp dụng kỹ năng "${sName}" vào các yêu cầu trong Brief sản phẩm mà không cần nhắc nhở.`,
          'Con có thể tự kiểm tra lại kết quả thực hiện và chủ động sửa các lỗi cơ bản.',
          'Con có thể ghi nhận lại bài học kinh nghiệm sau khi hoàn thành nhiệm vụ.'
        ]
      },
      {
        level: 3,
        indicators: [
          `Con có thể vận dụng linh hoạt kỹ năng "${sName}" để xử lý các tình huống phức tạp hoặc bất ngờ.`,
          'Con có thể chia sẻ và giải thích rõ ràng cách làm cho các bạn khác trong nhóm.'
        ]
      },
      {
        level: 4,
        indicators: [
          `Con có thể tối ưu hóa và sáng tạo phương pháp mới để nâng cao chất lượng thực thi kỹ năng "${sName}".`,
          'Con có thể tự tin thuyết trình bảo vệ sản phẩm xuất sắc trước Hội đồng chuyên môn.'
        ]
      },
      {
        level: 5,
        indicators: [
          `Con có thể làm chủ toàn diện và xây dựng các tài liệu hướng dẫn chuẩn mực cho kỹ năng "${sName}".`,
          'Con có thể hỗ trợ và đào tạo thế hệ học sinh tiếp theo đạt đến mức độ thành thạo.'
        ]
      }
    ],
    evidence: `Sản phẩm số thực tế thể hiện năng lực "${sName}" đạt chuẩn đầu ra và được Hội đồng đánh giá công nhận.`
  };
}

// Master resolver function
export function getEnrichedSkillData(skillName = '', compName = '', coreCode = '', lang = 'VI', skillCode = '', skillObj = null, domainSlug = '') {
  const n = (skillName || '').toLowerCase();
  const nVi = ((skillObj?.name_vi || '') + ' ' + (skillObj?.description_vi || '')).toLowerCase();
  const c = (compName || '').toLowerCase();

  // Search exact or pattern match in database
  for (const item of SKILL_PEDAGOGICAL_DATABASE) {
    const hasMatch = item.patterns.some((p) => {
      const pl = p.toLowerCase();
      return n.includes(pl) || nVi.includes(pl) || c.includes(pl);
    });

    if (hasMatch) {
      const targetLevel = item.targetLevel || (item.skillRole === 'primary' ? 2 : 1);
      return {
        ...item,
        name_vi: skillObj?.name_vi || item.name_vi,
        name_en: skillObj?.name || item.name_en,
        targetLevel,
        targetCourse: lang === 'VI' ? `Mục tiêu: Level ${targetLevel}` : `Target: Level ${targetLevel}`,
        rubricLevels: item.rubricLevels.map((lvl) => ({
          ...lvl,
          label: `Level ${lvl.level}`,
          indicatorsCount: lvl.indicators.length
        }))
      };
    }
  }

  // Fallback to rich domain-specific contextualizer
  const fallback = getDomainFallbackPedagogy(skillName, compName, domainSlug, lang, skillObj);
  const targetLevel = fallback.targetLevel || 1;
  return {
    ...fallback,
    targetLevel,
    targetCourse: lang === 'VI' ? `Mục tiêu: Level ${targetLevel}` : `Target: Level ${targetLevel}`,
    rubricLevels: fallback.rubricLevels.map((lvl) => ({
      ...lvl,
      label: `Level ${lvl.level}`,
      indicatorsCount: lvl.indicators.length
    }))
  };
}

// Helper to generate dynamic examples & misconceptions for skills (Domain-calibrated, zero boilerplate)
export function getSkillExamplesAndMisconceptions(skillName = '', lang = 'VI', skillNameVi = '') {
  const n = (skillName || '').toLowerCase();
  const displaySkill = lang === 'VI' ? (skillNameVi || skillName) : skillName;

  if (n.includes('interview') || n.includes('phỏng vấn') || n.includes('lắng nghe')) {
    return {
      examples: lang === 'VI' ? [
        'Chuẩn bị danh sách câu hỏi mở theo phương pháp Mom Test, hỏi về các tình huống cụ thể trong quá khứ thay vì hỏi ý kiến tương lai.',
        'Thực hiện phỏng vấn 3 người dùng thực tế, ghi lại chính xác từng lời nói và nỗi đau mà họ chia sẻ.',
        'Đúc kết bảng trích dẫn nguyên văn (Verbatim Quotes) để làm bằng chứng cho quyết định thiết kế tính năng sản phẩm SP2.'
      ] : [
        'Preparing open-ended questions targeting past behaviors rather than hypothetical opinions (The Mom Test).',
        'Interviewing 3 authentic users and capturing verbatim quotes regarding their daily struggles.',
        'Extracting user insights to back up feature priorities on the SP2 product canvas.'
      ],
      misconceptions: lang === 'VI' ? [
        'Hỏi người dùng câu hỏi đóng có/không hoặc câu hỏi gợi ý như "Bạn có thích một ứng dụng giúp bạn học tốt hơn không?" (đây là khảo sát định hướng, không phải phỏng vấn khám phá).',
        'Tự trả lời hộ người dùng khi họ ngập ngừng thay vì kiên nhẫn chờ đợi (đây là áp đặt ý kiến cá nhân).',
        'Chỉ phỏng vấn bạn thân rồi cho rằng mọi người dùng trên đời đều có nhu cầu giống hệt bạn mình.'
      ] : [
        'Asking leading hypothetical questions like "Would you buy a cool study app?" (this introduces confirmation bias).',
        'Interrupting or finishing sentences for the interviewee instead of waiting patiently.',
        'Interviewing only close friends and assuming everyone shares identical habits.'
      ]
    };
  }

  if (n.includes('persona') || n.includes('chân dung')) {
    return {
      examples: lang === 'VI' ? [
        'Xây dựng bảng Persona Canvas hoàn chỉnh với mục tiêu, thói quen công nghệ và rào cản hành động chính.',
        'Sử dụng Persona để kiểm tra lại kịch bản sử dụng sản phẩm SP2 trước khi bắt tay vào thiết kế giao diện.',
        'Phân biệt rõ Persona người dùng cuối (Học sinh) và Persona người chi trả (Phụ huynh).'
      ] : [
        'Creating a rich Persona Canvas with goals, digital habits, and core anxieties.',
        'Using the Persona archetype to stress-test UX flows prior to UI layout design in SP2.',
        'Differentiating the end-user Persona (student) from the economic buyer Persona (parent).'
      ],
      misconceptions: lang === 'VI' ? [
        'Tự bịa ra các đặc điểm Persona theo tưởng tượng cá nhân mà không dựa trên dữ liệu phỏng vấn thực tế.',
        'Mô tả chung chung như "Tất cả mọi người từ 10 đến 60 tuổi đều có thể dùng app" (Persona quá rộng, không có giá trị).',
        'Nhầm lẫn Persona với một danh sách thống kê nhân khẩu học khô khan không có cảm xúc hay động lực.'
      ] : [
        'Fabricating persona attributes from imagination without grounding in user interview data.',
        'Targeting "everyone aged 10-60" (overly broad personas lack actionable insight).',
        'Confusing a living behavioral persona with static demographic survey statistics.'
      ]
    };
  }

  if (n.includes('vision') || n.includes('tầm nhìn')) {
    return {
      examples: lang === 'VI' ? [
        'Xây dựng tài liệu Tầm nhìn Sản phẩm dài hạn, trả lời rõ ràng ba câu hỏi: Tại sao làm (Why), Phục vụ ai (Who), và Đạt được gì (What).',
        'Tổ chức buổi chia sẻ định hướng (kick-off) cho đội ngũ lập trình và thiết kế để làm rõ mục tiêu sản phẩm trong 12 tháng tới.',
        'Thiết kế tagline và thông điệp giá trị cốt lõi giúp các bên liên quan dễ dàng hiểu được đích đến cuối cùng của sản phẩm.'
      ] : [
        'Drafting a 1-page Product Vision document outlining the "Why", "Who", and "What" of the application.',
        'Presenting a clear product direction to alignment teams for the next 12 months.',
        'Defining a core value proposition statement that makes the long-term destination of the product obvious.'
      ],
      misconceptions: lang === 'VI' ? [
        'Liệt kê chi tiết danh sách tất cả các tính năng cần phát triển (đây là Quản lý Backlog, không phải thiết lập Tầm nhìn).',
        'Vẽ bản thiết kế chi tiết (wireframe) các màn hình ứng dụng (đây là Thiết kế UI/UX, không phải định hình Tầm nhìn).',
        'Quyết định mô hình định giá bán sản phẩm (đây là Chiến lược Doanh thu/Kinh doanh, không phải Tầm nhìn sản phẩm).'
      ] : [
        'Listing a detailed backlog of technical features (this is Backlog Management, not Vision setting).',
        'Drawing high-fidelity user interface wireframes (this is UI/UX design, not Vision definition).',
        'Setting the product subscription pricing models (this is Monetization Strategy, not Product Vision).'
      ]
    };
  }

  if (n.includes('prioritize') || n.includes('ưu tiên')) {
    return {
      examples: lang === 'VI' ? [
        'Áp dụng ma trận RICE (Reach, Impact, Confidence, Effort) để xếp hạng mức độ ưu tiên cho 10 tính năng mới.',
        'Thảo luận với bộ phận Kinh doanh và Công nghệ để phân loại tính năng thành Must-have, Should-have và Could-have (phương pháp MoSCoW).',
        'Từ chối một yêu cầu tính năng từ khách hàng lớn vì nó nằm ngoài định hướng của chu kỳ phát hành hiện tại.'
      ] : [
        'Applying the RICE scoring model systematically to score and rank 10 upcoming features.',
        'Negotiating with engineering and business stakeholders to group features into Must-haves and Should-haves (MoSCoW).',
        'Politely declining a high-profile feature request because it deviates from current sprint goals.'
      ],
      misconceptions: lang === 'VI' ? [
        'Lập trình tất cả các yêu cầu theo thứ tự thời gian người dùng gửi đến (đây là xử lý FIFO, không phải Ưu tiên hóa).',
        'Lựa chọn tính năng dựa hoàn toàn trên ý kiến cá nhân của Giám đốc (đây là quyết định cảm tính HIPPO, không phải Ưu tiên hóa khoa học).',
        'Đồng ý làm tất cả mọi tính năng bằng cách kéo dài thời gian phát hành dự án (đây là sự thỏa hiệp tiêu cực).'
      ] : [
        'Executing requests in the order they arrived (this is FIFO queuing, not Prioritization).',
        'Selecting features based entirely on the highest paid person\'s opinion (this is HiPPO, not logical prioritization).',
        'Agreeing to build every requested feature by pushing back release dates indefinitely.'
      ]
    };
  }

  if (n.includes('roadmap') || n.includes('lộ trình')) {
    return {
      examples: lang === 'VI' ? [
        'Vẽ lộ trình phát triển định hướng theo mục tiêu (Goal-oriented Roadmap) tập trung vào giải quyết nỗi đau của khách hàng qua từng quý.',
        'Cập nhật tài liệu lộ trình để phản ánh sự thay đổi chiến lược sau khi nhận kết quả khảo sát thị trường mới.',
        'Trình bày lộ trình sản phẩm dạng timeline vĩ mô cho khách hàng đối tác để xây dựng lòng tin.'
      ] : [
        'Creating a goal-oriented product roadmap focusing on quarterly outcomes rather than specific dates.',
        'Updating the public roadmap to reflect strategy adjustments after new market user research.',
        'Presenting a high-level timeline showing thematic releases to enterprise clients to build trust.'
      ],
      misconceptions: lang === 'VI' ? [
        'Vẽ sơ đồ Gantt chi tiết từng ngày thực hiện nhiệm vụ của lập trình viên (đây là Kế hoạch Dự án, không phải Lộ trình sản phẩm).',
        'Cam kết cứng nhắc ngày phát hành chính xác cho các tính năng chưa nghiên cứu kỹ (đây là Bản kế hoạch cam kết, không phải Lộ trình linh hoạt).',
        'Liệt kê tất cả các lỗi kỹ thuật cần sửa trong tháng tới (đây là Kế hoạch sửa lỗi / Bug-fix plan).'
      ] : [
        'Creating a daily Gantt chart tracking developers\' individual tasks (this is a Project Plan, not a Roadmap).',
        'Making hard-date release promises for unresearched backlog items (this is a Commit Schedule, not a Roadmap).',
        'Drafting a checklist of system bug fixes for the next sprint (this is a bug-fixing plan).'
      ]
    };
  }

  // Domain fallback examples and misconceptions
  return {
    examples: lang === 'VI' ? [
      `Xây dựng kế hoạch thực hiện chuẩn hóa và áp dụng các tiêu chí của kỹ năng "${displaySkill}" vào tình huống thực tế của sản phẩm số.`,
      `Ghi chép và lưu vết toàn bộ quá trình thực thi "${displaySkill}" vào hồ sơ dự án để phục vụ đánh giá năng lực CBE.`,
      `Chủ động thu thập phản hồi từ người dùng hoặc Mentor để tối ưu hóa chất lượng bàn giao của "${displaySkill}".`
    ] : [
      `Establishing standard execution protocols and applying "${displaySkill}" criteria to authentic digital product workflows.`,
      `Logging full progress and artifacts of "${displaySkill}" into the project repository for CBE competency evaluation.`,
      `Actively gathering feedback from users and mentors to optimize deliverable craftsmanship in "${displaySkill}".`
    ],
    misconceptions: lang === 'VI' ? [
      `Thực hiện "${displaySkill}" một cách hình thức để đối phó điểm danh mà không đo lường giá trị thực tế mang lại.`,
      `Nhầm lẫn việc sử dụng công cụ hỗ trợ cơ bản là đã hoàn toàn làm chủ bản chất của kỹ năng "${displaySkill}".`,
      `Bỏ qua bước kiểm tra lại (Validation) sau khi hoàn thành khiến kết quả của "${displaySkill}" dễ phát sinh sai sót.`
    ] : [
      `Executing "${displaySkill}" merely as a tick-box compliance routine without measuring tangible user value.`,
      `Confusing the basic operation of software tools with genuine mastery of the underlying core skill "${displaySkill}".`,
      `Skipping independent validation post-execution, leading to unaddressed quality defects in "${displaySkill}".`
    ]
  };
}
