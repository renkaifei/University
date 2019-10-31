var _university,_majors,_scholarships;
function pageInit(){
    initUniversity();
    initMajors();
    initScholarships();
    $.when(_university.load(), _majors.load(),_scholarships.load()).then(function () {
        $("#tab").on("click", "li", function () {
            document.getElementById("container").innerHTML = "";
            $(this).addClass("current").siblings().removeClass("current");
            var index = $(this).attr("index");
            if (index == 0) {
                showUniversityDescriptionUI(_university);
            } else if (index == 1) {
                showMajorListUI(_majors);
            } else if( index ==2){
                showScholarshipListUI(_scholarships);
            }
        });
    });
}

function initUniversity() {
    _university = new university();
    _university.universityId = getUniversityId();
    _university.addLoadObserver(showPageHeaderUI);
    _university.addLoadObserver(showUniversityDescriptionUI);
}

function showPageHeaderUI(data) {
    var header = document.getElementsByTagName("header")[0];
    $(header).addClass("ui-header ui-header-positive");

    var h1 = kf.base.h1UI({ text: data.universityName });
    header.appendChild(h1);
}

function showUniversityDescriptionUI(data) {

    document.getElementById("container").innerHTML = data.universityAbstract;
}

function initMajors() {
    _majors = new majors();
    _majors.filter.universityId = getUniversityId();
}

function showMajorListUI(data) {
    var fragment = document.createDocumentFragment();
    var ul = document.createElement("ul");
    $(ul).addClass("ui-list");
    fragment.appendChild(ul);
    $.each(data.values, function (i, value) {
        var div_list_info = new kf.components.div_list_info();
        ul.appendChild(div_list_info.export());
        var a_major = kf.base.aUI({ text: value.majorName, href: "/home/university/major/detail.html?majorId=" + value.majorId });
        div_list_info.appendChild(a_major);
    });
    document.getElementById("container").appendChild(fragment);
}

function initScholarships(){
    _scholarships = new scholarShips();
    _scholarships.filter.universityId = getUniversityId();
}

function showScholarshipListUI(data) {
    var fragment = document.createDocumentFragment();
    var ul = document.createElement("ul");
    $(ul).addClass("ui-list");
    fragment.appendChild(ul);
    $.each(data.values, function (i, value) {
        var div_list_info = new kf.components.div_list_info();
        ul.appendChild(div_list_info.export());
        var a_scholarship = kf.base.aUI({ text: value.scholarShipName, href: "/home/university/scholarship.html?scholarshipId=" + value.scholarshipId });
        div_list_info.appendChild(a_scholarship);
    });
}

function getUniversityId() {
    var universityId = $.getQueryString("universityId");
    if (universityId == null) {
        return 0;
    } else {
        return parseInt(universityId);
    }
}