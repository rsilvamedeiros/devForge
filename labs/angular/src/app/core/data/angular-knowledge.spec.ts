import { ANGULAR_APIS, ANGULAR_AREAS } from './angular-knowledge';

describe('Angular knowledge index', () => {
  it('keeps unique area and API identifiers', () => {
    expect(new Set(ANGULAR_AREAS.map(area => area.id)).size).toBe(ANGULAR_AREAS.length);
    expect(new Set(ANGULAR_APIS.map(api => api.name)).size).toBe(ANGULAR_APIS.length);
  });

  it('connects every area to documentation and a measurable outcome', () => {
    expect(ANGULAR_AREAS.every(area => area.documentationPath.endsWith('.md'))).toBeTrue();
    expect(ANGULAR_AREAS.every(area => area.topics.length >= 5 && area.outcome.length > 20)).toBeTrue();
  });
});

