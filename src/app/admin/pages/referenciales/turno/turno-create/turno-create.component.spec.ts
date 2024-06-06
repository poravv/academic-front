import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TurnoCreateComponent } from './turno-create.component';



describe('turnoCreateComponent', () => {
  let component: TurnoCreateComponent;
  let fixture: ComponentFixture<TurnoCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TurnoCreateComponent]
    });
    fixture = TestBed.createComponent(TurnoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
