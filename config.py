config.load_autoconfig()
config.bind('<Ctrl+m>', 'spawn mpv {url}', mode='normal')
config.bind('<Ctrl+Shift+m>', 'hint links spawn mpv {hint-url}', mode='normal')

