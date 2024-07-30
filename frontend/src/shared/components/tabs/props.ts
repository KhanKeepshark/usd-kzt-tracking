export interface TabsProps {
  items: string[];
  activeTab: number;
  setActiveTab: (index: number) => void;
}
