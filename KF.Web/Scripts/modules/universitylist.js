function pageInit() {
    
}

function initPageHeader() {
    var header = document.getElementsByTagName("header")[0];
    
    var pageHeader = new kf.page.header();
    pageHeader.load({
        canReturn: true,
        headerName: "高校列表",
        action: function () {
            window.location.href = ""
        }
    })

}