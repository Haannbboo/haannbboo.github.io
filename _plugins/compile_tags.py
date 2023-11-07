"""
Auto collect tags from all posts and create tag pages.

Author: Hanbo Guo
Contact: ghbhanbo@gmail.com
Credit to: https://rfong.github.io/rflog/2020/02/28/jekyll-tags/

Usage:
    Use Jekyll Hooks to run this script after build.
    ```
    Jekyll::Hooks.register :posts, :post_write do
        system("python3 _plugins/compile_tags.py")
    end
    ```
"""

import glob
import os

POST_DIRS = ["_posts/", "_projects/"]
TAG_DIR = 'tags/'

# Collect all tags from all posts.
def collect_tags(*post_dirs):
    all_tags = []
    for post_dir in post_dirs:
        for fname in glob.glob(post_dir + '*.md'):
            with open(fname, 'r') as f:
                for line in f:
                    line = line.strip().replace('[', '').replace(']', '')
                    # Find tags & cut them.
                    if line.startswith('tags: '):
                        all_tags += [t.strip() for t in line[len("tags: "):].split(',')]
                        break
    return all_tags

# Create tag directory if it does not exist
if not os.path.exists(TAG_DIR):
    os.makedirs(TAG_DIR)

all_tags = collect_tags(*POST_DIRS)
all_tags = sorted(list(set(all_tags)))
old_tags = [tag.split('.')[0] for tag in os.listdir(TAG_DIR)]

# Remove old tags not in all_tags
for tag in old_tags:
    if tag not in all_tags:
        os.remove(TAG_DIR + tag + '.md')
        print('\033[91m' + 'Removing tag page: ' + tag + '\033[0m')
# Remove existing tags in all_tags
all_tags = [tag for tag in all_tags if tag not in old_tags]

# Write new tag pages.
TAG_PAGE_TEMPLATE = '''---
layout: tag
tag: {tag}
title: {tag}
robots: noindex
---'''
for tag in all_tags:
    with open(TAG_DIR + tag + '.md', 'w') as f:
        # Print with color green
        print('\033[92m' + 'Generating tag page: ' + tag + '\033[0m')
        f.write(TAG_PAGE_TEMPLATE.format(tag=tag))