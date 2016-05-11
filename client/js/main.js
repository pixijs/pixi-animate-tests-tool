"use strict";

require('pixi-animate');

const fs = require('fs');
const path = require('path');
const electron = require('electron');
const remote = electron.remote;
const clipboard = electron.clipboard;
const dialog = remote.require('dialog');
const Renderer = require('./js/renderer');
const Droppable = require('./js/droppable');

const $ = document.querySelector.bind(document);

// Create the renderer to convert the json into 
// a JSON solution which can be used by testing
const renderer = new Renderer(
    $("#view-webgl"),
    $("#view-canvas")
);

// Current filename
let currentName;

// drag-n-drop
new Droppable($('body'), function(err, file) {
    if (err) {
        return dialog.showErrorBox('Drop Error', err.message);
    }
    if (!/\.js$/.test(file)) {
        return dialog.showErrorBox('Invalid Filetype', 'The specified file must be a ".js" file.');
    }
    open(file);
});

// Click on the chooser button to browser for file
$('#choose').addEventListener('click', function() {
    dialog.showOpenDialog({ 
        filters: [{ name: 'JavaScript', extensions: ['js'] }]
    }, function(fileNames){
        if (!fileNames) return;
        open(fileNames[0]);
    });
});

const save = $("#save");
save.addEventListener('click', function() {
    dialog.showSaveDialog({ 
        title: 'Save Solution',
        defaultPath: currentName + '.json',
        filters: [{ name: 'JSON', extensions: ['json'] }]
    }, function(fileName){
        if (!fileName) return;
        fs.writeFileSync(fileName, solution.innerHTML);
    });
});

// Clicking on the solution copies it to the clipboard
const solution = $("#solution");
let copiedId = null;
solution.addEventListener('click', function() {
    if (solution.innerHTML) {
        clipboard.writeText(solution.innerHTML);
        solution.className = "copied";
        if (copiedId) {
            clearTimeout(copiedId);
            copiedId = null;
        }
        copiedId = setTimeout(function(){
            solution.className = "";
            copiedId = null;
        }, 3000);
    }
});

function open(file) {
    save.className = 'disabled';
    renderer.run(file, function(err, result) {
        if (err) {
            return dialog.showErrorBox('Invalid Output Format', err.message);
        }
        solution.innerHTML = JSON.stringify(result, null, '  ');
        save.className = '';
        currentName = path.basename(file, '.js');
    });
}
