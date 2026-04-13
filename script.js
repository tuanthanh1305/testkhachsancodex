const menuBtn = document.getElementById('menuBtn');
const mainNav = document.getElementById('mainNav');

menuBtn?.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(isOpen));
  menuBtn.setAttribute('aria-label', isOpen ? 'Đóng menu' : 'Mở menu');
});

document.querySelectorAll('#mainNav a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav?.classList.remove('open');
    menuBtn?.setAttribute('aria-expanded', 'false');
    menuBtn?.setAttribute('aria-label', 'Mở menu');
  });
});

document.querySelector('.booking-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const checkin = form.checkin.value;
  const checkout = form.checkout.value;
  const guests = Number(form.guests.value);
  const roomType = form.roomType.value;

  if (!checkin || !checkout || !roomType) {
    alert('Vui lòng điền đầy đủ thông tin đặt phòng.');
    return;
  }

  if (new Date(checkout) <= new Date(checkin)) {
    alert('Ngày trả phòng phải sau ngày nhận phòng.');
    return;
  }

  alert(
    `Đã ghi nhận yêu cầu: ${roomType} cho ${guests} khách từ ${checkin} đến ${checkout}. Bộ phận đặt phòng sẽ liên hệ sớm.`
  );
});
