config.load_autoconfig()

c.content.blocking.method = 'both'
c.content.blocking.enabled = True

c.qt.args = [
    "disable-gpu-compositing",
    "disable-gpu-rasterization",
]

# Enable qutebrowser's built-in fixes
config.set("content.site_specific_quirks.enabled", True)

# Force Firefox UA ONLY for Google login (this is what worked for you)
config.set(
    "content.headers.user_agent",
    "Mozilla/5.0 (X11; Linux x86_64; rv:115.0) Gecko/20100101 Firefox/115.0",
    "https://accounts.google.com/*"
)

config.bind('<Ctrl+m>', 'spawn mpv {url}', mode='normal')
config.bind('<Ctrl+Shift+m>', 'hint links spawn mpv {hint-url}', mode='normal')
