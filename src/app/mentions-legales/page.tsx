import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/landing/legal-page";

export const metadata: Metadata = {
  title: "Mentions Légales — Banana Growth Agency",
  description:
    "Mentions légales du site Banana Growth Agency : éditeur, hébergeur et informations légales.",
};

export default function MentionsLegalesPage() {
  return (
    <LegalPage title="Mentions Légales">
      <LegalSection heading="Coordonnées">
        <ul className="space-y-1">
          <li>Téléphone : +33 6 68 81 68 42</li>
          <li>
            Email :{" "}
            <a
              href="mailto:hello@banana-growth.agency"
              className="text-pink transition-colors hover:text-pink/80"
            >
              hello@banana-growth.agency
            </a>
          </li>
          <li>Adresse : 16 RTE DE BUGALE, 44500 LA BAULE-ESCOUBLAC</li>
          <li>Forme juridique : SAS (Société par Actions Simplifiée)</li>
        </ul>
      </LegalSection>

      <LegalSection heading="Éditeur du site">
        <p>
          Le site{" "}
          <a
            href="https://www.banana-growth.agency"
            className="text-pink transition-colors hover:text-pink/80"
          >
            https://www.banana-growth.agency
          </a>{" "}
          est édité par Banana Growth Agency, société par actions simplifiée au
          capital de 1 000 €, immatriculée au Registre du Commerce et des
          Sociétés de Saint-Nazaire sous le numéro 985 119 981. Son siège social
          est situé au 16 RTE DE BUGALE, 44500 LA BAULE-ESCOUBLAC, représentée
          par Benjamin Joneau en qualité de représentant légal.
        </p>
      </LegalSection>

      <LegalSection heading="Informations complémentaires">
        <ul className="space-y-1">
          <li>Numéro de TVA : FR39985119981</li>
          <li>
            Hébergement : Vercel Inc. (340 S Lemon Ave #4133, Walnut, CA 91789,
            États-Unis)
          </li>
          <li>Directeur de la publication : Benjamin Joneau</li>
          <li>
            Cadre légal : Loi n° 2004-575 du 21 juin 2004 pour la confiance dans
            l&apos;économie numérique
          </li>
          <li>Modèle de document : inspiré de SEQ Legal (seqlegal.com)</li>
        </ul>
      </LegalSection>
    </LegalPage>
  );
}
