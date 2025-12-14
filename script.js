document.addEventListener("DOMContentLoaded", () => {
  // No dynamic duration list — simplify to a single permanen button per card

  const bots = [
    { id: '15hari', name: '15 Hari', desc: 'Cocok untuk coba-coba; cepat dipasang dan langsung jalan.', price: 3000, period: '15 hari', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=60' },
    { id: '30hari', name: '30 Hari', desc: 'Paket favorit usaha kecil — fitur lengkap untuk kebutuhan sehari-hari.', price: 5000, period: '30 hari', image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=60' },
    { id: '60hari', name: '60 Hari', desc: 'Pilihan hemat untuk kampanye atau periode sibuk.', price: 10000, period: '60 hari', image: 'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&fit=crop&w=800&q=60' },
    { id: 'permanen', name: 'Permanen', desc: 'Paket permanen untuk penggunaan jangka panjang dan dukungan dasar.', price: 20000, period: 'Permanen', image: 'https://images.unsplash.com/photo-1505765052333-7e10ad3fef6f?auto=format&fit=crop&w=800&q=60' }
  ];

  const cardsContainer = document.getElementById('botCards');

  function formatIDR(num) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
  }

  // Plain Rp formatting without thousand separators (e.g., 'Rp 3000')
  function formatRpPlain(num) {
    return 'Rp ' + Number(num).toString();
  }

  bots.forEach((bot) => {
    const article = document.createElement('article');
    article.className = 'animate-fadeInUp bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-lg';

    // single-price card
    article.innerHTML = `
      <div class="w-full h-44 overflow-hidden">
        <img class="w-full h-full object-cover" src="${bot.image}" alt="${bot.name} image">
      </div>
      <div class="p-4 flex flex-col gap-3">
        <div>
          <h3 class="font-semibold text-lg text-white">${bot.name}</h3>
          <p class="text-sm text-slate-300 mt-1">${bot.desc}</p>
        </div>
        <div class="flex items-center justify-between mt-3">
          <ul class="text-xs text-slate-400 space-y-1">
            <li>Respon otomatis</li>
            <li>Manajemen pesan</li>
          </ul>
          <a class="sewa-btn text-white rounded-full px-4 py-2 font-semibold shadow-lg" href="#" target="_blank">${formatIDR(bot.price)}</a>
        </div>
      </div>
    `;

    cardsContainer.appendChild(article);

    // single price button element
    const sewaBtn = article.querySelector('.sewa-btn');
    // set initial href
    // set button with the card's price and link
    function updateSewaHref() {
      const text = `Hai! Saya mau pesan paket ${bot.name} (${bot.period}) — ${formatIDR(bot.price)}. Bisa bantu aktivasi?`;
      sewaBtn.href = `https://wa.me/6287842203625?text=${encodeURIComponent(text)}`;
      if (sewaBtn) {
        sewaBtn.innerText = formatIDR(bot.price);
      }
    }
    updateSewaHref();
  });

  // Animasi masuk saat load
  document.querySelectorAll('article').forEach((card, i) => {
    setTimeout(() => card.classList.add('active'), i * 150);
  });

  // Scroll animasi
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('article').forEach(card => observer.observe(card));
});


// Optional: small helper so clicking price shows share or details (future)
window.formatIDR = function (n) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n);
}
