import classNames from 'classnames';
import React from 'react';
import { Classes, Menu, MenuDivider, MenuItem } from "@blueprintjs/core";
import { Popover, Position, Button } from "@blueprintjs/core";

import { OptionalBlueprint } from '../util/OptionalBlueprint';

export function createDefaultToolbarButton(
  title: string,
  className: string,
  onClick: (event: React.MouseEvent<any>) => any,
  text?: string,
): React.ReactElement<any> {
  return (
    <button
      title={title}
      onClick={onClick}
      className={classNames('mosaic-default-control', OptionalBlueprint.getClasses('BUTTON', 'MINIMAL'), className)}
    >
      {text && <span className="control-text">{text}</span>}
    </button>
  );
}

export function createMenuToolbarButton(
  // title: string,
  // className: string,
): React.ReactElement<any> {
  return (
    <Popover
      content={
        <Menu>
          <MenuItem icon="new-text-box" text="New text 2" />
          <MenuItem icon="new-object" text="New object" />
          <MenuItem icon="new-link" text="New link" />
          <MenuDivider />
          <MenuItem icon="cog" text="Settings..." />
          <MenuDivider />
          <MenuItem
            icon="share"
            text="Logout"
          />
        </Menu>
      }
      position={Position.BOTTOM_LEFT}
      minimal
    >
      <Button
        className={Classes.MINIMAL}
        icon="document"
        text={null}
      />
    </Popover>
  );
  // return (
  //   <button
  //     title={title}
  //     onClick={onClick}
  //     className={classNames('mosaic-default-control', OptionalBlueprint.getClasses('BUTTON', 'MINIMAL'), className)}
  //   >
  //     {text && <span className="control-text">{text}</span>}
  //   </button>
  // );
}

export interface MosaicButtonProps {
  onClick?: () => void;
}
