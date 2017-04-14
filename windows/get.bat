@echo off
set i=0
set f=setup.exe
for /f "tokens=*" %%i in ('dir/b *.exe') do (
    set f=%%i
)
set v={"version": "%f:~6,4%"}
echo %v%

:loop

if %i% EQU 0 set p=V:
if %i% EQU 1 set p=T:
if %i% EQU 2 set p=W:
if %i% EQU 3 goto end
echo 发布到%p%
del /q/s %p%\media\download\*.exe
copy "%cd%\%f%" %p%\media\download\
echo %v% > %p%\media\download\version.config

set /a i=%i%+1
goto loop
:end
echo 发布完成
pause