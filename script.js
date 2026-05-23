// 1. Переключение цвета блока по свитчу
const switchCheckbox = document.getElementById("colorSwitch");
const gradientBlock = document.getElementById("gradient-switchable");

if (switchCheckbox && gradientBlock) {
  switchCheckbox.addEventListener("change", () => {
    if (switchCheckbox.checked) {
      gradientBlock.style.background = "var(--color2-main)";
    } else {
      gradientBlock.style.background = "var(--gradient-block)";
    }
  });
}

// 2. Слайдер
const sliderContainer = document.getElementById("sliderCards");
const prevBtn = document.querySelector(".slider-prev");
const nextBtn = document.querySelector(".slider-next");

if (sliderContainer && prevBtn && nextBtn) {
  const scrollStep = 320;

  prevBtn.addEventListener("click", () => {
    sliderContainer.scrollBy({ left: -scrollStep, behavior: "smooth" });
  });
  nextBtn.addEventListener("click", () => {
    sliderContainer.scrollBy({ left: scrollStep, behavior: "smooth" });
  });
}

// Drag to scroll
let isDragging = false;
let startX;
let scrollLeft;

sliderContainer.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.pageX - sliderContainer.offsetLeft;
  scrollLeft = sliderContainer.scrollLeft;
  sliderContainer.style.cursor = "grabbing";
});

window.addEventListener("mouseup", () => {
  isDragging = false;
  sliderContainer.style.cursor = "grab";
});

sliderContainer.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  const x = e.pageX - sliderContainer.offsetLeft;
  const walk = (x - startX) * 1.5; // скорость прокрутки
  sliderContainer.scrollLeft = scrollLeft - walk;
});

// 3. Аккордеон (раскрытие/закрытие)
const accordions = document.querySelectorAll(".container__column__accordion");
accordions.forEach((accordion) => {
  const icon = accordion.querySelector(".top__button__icon");
  const content = accordion.querySelector(".accordion__bottom");

  // Скрыть все ответы по умолчанию
  content.style.display = "none";

  accordion.addEventListener("click", () => {
    if (content.style.display === "block") {
      content.style.display = "none";
      icon.style.transform = "rotate(0deg)";
    } else {
      content.style.display = "block";
      icon.style.transform = "rotate(180deg)";
    }
  });
});

// 4. Маски ввода (простые маски + валидация)
const nameInput = document.getElementById("name");
if (nameInput) {
  nameInput.addEventListener("input", (e) => {
    let value = e.target.value;

    value = value.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, ""); // Разрешённые символы (буквы)

    // Преобразуем каждое слово: первая буква заглавная (в начале строки или после пробела), остальные строчные
    value = value.replace(
      /(^|\s)([a-zA-Zа-яА-ЯёЁ])/g,
      (match, separator, letter) => {
        return separator + letter.toUpperCase();
      },
    );

    e.target.value = value;
  });
}

const phoneInput = document.getElementById("phone");
if (phoneInput) {
  phoneInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) {
      value = value.slice(0, 11);
    }

    let formatted = "";
    if (value.length > 0) formatted = "+7";
    if (value.length > 1) formatted += ` (${value.slice(1, 4)}`;
    if (value.length >= 5) formatted += `) ${value.slice(4, 7)}`;
    if (value.length >= 8) formatted += `-${value.slice(7, 9)}`;
    if (value.length >= 10) formatted += `-${value.slice(9, 11)}`;
    e.target.value = formatted;
  });
}

const emailInput = document.getElementById("email");
if (emailInput) {
  emailInput.addEventListener("input", (e) => {
    let value = e.target.value;
    value = value.replace(/[^a-zA-Z0-9@._-]/g, ""); // Разрешённые символы (буквы)

    // Если более одного @ – убираем лишние
    const atCount = (value.match(/@/g) || []).length;
    if (atCount > 1) {
      value = value.replace(/@/, "");
    }
    e.target.value = value;
  });
}

const form = document.querySelector(".form__body");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const isChecked = document.getElementById("checkboxForm").checked;

  // Валидация
  if (!isChecked) {
    alert("Пожалуйста, отметье чек-бокс.");
    return;
  }

  alert("Форма успешно отравлена!");
  form.reset(); // очистка формы
});

// 5. Скролл до формы и следующего блока
const scrollFormBtn = document.querySelector(
  ".first-screen__cta__buttons--scroll--form",
);
const scrollNextBtn = document.querySelector(
  ".first-screen__cta__buttons--scroll--next",
);
const formSection = document.querySelector(".main__form");
const sliderSection = document.querySelector(".main__slider");

if (scrollFormBtn && formSection) {
  scrollFormBtn.addEventListener("click", () => {
    formSection.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}
if (scrollNextBtn && sliderSection) {
  scrollNextBtn.addEventListener("click", () => {
    sliderSection.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

// 6. Модальное меню (раскрытие/закрытие)
const modalMenu = document.querySelector(".header__modal-menu");
const burgerBtn = document.querySelector(".header__button");
const burgerIcon = burgerBtn?.querySelector(".header__button__icon");

const closeIconSrc = "images/svg/close-icon.svg";
const burgerIconSrc = "images/svg/burger.svg";

function openModal() {
  modalMenu.classList.add("open");
  document.body.style.overflow = "hidden"; // блокируем прокрутку фона

  if (burgerIcon) burgerIcon.src = closeIconSrc;
}

function closeModal() {
  modalMenu.classList.remove("open");
  document.body.style.overflow = "";

  if (burgerIcon) burgerIcon.src = burgerIconSrc;
}

if (burgerBtn) {
  burgerBtn.addEventListener("click", () => {
    // if (document.body.style.overflow === "hidden") {
    //   closeModal();
    // } else {
    //   openModal();
    // }
    if (modalMenu.classList.contains("open")) {
      closeModal();
    } else {
      openModal();
    }
  });
}

// При клике на кнопки меню – скролл к секции и закрытие
const menuButtons = document.querySelectorAll(".modal-menu__button");
const sectionsMap = {
  "Первый экран": ".main__first-screen",
  "\Слайдер": "#slider",
  "Интересные ответы": ".main__faq",
  "Форма обратной связи": "#form",
};

menuButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const sectionName = btn.textContent.trim();
    const targetSelector = sectionsMap[sectionName];

    if (targetSelector) {
      const target = document.querySelector(targetSelector);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        closeModal();
      }
    }
  });
});
