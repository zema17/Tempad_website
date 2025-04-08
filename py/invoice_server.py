from flask import Flask, request, send_file
from fpdf import FPDF
import tempfile
import os
import datetime
import json

app = Flask(__name__)

@app.route("/generate-invoice", methods=["POST"])
def generate_invoice():
    data = request.get_json()

    products = data.get("products", [])
    user_id = data.get("userId", "Unknown")

    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)

    pdf.cell(200, 10, txt="🧾 HÓA ĐƠN MUA HÀNG", ln=True, align="C")
    pdf.cell(200, 10, txt=f"Khách hàng: {user_id}", ln=True)
    pdf.cell(200, 10, txt=f"Ngày: {datetime.datetime.now().strftime('%d/%m/%Y %H:%M:%S')}", ln=True)

    pdf.ln(10)
    total = 0
    for item in products:
        name = item["name"]
        price = item["price"]
        quantity = item["quantity"]
        pdf.cell(200, 10, txt=f"- {name} x {quantity} = {price * quantity:,} VNĐ", ln=True)
        total += price * quantity

    pdf.ln(5)
    pdf.cell(200, 10, txt=f"💰 Tổng cộng: {total:,} VNĐ", ln=True)

    # Lưu vào file tạm
    temp = tempfile.NamedTemporaryFile(delete=False, suffix=".pdf")
    pdf.output(temp.name)
    temp.close()

    return send_file(temp.name, as_attachment=True, download_name="hoa_don.pdf")
