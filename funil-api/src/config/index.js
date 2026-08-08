import { soulgeniaV1Config } from "./soulgenia-v1.js";
import { diagnosticoIaV1Config } from "./diagnostico-ia-v1.js";

const configs = new Map([
  [soulgeniaV1Config.slug, soulgeniaV1Config],
  [diagnosticoIaV1Config.slug, diagnosticoIaV1Config]
]);

export function getFunnelConfig(slug) {
  return configs.get(slug) || null;
}

export function listFunnelConfigs() {
  return Array.from(configs.values());
}
