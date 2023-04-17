@echo off
title Ung dung xuat nhap hoa don
start http://localhost:3000
cd %cd%\server
npm run production
cmd /k "pause"