import classNames from 'classnames';
import React from 'react';

import { MosaicWindowContext } from '../contextTypes';
import { MosaicKey } from '../types';
import { OptionalBlueprint } from '../util/OptionalBlueprint';
import { createDefaultToolbarButton, MosaicButtonProps } from './MosaicButton';

export class RestoreButton<T extends MosaicKey> extends React.PureComponent<MosaicButtonProps> {
  static contextTypes = MosaicWindowContext;
  context!: MosaicWindowContext<T>;

  render() {
    return createDefaultToolbarButton('Restore', classNames('restore-button', OptionalBlueprint.getIconClass('MINIMIZE')), this.restore);
  }

  private restore = () => {
    const path = this.context.mosaicWindowActions.getPath();

    this.context.mosaicActions.expand(path, 50);
    this.context.mosaicWindowActions.setExpanded(false);

    if (this.props.onClick) {
      this.props.onClick();
    }
  };
}

export const RestoreButtonFactory = React.createFactory(RestoreButton);
