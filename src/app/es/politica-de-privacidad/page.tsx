import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/landing/legal-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Política de privacidad",
  description:
    "Política de privacidad del sitio de Banana Growth Agency: recogida, uso y protección de tus datos personales.",
  path: "/politique-de-confidentialite",
  locale: "es",
});

export default function PoliticaPrivacidadPage() {
  return (
    <LegalPage title="Política de privacidad" locale="es">
      <LegalSection heading="Introducción">
        <p>
          La protección de la privacidad de nuestros visitantes es primordial y
          nos comprometemos a salvaguardarla. Esta política explica cómo tratamos
          tus datos y cómo usamos las cookies en nuestro sitio.
        </p>
      </LegalSection>

      <LegalSection heading="Fuente">
        <p>
          Esta política se basa en un modelo proporcionado por SEQ Legal
          (seqlegal.com), adaptado a nuestro uso.
        </p>
      </LegalSection>

      <LegalSection heading="Contactar con la CNIL">
        <p>
          Para cualquier pregunta relacionada con la protección de datos, puedes
          contactar con la autoridad de control francesa: Service des plaintes de
          la CNIL, 3 Place de Fontenoy – TSA 80715, 75334 Paris Cedex 07
          (Francia), o por teléfono en el +33 1 53 73 22 22.
        </p>
      </LegalSection>

      <LegalSection heading="Recogida de datos personales">
        <p>
          Recogemos distintos datos personales, en particular los relativos a tu
          equipo informático, tu actividad de navegación, tus datos de registro,
          tus datos de transacción y tus comunicaciones con el sitio.
        </p>
      </LegalSection>

      <LegalSection heading="Uso de tus datos personales">
        <p>
          Tus datos sirven en particular para la administración del sitio, su
          personalización, la activación de servicios, la entrega de productos,
          el envío de notificaciones por email, las comunicaciones de marketing
          (con tu consentimiento), la elaboración de estadísticas, la gestión de
          reclamaciones, el mantenimiento de la seguridad y la prevención del
          fraude.
        </p>
      </LegalSection>

      <LegalSection heading="Comunicación de tus datos personales">
        <p>
          Tus datos no se cederán a terceros para su propio marketing sin tu
          consentimiento explícito. Tus datos pueden compartirse con nuestros
          empleados, asesores, proveedores y con las autoridades cuando la ley lo
          exija.
        </p>
      </LegalSection>

      <LegalSection heading="Conservación de los datos">
        <p>
          No conservaremos tus datos personales más tiempo del necesario. Algunos
          datos pueden conservarse indefinidamente por motivos de cumplimiento
          legal.
        </p>
      </LegalSection>

      <LegalSection heading="Seguridad de los datos">
        <p>
          Tomaremos todas las medidas razonables para evitar la pérdida, el mal
          uso o la alteración de tus datos personales.
        </p>
      </LegalSection>

      <LegalSection heading="Tus derechos">
        <p>
          Puedes solicitar el acceso a tus datos personales o darte de baja de las
          comunicaciones de marketing en la dirección:{" "}
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
          El sitio utiliza cookies para mejorar la experiencia de usuario, realizar
          análisis estadísticos, administrar el sitio, prevenir el fraude y
          personalizar el contenido.
        </p>
      </LegalSection>

      <LegalSection heading="Versión de referencia">
        <p>
          Esta política es una traducción de la versión francesa. En caso de
          divergencia, prevalece la versión francesa.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
