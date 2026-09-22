import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { LearningPage } from './learning-page';

describe('LearningPage', () => {
  beforeEach(() => localStorage.clear());

  it('persists module progress without changing skill level', () => {
    render(<LearningPage/>);

    fireEvent.click(screen.getByRole('button', { name: 'Concluir Composição da interface' }));

    expect(screen.getByText('20%')).toBeTruthy();
    expect(localStorage.getItem('nexa-learning-progress')).toContain('composition');
  });
});
