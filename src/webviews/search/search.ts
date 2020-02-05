import * as vscode from 'vscode';
import { CMD_SEARCH_PACKAGES_WV, FS_FOLDER_CSS, FS_FOLDER_JS, SEARCH_LIMIT } from '../../constants';
import { defaultTemplate as template } from '../../templates/search';
import { getHtml } from '../../templates';
import { getResourceUri, searchNpm } from '../../utils';
import { PostMessage, SearchHtmlData, SearchPmPayload, SearchState, WebView } from '../../types';

const defaultState: SearchState = Object.freeze({
  data: undefined,
  error: undefined,
  loading: false,
  page: 1,
  sort: 'optimal',
  term: '',
});

export const search = (): WebView<{}> => {
  const disposables: vscode.Disposable[] = [];
  const viewType = CMD_SEARCH_PACKAGES_WV;
  let state: SearchState = { ...defaultState };
  let curContext: vscode.ExtensionContext;
  let curPanel: undefined | vscode.WebviewPanel = undefined;

  const createPanel = (): void => {
    curPanel = vscode.window.createWebviewPanel(
      viewType,
      'Packages: Search',
      vscode.ViewColumn.Active,
      {
        enableScripts: true,
        localResourceRoots: [
          getResourceUri(curContext.extensionPath, FS_FOLDER_CSS),
          getResourceUri(curContext.extensionPath, FS_FOLDER_JS),
        ],
      }
    );

    // Reset state in case editor was closed whilst displaying results
    state = { ...defaultState };

    setupPanel();
  };

  const setupPanel = (): void => {
    if (curPanel) {
      curPanel.webview.onDidReceiveMessage(
        (message: PostMessage<SearchPmPayload>) => {
          switch (message.action) {
            case 'clear':
              state = { ...defaultState };

              break;

            case 'more':
              if (message.payload.page) {
                state.loading = true;
                state.page = message.payload.page + 1;
              }
              break;

            case 'sort':
              if (message.payload.sort) {
                if (state.term !== '') {
                  state.loading = true;
                }

                state.page = 1;
                state.sort = message.payload.sort;
              }
              break;

            case 'search':
            default:
              if (message.payload.term) {
                if (message.payload.term !== state.term) {
                  state.data = undefined;
                  state.page = 1;
                }

                state.loading = true;
                state.term = message.payload.term.toLocaleLowerCase();
              }
              break;
          }

          loadPanelContent();
        },
        undefined,
        curContext.subscriptions
      );

      update();

      curPanel.onDidDispose(dispose, null, disposables);
      curPanel.onDidChangeViewState(
        () => {
          if (curPanel && curPanel.visible) {
            update();
          }
        },
        null,
        disposables
      );
    }
  };

  const dispose = (): void => {
    if (curPanel) {
      curPanel.dispose();
      curPanel = undefined;
    }

    disposables.forEach((disposable: vscode.Disposable) => {
      disposable.dispose();
    });
  };

  const loadPanelContent = (): void => {
    if (!state.loading) {
      updatePanelContent();
    } else {
      updatePanelContent();

      state.error = undefined;

      searchNpm(state.term, {
        from: (state.page - 1) * SEARCH_LIMIT,
        limit: SEARCH_LIMIT,
        sortBy: state.sort,
      })
        .then(data => {
          state.data = state.data && state.page > 1 ? [...state.data, ...data] : [...data];
        })
        .catch((error: Error) => {
          state.error = error;
        })
        .finally(() => {
          state.loading = false;
          updatePanelContent();
        });
    }
  };

  const update = (): void => {
    loadPanelContent();
  };

  const updatePanelContent = (): void => {
    if (curPanel) {
      curPanel.webview.html = getHtml<SearchHtmlData>({
        extensionPath: curContext.extensionPath,
        template,
        htmlData: {
          state,
        },
      });
    }
  };

  const webView: WebView<{}> = {
    getViewType: () => viewType,

    show: (context: vscode.ExtensionContext, data: {}): void => {
      curContext = context;

      if (curPanel === undefined) {
        createPanel();
      }

      if (curPanel) {
        const column = vscode.window.activeTextEditor
          ? vscode.window.activeTextEditor.viewColumn
          : undefined;

        loadPanelContent();
        curPanel.reveal(column);
      }
    },

    revive: (
      context: vscode.ExtensionContext,
      revivedPanel: vscode.WebviewPanel,
      data: {}
    ): void => {
      curContext = context;
      curPanel = revivedPanel;

      setupPanel();
    },
  };

  return webView;
};

export const searchWebview = search();
