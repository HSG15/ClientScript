   /**
    * @NApiVersion 2.0
    * @NScriptType ClientScript
    */

   define(['N/currentRecord'], function(currentRecord) {
    /**
     * Function to be executed when the page is initialized.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
     */


    function pageInit(scriptContext){
       var current_Record = scriptContext.currentRecord;
       var recordContext = current_Record.getValue({
             fieldId: 'entity'
       });
       log.debug('entity', recordContext);
       current_Record.setValue({
             fieldId:'entity',
             value: 1126 
       });
       alert('Page Initialized');
    }

    return {
       pageInit: pageInit
    }
    
 });