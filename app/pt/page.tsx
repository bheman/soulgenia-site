import GatewayPortPageContent, {
  gatewayPortMetadata,
} from "@/components/gatewayport/GatewayPortPageContent";

export const metadata = gatewayPortMetadata.pt;

export default function GatewayPortPortuguesePage() {
  return <GatewayPortPageContent locale="pt" />;
}
