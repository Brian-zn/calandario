

const holidaysGuarulhos2024 = {
    "2024-01-01": "Ano Novo",
    "2024-02-12": "Carnaval",
    "2024-03-29": "Sexta-feira Santa",
    "2024-04-18": "Paixão de Cristo",
    "2024-04-20": "Pascoa",
    "2024-04-21": "Tiradentes",
    "2024-05-01": "Dia do Trabalhador",
    "2024-05-11": "Dia das Mães",
    "2024-06-12": "Dia dos Namorados",
    "2024-06-16": "Corpus Christo",
    "2024-07-09": "Revolução Constitucionalista",
    "2024-07-20": "Dia do Amigo",
    "2024-08-11": "Dia dos Pais",
    "2024-09-07": "Independência do Brasil",
    "2024-10-12": "Nossa Senhora Aparecida",
    "2024-11-02": "Finados",
    "2024-11-15": "Proclamação da República",
    "2024-12-08": "Aniversario de Guarulhos",
    "2024-12-25": "Natal"
};

const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
let currentMonth = new Date().getMonth();
let currentYear = 2024;

function generateCalendar(month, year) {
    const daysContainer = document.getElementById("daysContainer");
    daysContainer.innerHTML = "";

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Preenche os dias em branco antes do primeiro dia do mês
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement("div");
        emptyDay.classList.add("empty");
        daysContainer.appendChild(emptyDay);
    }

    // Preenche os dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement("div");
        dayElement.textContent = day;
        dayElement.dataset.date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        dayElement.classList.add("day");

        const fullDate = dayElement.dataset.date;
        if (holidaysGuarulhos2024[fullDate]) {
            dayElement.classList.add("holiday");
            dayElement.setAttribute("title", holidaysGuarulhos2024[fullDate]);
        }

        dayElement.addEventListener("click", () => showFeedback(dayElement));
        daysContainer.appendChild(dayElement);
    }

    document.getElementById("monthYear").textContent = `${monthNames[month]} ${year}`;
}

function showFeedback(dayElement) {
    const feedback = document.getElementById("feedback");
    const date = dayElement.dataset.date;
    const holiday = holidaysGuarulhos2024[date];
    feedback.textContent = holiday ? `Feriado: ${holiday}` : `Data: ${date}`;
}

function changeMonth(offset) {
    currentMonth += offset;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar(currentMonth, currentYear);
}

document.addEventListener("DOMContentLoaded", () => {
    generateCalendar(currentMonth, currentYear);
});

