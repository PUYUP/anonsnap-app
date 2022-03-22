import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResetPasswordConfirmComponent } from './reset-password-confirm.component';

describe('ResetPasswordConfirmComponent', () => {
  let component: ResetPasswordConfirmComponent;
  let fixture: ComponentFixture<ResetPasswordConfirmComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPasswordConfirmComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResetPasswordConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
