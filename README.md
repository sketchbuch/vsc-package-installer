# VSC Packages

**(vsc-packages)**

A VSC extension to list packages from package.json and search for and install packages.

**This is a work-in-progress and began so that I could learn how to make web views and tree views for VSC extensions.**

![alt text](https://raw.githubusercontent.com/sketchbuch/vsc-packages/master/docs/images/vsc-packages-ani.gif 'VSC Packages')

## How to use

This extension will add a new sidebar to VSC that lists all workspace folders. Selecting a folder will list all the dependencies contained within the package.json file with a link to the relevant NPM page. You can also view more details within VSC by clicking on one of the dependencies.

Doing so opens a new editor showing information obtained from the NPM registry including the readme, version history - with links to each version's NPM page and links to contact developers involved with the package.

Other links to the package's repository and bug tracker are also provided

A command is provided to search NPM (a setting is available to set if yarn or npm should be used)

## Todo

- Add ability to move packages between dependency types (like from devDependencies to optional dendencies)
- Scroll to start of newely loaded page when searching
- Show in search results if a package is installed
- Display an alert if a package is installed twice
- Add ability to install a specific version or upgrade to a specific version
- Show uninstalled packages differently in the sidebar
- Show out-of-date packages differently in the sidebar
- Show unused packages differently in the sidebar
- Cache package data from NPM for a short time
- Cache selected tab in the revive state so that on revival the last active tab can be selected

## Done

- ~~Translate extension~~ **DONE**
- ~~Install NPM packages~~ **DONE**
- ~~Add a file watcher to update the sidebar if the package.json file changes~~ **DONE**
- ~~Add search functionality - as tree views can't show a search box this will probably be in a web view.~~ **DONE**
- ~~Support different repos in the same worksapce. Currently it only works with one folder in the workspace, to support multiple workspace folders with their own package.json some kind of selector would need to be added (a bit like in the SCM)~~ **DONE**

## Translations

This extension is localised, if you want it in your language please send me a translated "package.nls.json" file which you can find in the root of this extension. A basic german translation is provided, but as german is not my native langauge feel free to submit corrections.

## Latest Version

#### [1.4.1](https://github.com/sketchbuch/vsc-packages/compare/v1.4.0...v1.4.1) - 2020-06-18

- Fixed open npm URL not working - see PR #103 from https://github.com/arjunkesava
