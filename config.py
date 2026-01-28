config.load_autoconfig()

c.content.blocking.method = 'both'
c.content.blocking.enabled = True

config.bind('<Ctrl+m>', 'spawn mpv {url}', mode='normal')
config.bind('<Ctrl+Shift+m>', 'hint links spawn mpv {hint-url}', mode='normal')
