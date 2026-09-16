import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Quorexis",
  description: "Politique de confidentialité et protection des données personnelles de Quorexis",
};

export default function PrivacyPage() {
  return (
    <article className="pt-32 md:pt-40 pb-24 md:pb-36">
      <div className="mx-auto max-w-[800px] px-6 md:px-20">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Politique de confidentialité
        </h1>
        <p className="mt-4 text-muted">
          Dernière mise à jour : 16 septembre 2026
        </p>

        <div className="mt-12 prose prose-neutral dark:prose-invert max-w-none">

          <section className="mt-10">
            <h2 className="text-xl font-semibold mt-8 mb-4">1. Identité du responsable du traitement</h2>
            <p className="text-muted leading-relaxed">
              Le responsable du traitement des données personnelles collectées via les services Quorexis est :
            </p>
            <ul className="mt-4 space-y-2 text-muted">
              <li><strong>Raison sociale :</strong> Quorexis</li>
              <li><strong>Site web :</strong> https://quorexis.fr</li>
              <li><strong>Application CRM :</strong> https://crm.quorexis.fr</li>
              <li><strong>Contact :</strong> contact@quorexis.fr</li>
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold mt-8 mb-4">2. Données collectées</h2>

            <h3 className="text-lg font-medium mt-6 mb-3">2.1 Lors de la création de compte</h3>
            <p className="text-muted leading-relaxed">
              Lorsque vous créez un compte sur Quorexis CRM, nous collectons :
            </p>
            <ul className="mt-3 space-y-1 text-muted list-disc list-inside">
              <li>Prénom</li>
              <li>Nom</li>
              <li>Adresse email</li>
              <li>Mot de passe (stocké sous forme chiffrée)</li>
            </ul>

            <h3 className="text-lg font-medium mt-6 mb-3">2.2 Authentification via Google</h3>
            <p className="text-muted leading-relaxed">
              Si vous choisissez de vous connecter via Google (&laquo;&nbsp;Continuer avec Google&nbsp;&raquo;), nous accédons uniquement aux informations suivantes fournies par Google :
            </p>
            <ul className="mt-3 space-y-1 text-muted list-disc list-inside">
              <li>Identifiant unique Google (pour identifier votre compte)</li>
              <li>Adresse email</li>
              <li>Prénom et nom (issus de votre profil Google)</li>
              <li>Statut de vérification de l&apos;email</li>
            </ul>
            <p className="mt-4 text-muted leading-relaxed">
              <strong>Important :</strong> Nous n&apos;accédons pas et ne stockons jamais :
            </p>
            <ul className="mt-3 space-y-1 text-muted list-disc list-inside">
              <li>Votre mot de passe Google</li>
              <li>Vos emails Gmail</li>
              <li>Vos fichiers Google Drive</li>
              <li>Vos contacts Google</li>
              <li>Votre agenda Google</li>
              <li>Aucune autre donnée de vos services Google</li>
            </ul>
            <p className="mt-4 text-muted leading-relaxed">
              Nous utilisons exclusivement les scopes OAuth suivants : <code className="bg-foreground/5 px-1.5 py-0.5 rounded text-sm">openid</code>, <code className="bg-foreground/5 px-1.5 py-0.5 rounded text-sm">email</code>, <code className="bg-foreground/5 px-1.5 py-0.5 rounded text-sm">profile</code>. Ces scopes permettent uniquement de vérifier votre identité et de récupérer vos informations de profil de base.
            </p>

            <h3 className="text-lg font-medium mt-6 mb-3">2.3 Données techniques</h3>
            <p className="text-muted leading-relaxed">
              Lors de votre utilisation de nos services, nous pouvons collecter automatiquement :
            </p>
            <ul className="mt-3 space-y-1 text-muted list-disc list-inside">
              <li>Adresse IP</li>
              <li>Type de navigateur et version</li>
              <li>Système d&apos;exploitation</li>
              <li>Pages consultées et horodatage</li>
              <li>Journaux d&apos;erreurs techniques</li>
            </ul>

            <h3 className="text-lg font-medium mt-6 mb-3">2.4 Cookies et sessions</h3>
            <p className="text-muted leading-relaxed">
              Nous utilisons des cookies et mécanismes de session pour :
            </p>
            <ul className="mt-3 space-y-1 text-muted list-disc list-inside">
              <li>Maintenir votre session authentifiée</li>
              <li>Mémoriser vos préférences</li>
              <li>Assurer la sécurité de votre compte</li>
            </ul>
            <p className="mt-4 text-muted leading-relaxed">
              Ces cookies sont essentiels au fonctionnement du service et ne sont pas utilisés à des fins publicitaires.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold mt-8 mb-4">3. Finalités du traitement</h2>
            <p className="text-muted leading-relaxed">
              Vos données personnelles sont traitées pour les finalités suivantes :
            </p>
            <ul className="mt-3 space-y-1 text-muted list-disc list-inside">
              <li>Création et gestion de votre compte utilisateur</li>
              <li>Authentification et sécurisation de l&apos;accès à votre compte</li>
              <li>Fourniture des fonctionnalités du CRM Quorexis</li>
              <li>Communication relative à votre compte et nos services</li>
              <li>Support technique et assistance</li>
              <li>Amélioration de nos services</li>
              <li>Respect de nos obligations légales</li>
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold mt-8 mb-4">4. Base légale du traitement</h2>
            <p className="text-muted leading-relaxed">
              Le traitement de vos données repose sur les bases légales suivantes :
            </p>
            <ul className="mt-3 space-y-2 text-muted list-disc list-inside">
              <li><strong>Exécution du contrat :</strong> Les données de compte sont nécessaires pour vous fournir l&apos;accès à Quorexis CRM.</li>
              <li><strong>Intérêt légitime :</strong> L&apos;amélioration de nos services et la sécurité de la plateforme.</li>
              <li><strong>Obligation légale :</strong> La conservation de certaines données peut être requise par la loi.</li>
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold mt-8 mb-4">5. Durée de conservation</h2>
            <p className="text-muted leading-relaxed">
              Vos données personnelles sont conservées :
            </p>
            <ul className="mt-3 space-y-2 text-muted list-disc list-inside">
              <li><strong>Données de compte :</strong> Pendant toute la durée de votre inscription, puis supprimées dans un délai de 30 jours après la suppression de votre compte.</li>
              <li><strong>Journaux techniques :</strong> 12 mois maximum.</li>
              <li><strong>Données de facturation :</strong> 10 ans conformément aux obligations comptables.</li>
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold mt-8 mb-4">6. Sous-traitants et hébergement</h2>
            <p className="text-muted leading-relaxed">
              Pour fournir nos services, nous faisons appel aux sous-traitants techniques suivants :
            </p>
            <ul className="mt-3 space-y-2 text-muted list-disc list-inside">
              <li><strong>Hébergement infrastructure :</strong> Serveurs situés en Union Européenne</li>
              <li><strong>Site vitrine :</strong> Vercel (États-Unis, clauses contractuelles types)</li>
              <li><strong>Authentification Google :</strong> Google LLC (États-Unis, clauses contractuelles types)</li>
            </ul>
            <p className="mt-4 text-muted leading-relaxed">
              Tous nos sous-traitants sont soumis à des obligations contractuelles garantissant la protection de vos données conformément au RGPD.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold mt-8 mb-4">7. Transferts hors Union Européenne</h2>
            <p className="text-muted leading-relaxed">
              Certains de nos sous-traitants sont situés aux États-Unis. Ces transferts sont encadrés par :
            </p>
            <ul className="mt-3 space-y-1 text-muted list-disc list-inside">
              <li>Les clauses contractuelles types adoptées par la Commission Européenne</li>
              <li>Le Data Privacy Framework UE-États-Unis pour les entreprises certifiées</li>
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold mt-8 mb-4">8. Sécurité des données</h2>
            <p className="text-muted leading-relaxed">
              Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données :
            </p>
            <ul className="mt-3 space-y-1 text-muted list-disc list-inside">
              <li>Chiffrement des communications (HTTPS/TLS)</li>
              <li>Mots de passe stockés avec hachage sécurisé (bcrypt)</li>
              <li>Tokens d&apos;authentification à durée limitée</li>
              <li>Accès restreint aux données selon le principe du moindre privilège</li>
              <li>Journalisation des accès et actions sensibles</li>
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold mt-8 mb-4">9. Vos droits</h2>
            <p className="text-muted leading-relaxed">
              Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :
            </p>
            <ul className="mt-3 space-y-2 text-muted list-disc list-inside">
              <li><strong>Droit d&apos;accès :</strong> Obtenir une copie des données personnelles que nous détenons vous concernant.</li>
              <li><strong>Droit de rectification :</strong> Corriger des données inexactes ou incomplètes.</li>
              <li><strong>Droit à l&apos;effacement :</strong> Demander la suppression de vos données personnelles.</li>
              <li><strong>Droit à la portabilité :</strong> Recevoir vos données dans un format structuré et lisible par machine.</li>
              <li><strong>Droit d&apos;opposition :</strong> Vous opposer au traitement de vos données dans certaines circonstances.</li>
              <li><strong>Droit à la limitation :</strong> Demander la limitation du traitement de vos données.</li>
            </ul>
            <p className="mt-4 text-muted leading-relaxed">
              Pour exercer ces droits, contactez-nous à : <a href="mailto:privacy@quorexis.fr" className="text-accent hover:underline">privacy@quorexis.fr</a>
            </p>
            <p className="mt-4 text-muted leading-relaxed">
              Vous disposez également du droit d&apos;introduire une réclamation auprès de la CNIL (Commission Nationale de l&apos;Informatique et des Libertés) : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">www.cnil.fr</a>
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold mt-8 mb-4">10. Contact</h2>
            <p className="text-muted leading-relaxed">
              Pour toute question relative à cette politique de confidentialité ou au traitement de vos données personnelles :
            </p>
            <ul className="mt-4 space-y-2 text-muted">
              <li><strong>Email :</strong> <a href="mailto:privacy@quorexis.fr" className="text-accent hover:underline">privacy@quorexis.fr</a></li>
              <li><strong>Site web :</strong> <a href="https://quorexis.fr" className="text-accent hover:underline">https://quorexis.fr</a></li>
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold mt-8 mb-4">11. Modifications de cette politique</h2>
            <p className="text-muted leading-relaxed">
              Nous pouvons mettre à jour cette politique de confidentialité. En cas de modification substantielle, nous vous en informerons par email ou via une notification sur notre plateforme. La date de dernière mise à jour est indiquée en haut de ce document.
            </p>
          </section>

        </div>
      </div>
    </article>
  );
}
