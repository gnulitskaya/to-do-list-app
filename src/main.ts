import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { akitaDevtools } from '@datorama/akita';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
akitaDevtools();
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
