import type { Metadata } from "next";

export type StudioLocale = "tr" | "en" | "de";

export const serviceLandingSlugs = [
  "freelance-web-tasarimci",
  "freelance-grafik-tasarimci",
  "ai-otomasyon-ozel-yazilim",
] as const;

export type ServiceLandingSlug = (typeof serviceLandingSlugs)[number];

type Step = Readonly<{ title: string; description: string }>;
type Faq = Readonly<{ question: string; answer: string }>;

export type ServiceLandingCopy = Readonly<{
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  lead: string;
  location: string;
  providerIntro: string;
  fitTitle: string;
  fit: readonly string[];
  deliverablesTitle: string;
  deliverables: readonly Step[];
  processTitle: string;
  process: readonly Step[];
  proofTitle: string;
  proofIntro: string;
  proofNotes: Readonly<Record<string, string>>;
  faqTitle: string;
  faq: readonly Faq[];
  backLabel: string;
  projectLabel: string;
  ctaEyebrow: string;
  ctaTitle: string;
  ctaText: string;
  ctaLabel: string;
}>;

export type ServiceLandingDefinition = Readonly<{
  slug: ServiceLandingSlug;
  provider: Readonly<{
    name: "Hazar Volga Ekiz" | "Hülya Ekiz";
    role: Readonly<Record<StudioLocale, string>>;
  }>;
  projectSlugs: readonly string[];
  copy: Readonly<Record<StudioLocale, ServiceLandingCopy>>;
}>;

const WEB = {
  slug: "freelance-web-tasarimci",
  provider: {
    name: "Hazar Volga Ekiz",
    role: { tr: "Web tasarımı ve geliştirme", en: "Web design and development", de: "Webdesign und Entwicklung" },
  },
  projectSlugs: ["aluplan", "aluplan-destek"],
  copy: {
    tr: {
      metaTitle: "Freelance Web Tasarımcı",
      metaDescription: "Freelance web tasarımı ve Next.js geliştirme: kurumsal siteler, içerik mimarisi, mobil deneyim ve yayın desteği.",
      eyebrow: "Web tasarımı & geliştirme",
      title: "Freelance Web Tasarımcı",
      lead: "İşinizi açık anlatan, hızlı ve bakımı kolay bir web sitesi tasarlayıp geliştiriyorum. İçerik yapısından mobil deneyime ve yayına kadar aynı ürün bakışıyla ilerliyorum.",
      location: "Türkiye ve yurt dışı için uzaktan çalışma",
      providerIntro: "Süreç Hazar Volga Ekiz tarafından tasarım, Next.js geliştirme ve teknik doğrulama birlikte düşünülerek yürütülür.",
      fitTitle: "Bu çalışma ne zaman uygun?",
      fit: ["Kurumsal siteniz işinizi artık doğru anlatmıyorsa", "Ürün ve hizmetlerinizi anlaşılır bir içerik yapısında sunmak istiyorsanız", "Tasarım ile geliştirme arasında kopukluk yaşamadan ilerlemek istiyorsanız"],
      deliverablesTitle: "Kapsam",
      deliverables: [
        { title: "İçerik ve deneyim mimarisi", description: "Sayfa hiyerarşisi, kullanıcı akışları ve dönüşüm noktaları birlikte ele alınır." },
        { title: "Arayüz tasarımı", description: "Markaya özgü, erişilebilir ve farklı ekranlara uyumlu bir görsel sistem hazırlanır." },
        { title: "Next.js geliştirme", description: "Performans, teknik SEO, ölçümleme ve sürdürülebilir yayın yapısı gözetilir." },
      ],
      processTitle: "Nasıl ilerliyoruz?",
      process: [
        { title: "01 · İhtiyaç", description: "Hedefler, içerik, teknik gereksinimler ve mevcut malzemeler netleştirilir." },
        { title: "02 · Tasarım", description: "Ana sayfa ve kritik akışlar çalışan, gerçek içerikli önizlemelerle geliştirilir." },
        { title: "03 · Yayın", description: "Mobil, erişilebilirlik, performans ve indekslenebilirlik kontrollerinden sonra yayın planlanır." },
      ],
      proofTitle: "İlgili çalışmalar",
      proofIntro: "Aşağıdaki örnekler farklı içerik yoğunluklarına sahip gerçek web ve dijital ürün çalışmalarını gösterir.",
      proofNotes: { aluplan: "Çok ürünlü kurumsal web deneyimi", "aluplan-destek": "Aktif kullanımda · destek, RAG ve CRM platformu" },
      faqTitle: "Sık sorulanlar",
      faq: [
        { question: "Yalnızca tasarım mı, geliştirme de var mı?", answer: "Kapsama göre bilgi mimarisi, arayüz tasarımı, Next.js geliştirme ve yayın desteği birlikte veya ayrı planlanabilir." },
        { question: "Uzaktan çalışıyor musunuz?", answer: "Evet. Toplantı, önizleme ve teslim süreçlerini uzaktan yürütebilirim." },
        { question: "SEO garantisi veriyor musunuz?", answer: "Sıralama garantisi vermiyorum. Teknik SEO, erişilebilir içerik yapısı ve ölçülebilir yayın temellerini kuruyorum." },
      ],
      backLabel: "Tüm hizmetler", projectLabel: "Çalışmayı inceleyin", ctaEyebrow: "Yeni bir web projesi", ctaTitle: "İhtiyacınızı birlikte netleştirelim.", ctaText: "Mevcut sitenizi, hedeflerinizi ve zaman planınızı paylaşın; uygun kapsamı birlikte çıkaralım.", ctaLabel: "Web projesini konuşalım",
    },
    en: {
      metaTitle: "Freelance Web Designer",
      metaDescription: "Freelance web design and Next.js development for corporate websites, content architecture, responsive UX and launch support.",
      eyebrow: "Web design & development", title: "Freelance Web Designer", lead: "I design and build clear, fast and maintainable websites. Content structure, responsive experience and launch are handled with one product mindset.", location: "Remote collaboration in Türkiye and internationally", providerIntro: "Hazar Volga Ekiz leads the process across design, Next.js development and technical verification.",
      fitTitle: "When is this a good fit?", fit: ["Your corporate website no longer reflects the business", "You need a clearer structure for products or services", "You want design and development to move forward together"],
      deliverablesTitle: "Scope", deliverables: [{ title: "Content and UX architecture", description: "Page hierarchy, user journeys and conversion points are planned together." }, { title: "Interface design", description: "A brand-specific, accessible and responsive visual system is created." }, { title: "Next.js development", description: "Performance, technical SEO, measurement and maintainable delivery are considered." }],
      processTitle: "How we work", process: [{ title: "01 · Discovery", description: "Goals, content, technical needs and existing material are clarified." }, { title: "02 · Design", description: "The home page and critical flows evolve through working previews with real content." }, { title: "03 · Launch", description: "Mobile, accessibility, performance and indexing checks precede the launch." }],
      proofTitle: "Related work", proofIntro: "These examples show real web and digital product work with different content and operational needs.", proofNotes: { aluplan: "Corporate web experience for a broad product portfolio", "aluplan-destek": "Actively used · support, RAG and CRM platform" },
      faqTitle: "Frequently asked questions", faq: [{ question: "Do you provide development as well as design?", answer: "Depending on scope, content architecture, interface design, Next.js development and launch support can be planned together or separately." }, { question: "Can we work remotely?", answer: "Yes. I can run meetings, reviews and delivery remotely." }, { question: "Do you guarantee search rankings?", answer: "No ranking guarantee is offered. I establish the technical SEO, accessible content structure and measurement foundations." }],
      backLabel: "All services", projectLabel: "View project", ctaEyebrow: "A new web project", ctaTitle: "Let’s define what the project needs.", ctaText: "Share your current site, goals and timing so we can shape a suitable scope.", ctaLabel: "Discuss a web project",
    },
    de: {
      metaTitle: "Freelance Webdesigner", metaDescription: "Freelance Webdesign und Next.js-Entwicklung: Unternehmenswebsites, Inhaltsarchitektur, responsive UX und Begleitung bis zum Launch.",
      eyebrow: "Webdesign & Entwicklung", title: "Freelance Webdesigner", lead: "Ich konzipiere und entwickle klare, schnelle und wartbare Websites. Inhaltsstruktur, responsive Nutzung und Veröffentlichung folgen dabei einer gemeinsamen Produktlogik.", location: "Remote-Zusammenarbeit in der Türkei und international", providerIntro: "Hazar Volga Ekiz begleitet den Prozess von Design und Next.js-Entwicklung bis zur technischen Prüfung.",
      fitTitle: "Wann passt die Zusammenarbeit?", fit: ["Ihre Unternehmenswebsite bildet das Geschäft nicht mehr richtig ab", "Produkte oder Leistungen benötigen eine klarere Struktur", "Design und Entwicklung sollen ohne Brüche zusammenarbeiten"],
      deliverablesTitle: "Leistungsumfang", deliverables: [{ title: "Inhalts- und UX-Architektur", description: "Seitenhierarchie, Nutzerwege und Kontaktpunkte werden gemeinsam geplant." }, { title: "Interface-Design", description: "Ein markenspezifisches, zugängliches und responsives Gestaltungssystem entsteht." }, { title: "Next.js-Entwicklung", description: "Performance, technisches SEO, Messbarkeit und Wartbarkeit werden berücksichtigt." }],
      processTitle: "Unser Ablauf", process: [{ title: "01 · Klärung", description: "Ziele, Inhalte, technische Anforderungen und vorhandenes Material werden geklärt." }, { title: "02 · Gestaltung", description: "Startseite und wichtige Abläufe entstehen in funktionierenden Vorschauen mit echten Inhalten." }, { title: "03 · Launch", description: "Prüfungen für Mobilgeräte, Barrierefreiheit, Performance und Indexierung gehen dem Launch voraus." }],
      proofTitle: "Passende Arbeiten", proofIntro: "Diese Beispiele zeigen reale Web- und Digitalprodukt-Projekte mit unterschiedlichen Inhalts- und Betriebsanforderungen.", proofNotes: { aluplan: "Unternehmenswebsite für ein breites Produktportfolio", "aluplan-destek": "Aktiv im Einsatz · Support-, RAG- und CRM-Plattform" },
      faqTitle: "Häufige Fragen", faq: [{ question: "Umfasst die Leistung auch Entwicklung?", answer: "Je nach Umfang lassen sich Inhaltsarchitektur, Interface-Design, Next.js-Entwicklung und Launch gemeinsam oder einzeln planen." }, { question: "Ist eine Remote-Zusammenarbeit möglich?", answer: "Ja. Abstimmung, Reviews und Übergabe können vollständig remote erfolgen." }, { question: "Garantieren Sie Suchmaschinen-Rankings?", answer: "Nein. Ich schaffe Grundlagen für technisches SEO, zugängliche Inhalte und Messbarkeit, gebe aber keine Ranking-Garantie." }],
      backLabel: "Alle Leistungen", projectLabel: "Projekt ansehen", ctaEyebrow: "Ein neues Webprojekt", ctaTitle: "Lassen Sie uns den Bedarf klären.", ctaText: "Teilen Sie Ihre aktuelle Website, Ziele und den Zeitrahmen – daraus entwickeln wir einen passenden Umfang.", ctaLabel: "Webprojekt besprechen",
    },
  },
} as const satisfies ServiceLandingDefinition;

const GRAPHIC = {
  slug: "freelance-grafik-tasarimci",
  provider: {
    name: "Hülya Ekiz",
    role: { tr: "Sanat yönetimi ve grafik tasarım", en: "Art direction and graphic design", de: "Art Direction und Grafikdesign" },
  },
  projectSlugs: ["bosch-respect", "travel-cafe", "jhm-studio"],
  copy: {
    tr: {
      metaTitle: "Freelance Grafik Tasarımcı", metaDescription: "Freelance grafik tasarım, sanat yönetimi, kampanya ve görsel kimlik çalışmaları. Hülya Ekiz ile doğrudan yaratıcı iş birliği.",
      eyebrow: "Grafik tasarım & sanat yönetimi", title: "Freelance Grafik Tasarımcı", lead: "Markanızın fikrini kampanyadan görsel kimliğe uzanan tutarlı bir dile dönüştürüyorum. Süreci doğrudan, ölçeğe uygun ve gerçek uygulamaları düşünerek yürütüyorum.", location: "Uzaktan proje iş birliğine açık", providerIntro: "Çalışmalar Hülya Ekiz tarafından yürütülür. Bosch seçkisindeki işler, CFA reklam ajansında Art Director rolü kapsamında üretilmiştir.",
      fitTitle: "Birlikte neler üretebiliriz?", fit: ["Yeni bir marka için karakter ve görsel dil", "Kampanya fikri ve farklı mecralara uyarlamalar", "Mevcut kimliğin daha tutarlı uygulamaları"],
      deliverablesTitle: "Kapsam", deliverables: [{ title: "Art direction", description: "Ana fikir, görsel yaklaşım ve uygulamalar arasında ortak bir yön kurulur." }, { title: "Görsel kimlik", description: "Logo, renk, tipografi ve temel marka malzemeleri birlikte ele alınır." }, { title: "Kampanya tasarımı", description: "Basılı ve dijital yüzeylerde çalışacak yaratıcı sistem hazırlanır." }],
      processTitle: "Nasıl ilerliyoruz?", process: [{ title: "01 · Bağlam", description: "Marka, hedef kitle, mecra ve mevcut malzemeler değerlendirilir." }, { title: "02 · Yön", description: "Alternatif yaratıcı yönler gerçek kullanım örnekleriyle görünür hâle getirilir." }, { title: "03 · Uygulama", description: "Seçilen yön teslim formatlarına uyarlanır ve birlikte kontrol edilir." }],
      proofTitle: "İlgili çalışmalar", proofIntro: "Ajans rolü, bağımsız kimlik tasarımı ve farklı uygulama ölçeklerinden seçilmiş örnekler.", proofNotes: { "bosch-respect": "CFA reklam ajansı · Hülya Ekiz, Art Director", "travel-cafe": "Görsel kimlik ve uygulama sistemi", "jhm-studio": "Ambalajdan tabelaya görsel kimlik" },
      faqTitle: "Sık sorulanlar", faq: [{ question: "Logo tasarımı tek başına yapılabilir mi?", answer: "Evet; ancak logonun gerçek kullanım yüzeylerini ve temel görsel sistemi birlikte düşünmek daha tutarlı sonuç verir." }, { question: "Ajanslarla da çalışıyor musunuz?", answer: "Proje kapsamına göre markalarla, ekiplerle ve ajanslarla doğrudan ya da tamamlayıcı bir rolde çalışabilirim." }, { question: "Baskı üretimini de yapıyor musunuz?", answer: "Tasarım ve üretime hazırlık kapsamlanabilir. Baskı ve fiziksel üretim, seçilen tedarikçi ve ayrıca onaylanan koşullarla yürür." }],
      backLabel: "Tüm hizmetler", projectLabel: "Çalışmayı inceleyin", ctaEyebrow: "Yeni bir tasarım ihtiyacı", ctaTitle: "Markanızın görsel yönünü konuşalım.", ctaText: "İhtiyacınızı, kullanılacak mecraları ve mevcut malzemeleri paylaşın; uygun kapsamı birlikte belirleyelim.", ctaLabel: "Tasarım projesini konuşalım",
    },
    en: {
      metaTitle: "Freelance Graphic Designer", metaDescription: "Freelance graphic design, art direction, campaigns and visual identity by Hülya Ekiz.", eyebrow: "Graphic design & art direction", title: "Freelance Graphic Designer", lead: "I turn a brand idea into a consistent visual language, from campaign concepts to identity systems. The process stays direct, practical and grounded in real applications.", location: "Available for remote projects", providerIntro: "Hülya Ekiz leads the work. The Bosch selection was created in her Art Director role at the CFA advertising agency.",
      fitTitle: "What can we create?", fit: ["A distinctive visual language for a new brand", "A campaign concept and adaptations across channels", "A more consistent system for an existing identity"], deliverablesTitle: "Scope", deliverables: [{ title: "Art direction", description: "One visual direction connects the central idea and its applications." }, { title: "Visual identity", description: "Logo, colour, typography and essential brand materials are considered together." }, { title: "Campaign design", description: "A creative system is developed for print and digital surfaces." }], processTitle: "How we work", process: [{ title: "01 · Context", description: "The brand, audience, channels and existing material are reviewed." }, { title: "02 · Direction", description: "Creative directions are made tangible through real-use examples." }, { title: "03 · Application", description: "The selected direction is adapted to delivery formats and reviewed together." }], proofTitle: "Related work", proofIntro: "Selected examples spanning an agency role, independent identity work and different application scales.", proofNotes: { "bosch-respect": "CFA advertising agency · Hülya Ekiz, Art Director", "travel-cafe": "Visual identity and application system", "jhm-studio": "Visual identity from packaging to signage" }, faqTitle: "Frequently asked questions", faq: [{ question: "Can we commission only a logo?", answer: "Yes, although considering real application surfaces and a basic visual system usually creates a more consistent result." }, { question: "Do you collaborate with agencies?", answer: "Depending on scope, I can work directly with brands, teams or agencies in a lead or complementary role." }, { question: "Do you handle print production?", answer: "Design and production-ready files can be included. Physical production depends on the selected supplier and separately approved terms." }], backLabel: "All services", projectLabel: "View project", ctaEyebrow: "A new design need", ctaTitle: "Let’s discuss the visual direction.", ctaText: "Share the need, channels and existing material so we can define the right scope.", ctaLabel: "Discuss a design project",
    },
    de: {
      metaTitle: "Freelance Grafikdesignerin", metaDescription: "Freelance Grafikdesign, Art Direction, Kampagnen und visuelle Identität mit Hülya Ekiz.", eyebrow: "Grafikdesign & Art Direction", title: "Freelance Grafikdesignerin", lead: "Ich übersetze eine Markenidee in eine durchgängige visuelle Sprache – vom Kampagnenkonzept bis zur Identität. Der Prozess bleibt direkt, praxisnah und an realen Anwendungen orientiert.", location: "Remote-Projekte möglich", providerIntro: "Hülya Ekiz leitet die Arbeit. Die Bosch-Auswahl entstand in ihrer Rolle als Art Director bei der Werbeagentur CFA.", fitTitle: "Was können wir gestalten?", fit: ["Eine eigenständige visuelle Sprache für eine neue Marke", "Ein Kampagnenkonzept mit kanalübergreifenden Anwendungen", "Ein konsistenteres System für eine bestehende Identität"], deliverablesTitle: "Leistungsumfang", deliverables: [{ title: "Art Direction", description: "Eine visuelle Richtung verbindet Leitidee und Anwendungen." }, { title: "Visuelle Identität", description: "Logo, Farbe, Typografie und zentrale Markenmaterialien werden gemeinsam entwickelt." }, { title: "Kampagnendesign", description: "Ein kreatives System für Print- und digitale Medien entsteht." }], processTitle: "Unser Ablauf", process: [{ title: "01 · Kontext", description: "Marke, Zielgruppe, Kanäle und vorhandenes Material werden geprüft." }, { title: "02 · Richtung", description: "Kreative Richtungen werden durch reale Anwendungsbeispiele greifbar." }, { title: "03 · Anwendung", description: "Die gewählte Richtung wird auf die Formate übertragen und gemeinsam geprüft." }], proofTitle: "Passende Arbeiten", proofIntro: "Ausgewählte Beispiele aus Agenturrolle, unabhängiger Identitätsarbeit und verschiedenen Anwendungsgrößen.", proofNotes: { "bosch-respect": "Werbeagentur CFA · Hülya Ekiz, Art Director", "travel-cafe": "Visuelle Identität und Anwendungssystem", "jhm-studio": "Visuelle Identität von Verpackung bis Beschilderung" }, faqTitle: "Häufige Fragen", faq: [{ question: "Kann nur ein Logo beauftragt werden?", answer: "Ja. Die Berücksichtigung realer Anwendungen und eines grundlegenden visuellen Systems führt jedoch meist zu einem konsistenteren Ergebnis." }, { question: "Arbeiten Sie auch mit Agenturen?", answer: "Je nach Umfang arbeite ich direkt mit Marken, Teams oder Agenturen in leitender oder ergänzender Rolle." }, { question: "Übernehmen Sie auch die Druckproduktion?", answer: "Design und druckfertige Daten können Teil des Umfangs sein. Die physische Produktion hängt vom gewählten Anbieter und gesondert bestätigten Bedingungen ab." }], backLabel: "Alle Leistungen", projectLabel: "Projekt ansehen", ctaEyebrow: "Ein neuer Gestaltungsbedarf", ctaTitle: "Lassen Sie uns die visuelle Richtung besprechen.", ctaText: "Teilen Sie Bedarf, Medien und vorhandenes Material – gemeinsam bestimmen wir den passenden Umfang.", ctaLabel: "Designprojekt besprechen",
    },
  },
} as const satisfies ServiceLandingDefinition;

const AI = {
  slug: "ai-otomasyon-ozel-yazilim",
  provider: {
    name: "Hazar Volga Ekiz",
    role: { tr: "AI otomasyon ve özel yazılım geliştirme", en: "AI automation and custom software development", de: "KI-Automatisierung und individuelle Softwareentwicklung" },
  },
  projectSlugs: ["aluplan-destek", "signal", "bimmetraj", "affexai"],
  copy: {
    tr: {
      metaTitle: "AI Otomasyon ve Özel Yazılım", metaDescription: "RAG, iş akışı otomasyonu, özel web uygulaması ve AI destekli MVP geliştirme. İnsan onaylı, ölçülebilir ve mevcut aşaması açıkça belirtilen sistemler.", eyebrow: "AI otomasyon & dijital ürün", title: "AI Otomasyon ve Özel Yazılım", lead: "Tekrarlayan bir işi, dağınık bilgiyi veya yeni ürün fikrini kullanılabilir bir sisteme dönüştürüyorum. AI katmanını ancak gerekli olduğu yerde; kaynak, insan onayı ve izlenebilirlikle birlikte kuruyorum.", location: "Uzaktan ürün ve teknik iş birliği", providerIntro: "Ürün mimarisi ve geliştirme Hazar Volga Ekiz tarafından yürütülür; kapsam, veri erişimi ve doğrulama ölçütleri işe başlamadan netleştirilir.", fitTitle: "Hangi ihtiyaçlarda anlamlı?", fit: ["Kurumsal bilgiye kaynak göstererek yanıt veren bir RAG sistemi", "Tekrarlayan ekip işlerini birbirine bağlayan otomasyon", "Kullanıcıyla doğrulanacak özel iş yazılımı, prototip veya MVP"], deliverablesTitle: "Kapsam", deliverables: [{ title: "Keşif ve risk çerçevesi", description: "İş akışı, veri kaynakları, insan kontrol noktaları ve başarı ölçütleri çıkarılır." }, { title: "Çalışan prototip", description: "Kritik senaryoyu gerçekçi veri ve erişim kurallarıyla sınayan bir ürün yüzeyi geliştirilir." }, { title: "Üretime hazırlık", description: "Gözlemlenebilirlik, maliyet, güvenlik, yedekleme ve geri dönüş planı kapsama göre ele alınır." }], processTitle: "Nasıl ilerliyoruz?", process: [{ title: "01 · Önce iş problemi", description: "Model seçmeden önce mevcut süreç, kullanıcı ve ölçülebilir sonuç tanımlanır." }, { title: "02 · Kontrollü pilot", description: "Dar bir senaryoda insan onayı, kaynak gösterimi ve hata davranışı birlikte sınanır." }, { title: "03 · Kademeli genişleme", description: "Kanıtlanan akışlar izleme ve geri dönüş mekanizmalarıyla genişletilir." }], proofTitle: "Ürün ve pilot örnekleri", proofIntro: "Her çalışma mevcut aşamasıyla sunulur; portfolyo üretim uygunluğu veya mevzuat uyumu taahhüdü değildir.", proofNotes: { "aluplan-destek": "Aktif kullanımda · insan onaylı FAQ öğrenme, RAG ve CRM", signal: "Kontrollü teknik pilot · self-hosted kampanya ve otomasyon", bimmetraj: "Geliştirme aşamasında · model, metraj ve teklif akışları", affexai: "Erken erişim · davetle geliştirilen ürün girişimi" }, faqTitle: "Sık sorulanlar", faq: [{ question: "Her sürece yapay zekâ eklemek gerekir mi?", answer: "Hayır. Kural tabanlı otomasyon daha ucuz ve güvenilir olduğunda onu tercih ederim; AI yalnız belirsiz içeriği anlamlandırdığı yerde kullanılır." }, { question: "RAG sistemi kendi kendine öğreniyor mu?", answer: "Kontrolsüz öğrenme önermiyorum. Aday içerik, kaynak ve kalite kontrollerinden geçerek insan onayıyla bilgi havuzuna alınır." }, { question: "MVP doğrudan üretime hazır olur mu?", answer: "MVP varsayımları sınar. Güvenlik, yük, yedekleme, gözlemleme ve kabul testleri üretim kapsamı için ayrıca doğrulanır." }], backLabel: "Tüm hizmetler", projectLabel: "Çalışmayı inceleyin", ctaEyebrow: "Bir iş akışı veya ürün fikri", ctaTitle: "Önce problemi ve sınırları netleştirelim.", ctaText: "Mevcut süreci, veri kaynaklarını ve beklenen çıktıyı paylaşın; en küçük doğrulanabilir adımı birlikte belirleyelim.", ctaLabel: "AI ve yazılım ihtiyacını konuşalım",
    },
    en: {
      metaTitle: "AI Automation and Custom Software", metaDescription: "RAG, workflow automation, custom web applications and AI-assisted MVP development with human review, traceability and honest product stages.", eyebrow: "AI automation & digital products", title: "AI Automation and Custom Software", lead: "I turn repetitive work, fragmented knowledge or a product idea into a usable system. AI is added only where it helps, with provenance, human review and observability.", location: "Remote product and technical collaboration", providerIntro: "Hazar Volga Ekiz leads product architecture and development; scope, data access and validation criteria are clarified before implementation.", fitTitle: "Where does it help?", fit: ["A RAG system that answers from institutional knowledge with sources", "Automation connecting repetitive team workflows", "Custom software, a prototype or MVP to validate with users"], deliverablesTitle: "Scope", deliverables: [{ title: "Discovery and risk frame", description: "Workflow, data sources, human checkpoints and success measures are mapped." }, { title: "Working prototype", description: "A focused product surface tests the critical scenario with realistic data and access rules." }, { title: "Production preparation", description: "Observability, cost, security, backups and rollback are addressed according to scope." }], processTitle: "How we work", process: [{ title: "01 · Business problem first", description: "The process, user and measurable outcome are defined before a model is selected." }, { title: "02 · Controlled pilot", description: "Human approval, provenance and failure behaviour are tested in a narrow scenario." }, { title: "03 · Gradual expansion", description: "Validated flows expand with monitoring and rollback mechanisms." }], proofTitle: "Products and pilots", proofIntro: "Each project is shown at its current stage; this portfolio is not a claim of production or regulatory readiness.", proofNotes: { "aluplan-destek": "Actively used · human-reviewed FAQ learning, RAG and CRM", signal: "Controlled technical pilot · self-hosted campaigns and automation", bimmetraj: "Under development · model, quantity and quotation flows", affexai: "Early access · invitation-only product venture" }, faqTitle: "Frequently asked questions", faq: [{ question: "Does every process need AI?", answer: "No. When rules-based automation is cheaper and more reliable, I prefer it; AI is used where uncertain content needs interpretation." }, { question: "Does a RAG system learn by itself?", answer: "I do not recommend uncontrolled learning. Candidate content passes provenance and quality checks before human approval into the knowledge base." }, { question: "Is an MVP immediately production-ready?", answer: "An MVP tests assumptions. Security, load, backup, observability and acceptance testing are separately validated for production." }], backLabel: "All services", projectLabel: "View project", ctaEyebrow: "A workflow or product idea", ctaTitle: "Let’s clarify the problem and constraints first.", ctaText: "Share the current process, data sources and expected outcome so we can define the smallest verifiable step.", ctaLabel: "Discuss AI and software",
    },
    de: {
      metaTitle: "KI-Automatisierung und Individuelle Software", metaDescription: "RAG, Workflow-Automatisierung, individuelle Webanwendungen und KI-gestützte MVP-Entwicklung mit menschlicher Prüfung und nachvollziehbaren Produktphasen.", eyebrow: "KI-Automatisierung & digitale Produkte", title: "KI-Automatisierung und Individuelle Software", lead: "Ich verwandle wiederkehrende Arbeit, verteiltes Wissen oder eine Produktidee in ein nutzbares System. KI kommt nur dort zum Einsatz, wo sie hilft – mit Quellen, menschlicher Prüfung und Beobachtbarkeit.", location: "Remote-Zusammenarbeit für Produkt und Technik", providerIntro: "Hazar Volga Ekiz verantwortet Produktarchitektur und Entwicklung; Umfang, Datenzugriff und Prüfkriterien werden vor der Umsetzung geklärt.", fitTitle: "Wo ist die Lösung sinnvoll?", fit: ["Ein RAG-System, das institutionelles Wissen mit Quellen beantwortet", "Automatisierung für wiederkehrende Abläufe im Team", "Individuelle Software, Prototyp oder MVP zur Prüfung mit Nutzern"], deliverablesTitle: "Leistungsumfang", deliverables: [{ title: "Klärung und Risikorahmen", description: "Ablauf, Datenquellen, menschliche Kontrollpunkte und Erfolgskriterien werden erfasst." }, { title: "Funktionierender Prototyp", description: "Eine fokussierte Produktoberfläche prüft das Kernscenario mit realistischen Daten und Zugriffsregeln." }, { title: "Produktionsvorbereitung", description: "Beobachtbarkeit, Kosten, Sicherheit, Backups und Rollback werden je nach Umfang berücksichtigt." }], processTitle: "Unser Ablauf", process: [{ title: "01 · Geschäftsproblem zuerst", description: "Prozess, Nutzer und messbares Ergebnis werden vor der Modellauswahl definiert." }, { title: "02 · Kontrollierter Pilot", description: "Menschliche Freigabe, Quellen und Fehlerverhalten werden in einem engen Szenario geprüft." }, { title: "03 · Schrittweise Erweiterung", description: "Validierte Abläufe werden mit Monitoring und Rückfallmechanismen erweitert." }], proofTitle: "Produkte und Pilotprojekte", proofIntro: "Jede Arbeit wird mit ihrem aktuellen Stand gezeigt; das Portfolio ist keine Zusage zur Produktions- oder Rechtskonformität.", proofNotes: { "aluplan-destek": "Aktiv im Einsatz · menschlich geprüftes FAQ-Lernen, RAG und CRM", signal: "Kontrolliertes technisches Pilotprojekt · selbst gehostete Kampagnen und Automatisierung", bimmetraj: "In Entwicklung · Modell-, Mengen- und Angebotsabläufe", affexai: "Früher Zugang · Produktinitiative auf Einladung" }, faqTitle: "Häufige Fragen", faq: [{ question: "Braucht jeder Ablauf KI?", answer: "Nein. Wenn regelbasierte Automatisierung günstiger und verlässlicher ist, hat sie Vorrang. KI wird für uneindeutige Inhalte eingesetzt." }, { question: "Lernt ein RAG-System selbstständig?", answer: "Unkontrolliertes Lernen empfehle ich nicht. Inhalte durchlaufen Quellen- und Qualitätsprüfungen, bevor sie nach menschlicher Freigabe in die Wissensbasis gelangen." }, { question: "Ist ein MVP sofort produktionsbereit?", answer: "Ein MVP prüft Annahmen. Sicherheit, Last, Backup, Monitoring und Abnahmetests werden für den Produktivbetrieb gesondert validiert." }], backLabel: "Alle Leistungen", projectLabel: "Projekt ansehen", ctaEyebrow: "Ein Ablauf oder eine Produktidee", ctaTitle: "Klären wir zuerst Problem und Grenzen.", ctaText: "Teilen Sie den aktuellen Prozess, Datenquellen und das erwartete Ergebnis – daraus bestimmen wir den kleinsten prüfbaren Schritt.", ctaLabel: "KI- und Softwarebedarf besprechen",
    },
  },
} as const satisfies ServiceLandingDefinition;

export const serviceLandings = [WEB, GRAPHIC, AI] as const satisfies readonly ServiceLandingDefinition[];

export function isServiceLandingSlug(value: string): value is ServiceLandingSlug {
  return serviceLandingSlugs.some((slug) => slug === value);
}

export function getServiceLanding(slug: ServiceLandingSlug): ServiceLandingDefinition {
  const landing = serviceLandings.find((entry) => entry.slug === slug);
  if (!landing) throw new Error(`Unknown service landing: ${slug}`);
  return landing;
}

export function serviceLandingPath(locale: StudioLocale, slug: ServiceLandingSlug): string {
  return `${locale === "tr" ? "" : `/${locale}`}/${slug}`;
}

export function getServiceLandingMetadata(locale: StudioLocale, slug: ServiceLandingSlug): Metadata {
  const landing = getServiceLanding(slug);
  const copy = landing.copy[locale];
  const canonical = serviceLandingPath(locale, slug);
  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates: {
      canonical,
      languages: {
        tr: serviceLandingPath("tr", slug),
        en: serviceLandingPath("en", slug),
        de: serviceLandingPath("de", slug),
      },
    },
    openGraph: {
      type: "website",
      url: canonical,
      title: copy.metaTitle,
      description: copy.metaDescription,
      locale: locale === "tr" ? "tr_TR" : locale === "en" ? "en_US" : "de_DE",
    },
  };
}
