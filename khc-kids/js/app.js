/* ============================================================
   KHC KIDS · Lógica de la aplicación (SPA)
   ============================================================ */
(function(){
'use strict';
const d=document;
const $=(s,c=d)=>c.querySelector(s);
const $$=(s,c=d)=>Array.from(c.querySelectorAll(s));
const money=n=>'$'+Number(n).toFixed(2);
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

const LS={
  get:(k,f)=>{try{const v=JSON.parse(localStorage.getItem(k));return v==null?f:v;}catch(e){return f;}},
  set:(k,v)=>localStorage.setItem(k,JSON.stringify(v))
};
const ADMIN_PASS='khckids';

const seed=()=>window.KHC_PRODUCTS||[];
const NAV=()=>window.KHC_NAV||[];
const TYPES=()=>window.KHC_TYPES||[];
const AGES=()=>window.KHC_AGES||[];

const state={
  cart:LS.get('khc_cart',[]),
  orders:LS.get('khc_orders',[]),
  custom:LS.get('khc_custom',[]),
  deleted:LS.get('khc_deleted',[]),
  admin:sessionStorage.getItem('khc_admin')==='1',
  filters:{type:'all',age:'all',gender:'all',sale:'0',sort:'featured',q:''},
  adminTab:'dashboard'
};

const productsAll=()=>[...seed(),...state.custom].filter(p=>!state.deleted.includes(p.id));
const findP=id=>productsAll().find(p=>p.id===id);
const agesOf=p=>[].concat(p.age||[]);
const save=()=>{LS.set('khc_cart',state.cart);LS.set('khc_orders',state.orders);LS.set('khc_custom',state.custom);LS.set('khc_deleted',state.deleted)};

const SHIP_FREE=35, SHIP_COST=3.99;
const cartCount=()=>state.cart.reduce((s,i)=>s+i.qty,0);
const cartSubtotal=()=>state.cart.reduce((s,i)=>{const p=findP(i.id);return s+(p?p.price*i.qty:0);},0);

/* ---------- TOAST ---------- */
let toastT;
function toast(msg){
  const t=$('#toast');t.textContent=msg;t.classList.add('show');
  clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove('show'),2200);
}

/* ---------- RENDER HEADER ---------- */
function renderHeader(){
  $('#hdr').innerHTML=`
    <div class="topbar">🚚 Envío a TODA Venezuela · 🌴 Ropa fresca para el trópico · 💕 Calidad a precios increíbles</div>
    <div class="nav-wrap">
      <button class="icon-btn hamburger" id="hamb" aria-label="Menú">☰</button>
      <a href="#/" class="logo">
        <span class="logo-badge">🧸</span>
        <span>KHC<b> Kids</b></span>
      </a>
      <nav class="nav-links">${NAV().map(n=>`<a href="${n.href}">${n.label}</a>`).join('')}</nav>
      <div class="nav-actions">
        <div class="search-box">
          <span class="ico">🔍</span>
          <input id="search" type="text" placeholder="Buscar ropa..." value="${esc(state.filters.q)}" />
        </div>
        <button class="icon-btn" id="goAdmin" title="Admin">⚙️</button>
        <button class="icon-btn" id="openCart" title="Carrito">🛍️
          ${cartCount()?`<span class="badge">${cartCount()}</span>`:''}
        </button>
      </div>
    </div>`;
  $('#search').addEventListener('input',e=>{
    state.filters.q=e.target.value;
    if(location.hash.indexOf('#/catalog')!==0){location.hash='#/catalog';}
    if(location.hash.indexOf('#/catalog')===0)renderCatalog();
  });
  $('#openCart').addEventListener('click',openCart);
  $('#goAdmin').addEventListener('click',()=>location.hash='#/admin');
  $('#hamb').addEventListener('click',openMobileNav);
}

function renderFooter(){
  $('#ftr').innerHTML=`
  <div class="footer-top container">
    <div class="footer-brand">
      <div class="logo"><span class="logo-badge">🧸</span><span style="color:#fff">KHC<b style="color:var(--pink)"> Kids</b></span></div>
      <p>Ropa cómoda, bonita y económica para tus peques, de 0 meses a 10 años. Hecho con mucho cariño. 💕</p>
      <div class="socials">
        <a href="#/" title="Instagram">📷</a><a href="#/" title="Facebook">👍</a>
        <a href="#/" title="TikTok">🎵</a><a href="#/" title="WhatsApp">💬</a>
      </div>
    </div>
    <div>
      <h4>Comprar</h4>
      <a href="#/catalog?age=bebe">Bebés 0-24m</a>
      <a href="#/catalog?age=infantil">Niños/as 2-7a</a>
      <a href="#/catalog?age=mayor">Mayores 8-10a</a>
      <a href="#/catalog?type=accesorio">Accesorios</a>
      <a href="#/catalog?sale=1">Ofertas</a>
    </div>
    <div>
      <h4>Ayuda</h4>
      <a href="#/">Envíos y entregas</a>
      <a href="#/">Devoluciones</a>
      <a href="#/">Guía de tallas</a>
      <a href="#/">Preguntas frecuentes</a>
      <a href="#/">Contacto</a>
    </div>
    <div>
      <h4>Novedades y descuentos</h4>
      <p>Suscríbete y recibe un <b style="color:var(--pink)">10% off</b> en tu primera compra.</p>
      <form class="newsletter" onsubmit="return false">
        <input type="email" placeholder="tu@email.com" required />
        <button class="btn btn-primary btn-sm" type="submit">✉️</button>
      </form>
    </div>
  </div>
  <div class="footer-bottom">
    <div>© ${new Date().getFullYear()} KHC Kids · Todos los derechos reservados · Hecho con 💕 para los peques</div>
    <div class="pays"><span>💳 Visa</span><span>Mastercard</span><span>PayPal</span><span>Apple Pay</span><span>Contra reembolso</span></div>
  </div>`;
}

/* ---------- PRODUCT CARD ---------- */
function card(p){
  const disc=p.oldPrice?Math.round((1-p.price/p.oldPrice)*100):0;
  return `<article class="card" data-id="${p.id}">
    <div class="thumb" style="--t:${p.tint||'#FFEFE6'}" data-open="${p.id}">
      <span class="thumb-emoji">${p.emoji||'👶'}</span>
      <img loading="lazy" src="${esc(p.img)}" alt="${esc(p.name)}" onerror="this.style.display='none'">
      <div class="badges">
        ${p.isNew?'<span class="bdg new">NUEVO</span>':''}
        ${disc?`<span class="bdg sale">-${disc}%</span>`:''}
      </div>
      <button class="fav" data-fav="${p.id}" aria-label="Favorito">♡</button>
    </div>
    <div class="card-body">
      <span class="card-cat">${p.typeLabel||''}</span>
      <div class="rt-row"><span class="star">★</span> ${p.rating||4.8} <span class="rc">(${p.reviews||0})</span></div>
      <h3 class="card-title">${esc(p.name)}</h3>
      <div class="price"><span class="now">${money(p.price)}</span>${p.oldPrice?`<span class="was">${money(p.oldPrice)}</span>`:''}</div>
      <button class="btn ghost add btn-sm" data-add="${p.id}">🛒 Añadir</button>
    </div>
  </article>`;
}

/* ---------- HOME ---------- */
function renderHome(){
  const ps=productsAll();
  const featured=ps.filter(p=>p.rating>=4.8).slice(0,8);
  const news=ps.filter(p=>p.isNew).slice(0,4);
  const sales=ps.filter(p=>p.isSale||p.oldPrice).slice(0,4);
  $('#app').innerHTML=`
  <!-- HERO -->
  <section class="hero">
    <div class="container hero-inner">
      <div>
        <span class="hero-eyebrow">💖 Ropa para peques de 0 a 10 años</span>
        <h1>Viste a tus peques con <span class="hl">amor</span> y <span class="hl2">estilo</span> 💕</h1>
        <p class="lead">Vestidos, conjuntos, pantalones largos frescos, trajes de baño y accesorios de calidad a precios económicos. Suaves, ligeros y llenos de color para el clima tropical de Venezuela. 🌴</p>
        <div class="hero-cta">
          <a href="#/catalog" class="btn btn-primary">🛍️ Ver catálogo</a>
          <a href="#/catalog?sale=1" class="btn btn-ghost">🔥 Ofertas</a>
        </div>
        <div class="hero-trust">
          <div><span class="t-ico">🚚</span> Envío gratis +$${SHIP_FREE}</div>
          <div><span class="t-ico">↩️</span> 30 días devolución</div>
          <div><span class="t-ico">⭐</span> +10.000 clientes felices</div>
        </div>
      </div>
      <div class="hero-art">
        <div class="blob"></div><div class="blob2"></div>
        <img src="img/hero.jpg" alt="Niños felices con ropa KHC Kids" onerror="this.style.display='none'">
        <div class="float-pill fp1"><span class="fp-ico" style="background:#FFE3F1">🧸</span> Calidad suave</div>
        <div class="float-pill fp2"><span class="fp-ico" style="background:#DCEEFC">💰</span> Precios bajos</div>
      </div>
    </div>
  </section>

  <div class="container">
    <!-- TRUST -->
    <section class="section" style="padding-top:36px">
      <div class="trust-strip">
        <div class="t"><div class="t-ico" style="background:#FFE3F1">🚚</div><div><h4>Envío rápido</h4><small>Gratis en +$${SHIP_FREE}</small></div></div>
        <div class="t"><div class="t-ico" style="background:#DCEEFC">💸</div><div><h4>Precios bajos</h4><small>Calidad económica</small></div></div>
        <div class="t"><div class="t-ico" style="background:#FFF1CF">↩️</div><div><h4>Devolución 30 días</h4><small>Compra sin riesgo</small></div></div>
        <div class="t"><div class="t-ico" style="background:#E3F3E0">🔒</div><div><h4>Pago seguro</h4><small>100% protegido</small></div></div>
      </div>
    </section>

    <!-- CATEGORIAS -->
    <section class="section" style="padding-top:10px">
      <div class="section-head"><div><h2>Compra por categoría</h2><div class="sub">Encuentra justo lo que buscas</div></div></div>
      <div class="cat-row">
        ${[
          ['bebe','👶','Bebés','#FFDDE7','#/catalog?age=bebe'],
          ['vestido','👗','Vestidos','#FFE3F1','#/catalog?type=vestido'],
          ['pantalon','👖','Pantalones','#E0ECF7','#/catalog?type=pantalon'],
          ['conjunto','🧺','Conjuntos','#FFF0D9','#/catalog?type=conjunto'],
          ['baño','🩱','Baño','#DCEEFC','#/catalog?type=baño'],
          ['acc','🎒','Accesorios','#E3F3E0','#/catalog?type=accesorio']
        ].map(c=>`<a class="cat-circle" href="${c[4]}"><div class="cc" style="background:${c[3]}">${c[1]}</div><span>${c[2]}</span></a>`).join('')}
      </div>
    </section>

    <!-- DESTACADOS -->
    <section class="section" style="padding-top:10px">
      <div class="section-head">
        <div><h2>⭐ Lo más vendido</h2><div class="sub">Los favoritos de nuestras familias</div></div>
        <a class="link-more" href="#/catalog">Ver todo →</a>
      </div>
      <div class="grid">${featured.map(card).join('')}</div>
    </section>

    <!-- PROMO -->
    <section class="section">
      <div class="banner-promo">
        <div>
          <span class="promo-badge">🔥 Oferta de la semana</span>
          <h3>Hasta -40% en pijamas y conjuntos</h3>
          <p>Renueva el armario de tu peque sin gastar de más. ¡Solo por tiempo limitado!</p>
        </div>
        <a href="#/catalog?sale=1" class="btn btn-soft">Aprovechar →</a>
      </div>
    </section>

    <!-- NUEVOS -->
    ${news.length?`<section class="section" style="padding-top:0">
      <div class="section-head"><div><h2>✨ Recién llegado</h2><div class="sub">Las novedades más monas</div></div></div>
      <div class="grid">${news.map(card).join('')}</div>
    </section>`:''}

    <!-- EDADES -->
    <section class="section" style="padding-top:0">
      <div class="section-head"><div><h2>Por edad</h2><div class="sub">Ropa perfecta para cada etapa</div></div></div>
      <div class="grid" style="grid-template-columns:repeat(3,1fr)">
        ${[
          ['bebe','👶','Bebés','0-24 meses','Todo suave para su piel delicada','#FFE3F1','#/catalog?age=bebe'],
          ['inf','🧒','Niños y Niñas','2-7 años','Para correr, jugar y crecer','#DCEEFC','#/catalog?age=infantil'],
          ['may','🎒','Mayores','8-10 años','Estilo y comodidad','#E3F3E0','#/catalog?age=mayor']
        ].map(a=>`
        <a href="${a[6]}" class="card" style="text-align:center;padding:30px;background:${a[5]}">
          <div style="font-size:3rem">${a[1]}</div>
          <h3 style="margin:10px 0 4px">${a[2]}</h3>
          <div class="pill pink" style="margin-bottom:8px">${a[3]}</div>
          <p style="color:var(--ink-soft);font-size:.88rem">${a[4]}</p>
        </a>`).join('')}
      </div>
    </section>
  </div>`;
  window.scrollTo({top:0,behavior:'instant'});
}

/* ---------- CATALOG ---------- */
function applyQuery(str){
  const qs=new URLSearchParams(str);
  if(qs.has('type'))state.filters.type=qs.get('type');
  if(qs.has('age'))state.filters.age=qs.get('age');
  if(qs.has('sale'))state.filters.sale=qs.get('sale');
}
function renderCatalog(query=''){
  applyQuery(query);
  const f=state.filters;
  let list=productsAll();
  if(f.type!=='all')list=list.filter(p=>{
    if(f.type==='accesorio')return p.type==='accesorio'||p.type==='calzado';
    return p.type===f.type;
  });
  if(f.age!=='all')list=list.filter(p=>agesOf(p).includes(f.age));
  if(f.gender!=='all')list=list.filter(p=>p.gender===f.gender||p.gender==='unisex');
  if(f.sale==='1')list=list.filter(p=>p.isSale||p.oldPrice);
  if(f.q){const q=f.q.toLowerCase();list=list.filter(p=>(p.name+' '+p.typeLabel+' '+(p.desc||'')).toLowerCase().includes(q));}
  switch(f.sort){
    case 'price-asc':list.sort((a,b)=>a.price-b.price);break;
    case 'price-desc':list.sort((a,b)=>b.price-a.price);break;
    case 'rating':list.sort((a,b)=>b.rating-a.rating);break;
    case 'newest':list.sort((a,b)=>(b.isNew?1:0)-(a.isNew?1:0));break;
  }
  const activeTitle=()=>{
    if(f.q)return `Resultados para "${esc(f.q)}"`;
    if(f.sale==='1')return '🔥 Ofertas';
    if(f.type!=='all'){const t=TYPES().find(x=>x.id===f.type);return t?t.label:'Catálogo';}
    if(f.age!=='all'){const a=AGES().find(x=>x.id===f.age);return a?a.label:'Catálogo';}
    return 'Todo el catálogo';
  };
  $('#app').innerHTML=`
  <div class="container">
    <div class="catalog">
      <aside class="filters" id="filters">
        <h4>Filtros <button class="mini-btn" id="clearF">Limpiar</button></h4>
        <div class="filter-group">
          <div style="font-weight:800;font-size:.86rem;margin-bottom:8px">Categoría</div>
          <button class="fchip ${f.type==='all'?'active':''}" data-ftype="all">Todas</button>
          ${TYPES().map(t=>`<button class="fchip ${f.type===t.id?'active':''}" data-ftype="${t.id}">${t.label}</button>`).join('')}
        </div>
        <div class="filter-group">
          <div style="font-weight:800;font-size:.86rem;margin-bottom:8px">Edad</div>
          <button class="fchip ${f.age==='all'?'active':''}" data-fage="all">Todas</button>
          ${AGES().map(a=>`<button class="fchip ${f.age===a.id?'active':''}" data-fage="${a.id}">${a.label}</button>`).join('')}
        </div>
        <div class="filter-group">
          <div style="font-weight:800;font-size:.86rem;margin-bottom:8px">Género</div>
          ${[['all','Todos'],['nina','Niña'],['nino','Niño'],['unisex','Unisex']].map(g=>`<button class="fchip ${f.gender===g[0]?'active':''}" data-fgender="${g[0]}">${g[1]}</button>`).join('')}
        </div>
        <div class="filter-group">
          <label class="fchip ${f.sale==='1'?'active':''}" style="cursor:pointer"><input type="checkbox" id="onlySale" ${f.sale==='1'?'checked':''} hidden> 🔥 Solo ofertas</label>
        </div>
      </aside>
      <div>
        <div class="catalog-head">
          <div>
            <button class="btn ghost btn-sm filter-toggle" id="togF">⚙️ Filtros</button>
            <h2 style="display:inline-block;vertical-align:middle">${activeTitle()}</h2>
            <div class="result-count">${list.length} producto(s)</div>
          </div>
          <select class="sort" id="sort">
            <option value="featured" ${f.sort==='featured'?'selected':''}>Destacados</option>
            <option value="price-asc" ${f.sort==='price-asc'?'selected':''}>Precio: menor a mayor</option>
            <option value="price-desc" ${f.sort==='price-desc'?'selected':''}>Precio: mayor a menor</option>
            <option value="rating" ${f.sort==='rating'?'selected':''}>Mejor valorados</option>
            <option value="newest" ${f.sort==='newest'?'selected':''}>Novedades</option>
          </select>
        </div>
        ${list.length?`<div class="grid">${list.map(card).join('')}</div>`:`<div class="empty-state"><div class="es-emoji">🔍</div><h3>No se encontraron productos</h3><p>Prueba con otros filtros.</p></div>`}
      </div>
    </div>
  </div>`;
  // bind filters
  $$('#filters .fchip[data-ftype]').forEach(b=>b.onclick=()=>{f.type=b.dataset.ftype;renderCatalog();});
  $$('#filters .fchip[data-fage]').forEach(b=>b.onclick=()=>{f.age=b.dataset.fage;renderCatalog();});
  $$('#filters .fchip[data-fgender]').forEach(b=>b.onclick=()=>{f.gender=b.dataset.fgender;renderCatalog();});
  $('#onlySale').onchange=e=>{f.sale=e.target.checked?'1':'0';renderCatalog();};
  $('#clearF').onclick=()=>{f.type='all';f.age='all';f.gender='all';f.sale='0';f.q='';$('#search').value='';renderCatalog();};
  $('#sort').onchange=e=>{f.sort=e.target.value;renderCatalog();};
  $('#togF').onclick=()=>$('#filters').classList.toggle('show');
}

/* ---------- CART ---------- */
function openCart(){renderCart();$('#cart-drawer .drawer-bg').classList.add('open');$('#cart-drawer .drawer').classList.add('open');document.body.style.overflow='hidden';}
function closeCart(){$('#cart-drawer .drawer-bg').classList.remove('open');$('#cart-drawer .drawer').classList.remove('open');document.body.style.overflow='';}
function renderCart(){
  const items=state.cart.map(i=>({i,p:findP(i.id)})).filter(x=>x.p);
  const sub=cartSubtotal();
  const ship=sub>=SHIP_FREE||sub===0?0:SHIP_COST;
  const remain=Math.max(0,SHIP_FREE-sub).toFixed(2);
  const progress=sub>0?Math.min(100,(sub/SHIP_FREE)*100):0;
  $('#cart-drawer').innerHTML=`
    <div class="drawer-bg" data-close></div>
    <div class="drawer">
      <div class="drawer-head">
        <h3>🛍️ Tu carrito (${cartCount()})</h3>
        <button class="icon-btn" data-close>✕</button>
      </div>
      <div class="drawer-body">
        ${items.length?`
        ${sub<SHIP_FREE?`<div style="background:#FFF1CF;border-radius:14px;padding:12px;font-size:.84rem;font-weight:700;color:#9a7a1f;margin-bottom:14px">
          🚚 Te faltan <b>$${remain}</b> para el envío GRATIS
          <div style="height:8px;background:#fff;border-radius:99px;margin-top:8px;overflow:hidden"><div style="height:100%;width:${progress}%;background:linear-gradient(90deg,var(--pink),var(--pink-d));border-radius:99px"></div></div>
        </div>`:`<div style="background:#E3F3E0;border-radius:14px;padding:10px;font-size:.84rem;font-weight:800;color:var(--green-d);margin-bottom:14px">🎉 ¡Genial! Tienes envío GRATIS</div>`}
        ${items.map(({i,p})=>`
          <div class="cart-item">
            <div class="ci-thumb" style="background:${p.tint||'#FFEFE6'}">${p.emoji||'👶'}</div>
            <div class="ci-info">
              <div class="ci-name">${esc(p.name)}</div>
              <div class="ci-meta">${i.size?esc(i.size):''}${i.color?' · '+esc(i.color):''}</div>
              <div style="display:flex;align-items:center;justify-content:space-between;margin-top:4px">
                <div class="qty">
                  <button data-dec="${i.key}">−</button><span>${i.qty}</span><button data-inc="${i.key}">+</button>
                </div>
                <div class="ci-price">${money(p.price*i.qty)}</div>
              </div>
              <a class="ci-remove" data-remove="${i.key}" style="cursor:pointer">Eliminar</a>
            </div>
          </div>`).join('')}
        `:`<div class="empty-state"><div class="es-emoji">🛒</div><h3>Tu carrito está vacío</h3><p>¡Añade prendas monas para tus peques!</p><a href="#/catalog" class="btn btn-primary" data-close>Ver catálogo</a></div>`}
      </div>
      ${items.length?`<div class="drawer-foot">
        <div class="cart-line"><span>Subtotal</span><span>${money(sub)}</span></div>
        <div class="cart-line"><span>Envío</span><span>${ship===0?'<span class="free-ship">GRATIS</span>':money(ship)}</span></div>
        <div class="cart-line total"><span>Total</span><span>${money(sub+ship)}</span></div>
        <button class="btn btn-primary btn-block" id="goCheckout" style="margin-top:12px">Finalizar compra →</button>
        <button class="btn btn-ghost btn-block btn-sm" data-close style="margin-top:8px">Seguir comprando</button>
      </div>`:''}
    </div>`;
  $('#cart-drawer').querySelectorAll('[data-close]').forEach(b=>b.onclick=closeCart);
  $('#cart-drawer').querySelectorAll('[data-inc]').forEach(b=>b.onclick=()=>changeQty(b.dataset.inc,+1));
  $('#cart-drawer').querySelectorAll('[data-dec]').forEach(b=>b.onclick=()=>changeQty(b.dataset.dec,-1));
  $('#cart-drawer').querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>removeItem(b.dataset.remove));
  const go=$('#goCheckout');if(go)go.onclick=()=>{closeCart();location.hash='#/checkout';};
}
function changeQty(key,delta){
  const it=state.cart.find(i=>i.key===key);if(!it)return;
  it.qty+=delta;if(it.qty<=0)state.cart=state.cart.filter(i=>i.key!==key);
  save();renderCart();renderHeader();
}
function removeItem(key){state.cart=state.cart.filter(i=>i.key!==key);save();renderCart();renderHeader();toast('Producto eliminado');}

function addToCart(id,{size,color,qty=1}={}){
  const p=findP(id);if(!p)return;
  size=size||p.sizes[0];color=color||(p.colors?p.colors[0]:'');
  const key=id+'|'+size+'|'+color;
  const ex=state.cart.find(i=>i.key===key);
  if(ex)ex.qty+=qty;else state.cart.push({key,id,size,color,qty});
  save();renderHeader();openCart();toast('Añadido al carrito 💕');
}

/* ---------- PRODUCT MODAL ---------- */
let modalSel={id:null,size:null,color:null,qty:1};
function openProductModal(id){
  const p=findP(id);if(!p)return;
  modalSel={id,size:p.sizes[0],color:p.colors?p.colors[0]:'',qty:1};
  const disc=p.oldPrice?Math.round((1-p.price/p.oldPrice)*100):0;
  $('#modal').innerHTML=`
  <div class="modal-bg open" data-mclose>
    <div class="modal-card" style="position:relative">
      <button class="modal-close" data-mclose>✕</button>
      <div class="modal-img" style="--t:${p.tint||'#FFEFE6'}">
        <span class="emoji-bg">${p.emoji||'👶'}</span>
        <img src="${esc(p.img)}" alt="${esc(p.name)}" onerror="this.style.display='none'">
      </div>
      <div class="modal-info">
        <span class="cat-tag">${p.typeLabel||''}</span>
        <h2>${esc(p.name)}</h2>
        <div class="rt-row" style="font-size:.9rem"><span class="star">★</span> ${p.rating||4.8} <span class="rc">(${p.reviews||0} reseñas)</span></div>
        <div class="modal-price"><span class="now" style="font-size:1.7rem">${money(p.price)}</span>${p.oldPrice?`<span class="was">${money(p.oldPrice)}</span>`:''}${disc?`<span class="pill pink">-${disc}%</span>`:''}</div>
        <p class="modal-desc">${esc(p.desc||'')}</p>
        ${p.colors&&p.colors.length?`<div><label class="opt-label">Color: <span id="selColor">${esc(modalSel.color)}</span></label>
          <div class="swatches" id="colorSw">${p.colors.map(c=>`<button class="sw ${c===modalSel.color?'active':''}" data-color="${esc(c)}">${esc(c)}</button>`).join('')}</div></div>`:''}
        <div><label class="opt-label">Talla: <span id="selSize">${esc(modalSel.size)}</span></label>
          <div class="swatches" id="sizeSw">${p.sizes.map(s=>`<button class="sw size-sw ${s===modalSel.size?'active':''}" data-size="${esc(s)}">${esc(s)}</button>`).join('')}</div>
          <a href="#" style="font-size:.78rem;color:var(--blue-d);font-weight:700" onclick="return false">📏 Guía de tallas</a>
        </div>
        <div style="display:flex;align-items:center;gap:14px;margin-top:16px">
          <div class="stepper"><button data-step="-1">−</button><span id="qtyVal">1</span><button data-step="1">+</button></div>
          <button class="btn btn-primary" id="modalAdd" style="flex:1">🛒 Añadir · ${money(p.price)}</button>
        </div>
        <div class="modal-features">
          <span>🚚 Envío 24-72h</span><span>↩️ Devolución gratis</span><span>🔒 Pago seguro</span><span>🌿 ${p.gender==='unisex'?'Unisex':(p.gender==='nina'?'Niña':'Niño')}</span>
        </div>
      </div>
    </div>
  </div>`;
  const m=$('#modal');
  m.querySelectorAll('[data-mclose]').forEach(b=>b.onclick=closeModal);
  m.querySelector('.modal-bg').addEventListener('click',e=>{if(e.target.classList.contains('modal-bg'))closeModal();});
  m.querySelectorAll('#colorSw .sw').forEach(b=>b.onclick=()=>{m.querySelectorAll('#colorSw .sw').forEach(x=>x.classList.remove('active'));b.classList.add('active');modalSel.color=b.dataset.color;$('#selColor').textContent=modalSel.color;});
  m.querySelectorAll('#sizeSw .sw').forEach(b=>b.onclick=()=>{m.querySelectorAll('#sizeSw .sw').forEach(x=>x.classList.remove('active'));b.classList.add('active');modalSel.size=b.dataset.size;$('#selSize').textContent=modalSel.size;});
  m.querySelectorAll('[data-step]').forEach(b=>b.onclick=()=>{modalSel.qty=Math.max(1,modalSel.qty+Number(b.dataset.step));$('#qtyVal').textContent=modalSel.qty;});
  $('#modalAdd').onclick=()=>{addToCart(modalSel.id,{size:modalSel.size,color:modalSel.color,qty:modalSel.qty});closeModal();};
  document.body.style.overflow='hidden';
}
function closeModal(){$('#modal').innerHTML='';document.body.style.overflow='';}

/* ---------- MOBILE NAV ---------- */
function openMobileNav(){
  $('#mobile-nav').innerHTML=`
    <div class="mn-head"><div class="logo"><span class="logo-badge">🧸</span><span>KHC<b> Kids</b></span></div>
    <button class="icon-btn" data-mnclose>✕</button></div>
    ${NAV().map(n=>`<a href="${n.href}" data-mnclose>${n.label}</a>`).join('')}
    <a href="#/catalog?sale=1" data-mnclose style="background:linear-gradient(135deg,var(--pink),var(--pink-d));color:#fff">🔥 Ofertas</a>
    <a href="#/admin" data-mnclose style="font-size:.9rem;color:var(--ink-soft)">⚙️ Administración</a>`;
  $('#mobile-nav').classList.add('open');
  $('#mobile-nav').querySelectorAll('[data-mnclose]').forEach(b=>b.onclick=closeMobileNav);
}
function closeMobileNav(){$('#mobile-nav').classList.remove('open');}

/* ---------- CHECKOUT ---------- */
function renderCheckout(){
  if(!state.cart.length){location.hash='#/catalog';toast('Tu carrito está vacío');return;}
  const sub=cartSubtotal(),ship=sub>=SHIP_FREE?0:SHIP_COST;
  const items=state.cart.map(i=>({i,p:findP(i.id)})).filter(x=>x.p);
  $('#app').innerHTML=`
  <div class="container page-pad">
    <h1 style="margin-bottom:6px">Finalizar compra</h1>
    <p style="color:var(--ink-soft);margin-bottom:24px">Completa tus datos y recibe tu pedido en casa 🏡</p>
    <div class="checkout">
      <form id="ckForm">
        <div class="form-card" style="margin-bottom:18px">
          <h3>📦 Datos de envío</h3>
          <div class="form-grid">
            <div class="field"><label>Nombre</label><input required name="name" placeholder="María"></div>
            <div class="field"><label>Apellidos</label><input required name="last" placeholder="García"></div>
            <div class="field full"><label>Email</label><input required type="email" name="email" placeholder="maria@email.com"></div>
            <div class="field"><label>Teléfono</label><input required name="phone" placeholder="+34 600 000 000"></div>
            <div class="field"><label>Código postal</label><input required name="zip" placeholder="28001"></div>
            <div class="field full"><label>Dirección</label><input required name="addr" placeholder="Calle, número, piso"></div>
            <div class="field"><label>Ciudad</label><input required name="city" placeholder="Madrid"></div>
            <div class="field"><label>País</label><select name="country"><option>España</option><option>México</option><option>Argentina</option><option>Colombia</option><option>Estados Unidos</option><option>Otro</option></select></div>
          </div>
        </div>
        <div class="form-card">
          <h3>💳 Método de pago</h3>
          <div class="pay-methods">
            <label class="pay-opt active"><input type="radio" name="pay" value="card" checked> 💳 Tarjeta (Visa/Mastercard)</label>
            <div class="form-grid" id="cardFields">
              <div class="field full"><label>Número de tarjeta</label><input name="card" placeholder="0000 0000 0000 0000"></div>
              <div class="field"><label>Caducidad</label><input name="exp" placeholder="MM/AA"></div>
              <div class="field"><label>CVV</label><input name="cvv" placeholder="123"></div>
            </div>
            <label class="pay-opt"><input type="radio" name="pay" value="paypal"> 🅿️ PayPal</label>
            <label class="pay-opt"><input type="radio" name="pay" value="cod"> 💵 Contra reembolso (+$1.50)</label>
          </div>
        </div>
      </form>
      <div class="summary">
        <h3>🧾 Resumen del pedido</h3>
        ${items.map(({i,p})=>`
          <div class="sum-item">
            <div class="si-thumb" style="background:${p.tint||'#FFEFE6'}">${p.emoji||'👶'}</div>
            <div><div class="si-name">${esc(p.name)}</div><div class="si-meta">${i.size||''}${i.color?' · '+i.color:''} · x${i.qty}</div></div>
            <div class="si-price">${money(p.price*i.qty)}</div>
          </div>`).join('')}
        <div style="border-top:2px dashed var(--line);margin-top:14px;padding-top:14px">
          <div class="cart-line"><span>Subtotal</span><span>${money(sub)}</span></div>
          <div class="cart-line"><span>Envío</span><span>${ship===0?'GRATIS':money(ship)}</span></div>
          <div class="cart-line total"><span>Total</span><span>${money(sub+ship)}</span></div>
        </div>
        <button class="btn btn-primary btn-block" id="placeOrder" style="margin-top:14px">🔒 Confirmar pedido</button>
        <p style="text-align:center;font-size:.78rem;color:var(--ink-soft);margin-top:10px">Compra 100% segura y cifrada 🔐</p>
      </div>
    </div>
  </div>`;
  $$('.pay-opt').forEach(o=>o.querySelector('input').onchange=()=>{
    $$('.pay-opt').forEach(x=>x.classList.remove('active'));o.classList.add('active');
    $('#cardFields').style.display=o.querySelector('input').value==='card'?'grid':'none';
  });
  $('#placeOrder').onclick=placeOrder;
  window.scrollTo({top:0,behavior:'instant'});
}
function placeOrder(){
  const form=$('#ckForm');if(!form.checkValidity()){form.reportValidity();return;}
  const fd=new FormData(form);
  const sub=cartSubtotal(),ship=sub>=SHIP_FREE?0:SHIP_COST;
  const pay=fd.get('pay');const extra=pay==='cod'?1.5:0;
  const order={
    id:'KHC'+Date.now().toString().slice(-6),
    date:new Date().toISOString(),
    customer:{name:fd.get('name')+' '+fd.get('last'),email:fd.get('email'),phone:fd.get('phone'),addr:fd.get('addr'),city:fd.get('city'),zip:fd.get('zip'),country:fd.get('country')},
    items:state.cart.map(i=>({id:i.id,name:findP(i.id)?.name,size:i.size,color:i.color,qty:i.qty,price:findP(i.id)?.price,emoji:findP(i.id)?.emoji,tint:findP(i.id)?.tint})),
    subtotal:sub,shipping:ship,extra,total:sub+ship+extra,pay
  };
  state.orders.unshift(order);save();
  state.cart=[];save();renderHeader();
  location.hash='#/order/'+order.id;
}
function renderOrder(id){
  const o=state.orders.find(x=>x.id===id);
  if(!o){location.hash='#/';return;}
  $('#app').innerHTML=`
  <div class="container page-pad">
    <div class="form-card confirm">
      <div class="check-circle">✓</div>
      <h1>¡Gracias por tu compra! 💕</h1>
      <p style="color:var(--ink-soft)">Hemos recibido tu pedido correctamente. Te enviaremos la confirmación a <b>${esc(o.customer.email)}</b>.</p>
      <div class="order-id">Pedido #${o.id}</div>
      <div style="background:var(--bg);border-radius:16px;padding:18px;text-align:left;max-width:440px;margin:0 auto">
        <h4 style="margin-bottom:10px">📦 Resumen</h4>
        ${o.items.map(it=>`<div class="sum-item"><div class="si-thumb" style="background:${it.tint||'#FFEFE6'}">${it.emoji||'👶'}</div><div><div class="si-name">${esc(it.name)}</div><div class="si-meta">${it.size||''}${it.color?' · '+it.color:''} · x${it.qty}</div></div><div class="si-price">${money(it.price*it.qty)}</div></div>`).join('')}
        <div style="border-top:2px dashed var(--line);margin-top:10px;padding-top:10px">
          <div class="cart-line"><span>Subtotal</span><span>${money(o.subtotal)}</span></div>
          <div class="cart-line"><span>Envío</span><span>${o.shipping===0?'GRATIS':money(o.shipping)}</span></div>
          ${o.extra?`<div class="cart-line"><span>Contra reembolso</span><span>${money(o.extra)}</span></div>`:''}
          <div class="cart-line total"><span>Total</span><span>${money(o.total)}</span></div>
        </div>
      </div>
      <div style="margin-top:24px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
        <a href="#/" class="btn btn-primary">Volver al inicio</a>
        <a href="#/catalog" class="btn btn-ghost">Seguir comprando</a>
      </div>
    </div>
  </div>`;
  window.scrollTo({top:0,behavior:'instant'});
}

/* ---------- ADMIN ---------- */
function renderAdmin(){
  if(!state.admin){renderAdminLogin();return;}
  const ps=productsAll();
  const revenue=state.orders.reduce((s,o)=>s+o.total,0);
  $('#app').innerHTML=`
  <div class="container admin">
    <div class="admin-top">
      <div><h1 style="margin-bottom:0">⚙️ Panel de administración</h1><p style="color:var(--ink-soft)">Gestiona tus productos y pedidos</p></div>
      <div style="display:flex;gap:8px">
        <button class="btn btn-soft btn-sm" id="logout">🚪 Cerrar sesión</button>
      </div>
    </div>
    <div class="stat-grid">
      <div class="stat"><div class="s-ico" style="background:#FFE3F1">📦</div><div class="s-num">${ps.length}</div><div class="s-lbl">Productos</div></div>
      <div class="stat"><div class="s-ico" style="background:#DCEEFC">🧾</div><div class="s-num">${state.orders.length}</div><div class="s-lbl">Pedidos</div></div>
      <div class="stat"><div class="s-ico" style="background:#E3F3E0">💰</div><div class="s-num">${money(revenue)}</div><div class="s-lbl">Ingresos</div></div>
      <div class="stat"><div class="s-ico" style="background:#FFF1CF">🔥</div><div class="s-num">${ps.filter(p=>p.isSale||p.oldPrice).length}</div><div class="s-lbl">En oferta</div></div>
    </div>
    <div class="admin-tabs">
      <button class="tab ${state.adminTab==='dashboard'?'active':''}" data-tab="dashboard">📊 Dashboard</button>
      <button class="tab ${state.adminTab==='products'?'active':''}" data-tab="products">📦 Productos</button>
      <button class="tab ${state.adminTab==='orders'?'active':''}" data-tab="orders">🧾 Pedidos</button>
    </div>
    <div id="adminBody"></div>
  </div>`;
  $$('.tab').forEach(t=>t.onclick=()=>{state.adminTab=t.dataset.tab;renderAdmin();});
  $('#logout').onclick=()=>{sessionStorage.removeItem('khc_admin');state.admin=false;location.hash='#/';toast('Sesión cerrada');};
  renderAdminBody();
}
function renderAdminBody(){
  const body=$('#adminBody');
  if(state.adminTab==='products')body.innerHTML=adminProducts();
  else if(state.adminTab==='orders')body.innerHTML=adminOrders();
  else body.innerHTML=adminDashboard();
  // bind
  body.querySelectorAll('[data-edit]').forEach(b=>b.onclick=()=>openProductForm(b.dataset.edit));
  body.querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>deleteProduct(b.dataset.del));
  body.querySelectorAll('[data-viewo]').forEach(b=>b.onclick=()=>viewOrder(b.dataset.viewo));
  const addB=body.querySelector('#addPro');if(addB)addB.onclick=()=>openProductForm();
}
function adminDashboard(){
  const top=[...productsAll()].sort((a,b)=>b.reviews-a.reviews).slice(0,5);
  const recent=state.orders.slice(0,5);
  return `
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:18px">
    <div class="table-card" style="padding:18px">
      <h3 style="padding:0 4px 12px">⭐ Productos más valorados</h3>
      ${top.map(p=>`<div style="display:flex;align-items:center;gap:12px;padding:8px 4px;border-bottom:1px solid var(--line)">
        <div class="pro-thumb" style="background:${p.tint}">${p.emoji}</div>
        <div style="flex:1"><div style="font-weight:700">${esc(p.name)}</div><div class="rt-row" style="font-size:.8rem">★ ${p.rating} · ${p.reviews} reseñas</div></div>
        <div style="font-weight:800">${money(p.price)}</div></div>`).join('')}
    </div>
    <div class="table-card" style="padding:18px">
      <h3 style="padding:0 4px 12px">🧾 Pedidos recientes</h3>
      ${recent.length?recent.map(o=>`<div style="display:flex;align-items:center;gap:12px;padding:8px 4px;border-bottom:1px solid var(--line);cursor:pointer" data-viewo="${o.id}">
        <div style="width:40px;height:40px;border-radius:10px;background:#FFE3F1;display:grid;place-items:center">🛍️</div>
        <div style="flex:1"><div style="font-weight:700">#${o.id}</div><div style="font-size:.78rem;color:var(--ink-soft)">${esc(o.customer.name)} · ${o.items.length} art.</div></div>
        <div style="font-weight:800">${money(o.total)}</div></div>`).join(''):'<p style="padding:20px;color:var(--ink-soft)">Aún no hay pedidos. ¡Haz una compra de prueba!</p>'}
    </div>
  </div>`;
}
function adminProducts(){
  const ps=productsAll();
  return `
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
    <h2 style="font-size:1.3rem">Productos (${ps.length})</h2>
    <button class="btn btn-primary btn-sm" id="addPro">➕ Añadir producto</button>
  </div>
  <div class="table-card">
    <table>
      <thead><tr><th>Producto</th><th>Categoría</th><th>Edad</th><th>Precio</th><th>Estado</th><th></th></tr></thead>
      <tbody>
      ${ps.map(p=>`<tr>
        <td><div class="pro-row"><div class="pro-thumb" style="background:${p.tint||'#FFEFE6'}">${p.emoji||'👶'}</div><div><div style="font-weight:700">${esc(p.name)}</div><div style="font-size:.76rem;color:var(--ink-soft)">ID: ${p.id}</div></div></div></td>
        <td>${esc(p.typeLabel||p.type)}</td>
        <td>${esc(p.ageLabel||'')}</td>
        <td><b>${money(p.price)}</b>${p.oldPrice?`<br><span style="text-decoration:line-through;color:var(--ink-soft);font-size:.78rem">${money(p.oldPrice)}</span>`:''}</td>
        <td>${p.isNew?'<span class="pill pink">Nuevo</span> ':''}${p.isSale||p.oldPrice?'<span class="pill" style="background:#FFE3F1;color:#d6456a">Oferta</span>':'<span class="pill">Activo</span>'}</td>
        <td style="white-space:nowrap"><button class="mini-btn" data-edit="${p.id}">✏️</button> <button class="mini-btn del" data-del="${p.id}">🗑️</button></td>
      </tr>`).join('')}
      </tbody>
    </table>
  </div>`;
}
function adminOrders(){
  return `
  <h2 style="font-size:1.3rem;margin-bottom:14px">Pedidos (${state.orders.length})</h2>
  <div class="table-card">
    <table>
      <thead><tr><th>Pedido</th><th>Cliente</th><th>Artículos</th><th>Total</th><th>Pago</th><th>Fecha</th><th></th></tr></thead>
      <tbody>
      ${state.orders.length?state.orders.map(o=>`<tr>
        <td><b>#${o.id}</b></td>
        <td>${esc(o.customer.name)}<br><span style="font-size:.76rem;color:var(--ink-soft)">${esc(o.customer.email)}</span></td>
        <td>${o.items.length}</td>
        <td><b>${money(o.total)}</b></td>
        <td>${o.pay==='card'?'Tarjeta':o.pay==='paypal'?'PayPal':'Reembolso'}</td>
        <td>${new Date(o.date).toLocaleDateString('es-ES',{day:'2-digit',month:'short'})}</td>
        <td><button class="mini-btn" data-viewo="${o.id}">👁️ Ver</button></td>
      </tr>`).join(''):'<tr><td colspan="7" style="text-align:center;padding:30px;color:var(--ink-soft)">Aún no hay pedidos.</td></tr>'}
      </tbody>
    </table>
  </div>`;
}
function viewOrder(id){
  const o=state.orders.find(x=>x.id===id);if(!o)return;
  const tintMap={};
  $('#app').innerHTML+=``;
  openSimpleModal(`
    <h3>🧾 Pedido #${o.id}</h3>
    <p style="color:var(--ink-soft);font-size:.86rem;margin-bottom:14px">${new Date(o.date).toLocaleString('es-ES')}</p>
    <div style="background:var(--bg);border-radius:14px;padding:14px;margin-bottom:14px;font-size:.88rem">
      <b>${esc(o.customer.name)}</b><br>${esc(o.customer.email)} · ${esc(o.customer.phone||'')}<br>${esc(o.customer.addr)}, ${esc(o.customer.city)} ${esc(o.customer.zip)}, ${esc(o.customer.country)}
    </div>
    ${o.items.map(it=>`<div class="sum-item"><div class="si-thumb" style="background:${it.tint||'#FFEFE6'}">${it.emoji||'👶'}</div><div><div class="si-name">${esc(it.name)}</div><div class="si-meta">${it.size||''}${it.color?' · '+it.color:''} · x${it.qty}</div></div><div class="si-price">${money(it.price*it.qty)}</div></div>`).join('')}
    <div style="border-top:2px dashed var(--line);margin-top:12px;padding-top:12px">
      <div class="cart-line"><span>Subtotal</span><span>${money(o.subtotal)}</span></div>
      <div class="cart-line"><span>Envío</span><span>${o.shipping===0?'GRATIS':money(o.shipping)}</span></div>
      ${o.extra?`<div class="cart-line"><span>Extra</span><span>${money(o.extra)}</span></div>`:''}
      <div class="cart-line total"><span>Total</span><span>${money(o.total)}</span></div>
    </div>
    <button class="btn btn-ghost btn-block" style="margin-top:14px" id="closeSimple">Cerrar</button>
  `);
}
function openSimpleModal(html){
  $('#modal').innerHTML=`<div class="modal-bg open" data-mclose><div class="form-modal" style="position:relative"><button class="modal-close" data-mclose>✕</button>${html}</div></div>`;
  $('#modal').querySelectorAll('[data-mclose]').forEach(b=>b.onclick=closeModal);
  $('#modal').querySelector('.modal-bg').addEventListener('click',e=>{if(e.target.classList.contains('modal-bg'))closeModal();});
  const c=$('#closeSimple');if(c)c.onclick=closeModal;
  document.body.style.overflow='hidden';
}

/* ---------- ADMIN: PRODUCT FORM ---------- */
function openProductForm(editId){
  const p=editId?findP(editId):null;
  $('#modal').innerHTML=`
  <div class="modal-bg open" data-mclose>
    <div class="form-modal" style="position:relative">
      <button class="modal-close" data-mclose>✕</button>
      <h3>${p?'✏️ Editar producto':'➕ Nuevo producto'}</h3>
      <form id="pForm">
        <input type="hidden" name="id" value="${p?p.id:''}">
        <div class="field full"><label>Nombre del producto</label><input required name="name" value="${p?esc(p.name):''}" placeholder="Ej: Vestido de playa"></div>
        <div class="form-grid">
          <div class="field"><label>Categoría</label><select name="type">
            ${TYPES().map(t=>`<option value="${t.id}" ${p&&p.type===t.id?'selected':''}>${t.label}</option>`).join('')}
          </select></div>
          <div class="field"><label>Edad</label><select name="age">
            ${AGES().map(a=>`<option value="${a.id}" ${p&&agesOf(p)[0]===a.id?'selected':''}>${a.label}</option>`).join('')}
          </select></div>
          <div class="field"><label>Género</label><select name="gender">
            <option value="unisex" ${p&&p.gender==='unisex'?'selected':''}>Unisex</option>
            <option value="nina" ${p&&p.gender==='nina'?'selected':''}>Niña</option>
            <option value="nino" ${p&&p.gender==='nino'?'selected':''}>Niño</option>
          </select></div>
          <div class="field"><label>Emoji (para la imagen)</label><input name="emoji" value="${p?esc(p.emoji||''):'👶'}" placeholder="👶"></div>
          <div class="field"><label>Precio ($)</label><input required type="number" step="0.01" name="price" value="${p?p.price:''}" placeholder="9.99"></div>
          <div class="field"><label>Precio antes (opcional)</label><input type="number" step="0.01" name="oldPrice" value="${p&&p.oldPrice?p.oldPrice:''}" placeholder="14.99"></div>
          <div class="field full"><label>URL de imagen (opcional)</label><input name="img" value="${p?esc(p.img||''):''}" placeholder="img/... o https://..."></div>
          <div class="field full"><label>Colores (separados por coma)</label><input name="colors" value="${p?(p.colors||[]).join(', '):''}" placeholder="Rosa, Celeste, Blanco"></div>
          <div class="field full"><label>Tallas (separadas por coma)</label><input name="sizes" value="${p?(p.sizes||[]).join(', '):''}" placeholder="2-3A, 4-5A, 6-7A"></div>
          <div class="field full"><label>Descripción</label><textarea name="desc" rows="3" placeholder="Describe el producto...">${p?esc(p.desc||''):''}</textarea></div>
        </div>
        <div style="display:flex;gap:8px;margin-top:8px">
          <label class="pay-opt" style="flex:1"><input type="checkbox" name="isNew" ${p&&p.isNew?'checked':''}> ✨ Marcar como nuevo</label>
          <label class="pay-opt" style="flex:1"><input type="checkbox" name="isSale" ${p&&p.isSale?'checked':''}> 🔥 Marcar oferta</label>
        </div>
        <div style="display:flex;gap:10px;margin-top:18px">
          <button type="submit" class="btn btn-primary" style="flex:1">💾 Guardar</button>
          <button type="button" class="btn btn-ghost" data-mclose>Cancelar</button>
        </div>
      </form>
    </div>
  </div>`;
  $('#modal').querySelectorAll('[data-mclose]').forEach(b=>b.onclick=closeModal);
  $('#modal').querySelector('.modal-bg').addEventListener('click',e=>{if(e.target.classList.contains('modal-bg'))closeModal();});
  $('#pForm').onsubmit=saveProduct;
  document.body.style.overflow='hidden';
}
function saveProduct(e){
  e.preventDefault();
  const f=new FormData(e.target);
  const type=f.get('type');
  const typeLabel=(TYPES().find(t=>t.id===type)||{}).label||type;
  const age=f.get('age');
  const ageLabel=(AGES().find(a=>a.id===age)||{}).label||age;
  const colors=f.get('colors').split(',').map(s=>s.trim()).filter(Boolean);
  const sizes=f.get('sizes').split(',').map(s=>s.trim()).filter(Boolean);
  const tints=['#FFE5EC','#FFF0D9','#E3F3E0','#FFE0EC','#DCEFE0','#E0ECF7','#FFE3F1','#FFDFD5','#E6E0F2','#DDE6F0','#E0EFFA','#E2E8F2','#EDE0EF'];
  const data={
    id:f.get('id')||('c'+Date.now()),
    name:f.get('name'),
    type,typeLabel,age,ageLabel,
    gender:f.get('gender'),
    price:parseFloat(f.get('price'))||0,
    oldPrice:f.get('oldPrice')?parseFloat(f.get('oldPrice')):null,
    rating:4.8,reviews:0,
    isNew:!!f.get('isNew'),isSale:!!f.get('isSale'),
    colors,sizes,
    emoji:f.get('emoji')||'👶',
    tint:tints[Math.floor(Math.random()*tints.length)],
    img:f.get('img')||('img/'+(f.get('id')||Date.now())+'.jpg'),
    desc:f.get('desc')||''
  };
  // if editing existing seed product, move into custom
  const customIdx=state.custom.findIndex(p=>p.id===data.id);
  if(f.get('id')&&customIdx>=0){state.custom[customIdx]=data;}
  else{
    // editing a seed product -> store override in custom
    if(f.get('id')&&seed().find(p=>p.id===data.id)){state.custom.push(data);}
    else{state.custom.push(data);}
  }
  save();closeModal();renderAdmin();toast('Producto guardado ✅');
}
function deleteProduct(id){
  if(!confirm('¿Eliminar este producto? Se ocultará de la tienda.'))return;
  state.deleted.push(id);
  // also remove from custom if present
  state.custom=state.custom.filter(p=>p.id!==id);
  save();renderAdmin();toast('Producto eliminado');
}

function renderAdminLogin(){
  $('#app').innerHTML=`
  <div class="container">
    <div class="admin-login">
      <div class="al-emoji">🔐</div>
      <h2>Acceso administrador</h2>
      <p style="color:var(--ink-soft);margin-bottom:20px">Introduce la contraseña para gestionar la tienda.</p>
      <form id="loginForm">
        <div class="field full"><input type="password" id="pw" placeholder="Contraseña" required style="text-align:center"></div>
        <button class="btn btn-primary btn-block" type="submit">Entrar →</button>
      </form>
      <p style="font-size:.8rem;color:var(--ink-soft);margin-top:16px">💡 Contraseña de demo: <b>khckids</b></p>
      <a href="#/" style="display:inline-block;margin-top:10px;color:var(--ink-soft)">← Volver a la tienda</a>
    </div>
  </div>`;
  $('#loginForm').onsubmit=e=>{
    e.preventDefault();
    if($('#pw').value===ADMIN_PASS){sessionStorage.setItem('khc_admin','1');state.admin=true;renderAdmin();toast('Bienvenido al panel 👋');}
    else toast('Contraseña incorrecta ❌');
  };
}

/* ---------- ROUTER ---------- */
function route(){
  closeCart();closeModal();closeMobileNav();
  const hash=location.hash.replace(/^#/,'')||'/';
  const [path,query]=hash.split('?');
  const parts=path.split('/').filter(Boolean);
  if(parts.length===0){renderHome();}
  else if(parts[0]==='catalog'){renderCatalog(query||'');}
  else if(parts[0]==='checkout'){renderCheckout();}
  else if(parts[0]==='order'&&parts[1]){renderOrder(parts[1]);}
  else if(parts[0]==='admin'){renderAdmin();}
  else{renderHome();}
  window.scrollTo({top:0,behavior:'instant'});
}

/* ---------- EVENT DELEGATION ---------- */
d.addEventListener('click',e=>{
  const open=e.target.closest('[data-open]');
  if(open&&!e.target.closest('[data-add]')&&!e.target.closest('[data-fav]')){openProductModal(open.dataset.open);return;}
  const add=e.target.closest('[data-add]');
  if(add){e.preventDefault();addToCart(add.dataset.add);return;}
  const fav=e.target.closest('[data-fav]');
  if(fav){e.preventDefault();fav.classList.toggle('active');fav.textContent=fav.classList.contains('active')?'♥':'♡';toast(fav.classList.contains('active')?'Añadido a favoritos 💕':'');return;}
});

window.addEventListener('hashchange',route);

/* ---------- INIT ---------- */
function init(){
  renderHeader();renderFooter();route();
}
init();
})();
