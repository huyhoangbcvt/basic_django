var Script = function () {

    /*$.validator.setDefaults({
        submitHandler: function() { alert("submitted!"); }
    });*/

    $().ready(function() {
        // validate the comment form when it is submitted
        $("#feedback_form").validate();

        // validate signup form on keyup and submit
        $("#register_form").validate({
            rules: {
                fullname: {
                    required: true,
                    minlength: 6
                },
                address: {
                    required: true,
                    minlength: 10
                },
                username: {
                    required: true,
                    minlength: 4
                },
                password: {
                    required: true,
                    minlength: 6
                },
                confirm_password: {
                    required: true,
                    minlength: 6,
                    equalTo: "#password"
                },
                email: {
                    required: true,
                    email: true
                },
                topic: {
                    required: "#newsletter:checked",
                    minlength: 2
                },
                agree: "required"
            },
            messages: {                
                fullname: {
                    required: "Vui lòng nhập họ & tên",
                    minlength: "Ho tên phải dài ít nhất 6 ký tự."
                },
                address: {
                    required: "Vui lòng nhập địa chỉ",
                    minlength: "Địa chỉ phải dài ít nhất là 10 ký tự."
                },
                username: {
                    required: "Vui lòng nhập tên đăng nhập",
                    minlength: "Tên đăng nhập phải dài ít nhất là 4 ký tự."
                },
                password: {
                    required: "Vui lòng nhập mật khẩu",
                    minlength: "Mật khẩu phải dài ít nhất là 6 ký tự."
                },
                confirm_password: {
                    required: "Vui lòng nhập xác nhận mật khẩu.",
                    minlength: "Xác nhận mật khẩu phải dài ít nhất là 6 ký tự.",
                    equalTo: "Vui lòng nhập xác nhận phải giống mật khẩu."
                },
                email: "Vui lòng nhập đúng địa chỉ email.",
                agree: "Vui lòng chọn chấp nhận điều kiện."
            }
        });

        // propose username by combining first- and lastname
        $("#username").focus(function() {
            var firstname = $("#firstname").val();
            var lastname = $("#lastname").val();
            if(firstname && lastname && !this.value) {
                this.value = firstname + "." + lastname;
            }
        });

        //code to hide topic selection, disable for demo
        var newsletter = $("#newsletter");
        // newsletter topics are optional, hide at first
        var inital = newsletter.is(":checked");
        var topics = $("#newsletter_topics")[inital ? "removeClass" : "addClass"]("gray");
        var topicInputs = topics.find("input").attr("disabled", !inital);
        // show when newsletter is checked
        newsletter.click(function() {
            topics[this.checked ? "removeClass" : "addClass"]("gray");
            topicInputs.attr("disabled", !this.checked);
        });
        
        
        
        // validate signup form on keyup and submit
        $("#login_form").validate({
            rules: {
            	tendangnhap: {
                    required: true,
                    minlength: 4
                },
                password: {
                    required: true,
                    minlength: 6
                }
            },
            messages: {                
                username: {
                    required: "Vui lòng nhập tên đăng nhập.",
                    minlength: "Tên đăng nhập phải dài ít nhất là 4 ký tự."
                },
                password: {
                    required: "Vui lòng nhập mật khẩu.",
                    minlength: "Tên đăng nhập phải dài ít nhất là 6 ký tự."
                }
            }
        });
        
        
     // validate signup form on keyup and submit
        $("#register_form").validate({
            rules: {
            	tendangnhap: {
                    required: true,
                    minlength: 4
                },
                tencongty: {
                    required: true,
                    minlength: 6
                },
                madvi: {
                    required: true,
                    minlength: 7
                },
                masothue: {
                    required: true,
                    minlength: 10
                },
                coquanbhxh: {
                    required: true,
                },
                email: {
                    required: true,
                    email: true
                },
                tochuc: {
                    required: true,
                },
                serial: {
                    required: true,
                },
                ngaybatdau: {
                    required: true,
                },
                ngayhethan: {
                    required: true,
                }
            },
            messages: {                
                tendangnhap: {
                    required: "Vui lòng nhập tên đăng nhập",
                    minlength: "Tên đăng nhập phải dài ít nhất là 4 ký tự."
                },
                tencongty: {
                    required: "Vui lòng nhập tên công ty",
                    minlength: "Tên công ty phải dài ít nhất là 6 ký tự."
                },
                madvi: {
                    required: "Vui lòng nhập mã đơn vị",
                    minlength: "Mã đơn vị phải dài ít nhất là 7 ký tự."
                },
                masothue: {
                    required: "Vui lòng nhập mã số thuế",
                    minlength: "Mã số thuế phải dài ít nhất là 10 ký tự."
                },
                coquanbhxh: {
                    required: "Vui lòng chọn cơ quan bhxh"
                },
                email: {
                    required: "Vui lòng nhập nhập email"
                },
                tochuc: {
                    required: "Vui lòng nhập tổ chức chứng thực",
                },
                serial: {
                    required: "Vui lòng nhập nhập serial chứng thư số",
                },
                ngaybatdau: {
                    required: "Vui lòng nhập ngày bắt đầu chứng thư số",
                },
                ngayhethan: {
                    required: "Vui lòng nhập ngày hết hạn chứng thư số",
                }
            }
        });
        
        
        
        
    });
}();