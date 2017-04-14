# Visual Studio Code

## User Settings
```javascript
{
    "editor.detectIndentation": false,
    "editor.renderIndentGuides": true,
    "editor.dragAndDrop": true,
    "editor.formatOnSave": true,
    "workbench.colorTheme": "Monokai",
    "workbench.iconTheme": "vs-seti",
    "files.associations": {
        "*.conf": "apacheconf",
        "*.config": "json",
        ".gitignore": "properties"
    },
    "files.autoGuessEncoding": true,
    "files.eol": "\n",
    "files.trimTrailingWhitespace": true,
    "javascript.format.enable": false,
    "html.format.maxPreserveNewLines": 0,
    "git.confirmSync": false,
    "terminal.integrated.shell.windows": "C:\\Program Files\\Git\\bin\\bash.exe",
    "terminal.integrated.fontFamily": "Consolas",
    "terminal.integrated.fontSize": 13,
    "terminal.integrated.enableBold": false,
    "[json]": {
        "editor.formatOnSave": false
    },
    "csscomb.formatOnSave": true,
    "csscomb.preset": {
        "always-semicolon": true,
        "block-indent": "    ",
        "color-case": "lower",
        "color-shorthand": true,
        "element-case": "lower",
        "eof-newline": true,
        "leading-zero": false,
        "quotes": "single",
        "remove-empty-rulesets": true,
        "sort-order-fallback": "abc",
        "strip-spaces": true,
        "unitless-zero": true,
        "vendor-prefix-align": true,
        "space-after-colon": " ", // ':'
        "space-before-colon": "",
        "space-after-combinator": " ", // combinator (i.e. 'p > a')
        "space-before-combinator": " ",
        "space-after-opening-brace": " ", // '{'
        "space-before-opening-brace": " ",
        "space-before-closing-brace": " ", // '}'
        "space-after-selector-delimiter": "\n",
        "space-before-selector-delimiter": "",
        "space-between-declarations": " ", // declarations (i.e. 'color: tomato')
        "sort-order": [
            ["display", "visibility", "float", "clear", "position", "z-index", "box-sizing"],
            ["top", "right", "bottom", "left", "width", "min-width", "max-width", "height", "min-height", "max-height"],
            ["margin", "margin-top", "margin-right", "margin-bottom", "margin-left", "padding", "padding-top", "padding-right", "padding-bottom", "padding-left"],
            ["overflow", "overflow-x", "overflow-y", "clip", "zoom", "flex-direction", "flex-order", "flex-pack", "flex-align"],
            ["border", "border-width", "border-style", "border-color", "border-spacing", "border-collapse", "border-top", "border-right", "border-bottom", "border-left", "border-radius", "border-image"],
            ["font", "font-family", "font-size", "font-weight", "font-style", "font-variant", "font-size-adjust", "font-stretch", "font-effect", "font-emphasize", "font-emphasize-position", "font-emphasize-style", "font-smooth"],
            ["line-height", "text-align", "vertical-align", "white-space", "text-decoration", "text-indent", "text-justify", "letter-spacing", "word-spacing", "text-outline", "text-transform", "text-wrap", "word-wrap", "text-overflow", "word-break"],
            ["color", "background", "background-color", "background-image", "background-repeat", "background-attachment", "background-position", "background-position-x", "background-position-y", "background-clip", "background-origin", "background-size"],
            ["list-style", "list-style-type", "list-style-position", "list-style-image"],
            ["outline", "outline-width", "outline-style", "outline-color", "outline-offset", "opacity", "-webkit-box-shadow", "box-shadow", "text-shadow"]
        ]
    },
    "jshint.options": {
        "sub": true,
        "curly": false, // 循环或者条件语句必须使用花括号包围
        "eqeqeq": false, // 强制使用三等号
        "evil": true, // 控制 eval 使用警告
        "maxdepth": 4, // 最大嵌套深度
        "maxlen": 600, // 最大行数
        "maxparams": 4 // 最多参数个数
    }
}
```

## Extensions

- csscomb

- jshint

- apache

- formatter