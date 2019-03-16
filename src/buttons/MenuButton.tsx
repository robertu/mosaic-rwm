// import classNames from 'classnames';
import React from 'react';

import { MosaicWindowContext } from '../contextTypes';
import { MosaicKey } from '../types';
// import { OptionalBlueprint } from '../util/OptionalBlueprint';
import { createMenuToolbarButton, MosaicButtonProps } from './MosaicButton';
// import { getNodeAtPath } from '../util/mosaicUtilities';
export class MenuButton<T extends MosaicKey> extends React.PureComponent<MosaicButtonProps> {
  static contextTypes = MosaicWindowContext;
  
  context!: MosaicWindowContext<T>;

  render() {
    return createMenuToolbarButton(
      // 'Menu',
      // classNames('menu-button', OptionalBlueprint.getIconClass('DOCUMENT')),
      // this.expand,
    );
  }

  // private expand = () => {
  //   const expanded = this.context.mosaicWindowActions.isExpanded();
  //   // const win = this.context.mosaicWindowActions.getInfo();
    
  //   const path = this.context.mosaicWindowActions.getPath();
  //   // console.log(0, { p1: win.window.props.path, path });
  //   // const rootNode = this.context.mosaicActions.getRoot();
  //   // if (path.length === 0) {
  //   //   console.log(1, { path, rootNode });
  //   //   return;
  //   // }
  //   // let node;
  //   // let elem;
  //   // // let splitPercentage;
  //   // if (path.length === 1) {
  //   //   node = rootNode;
  //   //   console.log(1, { node,path });
  //   //   elem = path[0];
  //   // } else {
  //   //   node = getNodeAtPath(rootNode, path.slice(0, path.length-1));
  //   //   console.log(2, { node });
  //   //   elem = path[path.length - 1];
  //   // }
  //   // console.log(3, typeof node, {elem});
  //   // splitPercentage = node.splitPercentage;
  //   // console.log(4, { splitPercentage });

  //   // splitPercentage = node === null ? 40 : node['splitPercentage'];
  //   // if (elem === "first") {
  //   //    console.log(4, { splitPercentage });
  //   // } else {
  //   //   splitPercentage = 100 - splitPercentage;
  //   //   console.log(5, { splitPercentage });

  //   // }
  //   // console.log({ path, rootNode, node, splitPercentage });
  //   this.context.mosaicActions.expand(path, expanded ? 50 : 100);
  //   this.context.mosaicWindowActions.setExpanded(!expanded);

  //   if (this.props.onClick) {
  //     this.props.onClick();
  //   }
  // };
}

export const MenuButtonFactory = React.createFactory(MenuButton);
