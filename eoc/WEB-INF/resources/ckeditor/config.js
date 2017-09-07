/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
    config.image_previewText='';
    config.toolbar = 'Full';
    config.extraPlugins += (config.extraPlugins ? ',lineheight' : 'lineheight');
    config.toolbar_Full =
        [
            //['Source','-','Save','NewPage','Preview','-','Templates'],
            //['Cut','Copy','Paste','PasteText','PasteFromWord','-','Print', 'SpellChecker', 'Scayt'],
            //['Undo','Redo','-','Find','Replace','-','SelectAll','RemoveFormat'],
            //['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField'],
            //['BidiLtr', 'BidiRtl'],
            //'/',
            //['Bold','Italic','Underline','Strike','-','Subscript','Superscript'],
            //['NumberedList','BulletedList','-','Outdent','Indent','Blockquote','CreateDiv'],
            ['Anchor'],
            ['Image','Table','HorizontalRule','Smiley','SpecialChar','PageBreak'],
            ['Styles','Format','Font','FontSize','lineheight'],
            ['TextColor','BGColor'],
            ['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock']
            //['Maximize', 'ShowBlocks','-','About']
        ];

    config.toolbar_Basic =
        [
            ['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink','-','About']
        ];
    // Remove some buttons provided by the standard plugins, which are
    // not needed in the Standard(s) toolbar.
    config.removeButtons = 'Underline,Subscript,Superscript';

    config.font_names="宋体/宋体;黑体/黑体;仿宋/仿宋_GB2312;楷体/楷体_GB2312;隶书/隶书;幼圆/幼圆;微软雅黑/微软雅黑;"+config.font_names;
    // Set the most common block elements.
    config.format_tags = 'p;h1;h2;h3;pre';

    // Simplify the dialog windows.
    config.removeDialogTabs = 'image:advanced;link:advanced';

    // 图片上传配置
    config.filebrowserUploadUrl = 'upload.do?type=File';
    config.filebrowserImageUploadUrl = 'upload.do?type=Image';
    config.filebrowserFlashUploadUrl = 'upload.do?type=Flash';

    // 图片浏览配置
    config.filebrowserImageBrowseUrl = '';
    config.image_previewText='';

};
