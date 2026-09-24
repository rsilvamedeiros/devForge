import { describe, expect, it } from 'vitest';
import { TYPE_SCRIPT_VERSIONS, VERSION_ERAS } from '../src/academy/version-history.js';

describe('TypeScript version history', () => {
  it('covers the language from 1.0 through the current native compiler', () => {
    expect(TYPE_SCRIPT_VERSIONS[0]?.version).toBe('7.0');
    expect(TYPE_SCRIPT_VERSIONS.at(-1)?.version).toBe('1.0');
    expect(TYPE_SCRIPT_VERSIONS.length).toBeGreaterThanOrEqual(18);
  });

  it('gives every milestone actionable learning and migration guidance', () => {
    expect(VERSION_ERAS).toHaveLength(5);
    expect(TYPE_SCRIPT_VERSIONS.every(item => item.changes.length >= 3)).toBe(true);
    expect(TYPE_SCRIPT_VERSIONS.every(item => item.migration.length >= 40)).toBe(true);
  });
});
