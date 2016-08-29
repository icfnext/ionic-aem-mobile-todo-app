package com.icfolson.cid10.todo.mobile.components.content.todolists;

import com.citytechinc.aem.apps.ionic.api.models.application.root.ApplicationRoot;
import com.citytechinc.aem.apps.ionic.api.models.application.state.ApplicationState;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.ContentProperty;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.widgets.PathField;
import com.icfolson.aem.library.api.page.PageDecorator;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;

import javax.inject.Inject;

@Component(value = "Todo Lists", contentAdditionalProperties = @ContentProperty(name = ApplicationRoot.ANGULAR_REQUIRED_MODULES_KEY, value = "[com.icfolson.cid10.todo.mobile.controllers.todolists]"))
@Model(adaptables = Resource.class)
public class TodoLists {

    @Inject
    private PageDecorator currentPage;

    @DialogField(fieldLabel = "List Page") @PathField
    @Inject @Optional
    private String listPagePathPrefix;

    public String getListPagePathPrefix() {
        if (StringUtils.isNotBlank(listPagePathPrefix)) {
            String relativePathToListPage = currentPage.adaptTo(ApplicationState.class).getApplicationRoot().getRelativePathToState(listPagePathPrefix);
            return "#" + relativePathToListPage.substring(0, relativePathToListPage.lastIndexOf("/")) + "/";
        }

        return "#";
    }

    public String listPageHref() {
        if (StringUtils.isNotBlank(listPagePathPrefix)) {
            return currentPage.getPageManager().getPage(listPagePathPrefix).getHref();
        }

        return "#";
    }
}
