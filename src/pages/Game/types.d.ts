export interface SideNavProps {
  shown: boolean;
}

export interface TabItemProps {
  active: boolean;
}

export interface InfoFormValues {
  name: string;
  description: string;
  theme: {
    primary: string;
    secondary: string;
    [key: string]: string;
  };
  image: string | null;
}
