const form = document.getElementById("form");
const countryInput = document.getElementById("countryInput");
const universitiesContainer = document.getElementById("universities");
const status = document.getElementById("status");

const DEFAULT_COUNTRY = "Uzbekistan";

async function fetchUniversities(country) {
  if (!country) {
    status.textContent = "Введите страну";
    return;
  }

  status.textContent = "Loading...";
  universitiesContainer.innerHTML = "";

  try {
    const response = await fetch(
      `https://universities.hipolabs.com/search?country=${country}`
    );
    const data = await response.json();

    if (data.length === 0) {
      status.textContent = "Ничего не найдено";
      return;
    }

    status.textContent = "";

    universitiesContainer.innerHTML = data
      .map(
        (u) => `
        <div class="card">
          <h3>${u.name}</h3>
          <p><strong>Country:</strong> ${u.country}</p>
          <a href="${u.web_pages[0]}" target="_blank">
            ${u.web_pages[0]}
          </a>
        </div>
      `
      )
      .join("");
  } catch (e) {
    status.textContent = "Ошибка загрузки";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetchUniversities(countryInput.value.trim());
});

window.addEventListener("DOMContentLoaded", () => {
  countryInput.value = DEFAULT_COUNTRY;
  fetchUniversities(DEFAULT_COUNTRY);
});
