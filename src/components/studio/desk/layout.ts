export const deskPieces = [
  {
    title: "Travel Cafe",
    kind: "Görsel kimlik",
    image: "/portfolio/tc7.jpg",
    alt: "Travel Cafe görsel kimlik çalışmasından bir parça",
    x: 26,
    y: 25,
    angle: -9,
  },
  {
    title: "Ajans afişi",
    kind: "Tipografi",
    image: "/portfolio/typography-5.jpg",
    alt: "Hülya'nın ajans için hazırladığı tipografik afiş",
    x: 73,
    y: 28,
    angle: 8,
  },
  {
    title: "JHM Studio",
    kind: "Görsel kimlik",
    image: "/portfolio/jhm3.jpg",
    alt: "JHM Studio ambalaj ve etiket tasarımı",
    x: 28,
    y: 74,
    angle: -5,
  },
  {
    title: "AffeXAI",
    kind: "Dijital ürün",
    image: "/portfolio/affexai.jpg",
    alt: "Hazar'ın bağımsız ürünü AffeXAI arayüzü",
    x: 73,
    y: 73,
    angle: 6,
  },
] as const;

export type DeskController = {
  pause: () => void;
  resume: () => void;
  reset: () => void;
  resize: () => void;
  destroy: () => void;
};
