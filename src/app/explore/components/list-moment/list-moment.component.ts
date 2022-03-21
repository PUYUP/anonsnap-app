import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AppState } from 'src/app/store/app.state';
import { AlertController, IonInfiniteScroll, ModalController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ListCommentComponent } from 'src/app/shared/list-comment/list-comment.component';
import { deleteMoment, loadMoreMoments } from 'src/app/store/actions/moment/moment.actions';
import { SelectDeletedMoment, SelectLoadedMoments } from 'src/app/store/selectors/moment/moment.selectors';
import { MomentEditorComponent } from '../moment-editor/moment-editor.component';
// import { PictureViewerComponent } from '../picture-viewer/picture-viewer.component';

import SwiperCore, { Pagination, Zoom, Navigation } from 'swiper';
SwiperCore.use([Pagination, Navigation, Zoom]);


@Component({
  selector: 'app-list-moment',
  templateUrl: './list-moment.component.html',
  styleUrls: ['./list-moment.component.scss'],
})
export class ListMomentComponent implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  filter: any;
  loadedMoments$: Observable<any>;
  deletedMoment$: Observable<any>;
  filterMap$: Observable<any>;
  onDestroy$ = new Subject<void>();
  nextUrl: string;
  loadMoreEvent: any;

  constructor(
    private _store: Store<AppState>,
    private _ref: ChangeDetectorRef,
    public modalController: ModalController,
    public alertController: AlertController
  ) { 
    this.loadedMoments$ = this._store.pipe(select(SelectLoadedMoments));
    this.loadedMoments$.pipe(takeUntil(this.onDestroy$)).subscribe((state: any) => {
      this.filter = state?.filter;
      this.nextUrl = state?.data?.next;

      if (this.nextUrl && this.loadMoreEvent) this.loadMoreEvent.target.complete();
    });

    this.deletedMoment$ = this._store.pipe(select(SelectDeletedMoment));
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
        item: item
      }
    })
    await modal.present()
  }

  /*
  async pictureViewerModal(items: any) {
    const modal = await this.modalController.create({
      component: PictureViewerComponent,
      componentProps: {
        items: items
      }
    })
    await modal.present()
  }
  */

  async listCommentModal(item: any) {
    const modal = await this.modalController.create({
      component: ListCommentComponent,
      breakpoints: [0, 1],
      initialBreakpoint: 1,
      componentProps: {
        momentItem: item
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
            this._store.dispatch(deleteMoment({guid: item.guid}))
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
  }

  loadMoreData(event: any) {
    this.loadMoreEvent = event;
    this._store.dispatch(loadMoreMoments({
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

  /*
  presentPictureViewer(items: any) {
    this.pictureViewerModal(items);
  }
  */

  presentListComment(item: any) {
    this.listCommentModal(item);
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
