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
  { name: "test", template: `stateless-tests.js` },
];

const projectRoot = vscode.workspace.workspaceFolders[0].uri.path;

const formatComponentName = (componentName) => {
  return `${componentName[0].toUpperCase()}${componentName.substring(1)}`;
};

const checkForSettingsFile = () => {
  const dir = `${projectRoot}/.vscode/settings.json`;
  if (fs.existsSync(dir)) {
  } else {
    // vscode.window.showInformationMessage(
    // 	`Please configure your stateless components`
    //   );
    
    console.log("no file exists");
    const ask = async () => {
      const pathToComponents = await vscode.window.showInputBox({
        prompt: "Where is your component folder located",
        ignoreFocusOut: true,
      });

      // "|| "src/components""
      const json = `{"reactable-stateless-components-path":"${pathToComponents}"}`;

      fse.outputFile(`${projectRoot}/.vscode/settings.json`, json, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
    };
    ask();
  }
};

const createDirectory = (componentName) => {
  fse.outputFile(
    `${projectRoot}/web/components/@common/${componentName}/index.js`,
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
    const filePath = `${projectRoot}/web/components/@common/${componentName}/${componentName}.${type.name}.js`;

    const fileContents = fs.readFileSync(
      path.resolve(`${extensionRoot}/templates/${type.template}`),
      "utf8"
    );

    const newFileContents = fileContents.replaceAll("Tester", componentName);

    fse.outputFile(filePath, newFileContents, (err) => {
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

      const filePath = "/components";

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
