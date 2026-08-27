# -*- coding: utf-8 -*-
"""
Catálogo visual de la TIENDA KHC Kids (lista de precios).
Lee js/data.js y genera un PDF en cuadrícula con todas las prendas y sus precios de venta.
Uso: python3 build_store_catalog.py   (requiere reportlab y pillow)
"""
import os, io, json, subprocess
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image
from reportlab.lib.enums import TA_CENTER
from PIL import Image as PILImage

BASE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(BASE, "Catalogo-Tienda-KHC-Kids.pdf")

# ---- leer data.js ----
data = json.loads(subprocess.check_output(["node", "export_json.js"], cwd=BASE))
P = data["products"]

PINK = HexColor("#E36A98"); BLUE = HexColor("#4E96BF"); GREEN = HexColor("#5C8A3C"); ORANGE = HexColor("#D87A4A")
INK = HexColor("#5A4852"); SOFT = HexColor("#9A8A92")
CREAM = HexColor("#FFFBF6"); LINEC = HexColor("#EADFE6"); WHITE = HexColor("#FFFFFF")

def money(x): return f"{x:,.0f} €"

SEC = [("bebe", "BEBÉS · 0-24 MESES", ORANGE),
       ("nina", "NIÑAS · 1-6 AÑOS", PINK),
       ("nino", "NIÑOS · 1-6 AÑOS", BLUE),
       ("acc",  "ACCESORIOS · 0-6 AÑOS", GREEN)]

# ---- estilos ----
ss = getSampleStyleSheet()
st_title = ParagraphStyle('t', fontName='Helvetica-Bold', fontSize=32, textColor=PINK, leading=36)
st_sub = ParagraphStyle('s', fontName='Helvetica', fontSize=12, textColor=SOFT, leading=16)
st_sec = ParagraphStyle('sec', fontName='Helvetica-Bold', fontSize=13, textColor=WHITE, leading=17)
st_name = ParagraphStyle('n', fontName='Helvetica-Bold', fontSize=8.8, textColor=INK, leading=10.5)
st_meta = ParagraphStyle('me', fontName='Helvetica', fontSize=7, textColor=SOFT, leading=8.5)
st_price = ParagraphStyle('p', fontName='Helvetica-Bold', fontSize=12.5, textColor=GREEN, leading=14)
st_badge = ParagraphStyle('b', fontName='Helvetica-Bold', fontSize=6.5, textColor=PINK, leading=8)
st_ph = ParagraphStyle('ph', fontName='Helvetica-Bold', fontSize=8, textColor=SOFT, alignment=TA_CENTER, leading=10)
st_foot = ParagraphStyle('f', fontName='Helvetica-Oblique', fontSize=7.5, textColor=SOFT, leading=10)

def img_cell(rel, label, w, h):
    path = os.path.join(BASE, rel)  # rel incluye 'img/...'
    if not os.path.exists(path):
        t = Table([[Paragraph(label, st_ph)]], colWidths=[w], rowHeights=[h])
        t.setStyle(TableStyle([('BACKGROUND', (0, 0), (-1, -1), HexColor('#FFEFE6')),
                               ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'), ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
                               ('BOX', (0, 0), (-1, -1), 1, LINEC)]))
        return t
    im = PILImage.open(path).convert('RGB'); im.thumbnail((420, 420))
    buf = io.BytesIO(); im.save(buf, 'JPEG', quality=80); buf.seek(0)
    return Image(buf, width=w, height=h)

def card(p):
    badge = (p.get("tag") or "").upper()
    old = f' <font size=8 color="#9A8A92"><strike>{money(p["oldPrice"])}</strike></font>' if p.get("oldPrice") else ""
    flow = []
    flow.append(img_cell(p["img"], p.get("typeLabel", "")[:14], 48*mm, 48*mm))
    flow.append(Spacer(1, 2*mm))
    if badge: flow.append(Paragraph(badge, st_badge))
    flow.append(Paragraph(p["name"], st_name))
    flow.append(Paragraph(f'{p.get("typeLabel","")} · {p.get("ageLabel","")} · Tallas {", ".join(p.get("sizes",[]))}', st_meta))
    flow.append(Paragraph(f'{money(p["price"])}{old}', st_price))
    return flow

# ---- resumen ----
n = len(P)
prices = [p["price"] for p in P]
pmin, pmax = min(prices), max(prices)
nuevo = sum(1 for p in P if "Nuevo" in (p.get("tag") or ""))

story = []
story.append(Spacer(1, 20*mm))
story.append(Paragraph("KHC KIDS", st_title))
story.append(Paragraph("Catálogo de la Tienda · Lista de Precios", ParagraphStyle('h', fontName='Helvetica-Bold', fontSize=15, textColor=BLUE, leading=20)))
story.append(Spacer(1, 3*mm))
story.append(Paragraph(f"Ropa de gran calidad para bebés, niños y niñas de 0 a 6 años · {n} productos", st_sub))
story.append(Spacer(1, 8*mm))
res = [[Paragraph(k, ParagraphStyle('a', fontName='Helvetica', fontSize=10, textColor=SOFT, leading=14)),
        Paragraph(v, ParagraphStyle('b', fontName='Helvetica-Bold', fontSize=13, textColor=INK, leading=16))]
       for k, v in [("Productos en catálogo", str(n)),
                    ("Rango de precios", f"{money(pmin)} – {money(pmax)}"),
                    ("Nuevos diseños", f"{nuevo}"),
                    ("Secciones", "Bebés · Niñas · Niños · Accesorios"),
                    ("Edades", "0 meses a 6 años"),
                    ("Reservas", "Desde la web · confirmación por WhatsApp")]]
rt = Table(res, colWidths=[70*mm, 90*mm])
rt.setStyle(TableStyle([('BACKGROUND', (0, 0), (-1, -1), CREAM), ('BOX', (0, 0), (-1, -1), 1, LINEC),
    ('INNERGRID', (0, 0), (-1, -1), 0.5, LINEC), ('LEFTPADDING', (0, 0), (-1, -1), 12), ('RIGHTPADDING', (0, 0), (-1, -1), 12),
    ('TOPPADDING', (0, 0), (-1, -1), 8), ('BOTTOMPADDING', (0, 0), (-1, -1), 8)]))
story.append(rt)
story.append(Spacer(1, 6*mm))
story.append(Paragraph("Ediciones limitadas: pocas unidades por diseño; cuando se agotan, no vuelven. Fotos ilustrativas de la colección KHC Kids.", st_foot))
story.append(Spacer(1, 12*mm))

# ---- fichas por sección ----
COLW = [60*mm, 60*mm, 60*mm]
for key, title, accent in SEC:
    items = [p for p in P if p.get("type") == key]
    if not items: continue
    hdr = Table([[Paragraph(f"{title}  ·  {len(items)} prendas", st_sec)]], colWidths=[186*mm])
    hdr.setStyle(TableStyle([('BACKGROUND', (0, 0), (-1, -1), accent), ('LEFTPADDING', (0, 0), (-1, -1), 12),
        ('TOPPADDING', (0, 0), (-1, -1), 7), ('BOTTOMPADDING', (0, 0), (-1, -1), 7)]))
    story.append(hdr); story.append(Spacer(1, 4*mm))
    rows = []
    for i in range(0, len(items), 3):
        cells = [card(p) for p in items[i:i+3]]
        while len(cells) < 3: cells.append("")
        rows.append(cells)
    gt = Table(rows, colWidths=COLW)
    gt.setStyle(TableStyle([('VALIGN', (0, 0), (-1, -1), 'TOP'), ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('LEFTPADDING', (0, 0), (-1, -1), 3), ('RIGHTPADDING', (0, 0), (-1, -1), 3),
        ('TOPPADDING', (0, 0), (-1, -1), 8), ('BOTTOMPADDING', (0, 0), (-1, -1), 8)]))
    story.append(gt); story.append(Spacer(1, 6*mm))

def footer(canvas, doc):
    canvas.saveState(); canvas.setFillColor(SOFT); canvas.setFont('Helvetica', 7.5)
    canvas.drawString(12*mm, 8*mm, "KHC Kids · Catálogo de la tienda · 0 a 6 años · Ediciones limitadas")
    canvas.drawRightString(198*mm, 8*mm, f"Pág. {doc.page}")
    canvas.restoreState()

doc = SimpleDocTemplate(OUT, pagesize=A4, leftMargin=12*mm, rightMargin=12*mm, topMargin=12*mm, bottomMargin=12*mm, title="Catálogo Tienda KHC Kids · 0 a 6 años")
doc.build(story, onFirstPage=footer, onLaterPages=footer)
print("PDF OK ->", OUT)
print(f"{n} productos | precios {money(pmin)}–{money(pmax)} | {nuevo} nuevos diseños")
