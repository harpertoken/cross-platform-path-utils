#!/bin/bash

# Script to rewrite commit messages for conventional commits
# Lowercases the first line and truncates to 60 characters, keeps the rest

read -r first_line
rest=$(cat)

# Lowercase and truncate first line
new_first=$(echo "$first_line" | tr '[:upper:]' '[:lower:]' | cut -c1-60)

# Output the new message
echo "$new_first"
[ -n "$rest" ] && echo "$rest"