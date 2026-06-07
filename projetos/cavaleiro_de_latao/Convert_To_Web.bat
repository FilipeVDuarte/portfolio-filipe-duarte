@echo off
setlocal

for %%i in (*.png) do ffmpeg -i "%%i" -c:v libwebp -quality 90 "%%~ni.webp"
for %%i in (*.jpg *.jpeg) do ffmpeg -i "%%i" -c:v libwebp -quality 90 "%%~ni.webp"
for %%i in (*.mp4) do ffmpeg -i "%%i" -c:v libvpx-vp9 -crf 33 -b:v 0 -c:a libopus "%%~ni.webm"
for %%i in (*.gif) do ffmpeg -i "%%i" -c:v libvpx-vp9 -crf 33 -b:v 0 -vf "split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" "%%~ni.webm"
pause
