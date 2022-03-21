import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AppState } from 'src/app/store/app.state';
import { AlertController, IonInfiniteScroll, ModalController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MomentEditorComponent } from 'src/app/explore/components/moment-editor/moment-editor.component';
import { PictureViewerComponent } from 'src/app/explore/components/picture-viewer/picture-viewer.component';
import { ListCommentComponent } from 'src/app/shared/list-comment/list-comment.component';
import { requestGeolocation } from 'src/app/store/actions/location/location.actions';
import { deleteMoment, deleteMyMoment, loadMoreMyMoments, loadMyMoments } from 'src/app/store/actions/moment/moment.actions';
import { SelectGeolocation } from 'src/app/store/selectors/location/location.selectors';
import { SelectDeletedMyMoment, SelectLoadedMyMoments } from 'src/app/store/selectors/moment/moment.selectors';

import SwiperCore, { Pagination, Zoom, Navigation } from 'swiper';
SwiperCore.use([Pagination, Navigation, Zoom]);

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.scss'],
})
export class MomentComponent implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  
  loadedMyMoments$: Observable<any>;
  geolocation$: Observable<any>;
  deletedMoment$: Observable<any>;
  onDestroy$ = new Subject<void>();
  
  filter: any;
  nextUrl: string;
  loadMoreEvent: any;

  userCoordinate: any = {
    latitude: '',
    longitude: '',
  };

  constructor(
    public modalController: ModalController,
    public alertController: AlertController,
    private _store: Store<AppState>,
    private _ref: ChangeDetectorRef,
  ) { 
    this.loadedMyMoments$ = this._store.pipe(select(SelectLoadedMyMoments));
    this.loadedMyMoments$.pipe(takeUntil(this.onDestroy$)).subscribe((state: any) => {
      this.filter = state?.filter;
    });

    // Subscribe from Geolocation
    this.geolocation$ = this._store.pipe(select(SelectGeolocation));
    this.geolocation$.pipe(takeUntil(this.onDestroy$)).subscribe((state: any) => {
      
      if (state?.status == 'init' && state?.error) {
        this._store.dispatch(loadMyMoments({filter: {byme: 1}}));
      }

      if (state?.status == 'loaded' && !state?.error) {
        this.userCoordinate = { ...state?.data?.coordinate };

        switch (state?.data?.action) {
          case 'request-location-byme':
            // first time location requested
            this._store.dispatch(loadMyMoments({
              filter: { ...this.userCoordinate, byme: 1 }
            }));
            break;
          default:
            // pass
            break;
        }
      }
    });

    this.deletedMoment$ = this._store.pipe(select(SelectDeletedMyMoment));
    this.deletedMoment$.pipe(takeUntil(this.onDestroy$)).subscribe((state: any) => {
      if (state?.status == 'loaded') {
        // detech change
        this._ref.detach();

        setInterval(() => {
          this._ref.detectChanges();
        }, 100);
      }
    });
  }

  async momentEditorModal(item: any) {
    const modal = await this.modalController.create({
      component: MomentEditorComponent,
      componentProps: {
        item: item,
        source: 'mymoment',
      }
    })
    await modal.present()
  }

  async pictureViewerModal(items: any) {
    const modal = await this.modalController.create({
      component: PictureViewerComponent,
      componentProps: {
        items: items
      }
    })
    await modal.present()
  }

  async listCommentModal(item: any) {
    const modal = await this.modalController.create({
      component: ListCommentComponent,
      breakpoints: [0, 1],
      initialBreakpoint: 1,
      componentProps: {
        momentItem: item,
        source: 'account',
      }
    })
    await modal.present()
  }

  async presentDeleteAlert(item: any) {
    const alert = await this.alertController.create({
      header: 'Konfirmasi',
      message: 'Konten ini akan dihapus permanen.',
      buttons: [
        {
          text: 'Hapus',
          handler: () => {
            this._store.dispatch(deleteMyMoment({guid: item.guid}))
          }
        }, {
          text: 'Batal',
          role: 'cancel',
          handler: (blah) => {
            //console.log('Confirm Cancel: blah');
          }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  ngOnInit() {
    this._store.dispatch(requestGeolocation({action: 'request-location-byme'}));
  }

  loadMoreData(event: any) {
    this.loadMoreEvent = event;
    this._store.dispatch(loadMoreMyMoments({
      filter: { ...this.filter, next: this.nextUrl },
      isLoadMore: true
    }));
  }

  editItem(item: any) {
    this.momentEditorModal(item);
  }

  deleteItem(item: any) {
    this.presentDeleteAlert(item);
  }

  presentPictureViewer(items: any) {
    this.pictureViewerModal(items);
  }

  presentListComment(item: any) {
    this.listCommentModal(item);
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
