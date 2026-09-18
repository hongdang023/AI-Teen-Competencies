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
import { getEnrichedSkillData, getSkillExamplesAndMisconceptions } from './data/pedagogicalKnowledge';

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
      className="relative group inline-flex items-center select-none group-hover:z-50"
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
      <div className="absolute left-0 top-full pt-1.5 z-50 hidden group-hover:block group-focus-within:block w-80 sm:w-96 max-w-[calc(100vw-2rem)] drop-shadow-2xl text-left pointer-events-auto">
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

// Dedicated AI Teen Metadata & Building 21 CBE 5-Level Continuum Indicators Matrix (Pedagogical Engine)
function getAiTeenSkillData(skillName = '', compName = '', coreCode = '', lang = 'VI', skillCode = '', skillObj = null, domainSlug = '') {
  return getEnrichedSkillData(skillName, compName, coreCode, lang, skillCode, skillObj, domainSlug);
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
  const [openCourseDomains, setOpenCourseDomains] = useState({ 'domain-generative-ai': true });
  const [isCourseProductsOpen, setIsCourseProductsOpen] = useState(false);
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
                    className="border border-stone-200 rounded-2xl bg-white shadow-sm transition-all"
                  >
                    {/* Area Accordion Header */}
                    <div
                      onClick={() => toggleArea(area.id)}
                      className={`p-5 sm:p-6 bg-stone-50/80 hover:bg-stone-50 cursor-pointer select-none flex items-center justify-between rounded-t-2xl ${
                        !isAreaOpen ? 'rounded-b-2xl' : 'border-b border-stone-200/60'
                      }`}
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
                              className="border border-stone-200 rounded-xl bg-white shadow-sm"
                            >
                              {/* Competency Header */}
                              <div
                                onClick={() => toggleCompetency(competency.id)}
                                className={`p-4 sm:p-5 flex items-center justify-between cursor-pointer select-none transition-colors rounded-t-xl ${
                                  isCompOpen ? 'bg-orange-50/20 border-b border-stone-200' : 'hover:bg-stone-50/60 rounded-b-xl'
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
                                                className="border border-stone-200 rounded-xl bg-white shadow-sm"
                                              >
                                                {/* Skill Header */}
                                                <div
                                                  onClick={() => toggleSkill(skill.id)}
                                                  className={`p-4 bg-stone-50/70 flex items-center justify-between cursor-pointer select-none rounded-t-xl ${
                                                    !isSkillOpen ? 'rounded-b-xl' : 'border-b border-stone-200/80'
                                                  }`}
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
              {/* Course Meta Data & 12 Products Evolution per Course */}
              {(() => {
                const aiTeenDomainSlugs = [
                  'domain-generative-ai',
                  'domain-customer-understanding',
                  'domain-digital-product-development',
                  'domain-learning'
                ];

                const courseConfigs = [
                  {
                    id: 0,
                    num: lang === 'VI' ? 'Khóa 1' : 'Course 1',
                    spike: 'GenAI Spike (L1.0 → L1.2)',
                    shortSpike: 'L1.2',
                    versionLabel: 'V1',
                    icon: Sparkles,
                    targetGenAiLevel: 1,
                    genAiCompCodes: ['1.1', '1.2', '1.3'],
                    cuCompCodes: ['1.1'],
                    dpdCompCodes: ['3.2'],
                    lrnCompCodes: ['1.1', '2.2'],
                    briefFocus: lang === 'VI'
                      ? 'Khởi tạo 12/12 sản phẩm ở phiên bản V1 thô nhưng đủ tính năng cơ bản; 100% link web live chạy được trên Vercel/Netlify.'
                      : 'Build all 12 products to raw V1 with full basic functionality; 100% live web links deployed.',
                    products: [
                      { code: 'SP1', name: 'Personal Page', delta: lang === 'VI' ? 'Tạo trang web cá nhân tĩnh bản đầu & Deploy live' : 'Static personal landing site & live deployment', activeSkill: 'DPD: Deploy Web' },
                      { code: 'SP2', name: 'Hobby Showcase', delta: lang === 'VI' ? 'Tạo sitemap 3-5 trang chủ đề sở thích' : '3-5 page hobby sitemap layout', activeSkill: 'DPD: Sitemap & Layout' },
                      { code: 'SP3', name: 'Family Tree', delta: lang === 'VI' ? 'Khởi tạo cây gia phả 2 thế hệ cơ bản' : 'Basic 2-generation family tree layout', activeSkill: 'CU: User Empathy' },
                      { code: 'SP4', name: 'Prompt Cookbook', delta: lang === 'VI' ? 'Đóng gói 3 prompt mẫu cơ bản đầu tiên' : 'Package 3 basic foundational prompt templates', activeSkill: 'GenAI: Clear Prompting' },
                      { code: 'SP5', name: 'Custom Domain', delta: lang === 'VI' ? 'Trỏ DNS domain cơ bản qua Cloudflare' : 'Basic DNS domain mapping on Cloudflare', activeSkill: 'DPD: Domain Config' },
                      { code: 'SP6', name: 'Knowledge Hub', delta: lang === 'VI' ? 'Tạo tài liệu học tập đầu tiên với NotebookLM' : 'Initial NotebookLM study notebook setup', activeSkill: 'LRN: Source Synthesis' },
                      { code: 'SP7', name: 'Learning Hub', delta: lang === 'VI' ? 'Bộ 10 Flashcard học tập chủ đề yêu thích' : '10 Flashcards deck for favorite topic', activeSkill: 'DPD: Interactive Logic' },
                      { code: 'SP8', name: 'Exam Prep', delta: lang === 'VI' ? 'Đồng hồ đếm ngược Pomodoro cơ bản' : 'Basic Pomodoro focus countdown timer', activeSkill: 'DPD: State Management' },
                      { code: 'SP9', name: 'Growth Portrait', delta: lang === 'VI' ? 'Trang hồ sơ ghi nhận 3 thành tựu đầu tiên' : 'Profile page logging first 3 milestones', activeSkill: 'LRN: Self Reflection' },
                      { code: 'SP10', name: 'AI Tutor Bot', delta: lang === 'VI' ? 'Prompt khởi tạo chatbot hỏi đáp bài tập' : 'Prompt setup for single-turn study Q&A bot', activeSkill: 'GenAI: Next-token' },
                      { code: 'SP11', name: 'Learning Game', delta: lang === 'VI' ? 'Game trắc nghiệm 5 câu hỏi có tính điểm' : '5-question scoring quiz game layout', activeSkill: 'DPD: Gamification' },
                      { code: 'SP12', name: 'Master Portfolio', delta: lang === 'VI' ? 'Trang tổng hợp chứa link live 11 sản phẩm' : 'Hub page linking 11 live web product URLs', activeSkill: 'DPD: Portfolio Hub' }
                    ]
                  },
                  {
                    id: 1,
                    num: lang === 'VI' ? 'Khóa 2' : 'Course 2',
                    spike: 'GenAI Spike (L1.2 → L1.5)',
                    shortSpike: 'L1.5',
                    versionLabel: 'V2',
                    icon: Users,
                    targetGenAiLevel: 2,
                    genAiCompCodes: ['2.1', '2.3'],
                    cuCompCodes: ['1.3'],
                    dpdCompCodes: ['2.2'],
                    lrnCompCodes: ['1.3'],
                    briefFocus: lang === 'VI'
                      ? 'Nâng cấp 12/12 sản phẩm lên V2 với cấu trúc câu lệnh chuẩn Role-Context-Task-Constraint (R-T-C) và dữ liệu chuẩn mực.'
                      : 'Upgrade 12/12 products to V2 with standardized R-T-C prompting framework and consistent data schema.',
                    products: [
                      { code: 'SP1', name: 'Personal Page', delta: lang === 'VI' ? 'Thiết kế bố cục chuẩn UX & tối ưu thông điệp giá trị cá nhân' : 'UX layout refinement & personal value proposition', activeSkill: 'DPD: UX Design' },
                      { code: 'SP2', name: 'Hobby Showcase', delta: lang === 'VI' ? 'Phân cấp nội dung chi tiết & gắn hình ảnh chất lượng cao' : 'Clear content hierarchy & high-res assets', activeSkill: 'DPD: Information Hierarchy' },
                      { code: 'SP3', name: 'Family Tree', delta: lang === 'VI' ? 'Phỏng vấn người thân 1-1 & cấu trúc gia phả nhiều nhánh' : '1-1 family interviews & multi-branch tree', activeSkill: 'CU: User Interview' },
                      { code: 'SP4', name: 'Prompt Cookbook', delta: lang === 'VI' ? 'Hoàn thiện 5 bộ prompt chuẩn khung R-T-C có ràng buộc' : '5 standardized R-T-C prompt recipes with constraints', activeSkill: 'GenAI: R-T-C Prompting' },
                      { code: 'SP5', name: 'Custom Domain', delta: lang === 'VI' ? 'Cấu hình SSL bảo mật HTTPS & tối ưu tốc độ tải trang' : 'HTTPS SSL security & page load optimization', activeSkill: 'DPD: Web Security' },
                      { code: 'SP6', name: 'Knowledge Hub', delta: lang === 'VI' ? 'Tổng hợp tri thức từ 3 nguồn sách/bài báo có trích dẫn' : 'Synthesize knowledge from 3 cited sources', activeSkill: 'LRN: Knowledge Packaging' },
                      { code: 'SP7', name: 'Learning Hub', delta: lang === 'VI' ? 'Phân loại Flashcard theo chủ đề & thuật toán lặp ngắt quãng' : 'Categorized decks & spaced repetition flow', activeSkill: 'LRN: Deliberate Practice' },
                      { code: 'SP8', name: 'Exam Prep', delta: lang === 'VI' ? 'Tùy chỉnh thời gian Pomodoro & lưu lịch sử phiên học' : 'Custom interval timers & study session history', activeSkill: 'DPD: Data Persistence' },
                      { code: 'SP9', name: 'Growth Portrait', delta: lang === 'VI' ? 'Gắn minh chứng số và biểu đồ tự đánh giá năng lực' : 'Digital artifact badges & growth charts', activeSkill: 'LRN: Self Assessment' },
                      { code: 'SP10', name: 'AI Tutor Bot', delta: lang === 'VI' ? 'Thiết lập Persona chuyên gia và kịch bản hỏi đáp có ngữ cảnh' : 'Expert persona & context-aware answering rules', activeSkill: 'GenAI: Persona Prompting' },
                      { code: 'SP11', name: 'Learning Game', delta: lang === 'VI' ? 'Thêm cốt truyện dẫn dắt & hiệu ứng phản hồi âm thanh/hình ảnh' : 'Engaging storyline & audio/visual feedback', activeSkill: 'CU: User Motivation' },
                      { code: 'SP12', name: 'Master Portfolio', delta: lang === 'VI' ? 'Giao diện chuyên nghiệp, gắn mô tả bài toán và công nghệ dùng' : 'Refined UI with project problem statements & tech tags', activeSkill: 'DPD: Portfolio Layout' }
                    ]
                  },
                  {
                    id: 2,
                    num: lang === 'VI' ? 'Khóa 3' : 'Course 3',
                    spike: 'GenAI Spike (L1.5 → L1.8)',
                    shortSpike: 'L1.8',
                    versionLabel: 'V3',
                    icon: Target,
                    targetGenAiLevel: 2,
                    genAiCompCodes: ['1.1', '3.2'],
                    cuCompCodes: ['4.1'],
                    dpdCompCodes: ['3.3'],
                    lrnCompCodes: ['1.2'],
                    briefFocus: lang === 'VI'
                      ? 'Nâng cấp 12/12 sản phẩm lên V3 sạch 100% lỗi ảo giác thông tin (Hallucination); Logic tương tác hoạt động chính xác.'
                      : 'Upgrade 12/12 products to V3 with zero hallucinated info; verified interactive logic.',
                    products: [
                      { code: 'SP1', name: 'Personal Page', delta: lang === 'VI' ? 'Kiểm chứng chéo thông tin & gắn liên kết dự án thực tế' : 'Fact-check all claims & link authentic projects', activeSkill: 'GenAI: Fact-checking' },
                      { code: 'SP2', name: 'Hobby Showcase', delta: lang === 'VI' ? 'Tích hợp bộ lọc tìm kiếm & xác thực dữ liệu nguồn' : 'Search filters & verified source citations', activeSkill: 'DPD: Data Filtering' },
                      { code: 'SP3', name: 'Family Tree', delta: lang === 'VI' ? 'Xác thực độ chính xác ngày tháng và câu chuyện lịch sử gia đình' : 'Validate dates and historical family stories', activeSkill: 'CU: Trust Building' },
                      { code: 'SP4', name: 'Prompt Cookbook', delta: lang === 'VI' ? 'Bộ prompt bắt lỗi ảo giác & prompt kiểm chứng chéo' : 'Stress-test prompt suite & anti-hallucination rules', activeSkill: 'GenAI: Hallucination Detection' },
                      { code: 'SP5', name: 'Custom Domain', delta: lang === 'VI' ? 'Cấu hình chuyển hướng subdomain & kiểm thử an toàn mạng' : 'Subdomain routing & network security testing', activeSkill: 'DPD: Deployment Testing' },
                      { code: 'SP6', name: 'Knowledge Hub', delta: lang === 'VI' ? 'Bộ tài liệu tri thức 100% trích dẫn nguồn xác thực' : 'Authoritative knowledge base with full citations', activeSkill: 'LRN: Fact Validation' },
                      { code: 'SP7', name: 'Learning Hub', delta: lang === 'VI' ? 'Bộ câu hỏi kiểm tra kiến thức đã qua xác thực 100%' : '100% fact-validated quiz and flashcard suites', activeSkill: 'GenAI: Fact-checking' },
                      { code: 'SP8', name: 'Exam Prep', delta: lang === 'VI' ? 'Cơ chế phát hiện gian lận thời gian & thống kê tập trung' : 'Anti-cheat focus tracking & deep-work metrics', activeSkill: 'DPD: Edge Case Handling' },
                      { code: 'SP9', name: 'Growth Portrait', delta: lang === 'VI' ? 'Hồ sơ năng lực có số liệu đo lường thực tế, không nói suông' : 'Evidence-backed growth portrait with real metrics', activeSkill: 'LRN: Evidence Synthesis' },
                      { code: 'SP10', name: 'AI Tutor Bot', delta: lang === 'VI' ? 'Ép AI chỉ trả lời từ tài liệu nạp vào, không bịa đáp án' : 'Strict grounding constraint enforcing zero guesswork', activeSkill: 'GenAI: Negative Constraints' },
                      { code: 'SP11', name: 'Learning Game', delta: lang === 'VI' ? 'Kiểm thử toàn diện lỗi logic tính điểm và câu hỏi sai lệch' : 'Rigorous scoring logic & question accuracy testing', activeSkill: 'DPD: QA Testing' },
                      { code: 'SP12', name: 'Master Portfolio', delta: lang === 'VI' ? 'Gắn thông cáo minh bạch (Transparency Disclaimer) về AI' : 'AI transparency disclosure & ethical declarations', activeSkill: 'GenAI: AI Ethics' }
                    ]
                  },
                  {
                    id: 3,
                    num: lang === 'VI' ? 'Khóa 4' : 'Course 4',
                    spike: 'GenAI Spike (L1.8 → L2.0 Target)',
                    shortSpike: 'L2.0',
                    versionLabel: 'V4',
                    icon: MessageSquare,
                    targetGenAiLevel: 2,
                    genAiCompCodes: ['2.1', '3.3'],
                    cuCompCodes: ['2.1'],
                    dpdCompCodes: ['2.3'],
                    lrnCompCodes: ['3.2'],
                    briefFocus: lang === 'VI'
                      ? 'Nâng cấp 12/12 sản phẩm lên V4 có tính năng tương tác hội thoại hoặc phản hồi thời gian thực; SP10 AI Tutor hoạt động xuất sắc.'
                      : 'Upgrade 12/12 products to V4 with real-time multi-turn conversation; SP10 AI Tutor fully active.',
                    products: [
                      { code: 'SP1', name: 'Personal Page', delta: lang === 'VI' ? 'Tích hợp Mini AI Assistant trả lời câu hỏi của khách ghé thăm' : 'Integrated Mini AI Assistant for visitor inquiries', activeSkill: 'GenAI: Conversational Bot' },
                      { code: 'SP2', name: 'Hobby Showcase', delta: lang === 'VI' ? 'Gợi ý nội dung tương tác động theo sở thích người xem' : 'Dynamic hobby recommendations based on user tags', activeSkill: 'CU: Persona Matching' },
                      { code: 'SP3', name: 'Family Tree', delta: lang === 'VI' ? 'Trợ lý AI kể chuyện gia đình tương tác theo từng nhân vật' : 'Interactive story generator for family ancestors', activeSkill: 'GenAI: Multi-turn Context' },
                      { code: 'SP4', name: 'Prompt Cookbook', delta: lang === 'VI' ? 'Thư viện Prompt Socratic đa tầng gợi mở tư duy cho học sinh' : 'Multi-turn Socratic pedagogical prompt library', activeSkill: 'GenAI: Socratic Prompting' },
                      { code: 'SP5', name: 'Custom Domain', delta: lang === 'VI' ? 'Tự động hóa triển khai CI/CD qua GitHub Actions' : 'Automated CI/CD deployment via GitHub Actions', activeSkill: 'DPD: DevOps Automation' },
                      { code: 'SP6', name: 'Knowledge Hub', delta: lang === 'VI' ? 'Podcast âm thanh tóm tắt tri thức tự động từ AI' : 'Automated audio overview & podcast briefing', activeSkill: 'GenAI: Multimodal AI' },
                      { code: 'SP7', name: 'Learning Hub', delta: lang === 'VI' ? 'Gia sư AI gợi ý câu hỏi thích ứng theo trình độ người học' : 'Adaptive AI quiz difficulty scaling', activeSkill: 'LRN: Adaptive Learning' },
                      { code: 'SP8', name: 'Exam Prep', delta: lang === 'VI' ? 'AI phân tích biểu đồ tập trung & đưa ra lời khuyên cá nhân hóa' : 'AI study habits analysis & personalized coaching', activeSkill: 'CU: Pain-point Solving' },
                      { code: 'SP9', name: 'Growth Portrait', delta: lang === 'VI' ? 'Báo cáo năng lực đa chiều tự động tổng hợp qua 4 khóa' : 'Automated multi-dimensional growth progress report', activeSkill: 'LRN: Metacognition' },
                      { code: 'SP10', name: 'AI Tutor Bot', delta: lang === 'VI' ? 'Chatbot gia sư Socratic gợi mở tư duy đa lượt, không giải hộ' : 'Multi-turn Socratic pedagogical tutor bot', activeSkill: 'GenAI: System Prompt & Socratic' },
                      { code: 'SP11', name: 'Learning Game', delta: lang === 'VI' ? 'NPC điều khiển bằng AI tương tác và đưa ra thử thách linh hoạt' : 'AI-driven NPC dialogues & dynamic branching quests', activeSkill: 'DPD: Game Architecture' },
                      { code: 'SP12', name: 'Master Portfolio', delta: lang === 'VI' ? 'Bảng điều khiển tương tác showcase toàn bộ 11 sản phẩm V4' : 'Interactive master dashboard showcasing all 11 V4 apps', activeSkill: 'DPD: Integration Hub' }
                    ]
                  },
                  {
                    id: 4,
                    num: lang === 'VI' ? 'Khóa 5' : 'Course 5',
                    spike: 'GenAI Spike (Level 2.0+ Mastery & Capstone)',
                    shortSpike: 'L2.0+',
                    versionLabel: 'V5',
                    icon: BookOpen,
                    targetGenAiLevel: 2,
                    genAiCompCodes: ['3.2', '3.3', '1.2'],
                    cuCompCodes: ['3.3'],
                    dpdCompCodes: ['4.1'],
                    lrnCompCodes: ['2.3'],
                    briefFocus: lang === 'VI'
                      ? 'Toàn bộ 12/12 sản phẩm đạt phiên bản V5 đỉnh cao, liên kết thành Master Portfolio Hub (SP12 V5) sẵn sàng bảo vệ Show & Tell.'
                      : 'All 12/12 products reach V5 perfection, integrated into Master Portfolio Hub (SP12 V5) for Show & Tell defense.',
                    products: [
                      { code: 'SP1', name: 'Personal Page', delta: lang === 'VI' ? 'Hoàn thiện 100% nhận diện cá nhân số & gắn domain thương hiệu' : '100% polished personal branding & custom domain', activeSkill: 'DPD: Production Launch' },
                      { code: 'SP2', name: 'Hobby Showcase', delta: lang === 'VI' ? 'Trang web sở thích hoàn chỉnh có tương tác cộng đồng' : 'Polished community hobby platform with social sharing', activeSkill: 'DPD: Polish & Deploy' },
                      { code: 'SP3', name: 'Family Tree', delta: lang === 'VI' ? 'Bảo tồn di sản gia đình hoàn chỉnh sẵn sàng tặng người thân' : 'Archived family digital heritage gift site', activeSkill: 'CU: Empathy & Value' },
                      { code: 'SP4', name: 'Prompt Cookbook', delta: lang === 'VI' ? 'Sách cẩm nang Prompt cá nhân xuất bản online làm tài liệu chia sẻ' : 'Published online Prompt Cookbook sharing with peers', activeSkill: 'LRN: Knowledge Transfer' },
                      { code: 'SP5', name: 'Custom Domain', delta: lang === 'VI' ? 'Hệ thống tên miền và DNS vận hành ổn định 99.9%' : 'Robust 99.9% uptime custom DNS architecture', activeSkill: 'DPD: Infrastructure' },
                      { code: 'SP6', name: 'Knowledge Hub', delta: lang === 'VI' ? 'Thư viện tri thức chuyên sâu sẵn sàng phục vụ học tập lâu dài' : 'Comprehensive lifelong learning knowledge repository', activeSkill: 'LRN: Lifelong Learning' },
                      { code: 'SP7', name: 'Learning Hub', delta: lang === 'VI' ? 'Ứng dụng ôn tập số 1 cho kỳ thi thực tế của học sinh' : 'Production-ready exam study app used in daily life', activeSkill: 'DPD: Product Impact' },
                      { code: 'SP8', name: 'Exam Prep', delta: lang === 'VI' ? 'Ứng dụng quản trị thời gian độc lập tối ưu hiệu suất' : 'Autonomous productivity & time management tool', activeSkill: 'LRN: Self Regulation' },
                      { code: 'SP9', name: 'Growth Portrait', delta: lang === 'VI' ? 'Hồ sơ năng lực số toàn diện chứng nhận chuẩn Level 2' : 'Comprehensive Level 2 digital growth credential', activeSkill: 'LRN: Growth Narrative' },
                      { code: 'SP10', name: 'AI Tutor Bot', delta: lang === 'VI' ? 'Gia sư AI hoàn thiện sẵn sàng đồng hành học tập cả năm' : 'Production Socratic AI tutor ready for daily use', activeSkill: 'GenAI: Autonomous Builder' },
                      { code: 'SP11', name: 'Learning Game', delta: lang === 'VI' ? 'Game giáo dục số hoàn chỉnh có thể chia sẻ cho bạn bè chơi' : 'Published educational game shared with classmates', activeSkill: 'DPD: User Experience' },
                      { code: 'SP12', name: 'Master Portfolio', delta: lang === 'VI' ? 'Master Portfolio Hub tích hợp 12 sản phẩm V5 & bảo vệ Show & Tell' : 'Integrated 12-Product V5 Hub & Show & Tell Pitching', activeSkill: 'DPD: Capstone Showcase' }
                    ]
                  }
                ];

                const currentConfig = courseConfigs[selectedCourseIdx] || courseConfigs[0];

                // Dynamically collect and filter domain competencies for the active course
                const activeDomainsData = aiTeenDomainSlugs.map((slug) => {
                  const domainObj = competencyData.find((d) => d.slug === slug);
                  if (!domainObj) return null;

                  const isGenAi = slug === 'domain-generative-ai';
                  const defaultDomainRole = isGenAi ? 'primary' : 'supporting';
                  const defaultCoreCode = isGenAi ? 'GenAI' : slug === 'domain-customer-understanding' ? 'CU' : slug === 'domain-digital-product-development' ? 'DPD' : 'LRN';
                  const compCodesFilter = isGenAi ? currentConfig.genAiCompCodes
                    : slug === 'domain-customer-understanding' ? currentConfig.cuCompCodes
                    : slug === 'domain-digital-product-development' ? currentConfig.dpdCompCodes
                    : currentConfig.lrnCompCodes;

                  // Filter areas and competencies containing active skills
                  const filteredAreas = (domainObj.competency_areas || []).map((area) => {
                    const filteredComps = (area.competencies || []).map((comp) => {
                      const compTitle = comp.name_vi || comp.name || '';
                      const compMatches = compCodesFilter?.some((code) => compTitle.includes(' ' + code + ':') || compTitle.includes('Competency ' + code));

                      // Correctly access topLevelSkills from competency_skills
                      const parentSkills = (comp.competency_skills || []).filter((s) => !s.parent_id);
                      const topLevelSkills = parentSkills.length > 0 ? parentSkills : (comp.competency_skills || []);

                      const filteredSkills = topLevelSkills.map((skill) => {
                        const skillKey = skill.id || skill.code || skill.name;
                        const teenData = getAiTeenSkillData(skill.name, comp.name, defaultCoreCode, lang, skill.id, skill, slug);
                        
                        // Effective role considering user overrides in customSkillRoles
                        const effectiveRole = customSkillRoles[skillKey] || teenData.skillRole || defaultDomainRole;

                        // Filter out out-of-scope skills
                        if (effectiveRole === 'out_of_scope') return null;

                        // Check if skill belongs to focused competency or explicitly enabled by user
                        let isSkillInThisCourse = compMatches;
                        if (customSkillRoles[skillKey] === 'primary' || customSkillRoles[skillKey] === 'supporting') {
                          isSkillInThisCourse = true;
                        }

                        if (!isSkillInThisCourse) return null;

                        // Determine target level for this course
                        const targetLevel = effectiveRole === 'primary' ? (selectedCourseIdx === 0 ? 1 : 2) : 1;

                        // Extract target indicators for this course
                        let targetIndicators = [];
                        const targetLevelObj = teenData.rubricLevels?.find((l) => l.level === targetLevel);
                        if (targetLevelObj && targetLevelObj.indicators && targetLevelObj.indicators.length > 0) {
                          targetIndicators = targetLevelObj.indicators;
                        } else {
                          targetIndicators = lang === 'VI' ? [
                            `Con có thể áp dụng thành thạo kỹ năng ${teenData.name_vi || skill.name_vi || skill.name} ở cấp độ chuẩn.`,
                            `Con có thể kiểm chứng và phản tư kết quả thực hành cùng Mentor.`
                          ] : [
                            `I can apply ${teenData.name_en || skill.name} with consistent quality.`,
                            `I can cross-verify outputs and reflect on results with Mentors.`
                          ];
                        }

                        return {
                          ...skill,
                          teenData,
                          effectiveRole,
                          targetLevel,
                          targetIndicators
                        };
                      }).filter(Boolean);

                      return filteredSkills.length > 0 ? { ...comp, filteredSkills } : null;
                    }).filter(Boolean);

                    return filteredComps.length > 0 ? { ...area, filteredComps } : null;
                  }).filter(Boolean);

                  const totalActiveSkills = filteredAreas.reduce((acc, a) => acc + a.filteredComps.reduce((cAcc, c) => cAcc + c.filteredSkills.length, 0), 0);
                  const totalIndicators = filteredAreas.reduce((acc, a) => acc + a.filteredComps.reduce((cAcc, c) => cAcc + c.filteredSkills.reduce((sAcc, s) => sAcc + s.targetIndicators.length, 0), 0), 0);

                  return {
                    ...domainObj,
                    defaultDomainRole,
                    defaultCoreCode,
                    filteredAreas,
                    totalActiveSkills,
                    totalIndicators
                  };
                }).filter((d) => d && d.totalActiveSkills > 0);

                // Calculate total course indicators and deliberate practice time
                let totalPrimaryIndicators = 0;
                let totalSupportingIndicators = 0;

                activeDomainsData.forEach((d) => {
                  d.filteredAreas.forEach((a) => {
                    a.filteredComps.forEach((c) => {
                      c.filteredSkills.forEach((s) => {
                        if (s.effectiveRole === 'primary') {
                          totalPrimaryIndicators += s.targetIndicators.length;
                        } else {
                          totalSupportingIndicators += s.targetIndicators.length;
                        }
                      });
                    });
                  });
                });

                const totalCourseIndicators = totalPrimaryIndicators + totalSupportingIndicators;
                const minPracticeHours = (totalCourseIndicators * 2.0).toFixed(0);
                const maxPracticeHours = (totalCourseIndicators * 2.5).toFixed(0);
                const avgPracticeHours = (totalCourseIndicators * 2.25).toFixed(1);
                const standardBudgetHours = 40;
                const budgetPercent = Math.round((avgPracticeHours / standardBudgetHours) * 100);

                let budgetHealthColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
                let budgetHealthLabel = lang === 'VI' ? 'Cân Bằng Tối Ưu' : 'Optimal Balance';
                if (budgetPercent > 125) {
                  budgetHealthColor = 'text-amber-700 bg-amber-50 border-amber-200';
                  budgetHealthLabel = lang === 'VI' ? 'Tải Cao' : 'High Load';
                } else if (budgetPercent < 75) {
                  budgetHealthColor = 'text-sky-700 bg-sky-50 border-sky-200';
                  budgetHealthLabel = lang === 'VI' ? 'Nhẹ Nhàng' : 'Light Load';
                }

                return (
                  <div className="space-y-8">
                    {/* 5 Course Selection Stepper Tabs — Ultra Clean */}
                    <div className="flex flex-wrap items-center gap-2">
                      {courseConfigs.map((c) => {
                        const isSelected = selectedCourseIdx === c.id;
                        return (
                          <button
                            key={c.id}
                            onClick={() => setSelectedCourseIdx(c.id)}
                            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-stone-900 text-white shadow-sm'
                                : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-400 hover:text-stone-900'
                            }`}
                          >
                            {c.num}
                          </button>
                        );
                      })}
                    </div>

                    {/* COURSE OVERVIEW BANNER — Minimalist & High Signal */}
                    <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-xs space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <h2 className="text-xl font-black text-stone-900">
                            {currentConfig.num}
                          </h2>
                          <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-orange-100 text-[#cc4e2d]">
                            {currentConfig.shortSpike}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-xs font-mono font-semibold border ${budgetHealthColor}`}>
                            ~{avgPracticeHours}h
                          </span>
                        </div>

                        <button
                          onClick={() => navigate('/ai-teen')}
                          className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 self-start sm:self-auto shrink-0 transition-colors cursor-pointer"
                        >
                          <Layers className="w-3.5 h-3.5 text-orange-400" />
                          <span>{lang === 'VI' ? 'AI Teen Taxonomy' : 'Taxonomy'}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>

                      {/* 3 Metric Stats */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-stone-100">
                        <div className="bg-stone-50 rounded-lg px-3 py-2 border border-stone-100 flex items-center justify-between">
                          <span className="text-[11px] text-stone-500 font-medium">{lang === 'VI' ? 'Thực hành:' : 'Practice:'}</span>
                          <span className="text-xs font-bold text-stone-900">~{minPracticeHours}h – {maxPracticeHours}h <span className="text-[10px] text-stone-400 font-normal">/ 40h</span></span>
                        </div>
                        <div className="bg-stone-50 rounded-lg px-3 py-2 border border-stone-100 flex items-center justify-between">
                          <span className="text-[11px] text-stone-500 font-medium">{lang === 'VI' ? 'Chỉ báo:' : 'Indicators:'}</span>
                          <span className="text-xs font-bold text-[#cc4e2d]">{totalCourseIndicators} <span className="text-[10px] text-stone-500 font-normal">({totalPrimaryIndicators} Primary + {totalSupportingIndicators} Supporting)</span></span>
                        </div>
                        <div className="bg-stone-50 rounded-lg px-3 py-2 border border-stone-100 flex items-center justify-between">
                          <span className="text-[11px] text-stone-500 font-medium">{lang === 'VI' ? 'Đồng bộ:' : 'Sync:'}</span>
                          <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            {lang === 'VI' ? 'Tự động' : 'Reactive'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* HIERARCHICAL DOMAIN COMPETENCY TREE SECTION — Collapsible Accordions */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm sm:text-base font-bold text-stone-900 flex items-center gap-1.5">
                          <Brain className="w-4 h-4 text-[#cc4e2d]" />
                          <span>{lang === 'VI' ? 'Chỉ Báo Mục Tiêu' : 'Target Indicators'}</span>
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-stone-400 font-mono hidden sm:inline">
                            {activeDomainsData.length} Domains • {totalCourseIndicators} Indicators
                          </span>
                          <button
                            onClick={() => {
                              const allOpen = activeDomainsData.every((d) => openCourseDomains[d.id]);
                              const next = {};
                              activeDomainsData.forEach((d) => {
                                next[d.id] = !allOpen;
                              });
                              setOpenCourseDomains(next);
                            }}
                            className="text-xs font-semibold text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                          >
                            {activeDomainsData.every((d) => openCourseDomains[d.id])
                              ? (lang === 'VI' ? 'Thu gọn tất cả' : 'Collapse All')
                              : (lang === 'VI' ? 'Mở rộng tất cả' : 'Expand All')}
                          </button>
                        </div>
                      </div>

                      {/* Domain Accordions */}
                      <div className="space-y-3">
                        {activeDomainsData.map((domain) => {
                          const IconComp = getDomainIcon(domain.slug);
                          const isPrimaryDomain = domain.slug === 'domain-generative-ai';
                          const isOpen = openCourseDomains[domain.id];

                          return (
                            <div
                              key={domain.id}
                              className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs transition-all"
                            >
                              {/* Domain Card Header - Clickable Accordion Header */}
                              <div
                                onClick={() => {
                                  setOpenCourseDomains((prev) => ({
                                    ...prev,
                                    [domain.id]: !prev[domain.id]
                                  }));
                                }}
                                className="p-3.5 bg-stone-50/70 hover:bg-stone-100/70 border-b border-stone-100 flex items-center justify-between gap-3 cursor-pointer select-none transition-colors"
                              >
                                <div className="flex items-center gap-3">
                                  <div
                                    style={{
                                      backgroundColor: `${domain.color || '#cc4e2d'}15`,
                                      color: domain.color || '#cc4e2d'
                                    }}
                                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border border-stone-200"
                                  >
                                    <IconComp className="w-4 h-4" />
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <h4 className="text-sm font-bold text-stone-900">
                                        {lang === 'VI' ? domain.name_vi || domain.name : domain.name}
                                      </h4>
                                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                                        isPrimaryDomain ? 'bg-orange-100 text-[#cc4e2d]' : 'bg-sky-100 text-sky-800'
                                      }`}>
                                        {isPrimaryDomain ? 'Primary (L2)' : 'Supporting (L1)'}
                                      </span>
                                    </div>
                                    <div className="text-[11px] text-stone-400">
                                      {domain.totalActiveSkills} {lang === 'VI' ? 'kỹ năng' : 'skills'} • {domain.totalIndicators} {lang === 'VI' ? 'chỉ báo' : 'indicators'}
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      navigate(`/ai-teen/${domain.slug}`);
                                    }}
                                    className="text-xs font-semibold text-[#cc4e2d] hover:text-orange-700 flex items-center gap-1 hover:underline cursor-pointer p-1"
                                    title={lang === 'VI' ? 'Xem Domain' : 'View Domain'}
                                  >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                  </button>
                                  <div className="p-1 text-stone-400">
                                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
                                  </div>
                                </div>
                              </div>

                              {/* Domain Body: Areas -> Competencies -> Skills */}
                              {isOpen && (
                                <div className="p-4 space-y-3.5 bg-white">
                                  {domain.filteredAreas.map((area, aIdx) => (
                                    <div key={area.id || aIdx} className="space-y-2.5">
                                      {/* Competency Area Label */}
                                      <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-stone-400 uppercase tracking-wider">
                                        <FolderKanban className="w-3 h-3 text-stone-400" />
                                        <span>{lang === 'VI' ? area.name_vi || area.name : area.name}</span>
                                      </div>

                                      {/* Competencies */}
                                      <div className="space-y-2.5">
                                        {area.filteredComps.map((comp, cIdx) => (
                                          <div key={comp.id || cIdx} className="space-y-2">
                                            <div className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                                              <span className="w-1.5 h-1.5 rounded-full bg-[#cc4e2d]"></span>
                                              <span>{lang === 'VI' ? comp.name_vi || comp.name : comp.name}</span>
                                            </div>

                                            {/* Skills List */}
                                            <div className="space-y-2">
                                              {comp.filteredSkills.map((skill, sIdx) => {
                                                const teenData = skill.teenData;
                                                const isPrimary = skill.effectiveRole === 'primary';
                                                const skillTitle = lang === 'VI' ? (teenData.name_vi || skill.name_vi || skill.name) : (teenData.name_en || skill.name);
                                                const guidingQ = lang === 'VI' ? (teenData.guidingQuestion_vi || teenData.guidingQuestion) : (teenData.guidingQuestion_en || teenData.guidingQuestion);

                                                return (
                                                  <div
                                                    key={skill.id || sIdx}
                                                    className="p-3.5 rounded-lg border border-stone-200 bg-white hover:border-stone-300 transition-colors space-y-2"
                                                  >
                                                    {/* Skill Header */}
                                                    <div className="flex items-center justify-between gap-2">
                                                      <div className="flex items-center gap-2">
                                                        <span className="font-bold text-xs sm:text-sm text-stone-900">
                                                          {skillTitle}
                                                        </span>
                                                        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                                                          isPrimary
                                                            ? 'bg-orange-100 text-[#cc4e2d]'
                                                            : 'bg-stone-100 text-stone-700'
                                                        }`}>
                                                          {isPrimary ? 'Primary' : 'Supporting'}
                                                        </span>
                                                      </div>

                                                      <button
                                                        onClick={() => {
                                                          navigate(`/ai-teen/${domain.slug}`);
                                                          setOpenAreas((prev) => ({ ...prev, [area.id]: true }));
                                                          setOpenCompetencies((prev) => ({ ...prev, [comp.id]: true }));
                                                          setOpenSkills((prev) => ({ ...prev, [skill.id || skill.code]: true }));
                                                        }}
                                                        className="text-xs font-semibold text-stone-400 hover:text-[#cc4e2d] flex items-center gap-1 cursor-pointer transition-colors"
                                                      >
                                                        <span>5 Levels</span>
                                                        <ArrowRight className="w-3 h-3" />
                                                      </button>
                                                    </div>

                                                    {/* Guiding Question */}
                                                    {guidingQ && (
                                                      <p className="text-xs italic text-stone-600 bg-stone-50 px-2.5 py-1.5 rounded border border-stone-100">
                                                        <span className="font-semibold not-italic text-stone-700 mr-1.5">🎯 Guiding Question:</span>
                                                        "{guidingQ}"
                                                      </p>
                                                    )}

                                                    {/* Target Indicators */}
                                                    <div className="space-y-1 pt-0.5">
                                                      <div className="text-[11px] font-mono font-bold text-stone-400 uppercase tracking-wider">
                                                        Level {skill.targetLevel} Indicators ({skill.targetIndicators.length})
                                                      </div>
                                                      <ul className="space-y-1 text-xs text-stone-700">
                                                        {skill.targetIndicators.map((ind, iIdx) => (
                                                          <li key={iIdx} className="flex items-start gap-2">
                                                            <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                                                              isPrimary ? 'bg-[#cc4e2d]' : 'bg-stone-400'
                                                            }`}></span>
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
                                        ))}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* 12 PRODUCTS EVOLUTION MATRIX SECTION — Collapsible */}
                    <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
                      {/* Collapsible Header */}
                      <div
                        onClick={() => setIsCourseProductsOpen(!isCourseProductsOpen)}
                        className="p-3.5 bg-stone-50/70 hover:bg-stone-100/70 flex items-center justify-between gap-3 cursor-pointer select-none transition-colors border-b border-stone-100"
                      >
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className="text-[11px] font-mono font-bold uppercase text-[#cc4e2d] tracking-wider">
                            Product Evolution
                          </span>
                          <h3 className="text-sm sm:text-base font-bold text-stone-900">
                            {lang === 'VI'
                              ? `12 Sản Phẩm (${currentConfig.num} — ${currentConfig.versionLabel})`
                              : `12 Products (${currentConfig.num} — ${currentConfig.versionLabel})`}
                          </h3>
                          <span className="text-xs font-mono font-semibold text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                            12/12 {currentConfig.versionLabel}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-stone-400">
                          <span className="text-xs font-medium text-stone-500">
                            {isCourseProductsOpen ? (lang === 'VI' ? 'Thu gọn' : 'Collapse') : (lang === 'VI' ? 'Mở rộng' : 'Expand')}
                          </span>
                          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isCourseProductsOpen ? 'transform rotate-180' : ''}`} />
                        </div>
                      </div>

                      {/* Collapsible Content */}
                      {isCourseProductsOpen && (
                        <div className="p-4 space-y-3.5">
                          <p className="text-xs text-stone-600 leading-relaxed bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                            <strong className="text-stone-800 mr-1">{lang === 'VI' ? 'Mục Tiêu:' : 'Target:'}</strong>
                            {currentConfig.briefFocus}
                          </p>

                          {/* 12 Products Grid */}
                          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5">
                            {currentConfig.products.map((p) => (
                              <div
                                key={p.code}
                                className="p-3 rounded-lg border border-stone-200 bg-white hover:border-stone-300 transition-all flex flex-col justify-between space-y-2"
                              >
                                <div className="space-y-1">
                                  <div className="flex items-center justify-between">
                                    <span className="px-1.5 py-0.5 bg-stone-900 text-white font-mono font-bold text-[10px] rounded">
                                      {p.code}
                                    </span>
                                    <span className="px-1.5 py-0.5 bg-orange-100 text-[#cc4e2d] font-mono font-bold text-[10px] rounded">
                                      {currentConfig.versionLabel}
                                    </span>
                                  </div>
                                  <h5 className="font-bold text-xs text-stone-900 leading-snug">
                                    {p.name}
                                  </h5>
                                  <p className="text-[11px] text-stone-600 leading-relaxed">
                                    {p.delta}
                                  </p>
                                </div>

                                <div className="pt-1.5 border-t border-stone-100 flex items-center justify-between text-[10px] text-stone-400 font-mono">
                                  <span>{p.activeSkill}</span>
                                  <Check className="w-3 h-3 text-emerald-500" />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}
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
                      className="bg-white rounded-2xl border border-stone-200 shadow-sm transition-all"
                    >
                      {/* Area Header (Image 1 Style) */}
                      <div
                        onClick={() => toggleArea(area.id)}
                        className={`p-5 flex items-center justify-between cursor-pointer hover:bg-orange-50/20 transition-colors rounded-t-2xl ${
                          !isAreaOpen ? 'rounded-b-2xl' : ''
                        }`}
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
                                className="bg-white rounded-2xl border border-stone-200 shadow-sm"
                              >
                                {/* Competency Header */}
                                <div
                                  onClick={() => toggleCompetency(comp.id)}
                                  className={`p-4 sm:p-5 flex items-center justify-between cursor-pointer hover:bg-stone-50 transition-colors rounded-t-2xl ${
                                    !isCompOpen ? 'rounded-b-2xl' : 'border-b border-stone-100'
                                  }`}
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
                                          const teenData = getAiTeenSkillData(skill.name, comp.name, activeCoreCode, lang, skill.id, skill, activeAiTeenDomain?.slug);
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
                                                    className={`rounded-2xl border border-stone-200 bg-white shadow-2xs transition-all ${
                                                      role === 'out_of_scope' ? 'opacity-75' : ''
                                                    }`}
                                                  >
                                                    {/* Skill Header */}
                                                    <div
                                                      onClick={() => toggleSkill(skill.id)}
                                                      className={`p-4 bg-stone-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:bg-stone-100/60 transition-colors rounded-t-2xl ${
                                                        !isSkillOpen ? 'rounded-b-2xl' : 'border-b border-stone-200/60'
                                                      }`}
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
                                                              {lang === 'VI' ? 'Thang Đánh Giá Năng Lực' : 'Continuum Rubrics'}
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
