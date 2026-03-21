import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskGroupItem } from './task-group-item';

describe('TaskGroupItem', () => {
  let component: TaskGroupItem;
  let fixture: ComponentFixture<TaskGroupItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskGroupItem],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskGroupItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
