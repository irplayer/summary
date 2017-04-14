@echo off
set p=V:\media\download\
set f=setup.exe
for /f "tokens=*" %%i in ('dir/b *.exe') do (
    if exist "%p%%%i" (
        echo %%i -exist
    ) else (
        copy "%cd%\%%i" %p%
        echo %%i -copy
    )
    set f=%%i
)
copy "%cd%\%f%" %p%setup.exe
echo %f% -current
pause