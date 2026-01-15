#!/usr/bin/env node
import { Command } from 'commander';
import { parse, render, VERSION } from '@taskml/core';
import * as fs from 'fs';

const program = new Command();

program
  .name('taskml')
  .description('TaskML CLI - Parse and render TaskML files')
  .version(VERSION);

program
  .command('parse <file>')
  .description('Parse a TaskML file and output JSON')
  .option('-o, --output <file>', 'Output file (default: stdout)')
  .action((file: string, options: { output?: string }) => {
    const content = fs.readFileSync(file, 'utf-8');
    const result = parse(content);

    const output = JSON.stringify(result, null, 2);

    if (options.output) {
      fs.writeFileSync(options.output, output);
      console.log(`Output written to ${options.output}`);
    } else {
      console.log(output);
    }
  });

program
  .command('render <file>')
  .description('Render a TaskML file to HTML or Markdown')
  .option('-f, --format <format>', 'Output format (html, markdown, json)', 'html')
  .option('-v, --view <view>', 'View type (list, kanban, tree, timeline)', 'list')
  .option('-o, --output <file>', 'Output file (default: stdout)')
  .action((file: string, options: { format: string; view: string; output?: string }) => {
    const content = fs.readFileSync(file, 'utf-8');
    const result = parse(content);

    if (!result.document) {
      console.error('Parse errors:', result.errors);
      process.exit(1);
    }

    const output = render(result.document, {
      format: options.format as 'html' | 'markdown' | 'json',
      view: options.view as 'list' | 'kanban' | 'tree' | 'timeline',
    });

    if (options.output) {
      fs.writeFileSync(options.output, output);
      console.log(`Output written to ${options.output}`);
    } else {
      console.log(output);
    }
  });

program
  .command('validate <file>')
  .description('Validate a TaskML file')
  .action((file: string) => {
    const content = fs.readFileSync(file, 'utf-8');
    const result = parse(content, { strict: true });

    if (result.errors.length === 0) {
      console.log('✓ Valid TaskML file');
    } else {
      console.log('✗ Validation errors:');
      result.errors.forEach(e => {
        console.log(`  Line ${e.line}: ${e.message}`);
      });
      process.exit(1);
    }
  });

program.parse();
