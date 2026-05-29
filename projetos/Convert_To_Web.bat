for %%i in (*.png) do ffmpeg -i "%%i" -c:v libwebp -lossless 1 "%%~ni.webp"
for %%i in (*.jpg *.jpeg) do ffmpeg -i "%%i" -c:v libwebp -quality 90 "%%~ni.webp"
for %%i in (*.mp4) do ffmpeg -i "%%i" -c:v libvpx-vp9 -crf 33 -b:v 0 -an "%%~ni.webm"
for %%i in (*.gif) do ffmpeg -i "%%i" -c:v libvpx-vp9 -crf 33 -b:v 0 -an "%%~ni.webm"
