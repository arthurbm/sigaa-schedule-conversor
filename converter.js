// Constants and main conversion logic
const WEEKDAY_MAP = {
  2: "SEG",
  3: "TER",
  4: "QUA",
  5: "QUI",
  6: "SEX",
  7: "SAB",
};

const SCHEDULE_MAP = {
  M1: { start: "08:00", end: "08:55" },
  M2: { start: "08:55", end: "09:50" },
  M3: { start: "10:00", end: "10:55" },
  M4: { start: "10:55", end: "11:50" },
  M5: { start: "12:00", end: "12:55" },
  M6: { start: "12:55", end: "13:50" },
  T1: { start: "12:55", end: "13:50" },
  T2: { start: "14:00", end: "14:55" },
  T3: { start: "14:55", end: "15:50" },
  T4: { start: "16:00", end: "16:55" },
  T5: { start: "16:55", end: "17:50" },
  T6: { start: "18:00", end: "18:55" },
  T7: { start: "18:55", end: "19:50" },
  N1: { start: "19:00", end: "19:50" },
  N2: { start: "19:50", end: "20:40" },
  N3: { start: "20:50", end: "21:40" },
  N4: { start: "21:40", end: "22:30" },
};

const SCHEDULE_PATTERN = /\b([2-7]{1,5})([MTN])([1-7]{1,7})\b/gm;

function translateSchedule(match, weekday, shift, periods) {
  try {
    const dia = WEEKDAY_MAP[weekday];
    const firstPeriod = `${shift}${periods[0]}`;
    const lastPeriod = `${shift}${periods[periods.length - 1]}`;

    if (!SCHEDULE_MAP[firstPeriod] || !SCHEDULE_MAP[lastPeriod]) {
      console.warn(`Horário não mapeado encontrado: ${match}`);
      return match;
    }

    const horaInicio = SCHEDULE_MAP[firstPeriod].start;
    const horaFim = SCHEDULE_MAP[lastPeriod].end;

    return `${dia} ${horaInicio}-${horaFim}`;
  } catch (error) {
    console.error(`Erro ao processar horário ${match}:`, error);
    return match;
  }
}

function splitWeekdays(match, weekdays, shift, periods) {
  return [...weekdays].map((day) => `${day}${shift}${periods}`).join(" ");
}

function sortByWeekday(text) {
  return [...text.matchAll(SCHEDULE_PATTERN)]
    .sort((a, b) => a[1].localeCompare(b[1]))
    .map((match) => match[0])
    .join(" ");
}

function processSchedules() {
  const scheduleFilter = {
    acceptNode: (node) =>
      SCHEDULE_PATTERN.test(node.textContent)
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_SKIP,
  };

  const treeWalker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    scheduleFilter,
    false
  );

  let node;
  while ((node = treeWalker.nextNode())) {
    node.textContent = node.textContent.replace(
      SCHEDULE_PATTERN,
      splitWeekdays
    );
    node.textContent = sortByWeekday(node.textContent);
    node.textContent = node.textContent.replace(
      SCHEDULE_PATTERN,
      translateSchedule
    );

    node.textContent = node.textContent.replace(
      /([A-Z]{3}) 12:00-12:55 \1 12:55-13:50/gm,
      "$1 12:00-13:50"
    );
  }
}

function adjustPageLayout() {
  const currentUrl = window.location.href;

  if (currentUrl.includes("public/turmas/listar.jsf")) {
    document
      .querySelectorAll("img[src='/shared/img/geral/ajuda.gif']")
      .forEach((icon) => (icon.hidden = true));
  }

  const columnWidths = {
    "graduacao/matricula/turmas_curriculo.jsf": "35%",
    "graduacao/matricula/turmas_equivalentes_curriculo.jsf": "13%",
    "graduacao/matricula/turmas_extra_curriculo.jsf": "12%",
    "portais/discente/discente.jsf": "18%",
    "portais/discente/turmas.jsf": "34%",
    "public/turmas/listar.jsf": "13%",
  };

  document.querySelectorAll("tHead th").forEach((column) => {
    if (column.innerText.includes("Horário")) {
      for (const [urlPart, width] of Object.entries(columnWidths)) {
        if (currentUrl.includes(urlPart)) {
          column.width = width;
          break;
        }
      }
    }
  });
}
