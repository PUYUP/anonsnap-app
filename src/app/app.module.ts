import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { StoreModule } from '@ngrx/store';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppReducers } from './store/app.reducer';
import { AppEffects } from './store/app.effect';
import { EffectsModule } from '@ngrx/effects';
import { NativeHttpInterceptor } from './services/native-http.interceptor';
import { HTTPInterceptor } from './services/http-interceptor';
import { HttpCancelService } from './services/httpcancel.service';
import { ManageHttpInterceptor } from './services/managehttp.interceptor';
import { metaReducers } from './store/reducers/user-signout/meta.reducer';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(AppReducers, { metaReducers }),
    EffectsModule.forRoot(AppEffects),
    IonicModule.forRoot({ mode: 'md' }),
  ],
  providers: [
    HTTP,
    //HttpCancelService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NativeHttpInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HTTPInterceptor,
      multi: true,
    },
    //{
    //  provide: HTTP_INTERCEPTORS,
    //  useClass: ManageHttpInterceptor,
    //  multi: true,
    //},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
