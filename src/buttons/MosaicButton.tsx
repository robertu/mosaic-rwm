import classNames from 'classnames';
import React from 'react';

import { Menu, MenuDivider, MenuItem, Popover, Position } from '@blueprintjs/core';

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
  className: string,
  isWindowExpanded: boolean,
  onClickClose: (event: React.MouseEvent<any>) => any,
  onClickExpand: (event: React.MouseEvent<any>) => any,
  onClickRestore: (event: React.MouseEvent<any>) => any,
): React.ReactElement<any> {
  return (
    <Popover
      content={
        <Menu>
          {isWindowExpanded ? (
            <MenuItem icon="minimize" text="Restore window" onClick={onClickRestore} />
          ) : (
            <MenuItem icon="maximize" text="Maximize window" onClick={onClickExpand} />
          )}
          <MenuDivider />
          <MenuItem icon="cross" text="Close window" onClick={(e: any) => onClickClose(e)} />
        </Menu>
      }
      position={Position.BOTTOM_LEFT}
      minimal={true}
    >
      <button
        className={classNames('mosaic-default-control', OptionalBlueprint.getClasses('BUTTON', 'MINIMAL'), className)}
      />
    </Popover>
  );
}

export interface MosaicButtonProps {
  onClick?: () => void;
}

export interface MosaicMenuButtonProps {
  expanded: boolean;
  onClickClose?: () => void;
  onClickExpand?: () => void;
  onClickRestore?: () => void;
  menu?: React.ReactElement;
}
