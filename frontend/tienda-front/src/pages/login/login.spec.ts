import { ComponentFixture, TestBed } from '@angular/core/testing';

// 1. Corregir la importación
import { LoginComponent } from './login.component';

// 2. Usar el nombre de clase correcto aquí
describe('LoginComponent', () => { 
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // 3. Y también aquí
      imports: [LoginComponent] 
    })
    .compileComponents();

    // 4. Y aquí
    fixture = TestBed.createComponent(LoginComponent); 
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});