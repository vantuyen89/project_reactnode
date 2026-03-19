export const generateOrderEmail = (order) => {
    const itemsHtml = order.items
        .map(
            (item) => `
      <tr>
        <td style="padding:8px 0;">
          <img src="${item.image}" width="60" style="border-radius:6px;" />
        </td>
        <td style="padding:8px 0;">
          <strong>${item.productName}</strong><br>
          Màu: ${item.color}<br>
          Size: ${item.size}
        </td>
        <td style="padding:8px 0;">${item.quantity}</td>
        <td style="padding:8px 0;">${Number(item.price).toLocaleString()}₫</td>
      </tr>
    `
        )
        .join("");

    return `
  <div style="font-family:Arial;background:#f6f6f6;padding:20px;">
    <div style="max-width:600px;margin:auto;background:white;border-radius:10px;padding:20px;">
      
      <h2 style="text-align:center;color:#0ea5a4;">XÁC NHẬN ĐƠN HÀNG</h2>
      <p>Xin chào <strong>${order.customInfor.name}</strong>,</p>
      <p>Cảm ơn bạn đã đặt hàng. Chúng tôi đã nhận được đơn của bạn.</p>

      <hr style="border:none;border-top:1px solid #e5e5e5;margin:20px 0;">

      <h3>📦 Thông tin đơn hàng</h3>
      <p><strong>Mã đơn:</strong> ${order.orderNumber}</p>

      <table width="100%" style="border-collapse:collapse;margin-top:10px;">
        <thead>
          <tr style="border-bottom:1px solid #ddd;">
            <th style="text-align:left;padding:8px 0;">Ảnh</th>
            <th style="text-align:left;padding:8px 0;">Sản phẩm</th>
            <th style="text-align:left;padding:8px 0;">SL</th>
            <th style="text-align:left;padding:8px 0;">Giá</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>

      <p style="margin-top:20px;font-size:16px;">
        <strong>Tổng tiền: 
          <span style="color:#e11d48;">
            ${Number(order.totalPrice).toLocaleString()}₫
          </span>
        </strong>
      </p>

      <hr style="border:none;border-top:1px solid #e5e5e5;margin:20px 0;">

      <h3>📍 Thông tin giao hàng</h3>
      <p>
        <strong>Họ tên:</strong> ${order.customInfor.name}<br>
        <strong>Điện thoại:</strong> ${order.customInfor.phone}<br>
        <strong>Email:</strong> ${order.customInfor.email}<br>
        <strong>Địa chỉ:</strong><br>
        ${order.customInfor.address}, ${order.customInfor.commune},<br>
        ${order.customInfor.district}, ${order.customInfor.city}
      </p>

      <h3>💳 Thanh toán</h3>
      <p>Phương thức: <strong>${order.customInfor.payment}</strong></p>

      <p style="margin-top:25px;">Nếu có bất kỳ thắc mắc nào, hãy phản hồi lại email này.</p>

      <p style="text-align:center;color:#777;font-size:13px;margin-top:30px;">
        © ${new Date().getFullYear()} YourShop.vn — Cảm ơn bạn đã mua sắm!
      </p>

    </div>
  </div>
  `;
};
