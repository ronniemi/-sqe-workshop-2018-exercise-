import assert from 'assert';
import {buildTable} from '../src/js/code-parser';

describe('function_declaration_hendler', () => {
    it('is parsing an empty function correctly', () => {
        assert.equal(
            JSON.stringify(buildTable('')), '[]');
    });

    it('is parsing a function with no argument correctly', () => {
        assert.equal(JSON.stringify(buildTable('function func(){}')),
        '[{"line":1,"type":"function declaration","name":"func","condition":"","value":""}]');
    });

    it('is parsing a function with argument correctly', () => {
        assert.equal(JSON.stringify(buildTable('function func(a){}')),
        '[{"line":1,"type":"function declaration","name":"func","condition":"","value":""},{"line":1,"type":"variable declaration","name":"a","condition":"","value":""}]');
    });
    it('is parsing a function with body correctly', () => {
        assert.equal(JSON.stringify(buildTable('function func(){a=5}')),
        '[{"line":1,"type":"function declaration","name":"func","condition":"","value":""},{"line":1,"type":"assignment expression","name":"a","condition":"","value":5}]');
    });
});

describe('variable_declaration_hendler', () => {
    it('is parsing an empty declaration correctly', () => {
        assert.equal(
            JSON.stringify(buildTable('let x')), '[{"line":1,"type":"variable declaration","name":"x","condition":"","value":""}]');
    });

    it('is parsing var declration correctly', () => {
        assert.equal(JSON.stringify(buildTable('var x = 5')),
        '[{"line":1,"type":"variable declaration","name":"x","condition":"","value":5}]');
    });

    it('is parsing let declration correctly', () => {
        assert.equal(JSON.stringify(buildTable('let x = 5')),
        '[{"line":1,"type":"variable declaration","name":"x","condition":"","value":5}]');
    });

    it('is parsing null declration correctly', () => {
        assert.equal(JSON.stringify(buildTable('let x = null')),
        '[{"line":1,"type":"variable declaration","name":"x","condition":"","value":null}]');
    });
});

describe('assignment_expression_hendler', () => {
    it('is parsing an null assignment correctly', () => {
        assert.equal(
            JSON.stringify(buildTable('a=null')), '[{"line":1,"type":"assignment expression","name":"a","condition":"","value":null}]');
    });

    it('is parsing an expression assignment correctly', () => {
        assert.equal(JSON.stringify(buildTable('a=4+5')),
        '[{"line":1,"type":"assignment expression","name":"a","condition":"","value":"4+5"}]');
    });

    it('is parsing an boolean assignment correctly', () => {
        assert.equal(JSON.stringify(buildTable('a=true')),
        '[{"line":1,"type":"assignment expression","name":"a","condition":"","value":true}]');
    });
});

describe('while_statement_hendler', () => {
    it('is parsing an boolean condition correctly', () => {
        assert.equal(
            JSON.stringify(buildTable('while(true){}')), '[{"line":1,"type":"while statement","name":"","condition":true,"value":""}]');
    });

    it('is parsing an expression condition correctly', () => {
        assert.equal(JSON.stringify(buildTable('while(7+10){}')),
        '[{"line":1,"type":"while statement","name":"","condition":"7+10","value":""}]');
    });

    it('is parsing an grater then condition correctly', () => {
        assert.equal(JSON.stringify(buildTable('while(x>80){}')),
        '[{"line":1,"type":"while statement","name":"","condition":"x>80","value":""}]');
    });

    it('is parsing an grater then/equal condition correctly', () => {
        assert.equal(JSON.stringify(buildTable('while(x>=80){}')),
        '[{"line":1,"type":"while statement","name":"","condition":"x>=80","value":""}]');
    });

    it('is parsing an lower then condition correctly', () => {
        assert.equal(JSON.stringify(buildTable('while(x<80){}')),
        '[{"line":1,"type":"while statement","name":"","condition":"x<80","value":""}]');
    });

    it('is parsing an lower then/equal condition correctly', () => {
        assert.equal(JSON.stringify(buildTable('while(x<=80){}')),
        '[{"line":1,"type":"while statement","name":"","condition":"x<=80","value":""}]');
    });

    it('is parsing an null condition correctly', () => {
        assert.equal(JSON.stringify(buildTable('while(null){}')),
        '[{"line":1,"type":"while statement","name":"","condition":null,"value":""}]');
    });
});

describe('if_statement_hendler', () => {
    it('is parsing an null condition correctly', () => {
        assert.equal(
            JSON.stringify(buildTable('if(null){}')), '[{"line":1,"type":"if statement","name":"","condition":null,"value":""}]');
    });

    it('is parsing an expression condition correctly', () => {
        assert.equal(JSON.stringify(buildTable('if(4+5){}')),
        '[{"line":1,"type":"if statement","name":"","condition":"4+5","value":""}]');
    });

    it('is parsing an boolean condition correctly', () => {
        assert.equal(JSON.stringify(buildTable('if(true){}')),
        '[{"line":1,"type":"if statement","name":"","condition":true,"value":""}]');
    }); 

    it('is parsing an variable condition correctly', () => {
        assert.equal(JSON.stringify(buildTable('if(a){}')),
        '[{"line":1,"type":"if statement","name":"","condition":"a","value":""}]');
    });

    it('is parsing an alternative correctly', () => {
        assert.equal(JSON.stringify(buildTable('if(a){} else{}')),
        '[{"line":1,"type":"if statement","name":"","condition":"a","value":""},{"line":1,"type":"else statement","name":"","condition":"","value":""}]');
    });

    it('is parsing an if statment as alternative correctly', () => {
        assert.equal(JSON.stringify(buildTable('if(a){} else if(b){}')),
        '[{"line":1,"type":"if statement","name":"","condition":"a","value":""},{"line":1,"type":"else if statement","name":"","condition":"b","value":""}]');
    }); 
}); 

describe('return_statement_hendler', () => {
    it('is parsing an null return correctly', () => {
        assert.equal(JSON.stringify(buildTable('function func(){return null}')),
         '[{"line":1,"type":"function declaration","name":"func","condition":"","value":""},{"line":1,"type":"return statement","name":"","condition":"","value":null}]');
    });

    it('is parsing an expression return correctly', () => {
        assert.equal(JSON.stringify(buildTable('function func(){return 4+5}')),
        '[{"line":1,"type":"function declaration","name":"func","condition":"","value":""},{"line":1,"type":"return statement","name":"","condition":"","value":"4+5"}]');
    });

    it('is parsing an boolean return correctly', () => {
        assert.equal(JSON.stringify(buildTable('function func(){return true}')),
        '[{"line":1,"type":"function declaration","name":"func","condition":"","value":""},{"line":1,"type":"return statement","name":"","condition":"","value":true}]');
    });

    it('is parsing an empty return correctly', () => {
        assert.equal(JSON.stringify(buildTable('function func(){return}')),
        '[{"line":1,"type":"function declaration","name":"func","condition":"","value":""},{"line":1,"type":"return statement","name":"","condition":"","value":null}]');
    });
}); 

describe('parse expression', () => {
    it('is parsing an simple expression correctly', () => {
        assert.equal(JSON.stringify(buildTable('a=b+c')),
         '[{"line":1,"type":"assignment expression","name":"a","condition":"","value":"b+c"}]');
    });

    it('is parsing an complex expression correctly', () => {
        assert.equal(JSON.stringify(buildTable('a=(b+c)*7/d - (65-e)')),
        '[{"line":1,"type":"assignment expression","name":"a","condition":"","value":"b+c*7/d-65-e"}]');
    }); 

    it('is parsing an member expression correctly', () => {
        assert.equal(JSON.stringify(buildTable('a=b[6]')),
        '[{"line":1,"type":"assignment expression","name":"a","condition":"","value":"b[6]"}]');
    }); 

    it('is parsing an unary expression correctly', () => {
        assert.equal(JSON.stringify(buildTable('a=-1')),
        '[{"line":1,"type":"assignment expression","name":"a","condition":"","value":"-1"}]');
    });
});

describe('update_expression_hendler', () => {
    it('is parsing an simple suffix variable declaration correctly', () => {
        assert.equal(JSON.stringify(buildTable('let x=x++')),
         '[{"line":1,"type":"variable declaration","name":"x","condition":"","value":"x++"}]');
    });

    it('is parsing an complex prefix variable declaration correctly', () => {
        assert.equal(JSON.stringify(buildTable('let x=++x')),
        '[{"line":1,"type":"variable declaration","name":"x","condition":"","value":"++x"}]');
    }); 

    it('is parsing an suffix expression correctly', () => {
        assert.equal(JSON.stringify(buildTable('x++')),
        '[{"line":1,"type":"update expression","name":"","condition":"","value":"x++"}]');
    }); 

    it('is parsing an prefix expression correctly', () => {
        assert.equal(JSON.stringify(buildTable('++x')),
        '[{"line":1,"type":"update expression","name":"","condition":"","value":"++x"}]');
    }); 
});

describe('for_statement_hendler', () => {
    it('is parsing an empty statement correctly', () => {
        assert.equal(JSON.stringify(buildTable('for(;;){}')),
         '[{"line":1,"type":"for statement","name":"","condition":";;","value":""}]');
    });

    it('is parsing an comlex test correctly', () => {
        assert.equal(JSON.stringify(buildTable('for(;i<5*n/24;){}')),
         '[{"line":1,"type":"for statement","name":"","condition":";i<5*n/24;","value":""}]');
    });

    it('is parsing an empty init statement correctly', () => {
        assert.equal(JSON.stringify(buildTable('for(;i<5;i++){}')),
         '[{"line":1,"type":"for statement","name":"","condition":";i<5;i++","value":""}]');
    });

    it('is parsing an empty update statment correctly', () => {
        assert.equal(JSON.stringify(buildTable('for(i=0;i<5;){}')),
        '[{"line":1,"type":"for statement","name":"","condition":"i=0;i<5;","value":""}]');
    }); 

    it('is parsing an empty update and init statment correctly', () => {
        assert.equal(JSON.stringify(buildTable('for(;i<5;){}')),
        '[{"line":1,"type":"for statement","name":"","condition":";i<5;","value":""}]');
    });

    it('is parsing an complex init statment correctly', () => {
        assert.equal(JSON.stringify(buildTable('for(i=n+16/x;i<5;){}')),
        '[{"line":1,"type":"for statement","name":"","condition":"i=n+16/x;i<5;","value":""}]');
    });

    it('is parsing an complex update statment correctly', () => {
        assert.equal(JSON.stringify(buildTable('for(;i<5;i=i+(i/n*24)){}')),
        '[{"line":1,"type":"for statement","name":"","condition":";i<5;i=i+i/n*24","value":""}]');
    });
});