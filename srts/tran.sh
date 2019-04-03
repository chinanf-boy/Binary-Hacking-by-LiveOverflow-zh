source ~/.bashrc
find *.srt | while read line
do 
    echo "$line"
    local-translateSrt "$line"
done
