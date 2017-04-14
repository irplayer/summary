@echo off
set i=0
set f=setup.exe
:loop
if %i% EQU 0 set p=V:\media\download\
if %i% EQU 1 set p=T:\media\download\
if %i% EQU 2 goto end
echo 发布到%p%
for /f "tokens=*" %%i in ('dir/b *.exe') do (
    if exist "%p%%%i" (
        echo %%i -exist
    ) else (
        copy "%cd%\%%i" %p%
        echo %%i -copy
    )
    set f=%%i
)

if %i% EQU 0 (
    set v={"version": "debug"}
) else (
    set v={"version": "%f:~6,4%"}
)
echo %v% > %p%version.config
echo %f% -current

set /a i=%i%+1
goto loop
:end
echo 发布完成
pause