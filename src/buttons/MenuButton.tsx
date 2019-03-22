import React from 'react';
import classNames from 'classnames';
import { MosaicWindowContext } from '../contextTypes';
import { MosaicKey } from '../types';
import { OptionalBlueprint } from '../util/OptionalBlueprint';
import { createMenuToolbarButton, MosaicMenuButtonProps } from './MosaicButton';
// import { getNodeAtPath } from '../util/mosaicUtilities';
export class MenuButton<T extends MosaicKey> extends React.PureComponent<MosaicMenuButtonProps> {
  static contextTypes = MosaicWindowContext;

  context!: MosaicWindowContext<T>;

  render() {
    const expanded = this.context.mosaicWindowActions.isExpanded();
    return createMenuToolbarButton(
      classNames('menu-button', OptionalBlueprint.getIconClass('DOCUMENT')),
      expanded,
      this.remove,
      this.expand,
      this.restore
    );
  }

  private remove = () => {
    console.log('remove on menuButton');
    this.context.mosaicActions.remove(this.context.mosaicWindowActions.getPath());
    if (this.props.onClickClose) {
      this.props.onClickClose();
    }
  };

  private expand = () => {
    const path = this.context.mosaicWindowActions.getPath();

    this.context.mosaicActions.expand(path, 100);
    this.context.mosaicWindowActions.setExpanded(true);

    if (this.props.onClickExpand) {
      this.props.onClickExpand();
    }
  };

  private restore = () => {
    const path = this.context.mosaicWindowActions.getPath();

    this.context.mosaicActions.expand(path, 50);
    this.context.mosaicWindowActions.setExpanded(false);

    if (this.props.onClickRestore) {
      this.props.onClickRestore();
    }
  };
}

export const MenuButtonFactory = React.createFactory(MenuButton);
