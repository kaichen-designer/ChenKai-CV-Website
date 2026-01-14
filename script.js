// 年份顯示
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear().toString();
}

// 平滑滾動到錨點
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    // 排除 logo 的刷新行為
    if (href === "#top" && this.classList.contains("logo")) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => {
        window.location.reload();
      }, 300);
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

// Logo 點擊回到首頁並刷新
const logoLink = document.querySelector(".logo");
logoLink?.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
  setTimeout(() => {
    window.location.reload();
  }, 300);
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

