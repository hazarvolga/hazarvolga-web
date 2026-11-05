import { ServiceLanding } from "@/components/studio/ServiceLanding";
import { getServiceLandingMetadata } from "@/lib/service-landings";

export const metadata = getServiceLandingMetadata("tr", "freelance-grafik-tasarimci");

export default function FreelanceGraphicDesignerPage() {
  return <ServiceLanding locale="tr" slug="freelance-grafik-tasarimci" />;
}
