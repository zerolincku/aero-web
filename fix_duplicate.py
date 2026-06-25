import re

with open("src/pages/Components.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# We need to find the duplicated block.
# Let's search for '<ComponentShowcase title="Multi Select"'
parts = content.split('<ComponentShowcase title="Multi Select"')
if len(parts) > 2:
    print(f"Found {len(parts) - 1} instances of Multi Select. Fixing...")
    # The first part is everything before the first Multi Select.
    # We want to keep everything up to the first one, then the first one's content, and drop the second one.
    
    # Actually, let's just find the exact duplicated string if we can.
    # The block started with '<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">' before the Multi Select? No, it's just appended to the grid.
    
    # It might be easier to just remove everything from the second instance onwards up to `</main></div>);}`.
    
    # Let's find the exact index of the second '<ComponentShowcase title="Multi Select"'
    first_index = content.find('<ComponentShowcase title="Multi Select"')
    second_index = content.find('<ComponentShowcase title="Multi Select"', first_index + 1)
    
    if second_index != -1:
        # Now we need to find where the first block was supposed to end, which is `                </div>\n            </main>\n        </div>\n    );\n}`
        # The second block was just concatenated. Let's find the `</main>` after the second index.
        end_of_file = content.find('</main>', second_index)
        if end_of_file != -1:
            # We can just keep content[:second_index] + '\n                </div>\n            </main>\n        </div>\n    );\n}\n'
            new_content = content[:second_index].rstrip() + '\n                </div>\n            </main>\n        </div>\n    );\n}\n'
            with open("src/pages/Components.tsx", "w", encoding="utf-8") as f:
                f.write(new_content)
            print("Fixed duplicate!")
else:
    print("Not duplicated?")
