import re

def patch_file(filepath, is_zh):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if is_zh:
        pagination_repl = """            pagination: {
                showing: '显示第 {{start}} - {{end}} 条，共 {{total}} 条',
                previous: '上一页',
                next: '下一页',
                more: '更多',
            },
            timePicker: {
                hour: '时',
                minute: '分',
            },"""
    else:
        pagination_repl = """            pagination: {
                showing: 'Showing {{start}} to {{end}} of {{total}} results',
                previous: 'Previous',
                next: 'Next',
                more: 'More pages',
            },
            timePicker: {
                hour: 'HH',
                minute: 'MM',
            },"""
            
    content = re.sub(r'pagination:\s*\{[^}]+\},', pagination_repl, content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

patch_file('src/i18n/locales/zh-CN.ts', True)
patch_file('src/i18n/locales/en.ts', False)
