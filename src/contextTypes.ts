import PropTypes from 'prop-types';
import React from 'react';
import { MosaicKey, MosaicNode, MosaicPath, MosaicUpdate, MosaicWindowInfo } from './types';

/**
 * Mosaic provides functionality on the context for components within
 * Mosaic to affect the view state.
 */

/**
 * Context provided to everything within Mosaic
 */
export interface MosaicContext<T extends MosaicKey> {
  mosaicActions: MosaicRootActions<T>;
  mosaicId: string;
}

/**
 * Context provided to everything within a Mosaic Window
 */
export interface MosaicWindowContext<T extends MosaicKey> extends MosaicContext<T> {
  mosaicWindowActions: MosaicWindowActions;
}

/**
 * These actions are used to alter the state of the view tree
 */
export interface MosaicRootActions<T extends MosaicKey> {
  /**
   * Increases the size of this node and bubbles up the tree
   * @param path Path to node to expand
   * @param percentage Every node in the path up to root will be expanded to this percentage
   */
  expand: (path: MosaicPath, percentage?: number) => void;
  /**
   * Remove the node at `path`
   * @param path
   */
  remove: (path: MosaicPath) => void;
  /**
   * Hide the node at `path` but keep it in the DOM. Used in Drag and Drop
   * @param path
   */
  hide: (path: MosaicPath) => void;
  /**
   * Replace currentNode at `path` with `node`
   * @param path
   * @param node
   */
  replaceWith: (path: MosaicPath, node: MosaicNode<T>) => void;
  /**
   * Atomically applies all updates to the current tree
   * @param updates
   * @param suppressOnRelease (default: false)
   */
  updateTree: (updates: MosaicUpdate<T>[], suppressOnRelease?: boolean) => void;
  /**
   * Returns the root of this Mosaic instance
   */
  getRoot: () => MosaicNode<T> | null;
  /**
   * Returns the path to single window if one of them is expanded else null
   */
  setAll: () => void;
  setSingle: (node: MosaicNode<T> | null) => void;
}

export interface MosaicWindowActions {
  /**
   * Sets the expanded state for the window
   */
  setExpanded: (expanded: boolean) => void;
  /**
   * Returns the info to this window
   */
  getInfo: () => MosaicWindowInfo;
  /**
   * Returns the info to this window
   */
  isExpanded: () => boolean;
  /**
   * Returns the path to this window
   */
  getPath: () => MosaicPath;
  /**
   * Enables connecting a different drag source besides the react-mosaic toolbar
   */
  connectDragSource: (connectedElements: React.ReactElement<any>) => React.ReactElement<any>;
}

/*************************************************************
 * PropTypes for React `contextTypes`
 */

export const MosaicActionsPropType = PropTypes.shape({
  expand: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  hide: PropTypes.func.isRequired,
  replaceWith: PropTypes.func.isRequired,
  updateTree: PropTypes.func.isRequired,
  getRoot: PropTypes.func.isRequired,
  setSingle: PropTypes.func.isRequired,
  setAll: PropTypes.func.isRequired,
}).isRequired;

export const MosaicWindowActionsPropType = PropTypes.shape({
  getPath: PropTypes.func.isRequired,
  getInfo: PropTypes.func.isRequired,
  connectDragSource: PropTypes.func.isRequired,
}).isRequired;

/*************************************************************
 * Bundled PropTypes for convenience
 */

export const MosaicContext = {
  mosaicActions: MosaicActionsPropType,
  mosaicId: PropTypes.string.isRequired,
};

export const MosaicWindowContext = {
  ...MosaicContext,
  mosaicWindowActions: MosaicWindowActionsPropType,
};

/*************************************************************
 * Modern context
 */

export const ModernMosaicContext = React.createContext<MosaicContext<MosaicKey>>(undefined!);

export type ModernMosaicWindowContext = Pick<MosaicWindowContext<MosaicKey>, 'mosaicWindowActions'>;
export const ModernMosaicWindowContext = React.createContext<ModernMosaicWindowContext>(undefined!);
