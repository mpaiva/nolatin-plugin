const { widget } = figma;
const { useSyncedState, useSyncedMap, usePropertyMenu, AutoLayout, Input, SVG, Frame, Image, Rectangle, waitForTask, Text, } = widget;
const Widget = () => {
    const [pages, setPages] = useSyncedState("pages", []);
    const [pageSize, setPageSize] = useSyncedState('pageSize', '350');
    const sizeOptions = [{ option: '350', label: "Small" }, { option: '500', label: "Medium" }, { option: '750', label: "Large" }];
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
        const jsonContent = { pages, editing: null };
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
            itemType: "action",
            propertyName: "add",
            tooltip: "Add Page",
            icon: AddIconLightSvg,
        },
        {
            itemType: "separator"
        },
        {
            itemType: 'dropdown',
            propertyName: 'pageSize',
            tooltip: 'Size selector',
            selectedOption: pageSize,
            options: sizeOptions,
        },
    ], ({ propertyName, propertyValue }) => {
        if (propertyName === "pageSize") {
            setPageSize(propertyValue);
        }
        else if (propertyName === "add") {
            addPage();
        }
    });
    return (figma.widget.h(AutoLayout, { direction: "vertical", verticalAlignItems: "center", horizontalAlignItems: "center" },
        pages.length === 0 ? (figma.widget.h(AutoLayout, { width: 374, height: 174, padding: 16, fill: "#ffffff", verticalAlignItems: "center", horizontalAlignItems: "center" },
            figma.widget.h(Text, { horizontalAlignText: "center", fontSize: 16, fill: "#555", width: "fill-parent" }, "Start by creating an intent framing page to host your priority guides."))) : (figma.widget.h(WidgetContainer, null,
            figma.widget.h(AutoLayout, { direction: "horizontal", spacing: 16 }, pages.map(page => (figma.widget.h(PageView, { key: page.id, pageId: page.id, page: page, deletePage: deletePage, editPage: editPage, updatePageSections: updatePageSections, pages: pages, pageSize: pageSize })))))),
        figma.widget.h(AutoLayout, { width: "fill-parent", horizontalAlignItems: "center", padding: 14, cornerRadius: 4, fill: "#0000FF", hoverStyle: { fill: "#1717d8" }, onClick: exportJson },
            figma.widget.h(Text, { fontSize: 14, fontWeight: 600, fill: "#ffffff" }, "Export JSON to Console"))));
};
const Dropdown = ({ options, value, onChange, placeholder, isOpen, onToggle }) => {
    const selectedOption = options.find(option => option.value === value);
    const displayValue = selectedOption ? selectedOption.label : placeholder;
    return (figma.widget.h(AutoLayout, { direction: "vertical", width: "fill-parent", spacing: 8 },
        figma.widget.h(AutoLayout, { direction: "vertical", padding: { vertical: 2, horizontal: 8 }, cornerRadius: 4, spacing: 8, fill: "#0000FF" },
            figma.widget.h(Text, { onClick: onToggle, fill: value ? "#FFFFFF" : "#FFFFFF", fontSize: 16, fontWeight: 600 }, displayValue || placeholder)),
        isOpen && (figma.widget.h(AutoLayout, { y: 24, width: "fill-parent", direction: "vertical", fill: "#fff", stroke: "#000", cornerRadius: 4, padding: { horizontal: 16, vertical: 8 }, effect: [
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
                }
            ] }, options.map((option) => (figma.widget.h(AutoLayout, { key: option.value, width: "fill-parent", onClick: () => {
                onChange(option.value);
                onToggle(); // Close dropdown after selecting an option
            }, padding: { vertical: 4 } },
            figma.widget.h(Text, { fontSize: 16 }, option.label))))))));
};
const IconButton = ({ src, onClick }) => {
    return (figma.widget.h(AutoLayout, { onClick: onClick, cornerRadius: 4, padding: 4, hoverStyle: { fill: '#EBEBF8' }, verticalAlignItems: "center", horizontalAlignItems: "center", spacing: 0 },
        figma.widget.h(SVG, { src: src, width: 20, height: 20 })));
};
const LabeledComboBox = ({ label, options, value, onChange, placeholder, isOpen, onToggle }) => {
    const selectedOption = options.find(option => option.value === value);
    const displayValue = selectedOption ? selectedOption.label : value || placeholder;
    return (figma.widget.h(AutoLayout, { direction: "vertical", width: "fill-parent", spacing: 4 },
        figma.widget.h(Text, { fontSize: 16, fontWeight: 500, width: "fill-parent" }, label),
        figma.widget.h(AutoLayout, { direction: "vertical", width: "fill-parent", spacing: 8 },
            figma.widget.h(AutoLayout, { verticalAlignItems: "center", cornerRadius: 4, fill: "#FFF", width: "fill-parent", padding: 8, strokeWidth: 1, stroke: "#000" },
                figma.widget.h(Input, { value: displayValue, onTextEditEnd: (e) => {
                        const newValue = e.characters.trim();
                        if (newValue) {
                            onChange(newValue);
                        }
                    }, placeholder: placeholder, fontSize: 16, fontWeight: 500, width: "fill-parent" }),
                figma.widget.h(SVG, { src: ArrowDownSvg, onClick: onToggle })),
            isOpen && (figma.widget.h(AutoLayout, { width: "fill-parent", direction: "vertical", fill: "#fff", stroke: "#000", cornerRadius: 4, padding: { horizontal: 16, vertical: 8 }, effect: [
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
                    }
                ] }, options.map((option) => (figma.widget.h(AutoLayout, { key: option.value, width: "fill-parent", onClick: () => {
                    onChange(option.value);
                    onToggle();
                }, padding: { vertical: 4 } },
                figma.widget.h(Text, { fontSize: 16 }, option.label)))))))));
};
const LabeledInput = ({ label, value, onTextEditEnd, placeholder }) => {
    return (figma.widget.h(AutoLayout, { direction: "vertical", width: "fill-parent", spacing: 4 },
        figma.widget.h(Text, { fontSize: 16, fontWeight: 500, width: "fill-parent" }, label),
        figma.widget.h(Input, { value: value, 
            // onTextEditEnd={onTextEditEnd}
            onTextEditEnd: (e) => {
                const straightQuotesValue = e.characters.replace(/“|”/g, '"');
                onTextEditEnd(Object.assign(Object.assign({}, e), { characters: straightQuotesValue }));
            }, placeholder: placeholder, fontSize: 16, width: 'fill-parent', inputFrameProps: {
                cornerRadius: 4,
                fill: "#FFF",
                overflow: "visible",
                padding: 8,
                stroke: "#000000",
                strokeWidth: 1,
                verticalAlignItems: "center",
            } })));
};
// LabeledSelect.tsx
const LabeledSelect = ({ label, options, value, onChange, placeholder, isOpen, onToggle }) => {
    const selectedOption = options.find(option => option.value === value);
    const displayValue = selectedOption ? selectedOption.label : placeholder;
    return (figma.widget.h(AutoLayout, { direction: "vertical", width: "fill-parent", spacing: 4 },
        figma.widget.h(Text, { fontSize: 16, fontWeight: 500, width: "fill-parent" }, label),
        figma.widget.h(AutoLayout, { direction: "vertical", width: "fill-parent", spacing: 8 },
            figma.widget.h(AutoLayout, { onClick: onToggle, verticalAlignItems: "center", cornerRadius: 4, fill: "#FFF", width: "fill-parent", padding: 8, strokeWidth: 1, stroke: "#000" },
                figma.widget.h(Text, { fill: "#000000", width: "fill-parent", fontSize: 16, fontWeight: 500 }, displayValue || placeholder),
                figma.widget.h(SVG, { src: ArrowDownSvg })),
            isOpen && (figma.widget.h(AutoLayout, { y: 24, width: "fill-parent", direction: "vertical", fill: "#fff", stroke: "#000", cornerRadius: 4, padding: { horizontal: 16, vertical: 8 }, effect: [
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
                    }
                ] }, options.map((option) => (figma.widget.h(AutoLayout, { key: option.value, width: "fill-parent", onClick: () => {
                    onChange(option.value);
                    onToggle(); // Close dropdown after selecting an option
                }, padding: { vertical: 4 } },
                figma.widget.h(Text, { fontSize: 16 }, option.label)))))))));
};
const WidgetContainer = (props) => (figma.widget.h(AutoLayout, { direction: "vertical", verticalAlignItems: "center", fill: "#F7F7F7", effect: [
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
    figma.widget.h(AutoLayout, { spacing: 16, padding: 12, direction: "vertical" }, props.children)));
const BulletListLinksContent = ({ content, editContent }) => {
    return (figma.widget.h(figma.widget.Fragment, null,
        figma.widget.h(LabeledInput, { label: 'List Items: Wrap each item in double quotes (example: "label1, url1" "label2, url2")', value: content.description, onTextEditEnd: (e) => editContent(content.id, 'description', e.characters) })));
};
const BulletListTextContent = ({ content, editContent }) => {
    return (figma.widget.h(figma.widget.Fragment, null,
        figma.widget.h(LabeledInput, { label: 'List Items: Wrap each item in double quotes ("item 1", "item2")', value: content.description, onTextEditEnd: (e) => editContent(content.id, 'description', e.characters) })));
};
const ButtonContent = ({ content, editContent, pages }) => {
    const pageOptions = pages.map(page => ({
        label: page.title,
        value: page.id
    }));
    const [isOpen, setIsOpen] = useSyncedState("comboBoxDropdownOpen", null);
    const toggleDropdown = () => {
        setIsOpen(isOpen === content.id ? null : content.id);
    };
    return (figma.widget.h(figma.widget.Fragment, null,
        figma.widget.h(LabeledInput, { label: "Label:", value: content.title, onTextEditEnd: (e) => editContent(content.id, 'title', e.characters) }),
        figma.widget.h(LabeledComboBox, { label: "Action:", options: pageOptions, value: content.url, onChange: (value) => editContent(content.id, 'url', value), placeholder: "Select page or enter link", isOpen: isOpen === content.id, onToggle: toggleDropdown })));
};
const DefaultContent = ({ content, editContent }) => {
    return (figma.widget.h(figma.widget.Fragment, null,
        figma.widget.h(LabeledInput, { label: "Title", value: content.title, onTextEditEnd: (e) => editContent(content.id, 'title', e.characters) }),
        figma.widget.h(LabeledInput, { label: "Description", value: content.description, onTextEditEnd: (e) => editContent(content.id, 'description', e.characters) })));
};
const HeadingLinkContent = ({ content, editContent, pages }) => {
    const pageOptions = pages.map(page => ({
        label: page.title,
        value: page.id
    }));
    const [isOpen, setIsOpen] = useSyncedState("comboBoxDropdownOpen", null);
    const toggleDropdown = () => {
        setIsOpen(isOpen === content.id ? null : content.id);
    };
    return (figma.widget.h(figma.widget.Fragment, null,
        figma.widget.h(LabeledInput, { label: "Title:", value: content.title, onTextEditEnd: (e) => editContent(content.id, 'title', e.characters) }),
        figma.widget.h(LabeledInput, { label: "Description:", value: content.description, onTextEditEnd: (e) => editContent(content.id, 'description', e.characters) }),
        figma.widget.h(LabeledComboBox, { label: "Action:", options: pageOptions, value: content.url, onChange: (value) => editContent(content.id, 'url', value), placeholder: "Select page or enter link", isOpen: isOpen === content.id, onToggle: toggleDropdown })));
};
const HeadingTextContent = ({ content, editContent }) => {
    return (figma.widget.h(figma.widget.Fragment, null,
        figma.widget.h(LabeledInput, { label: "Title:", value: content.title, onTextEditEnd: (e) => editContent(content.id, 'title', e.characters) }),
        figma.widget.h(LabeledInput, { label: "Description:", value: content.description, onTextEditEnd: (e) => editContent(content.id, 'description', e.characters) })));
};
const ImageContent = ({ content, editContent }) => {
    return (figma.widget.h(figma.widget.Fragment, null,
        figma.widget.h(LabeledInput, { label: "Source (URL):", value: content.url, onTextEditEnd: (e) => editContent(content.id, 'url', e.characters) }),
        content.url ? (figma.widget.h(AutoLayout, { direction: "vertical", width: "fill-parent", spacing: 4 },
            figma.widget.h(Text, { fontSize: 16, fontWeight: 500, width: "fill-parent" }, "Preview:"),
            figma.widget.h(AutoLayout, { fill: "#FFFFFF", width: "fill-parent", height: 190, stroke: "#A1A1A1", cornerRadius: 4, overflow: "hidden" },
                figma.widget.h(Rectangle, { fill: {
                        type: "image",
                        scaleMode: 'fit',
                        src: content.url
                    }, cornerRadius: 8, width: "fill-parent", height: "fill-parent", minHeight: 190 }))))
            : null,
        figma.widget.h(LabeledInput, { label: "Alternative text:", value: content.title, onTextEditEnd: (e) => editContent(content.id, 'title', e.characters) }),
        figma.widget.h(LabeledInput, { label: "Captions:", value: content.description, onTextEditEnd: (e) => editContent(content.id, 'description', e.characters) })));
};
const InputSelectContent = ({ content, editContent }) => {
    return (figma.widget.h(figma.widget.Fragment, null,
        figma.widget.h(LabeledInput, { label: "Label:", value: content.title, onTextEditEnd: (e) => editContent(content.id, 'title', e.characters) }),
        figma.widget.h(LabeledInput, { label: 'Options: Wrap each item in double quotes (example: "option1", "option2")', value: content.description, onTextEditEnd: (e) => editContent(content.id, 'description', e.characters) })));
};
// InputTextContent.tsx
const InputTextContent = ({ content, editContent }) => {
    const [isOpen, setIsOpen] = useSyncedState("inputDropdownOpen", null);
    const toggleDropdown = () => {
        setIsOpen(isOpen === content.id ? null : content.id);
    };
    return (figma.widget.h(figma.widget.Fragment, null,
        figma.widget.h(LabeledSelect, { label: "Type:", options: inputOptions, value: content.url || 'text', onChange: (value) => editContent(content.id, 'url', value), placeholder: "Select Type", isOpen: isOpen === content.id, onToggle: toggleDropdown }),
        figma.widget.h(LabeledInput, { label: "Label:", value: content.title, onTextEditEnd: (e) => editContent(content.id, 'title', e.characters) })));
};
const NumberListLinksContent = ({ content, editContent }) => {
    return (figma.widget.h(figma.widget.Fragment, null,
        figma.widget.h(LabeledInput, { label: 'List Items: Wrap each item in double quotes (example: "label1, url1" "label2, url2")', value: content.description, onTextEditEnd: (e) => editContent(content.id, 'description', e.characters) })));
};
const NumberListTextContent = ({ content, editContent }) => {
    return (figma.widget.h(figma.widget.Fragment, null,
        figma.widget.h(LabeledInput, { label: 'List Items: Wrap each item in double quotes ("item 1", "item2")', value: content.description, onTextEditEnd: (e) => editContent(content.id, 'description', e.characters) })));
};
const SubSectionContent = ({ content, editContent, pages }) => {
    const addContent = () => {
        const contentId = randomId();
        const newContent = {
            id: contentId,
            type: 'Section Title with description', // Default type
            title: '',
            description: '',
            url: '',
            children: [],
            draft: false,
        };
        const updatedChildren = [...content.children, newContent];
        editContent(content.id, 'children', updatedChildren);
    };
    return (figma.widget.h(AutoLayout, { width: "fill-parent", direction: "vertical", spacing: 12, padding: 8, fill: "#F8F8F8", stroke: "#0000FF66", strokeDashPattern: [4, 4], strokeWidth: 2, cornerRadius: 4 },
        figma.widget.h(AutoLayout, { width: "fill-parent", fill: "#0000FF0D", direction: "vertical", spacing: 8, padding: 8 },
            figma.widget.h(Input, { value: content.title, onTextEditEnd: (e) => editContent(content.id, 'title', e.characters), placeholder: "Title", fontSize: 18, fontWeight: 600, width: "fill-parent" }),
            figma.widget.h(Input, { value: content.description, onTextEditEnd: (e) => editContent(content.id, 'description', e.characters), placeholder: "Description", fontSize: 16, width: "fill-parent" })),
        content.children.length > 0 && (figma.widget.h(AutoLayout, { width: "fill-parent", direction: "vertical", spacing: 8 }, content.children.map((childContent, index) => (figma.widget.h(ContentView, { key: childContent.id, content: childContent, deleteContent: () => {
                const updatedChildren = content.children.filter(c => c.id !== childContent.id);
                editContent(content.id, 'children', updatedChildren);
            }, 
            // editContent={(id, field, value) => {
            //   const updatedChildren = content.children.map(c =>
            //     c.id === id ? { ...c, [field]: value } : c
            //   );
            //   editContent(content.id, 'children', updatedChildren);
            // }}
            editContent: (id, field, value) => editContent(id, field, value), cloneContent: (id, childContent) => {
                const clonedContent = Object.assign(Object.assign({}, childContent), { id: randomId() });
                const updatedChildren = [...content.children, clonedContent];
                editContent(content.id, 'children', updatedChildren);
            }, moveUpContent: (id) => {
                const index = content.children.findIndex(c => c.id === id);
                if (index > 0) {
                    const updatedChildren = [...content.children];
                    [updatedChildren[index - 1], updatedChildren[index]] = [updatedChildren[index], updatedChildren[index - 1]];
                    editContent(content.id, 'children', updatedChildren);
                }
            }, moveDownContent: (id) => {
                const index = content.children.findIndex(c => c.id === id);
                if (index < content.children.length - 1) {
                    const updatedChildren = [...content.children];
                    [updatedChildren[index + 1], updatedChildren[index]] = [updatedChildren[index], updatedChildren[index + 1]];
                    editContent(content.id, 'children', updatedChildren);
                }
            }, canMoveUp: index > 0, canMoveDown: index < content.children.length - 1, pages: pages }))))),
        figma.widget.h(AutoLayout, { width: "fill-parent", horizontalAlignItems: "center", padding: 12, cornerRadius: 4, fill: "#0000FF", hoverStyle: { fill: "#1717d8" }, onClick: addContent },
            figma.widget.h(Text, { fontSize: 14, fontWeight: 600, fill: "#ffffff" }, "Add Content"))));
};
const TextLinkContent = ({ content, editContent, pages }) => {
    const pageOptions = pages.map(page => ({
        label: page.title,
        value: page.id
    }));
    const [isOpen, setIsOpen] = useSyncedState("comboBoxDropdownOpen", null);
    const toggleDropdown = () => {
        setIsOpen(isOpen === content.id ? null : content.id);
    };
    return (figma.widget.h(figma.widget.Fragment, null,
        figma.widget.h(LabeledInput, { label: "Title", value: content.title, onTextEditEnd: (e) => editContent(content.id, 'title', e.characters) }),
        figma.widget.h(LabeledComboBox, { label: "Action:", options: pageOptions, value: content.url, onChange: (value) => editContent(content.id, 'url', value), placeholder: "Select page or enter link", isOpen: isOpen === content.id, onToggle: toggleDropdown })));
};
const TextParagraphContent = ({ content, editContent }) => {
    return (figma.widget.h(figma.widget.Fragment, null,
        figma.widget.h(LabeledInput, { label: "Paragraph:", value: content.title, onTextEditEnd: (e) => editContent(content.id, 'title', e.characters) })));
};
const sectionOptions = [
    { label: 'Section', value: 'Section' },
    { label: 'Header', value: 'Header' },
    { label: 'Form', value: 'Form' },
    { label: 'Navigation', value: 'Navigation' },
    { label: 'Search', value: 'Search' },
    { label: 'Footer', value: 'Footer' },
    { label: 'Complementary', value: 'Complementary' },
    { label: 'Alert', value: 'Alert' },
    { label: 'Article', value: 'Article' },
];
const contentOptions = [
    { label: 'Sub-section', value: 'Section Title with description' },
    { label: 'Button', value: 'Button' },
    { label: 'Text Link', value: 'Text link' },
    { label: 'Input Text', value: 'Input field' },
    { label: 'Input Select', value: 'Select field' },
    { label: 'Image', value: 'Image with description' },
    { label: 'Bullet List of Text', value: 'Bulleted list of text' },
    { label: 'Bullet List of Links', value: 'Bulleted list of links' },
    { label: 'Numbered List of Text', value: 'Numbered list of text' },
    { label: 'Numbered List of Links', value: 'Numbered list of links' },
    { label: 'Text paragraph', value: 'Text paragraph' },
    { label: 'Heading Text', value: 'Heading text' },
    { label: 'Heading Link', value: 'Heading link' },
];
const inputOptions = [
    { label: 'Text', value: 'text' },
    { label: 'Password', value: 'password' },
    { label: 'Number', value: 'number' },
    { label: 'Date', value: 'date' },
    { label: 'Date and Time', value: 'time' },
    { label: 'Email', value: 'email' },
    { label: 'Telephone', value: 'tel' },
    { label: 'Slider Range', value: 'range' },
    { label: 'Upload File', value: 'file' },
];
const AddIconLightSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`;
const ArrowDownSvg = `<svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.0002 1.58337L7.16683 7.41671L1.3335 1.58337" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
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
const ContentView = ({ content, deleteContent, cloneContent, editContent, moveUpContent, moveDownContent, canMoveUp, canMoveDown, pages }) => {
    const [contentDropdownOpen, setContentDropdownOpen] = useSyncedState("contentDropdownOpen", null);
    const toggleContentDropdown = () => {
        setContentDropdownOpen(contentDropdownOpen === content.id ? null : content.id);
    };
    const handleContentTypeChange = (newValue) => {
        editContent(content.id, 'type', newValue);
    };
    return (figma.widget.h(AutoLayout, { width: "fill-parent", direction: "vertical", spacing: 12, padding: 8, fill: "#F8F8F8", cornerRadius: 4, stroke: "#A1A1A1" },
        figma.widget.h(AutoLayout, { width: "fill-parent", direction: "horizontal", spacing: 8 },
            figma.widget.h(AutoLayout, { width: "fill-parent", padding: { vertical: 4 } },
                figma.widget.h(Dropdown, { value: content.type, onChange: handleContentTypeChange, options: contentOptions, placeholder: "Content Type", isOpen: contentDropdownOpen === content.id, onToggle: toggleContentDropdown })),
            figma.widget.h(AutoLayout, { horizontalAlignItems: "end", spacing: 4 },
                canMoveUp && figma.widget.h(IconButton, { src: MoveUpIconSvg, onClick: () => moveUpContent(content.id) }),
                canMoveDown && figma.widget.h(IconButton, { src: MoveDownIconSvg, onClick: () => moveDownContent(content.id) }),
                figma.widget.h(IconButton, { src: CloneIconSvg, onClick: () => cloneContent(content.id, content) }),
                figma.widget.h(IconButton, { src: DeleteIconSvg, onClick: () => deleteContent(content.id) }))),
        content.type === 'Section Title with description' ? (figma.widget.h(SubSectionContent, { content: content, editContent: editContent, pages: pages })) : content.type === 'Button' ? (figma.widget.h(ButtonContent, { content: content, editContent: editContent, pages: pages })) : content.type === 'Text link' ? (figma.widget.h(TextLinkContent, { content: content, editContent: editContent, pages: pages })) : content.type === 'Input field' ? (figma.widget.h(InputTextContent, { content: content, editContent: editContent })) : content.type === 'Select field' ? (figma.widget.h(InputSelectContent, { content: content, editContent: editContent })) : content.type === 'Image with description' ? (figma.widget.h(ImageContent, { content: content, editContent: editContent })) : content.type === 'Bulleted list of text' ? (figma.widget.h(BulletListTextContent, { content: content, editContent: editContent })) : content.type === 'Bulleted list of links' ? (figma.widget.h(BulletListLinksContent, { content: content, editContent: editContent })) : content.type === 'Numbered list of text' ? (figma.widget.h(NumberListTextContent, { content: content, editContent: editContent })) : content.type === 'Numbered list of links' ? (figma.widget.h(NumberListLinksContent, { content: content, editContent: editContent })) : content.type === 'Text paragraph' ? (figma.widget.h(TextParagraphContent, { content: content, editContent: editContent })) : content.type === 'Heading text' ? (figma.widget.h(HeadingTextContent, { content: content, editContent: editContent })) : content.type === 'Heading link' ? (figma.widget.h(HeadingLinkContent, { content: content, editContent: editContent, pages: pages })) : (figma.widget.h(DefaultContent, { content: content, editContent: editContent }))));
};
const PageView = ({ pageId, page, deletePage, editPage, updatePageSections, pages, pageSize }) => {
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
    return (figma.widget.h(AutoLayout, { width: parseInt(pageSize), direction: "vertical", spacing: 4, fill: "#FFFFFF" },
        figma.widget.h(AutoLayout, { width: "fill-parent", height: 8, fill: "#b2b2e5" }),
        figma.widget.h(AutoLayout, { width: "fill-parent", direction: "vertical", spacing: 16, padding: 8 },
            figma.widget.h(AutoLayout, { width: "fill-parent", direction: "vertical", spacing: 8 },
                figma.widget.h(AutoLayout, { width: "fill-parent", verticalAlignItems: "center", direction: "horizontal", spacing: 8 },
                    figma.widget.h(Input, { value: page.title, onTextEditEnd: (e) => editPage(pageId, 'title', e.characters), placeholder: "Page Title", fontSize: 20, fontWeight: 700, width: "fill-parent" }),
                    figma.widget.h(AutoLayout, { horizontalAlignItems: "end" },
                        figma.widget.h(IconButton, { src: DeleteIconSvg, onClick: () => deletePage(pageId) }))),
                figma.widget.h(AutoLayout, { width: "fill-parent", direction: "horizontal", padding: { bottom: 8 } },
                    figma.widget.h(Input, { value: page.description, onTextEditEnd: (e) => editPage(pageId, 'description', e.characters), placeholder: "Page Description", fontSize: 16, fontWeight: 500, width: "fill-parent" }))),
            page.sections.length > 0 && (figma.widget.h(AutoLayout, { width: "fill-parent", direction: "vertical", spacing: 8 }, page.sections.map((section, index) => (figma.widget.h(SectionView, { key: section.id, sectionId: section.id, section: section, deleteSection: deleteSection, cloneSection: cloneSection, editSection: editSection, moveUpSection: moveUpSection, moveDownSection: moveDownSection, isOpen: openDropdown === section.id, toggleDropdown: () => toggleDropdown(section.id), canMoveUp: index > 0, canMoveDown: index < page.sections.length - 1, pages: pages }))))),
            figma.widget.h(AutoLayout, { width: "fill-parent", horizontalAlignItems: "center", padding: 12, stroke: "#0000FF", strokeWidth: 2, cornerRadius: 4, fill: "#FFFFFF", onClick: addSection },
                figma.widget.h(Text, { fontSize: 16, fontWeight: 600, fill: "#0000FF" }, "Add Section")))));
};
const SectionView = ({ sectionId, section, deleteSection, cloneSection, editSection, moveUpSection, moveDownSection, isOpen, toggleDropdown, canMoveUp, canMoveDown, pages }) => {
    const addContent = () => {
        const contentId = randomId();
        const newContent = {
            id: contentId,
            type: 'Section Title with description', // Default type
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
        const updateContent = (content) => {
            if (content.id === contentId) {
                if (field === 'type') {
                    return Object.assign(Object.assign({}, content), { type: value, title: '', description: '', url: '', children: [] // Reset children when type changes
                     });
                }
                else {
                    return Object.assign(Object.assign({}, content), { [field]: value });
                }
            }
            else if (content.children.length > 0) {
                return Object.assign(Object.assign({}, content), { children: content.children.map(child => updateContent(child)) });
            }
            return content;
        };
        const updatedSections = section.children.map(updateContent);
        editSection(sectionId, 'children', updatedSections);
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
    return (figma.widget.h(AutoLayout, { width: "fill-parent", direction: "vertical", spacing: 12, padding: 8, fill: "#F8F8F8", stroke: "#0000FF66", strokeDashPattern: [4, 4], strokeWidth: 2, cornerRadius: 4 },
        figma.widget.h(AutoLayout, { width: "fill-parent", direction: "horizontal", spacing: 8 },
            figma.widget.h(AutoLayout, { width: "fill-parent", padding: { vertical: 4 } },
                figma.widget.h(Dropdown, { value: section.element, onChange: (value) => editSection(sectionId, 'element', value), options: sectionOptions, placeholder: "Section Type", isOpen: isOpen, onToggle: toggleDropdown })),
            figma.widget.h(AutoLayout, { horizontalAlignItems: "end", spacing: 4 },
                canMoveUp && (figma.widget.h(IconButton, { src: MoveUpIconSvg, onClick: () => moveUpSection(sectionId) })),
                canMoveDown && (figma.widget.h(IconButton, { src: MoveDownIconSvg, onClick: () => moveDownSection(sectionId) })),
                figma.widget.h(IconButton, { src: CloneIconSvg, onClick: () => cloneSection(sectionId, section) }),
                figma.widget.h(IconButton, { src: DeleteIconSvg, onClick: () => deleteSection(sectionId) }))),
        figma.widget.h(AutoLayout, { width: "fill-parent", fill: "#0000FF0D", direction: "vertical", spacing: 8, padding: 8 },
            figma.widget.h(Input, { value: section.name, onTextEditEnd: (e) => editSection(sectionId, 'name', e.characters), placeholder: "Section Name", fontSize: 18, fontWeight: 600, width: "fill-parent" }),
            figma.widget.h(Input, { value: section.description, onTextEditEnd: (e) => editSection(sectionId, 'description', e.characters), placeholder: "Section Description", fontSize: 16, width: "fill-parent" })),
        section.children.length > 0 && (figma.widget.h(AutoLayout, { width: "fill-parent", direction: "vertical", spacing: 8 }, section.children.map((content, index) => (figma.widget.h(ContentView, { key: content.id, content: content, deleteContent: deleteContent, editContent: editContent, cloneContent: cloneContent, moveUpContent: moveUpContent, moveDownContent: moveDownContent, canMoveUp: index > 0, canMoveDown: index < section.children.length - 1, pages: pages }))))),
        figma.widget.h(AutoLayout, { width: "fill-parent", horizontalAlignItems: "center", padding: 12, cornerRadius: 4, fill: "#0000FF", hoverStyle: { fill: "#1717d8" }, onClick: addContent },
            figma.widget.h(Text, { fontSize: 14, fontWeight: 600, fill: "#ffffff" }, "Add Content"))));
};
widget.register(Widget);
