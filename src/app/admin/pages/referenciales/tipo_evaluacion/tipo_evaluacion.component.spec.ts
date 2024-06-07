import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TipoEvaluacionComponent } from './tipo_evaluacion.component';

describe('tipo_evaluacionComponent', () => {
  let component: TipoEvaluacionComponent;
  let fixture: ComponentFixture<TipoEvaluacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipoEvaluacionComponent]
    });
    fixture = TestBed.createComponent(TipoEvaluacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
