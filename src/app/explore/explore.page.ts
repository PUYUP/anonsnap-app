import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { AppState } from '../store/app.state';
import { SelectFilterCalendar, SelectFilterRadius } from '../store/selectors/filter/filter.selectors';
import { MomentEditorComponent } from './components/moment-editor/moment-editor.component';

import { requestGeolocation, saveLocation } from '../store/actions/location/location.actions';
import { SelectGeolocation, SelectLocation } from '../store/selectors/location/location.selectors';
import { takeUntil } from 'rxjs/operators';

import { Camera, CameraResultType } from '@capacitor/camera';
import { SelectLoadedMoments } from '../store/selectors/moment/moment.selectors';
import { loadMoments, refreshMoments } from '../store/actions/moment/moment.actions';
import { MapRadiusComponent } from './components/map-radius/map-radius.component';
import { NavigationEnd, Router } from '@angular/router';
import { FilterCalendarComponent } from '../shared/filter-calendar/filter-calendar.component';

import * as moment from 'moment';

@Component({
  selector: 'app-explore',
  templateUrl: 'explore.page.html',
  styleUrls: ['explore.page.scss']
})
export class ExplorePage implements OnInit {

  filter: any;
  filterRadius$: Observable<any>;
  filterCalendar$: Observable<any>;
  loadedMoments$: Observable<any>;
  location$: Observable<any>;
  geolocation$: Observable<any>;
  onDestroy$: any = new Subject<void>();
  
  latitude: number;
  longitude: number;
  coordinate: any;
  isTakePicture: boolean = false;
  preventClick: boolean = false;
  event: any;
  filterCalendar: any;

  constructor(
    public modalController: ModalController,
    public toastController: ToastController,
    private _store: Store<AppState>,
    private _router: Router
  ) { 
    this.filterRadius$ = this._store.pipe(select(SelectFilterRadius));
    this.filterRadius$.pipe(takeUntil(this.onDestroy$)).subscribe((state: any) => {
      // update coordinate based on map-radius change
      let lat = state?.latitude;
      let lng = state?.longitude;

      if (lat && lng) {
        this.coordinate = {
          latitude: lat,
          longitude: lng,
        }
      }
    })

    this.filterCalendar$ = this._store.pipe(select(SelectFilterCalendar));
    this.filterCalendar$.pipe(takeUntil(this.onDestroy$)).subscribe((state: any) => {
      if (state?.fromdate || state?.todate) {
        let fromdt = state?.fromdate;
        let todt = state?.todate;

        this.filterCalendar = (fromdt ? moment(fromdt).format('DD MMM YYYY') : '') + ' &mdash; ' + (todt ? moment(todt).format('DD MMM YYYY') : '');
      }
    });

    // Subscribe from Geolocation
    this.geolocation$ = this._store.pipe(select(SelectGeolocation));
    this.geolocation$.pipe(takeUntil(this.onDestroy$)).subscribe((state: any) => {
      if (state?.status == 'loaded') {
        this.coordinate = state?.data?.coordinate;

        switch (state?.data?.action) {
          case 'open-editor':
            // when posting
            this._store.dispatch(saveLocation({ data: this.coordinate }));
            break;
          case 'refresh-location':
            // when location updated
            this.presentToast('Lokasi diperbarui');
            this._store.dispatch(refreshMoments({ data: { ...this.coordinate } }));
            break;
          case 'request-location':
            // first time location requested
            this._store.dispatch(loadMoments({filter: { ...this.coordinate }}));
            break;
          case 'take-picture':
            // when open camera
            this.isTakePicture = true;
            this._store.dispatch(saveLocation({ data: { ...this.coordinate } }));
            break;
          default:
            // pass
            break;
        }
      }
    });
    
    // Subscribe when location saved to database
    this.location$ = this._store.pipe(select(SelectLocation));
    this.location$.pipe(takeUntil(this.onDestroy$)).subscribe((state: any) => {
      if (state?.status == 'loaded') {
        if (this.isTakePicture) {
          this.takePicture(state?.data);
        } else {
          this.momentEditorModal(state?.data);
        }

        this.isTakePicture = false;
      }
    });

    // Subscribe when moment loaded
    this.loadedMoments$ = this._store.pipe(select(SelectLoadedMoments));
    this.loadedMoments$.pipe(takeUntil(this.onDestroy$)).subscribe((state: any) => {
      this.filter = state?.filter;

      if (state?.status == 'loaded' && this.event) {
        if (state?.error == null) this.presentToast('Berhasil diperbarui');
        this.event.target.complete();
      }

      if (state?.error) this.event.target.complete();
    })
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1000
    });
    toast.present();
  }
  
  /**
   * Filter moment by radius
   */
  async filterRadiusModal() {
    const modal = await this.modalController.create({
      component: MapRadiusComponent,
      componentProps: {
        coordinate: this.coordinate,
      }
    });

    await modal.present();
  }

  async momentEditorModal(locationObj: any, picture: any = null) {
    const modal = await this.modalController.create({
      component: MomentEditorComponent,
      componentProps: {
        locationObj: locationObj,
        picture: picture,
      }
    });

    await modal.present();
  }

  async calendarModal() {
    const modal = await this.modalController.create({
      component: FilterCalendarComponent,
    })

    await modal.present()
  }

  async takePicture(locationObj: any) {
    const picture = await Camera.getPhoto({
      quality: 75,
      allowEditing: false,
      resultType: CameraResultType.Uri,
    });
  
    // Here you get the image as result.
    this.momentEditorModal(locationObj, picture);
  }

  ngOnInit(): void {
    this._store.dispatch(requestGeolocation({action: 'request-location'}));
    //this._store.dispatch(FilterRadius({}));
  }

  presentFilterRadius() {
    this.filterRadiusModal();
  }

  requestLocation(action: string) {
    this._store.dispatch(requestGeolocation({action: action}));
  }

  presentCalendar() {
    this.calendarModal();
  }

  doRefresh(event: any) {
    this.event = event;
    this._store.dispatch(refreshMoments({filter: {...this.filter}}));
  }

  ngAfterViewInit() {
    this._router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        // this._store.dispatch(requestGeolocation({action: 'request-location'}));
      }
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
 
}
