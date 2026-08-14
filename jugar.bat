@echo off
title Servidor de Juego - Creative Engine
echo Iniciando servidor local...
node server.js
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] No se pudo iniciar el servidor. Asegurate de tener Node.js instalado.
    echo Puedes descargarlo desde: https://nodejs.org
    echo.
    pause
)