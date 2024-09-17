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
         var current_Record = scriptContext.currentRecord; // I fetch the current record upon which I have to change any field
         var recordContext = current_Record.getValue({  // Get the fieldId of that field.
            fieldId: 'entity'
         });
         // log.debug('entity', recordContext);
         current_Record.setValue({ // Set the field value as 1126 in the fieldId of entity
            fieldId:'entity',
            value: 1126 // customer's Internal Id not id
         });
         // alert('Page Initialized');
      }

      function fieldChanged(scriptContext){
         var current_record = scriptContext.currentRecord;
         
         if(scriptContext.fieldId === 'entity'){
            var customerName = current_record.getText({
               fieldId: 'entity'
            });
            current_record.setValue({
               fieldId: 'memo',
               value: customerName
            });
         }

         // log.debug(typeof('entity'), customerName);

      }
      

      return { // Now just simply returned the object that maps the function name
         pageInit: pageInit,  // entry point: functionName
         fieldChanged: fieldChanged
      }
      
   });