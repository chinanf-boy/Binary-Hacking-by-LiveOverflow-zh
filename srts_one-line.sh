find srts/*.srt | while read line 
do
    node oneLine.js $line $line
done