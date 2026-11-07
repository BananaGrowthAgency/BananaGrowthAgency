/* UTM de l'arrivée sur le site, gardées pour la session
   (le formulaire ou la prise de rendez-vous sont souvent sur une autre page). Navigateur uniquement. */

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
const UTM_STORE = "bb-utm";

export function readUtm(): Record<string, string> {
  const fromUrl: Record<string, string> = {};
  const sp = new URLSearchParams(window.location.search);
  for (const k of UTM_KEYS) {
    const v = sp.get(k);
    if (v) fromUrl[k] = v;
  }
  try {
    if (Object.keys(fromUrl).length) sessionStorage.setItem(UTM_STORE, JSON.stringify(fromUrl));
    else return JSON.parse(sessionStorage.getItem(UTM_STORE) || "{}");
  } catch {
    /* stockage indisponible : on garde ce que l'URL donne */
  }
  return fromUrl;
}
