angular.module( 'com.icfolson.cid10.todo.mobile.controllers.todolist', [ 'ionic', 'com.icfolson.cid10.todo.mobile.services.todolist' ] )
    .controller( 'TodoListCtrl', function( $scope, $ionicModal, $stateParams, TodoListService ) {

        $scope.data = {};

        $scope.state = {
            processing: false,
            itemUnderInteraction: null
        };

        $scope.forms = {
            itemEditor: {
                name: "",
                reset: function() {
                    $scope.forms.itemEditor.name = '';
                }
            }
        };

        $scope.modal = $ionicModal.fromTemplate(
            '<ion-modal-view>' +
            '   <ion-header-bar class="bar-balanced">' +
            '       <h1 class="title">New Item</h1>' +
            '       <button class="button button-clear icon ion-checkmark" ng-click="actions.addOrUpdateItem( data.list.id, forms.itemEditor.name )"></button>' +
            '   </ion-header-bar>' +
            '   <ion-content>' +
            '      <form class="list" ng-submit="actions.addOrUpdateItem( data.list.id, forms.itemEditor.name )">' +
            '         <label class="item item-input">' +
            '            <input type="text" placeholder="Item Name" required ng-model="forms.itemEditor.name">' +
            '         </label>' +
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
            openItemEditor: function( item ) {
                $scope.forms.itemEditor.reset();

                if ( item ) {
                    $scope.forms.itemEditor.name = item.name;
                    $scope.forms.itemEditor.item = item;
                }

                $scope.modal.show();
            },
            addOrUpdateItem: function( listId, name ) {
                if ( !name ) {
                    return;
                }

                if ( $scope.forms.itemEditor.item ) {
                    TodoListService.updateItem( listId, $scope.forms.itemEditor.item.id, {
                        name: $scope.forms.itemEditor.name
                    } )
                        .then( function( updatedItem ) {
                            $scope.modal.hide();
                            $scope.forms.itemEditor.reset();
                            $scope.data.list.items[ updatedItem.id ] = updatedItem;
                        } );
                }
                else {
                    TodoListService.addItemToList(listId, name)
                        .then(function (newItem) {
                            $scope.modal.hide();
                            $scope.forms.itemEditor.reset();
                            $scope.data.list.items[ newItem.id ] = newItem;
                        });
                }
            },
            removeItem: function( listId, item ) {
                if ( $scope.state.processing ) {
                    return;
                }

                $scope.state.processing = true;

                TodoListService.removeItemFromList( listId, item.id )
                    .then( function() {
                        delete $scope.data.list.items[ item.id ];
                    } )
                    .finally( function() {
                        $scope.state.processing = false;
                    } );
            },
            toggleItem: function( listId, item ) {
                if ( $scope.state.processing ) {
                    return;
                }

                if ( item.selected ) {
                    $scope.actions.selectItem( item );
                    return;
                }

                $scope.actions.deselectSelectedItem();

                $scope.state.processing = true;

                TodoListService.toggleItemInList( listId, item.id )
                    .then( function( updatedItem ) {
                        $scope.data.list.items[ item.id ].done = updatedItem.done;
                    } )
                    .finally( function() {
                        $scope.state.processing = false;
                    } );
            },
            deleteItemIfDone: function( listId, item ) {
                if ( $scope.state.processing ) {
                    return;
                }

                if ( item.done ) {
                    $scope.actions.removeItem( listId, item );
                }
            },
            selectItem: function( item ) {
                if ( $scope.data.selectedItem ) {
                    $scope.data.selectedItem.selected = false;
                }

                if ( $scope.data.selectedItem === item ) {
                    $scope.data.selectedItem = null;
                }
                else {
                    item.selected = true;
                    $scope.data.selectedItem = item;
                }
            },
            deselectSelectedItem: function() {
                if ( $scope.data.selectedItem ) {
                    $scope.data.selectedItem.selected = false;
                    $scope.data.selectedItem = null;
                }
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