const menuBtn = document.getElementById('menuBtn');
const mainNav = document.getElementById('mainNav');
const langToggle = document.getElementById('langToggle');
const announceText = document.getElementById('announceText');
const heroText = document.getElementById('heroText');

menuBtn?.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('#mainNav a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuBtn?.setAttribute('aria-expanded', 'false');
  });
});

// Hero quick search
const heroBooking = document.getElementById('heroBooking');
const heroResult = document.getElementById('heroResult');
heroBooking?.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const checkin = form.checkin.value;
  const checkout = form.checkout.value;
  const guests = form.guests.value;
  if (!checkin || !checkout || !guests) return;

  const nights = Math.ceil((new Date(checkout) - new Date(checkin)) / (1000 * 60 * 60 * 24));
  if (nights <= 0) {
    heroResult.textContent = 'Ngày trả phòng phải sau ngày nhận phòng.';
    return;
  }
  heroResult.textContent = `Đã tìm ${nights} đêm cho ${guests} khách. Vui lòng kéo xuống để chọn hạng phòng.`;
});

// Main booking form
const bookingForm = document.getElementById('bookingForm');
const bookingResult = document.getElementById('bookingResult');
bookingForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const checkin = form.checkin.value;
  const checkout = form.checkout.value;
  const guests = Number(form.guests.value);
  const roomType = form.roomType.value;

  if (!checkin || !checkout || !roomType) {
    bookingResult.textContent = 'Vui lòng điền đầy đủ thông tin.';
    return;
  }

  if (new Date(checkout) <= new Date(checkin)) {
    bookingResult.textContent = 'Ngày trả phòng phải sau ngày nhận phòng.';
    return;
  }

  bookingResult.textContent = `Yêu cầu đã gửi: ${roomType}, ${guests} khách từ ${checkin} đến ${checkout}.`;
});

// Room filter
const roomTypeFilter = document.getElementById('roomTypeFilter');
const roomCards = Array.from(document.querySelectorAll('#roomGrid .card'));
roomTypeFilter?.addEventListener('change', (event) => {
  const filter = event.target.value;
  roomCards.forEach((card) => {
    if (filter === 'all') {
      card.style.display = '';
      return;
    }
    const types = card.dataset.type || '';
    card.style.display = types.includes(filter) ? '' : 'none';
  });
});

// FAQ search
const faqSearch = document.getElementById('faqSearch');
const faqItems = Array.from(document.querySelectorAll('#faqList details'));
faqSearch?.addEventListener('input', (event) => {
  const keyword = event.target.value.toLowerCase().trim();
  faqItems.forEach((item) => {
    const text = item.textContent.toLowerCase();
    item.style.display = text.includes(keyword) ? '' : 'none';
  });
});

// Testimonials slider
const testimonials = [
  { text: '“Dịch vụ tuyệt vời, vị trí trung tâm và đội ngũ rất chuyên nghiệp.”', author: '— Anh Minh, Hà Nội' },
  { text: '“Phòng đẹp, sạch và yên tĩnh. Buffet sáng rất chất lượng.”', author: '— Chị Lan, TP.HCM' },
  { text: '“Trải nghiệm cao cấp đúng kỳ vọng, sẽ quay lại trong chuyến công tác tới.”', author: '— Mr. David, Singapore' }
];
let testimonialIndex = 0;
const testimonialText = document.getElementById('testimonialText');
const testimonialAuthor = document.getElementById('testimonialAuthor');

function renderTestimonial() {
  testimonialText.textContent = testimonials[testimonialIndex].text;
  testimonialAuthor.textContent = testimonials[testimonialIndex].author;
}

document.getElementById('prevTestimonial')?.addEventListener('click', () => {
  testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
  renderTestimonial();
});

document.getElementById('nextTestimonial')?.addEventListener('click', () => {
  testimonialIndex = (testimonialIndex + 1) % testimonials.length;
  renderTestimonial();
});

// Simple language toggle
let isEnglish = false;
langToggle?.addEventListener('click', () => {
  isEnglish = !isEnglish;
  if (isEnglish) {
    document.documentElement.lang = 'en';
    announceText.textContent = 'Monthly offer: Save up to 20% when booking directly on our website.';
    heroText.textContent = 'Experience world-class luxury hospitality in the heart of Hanoi.';
    langToggle.textContent = 'VI';
  } else {
    document.documentElement.lang = 'vi';
    announceText.textContent = 'Ưu đãi tháng này: Giảm đến 20% khi đặt trực tiếp trên website.';
    heroText.textContent = 'Nghỉ dưỡng đẳng cấp tại trung tâm Hà Nội với trải nghiệm cá nhân hóa chuẩn quốc tế.';
    langToggle.textContent = 'EN';
  }
});

// Mock chat button

document.querySelector('.chat-float')?.addEventListener('click', () => {
  alert('Xin chào! Trợ lý đặt phòng sẽ sớm được kết nối live chat/WhatsApp/Zalo.');
});
