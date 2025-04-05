function getTimeAgo(thoiGian) {
    const now = new Date(); // Lấy thời gian hiện tại
    const postedDate = new Date(thoiGian); // Thời gian đăng thông báo
    const diffInMilliseconds = now - postedDate; // Sự khác biệt giữa thời gian hiện tại và thời gian đăng
    const diffInSeconds = Math.floor(diffInMilliseconds / 1000); // Chuyển đổi ra giây
    const diffInMinutes = Math.floor(diffInSeconds / 60); // Chuyển đổi ra phút
    const diffInHours = Math.floor(diffInMinutes / 60); // Chuyển đổi ra giờ
    const diffInDays = Math.floor(diffInHours / 24); // Chuyển đổi ra ngày
    const diffInWeeks = Math.floor(diffInDays / 7); // Chuyển đổi ra tuần
    const diffInMonths = Math.floor(diffInWeeks / 4); // Chuyển đổi ra tháng
    const diffInYears = Math.floor(diffInMonths / 12); // Chuyển đổi ra năm
  
    // Kiểm tra và trả về kết quả phù hợp
    if (diffInMilliseconds < 60000) {
      return `${diffInSeconds} giây trước`; // Nếu dưới 1 phút
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} phút trước`; // Nếu dưới 1 giờ
    } else if (diffInHours < 24) {
      return `${diffInHours} giờ trước`; // Nếu dưới 1 ngày
    } else if (diffInDays < 7) {
      return `${diffInDays} ngày trước`; // Nếu dưới 1 tuần
    } else if (diffInWeeks < 4) {
      return `${diffInWeeks} tuần trước`; // Nếu dưới 1 tháng
    } else if (diffInMonths < 12) {
      return `${diffInMonths} tháng trước`; // Nếu dưới 1 năm
    } else {
      return `${diffInYears} năm trước`; // Nếu trên 1 năm
    }
  }
  
 export default getTimeAgo;