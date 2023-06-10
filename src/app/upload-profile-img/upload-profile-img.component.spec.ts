import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadProfileImgComponent } from './upload-profile-img.component';

describe('UploadProfileImgComponent', () => {
  let component: UploadProfileImgComponent;
  let fixture: ComponentFixture<UploadProfileImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadProfileImgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadProfileImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
