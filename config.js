/**
 * Application Configuration
 * Centralized settings for YouTube Live Platform
 */
const CONFIG = {
  appName: "STREAMIX",
  appLogoText: "STREAMIX",
  
  // YouTube Primary Stream Configuration
  primaryStream: {
    youtubeVideoId: "jfKfPfyJRdk", // ID Video Default (misal: Lofi Girl Live)
    title: "Nantikan Live Streaming Exclusive Ku 💋",
    channelName: "君日江",
    channelUrl: "https://araplhn.org/4/bae12c77e60a2e5a48ad7b0d5c3e8a78",
    description: "Selamat Datang Silahkan Berlama-lama Di sini ,yg udh donate/beri dukungan nya Makaih❤️"
  },

  // Mode Rekomendasi: 'API' (YouTube Data API v3) atau 'MANUAL' (Kurasi Lokal)
  recommendationsMode: "MANUAL", 
  
  // YouTube Data API v3 Key (Isi jika mode = 'API')
  youtubeApiKey: "", 
  
  // Kategori Filter Default
  categories: ["Semua", "Gaming", "Musik", "Berita", "Edukasi", "Teknologi", "Hiburan", "Anime", "Inspirasi"],

  // Slot Iklan Visibility & Placeholder Text
  ads: {
    bannerHeader: true,
    bannerHero: true,
    sidebar: true,
    bannerPlayerBottom: true,
    bannerRecommendations: true,
    mobile: true
  },

  // Konfigurasi Donasi
  donation: {
    currency: "IDR",
    sociabuzzUrl: "https://sociabuzz.com/moksa_prdtn/donate", // Tautan SociaBuzz Anda
    paymentGatewayUrl: "" 
  },

  // Curated Manual Recommendations (Fallback bila API tidak diisi/gagal)
  manualRecommendations: [
    {
      videoId: "5qap5aO4i9A",
      title: "Lofi Hip Hop Radio - Beats to Sleep/Chill to",
      channelTitle: "Lofi Girl",
      category: "Musik",
      liveBroadcastContent: "live",
      concurrentViewers: "12450",
      thumbnail: "https://i.ytimg.com/vi/5qap5aO4i9A/hqdefault.jpg"
    },
    {
      videoId: "21X5lGlDOfg",
      title: "NASA TV Live: Earth From Space",
      channelTitle: "NASA",
      category: "Edukasi",
      liveBroadcastContent: "live",
      concurrentViewers: "8520",
      thumbnail: "https://i.ytimg.com/vi/21X5lGlDOfg/hqdefault.jpg"
    },
    {
      videoId: "DWcJFNfaw9c",
      title: "24/7 Live Coding & Developer Chill Radio",
      channelTitle: "Tech Waves",
      category: "Teknologi",
      liveBroadcastContent: "live",
      concurrentViewers: "3410",
      thumbnail: "https://i.ytimg.com/vi/DWcJFNfaw9c/hqdefault.jpg"
    },
    {
      videoId: "rQJoEpzKkNk",
      title: "Jakarta, tvOnenews.com - Live Streaming tvOne 24 Jam",
      channelTitle: "Tv One News",
      category: "Berita",
      liveBroadcastContent: "live",
      concurrentViewers: "89765",
      thumbnail: "https://i.ibb.co.com/HL3LRCtj/20261030-084717.png"
    },
    {
      videoId: "CKALaagV3rk",
      title: "進撃の巨人 Attack On Titan-Season 1 Full Move HD",
      channelTitle: "Muse Indonesia",
      category: "Anime",
      liveBroadcastContent: "live",
      concurrentViewers: "675456",
      thumbnail: "https://i.ibb.co.com/N6PQrhwB/Gemini-Generated-Image-uvkhicuvkhicuvkh.jpg"
    },
    {
      videoId: "PYoBI4VtshE",
      title: "LIVE | MPL PH 18 | ENGLISH - GRAND FINALS",
      channelTitle: "MPL Indonesia",
      category: "Gaming",
      liveBroadcastContent: "live",
      concurrentViewers: "2156739",
      thumbnail: "https://i.ibb.co.com/gZS9p6Dr/IMG-20261030-075049.jpg"
    },
    {
      videoId: "9aEmclXk69g",
      title: "DJ TIKTOK TERBARU VIRAL 2026 | MANTRA APA YANG KAU BERIKAN - SALAH APA - IPANG VIRAL FULL ALBUM",
      channelTitle: "Remix Royale",
      category: "Musik",
      liveBroadcastContent: "live",
      concurrentViewers: "3987387",
      thumbnail: "https://i.ibb.co.com/XfBW3dSk/20261030-080459.png"
    },
    {
      videoId: "WgQkUOeXs4E",
      title: "HM OM BOTAK.. KAMU KEFARAT YA NANYA AKU NYA",
      channelTitle: "Close The door Corbuzier",
      category: "Hiburan",
      liveBroadcastContent: "live",
      concurrentViewers: "8879678",
      thumbnail: "https://i.ibb.co.com/Vc0ssgRc/20261030-081337.png"
    },
    {
      videoId: "Bff6Y-ak_MQ",
      title: "IDE KONTEN PALING SEMPURNA | IG - YT - FB - TIKTOK JALAN SEMUA !",
      channelTitle: "HENDRA SETYO",
      category: "Inspirasi",
      liveBroadcastContent: "live",
      concurrentViewers: "22876",
      thumbnail: "https://i.ibb.co.com/BbJmQNR/20261030-082439.png"
    },
    {
      videoId: "4gGOAMHt2F4",
      title: "1000% MONET‼️5 Jt Perhari Hanya Dengan Upload Vidio Lucu",
      channelTitle: "tutorTUBE",
      category: "Inspirasi",
      liveBroadcastContent: "live",
      concurrentViewers: "498765",
      thumbnail: "https://i.ibb.co.com/4nFw5HGk/20261030-083100.png"
    },
    {
      videoId: "UMe1AKUyUN0",
      title: "iNews TV 24 jam non-stop",
      channelTitle: "iNews TV",
      category: "Berita",
      liveBroadcastContent: "live",
      concurrentViewers: "86983",
      thumbnail: "https://i.ibb.co.com/jkXmqb1w/20261030-085627.png"
    }
  ],

  // Jadwal Streaming
  schedules: [
    {
      id: "sch_1",
      title: "Special Gaming Tournament Finals",
      channelName: "Streamix Gaming",
      date: "2026-11-01",
      time: "19:00",
      timezone: "Asia/Jakarta",
      status: "UPCOMING",
      thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&auto=format&fit=crop"
    },
    {
      id: "sch_2",
      title: "Tech Talk: Masa Depan Web Development 2027",
      channelName: "Streamix Tech",
      date: "2026-11-03",
      time: "20:00",
      timezone: "Asia/Jakarta",
      status: "UPCOMING",
      thumbnail: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&auto=format&fit=crop"
    }
  ]
};
