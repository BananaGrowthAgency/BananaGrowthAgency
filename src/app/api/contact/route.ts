// Formulaire de contact du site → CRM (crm.banana-growth.agency/api/formulaire-contact).
// Le secret partagé reste côté serveur : le navigateur ne parle qu'à cette route.

const CRM_ENDPOINT = process.env.CRM_CONTACT_ENDPOINT ?? "https://crm.banana-growth.agency/api/formulaire-contact";
// Un humain met plus de 2 s à remplir le formulaire (durée mesurée dans le navigateur).
const MIN_FILL_MS = 2000;

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return Response.json({ error: "Requête invalide." }, { status: 400 });

  const email = typeof body.email === "string" ? body.email.trim() : "";
  // Rejets anti-robot : réponse « ok » pour ne rien apprendre au robot, mais toujours tracés dans les logs.
  if (body.confirm === true) {
    console.warn("[contact] écarté : case piège cochée", { email });
    return Response.json({ ok: true });
  }
  if (typeof body.elapsedMs === "number" && body.elapsedMs < MIN_FILL_MS) {
    console.warn("[contact] écarté : rempli trop vite", { email, elapsedMs: body.elapsedMs });
    return Response.json({ ok: true });
  }

  const secret = process.env.CONTACT_FORM_SECRET;
  if (!secret) {
    console.error("[contact] CONTACT_FORM_SECRET manquante");
    return Response.json({ error: "Envoi momentanément indisponible." }, { status: 503 });
  }

  const res = await fetch(CRM_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/json",
      // Aperçus Vercel du CRM protégés : jeton de contournement facultatif.
      ...(process.env.CRM_BYPASS_TOKEN && { "x-vercel-protection-bypass": process.env.CRM_BYPASS_TOKEN }),
    },
    body: JSON.stringify({
      firstName: body.firstName,
      lastName: body.lastName,
      email,
      phone: body.phone,
      company: body.company,
      message: body.message,
      page: body.page,
      utm: body.utm,
    }),
  }).catch((e: unknown) => {
    console.error("[contact] CRM injoignable", e);
    return null;
  });

  if (!res?.ok) {
    const detail = res ? await res.text().catch(() => "") : "";
    console.error("[contact] refus du CRM", res?.status, detail.slice(0, 300), { email });
    if (res?.status === 400) return Response.json({ error: "Merci de remplir prénom, email et parc." }, { status: 400 });
    return Response.json({ error: "Envoi impossible pour le moment." }, { status: 502 });
  }
  return Response.json({ ok: true });
}
