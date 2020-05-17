var socket = io.connect();
var testarea = document.getElementById("testing-area");

function input_update_callback() {
    socket.emit('myInputUpdate', {
        contents:testarea.value
    });
}

(function() {
    socket.on('myInputUpdate', function (data) {
        testarea.value = data.contents;
    });
})();
var file = document.getElementById("myFile").files[0];
var reader = new FileReader();
reader.onload = function (e) {
    var textArea = document.getElementById("testing-area");
    textArea.value = e.target.result;
};
reader.readAsText(file);

var exeApp = angular.module('serverExe', [])
.directive('onReadFile', function ($parse) {
    return {
        restrict: 'A',
        scope: false,
        link: function(scope, element, attrs) {
            element.bind('change', function(e) {
                
                var onFileReadFn = $parse(attrs.onReadFile);
                var reader = new FileReader();
                
                reader.onload = function() {
                    var fileContents = reader.result;
                    
                    scope.$apply(function() {
                        onFileReadFn(scope, {
                            'contents' : fileContents
                        });
                    });
                };
                reader.readAsText(element[0].files[0]);
            });
        }
    };
})
.controller('someCtrl', function($scope){

    $scope.displayFileContents = function(contents) {
        console.log(contents);
        $scope.results = contents;
    };

});