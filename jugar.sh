#!/bin/bash
echo "Iniciando servidor local..."
if ! command -v node &> /dev/null
then
    echo "[ERROR] No se pudo encontrar 'node'. Por favor, instala Node.js desde https://nodejs.org"
    read -p "Presiona Enter para salir..."
    exit 1
fi
node server.js