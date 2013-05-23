
/*
Use Placeholder: Project_Planning_UserStory_Split
*/

tau.mashups
 .addDependency('libs/jquery/jquery')
 .addMashup(function ($, config) {
                                  
   var customfields = { 'Items': [] };
   //build a list of custom field values...                                  
   $.each($('#ctl00_mainArea_userStoryDetailsLeft_UserStoryDetailsBrief').find('.customFieldPlace').find(':input'), function(index, value) {
	  
          
          value = $(value);
          //textfields
          if(value.is('input:text') ){
             customfields.Items.push({Type: 'text', Value : value.val(), Name: value.attr('name') });                   
           //used for tpentity field  
           }else if(value.is('textarea') && value.attr('name').contains('txtGeneralsLookup')){
             customfields.Items.push({Type: 'textarea', Value : value.val(), Name: value.attr('name') });                                                                                  
           //richtext fields                              
           }else if(value.is('textarea')){
                                         
             customfields.Items.push({Type: 'richtext', Value : value.val(), Name: value.attr('name') });                           
			//checkboxes
           }else if(value.is('input:checkbox')){
                                               
             customfields.Items.push({Type: 'checkbox', Value : value.is(':checked'), Name: value.attr('name') });        
           //select fields
           }else if(value.is('select')){
                customfields.Items.push({Type: 'dropdown', Value : value.val(), Name: value.attr('name') });  
      		                     
                 // console.log(value.is(':selected').text());                  
                 //console.log(value(':selected').text());                              
	  }
    		
          
	});
	//apply them to the other side
     $.each($('#ctl00_mainArea_userStoryDetailsRight_UserStoryDetailsBrief').find('.customFieldPlace').find(':input'), function(index, value) {
          //match the control ids as well
          value = $(value);
        
          $.each(customfields.Items, function(key, item) {
            
          	if(item.Name.replace('userStoryDetailsLeft', 'userStoryDetailsRight') == value.attr('name')){
 					//text fields
              		if(item.Type == 'text'){
                         	value.val(item.Value);
                		return;
                	//for the tpentity
					 }else if (item.Type == 'textarea'){
                        	value.val(item.Value);                            
                      		return;
                    //ckeditor
                     }else if (item.Type == 'richtext'){
                                                           
 							require([appHostAndPath+'/ckeditor/ckeditor.js'], function() {					
								CKEDITOR.instances[value.attr('id')].setData(item.Value);
            				});
	                  		return;
                     //checkboxes                                                                
					 }else if (item.Type == 'checkbox'){
                        	value.prop('checked', item.Value);                              
                      		return;
					 //dropdowns
					 }else if (item.Type == 'dropdown'){
                        	value.val(item.Value);
                        	return;
                     }
                }               
          });
	}); 
});