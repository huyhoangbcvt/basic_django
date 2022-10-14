/**
 * @author Hoanghh
 * @returns
 */
$(document).ready(function () {
	initResolution();
});

$(window).resize(function() {
	initResolution();
});
function initResolution() {
	var w_table = $('div.jtable-main-container > table.jtable').width();
    $('div.jtable-main-container > div.jtable-bottom-panel').css("width", w_table+1);
};
    
window.load = function () {
    //setWidthDirective();
    //initOnoffSwitch();
};

function _hostname() {
    return location.protocol + '//' + location.hostname;
}

/**
 * Click active Menu
 * @returns
 */
$(document).on('click', '.menu-mobile li > a',function() { 
    $('li').removeClass();
    $(this).parent().addClass('active');
});

/**
 * 
 * @returns: format date
 */
$.fn.datepicker.defaults.format = "yyyy-mm-dd hh:mm:ss";
$.fn.datepicker.defaults.language = 'vi';
$('.datetimepicker').datepicker({
	format : 'yyyy-mm-dd hh:mm:ss',
	startDate : '-3d'
});


$.fn.datepicker.defaults.format = "dd/mm/yyyy";
$.fn.datepicker.defaults.language = 'vi';
$('.datepicker').datepicker({
	format : 'dd/mm/yyyy',
	startDate : '-3d'
});
/**
 * Scroll hidden bar
 * @returns
 */
var senseSpeed = 5;
var previousScroll = 0;
$(window).scroll(function(event){
   var scroller = $(this).scrollTop();
   if (scroller-senseSpeed > previousScroll){
	   $("ul.navigation-mobile").filter(':not(:animated)').slideDown();
   } else if (scroller+senseSpeed < previousScroll) {
	   $("ul.navigation-mobile").filter(':not(:animated)').slideUp();
   }
   previousScroll = scroller;
});

function inputFile() {
    $(document).off('change', 'input.inputfile');
    $(document).on('change', 'input.inputfile', function (e) {
        var $label = $(this).next(), labelVal = $label.html(), fileName = '';
        if (this.files && this.files.length > 1)
            fileName = ($(this).attr('data-multiple-caption') || '').replace('{count}', this.files.length);
        else
            fileName = e.target.value.split('\\').pop();

        if (fileName)
            $label.find('span.tt').html(fileName);
        else
            $label.html(labelVal);
    });
}

/**
 * Function On - Off
 * @returns
 */
function initOnoffSwitch() {
    jQuery("input.onoffswitch-checkbox").each(function () {
        if (jQuery(this).val() === "Y") {
            jQuery(this).prop("checked", true);
        } else {
            jQuery(this).prop("checked", false);
        }
    });
    jQuery(document).on("change", "input.onoffswitch-checkbox", function () {
        if (jQuery(this).prop("checked") === true) {
            jQuery(this).val("Y");
        } else {
            jQuery(this).val("N");
        }
    });
}

function getSwitchVal(idCheckbox) {
    var v = document.getElementById(idCheckbox).value;
    if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
        return (v === 'Y') ? 'N' : 'Y';
    }
    return v;
}

/**
 * @param {string} stat : {show} || {hide}
 * @param {String} msg
 * @returns {undefined}
 */
function actionLoading(stat, msg) {
    msg = msg || 'loading';
    $('.wbn-loading>div>div').removeClass('hidden');
    if (stat === 'show') {
        $('.wbn-loading').removeClass('hidden');
        $('.wbn-loading label').html(msg);
    } else if (stat === 'hide') {
        $('.wbn-loading').addClass('hidden');
        $('.wbn-loading label').text('loading');
    } else if (stat === 'invisible') {
        $('.wbn-loading').removeClass('hidden');
        $('.wbn-loading>div>div').addClass('hidden');
    }
}

/**
 * @param {int} time default 5s
 * @returns {undefined}
 * @param {callback} after close
 */
function swalSuccess(message, time, callback) {
    time = (typeof time != 'undefined' && time != null) ? time : 5000;
    var option = {
        type: 'success',
        title: message,//'Cập nhật thành công ！',
        allowOutsideClick: true,
        timer: time
    };
    if (callback !== undefined) {
        option['onClose'] = callback;
    }
    swal(option);
}

/**
 * @param {text} info
 * @param {int} time default 5s
 * @returns {undefined}
 */

function swalInfo(info, useHtml, time) {
    time = (typeof time !== 'undefined' && time !== null) ? time : 5000;
    useHtml = typeof useHtml !== 'undefined' ? useHtml : false;
    if (useHtml) {
        swal({
            type: 'info',
            title: 'INFO',//INFO
            allowOutsideClick: false,
            html: info,
            timer: time
        });
    } else {
        swal({
            type: 'info',
            title: 'THÔNG TIN', //INFORMATION
            allowOutsideClick: false,
            text: info,
            timer: time
        });
    }
}

/**
 * @param {text} message
 * @param {int} time default 5s
 * @returns {undefined}
 */
function swalWarning(message, time) {
    time = (typeof time != 'undefined' && time != null) ? time : 5000;
    swal({
        type: 'warning',
        title: 'CẢNH BÁO',//WARNING
        text: message,
        allowOutsideClick: false
        //timer: time
    });
}

function swalConfirmLvl1(option) {
    option.type = option.type || 'warning';
    option.title = option.title || 'CẢNH BÁO';//WARNING
    option.text = option.text || 'message';
    option.confirmButtonText = option.confirmButtonText || 'Đồng ý';
    option.allowOutsideClick = option.allowOutsideClick || false;
    swal({
        title: option.title,
        text: option.text,
        type: option.type,
        confirmButtonText: option.confirmButtonText,
        confirmButtonColor: '#135CA9',
        allowOutsideClick: option.allowOutsideClick
    }).then(function (isConfirm) {
        if (isConfirm) {
            if (typeof option.callback != 'undefined')
                option.callback();
        }
    });
}

function swalInfoConfirm(option) {
    option.type = option.type || 'info';
    option.title = option.title || 'THÔNG TIN';//INFORMATION
    option.text = option.text || 'message';
    option.confirmButtonText = option.confirmButtonText || 'Đồng ý';
    option.allowOutsideClick = option.allowOutsideClick || false;
    option.time = option.time || 15000;//15s
    swal({
        title: option.title,
        text: option.text,
        type: option.type,
        confirmButtonText: option.confirmButtonText,
        confirmButtonColor: '#135CA9',
        allowOutsideClick: option.allowOutsideClick,
        timer: option.time
    }).then(function (isConfirm) {
        if (isConfirm) {
            if (typeof option.callback != 'undefined')
                option.callback();
        }
    });
}

/**
 * @param {int} time default 5s
 * @returns {undefined}
 */
function swalError(message, time) {
    time = (typeof time != 'undefined' && time != null) ? time : 5000;
    swal({
        type: 'error',
        title: message,
        allowOutsideClick: true,
        timer: time
    });
}

/**
 * @param {object} option:{
 *          title : 'Delete',
 *          isAjax : true,
 *          type : 'info'||'warning' || 'question',
 *          text: 'Are you sure delete it?',
 *          callback:function(){
 *              return 3 > 0 ? 1 : 0;
 *          },
 *          callbackCancel:function(){
 *              alert('canceled');
 *          },
 *          callbackSuccess:function(){
 *              alert('Success');
 *          },
 *          callbackError:function(){
 *              alert('Error');
 *          }
 *       }
 */
function swalConfirm(option) {
    option.type = option.type || 'question';
    option.title = option.title || 'Confirm';
    option.text = option.text || 'Text';
    option.confirmButtonText = option.confirmButtonText || "Đồng ý";
    option.cancelButtonText = option.cancelButtonText || "Hủy";
    option.allowOutsideClick = option.allowOutsideClick || false;
    swal({
        title: option.title,
        text: option.text,
        type: option.type,
        showCancelButton: true,
        confirmButtonText: option.confirmButtonText,
        cancelButtonText: option.cancelButtonText,
        confirmButtonColor: '#0080C7',
        cancelButtonColor: '#E00',
        allowOutsideClick: option.allowOutsideClick
    }).then(function (isConfirm) {
        if (isConfirm) {
            var rs = option.callback();
            if (rs > 0) {
                if (typeof option.callbackSuccess != 'undefined')
                    option.callbackSuccess();
                else if (!option.isAjax)
                    swalSuccess();
            } else {
                if (typeof option.callbackError != 'undefined')
                    option.callbackError();
                else if (!option.isAjax)
                    swalError();
            }
        }
    }, function (dismiss) {
        if (dismiss === 'cancel' && typeof option.callbackCancel != 'undefined') {
            option.callbackCancel();
        }
    });
}

/**
 * @param {object} option:{
 *          title : 'Delete',
 *          type : 'info'||'warning' || 'question',
 *          text: 'Are you sure delete it?',
 *          callback:function(){
 *              return 3 > 0 ? 1 : 0;
 *          },
 *          callbackCancel:function(){
 *              alert('canceled');
 *          }
 *       }
 */
function swalConfirmLvl2(option) {
    option.type = option.type || 'warning';
    option.title = option.title || '';
    option.text = option.text || '';
    option.confirmButtonText = option.confirmButtonText || 'Đồng ý';
    option.cancelButtonText = option.cancelButtonText || 'Hủy';
    option.allowOutsideClick = option.allowOutsideClick || false;
    swal({
        title: option.title,
        text: option.text,
        type: option.type,
        showCancelButton: true,
        confirmButtonText: option.confirmButtonText,
        cancelButtonText: option.cancelButtonText,
        confirmButtonColor: '#0080C7',
        cancelButtonColor: '#E00',
        allowOutsideClick: option.allowOutsideClick
    }).then(function (isConfirm) {
        if (isConfirm) {
            if (typeof option.callback != 'undefined')
                option.callback();
        }
    }, function (dismiss) {
        if (dismiss === 'cancel' && typeof option.callbackCancel != 'undefined') {
            option.callbackCancel();
        }
    });
}

/**
 * @author hoanghh
 */
function random_string(len) {
    len = len || 8;
    var $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
            chars = $chars.split(''),
            str = "",
            size = chars.length;
    for (var i = 0; i < len; i++) {
        var lastNumber = Math.floor(Math.random() * size);
        str += chars[lastNumber];
    }
    return str;
}

function validateInputSearch(txt) {
    var strTest = /^[a-zA-Z0-9-.@ áàảãạăắặằẳẵâấầẩẫậđéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵÁÀẢÃẠĂẮẶẰẲẴÂẤẦẨẪẬĐÉÈẺẼẸÊẾỀỂỄỆÍÌỈĨỊÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÚÙỦŨỤƯỨỪỬỮỰÝỲỶỸỴäÄüÜöÖß]*$/;
    return strTest.test(txt);
}

/**
 * @author hoanghh:: get parameter from key
 * @param sParam
 * @returns
 */
function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}

/**
 * @author: hoanghh -> validate input only number
 * @param evt
 * @returns
 */
function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

/**
 * @author: hoanghh
 * Function error JS
 * @param jqXHR
 * @param exception
 * @returns
 */
function getErrorMessage(jqXHR, exception) {
    var msg = '';
    if (jqXHR.status === 0) {
        msg = 'Not connect.\n Verify Network.';
    } else if (jqXHR.status == 404) {
        msg = 'Requested page not found. [404]';
    } else if (jqXHR.status == 500) {
        msg = 'Internal Server Error [500].';
    } else if (exception === 'parsererror') {
        msg = 'Requested JSON parse failed.';
    } else if (exception === 'timeout') {
        msg = 'Time out error.';
    } else if (exception === 'abort') {
        msg = 'Ajax request aborted.';
    } else {
        msg = 'Uncaught Error.\n' + jqXHR.responseText;
    }
    console.log(msg);
}

function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
}

function b64DecodeUnicode(str) {
    return decodeURIComponent(Array.prototype.map.call(atob(str), function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}