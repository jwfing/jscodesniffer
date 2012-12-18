var esprima = require("esprima"),
    Token = require("./Tokenizer/Token"),
    TokenizerIterator = require("./Tokenizer/TokenizerIterator"),

/**
 * Extends esprima tokens with Token objects (see above)
 * { whitespaceNum: int, newlineNum: int }
 * regarding preceding (before) and following (after) spacing
 * and line and position
 */
    tokenizer = (function() {
    var esprimaSyntaxTree,
        srcStream;

    return {
        parse: function( data ) {
            var tokens;
            if ( typeof data !== "string" || !data.length ) {
                throw new Error( "Please pass in your source code" );
            }
            try {
                esprimaSyntaxTree = esprima.parse( data, {
                    comment: true,
                    range: true,
                    tokens: true
                });
            } catch( e ) {
                throw new Error("Apparently your source code isn't valid EcmaScript (" + e.message + "). Please, check your syntax:" + data);
            };
            srcStream = new SourceCodeStream( data, esprimaSyntaxTree.comments );
            tokens = new TokenizerIterator( this.processTokens() );
            this.collectFunctionScopesOn( tokens );
            this.collectGroupMembersOn( tokens );
            tokens.rewind();
            return tokens;
        },
        processTokens: function() {
            var tokens = [];
            esprimaSyntaxTree.tokens.forEach(function( fetch, index ){
                var tokenStartPos = fetch.range[0],
                    tokenEndPos = fetch.range[1],
                    extract = srcStream.extract( tokenStartPos, tokenEndPos );

                fetch.before = {
                    whitespaceNum: extract.getWhiteSpaceNum(),
                    newlineNum: extract.getNewLineNum()
                };
                fetch.line = srcStream.getLine();
                fetch.position = srcStream.getPosition();
                tokens.push( new Token( fetch ) );
                tokens[ index - 1 ] && ( tokens[ index - 1 ].after = fetch.before );
            });
            return tokens;
        },
        collectGroupMembersOn: function( tokens ) {
            var token,
                fetch,
                findInnerExp = function( it ) {
                    var matches = [],
                        parentKey = it.key();
                    it.next(); // start with next after opening bracket
                    while ( it.valid() ) {
                        var token = it.current();
                        // If inner matches found
                        if ( token.match("Punctuator", ["(", "["]) ) {
                            token.parent = parentKey;
                            findInnerExp( it ); // ignore inner matches
                            matches.push( token ); // save [
                            matches.push( it.get(-1) ); // save ]
                            token = it.current();
                        }
                        // End of matches
                        if ( token.match("Punctuator", [")", "]"]) ) {
                            it.next();
                            break;
                        }
                        matches.push( token );
                        it.next();
                    }
                    return matches;
                };
            tokens.rewind();
            while ( tokens.valid() ) {
                token = tokens.current();
                if ( token.match("Punctuator", ["("]) ) {
                    fetch = findInnerExp( tokens.clone() );
                    token.group = fetch.length ? new TokenizerIterator( fetch ) : null;
                }
                tokens.next();
            }
        },
        collectFunctionScopesOn: function( tokens ) {
            var findScope = function( it ) {
                    var scope = [],
                        parentKey = it.key();

                    it.next(); // start with next after opening paren
                    while ( it.valid() ) {
                        var token = it.current();
                        // If inner scope found
                        if ( token.match("Keyword", ["function"]) ) {
                            token.parent = parentKey;
                            tokens.nextMatch( "Punctuator", ["{"] );
                            findScope( it ); // ignore inner scopes
                            scope.push( token );
                            token = it.current();
                            if ( !it.valid() ) {
                                break;
                            }
                        }
                        // End of scope
                        if ( token.match("Punctuator", ["}"]) ) {
                            it.next();
                            break;
                        }
                        scope.push( token );
                        it.next();
                    }
                    return scope;
                },
                extend = function( rArr, tArr ) {
                    tArr.forEach(function( el ){
                        rArr.push( el );
                    });
                   return rArr;
                },
                token;
            tokens.rewind();
            // Assign global scope on the first node
            token = tokens.current();
            token.scope = new TokenizerIterator(
                extend( [token.clone()], findScope(tokens.clone()) )
            );
            tokens.rewind();
            // Assign scopes on the nodes which have keyword function
            while ( tokens.valid() ) {
                var token = tokens.current();
                if ( token.match("Keyword", ["function"]) ) {
                    tokens.nextMatch( "Punctuator", ["{"] );
                    token.scope = new TokenizerIterator(
                        findScope( tokens.clone() )
                    );
                }
                tokens.next();
            }
        }
    }
}()),

SourceCodeStream = function( sourceCode ) {
    var reNewLines = /\n/gm,
        startPos = 0,
        lastTokenPos = 0;
    return {
        extract: function( tokenStartPos, tokenEndPos ) {
            var extract =  new SourceExtract(
                sourceCode.substring( startPos, tokenStartPos )
            );
            extract.init();
            lastTokenPos = tokenStartPos;
            startPos = tokenEndPos;
            return extract;
        },
        getLine: function() {
            var mathes = sourceCode.substring( 0, lastTokenPos ).match( reNewLines );
            return mathes ? mathes.length + 1 : 1;
        },
        getPosition: function() {
            return lastTokenPos - sourceCode.substring( 0, lastTokenPos ).lastIndexOf( "\n" );
        }
    }
},

SourceExtract = function( extract ) {
    var reLineBreaks = /[\r\n]/gm,
        reNewLines = /\n/gm,
        reWhiteSpaces = / /gm,
        reInlineComments = /\/\/\*.*?[\r\n]/g,
        reBlockComments = /(\/\*(.|\n)*\*\/)/gm
    return {
        init: function() {
            this.normalize();
            this.exlcudeComments();
        },
        getNewLineNum: function() {
            var mathes = extract.match( reNewLines );
            return mathes ? mathes.length : 0;
        },
        getWhiteSpaceNum: function() {
            var mathes = extract.match( reWhiteSpaces );
            return mathes ? mathes.length : 0;
        },
        normalize: function() {
            extract.replace( reLineBreaks, "\n" );
        },
        exlcudeComments: function() {
            extract = extract.replace( reBlockComments, "" );
            extract = extract.replace( reInlineComments, "" );
        }
    }
}

module.exports = tokenizer;