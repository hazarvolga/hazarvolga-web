import Link from "next/link";

type Locale = "tr" | "en" | "de";

const content = {
  tr: {
    title: "Gizlilik ve Çerezler",
    intro: "Bu sayfa, hazarvolga.com.tr üzerindeki sınırlı veri işleme faaliyetlerini KVKK ve uygulanabildiği ölçüde GDPR ilkeleri doğrultusunda açıklar.",
    controller: "İletişim ve veri sorumlusu",
    controllerText: "Bu sitenin veri sorumlusu ve işletmecisi Hazar Volga Ekiz’dir. Gizlilik başvuruları aşağıdaki e-posta adresinden alınır. Portfolyoda adı geçen diğer kişiler, yalnızca kendi çalışmalarının sahibi veya proje katkıcısıdır.",
    data: "Hangi verileri işliyoruz?",
    dataText: "Site hesap, üyelik veya çevrim içi form sunmaz. Bizimle e-posta üzerinden iletişim kurarsanız, gönderdiğiniz iletişim ve proje bilgileri yalnızca talebinizi yanıtlamak ve olası çalışma kapsamını değerlendirmek için işlenir.",
    analytics: "Google Analytics ve çerez tercihi",
    analyticsText: "Google Analytics yalnızca açıkça kabul etmenizden sonra yüklenir. Ziyaret edilen sayfa, yaklaşık konum, yönlendiren sayfa, cihaz ve tarayıcı bilgileri ile takma adlı çerez tanımlayıcıları ölçülebilir. Reklam depolama, Google Signals ve reklam kişiselleştirme kapalıdır. _ga ve _ga_<ölçüm-kodu> çerezleri varsayılan olarak en fazla 2 yıl saklanabilir; onayı geri çektiğinizde erişilebilen analitik çerezleri silinir.",
    basis: "Amaçlar ve hukuki dayanak",
    basisText: "Analitik ölçüm yalnızca açık rızanıza dayanır. E-posta ile gönderdiğiniz bilgiler, talebinizi yanıtlamak ve sözleşme öncesi adımları yürütmek için; iş ilişkisi kurulursa sözleşmenin ifası, hukuki yükümlülükler ve hakların tesisi veya savunulması için gerekli olduğu ölçüde işlenir.",
    recipients: "Alıcılar ve sağlayıcılar",
    recipientsText: "Veriler yalnızca barındırma ve e-posta altyapısını işleten teknik sağlayıcılarla hizmetin gerektirdiği ölçüde paylaşılır. Analitik onayı verirseniz Google Ireland Limited ve bağlı hizmet sağlayıcıları ölçüm verilerini işleyebilir. Site çevrim içi form, reklam profili veya veri satışı kullanmaz.",
    transfer: "Aktarım ve saklama",
    transferText: "Analitik onayı verirseniz ölçüm verileri Google altyapısı üzerinden Türkiye ve AEA dışındaki ülkelere aktarılabilir; Google’ın yürürlükteki sözleşmesel aktarım mekanizmaları uygulanır. Sonuçlanmayan iletişim yazışmaları son temastan sonra en çok 24 ay tutulur. Sözleşme, fatura, uyuşmazlık veya mevzuat nedeniyle daha uzun saklanması gereken kayıtlar ilgili yasal süre sonunda silinir ya da anonimleştirilir.",
    rights: "Haklarınız",
    rightsText: "KVKK’nın 11. maddesi kapsamındaki bilgi alma, erişim, düzeltme, silme, aktarım alıcılarını öğrenme ve otomatik sonuçlara itiraz haklarınızı e-posta ile kullanabilirsiniz. GDPR uygulanıyorsa kısıtlama, taşınabilirlik ve rızayı geri çekme hakları da geçerlidir. Yanıtı yetersiz bulursanız Kişisel Verileri Koruma Kurumuna veya bulunduğunuz yerdeki yetkili veri koruma otoritesine şikâyet edebilirsiniz.",
    settings: "Çerez tercihlerinizi sayfanın altındaki “Çerez tercihleri” düğmesinden dilediğiniz zaman değiştirebilirsiniz.",
    back: "İletişime geçin",
    updated: "Son güncelleme: 5 Kasım 2026",
  },
  en: {
    title: "Privacy and Cookies",
    intro: "This notice explains the limited processing on hazarvolga.com.tr under Türkiye’s KVKK and, where applicable, GDPR principles.",
    controller: "Contact and data controller",
    controllerText: "Hazar Volga Ekiz is the controller and operator of this website. Privacy requests are accepted at the email address below. Other people named in the portfolio are owners of, or contributors to, their respective work only.",
    data: "Data we process",
    dataText: "The website has no account, membership or online form. If you contact us by email, the contact and project information you send is processed only to answer your request and assess a possible scope of work.",
    analytics: "Google Analytics and cookie choice",
    analyticsText: "Google Analytics loads only after your explicit acceptance. Pages visited, approximate location, referrer, device and browser information, and pseudonymous cookie identifiers may be measured. Advertising storage, Google Signals and ad personalisation are disabled. The _ga and _ga_<measurement-id> cookies may be retained for up to 2 years by default; accessible analytics cookies are removed when consent is withdrawn.",
    basis: "Purposes and legal bases",
    basisText: "Analytics relies solely on your consent. Information sent by email is processed to answer your request and take pre-contractual steps; if a business relationship begins, it may also be processed as necessary to perform the contract, comply with legal duties, or establish and defend legal claims.",
    recipients: "Recipients and providers",
    recipientsText: "Data is shared only with technical hosting and email providers where necessary to deliver the service. If you accept analytics, Google Ireland Limited and its service providers may process measurement data. The site has no online form, advertising profile or sale of personal data.",
    transfer: "Transfers and retention",
    transferText: "If you accept analytics, measurement data may pass through Google infrastructure outside Türkiye and the EEA under Google’s then-current contractual transfer mechanisms. Enquiries that do not lead to a contract are retained for no more than 24 months after the last contact. Contract, invoice, dispute or legally required records are deleted or anonymised when the applicable statutory period ends.",
    rights: "Your rights",
    rightsText: "You may exercise the rights in Article 11 of KVKK, including information, access, correction, deletion, learning recipients and objecting to automated outcomes. Where GDPR applies, restriction, portability and withdrawal of consent also apply. If the response is insufficient, you may complain to Türkiye’s Personal Data Protection Authority or your competent local data-protection authority.",
    settings: "You can change your cookie choice at any time using the “Cookie preferences” button at the bottom of the page.",
    back: "Contact us",
    updated: "Last updated: 5 November 2026",
  },
  de: {
    title: "Datenschutz und Cookies",
    intro: "Dieser Hinweis erläutert die begrenzte Verarbeitung auf hazarvolga.com.tr nach dem türkischen KVKK und, soweit anwendbar, den Grundsätzen der GDPR/DSGVO.",
    controller: "Kontakt und Verantwortliche",
    controllerText: "Hazar Volga Ekiz ist Verantwortlicher und Betreiber dieser Website. Datenschutzanfragen werden unter der folgenden E-Mail-Adresse entgegengenommen. Andere im Portfolio genannte Personen sind nur Urheber oder Mitwirkende ihrer jeweiligen Arbeiten.",
    data: "Verarbeitete Daten",
    dataText: "Die Website bietet kein Konto, keine Mitgliedschaft und kein Online-Formular. Wenn Sie uns per E-Mail kontaktieren, werden die übermittelten Kontakt- und Projektinformationen nur zur Beantwortung Ihrer Anfrage und zur Prüfung eines möglichen Leistungsumfangs verarbeitet.",
    analytics: "Google Analytics und Cookie-Auswahl",
    analyticsText: "Google Analytics wird erst nach Ihrer ausdrücklichen Zustimmung geladen. Besuchte Seiten, ungefährer Standort, Referrer, Geräte- und Browserinformationen sowie pseudonyme Cookie-Kennungen können gemessen werden. Werbespeicherung, Google Signals und Anzeigenpersonalisierung sind deaktiviert. Die Cookies _ga und _ga_<Mess-ID> können standardmäßig bis zu 2 Jahre gespeichert werden; erreichbare Analyse-Cookies werden beim Widerruf gelöscht.",
    basis: "Zwecke und Rechtsgrundlagen",
    basisText: "Die Analyse beruht ausschließlich auf Ihrer Einwilligung. Per E-Mail übermittelte Daten werden zur Beantwortung und für vorvertragliche Schritte verarbeitet; bei einer Geschäftsbeziehung außerdem, soweit dies für Vertragserfüllung, Rechtspflichten oder die Begründung und Verteidigung von Ansprüchen erforderlich ist.",
    recipients: "Empfänger und Anbieter",
    recipientsText: "Daten werden nur im erforderlichen Umfang mit technischen Hosting- und E-Mail-Anbietern geteilt. Bei Analyse-Einwilligung können Google Ireland Limited und deren Dienstleister Messdaten verarbeiten. Die Website nutzt kein Online-Formular, kein Werbeprofil und keinen Verkauf personenbezogener Daten.",
    transfer: "Übermittlung und Speicherung",
    transferText: "Bei Zustimmung können Messdaten über Google-Infrastruktur außerhalb der Türkei und des EWR nach den jeweils geltenden vertraglichen Übermittlungsmechanismen von Google verarbeitet werden. Anfragen ohne Vertrag werden höchstens 24 Monate nach dem letzten Kontakt gespeichert. Vertrags-, Rechnungs-, Streit- oder gesetzlich erforderliche Unterlagen werden nach Ablauf der jeweiligen Frist gelöscht oder anonymisiert.",
    rights: "Ihre Rechte",
    rightsText: "Sie können die Rechte aus Artikel 11 KVKK ausüben, darunter Information, Auskunft, Berichtigung, Löschung, Kenntnis der Empfänger und Widerspruch gegen automatisierte Ergebnisse. Soweit die DSGVO gilt, bestehen auch Einschränkung, Datenübertragbarkeit und Widerruf. Bei unzureichender Antwort können Sie sich bei der türkischen Datenschutzbehörde oder Ihrer zuständigen Datenschutzaufsicht beschweren.",
    settings: "Ihre Cookie-Auswahl können Sie jederzeit über die Schaltfläche „Cookie-Einstellungen“ am unteren Seitenrand ändern.",
    back: "Kontakt aufnehmen",
    updated: "Stand: 5. November 2026",
  },
} as const;

export function PrivacyNotice({ locale }: { readonly locale: Locale }) {
  const copy = content[locale];
  const prefix = locale === "tr" ? "" : `/${locale}`;
  return (
    <article className="wrap page-section privacy-page">
      <header className="page-heading">
        <div>
          <p className="service-kicker">KVKK · GDPR</p>
          <h1>{copy.title}<span className="accent">.</span></h1>
        </div>
        <p>{copy.intro}</p>
      </header>
      <div className="privacy-sections">
        <section><h2>{copy.controller}</h2><p>{copy.controllerText}</p><a href="mailto:info@hazarvolga.com.tr">info@hazarvolga.com.tr</a></section>
        <section><h2>{copy.data}</h2><p>{copy.dataText}</p></section>
        <section><h2>{copy.analytics}</h2><p>{copy.analyticsText}</p><p>{copy.settings}</p></section>
        <section><h2>{copy.basis}</h2><p>{copy.basisText}</p></section>
        <section><h2>{copy.recipients}</h2><p>{copy.recipientsText}</p></section>
        <section><h2>{copy.transfer}</h2><p>{copy.transferText}</p></section>
        <section><h2>{copy.rights}</h2><p>{copy.rightsText}</p></section>
      </div>
      <footer className="privacy-page-footer">
        <span>{copy.updated}</span>
        <Link className="text-link" href={`${prefix}/iletisim`}>{copy.back} ↗</Link>
      </footer>
    </article>
  );
}
