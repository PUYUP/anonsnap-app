import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { AppState } from '../store/app.state';
import { SelectFilterCalendar, SelectFilterMap, SelectFilterTag } from '../store/selectors/filter/filter.selectors';
import { MomentEditorComponent } from './components/moment-editor/moment-editor.component';

import { requestGeolocation, saveLocation } from '../store/actions/location/location.actions';
import { SelectGeolocation, SelectLocation } from '../store/selectors/location/location.selectors';
import { takeUntil } from 'rxjs/operators';

import { Camera, CameraResultType } from '@capacitor/camera';
import { SelectLoadedMoments } from '../store/selectors/moment/moment.selectors';
import { loadMoments, refreshMoments } from '../store/actions/moment/moment.actions';
import { FilterMapComponent } from './components/filter-map/filter-map.component';
import { NavigationEnd, Router } from '@angular/router';
import { FilterCalendarComponent } from '../shared/filter-calendar/filter-calendar.component';

import * as moment from 'moment';
import { ListTagComponent } from '../shared/list-tag/list-tag.component';
import { FilterCalendar, FilterMap, FilterTag } from '../store/actions/filter/filter.actions';
import { CameraPreviewComponent } from './components/camera-preview/camera-preview.component';

@Component({
  selector: 'app-explore',
  templateUrl: 'explore.page.html',
  styleUrls: ['explore.page.scss']
})
export class ExplorePage implements OnInit {

  filter: any;
  filterMap$: Observable<any>;
  filterCalendar$: Observable<any>;
  filterTag$: Observable<any>;
  loadedMoments$: Observable<any>;
  location$: Observable<any>;
  geolocation$: Observable<any>;
  onDestroy$: any = new Subject<void>();

  latitude: number;
  longitude: number;
  coordinate: any;
  userCoordinate: any = {
    latitude: '',
    longitude: '',
  };
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
    this.filterMap$ = this._store.pipe(select(SelectFilterMap));
    this.filterMap$.pipe(takeUntil(this.onDestroy$)).subscribe((state: any) => {
      // update coordinate based on filter-map change
      let lat = state?.latitude;
      let lng = state?.longitude;

      this.coordinate = {
        latitude: lat,
        longitude: lng,
      }
    })

    this.filterCalendar$ = this._store.pipe(select(SelectFilterCalendar));
    this.filterCalendar$.pipe(takeUntil(this.onDestroy$)).subscribe((state: any) => {
      if (state?.fromdate || state?.todate) {
        let fromdt = state?.fromdate;
        let todt = state?.todate;

        this.filterCalendar = (fromdt ? moment(fromdt).format('DD MMM YYYY') : '') + (todt ? + ' &mdash; ' + moment(todt).format('DD MMM YYYY') : '');
      } else {
        this.filterCalendar = '';
      }
    });

    // Subscribe from Geolocation
    this.geolocation$ = this._store.pipe(select(SelectGeolocation));
    this.geolocation$.pipe(takeUntil(this.onDestroy$)).subscribe((state: any) => {
      if (state?.status == 'init' && state?.error) {
        this._store.dispatch(loadMoments({}));
      }

      if (state?.status == 'loaded' && !state?.error) {
        this.coordinate = state?.data?.coordinate;
        this.userCoordinate = { ...state?.data?.coordinate };

        switch (state?.data?.action) {
          case 'open-editor':
            // when posting
            this._store.dispatch(saveLocation({ data: this.coordinate }));
            break;
          case 'request-location':
            // first time location requested
            this._store.dispatch(loadMoments({
              filter: {
                ...this.coordinate,
                user_latitude: this.userCoordinate?.latitude,
                user_longitude: this.userCoordinate?.longitude,
              }
            }));
            break;
          case 'refresh-location':
              // first time location requested
              this._store.dispatch(refreshMoments({
                filter: {
                  ...this.filter,
                  ...this.coordinate,
                  user_latitude: this.userCoordinate?.latitude,
                  user_longitude: this.userCoordinate?.longitude,
                }
              }));
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
          // this.takePicture(state?.data);
          this.presentCameraPreview(state?.data);
        } else {
          this.momentEditorModal(state?.data);
        }

        this.isTakePicture = false;
      }
    });

    // Subscribe when moment loaded
    this.loadedMoments$ = this._store.pipe(select(SelectLoadedMoments));
    this.loadedMoments$.pipe(takeUntil(this.onDestroy$)).subscribe((state: any) => {
      if (this.event) this.event.target.complete();
    });

    // Subscribe when filter by tag
    this.filterTag$ = this._store.pipe(select(SelectFilterTag));
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1000
    });
    toast.present();
  }

  /**
   * Filter moment by location
   */
  async filterMapModal() {
    const modal = await this.modalController.create({
      component: FilterMapComponent,
      componentProps: {
        coordinate: this.coordinate,
      }
    });

    await modal.present();
  }

  async listTagModal() {
    const modal = await this.modalController.create({
      component: ListTagComponent,
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

  async cameraPreviewModal(locationObj: any) {
    const modal = await this.modalController.create({
      component: CameraPreviewComponent,
      componentProps: {
        locationObj: locationObj,
        source: 'homepage',
      }
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
    this._store.dispatch(requestGeolocation({ action: 'request-location' }));
  }

  presentFilterMap() {
    this.filterMapModal();
  }

  presentListTag() {
    this.listTagModal();
  }

  requestLocation(action: string) {
    this._store.dispatch(requestGeolocation({ action: action }));
  }

  presentCalendar() {
    this.calendarModal();
  }

  presentCameraPreview(locationObj: any) {
    this.cameraPreviewModal(locationObj);
  }

  doRefresh(event: any) {
    this.event = event;
    this._store.dispatch(requestGeolocation({ action: 'refresh-location' }));
  }

  clearFilter() {
    this.filter = {
      ...this.filter,
      ...this.userCoordinate,
      fromdate: '',
      todate: '',
      tag: '',
    }

    this._store.dispatch(FilterMap({
      data: {
        latitude: '',
        longitude: '',
        zoom_level: 3.5,
      }
    }))

    this._store.dispatch(FilterCalendar({ data: { fromdate: '', todate: '' } }));
    this._store.dispatch(FilterTag({ name: '' }));
    this._store.dispatch(refreshMoments({ filter: { ...this.filter } }));
  }

  /*
  ngAfterViewInit() {
    this._router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        // this._store.dispatch(requestGeolocation({action: 'request-location'}));
      }
    });
  }
  */

  allowUseGPS() {
    this._store.dispatch(requestGeolocation({ action: 'request-location' }));
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
