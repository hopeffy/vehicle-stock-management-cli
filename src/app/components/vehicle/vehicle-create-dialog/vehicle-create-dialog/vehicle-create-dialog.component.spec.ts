import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleCreateDialogComponent } from './vehicle-create-dialog.component';

describe('VehicleCreateDialogComponent', () => {
  let component: VehicleCreateDialogComponent;
  let fixture: ComponentFixture<VehicleCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehicleCreateDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VehicleCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
