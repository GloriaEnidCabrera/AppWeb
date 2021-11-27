import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< HEAD:src/app/pages/ventas/ventas.component.spec.ts
import { VentasComponent } from './ventas.component';

describe('VentasComponent', () => {
  let component: VentasComponent;
  let fixture: ComponentFixture<VentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentasComponent ]
=======
import { ClientesComponent } from './clientes.component';

describe('ClientesComponent', () => {
  let component: ClientesComponent;
  let fixture: ComponentFixture<ClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientesComponent ]
>>>>>>> 576e3ba3574bb993f2b43804de5fd9beba91cd55:src/app/pages/clientes/clientes.component.spec.ts
    })
    .compileComponents();
  });

  beforeEach(() => {
<<<<<<< HEAD:src/app/pages/ventas/ventas.component.spec.ts
    fixture = TestBed.createComponent(VentasComponent);
=======
    fixture = TestBed.createComponent(ClientesComponent);
>>>>>>> 576e3ba3574bb993f2b43804de5fd9beba91cd55:src/app/pages/clientes/clientes.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
