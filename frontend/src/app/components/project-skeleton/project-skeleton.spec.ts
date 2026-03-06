import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSkeleton } from './project-skeleton';

describe('ProjectSkeleton', () => {
  let component: ProjectSkeleton;
  let fixture: ComponentFixture<ProjectSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectSkeleton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectSkeleton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
