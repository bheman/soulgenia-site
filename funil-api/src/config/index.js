import { soulgeniaV1Config } from "./soulgenia-v1.js";

const configs = new Map([[soulgeniaV1Config.slug, soulgeniaV1Config]]);

export function getFunnelConfig(slug) {
  return configs.get(slug) || null;
}

export function listFunnelConfigs() {
  return Array.from(configs.values());
}
