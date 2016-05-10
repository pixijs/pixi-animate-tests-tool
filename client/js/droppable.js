/**
 * Add drag-n-drop handling
 * @class Droppable
 */
const Droppable = function(node, callback) {
    node.addEventListener("dragenter", function(ev) {
        ev.preventDefault();
        node.className = Droppable.CLASS_NAME;
    });

    node.addEventListener("dragover", function(ev) {
        ev.preventDefault();
        if(node.className != Droppable.CLASS_NAME);
            node.className = Droppable.CLASS_NAME;
    });

    node.addEventListener("dragleave", function(ev) {
        ev.preventDefault();
        node.className = '';
    });

    node.addEventListener("drop", function(ev) {
        ev.preventDefault();
        node.className = '';
        const fileList = ev.dataTransfer.files;
        if (fileList.length > 1) {
            return callback(new Error('Only one file at a time.'));
        }
        const file = fileList[0];
        callback(null, file.path);
    });
};

/**
 * The name of the class to add to the HTML node
 * @static
 * @property {String} CLASS_NAME
 */
Droppable.CLASS_NAME = 'dragging';

module.exports = Droppable;