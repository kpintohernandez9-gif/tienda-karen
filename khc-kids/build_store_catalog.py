# -*- coding: utf-8 -*-
"""
Catálogo visual de la TIENDA KHC Kids (lista de precios).
Lee js/data.js y genera un PDF en cuadrícula con las 44 prendas y sus precios de venta.
"""
import os, io, json, subprocess
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from PIL import Image as PILImage

BASE="/home/user/khc-kids"
IMG=BASE+"/img"
OUT=BASE+"/Catalogo-Tienda-KHC-Kids.pdf"

# ---- leer data.js ----
data=json.loads(subprocess.check_output(["node","export_json.js"], cwd=BASE))
P=data["products"]

PINK=HexColor("#E36A98"); BLUE=HexColor("#4E96BF"); GREEN=HexColor("#5C8A3C")
YEL=HexColor("#E0A93A"); INK=HexColor("#5A4852"); SOFT=HexColor("#9A8A92")
CREAM=HexColor("#FFFBF6"); LINEC=HexColor("#EADFE6"); WHITE=HexColor("#FFFFFF")

def money(x): return f"${x:,.2f}"

# ---- agrupar por seccion ----
def section_of(p):
    ages=[p["age"]] if isinstance(p["age"],str) else p["age"]
    g=p["gender"]
    if "bebe" in ages and g in ("unisex","nina","nino") and p["type"] in ("body","accesorio") and "bebe"==p["age"] if isinstance(p["age"],str) else False:
        return "bebe"
    # simple rule
    if (isinstance(p["age"],str) and p["age"]=="bebe") or (isinstance(p["age"],list) and p["age"]==["bebe"]):
        return "bebe"
    if g=="nina": return "nina"
    if g=="nino": return "nino"
    return "unisex"
SEC=[("bebe","👶  BEBÉS · 0-24 MESES",HexColor("#FFE3D3"),HexColor("#D87A4A")),
     ("nina","👧  NIÑA · 2-10 AÑOS",HexColor("#FFE3F1"),PINK),
     ("nino","👦  NIÑO · 2-10 AÑOS",HexColor("#DCEEFC"),BLUE),
     ("unisex","🎒  UNISEX · PIJAMAS & ACCESORIOS",HexColor("#E3F3E0"),GREEN)]

# ---- estilos ----
ss=getSampleStyleSheet()
st_title=ParagraphStyle('t',fontName='Helvetica-Bold',fontSize=32,textColor=PINK,leading=36)
st_sub=ParagraphStyle('s',fontName='Helvetica',fontSize=12,textColor=SOFT,leading=16)
st_sec=ParagraphStyle('sec',fontName='Helvetica-Bold',fontSize=13,textColor=WHITE,leading=17)
st_name=ParagraphStyle('n',fontName='Helvetica-Bold',fontSize=8.8,textColor=INK,leading=10.5)
st_meta=ParagraphStyle('me',fontName='Helvetica',fontSize=7,textColor=SOFT,leading=8.5)
st_price=ParagraphStyle('p',fontName='Helvetica-Bold',fontSize=12.5,textColor=GREEN,leading=14)
st_badge=ParagraphStyle('b',fontName='Helvetica-Bold',fontSize=6.5,textColor=PINK,leading=8)
st_ph=ParagraphStyle('ph',fontName='Helvetica-Bold',fontSize=8,textColor=SOFT,alignment=TA_CENTER,leading=10)
st_foot=ParagraphStyle('f',fontName='Helvetica-Oblique',fontSize=7.5,textColor=SOFT,leading=10)

def img_cell(name,tint,label,w,h):
    path=os.path.join(BASE,name)  # name ya incluye 'img/...'
    if not os.path.exists(path):
        t=Table([[Paragraph(label, st_ph)]],colWidths=[w],rowHeights=[h])
        t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),HexColor('#'+(tint or 'FFEFE6').lstrip('#'))),
                               ('VALIGN',(0,0),(-1,-1),'MIDDLE'),('ALIGN',(0,0),(-1,-1),'CENTER'),
                               ('BOX',(0,0),(-1,-1),1,LINEC)]))
        return t
    im=PILImage.open(path).convert('RGB'); im.thumbnail((420,420))
    buf=io.BytesIO(); im.save(buf,'JPEG',quality=80); buf.seek(0)
    return Image(buf,width=w,height=h)

def card(p):
    badge = ("NUEVO" if p.get("isNew") else ("OFERTA" if (p.get("isSale") or p.get("oldPrice")) else ""))
    old = f' <font size=8 color="#9A8A92"><strike>{money(p["oldPrice"])}</strike></font>' if p.get("oldPrice") else ""
    label_short = p.get("typeLabel","")[:14]
    flow=[]
    flow.append(img_cell(p["img"],p.get("tint"),label_short,48*mm,48*mm))
    flow.append(Spacer(1,2*mm))
    if badge: flow.append(Paragraph(badge, st_badge))
    flow.append(Paragraph(p["name"], st_name))
    flow.append(Paragraph(f'{p.get("typeLabel","")} · {p.get("ageLabel","")}', st_meta))
    flow.append(Paragraph(f'{money(p["price"])}{old}', st_price))
    cols=p.get("colors",[])
    if cols: flow.append(Paragraph(f'{len(cols)} colores', st_meta))
    return flow

# ---- totales ----
n=len(P)
prices=[p["price"] for p in P]
pmin,pmax=min(prices),max(prices)
on_sale=sum(1 for p in P if p.get("isSale") or p.get("oldPrice"))

story=[]
# portada
story.append(Spacer(1,20*mm))
story.append(Paragraph("KHC KIDS", st_title))
story.append(Paragraph("Catálogo de la Tienda · Lista de Precios", ParagraphStyle('h',fontName='Helvetica-Bold',fontSize=15,textColor=BLUE,leading=20)))
story.append(Spacer(1,3*mm))
story.append(Paragraph(f"Ropa fresca y tropical para niños y niñas de 0 a 10 años · {n} productos · precios en USD", st_sub))
story.append(Spacer(1,8*mm))
res=[[Paragraph(k,ParagraphStyle('a',fontName='Helvetica',fontSize=10,textColor=SOFT,leading=14)),
      Paragraph(v,ParagraphStyle('b',fontName='Helvetica-Bold',fontSize=13,textColor=INK,leading=16))]
     for k,v in [("Productos en catálogo",str(n)),("Rango de precios",f"{money(pmin)} – {money(pmax)}"),
                 ("Productos en oferta",f"{on_sale}"),("Categorías","8 tipos"),
                 ("Edades","0 meses a 10 años"),("Envío","A toda Venezuela 🇻🇪")]]
rt=Table(res,colWidths=[70*mm,60*mm])
rt.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),CREAM),('BOX',(0,0),(-1,-1),1,LINEC),
    ('INNERGRID',(0,0),(-1,-1),0.5,LINEC),('LEFTPADDING',(0,0),(-1,-1),12),('RIGHTPADDING',(0,0),(-1,-1),12),
    ('TOPPADDING',(0,0),(-1,-1),8),('BOTTOMPADDING',(0,0),(-1,-1),8)]))
story.append(rt)
story.append(Spacer(1,6*mm))
story.append(Paragraph("Precios de venta al público en USD. Las tachadas indican el precio antes del descuento. Fotos ilustrativas para la marca KHC Kids.", st_foot))
story.append(Spacer(1,12*mm))

# fichas por seccion
COLW=[60*mm,60*mm,60*mm]
for key,title,bg,accent in SEC:
    items=[p for p in P if section_of(p)==key]
    if not items: continue
    hdr=Table([[Paragraph(title, st_sec)]],colWidths=[180*mm])
    hdr.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),accent),('LEFTPADDING',(0,0),(-1,-1),12),
        ('TOPPADDING',(0,0),(-1,-1),7),('BOTTOMPADDING',(0,0),(-1,-1),7)]))
    story.append(hdr); story.append(Spacer(1,4*mm))
    rows=[]
    for i in range(0,len(items),3):
        chunk=items[i:i+3]
        cells=[card(p) for p in chunk]
        while len(cells)<3: cells.append("")
        rows.append(cells)
    gt=Table(rows,colWidths=COLW)
    gt.setStyle(TableStyle([('VALIGN',(0,0),(-1,-1),'TOP'),('ALIGN',(0,0),(-1,-1),'CENTER'),
        ('LEFTPADDING',(0,0),(-1,-1),3),('RIGHTPADDING',(0,0),(-1,-1),3),
        ('TOPPADDING',(0,0),(-1,-1),8),('BOTTOMPADDING',(0,0),(-1,-1),8)]))
    story.append(gt); story.append(Spacer(1,6*mm))

def footer(canvas,doc):
    canvas.saveState(); canvas.setFillColor(SOFT); canvas.setFont('Helvetica',7.5)
    canvas.drawString(12*mm,8*mm,"KHC Kids · Catálogo de la tienda · Precios en USD")
    canvas.drawRightString(198*mm,8*mm,f"Pág. {doc.page}")
    canvas.restoreState()

doc=SimpleDocTemplate(OUT,pagesize=A4,leftMargin=12*mm,rightMargin=12*mm,topMargin=12*mm,bottomMargin=12*mm,title="Catálogo Tienda KHC Kids")
doc.build(story,onFirstPage=footer,onLaterPages=footer)
print("PDF OK ->",OUT)
print(f"{n} productos | precios {money(pmin)}–{money(pmax)} | {on_sale} en oferta")
