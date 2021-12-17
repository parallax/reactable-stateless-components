// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const path = require("path");
const fs = require("fs");
const fse = require("fs-extra");

// const createDirectory = require('./createDirectory');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 *
 */

const validate = (name) => {
  if (!name) {
    return "Name is required";
  }
  if (name.includes(" ")) {
    return "Spaces are not allowed";
  }
  // no errors
  return null;
};

const extensionRoot = path.join(__dirname);

const fileExtensions = [
  { name: "component", template: `${extensionRoot}/` },
  { name: "container", template: `${extensionRoot}/` },
  { name: "styles", template: `${extensionRoot}/` },
  { name: "config", template: `${extensionRoot}/` },
];

const createDirectory = (componentName) => {
  const projectRoot = vscode.workspace.workspaceFolders[0].uri.path;

  fse.outputFile(`${projectRoot}/src/components/${componentName}/index.js`, `export { default } from './${componentName}.container.js'`, (err) => {
	if (err) {
	  console.log(
		err,
		`/${componentName}.${type.name}.js has not been created`
	  );
	} else {
	  console.log(`/${componentName}.${type.name}.js has been created`);
	}
  });

  fileExtensions.forEach((type) => {
    const filePath = `${projectRoot}/src/components/${componentName}/${componentName}.${type.name}.js`;
    fse.outputFile(filePath, "Hey there!", (err) => {
      if (err) {
        console.log(
          err,
          `/${componentName}.${type.name}.js has not been created`
        );
      } else {
        console.log(`/${componentName}.${type.name}.js has been created`);
      }
    });
  });

  vscode.window.showInformationMessage(
	`${componentName} Component has been created`
  );
};

function activate(context) {
  let disposable = vscode.commands.registerCommand(
    "reactable-stateless-components.createStatelessComponent",
    async function () {
      const name = await vscode.window.showInputBox({
        prompt: "Component Name",
        ignoreFocusOut: true,
        validateInput: validate,
      });



      createDirectory(name);
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
