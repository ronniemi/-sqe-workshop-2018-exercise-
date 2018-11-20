import $ from 'jquery';
import {buildTable} from './code-parser';

$(document).ready(function () {
    $('#codeSubmissionButton').click(() => {
        let codeToParse = $('#codePlaceholder').val();
        let tableCode = buildTable(codeToParse);
        showTable(tableCode);
    });
});

const showTable = (tableObject) => {
    $('#tableCode').html('');
    var tr='<tr><td>Line</td><td>Type</td><td>Name</td><td>Condition</td><td>Value</td></tr>';
    $('#tableCode').append(tr); 
    for(var i=0;i<tableObject.length;i++)
    {
        let obj = tableObject[i];
        tr='<tr><td>'+obj.line+'</td><td>'+obj.type+'</td><td>'+obj.name+'</td><td>'+obj.condition+'</td><td>'+obj.value+'</td></tr>';
        $('#tableCode').append(tr); 
    }   
};
