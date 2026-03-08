const motivationalMessages = [
  "🙏 Comece seu dia com Deus! Abra o app e receba sua palavra de hoje.",
  "✨ Deus tem uma palavra especial para você hoje. Venha conferir!",
  "📖 Já leu seu devocional de hoje? Fortaleça sua fé agora!",
  "❤️ Que tal um momento de oração? Deus está esperando por você.",
  "🔥 Não esqueça do seu desafio espiritual! Continue firme!",
  "🕊️ A paz de Deus que excede todo entendimento está disponível para você hoje.",
  "⭐ Você é precioso aos olhos de Deus. Venha meditar na Palavra!",
  "💪 Deus é sua fortaleza. Comece o dia com Ele!",
  "🌅 Bom dia! Que tal começar lendo o versículo do dia?",
  "📝 Seu diário espiritual espera por você. Registre o que Deus tem falado!",
  "🌟 Cada manhã são novas as misericórdias de Deus. Aproveite este dia!",
  "🙌 Deus está com você em cada passo. Abra o app e seja fortalecido!",
];

const NOTIFICATION_HOUR = 8; // 8am daily notification
const LAST_NOTIF_KEY = "alianca-last-notification";
const LAST_SCHEDULED_KEY = "alianca-last-scheduled";

export function requestNotificationPermission(): Promise<boolean> {
  if (!("Notification" in window)) return Promise.resolve(false);
  if (Notification.permission === "granted") return Promise.resolve(true);
  if (Notification.permission === "denied") return Promise.resolve(false);

  return Notification.requestPermission().then((p) => p === "granted");
}

function getRandomMessage(): string {
  return motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
}

async function getSwRegistration(): Promise<ServiceWorkerRegistration | null> {
  if (!("serviceWorker" in navigator)) return null;
  try {
    return await navigator.serviceWorker.ready;
  } catch {
    return null;
  }
}

// Show a notification immediately (via SW if available, or browser fallback)
async function showNotification() {
  const msg = getRandomMessage();
  const title = "Aliança com Deus";

  // Prefer SW showNotification (works in background on mobile)
  const reg = await getSwRegistration();
  if (reg) {
    await reg.showNotification(title, {
      body: msg,
      icon: "/logo.png",
      badge: "/logo.png",
      vibrate: [200, 100, 200],
      tag: "alianca-daily",
      data: { url: "/" },
    });
  } else {
    // Fallback for browsers without SW support
    new Notification(title, {
      body: msg,
      icon: "/logo.png",
    });
  }
}

// Schedule a notification for 8am today (or tomorrow if already past 8am)
async function scheduleNotificationViaSW(targetTime: Date) {
  const reg = await getSwRegistration();
  if (!reg?.active) return;

  reg.active.postMessage({
    type: "SCHEDULE_NOTIFICATION",
    title: "Aliança com Deus",
    body: getRandomMessage(),
    timestamp: targetTime.getTime(),
  });
}

// Main entry — call this whenever the app loads
export async function scheduleDailyNotification() {
  if (!("Notification" in window) || Notification.permission !== "granted") return;

  const today = new Date().toISOString().split("T")[0];
  const now = new Date();
  const hour = now.getHours();

  // Calculate today's 8am
  const todayAt8am = new Date(now.getFullYear(), now.getMonth(), now.getDate(), NOTIFICATION_HOUR, 0, 0);
  // Tomorrow's 8am
  const tomorrowAt8am = new Date(todayAt8am.getTime() + 24 * 60 * 60 * 1000);

  // ── Case 1: it's between 6am–10am and we haven't notified today → show now
  if (hour >= 6 && hour <= 10) {
    const lastNotif = localStorage.getItem(LAST_NOTIF_KEY);
    if (lastNotif !== today) {
      await showNotification();
      localStorage.setItem(LAST_NOTIF_KEY, today);
      return;
    }
  }

  // ── Case 2: it's before 8am today → schedule for 8am today via SW
  if (now < todayAt8am) {
    const lastScheduled = localStorage.getItem(LAST_SCHEDULED_KEY);
    if (lastScheduled !== today) {
      await scheduleNotificationViaSW(todayAt8am);
      localStorage.setItem(LAST_SCHEDULED_KEY, today);

      // Also set a JS timeout as backup (works if tab stays open overnight)
      const delay = todayAt8am.getTime() - now.getTime();
      setTimeout(async () => {
        const alreadyShown = localStorage.getItem(LAST_NOTIF_KEY);
        if (alreadyShown !== today) {
          await showNotification();
          localStorage.setItem(LAST_NOTIF_KEY, today);
        }
      }, delay);
    }
    return;
  }

  // ── Case 3: it's after 10am → schedule for 8am tomorrow via SW
  const tomorrowStr = tomorrowAt8am.toISOString().split("T")[0];
  const lastScheduled = localStorage.getItem(LAST_SCHEDULED_KEY);
  if (lastScheduled !== tomorrowStr) {
    await scheduleNotificationViaSW(tomorrowAt8am);
    localStorage.setItem(LAST_SCHEDULED_KEY, tomorrowStr);
  }
}
