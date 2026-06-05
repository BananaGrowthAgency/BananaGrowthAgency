import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/landing/legal-page";

export const metadata: Metadata = {
  title: "Politique de Confidentialité — Banana Growth Agency",
  description:
    "Politique de confidentialité du site Banana Growth Agency : collecte, usage et protection de vos données personnelles.",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <LegalPage title="Politique de Confidentialité">
      <LegalSection heading="Introduction">
        <p>
          La protection de la vie privée de nos visiteurs est primordiale. Nous
          nous engageons à la sauvegarder. La présente politique explique la
          manière dont nous traitons vos données et utilisons les cookies sur
          notre site.
        </p>
      </LegalSection>

      <LegalSection heading="Source">
        <p>
          Cette politique est basée sur un modèle fourni par SEQ Legal
          (seqlegal.com), adapté pour notre usage.
        </p>
      </LegalSection>

      <LegalSection heading="Contacter la CNIL">
        <p>
          Pour toute question relative à la protection des données, vous pouvez
          contacter l&apos;autorité de contrôle française : Service des plaintes
          de la CNIL, 3 Place de Fontenoy – TSA 80715, 75334 Paris Cedex 07, ou
          par téléphone au 01.53.73.22.22.
        </p>
      </LegalSection>

      <LegalSection heading="Collecte de données personnelles">
        <p>
          Nous collectons différentes informations personnelles, notamment les
          données relatives à votre équipement informatique, votre activité de
          navigation, vos informations d&apos;inscription, vos données de
          transaction et vos communications avec le site.
        </p>
      </LegalSection>

      <LegalSection heading="Usage de vos données personnelles">
        <p>
          Vos données servent notamment à l&apos;administration du site, à sa
          personnalisation, à l&apos;activation de services, à la livraison de
          produits, à l&apos;envoi de notifications par email, aux
          communications marketing (avec votre consentement), à la fourniture de
          statistiques, à la gestion des réclamations, au maintien de la
          sécurité et à la prévention de la fraude.
        </p>
      </LegalSection>

      <LegalSection heading="Divulgation de vos informations personnelles">
        <p>
          Vos données ne seront pas fournies à des tiers pour leur marketing
          sans votre consentement explicite. Vos données peuvent être partagées
          avec nos employés, conseillers, fournisseurs et autorités légales
          lorsque la loi l&apos;exige.
        </p>
      </LegalSection>

      <LegalSection heading="Conservation des données">
        <p>
          Nous ne conserverons pas vos données personnelles plus longtemps que
          nécessaire. Certaines données peuvent être conservées indéfiniment
          pour des raisons de conformité légale.
        </p>
      </LegalSection>

      <LegalSection heading="Sécurité des données">
        <p>
          Nous prendrons toutes les mesures raisonnables pour prévenir la perte,
          le mauvais usage ou l&apos;altération de vos données personnelles.
        </p>
      </LegalSection>

      <LegalSection heading="Vos droits">
        <p>
          Vous pouvez demander l&apos;accès à vos données personnelles ou vous
          désinscrire des communications marketing à l&apos;adresse :{" "}
          <a
            href="mailto:hello@banana-growth.agency"
            className="text-pink transition-colors hover:text-pink/80"
          >
            hello@banana-growth.agency
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection heading="Cookies">
        <p>
          Le site utilise des cookies pour améliorer l&apos;expérience
          utilisateur, réaliser des analyses statistiques, administrer le site,
          prévenir la fraude et personnaliser le contenu.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
