---
id: CCS-A3-STYLE-GUIDE
title: "UI & Content Style Guide"
status: approved
version: "3.0.0"
date: "2026-09-18"
domain: "Design System / Style Guide & Content Standards"
---

# Style Guide

Bộ quy chuẩn toàn diện về thiết kế giao diện (**Liquid Flow**) và tiêu chuẩn ngôn ngữ, cấu trúc tài liệu toàn hệ thống Simba Competencies.

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

### 2. Language Matrix
| Hạng Mục | Ngôn Ngữ Quy Định | Ví Dụ Chuẩn |
| :--- | :--- | :--- |
| **Tiêu đề Section (H1–H4)** | **Pure English** (≤ 3 words) | `## Executive Summary`, `### Evidence Mapping` |
| **Meta-data Labels** | **Pure English** | `Objective:`, `Target Audience:`, `Owner:`, `Output:` |
| **Thuật ngữ Chuyên môn** | **Pure English** (giữ nguyên gốc) | `CBE`, `JTBD`, `Building 21 Continuum`, `4F Reflection` |
| **Hướng dẫn Tác nghiệp** | **Tiếng Việt tự nhiên** | Diễn giải chi tiết kịch bản Socratic, tiêu chí chỉ báo |
| **Binary Indicator Tone** | **Tiếng Việt ("Con có thể...")** | Diễn đạt hành vi quan sát được, kiểm chứng Đạt / Chưa đạt |

---

## QA Checklist

Trước khi phê duyệt tài liệu hoặc giao diện:
- [ ] Toàn bộ Section Titles H1–H4 viết bằng Pure English và ≤ 3 từ?
- [ ] Không có hiện tượng đóng mở ngoặc giải thích song ngữ?
- [ ] Bảng màu và typography tuân thủ đúng chuẩn Liquid Flow?
- [ ] Mã năng lực được định dạng bằng code block (`GenAI.1.1`)?
