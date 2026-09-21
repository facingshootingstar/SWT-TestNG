# TestNG — kịch bản thuyết trình 15 phút

**`TestNG.pptx`** — file để trình chiếu. 20 slide, có hoạt ảnh, chạy offline (ảnh nhúng sẵn).
Speaker notes nằm sẵn trong file: **Slide Show → Use Presenter View**.
Motion: shape tự fade-in khi mở slide (không cần bấm) · **Morph** làm số phần, thanh tiến độ,
số trang trượt giữa các slide · **Push** ở 3 chỗ chuyển phần. Morph cần PowerPoint 2016+;
máy cũ hơn tự lùi về fade, không vỡ.
`TestNG.pdf` là bản phẳng dự phòng. `testng-deck.html` là bản chạy trên trình duyệt (cần mạng).

> Slide tiếng Anh, lời nói tiếng Việt — thuật ngữ (annotation, dependency, group, parallel,
> listener, suite…) giữ nguyên tiếng Anh cho khớp chữ trên màn hình.

---

## Chia vai — không slide nào ghi tên ai

| Dấu hiệu | Phần I | Phần II | Phần III |
|---|---|---|---|
| Màu nhấn | **xanh dương** | **xanh teal** | **tím** |
| Số La Mã góc trên trái | I | II | III |
| Thanh tiến độ góc dưới trái | ▰▭▭ | ▭▰▭ | ▭▭▰ |
| Slide chia phần | I · What · History · Why | II · Pros · Cons · Highlight | III · Features · Users · Reference |

| Phần | Slide | Người nói | Nội dung | Thời lượng |
|---|---|---|---|---|
| — | 1 | Người 1 | Mở đầu | 0:00–0:20 |
| **I** | 2–8 | **Người 1** | What · History · Why | 0:20–5:00 |
| **II** | 9–14 | **Người 2** | Pros · Cons · Highlight | 5:00–10:15 |
| **III** | 15–20 | **Người 3** | Features · Users · Reference | 10:15–13:50 |
| — | | | *dự phòng* | 13:50–15:00 |

Đổi người ngay tại slide chia phần (2, 9, 15) — khán giả tự nhận ra nhờ đổi màu.

---

# PHẦN I — Người 1

### Slide 1 · Title — 20 giây
**Ý**
- Logo TestNG, tên đầy đủ: Test **N**ext **G**eneration.
- Cái tên đó đặt năm 2004 — và nó không hề nói quá.
- Không đọc mục lục; ba vạch màu dưới slide đã báo cấu trúc rồi.

**Nói**
> "TestNG — Test Next Generation. Cái tên này được đặt từ năm 2004. Trong mười lăm phút tới, chúng tôi sẽ cho thấy đó không phải là một cách nói quá."

---

### Slide 2 · Chia phần I — 10 giây
**Ý**
- Báo hiệu phần 1: TestNG là gì, từ đâu ra, vì sao phải có.
- Nói nhanh rồi qua slide, đừng dừng lâu.

**Nói**
> "Phần một: TestNG là gì, nó ra đời từ đâu, và vì sao nó buộc phải ra đời."

---

### Slide 3 · What — 40 giây
**Ý**
- Định nghĩa gọn: framework kiểm thử mã nguồn mở cho Java.
- Ba động từ: Write · Organise · **Orchestrate**.
- Framework nào cũng làm được hai từ đầu. Khác biệt của TestNG nằm ở từ thứ ba.
- Gieo từ "orchestrate" — nó là sợi chỉ xuyên suốt cả bài.

**Nói**
> "Một câu thôi: TestNG là một framework kiểm thử mã nguồn mở cho Java. Framework nào cũng làm được hai từ đầu — viết và tổ chức. Toàn bộ khác biệt của TestNG nằm ở từ thứ ba: **điều phối**."

---

### Slide 4 · Architecture — 55 giây
**Ý**
- Ba đầu vào: `testng.xml`, annotation trên code, data provider.
- Engine ở giữa không chỉ *chạy* test: nó **giải đồ thị phụ thuộc**, rồi **xếp lịch lên thread pool**, rồi mới chạy.
- Đầu ra đi qua listener — chỗ để cắm thêm (chụp màn hình, log, retry).
- Kết thúc ở report HTML / XML.
- Dùng tay chỉ theo luồng, đừng đọc chữ trong từng ô.

**Nói**
> "Ba đầu vào: một file XML, các annotation đặt trên code, và data provider. Engine ở giữa không chỉ chạy test — nó giải đồ thị phụ thuộc trước, xếp lịch lên thread pool, rồi mới thực thi. Đầu ra đi qua lớp listener, đây là chỗ chúng ta cắm thêm code vào, và kết thúc ở một report HTML hoặc XML."

---

### Slide 5 · 2004 — 30 giây
**Ý**
- Quay lại năm 2004.
- JUnit 3 gần như là lựa chọn duy nhất trong Java.
- Nó tốt — cho đúng việc nó được thiết kế.
- Vấn đề: người ta bắt đầu bắt nó làm việc khác.

**Nói**
> "Quay lại năm 2004. Lúc đó JUnit 3 gần như là lựa chọn duy nhất trong thế giới Java. Và nó tốt — tốt với đúng việc nó được thiết kế ra. Vấn đề là chúng ta đã bắt đầu bắt nó làm một việc khác."

---

### Slide 6 · "The method name was the API" — 45 giây
**Ý**
- JUnit 3: muốn khai báo một test thì phải đặt tên hàm bắt đầu bằng `test`.
- Quy ước đặt tên **chính là** API.
- Xoá 4 ký tự → test không fail, mà **biến mất**. Không ai biết.
- Nhấn mạnh chữ "lặng lẽ" — đây là kiểu hỏng nguy hiểm nhất trong kiểm thử.

**Nói**
> "Trong JUnit 3, muốn khai báo một test thì phải đặt tên hàm bắt đầu bằng chữ `test`. Một quy ước đặt tên chính là API. Xoá bốn chữ cái đi — test không fail, nó **biến mất**. Lặng lẽ. Và không ai biết."

---

### Slide 7 · Cédric Beust — 45 giây
**Ý**
- Tác giả TestNG.
- Không gửi patch cho JUnit — viết lại từ đầu.
- Lấy cái hay của JUnit + NUnit (bên .NET).
- Thiết kế cho thứ JUnit không nhắm tới: **integration testing**.
- Nói miệng, không có trên slide: JUnit 4 (bản dùng annotation) mãi 2006 mới ra — TestNG đi trước 2 năm.

**Nói**
> "Cédric Beust. Ông không gửi một bản vá cho JUnit — ông viết lại từ đầu, lấy cái hay nhất của JUnit và của NUnit bên .NET, rồi thiết kế cho đúng thứ mà JUnit chưa bao giờ nhắm tới: integration testing. Để so sánh: JUnit 4, tức bản dùng annotation, mãi đến năm 2006 mới ra."

---

### Slide 8 · Three walls — 55 giây · hết phần I
**Ý**
- Ba bức tường thật sự của JUnit 3:
  1. **Không có group** — muốn chạy riêng bộ smoke test? Không có cơ chế.
  2. **Không có dependency** — login fail thì checkout vẫn chạy, rồi cũng fail theo.
  3. **Không có parameter** — 10 bộ dữ liệu = 10 hàm copy-paste.
- Gốc rễ: JUnit 3 giả định mỗi test là một hòn đảo. Integration test thì không.
- Khoảng trống đó chính là lý do TestNG tồn tại.
- Nói xong → **đổi người**.

**Nói**
> "Ba bức tường thật sự là đây: không group được, không khai báo được phụ thuộc, không truyền được tham số. JUnit 3 mặc định rằng mỗi test là một hòn đảo. Nhưng integration test thì không sống trên đảo. Chính khoảng trống đó là toàn bộ lý do TestNG tồn tại."

---

# PHẦN II — Người 2

### Slide 9 · Chia phần II — 10 giây
**Ý**
- Báo hiệu phần 2: được gì, mất gì, và điều đáng nhớ nhất.

**Nói**
> "Phần hai: nó cho ta được gì, bắt ta trả giá gì, và một điều đáng nhớ nhất."

---

### Slide 10 · Four things you get — 30 giây
**Ý**
- Không liệt kê 20 tính năng. Gom thành 4 chữ:
  - **Order** — lifecycle, priority, dependsOn
  - **Data** — @DataProvider, @Factory
  - **Speed** — chạy song song có sẵn trong core
  - **Control** — testng.xml, listener, CI
- Báo trước: sẽ chỉ đi sâu 2 cái.

**Nói**
> "Bốn thứ, không phải hai mươi tính năng: thứ tự, dữ liệu, tốc độ, và quyền kiểm soát. Tôi sẽ đi sâu vào hai trong số đó."

---

### Slide 11 · One real failure, not three — 60 giây
**Ý**
- Kịch bản: `login` hỏng.
- **Không có dependency**: cart fail, checkout fail → 3 báo cáo đỏ, mất 20 phút mới tìm ra chỉ có 1 nguyên nhân.
- **Có `dependsOnMethods`**: TestNG biết đồ thị → 2 test kia bị đánh **SKIPPED**, không phải FAIL.
- Kết quả: 1 báo cáo đỏ, 1 nguyên nhân.
- Câu chốt: skip không phải là bỏ qua test — skip là **thông tin**.

**Nói**
> "Giả sử login hỏng. Không có dependency thì cart fail, checkout fail — ba báo cáo đỏ, và ta mất hai mươi phút để phát hiện ra thật ra chỉ có một nguyên nhân. Có `dependsOnMethods`, TestNG biết đồ thị phụ thuộc: hai test còn lại được đánh dấu SKIPPED. Một báo cáo đỏ. Một nguyên nhân. **Một test bị skip không phải là test bị bỏ qua — skip là thông tin.**"

---

### Slide 12 · 40 minutes → 10 — 55 giây
**Ý**
- Chạy song song nằm trong core, không cần plugin.
- 4 suite: tuần tự 40 phút → 4 thread còn 10 phút.
- Chọn được mức chia: method · class · test · instance.
- **Nói thẳng phần giới hạn**: chỉ đúng khi test không chia sẻ state. Với Selenium nghĩa là phải dùng `ThreadLocal` WebDriver. Nói câu này cho thấy mình có dùng thật.

**Nói**
> "Chạy song song nằm ngay trong core, không cần plugin. Bốn suite chạy tuần tự mất bốn mươi phút, chia trên bốn thread còn mười phút. Và ta chọn được mức chia: theo method, theo class, theo test, hay theo instance. Một lưu ý: điều này chỉ đúng khi các test không dùng chung state — với Selenium thì nghĩa là phải dùng `ThreadLocal` WebDriver."

---

### Slide 13 · What it costs — 60 giây
**Ý**
- Phần thành thật. Sức mạnh có giá của nó.
- **Complexity**: group, dependency, factory, listener, XML — nhiều cơ chế = đường học dốc. Dùng dependency sai thì lỗi thật bị chôn dưới một chuỗi skip.
- **Overkill cho unit test**: một dependency nguyên khối, so với JUnit 5 chia module (Platform / Jupiter / Vintage). Nếu chỉ viết unit test nhanh và độc lập thì cả bộ máy orchestration là thừa — và Spring Boot mặc định dùng JUnit 5.
- Slide này mua lại uy tín cho mọi thứ nói trước đó. **Đừng nói vội.**

**Nói**
> "Bây giờ đến phần thành thật. Sức mạnh đó có giá của nó. Càng nhiều cơ chế thì càng nhiều thứ phải học — và dependency dùng sai sẽ chôn lỗi thật dưới cả một chuỗi skip. Còn nếu ta chỉ viết unit test độc lập và nhanh, thì cả bộ máy điều phối này là gánh nặng thừa: JUnit 5 nhẹ hơn, chia module, và là mặc định của Spring Boot."

---

### Slide 14 · The real win: getting copied — 65 giây · hết phần II
**Ý**
- Slide đáng nhớ nhất cả bài.
- Không đo framework bằng thị phần — đo bằng **thứ mà đối thủ buộc phải sao chép**.
- 2004: TestNG ra mắt với annotation, group, dependency, parallel.
- 2006: JUnit 4 thêm annotation.
- 2017: JUnit 5 thêm `@ParameterizedTest` và `@Tag` (chính là group).
- 2018: JUnit 5.3 thêm chạy song song.
- 14 năm để bắt kịp danh sách tính năng bản 1.0.
- Nói chậm. **Dừng 2 giây** sau câu cuối. Rồi đổi người.

**Nói**
> "Đây là slide đáng nhớ nhất. Ta không đo một framework bằng thị phần — ta đo nó bằng những thứ mà đối thủ buộc phải sao chép. Năm 2004, TestNG ra mắt với annotation, group, dependency và chạy song song. Năm 2006, JUnit 4 thêm annotation. Năm 2017, JUnit 5 thêm parameterized test và tag — mà tag chính là group. Năm 2018, thêm chạy song song. **Mười bốn năm, để bắt kịp danh sách tính năng của bản 1.0.**"

---

# PHẦN III — Người 3

### Slide 15 · Chia phần III — 10 giây
**Ý**
- Báo hiệu phần 3: trong hộp có gì, ai dùng, đi tiếp ở đâu.

**Nói**
> "Phần ba: trong hộp thực sự có gì, ai đang dùng nó, và đi tiếp ở đâu."

---

### Slide 16 · Annotation-driven lifecycle — 60 giây
**Ý**
- Lifecycle chạy bằng annotation, ở **4 mức**: suite → test → class → method.
- Nhờ vậy setup/teardown là khai báo, không phải copy-paste.
- Trên nền đó có thêm:
  - **Groups** — smoke, regression
  - **@DataProvider** — một test, nhiều bộ dữ liệu
  - **@Factory** — nhiều instance từ một class
  - **Listeners** — móc vào mọi sự kiện: screenshot, log, retry
- Chi tiết nên nói (dân chuyên môn đánh giá cao): **@DataProvider tham số hoá ở mức method, @Factory tham số hoá ở mức class.**

**Nói**
> "Lifecycle được điều khiển bằng annotation, ở bốn mức: suite, test, class, method. Nhờ vậy setup và teardown là khai báo, chứ không phải copy-paste. Trên nền đó ta có group, có DataProvider cho một test chạy với nhiều bộ dữ liệu, có Factory để tạo nhiều instance từ một class, và listener móc vào mọi sự kiện. Xin lưu ý một điểm phân biệt: DataProvider tham số hoá ở mức method, còn Factory tham số hoá ở mức class."

---

### Slide 17 · Change the run, not the code — 50 giây
**Ý**
- `testng.xml` kéo *chiến lược chạy* ra khỏi code Java.
- Cấu trúc: Suite → Test → Class.
- Pipeline mỗi commit: chỉ chạy group smoke. Pipeline ban đêm: chạy full regression.
- Cùng một codebase, khác file XML — không đụng vào logic test, không build lại.
- Bắc cầu sang CI: chạy được từ Maven, Gradle và command line → cắm thẳng vào Jenkins hay GitHub Actions.

**Nói**
> "File `testng.xml` kéo chiến lược chạy ra khỏi code Java. Pipeline chạy mỗi lần commit thì chỉ chạy group smoke; pipeline ban đêm chạy full regression. Cùng một codebase, chỉ khác file XML — không đụng vào logic test, không build lại. Và nó chạy được từ Maven, Gradle và command line, nên cắm thẳng vào bất kỳ hệ CI nào."

---

### Slide 18 · Who uses it — 50 giây
**Ý**
- **Automation / QA engineer** — mảng chính, gần như mặc định trong thế giới Selenium.
- **Developer** — integration test và service-level test.
- **DevOps** — chặn pipeline theo group.
- Hệ sinh thái: Maven, Gradle, Jenkins, GitHub Actions, GitLab, IntelliJ, Eclipse, Docker.
- **Cố ý không nêu tên công ty khách hàng** — không có nguồn kiểm chứng được, mà chuyên gia sẽ hỏi nguồn.

**Nói**
> "Ai tìm đến TestNG? Trước hết là kỹ sư automation và QA — nó gần như là mặc định trong thế giới Selenium. Rồi đến developer, cho integration test và service-level test. Và DevOps, để chặn pipeline theo group. Nó cắm được vào Maven, Gradle, Jenkins, GitHub Actions, GitLab, và cả hai IDE lớn."

---

### Slide 19 · Still shipping today — 40 giây
**Ý**
- Chứng minh dự án còn sống, không phải đồ cổ:
  - bản hiện tại trên Maven Central
  - commit gần nhất: hôm trước ngày dựng deck
  - 218 người đóng góp
  - giấy phép Apache 2.0
  - Java 11 trở lên
- Đây là số liệu thật, có ghi ngày chụp trên slide. Ai hỏi nguồn → badge shields.io trên repo chính thức.
- Tài liệu: testng.org

**Nói**
> "Và nó không phải đồ trưng bày trong bảo tàng: bản phát hành hiện tại có trên Maven Central, commit gần nhất là ngay hôm trước ngày chúng tôi dựng bộ slide này, hai trăm mười tám người đóng góp, giấy phép Apache 2.0, chạy từ Java 11 trở lên. Tài liệu ở testng.org."

---

### Slide 20 · Close — 25 giây
**Ý**
- Vòng lại đầu bài: 2004, một người nhìn JUnit 3 và quyết định viết lại thay vì vá.
- Thứ ra đời không phải test runner — mà là test **orchestrator**.
- Vì vậy cái tên "Next Generation" đến giờ vẫn đúng.
- Dừng 2 giây rồi mới nói "Xin cảm ơn". Không cần slide Q&A.

**Nói**
> "Hai mươi hai năm trước, có một người nhìn vào JUnit 3 và quyết định không vá nó, mà viết lại. Thứ ra đời không phải là một test runner — đó là một test **orchestrator**. Đó là lý do cái tên Next Generation đến giờ vẫn còn đúng. Xin cảm ơn."

---

## Ba câu phải nói đúng từng chữ

1. *"Xoá bốn chữ cái đi — test không fail, nó biến mất. Lặng lẽ."* — slide 6
2. *"Một test bị skip không phải là test bị bỏ qua. Skip là thông tin."* — slide 11
3. *"Mười bốn năm, để bắt kịp danh sách tính năng của bản 1.0."* — slide 14, **dừng 2 giây sau câu này**

---

## Chuẩn bị hỏi đáp

- **"Chạy song song có thật sự an toàn không?"** Chỉ khi test không chia sẻ state. Với Selenium nghĩa là `ThreadLocal` WebDriver. `@DataProvider(parallel = true)` chạy song song các bộ dữ liệu, nhưng object test dùng chung giữa các method trong class — field mutable là nguồn flaky phổ biến nhất.
- **"@Factory khác @DataProvider chỗ nào?"** `@DataProvider` tham số hoá ở mức **method**; `@Factory` tạo nhiều **instance** của cả class lúc runtime, tức tham số hoá ở mức class.
- **"Test phụ thuộc nhau chẳng phải anti-pattern sao?"** Với unit test thì đúng — phải độc lập. Với E2E thì phụ thuộc là có thật: không login thì không checkout được. `dependsOnMethods` chỉ khai báo một sự thật đã tồn tại. Lạm dụng nó trong unit test mới là anti-pattern.
- **"Còn được bảo trì không?"** Còn — đọc thẳng số trên slide 19, đừng đọc từ trí nhớ.
- **"Thị phần bao nhiêu?"** Đừng đưa con số không dẫn nguồn được. Trả lời theo địa hạt: TestNG là mặc định trên thực tế trong mảng Selenium/automation; JUnit là mặc định cho unit test và trong Spring.

---

## Đã sửa gì so với bản nháp của nhóm

- **JUnit 5 ra năm 2017**, không phải 2026 (JUnit 4: 2006; JUnit 5 chạy song song: bản 5.3, 2018). Timeline sau khi sửa trở thành slide mạnh nhất cả bài.
- **Bỏ "Amazon, Apple, Microsoft, Google"** và con số "~35% thị phần" — không có nguồn. Thay bằng số liệu dự án kiểm chứng được ở slide 19.
- **Bỏ toàn bộ phần giải thích "unit test là gì / test case là gì"** — khán giả không cần.
- Gộp ba bản nháp chồng nhau thành một mạch; mỗi slide giờ thuộc đúng một người.
