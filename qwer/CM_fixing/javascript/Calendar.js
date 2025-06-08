const calendarBody = document.getElementById('calendarBody');
const monthYear = document.getElementById('monthYear');

let currentDate = new Date(2025, 6); // July 2025

function renderCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  calendarBody.innerHTML = '';
  monthYear.textContent = `${date.toLocaleString('default', { month: 'long' })} ${year}`;

  let row = document.createElement('tr');
  for (let i = 0; i < firstDay; i++) {
    row.innerHTML += '<td></td>';
  }

  for (let day = 1; day <= lastDate; day++) {
    const cell = document.createElement('td');
    cell.textContent = day;

    if ([4, 5].includes(day)) {
      cell.classList.add('study-date');
    } else if ([1, 2, 3, 6, 7, 8, 9, 10].includes(day)) {
      cell.classList.add('plan-date');
    }

    row.appendChild(cell);

    if ((firstDay + day) % 7 === 0 || day === lastDate) {
      calendarBody.appendChild(row);
      row = document.createElement('tr');
    }
  }
}

function prevMonth() {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
}

function nextMonth() {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
}

renderCalendar(currentDate);
