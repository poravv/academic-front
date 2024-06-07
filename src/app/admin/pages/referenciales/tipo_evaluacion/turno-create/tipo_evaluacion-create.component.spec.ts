import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TipoEvaluacionCreateComponent } from './tipo_evaluacion-create.component';



describe('tipo_evaluacionCreateComponent', () => {
  let component: TipoEvaluacionCreateComponent;
  let fixture: ComponentFixture<TipoEvaluacionCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipoEvaluacionCreateComponent]
    });
    fixture = TestBed.createComponent(TipoEvaluacionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
