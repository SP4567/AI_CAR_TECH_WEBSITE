let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');
window.onscroll = () =>{
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id')
        if(top >= offset && top < offset + height){
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });
    let header = document.querySelector('header')
    header.classList.toggle('sticky', window.scrollY > 100);
    header.classList.toggle('sticky', window.scrollY > 100);
    menuIcon.classList.remove('bx-x');
    navLinks.classList.remove('active');
};

ScrollReveal({ 
    distance: '80px',
    duration:2000,
    delay:200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .profile-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left'});
ScrollReveal().reveal('.home-content p, .about-content', { delay: 500 });

const typed = new Typed('.multiple-text',{
    strings: ['Welcome to GearShifts where the cars knockout you!', 'AI in cars', 'Driving Innovation', 'Urban Motion', 'Electric Future, Now', 'Performance. Precision. Power.'],
    typeSpeed:50,
    backSpeed:50,
    backdelay:800,
    loop:true
});

const openBtn = document.getElementById('open-ai-modal');
const modal = document.getElementById('ai-modal');
const closeBtn = document.getElementById('close-ai-modal');
const aiResponse = document.getElementById('ai-response');
const aiPromptInput = document.getElementById('ai-user-prompt');
const aiGenerateBtn = document.getElementById('ai-generate-btn');

openBtn.onclick = function() {
  modal.style.display = "block";
  aiResponse.innerHTML = "<p>Type your question and click Generate to get AI-powered insights!</p>";
  aiPromptInput.value = "";
};

const defaultPrompt = `Provide a structured overview of the latest trends in automotive technology. 
Format your answer with:
- Headings for each major trend
- Bullet points for key features or facts under each trend
- Short, clear explanations for each point
Cover topics like AI in cars, electrification, connectivity, and safety systems.`;

aiGenerateBtn.onclick = async function() {
  const prompt = aiPromptInput.value.trim() || defaultPrompt;
  aiResponse.innerHTML = "<p><em>Generating AI insights...</em></p>";

  // Gemini API call
  const apiKey = "AIzaSyCG9c97r769fcAXlLErJuVizpoXTUV3DWM";
  try {
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + apiKey, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });
    const data = await response.json();
    if (data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
      aiResponse.innerHTML = "<p>" + data.candidates[0].content.parts.map(p => p.text).join("<br>") + "</p>";
    } else {
      aiResponse.innerHTML = "<p>Sorry, the AI could not generate a response at this time.</p>";
    }
  } catch (e) {
    aiResponse.innerHTML = "<p>Error: " + e.message + "</p>";
  }
};

closeBtn.onclick = function() {
  modal.style.display = "none";
};
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// --- Automotive News Section ---
const newsCards = document.getElementById('news-cards');

// You need a news API key. Example uses NewsAPI.org (https://newsapi.org/)
// Replace 'YOUR_NEWSAPI_KEY' with your actual key.
const NEWS_API_KEY = '8ddde825c59e4b378dd13431f0f15259';
const NEWS_API_URL = `https://newsapi.org/v2/everything?q=automobile OR car OR automotive&language=en&sortBy=publishedAt&pageSize=6&apiKey=${NEWS_API_KEY}`;

async function fetchNews() {
  if (!newsCards) return;
  try {
    const res = await fetch(NEWS_API_URL);
    const data = await res.json();
    if (data.articles && data.articles.length > 0) {
      newsCards.innerHTML = '';
      data.articles.forEach(article => {
        const card = document.createElement('div');
        card.className = 'news-card';
        card.innerHTML = `
          <div class="news-card-title">${article.title}</div>
          <div class="news-card-desc">${article.description ? article.description : ''}</div>
          <a class="news-card-link" href="${article.url}" target="_blank">Read Full Article</a>
        `;
        newsCards.appendChild(card);
      });
    } else {
      newsCards.innerHTML = '<div class="news-loading">No news found at the moment.</div>';
    }
  } catch (e) {
    newsCards.innerHTML = '<div class="news-loading">Failed to load news. Please try again later.</div>';
  }
}
fetchNews();