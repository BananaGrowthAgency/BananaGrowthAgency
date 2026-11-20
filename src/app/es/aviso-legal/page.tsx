import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/landing/legal-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Aviso legal",
  description: "Aviso legal del sitio de Banana Growth Agency: editor, alojamiento e información legal.",
  path: "/mentions-legales",
  locale: "es",
});

export default function AvisoLegalPage() {
  return (
    <LegalPage title="Aviso legal" locale="es">
      <LegalSection heading="Datos de contacto">
        <ul className="space-y-1">
          <li>Teléfono: +33 6 68 81 68 42</li>
          <li>
            Email:{" "}
            <a
              href="mailto:hello@banana-growth.agency"
              className="text-pink transition-colors hover:text-pink/80"
            >
              hello@banana-growth.agency
            </a>
          </li>
          <li>Dirección: 16 RTE DE BUGALE, 44500 LA BAULE-ESCOUBLAC (Francia)</li>
          <li>Forma jurídica: SAS (Société par Actions Simplifiée, sociedad por acciones simplificada de derecho francés)</li>
        </ul>
      </LegalSection>

      <LegalSection heading="Editor del sitio">
        <p>
          El sitio{" "}
          <a
            href="https://www.banana-growth.agency"
            className="text-pink transition-colors hover:text-pink/80"
          >
            https://www.banana-growth.agency
          </a>{" "}
          está editado por Banana Growth Agency, sociedad por acciones simplificada
          con un capital de 1000 €, inscrita en el Registro Mercantil (Registre du
          Commerce et des Sociétés) de Saint-Nazaire con el número 985 119 981. Su
          domicilio social se encuentra en 16 RTE DE BUGALE, 44500
          LA BAULE-ESCOUBLAC, y está representada por Benjamin Joneau en calidad de
          representante legal.
        </p>
      </LegalSection>

      <LegalSection heading="Información complementaria">
        <ul className="space-y-1">
          <li>Número de IVA: FR39985119981</li>
          <li>
            Alojamiento: Vercel Inc. (340 S Lemon Ave #4133, Walnut, CA 91789,
            Estados Unidos)
          </li>
          <li>Director de la publicación: Benjamin Joneau</li>
          <li>
            Marco legal: Ley francesa n.º 2004-575 de 21 de junio de 2004 para la
            confianza en la economía digital (Loi pour la confiance dans
            l&apos;économie numérique)
          </li>
          <li>Modelo de documento: inspirado en SEQ Legal (seqlegal.com)</li>
        </ul>
      </LegalSection>

      <LegalSection heading="Versión de referencia">
        <p>
          Este aviso legal es una traducción de la versión francesa. En caso de
          divergencia, prevalece la versión francesa.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
