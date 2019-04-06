find srts/*.srt | while read line 
do
    dos2unix -c mac $line # fix ^M char in srt files
    node oneLine.js $line $line
done