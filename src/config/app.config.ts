interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Owner'],
  customerRoles: [],
  tenantRoles: ['Owner', 'Administrator'],
  tenantName: 'Client',
  applicationName: 'NseOI ',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [],
  ownerAbilities: ['Manage option chain analysis', 'Manage users', 'Manage clients', 'Manage data'],
  getQuoteUrl: 'https://app.roq.ai/proposal/511eac1c-430c-45f9-b392-b1bd074787d7',
};
