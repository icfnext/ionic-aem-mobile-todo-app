angular.module( 'com.icfolson.cid10.todo.mobile.controllers.todolist', [ 'ionic', 'com.icfolson.cid10.todo.mobile.services.todolist' ] )
    .controller( 'TodoListCtrl', function( $scope, $ionicModal, $stateParams, TodoListService ) {

        $scope.data = {};

        $scope.state = {
            processing: false,
            itemUnderInteraction: null
        };

        $scope.forms = {
            newItem: {
                name: "",
                reset: function() {
                    $scope.forms.newItem.name = '';
                }
            }
        };

        $scope.modal = $ionicModal.fromTemplate(
            '<ion-modal-view>' +
            '   <ion-header-bar class="bar-balanced">' +
            '       <h1 class="title">New Item</h1>' +
            '   </ion-header-bar>' +
            '   <ion-content>' +
            '      <form class="list" ng-submit="actions.addItem( data.list.id, forms.newItem.name )">' +
            '         <label class="item item-input">' +
            '            <input type="text" placeholder="Item Name" required ng-model="forms.newItem.name">' +
            '         </label>' +
            '         <button class="button button-block button-positive" type="submit">Create</button>' +
            '      </form>' +
            '   </ion-content>' +
            '</ion-modal-view>', {
                scope: $scope,
                animation: "slide-in-up"
            }
        );

        var loadList = function( listId ) {
            TodoListService.getList( listId )
                .then(function (list) {
                    $scope.data.list = list;
                } );
        };

        $scope.actions = {
            openListModal: function() {
                $scope.forms.newItem.reset();
                $scope.modal.show();
            },
            addItem: function( listId, name ) {
                if ( !name ) {
                    return;
                }
                TodoListService.addItemToList( listId, name )
                    .then( function() {
                        $scope.modal.hide();
                        loadList( listId );
                    } );
            },
            removeItem: function( listId, itemId ) {
                TodoListService.removeItemFromList( listId, itemId )
                    .then( function() {
                        loadList( listId );
                    } );
            },
            toggleItem: function( listId, itemId ) {
                if ( $scope.state.processing ) {
                    return;
                }

                $scope.state.processing = true;

                TodoListService.toggleItemInList( listId, itemId )
                    .finally( function() {
                        $scope.state.processing = false;
                    } );
            },
            interact: function( item ) {
                if ( $scope.state.itemUnderInteraction ) {
                    $scope.state.itemUnderInteraction.interacting = false;
                    $scope.state.itemUnderInteraction = null;
                }
                
                item.interacting = true;
                $scope.state.itemUnderInteraction = item;
            }
        };

        loadList( $stateParams.listId );

    } );