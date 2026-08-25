# -*- coding: utf-8 -*-
"""
Catálogo visual KHC Kids · Compra en Shein -> Venta en Venezuela
Genera un PDF con cada prenda, foto, precio Shein, precio de venta y margen.
"""
import os, io
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
                                Image, PageBreak, Flowable)
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT
from PIL import Image as PILImage

IMG = "/home/user/khc-kids/img"
OUT = "/home/user/khc-kids/Catalogo-KHC-Kids-Shein.pdf"

# ---- paleta ----
PINK = HexColor("#E36A98"); PINK_LT = HexColor("#FFE3EF")
BLUE = HexColor("#4E96BF"); BLUE_LT = HexColor("#DCEEFC")
GREEN= HexColor("#5C8A3C"); GREEN_LT= HexColor("#E3F3E0")
YEL  = HexColor("#E0A93A"); YEL_LT  = HexColor("#FFF1CF")
INK  = HexColor("#5A4852"); SOFT = HexColor("#9A8A92"); CREAM=HexColor("#FFFBF6")
LINEC= HexColor("#EADFE6")

def m(x): return f"${x:,.2f}"

# ---- datos (mismo plan tropical) ----
# name, section, shein_lot, qty_lots, per_lot, w_lot, units_sell, sale, img, label, tint
P = [
 ("Pack 5 Bodies manga corta","bebe",9.50,10,5,0.28,50,5.00,"01-bodies.jpg","",  "FFE5EC"),
 ("Mameluco corto fresco (pack 2)","bebe",8.00,8,2,0.22,16,9.00,"t-mameluco.jpg","","FFF0D9"),
 ("Conjunto body + short bebé","bebe",6.50,10,1,0.16,10,9.50,"03-conjunto-rn.jpg","","E3F3E0"),
 ("Vestido fresco de verano bebé","bebe",4.50,16,1,0.11,16,8.50,"04-vestido-floral.jpg","","FFE0EC"),
 ("Camisón fresco de algodón bebé","bebe",4.99,8,1,0.12,8,7.50,"02-pelele.jpg","","EDE0EF"),
 ("Gorra anti-sol bebé","bebe",3.50,8,1,0.06,8,5.50,"__NO__","Gorra bebé","FFE3D3"),

 ("Vestido fresco casual niña","nina",5.99,16,1,0.13,16,9.50,"t-vestido-casual.jpg","","FFE3F1"),
 ("Conjunto top + short niña","nina",7.99,10,1,0.20,10,12.00,"08-conjunto-nina.jpg","","FFDFD5"),
 ("Blusita sin manga (pack 3)","nina",8.99,6,3,0.22,18,4.50,"t-blusitas.jpg","","FFE3F1"),
 ("Vestido de fiesta fresco","nina",8.99,6,1,0.18,6,15.00,"07-vestido-tul.jpg","","FFE3F1"),
 ("Legging delgado (pack 3)","nina",8.50,6,3,0.28,18,4.50,"__NO__","Leggings","E6E0F2"),
 ("Pantalón largo fresco lino","nina",5.50,10,1,0.18,10,9.00,"t-pantalon-nina.jpg","","F2ECDD"),
 ("Traje de baño niña","nina",5.99,10,1,0.08,10,10.00,"t-bano-nina.jpg","","DCEEFC"),
 ("Short niña (pack 3)","nina",7.99,6,3,0.24,18,4.50,"__NO__","Short niña","FFE3D3"),

 ("Franela manga corta niño (pack 3)","nino",9.99,6,3,0.28,18,4.50,"t-franelas-nino.jpg","","E0ECF7"),
 ("Conjunto franela + short niño","nino",7.99,10,1,0.20,10,12.00,"06-conjunto-nene.jpg","","E0ECF7"),
 ("Pantalón largo fresco jogger niño","nino",5.50,10,1,0.18,10,9.00,"t-pantalon-nino.jpg","","E2E8F2"),
 ("Short deportivo niño (pack 3)","nino",8.99,6,3,0.26,18,4.50,"__NO__","Short niño","DCEEFC"),
 ("Traje de baño / bermuda niño","nino",5.50,10,1,0.09,10,9.50,"t-bano-nino.jpg","","DCEEFC"),

 ("Pijama corto (camiseta+short)","pijama",5.99,12,1,0.16,12,9.50,"t-pijama-corto.jpg","","EDE0EF"),
 ("Pijama pantalón largo ligero","pijama",6.50,10,1,0.19,10,10.00,"05-pijama-dino.jpg","","DCEFE0"),

 ("Gorras anti-sol (pack 2)","acc",4.50,10,2,0.08,20,5.50,"__NO__","Gorras pack","FFE3D3"),
 ("Sandalias frescas","acc",6.99,8,1,0.18,8,12.00,"t-sandalias.jpg","","FFE3F1"),
 ("Calcetines finos (pack 5)","acc",4.99,8,1,0.08,8,6.50,"__NO__","Calcetines","E3ECF6"),
]
SECTIONS = [("bebe","BEBÉS · 0-24 MESES",PINK_LT,PINK),
            ("nina","NIÑA · 2-10 AÑOS",HexColor("#FFE3F1"),PINK),
            ("nino","NIÑO · 2-10 AÑOS",BLUE_LT,BLUE),
            ("pijama","PIJAMAS FRESCOS",YEL_LT,YEL),
            ("acc","ACCESORIOS & CALZADO",GREEN_LT,GREEN)]

# ---- totales / landed ----
tot_cost = sum(p[2]*p[3] for p in P)
tot_units = sum(p[6] for p in P)
tot_weight = sum(p[3]*p[5] for p in P)
revenue = sum(p[6]*p[7] for p in P)
RATE_SEA=4.0; EXTRA=80.0
sea_per_kg = (tot_weight*RATE_SEA+EXTRA)/tot_weight
landed_sea = tot_cost + tot_weight*RATE_SEA + EXTRA
profit_sea = revenue - landed_sea

# ---- estilos ----
ss = getSampleStyleSheet()
st_title = ParagraphStyle('t', parent=ss['Title'], fontName='Helvetica-Bold', fontSize=30, textColor=PINK, leading=34, alignment=TA_LEFT)
st_sub   = ParagraphStyle('s', fontName='Helvetica', fontSize=12, textColor=SOFT, leading=16, alignment=TA_LEFT)
st_sec   = ParagraphStyle('sec', fontName='Helvetica-Bold', fontSize=14, textColor=colors.white, leading=18)
st_name  = ParagraphStyle('n', fontName='Helvetica-Bold', fontSize=11.5, textColor=INK, leading=14)
st_meta  = ParagraphStyle('me', fontName='Helvetica', fontSize=8.5, textColor=SOFT, leading=11)
st_k     = ParagraphStyle('k', fontName='Helvetica-Bold', fontSize=9.5, textColor=INK, leading=13)
st_sale  = ParagraphStyle('sa', fontName='Helvetica-Bold', fontSize=13, textColor=GREEN, leading=15)
st_ph    = ParagraphStyle('ph', fontName='Helvetica-Bold', fontSize=12, textColor=SOFT, alignment=TA_CENTER, leading=15)
st_foot  = ParagraphStyle('f', fontName='Helvetica-Oblique', fontSize=7.5, textColor=SOFT, leading=10)

def img_flow(name, w, h, label, tint):
    if name=="__NO__" or not os.path.exists(os.path.join(IMG,name)):
        t = Table([[Paragraph(label, st_ph)]], colWidths=[w], rowHeights=[h])
        t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),HexColor('#'+tint)),
                               ('VALIGN',(0,0),(-1,-1),'MIDDLE'),('ALIGN',(0,0),(-1,-1),'CENTER'),
                               ('BOX',(0,0),(-1,-1),1,LINEC)]))
        return t
    im = PILImage.open(os.path.join(IMG,name)).convert('RGB')
    im.thumbnail((560,560))
    buf=io.BytesIO(); im.save(buf,'JPEG',quality=82); buf.seek(0)
    return Image(buf, width=w, height=h)

# ---- portada ----
story=[]
story.append(Spacer(1,18*mm))
story.append(Paragraph("KHC KIDS", st_title))
story.append(Paragraph("Catálogo de Compra · Shein &rarr; Venezuela", 
             ParagraphStyle('h',fontName='Helvetica-Bold',fontSize=15,textColor=BLUE,leading=20)))
story.append(Spacer(1,4*mm))
story.append(Paragraph("Selección 100% tropical · ropa fresca para niños de 0 a 10 años", st_sub))
story.append(Spacer(1,10*mm))

# caja resumen
def kv(k,v,color=INK):
    return [Paragraph(k, ParagraphStyle('a',fontName='Helvetica',fontSize=9,textColor=SOFT,leading=12)),
            Paragraph(v, ParagraphStyle('b',fontName='Helvetica-Bold',fontSize=13,textColor=color,leading=16))]
sumrows=[
 kv("Referencias (tipos de prenda)","24"),
 kv("Prendas totales a traer", f"{tot_units}"),
 kv("Peso del envío", f"{tot_weight:.1f} kg"),
 kv("Costo en Shein (productos)", m(tot_cost), PINK),
 kv("Ingreso si vendes todo", m(revenue), BLUE),
 kv("Inversión total marítimo", m(landed_sea)),
 kv("GANANCIA (marítimo)", m(profit_sea), GREEN),
 kv("ROI marítimo", f"{profit_sea/landed_sea*100:.0f}%", GREEN),
]
st_ = Table(sumrows, colWidths=[65*mm,45*mm])
st_.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),CREAM),('BOX',(0,0),(-1,-1),1,LINEC),
                         ('INNERGRID',(0,0),(-1,-1),0.5,LINEC),('LEFTPADDING',(0,0),(-1,-1),12),
                         ('RIGHTPADDING',(0,0),(-1,-1),12),('TOPPADDING',(0,0),(-1,-1),8),
                         ('BOTTOMPADDING',(0,0),(-1,-1),8),('SPAN',(0,5),(1,5))]))
# destacar fila de ganancia (índice 6)
st_.setStyle(TableStyle([('BACKGROUND',(0,6),(1,6),GREEN_LT),('BACKGROUND',(0,7),(1,7),GREEN_LT)]))
story.append(st_)
story.append(Spacer(1,8*mm))
story.append(Paragraph(
  "C&oacute;mo leer cada ficha: <b>Shein</b> = precio de compra por unidad &middot; <b>Vende</b> = tu precio en Venezuela &middot; "
  "<b>Costo final c/u</b> = compra + parte del env&iacute;o mar&iacute;timo &middot; <b>Margen</b> = ganancia ya con env&iacute;o incluido.",
  ParagraphStyle('h2',fontName='Helvetica',fontSize=9,textColor=INK,leading=13)))
story.append(Spacer(1,4*mm))
story.append(Paragraph(
  "Precios basados en tarifas reales de Shein y del mercado venezolano consultadas (2025-2026). "
  "Fotos ilustrativas generadas para la marca KHC Kids.",
  st_foot))
story.append(PageBreak())

# ---- fichas por seccion ----
for key, title, bg, accent in SECTIONS:
    # cabecera de seccion
    hdr = Table([[Paragraph(title, st_sec)]], colWidths=[180*mm])
    hdr.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),accent),('LEFTPADDING',(0,0),(-1,-1),12),
                             ('TOPPADDING',(0,0),(-1,-1),7),('BOTTOMPADDING',(0,0),(-1,-1),7),
                             ('ROUNDEDCORNERS',[6,6,6,6])]))
    story.append(hdr); story.append(Spacer(1,4*mm))
    for (name,sec,shein_lot,qty,per_lot,w_lot,units_sell,sale,img,label,tint) in P:
        if sec!=key: continue
        shein_unit = shein_lot/per_lot
        w_unit = w_lot/per_lot
        landed = shein_unit + w_unit*sea_per_kg
        gan = sale - landed
        marg = gan/sale*100
        # bloque de texto
        txt = [
          Paragraph(name, st_name),
          Paragraph(f"Lote: {qty} &times; {per_lot} &nbsp;|&nbsp; Traes {qty*per_lot} und &nbsp;|&nbsp; {w_lot:.2f} kg/lote", st_meta),
          Spacer(1,2*mm),
          Paragraph(f"Shein (c/u): <b>{m(shein_unit)}</b> &nbsp;&nbsp; Vende: <b><font color='#5C8A3C'>{m(sale)}</font></b>", st_k),
          Paragraph(f"Costo final c/u (mar&iacute;t.): <b>{m(landed)}</b> &nbsp;&nbsp; Ganancia: <b><font color='#5C8A3C'>{m(gan)}</font> ({marg:.0f}%)</b>", st_k),
        ]
        card = Table([[img_flow(img, 34*mm, 34*mm, label, tint), txt]], colWidths=[40*mm, 138*mm])
        card.setStyle(TableStyle([
          ('BACKGROUND',(0,0),(-1,-1),CREAM),('BOX',(0,0),(-1,-1),1,LINEC),
          ('VALIGN',(0,0),(-1,-1),'MIDDLE'),
          ('LEFTPADDING',(0,0),(-1,-1),8),('RIGHTPADDING',(0,0),(-1,-1),8),
          ('TOPPADDING',(0,0),(-1,-1),7),('BOTTOMPADDING',(0,0),(-1,-1),7),
          ('LINEAFTER',(0,0),(0,0),0,colors.white),
        ]))
        story.append(card); story.append(Spacer(1,3*mm))
    story.append(Spacer(1,3*mm))

def footer(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(SOFT); canvas.setFont('Helvetica',7.5)
    canvas.drawString(15*mm, 8*mm, "KHC Kids · Catálogo de compra Shein → Venezuela · Precios referenciales")
    canvas.drawRightString(195*mm, 8*mm, f"Pág. {doc.page}")
    canvas.restoreState()

doc = SimpleDocTemplate(OUT, pagesize=A4, leftMargin=15*mm, rightMargin=15*mm,
                        topMargin=14*mm, bottomMargin=14*mm, title="Catálogo KHC Kids · Shein")
doc.build(story, onFirstPage=footer, onLaterPages=footer)
print("PDF OK ->", OUT)
print(f"Refs 24 | Prendas {tot_units} | Shein {m(tot_cost)} | Venta {m(revenue)} | Ganancia marít {m(profit_sea)} ({profit_sea/landed_sea*100:.0f}% ROI)")
