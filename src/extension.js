const vscode = require("vscode");
const path = require("path");
const fse = require("fs-extra");
const fs = require("fs");
// const templateFile = require('./templates/stateless-container');

// const createDirectory = require('./createDirectory');

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
  if (name.match(/\W/)) {
    return "Special Characters are not allowed";
  }
  // no errors
  return null;
};

const extensionRoot = path.join(__dirname);

const fileExtensions = [
  { name: "component", template: `stateless-component.js` },
  { name: "container", template: `stateless-container.js` },
  { name: "styles", template: `stateless-styles.js` },
  { name: "config", template: `stateless-config.js` },
];

const projectRoot = vscode.workspace.workspaceFolders[0].uri.path;

const formatComponentName = (componentName) => {
  return `${componentName[0].toUpperCase()}${componentName.substring(1)}`;
};

const checkForSettingsFile = (filePath) => {
  console.log('CHECKING FOR SETTINGS')
  console.log('filepath is also', filePath);
  const dir = `projectRoot/.vscode/settings.json`;
  // if (fs.existsSync(dir)) {
  //   console.log('file exists');
  // } else {

      const json = `{
    "reactable-stateless-components-isSetUp": true,
    "reactable-stateless-components-path": "${filePath}"
  }`;
  
      fse.outputFile(`${projectRoot}/.vscode/settings.json`, json, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
    // };

};

const createDirectory = (componentName, componentDirectory) => {
  fse.outputFile(
    `${projectRoot}/${componentDirectory}/${componentName}/index.js`,
    `export { default } from './${componentName}.container.js'`,
    (err) => {
      if (err) {
        console.log(err, `/${componentName}.index.js has not been created`);
      } else {
        console.log(`/${componentName}.index.js has been created`);
      }
    }
  );

  fileExtensions.forEach((type) => {
    const filePath = `${projectRoot}/${componentDirectory}/${componentName}/${componentName}.${type.name}.js`;
    // const template = require(type.template)

    const fileContents = fs.readFileSync(path.resolve(`${extensionRoot}/templates/${type.template}`), 'utf8')

    fse.outputFile(filePath, fileContents, (err) => {
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
  checkForSettingsFile();

  let disposable = vscode.commands.registerCommand(
    "reactable-stateless-components.createStatelessComponent",
    async function () {
      const name = await vscode.window.showInputBox({
        prompt: "Component Name",
        ignoreFocusOut: true,
        validateInput: validate,
      });

      // const filePath = await vscode.window.showInputBox({
      //   prompt: "relative path to your components folder, default is src/components",
      //   ignoreFocusOut: true,
      // });

      // checkForSettingsFile(filePath||'src/components')

      const filePath = 'src/components'

      const formattedComponentName = formatComponentName(name);

      createDirectory(formattedComponentName, filePath);
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
