import { Type } from '@angular/core';
import { FormDemo } from './demos/form-demo';
import { SignalDemo } from './demos/signal-demo';
import { StateDemo } from './demos/state-demo';
import { StreamDemo } from './demos/stream-demo';
import { TrackDemo } from './demos/track-demo';
import { InputOutputDemo } from './demos/input-output-demo';
import { ControlFlowDemo } from './demos/control-flow-demo';
import { ModelDemo } from './demos/model-demo';
import { PipeDemo } from './demos/pipe-demo';

/**
 * Mantido separado de `component-recipes.ts` de propósito: a sidebar importa só os
 * metadados para o badge, e importar os componentes junto arrastaria Material e
 * Forms para o bundle inicial.
 */
export const COMPONENT_DEMOS: Record<string, Type<unknown>> = {
  'signal-derived': SignalDemo,
  'for-track': TrackDemo,
  'reactive-form': FormDemo,
  'view-states': StateDemo,
  'rxjs-to-signal': StreamDemo,
  'input-output': InputOutputDemo,
  'control-flow': ControlFlowDemo,
  'model-binding': ModelDemo,
  'custom-pipe': PipeDemo,
};
