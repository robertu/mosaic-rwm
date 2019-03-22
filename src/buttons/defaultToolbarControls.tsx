import React from 'react';
import { ExpandButton } from './ExpandButton';
import { RemoveButton } from './RemoveButton';
import { RestoreButton } from './RestoreButton';

export const DEFAULT_CONTROLS_WITH_CREATION = React.Children.toArray([<ExpandButton />, <RemoveButton />]);
export const DEFAULT_CONTROLS_WITH_CREATION_EXPANDED = <RestoreButton />;
export const DEFAULT_CONTROLS_WITHOUT_CREATION = React.Children.toArray([<ExpandButton />, <RemoveButton />]);
export const DEFAULT_CONTROLS_WITHOUT_CREATION_EXPANDED = <RestoreButton />;


