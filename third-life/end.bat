@echo off
echo A pasta "A" sera excluida em 60 segundos...
timeout /t 10 /nobreak >nul

:: Caminho da pasta "A" na mesma pasta do .bat
set "PASTA=%~dp0a"

echo Excluindo pasta: %PASTA%
rmdir /s /q "%PASTA%"

echo Pasta excluida com sucesso!
pause
