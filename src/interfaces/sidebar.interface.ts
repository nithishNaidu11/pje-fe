export interface SidebarMenuProps {
    id: string;
    title: string;
    link: string;
    icon: React.ReactNode;
    subMenus?: undefined;
}
export interface SidebarSectionProps {
    id: string;
    title: string;
    link?: undefined;
    icon?: undefined;
    subMenus: SidebarMenuProps[];
}

export type SidebarMenuConfigProps = SidebarMenuProps | SidebarSectionProps;
