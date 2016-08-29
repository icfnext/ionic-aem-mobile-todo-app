package com.icfolson.cid10.todo.mobile.components.page.application;

import com.citytechinc.aem.apps.ionic.api.models.application.root.ApplicationRoot;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.core.components.AbstractComponent;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;
import javax.inject.Inject;

@Model(adaptables = Resource.class)
public class Application extends AbstractComponent {

    public static final String RESOURCE_TYPE = "todo-mobile-app/components/page/application";

    @Inject
    private PageDecorator currentPage;

    public ApplicationRoot getApplicationRoot() {
        return currentPage.adaptTo(ApplicationRoot.class);
    }

    public String getApplicationRootPath() {
        return currentPage.getName();
    }

}