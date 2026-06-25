import re

with open("src/pages/Components.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# We know the first MultiSelect card starts somewhere before line 2160.
# The `showcases_to_add` from earlier starts with something like `                {/* Advanced Components */}` or just `<Card>` 
# Let's find `<Card id="multi-select">`
parts = content.split('<Card id="multi-select">')
if len(parts) > 2:
    print(f"Found {len(parts) - 1} instances of Multi Select Card.")
    # The first one is at parts[1], the second at parts[2]
    # We want to remove the second block.
    # The duplicate block starts right before the second '<Card id="multi-select">'
    # Wait, in the Python string `split()`, `parts[0]` is the content before the first.
    # So `parts[0] + '<Card id="multi-select">' + parts[1]` is everything up to the end of the first block.
    # Where does the first block end? It ends where the duplicate begins.
    # So the duplicate begins with exactly the same content as the start of the first block.
    # Let's just find the exact index of `                {/* Advanced Components */}` or similar.
    
    # Or simpler: cut everything from the second `<Card id="multi-select">` to the end of the file, and replace with `                </div>\n            </main>\n        </div>\n    );\n}\n`
    # Because the duplicate was just appended before the end of the file.
    # Let's verify what's after parts[2].
    
    first_index = content.find('<Card id="multi-select">')
    second_index = content.find('<Card id="multi-select">', first_index + 1)
    
    if second_index != -1:
        # Keep everything up to second_index
        new_content = content[:second_index].rstrip() + '\n                </div>\n            </main>\n        </div>\n    );\n}\n'
        with open("src/pages/Components.tsx", "w", encoding="utf-8") as f:
            f.write(new_content)
        print("Fixed duplicate by trimming the file at the second instance!")
else:
    print("Not duplicated based on <Card id=\"multi-select\"> ?")
