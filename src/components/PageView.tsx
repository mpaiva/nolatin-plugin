
interface PageViewProps {
  pageId: string;
  page: Page;
  deletePage: (pageId: string) => void;
  editPage: (pageId: string, field: 'title' | 'description', value: string) => void;
}

const PageView = ({ pageId, page, deletePage, editPage }: PageViewProps) => {
  return (
    <AutoLayout direction="vertical" spacing={8} padding={8} fill="#f0f0f0" cornerRadius={4}>
      <Input
        value={page.title}
        onTextEditEnd={(e) => editPage(pageId, 'title', e.characters)}
        placeholder="Page Title"
        fontSize={14}  
      />
      <Input
        value={page.description}
        onTextEditEnd={(e) => editPage(pageId, 'description', e.characters)}
        placeholder="Page Description"
        fontSize={12}  
      />
      <AutoLayout direction="horizontal" spacing={8}>
        <AutoLayout
          padding={{ vertical: 4, horizontal: 8 }}
          cornerRadius={4}
          fill="#FF0000"  
          onClick={() => deletePage(pageId)}
          hoverStyle={{ fill: '#FF6666' }}  
        >
          <Text fontSize={12} fill="#FFFFFF">Delete Page</Text>
        </AutoLayout>
      </AutoLayout>
    </AutoLayout>
  );
};

 
