package com.icfolson.cid10.todo.mobile.components.content.todolist;

import com.citytechinc.aem.apps.ionic.api.models.application.root.ApplicationRoot;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.ContentProperty;

@Component(value = "Todo List", contentAdditionalProperties = @ContentProperty(name = ApplicationRoot.ANGULAR_REQUIRED_MODULES_KEY, value = "com.icfolson.cid10.todo.mobile.controllers.todolist"))
public class TodoList {
}
