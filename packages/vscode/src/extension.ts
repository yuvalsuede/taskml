import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  console.log('TaskML extension activated');

  // Register preview command
  const previewCommand = vscode.commands.registerCommand('taskml.preview', () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showInformationMessage('No TaskML file open');
      return;
    }

    // TODO: Implement preview panel
    vscode.window.showInformationMessage('TaskML Preview coming soon!');
  });

  // Register export command
  const exportCommand = vscode.commands.registerCommand('taskml.exportMarkdown', () => {
    // TODO: Implement markdown export
    vscode.window.showInformationMessage('Export to Markdown coming soon!');
  });

  context.subscriptions.push(previewCommand, exportCommand);
}

export function deactivate() {
  // Cleanup
}
