import React from 'react';
import { ExpandButton } from './ExpandButton';
import { RemoveButton } from './RemoveButton';
// import { ReplaceButton } from './ReplaceButton';
import { RestoreButton } from './RestoreButton';
// import { SplitButton } from './SplitButton';
import { MenuButton } from './MenuButton';

export const DEFAULT_CONTROLS_WITH_CREATION = React.Children.toArray([
  // <ReplaceButton />,
  // <SplitButton />,
  <ExpandButton />,
  <RemoveButton />,
]);
export const DEFAULT_CONTROLS_WITH_CREATION_EXPANDED = React.Children.toArray([
  // <ReplaceButton />,
  // <SplitButton />,
  <RestoreButton />
]);
export const DEFAULT_CONTROLS_WITHOUT_CREATION = React.Children.toArray([<ExpandButton />, <RemoveButton />]);
export const DEFAULT_CONTROLS_WITHOUT_CREATION_EXPANDED = React.Children.toArray([<RestoreButton />]);
export const DEFAULT_WINDOW_ICON = <MenuButton />;
