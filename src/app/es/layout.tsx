/**
 * Toutes les pages espagnoles. Le layout racine pose lang="fr" sur <html> :
 * on reprend la langue ici, pour les lecteurs d'écran et la traduction auto.
 */
export default function EspagnolLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div lang="es">{children}</div>;
}
