package com.icfolson.cid10.todo.mobile.components.page.state;

import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.core.components.AbstractComponent;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;
import javax.inject.Inject;

@Model(adaptables = Resource.class)
public class State extends AbstractComponent {

    public static final String RESOURCE_TYPE = "todo-mobile-app/components/page/state";

    @Inject
    private PageDecorator currentPage;

    public String getTitle() {
        return currentPage.getPageTitle();
    }

    public String getSubtitle() {
        return currentPage.get("subtitle", "");
    }

    public boolean isHasSubtitle() {
        return currentPage.get("subtitle", String.class).isPresent();
    }
}