import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailServiceCompany {
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
    candidateName: string;
    candidateEmail: string;
    jobTitle: string;
    companyEmail: string;
    jobId: string;
    cvUrl: string;
  }) {
    const jobUrl = `http://localhost:3000/job/${data.jobId}`; // Đường dẫn tới bài viết tuyển dụng

    const mailOptions = {
      from: process.env.email,
      to: data.companyEmail,
      subject: `Ứng viên ${data.candidateName} ứng tuyển vị trí ${data.jobTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2>Chào mừng đến với DevJob - Kết nối nhân tài với cơ hội</h2>
          <p>
            Chúng tôi, tại <strong>DevJob</strong>, cam kết xây dựng một cầu nối vững chắc giữa nhà tuyển dụng 
            và những ứng viên tài năng nhất. Với sứ mệnh mang lại sự thuận tiện và hiệu quả trong quy trình 
            tuyển dụng, DevJob tự hào là một trong những nền tảng việc làm uy tín và phổ biến nhất hiện nay.
          </p>
          <p>
            Khi bạn đăng bài tuyển dụng trên DevJob, chúng tôi đảm bảo bạn sẽ nhận được sự chú ý từ những ứng viên 
            phù hợp nhất. Chúng tôi vừa nhận được một ứng viên ứng tuyển cho vị trí 
            <strong>${data.jobTitle}</strong> tại công ty của bạn. Dưới đây là chi tiết ứng tuyển:
          </p>
  
          <h3>Thông tin ứng tuyển:</h3>
          <ul>
            <li><strong>Ứng viên:</strong> ${data.candidateName}</li>
            <li><strong>Email ứng viên:</strong> ${data.candidateEmail}</li>
            <li><strong>Bài viết:</strong> <a href="${jobUrl}" target="_blank">${jobUrl}</a></li>
            <li><strong>Xem CV:</strong> <a href="${data.cvUrl}" target="_blank">Tại Đây</a></li>
          </ul>
  
          <p>
            Vui lòng truy cập bài viết để xem chi tiết ứng tuyển và duyệt CV của ứng viên. 
            Chúng tôi luôn sẵn sàng hỗ trợ bạn trong quá trình tuyển dụng để mang lại kết quả tốt nhất.
          </p>
  
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
      console.log('Apply email sent successfully to:', data.companyEmail);
    } catch (error) {
      console.error('Error sending apply email: ', error);
    }
  }
}
