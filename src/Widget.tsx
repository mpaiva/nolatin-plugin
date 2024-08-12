
const { widget } = figma;
const {
  useSyncedState,
  useSyncedMap,
  usePropertyMenu,
  AutoLayout, 
  Input,
  SVG,
  Frame,
  waitForTask,
  Text,
} = widget;

const Widget = () => {
  const [pages, setPages] = useSyncedState<Page[]>("pages", []);

  const addPage = () => {
    const pageId = randomId();
    const newPage: Page = {
      id: pageId,
      title: "Untitled Page",
      description: "",
      sections: [],
    };
    setPages([...pages, newPage]);
  };

  const deletePage = (pageId: string) => {
    setPages(pages.filter(page => page.id !== pageId));
  };

  const editPage = (pageId: string, field: 'title' | 'description', value: string) => {
    setPages(
      pages.map((page) =>
        page.id === pageId ? { ...page, [field]: value } : page
      )
    );
  };
  const updatePageSections = (pageId: string, sections: Section[]) => {
    const updatedPages = pages.map(page => 
      page.id === pageId ? { ...page, sections } : page
    );
    setPages(updatedPages);
  };

  const exportJson = () => {
    const jsonContent = { pages, editing: null };
    console.log(jsonContent);
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
    <AutoLayout direction="vertical" verticalAlignItems="center" horizontalAlignItems="center">
      {pages.length === 0 ? (
        <AutoLayout width={374} height={174} padding={16} fill="#ffffff" verticalAlignItems="center" horizontalAlignItems="center">
          <Text horizontalAlignText="center" fontSize={16} fill="#555" width="fill-parent">
            Start by creating an intent framing page to host your priority guides.
          </Text>
        </AutoLayout>
      ) : (
        <WidgetContainer>
        <AutoLayout direction="horizontal" spacing={16}>
          {pages.map(page => (
            <PageView
              key={page.id}
              pageId={page.id}
              page={page}
              deletePage={deletePage}
              editPage={editPage}
              updatePageSections={updatePageSections}
              pages={pages}
            />
          ))}
        </AutoLayout>
        </WidgetContainer>
      )}
      <AutoLayout width="fill-parent" horizontalAlignItems="center" padding={14} cornerRadius={4} fill="#0000FF" hoverStyle={{ fill: "#1717d8" }} onClick={exportJson}>
        <Text fontSize={14} fontWeight={600} fill="#ffffff">
          Export JSON to Console
        </Text>
      </AutoLayout>
    </AutoLayout>
  );
};

 
