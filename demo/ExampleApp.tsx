import { Classes, HTMLSelect } from '@blueprintjs/core';
import {
  Button,
  InputGroup,
  ControlGroup,
  Menu,
  MenuItem,
  Popover,
  Position,
  Tag,
} from "@blueprintjs/core";
import { FocusStyleManager } from "@blueprintjs/core";

import { IconNames } from '@blueprintjs/icons';
import classNames from 'classnames';
import dropRight from 'lodash/dropRight';
import React from 'react';

import {
  Corner,
  createBalancedTreeFromLeaves,
  getLeaves,
  getNodeAtPath,
  getOtherDirection,
  getPathToCorner,
  Mosaic,
  MosaicDirection,
  MosaicNode,
  MosaicParent,
  MosaicWindow,
  MosaicZeroState,
  updateTree,
} from '../src';
import { MenuButton } from "../src/buttons/MenuButton";
import { CloseAdditionalControlsButton } from './CloseAdditionalControlsButton';

import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '../styles/index.less';
import './example.less';

// tslint:disable no-console

// tslint:disable-next-line no-var-requires
const gitHubLogo = require('./GitHub-Mark-Light-32px.png');
// tslint:disable-next-line no-var-requires
const { version } = require('../package.json');

let windowCount = 3;
FocusStyleManager.onlyShowFocusOnTabs();

export const THEMES = {
  ['Blueprint']: 'mosaic-blueprint-theme',
  ['Blueprint Dark']: classNames('mosaic-blueprint-theme', Classes.DARK),
  ['None']: '',
};

export type Theme = keyof typeof THEMES;

const additionalControls = React.Children.toArray([<CloseAdditionalControlsButton />]);

const EMPTY_ARRAY: any[] = [];

export interface ExampleAppState {
  currentNode: MosaicNode<number> | null;
  currentTheme: Theme;
}

export class ExampleApp extends React.PureComponent<{}, ExampleAppState> {
  state: ExampleAppState = {
    currentNode: {
      direction: 'row',
      first: 1,
      second: {
        direction: 'column',
        first: 2,
        second: 3,
      },
      splitPercentage: 40,
    },
    currentTheme: 'Blueprint',
  };

  render() {
    const small = false;
    const large = false;
    const disabled = true;
        
    // const filterValue = "asdfc";
        
        
    const tagValue = "";


    const permissionsMenu = (
      <Popover
        content={
          <Menu>
            <MenuItem text="can edit" />
            <MenuItem text="can view" />
          </Menu>
        }
        disabled={disabled}
        position={Position.BOTTOM_RIGHT}
      >
        <Button disabled={disabled} minimal={true} fill rightIcon="caret-down">
          can edit
        </Button>
      </Popover>
    );

    const resultsTag = <Tag minimal={true}>{Math.floor(10000 / Math.max(1, Math.pow(tagValue.length, 2)))}</Tag>;
    const FILTER_OPTIONS = ["Filter", "Name - ascending", "Name - descending", "Price - ascending", "Price - descending"];

    return (
      <div className="react-mosaic-example-app">
        {this.renderNavBar()}
        <Mosaic<number>
          renderTile={(count, path) => (
            <MosaicWindow<number>
              additionalControls={count === 3 ? additionalControls : EMPTY_ARRAY}
              statusbar={count!==2}
              statusbarControls={(
                <ControlGroup fill={true} vertical={false}>

                  <HTMLSelect options={FILTER_OPTIONS} disabled={disabled} style={{cursor: "pointer"}} />
                  <InputGroup placeholder="Find filters..." disabled={disabled}/>
                  <Button icon="arrow-right" disabled={disabled}/>

                  <InputGroup
                    disabled={disabled}
                    large={large}
                    leftIcon="tag"
                    placeholder="Find tags"
                    rightElement={resultsTag}
                    small={small}
                    value={tagValue}
                  />
                  <InputGroup
                    disabled={disabled}
                    large={large}
                    placeholder="Add people or groups..."
                    rightElement={permissionsMenu}
                    small={small}
                  />
                  </ControlGroup>


              )}
              toolbarWindowIcon={count===2 ? <Button minimal icon="cross" /> : <MenuButton />}
              title={`Window ${count}`}
              createNode={this.createNode}
              path={path}
              onDragStart={() => console.log('MosaicWindow.onDragStart')}
              onDragEnd={(type) => console.log('MosaicWindow.onDragEnd', type)}
              renderToolbar={count === 2 ? () => <div className="toolbar-example">Custom Toolbar</div> : null}
            >
              <div className="example-window">
                <h1>{`Window ${count}`}</h1>
              </div>
            </MosaicWindow>
          )}
          zeroStateView={<MosaicZeroState createNode={this.createNode} />}
          value={this.state.currentNode}
          onChange={this.onChange}
          onRelease={this.onRelease}
          className={THEMES[this.state.currentTheme]}
        />
      </div>
    );
  }

  private onChange = (currentNode: MosaicNode<number> | null) => {
    this.setState({ currentNode });
  };

  private onRelease = (currentNode: MosaicNode<number> | null) => {
    console.log('Mosaic.onRelease():', currentNode);
  };

  private createNode = () => ++windowCount;

  private autoArrange = () => {
    const leaves = getLeaves(this.state.currentNode);

    this.setState({
      currentNode: createBalancedTreeFromLeaves(leaves),
    });
  };

  private addToTopRight = () => {
    let { currentNode } = this.state;
    if (currentNode) {
      const path = getPathToCorner(currentNode, Corner.TOP_RIGHT);
      const parent = getNodeAtPath(currentNode, dropRight(path)) as MosaicParent<number>;
      const destination = getNodeAtPath(currentNode, path) as MosaicNode<number>;
      const direction: MosaicDirection = parent ? getOtherDirection(parent.direction) : 'row';

      let first: MosaicNode<number>;
      let second: MosaicNode<number>;
      if (direction === 'row') {
        first = destination;
        second = ++windowCount;
      } else {
        first = ++windowCount;
        second = destination;
      }

      currentNode = updateTree(currentNode, [
        {
          path,
          spec: {
            $set: {
              direction,
              first,
              second,
            },
          },
        },
      ]);
    } else {
      currentNode = ++windowCount;
    }

    this.setState({ currentNode });
  };

  private renderNavBar() {
    return (
      <div className={classNames(Classes.NAVBAR, Classes.DARK)}>
        <div className={Classes.NAVBAR_GROUP}>
          <div className={Classes.NAVBAR_HEADING}>
            
            <img src={gitHubLogo} /> <a className="github-link" href="https://github.com/robertu/mosaicrwm">mosaic react window manager <span className="version">v{version}</span>
            </a>
          </div>
        </div>
        <div className={classNames(Classes.NAVBAR_GROUP, Classes.BUTTON_GROUP)}>
          <label className={classNames('theme-selection', Classes.LABEL, Classes.INLINE)}>
            Theme:
            <HTMLSelect
              value={this.state.currentTheme}
              onChange={(e) => this.setState({ currentTheme: e.currentTarget.value as Theme })}
            >
              {React.Children.toArray(Object.keys(THEMES).map((label) => <option>{label}</option>))}
            </HTMLSelect>
          </label>
          <div className="navbar-separator" />
          <span className="actions-label">Example Actions:</span>
          <button
            className={classNames(Classes.BUTTON, Classes.iconClass(IconNames.GRID_VIEW))}
            onClick={this.autoArrange}
          >
            Auto Arrange
          </button>
          <button
            className={classNames(Classes.BUTTON, Classes.iconClass(IconNames.ARROW_TOP_RIGHT))}
            onClick={this.addToTopRight}
          >
            Add Window to Top Right
          </button>

        </div>
      </div>
    );
  }
}
