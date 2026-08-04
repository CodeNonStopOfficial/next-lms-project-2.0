export interface ItemProps {
  items: {
    title: string;
    url: string;
    icon?: React.ReactNode;
  }[];
}