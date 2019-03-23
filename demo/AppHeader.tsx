import { Alignment, Button, Classes, Icon, Menu, MenuDivider, MenuItem, Navbar, NavbarDivider, NavbarGroup, NavbarHeading, Popover, Position } from '@blueprintjs/core';
import { CustomSvg } from './CustomSvg';
import React, { MouseEvent } from 'react';

// tslint:disable-next-line:no-var-requires
const { version } = require('../package.json');

interface ThemedIconProps {
  light_theme: boolean;
}

interface ThemedHeaderProps {
  light_theme: boolean;
  themeSwitch: () => void;
  autoArrange: () => void;
  addToTopRight: (name: string) => (event: MouseEvent) => void;
}

const CustomLogo = ({ light_theme }: ThemedIconProps) => <CustomSvg width={80} height={32} light_theme={light_theme} />;

export const AppHeader = ({ light_theme, themeSwitch, autoArrange, addToTopRight }: ThemedHeaderProps) => (
  <Navbar className={light_theme ? undefined : Classes.DARK}>
    <NavbarGroup align={Alignment.LEFT}>
      <Popover
        content={
          <Menu>
            <MenuItem icon="grid-view" text="Rearrange windows" onClick={autoArrange} />
            <MenuItem icon="contrast" text={light_theme ? 'Switch to dark theme' : 'Switch to light theme'} onClick={themeSwitch} />
            <MenuDivider />
            <MenuItem icon="new-text-box" text="New text 2" />
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
        <Button className={Classes.MINIMAL} icon={<CustomLogo light_theme={light_theme} />} text={null} />
      </Popover>
      <NavbarDivider />
      <Popover
        content={
          <Menu>
            <MenuItem icon="applications" text="New dummy window" onClick={addToTopRight('dummy')} />
            <MenuItem icon="applications" text="New <Callout>" onClick={addToTopRight('callout')} />
            <MenuItem icon="applications" text="New <Tabs>" onClick={addToTopRight('tabs')} />
            <MenuItem icon="applications" text="New <Table>" onClick={addToTopRight('table')} />
            <MenuItem icon="applications" text="New <Test-Table>" onClick={addToTopRight('test-table')} />
            <MenuItem icon="applications" text="New <OctaHedronInStars>" onClick={addToTopRight('OctaHedronInStars')} />
            <MenuItem icon="applications" text="New <GreenCube>" onClick={addToTopRight('GreenCube')} />
            <MenuItem icon="applications" text="New <DraggableCubes A>" onClick={addToTopRight('DraggableCubesA')} />
            <MenuItem icon="applications" text="New <DraggableCubes B>" onClick={addToTopRight('DraggableCubesB')} />
            <MenuItem icon="applications" text="New <PanelStackContainer>" onClick={addToTopRight('PanelStackContainer')} />
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
      <NavbarHeading>Sample Mosaic based application v{version}</NavbarHeading>
      <NavbarDivider />

      <Popover
        content={
          <Menu>
            <MenuItem icon="new-text-box" text="New text" />
            <MenuItem icon="new-object" text="New object" />
            <MenuItem icon="contrast" text={light_theme ? 'Switch to dark theme' : 'Switch to light theme'} onClick={themeSwitch} />
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
