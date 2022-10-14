var ERROR_DIALOG_ID = "#errorDialog";
var POPUP_DIALOG_ID = "#popupDialog";
var RESULT_OK = "OK";
var RESULT_ERROR = "ERROR";
// handle tabs
var tabAll = '#tabAll';
var activeMenuClass = 'ts24-menu-active';
var arrIds = [];

var DEMOMVC={
   showError: function(message){
	   $(ERROR_DIALOG_ID).html(message);
	   //$(ERROR_DIALOG_ID).dialog('option', 'title', 'Thông báo lỗi');
	   $(ERROR_DIALOG_ID).dialog('open');
	   $(ERROR_DIALOG_ID).dialog({
	        resizable: false,
	        autoOpen: false,
	        title: "Thông báo lỗi",
	        width: 'auto',
	        /*buttons: {
	        	"OK": function () {
	                $(this).dialog('close');
	            },	        	
	            
	        }*/
	    });
   },
   showSuccess: function(message){
	   $(POPUP_DIALOG_ID).html(message);
	   //$(POPUP_DIALOG_ID).dialog('option', 'title', 'Thông báo');
	   $(POPUP_DIALOG_ID).dialog('open');
	   $(ERROR_DIALOG_ID).dialog({ resizable: false, autoOpen: false, title: "Thông báo", width: 'auto', });
   },
   showTilteWarning: function(message, title){
	   $(POPUP_DIALOG_ID).html(message);
	   $(POPUP_DIALOG_ID).dialog('option', 'title', title);
	   $(POPUP_DIALOG_ID).dialog('open');
   },
   showWarning: function(message){
	   $(ERROR_DIALOG_ID).html(message);
	   //$(ERROR_DIALOG_ID).dialog('option', 'title', 'Cảnh báo');
	   $(ERROR_DIALOG_ID).dialog('open');
	   $(ERROR_DIALOG_ID).dialog({ resizable: false, autoOpen: false, title: "Cảnh báo", width: 'auto', });
   },
   showFatalError: function(){
	   //DEMOMVC.showError("Có lỗi xảy ra trong khi giao tiếp với máy chủ.");
	   DEMOMVC.showError("Có lỗi xảy ra trong khi giao tiếp với máy chủ.");
   },
   setupDialog: function(dialogId, dialogTitle, formId, actionUrl, callBackHandler){
   	$(dialogId).dialog({
           autoOpen: false,
           show: 'fade',
           hide: 'fade',
           width: 'auto',
           modal: true,
           title: dialogTitle,
           buttons:
                   [{ //Cancel button
                   	id: 'cancel_'+dialogId,
                       text: 'Cancel',
                       click: function () {
                       	$(dialogId).dialog('close');
                       	return false;
                       }
                   }, { //Save button
                       id: 'save_'+dialogId,
                       text: 'Ok',
                       click: function(){
                    	   if (callBackHandler){
                    		   DEMOMVC.validateAndSubmitForm(dialogId, formId, actionUrl,callBackHandler);
                    	   }
                       }
                   }],
          close: function () {
       	   // $('body').css('overflow','scroll');
           	$(dialogId).dialog('close');
          },
          open: function( event, ui ) {
       	   //$('body').css('overflow','hidden');
       	    $(formId).validationEngine({'binded':false});
          }
       });
   },
   validateAndSubmitForm: function(dialogId, formId, actionUrl,callBackHandler){
	   	$(formId).validationEngine('hide');
	   	$(formId).validationEngine('detach');
	   	$(formId).validationEngine({'binded':false});
	   	form = $(formId);
	   	var validateSuccess = form.validationEngine('validate');
	   	if (!validateSuccess){
	   		return false;
	   	}
	   	$.ajax({
	   		 type: 'POST',
	            url: actionUrl,
	            data: form.serialize(),
	            success : function(data){
	           	 if (data.Result == RESULT_OK){
	           		 $(dialogId).dialog('close');
	           		 if (callBackHandler){
	           			 callBackHandler();
	           		 }
	           	 }else{
	           		 DEMOMVC.showError(data.Message);
	           	 }
	            },
	            error : function(){
	           	 DEMOMVC.showFatalError();
	            }
	        });
	 },
	loadPoupContent: function(dialogId,url){
		 $.ajax({
	       		type: "GET",
	       		url : url,
	       		success : function(content) {
	       			$(dialogId).html(content);
	       			$(dialogId).dialog('open');
	       		},
	       		error : function(e) {
	       			DEMOMVC.showFatalError();
	       		}
	       	});
	 },
	refreshBreadCrumb: function(){
		 $.ajax({
			 type: "POST",
			 url:BREADCRUMB_CONTEXT_PATH + '/refreshBreadCrumb.htm',
			 success : function(content){
				 $('#breadcrumb').html(content);
			 },
			 error: function(e){
				 DEMOMVC.showFatalError();
			 }
		 });
	 },
	 ajaxSubmit: function(formId,actionUrl,callback){
		 form = $(formId);
		 $.ajax({
	   		 type: 'POST',
	            url: actionUrl,
	            data: form.serialize(),
	            success : function(data){
	           	 if (data.Result == RESULT_OK){
	           		 if (callback){
	           			callback();
	           		 }
	           	 }else{
	           		 //DEMOMVC.showError(data.Message);
	           		DEMOMVC.showWarning(data.Message);
	           	 }
	            },
	            error : function(){
	           	 DEMOMVC.showFatalError();
	            }
	        });
	 },
	 ajaxGet: function(actionUrl,parameters,callback){
		 $.ajax({
	   		 type: 'GET',
	            url: actionUrl,
	            data: parameters,
	            success : function(data){
	           		 if (callback){
	           			callback();
	           		 }
	            },
	            error : function(){
	           	 DEMOMVC.showFatalError();
	            }
	        });
	 },
	 redirect: function(url){
		 window.location.href = url;
	 },
	_isActiveTab: function(tabId){
		 return $(tabId).hasClass(activeMenuClass);
	 },
	 _unselectTab: function(tab){
		 $(tab.id).html('<a><span class="tab">' + tab.title + '</span></a>');
		 $(tab.id).removeClass(activeMenuClass);
	 },
	 validateAndSubmit: function(formId, actionUrl, callback){
//			$(formId).validationEngine('hide');
//			$(formId).validationEngine('detach');
//			$(formId).validationEngine({'binded':false});
//			var isValid = $(formId).validationEngine('validate');
//			if (isValid){
				DEMOMVC.ajaxSubmit(formId,actionUrl,callback);
//			}
	 },
	 back: function(){
		window.history.back();
	 },
	 number_format:function (number, decimals, dec_point, thousands_sep) {
		  //  discuss at: http://phpjs.org/functions/number_format/
		  // original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
		  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		  // improved by: davook
		  // improved by: Brett Zamir (http://brett-zamir.me)
		  // improved by: Brett Zamir (http://brett-zamir.me)
		  // improved by: Theriault
		  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		  // bugfixed by: Michael White (http://getsprink.com)
		  // bugfixed by: Benjamin Lupton
		  // bugfixed by: Allan Jensen (http://www.winternet.no)
		  // bugfixed by: Howard Yeend
		  // bugfixed by: Diogo Resende
		  // bugfixed by: Rival
		  // bugfixed by: Brett Zamir (http://brett-zamir.me)
		  //  revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
		  //  revised by: Luke Smith (http://lucassmith.name)
		  //    input by: Kheang Hok Chin (http://www.distantia.ca/)
		  //    input by: Jay Klehr
		  //    input by: Amir Habibi (http://www.residence-mixte.com/)
		  //    input by: Amirouche
		  //   example 1: number_format(1234.56);
		  //   returns 1: '1,235'
		  //   example 2: number_format(1234.56, 2, ',', ' ');
		  //   returns 2: '1 234,56'
		  //   example 3: number_format(1234.5678, 2, '.', '');
		  //   returns 3: '1234.57'
		  //   example 4: number_format(67, 2, ',', '.');
		  //   returns 4: '67,00'
		  //   example 5: number_format(1000);
		  //   returns 5: '1,000'
		  //   example 6: number_format(67.311, 2);
		  //   returns 6: '67.31'
		  //   example 7: number_format(1000.55, 1);
		  //   returns 7: '1,000.6'
		  //   example 8: number_format(67000, 5, ',', '.');
		  //   returns 8: '67.000,00000'
		  //   example 9: number_format(0.9, 0);
		  //   returns 9: '1'
		  //  example 10: number_format('1.20', 2);
		  //  returns 10: '1.20'
		  //  example 11: number_format('1.20', 4);
		  //  returns 11: '1.2000'
		  //  example 12: number_format('1.2000', 3);
		  //  returns 12: '1.200'
		  //  example 13: number_format('1 000,50', 2, '.', ' ');
		  //  returns 13: '100 050.00'
		  //  example 14: number_format(1e-8, 8, '.', '');
		  //  returns 14: '0.00000001'

		  number = (number + '')
		    .replace(/[^0-9+\-Ee.]/g, '');
		  var n = !isFinite(+number) ? 0 : +number,
		    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
		    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
		    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
		    s = '',
		    toFixedFix = function(n, prec) {
		      var k = Math.pow(10, prec);
		      return '' + (Math.round(n * k) / k)
		        .toFixed(prec);
		    };
		  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
		  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
		    .split('.');
		  if (s[0].length > 3) {
		    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
		  }
		  if ((s[1] || '')
		    .length < prec) {
		    s[1] = s[1] || '';
		    s[1] += new Array(prec - s[1].length + 1)
		      .join('0');
		  }
		  return s.join(dec);
		},
	 getCurrentTabId: function(currentTab){
		 var tabId = "";
		 if (currentTab == '1'){
		  tabId = "#pricePlanTabId";
		 }else{
		  tabId = "#tabPendingPricePlan";
		 }
		return tabId;
	},

	redirectNewTab:function(url){
		window.open(url, '_blank');
	},
	setDeleteDialog:function(StrTitle, urlSubmit, idDelete, redirectUrl){
		$(ERROR_DIALOG_ID).dialog({
 	        resizable: false,
 	        modal: true,
 	        title: StrTitle,
 	        height: 'auto',
 	        width: 'auto',
 	        buttons: {
 	        	"Không": function () {
 	                $(this).dialog('close');
 	            },
 	        	"Có": function () {
 	                $(this).dialog('close');
 	                $.ajax({
                 		type: "POST",
                 		url : urlSubmit+"="+idDelete,
                 		success : function(content) {
                 			if(content.Result == "OK"){
                 				DEMOMVC.redirect(redirectUrl);
                 			}else{
                 				DEMOMVC.showFatalError();
                 			}
                 		},
                 		error : function(e) {
                 			DEMOMVC.showFatalError();
                 		}
                 	});	                    	                
 	            }
 	            
 	        }
 	    });
	},
	setupOKDialog: function(dialogId, dialogTitle, reloadPageForUndo){
	   	$(dialogId).dialog({
	           autoOpen: false,
	           show: 'fade',
	           hide: 'fade',
	           width: 'auto',
	           modal: true,
	           title: dialogTitle,
	           modal: true,
	           my: "center",
	           at: "center",
	           of: window,
	           /*buttons:
	                   [{ //OK button
	                       id: 'ok_'+dialogId,
	                       text: 'Ok',
	                       click: function(){
	                    	   $(dialogId).dialog('close');
		                       	return false;
	                       }
	                   },
	                   { //Cancel button
	                      	id: 'cancel_'+dialogId,
	                          text: 'Close',
	                          click: function () {
	                          	$(dialogId).dialog('close');
	                          	return false;
	                          }
	                      }
	                   ],*/
	          close: function () {
	       	   // $('body').css('overflow','scroll');
	           	$(dialogId).dialog('close');
	           	location.reload(true);
	          },
	          open: function( event, ui ) {
	       	   $('body').css('overflow','hidden');
	       	   //$(formId).validationEngine({'binded':false});
	          }
	       });
	   },
	setConfirmDialog:function(dialogId,title, urlSubmit, idShowMessage){
	    	$(dialogId).dialog({
	 	        resizable: false,
	 	        autoOpen: false,
	 	        modal: true,
	 	        title: title,
	 	        width: 'auto',
	 	        buttons: {
	 	        	"Yes": function () {
	 	                $(this).dialog('close');
	 	                $.ajax({
	 	                	type: "POST",
	 	   	    			url : urlSubmit,
	 	   	    			success : function(content) {
	 	   	    				$(idShowMessage).html(content);
	 	   	    				$(idShowMessage).dialog('open');
	 	   	    			},
	 	   	    			error : function(e) {
	 	   	    				DEMOMVC.showFatalError();
	 	   	    			}
	                 	});	                    	                
	 	            },
	 	           "No": function () {
	 	                $(this).dialog('close');
	 	            }
	 	        }
	 	    });
		},
	setConfirmDialogAndShowErrorMessage:function(message, urlPOST, redirectUrl){
			$(ERROR_DIALOG_ID).html(message);
			$(ERROR_DIALOG_ID).dialog('open');
			$(ERROR_DIALOG_ID).dialog({
	 	        resizable: false,
	 	        autoOpen: false,
	 	        title: "Warning message",
	 	        width: 'auto',
	 	        buttons: {
	 	        	"No": function () {
	 	                $(this).dialog('close');
	 	            },
	 	        	"Yes": function () {
	 	                $(this).dialog('close');
	 	                $.ajax({
	                 		type: "POST",
	                 		url : urlPOST,
	                 		success : function(content) {
	                 			if(content.Result == "OK"){	                 				
	                 				DEMOMVC.redirect(redirectUrl);
	                 			}else{
	                 				DEMOMVC.setOKDialogShowErrorMessage(content.Message);
	                 			}
	                 		},
	                 		error : function(e) {
	                 			DEMOMVC.showFatalError();
	                 		}
	                 	});	                    	                
	 	            }
	 	            
	 	        }
	 	    });
		},
	setOKDialogShowErrorMessage:function(message){
			$(ERROR_DIALOG_ID).html(message);
			$(ERROR_DIALOG_ID).dialog('open');
			$(ERROR_DIALOG_ID).dialog({
	 	        resizable: false,
	 	        autoOpen: false,
	 	        title: "Warning message",
	 	        width: 'auto',
	 	        buttons: {
	 	        	"OK": function () {
	 	                $(this).dialog('close');
	 	            },	        	
	 	            
	 	        }
	 	    });
		},
		setTilteDialogShowWWariningMessage:function(message, tilte){
			$(POPUP_DIALOG_ID).html(message);
			$(POPUP_DIALOG_ID).dialog('open');
			$(POPUP_DIALOG_ID).dialog({
	 	        resizable: false,
	 	        autoOpen: false,
	 	        title: tilte,
	 	        width: 'auto',
	 	        buttons: {
	 	        	"OK": function () {
	 	                $(this).dialog('close');
	 	            },	        	
	 	            
	 	        }
	 	    });
		}
};