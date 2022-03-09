import { Component, NgZone, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FilterRadiusComponent } from '../shared/filter-radius/filter-radius.component';
import { ChangeFilterRadius } from '../store/actions/filter-radius/filter-radius.actions';
import { AppState } from '../store/app.state';
import { SelectFilterRadius } from '../store/selectors/filter-radius/filter-radius.selectors';
import { MomentEditorPhotoComponent } from './components/moment-editor-photo/moment-editor-photo.component';
import { MomentEditorComponent } from './components/moment-editor/moment-editor.component';

import { Geolocation } from '@capacitor/geolocation';
import { LocationService } from '../services/location/location.service';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-explore',
  templateUrl: 'explore.page.html',
  styleUrls: ['explore.page.scss']
})
export class ExplorePage implements OnInit {

  filterRadius$: Observable<any>;
  latitude: number;
  longitude: number;
  watchId: any;

  constructor(
    public modalController: ModalController,
    private _store: Store<AppState>,
    public ngZone: NgZone,
    private locationService: LocationService,
    public toastController: ToastController
  ) { 
    this._store.dispatch(ChangeFilterRadius())
    this.filterRadius$ = this._store.pipe(select(SelectFilterRadius));
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  /**
   * Start location
   */
   async getMyLocation() {
    const hasPermission = await this.locationService.checkGPSPermission();
    if (hasPermission) {
      if (Capacitor.isNativePlatform()) {
        const canUseGPS = await this.locationService.askToTurnOnGPS();
        this.postGPSPermission(canUseGPS);
      }
      else { this.postGPSPermission(true); }
    }
    else {
      const permission = await this.locationService.requestGPSPermission();
      if (permission === 'CAN_REQUEST' || permission === 'GOT_PERMISSION') {
        if (Capacitor.isNativePlatform()) {
          const canUseGPS = await this.locationService.askToTurnOnGPS();
          this.postGPSPermission(canUseGPS);
        }
        else { this.postGPSPermission(true); }
      }
      else {
        await this.presentToast('User denied location permission')
      }
    }
  }

  async postGPSPermission(canUseGPS: boolean) {
    if (canUseGPS) {
      this.watchPosition();
      this.momentEditorModal();
    }
    else {
      await this.presentToast('Please turn on GPS to get location')
    }
  }

  async watchPosition() {
    try {
      this.watchId = Geolocation.watchPosition({}, (position, err) => {
        this.ngZone.run(() => {
          if (err) { console.log('err', err); return; }
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude
          this.clearWatch();
        })
      })
    }
    catch (err) { console.log('err', err) }
  }

  clearWatch() {
    if (this.watchId != null) {
      Geolocation.clearWatch({ id: this.watchId });
    }
  }
  // end location
  
  /**
   * Filter moment by distance
   */
  async filterRadiusModal() {
    const modal = await this.modalController.create({
      component: FilterRadiusComponent,
      breakpoints: [0, 0.25],
      initialBreakpoint: 0.25
    });

    await modal.present();
  }

  async momentEditorModal() {
    const modal = await this.modalController.create({
      component: MomentEditorComponent,
      id: 'momentEditor',
    });

    await modal.present();
  }

  async momentEditorPhotoModal() {
    const modal = await this.modalController.create({
      component: MomentEditorPhotoComponent,
      id: 'momentEditorPhoto',
    });

    await modal.present();
  }

  ngOnInit(): void {
    
  }

  presentFilterRadius() {
    this.filterRadiusModal();
  }

  presentMomentEditor() {
    this.getMyLocation();
  }

  presentMomentPhotoEditor() {
    this.momentEditorPhotoModal();
  }
 
}
