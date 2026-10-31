/**
 * STREAMIX Platform Core Script
 * Pure Vanilla JavaScript implementation with Supabase Integration
 */

document.addEventListener('DOMContentLoaded', () => {
  // App State
  let state = {
    config: { ...CONFIG },
    currentCategory: "Semua",
    searchQuery: ""
  };

  // Konfigurasi Supabase
  const SUPABASE_URL = 'https://gtvctshbamzndjppisdz.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0dmN0c2hiYW16bmRqcHBpc2R6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMwNzc1NDksImV4cCI6MjEwODY1MzU0OX0.8GZwmpxGgGKJxGBc9W-kBmxeba7oNaNnSjjwVEYQi70';
  const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // DOM Elements References
  const mainStreamTitle = document.getElementById('mainStreamTitle');
  const mainChannelName = document.getElementById('mainChannelName');
  const mainChannelLink = document.getElementById('mainChannelLink');
  const mainStreamDesc = document.getElementById('mainStreamDesc');
  const recommendationsGrid = document.getElementById('recommendationsGrid');
  const categoryPills = document.getElementById('categoryPills');
  const searchInput = document.getElementById('searchInput');
  const emptyState = document.getElementById('emptyState');
  const liveChatIframe = document.getElementById('liveChatIframe');
  const externalChatBtn = document.getElementById('externalChatBtn');
  const chatFallback = document.getElementById('chatFallback');

  // Initialize YouTube Video Player
  function initPlayer(videoId) {
    const videoWrapper = document.getElementById('videoWrapper');
    videoWrapper.innerHTML = `
      <iframe 
        src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&enablejsapi=1" 
        title="YouTube Live Player" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
      </iframe>`;
    
    updateChat(videoId);
  }

  // Update Live Chat Iframe
  function updateChat(videoId) {
    const domain = window.location.hostname;
    if (domain !== "localhost" && domain !== "127.0.0.1" && domain !== "") {
      liveChatIframe.src = `https://www.youtube.com/live_chat?v=${videoId}&embed_domain=${domain}&dark_theme=1`;
      chatFallback.classList.add('hidden');
    } else {
      liveChatIframe.classList.add('hidden');
      chatFallback.classList.remove('hidden');
      externalChatBtn.href = `https://www.youtube.com/live_chat?v=${videoId}`;
    }
  }

  // Ambil Data dari Supabase (Primary Source) & Update UI
  async function loadConfigFromSupabase() {
    try {
      const { data, error } = await supabaseClient
        .from('moksastreamix')
        .select('*')
        .eq('id', 1)
        .single();

      if (error) throw error;

      if (data) {
        // Terapkan data dari database ke elemen HTML
        mainStreamTitle.textContent = data.title;
        mainChannelName.textContent = data.channel_name;
        mainStreamDesc.textContent = data.description;
        mainChannelLink.href = data.channel_url;
        state.config.recommendationsMode = data.rec_mode || "MANUAL";

        // Jalankan pemutar YouTube
        initPlayer(data.video_id);
      }
    } catch (err) {
      console.warn("Gagal memuat dari Supabase, menggunakan fallback config.js", err);
      // Fallback ke config.js jika gagal
      mainStreamTitle.textContent = state.config.primaryStream.title;
      mainChannelName.textContent = state.config.primaryStream.channelName;
      mainStreamDesc.textContent = state.config.primaryStream.description;
      mainChannelLink.href = state.config.primaryStream.channelUrl;
      initPlayer(state.config.primaryStream.youtubeVideoId);
    }
  }

  // Render Categories Filter
  function renderCategories() {
    categoryPills.innerHTML = '';
    state.config.categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = `pill-btn ${cat === state.currentCategory ? 'active' : ''}`;
      btn.textContent = cat;
      btn.addEventListener('click', () => {
        state.currentCategory = cat;
        renderCategories();
        fetchAndRenderRecommendations();
      });
      categoryPills.appendChild(btn);
    });
  }

  // Fetch & Render Recommendations
  async function fetchAndRenderRecommendations() {
    recommendationsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Memuat rekomendasi...</p>';
    emptyState.classList.add('hidden');

    let streams = [];

    if (state.config.recommendationsMode === "API" && state.config.youtubeApiKey) {
      try {
        const query = state.currentCategory === "Semua" ? "live stream" : state.currentCategory;
        const res = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&eventType=live&type=video&q=${encodeURIComponent(query)}&maxResults=8&key=${state.config.youtubeApiKey}`);
        const data = await res.json();
        
        if (data.items) {
          streams = data.items.map(item => ({
            videoId: item.id.videoId,
            title: item.snippet.title,
            channelTitle: item.snippet.channelTitle,
            category: state.currentCategory,
            liveBroadcastContent: "live",
            concurrentViewers: "LIVE",
            thumbnail: item.snippet.thumbnails.high.url
          }));
        }
      } catch (err) {
        console.warn("YouTube API Error, switching to manual fallback.", err);
        streams = state.config.manualRecommendations;
      }
    } else {
      streams = state.config.manualRecommendations;
    }

    let filtered = streams.filter(item => {
      const matchesCategory = state.currentCategory === "Semua" || item.category === state.currentCategory;
      const matchesSearch = item.title.toLowerCase().includes(state.searchQuery.toLowerCase()) || 
                            item.channelTitle.toLowerCase().includes(state.searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    renderRecommendationsGrid(filtered);
  }

  // Render Recommendations Cards Grid
  function renderRecommendationsGrid(list) {
    recommendationsGrid.innerHTML = '';

    if (list.length === 0) {
      emptyState.classList.remove('hidden');
      return;
    }

    list.forEach(item => {
      const card = document.createElement('div');
      card.className = 'rec-card';
      card.innerHTML = `
        <div class="rec-thumb-wrapper">
          <img src="${item.thumbnail}" alt="${escapeHtml(item.title)}" loading="lazy">
          <span class="rec-live-badge">LIVE</span>
          <span class="rec-viewers">👁 ${item.concurrentViewers}</span>
        </div>
        <div class="rec-card-body">
          <div>
            <h3 class="rec-title">${escapeHtml(item.title)}</h3>
            <p class="rec-channel">${escapeHtml(item.channelTitle)}</p>
          </div>
          <div class="rec-actions">
            <button class="btn btn-primary btn-sm play-btn">Tonton Sekarang</button>
            <a href="https://www.youtube.com/watch?v=${item.videoId}" target="_blank" rel="noopener" class="btn btn-outline btn-sm">↗</a>
          </div>
        </div>
      `;

      card.querySelector('.play-btn').addEventListener('click', () => {
        initPlayer(item.videoId);
        mainStreamTitle.textContent = item.title;
        mainChannelName.textContent = item.channelTitle;
        window.scrollTo({ top: document.getElementById('player-section').offsetTop - 80, behavior: 'smooth' });
      });

      recommendationsGrid.appendChild(card);
    });

    document.getElementById('statCount').textContent = list.length;
  }

  // Render Schedule Grid
  function renderSchedule() {
    const grid = document.getElementById('scheduleGrid');
    if (!grid) return; 
    
    grid.innerHTML = '';
    if (state.config.schedules.length === 0) {
      grid.innerHTML = '<p>Tidak ada jadwal.</p>';
      return;
    }
    
    state.config.schedules.forEach(item => {
      const card = document.createElement('div');
      card.className = 'schedule-card';
      card.innerHTML = `
        <h4 style="margin-bottom:0.3rem;">${escapeHtml(item.title)}</h4>
        <p style="color:var(--text-muted); font-size:0.85rem; margin-bottom:0.5rem;">${escapeHtml(item.channelName)}</p>
        <p style="font-size:0.85rem;">📅 ${item.date} | ⏰ ${item.time} (${item.timezone})</p>
      `;
      grid.appendChild(card);
    });
  }

  // Donation Link Handler
  function initDonation() {
    const sociaBuzzBtn = document.getElementById('sociaBuzzDonationBtn');
    if (sociaBuzzBtn && state.config.donation && state.config.donation.sociabuzzUrl) {
      sociaBuzzBtn.href = state.config.donation.sociabuzzUrl;
    }
  }

  // Helper Escape HTML
  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, match => {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[match];
    });
  }

  // Mobile Menu Toggle
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMobile = document.getElementById('navMobile');
  if (hamburgerBtn && navMobile) {
    hamburgerBtn.addEventListener('click', () => navMobile.classList.toggle('open'));
  }

  // Search Input Debounce
  let searchTimeout;
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        state.searchQuery = e.target.value;
        fetchAndRenderRecommendations();
      }, 300);
    });
  }

  const resetFilterBtn = document.getElementById('resetFilterBtn');
  if (resetFilterBtn) {
    resetFilterBtn.addEventListener('click', () => {
      state.searchQuery = "";
      state.currentCategory = "Semua";
      searchInput.value = "";
      renderCategories();
      fetchAndRenderRecommendations();
    });
  }

  const reloadRecsBtn = document.getElementById('reloadRecsBtn');
  if (reloadRecsBtn) {
    reloadRecsBtn.addEventListener('click', fetchAndRenderRecommendations);
  }

  // Initialize Core Application
  loadConfigFromSupabase();
  renderCategories();
  fetchAndRenderRecommendations();
  renderSchedule();
  initDonation();
});
