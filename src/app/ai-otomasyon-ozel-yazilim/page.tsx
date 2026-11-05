import { ServiceLanding } from "@/components/studio/ServiceLanding";
import { getServiceLandingMetadata } from "@/lib/service-landings";

export const metadata = getServiceLandingMetadata("tr", "ai-otomasyon-ozel-yazilim");

export default function AiAutomationPage() {
  return <ServiceLanding locale="tr" slug="ai-otomasyon-ozel-yazilim" />;
}
