const mapping: Record<string, string> = {
  administrators: 'administrator',
  clients: 'client',
  data: 'data',
  'option-chain-analyses': 'option_chain_analysis',
  owners: 'owner',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
