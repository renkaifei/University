/// <reference path="/Scripts/jquery-1.12.4.js" />
/// <reference path="/ckeditor/ckeditor.js" />
//界面页眉
; (function ($) {
    var PageHeader = function (ele, opt) {
        this.$element = ele;
        this.defaults = {
            headerName: "",
            canReturn: true,
            action: null,
            showTotalCount:false
        };
        this.options = $.extend({}, this.defaults, opt);
    };

    PageHeader.prototype = {
        init: function () {
            var _self = this;
            var options = _self.options;
            var fragment = document.createDocumentFragment();
            if (options.canReturn) {
                var i_return = document.createElement("i");
                $(i_return).addClass("ui-icon-return").on("click", function () {
                    history.back();
                });
                fragment.appendChild(i_return);
            }

            var h1_headerNmae = document.createElement("h1");
            $(h1_headerNmae).text(options.headerName);
            fragment.appendChild(h1_headerNmae);

            if (options.action != null) {
                var btnRight = document.createElement("button");
                $(btnRight).text("...");
                $(btnRight).addClass("ui-btn").on("click", options.action);
                fragment.appendChild(btnRight);
            }
            _self.$element.appendChild(fragment);
            $(_self.$element).addClass("ui-header ui-header-positive");
        }
    };

    $.fn.pageHeader = function (options) {
        return this.each(function () {
            var pageHeader = new PageHeader(this, options);
            pageHeader.init();
        });
    };
})(jQuery);
//页面页脚
; (function ($) {
    function PageFooter(ele, opt) {
        this.$element = ele;
        this.defaults = {
            controls: []
        };
        this.options = $.extend({}, this.defaults, opt)
    }

    PageFooter.prototype.createButton = function (control) {
        var button = document.createElement("button");
        $(button).addClass("ui-btn-lg ui-btn-primary").text(control.text);
        if (control["click"]) {
            $(button).on("click", control.click);
        }
        return button;
    }

    PageFooter.prototype.init = function () {
        var _self = this;
        var options = _self.options;
        var fragment = document.createDocumentFragment();
        $.each(options.controls, function (i, control) {
            if(control.type == "button")
                fragment.appendChild(_self.createButton(control));
        });
        this.$element.appendChild(fragment);
        $(this.$element).addClass("ui-footer ui-footer-positive ui-btn-group");
    }

    $.fn.pageFooter = function (options) {
        return this.each(function () {
            var pageFooter = new PageFooter(this, options);
            pageFooter.init();
        });
    }
})(jQuery);
//页面列表
; (function ($) {
    var PageList = function (ele, opt) {
        this.$element = ele;
        var defaults = {
            itemTemplate: function () { },
            events:{}
        };
        this.options = $.extend({}, defaults, opt);
    }

    PageList.prototype = {
        init: function () {
            var _self = this;
            var options = _self.options;
            $(_self.$element).on("click", function (e) {
                var target = e.target;
                var targetevent = $(target).attr("event");
                if (options.events[targetevent]) {
                    options.events[targetevent](e);
                }
            });
        },
        append: function (values) {
            var _self = this;
            var options = _self.options;
            var fragment = document.createDocumentFragment();
            $.each(values, function (i, item) {
                var elem = options.itemTemplate.call(item);
                fragment.appendChild(elem);
            });
            _self.$element.appendChild(fragment);
        },
        clear: function () {
            $(this.$element).html("");
        }
    }

    $.fn.pageList = function (options,values) {
        if (typeof options === "string") {
            return $.fn.pageList.methods[options](this,values);
        }

        return this.each(function () {
            var pageList = new PageList(this, options);
            pageList.init();
            $(this).data("pageList",pageList);
        });
    }

    $.fn.pageList.methods = {
        append: function (jq,values) {
            return jq.each(function () {
                var pageList = $(this).data("pageList");
                pageList.append(values);
            });
        },
        clear: function (jq) {
            return jq.each(function () {
                var pageList = $(this).data("pageList");
                pageList.clear();
            });
        },
        select:function(jq,data){
            
        }
    }
})(jQuery);
//加载更多
; (function ($) {
    function PageMore(elem, opt) {
        this.$element = elem;
        this.defaults = {
            click: null,
            show: false
        };
        this.options = $.extend({}, this.defaults, opt);
    }

    PageMore.prototype.init = function () {
        var _self = this;
        var options = _self.options;
        var fragment = document.createDocumentFragment();
        var div1 = document.createElement("div");
        var div2 = document.createElement("div");
        var i = document.createElement("i");

        div2.appendChild(i);
        div1.appendChild(div2);
        $(div2).addClass("ui-tooltips-cnt ui-border-b").append("加载更多");
        $(div1).addClass("ui-tooltips ui-tooltips-guide").on("click", options.click);
        if (options.show) {
            $(this.$element).css("display", "block");
        } else {
            $(this.$element).css("display", "none");
        }

        fragment.appendChild(div1);
        this.$element.appendChild(fragment);
    }

    PageMore.prototype.show = function (value) {
        $(this.$element).css("display", value ? "block" : "none");
    }

    $.fn.pageMore = function (options, arg1) {
        if (typeof options === "string") {
            return $.fn.pageMore.methods[options](this, arg1);
        }
        return this.each(function () {
            var pageMore = new PageMore(this, options);
            pageMore.init();
            $(this).data("pageMore", pageMore);
        });
    };

    $.fn.pageMore.methods = {
        show: function (jq, value) {
            return jq.each(function () {
                var pageMore = jq.data("pageMore");
                pageMore.show(value);
            });
        }
    };
})(jQuery);
//form表单
; (function ($) {

    function formControls(elem, options) {
        this.$element = elem;
        this.defaults = {
            itemTemplate: function () { },
            events: {},
            value: {}
        }
        this.options = $.extend(this.defaults, options);
    }

    formControls.prototype.textbox = function (opt) {
        var value = this.options.value;
        var fragment = document.createDocumentFragment();

        var div_form_item = document.createElement("div");
        $(div_form_item).addClass("ui-form-item");
        fragment.appendChild(div_form_item);

        var label = document.createElement("label");
        $(label).text(opt.label).addClass("ui-border-r");
        div_form_item.appendChild(label);

        var input = document.createElement("input");
        $(input).attr("type", "text").val(value[opt.field]).on("change", function () {
            value[opt.field] = $(this).val();
        });
        $(input).val(value[opt.field]);
        div_form_item.appendChild(input);

        var i = document.createElement("i");
        $(i).addClass("ui-icon-close").on("click", function () {
            value[opt.field] = "";
            $(input).val("");
        });
        div_form_item.append(i);

        return fragment;

    }

    formControls.prototype.password = function (opt) {
        var value = this.options.value;
        var fragment = document.createDocumentFragment();

        var div_form_item = document.createElement("div");
        $(div_form_item).addClass("ui-form-item");
        fragment.appendChild(div_form_item);

        var label = document.createElement("label");
        $(label).text(opt.label).addClass("ui-border-r");
        div_form_item.appendChild(label);

        var input = document.createElement("input");
        $(input).attr("type", "text").val(value[opt.field]).on("change", function () {
            value[opt.field] = $(this).val();
        });
        $(input).val(value[opt.field]);
        div_form_item.appendChild(input);

        var i = document.createElement("i");
        $(i).addClass("ui-icon-close").on("click", function () {
            value[opt.field] = "";
            $(input).val("");
        });
        div_form_item.append(i);

        return fragment;

    }

    formControls.prototype.select = function (opt) {
        var value = this.options.value;
        var fragment = document.createDocumentFragment();

        var div_form_item = document.createElement("div");
        $(div_form_item).addClass("ui-form-item");
        fragment.append(div_form_item);

        var label = document.createElement("label");
        $(label).text(opt.label).addClass("ui-border-r");
        div_form_item.appendChild(label);

        var div_select = document.createElement("div");
        $(div_select).addClass("ui-select");
        div_form_item.appendChild(div_select);

        var select = document.createElement("select");
        div_select.appendChild(select);
        $.each(opt.initValue.values, function (i, item) {
            var option = document.createElement("option");
            option.value = item[opt.initValue.valueField];
            option.text = item[opt.initValue.textField];
            if (item[opt.initValue.valueField] == value[opt.field]) {
                option.selected = true;
            }
            select.appendChild(option);
        });
        $(select).on("change", function () {
            value[opt.field] = $(this).val();
        });

        return fragment;
    }

    formControls.prototype.editor = function (opt) {
        var fragment = document.createDocumentFragment();

        var div_list_info = document.createElement("div");
        $(div_list_info).addClass("ui-form-item");
        fragment.appendChild(div_list_info);

        var label = document.createElement("label");
        $(label).text(opt.label);
        div_list_info.appendChild(label);

        var textarea = document.createElement("textarea");
        fragment.appendChild(textarea);

        $(textarea).attr("id", opt.id);

        return fragment;
    }

    formControls.prototype.init = function () {
        var _self = this;
        var controls = _self.options.controls;
        var fragment = document.createDocumentFragment();
        $.each(controls, function (i, control) {
            if (control.type == "text") {
                fragment.appendChild(_self.textbox(control));
            } else if (control.type == "password") {
                fragment.appendChild(_self.password(control));
            } else if (control.type == "select") {
                fragment.appendChild(_self.select(control));
            }  else if (control.type = "editor") {
                fragment.appendChild(_self.editor(control));
            }
        });
        this.$element.appendChild(fragment);
        $.each(controls, function (i, control) {
            if (control.type == "editor") {
                $("#" + control.id).editor({}).editor("setData", _self.options.value[control.field] || "");
            }
        });
    }

    formControls.prototype.append = function (controls) {
        var _self = this;
        var fragment = document.createDocumentFragment();
        $.each(controls, function (i, control) {
            if (control.type == "text") {
                fragment.appendChild(_self.textbox(control));
            } else if (control.type == "select") {
                fragment.appendChild(_self.select(control));
            } else if (control.type = "editor") {
                fragment.appendChild(_self.editor(control));
            }
        });
        this.$element.appendChild(fragment);
        $.each(controls, function (i, control) {
            if (control.type == "editor") {
                $("#" + control.id).editor({}).editor("setData", _self.options.value[control.field] || "");
            }
        });
    }

    $.fn.formControls = function (opts, controls) {
        if (typeof (opts) === "string") {
            return $.fn.formControls.methods[opts](this, controls);
        }

        opts = opts || {};

        return this.each(function () {
            var _formControls = new formControls(this, opts);
            _formControls.init();
            $(this).data("formControls", _formControls);
        });
    }

    $.fn.formControls.methods = {
        append: function (jq, values) {
            return jq.each(function () {
                var _formControls = $(this).data("formControls");
                _formControls.append(values);
            });
        }
    }
})(jQuery);
//编辑器
; (function ($) {
    function editor(elem, options) {
        this.$element = elem;
        var defaults = {};
        this.options = $.extend(defaults, options);
    }

    editor.prototype.init = function () {
        var _self = this;
        var id = $(_self.$element).attr("id");
        CKEDITOR.replace(id);
    }

    editor.prototype.setData = function (value) {
        var _self = this;
        var id = $(_self.$element).attr("id");
        CKEDITOR.instances[id].setData(value);
    }

    editor.prototype.getData = function () {
        var _self = this;
        var id = $(_self.$element).attr("id");
        return CKEDITOR.instances[id].getData();
    }

    $.fn.editor = function (options, value) {
        if (typeof options === "string") {
            return $.fn.editor.method[options](this, value);
        }

        return this.each(function () {
            var _editor = new editor(this, options);
            _editor.init();
            $(this).data("editor", _editor);
        });


    }

    $.fn.editor.method = {
        setData: function (jq, value) {
            jq.each(function () {
                var _editor = $(this).data("editor");
                _editor.setData(value);
            });
        },
        getData: function (jq) {
            jq.each(function () {
                var _editor = $(this).data("editor");
                return _editor.getData();
            });
        }
    }
})(jQuery);