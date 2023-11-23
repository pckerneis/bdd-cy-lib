import { CodeLocation, prettyPrintError } from './error';
import { Token } from './interfaces/token.interface';

export function isNamedArgument(str: string): boolean {
  return str.startsWith('{{') && str.endsWith('}}');
}

export function withoutMoustaches(str: string): string {
  if (isNamedArgument(str)) {
    return str.slice(2, -2);
  }

  return str;
}

export function withNamedArgumentsRemoved(str: string): string {
  return str.replace(/{{(.*?)}}/g, '');
}

export function interpolate(
  str: string,
  args: Record<string, string>,
  token: Token,
  input: string,
): string {
  return str.replace(/{{(.*?)}}/g, (_, arg) => {
    if (args[arg]) {
      return args[arg];
    }

    const location: CodeLocation = {
      line: token.line,
      column: token.column + token.value.indexOf(`{{${arg}}}`),
    };

    throw new Error(
      prettyPrintError(`Unknown argument "${arg}"`, input, location),
    );
  });
}
