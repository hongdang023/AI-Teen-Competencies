---
id: CCS-A1-OVERVIEW
title: "System Overview & Pedagogical Architecture"
status: approved
version: "3.0.0"
date: "2026-09-18"
domain: "Product Architecture / System Overview"
---

# System Overview

Simba Competency System (CCS) là nền tảng số hóa quản trị và chuẩn hóa năng lực dành riêng cho **Mentor / Giảng viên**, hỗ trợ theo dõi lộ trình phát triển năng lực công nghệ và thẩm định tốt nghiệp của học sinh thông qua hệ thống khung chuẩn Conan1 kết hợp Building 21 CBE Continuum.

---

## Pedagogical Philosophy

Hệ thống được vận hành dựa trên 3 trụ cột sư phạm chính:

1. **Building 21 CBE Continuum:**
   - Đánh giá năng lực theo ma trận 5 cấp độ tiến trình (`Level 1` đến `Level 5`).
   - Mọi chỉ báo năng lực (Indicators) đều được thiết kế dưới dạng hành vi quan sát được (*"Con có thể..." / "I can..."*) và kiểm chứng theo tiêu chí nhị phân (**Binary: Đạt / Chưa đạt**).
2. **Spiral Course Progression:**
   - Lộ trình 5 khóa học xoắn ốc liên tục nâng cấp và hoàn thiện **12 sản phẩm số cốt lõi (SP1 – SP12)** qua nhiều vòng lặp thực tế.
3. **Evidence Triangulation:**
   - **Graduation Promise:** *"Sau chương trình Sư Tử Con, con bạn chuyển hóa từ 'Người tiêu thụ công nghệ thụ động' thành 'Nhà kiến tạo số độc lập' (Independent Product Builder) — biết dùng AI như một trợ lý để giải quyết vấn đề thực tế, hiểu rõ vì sao mình làm, và tự chủ học tập trước mọi công nghệ mới."*
   - **Tam giác Bằng chứng Tốt nghiệp:**
     - **70% Simba Performance Evidence:** Hoàn thành ≥ 6/12 products (mỗi product ≥ 3 versions) đạt ≥ 80đ kèm 12 bài 4F Reflections đầy đủ.
     - **20% Conceptual Test:** Bài kiểm tra đánh giá cuối khoá đạt ≥ 80 điểm (gồm 4 tình huống thám tử sản phẩm và 1 Mini-Prompt Fix).
     - **10% Product Showcase & Oral:** Tham gia Product Showcase cuối khoá và hoàn thành phiên Oral Verification 3–5 phút trực tiếp cùng Mentor.

---

## Target Audience

Hệ thống được thiết kế chuyên biệt và phục vụ duy nhất một nhóm đối tượng: **Mentor / Giảng viên (Learning Coaches)**.

---

## Core JTBD

3 nhiệm vụ cốt lõi (Jobs To Be Done) của Mentor khi sử dụng hệ thống:

1. **JTBD 1 — Competency Clarity:** Khi chuẩn bị bài giảng, Mentor cần tra cứu nhanh định nghĩa chuẩn, ranh giới phạm vi (`Primary Focus`, `Supporting`, `Out of Scope`) và các chỉ báo cốt lõi của từng năng lực để đảm bảo dạy đúng trọng tâm, không bị lan man.
2. **JTBD 2 — Curriculum & Product Mapping:** Khi hướng dẫn 12 sản phẩm số (SP1 – SP12) qua 5 khóa học xoắn ốc, Mentor cần biết chính xác từng khóa học và từng sản phẩm đang tập trung rèn luyện những năng lực nào, ở cấp độ mục tiêu nào (Level 1–5).
3. **JTBD 3 — Exit Standards Alignment:** Khi kết thúc một khóa học hoặc chuẩn bị thẩm định tốt nghiệp, Mentor cần đối chiếu chuẩn đầu ra và bằng chứng thực tế theo mô hình Tam giác Bằng chứng để xác nhận học sinh đã làm chủ kiến thức và kỹ năng yêu cầu.

---

## Use Cases

- **UC1: Tra cứu Năng lực Cốt lõi & Phạm vi Dạy (`/ai-teen`):** Mentor tra cứu định nghĩa, chỉ báo hành vi nhị phân và lọc nhóm năng lực trọng tâm cần giảng dạy cho học sinh.
- **UC2: Tra cứu Mapping Khóa học & 12 Sản phẩm (`/course-progression`):** Mentor xem ma trận phân bổ năng lực theo 5 khóa học để biết chính xác từng bài thực hành (SP1–SP12) cần rèn luyện năng lực gì.
- **UC3: Thẩm định Chuẩn Đầu Ra & Tốt Nghiệp (`/graduation-plan`):** Mentor đối chiếu tiêu chuẩn hoàn thành theo Tam giác Bằng chứng 70/20/10 để đánh giá mức độ làm chủ sản phẩm của học sinh.
- **UC4: Đối chiếu Khung Tham chiếu Vĩ mô (`/`):** Mentor tra cứu 88 năng lực gốc của Conan1 khi cần mở rộng kiến thức hoặc đối chiếu với các chuẩn quốc tế.
- **UC5: Xử lý Hiểu lầm Sư phạm trong Lớp (`/faq`):** Mentor tra cứu các giải thích chuẩn xác để tháo gỡ 12 hiểu lầm nhận thức của học sinh trong quá trình học.

---

## Out of Scope

- **Không phải LMS Học sinh:** Không hỗ trợ học sinh đăng nhập tự do, không lưu trữ bài giảng video đại trà và không thu bài tập trực tiếp.
- **Không chấm điểm tự động AI Blackbox:** Mọi quyết định công nhận năng lực đều dựa trên thẩm định trực tiếp của Mentor.
- **Không thay thế Kho lưu trữ Source Code:** Không trực tiếp host mã nguồn hay cơ sở dữ liệu sản phẩm của học sinh (sử dụng liên kết repository bên ngoài).
- **Không phải Mạng xã hội/Kênh Chat:** Không cung cấp tính năng chat nội bộ hoặc tương tác cộng đồng.
