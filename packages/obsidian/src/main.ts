import { Plugin, MarkdownPostProcessorContext } from 'obsidian';

export default class TaskMLPlugin extends Plugin {
  async onload() {
    console.log('Loading TaskML plugin');

    // Register code block processor for taskml
    this.registerMarkdownCodeBlockProcessor(
      'taskml',
      (source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => {
        this.renderTaskML(source, el);
      }
    );
  }

  onunload() {
    console.log('Unloading TaskML plugin');
  }

  private renderTaskML(source: string, el: HTMLElement) {
    // TODO: Implement TaskML rendering
    const container = el.createDiv({ cls: 'taskml-container' });
    container.createEl('pre', { text: source, cls: 'taskml-preview' });
  }
}
