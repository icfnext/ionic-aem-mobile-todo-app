## TODO Mobile App

An exemplar implementation presenting usage of the Ionic AEM Apps library and associated Archetype.  This project 
implements a basic TODO App requirement set.

### Application Requirements

The following is the list of requirements which the TODO Application endevors to implement.

* Users should be able to create new TODO Lists
* Users should be able to view a List of all of their TODO Lists
* Each list should present the list’s name, the number of items in the list, and the number of completed items
* Users should be able to view the items in their TODO List
* Each item should present the item’s name and the items completion status
* Users should be able to add TODO Items to a TODO List
* Users should be able to mark TODO Items as completed
* Users should be able to delete TODO Items
* TODO Lists, TODO Items, and the state of TODO Items should persist across user sessions (ie, if a user restarts the app their lists and such should still exist)

### Trying it out

You can excercise the application by building this project to an AEM 6.2 instance and then authoring the application.

#### Building the Application

The following is the command to build to a local AEM instance running on localhost:4502.

`mvn -P local clean install`

#### Authoring the Application

The project allows for a flexible page and component layout which demonstrates the latitude given to application authors 
via usage of AEM Mobile and the Ionic AEM Apps library.  The page layout structure which I have been using for testing 
is as follows, starting from the application root:

* Main - Page of type "TODO Mobile App - Application Main State" configured as an abstract state
    * Lists - Page of type "TODO Mobile App - Application State" with the TODO Lists component placed in the paragraph system
        * listId - Page of type "TODO Mobile App - Application State" with a name of `listId` (this name is important) configured with a type of Slug State with the TODO List component placed in the paragraph system
        
        
