"use strict";

var menuIcon = document.querySelector('#menu-icon');
var navbar = document.querySelector('.navbar');

menuIcon.onclick = function () {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
};

var sections = document.querySelectorAll('section');
var navLinks = document.querySelectorAll('header nav a');

window.onscroll = function () {
  sections.forEach(function (sec) {
    var top = window.scrollY;
    var offset = sec.offsetTop - 150;
    var height = sec.offsetHeight;
    var id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach(function (links) {
        links.classList.remove('active');
        document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
      });
    }

    ;
  });
  var header = document.querySelector('header');
  header.classList.toggle('sticky', window.scrollY > 100);
  header.classList.toggle('sticky', window.scrollY > 100);
  menuIcon.classList.remove('bx-x');
  navLinks.classList.remove('active');
};

ScrollReveal({
  distance: '80px',
  duration: 2000,
  delay: 200
});
ScrollReveal().reveal('.home-content, .heading', {
  origin: 'top'
});
ScrollReveal().reveal('.home-img, .services-container, .profile-box, .contact form', {
  origin: 'bottom'
});
ScrollReveal().reveal('.home-content h1, .about-img', {
  origin: 'left'
});
ScrollReveal().reveal('.home-content p, .about-content', {
  delay: 500
});
var typed = new Typed('.multiple-text', {
  strings: ['Welcome to GearShifts where the cars knockout you!', 'AI in cars', 'Driving Innovation', 'Urban Motion', 'Electric Future, Now', 'Performance. Precision. Power.'],
  typeSpeed: 50,
  backSpeed: 50,
  backdelay: 800,
  loop: true
});
var openBtn = document.getElementById('open-ai-modal');
var modal = document.getElementById('ai-modal');
var closeBtn = document.getElementById('close-ai-modal');
var aiResponse = document.getElementById('ai-response');
var aiPromptInput = document.getElementById('ai-user-prompt');
var aiGenerateBtn = document.getElementById('ai-generate-btn');

openBtn.onclick = function () {
  modal.style.display = "block";
  aiResponse.innerHTML = "<p>Type your question and click Generate to get AI-powered insights!</p>";
  aiPromptInput.value = "";
};

var defaultPrompt = "Provide a structured overview of the latest trends in automotive technology. \nFormat your answer with:\n- Headings for each major trend\n- Bullet points for key features or facts under each trend\n- Short, clear explanations for each point\nCover topics like AI in cars, electrification, connectivity, and safety systems.";

aiGenerateBtn.onclick = function _callee() {
  var prompt, apiKey, response, data;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          prompt = aiPromptInput.value.trim() || defaultPrompt;
          aiResponse.innerHTML = "<p><em>Generating AI insights...</em></p>"; // Gemini API call

          apiKey = "AIzaSyCG9c97r769fcAXlLErJuVizpoXTUV3DWM";
          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap(fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + apiKey, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              contents: [{
                parts: [{
                  text: prompt
                }]
              }]
            })
          }));

        case 6:
          response = _context.sent;
          _context.next = 9;
          return regeneratorRuntime.awrap(response.json());

        case 9:
          data = _context.sent;

          if (data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
            aiResponse.innerHTML = "<p>" + data.candidates[0].content.parts.map(function (p) {
              return p.text;
            }).join("<br>") + "</p>";
          } else {
            aiResponse.innerHTML = "<p>Sorry, the AI could not generate a response at this time.</p>";
          }

          _context.next = 16;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](3);
          aiResponse.innerHTML = "<p>Error: " + _context.t0.message + "</p>";

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 13]]);
};

closeBtn.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}; // --- Automotive News Section ---


var newsCards = document.getElementById('news-cards'); // You need a news API key. Example uses NewsAPI.org (https://newsapi.org/)
// Replace 'YOUR_NEWSAPI_KEY' with your actual key.

var NEWS_API_KEY = '8ddde825c59e4b378dd13431f0f15259';
var NEWS_API_URL = "https://newsapi.org/v2/everything?q=automobile OR car OR automotive&language=en&sortBy=publishedAt&pageSize=6&apiKey=".concat(NEWS_API_KEY);

function fetchNews() {
  var res, data;
  return regeneratorRuntime.async(function fetchNews$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (newsCards) {
            _context2.next = 2;
            break;
          }

          return _context2.abrupt("return");

        case 2:
          _context2.prev = 2;
          _context2.next = 5;
          return regeneratorRuntime.awrap(fetch(NEWS_API_URL));

        case 5:
          res = _context2.sent;
          _context2.next = 8;
          return regeneratorRuntime.awrap(res.json());

        case 8:
          data = _context2.sent;

          if (data.articles && data.articles.length > 0) {
            newsCards.innerHTML = '';
            data.articles.forEach(function (article) {
              var card = document.createElement('div');
              card.className = 'news-card';
              card.innerHTML = "\n          <div class=\"news-card-title\">".concat(article.title, "</div>\n          <div class=\"news-card-desc\">").concat(article.description ? article.description : '', "</div>\n          <a class=\"news-card-link\" href=\"").concat(article.url, "\" target=\"_blank\">Read Full Article</a>\n        ");
              newsCards.appendChild(card);
            });
          } else {
            newsCards.innerHTML = '<div class="news-loading">No news found at the moment.</div>';
          }

          _context2.next = 15;
          break;

        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](2);
          newsCards.innerHTML = '<div class="news-loading">Failed to load news. Please try again later.</div>';

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[2, 12]]);
}

fetchNews();