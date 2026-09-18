import React, { useState, useEffect, useMemo } from 'react';
import {
  Sparkles,
  Brain,
  Users,
  Layers,
  FolderKanban,
  Target,
  BookOpen,
  TrendingUp,
  Award,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  Code,
  FileText,
  Copy,
  Check,
  Search,
  BookMarked,
  HelpCircle,
  X,
  Sliders,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Flame,
  ArrowRight,
  Globe,
  ShieldCheck,
  QrCode,
  Edit3,
  Eye,
  RotateCcw,
  MessageSquare
} from 'lucide-react';
import competencyData from './data/competencyData.json';

// Global Frameworks definitions
const GLOBAL_FRAMEWORKS = [
  {
    id: 'SFIA',
    name: 'SFIA 9',
    fullname: 'Skills Framework for the Information Age (v9)',
    origin: 'Vương Quốc Anh (SFIA Foundation)',
    scope: 'Kỹ năng công nghệ thông tin & chuyển đổi số',
    levels: 7,
    focus: 'Định nghĩa trách nhiệm công việc từ Follow (L1) đến Set Strategy (L7). Chuẩn quốc tế cho ngành Tech.',
    mapping: 'CCS map 5 cấp độ kỹ năng và các indicator hành vi thực tế vào cấu trúc trách nhiệm của SFIA.'
  },
  {
    id: 'Bloom',
    name: "Bloom's Taxonomy",
    fullname: "Bloom's Revised Cognitive Taxonomy",
    origin: 'Đại học Chicago (Hoa Kỳ)',
    scope: 'Khung phân loại nhận thức sư phạm',
    levels: 6,
    focus: 'Remember -> Understand -> Apply -> Analyze -> Evaluate -> Create.',
    mapping: 'Toàn bộ câu hỏi Key Questions và hệ thống bài thực hành của CCS được xây dựng theo Bloom.'
  },
  {
    id: 'Dreyfus',
    name: 'Dreyfus Model',
    fullname: 'Dreyfus Model of Skill Acquisition',
    origin: 'Stuart & Hubert Dreyfus (UC Berkeley)',
    scope: 'Mô hình tiến hóa năng lực thực hành',
    levels: 5,
    focus: 'Novice -> Advanced Beginner -> Competent -> Proficient -> Expert.',
    mapping: 'CCS sử dụng trực tiếp thang 5 cấp độ của Dreyfus để thiết kế bảng Rubric đánh giá chỉ báo.'
  },
  {
    id: 'DigComp',
    name: 'DigComp 2.2',
    fullname: 'European Digital Competence Framework',
    origin: 'Ủy ban Châu Âu (European Commission)',
    scope: 'Khung năng lực số cho công dân & người lao động',
    levels: 8,
    focus: 'Xử lý dữ liệu số, an toàn thông tin số, giao tiếp hợp tác và giải quyết vấn đề bằng công nghệ.',
    mapping: 'CCS thừa hưởng cấu trúc các miền năng lực số và ứng dụng AI thực tế.'
  },
  {
    id: 'WEF',
    name: 'WEF Future of Jobs',
    fullname: 'World Economic Forum Future Skills Framework',
    origin: 'Diễn đàn Kinh tế Thế giới (WEF)',
    scope: 'Top kỹ năng trọng yếu trong kỷ nguyên AI & tự động hóa',
    levels: 'Core Skills',
    focus: 'Analytical thinking, Creative thinking, AI & Big Data, Resilience & Flexibility, Curiosity & Lifelong learning.',
    mapping: 'Định hình 9 Core Domains chính của CCS.'
  }
];

// Helper to generate dynamic examples & misconceptions for skills
function getSkillExamplesAndMisconceptions(skillName, lang = 'VI', skillNameVi = '') {
  const n = (skillName || '').toLowerCase();
  const displaySkill = lang === 'VI' ? (skillNameVi || skillName) : skillName;
  
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

  return {
    examples: lang === 'VI' ? [
      `Áp dụng một cách có bài bản kỹ năng "${displaySkill}" vào xử lý các tình huống thực tế trong công việc dự án nhóm.`,
      `Xây dựng quy trình chuẩn hoặc bộ tài liệu hướng dẫn về "${displaySkill}" để chuyển giao tri thức và đồng bộ hóa hoạt động của đội ngũ.`,
      `Tiến hành đánh giá định kỳ và cải tiến cách thức áp dụng kỹ năng "${displaySkill}" dựa trên phản hồi của khách hàng hoặc người dùng.`
    ] : [
      `Systematically applying "${displaySkill}" to resolve real-world challenges in a team project environment.`,
      `Creating standard operating guidelines or documentation for "${displaySkill}" to align team operations.`,
      `Performing periodic reviews and optimizing the application of "${displaySkill}" based on user feedback.`
    ],
    misconceptions: lang === 'VI' ? [
      `Thực hiện "${displaySkill}" một cách máy móc, mù quáng mà không có mục tiêu rõ ràng hay chỉ số đo lường hiệu quả cụ thể.`,
      `Nhầm lẫn việc sử dụng công cụ hỗ trợ cơ bản (như spreadsheet hay Notion) là đã hoàn toàn làm chủ kỹ năng "${displaySkill}".`,
      `Làm phức tạp hóa kỹ năng "${displaySkill}" quá mức cho các tác vụ đơn giản thay vì tập trung tối ưu hóa giá trị thực tế.`
    ] : [
      `Executing "${displaySkill}" blindly without clear objectives or performance measurement metrics.`,
      `Confusing the usage of simple tools (like spreadsheets or Notion) with mastering the actual core skill of "${displaySkill}".`,
      `Over-complicating "${displaySkill}" processes for simple tasks instead of focusing on direct value.`
    ]
  };
}

// Helper mapping of 12 Products Conan1 Supported Skills
const SUPPORTED_CONAN1_SKILLS = [
  'CU.1.1', 'CU.1.2', 'CU.1.3', 'CU.2.1', 'CU.2.3', 'CU.3.3',
  'DPD.2.1', 'DPD.2.2', 'DPD.2.3', 'DPD.3.1', 'DPD.3.2', 'DPD.4.1', 'DPD.4.3',
  'PSDM.1.2', 'PSDM.2.3', 'PSDM.3.2',
  'LRN.1.2', 'LRN.1.3', 'LRN.2.1', 'LRN.2.3', 'LRN.3.3',
  'PE.1.1', 'PE.1.3', 'PE.3.3'
];

// Unified Elegant Tooltip & Prompt AI Popover Component
function CompetencyTooltip({
  title = '',
  description = '',
  whyItMatters = '',
  onPromptClick = null,
  lang = 'VI',
  badgeText = ''
}) {
  if (!description && !whyItMatters && !onPromptClick) return null;

  return (
    <span
      className="relative group inline-flex items-center select-none"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        className="p-1 rounded-full text-stone-400 hover:text-[#cc4e2d] hover:bg-orange-100/60 transition-colors cursor-pointer focus:outline-hidden"
        aria-label="Information and AI Prompt"
      >
        <HelpCircle className="w-4 h-4" />
      </button>

      {/* Tooltip Card with transparent hover bridge */}
      <div className="absolute left-0 top-full pt-1.5 z-50 hidden group-hover:block group-focus-within:block w-80 sm:w-96 drop-shadow-2xl text-left">
        <div
          style={{ backgroundColor: '#1c1917' }}
          className="text-stone-100 text-xs rounded-2xl p-4 border border-stone-700 shadow-2xl space-y-3"
        >
          {/* Header Badge (Removed duplicate long title) */}
          <div className="border-b border-stone-800 pb-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-orange-400">
              {badgeText || (lang === 'VI' ? 'Thông Tin Năng Lực' : 'Competency Info')}
            </span>
          </div>

          {/* 1. Tổng quan - Đồng bộ Lucide vector icon */}
          {description && (
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase text-stone-400 flex items-center gap-1.5 tracking-wide">
                <BookOpen className="w-3 h-3 text-stone-400" />
                {lang === 'VI' ? 'Tổng quan' : 'Overview'}
              </span>
              <p className="text-stone-200 leading-relaxed text-[11.5px]">
                {description}
              </p>
            </div>
          )}

          {/* 2. Vì sao quan trọng */}
          {whyItMatters && (
            <div
              style={{ backgroundColor: '#292524' }}
              className="border border-amber-500/40 rounded-xl p-2.5 space-y-1"
            >
              <span className="text-[10px] font-bold uppercase text-amber-400 flex items-center gap-1 tracking-wide">
                <Target className="w-3 h-3 text-amber-400" />
                {lang === 'VI' ? 'Vì sao quan trọng' : 'Why It Matters'}
              </span>
              <p className="text-amber-100 leading-relaxed text-[11px]">
                {whyItMatters}
              </p>
            </div>
          )}

          {/* 3. Button Prompt AI */}
          {onPromptClick && (
            <div className="pt-1">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onPromptClick();
                }}
                style={{ backgroundColor: '#cc4e2d' }}
                className="w-full py-2 px-3 rounded-xl hover:opacity-90 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-orange-950/40 transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Prompt AI
              </button>
            </div>
          )}
        </div>
      </div>
    </span>
  );
}

// Dedicated AI Teen Metadata & Building 21 CBE 5-Level Continuum Indicators Matrix
function getAiTeenSkillData(skillName = '', compName = '', coreCode = '', lang = 'VI', skillCode = '', skillObj = null) {
  const n = (skillName || '').toLowerCase();
  const c = (compName || '').toLowerCase();
  const isGenAI = coreCode === 'GenAI';

  // Determine skill role
  let skillRole = 'out_of_scope'; // 'primary' | 'supporting' | 'out_of_scope'
  if (isGenAI) {
    skillRole = 'primary';
  } else if (skillCode && SUPPORTED_CONAN1_SKILLS.includes(skillCode)) {
    skillRole = 'supporting';
  } else if (
    n.includes('interview') || n.includes('persona') || n.includes('latent') ||
    n.includes('architecture') || n.includes('hierarchy') || n.includes('deployment') ||
    n.includes('root cause') || n.includes('edge case') || n.includes('literacy') ||
    n.includes('synthesis') || n.includes('reflection') || n.includes('gamification') ||
    n.includes('state') || n.includes('prioritization') || n.includes('portfolio')
  ) {
    skillRole = 'supporting';
  }

  const targetLevel = skillRole === 'primary' ? 2 : 1;

  // 1. Transformer Architecture Understanding (GenAI Only)
  if (isGenAI && (n.includes('transformer') || n.includes('architecture') || n.includes('kiến trúc') || n.includes('next-token'))) {
    return {
      name_vi: 'Transformer Architecture & Next-Token Mechanics',
      name_en: 'Transformer Architecture & Next-Token Mechanics',
      guidingQuestion_vi: 'Làm thế nào để con hiểu bản chất mô hình ngôn ngữ lớn (LLM) dự đoán từ tiếp theo và khai thác sức mạnh đó để ra lệnh chính xác cho AI?',
      guidingQuestion_en: 'How well can I understand how LLMs predict next tokens and harness that mechanics to accurately direct AI outputs?',
      desc_vi: 'Hiểu cách AI học từ hàng triệu bài viết để đoán từ tiếp theo, nhận thức rõ AI không phải thần thánh mà là cỗ máy dự đoán ngôn ngữ.',
      desc_en: 'Understand that LLMs calculate statistical word distributions, using structured prompting to guide text generation.',
      skillRole,
      targetLevel: 2,
      targetCourse: lang === 'VI' ? 'Mục tiêu: Level 2' : 'Target: Level 2',
      rubricLevels: [
        {
          level: 1,
          label: 'Level 1',
          indicatorsCount: 2,
          indicators: lang === 'VI' ? [
            'Con có thể hiểu và giải thích được AI hoạt động bằng cách dự đoán từng từ tiếp theo (Next-token prediction) dựa trên xác suất thống kê.',
            'Con có thể nhận diện được AI không có suy nghĩ hay cảm xúc thực sự, và không phụ thuộc tuyệt đối vào câu trả lời đầu tiên của AI.'
          ] : [
            'I can explain that AI works by predicting the next token based on statistical probabilities from training data.',
            'I can recognize that AI lacks genuine emotion/consciousness and avoid taking its first output as absolute truth.'
          ]
        },
        {
          level: 2,
          label: 'Level 2',
          indicatorsCount: 3,
          indicators: lang === 'VI' ? [
            'Con có thể cấu trúc câu lệnh theo khung chuẩn (Role - Context - Task - Constraint) để định hướng luồng sinh từ của AI.',
            'Con có thể lặp lại và tinh chỉnh câu lệnh (Iterative Prompting) tối thiểu 2 lần khi AI sinh kết quả chưa đúng mong đợi.',
            'Con có thể tự đóng gói được thư viện prompt mẫu chuẩn (SP4 Prompt Cookbook) để tái sử dụng cho các bài tập thực hành.'
          ] : [
            'I can format prompts using the standard Role-Context-Task-Constraint framework to guide output generation.',
            'I can iteratively refine prompts across at least 2 turns when initial responses deviate from requirements.',
            'I can build and package a personal Prompt Cookbook (SP4) for reuse across practical projects.'
          ]
        },
        {
          level: 3,
          label: 'Level 3',
          indicatorsCount: 2,
          indicators: lang === 'VI' ? [
            'Con có thể giải thích trực quan cho Mentor hoặc bạn bè về cơ chế Self-Attention và cách AI liên kết các từ trong ngữ cảnh dài.',
            'Con có thể điều chỉnh tham số hoặc cấu trúc câu lệnh để kiểm soát độ sáng tạo (Temperature) và phong cách hành văn của AI.'
          ] : [
            'I can explain the Self-Attention mechanism and contextual token weighting clearly to peers and mentors.',
            'I can tune prompt parameters and structural cues to modulate AI creativity and persona.'
          ]
        },
        {
          level: 4,
          label: 'Level 4',
          indicatorsCount: 2,
          indicators: lang === 'VI' ? [
            'Con có thể thiết kế các luồng prompt đa tầng phức tạp (Socratic Prompting) biến AI thành gia sư sư phạm gợi mở tư duy.',
            'Con có thể tự động hóa quy trình phân tích và tối ưu hóa token prompt cho các ứng dụng chatbot AI quy mô lớn.'
          ] : [
            'I can architect multi-turn Socratic prompts that turn AI into an interactive pedagogical tutor.',
            'I can optimize prompt token efficiency and automated evaluation pipelines for scalable AI applications.'
          ]
        },
        {
          level: 5,
          label: 'Level 5',
          indicatorsCount: 2,
          indicators: lang === 'VI' ? [
            'Con có thể làm chủ kiến trúc Transformer để xây dựng các giải pháp tự động hóa AI đa tác nhân hoàn chỉnh.',
            'Con có thể chuyển giao tri thức và hướng dẫn học sinh khác hiểu đúng bản chất công nghệ AI mà không bị ảo tưởng.'
          ] : [
            'I can master Transformer concepts to design complex multi-agent automated AI workflows.',
            'I can transfer mental models and mentor peers in demystifying AI capabilities and limits.'
          ]
        }
      ],
      evidence: lang === 'VI'
        ? 'Bộ Prompt Cookbook (SP4) gồm 5+ prompt chuẩn cấu trúc; Nhật ký prompt thể hiện tối thiểu 2 vòng tinh chỉnh lặp lại.'
        : 'Prompt Cookbook repository (SP4) with 5+ structured templates; Prompt history showing ≥ 2 iteration loops.'
    };
  }

  // 2. Model Limitations & Hallucination (GenAI Only)
  if (isGenAI && (n.includes('limitation') || n.includes('giới hạn') || n.includes('hallucination') || n.includes('ảo giác'))) {
    return {
      name_vi: 'Model Limitations & Hallucination Detection',
      name_en: 'Model Limitations & Hallucination Detection',
      guidingQuestion_vi: 'Làm thế nào để con luôn giữ tư duy phản biện, phát hiện lỗi ảo giác của AI và kiểm chứng chéo trước khi xuất bản sản phẩm?',
      guidingQuestion_en: 'How well can I maintain critical thinking, spot AI hallucinations, and cross-verify facts before publishing products?',
      desc_vi: 'Nhận biết khi nào AI tự bịa thông tin sai sự thật và luôn có thói quen kiểm chứng chéo với nguồn tin cậy trước khi áp dụng.',
      desc_en: 'Detect when AI fabricates facts, consistently cross-verifying outputs with trustworthy sources.',
      skillRole,
      targetLevel: 2,
      targetCourse: lang === 'VI' ? 'Mục tiêu: Level 2' : 'Target: Level 2',
      rubricLevels: [
        {
          level: 1,
          label: 'Level 1',
          indicatorsCount: 2,
          indicators: lang === 'VI' ? [
            'Con có thể hiểu được AI có thể bịa chuyện (ảo giác / hallucination) và không bao giờ copy bài mù quáng.',
            'Con có thể nhận ra khi AI trả lời một thông tin đáng ngờ và đặt câu hỏi nghi vấn để kiểm tra lại.'
          ] : [
            'I can acknowledge that AI hallucinates facts and refrain from blind copy-pasting.',
            'I can identify suspicious AI responses and formulate verification questions.'
          ]
        },
        {
          level: 2,
          label: 'Level 2',
          indicatorsCount: 3,
          indicators: lang === 'VI' ? [
            'Con có thể chủ động kiểm chứng chéo thông tin AI sinh ra với Google Search, tài liệu học tập hoặc sách giáo khoa.',
            'Con có thể viết câu lệnh ràng buộc nghiêm ngặt (ví dụ: "Chỉ trả lời dựa trên tài liệu đính kèm, nếu không có hãy nói không biết").',
            'Con có thể nạp tài liệu tin cậy vào công cụ AI (như SP6 NotebookLM) để ép AI trích dẫn chính xác nguồn.'
          ] : [
            'I can cross-check AI claims against reputable search results, textbooks, or official references.',
            'I can add strict negative constraints in prompts (e.g., "Only answer based on provided context; if absent, state unknown").',
            'I can ground AI models with authoritative source documents (SP6 NotebookLM) requiring explicit citations.'
          ]
        },
        {
          level: 3,
          label: 'Level 3',
          indicatorsCount: 2,
          indicators: lang === 'VI' ? [
            'Con có thể thiết kế bài kiểm tra thử nghiệm (Stress-test Prompt) để kiểm tra xem hệ thống AI có bị bẫy ảo giác không.',
            'Con có thể xây dựng quy trình tự động đối chiếu dữ liệu giữa nhiều nguồn LLM khác nhau để xác nhận tính chính xác.'
          ] : [
            'I can design edge-case stress tests to identify subtle hallucination triggers in AI systems.',
            'I can build multi-LLM comparative verification protocols to confirm factual accuracy.'
          ]
        },
        {
          level: 4,
          label: 'Level 4',
          indicatorsCount: 2,
          indicators: lang === 'VI' ? [
            'Con có thể tích hợp cơ chế cảnh báo độ tin cậy và trích dẫn nguồn minh bạch (Transparency Disclaimer) vào sản phẩm web SP12.',
            'Con có thể giảng giải và hướng dẫn bạn bè trong lớp cách phòng ngừa và phát hiện thông tin giả do AI tạo ra.'
          ] : [
            'I can integrate transparent source attribution and confidence indicators into deployed web applications (SP12).',
            'I can mentor others on identifying and preventing AI-generated misinformation.'
          ]
        },
        {
          level: 5,
          label: 'Level 5',
          indicatorsCount: 2,
          indicators: lang === 'VI' ? [
            'Con có thể xây dựng hệ thống kiểm tra sự thật tự động (Automated Fact-Checking Pipeline) cho các sản phẩm dữ liệu lớn.',
            'Con có thể đóng vai trò thẩm định viên độc lập về độ chính xác và tính trung thực của các nội dung do AI tạo ra.'
          ] : [
            'I can architect automated fact-checking pipelines across large-scale knowledge applications.',
            'I can act as an authoritative evaluator for truthfulness and reliability in AI-generated assets.'
          ]
        }
      ],
      evidence: lang === 'VI'
        ? 'Bản đối chiếu thông tin thật vs thông tin AI sinh ra trong SP6 (NotebookLM); Ràng buộc chống ảo giác có trong code SP10 & SP12.'
        : 'Fact-checking audit sheet in SP6 (NotebookLM); Anti-hallucination constraint rules in SP10 & SP12.'
    };
  }

  // 3. Context Window Management (GenAI Only)
  if (isGenAI && (n.includes('context') || n.includes('ngữ cảnh') || n.includes('window') || n.includes('chunking'))) {
    return {
      name_vi: 'Context Window & Memory Management',
      name_en: 'Context Window & Memory Management',
      guidingQuestion_vi: 'Làm thế nào để con cung cấp bối cảnh ngắn gọn, chính xác để AI ghi nhớ đúng mục tiêu dự án mà không bị tràn bộ nhớ?',
      guidingQuestion_en: 'How well can I seed concise, structured context so AI retains core project memory without attention drift?',
      desc_vi: 'Biết cách cung cấp thông tin nền đầy đủ, súc tích để AI hiểu đúng ngữ cảnh và không bị "quên" nội dung quan trọng trước đó.',
      desc_en: 'Provide structured background context efficiently so AI retains essential project state without degradation.',
      skillRole,
      targetLevel: 2,
      targetCourse: lang === 'VI' ? 'Mục tiêu: Level 2' : 'Target: Level 2',
      rubricLevels: [
        {
          level: 1,
          label: 'Level 1',
          indicatorsCount: 2,
          indicators: lang === 'VI' ? [
            'Con có thể hiểu được khái niệm "bộ nhớ tạm" của AI và nhận biết khi đoạn chat quá dài AI sẽ bắt đầu quên yêu cầu ban đầu.',
            'Con có thể chủ động mở một đoạn hội thoại mới (New Chat) khi muốn chuyển sang làm một chủ đề hoặc nhiệm vụ hoàn toàn khác.'
          ] : [
            'I can understand AI temporary context limits and notice when long conversations suffer from memory fade.',
            'I can start a clean New Chat session when pivoting to an unrelated task.'
          ]
        },
        {
          level: 2,
          label: 'Level 2',
          indicatorsCount: 3,
          indicators: lang === 'VI' ? [
            'Con có thể tóm tắt các quyết định quan trọng của phiên làm việc trước và nạp lại vào phiên chat mới (Context Seeding).',
            'Con có thể tổ chức dữ liệu đầu vào thành các đoạn có cấu trúc phân tầng (tiêu đề, khối dữ liệu) để AI dễ nắm bắt.',
            'Con có thể lược bỏ các chi tiết thừa, mã rác trước khi đưa tài liệu vào khung chat của AI.'
          ] : [
            'I can summarize essential decisions from prior sessions and inject them as seed context in new chats.',
            'I can structure raw inputs into hierarchical blocks (headers, data sections) for clear parsing.',
            'I can clean boilerplate and noise from documents before feeding them into the AI context window.'
          ]
        },
        {
          level: 3,
          label: 'Level 3',
          indicatorsCount: 2,
          indicators: lang === 'VI' ? [
            'Con có thể thiết kế các chiến lược phân đoạn tài liệu dài (Chunking) để vượt qua giới hạn độ dài của cửa sổ ngữ cảnh.',
            'Con có thể tối ưu vị trí đặt thông tin quan trọng (ở đầu và cuối prompt) để tránh hiện tượng AI "quên nội dung ở giữa".'
          ] : [
            'I can design chunking strategies to process long multi-page documents exceeding window limits.',
            'I can place crucial instructions at prompt boundaries to prevent "Lost in the Middle" attention degradation.'
          ]
        },
        {
          level: 4,
          label: 'Level 4',
          indicatorsCount: 2,
          indicators: lang === 'VI' ? [
            'Con có thể thiết lập kiến trúc nhớ dài hạn (External Memory / Vector Store) cho chatbot và trợ lý ảo.',
            'Con có thể tối ưu hóa lượng token tiêu thụ trong các luồng tương tác tự động đa tác nhân.'
          ] : [
            'I can architect long-term external memory indexing for customized chatbots.',
            'I can minimize multi-agent communication payload overhead across complex workflows.'
          ]
        },
        {
          level: 5,
          label: 'Level 5',
          indicatorsCount: 2,
          indicators: lang === 'VI' ? [
            'Con có thể làm chủ kiến trúc RAG (Retrieval-Augmented Generation) để mở rộng vô hạn tri thức cho trợ lý AI.',
            'Con có thể xây dựng các quy chuẩn quản trị ngữ cảnh cho toàn bộ dự án phần mềm phức tạp.'
          ] : [
            'I can implement custom RAG architectures expanding AI context indefinitely with zero memory loss.',
            'I can establish contextual standards for enterprise-grade generative AI applications.'
          ]
        }
      ],
      evidence: lang === 'VI'
        ? 'Nhật ký chat thể hiện việc nạp bối cảnh theo từng bước logic; Cấu trúc tài liệu sạch trong SP6 và SP8.'
        : 'Chat logs demonstrating step-by-step context seeding; Clean structured inputs in SP6 and SP8.'
    };
  }

  // 4. Responsible AI & Data Privacy Ethics (GenAI Only)
  if (isGenAI && (n.includes('privacy') || n.includes('bảo mật') || n.includes('responsible') || n.includes('trách nhiệm') || n.includes('bias') || n.includes('đạo đức'))) {
    return {
      name_vi: 'Sử dụng AI có trách nhiệm & Bảo mật dữ liệu',
      name_en: 'Responsible AI & Data Privacy Ethics',
      guidingQuestion_vi: 'Làm thế nào để con bảo vệ dữ liệu nhạy cảm của bản thân và tôn trọng bản quyền số khi làm việc cùng AI?',
      guidingQuestion_en: 'How well can I safeguard sensitive personal data and practice digital attribution ethics with AI?',
      desc_vi: 'Bảo vệ an toàn thông tin cá nhân (không đưa mật khẩu, địa chỉ, số điện thoại lên AI) và tôn trọng bản quyền số.',
      desc_en: 'Protect sensitive personal identifiable information and honor copyright attribution when building products.',
      skillRole,
      targetLevel: 2,
      targetCourse: lang === 'VI' ? 'Mục tiêu: Level 2' : 'Target: Level 2',
      rubricLevels: [
        {
          level: 1,
          label: 'Level 1',
          indicatorsCount: 2,
          indicators: lang === 'VI' ? [
            'Con có thể nhận biết được các thông tin nhạy cảm (mật khẩu, số CCCD, địa chỉ nhà, số điện thoại) và không chia sẻ cho AI.',
            'Con có thể tôn trọng bản quyền số, không yêu cầu AI sao chép nguyên văn tác phẩm có bản quyền của người khác.'
          ] : [
            'I can recognize sensitive PII (passwords, IDs, home addresses, phone numbers) and avoid feeding them to public AI models.',
            'I can respect digital copyright and avoid asking AI to clone copyrighted creative works.'
          ]
        },
        {
          level: 2,
          label: 'Level 2',
          indicatorsCount: 3,
          indicators: lang === 'VI' ? [
            'Con có thể chủ động ẩn danh hóa (Anonymize) thông tin cá nhân của người thân/bạn bè trước khi đưa vào dữ liệu huấn luyện hoặc chat.',
            'Con có thể ghi rõ nguồn gốc (Attribution Disclaimer) khi sử dụng hình ảnh hoặc văn bản do AI hỗ trợ tạo ra trên sản phẩm web.',
            'Con có thể nhận diện được các thiên kiến (Bias) và định kiến xã hội tiềm ẩn trong câu trả lời của AI để yêu cầu chỉnh sửa khách quan.'
          ] : [
            'I can anonymize personal data from peers and family before using it in prompt contexts.',
            'I can include proper attribution notices acknowledging AI assistance on deployed web projects.',
            'I can identify social biases in AI responses and request balanced, neutral perspectives.'
          ]
        },
        {
          level: 3,
          label: 'Level 3',
          indicatorsCount: 2,
          indicators: lang === 'VI' ? [
            'Con có thể đánh giá rủi ro bảo mật dữ liệu khi kết nối các API AI bên thứ ba vào ứng dụng web cá nhân.',
            'Con có thể soạn thảo chính sách bảo mật (Privacy Policy) minh bạch cho người dùng cuối trên sản phẩm của mình.'
          ] : [
            'I can assess data security risks when integrating third-party AI APIs into personal web apps.',
            'I can draft a clear Privacy Policy informing users how data is handled in my digital products.'
          ]
        },
        {
          level: 4,
          label: 'Level 4',
          indicatorsCount: 2,
          indicators: lang === 'VI' ? [
            'Con có thể thiết lập các bộ lọc an toàn nội dung (Content Moderation Filters) ngăn chặn mã độc hại hoặc ngôn từ không phù hợp.',
            'Con có thể chia sẻ kiến thức sử dụng công nghệ nhân văn và có đạo đức cho cộng đồng học sinh tại trường.'
          ] : [
            'I can implement automated safety moderation guards filtering malicious inputs or harmful content.',
            'I can advocate for ethical and human-centric AI literacy within school and youth communities.'
          ]
        },
        {
          level: 5,
          label: 'Level 5',
          indicatorsCount: 2,
          indicators: lang === 'VI' ? [
            'Con có thể dẫn dắt các sáng kiến cộng đồng về đạo đức AI và an toàn thông tin số trong trường học.',
            'Con có thể thiết kế các tiêu chuẩn kiểm thử đạo đức (Ethical AI Framework) cho các sản phẩm phần mềm dành cho thanh thiếu niên.'
          ] : [
            'I can champion youth ethical AI safety initiatives across communities and schools.',
            'I can establish ethical testing frameworks for youth-focused digital applications.'
          ]
        }
      ],
      evidence: lang === 'VI'
        ? 'Trang Chính sách Bảo mật (Privacy Policy) và Disclaimer bản quyền số hiển thị đầy đủ trên SP1, SP6 và SP12.'
        : 'Privacy Policy page and attribution disclaimers visible on live SP1, SP6, and SP12.'
    };
  }

  // 5. Prompt Engineering & Few-shot / CoT (GenAI Only)
  if (isGenAI && (n.includes('prompt') || n.includes('few-shot') || n.includes('chain-of-thought') || n.includes('clarifying'))) {
    return {
      name_vi: 'Structured Prompt Engineering & CoT',
      name_en: 'Structured Prompt Engineering & CoT',
      guidingQuestion_vi: 'Làm thế nào để con thiết kế câu lệnh chi tiết, có ví dụ mẫu (Few-shot) và tư duy từng bước (Chain-of-Thought) để AI giải quyết bài toán phức tạp?',
      guidingQuestion_en: 'How well can I architect detailed prompts with Few-shot examples and Chain-of-Thought reasoning to solve complex challenges?',
      desc_vi: 'Làm chủ các kỹ thuật thiết kế câu lệnh từ cơ bản đến nâng cao để khai thác tối đa năng suất của các mô hình AI.',
      desc_en: 'Master structured prompting techniques from standard framing to Few-shot and Chain-of-Thought reasoning.',
      skillRole,
      targetLevel: 2,
      targetCourse: lang === 'VI' ? 'Mục tiêu: Level 2' : 'Target: Level 2',
      rubricLevels: [
        {
          level: 1,
          label: 'Level 1',
          indicatorsCount: 2,
          indicators: lang === 'VI' ? [
            'Con có thể đặt câu hỏi rõ ràng, đầy đủ ngữ pháp thay vì chỉ gõ 1-2 từ khóa tìm kiếm ngắn.',
            'Con có thể trả lời các câu hỏi làm rõ của AI khi câu hỏi ban đầu chưa đủ thông tin.'
          ] : [
            'I can ask well-formed, descriptive questions rather than typing cryptic keywords.',
            'I can answer AI clarifying questions when initial context is incomplete.'
          ]
        },
        {
          level: 2,
          label: 'Level 2',
          indicatorsCount: 3,
          indicators: lang === 'VI' ? [
            'Con có thể cung cấp 2-3 ví dụ mẫu chuẩn (Few-shot Examples) trong prompt để AI làm theo đúng định dạng đầu ra.',
            'Con có thể yêu cầu AI "Suy nghĩ từng bước" (Chain-of-Thought) để giải quyết các vấn đề logic hoặc thuật toán.',
            'Con có thể chỉ định vai trò chuyên gia (Role Persona) phù hợp cho từng bài toán thực tế.'
          ] : [
            'I can supply 2-3 Few-shot input-output examples in prompts to enforce target schemas.',
            'I can prompt AI to "Think step-by-step" (Chain-of-Thought) for logical and algorithmic problems.',
            'I can assign specific expert personas tailored to the domain requirements.'
          ]
        },
        {
          level: 3,
          label: 'Level 3',
          indicatorsCount: 2,
          indicators: lang === 'VI' ? [
            'Con có thể thiết kế các cấu trúc System Prompt phức tạp kiểm soát hành vi dài hạn của trợ lý ảo.',
            'Con có thể đo lường và so sánh hiệu quả giữa các kiểu prompt khác nhau trên cùng một tác vụ (A/B Testing Prompt).'
          ] : [
            'I can design complex system prompt architectures regulating multi-session agent behavior.',
            'I can conduct prompt A/B testing to benchmark quality variance across different framings.'
          ]
        },
        {
          level: 4,
          label: 'Level 4',
          indicatorsCount: 2,
          indicators: lang === 'VI' ? [
            'Con có thể tự động hóa việc tạo và tối ưu hóa câu lệnh (DSPy / Metaprompting) cho các ứng dụng thông minh.',
            'Con có thể xuất bản bộ công thức prompt chuẩn mực được cộng đồng học sinh đón nhận và áp dụng.'
          ] : [
            'I can implement metaprompting and programmatic prompt optimization pipelines.',
            'I can publish standardized prompt frameworks adopted by school and learner communities.'
          ]
        },
        {
          level: 5,
          label: 'Level 5',
          indicatorsCount: 2,
          indicators: lang === 'VI' ? [
            'Con có thể xây dựng các bộ công cụ Prompt Engine tự động thích ứng với nhiều dòng mô hình AI khác nhau.',
            'Con có thể đào tạo và hướng dẫn học sinh khác trở thành những chuyên gia chỉ huy AI độc lập.'
          ] : [
            'I can construct cross-model adaptable Prompt Engines for resilient multi-agent execution.',
            'I can mentor and certify others in advanced prompt engineering methodologies.'
          ]
        }
      ],
      evidence: lang === 'VI'
        ? 'Bộ sưu tập Prompt Cookbook trong SP4 và câu lệnh phân luồng Socratic trong SP10 AI Tutor.'
        : 'Curated Prompt Cookbook in SP4 and pedagogical reasoning flows in SP10 AI Tutor.'
    };
  }

  // 6. AI-Assisted Learning & Synthesis (GenAI Only)
  if (isGenAI && (n.includes('ai-assisted') || n.includes('summariz') || n.includes('tóm tắt') || n.includes('translation') || n.includes('notebooklm'))) {
    return {
      name_vi: 'AI-Assisted Self-Learning & Knowledge Synthesis',
      name_en: 'AI-Assisted Self-Learning & Knowledge Synthesis',
      guidingQuestion_vi: 'Làm thế nào để con biến AI thành người gia sư 1-1 hỗ trợ tóm tắt sách, dịch thuật và biến tài liệu khô khan thành kiến thức sinh động?',
      guidingQuestion_en: 'How well can I turn AI into a 1-on-1 personal tutor to synthesize research, translate languages, and master complex subjects?',
      desc_vi: 'Sử dụng AI để tự học, tóm tắt tài liệu, dịch thuật chuyên sâu và tạo lộ trình học tập cá nhân hóa.',
      desc_en: 'Leverage AI tools to accelerate self-directed learning, generate audio podcasts, and synthesize knowledge.',
      skillRole,
      targetLevel: 2,
      targetCourse: lang === 'VI' ? 'Mục tiêu: Level 2' : 'Target: Level 2',
      rubricLevels: [
        {
          level: 1,
          label: 'Level 1',
          indicatorsCount: 2,
          indicators: lang === 'VI' ? [
            'Con có thể dùng AI để tóm tắt các đoạn văn bản dài thành các ý chính ngắn gọn.',
            'Con có thể dịch các bài viết tiếng Anh sang tiếng Việt để hỗ trợ việc đọc hiểu tài liệu cơ bản.'
          ] : [
            'I can use AI to condense lengthy articles into bulleted key summaries.',
            'I can translate foreign articles to support basic reading comprehension.'
          ]
        },
        {
          level: 2,
          label: 'Level 2',
          indicatorsCount: 3,
          indicators: lang === 'VI' ? [
            'Con có thể sử dụng NotebookLM (SP6) để biến tài liệu học tập thành bản tóm tắt có trích dẫn và tạo bản podcast âm thanh (Audio Overview).',
            'Con có thể yêu cầu AI tạo bảng so sánh (Comparison Table) giữa các khái niệm phức tạp để hiểu sâu bản chất.',
            'Con có thể dùng AI để sinh bộ Flashcards hoặc câu hỏi trắc nghiệm kiểm tra kiến thức bản thân (SP7).'
          ] : [
            'I can use NotebookLM (SP6) to convert source documents into cited summaries and generate Audio Overviews.',
            'I can prompt AI to generate comparative tables contrasting complex conceptual frameworks.',
            'I can generate self-quizzing flashcards and test suites to assess personal mastery (SP7).'
          ]
        },
        {
          level: 3,
          label: 'Level 3',
          indicatorsCount: 2,
          indicators: lang === 'VI' ? [
            'Con có thể xây dựng lộ trình học tập cá nhân hóa nhiều tuần cho một môn học mới với sự đồng hành của AI.',
            'Con có thể tổng hợp kiến thức từ nhiều nguồn tài liệu trái chiều thành bài phân tích đa chiều, khách quan.'
          ] : [
            'I can build multi-week personalized learning roadmaps for new subjects using AI guidance.',
            'I can synthesize contradictory information sources into balanced multi-perspective analyses.'
          ]
        },
        {
          level: 4,
          label: 'Level 4',
          indicatorsCount: 2,
          indicators: lang === 'VI' ? [
            'Con có thể xây dựng kho tri thức số thứ hai (Second Brain) kết nối tự động với AI để quản trị kiến thức trọn đời.',
            'Con có thể chia sẻ phương pháp học tập siêu tốc với AI cho các bạn trong câu lạc bộ hoặc trường học.'
          ] : [
            'I can architect a digital Second Brain knowledge graph integrated with AI for lifelong learning.',
            'I can instruct and inspire peers on accelerated learning workflows powered by AI.'
          ]
        },
        {
          level: 5,
          label: 'Level 5',
          indicatorsCount: 2,
          indicators: lang === 'VI' ? [
            'Con có thể thiết kế các hệ thống sư phạm tương tác hỗ trợ hàng ngàn học sinh tự học cùng AI.',
            'Con có thể lan tỏa văn hóa học tập suốt đời (Lifelong Learning) bằng các bài viết và sản phẩm số truyền cảm hứng.'
          ] : [
            'I can design interactive pedagogical systems supporting thousands of learners with AI.',
            'I can champion lifelong learning culture through inspirational digital artifacts.'
          ]
        }
      ],
      evidence: lang === 'VI'
        ? 'Kho tài liệu tri thức NotebookLM (SP6) kèm file audio podcast; Hệ thống Flashcards & Quiz ôn thi (SP7).'
        : 'Curated NotebookLM knowledge notebook (SP6) with audio podcast; Interactive Flashcard & Quiz hub (SP7).'
    };
  }

  // 7. AI Creation & Problem Solving / System Debugging (GenAI Only)
  if (isGenAI && (n.includes('debug') || n.includes('sửa lỗi') || n.includes('problem solving') || n.includes('creativ') || n.includes('sáng tạo') || n.includes('agent'))) {
    return {
      name_vi: 'AI-Powered Problem Solving & Creative Building',
      name_en: 'AI-Powered Problem Solving & Creative Building',
      guidingQuestion_vi: 'Làm thế nào để con phối hợp với AI phát hiện nguyên nhân gốc rễ của lỗi (Root Cause) và sáng tạo các giải pháp kỹ thuật vượt trội?',
      guidingQuestion_en: 'How well can I collaborate with AI to diagnose error root causes and architect innovative technical solutions?',
      desc_vi: 'Sử dụng AI để phân tích logic, cô lập lỗi kỹ thuật và sáng tạo giao diện sản phẩm số độc đáo.',
      desc_en: 'Collaborate with AI to analyze system logic, isolate bugs, and construct creative digital assets.',
      skillRole,
      targetLevel: 2,
      targetCourse: lang === 'VI' ? 'Mục tiêu: Level 2' : 'Target: Level 2',
      rubricLevels: [
        {
          level: 1,
          label: 'Level 1',
          indicatorsCount: 2,
          indicators: lang === 'VI' ? [
            'Con có thể sao chép thông báo lỗi từ console hoặc màn hình vào AI để hỏi nguyên nhân thay vì bỏ cuộc.',
            'Con có thể dùng AI gợi ý ý tưởng hình ảnh hoặc màu sắc cơ bản cho trang web cá nhân.'
          ] : [
            'I can copy error messages directly into AI to inquire about possible causes without quitting.',
            'I can prompt AI for basic visual ideas and color schemes for personal webpages.'
          ]
        },
        {
          level: 2,
          label: 'Level 2',
          indicatorsCount: 3,
          indicators: lang === 'VI' ? [
            'Con có thể cô lập đoạn code hoặc logic bị lỗi và yêu cầu AI giải thích vì sao lỗi xảy ra trước khi áp dụng bản sửa.',
            'Con có thể phối hợp với AI để nâng cấp giao diện sản phẩm qua tối thiểu 2 phiên bản (V1 ban đầu ➔ V2 hoàn thiện).',
            'Con có thể sử dụng AI để tạo ra các biến thể nội dung và hình ảnh độc đáo cho 12 sản phẩm thực tế.'
          ] : [
            'I can isolate the problematic code block and ask AI to explain root causes before applying fixes.',
            'I can collaborate with AI to iteratively upgrade product UI across at least 2 versions (V1 raw ➔ V2 polished).',
            'I can prompt AI to generate unique content variations and assets across the 12 micro products.'
          ]
        },
        {
          level: 3,
          label: 'Level 3',
          indicatorsCount: 2,
          indicators: lang === 'VI' ? [
            'Con có thể chủ động đề xuất nhiều giải pháp kỹ thuật thay thế (Alternative Solutions) và nhờ AI phân tích ưu nhược điểm.',
            'Con có thể xử lý các trường hợp ngoại lệ (Edge Cases) trong logic ứng dụng để đảm bảo sản phẩm không bị sập.'
          ] : [
            'I can propose alternative architectural options and use AI to evaluate trade-offs.',
            'I can anticipate and test edge cases in application logic to prevent crashes and state errors.'
          ]
        },
        {
          level: 4,
          label: 'Level 4',
          indicatorsCount: 2,
          indicators: lang === 'VI' ? [
            'Con có thể tự động hóa quy trình kiểm thử và tự phục hồi lỗi (Self-healing systems) trong ứng dụng web.',
            'Con có thể làm chủ toàn diện vòng đời phát triển sản phẩm từ ý tưởng, logic phức tạp đến triển khai trực tuyến.'
          ] : [
            'I can architect automated test harnesses and resilient self-healing mechanisms in web apps.',
            'I can independently command the full product development lifecycle from inception to live deployment.'
          ]
        },
        {
          level: 5,
          label: 'Level 5',
          indicatorsCount: 2,
          indicators: lang === 'VI' ? [
            'Con có thể kiến trúc các hệ thống phần mềm quy mô lớn tự động phát hiện và khắc phục sự cố tức thời.',
            'Con có thể đóng vai trò cố vấn kỹ thuật giải quyết các sự cố hệ thống phức tạp nhất.'
          ] : [
            'I can architect self-diagnosing, distributed applications that self-heal under load.',
            'I can serve as a lead technical mentor resolving high-complexity system failures.'
          ]
        }
      ],
      evidence: lang === 'VI'
        ? 'Lịch sử gỡ lỗi và nhật ký nâng cấp Version (V1 → V2) được ghi nhận đầy đủ trong hồ sơ sản phẩm (SP7, SP8, SP11).'
        : 'Bug diagnostic logs and version upgrade history (V1 → V2) documented in product repos (SP7, SP8, SP11).'
    };
  }

  // Generic fallback for any other Conan1 skill (Pure 5-Level CBE Continuum)
  const resolvedViName = skillObj?.name_vi || skillName;
  const resolvedEnName = skillObj?.name || skillName;

  return {
    name_vi: resolvedViName,
    name_en: resolvedEnName,
    guidingQuestion_vi: `Làm thế nào để con áp dụng có bài bản kỹ năng "${resolvedViName}" vào việc hoàn thiện sản phẩm số thực tế?`,
    guidingQuestion_en: `How well can I systematically apply "${resolvedEnName}" to develop and refine authentic digital products?`,
    desc_vi: `Rèn luyện kỹ năng thực hành "${resolvedViName}" gắn liền với quá trình xây dựng 12 sản phẩm số và tự chủ công nghệ.`,
    desc_en: `Cultivate practical "${resolvedEnName}" competencies connected with building the 12 micro digital products.`,
    skillRole,
    targetLevel,
    targetCourse: lang === 'VI' ? `Mục tiêu: Level ${targetLevel}` : `Target: Level ${targetLevel}`,
    rubricLevels: [
      {
        level: 1,
        label: 'Level 1',
        indicatorsCount: 2,
        indicators: lang === 'VI' ? [
          `Con có thể nắm bắt các khái niệm cơ bản của "${resolvedViName}" và thực hiện theo hướng dẫn mẫu của Mentor.`,
          'Con có thể nhận ra khi nào cần trợ giúp và biết cách đặt câu hỏi làm rõ.'
        ] : [
          `I can understand foundational concepts of "${resolvedEnName}" and follow guided walkthroughs.`,
          'I can recognize when assistance is needed and ask clarifying questions.'
        ]
      },
      {
        level: 2,
        label: 'Level 2',
        indicatorsCount: 3,
        indicators: lang === 'VI' ? [
          `Con có thể tự chủ áp dụng kỹ năng "${resolvedViName}" vào các yêu cầu trong Brief sản phẩm mà không cần nhắc nhở.`,
          'Con có thể kiểm tra lại kết quả thực hiện và tự phát hiện các sai sót cơ bản.',
          'Con có thể ghi nhận lại bài học kinh nghiệm sau khi hoàn thành nhiệm vụ.'
        ] : [
          `I can independently apply "${resolvedEnName}" to satisfy project Brief requirements without prompting.`,
          'I can review my own work and catch routine flaws autonomously.',
          'I can log lessons learned upon completing project milestones.'
        ]
      },
      {
        level: 3,
        label: 'Level 3',
        indicatorsCount: 2,
        indicators: lang === 'VI' ? [
          `Con có thể vận dụng linh hoạt kỹ năng "${resolvedViName}" để xử lý các tình huống phức tạp hoặc bất ngờ.`,
          'Con có thể chia sẻ và giải thích rõ ràng cách làm cho các bạn khác trong nhóm.'
        ] : [
          `I can adaptively utilize "${resolvedEnName}" across unexpected or challenging project scenarios.`,
          'I can clearly explain approaches and mentor peers in collaborative settings.'
        ]
      },
      {
        level: 4,
        label: 'Level 4',
        indicatorsCount: 2,
        indicators: lang === 'VI' ? [
          `Con có thể tối ưu hóa và sáng tạo phương pháp mới để nâng cao chất lượng kỹ năng "${resolvedViName}".`,
          'Con có thể tự tin thuyết trình bảo vệ sản phẩm xuất sắc trước Hội đồng chuyên môn.'
        ] : [
          `I can innovate and optimize novel methodologies leveraging "${resolvedEnName}" for maximum impact.`,
          'I can authoritatively defend product craftsmanship before evaluation panels.'
        ]
      },
      {
        level: 5,
        label: 'Level 5',
        indicatorsCount: 2,
        indicators: lang === 'VI' ? [
          `Con có thể làm chủ toàn diện và xây dựng các tài liệu hướng dẫn chuẩn mực cho kỹ năng "${resolvedViName}".`,
          'Con có thể hỗ trợ và đào tạo thế hệ học sinh tiếp theo đạt đến mức độ thành thạo.'
        ] : [
          `I can master and construct standard operating playbooks for "${resolvedEnName}".`,
          'I can guide and mentor upcoming cohorts toward skill mastery.'
        ]
      }
    ],
    evidence: lang === 'VI'
      ? `Sản phẩm số thực tế thể hiện năng lực "${resolvedViName}" đạt chuẩn đầu ra và được Hội đồng đánh giá công nhận.`
      : `Authentic digital project deliverables demonstrating "${resolvedEnName}" competency verified by review panel.`
  };
}

// Icon helper per domain slug
function getDomainIcon(slug) {
  switch (slug) {
    case 'domain-generative-ai':
      return Sparkles;
    case 'domain-core-cognitive':
      return Brain;
    case 'domain-customer-understanding':
      return Users;
    case 'domain-digital-product-development':
      return Layers;
    case 'domain-project-management':
      return FolderKanban;
    case 'domain-problem-solving-decision-making':
      return Target;
    case 'domain-learning':
      return BookOpen;
    case 'domain-entrepreneurship':
      return TrendingUp;
    case 'domain-personal-effectiveness':
      return Award;
    default:
      return Users;
  }
}

export default function App() {
  const [currentRoute, setCurrentRoute] = useState(() => {
    const path = window.location.pathname;
    const r = path.startsWith('/ccs') ? path.substring(4) || '/' : path || '/';
    if (r === '/exit-plan' || r === '/graduation') return '/graduation-plan';
    if (r === '/courses') return '/course-progression';
    return r;
  });

  const [lang, setLang] = useState('VI');
  const [copiedId, setCopiedId] = useState(null);

  // Accordion open state for Areas and Competencies
  const [openAreas, setOpenAreas] = useState({});
  const [openCompetencies, setOpenCompetencies] = useState({});
  const [openOverview, setOpenOverview] = useState({});
  const [openSkills, setOpenSkills] = useState({});

  // AI Teen sub-tab & selected items
  const [aiTeenSubTab, setAiTeenSubTab] = useState('courses'); // 'courses' | 'core5'
  const [activeCoreCode, setActiveCoreCode] = useState(null); // 'GenAI' | 'CU' | 'PSDM' | 'DPD' | 'LRN'
  const [selectedCourseIdx, setSelectedCourseIdx] = useState(0); // 0, 1, 2, 3
  const [selectedPromptSkill, setSelectedPromptSkill] = useState(null);
  const [faqCategoryFilter, setFaqCategoryFilter] = useState('all'); // 'all' | 'concepts' | 'ai_prompting' | 'progression' | 'mentor_ops'
  const [openFaqId, setOpenFaqId] = useState(null);

  // Rubric Editing/Reading Mode & Custom Target Level & Role persistence
  const [rubricViewMode, setRubricViewMode] = useState('reading'); // 'reading' | 'editing'
  const [customTargetLevels, setCustomTargetLevels] = useState(() => {
    try {
      const saved = localStorage.getItem('simba_ai_teen_target_levels');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });
  const [customSkillRoles, setCustomSkillRoles] = useState(() => {
    try {
      const saved = localStorage.getItem('simba_ai_teen_skill_roles');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });
  const [showOutOfScope, setShowOutOfScope] = useState(() => {
    try {
      const saved = localStorage.getItem('simba_ai_teen_show_out_of_scope');
      return saved !== null ? JSON.parse(saved) : false; // default hidden
    } catch (e) {
      return false;
    }
  });
  const [targetToast, setTargetToast] = useState(null);

  const handleSetTargetLevel = (skillKey, skillTitle, level) => {
    setCustomTargetLevels((prev) => {
      const next = { ...prev, [skillKey]: level };
      try {
        localStorage.setItem('simba_ai_teen_target_levels', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
    const isVi = lang === 'VI';
    setTargetToast({
      skillTitle,
      message: isVi ? `Đã đặt mục tiêu: Level ${level}` : `Target: Level ${level}`,
      id: Date.now()
    });
    setTimeout(() => {
      setTargetToast(null);
    }, 2800);
  };

  const handleSetSkillRole = (skillKey, skillTitle, newRole) => {
    setCustomSkillRoles((prev) => {
      const next = { ...prev, [skillKey]: newRole };
      try {
        localStorage.setItem('simba_ai_teen_skill_roles', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
    const isVi = lang === 'VI';
    const roleLabels = {
      primary: isVi ? 'Trọng Tâm Mũi Nhọn' : 'Primary Focus',
      supporting: isVi ? 'Trọng Tâm Hỗ Trợ' : 'Supporting Focus',
      out_of_scope: isVi ? 'Ngoài Phạm Vi' : 'Out of Scope'
    };
    setTargetToast({
      skillTitle,
      message: isVi ? `Vai trò: ${roleLabels[newRole] || newRole}` : `Role: ${roleLabels[newRole] || newRole}`,
      id: Date.now()
    });
    setTimeout(() => {
      setTargetToast(null);
    }, 2800);
  };

  const handleResetAllCustomizations = () => {
    if (window.confirm(lang === 'VI' ? 'Bạn có chắc muốn khôi phục tất cả thiết lập Target Level & Role về mặc định?' : 'Reset all Target Levels and Skill Roles to defaults?')) {
      setCustomTargetLevels({});
      setCustomSkillRoles({});
      try {
        localStorage.removeItem('simba_ai_teen_target_levels');
        localStorage.removeItem('simba_ai_teen_skill_roles');
      } catch (e) {}
    }
  };

  // Modals state
  const [selectedConcept, setSelectedConcept] = useState(null);
  const [selectedIndicator, setSelectedIndicator] = useState(null);
  const [selectedFramework, setSelectedFramework] = useState(null);

  // Search & Sandbox
  const [searchQuery, setSearchQuery] = useState('');
  const [sandboxRoute, setSandboxRoute] = useState('GET /domains');

  // Handle browser popstate
  useEffect(() => {
    const handlePop = () => {
      const path = window.location.pathname;
      setCurrentRoute(path.startsWith('/ccs') ? path.substring(4) || '/' : path);
    };
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  const navigate = (to) => {
    const fullPath = to === '/' ? '/ccs' : `/ccs${to}`;
    window.history.pushState(null, '', fullPath);
    setCurrentRoute(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Determine active domain (Full taxonomy)
  const activeDomain = useMemo(() => {
    if (currentRoute.startsWith('/competency-domains/')) {
      const slug = currentRoute.substring(20);
      return competencyData.find((d) => d.slug === slug) || null;
    }
    return null;
  }, [currentRoute]);

  // Determine active AI Teen domain
  const activeAiTeenDomain = useMemo(() => {
    if (currentRoute.startsWith('/ai-teen/')) {
      const slug = currentRoute.substring(9);
      return competencyData.find((d) => d.slug === slug) || null;
    }
    return null;
  }, [currentRoute]);

  // Reset open states when entering a new domain (all collapsed by default)
  useEffect(() => {
    if (activeDomain || activeAiTeenDomain) {
      setOpenAreas({});
      setOpenCompetencies({});
      setOpenOverview({});
      setOpenSkills({});
    }
  }, [activeDomain, activeAiTeenDomain]);

  const toggleArea = (id) => {
    setOpenAreas((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleCompetency = (id) => {
    setOpenCompetencies((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleOverview = (id) => {
    setOpenOverview((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSkill = (id) => {
    setOpenSkills((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (text, id, message) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Concept modal dictionary definitions
  const conceptDefinitions = {
    area: {
      title: 'Competency Area',
      badge: 'AREA',
      def: lang === 'VI'
        ? 'Một chủ đề vĩ mô đại diện cho một lĩnh vực chuyên môn lớn hoặc một giai đoạn phát triển chính trong công việc, gom nhóm các năng lực liên quan lại với nhau.'
        : 'A macro-level category representing a broad phase or domain of professional focus, grouping related competencies together.',
      example: lang === 'VI'
        ? 'Lĩnh vực "Customer Discovery & Research" (Khảo sát Khách hàng & Thị trường). Nó đại diện cho toàn bộ giai đoạn nghiên cứu trước khi thiết kế sản phẩm, bao gồm các năng lực cụ thể như Phỏng vấn Khách hàng, Phân tích Nhu cầu & Động lực.'
        : 'The area "Customer Discovery & Research". It represents the entire research phase before product design, encompassing specific competencies like Customer Interviewing and Needs Analysis.'
    },
    competency: {
      title: 'Competency',
      badge: 'COMPETENCY',
      def: lang === 'VI'
        ? 'Một khối năng lực nghiệp vụ hoàn chỉnh, có thể đo lường và đánh giá cụ thể bằng tiêu chuẩn chỉ báo, tập hợp các kỹ năng thực hành để xử lý một bài toán nghiệp vụ.'
        : 'A core professional capability that can be systematically evaluated, grouping a set of practical skills to solve a specific business problem.',
      example: lang === 'VI'
        ? 'Năng lực "Customer Interviewing" (Phỏng vấn Khách hàng). Đây là một năng lực nghiệp vụ hoàn chỉnh thuộc lĩnh vực Khảo sát Khách hàng, yêu cầu sự kết hợp của nhiều kỹ năng lập kế hoạch, đặt câu hỏi không dẫn dắt và phân tích kết quả.'
        : 'The competency "Customer Interviewing". This is a complete professional capability within Customer Discovery, requiring combination of planning, non-leading questioning, and analysis skills.'
    },
    skill: {
      title: 'Skill',
      badge: 'SKILL',
      def: lang === 'VI'
        ? 'Một hành động, kỹ thuật thao tác hoặc hoạt động thực hành cụ thể mà học viên có thể chủ động rèn luyện hằng ngày để từng bước làm chủ năng lực nghiệp vụ lớn.'
        : 'A specific action, technique, or practice that a learner can actively train and perform daily to master a broader competency.',
      example: lang === 'VI'
        ? 'Kỹ năng "Plan interviews" (Lập kế hoạch phỏng vấn). Đây là một kỹ năng thực tế nhỏ nằm trong năng lực Phỏng vấn Khách hàng, tập trung vào công tác chuẩn bị bộ câu hỏi, liên hệ đáp viên và sắp xếp thời gian biểu.'
        : 'The skill "Plan interviews". This is a specific practical activity within the Customer Interviewing competency, focusing on questionnaires, contacting respondents, and scheduling.'
    },
    indicator: {
      title: 'Indicator',
      badge: 'INDICATOR',
      def: lang === 'VI'
        ? 'Hành vi quan sát được và đo lường được trong thực tế, dùng làm bằng chứng để xác định mức độ thành thạo của một kỹ năng hoặc năng lực.'
        : 'An observable and measurable behavior in practice, used as evidence to evaluate proficiency levels of a skill or competency.',
      example: lang === 'VI'
        ? 'Chỉ báo "Preparation & Planning" (Lập kế hoạch & Chuẩn bị): Người thực hiện xác định rõ mục tiêu phỏng vấn, soạn thảo kịch bản câu hỏi mở không dẫn dắt và chuẩn bị bảng ghi chép chuẩn trước khi gặp khách hàng.'
        : 'Indicator "Preparation & Planning": The practitioner clearly defines interview goals, drafts non-leading open questions, and prepares standard note-taking sheets before meeting respondents.'
    }
  };

  // Filtered search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    const results = [];
    competencyData.forEach((d) => {
      d.competency_areas?.forEach((a) => {
        a.competencies?.forEach((c) => {
          if (
            c.name.toLowerCase().includes(q) ||
            (c.name_vi && c.name_vi.toLowerCase().includes(q)) ||
            (c.description && c.description.toLowerCase().includes(q)) ||
            (c.description_vi && c.description_vi.toLowerCase().includes(q)) ||
            (c.short_name && c.short_name.toLowerCase().includes(q))
          ) {
            results.push({
              domainSlug: d.slug,
              domainName: lang === 'VI' ? d.name_vi || d.name : d.name,
              areaName: lang === 'VI' ? a.name_vi || a.name : a.name,
              competency: c
            });
          }
        });
      });
    });
    return results;
  }, [searchQuery, lang]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#111111]">
      {/* Top Notification / Branding Bar */}
      <nav className="sticky top-0 z-40 border-b border-stone-200 bg-white/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Brand */}
          <div
            onClick={() => navigate('/')}
            className="flex items-center gap-2 cursor-pointer select-none group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#111111] flex items-center justify-center text-white font-black text-sm">
              C<span className="text-[#cc4e2d]">1</span>
            </div>
            <span className="font-extrabold text-lg tracking-tight text-[#111111]">
              CONAN<span className="text-[#cc4e2d]">1</span>
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6 text-sm font-medium text-stone-600">
            <button
              onClick={() => navigate('/')}
              className={`hover:text-[#cc4e2d] transition-colors ${currentRoute === '/' ? 'text-[#cc4e2d] font-bold' : ''}`}
            >
              {lang === 'VI' ? 'Khung Năng Lực Toàn Phần' : 'Full Taxonomy'}
            </button>
            <button
              onClick={() => {
                navigate('/ai-teen');
              }}
              className={`px-3 py-1.5 rounded-full font-bold transition-all flex items-center gap-1.5 ${
                currentRoute.startsWith('/ai-teen')
                  ? 'bg-orange-50 text-[#cc4e2d] border border-orange-200 shadow-sm'
                  : 'text-stone-700 hover:text-[#cc4e2d] hover:bg-stone-50'
              }`}
            >
              <Flame className="w-4 h-4 text-[#cc4e2d]" />
              {lang === 'VI' ? 'Khung Năng Lực AI Teen' : 'AI Teen Framework'}
            </button>
            <button
              onClick={() => navigate('/course-progression')}
              className={`hover:text-[#cc4e2d] transition-colors ${currentRoute === '/course-progression' ? 'text-[#cc4e2d] font-bold' : ''}`}
            >
              {lang === 'VI' ? 'Lộ Trình Khóa Học' : 'Course Progression'}
            </button>
            <button
              onClick={() => navigate('/graduation-plan')}
              className={`hover:text-[#cc4e2d] transition-colors ${currentRoute === '/graduation-plan' ? 'text-[#cc4e2d] font-bold' : ''}`}
            >
              {lang === 'VI' ? 'Kế Hoạch Tốt Nghiệp' : 'Graduation Plan'}
            </button>
            <button
              onClick={() => navigate('/faq')}
              className={`hover:text-[#cc4e2d] transition-colors ${currentRoute === '/faq' ? 'text-[#cc4e2d] font-bold' : ''}`}
            >
              FAQ
            </button>
          </div>

          {/* Controls: Language toggle */}
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-stone-100 p-1 rounded-full border border-stone-200 text-xs font-bold">
              <button
                onClick={() => setLang('VI')}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  lang === 'VI'
                    ? 'bg-white text-[#cc4e2d] shadow-sm'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                VI
              </button>
              <button
                onClick={() => setLang('EN')}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  lang === 'EN'
                    ? 'bg-white text-[#cc4e2d] shadow-sm'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>

        {/* Mobile & Tablet Secondary Navigation Bar */}
        <div className="lg:hidden flex items-center gap-2 overflow-x-auto px-4 py-2.5 border-t border-stone-200 bg-stone-50/90 text-xs font-medium no-scrollbar">
          <button
            onClick={() => navigate('/')}
            className={`px-3 py-1.5 rounded-lg shrink-0 transition-all ${
              currentRoute === '/'
                ? 'bg-white text-[#cc4e2d] border border-orange-200 shadow-sm font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {lang === 'VI' ? 'Toàn Phần' : 'Full Taxonomy'}
          </button>
          <button
            onClick={() => {
              navigate('/ai-teen');
            }}
            className={`px-3 py-1.5 rounded-lg shrink-0 flex items-center gap-1 transition-all ${
              currentRoute.startsWith('/ai-teen')
                ? 'bg-orange-50 text-[#cc4e2d] border border-orange-200 shadow-sm font-bold'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-[#cc4e2d]" />
            {lang === 'VI' ? 'AI Teen' : 'AI Teen'}
          </button>
          <button
            onClick={() => navigate('/course-progression')}
            className={`px-3 py-1.5 rounded-lg shrink-0 transition-all ${
              currentRoute === '/course-progression'
                ? 'bg-white text-[#cc4e2d] border border-orange-200 shadow-sm font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {lang === 'VI' ? 'Lộ Trình' : 'Courses'}
          </button>
          <button
            onClick={() => navigate('/graduation-plan')}
            className={`px-3 py-1.5 rounded-lg shrink-0 transition-all ${
              currentRoute === '/graduation-plan'
                ? 'bg-white text-[#cc4e2d] border border-orange-200 shadow-sm font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {lang === 'VI' ? 'Tốt Nghiệp' : 'Graduation'}
          </button>
          <button
            onClick={() => navigate('/faq')}
            className={`px-3 py-1.5 rounded-lg shrink-0 transition-all ${
              currentRoute === '/faq'
                ? 'bg-white text-[#cc4e2d] border border-orange-200 shadow-sm font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            FAQ
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ================= VIEW 1: HOME (DOMAINS GRID) ================= */}
        {currentRoute === '/' && (
          <div className="space-y-12">
            {/* Hero Section */}
            <div className="py-6 border-b border-stone-100 pb-12 max-w-3xl">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-orange-50 text-[#cc4e2d] border border-orange-200">
                  <Flame className="w-3.5 h-3.5" /> Conan Competency System (CCS)
                </span>
                <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#111111] leading-tight">
                  {lang === 'VI' ? 'Một ngôn ngữ chung cho năng lực.' : 'A unified language for competencies.'}
                </h1>
                <p className="mt-4 text-stone-600 text-base sm:text-lg leading-relaxed">
                  {lang === 'VI'
                    ? 'Khám phá 9 Core Domains, 29 Competency Areas, 88 Competencies và hàng trăm chỉ báo thực hành tiêu chuẩn.'
                    : 'Explore 9 Core Domains, 29 Competency Areas, 88 Competencies, and hundreds of standardized indicators.'}
                </p>

                {/* Quick search input */}
                <div className="mt-6 relative max-w-lg">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={
                      lang === 'VI'
                        ? 'Tìm kiếm competency, kỹ năng (ví dụ: AI, Interviewing)...'
                        : 'Search competency or skill (e.g., AI, Interviewing)...'
                    }
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#cc4e2d] focus:border-transparent bg-stone-50/50"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Live Search Results if searching */}
            {searchQuery.trim() && (
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-stone-500 mb-4 flex items-center justify-between">
                  <span>
                    {lang === 'VI' ? `Kết quả tìm kiếm (${searchResults.length})` : `Search Results (${searchResults.length})`}
                  </span>
                  <span className="text-xs font-normal lowercase">cho "{searchQuery}"</span>
                </h3>

                {searchResults.length === 0 ? (
                  <p className="text-sm text-stone-500 italic">
                    {lang === 'VI' ? 'Không tìm thấy năng lực nào phù hợp.' : 'No competencies found.'}
                  </p>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {searchResults.map(({ domainSlug, domainName, areaName, competency }) => (
                      <div
                        key={competency.id}
                        onClick={() => navigate(`/competency-domains/${domainSlug}`)}
                        className="p-4 bg-white rounded-xl border border-stone-200 hover:border-[#cc4e2d] hover:shadow-md cursor-pointer transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="text-[11px] font-bold text-[#cc4e2d] uppercase tracking-wider mb-1">
                            {domainName} &gt; {areaName}
                          </div>
                          <div className="font-bold text-stone-900 text-sm mb-1">
                            {lang === 'VI' ? competency.name_vi || competency.name : competency.name}
                          </div>
                          <p className="text-xs text-stone-600 line-clamp-2">
                            {lang === 'VI' ? competency.description_vi || competency.description : competency.description}
                          </p>
                        </div>
                        <div className="mt-3 flex items-center text-xs font-bold text-[#cc4e2d]">
                          {lang === 'VI' ? 'Xem chi tiết' : 'View details'} <ChevronRight className="w-3.5 h-3.5 ml-1" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Hierarchical Model Card */}
            <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-7 shadow-xs space-y-4">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-stone-900 tracking-tight">
                  Hierarchical Model
                </h3>
                <p className="text-sm text-stone-600 mt-1.5 leading-relaxed">
                  {lang === 'VI'
                    ? 'CCS tổ chức kiến thức và năng lực theo mô hình 5 tầng phân cấp chặt chẽ:'
                    : 'CCS structures knowledge and capabilities across a rigorous 5-tier hierarchy:'}
                </p>
              </div>

              <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-400 mt-2 shrink-0"></span>
                  <span>
                    <strong className="font-bold text-stone-900">Domain:</strong>{' '}
                    {lang === 'VI'
                      ? '9 miền vĩ mô định hình toàn bộ chân dung năng lực làm việc.'
                      : '9 macro domains shaping the complete professional capability profile.'}
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-400 mt-2 shrink-0"></span>
                  <span>
                    <strong className="font-bold text-stone-900">Competency Area:</strong>{' '}
                    {lang === 'VI'
                      ? 'Phân nhóm chuyên môn lớn trong từng Domain.'
                      : 'Major specialized functional areas grouped under each Domain.'}
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-400 mt-2 shrink-0"></span>
                  <span>
                    <strong className="font-bold text-stone-900">Competency:</strong>{' '}
                    {lang === 'VI'
                      ? 'Khối năng lực nghiệp vụ hoàn chỉnh có thể đo lường.'
                      : 'Complete measurable professional competency units.'}
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-400 mt-2 shrink-0"></span>
                  <span>
                    <strong className="font-bold text-stone-900">Skill:</strong>{' '}
                    {lang === 'VI'
                      ? 'Kỹ thuật thao tác và hành động thực hành rèn luyện hằng ngày.'
                      : 'Operational techniques and daily actionable practical skills.'}
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-400 mt-2 shrink-0"></span>
                  <span>
                    <strong className="font-bold text-stone-900">Indicator:</strong>{' '}
                    {lang === 'VI'
                      ? 'Bằng chứng hành vi quan sát được ("Con có thể..."), kiểm chứng theo checklist Đạt / Chưa đạt.'
                      : 'Observable behavioral evidence ("I can..."), verified via a binary Pass / Not Yet checklist.'}
                  </span>
                </li>
              </ul>
            </div>

            {/* 9 Core Competency Domains Grid */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111]">
                    {lang === 'VI' ? '9 Khung Năng Lực Cốt Lõi' : '9 Core Competency Domains'}
                  </h2>
                  <p className="text-stone-500 text-sm mt-1">
                    {lang === 'VI' ? 'Chọn một Domain để duyệt sâu từng Area, Competency, Skill và Indicator' : 'Select a domain to inspect areas, competencies, skills, and indicators'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {competencyData.map((domain) => {
                  const IconComp = getDomainIcon(domain.slug);
                  const areasCount = domain.competency_areas?.length || 0;
                  const compCount = domain.competency_areas?.reduce(
                    (acc, a) => acc + (a.competencies?.length || 0),
                    0
                  ) || 0;

                  return (
                    <div
                      key={domain.id}
                      onClick={() => navigate(`/competency-domains/${domain.slug}`)}
                      className="eco-card group relative bg-white border border-stone-200 rounded-2xl p-6 cursor-pointer flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-orange-200"
                    >
                      <div>
                        {/* Domain Icon & Header */}
                        <div className="flex items-center gap-4 mb-4">
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                            style={{
                              backgroundColor: `${domain.color || '#cc4e2d'}15`,
                              color: domain.color || '#cc4e2d'
                            }}
                          >
                            <IconComp className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg text-stone-900 group-hover:text-[#cc4e2d] transition-colors leading-snug">
                              {lang === 'VI' ? domain.name_vi || domain.name : domain.name}
                            </h3>
                            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                              {domain.short_name || 'CCS'}
                            </span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-stone-600 line-clamp-3 leading-relaxed mb-6">
                          {lang === 'VI' ? domain.description_vi || domain.description : domain.description}
                        </p>
                      </div>

                      {/* Footer Stats & Explore button */}
                      <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                        <span className="font-semibold text-stone-500">
                          {areasCount} {lang === 'VI' ? 'Khu vực' : 'Areas'} | {compCount}{' '}
                          {lang === 'VI' ? 'Năng lực' : 'Competencies'}
                        </span>
                        <span className="font-bold text-[#cc4e2d] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          {lang === 'VI' ? 'Khám phá' : 'Explore'} <ChevronRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ================= VIEW 2: DOMAIN DETAIL EXPLORER ================= */}
        {currentRoute.startsWith('/competency-domains/') && activeDomain && (
          <div className="space-y-6">
            {/* Domain Breadcrumb Header */}
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <button
                    onClick={() => navigate('/')}
                    className="text-xs font-bold text-[#cc4e2d] hover:underline flex items-center gap-1 mb-2"
                  >
                    &larr; {lang === 'VI' ? 'Tất cả Khung Năng Lực' : 'All Competency Domains'}
                  </button>
                  <div className="flex items-center gap-3">
                    {React.createElement(getDomainIcon(activeDomain.slug), {
                      className: 'w-7 h-7 text-[#cc4e2d]'
                    })}
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111111]">
                      {lang === 'VI' ? activeDomain.name_vi || activeDomain.name : activeDomain.name}
                    </h1>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-white border border-stone-200 rounded-lg text-xs font-bold text-stone-600">
                    {activeDomain.competency_areas?.length || 0} {lang === 'VI' ? 'Lĩnh vực' : 'Areas'}
                  </span>
                  <span className="px-3 py-1 bg-white border border-stone-200 rounded-lg text-xs font-bold text-[#cc4e2d]">
                    {activeDomain.competency_areas?.reduce(
                      (acc, a) => acc + (a.competencies?.length || 0),
                      0
                    )}{' '}
                    {lang === 'VI' ? 'Năng lực' : 'Competencies'}
                  </span>
                </div>
              </div>


            </div>

            {/* Accordion List of Competency Areas */}
            <div className="space-y-4">
              {activeDomain.competency_areas?.map((area) => {
                const isAreaOpen = !!openAreas[area.id];

                return (
                  <div
                    key={area.id}
                    className="border border-stone-200 rounded-2xl bg-white overflow-hidden shadow-sm transition-all"
                  >
                    {/* Area Accordion Header */}
                    <div
                      onClick={() => toggleArea(area.id)}
                      className="p-5 sm:p-6 bg-stone-50/80 hover:bg-stone-50 cursor-pointer select-none flex items-center justify-between border-b border-stone-200/60"
                    >
                      <div className="flex items-start sm:items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-orange-100/60 text-[#cc4e2d] flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                          <Layers className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-extrabold text-stone-900 text-base sm:text-lg">
                              {lang === 'VI' ? area.name_vi || area.name : area.name}
                            </span>

                          </div>

                        </div>
                      </div>

                      <ChevronRight
                        className={`w-5 h-5 text-stone-400 transition-transform duration-200 shrink-0 ${
                          isAreaOpen ? 'rotate-90 text-[#cc4e2d]' : ''
                        }`}
                      />
                    </div>

                    {/* Area Competencies List */}
                    {isAreaOpen && (
                      <div className="p-4 sm:p-6 space-y-4 bg-white">
                        {area.competencies?.map((competency) => {
                          const isCompOpen = !!openCompetencies[competency.id];
                          const isOverviewOpen = !!openOverview[competency.id];

                          // AI prompt template for this Competency
                          const compPromptText = `[Role: Senior Educational Designer & Competency Expert]
I need you to explain the following competency in the context of the Conan Competency System (CCS):
- Competency: ${competency.name} (${competency.name_vi || ''})
- Description: ${competency.description || ''} (${competency.description_vi || ''})
- Why It Matters: ${competency.why_it_matters || ''} (${competency.why_it_matters_vi || ''})
- Key Question: ${competency.key_question || ''} (${competency.key_question_vi || ''})

Please structure your response as follows:
1. Detailed Concept: Explain the core meaning of this competency, its value in the workforce, and its integration guidelines.
2. 3 Real-World Examples: Provide 3 concrete examples of someone demonstrating this competency at a high level.
3. 3 Counter-Examples (Phản ví dụ): Provide 3 clear examples where this competency is missing or failed.
4. 3 Misconceptions (Dễ bị hiểu lầm): Identify 3 concepts commonly confused with this competency, explaining the key differences.

Response in ${lang === 'VI' ? 'Vietnamese' : 'English'}.`;

                          return (
                            <div
                              key={competency.id}
                              className="border border-stone-200 rounded-xl overflow-hidden bg-white shadow-sm"
                            >
                              {/* Competency Header */}
                              <div
                                onClick={() => toggleCompetency(competency.id)}
                                className={`p-4 sm:p-5 flex items-center justify-between cursor-pointer select-none transition-colors ${
                                  isCompOpen ? 'bg-orange-50/20 border-b border-stone-200' : 'hover:bg-stone-50/60'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <span className="w-2.5 h-2.5 rounded-full bg-[#cc4e2d] shrink-0" />
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-bold text-stone-900 text-sm sm:text-base">
                                      {lang === 'VI' ? competency.name_vi || competency.name : competency.name}
                                    </span>
                                    {/* Inline info tooltip */}
                                    {(competency.description || competency.description_vi || competency.why_it_matters || competency.why_it_matters_vi) && (
                                      <span
                                        className="relative group cursor-help"
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        <HelpCircle className="w-3.5 h-3.5 text-stone-300 hover:text-[#cc4e2d] transition-colors" />
                                        <div className="absolute left-0 top-5 z-50 hidden group-hover:block w-80 p-3 bg-stone-900 text-white text-xs rounded-xl shadow-xl leading-relaxed">
                                          <p className="mb-2">{lang === 'VI' ? competency.description_vi || competency.description : competency.description}</p>
                                          {(competency.why_it_matters || competency.why_it_matters_vi) && (
                                            <p className="text-orange-300 font-semibold">
                                              {lang === 'VI' ? competency.why_it_matters_vi || competency.why_it_matters : competency.why_it_matters}
                                            </p>
                                          )}
                                        </div>
                                      </span>
                                    )}
                                    {/* Inline Prompt AI */}
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        copyToClipboard(compPromptText, `comp-${competency.id}`);
                                      }}
                                      className="flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold bg-orange-50 text-[#cc4e2d] border border-orange-200 hover:bg-orange-100 transition-colors"
                                    >
                                      {copiedId === `comp-${competency.id}` ? (
                                        <><Check className="w-3 h-3" /> {lang === 'VI' ? 'Đã chép' : 'Copied'}</>
                                      ) : (
                                        <><Sparkles className="w-3 h-3" /> Prompt AI</>
                                      )}
                                    </button>
                                  </div>
                                </div>

                                <ChevronRight
                                  className={`w-4 h-4 text-stone-400 transition-transform duration-200 shrink-0 ${
                                    isCompOpen ? 'rotate-90 text-[#cc4e2d]' : ''
                                  }`}
                                />
                              </div>

                              {/* Competency Body */}
                              {isCompOpen && (
                                <div className="p-4 sm:p-6 space-y-6 bg-stone-50/30">

                                  {/* Section: Skills & Practice Indicators */}
                                  <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <h4 className="font-extrabold text-xs uppercase tracking-wider text-stone-500">
                                        {lang === 'VI' ? 'Kỹ năng & Chỉ báo Thực hành' : 'Skills & Practice Indicators'}
                                      </h4>
                                    </div>

                                    {/* Skills grouped */}
                                    {competency.competency_skills && competency.competency_skills.length > 0 ? (
                                      <div className="space-y-3">
                                        {/* Group skills: top-level skills vs child indicator skills */}
                                        {(() => {
                                          const parentSkills = competency.competency_skills.filter(
                                            (s) => !s.parent_id
                                          );
                                          const allSkills = parentSkills.length > 0 ? parentSkills : competency.competency_skills;

                                          return allSkills.map((skill) => {
                                            const isSkillOpen = openSkills[skill.id] !== false; // open by default
                                            const indicators = competency.competency_skills.filter(
                                              (s) => s.parent_id === skill.id
                                            );
                                            const skillPromptText = `[Role: Senior Competency Trainer]
I need you to break down this skill:
- Skill: ${skill.name} (${skill.name_vi || ''})
- Description: ${skill.description || ''}

Provide:
1. Operational Definition
2. 3 Observable Behavioral Examples
3. 3 Common Mistakes & Misconceptions
4. 5-Level Rubric criteria for grading.`;

                                            const { examples, misconceptions } = getSkillExamplesAndMisconceptions(
                                              skill.name,
                                              lang
                                            );

                                            return (
                                              <div
                                                key={skill.id}
                                                className="border border-stone-200 rounded-xl bg-white overflow-hidden shadow-sm"
                                              >
                                                {/* Skill Header */}
                                                <div
                                                  onClick={() => toggleSkill(skill.id)}
                                                  className="p-4 bg-stone-50/70 flex items-center justify-between cursor-pointer select-none border-b border-stone-200/80"
                                                >
                                                  <div className="flex items-center gap-2.5">
                                                    <ChevronRight
                                                      className={`w-4 h-4 text-stone-500 transition-transform ${
                                                        isSkillOpen ? 'rotate-90' : ''
                                                      }`}
                                                    />
                                                    <Target className="w-4 h-4 text-[#cc4e2d]" />
                                                    <span className="font-bold text-xs sm:text-sm text-stone-900">
                                                      {lang === 'VI' ? skill.name_vi || skill.name : skill.name}
                                                    </span>
                                                  </div>

                                                  <div className="flex items-center gap-2">
                                                    <button
                                                      onClick={(e) => {
                                                        e.stopPropagation();
                                                        copyToClipboard(skillPromptText, `skill-${skill.id}`);
                                                      }}
                                                      className="flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-orange-50 text-[#cc4e2d] border border-orange-200 hover:bg-orange-100"
                                                    >
                                                      {copiedId === `skill-${skill.id}` ? (
                                                        <Check className="w-3 h-3" />
                                                      ) : (
                                                        <Sparkles className="w-3 h-3" />
                                                      )}
                                                      {lang === 'VI' ? 'Prompt AI' : 'Copy Prompt'}
                                                    </button>
                                                    <button
                                                      onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedConcept('skill');
                                                      }}
                                                      className="tab-btn text-[10px] uppercase font-bold px-2 py-0.5 bg-stone-200/70 text-stone-700 rounded"
                                                    >
                                                      SKILL
                                                    </button>
                                                  </div>
                                                </div>

                                                {/* Skill Body (Indicators & Examples) */}
                                                {isSkillOpen && (
                                                  <div className="p-4 sm:p-5 space-y-4 bg-white">
                                                    {/* Indicators list */}
                                                    {indicators.length > 0 ? (
                                                      <div className="space-y-2.5">
                                                        {indicators.map((ind) => (
                                                          <div
                                                            key={ind.id}
                                                            className="indicator-row p-3.5 rounded-xl border border-stone-200 bg-stone-50/40 flex items-center justify-between gap-4 transition-all"
                                                          >
                                                            <div className="space-y-1">
                                                              <div className="flex items-center gap-2 font-bold text-sky-900 text-xs sm:text-sm">
                                                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                                                <span>
                                                                  {lang === 'VI' ? ind.name_vi || ind.name : ind.name}
                                                                </span>
                                                              </div>
                                                              <p className="text-xs text-stone-500 line-clamp-1 pl-6">
                                                                {lang === 'VI'
                                                                  ? ind.description_vi || ind.description
                                                                  : ind.description}
                                                              </p>
                                                            </div>

                                                            <div className="flex items-center gap-2 shrink-0">
                                                              <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded border border-emerald-200 flex items-center gap-1 font-mono">
                                                                <Check className="w-3 h-3" /> INDICATOR
                                                              </span>
                                                            </div>
                                                          </div>
                                                        ))}
                                                      </div>
                                                    ) : (
                                                      <p className="text-xs text-stone-400 italic">
                                                        {lang === 'VI'
                                                          ? 'Không có chỉ báo con tách riêng cho kỹ năng này.'
                                                          : 'No dedicated child indicators for this skill.'}
                                                      </p>
                                                    )}

                                                    {/* Examples & Misconceptions 2-column box */}
                                                    <div className="pt-3 border-t border-dashed border-stone-200 space-y-3">
                                                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#cc4e2d]">
                                                        {lang === 'VI'
                                                          ? 'Ví dụ Thực tế & Phân biệt Tránh hiểu lầm'
                                                          : 'Examples & Misconceptions'}
                                                      </span>

                                                      <div className="grid sm:grid-cols-2 gap-4 text-xs">
                                                        {/* 3 Real-World Examples */}
                                                        <div className="p-3.5 bg-emerald-50/50 rounded-xl border border-emerald-200/60">
                                                          <span className="font-bold text-emerald-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5 mb-2">
                                                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                                            {lang === 'VI' ? '3 Ví dụ thực tế tiêu biểu' : '3 Key Real-World Examples'}
                                                          </span>
                                                          <ul className="space-y-1.5 text-stone-700 list-disc list-inside">
                                                            {examples.map((ex, idx) => (
                                                              <li key={idx} className="leading-relaxed">
                                                                {ex}
                                                              </li>
                                                            ))}
                                                          </ul>
                                                        </div>

                                                        {/* 3 Common Misconceptions */}
                                                        <div className="p-3.5 bg-red-50/50 rounded-xl border border-red-200/60">
                                                          <span className="font-bold text-red-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5 mb-2">
                                                            <XCircle className="w-3.5 h-3.5 text-red-600" />
                                                            {lang === 'VI' ? '3 Ví dụ dễ bị hiểu lầm' : '3 Common Misconceptions'}
                                                          </span>
                                                          <ul className="space-y-1.5 text-stone-700 list-disc list-inside">
                                                            {misconceptions.map((mis, idx) => (
                                                              <li key={idx} className="leading-relaxed">
                                                                {mis}
                                                              </li>
                                                            ))}
                                                          </ul>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                )}
                                              </div>
                                            );
                                          });
                                        })()}
                                      </div>
                                    ) : (
                                      <p className="text-xs text-stone-400 italic">
                                        {lang === 'VI'
                                          ? 'Đang cập nhật danh mục kỹ năng.'
                                          : 'Skills currently being updated.'}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= VIEW 2: COURSE PROGRESSION ================= */}
        {currentRoute === '/course-progression' && (
          <div className="space-y-8">
            {/* Hero Header — Minimalist Style */}
            <div className="text-center max-w-2xl mx-auto space-y-2 py-1">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
                {lang === 'VI' ? 'Lộ Trình Khóa Học' : 'Course Progression'}
              </h1>
              <p className="text-stone-500 text-sm sm:text-base leading-relaxed">
                {lang === 'VI'
                  ? '5 khóa học xoắn ốc từ nền tảng GenAI đến tự chủ kiến tạo sản phẩm.'
                  : '5-course spiral progression from GenAI mastery to autonomous product building.'}
              </p>
            </div>

            {/* 5 MINI COURSES & SPIRAL PRODUCT EVOLUTION (WITH INTERACTIVE COURSE SELECTOR) */}
            <div className="space-y-8">
                {/* 5 Course Selection Tabs */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {[
                    { id: 0, num: lang === 'VI' ? 'Khóa 1' : 'Course 1', icon: Sparkles },
                    { id: 1, num: lang === 'VI' ? 'Khóa 2' : 'Course 2', icon: Users },
                    { id: 2, num: lang === 'VI' ? 'Khóa 3' : 'Course 3', icon: Target },
                    { id: 3, num: lang === 'VI' ? 'Khóa 4' : 'Course 4', icon: MessageSquare },
                    { id: 4, num: lang === 'VI' ? 'Khóa 5' : 'Course 5', icon: BookOpen }
                  ].map((c) => {
                    const IconComp = c.icon;
                    const isSelected = selectedCourseIdx === c.id;
                    return (
                      <button
                        key={c.id}
                        onClick={() => setSelectedCourseIdx(c.id)}
                        className={`p-4 rounded-2xl border text-center transition-all relative overflow-hidden flex items-center justify-between ${
                          isSelected
                            ? 'bg-stone-900 text-white border-stone-900 shadow-lg scale-[1.02]'
                            : 'bg-white text-stone-700 border-stone-200 hover:border-orange-300 hover:bg-orange-50/20'
                        }`}
                      >
                        <span className={`text-sm sm:text-base font-black ${isSelected ? 'text-white' : 'text-stone-900'}`}>
                          {c.num}
                        </span>
                        <IconComp className={`w-4 h-4 ${isSelected ? 'text-orange-400' : 'text-stone-400'}`} />
                      </button>
                    );
                  })}
                </div>

                {/* Selected Course Deep Dive Card */}
                {(() => {
                  const courseDetails = [
                    {
                      course: lang === 'VI' ? 'Khóa 1' : 'Course 1',
                      spikeName: 'GenAI Spike (Level 1 → L1.2)',
                      spikeCode: 'GenAI',
                      focusIndicators: lang === 'VI' ? [
                        'Hiểu nguyên lý AI dự đoán từ (Next-token prediction) và xác suất thống kê.',
                        'Nhận biết AI không có cảm xúc thật và không phụ thuộc tuyệt đối vào câu trả lời đầu tiên.',
                        'Viết câu lệnh mô tả mục đích rõ ràng, đầy đủ ngữ pháp thay vì từ khóa rời rạc.'
                      ] : [
                        'Understand LLM next-token statistical prediction mechanics.',
                        'Recognize AI lacks true emotion and avoid blind reliance on first outputs.',
                        'Write clear, grammatically complete prompts rather than disconnected keywords.'
                      ],
                      briefReq: lang === 'VI'
                        ? '12/12 Sản phẩm hoàn thiện phiên bản V1 thô nhưng đủ tính năng cơ bản; 100% link web live chạy được trên Vercel/Netlify.'
                        : '12/12 Products built to raw V1 with full basic functionality; 100% live web links deployed.',
                      evidenceList: lang === 'VI' ? [
                        'Lưu trữ nhật ký prompt khởi tạo ban đầu cho toàn bộ 12 sản phẩm.',
                        'Chứng minh hiểu biết về cách AI sinh từ thông qua phần giải thích ngắn.',
                        'Cấu hình live web link cho tối thiểu 6 sản phẩm đầu tiên.'
                      ] : [
                        'Log foundational prompt traces across all 12 micro products.',
                        'Demonstrate understanding of next-token generation via brief summaries.',
                        'Configure live web deployments for at least the first 6 products.'
                      ],
                      rubricAssessment: lang === 'VI'
                        ? '4F Reflection ≥ 70 điểm; Vấn đáp Mentor 1-1 đạt về giải thích cơ chế sinh từ của AI.'
                        : '4F Reflection ≥ 70 points; Pass 1-1 Mentor oral check on token generation principles.',
                      targetProducts: [
                        { code: 'SP1', name: 'Personal Page V1', focus: lang === 'VI' ? 'Tạo trang web cá nhân tĩnh bản đầu & Deploy live' : 'Static personal site V1 & live deployment' },
                        { code: 'SP2', name: 'Hobby Site V1', focus: lang === 'VI' ? 'Tạo sitemap 3-5 trang chủ đề sở thích' : '3-5 page hobby sitemap layout' },
                        { code: 'SP4', name: 'Cookbook V1', focus: lang === 'VI' ? 'Đóng gói 3 prompt mẫu cơ bản' : 'Package 3 basic prompt recipes' },
                        { code: 'SP5', name: 'Cloudflare V1', focus: lang === 'VI' ? 'Trỏ DNS domain cơ bản' : 'Basic DNS domain mapping' }
                      ]
                    },
                    {
                      course: lang === 'VI' ? 'Khóa 2' : 'Course 2',
                      spikeName: 'GenAI Spike (Level 1.2 → L1.5)',
                      spikeCode: 'GenAI',
                      focusIndicators: lang === 'VI' ? [
                        'Cấu trúc câu lệnh chuẩn theo khung Role - Context - Task - Constraint (R-T-C).',
                        'Cung cấp 2-3 ví dụ mẫu chuẩn (Few-shot Examples) để định hình kết quả đầu ra của AI.',
                        'Chỉ định vai trò chuyên gia (Expert Persona) phù hợp cho từng bài toán.'
                      ] : [
                        'Format prompts using Role - Context - Task - Constraint (R-T-C) structure.',
                        'Provide 2-3 Few-shot examples to strictly enforce output format.',
                        'Assign domain expert personas tailored to specific task domains.'
                      ],
                      briefReq: lang === 'VI'
                        ? '12/12 Sản phẩm được nâng cấp lên V2 với giao diện chuẩn mực, thông điệp rõ ràng và cấu trúc dữ liệu nhất quán.'
                        : '12/12 Products upgraded to V2 with refined UI, clear messaging, and consistent data schema.',
                      evidenceList: lang === 'VI' ? [
                        '100% Prompt sử dụng khung R-T-C và có định nghĩa Role/Constraint rõ ràng.',
                        'Có thư viện 5+ Prompt Cookbook chuẩn hóa (SP4 V2) áp dụng trực tiếp vào sản phẩm.',
                        'Thu thập phản hồi từ bạn bè/gia đình để hoàn thiện nội dung V2.'
                      ] : [
                        '100% Prompts leverage the R-T-C framework with explicit constraints.',
                        'Standardized 5+ Prompt Cookbook (SP4 V2) applied across projects.',
                        'Gather peer/family feedback to refine V2 contents.'
                      ],
                      rubricAssessment: lang === 'VI'
                        ? '4F Reflection ≥ 75 điểm; Vấn đáp Mentor đạt về giải thích cấu trúc R-T-C trong các prompt thực tế.'
                        : '4F Reflection ≥ 75 points; Pass 1-1 Mentor oral verification on R-T-C structures.',
                      targetProducts: [
                        { code: 'SP3', name: 'Family Tree V2', focus: lang === 'VI' ? 'Phỏng vấn người thân & cấu trúc gia phả nhiều nhánh' : 'Family interviews & multi-branch genealogy' },
                        { code: 'SP4', name: 'Cookbook V2', focus: lang === 'VI' ? 'Hoàn thiện 5 bộ prompt chuẩn R-T-C' : 'Finalize 5 standardized R-T-C prompts' },
                        { code: 'SP6', name: 'NotebookLM V2', focus: lang === 'VI' ? 'Tài liệu hóa tri thức có trích dẫn nguồn rõ ràng' : 'Knowledge synthesis with explicit citations' }
                      ]
                    },
                    {
                      course: lang === 'VI' ? 'Khóa 3' : 'Course 3',
                      spikeName: 'GenAI Spike (Level 1.5 → L1.8)',
                      spikeCode: 'GenAI',
                      focusIndicators: lang === 'VI' ? [
                        'Nhận diện các hiện tượng AI bịa đặt thông tin (Hallucination) hoặc trả lời thiên kiến.',
                        'Thực hiện quy trình kiểm chứng chéo (Fact-checking) độc lập với tài liệu gốc.',
                        'Lặp lại và tinh chỉnh câu lệnh (Iterative Prompting) tối thiểu 2 lần khi AI sinh lỗi.'
                      ] : [
                        'Identify AI hallucinations, plausible falsehoods, and biased responses.',
                        'Conduct independent fact-checking against authentic source materials.',
                        'Iteratively refine prompts across at least 2 turns upon encountering AI inaccuracies.'
                      ],
                      briefReq: lang === 'VI'
                        ? '12/12 Sản phẩm được nâng cấp lên V3 sạch 100% lỗi thông tin ảo giác; Logic tương tác (Flashcard, Quiz) hoạt động chính xác.'
                        : '12/12 Products upgraded to V3 with zero hallucinated info; Interactive logic operating flawlessly.',
                      evidenceList: lang === 'VI' ? [
                        'Nhật ký Fact-checking chỉ ra ít nhất 3 điểm ảo giác do AI sinh ra và cách học sinh phát hiện.',
                        'Minh chứng chỉnh sửa prompt tối thiểu 2 phiên bản (V2 ➔ V3) để ép AI trả lời đúng sự thật.',
                        'Bộ câu hỏi trắc nghiệm kiến thức (SP7 V3) đã qua kiểm chứng 100%.'
                      ] : [
                        'Fact-checking log highlighting at least 3 detected hallucinations.',
                        'Evidence of prompt iterations (V2 ➔ V3) enforcing factual grounding.',
                        'Validated quiz and knowledge decks in SP7 V3.'
                      ],
                      rubricAssessment: lang === 'VI'
                        ? '4F Reflection ≥ 80 điểm; Vượt qua bài test phát hiện lỗi ảo giác giả định của Mentor.'
                        : '4F Reflection ≥ 80 points; Pass simulated hallucination detection challenge.',
                      targetProducts: [
                        { code: 'SP7', name: 'Learning Hub V3', focus: lang === 'VI' ? 'Bộ flashcard và quiz 100% chuẩn xác không bịa thông tin' : 'Verified flashcard & quiz suites' },
                        { code: 'SP8', name: 'Exam Prep V3', focus: lang === 'VI' ? 'Đồng hồ Pomodoro & theo dõi tiến độ chính xác' : 'Accurate Pomodoro timer & progress persistence' },
                        { code: 'SP9', name: 'Portrait V3', focus: lang === 'VI' ? 'Showcase năng lực trung thực có số liệu minh chứng' : 'Evidence-backed growth portrait' }
                      ]
                    },
                    {
                      course: lang === 'VI' ? 'Khóa 4' : 'Course 4',
                      spikeName: 'GenAI Spike (Level 1.8 → L2.0 Target)',
                      spikeCode: 'GenAI',
                      focusIndicators: lang === 'VI' ? [
                        'Duy trì ngữ cảnh nhất quán qua chuỗi hội thoại nhiều lượt (Multi-turn Context Management).',
                        'Thiết kế câu lệnh Socratic buộc AI đặt câu hỏi gợi mở thay vì đưa ra đáp án trực tiếp.',
                        'Thiết lập System Prompt quy định vai trò, ranh giới và tính cách sư phạm cho AI.'
                      ] : [
                        'Maintain consistent context across extended multi-turn dialog chains.',
                        'Design Socratic prompts that guide learners with questions instead of direct answers.',
                        'Configure System Prompts regulating pedagogical tone, boundaries, and persona.'
                      ],
                      briefReq: lang === 'VI'
                        ? '12/12 Sản phẩm được nâng cấp lên V4 có tính năng tương tác hội thoại hoặc phản hồi thời gian thực; SP10 AI Tutor hoạt động xuất sắc.'
                        : '12/12 Products upgraded to V4 featuring interactive multi-turn bots; SP10 AI Tutor fully active.',
                      evidenceList: lang === 'VI' ? [
                        'Kịch bản System Prompt của SP10 thể hiện rõ nguyên lý gợi mở tư duy Socratic.',
                        'Nhật ký hội thoại mẫu tối thiểu 5 lượt chứng minh AI giữ đúng vai trò gia sư.',
                        'Game giáo dục (SP11 V4) có cốt truyện và tương tác phong phú do AI hỗ trợ.'
                      ] : [
                        'System prompt architecture for SP10 proving Socratic pedagogical reasoning.',
                        'Multi-turn chat logs (≥ 5 turns) demonstrating role adherence.',
                        'Gamified interactive storylines in SP11 V4.'
                      ],
                      rubricAssessment: lang === 'VI'
                        ? '4F Reflection ≥ 85 điểm; Trực tiếp tương tác và vấn đáp cùng Chatbot SP10 trước Mentor.'
                        : '4F Reflection ≥ 85 points; Live interactive defense of SP10 Chatbot with Mentor.',
                      targetProducts: [
                        { code: 'SP10', name: 'AI Tutor V4', focus: lang === 'VI' ? 'Chatbot gia sư Socratic gợi mở tư duy đa lượt' : 'Multi-turn Socratic pedagogical tutor bot' },
                        { code: 'SP11', name: 'Game V4', focus: lang === 'VI' ? 'Game giáo dục có âm thanh, điểm số và thử thách AI' : 'Gamified interactive learning challenges' }
                      ]
                    },
                    {
                      course: lang === 'VI' ? 'Khóa 5' : 'Course 5',
                      spikeName: 'GenAI Spike (Level 2.0+ Mastery & Capstone)',
                      spikeCode: 'GenAI',
                      focusIndicators: lang === 'VI' ? [
                        'Làm chủ toàn diện quy trình sáng tạo và gỡ lỗi cùng AI trên toàn bộ 12 sản phẩm.',
                        'Tự tin giải thích nguyên lý AI, cấu trúc prompt và cách kiểm soát kết quả trong bài bảo vệ.',
                        'Tự đánh giá năng lực cá nhân và hoạch định mục tiêu học tập AI trong tương lai.'
                      ] : [
                        'Master complete AI collaboration and self-debugging across all 12 products.',
                        'Confidently explain AI principles, prompt architecture, and control mechanisms in defense.',
                        'Conduct metacognitive self-assessment and outline future AI learning milestones.'
                      ],
                      briefReq: lang === 'VI'
                        ? 'Toàn bộ 12/12 Sản phẩm đạt phiên bản V5 đỉnh cao, liên kết thành Master Portfolio Hub (SP12 V5) sẵn sàng xuất bản.'
                        : 'All 12/12 Products reach V5 perfection, integrated into the Master Portfolio Hub (SP12 V5).',
                      evidenceList: lang === 'VI' ? [
                        'Hồ sơ năng lực trực tuyến SP12 V5 tích hợp đầy đủ link live và mã nguồn của 12 sản phẩm.',
                        'Slide thuyết trình và video demo sản phẩm hoàn chỉnh.',
                        'Hoàn thành xuất sắc bài bảo vệ Show & Tell (5-7 phút) trước Hội đồng và Phụ huynh.'
                      ] : [
                        'Master Portfolio Hub (SP12 V5) linking all 12 live products and source repos.',
                        'Slide deck and polished product video walkthrough.',
                        'Deliver 5-7 min Show & Tell capstone defense before Council & Parents.'
                      ],
                      rubricAssessment: lang === 'VI'
                        ? '4F Reflection ≥ 90 điểm; Bảo vệ thành công Capstone Show & Tell đạt chuẩn Level 2 Toàn Diện.'
                        : '4F Reflection ≥ 90 points; Pass Show & Tell capstone defense achieving Full Level 2 Mastery.',
                      targetProducts: [
                        { code: 'SP12', name: 'Master Hub V5', focus: lang === 'VI' ? 'Showcase toàn bộ 12 sản phẩm V5 & bảo vệ Show & Tell' : 'Integrated 12-Product V5 Hub & Capstone Defense' },
                        { code: 'SP1–11', name: 'All Products V5', focus: lang === 'VI' ? 'Hoàn thiện 100% Brief và gắn domain cá nhân hóa' : '100% Brief completion & custom domain mapping' }
                      ]
                    }
                  ];

                  const cData = courseDetails[selectedCourseIdx];
                  return (
                    <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-8">
                      {/* Header */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-100">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-black uppercase text-[#cc4e2d] tracking-wider bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                              {lang === 'VI' ? 'Chuẩn Tốt Nghiệp' : 'Graduation Criteria'}
                            </span>
                            <span className="text-xs font-mono font-bold text-[#cc4e2d] bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200">
                              {cData.spikeName}
                            </span>
                          </div>
                          <h2 className="text-xl sm:text-2xl font-black text-stone-900 mt-2">{cData.course}</h2>
                        </div>
                        <button
                          onClick={() => {
                            navigate('/ai-teen');
                            setActiveCoreCode(cData.spikeCode || 'GenAI');
                          }}
                          className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 self-start md:self-auto shrink-0 shadow-sm"
                        >
                          <Layers className="w-4 h-4 text-orange-400" />
                          <span>{lang === 'VI' ? 'Xem Rubric GenAI (Level 2)' : 'View GenAI Rubric (Level 2)'}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Focus Indicators in this Course */}
                      <div className="p-4 rounded-2xl bg-orange-50/50 border border-orange-200 space-y-2">
                        <div className="font-extrabold text-orange-950 text-xs sm:text-sm flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-[#cc4e2d]" />
                          {lang === 'VI' ? '🎯 CHỈ BÁO HÀNH VI TRỌNG TÂM TRONG KHÓA (GENAI LEVEL 2 TARGET):' : '🎯 TARGET BEHAVIORAL INDICATORS IN THIS COURSE:'}
                        </div>
                        <ul className="list-disc pl-5 text-xs text-stone-800 space-y-1.5 leading-relaxed font-medium">
                          {cData.focusIndicators.map((ind, i) => (
                            <li key={i}>{ind}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Criteria Grid */}
                      <div className="grid md:grid-cols-3 gap-6">
                        {/* Box 1 */}
                        <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                          <div className="font-extrabold text-stone-900 text-sm flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-stone-800"></span>
                            {lang === 'VI' ? 'Chuẩn Tiến Hóa 12 Sản Phẩm' : '12 Products Evolution'}
                          </div>
                          <p className="text-xs text-stone-600 leading-relaxed font-medium">{cData.briefReq}</p>
                        </div>

                        {/* Box 2 */}
                        <div className="p-5 rounded-2xl bg-orange-50/60 border border-orange-200 space-y-2">
                          <div className="font-extrabold text-orange-950 text-sm flex items-center gap-2">
                            <Flame className="w-4 h-4 text-[#cc4e2d]" />
                            {lang === 'VI' ? 'Bằng Chứng Bắt Buộc' : 'Required Evidence'}
                          </div>
                          <ul className="list-disc pl-4 text-xs text-orange-950 space-y-1.5 leading-relaxed">
                            {cData.evidenceList.map((ev, i) => (
                              <li key={i}>{ev}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Box 3 */}
                        <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
                          <div className="font-extrabold text-emerald-950 text-sm flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            {lang === 'VI' ? 'Đánh Giá & Vấn Đáp' : 'Assessment Rubrics'}
                          </div>
                          <p className="text-xs text-emerald-900 leading-relaxed font-medium">
                            {cData.rubricAssessment}
                          </p>
                        </div>
                      </div>

                      {/* Products Mapped to this Course */}
                      <div className="space-y-4 pt-4 border-t border-stone-100">
                        <h3 className="font-bold text-stone-900 text-sm uppercase tracking-wider flex items-center gap-2">
                          <span>{lang === 'VI' ? 'Sản Phẩm Trọng Tâm Trong Khóa (Tiến Trình Xoắn Ốc)' : 'Key Products in this Course (Spiral Evolution)'}</span>
                        </h3>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                          {cData.targetProducts.map((p) => (
                            <div
                              key={p.code}
                              className="p-4 rounded-xl border border-stone-200 bg-stone-50/40 hover:bg-orange-50/30 hover:border-orange-200 transition-colors"
                            >
                              <div className="flex items-center gap-2 mb-1.5">
                                <span className="px-2 py-0.5 bg-stone-900 text-white font-mono font-bold text-[10px] rounded">
                                  {p.code}
                                </span>
                                <span className="font-extrabold text-xs text-stone-900">{p.name}</span>
                              </div>
                              <p className="text-[11px] text-stone-500 leading-snug">{p.focus}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })()}
                {/* 12 Products Full Table */}
                <div className="space-y-4 pt-6">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-6 bg-[#cc4e2d] rounded-full"></span>
                      <h2 className="text-xl font-black text-stone-900">
                        {lang === 'VI' ? 'Bảng Ánh Xạ 12 Sản Phẩm & Câu Hỏi Socratic' : 'Product Socratic Matrix'}
                      </h2>
                    </div>
                    <span className="text-xs font-bold text-stone-500">12 Performance Tasks</span>
                  </div>

                  <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white shadow-sm">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-stone-100/80 border-b border-stone-200 text-stone-700 font-bold uppercase tracking-wider text-[11px]">
                          <th className="p-4 w-36">{lang === 'VI' ? 'Mã Sản Phẩm' : 'Product Code'}</th>
                          <th className="p-4 w-48">{lang === 'VI' ? 'Yêu Cầu Kỹ Thuật' : 'Technical Scope'}</th>
                          <th className="p-4 w-60">{lang === 'VI' ? 'Chỉ Báo Conan1' : 'Conan1 Indicators'}</th>
                          <th className="p-4">{lang === 'VI' ? 'Câu Hỏi Gợi Mở Mentor (Socratic)' : 'Socratic Coaching Prompts'}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100">
                        {[
                          {
                            code: 'SP1',
                            name: 'Personal Page',
                            tech: lang === 'VI' ? 'Web cá nhân giới thiệu bản thân, ước mơ, form liên hệ.' : 'Personal portfolio web with bio, aspirations, and contact form.',
                            indicators: ['CU.1.3: Persona Dev', 'GenAI.2.1: Prompting', 'DPD.4.1: Product Launch'],
                            socratic: lang === 'VI' ? '"Ai sẽ vào xem trang cá nhân này của con? Con muốn người ta nhớ đến con qua 3 từ khóa nào nhất?"' : '"Who is the primary audience for your personal page? Which 3 keywords do you want them to remember about you?"'
                          },
                          {
                            code: 'SP2',
                            name: 'My Hobby Website',
                            tech: lang === 'VI' ? 'Web đam mê đa trang (5+ trang con), menu điều hướng.' : 'Multi-page passion web (5+ pages) with dynamic navigation.',
                            indicators: ['DPD.2.3: Architecture', 'CU.2.1: Latent Needs', 'LRN.1.2: Info Literacy'],
                            socratic: lang === 'VI' ? '"Vì sao con lại chia thành 5 trang này mà không gom vào 1 trang? Người xem bấm vào đâu sẽ thích nhất?"' : '"Why did you separate this into 5 pages instead of one? Where will the visitor feel most engaged?"'
                          },
                          {
                            code: 'SP3',
                            name: 'My Family Website',
                            tech: lang === 'VI' ? 'Cây gia phả tương tác, hover xem thông tin gia đình.' : 'Interactive family tree with hover profiles and history.',
                            indicators: ['CU.1.1: Interviewing', 'CU.1.2: Contextual Inquiry', 'DPD.2.2: UX Hierarchy'],
                            socratic: lang === 'VI' ? '"Thông tin này con tự nhớ hay đã hỏi ông bà/bố mẹ? Khi bố mẹ hover vào ảnh của mình, bố mẹ nói gì?"' : '"Did you gather this information via interviews with parents/grandparents? What was their reaction?"'
                          },
                          {
                            code: 'SP4',
                            name: 'AI Prompting Cookbook',
                            tech: lang === 'VI' ? 'Thư viện 5+ bộ prompt mẫu (Role, Context, Task, Constraint).' : 'Curated library of 5+ prompt templates (Role, Context, Task, Constraint).',
                            indicators: ['GenAI.1.1: AI Literacy', 'GenAI.2.1: Adv Prompting', 'LRN.2.3: Knowledge Integration'],
                            socratic: lang === 'VI' ? '"Nếu bỏ bớt phần Constraint đi thì AI sẽ trả lời sai thế nào? Prompt này con có thể chia sẻ cho bạn nào dùng?"' : '"If you remove the Constraint, how will AI output degrade? Who can benefit from using this cookbook?"'
                          },
                          {
                            code: 'SP5',
                            name: 'Custom Domain & DNS',
                            tech: lang === 'VI' ? 'Trỏ tên miền riêng từ Cloudflare DNS chạy trực tuyến.' : 'Deploy custom domain with Cloudflare DNS records live.',
                            indicators: ['DPD.4.1: Deployment', 'PSDM.1.2: Root Cause', 'PE.3.3: Craftsmanship'],
                            socratic: lang === 'VI' ? '"DNS hoạt động như thế nào con giải thích thử? Khi web chưa nhận tên miền, con kiểm tra bước nào đầu tiên?"' : '"How does DNS resolution work? When the domain fails to propagate, what is your first debugging step?"'
                          },
                          {
                            code: 'SP6',
                            name: 'NotebookLM AI Knowledge',
                            tech: lang === 'VI' ? 'Bộ tài liệu AI sinh audio podcast & slide trình bày.' : 'AI curated knowledge kit generating audio podcast and summary decks.',
                            indicators: ['GenAI.2.2: AI Learning', 'LRN.1.3: Synthesis', 'CU.3.3: Value Proposition'],
                            socratic: lang === 'VI' ? '"Nguồn tài liệu con nạp vào là gì? Bản tóm tắt của AI có chỗ nào thiếu hoặc chưa chính xác không?"' : '"What source materials did you feed into NotebookLM? Were there any inaccuracies in AI summary?"'
                          },
                          {
                            code: 'SP7',
                            name: 'My Learning Hub',
                            tech: lang === 'VI' ? 'Flashcards 3D xoay lật + Bài thi trắc nghiệm AI.' : '3D flip flashcards + AI-extracted quiz engine.',
                            indicators: ['DPD.2.3: Interactive UI', 'PSDM.1.2: Logic Debugging', 'LRN.2.1: Practice'],
                            socratic: lang === 'VI' ? '"Bộ Flashcards này phục vụ môn học nào của con? Khi bấm lật thẻ không xoay, con đã cùng AI sửa thế nào?"' : '"Which subject does this Flashcard hub support? How did you debug the 3D flip animation with AI?"'
                          },
                          {
                            code: 'SP8',
                            name: 'My Exam Prep Portal',
                            tech: lang === 'VI' ? 'Checklist đo lường tiến độ tự học + Đồng hồ Pomodoro.' : 'Self-study progress checklist + 25-minute Pomodoro timer.',
                            indicators: ['PE.1.1: Time Management', 'DPD.2.1: State Management', 'PSDM.3.2: Prioritization'],
                            socratic: lang === 'VI' ? '"Đồng hồ Pomodoro giúp ích gì cho con khi ôn thi? Con đã thử dùng nó để học 1 buổi 25 phút thật chưa?"' : '"How does the Pomodoro timer assist your exam prep? Have you completed a real 25-min session?"'
                          },
                          {
                            code: 'SP9',
                            name: 'My Student Portrait',
                            tech: lang === 'VI' ? 'Triển lãm năng lực cá nhân có hiệu ứng cuộn trang mượt.' : 'Dynamic student portrait showcase with smooth scroll animations.',
                            indicators: ['PE.1.3: Organization', 'DPD.2.2: Advanced Animation', 'LRN.2.3: Showcasing'],
                            socratic: lang === 'VI' ? '"Trang Showcase này khác gì so với Trang cá nhân ở SP1? Con thấy năng lực của mình đã tiến bộ thế nào?"' : '"How does this Showcase differ from SP1 Personal Page? In what areas have your competencies evolved?"'
                          },
                          {
                            code: 'SP10',
                            name: 'My AI Tutor Chatbot',
                            tech: lang === 'VI' ? 'Chatbot AI ứng dụng kỹ thuật đặt câu hỏi Socratic.' : 'AI tutor chatbot implementing Socratic inquiry prompting.',
                            indicators: ['GenAI.3.1: Pedagogical Prompting', 'CU.2.3: Emotion Modeling', 'DPD.3.1: Conversational UI'],
                            socratic: lang === 'VI' ? '"Vì sao chatbot này không trả lời thẳng đáp án mà lại hỏi ngược lại người dùng? Con thiết kế luật chơi cho nó thế nào?"' : '"Why does this tutor ask guiding questions instead of giving answers? How did you design its pedagogical rules?"'
                          },
                          {
                            code: 'SP11',
                            name: 'Educational Game',
                            tech: lang === 'VI' ? 'Trò chơi học tập tương tác, tính điểm, SFX, Leaderboard.' : 'Interactive learning game with score mechanics, SFX, and leaderboard.',
                            indicators: ['DPD.3.2: Gamification', 'PSDM.2.3: Edge Cases', 'CU.2.1: User Engagement'],
                            socratic: lang === 'VI' ? '"Người chơi có thể gian lận điểm trong game này được không? Con đã tối ưu âm thanh thế nào để bạn thấy vui?"' : '"Can players exploit the game score? How did you tune audio effects for engagement?"'
                          },
                          {
                            code: 'SP12',
                            name: 'AI Product & Showcase',
                            tech: lang === 'VI' ? 'Hub tổng hợp trưng bày toàn bộ sản phẩm và kết nối API.' : 'Master portfolio hub showcasing all 12 artifacts with live API connections.',
                            indicators: ['DPD.4.3: Product Ecosystem', 'LRN.3.3: Lifelong Portfolio', 'LRN.2.3: Master Show & Tell'],
                            socratic: lang === 'VI' ? '"Nếu chọn 1 sản phẩm con tự hào nhất trong 12 sản phẩm này, con chọn cái nào và tại sao?"' : '"If you pick one artifact you are most proud of out of 12, which one is it and why?"'
                          }
                        ].map((sp) => (
                          <tr key={sp.code} className="hover:bg-orange-50/20 transition-colors">
                            <td className="p-4 font-bold text-stone-900 align-top">
                              <span className="inline-block px-2 py-0.5 rounded bg-stone-900 text-white text-[10px] font-mono mr-1.5">
                                {sp.code}
                              </span>
                              <span>{sp.name}</span>
                            </td>
                            <td className="p-4 text-stone-600 align-top leading-relaxed">{sp.tech}</td>
                            <td className="p-4 align-top space-y-1">
                              {sp.indicators.map((ind, i) => (
                                <span
                                  key={i}
                                  className="inline-block mr-1 mb-1 px-2 py-0.5 bg-sky-50 text-sky-800 rounded font-mono text-[11px] border border-sky-200"
                                >
                                  {ind}
                                </span>
                              ))}
                            </td>
                            <td className="p-4 text-stone-700 italic align-top bg-stone-50/50 leading-relaxed font-medium">
                              {sp.socratic}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
          </div>
        )}

        {/* ================= VIEW 3A: AI TEEN COMPETENCY FRAMEWORK (4 CORE DOMAINS OVERVIEW) ================= */}
        {currentRoute === '/ai-teen' && (
          <div className="space-y-10">
            {/* Hero Header */}
            <div className="text-center max-w-2xl mx-auto space-y-2 py-1">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
                {lang === 'VI' ? 'Khung Năng Lực AI Teen' : 'AI Teen Competency Framework'}
              </h1>
              <p className="text-stone-500 text-sm sm:text-base leading-relaxed">
                {lang === 'VI'
                  ? 'Bộ 4 năng lực cốt lõi chuẩn hóa cho học sinh kiến tạo sản phẩm số.'
                  : 'Core 4 competency taxonomy calibrated for teen product builders.'}
              </p>
            </div>

            {/* 4 Core Competency Discovery Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {[
                {
                  code: 'GenAI',
                  name_vi: 'Trí Tuệ Nhân Tạo Sinh (GenAI)',
                  name_en: 'Generative AI (GenAI)',
                  domainSlug: 'domain-generative-ai',
                  short_name: 'GENAI',
                  role: 'primary',
                  spike_vi: 'Mục tiêu: Level 2',
                  spike_en: 'Target: Level 2',
                  desc_vi: 'Làm chủ công nghệ trí tuệ nhân tạo sinh, kỹ thuật prompt đa tầng, đánh giá độ tin cậy và ứng dụng AI kiến tạo sản phẩm số.',
                  desc_en: 'Master generative AI technology, multi-stage prompt engineering, model validation, and AI-assisted product creation.',
                  color: '#cc4e2d',
                  icon: Sparkles
                },
                {
                  code: 'CU',
                  name_vi: 'Thấu Hiểu Khách Hàng',
                  name_en: 'Customer Understanding',
                  domainSlug: 'domain-customer-understanding',
                  short_name: 'CU',
                  role: 'supporting',
                  spike_vi: 'Mục tiêu: Level 1',
                  spike_en: 'Target: Level 1',
                  desc_vi: 'Năng lực đồng cảm sâu sắc, phỏng vấn tìm hiểu nỗi đau người dùng và kiến tạo giải pháp chạm đúng nhu cầu cốt lõi.',
                  desc_en: 'Deep empathy, user pain-point interviewing, and creating solutions that address core authentic human needs.',
                  color: '#0284c7',
                  icon: Users
                },
                {
                  code: 'DPD',
                  name_vi: 'Phát Triển Sản Phẩm Số',
                  name_en: 'Digital Product Development',
                  domainSlug: 'domain-digital-product-development',
                  short_name: 'DPD',
                  role: 'supporting',
                  spike_vi: 'Mục tiêu: Level 1',
                  spike_en: 'Target: Level 1',
                  desc_vi: 'Năng lực biến ý tưởng thành sản phẩm số hoàn chỉnh qua thiết kế trải nghiệm UX, lập trình và kiểm thử với sự hỗ trợ của AI.',
                  desc_en: 'Transform ideas into working digital products via UX design, rapid coding, and testing with AI assistance.',
                  color: '#059669',
                  icon: Layers
                },
                {
                  code: 'LRN',
                  name_vi: 'Năng Lực Tự Học',
                  name_en: 'Learning & Reflection',
                  domainSlug: 'domain-learning',
                  short_name: 'LRN',
                  role: 'supporting',
                  spike_vi: 'Mục tiêu: Level 1',
                  spike_en: 'Target: Level 1',
                  desc_vi: 'Khả năng tự định hướng, khai thác tri thức, phản tư liên tục và làm chủ các kỹ năng mới trong kỷ nguyên số.',
                  desc_en: 'Self-directed learning, knowledge acquisition, iterative reflection, and mastering new digital skills.',
                  color: '#7c3aed',
                  icon: BookOpen
                }
              ].map((c) => {
                const IconComp = c.icon;
                const d = competencyData.find((item) => item.slug === c.domainSlug);
                const areasCount = d?.competency_areas?.length || 0;
                const compCount = d?.competency_areas?.reduce(
                  (acc, a) => acc + (a.competencies?.length || 0),
                  0
                ) || 0;
                const isPrimary = c.role === 'primary';

                return (
                  <div
                    key={c.code}
                    onClick={() => navigate(`/ai-teen/${c.domainSlug}`)}
                    className="eco-card group relative bg-white border border-stone-200 rounded-3xl p-7 cursor-pointer flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-orange-300 transition-all duration-300"
                  >
                    <div>
                      {/* Top Header & Icon */}
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3.5">
                          <div
                            className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                            style={{
                              backgroundColor: `${c.color}15`,
                              color: c.color
                            }}
                          >
                            <IconComp className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="font-extrabold text-lg text-stone-900 group-hover:text-[#cc4e2d] transition-colors leading-snug">
                              {lang === 'VI' ? c.name_vi : c.name_en}
                            </h3>
                            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                              {c.short_name}
                            </span>
                          </div>
                        </div>

                        {/* Spike Target Badge */}
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide shrink-0 ${
                            isPrimary
                              ? 'bg-orange-100 text-[#cc4e2d] border border-orange-200'
                              : 'bg-stone-100 text-stone-600 border border-stone-200'
                          }`}
                        >
                          {lang === 'VI' ? c.spike_vi : c.spike_en}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-stone-600 line-clamp-3 leading-relaxed mb-6">
                        {lang === 'VI' ? c.desc_vi : c.desc_en}
                      </p>
                    </div>

                    {/* Footer Stats & Explore button */}
                    <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                      <span className="font-semibold text-stone-500">
                        {areasCount} {lang === 'VI' ? 'Khu vực' : 'Areas'} | {compCount}{' '}
                        {lang === 'VI' ? 'Năng lực' : 'Competencies'}
                      </span>
                      <span className="font-bold text-[#cc4e2d] flex items-center gap-1 group-hover:translate-x-1.5 transition-transform">
                        {lang === 'VI' ? 'Khám phá' : 'Explore'} <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= VIEW 3B: AI TEEN COMPETENCY DOMAIN DETAIL (FOCUSED VIEW - IMAGE 1 REPLICA) ================= */}
        {currentRoute.startsWith('/ai-teen/') && activeAiTeenDomain && (
          <div className="space-y-6">
            {/* Domain Breadcrumb Header */}
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <button
                    onClick={() => navigate('/ai-teen')}
                    className="text-xs font-bold text-[#cc4e2d] hover:underline flex items-center gap-1 mb-2 cursor-pointer"
                  >
                    ← {lang === 'VI' ? 'Tất cả Khung Năng Lực AI Teen' : 'All AI Teen Competencies'}
                  </button>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: `${activeAiTeenDomain.color || '#cc4e2d'}15`,
                        color: activeAiTeenDomain.color || '#cc4e2d'
                      }}
                    >
                      {(() => {
                        const IconComp = getDomainIcon(activeAiTeenDomain.slug);
                        return <IconComp className="w-5 h-5" />;
                      })()}
                    </div>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111]">
                        {lang === 'VI' ? activeAiTeenDomain.name_vi || activeAiTeenDomain.name : activeAiTeenDomain.name}
                      </h2>
                      <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                        {activeAiTeenDomain.short_name || 'AI TEEN'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-white border border-stone-200 text-stone-700 text-xs font-bold shadow-2xs">
                    {activeAiTeenDomain.competency_areas?.length || 0} {lang === 'VI' ? 'Lĩnh vực' : 'Areas'}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white border border-stone-200 text-stone-700 text-xs font-bold shadow-2xs">
                    {activeAiTeenDomain.competency_areas?.reduce((acc, a) => acc + (a.competencies?.length || 0), 0) || 0}{' '}
                    {lang === 'VI' ? 'Năng lực' : 'Competencies'}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-2xs ${
                    activeAiTeenDomain.slug === 'domain-generative-ai'
                      ? 'bg-orange-100 text-[#cc4e2d] border border-orange-200'
                      : 'bg-stone-100 text-stone-700 border border-stone-200'
                  }`}>
                    {activeAiTeenDomain.slug === 'domain-generative-ai'
                      ? (lang === 'VI' ? 'Mục tiêu: Level 2 (Mũi nhọn)' : 'Target: Level 2 (Primary)')
                      : (lang === 'VI' ? 'Mục tiêu: Level 1 (Hỗ trợ)' : 'Target: Level 1 (Supporting)')}
                  </span>
                </div>
              </div>

              {/* Toolbar: Reset & Reading vs Editing Mode */}
              <div className="mt-5 pt-4 border-t border-stone-200/80 flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-stone-500 max-w-xl leading-relaxed">
                  {lang === 'VI' ? activeAiTeenDomain.description_vi || activeAiTeenDomain.description : activeAiTeenDomain.description}
                </p>

                <div className="flex items-center gap-2">
                  {(Object.keys(customTargetLevels).length > 0 || Object.keys(customSkillRoles).length > 0) && (
                    <button
                      type="button"
                      onClick={handleResetAllCustomizations}
                      className="px-2.5 py-1.5 text-[11px] font-bold text-stone-600 hover:text-stone-900 bg-white hover:bg-stone-50 border border-stone-200 rounded-xl flex items-center gap-1.5 transition-all shadow-2xs"
                      title={lang === 'VI' ? 'Khôi phục tất cả Target Level & Role về mặc định' : 'Reset all Target Levels and Roles'}
                    >
                      <RotateCcw className="w-3 h-3 text-stone-400" />
                      <span>{lang === 'VI' ? 'Khôi phục' : 'Reset'}</span>
                    </button>
                  )}
                  {/* Reading Mode vs Editing Mode segmented button */}
                  <div className="inline-flex p-0.5 bg-stone-200/90 rounded-xl border border-stone-300/70 shadow-2xs">
                    <button
                      type="button"
                      onClick={() => setRubricViewMode('reading')}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all ${
                        rubricViewMode === 'reading'
                          ? 'bg-white text-stone-900 shadow-xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5 text-stone-500" />
                      <span>{lang === 'VI' ? 'Đọc' : 'Read'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRubricViewMode('editing')}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all ${
                        rubricViewMode === 'editing'
                          ? 'bg-[#cc4e2d] text-white shadow-xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>{lang === 'VI' ? 'Chọn Target' : 'Edit Target'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Accordion List of Competency Areas */}
            <div className="space-y-4">
              {(() => {
                const activeCoreCode = activeAiTeenDomain.slug === 'domain-generative-ai' ? 'GenAI'
                  : activeAiTeenDomain.slug === 'domain-customer-understanding' ? 'CU'
                  : activeAiTeenDomain.slug === 'domain-digital-product-development' ? 'DPD'
                  : 'LRN';
                const isPrimaryDomain = activeCoreCode === 'GenAI';

                return activeAiTeenDomain.competency_areas?.map((area, aIdx) => {
                  const isAreaOpen = !!openAreas[area.id];
                  const areaTitle = lang === 'VI' ? area.name_vi || area.name : area.name;

                  return (
                    <div
                      key={area.id}
                      className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden"
                    >
                      {/* Area Header (Image 1 Style) */}
                      <div
                        onClick={() => toggleArea(area.id)}
                        className="p-5 flex items-center justify-between cursor-pointer hover:bg-orange-50/20 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                            isPrimaryDomain ? 'bg-orange-100/60 text-[#cc4e2d]' : 'bg-stone-100 text-stone-700'
                          }`}>
                            <Layers className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="font-extrabold text-stone-900 text-base">
                                {areaTitle}
                              </h4>
                              <CompetencyTooltip
                                title={areaTitle}
                                description={area.description || (lang === 'VI' ? `Khu vực năng lực trọng tâm bao gồm ${area.competencies?.length || 0} năng lực chuyên sâu.` : `Core competency area covering ${area.competencies?.length || 0} competencies.`)}
                                whyItMatters={lang === 'VI' ? 'Định hình năng lực tư duy, công nghệ và ứng dụng thực tế theo tiêu chuẩn quốc tế.' : 'Forms mindset, technology and hands-on applied competencies.'}
                                onPromptClick={() => setSelectedPromptSkill({ name: areaTitle, code: `Area-${aIdx + 1}` })}
                                lang={lang}
                                badgeText={lang === 'VI' ? 'Khu Vực Năng Lực' : 'Competency Area'}
                              />
                            </div>
                          </div>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 text-stone-400 transition-transform ${
                            isAreaOpen ? 'rotate-180 text-[#cc4e2d]' : ''
                          }`}
                        />
                      </div>

                      {/* Area Body: Competencies List */}
                      {isAreaOpen && (
                        <div className="p-4 sm:p-6 bg-stone-50/40 border-t border-stone-100 space-y-6">
                          {area.competencies?.map((comp, cIdx) => {
                            const isCompOpen = openCompetencies[comp.id] !== false; // default open
                            const compTitle = lang === 'VI' ? comp.name_vi || comp.name : comp.name;

                            // Filter only top-level Conan1 skills (parent_id is null)
                            const parentSkills = (comp.competency_skills || []).filter((s) => !s.parent_id);
                            const topLevelSkills = parentSkills.length > 0 ? parentSkills : (comp.competency_skills || []);

                            return (
                              <div
                                key={comp.id}
                                className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden"
                              >
                                {/* Competency Header */}
                                <div
                                  onClick={() => toggleCompetency(comp.id)}
                                  className="p-4 sm:p-5 flex items-center justify-between cursor-pointer hover:bg-stone-50 transition-colors border-b border-stone-100"
                                >
                                  <div className="flex items-center gap-3">
                                    <span className={`w-2.5 h-2.5 rounded-full ${isPrimaryDomain ? 'bg-[#cc4e2d]' : 'bg-stone-500'} shrink-0`}></span>
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <h5 className="font-bold text-stone-900 text-sm sm:text-base">
                                        {compTitle}
                                      </h5>
                                      {/* Inline info tooltip with embedded Prompt AI */}
                                      <CompetencyTooltip
                                        title={compTitle}
                                        description={lang === 'VI' ? comp.description_vi || comp.description : comp.description}
                                        whyItMatters={lang === 'VI' ? comp.why_it_matters_vi || comp.why_it_matters : comp.why_it_matters}
                                        onPromptClick={() => setSelectedPromptSkill({
                                          name: compTitle,
                                          code: `${aIdx + 1}.${cIdx + 1}`
                                        })}
                                        lang={lang}
                                        badgeText={`Competency ${aIdx + 1}.${cIdx + 1}`}
                                      />
                                    </div>
                                  </div>
                                  <ChevronDown
                                    className={`w-4 h-4 text-stone-400 transition-transform ${
                                      isCompOpen ? 'rotate-180 text-[#cc4e2d]' : ''
                                    }`}
                                  />
                                </div>

                                {/* Competency Body */}
                                {isCompOpen && (
                                  <div className="p-4 sm:p-6 space-y-6">

                                    {/* SKILLS & RUBRIC ASSESSMENT LIST (CONAN1 ALIGNED) */}
                                    <div className="space-y-4">
                                      {(() => {
                                        // Pre-calculate counts
                                        const skillRoleList = topLevelSkills.map((skill) => {
                                          const skillKey = skill.id || skill.name;
                                          const teenData = getAiTeenSkillData(skill.name, comp.name, activeCoreCode, lang, skill.id, skill);
                                          const role = customSkillRoles[skillKey] || teenData.skillRole || 'out_of_scope';
                                          return { skill, skillKey, teenData, role };
                                        });

                                        const inScopeCount = skillRoleList.filter((item) => item.role !== 'out_of_scope').length;
                                        const outOfScopeCount = skillRoleList.length - inScopeCount;

                                        // If editing mode, always show all so user can adjust roles; if reading mode, obey showOutOfScope toggle
                                        const displayedSkillItems = (rubricViewMode === 'editing' || showOutOfScope || outOfScopeCount === 0)
                                          ? skillRoleList
                                          : skillRoleList.filter((item) => item.role !== 'out_of_scope');

                                        return (
                                          <>
                                            {/* Skills List */}
                                            <div className="space-y-4">
                                              {displayedSkillItems.map(({ skill, skillKey, teenData, role }, sIdx) => {
                                                const isSkillOpen = openSkills[skill.id] !== false; // open by default
                                                const { examples, misconceptions } = getSkillExamplesAndMisconceptions(
                                                  skill.name,
                                                  lang,
                                                  skill.name_vi
                                                );
                                                const skillTitle = lang === 'VI' ? teenData.name_vi : (teenData.name_en || skill.name);
                                                const isCustomTarget = customTargetLevels[skillKey] !== undefined;
                                                const defaultTarget = role === 'primary' ? 2 : (role === 'supporting' ? 1 : null);
                                                const effectiveTargetLevel = isCustomTarget ? customTargetLevels[skillKey] : defaultTarget;
                                                const isEditing = rubricViewMode === 'editing';

                                                return (
                                                  <div
                                                    key={skill.id}
                                                    className={`rounded-2xl border border-stone-200 bg-white overflow-hidden shadow-2xs transition-all ${
                                                      role === 'out_of_scope' ? 'opacity-75' : ''
                                                    }`}
                                                  >
                                                    {/* Skill Header */}
                                                    <div
                                                      onClick={() => toggleSkill(skill.id)}
                                                      className="p-4 bg-stone-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:bg-stone-100/60 transition-colors border-b border-stone-200/60"
                                                    >
                                                      <div className="flex items-center gap-3">
                                                        <ChevronRight
                                                          className={`w-4 h-4 text-stone-400 transition-transform shrink-0 ${
                                                            isSkillOpen ? 'rotate-90 text-[#cc4e2d]' : ''
                                                          }`}
                                                        />
                                                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                                                          role === 'primary'
                                                            ? 'bg-orange-100 text-[#cc4e2d]'
                                                            : role === 'supporting'
                                                            ? 'bg-sky-100 text-sky-800'
                                                            : 'bg-stone-100 text-stone-500'
                                                        }`}>
                                                          <Target className="w-4 h-4" />
                                                        </div>
                                                        <div>
                                                          <div className="flex flex-wrap items-center gap-2">
                                                            <span className="font-extrabold text-stone-900 text-sm">
                                                              {skillTitle}
                                                            </span>

                                                            {/* Role Badge in Reading Mode - Sleek Lucide Target Indicator */}
                                                            {!isEditing && (
                                                              <>
                                                                {role === 'primary' && (
                                                                  <span
                                                                    title={lang === 'VI' ? 'Kỹ năng Trọng Tâm Mũi Nhọn' : 'Primary Focus Skill'}
                                                                    className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-orange-50 text-[#cc4e2d] border border-orange-200/80 cursor-help"
                                                                  >
                                                                    <Target className="w-3.5 h-3.5 text-[#cc4e2d]" />
                                                                    <span className="text-[10px] font-bold">{lang === 'VI' ? 'Mũi Nhọn' : 'Primary'}</span>
                                                                  </span>
                                                                )}
                                                                {role === 'supporting' && (
                                                                  <span
                                                                    title={lang === 'VI' ? 'Kỹ năng Trọng Tâm Hỗ Trợ' : 'Supporting Focus Skill'}
                                                                    className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-sky-50 text-sky-700 border border-sky-200/70 cursor-help"
                                                                  >
                                                                    <Target className="w-3 h-3 opacity-60 text-sky-600" />
                                                                    <span className="text-[10px] font-medium">{lang === 'VI' ? 'Hỗ Trợ' : 'Supporting'}</span>
                                                                  </span>
                                                                )}
                                                              </>
                                                            )}

                                                            {/* Info Tooltip with embedded Prompt AI */}
                                                            <CompetencyTooltip
                                                              title={skillTitle}
                                                              description={lang === 'VI' ? teenData.desc_vi || skill.description_vi || skill.description : (teenData.desc_en || skill.description)}
                                                              whyItMatters={lang === 'VI' ? teenData.guidingQuestion_vi || teenData.why_it_matters_vi || skill.why_it_matters : (teenData.guidingQuestion_en || skill.why_it_matters)}
                                                              onPromptClick={() => setSelectedPromptSkill({
                                                                name: skillTitle,
                                                                code: `S${sIdx + 1}`
                                                              })}
                                                              lang={lang}
                                                              badgeText={lang === 'VI' ? 'Kỹ Năng Thực Hành' : 'Skill Practice'}
                                                            />
                                                          </div>
                                                        </div>
                                                      </div>

                                                      {/* Controls (Editing Mode: Role Switcher / Reading Mode: Clean) */}
                                                      {isEditing && (
                                                        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                                                          <div
                                                            onClick={(e) => e.stopPropagation()}
                                                            className="inline-flex p-0.5 bg-stone-200/80 rounded-xl border border-stone-300/80 text-[10px] font-bold"
                                                          >
                                                            <button
                                                              type="button"
                                                              onClick={() => handleSetSkillRole(skillKey, skillTitle, 'primary')}
                                                              className={`px-2 py-1 rounded-lg transition-all ${
                                                                role === 'primary'
                                                                  ? 'bg-[#cc4e2d] text-stone-950 font-black shadow-xs'
                                                                  : 'text-stone-600 hover:text-stone-900'
                                                              }`}
                                                            >
                                                              {lang === 'VI' ? 'Mũi Nhọn' : 'Primary'}
                                                            </button>
                                                            <button
                                                              type="button"
                                                              onClick={() => handleSetSkillRole(skillKey, skillTitle, 'supporting')}
                                                              className={`px-2 py-1 rounded-lg transition-all ${
                                                                role === 'supporting'
                                                                  ? 'bg-sky-600 text-white font-black shadow-xs'
                                                                  : 'text-stone-600 hover:text-stone-900'
                                                              }`}
                                                            >
                                                              {lang === 'VI' ? 'Hỗ Trợ' : 'Supporting'}
                                                            </button>
                                                            <button
                                                              type="button"
                                                              onClick={() => handleSetSkillRole(skillKey, skillTitle, 'out_of_scope')}
                                                              className={`px-2 py-1 rounded-lg transition-all ${
                                                                role === 'out_of_scope'
                                                                  ? 'bg-stone-700 text-white font-black shadow-xs'
                                                                  : 'text-stone-600 hover:text-stone-900'
                                                              }`}
                                                            >
                                                              {lang === 'VI' ? 'Ngoài Phạm Vi' : 'Out of Scope'}
                                                            </button>
                                                          </div>
                                                        </div>
                                                      )}
                                                    </div>

                                                    {/* Skill Body: Building21 4-Level Rubrics & Evidence Box */}
                                                    {isSkillOpen && (
                                                      <div className="p-4 sm:p-6 space-y-6 bg-white">
                                                        {/* Guiding Question & Description (Minimalist Text, No Card) */}
                                                        <div className="space-y-3 pb-2 border-b border-stone-100">
                                                          {/* Guiding Question */}
                                                          <div className="pl-3.5 border-l-2 border-[#cc4e2d] space-y-0.5">
                                                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#cc4e2d] block">
                                                              {lang === 'VI' ? 'Câu hỏi định hướng' : 'Guiding Question'}
                                                            </span>
                                                            <p className="italic text-stone-800 font-medium text-xs sm:text-[13px] leading-relaxed">
                                                              "{lang === 'VI' ? teenData.guidingQuestion_vi : teenData.guidingQuestion_en}"
                                                            </p>
                                                          </div>

                                                          {/* Skill Description */}
                                                          <p className="text-xs text-stone-600 leading-relaxed pl-3.5">
                                                            {lang === 'VI' ? teenData.desc_vi : teenData.desc_en}
                                                          </p>
                                                        </div>

                                                        {/* 5-Level Rubrics Continuum Matrix */}
                                                        <div className="space-y-3">
                                                          <div className="flex items-center justify-between">
                                                            <span className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                                                              <Sliders className="w-3.5 h-3.5 text-[#cc4e2d]" />
                                                              {lang === 'VI' ? 'Thang Đánh Giá Năng Lực (5 Levels CBE Continuum)' : '5-Level CBE Continuum Rubrics'}
                                                            </span>
                                                            {role !== 'out_of_scope' && (
                                                              <span className="text-[11px] font-bold text-[#cc4e2d]">
                                                                {lang === 'VI' ? `Mục tiêu chuẩn: Level ${effectiveTargetLevel}` : `Target: Level ${effectiveTargetLevel}`}
                                                              </span>
                                                            )}
                                                          </div>

                                                          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
                                                            {teenData.rubricLevels.map((lvl) => {
                                                              const isTarget = role !== 'out_of_scope' && lvl.level === effectiveTargetLevel;

                                                              return (
                                                                <div
                                                                  key={lvl.level}
                                                                  onClick={() => {
                                                                    if (isEditing) {
                                                                      handleSetTargetLevel(skillKey, skillTitle, lvl.level);
                                                                    }
                                                                  }}
                                                                  className={`p-3.5 rounded-xl border flex flex-col justify-between transition-all select-none ${
                                                                    isTarget
                                                                      ? 'bg-orange-50/40 border-2 border-[#cc4e2d] shadow-sm relative ring-1 ring-[#cc4e2d]/20'
                                                                      : isEditing
                                                                      ? 'bg-stone-50/60 border-stone-200 hover:border-stone-400 hover:bg-stone-100/60 cursor-pointer hover:shadow-xs group'
                                                                      : role === 'out_of_scope'
                                                                      ? 'bg-stone-50/20 border-stone-200 text-stone-500'
                                                                      : 'bg-stone-50/40 border-stone-200 hover:border-stone-300'
                                                                  }`}
                                                                >
                                                                  <div>
                                                                    {/* Action button inside card when in editing mode */}
                                                                    {isEditing && (
                                                                      <div className="mb-2">
                                                                        {isTarget ? (
                                                                          <div className="w-full py-1 px-1.5 rounded-lg bg-[#cc4e2d] text-white font-black text-[9px] uppercase tracking-wider flex items-center justify-center gap-1 shadow-2xs">
                                                                            <Check className="w-3 h-3 stroke-[3]" />
                                                                            <span>{lang === 'VI' ? 'Đã Chọn' : 'Selected'}</span>
                                                                          </div>
                                                                        ) : (
                                                                          <button
                                                                            type="button"
                                                                            onClick={(e) => {
                                                                              e.stopPropagation();
                                                                              handleSetTargetLevel(skillKey, skillTitle, lvl.level);
                                                                            }}
                                                                            className="w-full py-1 px-1.5 rounded-lg bg-white group-hover:bg-orange-100 text-stone-600 group-hover:text-[#cc4e2d] border border-stone-200 group-hover:border-orange-300 font-bold text-[9px] uppercase tracking-wider transition-all flex items-center justify-center gap-1 shadow-2xs"
                                                                          >
                                                                            <span>{lang === 'VI' ? 'Đặt Mục Tiêu' : 'Set Target'}</span>
                                                                          </button>
                                                                        )}
                                                                      </div>
                                                                    )}

                                                                    <div className="flex items-center justify-between mb-2">
                                                                      <span className={`font-black text-xs ${isTarget ? 'text-[#cc4e2d]' : 'text-stone-900'}`}>
                                                                        {lvl.label}
                                                                      </span>
                                                                      {isTarget && (
                                                                        <span className="px-1.5 py-0.5 rounded-md text-[9px] font-black bg-[#cc4e2d] text-white uppercase tracking-wider shadow-2xs">
                                                                          Target
                                                                        </span>
                                                                      )}
                                                                    </div>

                                                                    <ul className="space-y-1.5 text-[11px] leading-relaxed text-stone-700">
                                                                      {lvl.indicators.map((ind, iIdx) => (
                                                                        <li key={iIdx} className="flex items-start gap-1.5">
                                                                          <span className={`text-xs mt-0.5 shrink-0 ${isTarget ? 'text-[#cc4e2d] font-bold' : 'text-stone-400'}`}>•</span>
                                                                          <span>{ind}</span>
                                                                        </li>
                                                                      ))}
                                                                    </ul>
                                                                  </div>
                                                                </div>
                                                              );
                                                            })}
                                                          </div>
                                                        </div>

                                                        {/* Evidence Box */}
                                                        {teenData.evidence && (
                                                          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-start gap-2.5">
                                                            <Award className="w-4 h-4 text-[#cc4e2d] shrink-0 mt-0.5" />
                                                            <div className="text-xs space-y-0.5">
                                                              <span className="font-bold text-stone-900 block">
                                                                {lang === 'VI' ? 'Bằng chứng nghiệm thu sản phẩm (Artifact Evidence)' : 'Artifact Evidence'}
                                                              </span>
                                                              <p className="text-stone-600 leading-relaxed text-[11.5px]">
                                                                {teenData.evidence}
                                                              </p>
                                                            </div>
                                                          </div>
                                                        )}
                                                      </div>
                                                    )}
                                                  </div>
                                                );
                                              })}
                                            </div>

                                                        {/* Bottom Helper Banner when Out of Scope Skills are Hidden */}
                                                        {!showOutOfScope && outOfScopeCount > 0 && rubricViewMode === 'reading' && (
                                                          <div className="p-3 bg-stone-50 border border-dashed border-stone-300 rounded-xl text-center text-xs text-stone-500 flex items-center justify-center gap-2">
                                                            <span>
                                                              {lang === 'VI'
                                                                ? `Đang ẩn ${outOfScopeCount} kỹ năng ngoài phạm vi của đợt này.`
                                                                : `Hiding ${outOfScopeCount} out-of-scope skills for this cohort.`}
                                                            </span>
                                                            <button
                                                              type="button"
                                                              onClick={() => {
                                                                setShowOutOfScope(true);
                                                                try {
                                                                  localStorage.setItem('simba_ai_teen_show_out_of_scope', JSON.stringify(true));
                                                                } catch (e) {}
                                                              }}
                                                              className="font-bold text-[#cc4e2d] hover:underline cursor-pointer"
                                                            >
                                                              {lang === 'VI' ? 'Hiển thị tất cả' : 'Show all'}
                                                            </button>
                                                          </div>
                                                        )}
                                                      </>
                                                    );
                                                  })()}
                                                </div>
                                              </div>
                                            )}
                                          </div>
                                        );
                                      })}
                                    </div>
                                  )}
                                </div>
                              );
                            });
                          })()}
                        </div>
                      </div>
                    )}

        {/* ================= VIEW 4: GRADUATION PLAN ================= */}
        {currentRoute === '/graduation-plan' && (
          <div className="space-y-8">
            {/* Hero Header — Minimalist Style */}
            <div className="text-center max-w-2xl mx-auto space-y-2 py-1">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
                {lang === 'VI' ? 'Kế Hoạch Tốt Nghiệp' : 'Graduation Plan'}
              </h1>
              <p className="text-stone-500 text-sm sm:text-base leading-relaxed">
                {lang === 'VI'
                  ? 'Chuẩn đánh giá tốt nghiệp đa chiều dựa trên Tam giác Bằng chứng 70% - 20% - 10%.'
                  : 'Multi-dimensional graduation standard powered by 70% - 20% - 10% Evidence Triangulation.'}
              </p>
            </div>

            {/* Section 1: Graduation Promise & Weighting Banner */}
            <div className="bg-stone-900 text-white p-6 sm:p-8 rounded-3xl border border-stone-800 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#cc4e2d]/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase bg-orange-500/20 text-orange-400 border border-orange-500/30">
                    <ShieldCheck className="w-4 h-4 text-orange-400" /> Evidence-Based Standard
                  </span>
                  <span className="text-xs text-stone-400 font-mono">
                    {lang === 'VI' ? 'Triết lý: Competency-Based & Evidence-Based' : 'Philosophy: Competency-Based & Evidence-Based'}
                  </span>
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    Graduation Promise
                  </h2>
                  <p className="text-stone-300 text-sm sm:text-base leading-relaxed italic">
                    {lang === 'VI'
                      ? '"Sau chương trình Sư Tử Con, con bạn chuyển hóa từ \'Người tiêu thụ công nghệ thụ động\' thành \'Nhà kiến tạo số độc lập\' (Independent Product Builder) — biết dùng AI như một trợ lý để giải quyết vấn đề thực tế, hiểu rõ vì sao mình làm, và tự chủ học tập trước mọi công nghệ mới."'
                      : '"Upon graduation from Simba AI Teen, learners transform from passive tech consumers into Independent Product Builders — orchestrating AI to solve real-world problems with rigorous product rationale and self-directed learning habits."'}
                  </p>
                </div>

                {/* Weighting Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="bg-white/5 backdrop-blur rounded-2xl p-5 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-orange-400 uppercase">Weight: 70%</span>
                      <span className="text-2xl font-black text-white">70%</span>
                    </div>
                    <h4 className="font-bold text-sm text-stone-200">Simba Performance Evidence</h4>
                    <p className="text-xs text-stone-400 leading-relaxed">
                      {lang === 'VI'
                        ? 'Hoàn thành ≥ 6/12 products (mỗi product ≥ 3 versions) đạt ≥ 80đ + 12 bài 4F Reflections đầy đủ.'
                        : '≥ 6/12 products (≥ 3 versions each) scored ≥ 80 pts + 12 comprehensive 4F Reflections.'}
                    </p>
                  </div>

                  <div className="bg-white/5 backdrop-blur rounded-2xl p-5 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#cc4e2d] uppercase">Weight: 20%</span>
                      <span className="text-2xl font-black text-white">20%</span>
                    </div>
                    <h4 className="font-bold text-sm text-stone-200">Conceptual Test</h4>
                    <p className="text-xs text-stone-400 leading-relaxed">
                      {lang === 'VI'
                        ? 'Bài Assessment Test cuối khoá đạt ≥ 80 điểm (4 tình huống thám tử sản phẩm + 1 Mini-Prompt Fix).'
                        : 'Final Assessment Test scoring ≥ 80 pts (4 Scenario cases + 1 interactive Mini-Prompt Fix).'}
                    </p>
                  </div>

                  <div className="bg-white/5 backdrop-blur rounded-2xl p-5 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-400 uppercase">Weight: 10%</span>
                      <span className="text-2xl font-black text-white">10%</span>
                    </div>
                    <h4 className="font-bold text-sm text-stone-200">Product Showcase & Oral</h4>
                    <p className="text-xs text-stone-400 leading-relaxed">
                      {lang === 'VI'
                        ? 'Tham gia Product Showcase cuối khoá & hoàn thành Oral Verification 3–5 phút cùng Mentor.'
                        : 'Participate in Final Product Showcase & pass 3–5 min Socratic Oral Verification.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= VIEW 5: FAQ (COMPETENCY MISCONCEPTIONS & AUDIT) ================= */}
        {currentRoute === '/faq' && (() => {
          const faqList = [
            // GROUP 1: NHẬN THỨC NĂNG LỰC (Competency Concepts & Frameworks)
            {
              id: 'faq-1',
              category: 'concepts',
              categoryName: lang === 'VI' ? 'Bản Chất Năng Lực' : 'Competency Concepts',
              question: lang === 'VI'
                ? 'Khung Lộ trình Năng lực CBE (Building 21) khác gì với Thang đo Dreyfus 5 cấp độ?'
                : 'How does the Building 21 CBE Framework differ from the Dreyfus 5-Level Model?',
              shortAns: lang === 'VI'
                ? 'Building 21 là ma trận chỉ báo hành vi ("Con có thể..."), còn Dreyfus là thang đo mức độ thuần thục để chấm điểm.'
                : 'Building 21 defines behavioral indicators ("I can..."), while Dreyfus measures mastery levels for scoring.',
              misconception: lang === 'VI'
                ? 'Đem các nhãn Novice, Competent, Proficient gán đè lên Level 1–5 của ma trận chỉ báo Building 21.'
                : 'Equating Course Progression Levels 1–5 with Dreyfus skill levels directly in indicator matrices.',
              correctUnderstanding: lang === 'VI'
                ? 'Mỗi Level trong Building 21 chứa 2–3 chỉ báo hành vi "Con có thể..." cụ thể theo tình huống học tập. Thang Dreyfus chỉ dùng khi Mentor mở Rubric chấm điểm một bài nộp cụ thể.'
                : 'Building 21 levels feature discrete context-rich "I can..." indicators. Dreyfus scale is applied during rubric scoring for individual submissions.',
              takeaways: [
                lang === 'VI' ? 'Tham chiếu Lỗ hổng 13 trong Báo cáo Kiểm toán' : 'Pedagogical Audit Gap #13',
                lang === 'VI' ? 'Level 2 là Target Level chuẩn đầu ra của 5 mini-courses AI Teen' : 'Level 2 is the primary Target Level for AI Teen mini-courses'
              ],
              relatedRoute: '/ai-teen'
            },
            {
              id: 'faq-2',
              category: 'concepts',
              categoryName: lang === 'VI' ? 'Bản Chất Năng Lực' : 'Competency Concepts',
              question: lang === 'VI'
                ? 'Tại sao ngoài GenAI, chương trình vẫn bắt buộc phải có 4 Supporting Domains (CU, PSDM, DPD, LRN)?'
                : 'Why are the 4 Supporting Domains (CU, PSDM, DPD, LRN) mandatory alongside GenAI?',
              shortAns: lang === 'VI'
                ? 'GenAI chỉ là công cụ thực thi (Execution Engine). 4 Supporting Domains là năng lực định hướng để không tạo ra sản phẩm vô hồn.'
                : 'GenAI is only an execution engine. The 4 Supporting Domains provide the human judgment to avoid building meaningless products.',
              misconception: lang === 'VI'
                ? 'Nghĩ rằng dạy AI Teen là chỉ cần dạy viết Prompt thật dài và dùng tool tạo website/app là đủ.'
                : 'Assuming AI Teen only needs long prompt templates and tool generation workflows.',
              correctUnderstanding: lang === 'VI'
                ? 'Nếu không có CU (Hiểu người dùng) & PSDM (Giải quyết vấn đề), học sinh không biết mình giải quyết nỗi đau của ai. Nếu không có DPD (Thiết kế sản phẩm) & LRN (Tự phản tư), học sinh chỉ là người bấm nút thụ động cho AI.'
                : 'Without CU & PSDM, students solve no real problem. Without DPD & LRN, students are passive button clickers producing AI slop.',
              takeaways: [
                lang === 'VI' ? 'Bảo đảm tính chuyển giao trọn đời (Lifelong Transferability)' : 'Ensures lifelong transferable capability',
                lang === 'VI' ? 'Chuẩn hóa theo WEF Future of Jobs & DigComp 2.2' : 'Aligned with WEF Future of Jobs and DigComp 2.2'
              ],
              relatedRoute: '/ai-teen'
            },
            {
              id: 'faq-3',
              category: 'concepts',
              categoryName: lang === 'VI' ? 'Bản Chất Năng Lực' : 'Competency Concepts',
              question: lang === 'VI'
                ? 'Vì sao Target Level của 5 khóa AI Teen được thiết kế ở Level 2 mà không phải Level 4–5?'
                : 'Why is the Target Level for AI Teen calibrated at Level 2 instead of Level 4–5?',
              shortAns: lang === 'VI'
                ? 'Mỗi chỉ báo (Indicator) cần 2–3 giờ luyện tập có chủ đích. Tổng quỹ thời gian 12 buổi (40 giờ) chỉ vừa đủ để học sinh vững vàng ở Level 2.'
                : 'Each indicator requires 2–3 hours of deliberate practice. The 40-hour course budget is realistically calibrated for solid Level 2 mastery.',
              misconception: lang === 'VI'
                ? 'Nghĩ rằng thiết kế khóa học phải đặt mục tiêu Level 4 (Advanced) hoặc Level 5 (Mastery) thì học sinh mới giỏi.'
                : 'Believing that ambitious courses must set exit targets at Level 4 or 5.',
              correctUnderstanding: lang === 'VI'
                ? 'Chương trình có 12 buổi học trên lớp (2 giờ/buổi/tuần) cộng thời gian tự học (tổng ~40 giờ). Để nâng thành thục dù chỉ 1 kỹ năng (Skill Strand) gồm nhiều chỉ báo đã tốn rất nhiều thời gian luyện tập. Level 2 (Thực hành có cấu trúc độc lập) là mục tiêu khả thi, thực chất và bền vững nhất.'
                : '12 sessions (2 hrs/wk) plus self-study totals ~40 hours. Mastering multiple indicators in a single skill takes immense deliberate practice. Level 2 (Structured Independent Practice) is the rigorous, honest exit standard.',
              takeaways: [
                lang === 'VI' ? 'Định mức thời gian: 2–3 giờ/chỉ báo năng lực' : 'Time budget: 2–3 hours per competency indicator',
                lang === 'VI' ? 'Tránh bệnh hình thức và ảo tưởng năng lực' : 'Prevents superficial competency inflation'
              ],
              relatedRoute: '/ai-teen'
            },

            // GROUP 2: PHƯƠNG PHÁP & VẬN HÀNH SƯ PHẠM (Pedagogical Operations & AI Coaching)
            {
              id: 'faq-4',
              category: 'pedagogy_ops',
              categoryName: lang === 'VI' ? 'Vận Hành Sư Phạm' : 'Pedagogical Ops',
              question: lang === 'VI'
                ? 'Mentor làm thế nào để vận hành lớp 100+ học sinh mà không bị kiệt sức?'
                : 'How can a mentor manage a 100+ student cohort without burnout?',
              shortAns: lang === 'VI'
                ? 'Chuyển từ "Kèm cặp thủ công 1-1" sang "Vận hành Hệ sinh thái 3 Tầng Tự Trị".'
                : 'Transition from manual micro-management to a 3-Tier Autonomous Orchestration model.',
              misconception: lang === 'VI'
                ? 'Hoặc là Mentor phải đi từng bàn chỉ bài cho 100 em, hoặc là bỏ mặc học sinh tự bơi.'
                : 'Believing in a false dichotomy: Either exhaustive hand-holding or complete abandonment.',
              correctUnderstanding: lang === 'VI'
                ? 'Tầng 1: AI Simba Coach giải quyết 70% thắc mắc kỹ thuật ngay trên màn hình. Tầng 2: Nhóm 4 bạn bè (Peer Squad) giải quyết 20%. Tầng 3: Mentor chỉ giải quyết 10% ca khó và giữ lửa văn hóa lớp học.'
                : 'Tier 1: AI Coach handles 70% technical blockers. Tier 2: Peer Squads solve 20%. Tier 3: Mentor orchestrates 10% complex blockers and community culture.',
              takeaways: [
                lang === 'VI' ? 'Tham chiếu Lỗ hổng 9 & Mô hình 3 Tầng Tự Trị' : 'Pedagogical Audit Gap #9 & 3-Tier Autonomous Model',
                lang === 'VI' ? 'Giải phóng Mentor để tập trung vào giá trị sư phạm cốt lõi' : 'Frees mentors to focus on high-impact pedagogical moments'
              ],
              relatedRoute: '/graduation-plan'
            },
            {
              id: 'faq-5',
              category: 'pedagogy_ops',
              categoryName: lang === 'VI' ? 'Vận Hành Sư Phạm' : 'Pedagogical Ops',
              question: lang === 'VI'
                ? 'Khi học sinh gặp lỗi code hoặc màn hình trắng và gọi cứu trợ, Mentor cần xử lý thế nào?'
                : 'When students encounter red bugs or blank screens and call for help, how should mentors respond?',
              shortAns: lang === 'VI'
                ? 'Không chỉ cách sửa ngay. Bắt buộc học sinh thực hiện SOP gỡ lỗi 3 bước (Console ➔ SP4 Prompt ➔ Tự phân tích).'
                : 'Do not spoon-feed the fix. Enforce the 3-step AI debugging SOP before any mentor intervention.',
              misconception: lang === 'VI'
                ? 'Thấy học sinh bí là lao vào gõ hộ hoặc chỉ từng dòng lệnh để bài chạy được kịp giờ.'
                : 'Intervening immediately to fix code lines for students to meet session deadlines.',
              correctUnderstanding: lang === 'VI'
                ? 'Học sinh bị hiện tượng Đứt gãy chuyển giao (Transfer Gap). Mentor yêu cầu con mở Console lấy mã lỗi, mở lại bài SP4 (Prompting Cookbook), viết prompt Role-Context-Task hỏi AI tối thiểu 2 lần. Mentor chỉ hỗ trợ khi con đã có log hỏi AI.'
                : 'Address the Transfer Gap: Require students to inspect Console, reopen SP4 recipe, and submit 2 structured AI prompts before granting mentor assistance.',
              takeaways: [
                lang === 'VI' ? 'Tham chiếu Lỗ hổng 6 & 10 trong Báo cáo Kiểm toán' : 'Pedagogical Audit Gaps #6 & #10',
                lang === 'VI' ? 'Rèn luyện năng lực tự chủ PSDM.1.2 & PSDM.3.2' : 'Builds autonomous PSDM.1.2 & PSDM.3.2 mastery'
              ],
              relatedRoute: '/course-progression'
            },
            {
              id: 'faq-6',
              category: 'pedagogy_ops',
              categoryName: lang === 'VI' ? 'Vận Hành Sư Phạm' : 'Pedagogical Ops',
              question: lang === 'VI'
                ? 'Bẫy "Điểm xanh do Thầy ngồi kèm" (Supervised Green) là gì và Mentor cần tránh như thế nào?'
                : 'What is the "Supervised Green Trap" and how should mentors avoid it?',
              shortAns: lang === 'VI'
                ? 'Là tình trạng học sinh đạt điểm xanh khi có thầy đứng cạnh ép làm, nhưng về nhà tự làm thì bài làm sơ sài, đối phó.'
                : 'High scores achieved due to physical mentor presence, which evaporate into superficial work at home.',
              misconception: lang === 'VI'
                ? 'Cứ đứng kè kè gợi ý từng bước cho học sinh chuyển điểm sang màu xanh là hoàn thành tốt nhiệm vụ đứng lớp.'
                : 'Equating continuous physical supervision and hand-holding with successful pedagogical delivery.',
              correctUnderstanding: lang === 'VI'
                ? 'Mentor dùng kỹ thuật Socratic đặt câu hỏi gợi mở, hướng dẫn trẻ công thức tự vấn (Self-questioning) và kiểm tra lại qua bài phản tư 4F độc lập thay vì tạo áp lực vật lý.'
                : 'Use Socratic questioning to internalize self-reflection routines, verified via independent 4F reflection rather than physical proximity pressure.',
              takeaways: [
                lang === 'VI' ? 'Tham chiếu Lỗ hổng 7 trong Báo cáo Kiểm toán' : 'Pedagogical Audit Gap #7',
                lang === 'VI' ? 'Đo lường năng lực qua phản tư 4F độc lập' : 'Measured via autonomous 4F reflection'
              ],
              relatedRoute: '/graduation-plan'
            },

            // GROUP 3: LỘ TRÌNH & ĐIỀU KIỆN TỐT NGHIỆP (Graduation & Progression Rules)
            {
              id: 'faq-7',
              category: 'progression',
              categoryName: lang === 'VI' ? 'Lộ Trình & Tốt Nghiệp' : 'Graduation & Rules',
              question: lang === 'VI'
                ? 'Tại sao không mở tự do 100% tất cả 12 sản phẩm mà mở theo Cụm Năng Lực (Cluster Gateways)?'
                : 'Why use Cluster Gateways instead of unlocking all 12 products at once?',
              shortAns: lang === 'VI'
                ? 'Để ngăn chặn hội chứng làm dở dang (có 10 bài nộp tạm nhưng không bài nào đạt chuẩn) và tình trạng rỗng năng lực.'
                : 'To prevent the "Half-Done Trap" (10 draft products with 0 mastered) and competency starvation.',
              misconception: lang === 'VI'
                ? 'Mở tự do 12 bài để học sinh thích bài nào làm bài đó là tôn trọng cá nhân hóa tối đa.'
                : 'Believing unconstrained choice alone equals good personalized education.',
              correctUnderstanding: lang === 'VI'
                ? 'Mở theo Cụm (Cluster): Học sinh được tự do chọn bài trong Cụm 1 (SP1–4). Khi đạt chuẩn xanh tối thiểu 2 bài và hoàn thành phản tư thì hệ thống tự động mở khóa Cụm 2 (SP5–8).'
                : 'Cluster Gateway: Freedom of choice within Cluster 1 (SP1-4). Unlocking Cluster 2 (SP5-8) requires at least 2 green-verified completed products.',
              takeaways: [
                lang === 'VI' ? 'Tham chiếu Lỗ hổng 11 trong Báo cáo Kiểm toán' : 'Pedagogical Audit Gap #11',
                lang === 'VI' ? 'Cân bằng hoàn hảo giữa Tự do lựa chọn và Chuẩn chất lượng' : 'Balances student agency with rigorous quality control'
              ],
              relatedRoute: '/course-progression'
            },
            {
              id: 'faq-8',
              category: 'progression',
              categoryName: lang === 'VI' ? 'Lộ Trình & Tốt Nghiệp' : 'Graduation & Rules',
              question: lang === 'VI'
                ? 'Tam giác Bằng chứng 70% - 20% - 10% vận hành ra sao trong Kế hoạch Tốt nghiệp?'
                : 'How does the 70% - 20% - 10% Evidence Triangulation work in the Graduation Plan?',
              shortAns: lang === 'VI'
                ? '70% Simba Performance Tasks + 20% Conceptual Understanding Test + 10% Socratic Oral Verification.'
                : '70% Simba Tasks + 20% Conceptual Test + 10% Socratic Oral Verification.',
              misconception: lang === 'VI'
                ? 'Chỉ cần nộp đủ link bài tập trên hệ thống hoặc chỉ cần thi trắc nghiệm lý thuyết là được cấp chứng chỉ.'
                : 'Assuming either product links alone or multiple choice exams alone qualify for graduation.',
              correctUnderstanding: lang === 'VI'
                ? 'Đảm bảo tính xác thực 3 chiều: Sản phẩm thực tế trên hệ thống (70%), hiểu sâu bản chất khái niệm qua bài test tình huống (20%), và vấn đáp trực tiếp cùng Mentor (10%).'
                : 'Ensures 3-dimensional authenticity: Real shipped products (70%), situational concept mastery (20%), and oral defense (10%).',
              takeaways: [
                lang === 'VI' ? 'Quyết định DAR Option 5 đã được phê duyệt' : 'DAR Option 5 Approved Methodology',
                lang === 'VI' ? 'Bảo chứng uy tín học thuật và tính làm chủ độc lập' : 'Guarantees academic integrity and authentic mastery'
              ],
              relatedRoute: '/graduation-plan'
            },
            {
              id: 'faq-9',
              category: 'progression',
              categoryName: lang === 'VI' ? 'Lộ Trình & Tốt Nghiệp' : 'Graduation & Rules',
              question: lang === 'VI'
                ? 'Nếu học sinh bị thiếu bài nộp hoặc điểm Test dưới 80 thì xử lý thế nào trong khung CBE?'
                : 'If a student misses a submission or scores below 80 on the Concept Test, how is it handled in CBE?',
              shortAns: lang === 'VI'
                ? 'Không dùng khái niệm "đánh trượt". Trạng thái được ghi nhận là "In Progress" hoặc "Needs Support" kèm buổi coaching 1-1.'
                : 'No "failing". Status is logged as "In Progress" or "Needs Support" with a dedicated 1:1 coaching session.',
              misconception: lang === 'VI'
                ? 'Học theo năng lực là nếu chưa đủ điểm sẽ bị đánh trượt hoặc trừ điểm thi đua.'
                : 'Thinking CBE uses punitive grading systems like traditional exams.',
              correctUnderstanding: lang === 'VI'
                ? 'Mục tiêu của CBE là tiến bộ liên tục (Continuous Growth). Học sinh được phép làm lại bài phản tư, làm bài Test phiên bản B, hoặc được Mentor coaching 1-1 để bổ khuyết lỗ hổng.'
                : 'CBE emphasizes continuous growth. Students re-reflect, take Form B assessments, or receive 1:1 mentorship to bridge gaps.',
              takeaways: [
                lang === 'VI' ? 'Bộ SOP xử lý dữ liệu 4 bước chuẩn' : 'Standard 4-step Data Integrity SOP',
                lang === 'VI' ? 'Báo cáo Tăng trưởng minh bạch đến từng chỉ báo năng lực' : 'Transparent Student Growth Report per indicator'
              ],
              relatedRoute: '/graduation-plan'
            }
          ];

          const filteredFaq = faqList.filter((item) => {
            if (faqCategoryFilter === 'all') return true;
            return item.category === faqCategoryFilter;
          });

          return (
            <div className="space-y-10">
              {/* Minimalist Hero Header */}
              <div className="text-center max-w-2xl mx-auto space-y-2 py-1">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
                  {lang === 'VI' ? 'Câu Hỏi Thường Gặp' : 'Frequently Asked Questions'}
                </h1>
                <p className="text-stone-500 text-sm sm:text-base leading-relaxed">
                  {lang === 'VI'
                    ? 'Giải đáp các hiểu lầm cốt lõi về Khung năng lực, vận hành sư phạm Mentor và chuẩn đánh giá tốt nghiệp.'
                    : 'Clarifying core misconceptions on Competencies, Mentor Pedagogical Ops, and graduation standards.'}
                </p>
              </div>

              {/* Category Filter Tabs */}
              <div className="flex items-center justify-center">
                <div className="inline-flex flex-wrap p-1.5 bg-stone-100 rounded-2xl border border-stone-200 gap-1">
                  {[
                    { id: 'all', name_vi: 'Tất cả (9)', name_en: 'All (9)' },
                    { id: 'concepts', name_vi: 'Khái niệm (3)', name_en: 'Concepts (3)' },
                    { id: 'pedagogy_ops', name_vi: 'Sư phạm (3)', name_en: 'Pedagogy (3)' },
                    { id: 'progression', name_vi: 'Lộ trình (3)', name_en: 'Graduation (3)' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setFaqCategoryFilter(tab.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                        faqCategoryFilter === tab.id
                          ? 'bg-white text-[#cc4e2d] shadow-sm'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      {lang === 'VI' ? tab.name_vi : tab.name_en}
                    </button>
                  ))}
                </div>
              </div>

              {/* FAQ Accordion List */}
              <div className="max-w-4xl mx-auto space-y-4">
                {filteredFaq.map((faq) => {
                  const isOpen = openFaqId === faq.id;
                  return (
                    <div
                      key={faq.id}
                      className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                        isOpen
                          ? 'bg-white border-stone-400 shadow-sm'
                          : 'bg-white border-stone-200 hover:border-stone-300 shadow-xs'
                      }`}
                    >
                      {/* Question Header */}
                      <button
                        onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                        className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 transition-colors"
                      >
                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[10px] font-mono font-extrabold uppercase px-2 py-0.5 rounded bg-orange-50 text-[#cc4e2d] border border-orange-100">
                              {faq.categoryName}
                            </span>
                          </div>
                          <h3 className="font-bold text-stone-900 text-sm sm:text-base leading-snug">
                            {faq.question}
                          </h3>
                          {!isOpen && (
                            <p className="text-stone-500 text-xs line-clamp-1 mt-1">
                              {faq.shortAns}
                            </p>
                          )}
                        </div>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                          isOpen ? 'bg-orange-100 text-[#cc4e2d] rotate-180' : 'bg-stone-100 text-stone-500'
                        }`}>
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </button>

                      {/* Expanded Content Area */}
                      {isOpen && (
                        <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-stone-100 space-y-5 text-xs sm:text-sm animate-in fade-in-50 duration-200">
                          {/* Quick Summary Pill */}
                          <div className="p-3.5 bg-orange-50/70 rounded-xl border border-orange-200 text-stone-800 leading-relaxed">
                            <strong className="text-[#cc4e2d] font-bold block mb-1">
                              {lang === 'VI' ? 'Tóm Tắt Nhanh:' : 'Quick Summary:'}
                            </strong>
                            {faq.shortAns}
                          </div>

                          {/* Misconception vs Reality Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Misconception */}
                            <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200 space-y-1.5">
                              <div className="flex items-center gap-1.5 text-rose-800 font-bold text-xs uppercase tracking-wider">
                                <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                                <span>{lang === 'VI' ? 'Hiểu Lầm Phổ Biến' : 'Common Misconception'}</span>
                              </div>
                              <p className="text-rose-950 text-xs leading-relaxed">
                                {faq.misconception}
                              </p>
                            </div>

                            {/* Reality / Correct Understanding */}
                            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1.5">
                              <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                <span>{lang === 'VI' ? 'Bản Chất Chuẩn CBE' : 'True CBE Framework'}</span>
                              </div>
                              <p className="text-emerald-950 text-xs leading-relaxed">
                                {faq.correctUnderstanding}
                              </p>
                            </div>
                          </div>

                          {/* Key Takeaways & Action Links */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-stone-100">
                            <div className="space-y-1">
                              <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                                {lang === 'VI' ? 'Quy Chuẩn Liên Quan' : 'Pedagogical Rules'}
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {faq.takeaways.map((tk, i) => (
                                  <span key={i} className="inline-flex items-center gap-1 text-xs text-stone-600 bg-stone-100 px-2 py-1 rounded-md">
                                    <Sparkles className="w-3 h-3 text-orange-500" />
                                    {tk}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {faq.relatedRoute && (
                              <button
                                onClick={() => navigate(faq.relatedRoute)}
                                className="px-3.5 py-2 bg-stone-900 hover:bg-[#cc4e2d] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors shrink-0 shadow-xs"
                              >
                                <span>{lang === 'VI' ? 'Xem Chuẩn Năng Lực' : 'View Standards'}</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}
      </main>

      {/* ================= MODAL 1: CONCEPT DEFINITIONS ================= */}
      {selectedConcept && conceptDefinitions[selectedConcept] && (
        <div
          onClick={() => setSelectedConcept(null)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="modal-animate bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200"
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-orange-100 text-[#cc4e2d]">
                  {conceptDefinitions[selectedConcept].badge}
                </span>
                <h3 className="font-bold text-stone-900 text-base">
                  {conceptDefinitions[selectedConcept].title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedConcept(null)}
                className="text-stone-400 hover:text-stone-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs sm:text-sm">
              <div>
                <div className="text-stone-400 font-bold uppercase tracking-wider text-[11px] mb-1">
                  {lang === 'VI' ? 'Định nghĩa chuẩn trong hệ thống' : 'System Definition'}
                </div>
                <p className="text-stone-700 leading-relaxed">
                  {conceptDefinitions[selectedConcept].def}
                </p>
              </div>

              <div className="p-3.5 bg-orange-50/60 rounded-xl border border-orange-100">
                <div className="text-[#cc4e2d] font-bold uppercase tracking-wider text-[11px] mb-1">
                  {lang === 'VI' ? 'Ví dụ minh họa cụ thể' : 'Concrete Example'}
                </div>
                <p className="text-stone-800 leading-relaxed">
                  {conceptDefinitions[selectedConcept].example}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 flex justify-end">
              <button
                onClick={() => setSelectedConcept(null)}
                className="px-4 py-2 bg-[#111111] text-white text-xs font-bold rounded-xl hover:bg-stone-800"
              >
                {lang === 'VI' ? 'Đã hiểu' : 'Got it'}
              </button>
            </div>
          </div>
        </div>
      )}





      {/* ================= MODAL: PROMPT AI MẪU ================= */}
      {selectedPromptSkill && (
        <div
          onClick={() => setSelectedPromptSkill(null)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="modal-animate bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-orange-100 text-[#cc4e2d]">
                  PROMPT MẪU CHO TEEN
                </span>
                <h3 className="font-bold text-stone-900 text-sm sm:text-base">
                  Rèn luyện: {selectedPromptSkill.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedPromptSkill(null)}
                className="text-stone-400 hover:text-stone-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-stone-600">
                Sao chép đoạn Prompt chuẩn cấu trúc (Role - Context - Task - Constraint) dưới đây và dán vào <strong>Antigravity</strong> hoặc <strong>ChatGPT/Gemini</strong> để AI đóng vai gia sư hướng dẫn bạn rèn luyện kỹ năng này:
              </p>

              <div className="p-4 bg-stone-900 text-stone-100 rounded-xl font-mono text-xs leading-relaxed relative">
                <p className="text-orange-300 font-bold mb-2">// Prompt Huấn Luyện Kỹ Năng Sư Tử Con:</p>
                <p className="text-emerald-300">
                  "Hãy đóng vai là Huấn Luyện Viên AI Simba. Tôi là học sinh cấp 2 đang xây dựng sản phẩm web cho dự án của mình. Hãy hướng dẫn tôi từng bước thực hành kỹ năng: '{selectedPromptSkill.name}'. Đừng cho tôi đáp án ngay, hãy đặt câu hỏi gợi mở từng bước để tôi tự tư duy và phản hồi!"
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
              <button
                onClick={() => {
                  const promptText = `Hãy đóng vai là Huấn Luyện Viên AI Simba. Tôi là học sinh cấp 2 đang xây dựng sản phẩm web cho dự án của mình. Hãy hướng dẫn tôi từng bước thực hành kỹ năng: '${selectedPromptSkill.name}'. Đừng cho tôi đáp án ngay, hãy đặt câu hỏi gợi mở từng bước để tôi tự tư duy và phản hồi!`;
                  copyToClipboard(promptText, 'prompt-modal');
                }}
                className="px-4 py-2 bg-[#cc4e2d] text-white text-xs font-bold rounded-xl hover:bg-orange-700 flex items-center gap-1.5 shadow-sm"
              >
                {copiedId === 'prompt-modal' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copiedId === 'prompt-modal' ? 'Đã sao chép prompt!' : 'Sao chép Prompt'}
              </button>
              <button
                onClick={() => setSelectedPromptSkill(null)}
                className="px-4 py-2 bg-stone-100 text-stone-700 text-xs font-bold rounded-xl hover:bg-stone-200"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL 3: GLOBAL FRAMEWORK DETAILS ================= */}
      {selectedFramework && (
        <div
          onClick={() => setSelectedFramework(null)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="modal-animate bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200"
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded text-xs font-extrabold uppercase bg-emerald-100 text-emerald-800">
                  {selectedFramework.name}
                </span>
                <h3 className="font-bold text-stone-900 text-base">{selectedFramework.fullname}</h3>
              </div>
              <button
                onClick={() => setSelectedFramework(null)}
                className="text-stone-400 hover:text-stone-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs sm:text-sm">
              <div>
                <div className="text-stone-400 font-bold uppercase tracking-wider text-[11px] mb-1">
                  {lang === 'VI' ? 'Xuất xứ & Phạm vi ứng dụng' : 'Origin & Scope'}
                </div>
                <p className="text-stone-700">{selectedFramework.origin} • {selectedFramework.scope}</p>
              </div>

              <div>
                <div className="text-stone-400 font-bold uppercase tracking-wider text-[11px] mb-1">
                  {lang === 'VI' ? 'Trọng tâm đánh giá' : 'Key Focus'}
                </div>
                <p className="text-stone-700 leading-relaxed">{selectedFramework.focus}</p>
              </div>

              <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200">
                <div className="text-emerald-800 font-bold uppercase tracking-wider text-[11px] mb-1">
                  {lang === 'VI' ? 'Cách CCS tích hợp và kế thừa' : 'CCS Integration & Mapping'}
                </div>
                <p className="text-stone-800 leading-relaxed">{selectedFramework.mapping}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 flex justify-end">
              <button
                onClick={() => setSelectedFramework(null)}
                className="px-4 py-2 bg-[#111111] text-white text-xs font-bold rounded-xl hover:bg-stone-800"
              >
                {lang === 'VI' ? 'Đóng' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Target Level Updated Notification Toast */}
      {targetToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900/95 text-white px-4 py-3 rounded-2xl shadow-2xl border border-stone-800 flex items-center gap-3 backdrop-blur-md animate-in slide-in-from-bottom-5 duration-300">
          <div className="w-8 h-8 rounded-xl bg-[#cc4e2d] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-black text-white flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{lang === 'VI' ? 'Đã cập nhật Target Level!' : 'Target Level Updated!'}</span>
            </div>
            <div className="text-[11px] text-stone-300 mt-0.5 max-w-xs truncate">
              {targetToast.skillTitle} → <span className="text-orange-400 font-bold font-mono">Level {targetToast.level}</span>
            </div>
          </div>
          <button
            onClick={() => setTargetToast(null)}
            className="p-1 hover:bg-stone-800 rounded-lg text-stone-400 hover:text-white ml-2 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-stone-50 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center sm:justify-between gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-[#111111] flex items-center justify-center text-white font-black text-[10px]">
              C<span className="text-[#cc4e2d]">1</span>
            </div>
            <span>Conan Competency System — Cloned & Fully Integrated</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
