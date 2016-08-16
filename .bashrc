# If not running interactively, don't do anything
[[ $- != *i* ]] && return

test -f ~/.bash_aliases && . ~/.bash_aliases