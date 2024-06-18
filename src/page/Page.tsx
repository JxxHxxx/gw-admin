import { Fragment, ReactNode } from "react";

type PageProps = {
    header: ReactNode;
    sidebar: ReactNode;
    children: ReactNode;
}

export default function Page({ header, sidebar, children }: PageProps) {
    return (
        <Fragment>
            <header>{header}</header>
            <div className="page-container">
                <aside>{sidebar}</aside>
                <main className="content">{children}</main>
            </div>
        </Fragment>
    );
}
