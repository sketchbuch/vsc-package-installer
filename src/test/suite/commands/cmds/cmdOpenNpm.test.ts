import * as sinon from 'sinon';
import * as vscode from 'vscode';
import { CMD_VSCODE_OPEN, URL_NPM } from '../../../../constants';
import { cmdOpenNpm } from '../../../../commands';
import { packageName } from '../../../mocks';
import { PackageListItem } from '../../../../treeviews';

suite('cmdOpenNpm()', () => {
  test('Calls vscode.commands.executeCommand()', () => {
    const spy = sinon.stub(vscode.commands, 'executeCommand');
    cmdOpenNpm({ label: packageName } as PackageListItem);

    sinon.assert.callCount(spy, 1);
    sinon.assert.calledWith(spy, CMD_VSCODE_OPEN);
    spy.restore();
  });

  test('Calls vscode.Uri.parse()', () => {
    const spy = sinon.stub(vscode.Uri, 'parse');
    cmdOpenNpm({ label: packageName } as PackageListItem);

    sinon.assert.callCount(spy, 1);
    sinon.assert.calledWith(spy, `${URL_NPM}${packageName}`);
    spy.restore();
  });
});
