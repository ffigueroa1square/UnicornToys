import { GlobalConfig } from 'ngx-toastr';

export const DefaultToastrConfig: Partial<GlobalConfig> = {
  closeButton: false,
  positionClass: 'toast-top-right',
  autoDismiss: true,
  timeOut: 10000,
  enableHtml: true,
  preventDuplicates: true
};

export const NoDismissToastrConfig: Partial<GlobalConfig> = {
  autoDismiss: false,
  disableTimeOut: true,
  tapToDismiss: true
};
