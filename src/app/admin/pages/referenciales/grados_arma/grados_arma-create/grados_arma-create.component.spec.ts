import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GradosArmaCreateComponent } from './grados_arma-create.component';

describe('grados_armaCreateComponent', () => {
  let component: GradosArmaCreateComponent;
  let fixture: ComponentFixture<GradosArmaCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GradosArmaCreateComponent]
    });
    fixture = TestBed.createComponent(GradosArmaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
