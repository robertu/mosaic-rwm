import classNames from 'classnames';
import countBy from 'lodash/countBy';
import keys from 'lodash/keys';
import dropRight from 'lodash/dropRight';
import pickBy from 'lodash/pickBy';
import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5 from 'react-dnd-html5-backend';
import { v4 as uuid } from 'uuid';
import { ModernMosaicContext, MosaicContext, MosaicRootActions } from './contextTypes';
import { MosaicRoot } from './MosaicRoot';
import { MosaicZeroState } from './MosaicZeroState';
import { RootDropTargets } from './RootDropTargets';
import { MosaicKey, MosaicNode, MosaicPath, MosaicUpdate, ResizeOptions, TileRenderer, MosaicDirection, MosaicParent } from './types';
import { createExpandUpdate, createHideUpdate, createRemoveUpdate, updateTree } from './util/mosaicUpdates';
import { getLeaves, createBalancedTreeFromLeaves, Corner, getNodeAtPath, getOtherDirection, getPathToCorner } from './util/mosaicUtilities';

const DEFAULT_EXPAND_PERCENTAGE = 80;

export interface MosaicBaseProps<T extends MosaicKey> {
  /**
   * Set Mosaic reference to itself in didMount`
   */
  setRef: (ref: any) => void;
  /**
   * Lookup function to convert `T` to a displayable `JSX.Element`
   */
  renderTile: TileRenderer<T>;
  /**
   * Called when a user initiates any change to the tree (removing, adding, moving, resizing, etc.)
   */
  onChange?: (newNode: MosaicNode<T> | null) => void;
  /**
   * Called when a user completes a change (fires like above except for the interpolation during resizing)
   */
  onRelease?: (newNode: MosaicNode<T> | null) => void;
  /**
   * Additional classes to affix to the root element
   * Default: 'mosaic-blueprint-theme'
   */
  className?: string;
  /**
   * Options that control resizing
   * @see: [[ResizeOptions]]
   */
  resize?: ResizeOptions;
  /**
   * View to display when the current value is `null`
   * default: Simple NonIdealState view
   */
  zeroStateView?: JSX.Element;
}

export interface MosaicControlledProps<T extends MosaicKey> extends MosaicBaseProps<T> {
  /**
   * The tree to render
   */
  value: MosaicNode<T> | null;
  onChange: (newNode: MosaicNode<T> | null) => void;
}

export interface MosaicUncontrolledProps<T extends MosaicKey> extends MosaicBaseProps<T> {
  /**
   * The initial tree to render, can be modified by the user
   */
  initialValue: MosaicNode<T> | null;
}

export type MosaicProps<T extends MosaicKey> = MosaicControlledProps<T> | MosaicUncontrolledProps<T>;

function isUncontrolled<T extends MosaicKey>(props: MosaicProps<T>): props is MosaicUncontrolledProps<T> {
  return (props as MosaicUncontrolledProps<T>).initialValue != null;
}

export interface MosaicState<T extends MosaicKey> {
  singleNode: MosaicNode<T> | null;
  savedNode: MosaicNode<T> | null;
  currentNode: MosaicNode<T> | null;
  mosaicId: string;
}

export class MosaicWithoutDragDropContext<T extends MosaicKey = string> extends React.PureComponent<MosaicProps<T>, MosaicState<T>> {
  static defaultProps = {
    onChange: () => void 0,
    zeroStateView: <MosaicZeroState />,
    className: 'mosaic-blueprint-theme',
  };

  static childContextTypes = MosaicContext;

  static ofType<T extends MosaicKey>() {
    return MosaicWithoutDragDropContext as new (props: MosaicProps<T>, context?: any) => MosaicWithoutDragDropContext<T>;
  }

  state: MosaicState<T> = {
    singleNode: null,
    savedNode: null,
    currentNode: null,
    mosaicId: uuid(),
  };

  getChildContext(): MosaicContext<T> {
    return this.childContext;
  }

  render() {
    const { className } = this.props;

    return (
      <ModernMosaicContext.Provider value={this.childContext as MosaicContext<any>}>
        <div className={classNames(className, 'mosaic mosaic-drop-target')}>
          {this.renderTree()}
          <RootDropTargets />
        </div>
      </ModernMosaicContext.Provider>
    );
  }

  componentWillReceiveProps(nextProps: MosaicProps<T>) {
    if (isUncontrolled(nextProps) && nextProps.initialValue !== (this.props as MosaicUncontrolledProps<T>).initialValue) {
      this.setState({ currentNode: nextProps.initialValue });
    }
  }

  componentWillMount() {
    if (isUncontrolled(this.props)) {
      this.setState({ currentNode: this.props.initialValue });
    }
  }

  componentDidMount() {
    if (this.props.setRef) {
      this.props.setRef(this);
    }
  }

  public autoArrange = () => {
    if (!isUncontrolled(this.props)) {
      return;
    }
    const leaves = getLeaves(this.state.currentNode);
    this.setState({
      currentNode: createBalancedTreeFromLeaves(leaves),
    });
  };

  public addToTopRight = (node: MosaicNode<T>) => {
    const created: MosaicNode<T> = node as MosaicNode<T>;
    // const created = this.createNodeContent(name);
    let { currentNode } = this.state;
    if (currentNode) {
      const path = getPathToCorner(currentNode, Corner.TOP_RIGHT);
      const parent = getNodeAtPath(currentNode, dropRight(path)) as MosaicParent<T>;
      const destination = getNodeAtPath(currentNode, path) as MosaicNode<T>;
      const direction: MosaicDirection = parent ? getOtherDirection(parent.direction) : 'row';

      let first: MosaicNode<T>;
      let second: MosaicNode<T>;
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

  private getRoot(): MosaicNode<T> | null {
    if (isUncontrolled(this.props)) {
      return this.state.currentNode;
    } else {
      return this.props.value;
    }
  }

  private setAll() {
    const { savedNode } = this.state;
    if (isUncontrolled(this.props)) {
      this.setState({ currentNode: savedNode, savedNode: null });
    }
  }

  private setSingle(singleNode: MosaicNode<T> | null) {
    const { currentNode } = this.state;
    if (isUncontrolled(this.props)) {
      this.setState({ currentNode: singleNode, savedNode: currentNode });
    }
  }

  private updateRoot = (updates: MosaicUpdate<T>[], suppressOnRelease: boolean = false) => {
    const currentNode = this.getRoot() || ({} as MosaicNode<T>);

    this.replaceRoot(updateTree(currentNode, updates), suppressOnRelease);
  };

  private replaceRoot = (currentNode: MosaicNode<T> | null, suppressOnRelease: boolean = false) => {
    this.props.onChange!(currentNode);
    if (!suppressOnRelease && this.props.onRelease) {
      this.props.onRelease(currentNode);
    }

    if (isUncontrolled(this.props)) {
      this.setState({ currentNode });
    }
  };

  private actions: MosaicRootActions<T> = {
    updateTree: this.updateRoot,
    remove: (path: MosaicPath) => {
      if (path.length === 0) {
        this.replaceRoot(null);
      } else {
        this.updateRoot([createRemoveUpdate(this.getRoot(), path)]);
      }
    },
    expand: (path: MosaicPath, percentage: number = DEFAULT_EXPAND_PERCENTAGE) => this.updateRoot([createExpandUpdate<T>(path, percentage)]),
    getRoot: () => this.getRoot()!,
    setSingle: (node: MosaicNode<T> | null) => this.setSingle(node),
    setAll: () => this.setAll(),
    hide: (path: MosaicPath) => this.updateRoot([createHideUpdate<T>(path)]),
    replaceWith: (path: MosaicPath, newNode: MosaicNode<T>) =>
      this.updateRoot([
        {
          path,
          spec: {
            $set: newNode,
          },
        },
      ]),
  };

  private readonly childContext: MosaicContext<T> = {
    mosaicActions: this.actions,
    mosaicId: this.state.mosaicId,
  };

  private renderTree() {
    const root = this.getRoot();
    this.validateTree(root);
    if (root === null || root === undefined) {
      return this.props.zeroStateView!;
    } else {
      const { renderTile, resize } = this.props;
      return <MosaicRoot root={root} renderTile={renderTile} resize={resize} />;
    }
  }

  private validateTree(node: MosaicNode<T> | null) {
    if (process.env.NODE_ENV !== 'production') {
      const duplicates = keys(pickBy(countBy(getLeaves(node)), (n) => n > 1));

      if (duplicates.length > 0) {
        throw new Error(`Duplicate IDs [${duplicates.join(', ')}] detected. Mosaic does not support leaves with the same ID`);
      }
    }
  }
}

@(DragDropContext(HTML5) as ClassDecorator)
export class Mosaic<T extends MosaicKey = string> extends MosaicWithoutDragDropContext<T> {
  static ofType<T extends MosaicKey>() {
    return Mosaic as new (props: MosaicProps<T>, context?: any) => Mosaic<T>;
  }
}

// Factory that works with generics
export function MosaicFactory<T extends MosaicKey = string>(props: MosaicProps<T> & React.Attributes, ...children: React.ReactNode[]) {
  const element: React.ReactElement<MosaicProps<T>> = React.createElement(Mosaic as React.ComponentClass<MosaicProps<T>>, props, ...children);
  return element;
}
