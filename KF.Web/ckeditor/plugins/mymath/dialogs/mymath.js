CKEDITOR.dialog.add("mymathDialog", function (editor) {
    return {
        title: "表达式",
        minWidth: 400,
        minHeight: 200,
        contents: [
            {
                id: "表达式",
                label: "",
                elements: [
                    {
                        type: "text",
                        id: "expression",
                        label:"输入"
                    },
                    {
                        type: "text",
                        id: "preview",
                        label:"预览"
                    }
                ]
            }
        ],
        onOk: function () {

        }
    }
});