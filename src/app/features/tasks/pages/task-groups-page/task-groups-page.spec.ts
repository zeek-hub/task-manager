import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskGroupsPage } from './task-groups-page';

describe('TaskGroupsPage', () => {
  let component: TaskGroupsPage;
  let fixture: ComponentFixture<TaskGroupsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskGroupsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskGroupsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
