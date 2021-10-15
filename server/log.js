// Copyright (C) 2021 Radioactive64

const fs = require('fs');
const readline = require('readline');

// chat
insertChat = function(text, textcolor) {
    var style = '';
    if (textcolor == 'server') {
        style='color: #FFDD00;';
    } else if (textcolor == 'anticheat') {
        style='color: #FF0000; font-weight: bold';
    } else {
        style='color: ' + textcolor + ';';
    }
    logColor(text, '\x1b[36m', 'chat');
    io.emit('insertChat', {text:text, style:style});
};
// logging
log = function(text) {
    logColor(text, '', 'log');
};
logColor = function(text, colorstring, type) {
    var time = new Date();
    var minute = '' + time.getMinutes();
    if(minute.length == 1){
        minute = '' + 0 + minute;
    }
    if(minute == '0'){
        minute = '00';
    }
    console.log('[' + time.getHours() + ':' + minute + '] ' + colorstring + text + '\x1b[0m');
    appendLog('[' + time.getHours() + ':' + minute + '] ' + text, type);
};
warn = function(text) {
    logColor(text, '\x1b[33m', 'warn');

};
error = function(text) {
    logColor(text, '\x1b[31m', 'error');
};
appendLog = function(text, type) {
    var typestring = '--- ';
    if (type == 'error') typestring = 'ERR ';
    if (type == 'warn') typestring = '!WN ';
    if (type == 'log') typestring = 'LOG ';
    if (type == 'chat') typestring = 'CHT ';
    fs.appendFileSync('./server/log.txt', typestring + text + '\n', {encoding: 'utf-8'});
};