
/*
Use Placeholder: Project_Planning_UserStory_Split
*/
tau.mashups
 .addDependency('libs/jquery/jquery')
 .addMashup(function ($, config) {
                                  
   var customfields = { 'Items': [] };
                                  
   $.each($('#ctl00_mainArea_userStoryDetailsLeft_UserStoryDetailsBrief').find('.customFieldPlace').find(':input'), function(index, value) {
	  
          
          value = $(value);
          
          if(value.is('input:text') ){
             customfields.Items.push({Type: 'text', Value : value.val(), Name: value.attr('name') });                   
             
           }else if(value.is('textarea') && value.attr('name').contains('txtGeneralsLookup')){
             customfields.Items.push({Type: 'textarea', Value : value.val(), Name: value.attr('name') });                                                                                  
                                         
           }else if(value.is('textarea')){
                                         
             customfields.Items.push({Type: 'richtext', Value : value.val(), Name: value.attr('name') });                           

           }else if(value.is('input:checkbox')){
                                               
             customfields.Items.push({Type: 'checkbox', Value : value.is(':checked'), Name: value.attr('name') });        
           
           }else if(value.is('select')){
                customfields.Items.push({Type: 'dropdown', Value : value.val(), Name: value.attr('name') });  
      		                     
                 // console.log(value.is(':selected').text());                  
                 //console.log(value(':selected').text());                              
	  }
    		
          
	});

     $.each($('#ctl00_mainArea_userStoryDetailsRight_UserStoryDetailsBrief').find('.customFieldPlace').find(':input'), function(index, value) {
          //match the control ids as well
          value = $(value);
        
          $.each(customfields.Items, function(key, item) {
                                                 
          	
		
                
            
          	if(item.Name.replace('userStoryDetailsLeft', 'userStoryDetailsRight') == value.attr('name')){
 			
              		if(item.Type == 'text'){
                         	value.val(item.Value);
                		return;
                	}else if (item.Type == 'textarea'){
                        	value.val(item.Value);                            
                      		return;
                  
                        }else if (item.Type == 'richtext'){
                                                           
 				require([appHostAndPath+'/ckeditor/ckeditor.js'], function() {					
					CKEDITOR.instances[value.attr('id')].setData(item.Value);
            			});
	                  	return;
                                                                                     
			}else if (item.Type == 'checkbox'){
                        	value.prop('checked', item.Value);                              
                      		return;
			}else if (item.Type == 'dropdown'){
                        	value.val(item.Value);
                        	return;
                        }
            		///console.log(value.attr('name') + 'Matchy!!');                                   
	                
                }
                
          });
            
            
          
          
	}); 
        
        //console.log(customfields);
  
  });