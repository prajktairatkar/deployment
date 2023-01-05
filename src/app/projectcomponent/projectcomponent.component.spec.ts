import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectcomponentComponent } from './projectcomponent.component';

describe('ProjectcomponentComponent', () => {
  let component: ProjectcomponentComponent;
  let fixture: ComponentFixture<ProjectcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectcomponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
