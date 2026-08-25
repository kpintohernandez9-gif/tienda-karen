/* ============================================================
   KHC KIDS · Boutique premium — lógica de la página
   ============================================================ */
(function () {
  'use strict';

  /* ---------- header con sombra al hacer scroll ---------- */
  var header = document.getElementById('hdr');
  var onScroll = function () {
    header.classList.toggle('scrolled', window.scrollY > 10);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- reveal on scroll ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.rv').forEach(function (el) { io.observe(el); });

  /* ---------- colección ---------- */
  var grid = document.getElementById('grid');
  var products = window.KHC_PRODUCTS || [];

  function stockLabel(p) {
    return 'Quedan ' + p.units + ' de ' + p.totalUnits;
  }

  function cardHTML(p) {
    var pct = Math.max(6, Math.round((p.units / p.totalUnits) * 100));
    return (
      '<article class="card rv in" data-type="' + p.type + '">' +
        '<div class="card-media">' +
          '<img src="' + p.img + '" alt="' + p.name + '" loading="lazy">' +
          '<span class="badge-stock">' + stockLabel(p) + '</span>' +
          '<span class="badge-tag">' + p.tag + '</span>' +
        '</div>' +
        '<div class="card-body">' +
          '<span class="card-type">' + p.typeLabel + ' · ' + p.ageLabel + '</span>' +
          '<h3 class="card-name">' + p.name + '</h3>' +
          '<p class="card-desc">' + p.desc + '</p>' +
          '<div class="stockbar" title="' + stockLabel(p) + ' unidades"><i style="width:' + pct + '%"></i></div>' +
          '<div class="card-foot">' +
            '<span class="price">' + p.price + ' €<small>edición limitada</small></span>' +
            '<button class="btn-card" data-reservar="' + p.id + '">Reservar</button>' +
          '</div>' +
        '</div>' +
      '</article>'
    );
  }

  function render(filter) {
    var list = filter === 'all' ? products : products.filter(function (p) { return p.type === filter; });
    grid.innerHTML = list.map(cardHTML).join('');
  }
  render('all');

  document.querySelectorAll('.filter-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      render(btn.dataset.filter);
    });
  });

  /* ---------- modal de reserva ---------- */
  var modal = document.getElementById('modal');
  var modalCard = document.getElementById('modal-card');

  function openModal(p) {
    modalCard.innerHTML =
      '<button class="modal-close" aria-label="Cerrar">✕</button>' +
      '<div class="modal-img"><img src="' + p.img + '" alt="' + p.name + '"></div>' +
      '<div class="modal-body">' +
        '<span class="card-type">' + p.typeLabel + ' · ' + p.ageLabel + '</span>' +
        '<h3>' + p.name + '</h3>' +
        '<p class="desc">' + p.desc + ' <strong>' + stockLabel(p) + ' unidades.</strong></p>' +
        '<form data-form>' +
          '<label for="f-size">Talla</label>' +
          '<select id="f-size" required>' + p.sizes.map(function (s) { return '<option>' + s + '</option>'; }).join('') + '</select>' +
          '<label for="f-name">Tu nombre</label>' +
          '<input id="f-name" type="text" placeholder="Nombre y apellido" required>' +
          '<label for="f-contact">WhatsApp o email</label>' +
          '<input id="f-contact" type="text" placeholder="Para confirmar tu reserva" required>' +
          '<div style="margin-top:20px"><button class="btn btn-primary" type="submit" style="width:100%">Reservar mi unidad · ' + p.price + ' €</button></div>' +
        '</form>' +
      '</div>';
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    modalCard.querySelector('.modal-close').addEventListener('click', closeModal);
    modalCard.querySelector('[data-form]').addEventListener('submit', function (ev) {
      ev.preventDefault();
      var size = modalCard.querySelector('#f-size').value;
      modalCard.innerHTML =
        '<button class="modal-close" aria-label="Cerrar">✕</button>' +
        '<div class="modal-success">' +
          '<div class="big">🌸</div>' +
          '<h3>¡Reserva recibida!</h3>' +
          '<p>Gracias por confiar en KHC Kids. Te escribiremos muy pronto para confirmar tu reserva de <strong>' + p.name + '</strong> en talla <strong>' + size + '</strong>. Recuerda: cada diseño vuela.</p>' +
          '<div style="margin-top:24px"><button class="btn btn-ghost" data-close>Volver a la colección</button></div>' +
        '</div>';
      modalCard.querySelector('.modal-close').addEventListener('click', closeModal);
      modalCard.querySelector('[data-close]').addEventListener('click', closeModal);
    });
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  grid.addEventListener('click', function (ev) {
    var btn = ev.target.closest('[data-reservar]');
    if (!btn) return;
    var p = products.find(function (x) { return x.id === btn.dataset.reservar; });
    if (p) openModal(p);
  });
  modal.querySelector('.modal-backdrop').addEventListener('click', closeModal);
  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape') closeModal();
  });
})();
