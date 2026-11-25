import re
import json

with open('public/Solution Design & MVP Building.md', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's see how chapters are split
chapter_blocks = re.split(r'\n## Chapter ', text)
header_intro = chapter_blocks[0]
raw_chapters = chapter_blocks[1:]

print(f"Parsed {len(raw_chapters)} chapters.")
parsed = []

for idx, ch_text in enumerate(raw_chapters):
    lines = ch_text.splitlines()
    first_line = lines[0].strip()
    # format: "0: Course Overview" or "1: The Human-Centered Mindset"
    num_match = re.match(r'^(\d+):\s*(.*)', first_line)
    if num_match:
        ch_num = int(num_match.group(1))
        ch_title = num_match.group(2).strip()
    else:
        ch_num = idx
        ch_title = first_line

    # Split into sections by '### '
    sec_blocks = re.split(r'\n### ', '\n'.join(lines[1:]))
    sec_intro = sec_blocks[0].strip()
    raw_sections = sec_blocks[1:]

    sections_data = []
    for s_idx, sec_text in enumerate(raw_sections):
        s_lines = sec_text.splitlines()
        s_first = s_lines[0].strip()
        # format: "0.1 What This Subject Covers"
        s_num_match = re.match(r'^([\d\.]+)\s*(.*)', s_first)
        if s_num_match:
            s_num = s_num_match.group(1).strip()
            s_title = s_num_match.group(2).strip()
        else:
            s_num = f"{ch_num}.{s_idx+1}"
            s_title = s_first

        # Subsections by '#### '
        sub_blocks = re.split(r'\n#### ', '\n'.join(s_lines[1:]))
        sub_intro = sub_blocks[0].strip()
        raw_subs = sub_blocks[1:]

        subs_data = []
        for sub_text in raw_subs:
            sub_lines = sub_text.splitlines()
            sub_first = sub_lines[0].strip()
            sub_body = '\n'.join(sub_lines[1:]).strip()
            subs_data.append({
                'title': sub_first,
                'body': sub_body
            })

        sections_data.append({
            'num': s_num,
            'title': s_title,
            'intro': sub_intro,
            'subs': subs_data
        })

    parsed.append({
        'num': ch_num,
        'title': ch_title,
        'intro': sec_intro,
        'sections': sections_data
    })

print(f"Successfully processed {len(parsed)} chapters.")
with open('scratch/parsed_course4_raw.json', 'w', encoding='utf-8') as f_out:
    json.dump(parsed, f_out, indent=2)

print("Saved scratch/parsed_course4_raw.json")
