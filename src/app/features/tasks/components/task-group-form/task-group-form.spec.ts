import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskGroupForm } from './task-group-form';

describe('TaskGroupForm', () => {
  let component: TaskGroupForm;
  let fixture: ComponentFixture<TaskGroupForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskGroupForm],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskGroupForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
