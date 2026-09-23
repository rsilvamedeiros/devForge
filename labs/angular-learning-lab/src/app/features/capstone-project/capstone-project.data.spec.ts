import { CAPSTONE_SPRINTS, CAPSTONE_TASK_COUNT } from './capstone-project.data';

describe('capstone project', () => {
  it('covers six progressive sprints', () => {
    expect(CAPSTONE_SPRINTS.length).toBe(6);
    expect(CAPSTONE_SPRINTS.map(item => item.number)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('has unique tasks and evidence for every deliverable', () => {
    const tasks = CAPSTONE_SPRINTS.flatMap(sprint => sprint.tasks);
    expect(tasks.length).toBe(CAPSTONE_TASK_COUNT);
    expect(new Set(tasks.map(task => task.id)).size).toBe(tasks.length);
    expect(tasks.every(task => task.evidence.length > 10)).toBeTrue();
  });
});
