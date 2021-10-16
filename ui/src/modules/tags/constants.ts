import { __ } from 'modules/common/utils';
export const TAG_TYPES = {
  CONVERSATION: __('conversation'),
  CUSTOMER: __('customer'),
  ENGAGE_MESSAGE: __('engageMessage'),
  COMPANY: __('company'),
  INTEGRATION: __('integration'),
  PRODUCT: __('product'),
  PRODUCT_TEMPLATE: __('productTemplate'),
  ALL_LIST: [
    'conversation',
    'customer',
    'engageMessage',
    'company',
    'integration',
    'product',
    'productTemplate'
  ]
};
