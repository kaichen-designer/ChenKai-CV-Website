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

// 作品集圖片燈箱功能
const portfolioItems = document.querySelectorAll(".portfolio-item");
const lightbox = document.getElementById("portfolioLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.querySelector(".portfolio-lightbox-close");

// 儲存原始圖片位置和尺寸
let originalImageData = null;

portfolioItems.forEach((item) => {
  const img = item.querySelector("img");
  if (!img) return;

  item.addEventListener("click", () => {
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
  });
});

// 關閉燈箱
function closeLightbox() {
  if (!lightbox.classList.contains("active")) return;
  
  // 同時觸發背景漸變和圖片縮小動畫
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

