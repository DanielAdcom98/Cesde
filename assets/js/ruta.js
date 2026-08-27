    const slides = Array.from(document.querySelectorAll('.slide'));
    let currentSlide = 0;
    let mapInitialized = false;
    const locations = [
{name:"Centro Comercial Puerta del Norte - Bello",lat:6.3386,lng:-75.5446},
{name:"Centro Comercial Fabricato - Bello",lat:6.337,lng:-75.5603},
{name:"Estación Metro Niquía - Bello",lat:6.3376,lng:-75.5440},
{name:"Terminal del Norte - Medellín",lat:6.2788,lng:-75.5705},
{name:"Florida Parque Comercial - Medellín",lat:6.2766,lng:-75.57},
{name:"Centro Comercial La Central - Medellín",lat:6.2473,lng:-75.5515},
{name:"Centro Comercial Los Molinos - Medellín",lat:6.2311,lng:-75.6044},
{name:"Centro Comercial Premium Plaza - Medellín",lat:6.2315,lng:-75.5746},
{name:"Centro Comercial Aventura - Medellín",lat:6.2712,lng:-75.5654},
{name:"Centro Comercial El Tesoro - Medellín",lat:6.1969,lng:-75.5592},
{name:"Estación Metro Acevedo - Medellín",lat:6.3006,lng:-75.5585},
{name:"Estación Metro San Antonio - Medellín",lat:6.2471,lng:-75.5689},
{name:"Centro Comercial Mayorca - Itagüí",lat:6.1652,lng:-75.6057},
{name:"Centro Comercial San Nicolás - Rionegro",lat:6.151,lng:-75.3741}
];

    function updateSlide() {
      slides.forEach((slide, index) => slide.classList.toggle('active', index === currentSlide));
      document.getElementById('prevBtn').disabled = currentSlide === 0;
      document.getElementById('nextBtn').disabled = currentSlide === slides.length - 1;
      document.getElementById('progressBar').style.width = ((currentSlide + 1) / slides.length) * 100 + '%';
      document.getElementById('slideCounter').textContent = `${currentSlide + 1} / ${slides.length}`;
      const activeTitle = slides[currentSlide].dataset.title || '';
      if (activeTitle === 'Ruta DOOH') setTimeout(initMap, 250);
    }
    function changeSlide(dir) {
      const next = currentSlide + dir;
      if (next >= 0 && next < slides.length) { currentSlide = next; updateSlide(); }
    }
    function goToSlide(index) { currentSlide = index; updateSlide(); toggleIndex(false); }
    function toggleIndex(force) {
      const modal = document.getElementById('indexModal');
      const open = typeof force === 'boolean' ? force : !modal.classList.contains('open');
      modal.classList.toggle('open', open);
    }
    function buildIndex() {
      const list = document.getElementById('indexList');
      slides.forEach((slide, i) => {
        const li = document.createElement('li');
        li.textContent = `${String(i+1).padStart(2,'0')} · ${slide.dataset.title}`;
        li.onclick = () => goToSlide(i);
        list.appendChild(li);
      });
    }
    function showMix(id, btn) {
      document.querySelectorAll('.mix-tab').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.mix-panel').forEach(p => p.classList.remove('active'));
      document.getElementById('mix-' + id).classList.add('active');
    }
    function toggleAcc(header) {
      const item = header.parentElement;
      item.classList.toggle('open');
      header.querySelector('.acc-icon').textContent = item.classList.contains('open') ? 'âˆ’' : '+';
    }

    function filterPrograms(priority, btn) {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      if (btn) btn.classList.add('active');
      document.querySelectorAll('tr[data-priority]').forEach(row => {
        row.style.display = (priority === 'all' || row.dataset.priority === priority) ? '' : 'none';
      });
    }
    function initMap() {
      if (mapInitialized || typeof L === 'undefined') return;
      mapInitialized = true;
      const map = L.map('doohMap').setView([6.235, -75.56], 10);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; OpenStreetMap'
      }).addTo(map);
      const bounds = [];
      locations.forEach((loc, idx) => {
        const marker = L.marker([loc.lat, loc.lng]).addTo(map);
        marker.bindPopup(`<strong>${idx+1}. ${loc.name}</strong><br><a target="_blank" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.name)}">Abrir en Google Maps</a>`);
        bounds.push([loc.lat, loc.lng]);
      });
      map.fitBounds(bounds, {padding:[30,30]});
    }

    const flowData = [
  {
    "sede": "Bello",
    "programa": "Técnico Laboral en Asistente Administrativo",
    "prioridad": "P2",
    "meta": 120,
    "inversion": 5.59,
    "cpl": 4194,
    "leads": 1333,
    "metaAds": 4.01,
    "google": 1.13,
    "tiktok": 0.45,
    "vigente": "Si",
    "split": {
      "Meta": 72,
      "Google": 20,
      "TikTok": 8
    }
  },
  {
    "sede": "Bello",
    "programa": "Técnico Laboral en Asistente en Desarrollo de Software",
    "prioridad": "P2",
    "meta": 90,
    "inversion": 4.2,
    "cpl": 4200,
    "leads": 1000,
    "metaAds": 3.02,
    "google": 0.85,
    "tiktok": 0.34,
    "vigente": "Si",
    "split": {
      "Meta": 72,
      "Google": 20,
      "TikTok": 8
    }
  },
  {
    "sede": "Bello",
    "programa": "Técnico Laboral en Asistente en Diseño Gráfico",
    "prioridad": "P3",
    "meta": 60,
    "inversion": 2.79,
    "cpl": 4183,
    "leads": 667,
    "metaAds": 2,
    "google": 0.56,
    "tiktok": 0.22,
    "vigente": "Si",
    "split": {
      "Meta": 72,
      "Google": 20,
      "TikTok": 8
    }
  },
  {
    "sede": "Medellín",
    "programa": "Técnico Laboral como Asistente Administrativo",
    "prioridad": "P1",
    "meta": 210,
    "inversion": 9.78,
    "cpl": 4192,
    "leads": 2333,
    "metaAds": 7.02,
    "google": 1.97,
    "tiktok": 0.79,
    "vigente": "Si",
    "split": {
      "Meta": 72,
      "Google": 20,
      "TikTok": 8
    }
  },
  {
    "sede": "Medellín",
    "programa": "Técnico Laboral como Asistente como Desarrollo de Software",
    "prioridad": "P1",
    "meta": 315,
    "inversion": 14.61,
    "cpl": 4174,
    "leads": 3500,
    "metaAds": 10.5,
    "google": 2.92,
    "tiktok": 1.19,
    "vigente": "No",
    "split": {
      "Meta": 72,
      "Google": 20,
      "TikTok": 8
    }
  },
  {
    "sede": "Medellín",
    "programa": "Técnico Laboral como Asistente Administrativo-Fast Track",
    "prioridad": "P3",
    "meta": 70,
    "inversion": 3.26,
    "cpl": 4190,
    "leads": 778,
    "metaAds": 2.34,
    "google": 0.66,
    "tiktok": 0.26,
    "vigente": "Si",
    "split": {
      "Meta": 72,
      "Google": 20,
      "TikTok": 8
    }
  },
  {
    "sede": "Medellín",
    "programa": "Técnico Laboral como Asistente como Desarrollo de Software- Fast Track",
    "prioridad": "P3",
    "meta": 70,
    "inversion": 3.26,
    "cpl": 4190,
    "leads": 778,
    "metaAds": 2.34,
    "google": 0.66,
    "tiktok": 0.26,
    "vigente": "Si",
    "split": {
      "Meta": 72,
      "Google": 20,
      "TikTok": 8
    }
  },
  {
    "sede": "Medellín",
    "programa": "Técnico Laboral como Asistente en Comercio Internacional",
    "prioridad": "P2",
    "meta": 120,
    "inversion": 5.59,
    "cpl": 4194,
    "leads": 1333,
    "metaAds": 4.01,
    "google": 1.13,
    "tiktok": 0.45,
    "vigente": "Si",
    "split": {
      "Meta": 72,
      "Google": 20,
      "TikTok": 8
    }
  },
  {
    "sede": "Medellín",
    "programa": "Técnico Laboral como Asistente en Contaduría",
    "prioridad": "P1",
    "meta": 175,
    "inversion": 8.15,
    "cpl": 4192,
    "leads": 1944,
    "metaAds": 5.85,
    "google": 1.64,
    "tiktok": 0.66,
    "vigente": "Si",
    "split": {
      "Meta": 72,
      "Google": 20,
      "TikTok": 8
    }
  },
  {
    "sede": "Medellín",
    "programa": "Técnico Laboral como Asistente en Desarrollo de Software (D)",
    "prioridad": "P3",
    "meta": 35,
    "inversion": 1.63,
    "cpl": 4190,
    "leads": 389,
    "metaAds": 1.17,
    "google": 0.33,
    "tiktok": 0.13,
    "vigente": "Si",
    "split": {
      "Meta": 72,
      "Google": 20,
      "TikTok": 8
    }
  },
  {
    "sede": "Medellín",
    "programa": "Técnico Laboral como Asistente en Diseño de Modas",
    "prioridad": "P3",
    "meta": 50,
    "inversion": 2.33,
    "cpl": 4191,
    "leads": 556,
    "metaAds": 1.67,
    "google": 0.47,
    "tiktok": 0.19,
    "vigente": "Si",
    "split": {
      "Meta": 72,
      "Google": 20,
      "TikTok": 8
    }
  },
  {
    "sede": "Medellín",
    "programa": "Técnico Laboral como Asistente en Diseño Gráfico",
    "prioridad": "P1",
    "meta": 210,
    "inversion": 9.78,
    "cpl": 4192,
    "leads": 2333,
    "metaAds": 7.02,
    "google": 1.97,
    "tiktok": 0.79,
    "vigente": "Si",
    "split": {
      "Meta": 72,
      "Google": 20,
      "TikTok": 8
    }
  },
  {
    "sede": "Medellín",
    "programa": "Técnico Laboral como Asistente en Electromecánica",
    "prioridad": "P3",
    "meta": 75,
    "inversion": 3.49,
    "cpl": 4190,
    "leads": 833,
    "metaAds": 2.51,
    "google": 0.7,
    "tiktok": 0.28,
    "vigente": "Si",
    "split": {
      "Meta": 72,
      "Google": 20,
      "TikTok": 8
    }
  },
  {
    "sede": "Medellín",
    "programa": "Técnico Laboral como Asistente en Logística de Centros de Distribución",
    "prioridad": "P3",
    "meta": 35,
    "inversion": 1.63,
    "cpl": 4190,
    "leads": 389,
    "metaAds": 1.17,
    "google": 0.33,
    "tiktok": 0.13,
    "vigente": "Si",
    "split": {
      "Meta": 72,
      "Google": 20,
      "TikTok": 8
    }
  },
  {
    "sede": "Medellín",
    "programa": "Técnico Laboral como Asistente en Mercadeo",
    "prioridad": "P2",
    "meta": 105,
    "inversion": 4.89,
    "cpl": 4190,
    "leads": 1167,
    "metaAds": 3.51,
    "google": 0.98,
    "tiktok": 0.39,
    "vigente": "Si",
    "split": {
      "Meta": 72,
      "Google": 20,
      "TikTok": 8
    }
  },
  {
    "sede": "Medellín",
    "programa": "Técnico Laboral como Asistente en Producción Audiovisual",
    "prioridad": "P2",
    "meta": 90,
    "inversion": 4.2,
    "cpl": 4200,
    "leads": 1000,
    "metaAds": 3.02,
    "google": 0.85,
    "tiktok": 0.34,
    "vigente": "Si",
    "split": {
      "Meta": 72,
      "Google": 20,
      "TikTok": 8
    }
  },
  {
    "sede": "Medellín",
    "programa": "Técnico Laboral como Asistente en Producción Fotográfica",
    "prioridad": "P3",
    "meta": 50,
    "inversion": 2.33,
    "cpl": 4191,
    "leads": 556,
    "metaAds": 1.67,
    "google": 0.47,
    "tiktok": 0.19,
    "vigente": "Si",
    "split": {
      "Meta": 72,
      "Google": 20,
      "TikTok": 8
    }
  },
  {
    "sede": "Medellín",
    "programa": "Técnico Laboral como Auxiliar en Publicación de Contenidos Digitales",
    "prioridad": "P2",
    "meta": 90,
    "inversion": 4.2,
    "cpl": 4200,
    "leads": 1000,
    "metaAds": 3.02,
    "google": 0.85,
    "tiktok": 0.34,
    "vigente": "Si",
    "split": {
      "Meta": 72,
      "Google": 20,
      "TikTok": 8
    }
  },
  {
    "sede": "Medellín",
    "programa": "Técnico Laboral en Arte Culinario",
    "prioridad": "P1",
    "meta": 208,
    "inversion": 9.68,
    "cpl": 4189,
    "leads": 2311,
    "metaAds": 6.95,
    "google": 1.95,
    "tiktok": 0.78,
    "vigente": "Si",
    "split": {
      "Meta": 72,
      "Google": 20,
      "TikTok": 8
    }
  },
  {
    "sede": "Medellín",
    "programa": "Técnico Laboral en Auxiliar Administrativo en Salud",
    "prioridad": "P2",
    "meta": 105,
    "inversion": 4.89,
    "cpl": 4190,
    "leads": 1167,
    "metaAds": 3.51,
    "google": 0.98,
    "tiktok": 0.39,
    "vigente": "Si",
    "split": {
      "Meta": 72,
      "Google": 20,
      "TikTok": 8
    }
  },
  {
    "sede": "Medellín",
    "programa": "Técnico Laboral en Auxiliar de Talento Humano",
    "prioridad": "P1",
    "meta": 140,
    "inversion": 6.52,
    "cpl": 4190,
    "leads": 1556,
    "metaAds": 4.68,
    "google": 1.31,
    "tiktok": 0.53,
    "vigente": "Si",
    "split": {
      "Meta": 72,
      "Google": 20,
      "TikTok": 8
    }
  },
  {
    "sede": "Medellín",
    "programa": "Técnico Laboral en Auxiliar en Enfermería",
    "prioridad": "P1",
    "meta": 150,
    "inversion": 6.99,
    "cpl": 4193,
    "leads": 1667,
    "metaAds": 5.02,
    "google": 1.41,
    "tiktok": 0.56,
    "vigente": "Si",
    "split": {
      "Meta": 72,
      "Google": 20,
      "TikTok": 8
    }
  },
  {
    "sede": "Medellín",
    "programa": "Técnico Laboral en Auxiliar en Servicios Farmacéuticos",
    "prioridad": "P2",
    "meta": 105,
    "inversion": 4.89,
    "cpl": 4190,
    "leads": 1167,
    "metaAds": 3.51,
    "google": 0.98,
    "tiktok": 0.39,
    "vigente": "Si",
    "split": {
      "Meta": 72,
      "Google": 20,
      "TikTok": 8
    }
  },
  {
    "sede": "Medellín",
    "programa": "Técnico Laboral en Pastelería y Arte Dulce",
    "prioridad": "P1",
    "meta": 182,
    "inversion": 8.48,
    "cpl": 4194,
    "leads": 2022,
    "metaAds": 6.09,
    "google": 1.71,
    "tiktok": 0.68,
    "vigente": "Si",
    "split": {
      "Meta": 72,
      "Google": 20,
      "TikTok": 8
    }
  },
  {
    "sede": "Medellín",
    "programa": "Técnico Laboral en Soporte de Sistemas Informáticos",
    "prioridad": "P3",
    "meta": 70,
    "inversion": 3.26,
    "cpl": 4190,
    "leads": 778,
    "metaAds": 2.34,
    "google": 0.66,
    "tiktok": 0.26,
    "vigente": "Si",
    "split": {
      "Meta": 72,
      "Google": 20,
      "TikTok": 8
    }
  },
  {
    "sede": "Rionegro",
    "programa": "Técnico Laboral como Auxiliar Administrativo",
    "prioridad": "P2",
    "meta": 90,
    "inversion": 4.2,
    "cpl": 4200,
    "leads": 1000,
    "metaAds": 3.02,
    "google": 0.85,
    "tiktok": 0.34,
    "vigente": "Si",
    "split": {
      "Meta": 72,
      "Google": 20,
      "TikTok": 8
    }
  },
  {
    "sede": "Rionegro",
    "programa": "Técnico Laboral como Auxiliar en Diseño Gráfico",
    "prioridad": "P3",
    "meta": 75,
    "inversion": 3.49,
    "cpl": 4190,
    "leads": 833,
    "metaAds": 2.51,
    "google": 0.7,
    "tiktok": 0.28,
    "vigente": "Si",
    "split": {
      "Meta": 72,
      "Google": 20,
      "TikTok": 8
    }
  },
  {
    "sede": "Rionegro",
    "programa": "Técnico Laboral en Auxiliar en Análisis y Desarrollo de Software",
    "prioridad": "P3",
    "meta": 75,
    "inversion": 3.49,
    "cpl": 4190,
    "leads": 833,
    "metaAds": 2.51,
    "google": 0.7,
    "tiktok": 0.28,
    "vigente": "Si",
    "split": {
      "Meta": 72,
      "Google": 20,
      "TikTok": 8
    }
  },
  {
    "sede": "Rionegro",
    "programa": "Técnico Laboral en Auxiliar en Comercio Internacional",
    "prioridad": "P3",
    "meta": 30,
    "inversion": 1.4,
    "cpl": 4204,
    "leads": 333,
    "metaAds": 1.01,
    "google": 0.28,
    "tiktok": 0.11,
    "vigente": "Si",
    "split": {
      "Meta": 72,
      "Google": 20,
      "TikTok": 8
    }
  }
];
    function moneyM(value) {
      return '$' + value.toLocaleString('es-CO', {minimumFractionDigits: value >= 10 ? 1 : 2, maximumFractionDigits: value >= 10 ? 1 : 2}) + 'M';
    }
    function moneyCOP(value) { return '$' + Math.round(value).toLocaleString('es-CO'); }
    function dominantMedia(item) {
      const vals = {Meta:item.metaAds, Google:item.google, TikTok:item.tiktok};
      return Object.keys(vals).sort((a,b)=>vals[b]-vals[a])[0];
    }
    function populateFlowFilters() {
      const select = document.getElementById('flowSede');
      if (!select || select.dataset.ready) return;
      [...new Set(flowData.map(i => i.sede))].sort().forEach(sede => {
        const option = document.createElement('option'); option.value = sede; option.textContent = sede; select.appendChild(option);
      });
      select.dataset.ready = 'true';
    }
    function renderFlow() {
      populateFlowFilters();
      const container = document.getElementById('flowRows');
      if (!container) return;
      const q = (document.getElementById('flowSearch')?.value || '').toLowerCase().trim();
      const priority = document.getElementById('flowPriority')?.value || 'all';
      const sede = document.getElementById('flowSede')?.value || 'all';
      const dominant = document.getElementById('flowDominant')?.value || 'all';
      const filtered = flowData.filter(item => {
        const matchesQ = !q || (item.programa + ' ' + item.sede).toLowerCase().includes(q);
        const matchesP = priority === 'all' || item.prioridad === priority;
        const matchesS = sede === 'all' || item.sede === sede;
        const matchesD = dominant === 'all' || dominantMedia(item) === dominant;
        return matchesQ && matchesP && matchesS && matchesD;
      }).sort((a,b) => {
        const order = {P1:1,P2:2,P3:3};
        return order[a.prioridad] - order[b.prioridad] || b.inversion - a.inversion;
      });
      const totalInv = filtered.reduce((s,i)=>s+i.inversion,0);
      const totalLeads = filtered.reduce((s,i)=>s+i.leads,0);
      document.getElementById('flowTotalInv').textContent = moneyM(totalInv);
      document.getElementById('flowTotalLeads').textContent = totalLeads.toLocaleString('es-CO');
      document.getElementById('flowAvgCpl').textContent = totalLeads ? moneyCOP((totalInv*1000000)/totalLeads) : '$0';
      document.getElementById('flowCount').textContent = filtered.length;
      if (!filtered.length) { container.innerHTML = '<div class="flow-empty">No hay programas con esos filtros.</div>'; return; }
      container.innerHTML = filtered.map(item => {
        const max = Math.max(item.metaAds, item.google, item.tiktok, .01);
        const tagClass = item.prioridad === 'P1' ? 'green' : item.prioridad === 'P2' ? 'light' : 'gray';
        const mediaLine = (label, value) => `<div class="media-line"><span>${label}</span><div class="media-track"><div class="media-fill" style="width:${Math.max(4,(value/max)*100)}%"></div></div><span class="media-value">${moneyM(value)}</span></div>`;
        return `<div class="flow-row" data-flow-priority="${item.prioridad}">
          <div class="flow-program"><strong>${item.programa}</strong><small>${item.sede} · <span class="tag ${tagClass}">${item.prioridad}</span></small></div>
          <div class="flow-invest">${moneyM(item.inversion)}</div>
          <div class="media-stack">${mediaLine('Meta', item.metaAds)}${mediaLine('Google', item.google)}${mediaLine('TikTok', item.tiktok)}</div>
          <div class="flow-leads">${item.leads.toLocaleString('es-CO')}</div>
          <div class="flow-cpl">${moneyCOP(item.cpl)}</div>
          <div class="flow-status"><span class="status-pill ${item.vigente === 'Si' ? 'ok' : 'warn'}">${item.vigente}</span></div>
        </div>`;
      }).join('');
    }



    const brandMonths = [
      {mes:'Abril', total:2.0, dooh:1.4, spotify:0.6, rol:'Arranque'},
      {mes:'Mayo', total:7.0, dooh:4.9, spotify:2.1, rol:'Pico'},
      {mes:'Junio', total:7.0, dooh:4.9, spotify:2.1, rol:'Pico'},
      {mes:'Julio', total:3.0, dooh:2.1, spotify:0.9, rol:'Sostenimiento'},
      {mes:'Agosto', total:1.0, dooh:0.7, spotify:0.3, rol:'Cierre'}
    ];
    const brandScreensData = [
      {zona:'Bello', pantalla:'Centro Comercial Puerta del Norte', peso:1.09},
      {zona:'Bello', pantalla:'Centro Comercial Fabricato', peso:1.09},
      {zona:'Bello', pantalla:'Estación Metro Niquía', peso:1.09},
      {zona:'Medellín', pantalla:'Terminal del Norte', peso:0.96},
      {zona:'Medellín', pantalla:'Florida Parque Comercial', peso:0.96},
      {zona:'Medellín', pantalla:'Centro Comercial La Central', peso:0.96},
      {zona:'Medellín', pantalla:'Centro Comercial Los Molinos', peso:0.96},
      {zona:'Medellín', pantalla:'Centro Comercial Premium Plaza', peso:0.96},
      {zona:'Medellín', pantalla:'Centro Comercial Aventura', peso:0.96},
      {zona:'Medellín', pantalla:'Centro Comercial El Tesoro', peso:0.96},
      {zona:'Medellín', pantalla:'Estación Metro Acevedo', peso:0.96},
      {zona:'Medellín', pantalla:'Estación Metro San Antonio', peso:0.96},
      {zona:'Itagüí', pantalla:'Centro Comercial Mayorca', peso:1.05},
      {zona:'Rionegro', pantalla:'Centro Comercial San Nicolás', peso:1.04}
    ];
    function renderBrandFlow() {
      const monthFilter = document.getElementById('brandMonth')?.value || 'all';
      const formatFilter = document.getElementById('brandFormat')?.value || 'all';
      const zoneFilter = document.getElementById('brandZone')?.value || 'all';
      const months = brandMonths.filter(m => monthFilter === 'all' || m.mes === monthFilter);
      const total = months.reduce((s,m)=>s+m.total,0);
      const dooh = months.reduce((s,m)=>s+m.dooh,0);
      const spotify = months.reduce((s,m)=>s+m.spotify,0);
      const screens = brandScreensData.filter(i => zoneFilter === 'all' || i.zona === zoneFilter);
      const filteredTotal = formatFilter === 'DOOH' ? dooh : formatFilter === 'Spotify' ? spotify : total;
      document.getElementById('brandTotal') && (document.getElementById('brandTotal').textContent = moneyM(filteredTotal));
      document.getElementById('brandDooh') && (document.getElementById('brandDooh').textContent = formatFilter === 'Spotify' ? '$0,0M' : moneyM(dooh));
      document.getElementById('brandSpotify') && (document.getElementById('brandSpotify').textContent = formatFilter === 'DOOH' ? '$0,0M' : moneyM(spotify));
      const monthContainer = document.getElementById('brandMonthRows');
      if (monthContainer) {
        monthContainer.innerHTML = months.map(m => {
          const baseTotal = m.total || 1;
          const doohW = formatFilter === 'Spotify' ? 0 : (m.dooh / baseTotal) * 100;
          const spotifyW = formatFilter === 'DOOH' ? 0 : (m.spotify / baseTotal) * 100;
          const shownTotal = formatFilter === 'DOOH' ? m.dooh : formatFilter === 'Spotify' ? m.spotify : m.total;
          return `<div class="brand-month-row"><strong>${m.mes}<br><span class="tag ${m.rol === 'Pico' ? 'light' : 'gray'}">${m.rol}</span></strong><div class="brand-month-track"><span class="dooh" style="width:${doohW}%"></span><span class="spotify" style="width:${spotifyW}%"></span></div><small>${moneyM(shownTotal)}</small></div>`;
        }).join('') || '<div class="flow-empty">Sin datos para este filtro.</div>';
      }
      const screenContainer = document.getElementById('brandScreenRows');
      if (screenContainer) {
        if (formatFilter === 'Spotify') {
          screenContainer.innerHTML = '<div class="flow-empty">Spotify Ads es audio digital: no se planifica por pantalla sino por segmentos y momentos de escucha.</div>';
          return;
        }
        screenContainer.innerHTML = screens.map((i, idx) => {
          return `<div class="brandflow-item"><div><strong>${i.pantalla}</strong><small>${i.zona} · Punto DOOH</small></div><div class="num">DOOH<br>${moneyM(i.peso)}</div><div class="num">${idx+1}</div></div>`;
        }).join('') || '<div class="flow-empty">No hay pantallas con esos filtros.</div>';
      }
    }
    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') changeSlide(1);
      if (e.key === 'ArrowLeft') changeSlide(-1);
      if (e.key === 'Escape') toggleIndex(false);
    });
    buildIndex();
    renderFlow();
    renderBrandFlow();
    updateSlide();
