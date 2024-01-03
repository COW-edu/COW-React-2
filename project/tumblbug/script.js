import {
  categories,
  banners,
  popular_projects,
  notable_projects,
} from "./data.js";

document.addEventListener("DOMContentLoaded", function () {
  const dropdownContainer = document.getElementById("dropdown-container");

  categories.forEach((category) => {
    const categoryLink = document.createElement("a");
    categoryLink.textContent = category;
    categoryLink.href = "#";
    dropdownContainer.appendChild(categoryLink);
  });

  const categorySection = document.querySelector(
    ".CategorySection-component__category"
  );
  categorySection.addEventListener("mouseenter", () => {
    dropdownContainer.style.display = "block";
  });

  categorySection.addEventListener("mouseleave", () => {
    dropdownContainer.style.display = "none";
  });
});

function updateCurrentTime() {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  document.getElementById("current-time").textContent =
    `${year}.${String(now.getMonth() + 1).padStart(2, "0")}` +
    `.${String(now.getDate()).padStart(2, "0")} ${String(
      now.getHours()
    ).padStart(2, "0")}` +
    `:${String(now.getMinutes()).padStart(2, "0")} 기준`;
  setTimeout(updateCurrentTime, 60000);
}

function renderPopularProjects() {
  const listElement = document.getElementById("popularProjectlist");
  listElement.innerHTML = "";
  popular_projects.forEach((project, index) => {
    const imageUrl = `./public/popular${index}.webp`;
    const rankingClass = index < 3 ? "top-ranking" : "regular-ranking";
    listElement.innerHTML += `
                <li class="project-item">
                  <img src="${imageUrl}" alt="${
      project.title
    }" class="project-image">
                  <div class="project-ranking ${rankingClass}">${
      index + 1
    }</div>
                  <div class="project-details">
                    <div class="project-details__top">
                      <a href="#" class="project-category">${
                        project.category
                      }</a>
                      <span>|</span>
                      <a href="#" class="project-creator">${project.creator}</a>
                    </div>
                    <p class="project-title">${project.title}</p>
                    <p class="project-rate">${
                      project.sponsorship_rate
                    }% 달성</p>
                  </div>
                </li>
              `;
  });
}

document.addEventListener("DOMContentLoaded", (event) => {
  updateCurrentTime();
  renderPopularProjects();
});

// 배너
let currentSlide = 0;
const slideInterval = 3000;

function createBanners() {
  const slidesContainer = document.querySelector(".banner-slides");
  banners.forEach((banner, index) => {
    const bannerUrl = `./public/banner${banner.id}.webp`;
    const slide = document.createElement("div");
    slide.className = "banner-slide";
    slide.innerHTML = `
          <img src="${bannerUrl}" alt="${banner.title}">
          <div class="banner-text" style="color: ${banner.text_color}">
            <h2>${banner.title}</h2>
            <p>${banner.sub_title}</p>
          </div>
        `;
    slidesContainer.appendChild(slide);
  });
}

function updateBannerIndex() {
  const indexElement = document.querySelector(".banner-index");
  indexElement.textContent = `${currentSlide + 1}/${banners.length}`;
}

function showSlide(index) {
  const slides = document.querySelectorAll(".banner-slide");
  slides.forEach((slide) => {
    slide.style.transform = `translateX(-${index * 100}%)`;
  });
  updateBannerIndex();
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % banners.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + banners.length) % banners.length;
  showSlide(currentSlide);
}

document.addEventListener("DOMContentLoaded", () => {
  createBanners();
  showSlide(currentSlide);
  setInterval(nextSlide, slideInterval);

  document
    .querySelector(".banner-nav.prev")
    .addEventListener("click", prevSlide);
  document
    .querySelector(".banner-nav.next")
    .addEventListener("click", nextSlide);
});
function renderNotableProjects() {
  const listElement = document.getElementById("notableProjectlist");
  listElement.innerHTML = "";
  notable_projects.forEach((project) => {
    listElement.innerHTML += `
        <li class="project-item notable-item">
          <a href="${project.url}" target="_blank">
            <img src="./public/notable${project.id}.webp" alt="${project.title}" class="project-image">
            <div class="project-details">
            <div class="project-details__top">
              <div class="project-category">${project.category}</div>
              <span>|</div>
              <div class="project-creator">${project.creator}</div>
              </div>
              <p class="project-title">${project.title}</p>
              <p class="project-rate">${project.sponsorship_rate}% 달성</p>
            </div>
          </a>
        </li>
      `;
  });
}
document.addEventListener("DOMContentLoaded", (event) => {
  renderNotableProjects();
});
