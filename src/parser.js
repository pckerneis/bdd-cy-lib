import { tokenize } from './tokenizer.js';

/**
 * @typedef {Object} Action
 * @property {string[]} target - target path
 * @property {string[]} action - action name
 * @property {any[]} args - action arguments
 */

/**
 * @typedef {Object} Assertion
 * @property {string[]} target - target path
 * @property {string[]} assertion - assertion name
 */

/**
 * @typedef {Object} Sentence
 * @property {Action[]} actions - actions
 * @property {Assertion[]} assertions - assertions
 */

export class Parser {
  sentence = '';

  /**
   * @type {Token[]}
   */
  tokens = [];

  index = 0;

  /**
   * @param {string} sentence - sentence to parse
   * @returns {Sentence} parsed sentence
   */
  parse(sentence) {
    this.sentence = sentence;
    this.tokens = tokenize(sentence);
    this.index = 0;

    if (this.tokens.length === 0) {
      throw new Error('Empty sentence');
    }

    this.consume('when', 'Expected "when"');

    // consume actions
    const actions = this.parseActions();

    return {
      actions,
      assertions: [],
    };
  }

  parseActions() {
    const actions = [];

    while (
      this.index < this.tokens.length &&
      this.tokens[this.index].value !== 'then'
    ) {
      this.consumeOptional('I');
      const action = this.consumeAction();
      const args = this.consumeQuotedArg();
      const target = this.consumeTarget();

      actions.push({
        target,
        action,
        args,
      });

      this.consumeOptional('and');
    }

    this.consume('then', 'Expected "then"');

    return actions;
  }

  consumeAction() {
    const action = [];

    while (
      this.index < this.tokens.length &&
      !['on', 'then'].includes(this.tokens[this.index].value) &&
      !isQuoted(this.tokens[this.index].value)
    ) {
      this.reject(['I', 'and'], 'Expected action');
      action.push(this.tokens[this.index]);
      this.index++;
    }

    if (action.length === 0) {
      this.error('Missing action');
    }

    return action;
  }

  consumeQuotedArg() {
    const args = [];

    if (isQuoted(this.tokens[this.index]?.value)) {
      args.push(this.tokens[this.index]);
      this.index++;
    }

    return args;
  }

  consumeTarget() {
    const target = [];

    if (this.tokens[this.index]?.value === 'on') {
      this.index++;

      while (
        this.index < this.tokens.length &&
        !['then', 'and'].includes(this.tokens[this.index].value) &&
        !isQuoted(this.tokens[this.index].value)
      ) {
        target.push(this.tokens[this.index]);
        this.index++;
      }
    }

    return target;
  }

  consume(expectedTokenValue, errorMessage) {
    if (this.tokens[this.index].value === expectedTokenValue) {
      this.index++;
    } else {
      this.error(errorMessage);
    }
  }

  consumeOptional(expectedTokenValue) {
    if (this.tokens[this.index].value === expectedTokenValue) {
      this.index++;
    }
  }

  reject(rejectedStrings, errorMessage) {
    if (rejectedStrings.includes(this.tokens[this.index].value)) {
      this.error(errorMessage);
    }
  }

  error(errorMessage) {
    throw new Error(errorMessage + '\n' + this.printErrorLocation());
  }

  printErrorLocation() {
    const index = this.index;
    const line = this.tokens[index].line;
    const column = this.tokens[index].column;
    const lineContent = this.sentence.split('\n')[line - 1];
    const pointer = ' '.repeat(column - 1) + '^';
    return `Line ${line}, column ${column}:\n${lineContent}\n${pointer}`;
  }
}

function isQuoted(str) {
  if (str == null) {
    return false;
  }

  return str.startsWith('"') && str.endsWith('"');
}
