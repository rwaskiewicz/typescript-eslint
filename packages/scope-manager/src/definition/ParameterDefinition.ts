import { TSESTree } from '@typescript-eslint/experimental-utils';
import { DefinitionType } from './DefinitionType';
import { DefinitionBase } from './DefinitionBase';

class ParameterDefinition extends DefinitionBase<
  DefinitionType.Parameter,
  | TSESTree.ArrowFunctionExpression
  | TSESTree.FunctionDeclaration
  | TSESTree.FunctionExpression
  | TSESTree.TSDeclareFunction
  | TSESTree.TSEmptyBodyFunctionExpression,
  null
> {
  /**
   * Whether the parameter definition is a part of a rest parameter.
   */
  public readonly rest: boolean;
  constructor(
    name: TSESTree.BindingName,
    node: ParameterDefinition['node'],
    rest: boolean,
  ) {
    super(DefinitionType.Parameter, name, node, null);
    this.rest = rest;
  }

  public readonly isTypeDefinition = false;
  public readonly isVariableDefinition = true;
}

export { ParameterDefinition };