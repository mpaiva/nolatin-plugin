 

interface IconButtonProps {
  src: string;
  onClick: () => void;
}

const IconButton = ({ src, onClick }: IconButtonProps) => {
  return (
    <AutoLayout
      onClick={onClick}
      cornerRadius={4}
      padding={4}
      hoverStyle={{ fill: '#EBEBF8' }} 
      verticalAlignItems="center"
      horizontalAlignItems="center"
      spacing={0}
    >
      <SVG src={src} width={20} height={20} />
    </AutoLayout>
  );
};

 
