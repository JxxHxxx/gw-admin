import { Fragment, ReactNode } from "react";

type PageProps = {
    header: ReactNode;
    sidebar: ReactNode;
    children: ReactNode;
    cnSideMainLayout?: string;
    cnAside?: string;
    cnMain?: string;
}

export default function Page({
    header,
    sidebar,
    children,
    cnSideMainLayout = '',
    cnAside = '',
    cnMain = '' }: PageProps) {
    return (
        <Fragment>
            <header>{header}</header>
            <div className={cnSideMainLayout}>
                <aside className={cnAside}>{sidebar}</aside>
                <main className={cnMain}>{children}</main>
            </div>
        </Fragment>
    );
}
