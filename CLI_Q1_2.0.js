/**
* @NApiVersion 2.0
* @NScriptType ClientScript
*/

define(['N/currentRecord', 'N/ui/dialog'], function (currentRecord, dialog) {
   /**
   * Function to be executed when the page is initialized.
   *
   * @param {Object} scriptContext
   * @param {Record} scriptContext.currentRecord - Current form record
   * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
   */

   //Q1
   function pageInit(scriptContext) {
      var current_Record = scriptContext.currentRecord; // I fetch the current record upon which I have to change any field
      var recordContext = current_Record.getValue({ // Get the fieldId of that field.
         fieldId: 'entity'
      });
      // log.debug('entity', recordContext);
      current_Record.setValue({ // Set the field value as 1126 in the fieldId of entity
         fieldId: 'entity',
         value: 1126 // customer's Internal Id not id
      });
      // alert('Page Initialized');
   }

   //Q2
   function fieldChanged(scriptContext) {
      var current_record = scriptContext.currentRecord;

      if (scriptContext.fieldId === 'entity') {
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

   //Q3 add new item
   function sublistChanged(scriptContext) {
      // alert('Entry point triggered');
      var current_record = scriptContext.currentRecord;
  
      if (scriptContext.sublistId == 'item') {
          var noOfLine = current_record.getLineCount({
              sublistId: 'item'
          });
  
          if (noOfLine == 1) {
              current_record.selectNewLine({
                  sublistId: 'item'
              });
  
              current_record.setCurrentSublistValue({
                  sublistId: 'item',
                  fieldId: 'item',
                  value: 345
              });
  
              current_record.setCurrentSublistValue({
                  sublistId: 'item',
                  fieldId: 'quantity',
                  value: '2'
              });
  
            //   current_record.commitLine({ // It will Commit the currently selected line.
            //       sublistId: 'item'
            //   });
          }
      }
   }

   //Q4 - if quantity > 2, show an alert
   function validateLine(scriptContext) {
      var current_record = scriptContext.currentRecord;
      var sublist = scriptContext.sublistId;

      if(sublist === 'item'){
         var quantity = current_record.getCurrentSublistValue({
            sublistId: 'item',
            fieldId: 'quantity',
         });

         if(quantity > 2) {
            dialog.alert({
               title: 'Quantity Limit Exceeded',
               message: 'The quantity of the item can not exceed 2'
            });
            return false;
         }
         return true;
      }
   }

   //Q5 - if quantity == 4, you can't delete it.
   function validateDelete(scriptContext){
      var current_record = scriptContext.currentRecord;  // record selected
      var sublist = scriptContext.sublistId; // sublist selected

      if(sublist == 'item') { // entry to the item sublist 
         var quantity = current_record.getCurrentSublistValue({
            sublistId: 'item',
            fieldId: 'quantity'
         });
         if(quantity == 4){
            dialog.alert({
               title: 'Please Check Quantity Limit',
               message: 'Quantity ahould be exactly 4. It should be greater than or less than 4.'
            });
            return false;
         }
         return true;
      }
   }

   return { // Now just simply returned the object that maps the function name
      pageInit: pageInit, // entry point: functionName
      fieldChanged: fieldChanged,
      sublistChanged: sublistChanged,
      //validateLine: validateLine,
      validateDelete: validateDelete
   }

});