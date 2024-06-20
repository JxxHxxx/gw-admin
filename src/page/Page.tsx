import { Fragment, ReactNode } from "react";
import '../component/layout/header.css'

type PageProps = {
    header: ReactNode;
    sidebar: ReactNode;
    children: ReactNode;
    cnSideMainLayout?: string;
    cnAside?: string;
    cnMain?: string;
    cnHeader?: string;
}

export default function Page({
    header,
    sidebar,
    children,
    cnSideMainLayout = '',
    cnAside = '',
    cnMain = '',
    cnHeader = 'common_hd' }: PageProps) {
    return (
        <Fragment>
            <header className={cnHeader}>{header}</header>
            <div className={cnSideMainLayout}>
                <aside className={cnAside}>{sidebar}</aside>
                <main className={cnMain}>{children}</main>
            </div>
        </Fragment>
    );
}
