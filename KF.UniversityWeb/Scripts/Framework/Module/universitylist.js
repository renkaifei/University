var _provinces,_universitys,_citys;
function pageInit() {
    showPageHeaderUI();
    initProvinces();
    initUniversitys();
    initCitys();
    _provinces.load();
}

function showPageHeaderUI() {
    var header = document.getElementsByTagName("header")[0];
    $(header).addClass("ui-header ui-header-positive");
    var h1 = kf.base.h1UI({ text: "公告：如有使用问题或者建议，请联系我们的客服QQ:798046819,感谢您的反馈" });
    header.appendChild(h1);
}

function initProvinces() {
    _provinces = new provinces();
    _provinces.addLoadObserver(showProvinceListUI);
    _provinces.addLoadObserver(loadCitys);
    $("#provinces").on("click", "label", function () {
        $(this).addClass("current").siblings().removeClass("current");
        var provinceId = $(this).data("provinceId");
        _universitys.filter.provinceId = provinceId;
        _citys.filter.provinceId = provinceId;
        _citys.load();
    });
}

function showProvinceListUI(data) {
    var fragment = document.createDocumentFragment();
    var j =0;
    $.each(data.values, function (i, value) {
        var label_province = kf.base.labelUI({ text: value.provinceName, data: { provinceId: value.provinceId } });
        if (j == 0) $(label_province).addClass("current");
        j++;
        fragment.appendChild(label_province);
    });
    document.getElementById("provinces").appendChild(fragment);
}

function loadCitys(data) {
    _citys.filter.provinceId = data.item(0).provinceId;
    _citys.load();
}

function initCitys() {
    _citys = new citys();
    _citys.filter.provinceId = 0;
    _citys.addLoadObserver(showCityListUI);
    _citys.addLoadObserver(loadUniversitys);
    $("#citys").on("click", "label", function () {
        $(this).addClass("current").siblings().removeClass("current");
        var cityId = $(this).data("cityId");
        _universitys.filter.cityId = cityId;
        _universitys.load();
    });
}

function initUniversitys() {
    _universitys = new universitys();
    _universitys.addLoadObserver(showUniversitysListUI);
    _universitys.addLoadObserver(showSearchResult);
}

function loadUniversitys(data){
    _universitys.filter.cityId = data.item(0).cityId;
    _universitys.load();
}

function showCityListUI(data) {
    var fragment = document.createDocumentFragment();
    var j = 0;
    $.each(data.values, function (i,value) {
        var label_city = kf.base.labelUI({ text: value.cityName, data: { cityId: value.cityId } });
        if (j == 0) $(label_city).addClass("current");
        j++;
        fragment.appendChild(label_city);
    });
    document.getElementById("citys").innerHTML = "";
    document.getElementById("citys").appendChild(fragment);
}

function showUniversitysListUI(data) {
    var fragment = document.createDocumentFragment();
    $.each(data.values, function (i, value) {
        var div_list_info = new kf.components.div_list_info();
        var a_university = kf.base.aUI({ text: value.universityName,href:"/home/university/detail.html?universityId=" + value.universityId });
        div_list_info.appendChild(a_university);
        fragment.appendChild(div_list_info.export());
    });
    document.getElementById("universitys").innerHTML = "";
    document.getElementById("universitys").appendChild(fragment);
}

function showSearchResult(value) {
    document.getElementById("result").innerHTML = "";
    document.getElementById("result").innerHTML = "共：" + value.totalCount + "所高校";
}