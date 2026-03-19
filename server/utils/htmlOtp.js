export const generateOtpEmail = (otp) => {
    return `
  <!DOCTYPE html>
  <html lang="vi">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>OTP Verification</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f7;
              margin: 0;
              padding: 0;
          }
          .container {
              max-width: 600px;
              margin: 50px auto;
              background-color: #ffffff;
              padding: 30px;
              border-radius: 10px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
              text-align: center;
          }
          h1 {
              color: #333333;
          }
          p {
              color: #555555;
          }
          .otp {
              font-size: 36px;
              font-weight: bold;
              color: #ffffff;
              background-color: #4CAF50;
              padding: 15px 30px;
              margin: 20px 0;
              border-radius: 8px;
              letter-spacing: 5px;
              display: inline-block;
          }
          .footer {
              margin-top: 30px;
              font-size: 12px;
              color: #999999;
          }
          @media only screen and (max-width: 600px) {
              .otp {
                  font-size: 28px;
                  padding: 10px 20px;
              }
          }
      </style>
  </head>
  <body>
      <div class="container">
          <h1>Mã OTP của bạn</h1>
          <p>Vui lòng sử dụng mã dưới đây để xác thực hoặc đặt lại mật khẩu.</p>
          <div class="otp">${otp}</div>
          <p>Mã có hiệu lực trong <strong>5 phút</strong>.</p>
          <div class="footer">
              Nếu bạn không yêu cầu OTP này, hãy bỏ qua email này.
          </div>
      </div>
  </body>
  </html>
  `;
};