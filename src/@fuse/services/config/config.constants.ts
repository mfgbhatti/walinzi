import { InjectionToken } from '@angular/core';

import { AppConfig } from '@fuse/services/config/config.types';

export const FUSE_APP_CONFIG = new InjectionToken<AppConfig>('FUSE_APP_CONFIG');
