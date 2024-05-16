import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormtransactionComponent } from './formtransaction.component';

describe('FormtransactionComponent', () => {
  let component: FormtransactionComponent;
  let fixture: ComponentFixture<FormtransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormtransactionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormtransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
