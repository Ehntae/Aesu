@echo off
del /S /F /Q dist\public\*
cls
echo Cleaned distribution
gulp clean_all
pause