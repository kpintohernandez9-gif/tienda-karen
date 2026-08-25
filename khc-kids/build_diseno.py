# -*- coding: utf-8 -*-
"""Genera el dossier de diseño de la tienda física KHC Kids (3x6m) en HTML autocontenido."""
import base64, os

BASE = "/home/user/khc-kids"

def b64(name):
    with open(os.path.join(BASE, "img", name), "rb") as f:
        return "data:image/jpeg;base64," + base64.b64encode(f.read()).decode()

with open(os.path.join(BASE, "plano-tienda-khc-kids.svg"), encoding="utf-8") as f:
    plano = f.read()

imgs = {
    "fachada": b64("diseno-fachada.jpg"),
    "interior": b64("diseno-interior.jpg"),
    "ninas": b64("diseno-pared-ninas.jpg"),
    "bebes": b64("diseno-bebes.jpg"),
    "caja": b64("diseno-caja.jpg"),
}

html = f"""<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>KHC Kids · Diseño tienda física 3×6 m</title>
<style>
  :root {{
    --pink:#E36A98; --blue:#4E96BF; --green:#5C8A3C; --yel:#E0A93A;
    --ink:#5A4852; --soft:#9A8A92; --line:#F3E5EC; --cream:#FFFBF6; --bg:#FFF6EF;
  }}
  * {{ box-sizing:border-box; margin:0; padding:0; }}
  body {{ font-family:'Segoe UI',Verdana,Arial,sans-serif; color:var(--ink); background:var(--cream); line-height:1.6; }}
  .wrap {{ max-width:1060px; margin:0 auto; padding:24px 20px 60px; }}
  header.hero {{
    background:linear-gradient(135deg,#FFE3F1,#DCEEFC 55%,#FFF1CF); border-radius:26px;
    padding:44px 40px; margin-bottom:30px; text-align:center;
  }}
  header.hero h1 {{ font-size:clamp(1.8rem,4vw,2.6rem); color:var(--pink); margin-bottom:8px; }}
  header.hero p {{ color:var(--ink); font-weight:600; }}
  .chips {{ display:flex; gap:10px; flex-wrap:wrap; justify-content:center; margin-top:18px; }}
  .chip {{ background:#fff; border-radius:999px; padding:9px 18px; font-weight:800; font-size:.9rem; box-shadow:0 4px 14px rgba(190,120,150,.12); }}
  h2 {{ color:var(--pink); font-size:1.5rem; margin:38px 0 6px; display:flex; align-items:center; gap:10px; }}
  h2 .num {{ background:var(--pink); color:#fff; width:34px; height:34px; border-radius:12px; display:grid; place-items:center; font-size:1rem; }}
  .sub {{ color:var(--soft); font-weight:600; margin-bottom:16px; }}
  .card {{ background:#fff; border-radius:22px; padding:22px; box-shadow:0 6px 22px rgba(190,120,150,.10); margin-bottom:18px; }}
  img.render {{ width:100%; border-radius:16px; display:block; }}
  .grid2 {{ display:grid; grid-template-columns:1fr 1fr; gap:18px; }}
  .spec {{ background:var(--bg); border-radius:16px; padding:16px 18px; margin-top:14px; }}
  .spec h4 {{ margin-bottom:8px; font-size:1rem; }}
  .spec ul {{ list-style:none; }}
  .spec li {{ padding:4px 0 4px 26px; position:relative; font-size:.92rem; }}
  .spec li::before {{ content:'✓'; position:absolute; left:4px; color:var(--green); font-weight:800; }}
  table {{ width:100%; border-collapse:collapse; background:#fff; border-radius:16px; overflow:hidden; box-shadow:0 6px 22px rgba(190,120,150,.10); }}
  th {{ background:linear-gradient(135deg,var(--pink),#c9557e); color:#fff; text-align:left; padding:12px 14px; font-size:.85rem; }}
  td {{ padding:11px 14px; border-bottom:1px solid var(--line); font-size:.9rem; vertical-align:top; }}
  tr:last-child td {{ border-bottom:none; }}
  .planobox {{ background:#fff; border-radius:22px; padding:14px; box-shadow:0 6px 22px rgba(190,120,150,.10); }}
  .planobox svg {{ width:100%; height:auto; display:block; }}
  .swatches {{ display:flex; gap:12px; flex-wrap:wrap; margin:12px 0; }}
  .sw {{ flex:1; min-width:130px; border-radius:14px; padding:12px; color:#fff; font-weight:800; font-size:.82rem; text-align:center; }}
  .total {{ background:linear-gradient(135deg,#C7E5B5,#5C8A3C); color:#fff; border-radius:18px; padding:18px 22px; text-align:center; font-size:1.05rem; font-weight:800; margin-top:14px; }}
  .note {{ font-size:.82rem; color:var(--soft); margin-top:8px; }}
  footer {{ margin-top:40px; text-align:center; color:var(--soft); font-size:.85rem; }}
  @media(max-width:760px) {{ .grid2 {{ grid-template-columns:1fr; }} }}
</style>
</head>
<body>
<div class="wrap">

<header class="hero">
  <h1>🧸 KHC KIDS · Diseño de tienda física</h1>
  <p>Proyecto completo para local de <b>3 × 6 metros (18 m²)</b> · Ropa infantil tropical 0–10 años</p>
  <div class="chips">
    <span class="chip">📐 18 m²</span>
    <span class="chip">🎨 Estilo pastel</span>
    <span class="chip">🏬 7 zonas</span>
    <span class="chip">🪟 Escaparate 1,90 m</span>
    <span class="chip">💰 Presupuesto estimado</span>
  </div>
</header>

<!-- 1. FACHADA -->
<h2><span class="num">1</span> 🏠 Fachada y escaparate</h2>
<p class="sub">La primera impresión: tierno, colorido y muy visible desde la calle</p>
<div class="card">
  <img class="render" src="{imgs['fachada']}" alt="Fachada KHC Kids">
  <div class="spec">
    <h4>🏞️ Especificaciones de fachada (frente de 3,00 m)</h4>
    <ul>
      <li><b>Rótulo:</b> letras 3D retroiluminadas "KHC KIDS" + osito · ancho 2,4 m sobre banda de crema</li>
      <li><b>Escaparate:</b> vidrio templado de 1,90 m con 2 maniquíes infantiles sobre podios de madera</li>
      <li><b>Puerta:</b> vidrio 0,90 m con vinilos de nubes y "Ropa para peques 0–10 años"</li>
      <li><b>Toldo:</b> rayas rosa/blanco de 3 m · protege del sol tropical</li>
      <li><b>Base:</b> zócalo de cerámica pastel hasta 0,60 m</li>
      <li><b>Iluminación:</b> 3 spots cálidos orientados a los maniquíes + rótulo encendido hasta las 21:00</li>
      <li><b>Decals:</b> precio gancho ("Desde $4,50") y QR hacia tu Instagram/WhatsApp</li>
    </ul>
  </div>
</div>

<!-- 2. PLANO -->
<h2><span class="num">2</span> 📐 Plano de planta</h2>
<p class="sub">Distribución de 18 m² con circulación fluida y máximo frente de venta</p>
<div class="planobox">
  {plano}
</div>

<!-- 3. INTERIOR -->
<h2><span class="num">3</span> 🛍️ Interior · Vistas</h2>
<p class="sub">Recorrido del cliente: escaparate → niñas/niños → mesas centrales → bebés → caja</p>
<div class="card">
  <img class="render" src="{imgs['interior']}" alt="Interior general KHC Kids">
  <div class="spec">
    <h4>👀 Vista desde la entrada</h4>
    <ul>
      <li>Paredes bicolor: rosa palo (niñas) y celeste (niños) con <b>nicheos de arco</b></li>
      <li>Pasillo central de ≈0,70 m con 2 mesas de madera para ofertas y combos</li>
      <li>Fondo visual: mostrador con pared de arcos y repisas de accesorios</li>
      <li>Techo con nubes y guirnalda de globos → parada de fotos para familias</li>
    </ul>
  </div>
</div>
<div class="grid2">
  <div class="card">
    <img class="render" src="{imgs['ninas']}" alt="Pared niñas">
    <div class="spec">
      <h4>🌸 Pared Niñas (izquierda)</h4>
      <ul>
        <li>Arcos rosa con repisas de madera y barra doble (vestidos/faldas)</li>
        <li>Cartelitos de precio estilo pizarra</li>
        <li>Tiras LED cálidas bajo cada repisa</li>
      </ul>
    </div>
  </div>
  <div class="card">
    <img class="render" src="{imgs['bebes']}" alt="Rincón bebés">
    <div class="spec">
      <h4>👶 Rincón Bebés (fondo izquierda)</h4>
      <ul>
        <li>Cuna de madera como exhibidor de bodies y mamelucos</li>
        <li>Canastas de mimbre con ajuares y baberos</li>
        <li>Alfombra redonda ⌀1,1 m + osito gigante de decoración</li>
      </ul>
    </div>
  </div>
</div>
<div class="card">
  <img class="render" src="{imgs['caja']}" alt="Zona de caja">
  <div class="spec">
    <h4>💳 Caja y accesorios (fondo)</h4>
    <ul>
      <li>Mostrador de madera 1,2 × 0,55 m con esquinas redondeadas</li>
      <li>Pared de arcos verde pastel con mochilas, gorras y gafas</li>
      <li>TPV + cajón monedero + bolsas de marca para la compra</li>
    </ul>
  </div>
</div>

<!-- 4. ZONAS -->
<h2><span class="num">4</span> 🗂️ Distribución por zonas</h2>
<p class="sub">Qué exhibir en cada metro lineal de la tienda</p>
<table>
  <tr><th>Zona</th><th>Ubicación</th><th>Mobiliario</th><th>Qué exhibir</th></tr>
  <tr><td>🌸 Niñas</td><td>Pared izquierda · frente (0,8–3,0 m)</td><td>Barra doble + 8 repisas (2,2 ml)</td><td>Vestidos, conjuntos, faldas, palazzos</td></tr>
  <tr><td>👦 Niños</td><td>Pared derecha · frente (0,8–3,0 m)</td><td>Barra doble + 8 repisas (2,2 ml)</td><td>Franelas, conjuntos, bermudas, polos</td></tr>
  <tr><td>🔥 Ofertas</td><td>Mesa central 1 (2,5 m del frente)</td><td>Mesa góndola 0,8 × 0,5 m</td><td>Prendas de gira rápida · precio gancho</td></tr>
  <tr><td>🎁 Combos</td><td>Mesa central 2 (4,0 m del frente)</td><td>Mesa góndola 0,8 × 0,5 m</td><td>Packs (3 bodies, 2 pijamas…) y accesorios</td></tr>
  <tr><td>👶 Bebés</td><td>Pared izquierda · fondo (3,3–5,4 m)</td><td>Estantería baja + cuna + alfombra</td><td>Bodies, mamelucos, ajuares, baberos</td></tr>
  <tr><td>😴 Pijamas &amp; Unisex</td><td>Pared derecha · fondo (3,3–5,4 m)</td><td>Barra + cubos de tela</td><td>Pijamas, polos, caliszones, calcetines</td></tr>
  <tr><td>💳 Caja</td><td>Pared del fondo</td><td>Mostrador 1,2 m + repisas altas</td><td>Mochilas, gorras, gafas · impulso final</td></tr>
</table>

<!-- 5. PALETA -->
<h2><span class="num">5</span> 🎨 Paleta y materiales</h2>
<p class="sub">El look "pastel tierno tropical" de tu marca</p>
<div class="card">
  <div class="swatches">
    <div class="sw" style="background:#FFE3F1;color:#B04A75">Rosa palo<br>#FFE3F1</div>
    <div class="sw" style="background:#DCEEFC;color:#2E6E93">Celeste<br>#DCEEFC</div>
    <div class="sw" style="background:#FFF1CF;color:#96700F">Vainilla<br>#FFF1CF</div>
    <div class="sw" style="background:#FFE3D3;color:#A05A2C">Durazno<br>#FFE3D3</div>
    <div class="sw" style="background:#E3F3E0;color:#3E6E28">Menta<br>#E3F3E0</div>
    <div class="sw" style="background:#5A4852">Tinta<br>#5A4852</div>
  </div>
  <div class="spec">
    <h4>🧱 Materiales clave</h4>
    <ul>
      <li><b>Melamina blanca + madera clara</b> (pino) en estanterías, mesas y mostrador</li>
      <li><b>Pintura lavable</b> en paredes (semi-mate) — fácil de limpiar</li>
      <li><b>Piso:</b> porcelanato claro antiderrapante o microcemento</li>
      <li><b>Vinilos decorativos:</b> nubes, arcoíris y ositos removibles</li>
      <li><b>Textiles:</b> alfombra redonda, cortina de fondo en lino natural</li>
    </ul>
  </div>
</div>

<!-- 6. CLIMA -->
<h2><span class="num">6</span> 💡 Iluminación y clima</h2>
<div class="card">
  <div class="grid2">
    <div class="spec" style="margin-top:0">
      <h4>💡 Luz</h4>
      <ul>
        <li>1 riel LED con 8 spots (3000–4000 K)</li>
        <li>Tiras LED bajo repisas</li>
        <li>3 spots para el escaparate</li>
        <li>Rótulo luminoso con temporizador</li>
      </ul>
    </div>
    <div class="spec" style="margin-top:0">
      <h4>❄️ Clima tropical</h4>
      <ul>
        <li>A/C split 12.000 BTU sobre la puerta</li>
        <li>Extractor silencioso al fondo</li>
        <li>Toldo exterior anti-sol</li>
        <li>Deshumidificador pequeño en temporada de lluvias</li>
      </ul>
    </div>
  </div>
</div>

<!-- 7. PRESUPUESTO -->
<h2><span class="num">7</span> 💰 Presupuesto estimado</h2>
<p class="sub">Cifras orientativas en USD para Venezuela (puede variar según ciudad y proveedor)</p>
<table>
  <tr><th>Partida</th><th>Detalle</th><th>Estimado</th></tr>
  <tr><td>Estanterías de pared ×2</td><td>Melamina + barras + repisas (4,4 ml)</td><td>$450</td></tr>
  <tr><td>Mesas góndola ×2</td><td>Madera 0,8 × 0,5 m con 2 niveles</td><td>$180</td></tr>
  <tr><td>Mostrador / caja</td><td>Madera 1,2 × 0,55 m + TPV básico</td><td>$220</td></tr>
  <tr><td>Cuna exhibidora</td><td>Madera blanca decorativa</td><td>$90</td></tr>
  <tr><td>Rótulo luminoso</td><td>Letras 3D "KHC KIDS" + instalación</td><td>$350</td></tr>
  <tr><td>Toldo + vinilos</td><td>Toldo rayado + decals de vidrio</td><td>$210</td></tr>
  <tr><td>Pintura y acabados</td><td>Paredes bicolor + arcos + piso sellado</td><td>$200</td></tr>
  <tr><td>Iluminación completa</td><td>Riel + spots + tiras LED + eléctrico</td><td>$280</td></tr>
  <tr><td>Aire acondicionado</td><td>Split 12.000 BTU instalado</td><td>$420</td></tr>
  <tr><td>Decoración</td><td>Nubes, globos, alfombra, plantas, maniquíes ×3</td><td>$260</td></tr>
  <tr><td>Varios</td><td>Espejo, felpudo, cámara, bolsas de marca</td><td>$80</td></tr>
</table>
<div class="total">💵 Inversión total estimada: ≈ $2.750 &nbsp;(rango realista $2.400 – $3.200)</div>
<p class="note">Nota: no incluye alquiler del local ni la mercancía (tu inventario de $1.443 en Shein ya lo cubre).</p>

<footer>KHC Kids · Dossier de diseño de tienda física 3 × 6 m · Renders ilustrativos generados para tu marca · Plano escala aprox. 1:50</footer>
</div>
</body>
</html>"""

out = os.path.join(BASE, "diseno-tienda-khc-kids.html")
with open(out, "w", encoding="utf-8") as f:
    f.write(html)
print("HTML OK ->", out, f"({os.path.getsize(out)/1024:.0f} KB)")
