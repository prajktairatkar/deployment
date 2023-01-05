import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResfileuploadComponent } from './resfileupload.component';

describe('ResfileuploadComponent', () => {
  let component: ResfileuploadComponent;
  let fixture: ComponentFixture<ResfileuploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResfileuploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResfileuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
