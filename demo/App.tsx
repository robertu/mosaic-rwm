import { Button, Classes, ControlGroup, FocusStyleManager, InputGroup } from '@blueprintjs/core';
import classNames from 'classnames';

import React from 'react';

import { Mosaic, MosaicNode, MosaicWindow, MosaicZeroState } from '../src';

import { MosaicBranch } from '../src/types';

import { AppHeader } from './AppHeader';

import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '../styles/index.less';
import './App.less';

FocusStyleManager.onlyShowFocusOnTabs();

export interface AppState {
  lightTheme: boolean;
  mosaic: null | any;
}

export class App extends React.Component<{}, AppState> {
  seqNumber: number = 0;

  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      lightTheme: true,
      mosaic: null,
    };
  }

  private renderTile = (name: string, path: MosaicBranch[]): React.ReactElement => {
    return (
      <MosaicWindow<string>
        toolbarControls={name === 'B' ? <Button minimal={true} icon="help" /> : true}
        statusbar={name !== 'C'}
        name={name}
        statusbarControls={
          <ControlGroup fill={true} vertical={false}>
            <InputGroup disabled={true} placeholder="Find filters..." value={'Status Bar'} />
          </ControlGroup>
        }
        title={`Window title of node ${name}`}
        path={path}
        // tslint:disable-next-line:no-console
        onDragStart={() => console.log('MosaicWindow.onDragStart')}
        // tslint:disable-next-line:no-console
        onDragEnd={(type) => console.log('MosaicWindow.onDragEnd', type)}
      >
        <div className="example-window">
          <h1>{`Window content of node "${name}"`}</h1>
        </div>
      </MosaicWindow>
    );
  };

  private setMosaicRef = (mosaic: any) => {
    this.setState({ mosaic });
  };

  private nodeCreator = (nodeName: string): MosaicNode<string> => {
    ++this.seqNumber;
    const unique: string = `${nodeName}${this.seqNumber}`;
    this.state.mosaic.addToTopRight(unique);
    return unique;
  };

  private themeSwitch = () => {
    this.setState({
      lightTheme: !this.state.lightTheme,
    });
  };

  render() {
    return (
      <div className="react-mosaic-app">
        <AppHeader
          lightTheme={this.state.lightTheme}
          mosaic={this.state.mosaic}
          nodeCreator={this.nodeCreator}
          themeSwitch={this.themeSwitch}
        />
        <Mosaic<string>
          setRef={this.setMosaicRef}
          renderTile={this.renderTile}
          zeroStateView={<MosaicZeroState createNode={() => this.nodeCreator('dummy')} />}
          // value={this.state.currentNode}
          // onChange={this.changeCurrentNode}
          initialValue={'joł'}
          // onRelease={this.onRelease}
          className={classNames('mosaic-blueprint-theme', this.state.lightTheme ? null : Classes.DARK)}
        />
      </div>
    );
  }

  // private changeCurrentNode = (currentNode: MosaicNode<string> | null) => {
  //   this.setState({ currentNode });
  // };

  // private onRelease = (currentNode: MosaicNode<string> | null) => {
  //   // tslint:disable-next-line:no-console
  //   console.log('Mosaic.onRelease():', currentNode);
  // };
}
