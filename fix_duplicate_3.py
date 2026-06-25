import re

with open("src/pages/Components.tsx", "r", encoding="utf-8") as f:
    content = f.read()

first_index = content.find('id="multi-select"')
second_index = content.find('id="multi-select"', first_index + 1)

if second_index != -1:
    # The duplicate block starts with `                    {/* MultiSelect */}` 
    # Let's find `                    {/* MultiSelect */}` before the second index
    duplicate_start = content.rfind('{/* MultiSelect */}', first_index + 1, second_index)
    if duplicate_start != -1:
        # We also need to remove the separator before it. Let's find `<Separator />` before duplicate_start
        separator_start = content.rfind('<Separator />', first_index + 1, duplicate_start)
        if separator_start != -1:
            duplicate_start = separator_start
        
        # trim the content
        new_content = content[:duplicate_start].rstrip() + '\n                </div>\n            </main>\n        </div>\n    );\n}\n'
        with open("src/pages/Components.tsx", "w", encoding="utf-8") as f:
            f.write(new_content)
        print("Fixed duplicate!")
    else:
        print("Couldn't find duplicate start")
else:
    print("Not duplicated?")
