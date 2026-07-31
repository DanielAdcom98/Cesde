/* CESDE TECPER 2026-2 · evolución semanal de CPA, leads e inversión.
   Fuente: Meta Marketing API, cuenta ADCOM 2023 - CESDE (act_236065353543774).
   Campañas con prefijo TECPERFMED / TECPERFBELL / TECPERFRIONE (37 campañas).
   Leads = acción onsite_conversion.lead_grouped. Extracción del 31/07/2026. */

const SEMANAS = [
  { sem: 'S19', desde: '4 may',  inv:   542052, leads:  167, cpa: 3246 },
  { sem: 'S20', desde: '11 may', inv:  2695486, leads:  597, cpa: 4515 },
  { sem: 'S21', desde: '18 may', inv:  5133008, leads:  955, cpa: 5375 },
  { sem: 'S22', desde: '25 may', inv:  6131257, leads:  953, cpa: 6434 },
  { sem: 'S23', desde: '1 jun',  inv:  9202519, leads: 1618, cpa: 5688 },
  { sem: 'S24', desde: '8 jun',  inv:  9481669, leads: 1386, cpa: 6841 },
  { sem: 'S25', desde: '15 jun', inv: 11102118, leads: 1310, cpa: 8475, pico: true },
  { sem: 'S26', desde: '22 jun', inv:  5439013, leads:  820, cpa: 6633 },
  { sem: 'S27', desde: '29 jun', inv:  5446978, leads: 1282, cpa: 4249 },
  { sem: 'S28', desde: '6 jul',  inv: 10293285, leads: 2627, cpa: 3918 },
  { sem: 'S29', desde: '13 jul', inv:  9685433, leads: 2668, cpa: 3630 },
  { sem: 'S30', desde: '20 jul', inv:  3383617, leads: 1073, cpa: 3153 },
  { sem: 'S31', desde: '27 jul', inv:  1726742, leads:  641, cpa: 2694, mejor: true }
];

/* Mundial 2026: 11 jun — 19 jul. Cubre de S24 (8 jun) a S29 (13 jul). */
const MUNDIAL = { desde: 5, hasta: 10 }; // índices inclusivos en SEMANAS

const cop = n => '$' + Math.round(n).toLocaleString('es-CO');
const miles = n => n.toLocaleString('es-CO');

const tip = document.getElementById('tip');

function mostrarTip(el, texto) {
  const ver = e => {
    tip.textContent = texto;
    tip.style.opacity = '1';
    const r = el.getBoundingClientRect();
    const x = e.clientX || (r.left + r.width / 2);
    tip.style.left = Math.min(Math.max(12, x + 14), window.innerWidth - tip.offsetWidth - 12) + 'px';
    tip.style.top = Math.max(12, r.top - 52) + 'px';
  };
  const ocultar = () => { tip.style.opacity = '0'; };
  el.addEventListener('mousemove', ver);
  el.addEventListener('focus', ver);
  el.addEventListener('mouseleave', ocultar);
  el.addEventListener('blur', ocultar);
}

function pintarColumnas(contenedorId, ejeId, campo, formato, resaltar) {
  const cont = document.getElementById(contenedorId);
  const eje = document.getElementById(ejeId);
  if (!cont) return;

  const maximo = Math.max(...SEMANAS.map(s => s[campo]));

  // Banda del Mundial detrás de las columnas.
  const banda = document.createElement('div');
  banda.className = 'banda-mundial';
  const anchoCol = 100 / SEMANAS.length;
  banda.style.left = `calc(${MUNDIAL.desde * anchoCol}% - 3px)`;
  banda.style.width = `calc(${(MUNDIAL.hasta - MUNDIAL.desde + 1) * anchoCol}% + 6px)`;
  cont.appendChild(banda);

  const etiqueta = document.createElement('div');
  etiqueta.className = 'banda-label';
  etiqueta.textContent = 'Mundial 11 jun — 19 jul';
  etiqueta.style.left = `calc(${MUNDIAL.desde * anchoCol}% + 6px)`;
  cont.appendChild(etiqueta);

  SEMANAS.forEach(s => {
    const col = document.createElement('div');
    col.className = 'col' + (resaltar && s[resaltar] ? ' ' + resaltar : '');

    const valor = document.createElement('span');
    valor.className = 'valor';
    valor.textContent = formato(s[campo]);
    col.appendChild(valor);

    const barra = document.createElement('div');
    barra.className = 'barra';
    barra.style.height = Math.max(3, s[campo] / maximo * 100) + '%';
    barra.tabIndex = 0;
    barra.setAttribute('role', 'img');
    barra.setAttribute('aria-label',
      `${s.sem}, semana del ${s.desde}: CPA ${cop(s.cpa)}, ${miles(s.leads)} leads, inversión ${cop(s.inv)}`);
    mostrarTip(barra,
      `${s.sem} · semana del ${s.desde}\nCPA ${cop(s.cpa)}\n${miles(s.leads)} leads\n${cop(s.inv)} invertidos`);
    col.appendChild(barra);

    cont.appendChild(col);
  });

  SEMANAS.forEach(s => {
    const d = document.createElement('div');
    d.textContent = s.sem;
    eje.appendChild(d);
  });
}

function pintarTabla() {
  const tbody = document.querySelector('#tabla tbody');
  const tfoot = document.querySelector('#tabla tfoot');
  if (!tbody) return;

  SEMANAS.forEach(s => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${s.sem} · ${s.desde}</td><td>${cop(s.inv)}</td>` +
      `<td>${miles(s.leads)}</td><td>${cop(s.cpa)}</td>`;
    tbody.appendChild(tr);
  });

  const inv = SEMANAS.reduce((a, s) => a + s.inv, 0);
  const leads = SEMANAS.reduce((a, s) => a + s.leads, 0);
  const tr = document.createElement('tr');
  tr.innerHTML = `<td>Total</td><td>${cop(inv)}</td><td>${miles(leads)}</td><td>${cop(inv / leads)}</td>`;
  tfoot.appendChild(tr);
}

pintarColumnas('chart-cpa', 'eje-cpa', 'cpa', n => '$' + (n / 1000).toFixed(1).replace('.', ',') + 'k', 'pico');
pintarColumnas('chart-leads', 'eje-leads', 'leads', n => miles(n), 'mejor');
pintarTabla();
