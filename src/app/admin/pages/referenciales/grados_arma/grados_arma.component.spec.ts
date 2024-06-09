import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GradosArmaComponent } from './grados_arma.component';

describe('grados_armaComponent', () => {
  let component: GradosArmaComponent;
  let fixture: ComponentFixture<GradosArmaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GradosArmaComponent]
    });
    fixture = TestBed.createComponent(GradosArmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
