import {
  Alignment,
  Button,
  Classes,
  Icon,
  Menu,
  MenuDivider,
  MenuItem,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  Popover,
  Position,
} from '@blueprintjs/core';
import { AppHeaderLogo } from './AppHeaderLogo';
import React from 'react';
// import React, { MouseEvent } from 'react';

// tslint:disable-next-line:no-var-requires
const { version } = require('../package.json');

interface ThemedIconProps {
  lightTheme: boolean;
}

interface ThemedHeaderProps {
  lightTheme: boolean;
  themeSwitch: () => void;
  nodeCreator: (name: string) => void;
  mosaic: any;
  // addToTopRight: (name: string) => (event: MouseEvent) => void;
}

const CustomLogo = ({ lightTheme }: ThemedIconProps) => <AppHeaderLogo width={80} height={32} lightTheme={lightTheme} />;

export const AppHeader = ({ lightTheme, themeSwitch, mosaic, nodeCreator }: ThemedHeaderProps) => (
  <Navbar className={lightTheme ? undefined : Classes.DARK}>
    <NavbarGroup align={Alignment.LEFT}>
      <Popover
        content={
          <Menu>
            <MenuItem icon="grid-view" text="Rearrange windows" onClick={() => mosaic.autoArrange()} />
            <MenuItem icon="contrast" text={lightTheme ? 'Switch to dark theme' : 'Switch to light theme'} onClick={themeSwitch} />
            <MenuDivider />
            <MenuItem icon="new-text-box" text="New text" />
            <MenuItem icon="new-object" text="New object" />
            <MenuItem icon="new-link" text="New link" />
            <MenuDivider />
            <MenuItem icon="cog" text="Settings..." />
            <MenuDivider />
            <MenuItem icon="cross" labelElement={<Icon icon="share" />} text="Logout" />
          </Menu>
        }
        position={Position.BOTTOM_LEFT}
        minimal={true}
      >
        <Button className={Classes.MINIMAL} icon={<CustomLogo lightTheme={lightTheme} />} text={null} />
      </Popover>
      <NavbarDivider />
      <Popover
        content={
          <Menu>
            <MenuItem icon="applications" text="New dummy window" onClick={() => nodeCreator('dummy')} />
            <MenuItem icon="applications" text="New <Callout>" onClick={() => nodeCreator('callout')} />
            <MenuItem icon="applications" text="New <Tabs>" onClick={() => nodeCreator('tabs')} />
            <MenuItem icon="applications" text="New <Table>" onClick={() => nodeCreator('table')} />
            <MenuItem icon="applications" text="New <Test-Table>" onClick={() => nodeCreator('test-table')} />
            <MenuItem icon="applications" text="New <OctaHedronInStars>" onClick={() => nodeCreator('OctaHedronInStars')} />
            <MenuItem icon="applications" text="New <GreenCube>" onClick={() => nodeCreator('GreenCube')} />
            <MenuItem icon="applications" text="New <DraggableCubes A>" onClick={() => nodeCreator('DraggableCubesA')} />
            <MenuItem icon="applications" text="New <DraggableCubes B>" onClick={() => nodeCreator('DraggableCubesB')} />
            <MenuItem icon="applications" text="New <PanelStackContainer>" onClick={() => nodeCreator('PanelStackContainer')} />
            <MenuItem icon="map" text="Map" />
            <MenuItem icon="th" text="Table" shouldDismissPopover={false} />
            <MenuItem icon="zoom-to-fit" text="Nucleus" disabled={true} />
            <MenuDivider />
            <MenuItem icon="cog" text="Settings...">
              <MenuItem icon="add" text="Add new application" disabled={true} />
              <MenuItem icon="remove" text="Remove application" />
            </MenuItem>
          </Menu>
        }
        minimal={true}
        position={Position.BOTTOM_LEFT}
      >
        <Button className={Classes.MINIMAL} icon="document" text="File" />
      </Popover>
      <Popover
        content={
          <Menu>
            <MenuItem icon="graph" text="Graph" />
            <MenuItem icon="map" text="Map" />
            <MenuItem icon="th" text="Table" shouldDismissPopover={false} />
            <MenuItem icon="zoom-to-fit" text="Nucleus" disabled={true} />
            <MenuDivider />
            <MenuItem icon="cog" text="Settings...">
              <MenuItem icon="add" text="Add new application" disabled={true} />
              <MenuItem icon="remove" text="Remove application" />
            </MenuItem>
          </Menu>
        }
        minimal={true}
        position={Position.BOTTOM_LEFT}
      >
        <Button className={Classes.MINIMAL} icon="edit" text="Edit" />
      </Popover>
    </NavbarGroup>
    <NavbarGroup align={Alignment.RIGHT}>
      <NavbarHeading>Mosaic App v{version}</NavbarHeading>
      <NavbarDivider />

      <Popover
        content={
          <Menu>
            <MenuItem icon="new-text-box" text="New text" />
            <MenuItem icon="new-object" text="New object" />
            <MenuItem icon="contrast" text={lightTheme ? 'Switch to dark theme' : 'Switch to light theme'} onClick={themeSwitch} />
            <MenuDivider />
            <MenuItem icon="cog" labelElement={<Icon icon="share" />} text="Settings..." />
          </Menu>
        }
        position={Position.BOTTOM_RIGHT}
        minimal={true}
      >
        <Button className={Classes.MINIMAL} icon="user" text="User" />
      </Popover>
    </NavbarGroup>
  </Navbar>
);
