import * as vscode from 'vscode';
import {
  EXT_PACKAGELIST_ITEM_CTX,
  FS_FOLDER_IMAGES_DARK,
  FS_FOLDER_IMAGES_LIGHT,
} from '../../constants';
import { getImagePath } from '../../utils';

export class Package extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly version: string,
    public readonly extensionPath: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly command?: vscode.Command
  ) {
    super(label, collapsibleState);
  }

  get tooltip(): string {
    return `${this.label} (${this.version})`;
  }

  get description(): string {
    return `${this.version}`;
  }

  iconPath = {
    light: getImagePath(this.extensionPath, FS_FOLDER_IMAGES_LIGHT, 'dep.svg'),
    dark: getImagePath(this.extensionPath, FS_FOLDER_IMAGES_DARK, 'dep.svg'),
  };

  contextValue = EXT_PACKAGELIST_ITEM_CTX;
}
