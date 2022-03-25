import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { LocationService } from 'src/app/services/location/location.service';
import { requestGeolocation, requestGeolocationFailure, requestGeolocationSuccess, saveLocation, saveLocationFailure, saveLocationSuccess } from '../../actions/location/location.actions';
import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';


@Injectable()
export class LocationEffects {

  constructor(
    private actions$: Actions,
    private locationService: LocationService,
    private store: Store<AppState>,
    public toastController: ToastController
  ) { }
  
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    await toast.present()
  }

  save$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveLocation),
      mergeMap((payload) => {
        return this.locationService.saveLocation(payload?.data).pipe(
          map((response) => {
            return saveLocationSuccess({
              data: response,
            });
          }),
          catchError((error) => of(saveLocationFailure({ error: error })))
        );
      })
    )
  );

  saveFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveLocationFailure),
      map((payload) => {
        let httpError = payload?.error;
        let errorDetail = httpError?.error ? httpError?.error : httpError?.body;
        let status = httpError?.status;
        let message = [];

        for (let k in errorDetail) {
          let m = Array.isArray(errorDetail[k]) ? errorDetail[k].join(' ') : errorDetail[k]
          message.push(m);
        }

        if (message?.length > 0) {
          if (status == 401) {
            this.presentToast('Masuk ke Akun untuk melanjutkan.');
          } else {
            this.presentToast(message.join(' <br /> '));
          }
        }
      })
    ), {dispatch: false}
  );
    
  /**
   * GEOLOCATION
   */
  async getPosition(action: string) {
    try {
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
      });

      let coordinate = {
        latitude: position.coords.latitude,
        longitude:position.coords.longitude,
      }

      this.store.dispatch(requestGeolocationSuccess({
        data: {
          'action': action,
          'coordinate': coordinate,
        }
      }));
    }
    catch (err) {
      console.log('err', err);
      await this.presentToast('Location request ' + err.message);
      this.store.dispatch(requestGeolocationFailure({ error: { detail: 'Location request ' + err.message } }));
    }
  }
  
  async postGPSPermission(canUseGPS: boolean, action: string) {
    if (canUseGPS) {
      await this.getPosition(action);
    }
    else {
      await this.presentToast('Please turn on GPS to get location');
      this.store.dispatch(requestGeolocationFailure({ error: { detail: 'Please turn on GPS to get location' } }));
    }
  }
  
  requestGeolocation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestGeolocation),
      map(async (payload) => {
        const hasPermission = await this.locationService.checkGPSPermission();
        if (hasPermission) {
          if (Capacitor.isNativePlatform()) {
            const canUseGPS = await this.locationService.askToTurnOnGPS();
            this.postGPSPermission(canUseGPS, payload.action);
          }
          else { this.postGPSPermission(true, payload.action); }
        }
        else {
          const permission = await this.locationService.requestGPSPermission();
          if (permission === 'CAN_REQUEST' || permission === 'GOT_PERMISSION') {
            if (Capacitor.isNativePlatform()) {
              const canUseGPS = await this.locationService.askToTurnOnGPS();
              this.postGPSPermission(canUseGPS, payload.action);
            }
            else { this.postGPSPermission(true, payload.action); }
          }
          else {
            await this.presentToast('User denied location permission');
            this.store.dispatch(requestGeolocationFailure({ error: { detail: 'User denied location permission' } }));
          }
        }
      })
    ), {dispatch: false}
  );

}
