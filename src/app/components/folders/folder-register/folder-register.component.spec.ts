import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderRegisterComponent } from './folder-register.component';

describe('FolderRegisterComponent', () => {
  let component: FolderRegisterComponent;
  let fixture: ComponentFixture<FolderRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FolderRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
