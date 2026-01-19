// 年份顯示
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear().toString();
}

// 平滑滾動到錨點
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    // Logo 點擊滾動到封面頁
    if (href === "#top" && this.classList.contains("logo")) {
      e.preventDefault();
      const target = document.querySelector("#top");
      if (target) {
        const offsetTop = target.offsetTop - 100; // 考慮導航欄高度
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
      return;
    }
    
    // 其他錨點連結使用平滑滾動
    if (href !== "#" && href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offsetTop = target.offsetTop - 100; // 考慮導航欄高度
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    }
  });
});

// 檢查照片是否載入成功
const profilePhoto = document.querySelector(".profile-photo");
const avatarContainer = document.querySelector(".avatar-container");

if (profilePhoto && avatarContainer) {
  profilePhoto.addEventListener("load", () => {
    profilePhoto.classList.add("loaded");
    avatarContainer.classList.remove("no-image");
  });

  profilePhoto.addEventListener("error", () => {
    avatarContainer.classList.add("no-image");
    console.warn("照片載入失敗！請確認 profile-photo.jpg 檔案是否存在於專案根目錄。");
  });

  // 如果圖片已經載入（從快取），立即檢查
  if (profilePhoto.complete && profilePhoto.naturalHeight !== 0) {
    profilePhoto.classList.add("loaded");
    avatarContainer.classList.remove("no-image");
  } else if (profilePhoto.complete) {
    // 圖片載入完成但高度為 0，表示載入失敗
    avatarContainer.classList.add("no-image");
  } else {
    // 圖片尚未載入，先顯示提示
    avatarContainer.classList.add("no-image");
  }
}

// 深淺色主題切換（純前端，使用 localStorage 記錄）
const themeToggle = document.querySelector(".theme-toggle");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const storedTheme = localStorage.getItem("ck-theme");

if (storedTheme === "light" || storedTheme === "dark") {
  document.body.classList.toggle("light", storedTheme === "light");
} else if (!prefersDark) {
  document.body.classList.add("light");
}

function updateThemeIcon() {
  if (!themeToggle) return;
  const icon = themeToggle.querySelector("i");
  if (!icon) return;
  if (document.body.classList.contains("light")) {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  } else {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  }
}

updateThemeIcon();

themeToggle?.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const isLight = document.body.classList.contains("light");
  localStorage.setItem("ck-theme", isLight ? "light" : "dark");
  updateThemeIcon();
});

// Scroll Reveal 動畫（IntersectionObserver）
const revealEls = document.querySelectorAll(".reveal-on-scroll");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("is-visible"));
}

// Contact 表單前端假送出（不真的送出，只顯示訊息）
const contactForm = document.querySelector(".contact-form");
const statusEl = document.querySelector(".form-status");

contactForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!statusEl) return;

  statusEl.textContent = "感謝您的訊息，我會儘快回覆！";

  contactForm.classList.add("is-sent");

  const formData = new FormData(contactForm);
  formData.forEach((_, key) => {
    const field = contactForm.querySelector(`[name="${key}"]`);
    if (field && field instanceof HTMLInputElement) {
      field.value = "";
    }
  });

  const messageField = contactForm.querySelector("#message");
  if (messageField && messageField instanceof HTMLTextAreaElement) {
    messageField.value = "";
  }

  setTimeout(() => {
    statusEl.textContent = "";
    contactForm.classList.remove("is-sent");
  }, 2600);
});

// 自動調整訊息欄高度
const messageTextarea = document.getElementById("message");
if (messageTextarea) {
  // 自動調整高度的函數
  function autoResizeTextarea() {
    messageTextarea.style.height = "auto";
    messageTextarea.style.height = `${messageTextarea.scrollHeight}px`;
  }
  
  // 監聽輸入事件
  messageTextarea.addEventListener("input", autoResizeTextarea);
  
  // 初始化高度
  autoResizeTextarea();
  
  // 表單提交後重置高度
  contactForm?.addEventListener("submit", () => {
    setTimeout(() => {
      messageTextarea.style.height = "auto";
      autoResizeTextarea();
    }, 100);
  });
}

// 可摺疊內容項目功能
const contentItems = document.querySelectorAll(".content-item");
contentItems.forEach((item) => {
  const header = item.querySelector(".content-item-header");
  if (header) {
    header.addEventListener("click", () => {
      item.classList.toggle("active");
    });
  }
});

// Profile 收合式區塊功能
const profileAccordionItems = document.querySelectorAll(".profile-accordion-item");
profileAccordionItems.forEach((item) => {
  const header = item.querySelector(".profile-accordion-header");
  if (header) {
    header.addEventListener("click", () => {
      // 關閉其他已打開的項目（可選：如果希望同時只打開一個）
      // profileAccordionItems.forEach((otherItem) => {
      //   if (otherItem !== item && otherItem.classList.contains("active")) {
      //     otherItem.classList.remove("active");
      //   }
      // });
      item.classList.toggle("active");
    });
  }
});

// Vision 收合式區塊功能
const visionAccordionItems = document.querySelectorAll(".vision-accordion-item");
visionAccordionItems.forEach((item) => {
  const header = item.querySelector(".vision-accordion-header");
  if (header) {
    header.addEventListener("click", () => {
      item.classList.toggle("active");
    });
  }
});

// 作品集圖片/PDF燈箱功能
const portfolioItems = document.querySelectorAll(".portfolio-item");
const lightbox = document.getElementById("portfolioLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxPdf = document.getElementById("lightboxPdf");
const lightboxClose = document.querySelector(".portfolio-lightbox-close");

// 儲存原始圖片位置和尺寸
let originalImageData = null;
let isPdfView = false;

portfolioItems.forEach((item) => {
  const img = item.querySelector("img");
  if (!img) return;

  item.addEventListener("click", () => {
    const pdfFile = item.getAttribute("data-pdf");
    
    // 如果有 PDF 文件，顯示 PDF
    if (pdfFile) {
      isPdfView = true;
      lightboxImage.style.display = "none";
      lightboxPdf.style.display = "block";
      
      // 添加參數使 PDF 自動適應視窗大小，完整顯示首頁
      // 使用多種參數組合以確保在不同瀏覽器中都能正常工作
      // #page=1: 顯示第一頁
      // #zoom=page-fit: 適應頁面大小（Chrome/Edge）
      // #view=FitH: 適應寬度（Firefox）
      // #toolbar=1: 顯示工具欄
      const pdfUrl = `${pdfFile}#page=1&zoom=page-fit&view=FitH&toolbar=1`;
      lightboxPdf.src = pdfUrl;
      
      // 顯示燈箱
      lightbox.classList.remove("closing");
      lightbox.classList.add("active");
      
      // 防止背景滾動
      document.body.style.overflow = "hidden";
      
      // 等待 iframe 載入後，嘗試調整縮放（備用方案）
      lightboxPdf.onload = function() {
        try {
          // 某些瀏覽器可能需要通過 iframe 內容來調整
          // 但由於跨域限制，這可能無法直接實現
          // 主要依賴 URL 參數來控制顯示
        } catch (e) {
          // 忽略跨域錯誤
        }
      };
    } else {
      // 否則顯示圖片（原有功能）
      isPdfView = false;
      const imgSrc = img.src;
      const imgAlt = img.alt;
      
      // 儲存原始圖片的位置和尺寸
      const rect = img.getBoundingClientRect();
      originalImageData = {
        src: imgSrc,
        alt: imgAlt,
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height,
      };

      // 設置燈箱圖片
      lightboxPdf.style.display = "none";
      lightboxImage.style.display = "block";
      lightboxImage.src = imgSrc;
      lightboxImage.alt = imgAlt;
      
      // 初始位置設置為原始圖片位置（用於動畫）
      lightboxImage.style.position = "fixed";
      lightboxImage.style.left = `${rect.left}px`;
      lightboxImage.style.top = `${rect.top}px`;
      lightboxImage.style.width = `${rect.width}px`;
      lightboxImage.style.height = `${rect.height}px`;
      
      // 顯示燈箱
      lightbox.classList.remove("closing");
      lightbox.classList.add("active");
      
      // 強制重排，然後觸發動畫
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          lightboxImage.style.position = "";
          lightboxImage.style.left = "";
          lightboxImage.style.top = "";
          lightboxImage.style.width = "";
          lightboxImage.style.height = "";
          lightboxImage.classList.remove("closing");
        });
      });
      
      // 防止背景滾動
      document.body.style.overflow = "hidden";
    }
  });
});

// 關閉燈箱
function closeLightbox() {
  if (!lightbox.classList.contains("active")) return;
  
  if (isPdfView) {
    // PDF 模式：直接關閉
    lightbox.classList.add("closing");
    setTimeout(() => {
      lightbox.classList.remove("active", "closing");
      lightboxPdf.src = "";
      lightboxPdf.style.display = "none";
      document.body.style.overflow = "";
      isPdfView = false;
    }, 400);
  } else {
    // 圖片模式：縮小動畫
    lightbox.classList.add("closing");
    lightboxImage.classList.add("closing");
    
    // 設置縮小動畫的目標位置和尺寸
    if (originalImageData) {
      lightboxImage.style.position = "fixed";
      lightboxImage.style.left = `${originalImageData.x}px`;
      lightboxImage.style.top = `${originalImageData.y}px`;
      lightboxImage.style.width = `${originalImageData.width}px`;
      lightboxImage.style.height = `${originalImageData.height}px`;
    }
    
    // 等待動畫完成後隱藏燈箱
    setTimeout(() => {
      lightbox.classList.remove("active", "closing");
      lightboxImage.style.position = "";
      lightboxImage.style.left = "";
      lightboxImage.style.top = "";
      lightboxImage.style.width = "";
      lightboxImage.style.height = "";
      lightboxImage.classList.remove("closing");
      document.body.style.overflow = "";
      originalImageData = null;
    }, 400);
  }
}

// 點擊關閉按鈕
lightboxClose?.addEventListener("click", closeLightbox);

// 點擊背景關閉
lightbox?.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// ESC 鍵關閉
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox.classList.contains("active")) {
    closeLightbox();
  }
});

