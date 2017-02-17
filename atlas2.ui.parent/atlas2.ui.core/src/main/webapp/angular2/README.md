ATLAS 2 UI SETUP / EXECUTION INSTRUCTIONS

Variables used in this document:

- ${atlas2.svn.home} is the folder the atlas2 svn trunk was checked out into
- ${atlas2.ui.home} is ${atlas2.svn.home}/atlas2.ui.parent/atlas2.ui.core/src/main/webapp/angular2

[INITIAL SETUP]

1) install NPM: https://docs.npmjs.com/getting-started/installing-node
2) run 'npm install' in ${atlas2.ui.home} to install node modules
3) one of the node libraries "jasmine" is currently broken (Feb 13, 2017), unzip the ${atlas2.ui.home} 'jasmine-fix.zip' file into ${atlas2.home}/node_modules/@types to fix the broken 'index.d.ts' file there
4) run 'npm start' in ${atlas2.ui.home} to start the UI

Reference: angular 2 env setup guide: https://angular.io/docs/ts/latest/guide/setup.html

[RUNNING THE UI]

1) build all of the atlas 2 maven projects by executing 'mvn clean install' in ${atlas2.svn.home}

2) run 'mvn jetty:run' in ${atlas2.svn.home}/atlas2.java.parent/atlas2.java.service

	This will host the java inspection rest service on port 8585, example url to test that it's up:

	http://localhost:8585/v2/atlas/java/class?className=com.mediadriver.atlas.java.service.v2.TestAddress

3) run 'npm start' in a terminal from ${atlas2.ui.home} to start the UI

	This should automatically open the ui in your browser with a "Angular Quickstart" tab, if it doesn't, open this URL in a tab:

	http://localhost:3000/

[TROUBLESHOOTING]

#1: Compile errors: If the UI doesn't run, check the terminal window where you ran 'npm start', there may be compilation errors reported there even if it attempts to run the UI successfully without exiting with error.

#2: Check the console window of chrome's developer tools window for errors, this is found via the chrome "view->developer->developer tools" menu, the javascript console will be on the bottom of the tab you've opened the tools in.