function updateTime() {
  const now = new Date();

  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const weekday = now.getDay();

  const timeStr = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const dateStr = `${year}年${month}月${day}日`;

  document.getElementById('time').textContent = timeStr;
  document.getElementById('date').textContent = dateStr;

  const weekItems = document.querySelectorAll('.weekday span');
  weekItems.forEach((item, index) => {
    item.classList.remove('active');
    if (index === weekday) {
      item.classList.add('active');
    }
  });
}

updateTime();
const timer = setInterval(updateTime, 1000);
module.exports = {
  timer
}

