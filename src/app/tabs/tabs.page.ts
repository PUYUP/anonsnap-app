import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  resetStackTabs = ['explore', 'search', 'account'];

  @ViewChild('tabs') tabs: IonTabs;
  
  constructor(private router: Router) { }
  
  handleTabClick = (event: MouseEvent) => {
    const {tab} = event.composedPath().find((element: any) =>
      element.tagName === 'ION-TAB-BUTTON') as EventTarget & { tab: string };

    if (this.resetStackTabs.includes(tab)){
      this.router.navigate(['tabs/'+tab]);
    }
  };

}
