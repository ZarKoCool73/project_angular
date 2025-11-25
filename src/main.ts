import {bootstrapApplication} from '@angular/platform-browser';
import {appConfig} from './app/app.config';
import {AppComponent} from './app/app.component';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
  ]
}).catch((err) => console.error(err));
