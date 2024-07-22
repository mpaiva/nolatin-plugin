const { widget } = figma;
const {
  useSyncedState,
  useSyncedMap,
  usePropertyMenu,
  AutoLayout,
  Input,
  SVG,
  Frame,
  Text,
} = widget;

const Widget = () => {
  const [pageIds, setPageIds] = useSyncedState<string[]>("pageIds", []);
  const [selectedPageId, setSelectedPageId] = useSyncedState<string>("selectedPageId", "");
  const pages = useSyncedMap<Page>("pages");

  const addPage = () => {
    const pageId = randomId();
    pages.set(pageId, { title: "", description: "" });
    setPageIds([...pageIds, pageId]);
    setSelectedPageId(pageId); // Select the new page by default
  };

  const deletePage = (pageId: string) => {
    pages.delete(pageId);
    setPageIds(pageIds.filter((id) => id !== pageId));
    if (selectedPageId === pageId) {
      setSelectedPageId(pageIds.length > 1 ? pageIds[0] : ""); // Select the first page or clear selection
    }
  };

  const editPage = (pageId: string, field: 'title' | 'description', value: string) => {
    const page = pages.get(pageId);
    if (page) {
      pages.set(pageId, { ...page, [field]: value });
    }
  };

  const propertyMenuItems: WidgetPropertyMenuItem[] = [
    {
      itemType: "action",
      propertyName: "add",
      tooltip: "Add Page",
      icon: AddIconLightSvg,
    },
  ];

  if (pageIds.length > 0) {
    propertyMenuItems.unshift(
      {
        itemType: "dropdown",
        propertyName: "selected-page",
        options: pageIds.map((id) => ({
          option: id,
          label: pages.get(id)?.title || "Untitled",
        })),
        selectedOption: selectedPageId,
        tooltip: "Select Page",
      },
      { itemType: "separator" as const }
    );
  }

  usePropertyMenu(propertyMenuItems, (event) => {
    if (event.propertyName === "add") {
      addPage();
    } else if (event.propertyName === "selected-page") {
      setSelectedPageId(event.propertyValue as string);
    }
  });

  return (
    <WidgetContainer>
      {pageIds.length === 0 ? (
        <Text>No pages available. Click the add button to create a new page.</Text>
      ) : (
        pageIds.map((pageId) => (
          selectedPageId === pageId && (
            <PageView
              key={pageId}
              pageId={pageId}
              page={pages.get(pageId)}
              deletePage={deletePage}
              editPage={editPage}
            />
          )
        ))
      )}
    </WidgetContainer>
  );
};

 
