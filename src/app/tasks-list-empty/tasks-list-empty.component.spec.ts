import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksListEmptyComponent } from './tasks-list-empty.component';

describe('TasksListEmptyComponent', () => {
  let component: TasksListEmptyComponent;
  let fixture: ComponentFixture<TasksListEmptyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksListEmptyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksListEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
