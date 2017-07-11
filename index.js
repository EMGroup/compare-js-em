require('@construit/web');
const ScriptBox = require('@construit/scriptbox');
const esprima = require('esprima');

function ajax(options) {
	var xhr = new XMLHttpRequest();
	//xhr.withCredentials = true;
	xhr.open(options.type.toUpperCase(), options.url);
	//xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.onload = function() {
		if (xhr.status === 200 || xhr.status == 0) {
			var data;
			if (xhr.responseText.charAt(0) == "{" || xhr.responseText.charAt(0) == "[") data = JSON.parse(xhr.responseText);
			else data = xhr.responseText;
			options.success(data);
		} else {
			options.error(xhr, xhr.status, xhr.responseText);
		}
	};
	xhr.send((options.data) ? JSON.stringify(options.data) : undefined);
}

function jsparser(src) {
	var errors = [];
	var ast;

	// Filter out markdown comments
	src = src.split("\n").map(function(x) {
		if (x.startsWith("#")) return "";
		else return x;
	}); //.join("\n");

	var lines = [];
	lines[0] = 0;
	for (var i=1; i<src.length; i++) {
		lines[i] = lines[i-1] + src[i-1].length + 1;
	}
	var curline = 0;

	src = src.join("\n");
	
	var statements = {};

	try {
		ast = esprima.parse(src, {range: true});
		//console.log(ast);
		var lastend = 0;

		for (var i=0; i<ast.body.length; i++) {
			while (lines.length > curline+1 && ast.body[i].range[0] >= lines[curline+1]) {
				curline++;
			}
			statements[curline] = ast.body[i];

			if (ast.body[i].range[0]+1 > lastend) {
				var dum = {type: "dummy", lines: src.substring(lastend, ast.body[i].range[0]).split("\n").length-1, getNumberOfLines: function() { return this.lines; }};
				ast.body.splice(i, 0, dum);
				i++;
			}
			lastend = ast.body[i].range[1]+1;

			ast.body[i].source = src.substring(ast.body[i].range[0], ast.body[i].range[1]+1);
			ast.body[i].getNumberOfLines = function() { return this.source.split("\n").length-1; };
		}

		console.log("STATEMENTS",statements);

	} catch(e) {
		console.log(e);
		errors.push(e);
		e.line = e.lineNumber;
		e.messageText = function() { return e.description; };
	}
	return {
		ast: ast,
		errors: errors,
		hasErrors: function() { return (errors.length > 0); },
		getError: function() { return errors[0]; },
		source: src,
		statements: ast.body,
		getStatementByLine: function(line) { console.log("GET BY LINE",line); return statements[line]; }
	}
}
function jstranslator(ast) {
	eval(ast.source);
}
var cwebload = window.onload;
window.onload = function() {
	cwebload();
	var input = document.getElementById("emtextin");
	var inputjs = document.getElementById("jstextin");

	rt = Construit.webrt;
	var embox = new ScriptBox(input, rt);

	var jsbox = new ScriptBox(inputjs, rt, {
		parser: {parse: jsparser},
		translator: { eval: jstranslator },
		keywords: {
			"do": "do",
			"if": "if",
			"in": "in",
			"for": "for",
			"let": "let",
			"new": "new",
			"try": "try",
			"var": "var",
			"case": "case",
			"else": "else",
			"enum": "enum",
			"this": "this",
			"with": "with",
			"await": "await",
			"break": "break",
			"catch": "catch",
			"class": "class",
			"const": "const",
			"super": "super",
			"throw": "throw",
			"while": "while",
			"yield": "yield",
			"delete": "delete",
			"export": "export",
			"import": "import",
			"public": "public",
			"return": "return",
			"static": "static",
			"switch": "switch",
			"typeof": "typeof",
			"default": "default",
			"extends": "extends",
			"finally": "finally",
			"package": "package",
			"private": "private",
			"continue": "continue",
			"debugger": "debugger",
			"function": "function",
			"interface": "interface",
			"protected": "protected",
			"prototype": "prototype",
			"implements": "implements",
			"instanceof": "instanceof"
		}
	});

	var jsoptions = document.getElementById("jsoptions");
	jsoptions.onchange = function(e) {
		ajax({
			url: jsoptions.value,
			type: "get",
			success: function(data){
				jsbox.intextarea.value = data;
				jsbox.updateEntireHighlight();
			},
			error: function(a){
				
			}
		});
	}
	jsoptions.onchange();

	var emoptions = document.getElementById("emoptions");
	emoptions.onchange = function(e) {
		ajax({
			url: emoptions.value,
			type: "get",
			success: function(data){
				embox.intextarea.value = data;
				embox.updateEntireHighlight();
			},
			error: function(a){
				
			}
		});
	}
	emoptions.onchange();
}
