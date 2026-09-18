---
id: CCS-A3-STYLE-GUIDE
title: "UI & Content Style Guide"
status: approved
version: "3.0.0"
date: "2026-09-18"
domain: "Design System / Style Guide & Content Standards"
---

# Style Guide

Bộ quy chuẩn toàn diện về triết lý thiết kế giao diện (**Liquid Flow — Clean & Minimalism**) và tiêu chuẩn ngôn ngữ, cấu trúc nội dung toàn hệ thống Simba Competencies.

---

## Design Philosophy: Clean & Minimalism

Triết lý cốt lõi của Simba Competency System là **"Form Follows Function & Zero Fluff"** — Mọi chi tiết xuất hiện trên màn hình hoặc trong tài liệu đều phải phục vụ một mục đích nhận thức hoặc tác nghiệp cụ thể cho Mentor. Tối đa hóa **Tỷ lệ Tín hiệu trên Nhiễu (High Signal-to-Noise Ratio)** để Mentor nắm bắt thông tin trong vòng 3 giây.

```
       [ HIGH SIGNAL ]  ──>  Thông tin cốt lõi, Mã năng lực, Tiêu chí nhị phân
             ▲
             │          (Loại bỏ hoàn toàn từ ngữ thừa, hình trang trí rườm rà)
             ▼
       [ LOW NOISE ]    ──>  Khoảng trắng chủ động, Bảng màu có kiểm soát
```

### 4 Trụ Cột Tối Giản (Minimalism Pillars)

1. **Bố Cục & Không Gian (Layout & Active Whitespace):**
   - **Khoảng trắng thở (Breathing Space):** Sử dụng khoảng cách (`gap`, `padding`) để phân nhóm thông tin tự nhiên thay vì lạm dụng viền đậm (borders) hay đóng khung thẻ lồng thẻ (nested cards).
   - **Phẳng & Tinh tế (Subtle Flat):** Hạn chế tối đa đổ bóng dày hay hiệu ứng 3D phô trương. Ưu tiên viền siêu mảnh (`border-stone-200`) và bóng mờ nhẹ (`shadow-sm`) để giữ giao diện nhẹ nhàng, tập trung.
   - **Phân tầng thị giác rõ ràng (Visual Hierarchy):** Định hướng mắt đọc qua kích thước chữ và độ đậm (Montserrat Extrabold cho Title, Inter cho Body) thay vì dùng quá nhiều màu sắc.

2. **Màu Sắc Có Chức Năng (Functional Color Coding):**
   - **Nền sạch & Dịu mắt:** Màu nền chủ đạo là Trắng thuần (`#FFFFFF`) và Xám sáng (`#F4F5F7`), giúp Mentor giảm mỏi mắt khi tra cứu và làm việc liên tục.
   - **Màu sắc mang ý nghĩa tác nghiệp:** Không sử dụng màu chỉ để "trang trí". Mỗi màu gắn liền với một mục đích chức năng:
     - **Cobalt Blue (`#0052CC`):** Nút CTA chính, liên kết điều hướng, năng lực Hỗ trợ (Supporting).
     - **Burnt Orange (`#A33500`):** Năng lực Mũi nhọn (Primary Focus), cảnh báo quan trọng.
     - **Cyan (`#7DF9FF`):** Điểm nhấn sáng tạo, badge bổ trợ.
     - **Neutral Grey (`#757780`):** Ngoài phạm vi (Out of Scope), văn bản phụ.

3. **Hình Ảnh & Biểu Tượng Có Mục Đích (Purposeful Imagery & Icons):**
   - **Không dùng hình minh họa trang trí (No Decorative Stock/Cartoons):** Tuyệt đối không chèn ảnh stock vô thưởng vô phạt hoặc hình hoạt họa làm phân tán sự tập trung của Mentor.
   - **Chỉ sử dụng hình ảnh mang giá trị bằng chứng:** Hình ảnh chỉ xuất hiện khi là **Sản phẩm thực tế của học sinh (Product Evidence)**, **Sơ đồ kiến trúc (Architecture Diagram)** hoặc **Mindmap sư phạm**.
   - **Icon tối giản, đơn sắc:** Icon theo phong cách stroke mảnh (1.5px – 2px), kích thước chuẩn (16px – 20px), màu trung tính, chỉ dùng để hỗ trợ nhận diện thao tác (như search, filter, download, external-link).

4. **Ngôn Ngữ & Biên Tập Tinh Gọn (Radical Content Minimalism):**
   - **Cắt bỏ triệt để từ ngữ thừa (Zero Fluff):** Loại bỏ hoàn toàn các từ đệm, từ nối rườm rà, trạng từ khoa trương hoặc các đoạn văn dẫn dắt không mang thông tin hành động.
   - **Đi thẳng vào bản chất (Direct & Action-Oriented):** Viết ngắn gọn, súc tích; mỗi câu trả lời trực tiếp cho Mentor: *Đây là gì? Dạy thế nào? Tiêu chí nghiệm thu (DoD) là gì?*
   - **Ưu tiên cấu trúc quét nhanh (Scannable Structure):** Chuyển đổi các đoạn văn dài thành **Bảng đối chiếu (Comparison Tables)**, **Danh sách gạch đầu dòng (Bullet Points)**, và **Mã năng lực dạng chip (`JetBrains Mono`)**.
   - **Tiêu đề Lean (≤ 3 words):** Tiêu đề Section ngắn gọn, chuẩn Pure English (ví dụ: `System Overview`, `Course Progression`, `Graduation Criteria`).
   - **Không mở ngoặc giải thích song ngữ (Zero Parenthesis Translation):** Dùng chuẩn thuật ngữ quốc tế hoặc diễn giải tự nhiên, cấm viết kiểu `Mục đích (Objective)` hay `Đầu ra (Output)`.

---

## Color Palette

Bảng màu chuẩn hóa dựa trên hệ thống thiết kế Liquid Flow:

| Token | Mã Màu (HEX) | Phạm Vi Ứng Dụng |
| :--- | :--- | :--- |
| **Primary** | `#0052CC` | Nút chính (CTA), active tab, icon trọng tâm, link điều hướng |
| **Secondary** | `#7DF9FF` | Cyan nổi bật, highlight vùng sáng tạo, badge bổ trợ |
| **Tertiary** | `#A33500` | Màu đất nung/cam đậm, nhãn hành động biên tập, cảnh báo nhẹ |
| **Neutral** | `#757780` | Văn bản phụ, đường viền nhẹ, icon trạng thái trung tính |
| **Dark Neutral** | `#1E2022` / `#111111` | Tiêu đề chính, nút Inverted, popover tooltip nền tối |
| **Background** | `#FFFFFF` / `#F4F5F7` | Nền trang web, nền thẻ card container |

---

## Typography Standards

- **Headline Font:** `'Montserrat', sans-serif` — Áp dụng cho tiêu đề trang (H1), tiêu đề phân đoạn (H2) và thẻ lớn.
- **Body & Label Font:** `'Inter', sans-serif` — Áp dụng cho toàn bộ văn bản nội dung, nhãn điều khiển, tiêu chí chỉ báo.
- **Identifier Font:** `'JetBrains Mono', monospace` — Áp dụng riêng cho mã định danh năng lực (`CU.1.3`, `GenAI.2.1`) và code.

### Typography Scale
- **Page Title (H1):** `text-3xl` đến `text-4xl`, `font-extrabold`, `tracking-tight` (Montserrat).
- **Section Title (H2):** `text-xl` đến `text-2xl`, `font-bold` (Montserrat).
- **Subsection / Card (H3):** `text-base` đến `text-lg`, `font-bold` (Montserrat / Inter).
- **Body Content:** `text-sm` (14px) hoặc `text-base` (15px), `leading-relaxed` (Inter).
- **Labels & Chips:** `text-xs` (11–12px), `font-semibold` (Inter).

---

## UI Components

### 1. Button Variants
- **Primary:** Nền `#0052CC`, chữ trắng, bo góc vừa.
- **Secondary:** Nền `#F4F5F7`, chữ `#0052CC`, không viền.
- **Inverted:** Nền tối `#1E2022`, chữ trắng (Dark Theme).
- **Outlined:** Viền mảnh `border-stone-300`, nền trong suốt.

### 2. Action Chips & Badges
- **Trọng Tâm Mũi Nhọn (Primary):** Chip cam đậm (`#A33500`).
- **Trọng Tâm Hỗ Trợ (Supporting):** Chip xanh cobalt (`#0052CC`).
- **Ngoài Phạm Vi (Out of Scope):** Chip xám trung tính (`#757780`).
- **Indicator Binary Chip:** Nền xanh lá / đỏ nhạt báo trạng thái Đạt / Chưa đạt.

---

## Content Standards

### 1. Core Principles
1. **Lean Section Titles (≤ 3 words):** Toàn bộ Section Header (H1–H4) và nhãn Metadata bắt buộc viết bằng **Pure English**, tối đa 3 từ, Title Case (ví dụ: `System Overview`, `Target Audience`, `Graduation Criteria`).
2. **Zero Parenthesis Translation:** Tuyệt đối không dùng hình thức mở ngoặc giải thích song ngữ (Cấm: `Mục đích (Objective)`, `Chuẩn đầu ra (DoD)`).
3. **Radical Brevity:** Cắt bỏ mọi từ đệm không cần thiết; dùng thể chủ động, câu khẳng định trực diện.

### 2. Language Matrix
| Hạng Mục | Ngôn Ngữ Quy Định | Ví Dụ Chuẩn |
| :--- | :--- | :--- |
| **Tiêu đề Section (H1–H4)** | **Pure English** (≤ 3 words) | `## Executive Summary`, `### Evidence Mapping` |
| **Meta-data Labels** | **Pure English** | `Objective:`, `Target Audience:`, `Owner:`, `Output:` |
| **Thuật ngữ Chuyên môn** | **Pure English** (giữ nguyên gốc) | `CBE`, `JTBD`, `Building 21 Continuum`, `4F Reflection` |
| **Hướng dẫn Tác nghiệp** | **Tiếng Việt tự nhiên & tinh gọn** | Diễn giải chi tiết kịch bản Socratic, tiêu chí chỉ báo |
| **Binary Indicator Tone** | **Tiếng Việt ("Con có thể...")** | Diễn đạt hành vi quan sát được, kiểm chứng Đạt / Chưa đạt |

---

## QA Checklist

Trước khi phê duyệt tài liệu hoặc giao diện:
- [ ] Tuân thủ triết lý **Clean & Minimalism** (không hình ảnh thừa, không viền rườm rà, tối đa khoảng trắng)?
- [ ] Bảng màu có kiểm soát (nền trắng/xám sạch, màu nhấn phục vụ công năng nhận diện)?
- [ ] Toàn bộ Section Titles H1–H4 viết bằng Pure English và ≤ 3 từ?
- [ ] Nội dung tinh gọn, loại bỏ hết từ ngữ thừa thãi, không có hiện tượng đóng mở ngoặc song ngữ?
- [ ] Bảng màu và typography tuân thủ đúng chuẩn Liquid Flow?
- [ ] Mã năng lực được định dạng bằng code block (`GenAI.1.1`)?

