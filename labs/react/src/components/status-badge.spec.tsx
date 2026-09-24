import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { StatusBadge } from './status-badge';

describe('StatusBadge', () => {
  it('renders the localized ticket status', () => {
    render(<StatusBadge status="in-progress"/>);
    expect(screen.getByText('Em atendimento')).toBeTruthy();
  });
});
