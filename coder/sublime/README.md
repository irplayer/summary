# Sublime Text

## Settings
```javascript
{
	"default_line_ending": "unix",
	"font_face": "Microsoft YaHei Mono",
	"font_size": 13,
	"show_encoding": true,
	"show_line_endings": true,
	"translate_tabs_to_spaces": true,
	"trim_trailing_white_space_on_save": true,
	"word_wrap": false,
	"wrap_width": 0
}
```

## Key Bindings
```javascript
[
    { "keys": ["alt+f3"], "command": "find_all_under" },
    { "keys": ["ctrl+alt+b"], "command": "toggle_side_bar" },
    { "keys": ["ctrl+alt+f"], "command": "show_panel", "args": {"panel": "find_in_files"} },
    { "keys": ["ctrl+j"], "command": "join_lines" },
    { "keys": ["ctrl+k", "ctrl+t"], "command": "title_case" },
    { "keys": ["ctrl+shift+a"], "command": "alignment" },
    { "keys": ["ctrl+shift+d"], "command": "duplicate_line" }, /*复制行*/
    { "keys": ["ctrl+shift+down"], "command": "swap_line_down" },
    { "keys": ["ctrl+shift+up"], "command": "swap_line_up" },
    { "keys": ["ctrl+t"], "command": "transpose" }, /*交换选区*/
    { "keys": ["f3"], "command": "find_next" },
    { "keys": ["f9"], "command": "sort_lines", "args": {"case_sensitive": false} }
]
```

## Plugins

### Package Control
- Sublime Text 2
```python
import urllib2,os,hashlib; h = '2915d1851351e5ee549c20394736b442' + '8bc59f460fa1548d1514676163dafc88'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); os.makedirs( ipp ) if not os.path.exists(ipp) else None; urllib2.install_opener( urllib2.build_opener( urllib2.ProxyHandler()) ); by = urllib2.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); open( os.path.join( ipp, pf), 'wb' ).write(by) if dh == h else None; print('Error validating download (got %s instead of %s), please try manual install' % (dh, h) if dh != h else 'Please restart Sublime Text to finish installation')
```

- Sublime Text 3
```python
import urllib.request,os,hashlib; h = 'df21e130d211cfc94d9b0905775a7c0f' + '1e3d39e33b79698005270310898eea76'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by)
```

### ConvertToUTF8
```javascript
// Preferences->Package Settings->ConvertToUTF8->Setting-User
```

### Alignment
```javascript
// Preferences->Package Settings->Alignment->KeyBinding-User
[{
    "keys": ["ctrl+shift+a"],
    "command": "alignment"
}]
```

### JSFormat
```javascript
// Preferences->Package Settings->JSFormat->Setting-User
{
    // exposed jsbeautifier options
    "indent_size": 4,
    "indent_char": " ",
    "eol": "\n",
    "indent_level": 0,
    "indent_with_tabs": false,
    "preserve_newlines": false,
    "jslint_happy": false,
    "space_after_anon_function": false,
    "brace_style": "collapse",
    "keep_array_indentation": false,
    "keep_function_indentation": false,
    "space_before_conditional": true,
    "break_chained_methods": false,
    "eval_code": false,
    "unescape_strings": false,
    "wrap_line_length": 0,
    "wrap_attributes": "auto",
    "wrap_attributes_indent_size": 4,
    "end_with_newline": true,
    // jsformat options
    "format_on_save": true,
    "format_selection": true,
    "jsbeautifyrc_files": false,
    "ignore_sublime_settings": false,
    "format_on_save_extensions": ["js", "json", "sublime-settings"]
}
```

### Emmet
```javascript
// Preferences->Package Settings->Emmet->Setting-User
```

### Python PEP8 Autoformat
```javascript
// Preferences->Package Settings->Python PEP8 Autoformat->Setting-User
```
