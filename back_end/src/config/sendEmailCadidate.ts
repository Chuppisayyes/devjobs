import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailServiceCandidate {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.email,
        pass: process.env.pass_email,
      },
    });
  }

  async sendApplyEmail(data: {
    companyName: string;
    companyEmail: string;
    candidateEmail: string;
    jobTitle: string;
    jobId: string;
    interviewDate: string;
    interviewType: string;
    interviewLink?: string;
    interviewDiaChi?: string;
    linkWeb: string;
    jobPosition?: string;
  }) {
    const jobUrl = `http://localhost:3000/job/${data.jobId}`; // Đường dẫn tới bài viết tuyển dụng

    let interviewDetails = '';
    if (data.interviewLink) {
      interviewDetails += `
        <li><strong>Link phỏng vấn:</strong> <a href="${data.interviewLink}" target="_blank">${data.interviewLink}</a></li>
      `;
    }
    if (data.interviewDiaChi) {
      interviewDetails += `
        <li><strong>Địa chỉ phỏng vấn:</strong> ${data.interviewDiaChi}</li>
      `;
    }

    const mailOptions = {
      from: process.env.email,
      to: data.candidateEmail,
      subject: `Thông báo từ DevJob: Công ty ${data.companyName} đã duyệt CV của bạn!`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2>Chào mừng đến với DevJob - Kết nối nhân tài với cơ hội</h2>
          <p>
            Chúng tôi, tại <strong>DevJob</strong>, cam kết xây dựng một cầu nối vững chắc giữa nhà tuyển dụng 
            và những ứng viên tài năng nhất. Với sứ mệnh mang lại sự thuận tiện và hiệu quả trong quy trình 
            tuyển dụng, DevJob tự hào là một trong những nền tảng việc làm uy tín và phổ biến nhất hiện nay.
          </p>
          <p>Chúc mừng bạn, CV của bạn đã được công ty <strong><a href="${data.linkWeb}">${data.companyName}</a></strong> duyệt thành công cho vị trí <strong>${data.jobPosition}</strong>.</p>

          <h3>Thông tin ứng tuyển:</h3>
          <ul>
            <li><strong>Bài viết tuyển dụng:</strong> <a href="${jobUrl}" target="_blank">${jobUrl}</a></li>
          </ul>

          <h3>Thông tin phỏng vấn:</h3>
          <ul>
            <li><strong>Ngày phỏng vấn:</strong> ${data.interviewDate}</li>
            <li><strong>Hình thức phỏng vấn:</strong> ${data.interviewType}</li>
            ${interviewDetails} <!-- Hiển thị link hoặc địa chỉ nếu có -->
          </ul>
          
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
    
          <p style="font-size: 14px; color: #999;">
            Email này được gửi tự động từ hệ thống <strong>DevJob</strong>. Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi tại 
            <a href="mailto:levanthang230902@gmail.com">levanthang230902@gmail.com</a>.
          </p>
        </div>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Apply email sent successfully to:', data.candidateEmail);
    } catch (error) {
      console.error('Error sending apply email: ', error);
    }
  }
}
