export async function onRequestPost(context) {
  try {
    const { request, env } = context;

    // Pobranie adresu Webhooka ze zmiennej środowiskowej Cloudflare Pages lub domyślnego
    const fallbackWebhook = atob(
      "aHR0cHM6Ly9kaXNjb3JkLmNvbS9hcGkvd2ViaG9va3MvMTU1ODA4MzgwOTk1NjU5NzkwMi9sTHZFcmdzVVVySkJhUjB4SEN4ajR1OE5tTk9sQnd0a0ZwYXp5VDlwaHQ4Q0UtbTdna1FJd1YwRUZPS1AyVEVyYkdFRg=="
    );
    const webhookUrl = env.DISCORD_WEBHOOK_URL || fallbackWebhook;

    const userAgent = request.headers.get("user-agent") || "Nieznane";

    // Ignoruj automatyczne roboty indeksujące i boty (Google, Bing, itp.), aby uniknąć spamu
    const isBot = /bot|crawl|spider|slurp|facebookexternalhit|whatsapp|preview|headlesschrome|bytespider/i.test(userAgent);
    if (isBot) {
      return new Response(JSON.stringify({ status: "ignored_bot" }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    // Dane geolokalizacyjne dostarczane automatycznie przez sieć Cloudflare Edge
    const cf = request.cf || {};
    const city = cf.city || "Nieznane miasto";
    const country = cf.country || "Nieznany kraj";
    const flag = country && country.length === 2
      ? country.toUpperCase().replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
      : "🌍";
    const locationStr = `${flag} ${city}, ${country}`;

    // Dane przesłane przez skrypt ze strony
    let clientData = {};
    try {
      clientData = await request.json();
    } catch (_) {}

    const referrer = clientData.referrer || request.headers.get("referer") || "Bezpośrednie (brak referrer)";
    const path = clientData.path || "/";

    // Rozpoznanie systemu / urządzenia
    let device = "💻 Komputer";
    if (/iphone|ipad|ipod/i.test(userAgent)) device = "📱 Apple iOS";
    else if (/android/i.test(userAgent)) device = "📱 Android";
    else if (/macintosh|mac os x/i.test(userAgent)) device = "💻 macOS";
    else if (/windows/i.test(userAgent)) device = "💻 Windows";
    else if (/linux/i.test(userAgent)) device = "💻 Linux";

    const payload = {
      username: "Portfolio Tracker",
      embeds: [
        {
          title: "👀 Nowa wizyta na portfolio!",
          color: 0x2563eb,
          fields: [
            {
              name: "📍 Lokalizacja",
              value: locationStr,
              inline: true
            },
            {
              name: "💻 Urządzenie",
              value: device,
              inline: true
            },
            {
              name: "🔗 Źródło (Referrer)",
              value: referrer.length > 250 ? referrer.substring(0, 247) + "..." : referrer,
              inline: false
            },
            {
              name: "📄 Podstrona",
              value: `\`${path}\``,
              inline: true
            }
          ],
          footer: {
            text: "Cloudflare Pages • szperlinski.pl"
          },
          timestamp: new Date().toISOString()
        }
      ]
    };

    const discordResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!discordResponse.ok) {
      return new Response(JSON.stringify({ status: "discord_error", code: discordResponse.status }), {
        status: 502,
        headers: { "Content-Type": "application/json" }
      });
    }

    return new Response(JSON.stringify({ status: "success" }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ status: "error", message: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
