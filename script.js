// script.js - cálculos y cambio de tema
const k = 8.9875517923e9;

function toNumber(id){
  const v = document.getElementById(id).value.trim();
  if(v === '') return NaN;
  const n = Number(v);
  return isFinite(n) ? n : NaN;
}

function formatEng(x){
  if(!isFinite(x)) return 'NaN';
  const sign = x < 0 ? '-' : '';
  const ax = Math.abs(x);
  if(ax === 0) return '0';
  const exp = Math.floor(Math.log10(ax));
  const mant = ax / Math.pow(10, exp);
  return `${sign}${mant.toFixed(4)}×10^${exp}`;
}

// Potencial
function calcPotential(){
  const q = toNumber('q');
  const r = toNumber('r');
  const out = document.getElementById('vResult');
  if(isNaN(q) || isNaN(r) || r === 0){ out.textContent = 'Entrada inválida — verifica q y r (r no puede ser 0).'; return }
  const V = k * q / r;
  out.innerHTML = `Resultado: <strong>${formatEng(V)}</strong> V`;
}
function clearPotential(){ document.getElementById('q').value=''; document.getElementById('r').value=''; document.getElementById('vResult').textContent='Resultado: —' }

// Corriente
function calcCurrentFromQ(){
  const Q = toNumber('Q');
  const t = toNumber('t');
  const out = document.getElementById('iResult');
  if(isNaN(Q) || isNaN(t) || t === 0){ out.textContent = 'Entrada inválida — verifica Q y t (t no puede ser 0).'; return }
  const I = Q / t;
  out.innerHTML = `I (Q/t) = <strong>${formatEng(I)}</strong> A`;
}
function clearCurrentQ(){ document.getElementById('Q').value=''; document.getElementById('t').value=''; document.getElementById('iResult').textContent='Resultado: —' }

function calcCurrentFromOhm(){
  const V = toNumber('V_ohm');
  const R = toNumber('R_ohm');
  const out = document.getElementById('iResult');
  if(isNaN(V) || isNaN(R) || R === 0){ out.textContent = 'Entrada inválida — verifica V y R (R no puede ser 0).'; return }
  const I = V / R;
  out.innerHTML = `I (V/R) = <strong>${formatEng(I)}</strong> A`;
}
function clearCurrentOhm(){ document.getElementById('V_ohm').value=''; document.getElementById('R_ohm').value=''; document.getElementById('iResult').textContent='Resultado: —' }

// Resistencia
function calcResistanceOhm(){
  const V = toNumber('V_r');
  const I = toNumber('I_r');
  const out = document.getElementById('rResult');
  if(isNaN(V) || isNaN(I) || I === 0){ out.textContent = 'Entrada inválida — verifica V e I (I no puede ser 0).'; return }
  const R = V / I;
  out.innerHTML = `R (V/I) = <strong>${formatEng(R)}</strong> Ω`;
}
function clearResistanceOhm(){ document.getElementById('V_r').value=''; document.getElementById('I_r').value=''; document.getElementById('rResult').textContent='Resultado: —' }

function calcResistanceRho(){
  const rho = toNumber('rho');
  const L = toNumber('L');
  const A = toNumber('A');
  const out = document.getElementById('rResult');
  if(isNaN(rho) || isNaN(L) || isNaN(A) || A === 0){ out.textContent = 'Entrada inválida — verifica ρ, L y A (A no puede ser 0).'; return }
  const R = rho * L / A;
  out.innerHTML = `R (ρ·L/A) = <strong>${formatEng(R)}</strong> Ω`;
}
function clearResistanceRho(){ document.getElementById('rho').value=''; document.getElementById('L').value=''; document.getElementById('A').value=''; document.getElementById('rResult').textContent='Resultado: —' }

// Theme handling
const themeBtn = document.getElementById('themeBtn');
const themeSelect = document.getElementById('themeSelect');
themeBtn?.addEventListener('click', ()=>{
  const current = document.body.className;
  if(current === 'theme-light') document.body.className = 'theme-dark';
  else if(current === 'theme-dark') document.body.className = 'theme-blue';
  else document.body.className = 'theme-light';
  // sync select
  themeSelect.value = document.body.className.replace('theme-','') || 'light';
});
themeSelect?.addEventListener('change', (e)=>{
  document.body.className = 'theme-' + e.target.value;
});

// set default theme to light (already in HTML)
