export type PortfolioCategory =
  "Kampanya" | "Görsel kimlik" | "Web" | "Dijital ürün" | "Basılı işler";

export interface Project {
  readonly slug: string;
  readonly title: string;
  readonly subtitle: string;
  readonly category: PortfolioCategory;
  readonly cover: string;
  readonly coverAlt: string;
  readonly images: readonly {
    readonly src: string;
    readonly alt: string;
    readonly width?: number;
    readonly height?: number;
  }[];
  readonly video?: {
    readonly src: string;
    readonly description: string;
  };
  readonly summary: string;
  readonly approach: string;
  readonly credits: readonly {
    readonly label: string;
    readonly value: string;
  }[];
  readonly website?: string;
  readonly source?: { readonly label: string; readonly url: string };
  readonly status?: string;
  readonly featured: boolean;
  readonly tone?: "light" | "dark";
}

export const categories: readonly PortfolioCategory[] = [
  "Kampanya",
  "Görsel kimlik",
  "Web",
  "Dijital ürün",
  "Basılı işler",
];

const cfaCredits = [
  { label: "Art Director", value: "Hülya Ekiz" },
  { label: "Ajans", value: "CFA" },
] as const;

const designCredits = [{ label: "Tasarım", value: "Hülya Ekiz" }] as const;
const webCredits = [
  {
    label: "Web tasarımı ve AI destekli geliştirme",
    value: "Hazar Volga Ekiz",
  },
] as const;

const photo = (file: string, alt: string) => ({
  src: `/portfolio/${file}.jpg`,
  alt,
});

const detail = (file: string, alt: string) => ({
  ...photo(`kesit/${file}`, alt),
  width: 225,
  height: 960,
});

type WebProjectInput = Omit<
  Project,
  "cover" | "coverAlt" | "images" | "credits"
> & {
  readonly credits?: Project["credits"];
};

function webProject(input: WebProjectInput): Project {
  const image = photo(
    input.slug,
    `${input.title} web arayüzünün ekran görüntüsü`,
  );
  return {
    ...input,
    cover: image.src,
    coverAlt: image.alt,
    images: [image],
    credits: input.credits ?? webCredits,
  };
}

// Project descriptions are editorial drafts for local review. Credits reflect
// the supplied attribution; no unverified awards or performance claims are used.
export const projects: readonly Project[] = [
  {
    slug: "bosch-respect",
    title: "Bosch",
    subtitle: "Respect for the master",
    category: "Kampanya",
    cover: "/portfolio/respect2.jpg",
    coverAlt: "Bosch Respect for the master kampanyasının yan yana iki afişi",
    images: [
      photo("respect2", "Bosch kampanyasının portre ve ürün odaklı afişleri"),
      photo(
        "respect3",
        "Respect for the master kampanyasının basılı yayın uygulaması",
      ),
      photo("respect4", "Bosch mağaza alanında kampanya uygulaması"),
      photo("respect5", "Bosch kampanya serisinden bir uygulama"),
      photo("respect6", "Respect for the master görsel dünyasından bir detay"),
      photo("respect7", "Bosch kampanya uygulamalarından bir örnek"),
      detail(
        "respect1",
        "Bosch Respect for the master görselinden dikey kesit",
      ),
    ],
    summary:
      "Ustalığa saygı fikrini ürün iletişimine taşıyan bir Bosch kampanyası. Portre, ürün ve şef figürü aynı görsel anlatının parçalarını oluşturuyor.",
    approach:
      "Kampanyanın ana fikri afişten basılı yayına ve mağaza içi uygulamalara uzanıyor. Seçki, bu fikrin farklı yüzeylerde nasıl korunduğunu gösteriyor.",
    credits: cfaCredits,
    featured: true,
    tone: "light",
  },
  webProject({
    slug: "aluplan",
    title: "Aluplan",
    subtitle: "Ürünlerden çözümlere, kurumsal web deneyimi",
    category: "Web",
    summary:
      "Farklı yazılım ailelerini, çözüm alanlarını ve kaynakları aynı kurumsal web sitesinde buluşturan bir çalışma.",
    approach:
      "Ürün ve çözüm sayfaları, ziyaretçinin ihtiyacından başlayarak ilgili içeriğe ulaşabileceği bir yapı içinde düzenlendi. Ana sayfa, ürün ailesi ve kaynaklar birlikte ele alındı.",
    website: "https://aluplan.com.tr/",
    featured: true,
    tone: "dark",
  }),
  webProject({
    slug: "aluplan-destek",
    title: "allplan.net.tr",
    subtitle: "Yapay zekâ destekli destek talebi platformu",
    category: "Dijital ürün",
    summary:
      "Allplan.net.tr üzerinde aktif olarak kullanılan, yapay zekâ destekli bir support ticket platformu. Destek taleplerinin yönetimini ve kullanıcıların yardım alma sürecini aynı dijital üründe buluşturuyor.",
    approach:
      "Destek talebi deneyimi ve yapay zekâ desteği, günlük kullanımın parçası olan bir platform içinde birlikte ele alındı. Eğitim kaynakları ve yazılım bağlantıları bu destek deneyimini tamamlıyor. Portfolyoda platformun herkese açık arayüzü gösteriliyor.",
    credits: [
      {
        label: "Web ve AI destekli platform geliştirme",
        value: "Hazar Volga Ekiz",
      },
    ],
    status: "Aktif kullanımda",
    website: "https://allplan.net.tr/tr",
    featured: false,
    tone: "dark",
  }),
  webProject({
    slug: "aluplan-sertifika",
    title: "aluplan.info",
    subtitle: "Otomatik sertifika oluşturma ve doğrulama sistemi",
    category: "Dijital ürün",
    summary:
      "Aluplan için geliştirilen, otomatik sertifika oluşturma ile çevrim içi sertifika sorgulamayı bir araya getiren sistem. Sertifikalar, sertifika numarası veya isim bilgisi üzerinden doğrulanabiliyor.",
    approach:
      "Sertifika üretimi ve sonradan doğrulanması aynı sistem içinde ele alındı. Herkese açık sorgulama ekranı, kullanıcıların belge kontrolüne doğrudan ulaşabileceği sade bir arayüzle tasarlandı.",
    credits: [
      {
        label: "Web uygulaması ve otomasyon geliştirme",
        value: "Hazar Volga Ekiz",
      },
    ],
    website: "https://aluplan.info/",
    featured: false,
    tone: "light",
  }),
  webProject({
    slug: "affexai",
    title: "AffeXAI Cortex",
    subtitle: "Hazar’ın ürün girişimi · AI destekli marka iletişimi",
    category: "Dijital ürün",
    summary:
      "Hazar Volga Ekiz’in kendi ürün girişimi olarak geliştirdiği AffeXAI Cortex; destek talepleri, formlar, kampanyalar ve müşteri konuşmalarını ortak bir marka hafızasında buluşturmayı amaçlayan bir platform. Ürün, davetli erken erişim aşamasında geliştiriliyor.",
    approach:
      "Ürün fikri, arayüzler ve AI destekli iş akışları birlikte ele alınıyor. Tasarımın odağında kaynağı belli öneriler, insan onayıyla ilerleyen aksiyonlar ve sonuçlardan öğrenen bir karar döngüsü var. Modüllerin erken erişim, geliştirme ve yol haritası durumları ürün sitesinde ayrı ayrı sunuluyor.",
    credits: [
      { label: "Proje türü", value: "Bağımsız ürün girişimi" },
      {
        label: "Ürün tasarımı ve AI destekli geliştirme",
        value: "Hazar Volga Ekiz",
      },
    ],
    status: "Erken erişim · davetle",
    website: "https://affexai.tr/",
    featured: false,
    tone: "dark",
  }),
  {
    slug: "travel-cafe",
    title: "Travel Cafe İstanbul",
    subtitle: "Bir fincandan başlayan görsel kimlik",
    category: "Görsel kimlik",
    cover: "/portfolio/tc7.jpg",
    coverAlt: "Travel Cafe İstanbul kimliğinin basılı ve dijital uygulamaları",
    images: [
      photo("tc7", "Travel Cafe görsel kimlik uygulamalarının toplu sunumu"),
      photo("tc2", "Travel Cafe logosunun kâğıt üzerindeki kabartma sunumu"),
      photo("tc3", "Sarı ve beyaz Travel Cafe kartvizitleri"),
      photo("tc4", "Travel Cafe logosunun bez çanta uygulaması"),
      photo("tc5", "Travel Cafe logosu ve seyahat temalı desen sistemi"),
      detail("tc1", "Travel Cafe desen ve logo uygulamasından kesit"),
    ],
    summary:
      "Kahve ve seyahat fikrini buluşturan bir görsel kimlik. El çizimi karakteri, sarı renk ve desenler uygulamalar arasında ortak bir dil oluşturuyor.",
    approach:
      "Logo tek başına değil; kartvizit, çanta ve farklı iletişim yüzeyleriyle birlikte sunuluyor. Proje, küçük bir markanın tutarlı bir görsel dünyaya nasıl kavuşabileceğini gösteriyor.",
    credits: designCredits,
    featured: true,
    tone: "light",
  },
  webProject({
    slug: "brueckenbauer",
    title: "Brückenbauer GmbH",
    subtitle: "Uluslararası B2B için dijital ürün keşfi",
    category: "Web",
    summary:
      "Elektronik ve yarı iletken alanında çalışan bir şirket için ürün, sektör ve iletişim içeriğini buluşturan çok dilli web deneyimi.",
    approach:
      "Teknik içerik, ürün keşfi ve teklif talebi arayüzü birlikte ele alındı. Kontrollü tipografi ve belirgin bölüm yapısı, sitenin teknik içeriğine eşlik ediyor.",
    website: "https://brueckenbauer-gmbh.ch/",
    featured: true,
    tone: "dark",
  }),
  {
    slug: "jhm-studio",
    title: "JHM Studio",
    subtitle: "Malzemeyle bütünleşen bir kimlik",
    category: "Görsel kimlik",
    cover: "/portfolio/jhm3.jpg",
    coverAlt: "JHM Studio ambalaj, etiket ve kutu tasarımları",
    images: [
      photo(
        "jhm3",
        "JHM Studio kimliğinin kraft ambalaj ve kutulardaki sunumu",
      ),
      photo("jhm2", "JHM Studio logosunun dokulu yüzeydeki uygulaması"),
      photo("jhm4", "JHM Studio etiket ve kumaş kese uygulamaları"),
      photo("jhm5", "JHM Studio tabela sunumu"),
      photo("jhm6", "JHM Studio kurumsal kimlik malzemeleri"),
      detail("jhm1", "JHM Studio görsel kimlik uygulamalarından kesit"),
    ],
    summary:
      "İnce çizgili bir logoyu doğal malzeme tonlarıyla birleştiren görsel kimlik çalışması. Kimlik, ambalajdan tabelaya farklı ölçeklerde ele alınıyor.",
    approach:
      "Kraft kâğıt, koyu yüzeyler ve sade tipografi etrafında tutarlı bir uygulama dili kuruldu. Ambalaj, etiket ve kurumsal malzeme sunumları bu dili birlikte gösteriyor.",
    credits: designCredits,
    featured: true,
    tone: "light",
  },
  webProject({
    slug: "fpvlovers",
    title: "FPVLovers",
    subtitle: "İçerik, rehberlik ve araçlar bir arada",
    category: "Dijital ürün",
    summary:
      "FPV dünyasında farklı deneyim seviyelerine yönelik rehberleri, içerik keşfini ve etkileşimli araçları bir araya getiren bir platform.",
    approach:
      "Yeni başlayanların ve deneyimli kullanıcıların ihtiyaçları ayrı giriş noktalarıyla ele alındı. İçerik kategorileri, rehberler ve araç sayfaları aynı gezinme yapısında buluşuyor.",
    website: "https://fpvlovers.com.tr/",
    featured: true,
    tone: "dark",
  }),
  {
    slug: "job",
    title: "J.O.B.",
    subtitle: "Eğitimli işsizliğe görsel bir soru",
    category: "Kampanya",
    cover: "/portfolio/j2.jpg",
    coverAlt:
      "Mezuniyetin ikramiyesi işsizlik mi sorusunu taşıyan J.O.B. afişi",
    images: [
      photo("j2", "J.O.B. üniversite projesinin etkinlik afişi"),
      photo("j3", "J.O.B. projesinin görsel iletişim uygulaması"),
      photo("j4", "J.O.B. kimlik ve iletişim malzemeleri"),
      detail("j1", "J.O.B. afiş ve kimlik uygulamalarından kesit"),
    ],
    summary:
      "Anadolu Üniversitesi İktisadi ve İdari Bilimler Fakültesinin 2012 tarihli uluslararası gençlik projesi ‘Mezuniyetin İkramiyesi: Eğitimli İşsizlik’ için görsel iletişim çalışması. Tipografi ve soru işareti, iletişimin merkezinde yer alıyor.",
    approach:
      "Projenin grafik sunumunu ve görsel iletişim materyallerini hazırladık. Afiş ve proje uygulamalarında turuncu vurgu ve belirgin tipografik hiyerarşi, etkinlik bilgileriyle ana soruyu bir arada taşıyor.",
    credits: [
      ...designCredits,
      { label: "Grafik sunum ve görsel iletişim", value: "Hazar & Hülya" },
      { label: "Proje türü", value: "Üniversite projesi" },
      { label: "Yıl", value: "2012" },
    ],
    source: {
      label: "Anadolu Üniversitesi proje haberi",
      url: "https://gazete.anadolu.edu.tr/kampus/28638/egitimli-issizlik-konusulacak",
    },
    featured: true,
    tone: "light",
  },
  webProject({
    slug: "bimmetraj",
    title: "BIMMetraj",
    subtitle: "Bir sektör ihtiyacından dijital ürüne",
    category: "Dijital ürün",
    summary:
      "Model, metraj ve teklif süreçlerini bir web uygulaması içinde ele alan, AI destekli geliştirmeyle üretilen sektörel ürün projesi.",
    approach:
      "Çalışmanın odağı, ihtiyacın ekranlara ve kullanıcı akışlarına dönüştürülmesi. Proje geliştirme ve doğrulama aşamasında; burada sunulan çalışma BIM danışmanlığı veya mühendislik uygunluğu taahhüdü değildir.",
    credits: [
      { label: "AI destekli ürün geliştirme", value: "Hazar Volga Ekiz" },
    ],
    website: "https://bimmetraj.com/",
    status: "Geliştirme aşamasında",
    featured: true,
    tone: "light",
  }),
  {
    slug: "bosch-hayata-yer-acin",
    title: "Bosch",
    subtitle: "Hayata yer açın",
    category: "Kampanya",
    cover: "/portfolio/life2.jpg",
    coverAlt: "Bosch kurutma makinesi için Hayata yer açın reklam görseli",
    images: [
      photo(
        "life2",
        "Hayata yer açın kampanyasının ürün ve yaşam alanı görseli",
      ),
      photo("life3", "Bosch Hayata yer açın kampanya uygulaması"),
      photo("pin2", "Bosch kurutma makinesi ve bitki kompozisyonu"),
      photo("pin3", "Bosch ürün iletişimi uygulaması"),
      photo("pin4", "Hayata yer açın serisinden bir uygulama"),
      detail("life1", "Bosch Hayata yer açın ürün görselinden kesit"),
      detail("pin1", "Bosch bitki ve ürün kompozisyonundan kesit"),
    ],
    summary:
      "Kurutma makinesinin günlük hayatta açtığı alanı anlatan ürün iletişimi. Ev ortamı, ürün ve doğa öğeleri aynı kompozisyonda buluşuyor.",
    approach:
      "Ürün faydası, gündelik yaşamdan tanıdık bir sahne ve kısa bir mesajla görselleştirildi. Seçki, aynı iletişim fikrinin farklı uygulamalarını bir araya getiriyor.",
    credits: cfaCredits,
    featured: false,
    tone: "light",
  },
  {
    slug: "pirelli",
    title: "Pirelli",
    subtitle: "Yılbaşı için basılı iletişim",
    category: "Basılı işler",
    cover: "/portfolio/pirelli4.jpg",
    coverAlt: "Pirelli yılbaşı kartı ve dosya uygulaması",
    images: [
      photo("pirelli4", "Pirelli yılbaşı kartı ve dosyanın birlikte sunumu"),
      photo(
        "pirelli3",
        "Lastiklerden oluşan ağaç görselli Pirelli yılbaşı kartı",
      ),
      photo("pirelli2", "Pirelli kurumsal dosya tasarımı"),
      detail("pirelli1", "Pirelli basılı iletişim çalışmasından kesit"),
    ],
    summary:
      "Markanın ürününü yılbaşı iletişiminin görsel fikrine dönüştüren basılı çalışma. Kart ve dosya aynı tasarım diliyle birlikte ele alınıyor.",
    approach:
      "Lastiklerden oluşan ağaç kompozisyonu, mevsimsel mesajı markayla ilişkilendiriyor. Siyah, beyaz ve Pirelli renkleri uygulamalar boyunca korunuyor.",
    credits: cfaCredits,
    featured: false,
    tone: "light",
  },
  {
    slug: "siemens",
    title: "Siemens",
    subtitle: "Basılı iletişim ve ajanda tasarımı",
    category: "Basılı işler",
    cover: "/portfolio/siemens-1.jpg",
    coverAlt: "Siemens ajandasının ürün iletişimi içeren iç sayfası",
    images: [
      photo(
        "siemens-1",
        "Siemens ajandasındaki ürün iletişimi ve iç sayfa düzeni",
      ),
      photo("siemens-2", "Siemens ajandasının kapak tasarımı"),
      photo("siemens-3", "Siemens ajandasının basılı örneği"),
      photo("archive-dsc_1040", "Siemens ajanda ve kalem setinin sunumu"),
      photo("archive-dsc_1042", "Siemens ajanda ve kutu tasarımı"),
      photo("archive-dsc_1043", "Siemens ajandasının ön kapağı ve kalemi"),
      photo(
        "archive-dsc_1044",
        "Siemens ajanda kapağının doku ve baskı detayı",
      ),
      photo("archive-dsc_1046", "Siemens ajandasının takvim sayfası"),
      photo("archive-dsc_1047", "Siemens ajandasının açık iç sayfaları"),
      photo("archive-dsc_1053", "Siemens ajandasının kapalı görünümü"),
      detail("kesit_0", "Siemens ajanda kapağından dikey kesit"),
    ],
    summary:
      "Siemens ürün iletişimini gündelik bir basılı nesneye taşıyan ajanda çalışması. Kapak, iç sayfalar ve ürün anlatımı birlikte tasarlanıyor.",
    approach:
      "Bu seçkide tasarımın fiziksel çıktısı fotoğraflarla gösteriliyor. Sayfa düzeni ve ürün görsellerinin ajanda içindeki kullanımı öne çıkıyor.",
    credits: cfaCredits,
    featured: false,
    tone: "light",
  },
  {
    slug: "tasarim-atolyesi",
    title: "Tasarım Atölyesi",
    subtitle: "Üretim araçlarından doğan bir kimlik",
    category: "Görsel kimlik",
    cover: "/portfolio/ta2.jpg",
    coverAlt: "Tasarım Atölyesi logosunun kâğıt ve kupa üzerinde sunumu",
    images: [
      photo("ta2", "Tasarım Atölyesi kimliğinin kâğıt ve kupa uygulamaları"),
      photo("ta3", "Tasarım Atölyesi kartvizit tasarımı"),
      photo("ta4", "Tasarım Atölyesi görsel kimlik uygulaması"),
      photo("ta5", "Tasarım Atölyesi marka uygulaması"),
      photo("ta6", "Tasarım Atölyesi kimliğinden bir detay"),
      photo("ta7", "Tasarım Atölyesi uygulamalarından bir örnek"),
      detail("ta1", "Tasarım Atölyesi üretim araçları kompozisyonundan kesit"),
    ],
    summary:
      "Tasarım ve üretim araçlarını işarete dönüştüren bir görsel kimlik. Sade tipografi, ince çizgiler ve malzeme vurgusu birlikte kullanılıyor.",
    approach:
      "Logonun farklı yüzeylerdeki karşılığı kartvizit ve uygulama görselleriyle ele alındı. Kimliğin hem küçük ölçekte hem de farklı malzemelerde okunması hedeflendi.",
    credits: designCredits,
    featured: false,
    tone: "light",
  },
  {
    slug: "travel-on",
    title: "Travel On",
    subtitle: "Yolculuk fikri etrafında logo tasarımı",
    category: "Görsel kimlik",
    cover: "/portfolio/to2.jpg",
    coverAlt: "Travel On logosunun dokulu kâğıt üzerinde sunumu",
    images: [
      photo("to2", "Travel On logo tasarımı"),
      photo("to3", "Travel On kimlik uygulaması"),
      detail("to1", "Travel On logo uygulamasından kesit"),
    ],
    summary:
      "Yolcu figürünü marka adıyla birleştiren logo çalışması. Hareket ve yolculuk fikri, işaretin doğrudan bir parçası hâline geliyor.",
    approach:
      "Figür ve yazı birlikte ele alınarak tek bir işaret oluşturuldu. Sunumlar, logonun yüzey ve uygulama içindeki görünümünü gösteriyor.",
    credits: designCredits,
    featured: false,
    tone: "light",
  },
  {
    slug: "tipografi-afisleri",
    title: "Ajans afişleri",
    subtitle: "Tasarımın dilini anlatan bir seri",
    category: "Basılı işler",
    cover: "/portfolio/typography-5.jpg",
    coverAlt:
      "Ajans için hazırlanan sarı afişte tipografiyi temsil eden omurga görseli",
    images: [
      photo(
        "typography-5",
        "Tipografiyi tasarımın omurgası olarak anlatan ajans afişi",
      ),
      photo("typography-6", "Sarı zemin ve taç görselli ajans afişi"),
      photo("typography-7", "Sarı zemin ve parmak izi görselli ajans afişi"),
      photo("typography-8", "Serinin mor ve beyaz yatay grafik uygulaması"),
      detail(
        "1",
        "Ajans afiş serisinin tipografi ve görsel detaylarından kesit",
      ),
    ],
    summary:
      "Bir reklam ajansı için hazırlanan afiş serisi. Tasarım ve iletişim kavramları; omurga, taç ve parmak izi gibi görsel metaforlarla anlatılıyor.",
    approach:
      "Sarı zemin, güçlü kontrast ve kısa metinler serinin ortak dilini oluşturuyor. Arşivdeki yatay uygulama, bu görsel dilin farklı bir formata taşınmasını gösteriyor.",
    credits: designCredits,
    featured: false,
    tone: "light",
  },
  {
    slug: "bosch-brosur",
    title: "Bosch",
    subtitle: "Ürün iletişimi için katlanan bir anlatı",
    category: "Basılı işler",
    cover: "/portfolio/archive-dsc_1038.jpg",
    coverAlt: "Bosch ürün broşürünün katlanmış sayfaları",
    images: [
      photo(
        "archive-dsc_1038",
        "Bosch broşürünün katlama yapısı ve sayfa tasarımları",
      ),
      photo("archive-dsc_1031", "Bosch ürün broşürünün ön kapağı"),
      photo("archive-dsc_1034", "Bosch broşürünün açılmış iç sayfaları"),
      detail("kesit", "Bosch broşür kapağından ürün ve tipografi kesiti"),
    ],
    summary:
      "Bosch ürün iletişimi için hazırlanan basılı broşür çalışması. Ürün fotoğrafları, doğadan görseller ve tipografi katlanan sayfa yapısı içinde buluşuyor.",
    approach:
      "Kapak, iç sayfalar ve katlama düzeni birlikte ele alındı. Basılı örneğin fotoğrafları, sayfa tasarımının fiziksel formdaki karşılığını gösteriyor.",
    credits: cfaCredits,
    featured: false,
    tone: "light",
  },
  {
    slug: "bosch-touch",
    title: "Bosch Touch",
    subtitle: "Dergi tasarımı · Video sunum",
    category: "Basılı işler",
    cover: "/portfolio/bosch-touch.jpg",
    coverAlt: "Bosch Touch dergisinin açık sayfalarını gösteren video karesi",
    images: [
      detail("kesit_1", "Bosch Touch dergisinin kapaklarından görsel kesit"),
    ],
    video: {
      src: "/portfolio/touch.mp4",
      description:
        "Basılı Bosch Touch dergisinin sayfaları çevrilerek kapak, editoryal düzen, ürün görselleri ve reklam sayfaları gösteriliyor.",
    },
    summary:
      "Bosch için hazırlanan Touch dergisinin tasarım çalışması. Video, derginin basılı örneğini ve sayfa düzenlerini bir arada gösteriyor.",
    approach:
      "Editoryal içerik, fotoğraflar ve ürün iletişimi derginin sayfa akışı içinde ele alındı. Bu sunumda derginin fiziksel yapısı ve sayfalar arası görsel ritim izlenebiliyor.",
    credits: cfaCredits,
    featured: false,
    tone: "light",
  },
  webProject({
    slug: "ayapi",
    title: "A Yapı",
    subtitle: "Yazılım ürünleri için farklı bir keşif deneyimi",
    category: "Web",
    summary:
      "CAD ve BIM yazılım ailelerini ürün kategorileri ve detay sayfalarıyla sunan kurumsal web çalışması.",
    approach:
      "Ürün grupları teknik bir görsel dil ve belirgin kategori yapısıyla ele alındı. Ziyaretçinin ürün ailesinden detaylı içeriğe geçişi tasarımın merkezinde yer alıyor.",
    website: "https://ayapi.net.tr/",
    featured: false,
    tone: "dark",
  }),
  webProject({
    slug: "orklab",
    title: "Orklab",
    subtitle: "Laboratuvar ürünleri için dijital katalog",
    category: "Web",
    summary:
      "Laboratuvar ekipmanlarını, ürün kategorilerini ve kurumsal hizmetleri bir araya getiren web sitesi.",
    approach:
      "Geniş ürün içeriği kategorilere ayrılarak hizmet sayfalarıyla ilişkilendirildi. Ürün keşfi ve iletişim bağlantıları ortak gezinme yapısında sunuluyor.",
    website: "https://orklab.com/",
    featured: false,
    tone: "dark",
  }),
  webProject({
    slug: "eco69lab",
    title: "Eco69Lab",
    subtitle: "Uluslararası bir marka için dijital tanıtım",
    category: "Web",
    summary:
      "Laboratuvar ve medikal ekipman alanındaki bir şirketin yaklaşımını, hizmetlerini ve iletişim bilgilerini sunan kurumsal web çalışması.",
    approach:
      "İngilizce içerik, geniş tipografi ve bölümlere ayrılmış hizmet anlatımıyla düzenlendi. Marka yaklaşımı ile kurumsal iletişim aynı sayfa akışında buluşuyor.",
    website: "https://eco69lab.com/",
    featured: false,
    tone: "dark",
  }),
  webProject({
    slug: "akantus",
    title: "Akantus Yapı",
    subtitle: "Yapı projeleri için kurumsal bir vitrin",
    category: "Web",
    summary:
      "Bir yapı firmasının yaklaşımını, hizmetlerini ve proje referanslarını görsel ağırlıklı bir web deneyiminde sunan çalışma.",
    approach:
      "Mimari görseller ve proje kategorileri öne alınarak kurumun tanıtımıyla referansları aynı yapı içinde ele alındı. İletişime geçiş, ana gezinme ve sayfa içi bağlantılarla destekleniyor.",
    website: "https://www.akantusyapi.com.tr/",
    featured: false,
    tone: "light",
  }),
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
