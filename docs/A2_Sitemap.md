---
id: CCS-A2-SITEMAP
title: "Website Sitemap & Navigation"
status: approved
version: "3.0.0"
date: "2026-09-18"
domain: "Product Architecture / Information Architecture"
---

# Website Sitemap

Bản đồ cấu trúc điều hướng và chức năng trên Web UI dành cho Mentor (Base URL: `/ccs` hoặc `/`).

---

## Navigation Tree

```
Simba Competencies Web App (Mentor Interface)
├── Top Navbar (Brand: C1 / CONAN1)
│   ├── Khung Năng Lực Toàn Phần (`/`)
│   ├── Khung Năng Lực AI Teen (`/ai-teen`) [Badge Flame]
│   ├── Lộ Trình Khóa Học (`/course-progression`)
│   ├── Kế Hoạch Tốt Nghiệp (`/graduation-plan`)
│   ├── FAQ (`/faq`)
│   └── Controls: Bộ chuyển ngôn ngữ (VI / EN)
└── Mobile Secondary Nav (Horizontal Scroll)
```

---

## Route Breakdown

### 1. Khung Toàn Phần (`/`)
- **Metric Summary:** Tổng quan 9 Domains, 29 Areas, 88 Competencies gốc của Conan1.
- **Global Frameworks Reference:** Đối chiếu chuẩn quốc tế (SFIA 9, Bloom's Taxonomy, Dreyfus Reference, DigComp 2.2, WEF).
- **Search & Quick Domain Filters:** Thanh tìm kiếm theo mã năng lực hoặc từ khóa nghiệp vụ.
- **Hierarchical Accordion:** Xem cây phân cấp Domain → Competency Area → Competency → Bảng chỉ báo.
- **Export Action:** Tải xuống toàn bộ cấu trúc dữ liệu dưới dạng tệp JSON.

### 2. Khung AI Teen (`/ai-teen`)
- **Interactive View Modes:**
  - `Reading Mode`: Tra cứu chỉ báo hành vi chuẩn.
  - `Editing Mode`: Tùy biến Target Level và phân loại vai trò (`Primary Focus`, `Supporting`, `Out of Scope`) lưu trực tiếp vào LocalStorage.
- **Core 5 Domain Filters:**
  - `GenAI`: Kỹ thuật Prompt, điều phối mô hình đa phương thức, kiểm soát giới hạn AI.
  - `CU`: Thấu cảm người dùng, xây dựng chân dung Persona, kiểm chứng nhu cầu.
  - `PSDM`: Tư duy chia nhỏ bài toán, gỡ lỗi logic, ra quyết định dựa trên dữ liệu.
  - `DPD`: Kiến tạo sản phẩm số, thiết kế kiến trúc tính năng, phát hành và lặp lại.
  - `LRN`: Tự học chủ động, nhật ký phản tư 4F, phát hiện và sửa sai.
- **Skill Detail Accordion:**
  - Ma trận 5 cấp độ Building 21 CBE Continuum.
  - Danh sách chỉ báo hành vi nhị phân (*"Con có thể..."*).
  - Tình huống thực tế (Mini-Scenarios) & Hiểu lầm phổ biến (Misconceptions).
  - Kho câu hỏi gợi mở định hướng (Key Socratic Questions).
- **Prompt Popover Modal:** Hướng dẫn chi tiết mẫu câu lệnh AI dành cho từng kỹ năng.

### 3. Lộ Trình Khóa (`/course-progression`)
- **Spiral Progression Architecture:** Giám sát 5 khóa học nâng cấp vòng lặp cho 12 sản phẩm.
- **5 Khóa học & 12 Sản phẩm (SP1 – SP12):**
  - *Khóa 1 (Khám phá GenAI):* SP1 (AI Avatar), SP2 (Comic), SP3 (Audiobook).
  - *Khóa 2 (Thấu cảm Người dùng - CU):* SP4 (Persona), SP5 (Landing Page Idea), SP6 (Market Fit).
  - *Khóa 3 (Gỡ lỗi & Logic - PSDM):* SP7 (Interactive Logic), SP8 (Dynamic App), SP9 (System Debugging).
  - *Khóa 4 & 5 (Tự chủ Sản phẩm số - DPD & Portfolio):* SP10 (Feature Architecture), SP11 (Beta Product), SP12 (Capstone MVP).
- **Mentor Socratic Prompts:** Bộ câu hỏi điều hướng và đào sâu tư duy theo từng bài thực hành.

### 4. Kế Hoạch Tốt Nghiệp (`/graduation-plan`)
- **Graduation Promise Header:** Định hướng chuyển hóa từ người tiêu thụ thành nhà kiến tạo số độc lập.
- **Evidence Triangulation Hub:**
  - `70% Simba Performance Evidence`: Tiêu chí hoàn thành ≥ 6/12 sản phẩm (≥ 3 versions, ≥ 80đ) + 12 bài 4F.
  - `20% Conceptual Test`: Bài kiểm tra đánh giá cuối khóa (4 tình huống + 1 Mini-Prompt Fix) đạt ≥ 80đ.
  - `10% Product Showcase & Oral`: Đánh giá bài thuyết trình và vấn đáp Oral Verification 3–5 phút.
- **Graduation SOP Checklist:** Quy trình 4 bước thẩm định hồ sơ bằng chứng cho Mentor.

### 5. FAQ Hub (`/faq`)
- **Category Filter Tabs:**
  - `Tất cả (All)`
  - `Khái niệm & Khung chuẩn (Concepts & Frameworks)`
  - `Kỹ thuật Prompt & AI (AI & Prompting)`
  - `Lộ trình & Sản phẩm (Progression & Products)`
  - `Nghiệp vụ Mentor (Mentor Operations)`
- **Misconception Deep-Dive:** Đối chiếu giữa quan niệm sai lầm và bản chất sư phạm chuẩn.

---

## Global Feedback

- **Toast Notifications:** Hiển thị tức thời trạng thái lưu khi Mentor cập nhật Target Level hoặc Role.
- **Prompt Modal Bridge:** Cung cấp câu lệnh gợi ý trực tiếp khi click biểu tượng AI.
