const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const canvas = document.getElementById("vectorCanvas");
const copyTeamButton = document.querySelector("[data-copy-team]");
const teamEmails = document.querySelector("[data-team-emails]");
const copyStatus = document.querySelector("[data-copy-status]");

const setHeaderState = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open navigation");
    });
  });
}

window.addEventListener("scroll", setHeaderState, { passive: true });
setHeaderState();

if (copyTeamButton && teamEmails && copyStatus) {
  copyTeamButton.addEventListener("click", async () => {
    const emails = teamEmails.textContent.trim();

    try {
      await navigator.clipboard.writeText(emails);
      copyStatus.textContent = "Copied team emails for easy paste.";
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(teamEmails);
      selection.removeAllRanges();
      selection.addRange(range);
      copyStatus.textContent = "Emails selected. Press Ctrl+C to copy.";
    }
  });
}

if (canvas) {
  const ctx = canvas.getContext("2d");
  const colors = {
    navy: "#13294b",
    carolina: "#4b9cd3",
    green: "#4f9f70",
    gold: "#d4a72c",
    ink: "#172033",
    paper: "#fffaf2"
  };

  const regions = [
    {
      fill: colors.carolina,
      stroke: colors.navy,
      points: [
        [132, 318],
        [194, 192],
        [292, 166],
        [384, 226],
        [363, 344],
        [245, 392]
      ]
    },
    {
      fill: colors.green,
      stroke: "#285f3e",
      points: [
        [386, 216],
        [510, 138],
        [622, 210],
        [600, 345],
        [470, 360],
        [363, 306]
      ]
    },
    {
      fill: colors.gold,
      stroke: "#8a6916",
      points: [
        [238, 390],
        [360, 344],
        [466, 360],
        [548, 442],
        [402, 476],
        [272, 462]
      ]
    }
  ];

  const drawPolygon = (points, fill, stroke, progress) => {
    ctx.beginPath();
    points.forEach(([x, y], index) => {
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.globalAlpha = 0.82;
    ctx.fill();
    ctx.globalAlpha = 1;

    ctx.setLineDash([9, 8]);
    ctx.lineDashOffset = -progress * 26;
    ctx.lineWidth = 4;
    ctx.strokeStyle = stroke;
    ctx.stroke();
    ctx.setLineDash([]);
  };

  const drawClosedPathBadge = (x, y, text, color) => {
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.strokeStyle = "rgba(19,41,75,0.16)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(x, y, 128, 34, 8);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x + 18, y + 17, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = colors.ink;
    ctx.font = "700 13px Inter, sans-serif";
    ctx.fillText(text, x + 32, y + 22);
  };

  const draw = (time) => {
    const progress = time / 1000;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "rgba(19, 41, 75, 0.06)";
    ctx.fillRect(70, 96, 620, 330);

    regions.forEach((region, index) => {
      drawPolygon(region.points, region.fill, region.stroke, progress + index * 0.22);
    });

    ctx.strokeStyle = "rgba(19, 41, 75, 0.5)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(104, 424);
    ctx.bezierCurveTo(250, 516, 510, 516, 658, 418);
    ctx.stroke();

    ctx.fillStyle = colors.navy;
    ctx.font = "800 64px Inter, sans-serif";
    ctx.fillText("CAD", 98, 116);

    drawClosedPathBadge(492, 82, "path closed", colors.green);
    drawClosedPathBadge(96, 436, "DXF export", colors.carolina);
    drawClosedPathBadge(526, 440, "SVG ready", colors.gold);

    requestAnimationFrame(draw);
  };

  requestAnimationFrame(draw);
}
