var _scholarship;
function pageInit(){
    initPageHeader();
    initPageFooter();
    initScholarship();
    if(_scholarship.isNew()){
        showScholarshipUI(_scholarship);
    }else{
        _scholarship.load();
    }
}

function initPageHeader(){
    var header = document.getElementsByTagName("header")[0];
    $(header).addClass("ui-header ui-header-positive");
    
    var i = new kf.components.icon_return();
    header.appendChild(i);
    var h1 = kf.base.h1UI({ text:"奖学金" });
    header.appendChild(h1);
}

function initPageFooter(){
    var footer = document.getElementsByTagName("footer")[0];
    $(footer).addClass("ui-footer ui-footer-positive ui-btn-group");

    var btnSave = new kf.base.buttonUI({
        className:"ui-btn-lg ui-btn-primary",
        text:"保存",
        click:function(){
            if (!_scholarship.validate()) return false;
            _scholarship.scholarShipAbstract = CKEDITOR.instances.scholarShipAbstract.getData();
            if(_scholarship.isNew()){
                _scholarship.add();
            }else{
                _scholarship.update();
            }
        }
    });
    footer.appendChild(btnSave.export());
}

function initScholarship(){
    _scholarship = new scholarShip();
    _scholarship.scholarShipId = getScholarshipId();
    _scholarship.universityId = getUniversityId();
    if(_scholarship.isNew()){
        _scholarship.addCreateObserver($.goback);
    }else{
        _scholarship.addLoadObserver(showScholarshipUI);
        _scholarship.addUpdateObserver($.goback);
    }
}

function showScholarshipUI(value){
    var fragment = document.createDocumentFragment();
    
    var formItem_ScholarshipName = new kf.components.formItem_text({
        label:"奖学金名称",
        value: value.scholarShipName,
        change: function (scholarShipName) {
            value.scholarShipName = scholarShipName;
        }
    });
    fragment.appendChild(formItem_ScholarshipName.export());

    var formItem_ScholarshipTotal = new kf.components.formItem_text({
        label:"奖学金金额",
        value: value.scholarShipTotal,
        change: function (scholarShipTotal) {
            value.scholarShipTotal = scholarShipTotal;
        }
    });
    fragment.appendChild(formItem_ScholarshipTotal.export());

    var formItem_startYear = new kf.components.formItem_text({
        label:"起始年份",
        value: value.startYear,
        change: function (startYear) {
            value.startYear = startYear;
        }
    });
    fragment.appendChild(formItem_startYear.export());

    var formItem_endYear = new kf.components.formItem_text({
        label:"结束年份",
        value:value.endYear,
        change: function (endYear) {
            value.endYear = endYear;
        }
    });
    fragment.appendChild(formItem_endYear.export());
    

    var div_scholarShipAbstract = kf.base.divUI({ className: "formItem-desc ui-border-b", text: "奖学金简介" });
    fragment.appendChild(div_scholarShipAbstract);

    var textarea = kf.base.textareaUI({ id: "scholarShipAbstract" });
    $(textarea).attr("id", "scholarShipAbstract");
    fragment.appendChild(textarea);
    document.getElementById("scholarShip").appendChild(fragment);

    CKEDITOR.replace("scholarShipAbstract");
    CKEDITOR.instances.scholarShipAbstract.setData(value.scholarShipAbstract);

    
}

function getScholarshipId(){
    var scholarshipId = $.getQueryString("scholarshipId");
    if(scholarshipId == null){
        return 0;
    }else{
        return parseInt(scholarshipId);
    }
}

function getUniversityId(){
    var universityId = $.getQueryString("universityId");
    if(universityId == null){
        return 0;
    }else{
        return parseInt(universityId);
    }
}

