import React from 'react';
import { ExpandButton } from './ExpandButton';
import { RemoveButton } from './RemoveButton';
import { RestoreButton } from './RestoreButton';

export const DEFAULT_CONTROLS_ALL_VISIBLE = React.Children.toArray([<ExpandButton />, <RemoveButton />]);
export const DEFAULT_CONTROLS_EXPANDED = <RestoreButton />;
