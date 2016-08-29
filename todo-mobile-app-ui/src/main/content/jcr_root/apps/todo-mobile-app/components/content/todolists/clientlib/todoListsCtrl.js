angular.module( 'com.icfolson.cid10.todo.mobile.controllers.todolists', [ 'ionic', 'com.icfolson.cid10.todo.mobile.services.todolist' ] )
    .controller( 'TodoListsCtrl', function( $scope, $ionicModal, TodoListService ) {

        $scope.data = {};

        $scope.forms = {
            newList: {
                title: "",
                reset: function() {
                    $scope.forms.newList.title = '';
                }
            }
        };

        $scope.modal = $ionicModal.fromTemplate(
            '<ion-modal-view>' +
            '   <ion-header-bar class="bar-balanced">' +
            '       <h1 class="title">New List</h1>' +
            '   </ion-header-bar>' +
            '   <ion-content>' +
            '      <form class="list" ng-submit="actions.addList( forms.newList.title )">' +
            '         <label class="item item-input">' +
            '            <input type="text" placeholder="List Title" required ng-model="forms.newList.title">' +
            '         </label>' +
            '         <button class="button button-block button-positive" type="submit">Create</button>' +
            '      </form>' +
            '   </ion-content>' +
            '</ion-modal-view>', {
                scope: $scope,
                animation: "slide-in-up"
            }
        );

        var loadLists = function() {
            TodoListService.getLists()
                .then(function (lists) {
                    $scope.data.lists = lists;
                } );
        };

        $scope.actions = {
            openListModal: function() {
                $scope.forms.newList.reset();
                $scope.modal.show();
            },
            addList: function( title ) {
                if ( !title ) {
                    return;
                }
                TodoListService.addList( title )
                    .then( function() {
                        $scope.modal.hide();
                        loadLists();
                    } );
            }
        };

        $scope.$on( '$aem.$ionicView.beforeEnter', function() {
            loadLists();
        } );

    } );