interface WidgetContainerProps {
  children?: FigmaDeclarativeNode | FigmaDeclarativeNode[]
  keyColour?: string
}

const WidgetContainer = (props: WidgetContainerProps) => (
  <AutoLayout
    direction="vertical"
    verticalAlignItems="center"
    fill="#F7F7F7"
    effect={[
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
    ]}
  >
    <AutoLayout spacing={16} padding={12} direction="vertical">
      {props.children}
    </AutoLayout>
  </AutoLayout>
)
