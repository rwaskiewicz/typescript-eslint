import {
  expectToBeBlockScope,
  expectToBeFunctionScope,
  expectToBeGlobalScope,
  expectToBeWithScope,
} from './util/expect';
import { parse } from './util/parse';
import { analyze } from '../../src/analyze';

describe('with', () => {
  it('creates scope', () => {
    const ast = parse(
      `
            (function () {
                with (obj) {
                    testing;
                }
            }());
        `,
      'script',
    );

    const scopeManager = analyze(ast);

    expect(scopeManager.scopes).toHaveLength(4);

    let scope = scopeManager.scopes[0];
    expectToBeGlobalScope(scope);
    expect(scope.variables).toHaveLength(0);
    expect(scope.references).toHaveLength(0);

    scope = scopeManager.scopes[1];
    expectToBeFunctionScope(scope);
    expect(scope.variables).toHaveLength(1);
    expect(scope.variables[0].name).toBe('arguments');
    expect(scope.isArgumentsMaterialized()).toBeFalsy();
    expect(scope.references).toHaveLength(1);
    expect(scope.references[0].resolved).toBeNull();

    scope = scopeManager.scopes[2];
    expectToBeWithScope(scope);
    expect(scope.variables).toHaveLength(0);
    expect(scope.isArgumentsMaterialized()).toBeTruthy();
    expect(scope.references).toHaveLength(0);

    scope = scopeManager.scopes[3];
    expectToBeBlockScope(scope);
    expect(scope.variables).toHaveLength(0);
    expect(scope.isArgumentsMaterialized()).toBeTruthy();
    expect(scope.references).toHaveLength(1);
    expect(scope.references[0].identifier.name).toBe('testing');
    expect(scope.references[0].resolved).toBeNull();
  });
});