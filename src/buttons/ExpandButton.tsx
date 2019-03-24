import classNames from 'classnames';
import React from 'react';

import { MosaicWindowContext } from '../contextTypes';
import { MosaicKey } from '../types';
import { OptionalBlueprint } from '../util/OptionalBlueprint';
import { createDefaultToolbarButton, MosaicButtonProps } from './MosaicButton';
import { getNodeAtPath } from '../util/mosaicUtilities';

export class ExpandButton<T extends MosaicKey> extends React.PureComponent<MosaicButtonProps> {
  static contextTypes = MosaicWindowContext;
  context!: MosaicWindowContext<T>;

  render() {
    return createDefaultToolbarButton('Expand', classNames('expand-button', OptionalBlueprint.getIconClass('MAXIMIZE')), this.expand);
  }

  private expand = () => {
    const root = this.context.mosaicActions.getRoot();
    const path = this.context.mosaicWindowActions.getPath();

    // if (path.length > 0) {
    //   return get(tree, path, null);
    // } else {
    //   return tree;
    // }
    const node = getNodeAtPath(root, path);
    console.log({ root, path, node });

    this.context.mosaicActions.setSingle(node);
    this.context.mosaicWindowActions.setExpanded(true);

    // if (this.props.onClick) {
    //   this.props.onClick();
    // }
  };
}

export const ExpandButtonFactory = React.createFactory(ExpandButton);
