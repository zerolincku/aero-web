import re

def update_file(filename, translations):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the components section
    match = re.search(r'components:\s*\{', content)
    if match:
        insert_pos = match.end()
        new_content = content[:insert_pos] + "\n" + translations + content[insert_pos:]
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(new_content)
            print(f"Updated {filename}")
    else:
        print(f"Could not find components section in {filename}")

zh_cn = """            multiSelectExample: {
                title: '多选下拉框 (Multi Select)',
                description: '支持搜索和多重选择的自定义下拉菜单。',
            },
            fileUploadExample: {
                title: '文件上传 (File Upload)',
                description: '支持拖拽的通用文件上传区域。',
            },
            imageUploadExample: {
                title: '图片上传 (Image Upload)',
                description: '专门用于图片上传，并在选择后即时预览。',
            },
            navigationMenuExample: {
                title: '顶部导航菜单 (Navigation Menu)',
                description: '适用于站点顶部的带有滑动动画的复杂导航菜单。',
            },
            treeExample: {
                title: '树形控件 (Tree)',
                description: '带有无限层级折叠和图标展示的树形视图。',
            },
            transferExample: {
                title: '穿梭框 (Transfer)',
                description: '双向列表选择组件，用于在两个集合之间转移数据。',
            },"""

en = """            multiSelectExample: {
                title: 'Multi Select',
                description: 'Custom dropdown menu supporting search and multiple selections.',
            },
            fileUploadExample: {
                title: 'File Upload',
                description: 'Generic file upload area with drag and drop support.',
            },
            imageUploadExample: {
                title: 'Image Upload',
                description: 'Specialized for image uploads with instant preview.',
            },
            navigationMenuExample: {
                title: 'Navigation Menu',
                description: 'Complex navigation menu with sliding animations suitable for site headers.',
            },
            treeExample: {
                title: 'Tree',
                description: 'Tree view with infinite nesting and icon display.',
            },
            transferExample: {
                title: 'Transfer',
                description: 'Dual-list selection component used to transfer data between two collections.',
            },"""

update_file('src/i18n/locales/zh-CN.ts', zh_cn)
update_file('src/i18n/locales/en.ts', en)
