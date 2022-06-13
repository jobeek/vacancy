class Api {
    constructor() {
        this.phone = "";
        this.valid = true;
        this.ajaxReady = true;
        this.errors = {
            "empty_phone": "Номер телефона не заполнен",
            "empty_code": "Код не заполнен"
        };
    }

    validate(fields) {
        this.valid = true;
        $(".form-error").text("")
            .hide();
        $(".form-agree-label").removeClass("form-danger");
    
        if (typeof fields == "string") {
            fields = [ fields ];
        }
        
        for (let field of fields) {
            switch (field) {
                case "agree":
                    if (!$("input[name=agree]:visible").is(":checked")) {
                        this.valid = false;
                        $(".form-agree-label").addClass("form-danger");
                    }
                    break;
                    
                case "phone":
                    if (!$("input[name=phone]:visible").inputmask("isComplete")) {
                        this.valid = false;
                        $(".form-error-phone").text(this.errors["empty_phone"])
                            .show();
                    }
                    break;
                    
                case "code":
                    let elem = $("input[name=" + field + "]:visible");
                    if ($(elem).length && $(elem).val().length == 0) {
                        this.valid = false;
                        $(".form-error-" + field).text(this.errors["empty_" + field])
                            .show();
                    }
                    break;                    
            }
        }
    }
    
    sendPhone() {
        if (!this.ajaxReady) {
            return;
        }
        
        $(".form-error").hide();
        this.phone = $("input[name=phone]:visible").val();
        
        let data = {
            "_token": $("input[name=_token]").val(),
            "phone": this.phone
        };
        
        $(".form-loader").show();
        $(".form-phone-submit:visible").prop("disabled", true);
        this.ajaxReady = false;
        
        $.post("/api/phone", data, (response) => { 
            this.ajaxReady = true;
            $(".form-loader").hide();
            $(".form-phone-submit:visible").prop("disabled", false);
            
            switch (response.status) {
                case "code":
                    $(".form-phone").hide();
                    $(".form-code .form-text").html(response.text);
                    $(".form-code").show();
                    break;

                case "error":
                    $(".form-error-api").text(response.error)
                        .show();
                    break;

                case "redirect":
                    location.href = response.url;
                    break;
            }
        }, "json");        
    }

    sendCode() {
        if (!this.ajaxReady) {
            return;
        }
        
        $(".form-error").text("")
            .hide();
        
        let data = {
            "_token": $("input[name=_token]").val(),
            "phone": this.phone,
            "code": $("input[name=code]:visible").val()
        };
        
        $(".form-loader").show();
        $(".form-code-submit").prop("disabled", true);
        this.ajaxReady = false;
        
        $.post("/api/code", data, (response) => { 
            this.ajaxReady = true;
            $(".form-loader").hide();
            $(".form-code-submit").prop("disabled", false);
            
            switch (response.status) {
                case "error":
                    $(".form-error-api").text(response.error)
                        .show();
                    break;
    
                case "redirect":
                    location.href = response.url;
                    break;
            }
        }, "json");        
    }
}

var api = new Api();

$(document).ready(function() {
    if (jQuery().inputmask) {
        $(".inputmask-phone").inputmask("phone", {
            showMaskOnHover: false,
            autoUnmask: true,
            clearMaskOnLostFocus: false,
            oncomplete: function() {
                api.sendPhone();
            }
        }).val($(".inputmask-phone").attr("data-prefix"));
    }        
});