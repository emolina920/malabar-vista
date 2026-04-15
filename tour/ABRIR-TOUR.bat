@echo off
cd /d "%~dp0"
echo.
echo  Tour Virtual 360 - Malabar Vista
echo  ----------------------------------
echo  Servidor iniciando en http://localhost:8080
echo.
echo  Espera que aparezca "Accepting connections" y luego
echo  abre el navegador en: http://localhost:8080
echo.
echo  Para cerrar el servidor: Ctrl + C
echo.
serve -p 8080
