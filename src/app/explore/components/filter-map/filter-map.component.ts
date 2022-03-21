import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AppState } from 'src/app/store/app.state';
import { ModalController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';

import * as L from 'leaflet';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FilterMap } from 'src/app/store/actions/filter/filter.actions';
import { loadMoments } from 'src/app/store/actions/moment/moment.actions';
import { SelectFilterMap } from 'src/app/store/selectors/filter/filter.selectors';
import { SelectGeolocation } from 'src/app/store/selectors/location/location.selectors';
import { SelectLoadedMoments } from 'src/app/store/selectors/moment/moment.selectors';

const iconRetinaUrl = 'assets/map/marker-icon-2x.png';
const iconUrl = 'assets/map/marker-icon.png';
const shadowUrl = 'assets/map/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = iconDefault;

// GREEN ICON
const iconRetinaUrlRed = 'assets/map/marker-icon-2x-red.png';
const iconUrlRed = 'assets/map/marker-icon-red.png';
const shadowUrlRed = 'assets/map/marker-shadow.png';
const iconDefaultRed = L.icon({
  iconUrl: iconRetinaUrlRed,
  shadowUrl: shadowUrlRed,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});


@Component({
  selector: 'app-filter-map',
  templateUrl: './filter-map.component.html',
  styleUrls: ['./filter-map.component.scss'],
})
export class FilterMapComponent implements OnInit {

  @Input() coordinate: any;
  @ViewChild('mapEl', { static: true }) mapEl: ElementRef;

  radius: any;
  zoomLevel: any;
  filter: any;
  userCoordinate: any;
  onDestroy$ = new Subject<void>();
  filterMap$: Observable<any>;
  loadMoments$: Observable<any>;
  geoLocation$: Observable<any>;

  constructor(private _store: Store<AppState>, public modalController: ModalController) { 
    this.filterMap$ = this._store.pipe(select(SelectFilterMap));
    this.filterMap$.pipe(takeUntil(this.onDestroy$)).subscribe((state: any) => {
      this.zoomLevel = state?.zoom_level;
      this.coordinate = {
        latitude: state?.latitude,
        longitude: state?.longitude,
      }
    })

    this.geoLocation$ = this._store.pipe(select(SelectGeolocation));
    this.geoLocation$.pipe(takeUntil(this.onDestroy$)).subscribe((state: any) => {
      if (state?.data?.coordinate) this.userCoordinate = state?.data?.coordinate;
    })

    this.loadMoments$ = this._store.pipe(select(SelectLoadedMoments));
    this.loadMoments$.pipe(takeUntil(this.onDestroy$)).subscribe((state: any) => {
      if (state?.filter) this.filter = state?.filter;
    })
  }

  ngOnInit() { 
    // tiada lagi kubersamamu
  }
  
  ionViewDidEnter() {
    let defLat = -2.548926;
    let defLng = 118.0148634;

    if (this.userCoordinate?.latitude) {
      defLat = this.userCoordinate?.latitude;
      defLng = this.userCoordinate?.longitude;
    }

    let latlng = new L.LatLng(
      this.coordinate?.latitude ? this.coordinate?.latitude : defLat,
      this.coordinate?.longitude ? this.coordinate?.longitude : defLng
    );

    let myLatLng = new L.LatLng(
      this.userCoordinate?.latitude ? this.userCoordinate?.latitude : defLat,
      this.userCoordinate?.longitude ? this.userCoordinate?.longitude : defLng
    )

    let map = L.map(this.mapEl.nativeElement, {
      center: latlng,
      zoom: this.zoomLevel ? this.zoomLevel : 2,
      // dragging: false,
      scrollWheelZoom: 'center', // zoom to center regardless where mouse is
			doubleClickZoom: 'center',
			touchZoom:       'center'
    });

    let tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        minZoom: 2,
        maxZoom: 18,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    // draw map
    tiles.addTo(map);

    // circle
    let circle = L.circleMarker(latlng, {
      radius: 50,
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.25
    }).addTo(map);
    
    // marker
    let marker = L.marker(latlng).addTo(map);

    if (this.userCoordinate?.latitude) {
      let myMarker = L.marker(myLatLng, { icon: iconDefaultRed })
        .addTo(map)
        .bindTooltip("Saya Disini")
        .openTooltip();
    }

    map.on('drag zoom', (e: any) => {
      marker.setLatLng(map.getCenter());
      circle.setLatLng(map.getCenter());
    });

    map.on('dragend zoomend', (e: any) => {
      this.coordinate = {
        latitude: map.getCenter().lat,
        longitude: map.getCenter().lng,
      }

      this.zoomLevel = map.getZoom()
      const lat = map.getCenter().lat
      const metersPerPixel = 156543.03392 * Math.cos(lat * Math.PI / 180) / Math.pow(2, this.zoomLevel);
      this.radius = metersPerPixel * 100 / 1000;
    });

    map.whenReady((e: any) => {
      this.coordinate = {
        latitude: map.getCenter().lat,
        longitude: map.getCenter().lng,
      }
      this.zoomLevel = map.getZoom();
      const lat = map.getCenter().lat
      const metersPerPixel = 156543.03392 * Math.cos(lat * Math.PI / 180) / Math.pow(2, this.zoomLevel);
      this.radius = metersPerPixel * 100 / 1000;
    })
  }

  dismiss(withData: boolean = false) {
    this.modalController.dismiss();

    if (withData) {
      this._store.dispatch(loadMoments({
        filter: {
          ...this.filter,
          ...this.coordinate,
          radius: this.radius,
        }
      }));
      
      this._store.dispatch(FilterMap({
        data: {
          ...this.coordinate,
          zoom_level: this.zoomLevel,
        }
      }));
    }
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
