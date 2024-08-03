
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
  const pages = useSyncedMap<Page>("pages");

  const addPage = () => {
    const pageId = randomId();
    pages.set(pageId, { title: "Untitled Page", description: "" });
    setPageIds([...pageIds, pageId]);
  };

  const deletePage = (pageId: string) => {
    pages.delete(pageId);
    setPageIds(pageIds.filter((id) => id !== pageId));
  };

  const editPage = (pageId: string, field: 'title' | 'description', value: string) => {
    const page = pages.get(pageId);
    if (page) {
      pages.set(pageId, { ...page, [field]: value });
    }
  };

  usePropertyMenu(
    [
      {
        itemType: "action",
        propertyName: "title",
        tooltip: "Pages",
        icon: '', // No icon, just a text tooltip
      },
      { 
        itemType: "separator" as const 
      },
      {
        itemType: "action",
        propertyName: "add",
        tooltip: "Add Page",
        icon: AddIconLightSvg,
      }
    ],
    (event) => {
      if (event.propertyName === "add") {
        addPage();
      }
    }
  );

  return (
    <AutoLayout direction="vertical"   verticalAlignItems="center" horizontalAlignItems="center">
      {pageIds.length === 0 ? (
       
       <AutoLayout width={374} height={194} padding={16} fill="#ffffff" cornerRadius={8} verticalAlignItems="center" horizontalAlignItems="center">
         <Text horizontalAlignText="center" fontSize={16} fill="#555" width="fill-parent">
           Start by creating an intent framing page to host your priority guides.
         </Text>
       </AutoLayout>
      
      ) : (
        <WidgetContainer>
          <AutoLayout direction="horizontal" spacing={16}>
            {pageIds.map((pageId) => (
              <PageView
                key={pageId}
                pageId={pageId}
                page={pages.get(pageId)}
                deletePage={deletePage}
                editPage={editPage}
              />
            ))}
          </AutoLayout>
        </WidgetContainer>
      )}
    </AutoLayout>
  );
};