const { widget } = figma;
const { useSyncedState, useSyncedMap, usePropertyMenu, AutoLayout, Input, SVG, Frame, Text, } = widget;
const Widget = () => {
    const [pageIds, setPageIds] = useSyncedState("pageIds", []);
    const [selectedPageId, setSelectedPageId] = useSyncedState("selectedPageId", "");
    const pages = useSyncedMap("pages");
    const addPage = () => {
        const pageId = randomId();
        pages.set(pageId, { title: "", description: "" });
        setPageIds([...pageIds, pageId]);
        setSelectedPageId(pageId); // Select the new page by default
    };
    const deletePage = (pageId) => {
        pages.delete(pageId);
        setPageIds(pageIds.filter((id) => id !== pageId));
        if (selectedPageId === pageId) {
            setSelectedPageId(pageIds.length > 1 ? pageIds[0] : ""); // Select the first page or clear selection
        }
    };
    const editPage = (pageId, field, value) => {
        const page = pages.get(pageId);
        if (page) {
            pages.set(pageId, Object.assign(Object.assign({}, page), { [field]: value }));
        }
    };
    const propertyMenuItems = [
        {
            itemType: "action",
            propertyName: "add",
            tooltip: "Add Page",
            icon: AddIconLightSvg,
        },
    ];
    if (pageIds.length > 0) {
        propertyMenuItems.unshift({
            itemType: "dropdown",
            propertyName: "selected-page",
            options: pageIds.map((id) => {
                var _a;
                return ({
                    option: id,
                    label: ((_a = pages.get(id)) === null || _a === void 0 ? void 0 : _a.title) || "Untitled",
                });
            }),
            selectedOption: selectedPageId,
            tooltip: "Select Page",
        }, { itemType: "separator" });
    }
    usePropertyMenu(propertyMenuItems, (event) => {
        if (event.propertyName === "add") {
            addPage();
        }
        else if (event.propertyName === "selected-page") {
            setSelectedPageId(event.propertyValue);
        }
    });
    return (figma.widget.h(WidgetContainer, null, pageIds.length === 0 ? (figma.widget.h(Text, null, "No pages available. Click the add button to create a new page.")) : (pageIds.map((pageId) => (selectedPageId === pageId && (figma.widget.h(PageView, { key: pageId, pageId: pageId, page: pages.get(pageId), deletePage: deletePage, editPage: editPage })))))));
};
const PageView = ({ pageId, page, deletePage, editPage }) => {
    return (figma.widget.h(AutoLayout, { direction: "vertical", spacing: 8, padding: 8, fill: "#f0f0f0", cornerRadius: 4 },
        figma.widget.h(Input, { value: page.title, onTextEditEnd: (e) => editPage(pageId, 'title', e.characters), placeholder: "Page Title", fontSize: 14 }),
        figma.widget.h(Input, { value: page.description, onTextEditEnd: (e) => editPage(pageId, 'description', e.characters), placeholder: "Page Description", fontSize: 12 }),
        figma.widget.h(AutoLayout, { direction: "horizontal", spacing: 8 },
            figma.widget.h(AutoLayout, { padding: { vertical: 4, horizontal: 8 }, cornerRadius: 4, fill: "#FF0000", onClick: () => deletePage(pageId), hoverStyle: { fill: '#FF6666' } },
                figma.widget.h(Text, { fontSize: 12, fill: "#FFFFFF" }, "Delete Page")))));
};
const WidgetContainer = (props) => (figma.widget.h(AutoLayout, { direction: "vertical", verticalAlignItems: "center", cornerRadius: 8, fill: "#FFFFFF", effect: [
        {
            type: "drop-shadow",
            blur: 5,
            color: { r: 0, g: 0, b: 0, a: 0.1 },
            offset: { x: 0, y: 3 },
        },
        {
            type: "drop-shadow",
            blur: 2,
            color: { r: 0, g: 0, b: 0, a: 0.15 },
            offset: { x: 0, y: 0 },
        },
    ] },
    figma.widget.h(AutoLayout, { spacing: 16, padding: { horizontal: 16, vertical: 14 }, direction: "vertical" }, props.children)));
const AddIconLightSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`;
const randomId = () => Math.random().toString(36).substring(2, 15);
widget.register(Widget);
