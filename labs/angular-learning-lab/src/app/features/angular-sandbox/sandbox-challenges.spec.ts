import { SANDBOX_CHALLENGES } from './sandbox-challenges';

describe('Angular sandbox challenges', () => {
  it('offers progressive multi-file workspaces', () => {
    expect(SANDBOX_CHALLENGES.map(item => item.level)).toEqual(['Júnior', 'Pleno', 'Sênior']);
    expect(SANDBOX_CHALLENGES.every(item => item.files.length >= 4)).toBeTrue();
  });

  it('references existing files from every automated check', () => {
    for (const challenge of SANDBOX_CHALLENGES) {
      const names = challenge.files.map(file => file.name);
      expect(challenge.checks.every(check => names.includes(check.file))).toBeTrue();
    }
  });
});
