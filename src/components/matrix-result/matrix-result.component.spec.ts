import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixResultComponent } from './matrix-result.component';

describe('MatrixResultComponent', () => {
  let component: MatrixResultComponent;
  let fixture: ComponentFixture<MatrixResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatrixResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatrixResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
