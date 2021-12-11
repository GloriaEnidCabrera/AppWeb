import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaclientesComponent } from './ventaclientes.component';

describe('VentaclientesComponent', () => {
  let component: VentaclientesComponent;
  let fixture: ComponentFixture<VentaclientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentaclientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentaclientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
