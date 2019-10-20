CKEDITOR.plugins.add("mymath", {
    icons: "mymath",
    init: function (editor) {
        editor.addCommand("mymath", new CKEDITOR.dialogCommand("mymathDialog"));
        editor.ui.addButton("mymath", {
            label: "表达式",
            command: "mymath",
            toolbar: "insert"
        });
        CKEDITOR.dialog.add('mymathDialog', this.path + 'dialogs/mymath.js');
    }
});