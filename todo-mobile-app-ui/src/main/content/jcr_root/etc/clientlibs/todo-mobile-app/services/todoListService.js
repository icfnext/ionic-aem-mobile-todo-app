angular.module( 'com.icfolson.cid10.todo.mobile.services.todolist', [ 'ionic' ] )
    .service( 'TodoListService', function( $log, $window, $q ) {

        var todoListsLocalStorageKey = 'com.icfolson.cid10.todo.mobile.services.todolist.TodoLists';
        var todoLists = JSON.parse( $window.localStorage.getItem( todoListsLocalStorageKey ) ) || {};

        var saveTodoLists = function() {
            $window.localStorage.setItem( todoListsLocalStorageKey, JSON.stringify( todoLists ) );
        };

        this.getLists = function() {
            return $q.when( Object.keys( todoLists ).map( function( currentListId ) {
                var currentList = angular.copy( todoLists[ currentListId ] );

                currentList.itemCount = Object.keys( currentList.items ).length;
                currentList.itemsCompleted = Object.keys( currentList.items ).reduce( function( previousValue, currentItemId ) {
                    if ( currentList.items[ currentItemId ].done ) {
                        return previousValue + 1;
                    }

                    return previousValue;
                }, 0 );

                return currentList;
            } ) );
        };

        this.getList = function( listId ) {
            if ( todoLists[ listId ] ) {
                return $q.when( angular.copy( todoLists[ listId ] ) );
            }

            return $q.reject( 'No such list' );
        };

        this.addList = function( listTitle ) {
            var currentTimestamp = Date.now();

            var newList = {
                id: 'list-' + currentTimestamp,
                title: listTitle,
                created: currentTimestamp,
                items: {}
            };

            todoLists[ 'list-' + currentTimestamp ] = newList;

            saveTodoLists();
            return $q.when( newList );
        };

        this.addItemToList = function( listId, name ) {
            if ( todoLists[ listId ] ) {
                var currentTimestamp = Date.now();

                var newItem = {
                    id: 'item-' + currentTimestamp,
                    name: name,
                    added: currentTimestamp,
                    done: false
                };

                todoLists[ listId ].items[ 'item-' + currentTimestamp ] = newItem;

                saveTodoLists();
                return $q.when( newItem );
            }

            return $q.reject();
        };

        this.updateItem = function( listId, itemId, updates ) {
            if ( todoLists[ listId ] && todoLists[ listId ].items[ itemId ] ) {
                todoLists[ listId ].items[ itemId ].name = updates.name;

                saveTodoLists();
                return $q.when( angular.copy( todoLists[ listId ].items[ itemId ] ) );
            }

            return $q.reject();
        };

        this.removeItemFromList = function( listId, itemId ) {
            if ( todoLists[ listId ] && todoLists[ listId ].items[ itemId ] ) {
                delete todoLists[ listId ].items[ itemId ];
                saveTodoLists();
                return $q.when( true );
            }

            return $q.reject();
        };

        this.toggleItemInList = function( listId, itemId ) {
            if ( todoLists[ listId ] && todoLists[ listId ].items[ itemId ] ) {
                todoLists[ listId ].items[ itemId ].done = !todoLists[ listId ].items[ itemId ].done;
                saveTodoLists();
                return $q.when( angular.copy( todoLists[ listId ].items[ itemId ] ) );
            }

            return $q.reject();
        }

    } );