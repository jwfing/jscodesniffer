/*
 * @package jscodesniffer
 * @author sheiko
 * @license MIT
 * @copyright (c) Dmitry Sheiko http://www.dsheiko.com
 * @jscs standard:Jquery
 * Code style: http://docs.jquery.com/JQuery_Core_Style_Guidelines
 */

// UMD boilerplate according to https://github.com/umdjs/umd
if ( typeof module === 'object' && typeof define !== 'function' ) {
    var define = function ( factory ) {
        module.exports = factory( require, exports, module );
    };
}
define( function ( require, exports, module ) {
  return {
    "IndentationWithTabs" : "Only tabs allowed for indentation",
    "IndentationWithSpaces" : "Only spaces allowed for indentation",
    "ObjectPropertyKeyPrecedingSpacing" : "There must be [color:underline]{expected}[/color] whitespace(s) preceding object property key; [color:underline]{actual}[/color] found",
    "ObjectPropertyKeyTrailingSpacing" : "There must be [color:underline]{expected}[/color] whitespace(s) trailing object property key; [color:underline]{actual}[/color] found",
    "ObjectPropertyValuePrecedingSpacing" : "There must be [color:underline]{expected}[/color] whitespace(s) preceding object property value; [color:underline]{actual}[/color] found",
    "ObjectPropertyValueTrailingSpacing" : "There must be [color:underline]{expected}[/color] whitespace(s) trailing object property value; [color:underline]{actual}[/color] found",
    "FunctionNamingConventions" : "Function names must be in [color:underline]{expected}[/color] case.",
    "FunctionNamingRepeatingUppercase" : "Function names must not have repeating uppercase.",
    "FunctionNamingNumbersNotAllowed" : "Function names must not have numbers.",
    "VariableNamingConventions" : "Variable names must be in [color:underline]{expected}[/color] case; [color:yellow]'{actual}'[/color] found",
    "VariableNamingRepeatingUppercase" : "Variable names must not have repeating uppercase; [color:yellow]'{actual}'[/color] found",
    "VariableNamingNumbersNotAllowed" : "Variable names must not have numbers; [color:yellow]'{actual}'[/color] found",
    "UnaryExpressionValueTrailingSpacing" : "There must be [color:underline]{expected}[/color] whitespace(s) trailing unary expression; [color:underline]{actual}[/color] found",
    "CompoundStatementRequireBraces": "Compound statements require braces",
    "CompoundStatementRequireMultipleLines": "Compound statements always go on multiple lines",

    "TernaryConditionalTestTrailingWhitespaces": "There must be [color:underline]{expected}[/color] whitespace(s) preceding '?' punctuator; [color:underline]{actual}[/color] found",
    "TernaryConditionalConsequentPrecedingWhitespaces": "There must be [color:underline]{expected}[/color] whitespace(s) trailing '?' punctuator; [color:underline]{actual}[/color] found",
    "TernaryConditionalConsequentTrailingWhitespaces": "There must be [color:underline]{expected}[/color] whitespace(s) preceding ':' punctuator; [color:underline]{actual}[/color] found",
    "TernaryConditionalAlternatePrecedingWhitespaces": "There must be [color:underline]{expected}[/color] whitespace(s) trailing ':' punctuator; [color:underline]{actual}[/color] found",

    "EmptyConstructsSpacing": "There must be no whitespaces in empty constructs; [color:underline]{actual}[/color] found",
    "ArraylElementPrecedingSpacing" : "There must be [color:underline]{expected}[/color] whitespace(s) preceding array element; [color:underline]{actual}[/color] found",
    "ArraylElementTrailingSpacing" : "There must be [color:underline]{expected}[/color] whitespace(s) trailing array element; [color:underline]{actual}[/color] found",
    "QuoteConventionsDoubleQuotesNotAllowed" : "Double quotes not allowed for wrapping string literals",
    "QuoteConventionsSingleQuotesNotAllowed" : "Single quotes not allowed for wrapping string literals",


    "ParamPrecedingWhitespaces": "There must be [color:underline]{expected}[/color] whitespace(s) preceding parameter; [color:underline]{actual}[/color] found",
    "ParamTrailingWhitespaces": "There must be [color:underline]{expected}[/color] whitespace(s) trailing parameter; [color:underline]{actual}[/color] found",
    "ArgPrecedingWhitespaces": "There must be [color:underline]{expected}[/color] whitespace(s) preceding argument; [color:underline]{actual}[/color] found",
    "ArgTrailingWhitespaces": "There must be [color:underline]{expected}[/color] whitespace(s) trailing argument; [color:underline]{actual}[/color] found",

    "ChainedMethodCallsTrailingObjectWhitespaces": "There must be [color:underline]{expected}[/color] whitespace(s) trailing object; [color:underline]{actual}[/color] found",
    "ChainedMethodCallsPrecedingPropertyWhitespaces": "There must be [color:underline]{expected}[/color] whitespace(s) preceding property; [color:underline]{actual}[/color] found",
    "MultipleVarDeclarationPerBlockScope": "There must be [color:underline]{expected}[/color] variable declaration(s) per block scope; [color:underline]{actual}[/color] found",

    "OperatorPrecedingWhitespaces": "There must be [color:underline]{expected}[/color] whitespace(s) preceding operator; [color:underline]{actual}[/color] found",
    "OperatorTrailingWhitespaces": "There must be [color:underline]{expected}[/color] whitespace(s) trailing operator; [color:underline]{actual}[/color] found",
    "OnlyTabsAllowedForIndentation" : "There must be used only tabs in indentation",
    "OnlySpacesAllowedForIndentation" : "There must be used only spaces in indentation",
    "LineTrailingSpacesNotAllowed" : "There must be no line trailing spaces; [color:underline]{actual}[/color] found",
    "ExceededLineMaxLength": "There must be maximum [color:underline]{expected}[/color] characters of line length; [color:underline]{actual}[/color] found",
    "DeceedLineMinLength": "There must be minimum [color:underline]{expected}[/color] characters of line length; [color:underline]{actual}[/color] found",

    "CommaPrecedingSpacesNotAllowed": "No spaces preceding comma punctuator allowed",
    "SemicolonPrecedingSpacesNotAllowed": "No spaces preceding semicolon punctuator allowed",

    "":""
  };
});