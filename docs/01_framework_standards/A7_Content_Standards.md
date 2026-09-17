---
id: CCS-CONTENT-STANDARDS
title: "Content & Language Standards — Conan1 & Simba Competencies"
status: approved
version: "2.0.0"
date: "2026-09-12"
authors: ["Antigravity", "Conan1 Architecture Core", "Simba Learning Operations"]
domain: "Product Architecture / Content & Language Standardization"
relates_to:
  - "Graduation_Plan.md"
  - "DAR_Calibrated_Matrix.md"
  - "Product_Builder_Competency_Standard.md"
  - "12_Products_Conan1_Micro_Mapping.md"
---

# Content & Language Standards

> **Bộ tiêu chuẩn biên soạn nội dung, quy tắc ngôn ngữ & cấu trúc tài liệu toàn hệ thống Conan1 & Simba Competencies**  
> **Áp dụng cho:** Tất cả các tài liệu Requirements, Architecture, Graduation Plan, Competency Taxonomies, Assessment Rubrics & Giao diện UI Web.

---

## 1. Core Principles

1. **Clarity & Consistency (Nhất quán & Tối giản):**
   - Loại bỏ hoàn toàn sự lai tạp hai thứ tiếng trong cùng một cụm tiêu đề (ví dụ: cấm `Điều kiện kích hoạt (Trigger)`, `Chuẩn đầu ra (Exit Criteria)`).
   - Chọn một ngôn ngữ duy nhất cho tiêu đề theo quy tắc phân cấp rõ ràng.
2. **Lean Section Title Rule (Quy tắc độ dài tiêu đề):**
   - Tên của mọi **Section / Subsection (Header H1, H2, H3, H4)** và các **Meta-data Label**: **Tối đa 3 từ (≤ 3 words)**.
3. **Zero Parenthesis Translation (Không đóng mở ngoặc song ngữ):**
   - Tuyệt đối **không** dùng hình thức mở ngoặc giải thích tiếng Việt/tiếng Anh đi kèm nhãn (`Không: Mục đích (Objective)` / `Không: Năng lực (Competency)`).

---

## 2. Language Matrix

Bảng phân định phạm vi sử dụng **Tiếng Anh** và **Tiếng Việt** trong toàn bộ hệ thống Simba & Conan1:

| Hạng Mục / Thành Phần | Ngôn Ngữ Quy Định | Ví Dụ Chuẩn | Ví Dụ Vi Phạm (Cấm) |
| :--- | :--- | :--- | :--- |
| **Tiêu đề Section / Header (H1 - H4)** | **Pure English** (Title Case, ≤ 3 words) | `## Executive Summary`<br>`### Exit Criteria`<br>`### Weighting Framework` | `## Tóm tắt (Summary)`<br>`### Chuẩn đầu ra (Exit Criteria)`<br>`### Đánh giá (Evaluation)` |
| **Meta-data Labels (Nhãn trường thông tin)** | **Pure English** | `Objective:`<br>`Target Audience:`<br>`Competency Code:`<br>`Owner:`<br>`Output:` | `Mục đích:`<br>`Đối tượng (Audience):`<br>`Mã năng lực (Code):`<br>`Chuẩn đầu ra (DoD):` |
| **Thuật ngữ Chuyên môn / Hệ thống** | **Pure English** (giữ nguyên gốc) | `JTBD`, `Rubric`, `DoD`, `GenAI Orchestration`, `Prompt Engineering`, `4F Reflection`, `Live Artifact` | Dịch thô/ép nghĩa tiếng Việt: *Học sâu tự phản tư*, *Công cụ sinh tự động* |
| **Nội dung Chi tiết & Hướng dẫn Tác nghiệp** | **Tiếng Việt tự nhiên** | Các bước SOP chi tiết, kịch bản phỏng vấn Socratic, giải thích chỉ báo hành vi, Do's & Don'ts. | Dùng Google Translate cứng nhắc hoặc chèn từ tiếng Anh bừa bãi khi đã có từ tiếng Việt chuẩn xác. |
| **Giao diện Người dùng (UI Labels - Học sinh & Phụ huynh)** | **Tiếng Việt thân thiện** | `Hành trình của con`, `Khung năng lực AI Teen`, `Báo cáo tăng trưởng` | Chèn thuật ngữ kỹ thuật khô khan khó hiểu với phụ huynh. |
| **Giao diện Nội bộ / Taxonomy (Mentor / Admin)** | **English / Bilingual chuyên nghiệp** | `Competency Explorer`, `Growth Scorecard`, `Oral Verification Rubric` | Dịch gượng ép làm mất tính chuẩn mực quốc tế của Conan1. |

---

## 3. Standard Glossary

Áp dụng thống nhất cho tất cả các tài liệu thiết kế năng lực, Graduation Plan và Rubric:

### 3.1. Metadata Headers

| Cụm Cũ / Sai Quy Chuẩn | Cụm Chuẩn Hóa (Pure English ≤ 3 words) | Diễn Giải Chi Tiết (Nội dung bên trong viết bằng TV) |
| :--- | :--- | :--- |
| `Mục đích:` / `Mục đích (Objective):` | `Objective:` | Mục đích cốt lõi của hoạt động/tài liệu. |
| `Điều kiện kích hoạt (Trigger):` | `Trigger:` | Sự kiện hoặc tín hiệu kích hoạt quy trình đánh giá. |
| `Thời gian chuẩn (Standard Time):` | `Standard Time:` | Khung thời gian tiêu chuẩn để hoàn thành (ví dụ: 20 phút). |
| `Đối tượng áp dụng (Target Audience):` | `Target Audience:` | Học sinh cấp 2-3, Mentor hoặc Phụ huynh. |
| `Người thực hiện (Owner / PIC):` | `Owner:` | Vai trò chịu trách nhiệm chính (Mentor, Host, AI System). |
| `Đầu ra bắt buộc (Output / Deliverables):` | `Output:` | Kết quả, bằng chứng hoặc báo cáo phải nộp sau khi xong. |

### 3.2. Section Naming Principles

Tiêu đề Section (`##`, `###`, `####`) và Accordion bắt buộc tuân thủ 3 nguyên tắc:
1. **Pure English & Title Case:** Sử dụng tiếng Anh chuẩn ngữ nghĩa, viết hoa chữ cái đầu.
2. **Lean Length (≤ 3 words):** Tối đa 3 từ, ngắn gọn và hướng trọng tâm.
3. **No Decorative Noise:** Không chèn emoji ở đầu dòng, không mở ngoặc chú thích/dịch nghĩa song ngữ.

**Ví dụ minh họa đối chiếu:**
- ✅ **Chuẩn mực:** `Executive Summary`, `Competency Adapter`, `Evidence Mapping`, `Test Blueprint`, `Completion Criteria`, `Growth Report`...
- ❌ **Vi phạm (Cấm):** `Tóm tắt điều hành (Executive Summary)`, `📋 Test Blueprint (Ma trận đề)`, `Standard Operating Procedure For Student Exit Plan`.

---

## 4. Formatting Guidelines

### 4.1. Capitalization Rule
- **Title Case** cho toàn bộ Section Header tiếng Anh: `Executive Summary`, `Evidence Mapping`, `Completion Criteria`.
- **Sentence case** cho các câu mô tả chi tiết tiếng Việt: *Bắt đầu bằng chữ hoa, kết thúc bằng dấu chấm.*

### 4.2. Bold / Italic / Code Highlight
- **In đậm (`**text**`)**: Dùng cho Meta-labels (`Trigger:`, `Objective:`), trọng số (`70%`, `20%`, `10%`), hoặc trạng thái (`Completed:`, `In Progress:`).
- **In nghiêng (`*text*`)**: Dùng cho trích dẫn lời thoại mẫu, câu hỏi phỏng vấn của Mentor: `*“Chỉ cho thầy 1 chỗ trong web này con thấy khó nhất khi làm cùng AI?”*`.
- **Code Block / Inline Code (`` `text` ``)**: Dùng cho mã định danh năng lực (`CU.1.3`, `GenAI.2.1`, `PSDM.1.2`).

### 4.3. Tone of Voice
- **Tài liệu Kiến trúc & Tiêu chuẩn:** Khách quan, chuẩn xác, dựa trên bằng chứng (evidence-based), không phán xét chủ quan.
- **Báo cáo Phụ huynh (Student Growth Report):** Ấm áp, khích lệ, chân thành, tập trung vào sự vượt khó và trưởng thành thực chất của học sinh.

---

## 5. QA Checklist

Trước khi phê duyệt và xuất bản bất kỳ tài liệu nào thuộc hệ thống Conan1/Simba:

- [ ] **Tiêu đề ≤ 3 từ:** Toàn bộ Header H1-H4 có tuân thủ quy tắc tối đa 3 từ tiếng Anh không?
- [ ] **Không mở ngoặc song ngữ:** Có cụm từ nào bị đóng mở ngoặc giải thích tiếng Anh/Việt không?
- [ ] **Title Case Header:** Các tiêu đề tiếng Anh đã viết hoa chữ cái đầu đúng chuẩn chưa?
- [ ] **Meta-data chuẩn:** Các trường thông tin có dùng đúng nhãn Pure English (`Objective:`, `Trigger:`, `Output:`) chưa?
- [ ] **Khớp mã Conan1:** Toàn bộ mã năng lực có khớp 1:1 với định dạng chuẩn (`CU.x.x`, `GenAI.x.x`) không?
