const { widget } = figma;
const { useSyncedState, useSyncedMap, usePropertyMenu, AutoLayout, Input, SVG, Frame, Text, } = widget;
const Widget = () => {
    const [pages, setPages] = useSyncedState("pages", []);
    const addPage = () => {
        const pageId = randomId();
        const newPage = {
            id: pageId,
            title: "Untitled Page",
            description: "",
            sections: [],
        };
        setPages([...pages, newPage]);
    };
    const deletePage = (pageId) => {
        setPages(pages.filter(page => page.id !== pageId));
    };
    const editPage = (pageId, field, value) => {
        setPages(pages.map((page) => page.id === pageId ? Object.assign(Object.assign({}, page), { [field]: value }) : page));
    };
    const updatePageSections = (pageId, sections) => {
        const updatedPages = pages.map(page => page.id === pageId ? Object.assign(Object.assign({}, page), { sections }) : page);
        setPages(updatedPages);
    };
    const exportJson = () => {
        const jsonContent = { json_content: { pages, editing: null } };
        console.log(jsonContent);
    };
    usePropertyMenu([
        {
            itemType: "action",
            propertyName: "title",
            tooltip: "Pages",
            icon: '', // No icon, just a text tooltip
        },
        {
            itemType: "separator"
        },
        {
            itemType: "action",
            propertyName: "add",
            tooltip: "Add Page",
            icon: AddIconLightSvg,
        }
    ], (event) => {
        if (event.propertyName === "add") {
            addPage();
        }
    });
    return (figma.widget.h(AutoLayout, { direction: "vertical", verticalAlignItems: "center", horizontalAlignItems: "center" },
        pages.length === 0 ? (figma.widget.h(AutoLayout, { width: 374, height: 194, padding: 16, fill: "#ffffff", cornerRadius: 8, verticalAlignItems: "center", horizontalAlignItems: "center" },
            figma.widget.h(Text, { horizontalAlignText: "center", fontSize: 16, fill: "#555", width: "fill-parent" }, "Start by creating an intent framing page to host your priority guides."))) : (figma.widget.h(AutoLayout, { direction: "horizontal", spacing: 16 }, pages.map(page => (figma.widget.h(PageView, { key: page.id, pageId: page.id, page: page, deletePage: deletePage, editPage: editPage, updatePageSections: updatePageSections }))))),
        figma.widget.h(AutoLayout, { width: "fill-parent", horizontalAlignItems: "center", padding: 12, cornerRadius: 4, fill: "#0000FF", hoverStyle: { fill: "#1717d8" }, onClick: exportJson },
            figma.widget.h(Text, { fontSize: 14, fontWeight: 600, fill: "#ffffff" }, "Export JSON to Console"))));
};
// ContentView.tsx
const ContentView = ({ content, deleteContent, cloneContent, editContent, moveUpContent, moveDownContent, canMoveUp, canMoveDown, }) => {
    const [isOpen, setIsOpen] = useSyncedState("openDropdown", null);
    const toggleDropdown = () => {
        setIsOpen(isOpen === content.id ? null : content.id);
    };
    return (figma.widget.h(AutoLayout, { width: "fill-parent", direction: "vertical", spacing: 12, padding: 8, fill: "#f8f8f8", cornerRadius: 4, stroke: "#ddd" },
        figma.widget.h(AutoLayout, { width: "fill-parent", horizontalAlignItems: "end", spacing: 4 },
            canMoveUp && figma.widget.h(IconButton, { src: MoveUpIconSvg, onClick: () => moveUpContent(content.id) }),
            canMoveDown && figma.widget.h(IconButton, { src: MoveDownIconSvg, onClick: () => moveDownContent(content.id) }),
            figma.widget.h(IconButton, { src: CloneIconSvg, onClick: () => cloneContent(content.id, content) }),
            figma.widget.h(IconButton, { src: DeleteIconSvg, onClick: () => deleteContent(content.id) })),
        figma.widget.h(Dropdown, { value: content.type, onChange: (value) => editContent(content.id, 'type', value), options: [
                { label: 'Sub-section', value: 'SubSection' },
                { label: 'Heading text', value: 'HeadingText' },
                { label: 'Heading link', value: 'HeadingLink' },
                { label: 'Text paragraph', value: 'TextParagraph' },
                { label: 'Text link', value: 'TextLink' },
                { label: 'Input Text', value: 'InputText' },
                { label: 'Input Select', value: 'InputSelect' },
                { label: 'Button', value: 'Button' },
                { label: 'Image', value: 'Image' },
                { label: 'Bullet list of text', value: 'BulletListText' },
                { label: 'Bullet list of links', value: 'BulletListLinks' },
                { label: 'Numbered list of text', value: 'NumberedListText' },
                { label: 'Numbered list of links', value: 'NumberedListLinks' },
                { label: 'Input Single Select List', value: 'InputRadioButtonList' },
                { label: 'Input Multi Select List', value: 'InputCheckboxList' },
                { label: 'Table', value: 'Table' },
                { label: 'Responsive table', value: 'ListGroup' },
            ], placeholder: "Content Type", isOpen: isOpen === content.id, onToggle: toggleDropdown }),
        (() => {
            switch (content.type) {
                case 'TextLink':
                    return (figma.widget.h(figma.widget.Fragment, null,
                        figma.widget.h(Input, { value: content.title, onTextEditEnd: (e) => editContent(content.id, 'title', e.characters), placeholder: "Link Title", fontSize: 16, width: "fill-parent" }),
                        figma.widget.h(Input, { value: content.url, onTextEditEnd: (e) => editContent(content.id, 'url', e.characters), placeholder: "Link URL", fontSize: 16, width: "fill-parent" })));
                case 'Button':
                    return (figma.widget.h(figma.widget.Fragment, null,
                        figma.widget.h(Input, { value: content.title, onTextEditEnd: (e) => editContent(content.id, 'title', e.characters), placeholder: "Button Label", fontSize: 16, width: "fill-parent" }),
                        figma.widget.h(Input, { value: content.url, onTextEditEnd: (e) => editContent(content.id, 'url', e.characters), placeholder: "Button URL", fontSize: 16, width: "fill-parent" })));
                default:
                    return (figma.widget.h(figma.widget.Fragment, null,
                        figma.widget.h(Input, { value: content.title, onTextEditEnd: (e) => editContent(content.id, 'title', e.characters), placeholder: "Content Title", fontSize: 16, width: "fill-parent" }),
                        figma.widget.h(Input, { value: content.description, onTextEditEnd: (e) => editContent(content.id, 'description', e.characters), placeholder: "Content Description", fontSize: 16, width: "fill-parent" }),
                        content.type === 'Image' && (figma.widget.h(Input, { value: content.url, onTextEditEnd: (e) => editContent(content.id, 'url', e.characters), placeholder: "Image URL", fontSize: 16, width: "fill-parent" }))));
            }
        })()));
};
// PageView.tsx
const PageView = ({ pageId, page, deletePage, editPage, updatePageSections }) => {
    const [openDropdown, setOpenDropdown] = useSyncedState("openDropdown", null);
    const addSection = () => {
        const sectionId = randomId();
        const newSection = {
            id: sectionId,
            name: 'Untitled Section',
            description: '',
            element: 'Section',
            children: [],
            draft: false,
        };
        updatePageSections(pageId, [...page.sections, newSection]);
    };
    const deleteSection = (sectionId) => {
        updatePageSections(pageId, page.sections.filter(section => section.id !== sectionId));
    };
    const cloneSection = (sectionId) => {
        const section = page.sections.find(section => section.id === sectionId);
        if (section) {
            const clonedSectionId = randomId();
            const clonedChildren = section.children.map(child => (Object.assign(Object.assign({}, child), { id: randomId(), children: [...child.children] })));
            const clonedSection = Object.assign(Object.assign({}, section), { id: clonedSectionId, children: clonedChildren });
            const index = page.sections.findIndex(section => section.id === sectionId);
            const newSections = [...page.sections];
            newSections.splice(index + 1, 0, clonedSection);
            updatePageSections(pageId, newSections);
        }
    };
    const editSection = (sectionId, field, value) => {
        const updatedSections = page.sections.map(section => section.id === sectionId ? Object.assign(Object.assign({}, section), { [field]: value }) : section);
        updatePageSections(pageId, updatedSections);
    };
    const moveUpSection = (sectionId) => {
        const index = page.sections.findIndex(section => section.id === sectionId);
        if (index > 0) {
            const newSections = [...page.sections];
            [newSections[index - 1], newSections[index]] = [newSections[index], newSections[index - 1]];
            updatePageSections(pageId, newSections);
        }
    };
    const moveDownSection = (sectionId) => {
        const index = page.sections.findIndex(section => section.id === sectionId);
        if (index < page.sections.length - 1) {
            const newSections = [...page.sections];
            [newSections[index + 1], newSections[index]] = [newSections[index], newSections[index + 1]];
            updatePageSections(pageId, newSections);
        }
    };
    const toggleDropdown = (sectionId) => {
        setOpenDropdown(openDropdown === sectionId ? null : sectionId);
    };
    return (figma.widget.h(AutoLayout, { width: 350, direction: "vertical", spacing: 4, fill: "#FFFFFF" },
        figma.widget.h(AutoLayout, { width: "fill-parent", height: 8, fill: "#b2b2e5" }),
        figma.widget.h(AutoLayout, { width: "fill-parent", direction: "vertical", spacing: 16, padding: 8 },
            figma.widget.h(AutoLayout, { width: "fill-parent", horizontalAlignItems: "end" },
                figma.widget.h(IconButton, { src: DeleteIconSvg, onClick: () => deletePage(pageId) })),
            figma.widget.h(AutoLayout, { width: "fill-parent", direction: "vertical", spacing: 8 },
                figma.widget.h(Input, { value: page.title, onTextEditEnd: (e) => editPage(pageId, 'title', e.characters), placeholder: "Page Title", fontSize: 20, fontWeight: 700, width: "fill-parent" }),
                figma.widget.h(Input, { value: page.description, onTextEditEnd: (e) => editPage(pageId, 'description', e.characters), placeholder: "Page Description", fontSize: 16, width: "fill-parent" })),
            page.sections.length > 0 && (figma.widget.h(AutoLayout, { width: "fill-parent", direction: "vertical", spacing: 8 }, page.sections.map((section, index) => (figma.widget.h(SectionView, { key: section.id, sectionId: section.id, section: section, deleteSection: deleteSection, cloneSection: cloneSection, editSection: editSection, moveUpSection: moveUpSection, moveDownSection: moveDownSection, isOpen: openDropdown === section.id, toggleDropdown: () => toggleDropdown(section.id), canMoveUp: index > 0, canMoveDown: index < page.sections.length - 1 }))))),
            figma.widget.h(AutoLayout, { width: "fill-parent", horizontalAlignItems: "center", padding: 12, cornerRadius: 4, fill: "#0000FF", hoverStyle: { fill: "#1717d8" }, onClick: addSection },
                figma.widget.h(Text, { fontSize: 16, fontWeight: 600, fill: "#ffffff" }, "Add Section")))));
};
// SectionView.tsx
const SectionView = ({ sectionId, section, deleteSection, cloneSection, editSection, moveUpSection, moveDownSection, isOpen, toggleDropdown, canMoveUp, canMoveDown, }) => {
    const addContent = () => {
        const contentId = randomId();
        const newContent = {
            id: contentId,
            type: 'Button',
            title: '',
            description: '',
            url: '',
            children: [],
            draft: false,
        };
        const updatedContents = [...section.children, newContent];
        editSection(sectionId, 'children', updatedContents);
    };
    const deleteContent = (contentId) => {
        const updatedContents = section.children.filter(content => content.id !== contentId);
        editSection(sectionId, 'children', updatedContents);
    };
    const cloneContent = (contentId, content) => {
        const clonedContentId = randomId();
        const clonedContent = Object.assign(Object.assign({}, content), { id: clonedContentId, children: [...content.children] });
        const index = section.children.findIndex(c => c.id === contentId);
        const updatedContents = [
            ...section.children.slice(0, index + 1),
            clonedContent,
            ...section.children.slice(index + 1)
        ];
        editSection(sectionId, 'children', updatedContents);
    };
    const editContent = (contentId, field, value) => {
        const updatedContents = section.children.map(content => content.id === contentId ? Object.assign(Object.assign({}, content), { [field]: value }) : content);
        editSection(sectionId, 'children', updatedContents);
    };
    const moveUpContent = (contentId) => {
        const index = section.children.findIndex(c => c.id === contentId);
        if (index > 0) {
            const updatedContents = [...section.children];
            [updatedContents[index - 1], updatedContents[index]] = [updatedContents[index], updatedContents[index - 1]];
            editSection(sectionId, 'children', updatedContents);
        }
    };
    const moveDownContent = (contentId) => {
        const index = section.children.findIndex(c => c.id === contentId);
        if (index < section.children.length - 1) {
            const updatedContents = [...section.children];
            [updatedContents[index + 1], updatedContents[index]] = [updatedContents[index], updatedContents[index + 1]];
            editSection(sectionId, 'children', updatedContents);
        }
    };
    return (figma.widget.h(AutoLayout, { width: "fill-parent", direction: "vertical", spacing: 12, padding: 8, fill: "#ffffff", cornerRadius: 4, stroke: "#ccc" },
        figma.widget.h(AutoLayout, { width: "fill-parent", horizontalAlignItems: "end", spacing: 4 },
            canMoveUp && (figma.widget.h(IconButton, { src: MoveUpIconSvg, onClick: () => moveUpSection(sectionId) })),
            canMoveDown && (figma.widget.h(IconButton, { src: MoveDownIconSvg, onClick: () => moveDownSection(sectionId) })),
            figma.widget.h(IconButton, { src: CloneIconSvg, onClick: () => cloneSection(sectionId, section) }),
            figma.widget.h(IconButton, { src: DeleteIconSvg, onClick: () => deleteSection(sectionId) })),
        figma.widget.h(Input, { value: section.name, onTextEditEnd: (e) => editSection(sectionId, 'name', e.characters), placeholder: "Section Name", fontSize: 18, fontWeight: 600, width: "fill-parent" }),
        figma.widget.h(Input, { value: section.description, onTextEditEnd: (e) => editSection(sectionId, 'description', e.characters), placeholder: "Section Description", fontSize: 16, width: "fill-parent" }),
        figma.widget.h(Dropdown, { value: section.element, onChange: (value) => editSection(sectionId, 'element', value), options: [
                { label: 'Section', value: 'Section' },
                { label: 'Header', value: 'Header' },
                { label: 'Form', value: 'Form' },
                { label: 'Navigation', value: 'Navigation' },
                { label: 'Search', value: 'Search' },
                { label: 'Footer', value: 'Footer' },
                { label: 'Complementary', value: 'Complementary' },
                { label: 'Alert', value: 'Alert' },
                { label: 'Article', value: 'Article' },
            ], placeholder: "Section Type", isOpen: isOpen, onToggle: toggleDropdown }),
        section.children.length > 0 && (figma.widget.h(AutoLayout, { width: "fill-parent", direction: "vertical", spacing: 8 }, section.children.map((content, index) => (figma.widget.h(ContentView, { key: content.id, content: content, deleteContent: deleteContent, editContent: editContent, cloneContent: cloneContent, moveUpContent: moveUpContent, moveDownContent: moveDownContent, canMoveUp: index > 0, canMoveDown: index < section.children.length - 1 }))))),
        figma.widget.h(AutoLayout, { width: "fill-parent", horizontalAlignItems: "center", padding: 12, cornerRadius: 4, fill: "#0000FF", hoverStyle: { fill: "#1717d8" }, onClick: addContent },
            figma.widget.h(Text, { fontSize: 14, fontWeight: 600, fill: "#ffffff" }, "Add Content"))));
};
const Dropdown = ({ options, value, onChange, placeholder, isOpen, onToggle }) => {
    const selectedOption = options.find(option => option.value === value);
    const displayValue = selectedOption ? selectedOption.label : placeholder;
    return (figma.widget.h(AutoLayout, { direction: "vertical", width: "fill-parent", spacing: 8 },
        figma.widget.h(Text, { onClick: onToggle, fill: value ? "#000" : "#aaa", fontSize: 16 }, displayValue || placeholder),
        isOpen && (figma.widget.h(AutoLayout, { width: "fill-parent", direction: "vertical", fill: "#fff", stroke: "#ccc", cornerRadius: 4, padding: 8 }, options.map((option) => (figma.widget.h(AutoLayout, { key: option.value, width: "fill-parent", onClick: () => {
                onChange(option.value);
                onToggle(); // Close dropdown after selecting an option
            }, padding: { vertical: 4 } },
            figma.widget.h(Text, { fontSize: 16 }, option.label))))))));
};
const IconButton = ({ src, onClick }) => {
    return (figma.widget.h(AutoLayout, { onClick: onClick, cornerRadius: 4, padding: 4, hoverStyle: { fill: '#e0e0e0' }, verticalAlignItems: "center", horizontalAlignItems: "center", spacing: 0 },
        figma.widget.h(SVG, { src: src, width: 20, height: 20 })));
};
const WidgetContainer = (props) => (figma.widget.h(AutoLayout, { direction: "vertical", verticalAlignItems: "center", cornerRadius: 8, fill: "#f7f7f7", effect: [
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
    figma.widget.h(AutoLayout, { spacing: 16, padding: { horizontal: 12, vertical: 12 }, direction: "vertical" }, props.children)));
const AddIconLightSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`;
const CloneIconSvg = `
 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
`;
const DeleteIconSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
`;
const MoveDownIconSvg = `
 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-down"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
`;
const MoveUpIconSvg = `
 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
`;
const randomId = () => Math.random().toString(36).substring(2, 15);
const deepClone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
};
widget.register(Widget);
