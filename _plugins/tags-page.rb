#!/usr/bin/env ruby
#
# Generate tags page

Jekyll::Hooks.register :site, :post_write do
    system("python3 _plugins/compile_tags.py")
end