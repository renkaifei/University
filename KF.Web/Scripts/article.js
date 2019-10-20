/// <reference path="jquery-1.12.4.js" />
/// <reference path="common.js" />

function article() {
    this.articleId = 0;
    this.articleTitle = "";
    this.articleContent = "";
    this.author = "";
    this.createDate = "";
    this.articleType = 1;
}

article.prototype.validate = function () {
    if (this.articleTitle == "") {
        $.showErrorMessage("文章名称不能为空");
        return false;
    }
    if (this.author == "") {
        $.showErrorMessage("作者不能为空");
        return false;
    }
    return true;
}

article.prototype.isNew = function () {
    return this.articleId == 0;
}

article.prototype.add = function () {
    var _self = this;
    var articleContent = $.strToUTF8(_self.articleContent).join(",");
    $.ajax({
        url: "/addservice",
        data: {
            articleTitle: _self.articleTitle,
            articleContent: articleContent,
            author: _self.author,
            articleType:_self.articleType,
            service: "article"
        },
        success: function (ret) {
            _self.articleId = ret.ArticelId;
            _self.afterAdd();
        }
    });
}

article.prototype.afterAdd = function () { }

article.prototype.update = function () {
    var _self = this;
    var articleContent = $.strToUTF8(_self.articleContent).join(",");
    $.ajax({
        url: "/updateService",
        data: {
            articleId: _self.articleId,
            articleTitle: _self.articleTitle,
            articleContent: articleContent,
            author: _self.author,
            articleType:_self.articleType,
            service: "article"
        },
        success: function (ret) {
            _self.afterUpdate();
        }
    });
}

article.prototype.afterUpdate = function () { }

article.prototype.delete = function () {
    var _self = this;
    $.ajax({
        url: "/deleteService",
        data: {
            articleId: _self.articleId,
            service:"article"
        },
        success: function (ret) {
            _self.afterDelete();
        }
    });
}

article.prototype.afterDelete = function () { }

article.prototype.load = function () {
    var _self = this;
    $.ajax({
        url: "/getoneService",
        data: {
            articleId: _self.articleId,
            service:"article"
        },
        success: function (ret) {
            _self.articleId = ret.ArticleId;
            _self.articleTitle = ret.ArticleTitle;
            var articleContent = ret.ArticleContent;
            _self.articleContent = $.decodeUTF8(articleContent);
            _self.author = ret.Author;
            _self.createDate = ret.CreateDate.split('T')[0];
            _self.articleType = ret.ArticleType;
            _self.afterLoad();
        }
    })
}

article.prototype.afterLoad = function () {
    
}

function articleUI() {

}

articleUI.prototype.listItemUI = function () {
    var _self = this;
    var fragment = document.createDocumentFragment();

    var li = document.createElement("li");
    fragment.appendChild(li);

    var div_list_info = document.createElement("div");
    $(div_list_info).addClass("ui-list-info");
    li.appendChild(div_list_info);

    var p_articleName = document.createElement("p");
    $(p_articleName).text(_self.articleTitle).attr("event","detail").data("article",_self);
    div_list_info.appendChild(p_articleName);

    var p_operation = document.createElement("p");
    div_list_info.appendChild(p_operation);

    var span_delete = document.createElement("span");
    $(span_delete).addClass("ui-label-s").text("删除").data("article", _self)
        .attr("event", "del").data("removeElem", li);
    p_operation.appendChild(span_delete);

    return fragment;
    
}

function articles() {
    entities.call(this);
    this.filter = {
        startNumber: 1,
        length: 50,
        author: "",
        articleType:0,
    };
}

$.extend(articles.prototype, entities.prototype);

articles.prototype.haveMore = function () {
    var _self = this;
    return _self.totalCount > _self.pageIndex * _self.pageSize;
}

articles.prototype.load = function () {
    var _self = this;
    $.ajax({
        url: "/getlistService",
        type: "post",
        dataType: "json",
        data: {
            author: _self.filter.author,
            articleType:_self.filter.articleType,
            startNumber: _self.filter.startNumber,
            length: _self.filter.length,
            service:"article"
        },
        success: function (ret) {
            _self.values = {};
            $.each(ret.Values, function (i, item) {
                var _article = new article();
                _article.articleId = item.ArticleId;
                _article.articleTitle = item.ArticleTitle;
                _article.author = item.Author;
                _article.createDate = item.CreateDate.split("T")[0];
                _article.articleType = item.ArticleType,
                _self.add(_article.articleId,_article);
            });
            _self.afterLoad();
        }
    })
}

articles.prototype.afterLoad = function () { }

articles.prototype.loadMore = function () {
    var _self = this;
    _self.filter.startNumber = _self.filter.startNumber + _self.filter.length - 1;
    _self.load();
}