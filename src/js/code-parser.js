import {parseCode} from './code-analyzer';

var function_dictionary = {
    'FunctionDeclaration' : function_declaration_hendler,
    'Identifier' : Identifier_declaration_hendler,
    'BlockStatement' : block_statement_hendler,
    'VariableDeclaration' : variable_declaration_hendler,
    'VariableDeclarator': variable_declarator_hendler,
    'ExpressionStatement' : expression_statement_hendler,
    'AssignmentExpression' : assignment_expression_hendler,
    'WhileStatement' : while_statement_hendler,
    'UpdateExpression' : update_expression_hendler,
    'IfStatement' : if_statement_hendler,
    'elseIfStatement' : else_if_statment_hendler,
    'ReturnStatement' : return_statement_hendler,
    'ForStatement' : for_statement_hendler
};

var expression_dictionary = {
    'Literal' : literal_expression,
    'Identifier' : identifier_expression,
    'MemberExpression' : member_expression,
    'UnaryExpression' : unary_expression,
    'UpdateExpression' : update_expression
};

function buildTable(codeToParse){
    let parsed_code = parseCode(codeToParse);
    let table = [];
    parsed_code.body.forEach(function(element){
        table = recursiveBuilding(table, element);
    });
    return table;
}

function recursiveBuilding(table, obj){
    let record = {line: '',type: '',name: '',condition: '',value: ''};
    let obj_type =  obj.type;
    return function_dictionary[obj_type](table, obj, record);
}

function function_declaration_hendler(table, obj, record){
    record = parseId(obj.id, 'function declaration', record);
    table.push(record);
    obj.params.forEach(function(element){
        table = recursiveBuilding(table, element);
    });
    table = recursiveBuilding(table, obj.body);
    return table;
}

function Identifier_declaration_hendler(table, obj, record){
    table.push(parseId(obj, 'variable declaration', record));
    return table;
}

function variable_declarator_hendler(table, obj, record){
    record = parseId(obj.id, 'variable declaration', record);
    if(obj.init !== null){
        record.value = parseExpression(obj.init);
    }
    table.push(record);
    return table;
}

function assignment_expression_hendler(table, obj, record){
    record = parseId(obj.left, 'assignment expression', record);
    record.value = parseExpression(obj.right);
    table.push(record);
    return table;
}

function while_statement_hendler(table, obj, record){
    record.line = obj.loc.start.line;
    record.type = 'while statement';
    record.condition = parseExpression(obj.test);
    table.push(record);
    table = recursiveBuilding(table, obj.body);
    return table;
}

function update_expression_hendler(table, obj, record){
    record.line = obj.loc.start.line;
    record.type = 'update expression';
    record.value = parseExpression(obj);
    table.push(record);
    return table;
}

function expression_statement_hendler(table, obj, record){
    record.line = obj.loc.start.line;
    return recursiveBuilding(table, obj.expression);
}

function if_statement_hendler(table, obj, record){
    record.type = 'if statement';
    return if_else_if_statement_hendler(table, obj, record);
}

function else_if_statment_hendler(table, obj, record){
    record.type = 'else if statement';
    return if_else_if_statement_hendler(table, obj, record);
}

function if_else_if_statement_hendler(table, obj, record){
    record.line = obj.loc.start.line;
    record.condition = parseExpression(obj.test);
    table.push(record);
    table = recursiveBuilding(table, obj.consequent);
    if(obj.alternate !== null){
        if(obj.alternate.type == 'IfStatement'){
            obj.alternate.type = 'elseIfStatement';
        }
        else{
            let sub_record = {line: obj.alternate.loc.start.line, type: 'else statement',name: '',condition: '',value: ''};
            table.push(sub_record);
        }
        table = recursiveBuilding(table, obj.alternate);
    }
    return table;
}

function return_statement_hendler(table, obj, record){
    record.line = obj.loc.start.line;
    record.type = 'return statement';
    record.value = parseExpression(obj.argument);
    table.push(record);
    return table;
}

function for_statement_hendler(table, obj, record){
    record.line = obj.loc.start.line;
    record.type = 'for statement';
    if(obj.init != null){record.condition = parseExpression(obj.init);}
    record.condition = record.condition + ';';
    if(obj.test != null) {record.condition = record.condition + parseExpression(obj.test);}
    record.condition = record.condition + ';';
    if(obj.update != null){record.condition = record.condition + parseExpression(obj.update);}
    table.push(record);
    table = recursiveBuilding(table, obj.body);
    return table;
}

function variable_declaration_hendler(table, obj, record){
    record.line = obj.loc.start.line;
    return call_all_childes(table, obj.declarations);
}

function block_statement_hendler(table, obj, record){
    record.line = obj.loc.start.line;
    return call_all_childes(table, obj.body);
}

function call_all_childes(table, childes){
    childes.forEach(function(element){
        table = recursiveBuilding(table, element);
    });
    return table;
}

function parseId(id, type, record){
    record.line = id.loc.start.line;
    record.type = type;
    record.name = id.name;
    return record;
}

function parseExpression(obj){
    if(obj == null || obj == 'undefined'){
        return null;
    }
    if(!(obj.type in expression_dictionary)){
        return parseExpression(obj.left) + obj.operator + parseExpression(obj.right);
    }
    return expression_dictionary[obj.type](obj);
}

function literal_expression(obj){
    return obj.value;
}

function identifier_expression(obj){
    return obj.name;
}

function member_expression(obj){
    return parseExpression(obj.object) + '[' + parseExpression(obj.property) + ']';
}

function unary_expression(obj){
    return obj.operator + '' + parseExpression(obj.argument);
}

function update_expression(obj){
    let expr = parseExpression(obj.argument);
    if(obj.prefix) {
        expr = obj.operator + expr;
    }    
    else {
        expr = expr + obj.operator;
    }
    return expr;
}

export {buildTable};