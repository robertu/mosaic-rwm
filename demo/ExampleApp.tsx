import { Button, Classes, ControlGroup, FocusStyleManager, HTMLSelect, InputGroup, Menu, MenuItem, Popover, Position, Tag } from '@blueprintjs/core';
// import { IconNames } from '@blueprintjs/icons';
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

import { AppHeader } from './AppHeader';

import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '../styles/index.less';
import './example.less';

let windowCount = 0;
FocusStyleManager.onlyShowFocusOnTabs();

const additionalToolbarButtons = React.Children.toArray([<Button minimal={true} icon="add-to-folder" />]);

export interface ExampleAppState {
  currentNode: MosaicNode<string> | null;
  lightTheme: boolean;
}

export class ExampleApp extends React.PureComponent<{}, ExampleAppState> {
  state: ExampleAppState = {
    currentNode: {
      direction: 'row',
      first: 'A',
      second: {
        direction: 'column',
        first: 'B',
        second: 'C',
      },
      splitPercentage: 40,
    },
    lightTheme: true,
  };

  render() {
    const small = false;
    const large = false;
    const disabled = true;

    // const filterValue = "asdfc";

    const tagValue = '';

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
        <Button disabled={disabled} minimal={true} fill={true} rightIcon="caret-down">
          can edit
        </Button>
      </Popover>
    );

    const resultsTag = <Tag minimal={true}>{Math.floor(10000 / Math.max(1, Math.pow(tagValue.length, 2)))}</Tag>;
    const FILTER_OPTIONS = ['Filter', 'Name - ascending', 'Name - descending', 'Price - ascending', 'Price - descending'];

    return (
      <div className="react-mosaic-example-app">
        <AppHeader light_theme={this.state.lightTheme} autoArrange={this.autoArrange} themeSwitch={this.themeSwitch} addToTopRight={this.addToTopRight} />
        <Mosaic<string>
          renderTile={(name, path) => (
            <MosaicWindow<string>
              additionalControls={name === 'A' ? additionalToolbarButtons : null}
              toolbarControls={name === 'B' ? <Button minimal={true} icon="help" /> : true}
              statusbar={name !== 'C'}
              statusbarControls={
                <ControlGroup fill={true} vertical={false}>
                  <HTMLSelect options={FILTER_OPTIONS} disabled={disabled} style={{ cursor: 'pointer' }} />
                  <InputGroup placeholder="Find filters..." disabled={disabled} />
                  <Button icon="arrow-right" disabled={disabled} />

                  <InputGroup disabled={disabled} large={large} leftIcon="tag" placeholder="Find tags" rightElement={resultsTag} small={small} value={tagValue} />
                  <InputGroup disabled={disabled} large={large} placeholder="Add people or groups..." rightElement={permissionsMenu} small={small} />
                </ControlGroup>
              }
              title={`Window ${name}`}
              createNode={this.createNode('dummy')}
              path={path}
              // tslint:disable-next-line:no-console
              onDragStart={() => console.log('MosaicWindow.onDragStart')}
              // tslint:disable-next-line:no-console
              onDragEnd={(type) => console.log('MosaicWindow.onDragEnd', type)}
            >
              <div className="example-window">
                <h1>{`Window ${name}`}</h1>
              </div>
            </MosaicWindow>
          )}
          zeroStateView={<MosaicZeroState createNode={this.createNode('dummy')} />}
          value={this.state.currentNode}
          onChange={this.onChange}
          onRelease={this.onRelease}
          className={classNames('mosaic-blueprint-theme', this.state.lightTheme ? null : Classes.DARK)}
        />
      </div>
    );
  }
  private themeSwitch = () => {
    this.setState({
      lightTheme: !this.state.lightTheme,
    });
  };

  private onChange = (currentNode: MosaicNode<string> | null) => {
    this.setState({ currentNode });
  };

  private onRelease = (currentNode: MosaicNode<string> | null) => {
    // tslint:disable-next-line:no-console
    console.log('Mosaic.onRelease():', currentNode);
  };

  createNodeContent = (name: string) => {
    const created = `${name}${++windowCount}`;
    return created;
  };

  createNode = (name: string) => () => {
    return this.createNodeContent(name);
  };

  private autoArrange = () => {
    const leaves = getLeaves(this.state.currentNode);

    this.setState({
      currentNode: createBalancedTreeFromLeaves(leaves),
    });
  };

  addToTopRight = (name: string) => () => {
    const created = this.createNodeContent(name);
    let { currentNode } = this.state;
    if (currentNode) {
      const path = getPathToCorner(currentNode, Corner.TOP_RIGHT);
      const parent = getNodeAtPath(currentNode, dropRight(path)) as MosaicParent<string>;
      const destination = getNodeAtPath(currentNode, path) as MosaicNode<string>;
      const direction: MosaicDirection = parent ? getOtherDirection(parent.direction) : 'row';

      let first: MosaicNode<string>;
      let second: MosaicNode<string>;
      if (direction === 'row') {
        first = destination;
        second = created;
      } else {
        first = created;
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
      currentNode = created;
    }

    this.setState({ currentNode });
  };
}
