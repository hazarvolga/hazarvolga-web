import { ServiceLanding } from "@/components/studio/ServiceLanding";
import { getServiceLandingMetadata } from "@/lib/service-landings";

export const metadata = getServiceLandingMetadata("tr", "freelance-web-tasarimci");

export default function FreelanceWebDesignerPage() {
  return <ServiceLanding locale="tr" slug="freelance-web-tasarimci" />;
}
