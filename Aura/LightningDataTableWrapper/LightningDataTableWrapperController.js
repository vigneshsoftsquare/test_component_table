({
    doInit : function(cmp, event, helper) {        
        var columns = [
            {
                'label':'Contact Name',
                'name':'Name',
                'type':'reference',
                'value':'Id'
            },
            {
                'label':'Birthdate',
                'name':'Birthdate',
                'type':'date'
            },
            {
                'label':'Currency',
                'name':'ldt__test_curr__c',
                'type':'currency'
            },
            {
                'label':'Percent',
                'name':'ldt__test_percent__c',
                'type':'percent'
            },
            {
                'label':'Number',
                'name':'ldt__Test_Num__c',
                'type':'number'
            },
            {
                'label':'Home Phone',
                'name':'Phone',
                'type':'phone'
            }
        ];
        
        var columns = [
            {
                'label':'Contact Name',
                'name':'Name',
                'type':'reference',
                'value':'Id',
                'width':300
            },
            {
                'label':'Birthdate',
                'name':'Birthdate',
                'type':'date'
            },
            {
                'label':'Home Phone',
                'name':'Phone',
                'type':'phone'
            }
        ];
        var config = {
            "massSelect":true,
            "globalAction":[
                {
                    "label":"Get Selected Records",
                    "class":"slds-button slds-button--neutral",
                    "type":"button",
                    "id":"selectAllBtn"
                }
            ],
            "rowAction":[
                {
                    "label":"Get Selected Records",
                    "class":"slds-button slds-button--brand",
                    "type":"url",
                    "id":"test"
                }
            ]            
        };
        
        //cmp.set("v.colMap",columns);
        cmp.set("v.columnConfig",config);
        //cmp.find("ldtTable").initialize();
        var action = cmp.get("c.fetchContacts");
        
        action.setParams({
            "lim":'3'
        });
        /*
        action.setCallback(this,function(resp){
            console.log(resp.getReturnValue());
            cmp.set("v.rows",resp.getReturnValue());
            cmp.find("ldtTable").initialize();
        });
        
        $A.enqueueAction(action);
        */
    },
    getContacts : function(cmp, event, helper) {
        cmp.set("v.show",true);
        var action = cmp.get("c.fetchContactsa");
        
        var columns = [
            {
                'label':'Contact Name',
                'name':'Name',
                'resizeable':true
            },
            {
                'label':'Birthdate',
                'name':'Birthdate',
                'type':'reference',
                'value':'Id',
                'resizeable':true
            },
            {
                'label':'Home Phone',
                'name':'Phone',
                'type':'phone',
                'resizeable':true
            },
            {
                'label':'Email',
                'name':'Email',
                'type':'email',
                'resizeable':true
                
            },
            {
                'label':'Image',
                'name':'ImageURl__c',
                'type':'image'
            },
            {
                'label':'Account',
                'name':'Account.Name',
                'type':'string',
                'resizeable':true
            }
            
        ];
        
        
        var config = { 
            "massSelect":true,
            "searchBox":false,
            "searchByColumn":true,
            "globalAction":[
                
                {
                    "label":"Get Selected Records",
                    "class":"slds-button slds-button--neutral",
                    "type":"button",
                    "id":"selectAllBtn"
                }
                
            ],
            "rowAction":[
                {
                    "label":"Action",
                    "type":"menu",
                    "class":"test1",
                    "id":"editLink",
                    "menuIconClass":"test",
                    "menuOptions" : [
                        {
                            "label":"Edit",
                            "id":"editLink",
                            "class" : "test3",
                            "visible" : function(row){
                                return true; // if this returns true, only then option is shown in the menu list
                            }
                        },
                        {
                            "label":"Del",
                            "id":"delLink",
                            "class" : "test3",
                            "visible" : function(row){
                                return true;
                            }
                        },
                        {
                            "label":"Edit",
                            "id":"editLink",
                            "class" : "test3",
                            "visible" : function(row){
                                return true; // if this returns true, only then option is shown in the menu list
                            }
                        },
                        {
                            "label":"Del",
                            "id":"delLink",
                            "class" : "test3",
                            "visible" : function(row){
                                return true;
                            }
                        },
                        {
                            "label":"Edit",
                            "id":"editLink",
                            "class" : "test3",
                            "visible" : function(row){
                                return true; // if this returns true, only then option is shown in the menu list
                            }
                        },
                        {
                            "label":"Del",
                            "id":"delLink",
                            "class" : "test3",
                            "visible" : function(row){
                                return true;
                            }
                        },
                        {
                            "label":"Edit",
                            "id":"editLink",
                            "class" : "test3",
                            "visible" : function(row){
                                return true; // if this returns true, only then option is shown in the menu list
                            }
                        }
                    ]   
                },
                {
                    "label":"Del",
                    "type":"dropdown",
                    "id":"delLink",
                    "visible" : function(row){
                        return (row.ldt__test_curr__c != 1500)
                    }
                }
                
            ]            
        };
        
        //cmp.set("v.colMap",columns);
        cmp.set("v.columnConfig",config);
        
        action.setParams({
            "lim":'1'
        });
        
        action.setCallback(this,function(resp){
            console.log(resp.getReturnValue());
            cmp.set("v.rows",resp.getReturnValue());
            cmp.set("v.colMap",columns);
            cmp.find("ldtTable").initialize({'order':[3,"desc"], "itemMenu":[3,5,10],
                                             "itemsPerPage":3});
        });
        
        $A.enqueueAction(action);
    },
    test : function(cmp,event){
        console.log(event.getSource().get("v.value"));        
    },
    onChangeFunction : function(cmp,event){
        console.log(event.getSource().get("v.value"));        
    },
    tabActionClicked : function(cmp,event){
        //Now,lets open the task modal
        cmp.find("taskEditModal").open();
        var rows = cmp.get("v.rows");
        var rowIdx = event.getParam("index");
        var actionId = event.getParam('actionId');
        var actualRow = rows[rowIdx];
        var tabCmp = cmp.find("ldtTable");
        console.log(actualRow,tabCmp.get("v.selectedRows"));
        if(actionId == 'editLink'){
            var row = event.getParam('row');
            row.Email = 'test123@gmail.com';
            row.ldt__test_check__c = true;
            tabCmp.updateRow(rowIdx,row);
            console.log(rows,actualRow,rows.indexOf(actualRow));   
        }
        
        if(actionId == 'delLink'){
            //rows.splice(rowIdx,1);
            tabCmp.deleteRow(rowIdx);
            console.log(rows,actualRow);
        }
        
        if(actionId == 'selectAllBtn'){
            var selectedRows = tabCmp.get("v.selectedRows");
            for(var i = 0;i < selectedRows.length;i++){
                selectedRows[i].Birthdate = null;
                selectedRows[i] = JSON.parse(JSON.stringify(selectedRows[i]));;
            }  
            //tabCmp.set("v.selectedRows",[]);
            //tabCmp.set("v.selectAll",false);
            tabCmp.rerenderRows();
            
        }
        
        console.log('tabActionClicked called',actionId,rowIdx);        
    },
    closeTaskModal : function(cmp,event,helper){
        helper.closeTaskModal(cmp);
    }
})