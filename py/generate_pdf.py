from flask import Flask, request, send_file
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
import os

app = Flask(__name__)

def create_pdf(name, phone, service):
    filename = "order.pdf"
    pdf_path = os.path.join(os.getcwd(), filename)

    c = canvas.Canvas(pdf_path, pagesize=A4)
    c.setFont("Helvetica", 14)

    c.drawString(100, 750, "📄 THÔNG TIN ĐẶT HÀNG")
    c.line(100, 745, 400, 745)

    c.drawString(100, 720, f"👤 Họ tên: {name}")
    c.drawString(100, 700, f"📞 Số điện thoại: {phone}")
    c.drawString(100, 680, f"📦 Gói dịch vụ: {service}")

    c.save()
    return pdf_path

@app.route('/download-pdf', methods=['POST'])
def download_pdf():
    data = request.json
    name = data.get("name", "Không có")
    phone = data.get("phone", "Không có")
    service = data.get("service", "Không có")

    pdf_path = create_pdf(name, phone, service)
    return send_file(pdf_path, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
