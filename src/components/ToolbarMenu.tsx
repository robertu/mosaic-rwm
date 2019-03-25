import React from 'react';
import { Menu, MenuDivider, MenuItem, Popover, Position, Button } from '@blueprintjs/core';
import { MosaicWindowContext } from '../contextTypes';
import { MosaicKey } from '../types';
import { getNodeAtPath } from '../util/mosaicUtilities';
import { IconName } from '@blueprintjs/core';

export interface MosaicToolbarMenuProps {
  icon?: IconName | JSX.Element;
  expanded: boolean;
  onClickClose?: () => void;
  onClickExpand?: () => void;
  onClickRestore?: () => void;
  menu?: React.ReactElement;
}

export class ToolbarMenu<T extends MosaicKey> extends React.PureComponent<MosaicToolbarMenuProps> {
  static contextTypes = MosaicWindowContext;

  context!: MosaicWindowContext<T>;

  render() {
    const { expanded, icon } = this.props;
    return (
      <Popover
        content={
          <Menu>
            {expanded ? (
              <MenuItem icon="minimize" text="Restore window" onClick={this.restore} />
            ) : (
                <MenuItem icon="maximize" text="Maximize window" onClick={this.expand} />
              )}
            {!expanded && <MenuDivider />}
            {!expanded && <MenuItem icon="cross" text="Close window" onClick={this.remove} />}
          </Menu>
        }
        position={Position.BOTTOM_LEFT}
        minimal={true}
      >
        <Button icon={icon} minimal={true} />
      </Popover>
    );
  }

  private remove = () => {
    const { expanded } = this.props;
    if (expanded) {
      this.context.mosaicWindowActions.setExpanded(false);
      this.context.mosaicActions.setAll();
    }
    this.context.mosaicActions.remove(this.context.mosaicWindowActions.getPath());
    if (this.props.onClickClose) {
      this.props.onClickClose();
    }
  };

  private expand = () => {
    const root = this.context.mosaicActions.getRoot();
    const path = this.context.mosaicWindowActions.getPath();
    const node = getNodeAtPath(root, path);

    this.context.mosaicActions.setSingle(node);
    this.context.mosaicWindowActions.setExpanded(true);

    if (this.props.onClickExpand) {
      this.props.onClickExpand();
    }
  };

  private restore = () => {
    this.context.mosaicWindowActions.setExpanded(false);
    this.context.mosaicActions.setAll();

    if (this.props.onClickRestore) {
      this.props.onClickRestore();
    }
  };
}

export const MenuButtonFactory = React.createFactory(ToolbarMenu);
